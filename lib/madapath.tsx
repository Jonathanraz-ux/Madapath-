export type Lang = "fr" | "en";

export const SITE_URL = "https://madapath.com";
export const PHONE = "+261349320184";
export const PHONE_DISPLAY = "034 93 201 84";
export const EMAIL = "jonathanrazafiarijaona@gmail.com";
export const WHATSAPP_MSG_FR = encodeURIComponent("Bonjour MadaPath, je souhaite obtenir des informations concernant vos services d\u2019accompagnement \u00e0 Madagascar.");
export const WHATSAPP_MSG_EN = encodeURIComponent("Hello MadaPath, I would like more information about your assistance services in Madagascar.");
export const WHATSAPP_LINK = `https://wa.me/261349320184?text=`;
export const TEL_LINK = `tel:${PHONE}`;

export const slugs = ["travailleur", "famille", "investisseur"] as const;
export type ServiceSlug = (typeof slugs)[number];

export const copy = {
  fr: {
    lang: "fr" as const,
    top: "Accompagnement administratif \u00e0 Antananarivo \u00b7 Fran\u00e7ais / English",
    nav: { services: "Services", method: "Notre m\u00e9thode", contact: "Contact", cta: "\u00c9valuer mon dossier" },
    eyebrow: "Votre installation, notre chemin commun",
    title: (
      <>
        Vos d\u00e9marches \u00e0 Madagascar, enfin <em>plus claires.</em>
      </>
    ),
    lead: "MadaPath prend en charge vos d\u00e9marches pour travailler, r\u00e9unir votre famille ou investir \u00e0 Madagascar \u2014 de la pr\u00e9paration du dossier aux proc\u00e9dures et au suivi aupr\u00e8s des organismes concern\u00e9s.",
    primary: "\u00c9valuer mon projet",
    secondary: "D\u00e9couvrir nos services",
    trust: [
      "D\u00e9marches prises en charge",
      "Suivi personnalis\u00e9",
      "Pr\u00e9sence requise seulement si n\u00e9cessaire",
    ],
    cardTitle: "Nous avan\u00e7ons \u00e0 votre place",
    cardText: "Nous pr\u00e9parons, d\u00e9posons et suivons les d\u00e9marches r\u00e9alisables par mandat. Vous intervenez uniquement lorsqu\u2019une pr\u00e9sence personnelle est obligatoire.",
    steps: [
      "Comprendre votre situation",
      "Constituer et d\u00e9poser le dossier",
      "Suivre la proc\u00e9dure jusqu\u2019\u00e0 sa cl\u00f4ture",
    ],
    servicesEyebrow: "Des parcours selon votre situation",
    servicesTitle: "Une expertise, trois chemins",
    servicesIntro: "Chaque statut r\u00e9pond \u00e0 des conditions diff\u00e9rentes. Nous construisons l\u2019accompagnement autour de votre r\u00e9alit\u00e9, pas autour d\u2019une formule g\u00e9n\u00e9rique.",
    learn: "Voir le parcours \u2192",
    methodEyebrow: "La m\u00e9thode MadaPath",
    methodTitle: "Clair du premier \u00e9change au dernier document",
    methodIntro: "Notre r\u00f4le est de transformer une proc\u00e9dure complexe en \u00e9tapes compr\u00e9hensibles et ma\u00eetris\u00e9es.",
    method: [
      [
        "Diagnostic",
        "Nous identifions votre objectif, votre statut actuel et les points de vigilance.",
      ],
      [
        "Collecte",
        "Nous vous demandons uniquement les pi\u00e8ces et informations indispensables \u00e0 votre situation.",
      ],
      [
        "Prise en charge",
        "Nous pr\u00e9parons et effectuons les proc\u00e9dures possibles aupr\u00e8s de l\u2019EDBM, des services consulaires, de TLScontact ou des administrations concern\u00e9es.",
      ],
      [
        "Suivi",
        "Nous suivons le dossier, vous informons de son \u00e9volution et vous accompagnons lorsque votre pr\u00e9sence est obligatoire.",
      ],
    ],
    diagEyebrow: "Pr\u00e9-diagnostic gratuit",
    diagTitle: "Quel est votre projet \u00e0 Madagascar ?",
    diagText: "Choisissez votre situation pour identifier le parcours qui correspond le mieux \u00e0 votre projet. Ce premier rep\u00e8re ne remplace pas l\u2019\u00e9tude personnalis\u00e9e de votre dossier.",
    diagQuestion: "Votre objectif principal",
    diagButton: "Voir mon parcours",
    resultPrefix: "Votre point de d\u00e9part :",
    contactEyebrow: "Contact",
    contactTitle: "Parlons de votre projet",
    contactIntro: "D\u00e9crivez bri\u00e8vement votre situation. Nous vous r\u00e9pondons en g\u00e9n\u00e9ral sous 24 \u00e0 48 heures ouvr\u00e9es.",
    contactName: "Nom",
    contactEmail: "E-mail",
    contactPhone: "T\u00e9l\u00e9phone (optionnel)",
    contactSubject: "Motif de la demande",
    contactMessage: "Votre message",
    contactSubmit: "Envoyer le message",
    contactConsent: "J\u2019autorise MadaPath \u00e0 utiliser les informations transmises afin de traiter ma demande.",
    contactSuccess: "Votre message a bien \u00e9t\u00e9 envoy\u00e9. Nous vous r\u00e9pondrons dans les meilleurs d\u00e9lais.",
    contactError: "Une erreur est survenue. Veuillez r\u00e9essayer ou nous contacter directement par e-mail.",
    subjects: [
      "Travailler \u00e0 Madagascar",
      "Regroupement familial",
      "Investir \u00e0 Madagascar",
      "Autre demande",
    ],
    footerText: "L\u2019accompagnement administratif humain pour avancer sereinement \u00e0 Madagascar.",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerLegal: "Informations",
    legal: "MadaPath fournit une assistance administrative et ne garantit jamais une d\u00e9cision relevant des autorit\u00e9s comp\u00e9tentes.",
    faqTitle: "Questions fr\u00e9quentes",
    faq: [
      {
        q: "MadaPath garantit-il l\u2019acceptation de mon dossier ?",
        a: "Non. MadaPath pr\u00e9pare et accompagne les d\u00e9marches dans les limites autoris\u00e9es. La d\u00e9cision finale appartient toujours aux autorit\u00e9s comp\u00e9tentes.",
      },
      {
        q: "Quand faut-il commencer les d\u00e9marches ?",
        a: "Le plus t\u00f4t possible. Certaines proc\u00e9dures n\u00e9cessitent des pi\u00e8ces pr\u00e9cises et des d\u00e9lais variables. Un premier \u00e9change permet de d\u00e9finir le calendrier adapt\u00e9.",
      },
      {
        q: "Pouvez-vous v\u00e9rifier mes documents avant le d\u00e9p\u00f4t ?",
        a: "Oui. L\u2019analyse et la v\u00e9rification des pi\u00e8ces font partie int\u00e9grante de notre accompagnement.",
      },
      {
        q: "Proposez-vous un accompagnement en fran\u00e7ais et en anglais ?",
        a: "Oui, nos \u00e9changes se font dans les deux langues selon votre pr\u00e9f\u00e9rence.",
      },
      {
        q: "Puis-je demander une premi\u00e8re \u00e9valuation de ma situation ?",
        a: "Oui. Le pr\u00e9-diagnostic gratuit sur cette page est un premier rep\u00e8re. Pour une analyse d\u00e9taill\u00e9e, contactez-nous directement.",
      },
    ],
    ogTitle: "MadaPath | Travailler, investir et s\u2019installer \u00e0 Madagascar",
    ogDescription: "MadaPath vous accompagne dans vos d\u00e9marches pour travailler, investir ou rejoindre votre famille \u00e0 Madagascar. Assistance administrative personnalis\u00e9e.",
  },
  en: {
    lang: "en" as const,
    top: "Administrative support in Antananarivo \u00b7 Fran\u00e7ais / English",
    nav: { services: "Services", method: "Our method", contact: "Contact", cta: "Assess my case" },
    eyebrow: "Your move, a path we take together",
    title: (
      <>
        Your move to Madagascar, made <em>clearer.</em>
      </>
    ),
    lead: "MadaPath handles your procedures for working, reuniting your family or investing in Madagascar \u2014 from preparing the file to submissions and follow-up with the relevant authorities.",
    primary: "Assess my project",
    secondary: "Explore our services",
    trust: [
      "Procedures handled for you",
      "Personal follow-up",
      "Attend only when required",
    ],
    cardTitle: "We move the process forward for you",
    cardText: "We prepare, submit and follow every procedure that can be handled under mandate. You step in only when personal attendance is compulsory.",
    steps: [
      "Understand your situation",
      "Prepare and submit the file",
      "Follow the process through completion",
    ],
    servicesEyebrow: "A path for every situation",
    servicesTitle: "One expertise, three paths",
    servicesIntro: "Every status comes with different conditions. We shape the support around your actual situation, not a generic package.",
    learn: "Explore this path \u2192",
    methodEyebrow: "The MadaPath method",
    methodTitle: "Clear from the first call to the final document",
    methodIntro: "We turn complex procedures into understandable, manageable steps.",
    method: [
      [
        "Assessment",
        "We identify your goal, current status and potential risks.",
      ],
      [
        "Collection",
        "We request only the documents and information required for your situation.",
      ],
      [
        "Handling",
        "We prepare and carry out eligible procedures with EDBM, consular services, TLScontact or the relevant authorities.",
      ],
      [
        "Follow-up",
        "We track your file, keep you informed and attend with you when your personal presence is compulsory.",
      ],
    ],
    diagEyebrow: "Free pre-assessment",
    diagTitle: "What brings you to Madagascar?",
    diagText: "Select your situation to identify the path most relevant to your plans. This first guide does not replace a personalised case review.",
    diagQuestion: "Your main goal",
    diagButton: "See my path",
    resultPrefix: "Your starting point:",
    contactEyebrow: "Contact",
    contactTitle: "Let\u2019s discuss your project",
    contactIntro: "Describe your situation briefly. We typically respond within 24 to 48 business hours.",
    contactName: "Name",
    contactEmail: "Email",
    contactPhone: "Phone (optional)",
    contactSubject: "Reason for enquiry",
    contactMessage: "Your message",
    contactSubmit: "Send message",
    contactConsent: "I authorise MadaPath to use the information provided in order to process my enquiry.",
    contactSuccess: "Your message has been sent. We will get back to you as soon as possible.",
    contactError: "An error occurred. Please try again or contact us directly by email.",
    subjects: [
      "Work in Madagascar",
      "Family Reunification",
      "Invest in Madagascar",
      "Other Enquiry",
    ],
    footerText: "Human administrative support for a smoother journey in Madagascar.",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerLegal: "Information",
    legal: "MadaPath provides administrative assistance and never guarantees decisions made by the competent authorities.",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Does MadaPath guarantee that my application will be approved?",
        a: "No. MadaPath prepares and supports procedures within the authorised limits. The final decision always rests with the competent authorities.",
      },
      {
        q: "When should I start the process?",
        a: "As early as possible. Some procedures require specific documents and variable processing times. An initial conversation helps establish a suitable timeline.",
      },
      {
        q: "Can you review my documents before submission?",
        a: "Yes. Document analysis and verification are an integral part of our support.",
      },
      {
        q: "Is assistance available in English and French?",
        a: "Yes. We communicate in both languages according to your preference.",
      },
      {
        q: "Can I request an initial assessment of my situation?",
        a: "Yes. The free pre-assessment on this page is a first indicator. For a detailed review, please contact us directly.",
      },
    ],
    ogTitle: "MadaPath | Work, Invest and Relocate to Madagascar",
    ogDescription: "MadaPath assists professionals, investors and families with administrative procedures for working, investing and relocating to Madagascar.",
  },
};

export const services: Record<ServiceSlug, { icon: string; fr: { name: string; short: string; title: string; intro: string; items: string[] }; en: { name: string; short: string; title: string; intro: string; items: string[] } }> = {
  travailleur: {
    icon: "\u2197",
    fr: {
      name: "Travailler \u00e0 Madagascar",
      short: "Accompagnement pour l\u2019autorisation d\u2019emploi, le visa et les formalit\u00e9s li\u00e9es au travail \u00e0 Madagascar.",
      title: "Travailler \u00e0 Madagascar en toute conformit\u00e9",
      intro: "MadaPath accompagne les professionnels et les entreprises dans la pr\u00e9paration et le suivi des d\u00e9marches n\u00e9cessaires pour travailler l\u00e9galement \u00e0 Madagascar.",
      items: [
        "Orientation sur le visa adapt\u00e9 \u00e0 votre situation",
        "Accompagnement pour les formalit\u00e9s de travail",
        "Constitution et v\u00e9rification du dossier",
        "Suivi administratif aupr\u00e8s des organismes comp\u00e9tents",
        "Accompagnement de l\u2019employeur et du salari\u00e9",
      ],
    },
    en: {
      name: "Work in Madagascar",
      short: "Assistance with work authorisation, visa and employment-related procedures in Madagascar.",
      title: "Work in Madagascar with a compliant path",
      intro: "MadaPath assists professionals and companies with the preparation and follow-up of the administrative procedures required to work legally in Madagascar.",
      items: [
        "Guidance on the visa suited to your situation",
        "Assistance with employment formalities",
        "Document preparation and verification",
        "Administrative follow-up with the relevant authorities",
        "Support for both employer and employee",
      ],
    },
  },
  famille: {
    icon: "\u2303",
    fr: {
      name: "Regroupement familial",
      short: "Accompagnement pour le regroupement familial, les pi\u00e8ces d\u2019\u00e9tat civil et l\u2019installation de vos proches \u00e0 Madagascar.",
      title: "R\u00e9unir votre famille \u00e0 Madagascar",
      intro: "Nous accompagnons les couples et les familles dans la pr\u00e9paration de leurs d\u00e9marches de regroupement et d\u2019installation \u00e0 Madagascar.",
      items: [
        "Analyse de la situation familiale",
        "Liste personnalis\u00e9e des documents n\u00e9cessaires",
        "V\u00e9rification et organisation du dossier",
        "Accompagnement administratif complet",
        "Suivi des d\u00e9marches jusqu\u2019\u00e0 leur conclusion",
      ],
    },
    en: {
      name: "Family Reunification",
      short: "Assistance with family reunification, civil-status documents and settling relatives in Madagascar.",
      title: "Bring your family together in Madagascar",
      intro: "We assist couples and families in preparing their family reunification and relocation procedures in Madagascar.",
      items: [
        "Family situation assessment",
        "Personalised list of required documents",
        "Document verification and organisation",
        "Complete administrative support",
        "Follow-up of procedures through to completion",
      ],
    },
  },
  investisseur: {
    icon: "\u25C7",
    fr: {
      name: "Investir \u00e0 Madagascar",
      short: "Accompagnement pour l\u2019implantation, la cr\u00e9ation d\u2019entreprise et les formalit\u00e9s administratives li\u00e9es \u00e0 l\u2019investissement.",
      title: "Investir \u00e0 Madagascar avec une feuille de route claire",
      intro: "MadaPath accompagne les entrepreneurs et investisseurs \u00e9trangers dans leurs d\u00e9marches d\u2019implantation et de structuration \u00e0 Madagascar.",
      items: [
        "Orientation sur la structure juridique adapt\u00e9e",
        "Accompagnement dans les formalit\u00e9s aupr\u00e8s des organismes comp\u00e9tents",
        "Pr\u00e9paration et suivi administratif du dossier",
        "D\u00e9marches li\u00e9es \u00e0 l\u2019installation du porteur de projet",
        "Coordination des principales \u00e9tapes de cr\u00e9ation ou d\u2019implantation",
      ],
    },
    en: {
      name: "Invest in Madagascar",
      short: "Assistance with business setup, company formation and administrative procedures for investors.",
      title: "Invest in Madagascar with a clear roadmap",
      intro: "MadaPath supports foreign entrepreneurs and investors throughout their business setup and administrative procedures in Madagascar.",
      items: [
        "Guidance on the most suitable legal structure",
        "Assistance with formalities at the relevant authorities",
        "Document preparation and administrative follow-up",
        "Procedures related to the project holder\u2019s relocation",
        "Coordination of the main setup and establishment steps",
      ],
    },
  },
};

export const images: Record<ServiceSlug, { src: string; alt: { fr: string; en: string } }> = {
  travailleur: {
    src: "/images/work.webp",
    alt: {
      fr: "Professionnel en r\u00e9union dans un environnement de travail moderne \u00e0 Madagascar",
      en: "Professional in a modern work setting in Madagascar",
    },
  },
  famille: {
    src: "/images/family.webp",
    alt: {
      fr: "Couple et famille dans un cadre chaleureux \u00e0 Madagascar",
      en: "Couple and family in a warm setting in Madagascar",
    },
  },
  investisseur: {
    src: "/images/invest.webp",
    alt: {
      fr: "Entrepreneur en r\u00e9union professionnelle \u00e0 Madagascar",
      en: "Entrepreneur in a professional meeting in Madagascar",
    },
  },
};
