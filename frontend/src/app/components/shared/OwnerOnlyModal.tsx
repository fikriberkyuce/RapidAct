"use client";

import { Lock } from "lucide-react";
import { WarningPopup } from "./WarningPopup";

interface Props {
    open: boolean;
    onClose: () => void;
    /** Short headline above the body, e.g. "Owner-only action". */
    title?: string;
    /** Sentence describing what the user tried to do. */
    action?: string;
    /** Email of the project/resource owner, shown so the user knows who to ask. */
    ownerEmail?: string | null;
    /** Override the default message entirely. */
    message?: string;
}

/**
 * Lightweight "you don't have permission" modal shown when a non-owner
 * attempts an owner-only action (manage people, rename, delete, …) on a
 * shared project. Replaces the silent 404 the backend would otherwise
 * return so the user understands why the action didn't go through.
 */
export function OwnerOnlyModal({
    open,
    onClose,
    title = "Yalnızca sahibine özel işlem",
    action,
    ownerEmail,
    message,
}: Props) {
    if (!open) return null;

    const body =
        message ??
        (action
            ? `${action} işlemini yalnızca proje sahibi gerçekleştirebilir.`
            : "Bu işlemi yalnızca proje sahibi gerçekleştirebilir.");

    return (
        <WarningPopup
            open={open}
            onClose={onClose}
            title={title}
            message={body}
            icon={<Lock className="h-3.5 w-3.5 shrink-0 text-red-600" />}
        >
            {ownerEmail && (
                <p className="mt-1 text-xs text-gray-600">
                    Erişime ihtiyacınız varsa{" "}
                    <span className="text-gray-600">{ownerEmail}</span> ile
                    iletişime geçin.
                </p>
            )}
        </WarningPopup>
    );
}
