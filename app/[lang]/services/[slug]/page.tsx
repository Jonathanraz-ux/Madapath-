import type { Metadata } from "next";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Footer, Header, WhatsAppButton } from "@/components/SiteChrome";
import {
  services,
  slugs,
  images,
  copy,
  type Lang,
  type ServiceSlug,
  SITE_URL,
  PHONE,
  EMAIL,
  TEL_LINK,
  WHATSAPP_LINK,
  WHATSAPP_MSG_FR,
  WHATSAPP_MSG_EN,
  PHONE_DISPLAY,
} from "@/lib/madapath";

const faqIndex: Record<Lang, number[]> = {
  fr: [0, 1, 2, 3, 4],
  en: [0, 1, 2, 3, 4],
};

export function generateStaticParams() {
  return ["fr", "en"].flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (
    (lang !== "fr" && lang !== "en") ||
    !slugs.includes(slug as ServiceSlug)
  )
    return {};
  const s = services[slug as ServiceSlug][lang as Lang];
  const url = `${SITE_URL}/${lang}/services/${slug}`;
  const fr = lang === "fr";
  const titles: Record<ServiceSlug, { fr: string; en: string }> = {
    travailleur: {
      fr: "Travailler \u00e0 Madagascar | MadaPath",
      en: "Work in Madagascar | MadaPath",
    },
    famille: {
      fr: "Regroupement familial \u00e0 Madagascar | MadaPath",
      en: "Family Reunification in Madagascar | MadaPath",
    },
    investisseur: {
      fr: "Investir \u00e0 Madagascar | MadaPath",
      en: "Invest in Madagascar | MadaPath",
    },
  };
  const descriptions: Record<ServiceSlug, { fr: string; en: string }> = {
    travailleur: {
      fr: "Pr\u00e9parez vos d\u00e9marches pour travailler l\u00e9galement \u00e0 Madagascar. MadaPath vous accompagne dans vos formalit\u00e9s administratives.",
      en: "Prepare your procedures to work legally in Madagascar. MadaPath supports you with your administrative formalities.",
    },
    famille: {
      fr: "R\u00e9unissez votre famille \u00e0 Madagascar. MadaPath accompagne les couples et familles dans leurs d\u00e9marches de regroupement familial.",
      en: "Bring your family together in Madagascar. MadaPath assists couples and families with family reunification procedures.",
    },
    investisseur: {
      fr: "Investissez et cr\u00e9ez votre activit\u00e9 \u00e0 Madagascar. MadaPath accompagne les entrepreneurs dans leurs d\u00e9marches d\u2019implantation.",
      en: "Invest and start your business in Madagascar. MadaPath supports entrepreneurs with their setup procedures.",
    },
  };
  return {
    title: titles[slug as ServiceSlug][lang as Lang],
    description: descriptions[slug as ServiceSlug][lang as Lang],
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/services/${slug}`,
        en: `${SITE_URL}/en/services/${slug}`,
      },
    },
    openGraph: {
      title: titles[slug as ServiceSlug][lang as Lang],
      description: s.short,
      url,
      siteName: "MadaPath",
      locale: fr ? "fr_FR" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}${images[slug as ServiceSlug].src}`,
          width: 1200,
          height: 630,
          alt: images[slug as ServiceSlug].alt[lang as Lang],
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[slug as ServiceSlug][lang as Lang],
      description: s.short,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: rawLang, slug: rawSlug } = await params;
  if (rawLang !== "fr" && rawLang !== "en") notFound();
  if (rawSlug === "retraite" || rawSlug === "retiree") {
    redirect(`/${rawLang}/services`);
  }
  if (!slugs.includes(rawSlug as ServiceSlug)) notFound();
  const lang = rawLang as Lang;
  const slug = rawSlug as ServiceSlug;
  const s = services[slug][lang];
  const fr = lang === "fr";
  const img = images[slug];
  const c = copy[lang];
  const waMsg = fr ? WHATSAPP_MSG_FR : WHATSAPP_MSG_EN;

  const selectedFaq = faqIndex[lang].map((i) => c.faq[i]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "MadaPath",
        url: `${SITE_URL}/${lang}`,
        email: EMAIL,
        telephone: PHONE,
        areaServed: "Madagascar",
        availableLanguage: ["fr", "en"],
      },
      {
        "@type": "Service",
        name: s.name,
        description: s.short,
        provider: { "@type": "ProfessionalService", name: "MadaPath" },
        areaServed: "Madagascar",
        url: `${SITE_URL}/${lang}/services/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "MadaPath", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: s.name, item: `${SITE_URL}/${lang}/services/${slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="site-shell">
        <Header lang={lang} />
        <main>
          <section className="service-hero">
            <div className="container">
              <span className="eyebrow">{s.name}</span>
              <h1>{s.title}</h1>
              <p className="lead">{s.intro}</p>
            </div>
          </section>
          <section className="section">
            <div className="container content-grid">
              <article className="content-copy">
                <Image
                  src={img.src}
                  alt={img.alt[lang]}
                  width={1200}
                  height={630}
                  className="service-hero-img"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 900px) 100vw, 800px"
                />
                <h2>{fr ? "Ce que MadaPath fait pour vous" : "What MadaPath handles for you"}</h2>
                <p>
                  {fr
                    ? "Nous commen\u00e7ons par comprendre votre situation, puis nous constituons le dossier et effectuons les proc\u00e9dures r\u00e9alisables \u00e0 votre place. Vous \u00eates sollicit\u00e9 pour fournir les pi\u00e8ces, signer lorsque n\u00e9cessaire et vous pr\u00e9senter uniquement aux \u00e9tapes o\u00f9 l\u2019administration exige votre pr\u00e9sence."
                    : "We first assess your situation, then build the file and handle every procedure that can legally be completed on your behalf. You provide documents, sign where required and attend only the steps where authorities require your presence."}
                </p>
                <ul className="checklist">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h2 style={{ marginTop: 50 }}>
                  {fr ? "Une prise en charge r\u00e9elle, sans fausse promesse" : "Real handling, without false promises"}
                </h2>
                <p>
                  {fr
                    ? "MadaPath pr\u00e9pare, d\u00e9pose et suit les d\u00e9marches dans les limites autoris\u00e9es. La d\u00e9cision finale et les d\u00e9lais restent du ressort des administrations comp\u00e9tentes."
                    : "MadaPath prepares, submits and follows procedures within the authorised limits. Final decisions and processing times remain with the competent authorities."}
                </p>
              </article>
              <aside className="sidebox">
                <h3>{fr ? "Vous n\u2019\u00eates plus seul face aux d\u00e9marches" : "You are no longer handling it alone"}</h3>
                <p>
                  {fr
                    ? "Apr\u00e8s le pr\u00e9-diagnostic, nous d\u00e9terminons ce que MadaPath peut effectuer pour vous et les rares \u00e9tapes o\u00f9 votre pr\u00e9sence sera obligatoire."
                    : "After the pre-assessment, we identify what MadaPath can handle for you and the rare steps where your presence will be required."}
                </p>
                <a className="sidebox-cta" href={`/${lang}/contact`}>
                  {fr ? "\u00c9valuer ma situation" : "Assess My Situation"}
                </a>
                <a
                  className="button secondary sidebox-cta-wa"
                  href={`${WHATSAPP_LINK}${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a className="sidebox-phone" href={TEL_LINK}>
                  {PHONE_DISPLAY}
                </a>
              </aside>
            </div>
          </section>
          <section className="section sage" id="faq">
            <div className="container">
              <div className="section-head">
                <div>
                  <span className="eyebrow">{fr ? "FAQ" : "FAQ"}</span>
                  <h2>{c.faqTitle}</h2>
                </div>
              </div>
              <div className="faq-list">
                {selectedFaq.map((item) => (
                  <details className="faq-item" key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer lang={lang} />
        <WhatsAppButton lang={lang} />
      </div>
    </>
  );
}
