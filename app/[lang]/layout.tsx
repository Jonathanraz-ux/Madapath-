import type { Metadata } from "next";
import "../globals.css";
import { SITE_URL } from "@/lib/madapath";

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
    icons: { icon: "/favicon.svg" },
    metadataBase: new URL(SITE_URL),
    alternates: {
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/fr`,
      },
    },
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
    <html lang={htmlLang}>
      <body>{children}</body>
    </html>
  );
}
