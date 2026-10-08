/**
 * Données institutionnelles NON VALIDÉES par AGRI'SUP.
 *
 * Tout ce fichier doit être relu avec l'établissement avant la mise en ligne
 * (voir la section « Avant mise en ligne » de docs/checklist.md).
 * Chaque valeur indique sa source et son statut.
 */

export const CONTACT = {
  // Source : presentation_projet.md §5, kakémono, affiche « Inscriptions ouvertes » et
  // précisions de la cliente (quartier, repère, coordonnées GPS).
  address: {
    street: "Sotuba ACI",
    district: "Commune I",
    city: "Bamako",
    country: "Mali",
    landmark: {
      fr: "Près du terrain de football du Stade Malien",
      en: "Near the Stade Malien football ground",
    },
  },

  // Source : presentation_projet.md §12 et kakémono (assets/photos). À confirmer.
  // Numéros OFFICIELS affichés sur le site ; le WhatsApp de test passe par l'environnement.
  phones: [
    { display: "+223 74 98 74 47", tel: "+22374987447" },
    { display: "+223 66 72 43 89", tel: "+22366724389" },
  ],

  // Email officiel, affiché sur le kakémono de l'établissement.
  email: "agrisup.bamako@yahoo.fr",
  // Second contact (dépliant et fiche des filières, 2026-10).
  secondaryEmail: "konegilles@yahoo.fr",

  // TEST : numéro WhatsApp d'essai (+34…). Officiel probable d'après le kakémono :
  // +223 66 72 43 89. À basculer avant la mise en ligne.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
} as const;

// Texte localisé : les traductions anglaises sont à faire relire.
type Localized = { fr: string; en: string };

export const INSTITUTION = {
  // Rédigée à partir du kakémono (offre de formation, système LMD) et des photos de
  // l'établissement (laboratoire, salle informatique, champ d'expérimentation).
  presentation: {
    fr: "AGRI'SUP est une école supérieure privée entièrement dédiée aux sciences et technologies agricoles, implantée à Sotuba ACI, à Bamako, et reconnue par l'État malien. Héritière d'une expérience de formation agropastorale née à Ségou en 2006, elle propose seize formations en système LMD, du DUT au master, en production végétale, élevage et santé animale, aquaculture, agribusiness, foresterie et agroforesterie. Sa devise résume son projet : une formation agricole axée sur la pratique, pour un avenir certain.",
    en: "AGRI'SUP is a private higher school entirely dedicated to agricultural sciences and technologies, based in Sotuba ACI, Bamako, and recognised by the Malian State. Building on agropastoral training experience that began in Ségou in 2006, it offers sixteen programs within the LMD system, from DUT to master's level, in crop production, livestock and animal health, aquaculture, agribusiness, forestry and agroforestry. Its motto sums up its mission: practice-based agricultural training for a secure future.",
  } satisfies Localized,

  // Source : document « Mots clés à afficher », reformulé.
  axes: [
    {
      fr: "Formation pratique et entrepreneuriale",
      en: "Practical, entrepreneurial training",
    },
    {
      fr: "Système LMD de standard international",
      en: "International-standard LMD system",
    },
    { fr: "Enseignants qualifiés et confirmés", en: "Qualified, experienced teachers" },
    { fr: "Campus moderne et connecté", en: "Modern, connected campus" },
  ] satisfies Localized[],

  // Source : presentation_projet.md §6 (parcours pédagogique).
  pedagogy: [
    { fr: "Connaissances théoriques", en: "Theoretical knowledge" },
    { fr: "Mise en pratique", en: "Hands-on practice" },
    {
      fr: "Immersion dans le domaine agricole",
      en: "Immersion in the agricultural sector",
    },
    { fr: "Professionnalisation", en: "Professional readiness" },
  ] satisfies Localized[],

  // Partenaires du ruban de l'accueil : sélection du document « Partenariats et
  // coopération » (liste complète : src/content/agrisup.ts), plus AFG Bank, cité dans les
  // premiers documents de la cliente.
  partners: [
    {
      name: "IPR/IFRA de Katibougou",
      description: {
        fr: "Référence de l'enseignement supérieur agricole au Mali. Convention signée en 2026.",
        en: "A reference in agricultural higher education in Mali. Agreement signed in 2026.",
      },
    },
    {
      name: "IER",
      description: {
        fr: "Institut d'économie rurale, référence de la recherche agricole.",
        en: "Institute of Rural Economy, a reference in agricultural research.",
      },
    },
    {
      name: "Purdue University",
      description: {
        fr: "Université agricole de référence mondiale (États-Unis).",
        en: "A world-leading agricultural university (United States).",
      },
    },
    {
      name: "CNIA",
      description: {
        fr: "Centre national d'insémination artificielle.",
        en: "National artificial insemination centre.",
      },
    },
    {
      name: "CARFS",
      description: {
        fr: "Recherche et formation en synécoculture (Burkina Faso).",
        en: "Research and training in synecoculture (Burkina Faso).",
      },
    },
    {
      name: "Sahel Veto",
      description: {
        fr: "Établissement vétérinaire pharmaceutique.",
        en: "Veterinary pharmaceutical company.",
      },
    },
    {
      name: "KISAMEN",
      description: {
        fr: "Production de semences bovines (Pays-Bas).",
        en: "Bovine semen production (Netherlands).",
      },
    },
    {
      name: "Tambaroua Business Farming",
      description: {
        fr: "Ferme partenaire à Samaya, Bamako.",
        en: "Partner farm in Samaya, Bamako.",
      },
    },
    {
      name: "AFG Bank",
      description: {
        fr: "Établissement bancaire présent au Mali.",
        en: "A bank operating in Mali.",
      },
    },
  ] satisfies { name: string; description: Localized }[],
};

// Vidéo de présentation : identifiant YouTube (ex. « dQw4w9WgXcQ » dans
// youtube.com/watch?v=dQw4w9WgXcQ). null = vidéo pas encore fournie par AGRI'SUP :
// la section affiche alors « Vidéo de présentation à venir ».
export const PRESENTATION_VIDEO: { youtubeId: string | null } = {
  youtubeId: null,
};

export const INSTITUTION_DETAILS = {
  // Domaines de l'offre de formation (kakémono officiel).
  fields: [
    { fr: "Agronomie et production végétale", en: "Agronomy and crop production" },
    { fr: "Zootechnie et productions animales", en: "Animal science and production" },
    {
      fr: "Médecine vétérinaire et santé animale",
      en: "Veterinary medicine and animal health",
    },
    { fr: "Aquaculture", en: "Aquaculture" },
    { fr: "Agribusiness", en: "Agribusiness" },
    { fr: "Foresterie et agroforesterie", en: "Forestry and agroforestry" },
  ] satisfies Localized[],
};

// Réseaux sociaux : aucune URL fournie. Le kakémono mentionne une page Facebook
// « agri'sup SEGOU » (URL à obtenir). Laisser null tant que non validé.
export const SOCIAL_LINKS: {
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
} = {
  facebook: null,
  instagram: null,
  youtube: null,
};

// Brochure PDF (cahier §10.6) : à fournir par AGRI'SUP, à déposer dans public/brochure/.
export const BROCHURE_PATH: string | null = null;

// Mentions légales. Hébergeur : informations publiques de Vercel (à revérifier sur
// vercel.com/legal avant mise en ligne). Éditeur : à compléter par AGRI'SUP.
export const LEGAL = {
  publicationManager: null as string | null,
  registration: "Décision de création n° 2026-000976/MESRS-SG du 1er juillet 2026" as
    string | null,
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    website: "https://vercel.com",
  },
  // Durée de conservation des demandes : à fixer par AGRI'SUP.
  retentionPeriod: null as string | null,
};
