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
