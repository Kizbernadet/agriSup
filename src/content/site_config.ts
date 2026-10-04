import type { routing } from "@/i18n/routing";

type StaticPathname = Exclude<keyof typeof routing.pathnames, `${string}[${string}`>;

export type NavItem = {
  href: StaticPathname;
  labelKey:
    "home" | "agrisup" | "formations" | "admission" | "actualites" | "faq" | "contact";
};

// Menu principal du cahier de cadrage (§20) : court, dans l'ordre du parcours visiteur.
export const MAIN_NAV: readonly NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/agrisup", labelKey: "agrisup" },
  { href: "/formations", labelKey: "formations" },
  { href: "/admission", labelKey: "admission" },
  { href: "/actualites", labelKey: "actualites" },
  { href: "/faq", labelKey: "faq" },
  { href: "/contact", labelKey: "contact" },
];

// Niveau d'études déclaré à la préinscription (cahier §8.2). Liste générique proposée,
// à valider par AGRI'SUP selon ses conditions d'accès. Libellés dans messages > form.
export const EDUCATION_LEVELS = [
  "BAC_EN_COURS",
  "BAC",
  "BT",
  "BAC_PLUS_2",
  "LICENCE_OU_PLUS",
  "AUTRE",
] as const;
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];
