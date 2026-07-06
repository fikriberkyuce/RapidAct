import type { ColumnFormat } from "../shared/types";

export interface ColumnPreset {
    name: string;
    matches: RegExp;
    prompt: string;
    format: ColumnFormat;
    tags?: string[];
}

export const PROMPT_PRESETS: ColumnPreset[] = [
    {
        name: "Taraflar",
        matches: /\btaraf(lar)?\b|\bpart(y|ies)\b/i,
        format: "bulleted_list",
        prompt: 'Bu sözleşmenin tüm taraflarını listele. Her taraf için tam ticaret unvanını/ad-soyadını, kuruluş türünü ve tanımlı rolünü belirt, örn.:\n• ABC Anonim Şirketi ("Şirket")\n• Ahmet Yılmaz ("Pay Sahibi")\nHer madde işaretine bir taraf. Ek açıklama yapma.',
    },
    {
        name: "Uygulanacak Hukuk",
        matches: /\buygulanacak hukuk\b|\byetkili hukuk\b|\bhukuk se[çc]imi\b|\bgoverning law\b|\bjurisdiction\b/i,
        format: "text",
        prompt: 'Yalnızca bu sözleşmeye uygulanacak hukuku kısa biçimde belirt, örn. "Türk Hukuku", "İngiliz Hukuku", "Alman Hukuku". Başka metin yazma.',
    },
    {
        name: "Yürürlük Tarihi",
        matches: /\by[üu]r[üu]rl[üu]k tarihi\b|\by[üu]r[üu]rl[üu]k\b|\beffective date\b/i,
        format: "date",
        prompt: 'Yalnızca bu sözleşmenin yürürlük tarihini GG Ay YYYY biçiminde belirt, örn. "2 Oca 2026". Açıkça belirtilmemişse "Belirtilmemiş" yaz.',
    },
    {
        name: "Süre",
        matches: /\bs[üu]re\b|\bvade\b|\bterm\b|\bduration\b/i,
        format: "text",
        prompt: 'Yalnızca bu sözleşmenin süresini/vadesini kısa biçimde belirt, örn. "3 yıl", "24 ay", "süresiz". Başka metin yazma.',
    },
    {
        name: "Fesih",
        matches: /\bfesih\b|\bsona er(me|en)\b|\bterminat(e|ion|ing)\b/i,
        format: "text",
        prompt: "Fesih hükümlerini çıkar. Kimin feshedebileceğini, tetikleyici halleri, gereken ihbar süresini, varsa düzeltme süresini ve feshin temel sonuçlarını belirt. Öz ol.",
    },
    {
        name: "Kontrol Değişikliği",
        matches: /\bkontrol de[ğg]i[şs]ikli[ğg]i\b|\bchange of control\b/i,
        format: "text",
        prompt: "Varsa kontrol değişikliği hükümlerini belirle. Tetikleyici halleri, sonuçlarını, onay gerekliliklerini ve ilgili fesih veya muacceliyet haklarını özetle. Öz ol.",
    },
    {
        name: "Gizlilik",
        matches: /\bgizlilik\b|\bif[şs]a etmeme\b|\bconfidential(ity)?\b|\bnon-?disclosure\b/i,
        format: "text",
        prompt: "Gizlilik yükümlülüklerini özetle: gizli bilgilerin kapsamı, izin verilen ifşalar, kullanım kısıtlamaları, süre ve temel istisnalar.",
    },
    {
        name: "Devir/Temlik",
        matches: /\bdevir\b|\btemlik\b|\bassign(ment|ability)?\b/i,
        format: "yes_no",
        prompt: "Bu sözleşmenin devri, diğer tarafın onayı olmadan mümkün mü?",
    },
    {
        name: "Ödeme ve Ücretler",
        matches: /\b[öo]deme\b|\b[üu]cret(ler)?\b|\bbedel\b|\bpayment\b|\bfees?\b/i,
        format: "text",
        prompt: 'Temel ödeme yükümlülüklerini öz biçimde belirt: tutar, zamanlama ve para birimi, örn. "Fatura tarihinden itibaren 30 gün içinde ödenecek 10.000 TL". Varsa temerrüt (gecikme) sonuçlarını da not et.',
    },
    {
        name: "Değişiklik/Tadil",
        matches: /\bde[ğg]i[şs]iklik\b|\btadil\b|\bamendment\b|\bvariation\b/i,
        format: "text",
        prompt: "Değişiklik (tadil) hükümlerini özetle: değişikliklerin nasıl yapılabileceği, kimin onayının gerektiği ve yazılı şekil veya imza gibi şekil şartları.",
    },
    {
        name: "Tazminat",
        matches: /\btazminat\b|\bindemni(ty|ties|fication)\b/i,
        format: "text",
        prompt: "Tazminat hükümlerini özetle: kimin kimi tazmin ettiği, tazmin edilen zararların kapsamı, varsa sorumluluk üst sınırları veya istisnalar ve temel talep prosedürleri.",
    },
    {
        name: "Beyan ve Taahhütler",
        matches: /\bbeyan\b|\btaahh[üu]t\b|\bgaranti\b|\bwarrant(y|ies|ing)\b|\brepresentations?\b/i,
        format: "text",
        prompt: "Taraflarca verilen temel beyan ve taahhütleri belirle ve açıkla; bu güvencelerin kapsamı ile bunlara uygulanan özel süre veya koşulları da dahil et. Özellikle standart dışı taahhütleri vurgula.",
    },
    {
        name: "Mücbir Sebep",
        matches: /\bm[üu]cbir sebep\b|\bforce majeure\b/i,
        format: "yes_no",
        prompt: "Bu sözleşme bir mücbir sebep hükmü içeriyor mu?",
    },
];

export function getPresetConfig(
    title: string,
): Pick<ColumnPreset, "prompt" | "format" | "tags"> | null {
    const trimmed = title.trim();
    if (!trimmed) return null;
    const preset = PROMPT_PRESETS.find(({ matches }) => matches.test(trimmed));
    if (!preset) return null;
    return { prompt: preset.prompt, format: preset.format, tags: preset.tags };
}

export function getPresetPrompt(title: string): string | null {
    return getPresetConfig(title)?.prompt ?? null;
}
