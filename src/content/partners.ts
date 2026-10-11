import type { StaticImageData } from "next/image";
import afgBankLogo from "../../assets/site/partenaires/afg_bank.png";
import carfsLogo from "../../assets/site/partenaires/carfs.png";
import fermeBoyaSyllaPhoto from "../../assets/site/partenaires/ferme_boya_sylla.jpg";
import fermeSidibePhoto from "../../assets/site/partenaires/ferme_sidibe.jpg";
import fermeTiernoSidibePhoto from "../../assets/site/partenaires/ferme_tierno_sidibe.jpg";
import ierLogo from "../../assets/site/partenaires/ier.png";
import iprIfraLogo from "../../assets/site/partenaires/ipr_ifra.png";
import keproLogo from "../../assets/site/partenaires/kepro.png";
import kisamenLogo from "../../assets/site/partenaires/kisamen.png";
import lihuaLogo from "../../assets/site/partenaires/lihua.png";
import purdueLogo from "../../assets/site/partenaires/purdue.png";
import tambarouaLogo from "../../assets/site/partenaires/tambaroua.png";

/**
 * Partenaires d'AGRI'SUP : source unique du ruban de l'accueil et du mur de la page
 * AGRI'SUP. Sources : document « Partenariats et coopération », dépliant (convention
 * IPR/IFRA du 10 février 2026) et premiers documents de la cliente (AFG Bank).
 *
 * Pour compléter un partenaire :
 * - logo : déposer l'image dans assets/photos/partenaires/, l'ajouter à LOGOS dans
 *   scripts/prepare_photos.ts puis lancer npm run photos (PNG sur fond clair
 *   de préférence), l'importer en haut de ce fichier, puis l'indiquer dans « logo » ;
 * - lien : indiquer l'adresse complète du site officiel dans « url » (https://…).
 * - photo : pour un partenaire sans logo (ferme), photo de l'exploitation, même procédure
 *   (PHOTOS dans scripts/prepare_photos.ts).
 * Sans logo, un monogramme aux couleurs de la charte est affiché ; sans lien, aucun
 * bouton « Site web ». Le ruban de l'accueil n'affiche que les partenaires avec logo.
 */

type Localized = { fr: string; en: string };

export type PartnerScope = "national" | "international";
export type PartnerCategory = "formation" | "animal" | "farm" | "finance";

export type Partner = {
  id: string;
  name: string;
  scope: PartnerScope;
  category: PartnerCategory;
  // Ville ou pays affiché sur la carte.
  location: Localized;
  // Pays, pour les chiffres clés (nombre de pays et de continents).
  country: string;
  continent: "afrique" | "amerique" | "europe" | "asie";
  description: Localized;
  logo?: StaticImageData;
  // Photo du partenaire (exploitation), en couverture de sa carte.
  photo?: StaticImageData;
  url?: string;
};

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  "formation",
  "animal",
  "farm",
  "finance",
];

export const PARTNERS: Partner[] = [
  {
    id: "ipr-ifra",
    name: "IPR/IFRA de Katibougou",
    scope: "national",
    category: "formation",
    location: { fr: "Koulikoro, Mali", en: "Koulikoro, Mali" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Institut polytechnique rural de formation et de recherche appliquée, référence de l'enseignement supérieur agricole au Mali et dans la sous-région. Convention de partenariat signée le 10 février 2026.",
      en: "Rural polytechnic institute for training and applied research, a reference in agricultural higher education in Mali and the region. Partnership agreement signed on 10 February 2026.",
    },
    logo: iprIfraLogo,
  },
  {
    id: "ier",
    name: "IER",
    scope: "national",
    category: "formation",
    location: { fr: "Bamako, Mali", en: "Bamako, Mali" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Institut d'économie rurale, référence malienne et sous-régionale de la recherche agricole.",
      en: "Institute of Rural Economy, a Malian and regional reference in agricultural research.",
    },
    logo: ierLogo,
  },
  {
    id: "purdue",
    name: "Purdue University",
    scope: "international",
    category: "formation",
    location: { fr: "Indiana, États-Unis", en: "Indiana, United States" },
    country: "États-Unis",
    continent: "amerique",
    description: {
      fr: "Université de référence mondiale en formation agricole, partenaire de la refonte de nos programmes en système LMD.",
      en: "A world-leading agricultural university, partner in redesigning our programs within the LMD system.",
    },
    url: "https://www.purdue.edu",
    logo: purdueLogo,
  },
  {
    id: "carfs",
    name: "CARFS",
    scope: "international",
    category: "formation",
    location: { fr: "Burkina Faso", en: "Burkina Faso" },
    country: "Burkina Faso",
    continent: "afrique",
    description: {
      fr: "Centre africain de recherche et de formation en synécoculture.",
      en: "African centre for research and training in synecoculture.",
    },
    logo: carfsLogo,
  },
  {
    id: "cnia",
    name: "CNIA",
    scope: "national",
    category: "animal",
    location: { fr: "Mali", en: "Mali" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Centre national d'insémination artificielle : coopération technique pour la formation en reproduction animale.",
      en: "National artificial insemination centre: technical cooperation for training in animal reproduction.",
    },
  },
  {
    id: "sahel-veto",
    name: "Sahel Veto",
    scope: "national",
    category: "animal",
    location: { fr: "Mali", en: "Mali" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Établissement vétérinaire pharmaceutique d'import-export.",
      en: "Veterinary pharmaceutical import-export company.",
    },
  },
  {
    id: "kisamen",
    name: "KISAMEN",
    scope: "international",
    category: "animal",
    location: { fr: "Pays-Bas", en: "Netherlands" },
    country: "Pays-Bas",
    continent: "europe",
    description: {
      fr: "Laboratoire de production de semences bovines.",
      en: "Bovine semen production laboratory.",
    },
    logo: kisamenLogo,
  },
  {
    id: "kepro",
    name: "KEPRO",
    scope: "international",
    category: "animal",
    location: { fr: "Pays-Bas", en: "Netherlands" },
    country: "Pays-Bas",
    continent: "europe",
    description: {
      fr: "Laboratoire pharmaceutique vétérinaire.",
      en: "Veterinary pharmaceutical laboratory.",
    },
    logo: keproLogo,
  },
  {
    id: "lihua",
    name: "LIHUA",
    scope: "international",
    category: "animal",
    location: { fr: "Chine", en: "China" },
    country: "Chine",
    continent: "asie",
    description: {
      fr: "Laboratoire pharmaceutique vétérinaire.",
      en: "Veterinary pharmaceutical laboratory.",
    },
    logo: lihuaLogo,
  },
  {
    id: "tambaroua",
    name: "Tambaroua Business Farming",
    scope: "national",
    category: "farm",
    location: { fr: "Samaya, Bamako", en: "Samaya, Bamako" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Ferme partenaire : stages, visites et partenariat technique.",
      en: "Partner farm: internships, visits and technical partnership.",
    },
    logo: tambarouaLogo,
  },
  {
    id: "ferme-sidibe",
    name: "Ferme Sidibé",
    scope: "national",
    category: "farm",
    location: { fr: "Mali", en: "Mali" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Référence de la production maraîchère sous serre.",
      en: "A reference in greenhouse vegetable production.",
    },
    photo: fermeSidibePhoto,
  },
  {
    id: "ferme-boya-sylla",
    name: "Ferme Boya Sylla",
    scope: "national",
    category: "farm",
    location: { fr: "Mali", en: "Mali" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Exploitation partenaire pour les stages et les visites de terrain.",
      en: "Partner farm for internships and field visits.",
    },
    photo: fermeBoyaSyllaPhoto,
  },
  {
    id: "ferme-tierno-sidibe",
    name: "Ferme Tierno Sidibé",
    scope: "national",
    category: "farm",
    location: { fr: "Mali", en: "Mali" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Exploitation partenaire pour les stages et les visites de terrain.",
      en: "Partner farm for internships and field visits.",
    },
    photo: fermeTiernoSidibePhoto,
  },
  {
    id: "afg-bank",
    name: "AFG Bank",
    scope: "national",
    category: "finance",
    location: { fr: "Mali", en: "Mali" },
    country: "Mali",
    continent: "afrique",
    description: {
      fr: "Établissement bancaire présent au Mali, acteur du financement de l'économie.",
      en: "A bank operating in Mali that helps finance the economy.",
    },
    logo: afgBankLogo,
  },
];

// Monogramme d'un partenaire sans logo (« Tambaroua Business Farming » → « TBF »).
export function partnerInitials(name: string) {
  const acronym = name.match(/^[A-Z0-9/]{2,}/)?.[0];
  if (acronym) {
    const letters = acronym.replace("/", "");
    return letters.length <= 5 ? letters : letters.slice(0, 3);
  }
  return name
    .split(/\s+/)
    .filter((word) => /^[A-ZÀ-Ý]/.test(word))
    .map((word) => word[0])
    .join("")
    .slice(0, 3);
}
