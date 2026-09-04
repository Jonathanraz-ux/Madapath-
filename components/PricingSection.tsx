"use client";

import { useState, useId, useCallback } from "react";
import { copy, type Lang } from "@/lib/madapath";
import {
  SERVICE_FEES_EUR,
  FALLBACK_RATES,
  convertPrice,
  type Currency,
} from "@/lib/pricing";

type PricingSlug = "visa_transformable" | "regroupement_familial" | "visa_investisseur";

interface CardData {
  slug: PricingSlug;
  popular?: boolean;
  basePrice: number;
  extraLabel?: string;
  extraPrice?: number;
  needsAnalysis?: boolean;
}

const cards: CardData[] = [
  { slug: "visa_transformable", basePrice: SERVICE_FEES_EUR.visa_transformable },
  {
    slug: "regroupement_familial",
    basePrice: SERVICE_FEES_EUR.regroupement_familial_base,
    extraLabel: "extraPerson",
    extraPrice: SERVICE_FEES_EUR.regroupement_familial_extra,
    popular: true,
  },
  {
    slug: "visa_investisseur",
    basePrice: SERVICE_FEES_EUR.visa_investisseur,
    needsAnalysis: true,
  },
];

const serviceLabels: Record<PricingSlug, { fr: string; en: string }> = {
  visa_transformable: { fr: "Visa transformable", en: "Transformable Visa" },
  regroupement_familial: {
    fr: "Regroupement familial",
    en: "Family Reunification",
  },
  visa_investisseur: { fr: "Visa investisseur", en: "Investor Visa" },
};

const serviceDescriptions: Record<PricingSlug, { fr: string; en: string }> = {
  visa_transformable: {
    fr: "Accompagnement pour la demande de visa transformable, de l'évaluation initiale au suivi administratif.",
    en: "Assistance with the transformable visa application, from initial assessment to administrative follow-up.",
  },
  regroupement_familial: {
    fr: "Accompagnement pour le regroupement familial, les pièces d'état civil et l'installation de vos proches à Madagascar.",
    en: "Assistance with family reunification, civil-status documents and settling relatives in Madagascar.",
  },
  visa_investisseur: {
    fr: "Accompagnement pour le visa investisseur lorsque la société ou la structure d'investissement nécessaire existe déjà.",
    en: "Assistance with the investor visa when the required company or investment structure already exists.",
  },
};

const includedItems: Record<PricingSlug, { fr: string[]; en: string[] }> = {
  visa_transformable: {
    fr: [
      "Évaluation initiale de l'éligibilité",
      "Liste personnalisée des documents",
      "Contrôle de la cohérence et de la complétude du dossier",
      "Organisation des pièces",
      "Assistance dans la préparation de la demande",
      "Coordination avec la représentation ou l'organisme compétent",
      "Suivi administratif jusqu'à l'obtention d'une réponse",
      "Préparation du client aux étapes nécessitant sa présence",
    ],
    en: [
      "Initial eligibility assessment",
      "Personalized document checklist",
      "Consistency and completeness review",
      "Organization of supporting documents",
      "Assistance with application preparation",
      "Coordination with the competent diplomatic mission or authority",
      "Administrative follow-up until a response is issued",
      "Preparation for steps requiring the applicant's personal attendance",
    ],
  },
  regroupement_familial: {
    fr: [
      "Analyse de la situation familiale",
      "Vérification des conditions applicables",
      "Liste personnalisée des pièces",
      "Contrôle des actes de mariage et de naissance",
      "Contrôle des documents d'hébergement et de prise en charge",
      "Organisation et préparation du dossier",
      "Assistance au dépôt lorsque cela est autorisé",
      "Suivi administratif",
      "Préparation du demandeur aux rendez-vous obligatoires",
    ],
    en: [
      "Assessment of the family situation",
      "Review of applicable eligibility conditions",
      "Personalized document checklist",
      "Review of marriage and birth certificates",
      "Review of accommodation and financial-support documents",
      "Organization and preparation of the application",
      "Filing assistance where legally permitted",
      "Administrative follow-up",
      "Preparation for mandatory appointments",
    ],
  },
  visa_investisseur: {
    fr: [
      "Diagnostic du projet et du profil investisseur",
      "Liste personnalisée des documents",
      "Vérification des documents personnels",
      "Contrôle des statuts, du RCS, du NIF/CIF, de la carte statistique et des documents fiscaux disponibles",
      "Vérification des attestations bancaires nécessaires",
      "Organisation et préparation du dossier",
      "Coordination avec l'EDBM et les autorités compétentes",
      "Assistance au dépôt lorsque cela est autorisé",
      "Suivi administratif",
      "Préparation aux rendez-vous exigeant la présence du demandeur",
    ],
    en: [
      "Assessment of the investment project and investor profile",
      "Personalized document checklist",
      "Review of personal documents",
      "Review of available articles of association, company registration, tax identification, statistical registration and tax records",
      "Review of the required bank certificates",
      "Organization and preparation of the application",
      "Coordination with EDBM and the competent authorities",
      "Filing assistance where legally permitted",
      "Administrative follow-up",
      "Preparation for appointments requiring the applicant's attendance",
    ],
  },
};

const notIncludedItems: Record<PricingSlug, { fr: string[]; en: string[] }> = {
  visa_transformable: {
    fr: [
      "Droits consulaires et gouvernementaux",
      "Traductions et légalisations",
      "Casier judiciaire et documents officiels",
      "Assurance",
      "Transport et hébergement",
      "Visa long séjour",
      "Carte de résident",
      "Frais ou prestations de tiers",
      "Représentation aux étapes exigeant légalement la présence du demandeur",
    ],
    en: [
      "Consular and government fees",
      "Translations and legalizations",
      "Criminal record and official documents",
      "Insurance",
      "Travel and accommodation",
      "Long-stay visa",
      "Residence card",
      "Third-party fees or services",
      "Representation at stages legally requiring the applicant's presence",
    ],
  },
  regroupement_familial: {
    fr: [
      "Droits consulaires et gouvernementaux",
      "Frais de visa long séjour",
      "Carte de résident",
      "Traductions, apostilles ou légalisations",
      "Délivrance ou renouvellement des actes d'état civil",
      "Tests, assurances ou certificats médicaux éventuellement demandés",
      "Transport et hébergement",
      "Frais propres à chaque membre supplémentaire, sauf mention contraire dans le devis",
      "Prestations de tiers",
    ],
    en: [
      "Consular and government fees",
      "Long-stay visa fees",
      "Residence card",
      "Translations, apostilles or legalizations",
      "Issuance or renewal of civil-status records",
      "Tests, insurance or medical certificates if required",
      "Travel and accommodation",
      "Fees for each additional member, unless stated otherwise in the quotation",
      "Third-party services",
    ],
  },
  visa_investisseur: {
    fr: [
      "Création, constitution ou enregistrement d'une entreprise",
      "Rédaction de statuts complexes",
      "Capital social ou investissement",
      "Overture et frais de compte bancaire",
      "Comptabilité et déclarations fiscales",
      "Droits consulaires et gouvernementaux",
      "Visa transformable s'il doit faire l'objet d'une procédure distincte",
      "Visa long séjour et carte de résident",
      "Traductions et légalisations",
      "Déplacements, hébergement et transport",
      "Licences ou autorisations sectorielles",
      "Services de tiers",
    ],
    en: [
      "Company formation, incorporation or registration",
      "Drafting of complex articles of association",
      "Share capital or investment",
      "Bank account opening and fees",
      "Accounting and tax filings",
      "Consular and government fees",
      "Transformable visa if a separate procedure is required",
      "Long-stay visa and residence card",
      "Translations and legalizations",
      "Travel, accommodation and transport",
      "Sector-specific licences or permits",
      "Third-party services",
    ],
  },
};

export default function PricingSection({ lang }: { lang: Lang }) {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const c = copy[lang];
  const rates = FALLBACK_RATES;

  const toggleCard = useCallback(
    (slug: string) => {
      setExpandedCard((prev) => (prev === slug ? null : slug));
    },
    [],
  );

  return (
    <section className="section sage" id="tarifs">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">{c.pricingEyebrow}</span>
            <h2>{c.pricingTitle}</h2>
          </div>
          <p className="section-intro">{c.pricingIntro}</p>
        </div>

        <CurrencyPicker currency={currency} setCurrency={setCurrency} lang={lang} />

        <div className="pricing-cards">
          {cards.map((card) => (
            <PricingCard
              key={card.slug}
              card={card}
              lang={lang}
              currency={currency}
              rates={rates}
              isExpanded={expandedCard === card.slug}
              onToggle={() => toggleCard(card.slug)}
            />
          ))}
        </div>

        <DisclaimerBox lang={lang} />

        <AdminFeesBox lang={lang} />

        <ProcessTimeline lang={lang} />

        <PaymentTerms lang={lang} />

        <LegalDisclaimer lang={lang} />
      </div>
    </section>
  );
}

function CurrencyPicker({
  currency,
  setCurrency,
  lang,
}: {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  lang: Lang;
}) {
  const options: Currency[] = ["EUR", "MGA", "USD"];
  return (
    <div className="currency-picker" role="radiogroup" aria-label={lang === "fr" ? "Sélection de la devise" : "Currency selector"}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={currency === opt}
          className={`currency-btn${currency === opt ? " active" : ""}`}
          onClick={() => setCurrency(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function PricingCard({
  card,
  lang,
  currency,
  rates,
  isExpanded,
  onToggle,
}: {
  card: CardData;
  lang: Lang;
  currency: Currency;
  rates: typeof FALLBACK_RATES;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const c = copy[lang];
  const detailsId = useId();

  return (
    <div className={`pricing-card${card.popular ? " popular" : ""}`}>
      {card.popular && (
        <span className="pricing-badge">{c.popularService}</span>
      )}
      <h3 className="pricing-card-title">{serviceLabels[card.slug][lang]}</h3>
      <p className="pricing-card-desc">{serviceDescriptions[card.slug][lang]}</p>

      <div className="pricing-amount">
        <span className="pricing-main">{convertPrice(card.basePrice, currency, rates)}</span>
        <span className="pricing-excluded">{c.administrativeFeesExcluded}</span>
      </div>

      {card.extraPrice && (
        <div className="pricing-extra">
          <span className="pricing-extra-label">
            {lang === "fr" ? "Personne supplémentaire" : "Additional person"}
          </span>
          <span className="pricing-extra-amount">
            {convertPrice(card.extraPrice, currency, rates)}
          </span>
        </div>
      )}

      {card.needsAnalysis && (
        <p className="pricing-analysis-note">
          {lang === "fr"
            ? "Si vous ne disposez pas encore de la structure ou des documents professionnels nécessaires, une analyse préalable du dossier sera requise."
            : "If you do not yet have the required company structure or professional documents, a preliminary case analysis will be required."}
        </p>
      )}

      <button
        type="button"
        className="pricing-details-toggle"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        {c.viewDetails} {isExpanded ? "▲" : "▼"}
      </button>

      {isExpanded && (
        <div className="pricing-details" id={detailsId}>
          <div className="pricing-included">
            <h4>{c.included}</h4>
            <ul className="checklist">
              {includedItems[card.slug][lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="pricing-not-included">
            <h4>{c.notIncluded}</h4>
            <ul className="exclusion-list">
              {notIncludedItems[card.slug][lang].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <a className="pricing-cta" href={`/${lang}/contact`}>
        {c.requestAssessment}
      </a>
    </div>
  );
}

function DisclaimerBox({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <div className="pricing-disclaimer-box">
      <p>{c.adminFeesDisclaimer}</p>
    </div>
  );
}

function AdminFeesBox({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const [open, setOpen] = useState(false);
  const detailsId = useId();
  return (
    <div className="admin-fees-box">
      <h3>{c.adminFeesBoxTitle}</h3>
      <p>{c.adminFeesBoxText}</p>
      <button
        type="button"
        className="pricing-details-toggle"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((p) => !p)}
      >
        {lang === "fr" ? "Fourchettes indicatives" : "Indicative ranges"} {open ? "▲" : "▼"}
      </button>
      {open && (
        <div className="admin-fees-details" id={detailsId}>
          <p>{c.adminFeesRanges}</p>
          <p>{c.adminFeesThirdParty}</p>
        </div>
      )}
    </div>
  );
}

function ProcessTimeline({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <div className="process-timeline">
      <h3 className="process-timeline-title">
        {lang === "fr" ? "Notre processus en 7 étapes" : "Our 7-step process"}
      </h3>
      <ol className="process-steps">
        {c.processTimeline.map((step, i) => (
          <li className="process-step" key={i}>
            <span className="process-step-num">{i + 1}</span>
            <span className="process-step-text">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PaymentTerms({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <div className="payment-terms">
      <h3 className="payment-terms-title">{c.paymentTitle}</h3>
      <div className="payment-grid">
        <div className="payment-item">
          <h4>{c.paymentStartTitle}</h4>
          <p>{c.paymentStartText}</p>
        </div>
        <div className="payment-item">
          <h4>{c.paymentSuccessTitle}</h4>
          <p>{c.paymentSuccessText}</p>
        </div>
        <div className="payment-item payment-refusal">
          <h4>{c.paymentRefusalTitle}</h4>
          <p>{c.paymentRefusalText}</p>
        </div>
      </div>
    </div>
  );
}

function LegalDisclaimer({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <div className="legal-disclaimer">
      <p>{c.disclaimer}</p>
    </div>
  );
}
