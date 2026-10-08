import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Briefcase,
  Clock,
  Compass,
  FileCheck,
  HeartHandshake,
  Home,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Diagnostic } from "@/components/Diagnostic";
import { Footer, Header, WhatsAppButton } from "@/components/SiteChrome";
import PricingSection from "@/components/PricingSection";
import {
  copy,
  services,
  slugs,
  images,
  longSejourImage,
  type Lang,
  type ServiceSlug,
  SITE_URL,
  PHONE,
  EMAIL,
  WHATSAPP_LINK,
} from "@/lib/madapath";

const serviceIcons: Record<ServiceSlug, typeof Briefcase> = {
  travailleur: Briefcase,
  famille: HeartHandshake,
  investisseur: TrendingUp,
  visa_long_sejour: Home,
};

const trustIcons = [ShieldCheck, Clock, Compass, FileCheck];

const serviceTags: Record<ServiceSlug, Record<Lang, string>> = {
  travailleur: { fr: "Travail & affaires", en: "Work & business" },
  famille: { fr: "Famille", en: "Family" },
  investisseur: { fr: "Investissement", en: "Investment" },
  visa_long_sejour: { fr: "Long séjour", en: "Long stay" },
};

const longSejourTag: Record<Lang, string> = {
  fr: "Long séjour",
  en: "Long stay",
};

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
  const url = `${SITE_URL}/${lang}`;
  return {
    title: c.ogTitle,
    description: c.ogDescription,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      title: c.ogTitle,
      description: c.ogDescription,
      url,
      siteName: "MadaPath",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
      images: [{ url: `${SITE_URL}/images/og.webp`, width: 1200, height: 630, alt: "MadaPath" }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.ogTitle,
      description: c.ogDescription,
      images: [`${SITE_URL}/images/og.webp`],
    },
  };
}

export default async function LangHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const raw = (await params).lang;
  if (raw !== "fr" && raw !== "en") notFound();
  const lang = raw as Lang;
  const c = copy[lang];
  const fr = lang === "fr";

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
        sameAs: [],
        serviceType: fr
          ? "Accompagnement administratif à Madagascar"
          : "Administrative assistance in Madagascar",
        makesOffer: [
          ...slugs
            .filter((slug) => slug !== "visa_long_sejour")
            .map((slug) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: services[slug][lang].name,
                description: services[slug][lang].short,
              },
            })),
          {
            "@type": "Offer",
            price: "2000000",
            priceCurrency: "MGA",
            itemOffered: {
              "@type": "Service",
              name: c.longSejour.name,
              description: c.longSejour.short,
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        name: "MadaPath",
        url: `${SITE_URL}/${lang}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "MadaPath",
            item: `${SITE_URL}/${lang}`,
          },
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
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <span className="eyebrow">{c.eyebrow}</span>
                <h1>{c.title}</h1>
                <p className="lead">{c.lead}</p>
                <div className="actions">
                  <a className="button" href={`/${lang}/contact`}>
                    {fr ? "Contacter MadaPath" : "Contact MadaPath"}
                  </a>
                  <a className="button secondary" href={`/${lang}#services`}>
                    {c.secondary}
                  </a>
                </div>
                <div className="trust">
                  {c.trust.map((x, i) => {
                    const Icon = trustIcons[i % trustIcons.length];
                    return (
                      <span key={x}>
                        <Icon size={15} strokeWidth={2.2} aria-hidden="true" />
                        {x}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="hero-media">
                <Image
                  src="/images/hero.webp"
                  alt={
                    fr
                      ? "Vue moderne d’Antananarivo, accueil international et installation à Madagascar"
                      : "Modern view of Antananarivo and international relocation to Madagascar"
                  }
                  width={640}
                  height={480}
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 900px) 100vw, 480px"
                  className="hero-img"
                />
                <div className="hero-badge hero-badge-a">
                  <span className="hero-badge-icon">
                    <ShieldCheck size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>
                      {fr ? "100% conformité légale" : "100% legal compliance"}
                    </strong>
                    <small>
                      {fr ? "et ministérielle" : "and ministerial"}
                    </small>
                  </span>
                </div>
                <div className="hero-badge hero-badge-b">
                  <span className="hero-badge-icon">
                    <Clock size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <strong>
                      {fr ? "Réponse sous 24h" : "Reply within 24h"}
                    </strong>
                    <small>{fr ? "& suivi WhatsApp" : "& WhatsApp follow-up"}</small>
                  </span>
                </div>
              </div>
            </div>
            <div className="container">
              <aside className="path-card">
                <h2>{c.cardTitle}</h2>
                <p>{c.cardText}</p>
                <div className="mini-steps">
                  {c.steps.map((x, i) => (
                    <div className="mini-step" key={x}>
                      <b>{i + 1}</b>
                      <span>{x}</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section className="section sage" id="services">
            <div className="container">
              <div className="section-head">
                <div>
                  <span className="eyebrow">{c.servicesEyebrow}</span>
                  <h2>{c.servicesTitle}</h2>
                </div>
                <p className="section-intro">{c.servicesIntro}</p>
              </div>
              <div className="services services-4">
                {slugs
                  .filter((slug) => slug !== "visa_long_sejour")
                  .map((slug) => {
                    const s = services[slug][lang];
                    const img = images[slug];
                    return (
                      <article className="service-card" key={slug}>
                        <div className="service-img-wrap">
                          <Image
                            src={img.src}
                            alt={img.alt[lang]}
                            width={400}
                            height={240}
                            loading="lazy"
                            sizes="(max-width: 900px) 100vw, 33vw"
                            className="service-img"
                          />
                          <span className="service-tag">{serviceTags[slug][lang]}</span>
                        </div>
                        <span className="service-icon">
                          {(() => {
                            const Icon = serviceIcons[slug];
                            return <Icon size={22} strokeWidth={2} aria-hidden="true" />;
                          })()}
                        </span>
                        <h3>{s.name}</h3>
                        <p>{s.short}</p>
                        <a className="more" href={`/${lang}/services/${slug}`}>
                          {c.learn}
                          <ArrowRight className="more-arrow" size={15} aria-hidden="true" />
                        </a>
                      </article>
                    );
                  })}
                <article className="service-card">
                  <div className="service-img-wrap">
                    <Image
                      src={longSejourImage.src}
                      alt={longSejourImage.alt[lang]}
                      width={400}
                      height={240}
                      loading="lazy"
                      sizes="(max-width: 900px) 100vw, 25vw"
                      className="service-img"
                    />
                    <span className="service-tag">{longSejourTag[lang]}</span>
                  </div>
                  <span className="service-icon">
                    <Home size={22} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3>{c.longSejour.name}</h3>
                  <p>{c.longSejour.short}</p>
                  <p className="pricing-analysis-note">{c.longSejour.precision}</p>
                  <a className="more" href={`/${lang}/services/visa_long_sejour`}>
                    {c.learn}
                    <ArrowRight className="more-arrow" size={15} aria-hidden="true" />
                  </a>
                  <a
                    className="pricing-cta"
                    href={`${WHATSAPP_LINK}${encodeURIComponent(c.longSejour.waMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {c.longSejour.cta}
                  </a>
                </article>
              </div>
            </div>
          </section>

          <PricingSection lang={lang} />

          <section className="section" id="method">
            <div className="container method">
              <div>
                <span className="eyebrow">{c.methodEyebrow}</span>
                <h2>{c.methodTitle}</h2>
                <p className="section-intro">{c.methodIntro}</p>
              </div>
              <div className="method-list">
                {c.method.map((x, i) => (
                  <div className="method-item" key={x[0]}>
                    <b>0{i + 1}</b>
                    <div>
                      <h3>{x[0]}</h3>
                      <p>{x[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                {c.faq.map((item) => (
                  <details className="faq-item" key={item.q}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="section" id="diagnostic">
            <div className="container diagnostic">
              <div>
                <span
                  className="eyebrow"
                  style={{ color: "#fff" }}
                >
                  {c.diagEyebrow}
                </span>
                <h2>{c.diagTitle}</h2>
                <p>{c.diagText}</p>
              </div>
              <Diagnostic
                lang={lang}
                question={c.diagQuestion}
                button={c.diagButton}
                prefix={c.resultPrefix}
              />
            </div>
          </section>
        </main>
        <Footer lang={lang} />
        <WhatsAppButton lang={lang} />
      </div>
    </>
  );
}
