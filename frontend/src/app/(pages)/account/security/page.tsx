"use client";

import {
    useEffect,
    useRef,
    useState,
    type ClipboardEvent,
    type KeyboardEvent,
} from "react";
import { Copy, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/contexts/UserProfileContext";
import { isMfaRequiredError } from "@/app/lib/mikeApi";
import { Modal } from "@/app/components/shared/Modal";
import {
    MfaVerificationPopup,
    needsMfaVerification,
} from "@/app/components/shared/MfaVerificationPopup";
import {
    accountGlassPrimaryButtonClassName,
} from "../accountStyles";
import { AccountSection } from "../AccountSection";
import { AccountToggle } from "../AccountToggle";

type MfaFactor = {
    id: string;
    friendly_name?: string | null;
    factor_type: string;
    status?: string;
};

type Enrollment = {
    factorId: string;
    challengeId: string;
    qrCode: string;
    secret: string;
};

const isDev = process.env.NODE_ENV !== "production";
const traceMfa = (...args: Parameters<typeof console.info>) => {
    if (isDev) console.info(...args);
};

function summarizeFactors(factors: MfaFactor[]) {
    return factors.map((factor) => ({
        type: factor.factor_type,
        status: factor.status ?? "unknown",
        friendlyName: factor.friendly_name ?? null,
    }));
}

function isDuplicateFriendlyNameError(error: unknown) {
    const message =
        error instanceof Error
            ? error.message
            : typeof error === "object" &&
                error !== null &&
                "message" in error &&
                typeof error.message === "string"
              ? error.message
              : "";
    return message
        .toLowerCase()
        .includes("a factor with the friendly name");
}

function VerificationCodeInput({
    value,
    onChange,
    disabled,
}: {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    const digits = Array.from({ length: 6 }, (_, index) => value[index] ?? "");

    function updateDigit(index: number, nextValue: string) {
        const digit = nextValue.replace(/\D/g, "").slice(-1);
        const nextDigits = [...digits];
        nextDigits[index] = digit;
        onChange(nextDigits.join(""));
        if (digit && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    }

    function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
        event.preventDefault();
        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);
        if (!pasted) return;
        onChange(pasted);
        inputsRef.current[Math.min(pasted.length, 6) - 1]?.focus();
    }

    function handleKeyDown(
        event: KeyboardEvent<HTMLInputElement>,
        index: number,
    ) {
        if (event.key === "Backspace" && !digits[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
        if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            inputsRef.current[index - 1]?.focus();
        }
        if (event.key === "ArrowRight" && index < digits.length - 1) {
            event.preventDefault();
            inputsRef.current[index + 1]?.focus();
        }
    }

    return (
        <div
            className="flex justify-center gap-2"
            role="group"
            aria-label="Altı haneli doğrulama kodu"
        >
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        inputsRef.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    value={digit}
                    disabled={disabled}
                    onChange={(event) =>
                        updateDigit(index, event.target.value)
                    }
                    onPaste={handlePaste}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    className="h-11 w-10 rounded-lg border border-transparent bg-gray-100 text-center text-lg font-medium text-gray-950 shadow-none outline-none transition-colors focus:border-gray-200 focus:ring-2 focus:ring-gray-300/45 disabled:cursor-not-allowed disabled:opacity-45"
                    aria-label={`Verification code digit ${index + 1}`}
                    maxLength={1}
                />
            ))}
        </div>
    );
}

function MfaSettingsSkeleton() {
    return (
        <div className="px-4 py-5">
            <div className="space-y-1">
                <div className="flex items-start justify-between gap-3">
                    <div className="h-4 w-36 animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-14 shrink-0 animate-pulse rounded bg-gray-100" />
                </div>
                <div className="space-y-1.5 pt-1">
                    <div className="h-3 w-full max-w-md animate-pulse rounded bg-gray-100" />
                    <div className="h-3 w-3/4 max-w-sm animate-pulse rounded bg-gray-100" />
                </div>
            </div>
            <div className="mt-3 flex justify-end">
                <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100" />
            </div>
        </div>
    );
}

export default function SecurityPage() {
    const { profile, updateMfaOnLogin } = useUserProfile();
    const [loading, setLoading] = useState(true);
    const [factors, setFactors] = useState<MfaFactor[]>([]);
    const [currentLevel, setCurrentLevel] = useState<string | null>(null);
    const [nextLevel, setNextLevel] = useState<string | null>(null);
    const [setupModalOpen, setSetupModalOpen] = useState(false);
    const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
    const [verificationCode, setVerificationCode] = useState("");
    const [setupKeyCopied, setSetupKeyCopied] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [savingLoginPreference, setSavingLoginPreference] = useState(false);
    const [pendingUnenrollFactorId, setPendingUnenrollFactorId] = useState<
        string | null
    >(null);
    const [pendingLoginPreference, setPendingLoginPreference] = useState<
        boolean | null
    >(null);

    async function refreshMfaState() {
        setLoading(true);
        setStatus(null);
        traceMfa("[security/mfa] refreshing state");
        const [factorResult, aalResult] = await Promise.all([
            supabase.auth.mfa.listFactors(),
            supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
        ]);

        if (factorResult.error) {
            traceMfa("[security/mfa] list factors failed", {
                error: factorResult.error.message,
            });
            setStatus(factorResult.error.message);
            setFactors([]);
        } else {
            const verifiedTotp = (factorResult.data.totp ?? []) as MfaFactor[];
            const allFactors = (factorResult.data.all ?? []) as MfaFactor[];
            traceMfa("[security/mfa] factors loaded", {
                allCount: allFactors.length,
                verifiedTotpCount: verifiedTotp.length,
                all: summarizeFactors(allFactors),
            });
            setFactors(verifiedTotp);
        }

        if (aalResult.error) {
            traceMfa("[security/mfa] assurance lookup failed", {
                error: aalResult.error.message,
            });
            setStatus(aalResult.error.message);
            setCurrentLevel(null);
            setNextLevel(null);
        } else {
            traceMfa("[security/mfa] assurance level", {
                currentLevel: aalResult.data.currentLevel,
                nextLevel: aalResult.data.nextLevel,
            });
            setCurrentLevel(aalResult.data.currentLevel);
            setNextLevel(aalResult.data.nextLevel);
        }
        setLoading(false);
    }

    useEffect(() => {
        traceMfa("[security/mfa] page mounted");
        void refreshMfaState();
    }, []);

    useEffect(() => {
        traceMfa("[security/mfa] rendered state", {
            loading,
            verifiedFactorCount: factors.length,
            currentLevel,
            nextLevel,
            hasEnrollment: !!enrollment,
        });
    }, [currentLevel, enrollment, factors.length, loading, nextLevel]);

    async function startEnrollment() {
        setBusy(true);
        setStatus(null);
        try {
            traceMfa("[security/mfa] enrollment requested");

            let { data, error } = await supabase.auth.mfa.enroll({
                factorType: "totp",
                friendlyName: "RapidAct",
            });
            if (error && isDuplicateFriendlyNameError(error)) {
                traceMfa("[security/mfa] retrying enrollment with unique name", {
                    error: error.message,
                });
                const retry = await supabase.auth.mfa.enroll({
                    factorType: "totp",
                    friendlyName: `RapidAct ${Date.now()}`,
                });
                data = retry.data;
                error = retry.error;
            }
            if (error) throw error;
            if (!data) throw new Error("MFA kurulumu başlatılamadı.");
            traceMfa("[security/mfa] enrollment created", {
                factorId: data.id,
            });

            const challenge = await supabase.auth.mfa.challenge({
                factorId: data.id,
            });
            if (challenge.error) throw challenge.error;
            traceMfa("[security/mfa] enrollment challenge created", {
                factorId: data.id,
                challengeId: challenge.data.id,
            });

            setEnrollment({
                factorId: data.id,
                challengeId: challenge.data.id,
                qrCode: data.totp.qr_code,
                secret: data.totp.secret,
            });
            setVerificationCode("");
            setSetupKeyCopied(false);
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "MFA kurulumu başlatılamadı.",
            );
        } finally {
            setBusy(false);
        }
    }

    async function closeSetupModal() {
        if (busy) return;
        setSetupModalOpen(false);
        if (enrollment) {
            await cancelEnrollment();
        } else {
            setVerificationCode("");
            setSetupKeyCopied(false);
        }
    }

    async function returnToSetupInstructions() {
        if (busy || !enrollment) return;
        await cancelEnrollment();
    }

    async function verifyEnrollment() {
        if (!enrollment || verificationCode.trim().length !== 6) return;

        setBusy(true);
        setStatus(null);
        try {
            traceMfa("[security/mfa] verifying enrollment", {
                factorId: enrollment.factorId,
                challengeId: enrollment.challengeId,
            });
            const { error } = await supabase.auth.mfa.verify({
                factorId: enrollment.factorId,
                challengeId: enrollment.challengeId,
                code: verificationCode.trim(),
            });
            if (error) throw error;
            traceMfa("[security/mfa] enrollment verified", {
                factorId: enrollment.factorId,
            });

            setEnrollment(null);
            setSetupModalOpen(false);
            setVerificationCode("");
            setSetupKeyCopied(false);
            setStatus("MFA etkinleştirildi.");
            await refreshMfaState();
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "MFA kodu doğrulanamadı.",
            );
        } finally {
            setBusy(false);
        }
    }

    async function cancelEnrollment() {
        const factorId = enrollment?.factorId;
        setEnrollment(null);
        setVerificationCode("");
        setSetupKeyCopied(false);
        if (factorId) {
            await supabase.auth.mfa.unenroll({ factorId }).catch(() => null);
        }
        await refreshMfaState();
    }

    async function copySetupKey() {
        if (!enrollment?.secret) return;
        await navigator.clipboard.writeText(enrollment.secret);
        setSetupKeyCopied(true);
        window.setTimeout(() => setSetupKeyCopied(false), 1600);
    }

    async function requestUnenroll(factorId: string) {
        setStatus(null);
        const { data, error } =
            await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
        if (error) {
            setStatus(error.message);
            return;
        }

        if (data.nextLevel === "aal2" && data.currentLevel !== "aal2") {
            setPendingUnenrollFactorId(factorId);
            return;
        }

        await unenrollFactor(factorId);
    }

    async function unenrollFactor(factorId: string) {
        setBusy(true);
        setStatus(null);
        const { error } = await supabase.auth.mfa.unenroll({ factorId });
        setBusy(false);

        if (error) {
            if (
                error.message.toLowerCase().includes("aal") ||
                error.code === "insufficient_aal"
            ) {
                setPendingUnenrollFactorId(factorId);
                return;
            }
            setStatus(error.message);
            return;
        }

        setStatus("MFA devre dışı bırakıldı.");
        if (profile?.mfaOnLogin) {
            void updateMfaOnLogin(false);
        }
        await refreshMfaState();
    }

    async function handleLoginPreferenceToggle() {
        if (!hasVerifiedFactor || savingLoginPreference) return;
        const enabled = !(profile?.mfaOnLogin === true);
        setSavingLoginPreference(true);
        setStatus(null);
        try {
            if (await needsMfaVerification()) {
                setPendingLoginPreference(enabled);
                return;
            }
            await saveLoginPreference(enabled);
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Giriş kimlik doğrulama tercihi güncellenemedi.",
            );
        } finally {
            setSavingLoginPreference(false);
        }
    }

    async function saveLoginPreference(enabled: boolean) {
        setSavingLoginPreference(true);
        setStatus(null);
        try {
            const success = await updateMfaOnLogin(enabled);
            if (!success) {
                setStatus("Giriş kimlik doğrulama tercihi güncellenemedi.");
            }
        } catch (error) {
            if (isMfaRequiredError(error)) {
                setPendingLoginPreference(enabled);
            } else {
                setStatus(
                    error instanceof Error
                        ? error.message
                        : "Giriş kimlik doğrulama tercihi güncellenemedi.",
                );
            }
        } finally {
            setSavingLoginPreference(false);
        }
    }

    const hasVerifiedFactor = factors.length > 0;
    const sessionVerified = currentLevel === "aal2";
    const loginMfaEnabled = profile?.mfaOnLogin === true;

    return (
        <div className="space-y-8">
            <section className="space-y-3">
                <h2 className="text-2xl font-medium font-serif text-gray-900">
                    Çok Faktörlü Kimlik Doğrulama
                </h2>
                <AccountSection>
                    {loading ? (
                        <MfaSettingsSkeleton />
                    ) : (
                        <>
                            <div className="px-4 py-5">
                                <div className="space-y-1">
                                    <div className="flex items-start justify-between gap-3">
                                        <p className="text-sm font-medium text-gray-900">
                                            Doğrulama yöntemi
                                        </p>
                                        <span
                                            className={`shrink-0 text-xs font-medium ${
                                                hasVerifiedFactor
                                                    ? "text-green-700"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {hasVerifiedFactor
                                                ? "Etkin"
                                                : "Kurulmadı"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {hasVerifiedFactor
                                            ? sessionVerified
                                                ? "Kimlik doğrulayıcı uygulama hesabınıza kayıtlı. Bu oturum için hassas işlemlerin kilidi açıldı."
                                                : "Kimlik doğrulayıcı uygulama hesabınıza kayıtlı. Hassas işlemler bir doğrulama kodu gerektirir."
                                            : "Veri dışa aktarma, veri silme, hesap silme ve API anahtarlarını değiştirme gibi hassas işlemleri korumak için bir kimlik doğrulayıcı uygulama ekleyin."}
                                    </p>
                                </div>
                                {!hasVerifiedFactor && !enrollment ? (
                                    <div className="mt-3 flex justify-end">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setSetupModalOpen(true)
                                            }
                                            disabled={busy}
                                            className={`h-9 w-full gap-1.5 sm:w-auto ${accountGlassPrimaryButtonClassName}`}
                                        >
                                            {busy ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Başlatılıyor...
                                                </>
                                            ) : (
                                                "Kur"
                                            )}
                                        </Button>
                                    </div>
                                ) : null}
                            </div>

                            {hasVerifiedFactor && (
                                <>
                                    <div className="mx-4 h-px bg-gray-200" />
                                    <div className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Giriş doğrulaması
                                            </p>
                                            <p className="text-sm text-gray-500">
Her yeni girişten sonra, yalnızca hassas
                                                işlemlerden önce değil, bir kimlik
                                                doğrulayıcı kodu iste.
                                            </p>
                                        </div>
                                        <AccountToggle
                                            checked={loginMfaEnabled}
                                            disabled={savingLoginPreference}
                                            loading={savingLoginPreference}
                                            size="md"
                                            onChange={() =>
                                                void handleLoginPreferenceToggle()
                                            }
                                        />
                                    </div>
                                    <div className="flex justify-end px-4 pb-4 pt-1">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                void requestUnenroll(
                                                    factors[0]?.id,
                                                )
                                            }
                                            disabled={busy || !factors[0]?.id}
                                            className="text-xs font-medium text-red-600 transition-colors hover:text-red-700 disabled:cursor-not-allowed disabled:text-red-300"
                                        >
                                            Kimlik doğrulayıcı uygulamayı kaldır
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    {status && (
                        <>
                            <div className="mx-4 h-px bg-gray-200" />
                            <p className="px-4 py-3 text-xs text-gray-500">
                                {status}
                            </p>
                        </>
                    )}
                </AccountSection>
            </section>
            <Modal
                open={setupModalOpen}
                onClose={() => void closeSetupModal()}
                title="Kimlik doğrulayıcı uygulamayı kur"
                cancelAction={{
                    label: enrollment ? "Geri" : "İptal",
                    onClick: enrollment
                        ? () => void returnToSetupInstructions()
                        : () => void closeSetupModal(),
                    disabled: busy,
                }}
                primaryAction={
                    enrollment
                        ? {
                              label: busy ? "Doğrulanıyor..." : "Doğrula",
                              onClick: () => void verifyEnrollment(),
                              disabled:
                                  busy || verificationCode.trim().length !== 6,
                          }
                        : {
                              label: busy ? "Başlatılıyor..." : "Devam",
                              onClick: () => void startEnrollment(),
                              disabled: busy,
                          }
                }
            >
                <div className={enrollment ? "space-y-3 pt-2" : "space-y-5 pt-3"}>
                    {!enrollment ? (
                        <>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Adım 1
                            </p>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Başlamadan önce
                                </p>
                                <p className="text-sm text-gray-500">
Google Authenticator, Microsoft Authenticator,
                                    Authy, 1Password veya iCloud Parolaları gibi
                                    bir kimlik doğrulayıcı uygulama indirin.
                                </p>
                            </div>
                            <ol className="list-decimal space-y-1 pl-4 text-sm text-gray-500">
                                <li>
                                    Kimlik doğrulayıcı uygulamanızı indirip açın.
                                </li>
                                <li>
                                    Yeni bir hesap ekleme seçeneğini seçin.
                                </li>
                            </ol>
                        </>
                    ) : (
                        <>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Adım 2
                            </p>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900">
                                    Bu kodu tarayın
                                </p>
                                <p className="text-sm text-gray-500">
Kimlik doğrulayıcı uygulamanızda yeni bir hesap
                                    ekleyin ve QR kodunu tarayın. Tarayamıyorsanız,
                                    aşağıdaki kurulum anahtarını elle girin.
                                </p>
                            </div>
                            <div className="min-w-0">
                                <div className="mb-1 flex items-center justify-between gap-3">
                                    <p className="text-xs font-medium text-gray-500">
                                        Kurulum anahtarı
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => void copySetupKey()}
                                        className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-950"
                                    >
                                        <Copy className="h-3 w-3" />
                                        {setupKeyCopied ? "Kopyalandı" : "Kopyala"}
                                    </button>
                                </div>
                                <p className="break-all text-xs text-gray-700">
                                    {enrollment.secret}
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <div className="flex h-48 w-48 items-center justify-center rounded-xl bg-white p-2">
                                    <img
                                        src={enrollment.qrCode}
                                        alt="MFA QR code"
                                        className="h-full w-full"
                                    />
                                </div>
                            </div>
                            <div className="min-w-0 space-y-3">
                                <VerificationCodeInput
                                    value={verificationCode}
                                    onChange={setVerificationCode}
                                    disabled={busy}
                                />
                            </div>
                        </>
                    )}
                </div>
            </Modal>
            <MfaVerificationPopup
                open={!!pendingUnenrollFactorId}
                onCancel={() => setPendingUnenrollFactorId(null)}
                onVerified={() => {
                    const factorId = pendingUnenrollFactorId;
                    setPendingUnenrollFactorId(null);
                    if (factorId) void unenrollFactor(factorId);
                }}
            />
            <MfaVerificationPopup
                open={pendingLoginPreference !== null}
                onCancel={() => setPendingLoginPreference(null)}
                onVerified={() => {
                    const enabled = pendingLoginPreference;
                    setPendingLoginPreference(null);
                    if (enabled !== null) void saveLoginPreference(enabled);
                }}
                title="Kimlik doğrulayıcı gerekli"
                message="Giriş doğrulamasını değiştirmek için kimlik doğrulayıcı uygulamanızdaki kodu girin."
            />
        </div>
    );
}
