import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer, Header } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
import { copy, type Lang, SITE_URL } from "@/lib/madapath";

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "fr" && lang !== "en") return {};
  const c = copy[lang as Lang];
  return {
    title: lang === "fr" ? "Contact" : "Contact",
    description:
      lang === "fr"
        ? "Contactez MadaPath pour toute question relative \u00e0 vos d\u00e9marches \u00e0 Madagascar."
        : "Contact MadaPath for any questions about your administrative procedures in Madagascar.",
    alternates: {
      canonical: `${SITE_URL}/${lang}/contact`,
      languages: {
        fr: `${SITE_URL}/fr/contact`,
        en: `${SITE_URL}/en/contact`,
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url: `${SITE_URL}/${lang}/contact`,
      siteName: "MadaPath",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const raw = (await params).lang;
  if (raw !== "fr" && raw !== "en") notFound();
  const lang = raw as Lang;
  const c = copy[lang];

  return (
    <div className="site-shell">
      <Header lang={lang} />
      <main>
        <section className="service-hero">
          <div className="container">
            <span className="eyebrow">{c.contactEyebrow}</span>
            <h1>{c.contactTitle}</h1>
            <p className="lead">{c.contactIntro}</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <ContactForm lang={lang} />
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
}
