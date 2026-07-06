export const PRACTICE_OPTIONS = [
    "Genel İşlemler",
    "Şirketler Hukuku",
    "Finans",
    "Dava",
    "Gayrimenkul",
    "Vergi",
    "İş Hukuku",
    "Fikri Mülkiyet",
    "Rekabet",
    "Teknoloji İşlemleri",
    "Proje Finansmanı",
    "Girişim Sermayesi",
    "Özel Sermaye",
    "Özel Kredi",
    "Sermaye Piyasası Hukuku",
    "Kaldıraçlı Finansman",
    "Tahkim",
    "Diğer",
] as const;

export type Practice = (typeof PRACTICE_OPTIONS)[number];
