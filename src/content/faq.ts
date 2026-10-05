import type { routing } from "@/i18n/routing";

type StaticPathname = Exclude<keyof typeof routing.pathnames, `${string}[${string}`>;
type Localized = { fr: string; en: string };

export type FaqItem = {
  id: string;
  question: Localized;
  answer: Localized;
  // Lien utile pour aller plus loin (optionnel).
  link?: { href: StaticPathname; label: Localized };
  // Mots-clés (français et anglais, sans accents) utilisés par l'assistant FAQ.
  keywords: readonly string[];
};

// Questions du cahier (§12). Les réponses s'appuient uniquement sur les informations
// sourcées (kakémono, presentation_projet.md) ou sur le fonctionnement du site ;
// tout le reste renvoie vers l'établissement. Réponses à faire valider par AGRI'SUP.
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "formations",
    keywords: [
      "formation",
      "formations",
      "programme",
      "filiere",
      "licence",
      "dut",
      "cursus",
      "etudier",
      "etude",
      "diplome",
      "program",
      "course",
      "study",
      "degree",
    ],
    question: {
      fr: "Quelles formations propose AGRI'SUP ?",
      en: "What programs does AGRI'SUP offer?",
    },
    answer: {
      fr: "Les documents communiqués mentionnent des formations dans les sciences et technologies agricoles, dont la production végétale, l'élevage, l'aquaculture et l'agribusiness. Les intitulés, niveaux et ouvertures du catalogue restent à valider par l'établissement.",
      en: "The materials provided mention programs in agricultural sciences and technologies, including crop production, livestock, aquaculture and agribusiness. Program titles, levels and availability in the catalogue still need to be validated by the school.",
    },
    link: {
      href: "/formations",
      label: { fr: "Voir toutes les formations", en: "View all programs" },
    },
  },
  {
    id: "lmd",
    keywords: [
      "lmd",
      "semestre",
      "semestres",
      "credit",
      "credits",
      "systeme",
      "master",
      "doctorat",
      "semester",
    ],
    question: {
      fr: "Qu'est-ce que le système LMD ?",
      en: "What is the LMD system?",
    },
    answer: {
      fr: "Le système LMD (Licence – Master – Doctorat) est un cadre d'organisation des études supérieures. L'application de ce système, les durées et les crédits propres aux formations d'AGRI'SUP doivent être confirmés par l'établissement.",
      en: "The LMD system (Bachelor – Master – Doctorate) is a framework for organising higher education. Whether it applies to AGRI'SUP programs, and their duration and credits, must be confirmed by the school.",
    },
  },
  {
    id: "localisation",
    keywords: [
      "situe",
      "adresse",
      "localisation",
      "bamako",
      "sotuba",
      "trouver",
      "lieu",
      "campus",
      "plan",
      "carte",
      "itineraire",
      "address",
      "location",
      "where",
      "map",
    ],
    question: { fr: "Où se trouve AGRI'SUP ?", en: "Where is AGRI'SUP located?" },
    answer: {
      fr: "L'établissement se trouve à Sotuba ACI, Commune I, à Bamako (Mali).",
      en: "The school is located in Sotuba ACI, Commune I, Bamako (Mali).",
    },
    link: {
      href: "/contact",
      label: { fr: "Voir l'adresse et la carte", en: "See the address and map" },
    },
  },
  {
    id: "conditions",
    keywords: [
      "condition",
      "conditions",
      "admission",
      "admis",
      "acces",
      "requis",
      "prerequis",
      "bac",
      "baccalaureat",
      "niveau",
      "entrer",
      "requirement",
      "requirements",
      "eligible",
    ],
    question: {
      fr: "Quelles sont les conditions d'admission ?",
      en: "What are the admission requirements?",
    },
    answer: {
      fr: "Les conditions officielles d'accès aux formations sont à confirmer auprès de l'établissement. Contactez AGRI'SUP pour connaître les critères applicables à votre situation.",
      en: "Official entry requirements for the programs must be confirmed with the school. Contact AGRI'SUP to learn which criteria apply to you.",
    },
    link: { href: "/admission", label: { fr: "Page Admission", en: "Admissions page" } },
  },
  {
    id: "documents",
    keywords: [
      "document",
      "documents",
      "dossier",
      "piece",
      "pieces",
      "papier",
      "papiers",
      "fournir",
      "releve",
      "releves",
      "papers",
      "file",
    ],
    question: {
      fr: "Quels documents faut-il fournir ?",
      en: "Which documents do I need to provide?",
    },
    answer: {
      fr: "La liste officielle des pièces du dossier est communiquée par AGRI'SUP lors de la procédure d'admission. Après votre préinscription, l'établissement vous indique les documents à préparer.",
      en: "The official list of application documents is provided by AGRI'SUP during the admission process. After your pre-registration, the school will tell you which documents to prepare.",
    },
  },
  {
    id: "preinscription",
    keywords: [
      "preinscription",
      "preinscrire",
      "inscrire",
      "inscription",
      "formulaire",
      "candidater",
      "candidature",
      "postuler",
      "register",
      "registration",
      "apply",
      "application",
      "enroll",
    ],
    question: { fr: "Comment se préinscrire ?", en: "How do I pre-register?" },
    answer: {
      fr: "Remplissez le formulaire de préinscription en ligne : vos coordonnées, la formation souhaitée et l'année visée. AGRI'SUP vous recontacte ensuite pour compléter votre dossier.",
      en: "Fill in the online pre-registration form with your details, the desired program and the target year. AGRI'SUP will then contact you to complete your application.",
    },
    link: {
      href: "/preinscription",
      label: { fr: "Se préinscrire", en: "Pre-register" },
    },
  },
  {
    id: "admission_definitive",
    keywords: [
      "definitive",
      "definitif",
      "valide",
      "garanti",
      "garantie",
      "accepte",
      "acceptation",
      "admitted",
      "guaranteed",
      "final",
    ],
    question: {
      fr: "La préinscription vaut-elle admission ?",
      en: "Does pre-registration mean I am admitted?",
    },
    answer: {
      fr: "Non. La préinscription sert à transmettre vos premières informations. L'admission dépend ensuite de la procédure officielle de l'établissement.",
      en: "No. Pre-registration is for sending your first details. Admission then depends on the school's official procedure.",
    },
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "contacter",
      "telephone",
      "numero",
      "appeler",
      "whatsapp",
      "email",
      "mail",
      "joindre",
      "ecrire",
      "phone",
      "call",
      "reach",
    ],
    question: { fr: "Comment contacter AGRI'SUP ?", en: "How can I contact AGRI'SUP?" },
    answer: {
      fr: "Par téléphone, par WhatsApp ou via le formulaire de contact du site. Toutes les coordonnées sont réunies sur la page Contact.",
      en: "By phone, WhatsApp or through the website's contact form. All contact details are on the Contact page.",
    },
    link: { href: "/contact", label: { fr: "Nous contacter", en: "Contact us" } },
  },
  {
    id: "frais",
    keywords: [
      "frais",
      "prix",
      "cout",
      "couts",
      "tarif",
      "tarifs",
      "scolarite",
      "payer",
      "paiement",
      "argent",
      "fees",
      "cost",
      "price",
      "tuition",
    ],
    question: {
      fr: "Combien coûtent les études à AGRI'SUP ?",
      en: "How much do studies at AGRI'SUP cost?",
    },
    answer: {
      fr: "Les frais de scolarité dépendent de la formation. Ils vous sont communiqués directement par l'établissement : contactez AGRI'SUP pour les connaître.",
      en: "Tuition fees depend on the program. The school provides them directly: contact AGRI'SUP to find out.",
    },
    link: {
      href: "/contact",
      label: { fr: "Demander les frais de scolarité", en: "Ask about tuition fees" },
    },
  },
  {
    id: "brochure",
    keywords: ["brochure", "plaquette", "pdf", "depliant", "catalogue", "flyer"],
    question: { fr: "Existe-t-il une brochure ?", en: "Is there a brochure?" },
    answer: {
      fr: "La brochure n'est pas encore disponible en ligne. Vous pouvez la demander à l'établissement via le formulaire de contact ou par WhatsApp.",
      en: "The brochure is not yet available online. You can request it from the school through the contact form or WhatsApp.",
    },
  },
  {
    id: "formations_annee",
    keywords: [
      "ouverte",
      "ouvertes",
      "ouvert",
      "rentree",
      "disponible",
      "disponibles",
      "annee",
      "open",
      "year",
      "available",
    ],
    question: {
      fr: "Quelles formations sont ouvertes cette année ?",
      en: "Which programs are open this year?",
    },
    answer: {
      fr: "L'ouverture de chaque formation pour l'année académique en cours est à confirmer auprès de l'établissement.",
      en: "Whether each program is open for the current academic year should be confirmed with the school.",
    },
    link: {
      href: "/contact",
      label: { fr: "Poser la question", en: "Ask the question" },
    },
  },
];
