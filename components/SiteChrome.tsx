"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  copy,
  PHONE_DISPLAY,
  TEL_LINK,
  EMAIL,
  WHATSAPP_LINK,
  WHATSAPP_MSG_FR,
  WHATSAPP_MSG_EN,
  type Lang,
} from "@/lib/madapath";

function closeMobileNav() {
  const nav = document.querySelector(".mobile-nav-overlay") as HTMLElement | null;
  if (nav) {
    nav.classList.remove("open");
    document.body.style.overflow = "";
    const btn = document.querySelector(".mobile-menu-btn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }
}

function toggleMobileNav() {
  const nav = document.querySelector(".mobile-nav-overlay") as HTMLElement | null;
  if (nav) {
    const isOpen = nav.classList.toggle("open");
    document.body.style.overflow = isOpen ? "hidden" : "";
    const btn = document.querySelector(".mobile-menu-btn");
    if (btn) btn.setAttribute("aria-expanded", String(isOpen));
  }
}

function langVersionHref(pathname: string, target: Lang): string {
  const [, , ...restParts] = pathname.split("/");
  const rest = restParts.length > 0 ? `/${restParts.join("/")}` : "";
  return `/${target}${rest}`;
}

function otherLangHref(pathname: string, current: Lang): string {
  const others: Record<Lang, Lang> = { fr: "en", en: "fr" };
  return langVersionHref(pathname, others[current]);
}

export function Header({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const other: Lang = lang === "fr" ? "en" : "fr";
  const pathname = usePathname();
  const switchHref = otherLangHref(pathname, lang);

  return (
    <>
      <div className="topbar">
        <span>{c.top}</span>
      </div>
      <header className="container nav">
        <Link className="brand" href={`/${lang}`}>
          <span className="brand-mark">
            <span>M</span>
          </span>
          MadaPath
        </Link>
        <nav className="nav-links" role="navigation" aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}>
          <a href={`/${lang}#services`}>{c.nav.services}</a>
          <a href={`/${lang}#method`}>{c.nav.method}</a>
          <a href={`/${lang}/contact`}>{c.nav.contact}</a>
          <a
            className="lang"
            href={switchHref}
            hrefLang={other}
            aria-label={lang === "fr" ? "Switch to English" : "Passer au fran\u00e7ais"}
          >
            {other.toUpperCase()}
          </a>
          <a className="nav-cta" href={`/${lang}#diagnostic`}>
            {c.nav.cta}
          </a>
        </nav>
        <button
          className="mobile-menu-btn"
          aria-label={lang === "fr" ? "Ouvrir le menu" : "Open menu"}
          aria-expanded="false"
          onClick={toggleMobileNav}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <div className="mobile-nav-overlay" role="dialog" aria-label={lang === "fr" ? "Menu de navigation" : "Navigation menu"}>
        <nav className="mobile-nav-inner">
          <a href={`/${lang}#services`} onClick={closeMobileNav}>{c.nav.services}</a>
          <a href={`/${lang}#method`} onClick={closeMobileNav}>{c.nav.method}</a>
          <a href={`/${lang}/contact`} onClick={closeMobileNav}>{c.nav.contact}</a>
          <a href={`/${lang}#diagnostic`} className="nav-cta" onClick={closeMobileNav}>{c.nav.cta}</a>
          <a
            className="lang"
            href={switchHref}
            hrefLang={other}
            onClick={closeMobileNav}
          >
            {other.toUpperCase()}
          </a>
          <div className="mobile-nav-contacts">
            <a href={TEL_LINK}>{PHONE_DISPLAY}</a>
            <a href={`${WHATSAPP_LINK}${lang === "fr" ? WHATSAPP_MSG_FR : WHATSAPP_MSG_EN}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </nav>
      </div>
    </>
  );
}


export function Footer({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const waMsg = lang === "fr" ? WHATSAPP_MSG_FR : WHATSAPP_MSG_EN;
  const pathname = usePathname();
  const frHref = otherLangHref(pathname, "en"); // -> /fr + rest
  const enHref = otherLangHref(pathname, "fr"); // -> /en + rest

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand">
              <span className="brand-mark">
                <span>M</span>
              </span>
              MadaPath
            </div>
            <p>{c.footerText}</p>
            <div className="footer-contacts">
              <a href={TEL_LINK}>{PHONE_DISPLAY}</a>
              <a
                href={`${WHATSAPP_LINK}${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
          <div>
            <h4>{c.footerNav}</h4>
            <p>
              <a href={`/${lang}#services`}>{c.nav.services}</a>
              <br />
              <a href={`/${lang}#method`}>{c.nav.method}</a>
              <br />
              <a href={`/${lang}/contact`}>{c.nav.contact}</a>
              <br />
              <a href={`/${lang}#diagnostic`}>{c.nav.cta}</a>
            </p>
          </div>
          <div>
            <h4>{c.footerLegal}</h4>
            <p>
              Antananarivo, Madagascar
              <br />
              <Link href={frHref} hrefLang="fr">Fran\u00e7ais</Link>{" \u00b7 "}
              <Link href={enHref} hrefLang="en">English</Link>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} MadaPath</span>
          <span>{c.legal}</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppButton({ lang }: { lang: Lang }) {
  const waMsg = lang === "fr" ? WHATSAPP_MSG_FR : WHATSAPP_MSG_EN;
  const label = lang === "fr" ? "Contacter MadaPath sur WhatsApp" : "Contact MadaPath on WhatsApp";

  return (
    <a
      href={`${WHATSAPP_LINK}${waMsg}`}
      className="whatsapp-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
