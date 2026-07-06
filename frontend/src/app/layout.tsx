import type { Metadata } from "next";
import { Inter, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin", "latin-ext"],
});

const ebGaramond = EB_Garamond({
    variable: "--font-eb-garamond",
    subsets: ["latin", "latin-ext"],
    weight: ["400", "500", "600", "700"],
});

// TODO: gerçek üretim domaininizi NEXT_PUBLIC_SITE_URL ortam değişkenine
// atayın; atanmazsa example.com yer tutucusuna düşer.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "RapidAct - Yapay Zekâ Destekli Hukuk Platformu",
    description:
        "Yapay zekâ destekli hukuki belge analizi ve sözleşme inceleme platformu.",
    icons: {
        icon: [
            { url: "/icon.svg", type: "image/svg+xml" },
            { url: "/favicon.ico" },
        ],
        apple: "/apple-touch-icon.png",
    },
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: "RapidAct",
        title: "RapidAct - Yapay Zekâ Destekli Hukuk Platformu",
        description:
            "Yapay zekâ destekli hukuki belge analizi ve sözleşme inceleme platformu.",
        images: [
            {
                url: "/link-image.jpg",
                width: 1200,
                height: 651,
                alt: "RapidAct",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "RapidAct - Yapay Zekâ Destekli Hukuk Platformu",
        description:
            "Yapay zekâ destekli hukuki belge analizi ve sözleşme inceleme platformu.",
        images: ["/link-image.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body
                className={`${inter.variable} ${ebGaramond.variable} font-sans antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
