"use client";

import { useState } from "react";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatHistoryContext } from "@/app/contexts/ChatHistoryContext";
import { ConfirmPopup } from "@/app/components/shared/ConfirmPopup";
import {
    MfaVerificationPopup,
    needsMfaVerification,
} from "@/app/components/shared/MfaVerificationPopup";
import {
    deleteAllChats,
    deleteAllProjects,
    deleteAllTabularReviews,
    exportAccountData,
    exportChatData,
    exportTabularReviewsData,
    isMfaRequiredError,
} from "@/app/lib/mikeApi";
import {
    accountGlassDangerOutlineButtonClassName,
    accountGlassPrimaryButtonClassName,
} from "../accountStyles";
import { AccountSection } from "../AccountSection";

type DeleteDataAction = "chats" | "tabular-reviews" | "projects";
type ExportDataAction = "export-chats" | "export-tabular-reviews" | "export-account";
type MfaRetryAction = DeleteDataAction | ExportDataAction;

const isDev = process.env.NODE_ENV !== "production";
const devLog = (...args: Parameters<typeof console.log>) => {
    if (isDev) console.log(...args);
};

const DELETE_DATA_COPY: Record<
    DeleteDataAction,
    {
        title: string;
        message: string;
    }
> = {
    chats: {
        title: "Tüm sohbetler silinsin mi?",
        message:
            "Bu işlem asistan ve tablo incelemesi sohbet geçmişinizi kalıcı olarak silecek. Bu işlem geri alınamaz.",
    },
    "tabular-reviews": {
        title: "Tüm tablo incelemeleri silinsin mi?",
        message:
            "Bu işlem, sahibi olduğunuz tüm tablo incelemelerini, hücreleri ve inceleme sohbetleri dahil kalıcı olarak silecek. Bu işlem geri alınamaz.",
    },
    projects: {
        title: "Tüm projeler silinsin mi?",
        message:
            "Bu işlem, sahibi olduğunuz tüm projeleri; belgeleri, sohbetleri ve tablo incelemeleri dahil kalıcı olarak silecek. Bu işlem geri alınamaz.",
    },
};

export default function PrivacyDataPage() {
    const { loadChats, setCurrentChatId } = useChatHistoryContext();
    const [pendingDeleteAction, setPendingDeleteAction] =
        useState<DeleteDataAction | null>(null);
    const [deletingAction, setDeletingAction] =
        useState<DeleteDataAction | null>(null);
    const [pendingMfaAction, setPendingMfaAction] =
        useState<MfaRetryAction | null>(null);
    const [isExportingAccount, setIsExportingAccount] = useState(false);
    const [isExportingChats, setIsExportingChats] = useState(false);
    const [isExportingTabularReviews, setIsExportingTabularReviews] =
        useState(false);

    const downloadBlob = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

    const handleExportAccountData = async () => {
        devLog("[privacy-data/mfa] export account requested");
        setIsExportingAccount(true);
        try {
            if (await needsMfaVerification()) {
                setPendingMfaAction("export-account");
                return;
            }
            const { blob, filename } = await exportAccountData();
            downloadBlob(blob, filename ?? "rapidact-hesap-disa-aktarma.json");
        } catch (error) {
            devLog("[privacy-data/mfa] export account failed", {
                isMfaRequired: isMfaRequiredError(error),
                error,
            });
            if (isMfaRequiredError(error)) {
                setPendingMfaAction("export-account");
                return;
            }
            alert("Hesap verileri dışa aktarılamadı. Lütfen tekrar deneyin.");
        } finally {
            setIsExportingAccount(false);
        }
    };

    const handleExportChatData = async () => {
        devLog("[privacy-data/mfa] export chats requested");
        setIsExportingChats(true);
        try {
            if (await needsMfaVerification()) {
                setPendingMfaAction("export-chats");
                return;
            }
            const { blob, filename } = await exportChatData();
            downloadBlob(blob, filename ?? "rapidact-sohbet-disa-aktarma.json");
        } catch (error) {
            devLog("[privacy-data/mfa] export chats failed", {
                isMfaRequired: isMfaRequiredError(error),
                error,
            });
            if (isMfaRequiredError(error)) {
                setPendingMfaAction("export-chats");
                return;
            }
            alert("Sohbetler dışa aktarılamadı. Lütfen tekrar deneyin.");
        } finally {
            setIsExportingChats(false);
        }
    };

    const handleExportTabularReviewsData = async () => {
        devLog("[privacy-data/mfa] export tabular reviews requested");
        setIsExportingTabularReviews(true);
        try {
            if (await needsMfaVerification()) {
                setPendingMfaAction("export-tabular-reviews");
                return;
            }
            const { blob, filename } = await exportTabularReviewsData();
            downloadBlob(blob, filename ?? "rapidact-tablo-incelemeleri-disa-aktarma.json");
        } catch (error) {
            devLog("[privacy-data/mfa] export tabular reviews failed", {
                isMfaRequired: isMfaRequiredError(error),
                error,
            });
            if (isMfaRequiredError(error)) {
                setPendingMfaAction("export-tabular-reviews");
                return;
            }
            alert("Tablo incelemeleri dışa aktarılamadı. Lütfen tekrar deneyin.");
        } finally {
            setIsExportingTabularReviews(false);
        }
    };

    const handleDeleteData = async (action: DeleteDataAction) => {
        devLog("[privacy-data/mfa] delete requested", { action });
        setDeletingAction(action);
        try {
            if (await needsMfaVerification()) {
                setPendingDeleteAction(null);
                setPendingMfaAction(action);
                return;
            }
            if (action === "chats") {
                await deleteAllChats();
                setCurrentChatId(null);
                await loadChats();
            } else if (action === "tabular-reviews") {
                await deleteAllTabularReviews();
            } else {
                await deleteAllProjects();
                setCurrentChatId(null);
                await loadChats();
            }
            setPendingDeleteAction(null);
        } catch (error) {
            devLog("[privacy-data/mfa] delete failed", {
                action,
                isMfaRequired: isMfaRequiredError(error),
                error,
            });
            if (isMfaRequiredError(error)) {
                setPendingDeleteAction(null);
                setPendingMfaAction(action);
                return;
            }
            alert("Veriler silinemedi. Lütfen tekrar deneyin.");
        } finally {
            setDeletingAction(null);
        }
    };

    const handleMfaVerified = async () => {
        const action = pendingMfaAction;
        devLog("[privacy-data/mfa] verification callback", { action });
        setPendingMfaAction(null);
        if (!action) return;

        if (action === "export-account") {
            await handleExportAccountData();
        } else if (action === "export-chats") {
            await handleExportChatData();
        } else if (action === "export-tabular-reviews") {
            await handleExportTabularReviewsData();
        } else {
            await handleDeleteData(action);
        }
    };

    const pendingDeleteCopy = pendingDeleteAction
        ? DELETE_DATA_COPY[pendingDeleteAction]
        : null;

    return (
        <div className="space-y-8">
            <section className="space-y-3">
                <h2 className="text-2xl font-medium font-serif text-gray-900">
                    Verileri dışa aktar
                </h2>
                <AccountSection>
                    <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                                Sohbetleri dışa aktar
                            </p>
                            <p className="text-sm text-gray-500">
Asistan ve tablo incelemesi sohbet
                                geçmişini JSON olarak indirin.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleExportChatData}
                            disabled={isExportingChats}
                            className={`h-9 gap-1.5 text-sm ${accountGlassPrimaryButtonClassName}`}
                        >
                            {!isExportingChats && (
                                <Download className="h-4 w-4 shrink-0" />
                            )}
                            {isExportingChats ? "Dışa aktarılıyor..." : "Dışa Aktar"}
                        </Button>
                    </div>
                    <div className="mx-4 h-px bg-gray-200" />

                    <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                                Tablo incelemelerini dışa aktar
                            </p>
                            <p className="text-sm text-gray-500">
Sahibi olduğunuz tüm tablo incelemelerini,
                                hücreleri ve inceleme sohbet kayıtlarını JSON olarak indirin.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleExportTabularReviewsData}
                            disabled={isExportingTabularReviews}
                            className={`h-9 gap-1.5 text-sm ${accountGlassPrimaryButtonClassName}`}
                        >
                            {!isExportingTabularReviews && (
                                <Download className="h-4 w-4 shrink-0" />
                            )}
                            {isExportingTabularReviews
                                ? "Dışa aktarılıyor..."
                                : "Dışa Aktar"}
                        </Button>
                    </div>
                    <div className="mx-4 h-px bg-gray-200" />

                    <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                                Hesap JSON'unu dışa aktar
                            </p>
                            <p className="text-sm text-gray-500">
Hesap meta verilerini, projeleri, belge meta
                                verilerini, iş akışlarını ve inceleme verilerini JSON olarak indirin.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleExportAccountData}
                            disabled={isExportingAccount}
                            className={`h-9 gap-1.5 text-sm ${accountGlassPrimaryButtonClassName}`}
                        >
                            {!isExportingAccount && (
                                <Download className="h-4 w-4 shrink-0" />
                            )}
                            {isExportingAccount ? "Dışa aktarılıyor..." : "Dışa Aktar"}
                        </Button>
                    </div>
                </AccountSection>
            </section>

            <section className="space-y-3">
                <h2 className="text-2xl font-medium font-serif text-gray-900">
                    Verileri sil
                </h2>
                <AccountSection>
                    <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                                Tüm sohbetleri sil
                            </p>
                            <p className="text-sm text-gray-500">
Asistan ve tablo incelemesi sohbet
                                geçmişinizi kalıcı olarak silin.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setPendingDeleteAction("chats")}
                            disabled={!!deletingAction}
                            className={`h-9 w-full shrink-0 gap-1.5 sm:w-auto ${accountGlassDangerOutlineButtonClassName}`}
                        >
                            <Trash2 className="h-4 w-4 shrink-0" />
                            Sil
                        </Button>
                    </div>
                    <div className="mx-4 h-px bg-gray-200" />

                    <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                                Tüm tablo incelemelerini sil
                            </p>
                            <p className="text-sm text-gray-500">
Sahibi olduğunuz tüm tablo incelemelerini,
                                hücreler ve inceleme sohbetleri dahil kalıcı olarak silin.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setPendingDeleteAction("tabular-reviews")
                            }
                            disabled={!!deletingAction}
                            className={`h-9 w-full shrink-0 gap-1.5 sm:w-auto ${accountGlassDangerOutlineButtonClassName}`}
                        >
                            <Trash2 className="h-4 w-4 shrink-0" />
                            Sil
                        </Button>
                    </div>
                    <div className="mx-4 h-px bg-gray-200" />

                    <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-900">
                                Tüm projeleri sil
                            </p>
                            <p className="text-sm text-gray-500">
Sahibi olduğunuz tüm projeleri; belgeler,
                                sohbetler ve tablo incelemeleri dahil kalıcı olarak silin.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => setPendingDeleteAction("projects")}
                            disabled={!!deletingAction}
                            className={`h-9 w-full shrink-0 gap-1.5 sm:w-auto ${accountGlassDangerOutlineButtonClassName}`}
                        >
                            <Trash2 className="h-4 w-4 shrink-0" />
                            Sil
                        </Button>
                    </div>
                </AccountSection>
            </section>
            <ConfirmPopup
                open={!!pendingDeleteAction}
                title={pendingDeleteCopy?.title}
                message={pendingDeleteCopy?.message}
                confirmLabel="Sil"
                confirmStatus={deletingAction ? "loading" : "idle"}
                cancelLabel="İptal"
                onCancel={() => {
                    if (deletingAction) return;
                    setPendingDeleteAction(null);
                }}
                onConfirm={() => {
                    if (!pendingDeleteAction) return;
                    void handleDeleteData(pendingDeleteAction);
                }}
            />
            <MfaVerificationPopup
                open={!!pendingMfaAction}
                onCancel={() => setPendingMfaAction(null)}
                onVerified={() => void handleMfaVerified()}
                title="İki adımlı doğrulama gerekli"
                message="Bu işlem hassastır. Devam etmek için kimlik doğrulayıcı uygulamanızdaki kodu girin."
            />
        </div>
    );
}
