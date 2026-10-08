import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { SITE_URL } from "@/lib/madapath";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const IS_PREVIEW = process.env.VERCEL_ENV === "preview";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) ?? {};
  if (lang !== "fr" && lang !== "en") return {};
  const fr = lang === "fr";
  return {
    title: {
      default: fr
        ? "MadaPath | Travailler, investir et s’installer à Madagascar"
        : "MadaPath | Work, Invest and Relocate to Madagascar",
      template: "%s",
    },
    description: fr
      ? "MadaPath vous accompagne dans vos démarches pour travailler, investir ou rejoindre votre famille à Madagascar. Assistance administrative personnalisée."
      : "MadaPath assists professionals, investors and families with administrative procedures for working, investing and relocating to Madagascar.",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/fr`,
      },
    },
    robots: {
      index: !IS_PREVIEW,
      follow: true,
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = (await params) ?? {};
  const htmlLang = lang === "en" ? "en" : "fr";
  return (
    <html lang={htmlLang} className={`${outfit.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
