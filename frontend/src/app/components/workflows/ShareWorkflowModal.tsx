"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
    deleteWorkflowShare,
    listWorkflowShares,
    shareWorkflow,
} from "@/app/lib/mikeApi";
import { useAuth } from "@/contexts/AuthContext";
import { EmailPillInput } from "../shared/EmailPillInput";
import { Modal } from "../shared/Modal";

interface Share {
    id: string;
    shared_with_email: string;
    allow_edit: boolean;
    created_at: string;
}

interface Props {
    workflowId: string;
    workflowName: string;
    onClose: () => void;
}

export function ShareWorkflowModal({
    workflowId,
    workflowName,
    onClose,
}: Props) {
    const [pendingEmails, setPendingEmails] = useState<string[]>([]);
    const [allowEdit, setAllowEdit] = useState(false);
    const [existingShares, setExistingShares] = useState<Share[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const ownEmail = user?.email?.trim().toLowerCase() ?? null;

    useEffect(() => {
        listWorkflowShares(workflowId)
            .then(setExistingShares)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [workflowId]);

    async function handleRemoveShare(shareId: string) {
        await deleteWorkflowShare(workflowId, shareId).catch(() => {});
        setExistingShares((prev) => prev.filter((s) => s.id !== shareId));
    }

    async function handleConfirm() {
        const emails = ownEmail
            ? pendingEmails.filter((email) => email !== ownEmail)
            : pendingEmails;
        if (emails.length === 0) return;
        setSaving(true);
        setError(null);
        try {
            await shareWorkflow(workflowId, { emails, allow_edit: allowEdit });
            const updated = await listWorkflowShares(workflowId);
            setExistingShares(updated);
            setPendingEmails([]);
        } catch (err) {
            setError(
                err instanceof Error && err.message
                    ? err.message
                    : "Bu iş akışı paylaşılamadı. Lütfen tekrar deneyin.",
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <Modal
            open
            onClose={onClose}
            breadcrumbs={["İş Akışları", workflowName, "Kişiler"]}
            primaryAction={{
                label: saving ? "Paylaşılıyor…" : "Paylaş",
                onClick: handleConfirm,
                disabled: saving || pendingEmails.length === 0,
            }}
        >
            <div className="flex min-h-0 flex-1 flex-col gap-6">
                <section className="space-y-3">
                <EmailPillInput
                    emails={pendingEmails}
                    onChange={setPendingEmails}
                    validate={async (email) =>
                        ownEmail && email === ownEmail
                            ? "Bir iş akışını kendinizle paylaşamazsınız."
                            : null
                    }
                    placeholder="Kişileri e-posta ile ekle…"
                    autoFocus
                />

                {error ? (
                    <div className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                        {error}
                    </div>
                ) : null}
                </section>

                {/* Permission toggle */}
                <section className="flex flex-col gap-3">
                    <span className="text-xs font-medium text-gray-700">Paylaşılan kişilerin düzenlemesine izin ver</span>
                    <button
                        type="button"
                        onClick={() => setAllowEdit((v) => !v)}
                        className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${allowEdit ? "bg-gray-900" : "bg-gray-200"}`}
                    >
                        <span className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${allowEdit ? "translate-x-4" : "translate-x-0"}`} />
                    </button>
                </section>

                {/* Existing access */}
                <section className="min-h-0 flex-1">
                    <p className="text-xs font-medium text-gray-700 mb-2">Erişimi olan kişiler</p>
                    {loading ? (
                        <div className="space-y-2">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="h-3 w-40 rounded bg-gray-100 animate-pulse" />
                                    <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : existingShares.length === 0 ? (
                        <p className="text-sm text-gray-400">Yok</p>
                    ) : (
                        <div className="space-y-1">
                            {existingShares.map((share) => (
                                <div key={share.id} className="flex items-center justify-between py-1">
                                    <span className="text-sm text-gray-700 truncate">{share.shared_with_email}</span>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className="text-xs text-gray-400">{share.allow_edit ? "Düzenleyebilir" : "Salt okunur"}</span>
                                        <button
                                            onClick={() => handleRemoveShare(share.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
            </div>
        </Modal>
    );
}
