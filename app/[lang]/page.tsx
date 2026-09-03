import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Diagnostic } from "@/components/Diagnostic";
import { Footer, Header } from "@/components/SiteChrome";
import { copy, services, slugs, type Lang } from "@/lib/madapath";
export function generateStaticParams() { return [{ lang: "fr" }, { lang: "en" }]; }
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> { const { lang } = await params; return lang === "en" ? { title: "Immigration & administrative support in Madagascar", description: "Clear, human support for visas, residency, work permits and settling in Madagascar." } : { title: "Visa, résidence et démarches à Madagascar", description: "Accompagnement clair pour votre visa, résidence, autorisation d’emploi et installation à Madagascar." }; }
export default async function LangHome({ params }: { params: Promise<{ lang: string }> }) {
  const raw = (await params).lang; if (raw !== "fr" && raw !== "en") notFound(); const lang = raw as Lang; const c = copy[lang];
  return <div className="site-shell"><Header lang={lang} /><main>
    <section className="hero"><div className="container hero-grid"><div><span className="eyebrow">{c.eyebrow}</span><h1>{c.title}</h1><p className="lead">{c.lead}</p><div className="actions"><a className="button" href="#diagnostic">{c.primary}</a><a className="button secondary" href="#services">{c.secondary}</a></div><div className="trust">{c.trust.map(x => <span key={x}>{x}</span>)}</div></div><aside className="path-card"><h2>{c.cardTitle}</h2><p>{c.cardText}</p><div className="mini-steps">{c.steps.map((x, i) => <div className="mini-step" key={x}><b>{i + 1}</b><span>{x}</span></div>)}</div></aside></div></section>
    <section className="section sage" id="services"><div className="container"><div className="section-head"><div><span className="eyebrow">{c.servicesEyebrow}</span><h2>{c.servicesTitle}</h2></div><p className="section-intro">{c.servicesIntro}</p></div><div className="services">{slugs.map(slug => { const s = services[slug][lang]; return <a className="service-card" href={`/${lang}/services/${slug}`} key={slug}><span className="service-icon">{services[slug].icon}</span><h3>{s.name}</h3><p>{s.short}</p><span className="more">{c.learn}</span></a>; })}</div></div></section>
    <section className="section" id="method"><div className="container method"><div><span className="eyebrow">{c.methodEyebrow}</span><h2>{c.methodTitle}</h2><p className="section-intro">{c.methodIntro}</p></div><div className="method-list">{c.method.map((x, i) => <div className="method-item" key={x[0]}><b>0{i + 1}</b><div><h3>{x[0]}</h3><p>{x[1]}</p></div></div>)}</div></div></section>
    <section className="section" id="diagnostic"><div className="container diagnostic"><div><span className="eyebrow" style={{ color: "#fff" }}>{c.diagEyebrow}</span><h2>{c.diagTitle}</h2><p>{c.diagText}</p></div><Diagnostic lang={lang} question={c.diagQuestion} button={c.diagButton} prefix={c.resultPrefix} /></div></section>
  </main><Footer lang={lang} /></div>;
}
