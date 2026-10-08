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

// Questions du cahier (§12). Réponses fondées sur les documents officiels de l'établissement
// (fiche des filières, conditions d'inscription et frais, avantages) et sur le
// fonctionnement du site.
export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: "formations",
    keywords: [
      "formation",
      "formations",
      "elevage",
      "aquaculture",
      "pisciculture",
      "agronomie",
      "agronome",
      "agriculture",
      "agricole",
      "vegetale",
      "agribusiness",
      "zootechnie",
      "livestock",
      "farming",
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
      fr: "Quelles formations propose AGRI'SUP ?",
      en: "What programs does AGRI'SUP offer?",
    },
    answer: {
      fr: "AGRI'SUP propose seize formations en système LMD : huit DUT en deux ans (production maraîchère, fumure organique, semences agricoles, lait et viande, production aviaire, technico-commercial agricole, agroforesterie, insémination artificielle), six licences professionnelles en trois ans (agronomie, agribusiness, zootechnie, médecine vétérinaire, aquaculture, foresterie) et deux masters professionnels (agronomie, zootechnie).",
      en: "AGRI'SUP offers sixteen programs within the LMD system: eight two-year DUT programs (market gardening, organic fertiliser, agricultural seeds, milk and meat, poultry production, agricultural sales, agroforestry, artificial insemination), six three-year professional bachelor's degrees (agronomy, agribusiness, animal science, veterinary medicine, aquaculture, forestry) and two professional master's degrees (agronomy, animal science).",
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
      fr: "Qu'est-ce que le système LMD ?",
      en: "What is the LMD system?",
    },
    answer: {
      fr: "Le système LMD (licence, master, doctorat) organise les études supérieures en semestres et en crédits. À AGRI'SUP : le DUT se prépare en deux ans (4 semestres, 120 crédits), la licence professionnelle en trois ans (6 semestres, 180 crédits), ou en un an après un DUT, et le master professionnel en deux ans après la licence (4 semestres, 120 crédits). Le doctorat (trois ans) est une poursuite d'études possible.",
      en: "The LMD system (bachelor's, master's, doctorate) organises higher education into semesters and credits. At AGRI'SUP, the DUT takes two years (4 semesters, 120 credits), the professional bachelor's degree three years (6 semesters, 180 credits), or one year after a DUT, and the professional master's degree two years after the bachelor's (4 semesters, 120 credits). A doctorate (three years) is a possible further step.",
    },
  },
  {
    id: "localisation",
    keywords: [
      // « où » : seul mot court accepté par l'assistant (voir SHORT_KEYWORDS).
      "ou",
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
    question: { fr: "Où se trouve AGRI'SUP ?", en: "Where is AGRI'SUP located?" },
    answer: {
      fr: "L'établissement se trouve à Sotuba ACI, en Commune I de Bamako (Mali), près du terrain de football du Stade Malien.",
      en: "The school is located in Sotuba ACI, Commune I, Bamako (Mali), near the Stade Malien football ground.",
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
      fr: "Quelles sont les conditions d'admission ?",
      en: "What are the admission requirements?",
    },
    answer: {
      fr: "Le DUT et la licence professionnelle sont accessibles avec le baccalauréat ou un diplôme équivalent ; les titulaires du brevet de technicien (BT) sont admis au même titre que les bacheliers. Avec un DUT, la licence se prépare en un an ; avec une licence professionnelle, vous pouvez poursuivre en master.",
      en: "The DUT and the professional bachelor's degree are open to holders of the baccalaureate or an equivalent qualification; holders of the technician certificate (BT) are admitted on the same basis. With a DUT, the bachelor's degree takes one year; with a professional bachelor's degree, you can continue to a master's.",
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
      fr: "Quels documents faut-il fournir ?",
      en: "Which documents do I need to provide?",
    },
    answer: {
      fr: "Prévoyez : une copie certifiée du baccalauréat (ou équivalent) et du relevé de notes, une copie de l'acte de naissance, un certificat de nationalité, trois photos d'identité, le formulaire de demande d'inscription rempli et le reçu de paiement des frais d'inscription.",
      en: "Please provide: a certified copy of the baccalaureate (or equivalent) and its transcript, a copy of your birth certificate, a certificate of nationality, three passport photos, the completed enrolment form and the enrolment fee receipt.",
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
    question: { fr: "Comment se préinscrire ?", en: "How do I pre-register?" },
    answer: {
      fr: "Remplissez le formulaire de préinscription en ligne : vos coordonnées, la formation souhaitée et l'année visée. AGRI'SUP vous recontacte ensuite pour compléter votre dossier.",
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
      fr: "La préinscription vaut-elle admission ?",
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
    question: { fr: "Comment contacter AGRI'SUP ?", en: "How can I contact AGRI'SUP?" },
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
      fr: "Combien coûtent les études à AGRI'SUP ?",
      en: "How much do studies at AGRI'SUP cost?",
    },
    answer: {
      fr: "À titre indicatif, par année académique : pour le DUT et la licence, 50 000 FCFA d'inscription, 50 000 FCFA de dossier et 450 000 FCFA de formation (en deux tranches) ; pour le master, 50 000 + 50 000 FCFA et 1 000 000 FCFA de formation. Le détail figure sur la page Admission.",
      en: "As a guide, per academic year: for the DUT and bachelor's degree, 50,000 FCFA enrolment, 50,000 FCFA application and 450,000 FCFA tuition (in two instalments); for the master's, 50,000 + 50,000 FCFA and 1,000,000 FCFA tuition. Full details are on the Admissions page.",
    },
    link: {
      href: "/admission",
      label: { fr: "Voir le détail des frais", en: "See fee details" },
    },
  },
  {
    id: "avantages",
    keywords: [
      "bourse",
      "bourses",
      "avantage",
      "avantages",
      "stage",
      "stages",
      "kit",
      "financement",
      "scholarship",
      "grant",
      "benefits",
    ],
    question: {
      fr: "Y a-t-il des bourses ou des avantages pour les étudiants ?",
      en: "Are there scholarships or benefits for students?",
    },
    answer: {
      fr: "Oui : un kit est offert à l'inscription (blouse, clé USB, cahier, stylos), des bourses de stage de fin de cycle existent dans certaines filières, et nos coopérations internationales ouvrent l'accès à des bourses d'excellence. Des partenaires financent aussi des kits de démarrage d'activité.",
      en: "Yes: a starter kit is provided at enrolment (work coat, USB stick, notebook, pens), final internship grants exist in some programs, and our international partnerships give access to excellence scholarships. Partners also fund business start-up kits.",
    },
    link: {
      href: "/admission",
      label: { fr: "Voir les avantages", en: "See the benefits" },
    },
  },
  {
    id: "brochure",
    keywords: ["brochure", "plaquette", "pdf", "depliant", "catalogue", "flyer"],
    question: { fr: "Existe-t-il une brochure ?", en: "Is there a brochure?" },
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
      fr: "Quelles formations sont ouvertes cette année ?",
      en: "Which programs are open this year?",
    },
    answer: {
      fr: "Les inscriptions sont ouvertes. Pour connaître le calendrier de la prochaine rentrée et les places disponibles dans chaque formation, contactez AGRI'SUP.",
      en: "Enrolment is open. To find out the next intake calendar and the places available in each program, contact AGRI'SUP.",
    },
    link: {
      href: "/contact",
      label: { fr: "Poser la question", en: "Ask the question" },
    },
  },
];

// Questions proposées par l'assistant : sélection courte pour la démonstration (moins de
// 10). La page FAQ, elle, affiche toutes les questions de FAQ_ITEMS.
const BOT_QUESTION_IDS = new Set([
  "formations",
  "lmd",
  "localisation",
  "conditions",
  "documents",
  "preinscription",
  "avantages",
  "contact",
  "frais",
]);

export const FAQ_BOT_ITEMS: readonly FaqItem[] = FAQ_ITEMS.filter((item) =>
  BOT_QUESTION_IDS.has(item.id),
);
