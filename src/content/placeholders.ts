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

  // Source : presentation_projet.md §10. Noms seulement : nature des partenariats et
  // autorisation d'utiliser les logos à obtenir (presentation_projet.md §11).
  partners: [
    {
      name: "IPR/IFRA de Katibougou",
      description: {
        fr: "Institut de formation et de recherche dans le domaine agricole",
        en: "Agricultural training and research institute",
      },
    },
    {
      name: "IER",
      description: { fr: "Institut d'Économie Rurale", en: "Institute of Rural Economy" },
    },
    {
      name: "Ordre des vétérinaires du Mali",
      description: { fr: "Organisation professionnelle", en: "Professional body" },
    },
  ] satisfies { name: string; description: Localized }[],
};
