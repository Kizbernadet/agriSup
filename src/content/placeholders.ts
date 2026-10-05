/**
 * Données institutionnelles NON VALIDÉES par AGRI'SUP.
 *
 * Tout ce fichier doit être relu avec l'établissement avant la mise en ligne
 * (voir la section « Avant mise en ligne » de docs/checklist.md).
 * Chaque valeur indique sa source et son statut.
 */

export const CONTACT = {
  // Source : presentation_projet.md §5, précisée par la cliente (Commune I). À confirmer.
  address: {
    street: "Sotuba ACI",
    district: "Commune I",
    city: "Bamako",
    country: "Mali",
  },

  // Source : presentation_projet.md §12 et kakémono (assets/photos). À confirmer.
  // Numéros OFFICIELS affichés sur le site ; le WhatsApp de test passe par l'environnement.
  phones: [
    { display: "+223 74 98 74 47", tel: "+22374987447" },
    { display: "+223 66 72 43 89", tel: "+22366724389" },
  ],

  // TEST : adresse fournie pour les essais. L'email officiel reste à fournir.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,

  // TEST : numéro WhatsApp d'essai (+34…). Officiel probable d'après le kakémono :
  // +223 66 72 43 89. À basculer avant la mise en ligne.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || null,
} as const;

// Texte localisé : les traductions anglaises sont à faire relire.
type Localized = { fr: string; en: string };

export const INSTITUTION = {
  // Source : presentation_projet.md §13, « formulation de travail volontairement
  // générale », à remplacer par la présentation officielle d'AGRI'SUP.
  presentation: {
    fr: "AGRI'SUP est une école supérieure privée spécialisée dans les sciences et technologies agricoles. Implantée à Sotuba ACI à Bamako, elle s'inscrit dans une démarche de formation de professionnels dans les domaines liés à l'agriculture, à l'élevage et aux autres secteurs des sciences agricoles.",
    en: "AGRI'SUP is a private higher school specialising in agricultural sciences and technologies. Based in Sotuba ACI, Bamako, it trains professionals in agriculture, livestock farming and other agricultural science sectors.",
  } satisfies Localized,

  // Source : presentation_projet.md §18 (« positionnement recommandé »). À confirmer.
  axes: [
    { fr: "Formation supérieure agricole", en: "Higher agricultural education" },
    { fr: "Professionnalisation", en: "Professional training" },
    { fr: "Pratique et terrain", en: "Hands-on fieldwork" },
    {
      fr: "Orientation vers les métiers agricoles",
      en: "Preparation for agricultural careers",
    },
  ] satisfies Localized[],

  // Source : presentation_projet.md §6 (parcours pédagogique conceptuel). À confirmer.
  pedagogy: [
    { fr: "Connaissances théoriques", en: "Theoretical knowledge" },
    { fr: "Mise en pratique", en: "Hands-on practice" },
    {
      fr: "Immersion dans le domaine agricole",
      en: "Immersion in the agricultural sector",
    },
    { fr: "Professionnalisation", en: "Professional readiness" },
  ] satisfies Localized[],

  // Noms issus des éléments fournis ; la nature de toute collaboration reste à confirmer.
  partners: [
    {
      name: "IPR/IFRA de Katibougou",
      description: {
        fr: "Formation agricole ; partenariat à confirmer.",
        en: "Agricultural training; partnership to be confirmed.",
      },
    },
    {
      name: "AFG Bank",
      description: {
        fr: "Banque ; partenariat à confirmer.",
        en: "Bank; partnership to be confirmed.",
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
  // Source : presentation_projet.md §2. « La liste définitive des domaines doit être
  // confirmée par AGRI'SUP. »
  fields: [
    { fr: "Agriculture", en: "Agriculture" },
    { fr: "Élevage", en: "Livestock farming" },
    { fr: "Production animale", en: "Animal production" },
    { fr: "Aquaculture", en: "Aquaculture" },
    { fr: "Autres sciences agricoles", en: "Other agricultural sciences" },
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
