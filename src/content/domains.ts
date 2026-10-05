import type { FormationDomain } from "@/generated/prisma/enums";

type Localized = { fr: string; en: string };

export type DomainContent = {
  // Présentation GÉNÉRALE du domaine (ce qu'il recouvre), pas d'AGRI'SUP.
  description: Localized;
  // Exemples de métiers du secteur, à titre indicatif : ce ne sont PAS des débouchés
  // garantis par les formations.
  careers: Localized[];
  sectorsMali: Localized[];
  sectorsGlobal: Localized[];
  regulatoryNote?: Localized;
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
    sectorsMali: [
      {
        fr: "Exploitations agricoles et maraîchères",
        en: "Crop and market-garden farms",
      },
      {
        fr: "Semences, intrants et irrigation",
        en: "Seeds, agricultural inputs and irrigation",
      },
      {
        fr: "Conseil et projets de production",
        en: "Crop advisory and production projects",
      },
    ],
    sectorsGlobal: [
      { fr: "Production végétale et agronomie", en: "Crop production and agronomy" },
      {
        fr: "Filières semencières et gestion des cultures",
        en: "Seed value chains and crop management",
      },
      {
        fr: "Recherche, conseil et développement agricole",
        en: "Agricultural research, advisory and development",
      },
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
    sectorsMali: [
      { fr: "Élevages et productions animales", en: "Livestock and animal production" },
      {
        fr: "Filières lait, viande et alimentation animale",
        en: "Dairy, meat and animal-feed value chains",
      },
      {
        fr: "Services techniques et projets d'élevage",
        en: "Livestock technical services and projects",
      },
    ],
    sectorsGlobal: [
      {
        fr: "Élevage, sélection et nutrition animales",
        en: "Livestock, breeding and animal nutrition",
      },
      {
        fr: "Transformation des produits d'origine animale",
        en: "Processing of animal products",
      },
      {
        fr: "Conseil technique et développement rural",
        en: "Technical advisory and rural development",
      },
    ],
    regulatoryNote: {
      fr: "Les actes réservés aux vétérinaires sont réglementés. Cette liste ne confirme ni une habilitation vétérinaire ni le droit d'exercer comme vétérinaire.",
      en: "Veterinary practice is regulated. This list does not confirm veterinary accreditation or the right to practise as a veterinarian.",
    },
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
    sectorsMali: [
      { fr: "Pisciculture et élevage de poissons", en: "Fish farming and aquaculture" },
      {
        fr: "Transformation et commercialisation des produits aquatiques",
        en: "Processing and marketing of aquatic products",
      },
      {
        fr: "Gestion des ressources et projets aquacoles",
        en: "Resource management and aquaculture projects",
      },
    ],
    sectorsGlobal: [
      { fr: "Fermes aquacoles et écloseries", en: "Aquaculture farms and hatcheries" },
      {
        fr: "Gestion de la qualité de l'eau et des élevages",
        en: "Water-quality and farm management",
      },
      {
        fr: "Transformation, recherche et appui technique",
        en: "Processing, research and technical support",
      },
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
    sectorsMali: [
      {
        fr: "Collecte, stockage et transformation agricoles",
        en: "Agricultural collection, storage and processing",
      },
      {
        fr: "Commerce de produits et d'intrants agricoles",
        en: "Trade in agricultural products and inputs",
      },
      {
        fr: "Coopératives, entreprises et projets de filière",
        en: "Cooperatives, businesses and value-chain projects",
      },
    ],
    sectorsGlobal: [
      {
        fr: "Entreprises agroalimentaires et chaînes de valeur",
        en: "Agrifood businesses and value chains",
      },
      {
        fr: "Approvisionnement, logistique et commercialisation",
        en: "Procurement, logistics and marketing",
      },
      {
        fr: "Gestion et accompagnement d'entreprises agricoles",
        en: "Agricultural business management and support",
      },
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
    sectorsMali: [
      {
        fr: "Systèmes agroforestiers et gestion des terres",
        en: "Agroforestry systems and land management",
      },
      {
        fr: "Restauration des sols, de l'eau et du couvert végétal",
        en: "Soil, water and vegetation restoration",
      },
      {
        fr: "Projets de développement rural et de ressources naturelles",
        en: "Rural development and natural-resource projects",
      },
    ],
    sectorsGlobal: [
      {
        fr: "Agroforesterie et gestion des écosystèmes",
        en: "Agroforestry and ecosystem management",
      },
      {
        fr: "Adaptation climatique et restauration des paysages",
        en: "Climate adaptation and landscape restoration",
      },
      {
        fr: "Projets de conservation et de développement territorial",
        en: "Conservation and territorial-development projects",
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
      fr: "Au Mali, les activités agricoles recouvrent la production végétale, l'élevage, la pêche et des filières de transformation.",
      en: "In Mali, agricultural activity spans crop production, livestock, fisheries and processing value chains.",
    },
  },
  {
    title: { fr: "Des activités complémentaires", en: "Connected activities" },
    text: {
      fr: "Production, conseil, approvisionnement, conservation, transformation et commercialisation sont des maillons distincts des filières.",
      en: "Production, advisory work, procurement, storage, processing and marketing are different links in value chains.",
    },
  },
  {
    title: { fr: "Des parcours variés", en: "A range of pathways" },
    text: {
      fr: "Les activités mobilisent des compétences techniques, commerciales et de gestion ; les recrutements dépendent des besoins et qualifications de chaque poste.",
      en: "The sector uses technical, commercial and management skills; hiring depends on each role's needs and qualifications.",
    },
  },
];
