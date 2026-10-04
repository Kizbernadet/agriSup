import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  // Les clés sont les routes internes (noms de dossiers en snake_case) ;
  // les valeurs sont les URL publiques, traduites et en kebab-case pour le SEO.
  pathnames: {
    "/": "/",
    "/agrisup": { fr: "/agrisup", en: "/about" },
    "/formations": { fr: "/formations", en: "/programs" },
    "/formations/[slug]": { fr: "/formations/[slug]", en: "/programs/[slug]" },
    "/admission": { fr: "/admission", en: "/admissions" },
    "/preinscription": { fr: "/preinscription", en: "/pre-registration" },
    "/actualites": { fr: "/actualites", en: "/news" },
    "/actualites/[slug]": { fr: "/actualites/[slug]", en: "/news/[slug]" },
    "/faq": "/faq",
    "/contact": "/contact",
    "/mentions_legales": { fr: "/mentions-legales", en: "/legal-notice" },
    // Outil interne de contrôle visuel, 404 en production.
    "/guide_style": "/guide-style",
  },
});

export type AppLocale = (typeof routing.locales)[number];
