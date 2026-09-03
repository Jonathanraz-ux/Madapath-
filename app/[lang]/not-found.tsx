import { Footer, Header } from "@/components/SiteChrome";
import { type Lang } from "@/lib/madapath";

export default async function NotFoundPage({
  params,
}: {
  params?: Promise<{ lang: string }>;
}) {
  const resolvedParams = params ? await params : ({ lang: undefined } as { lang?: string });
  const lang = resolvedParams.lang;
  const resolved: Lang = lang === "en" ? "en" : "fr";
  const fr = resolved === "fr";

  return (
    <div className="site-shell">
      <Header lang={resolved} />
      <main className="notfound">
        <div className="container">
          <span className="eyebrow">404</span>
          <h1>{fr ? "Cette page n\u2019existe pas" : "This page doesn\u2019t exist"}</h1>
          <p className="lead">
            {fr
              ? "La page que vous cherchez est introuvable ou a \u00e9t\u00e9 d\u00e9plac\u00e9e. Retournez \u00e0 l\u2019accueil pour poursuivre."
              : "The page you are looking for could not be found or may have moved. Return to the homepage to continue."}
          </p>
          <div className="actions">
            <a className="button" href={`/${resolved}`}>{fr ? "Retour \u00e0 l\u2019accueil" : "Back to homepage"}</a>
            <a className="button secondary" href={`/${resolved}/contact`}>
              {fr ? "Contacter MadaPath" : "Contact MadaPath"}
            </a>
          </div>
        </div>
      </main>
      <Footer lang={resolved} />
    </div>
  );
}
