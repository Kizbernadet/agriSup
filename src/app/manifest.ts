import type { MetadataRoute } from "next";

// Manifeste de l'application installable (PWA), servi à /manifest.webmanifest.
// Un seul manifeste pour le site : textes en français, langue principale. La page
// d'accueil « / » redirige vers la langue du navigateur.
// Couleurs : Vert Terrain (icônes, écran de démarrage) et fond clair de la charte §3 ;
// le manifeste ne peut pas lire les variables CSS, les valeurs sont donc recopiées.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "AGRI'SUP — Sciences et technologies agricoles",
    short_name: "AGRI'SUP",
    description:
      "École supérieure privée des sciences et technologies agricoles, Bamako (Sotuba ACI) : formations DUT, licences et masters, admission et préinscription en ligne.",
    lang: "fr",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#2a724f",
    categories: ["education"],
    icons: [
      { src: "/icons/icone_192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icone_512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icons/icone_maskable_512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    // Raccourcis (appui long sur l'icône, Android et ordinateur).
    shortcuts: [
      { name: "Formations", url: "/fr/formations", icons: [{ src: "/icons/icone_192.png", sizes: "192x192" }] },
      { name: "Préinscription", url: "/fr/preinscription", icons: [{ src: "/icons/icone_192.png", sizes: "192x192" }] },
      { name: "Contact", url: "/fr/contact", icons: [{ src: "/icons/icone_192.png", sizes: "192x192" }] },
    ],
  };
}
