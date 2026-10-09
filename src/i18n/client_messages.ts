import type { AbstractIntlMessages } from "next-intl";

// Espaces de traduction utilisés par les composants exécutés dans le navigateur
// (« use client ») et par les composants partagés qu'ils affichent. Les autres textes
// sont rendus sur le serveur : inutile de les envoyer à chaque page (gain de poids et
// d'analyse sur mobile). Ajouter ici tout nouvel espace utilisé côté client.
const CLIENT_NAMESPACES = [
  "contact_form",
  "contact_page",
  "faq_bot",
  "form",
  "form_errors",
  "formation",
  "formations_page",
  "gallery",
  "header",
  "home",
  "language",
  "nav",
  "partners",
  "preinscription_page",
  "pwa",
  "slider",
  "theme",
  "whatsapp",
] as const;

export function pickClientMessages(messages: AbstractIntlMessages): AbstractIntlMessages {
  return Object.fromEntries(
    CLIENT_NAMESPACES.filter((namespace) => namespace in messages).map((namespace) => [
      namespace,
      messages[namespace],
    ]),
  );
}
