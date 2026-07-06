import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { createServerSupabase } from "../lib/supabase";
import {
    buildProjectDocContext,
    buildMessages,
    buildWorkflowStore,
    enrichWithPriorEvents,
    AssistantStreamError,
    buildCancelledAssistantMessage,
    extractAnnotations,
    isAbortError,
    runLLMStream,
    stripTransientAssistantEvents,
    PROJECT_EXTRA_TOOLS,
    type ChatMessage,
} from "../lib/chatTools";
import {
    getUserModelSettings,
} from "../lib/userSettings";
import { checkProjectAccess } from "../lib/access";
import { safeErrorLog, safeErrorMessage } from "../lib/safeError";

const PROJECT_SYSTEM_PROMPT_EXTRA = `PROJE BAĞLAMI:
Tek bir dosyaya (uyuşmazlık/işe) ait, kullanıcının düzenlediği hukuki belgelerden oluşan bir proje klasörü içinde çalışıyorsun. Kullanıcının soruları genellikle bu projedeki bir veya birden çok belgeye atıfta bulunur — görevin, üzerinde çalışılacak ilgili dosyaları bulmaktır. Nelerin mevcut olduğunu görmek için list_documents, yanıt vermeden önce ihtiyaç duyduğun belgeleri almak için fetch_documents / read_document kullan.

Kullanıcının yan panelinde bir belge görüntüleniyor olabilir; verildiğinde bunu kullanıcının olası odağına dair bir bağlam olarak değerlendir, ancak bunu kullanıcının sorduğu tek veya kesin belge olarak VARSAYMA. Talep, projedeki diğer dosyalar için de geçerli olabiliyorsa, onları da belirleyip oku. Yalnızca görüntülenen belgeyi dar bir biçimde okumak yerine ilgili proje belgeleri genelinde kapsam sağlamayı tercih et.

BİR BELGEYİ ÇOĞALTMA:
Kullanıcı mevcut bir proje belgesini yeni bir dosya için başlangıç noktası olarak kullanmak istediğinde (ör. "bu gizlilik sözleşmesini şablon olarak kullan", "şu sözleşmenin düzenleyebileceğim bir kopyasını çıkar", "bunu çoğaltıp X şirketi için uyarla"), kaynak doc_id ile replicate_document aracını çağır. Bu, yeni bir proje belgesi olarak birebir kopya oluşturur, yeni bir doc_id değeri döndürür ve arayüzde bir indirme/açma kartı gösterir. Ardından, kullanıcının istediği değişiklikleri yapmak için döndürülen doc_id üzerinde edit_document çağır — kullanıcının mevcut belgenin yapısını ve biçimlendirmesini korumak istediği durumlarda generate_docx ÇAĞIRMA.`;

export const projectChatRouter = Router({ mergeParams: true });

// POST /projects/:projectId/chat — streaming
projectChatRouter.post("/", requireAuth, async (req, res) => {
    const userId = res.locals.userId as string;
    const userEmail = res.locals.userEmail as string | undefined;
    const { projectId } = req.params;
    const { messages, chat_id, model, displayed_doc, attached_documents } =
        req.body as {
            messages: ChatMessage[];
            chat_id?: string;
            model?: string;
            displayed_doc?: { filename: string; document_id: string };
            attached_documents?: { filename: string; document_id: string }[];
        };

    const db = createServerSupabase();

    // Verify the user has access to the project (owner or shared member).
    const projectAccess = await checkProjectAccess(
        projectId,
        userId,
        userEmail,
        db,
    );
    if (!projectAccess.ok)
        return void res.status(404).json({ detail: "Project not found" });

    let chatId = chat_id ?? null;
    let chatTitle: string | null = null;

    if (chatId) {
        const { data: existing } = await db
            .from("chats")
            .select("id, title, project_id")
            .eq("id", chatId)
            .single();
        const canUse = !!existing && existing.project_id === projectId;
        if (!canUse) chatId = null;
        else chatTitle = existing!.title;
    }

    if (!chatId) {
        const { data: newChat, error } = await db
            .from("chats")
            .insert({ user_id: userId, project_id: projectId })
            .select("id, title")
            .single();
        if (error || !newChat)
            return void res
                .status(500)
                .json({ detail: "Failed to create chat" });
        chatId = newChat.id as string;
        chatTitle = newChat.title;
    }

    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser) {
        await db.from("chat_messages").insert({
            chat_id: chatId,
            role: "user",
            content: lastUser.content,
            files: lastUser.files ?? null,
            workflow: lastUser.workflow ?? null,
        });
    }

    const { docIndex, docStore, folderPaths } = await buildProjectDocContext(
        projectId,
        userId,
        db,
    );
    const docAvailability = Object.entries(docIndex).map(([doc_id, info]) => ({
        doc_id,
        filename: info.filename,
        folder_path: folderPaths.get(doc_id),
    }));

    const enrichedMessages = await enrichWithPriorEvents(
        messages,
        chatId,
        db,
        docIndex,
    );
    const messagesForLLM: ChatMessage[] = displayed_doc
        ? enrichedMessages.map((m, i) => {
              if (i !== enrichedMessages.length - 1 || m.role !== "user")
                  return m;
              return {
                  ...m,
                  content: `${m.content}\n\ndisplayed_doc: ${displayed_doc.filename}, displayed_doc_id: ${displayed_doc.document_id}`,
              };
          })
        : enrichedMessages;

    // The user-attached docs for this turn (dragged into / picked from
    // the chat input) come in as a request-level field. Surface them in
    // the system prompt with the current-turn doc_id slugs so the model
    // knows which docs the user is highlighting *now*, distinct from
    // the broader project doc list.
    let systemPromptExtra = PROJECT_SYSTEM_PROMPT_EXTRA;
    if (attached_documents?.length) {
        const slugByDocumentId = new Map<string, string>();
        for (const [slug, info] of Object.entries(docIndex)) {
            if (info.document_id)
                slugByDocumentId.set(info.document_id, slug);
        }
        const lines = attached_documents.map((d) => {
            const slug = slugByDocumentId.get(d.document_id);
            return slug ? `- ${slug}: ${d.filename}` : `- ${d.filename}`;
        });
        systemPromptExtra += `\n\nBU TURDA KULLANICININ EKLEDİĞİ BELGELER:\nKullanıcı, en son mesajına doğrudan aşağıdaki belge(ler)i ekledi. Mesajı açıkça aksini belirtmedikçe bunları talebin birincil odağı olarak değerlendir.\n${lines.join("\n")}`;
    }

    const {
        api_keys: apiKeys,
        legal_research_us: legalResearchUs,
    } = await getUserModelSettings(userId, db);
    const apiMessages = buildMessages(
        messagesForLLM,
        docAvailability,
        systemPromptExtra,
        undefined,
        legalResearchUs,
    );

    const workflowStore = await buildWorkflowStore(userId, userEmail, db);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    res.flushHeaders();

    const write = (line: string) => res.write(line);
    const streamAbort = new AbortController();
    let streamFinished = false;
    res.on("close", () => {
        if (!streamFinished) streamAbort.abort();
    });

    try {
        write(`data: ${JSON.stringify({ type: "chat_id", chatId })}\n\n`);

        const { events, annotations } = await runLLMStream({
            apiMessages,
            docStore,
            docIndex,
            userId,
            db,
            write,
            extraTools: PROJECT_EXTRA_TOOLS,
            workflowStore,
            includeResearchTools: legalResearchUs,
            model,
            apiKeys,
            signal: streamAbort.signal,
            projectId,
        });

        const persistedEvents = stripTransientAssistantEvents(events);
        await db.from("chat_messages").insert({
            chat_id: chatId,
            role: "assistant",
            content: persistedEvents.length ? persistedEvents : null,
            annotations: annotations.length ? annotations : null,
        });

        if (!chatTitle && lastUser?.content) {
            await db
                .from("chats")
                .update({ title: lastUser.content.slice(0, 120) })
                .eq("id", chatId);
        }
    } catch (err) {
        if (isAbortError(err)) {
            console.log("[project-chat/stream] client aborted stream", {
                chatId,
            });
            if (err instanceof AssistantStreamError) {
                const partial = buildCancelledAssistantMessage({
                    fullText: err.fullText,
                    events: err.events,
                    buildAnnotations: (fullText, events) =>
                        extractAnnotations(fullText, docIndex, events),
                });
                const { error: saveError } = await db.from("chat_messages").insert({
                    chat_id: chatId,
                    role: "assistant",
                    content: partial.events.length ? partial.events : null,
                    annotations: partial.annotations.length
                        ? partial.annotations
                        : null,
                });
                if (saveError) {
                    console.error(
                        "[project-chat/stream] failed to save aborted stream",
                        saveError,
                    );
                }
            }
            return;
        }
        console.error("[project-chat/stream] error:", safeErrorLog(err));
        const message = safeErrorMessage(err, "Stream error");
        const errorEvents = err instanceof AssistantStreamError
            ? stripTransientAssistantEvents(err.events)
            : [{ type: "error" as const, message }];
        const errorFullText =
            err instanceof AssistantStreamError ? err.fullText : "";
        try {
            const annotations = extractAnnotations(
                errorFullText,
                docIndex,
                errorEvents,
            );
            const { error: saveError } = await db.from("chat_messages").insert({
                chat_id: chatId,
                role: "assistant",
                content: errorEvents.length ? errorEvents : null,
                annotations: annotations.length ? annotations : null,
            });
            if (saveError)
                console.error("[project-chat/stream] failed to save error", saveError);
        } catch (saveErr) {
            console.error("[project-chat/stream] failed to save error", saveErr);
        }
        try {
            write(
                `data: ${JSON.stringify({ type: "error", message })}\n\n`,
            );
            write("data: [DONE]\n\n");
        } catch {
            /* ignore */
        }
    } finally {
        streamFinished = true;
        res.end();
    }
});
