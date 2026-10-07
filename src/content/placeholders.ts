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
    fr: "AGRI'SUP est une école supérieure privée spécialisée dans les sciences et technologies agricoles, implantée à Sotuba ACI, à Bamako. Organisée selon le système LMD, elle propose six licences professionnelles et six DUT en production végétale, élevage et santé animale, aquaculture, agribusiness et agroforesterie. Laboratoire, salle informatique et champ d'expérimentation permettent aux étudiants d'apprendre en pratiquant.",
    en: "AGRI'SUP is a private higher school specialising in agricultural sciences and technologies, based in Sotuba ACI, Bamako. Organised within the LMD system, it offers six professional bachelor's degrees and six technology diplomas (DUT) in crop production, livestock and animal health, aquaculture, agribusiness and agroforestry. A laboratory, a computer room and an experimental field let students learn by doing.",
  } satisfies Localized,

  // Source : presentation_projet.md §18 (positionnement de l'établissement).
  axes: [
    { fr: "Formation supérieure agricole", en: "Higher agricultural education" },
    { fr: "Professionnalisation", en: "Professional training" },
    { fr: "Pratique et terrain", en: "Hands-on fieldwork" },
    {
      fr: "Orientation vers les métiers agricoles",
      en: "Preparation for agricultural careers",
    },
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

  // Partenaires cités dans les documents fournis par la cliente ; descriptions limitées
  // à des informations publiques sur chaque organisation.
  partners: [
    {
      name: "IPR/IFRA de Katibougou",
      description: {
        fr: "Institut polytechnique rural de formation et de recherche appliquée, référence de l'enseignement agricole au Mali.",
        en: "Rural Polytechnic Institute for Training and Applied Research, a leading name in agricultural education in Mali.",
      },
    },
    {
      name: "AFG Bank",
      description: {
        fr: "Établissement bancaire présent au Mali, acteur du financement de l'économie.",
        en: "A bank operating in Mali that helps finance the economy.",
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
    { fr: "Agroforesterie", en: "Agroforestry" },
  ] satisfies Localized[],

  // Source : presentation_projet.md §3. Historique NON VALIDÉ : la page l'affiche avec
  // un avertissement. Le cahier (§5.2) exige une validation avant publication.
  history: [
    {
      label: { fr: "Origines", en: "Origins" },
      text: {
        fr: "Les informations recueillies situent les origines d'AGRI'SUP à Ségou.",
        en: "The information gathered places AGRI'SUP's origins in Ségou.",
      },
    },
    {
      label: { fr: "2006", en: "2006" },
      text: {
        fr: "Date mentionnée comme repère historique de l'établissement.",
        en: "Date mentioned as a historical milestone for the school.",
      },
    },
    {
      label: { fr: "Évolution", en: "Growth" },
      text: {
        fr: "L'activité a évolué progressivement vers l'enseignement supérieur.",
        en: "Its activity gradually developed towards higher education.",
      },
    },
    {
      label: { fr: "Aujourd'hui", en: "Today" },
      text: {
        fr: "L'établissement est implanté à Sotuba ACI, Bamako.",
        en: "The school is based in Sotuba ACI, Bamako.",
      },
    },
  ] satisfies { label: Localized; text: Localized }[],
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
  registration: null as string | null,
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    website: "https://vercel.com",
  },
  // Durée de conservation des demandes : à fixer par AGRI'SUP.
  retentionPeriod: null as string | null,
};
