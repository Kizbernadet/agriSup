import type { FormationDomain } from "@/generated/prisma/enums";

type Localized = { fr: string; en: string };

export type DomainContent = {
  // Présentation GÉNÉRALE du domaine (ce qu'il recouvre), pas d'AGRI'SUP.
  description: Localized;
  // Exemples de métiers du secteur, à titre indicatif : ce ne sont PAS des débouchés
  // garantis par les formations (ceux-ci restent [À FOURNIR] sur chaque formation).
  careers: Localized[];
};

// Contenu général rédigé pour enrichir le site, à faire valider par AGRI'SUP.
export const DOMAINS: Record<FormationDomain, DomainContent> = {
  PRODUCTION_VEGETALE: {
    description: {
      fr: "Cultures vivrières et maraîchères, sols, semences et techniques de production végétale.",
      en: "Food and market-garden crops, soils, seeds and crop production techniques.",
    },
    careers: [
      { fr: "Technicien agricole", en: "Agricultural technician" },
      { fr: "Conseiller agricole", en: "Agricultural advisor" },
      { fr: "Producteur maraîcher", en: "Market gardener" },
      { fr: "Technicien semencier", en: "Seed technician" },
    ],
  },
  ELEVAGE_SANTE_ANIMALE: {
    description: {
      fr: "Conduite des élevages, alimentation, reproduction et santé des animaux.",
      en: "Livestock management, animal feeding, breeding and health.",
    },
    careers: [
      { fr: "Technicien d'élevage", en: "Livestock technician" },
      { fr: "Inséminateur", en: "Artificial insemination technician" },
      {
        fr: "Commercial en produits vétérinaires",
        en: "Veterinary products sales representative",
      },
      { fr: "Gestionnaire d'exploitation d'élevage", en: "Livestock farm manager" },
    ],
  },
  AQUACULTURE: {
    description: {
      fr: "Élevage de poissons, gestion des bassins et des ressources aquatiques.",
      en: "Fish farming, pond management and aquatic resources.",
    },
    careers: [
      { fr: "Pisciculteur", en: "Fish farmer" },
      { fr: "Technicien aquacole", en: "Aquaculture technician" },
      { fr: "Gestionnaire de ferme piscicole", en: "Fish farm manager" },
    ],
  },
  AGRIBUSINESS: {
    description: {
      fr: "Gestion, commercialisation et entrepreneuriat dans les filières agricoles.",
      en: "Management, marketing and entrepreneurship in agricultural value chains.",
    },
    careers: [
      { fr: "Gestionnaire d'entreprise agricole", en: "Agricultural business manager" },
      { fr: "Commercial agricole", en: "Agricultural sales representative" },
      { fr: "Entrepreneur agricole", en: "Agricultural entrepreneur" },
    ],
  },
  AGROFORESTERIE: {
    description: {
      fr: "Association des arbres, des cultures et de l'élevage pour une gestion durable des terres.",
      en: "Combining trees, crops and livestock for sustainable land management.",
    },
    careers: [
      { fr: "Technicien agroforestier", en: "Agroforestry technician" },
      {
        fr: "Animateur de projets de développement rural",
        en: "Rural development project officer",
      },
      {
        fr: "Technicien en gestion des ressources naturelles",
        en: "Natural resources technician",
      },
    ],
  },
};

// Parcours pédagogique (presentation_projet.md §6) : description générale de chaque étape.
export const PEDAGOGY_DETAILS: Localized[] = [
  {
    fr: "Acquérir les bases scientifiques et techniques de son domaine.",
    en: "Acquire the scientific and technical foundations of your field.",
  },
  {
    fr: "Appliquer ses connaissances à des situations concrètes.",
    en: "Apply your knowledge to real situations.",
  },
  {
    fr: "Découvrir les réalités du secteur agricole sur le terrain.",
    en: "Discover the realities of the agricultural sector in the field.",
  },
  {
    fr: "Se préparer aux métiers et à l'insertion professionnelle.",
    en: "Prepare for careers and entry into working life.",
  },
];

// Contexte général du secteur, sans chiffre (aucune statistique non sourcée).
export const SECTOR_POINTS: { title: Localized; text: Localized }[] = [
  {
    title: { fr: "Un secteur central", en: "A central sector" },
    text: {
      fr: "L'agriculture, l'élevage et la pêche occupent une place essentielle dans l'économie et l'emploi au Mali.",
      en: "Agriculture, livestock and fishing play an essential role in Mali's economy and employment.",
    },
  },
  {
    title: { fr: "Des besoins en compétences", en: "A need for skills" },
    text: {
      fr: "La modernisation des exploitations et des filières demande des techniciens et des gestionnaires formés.",
      en: "Modernising farms and value chains requires trained technicians and managers.",
    },
  },
  {
    title: { fr: "Des métiers variés", en: "Diverse careers" },
    text: {
      fr: "De la production au conseil, de la santé animale à la commercialisation : un large éventail de métiers.",
      en: "From production to advisory work, from animal health to marketing: a wide range of careers.",
    },
  },
];
