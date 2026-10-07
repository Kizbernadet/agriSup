/**
 * Données de test — lancées par `npm run db:seed` (idempotent : relançable sans doublon).
 *
 * - Formations : intitulés et niveaux relevés sur le kakémono officiel
 *   (assets/photos/kakemono_offre_formations.jpg) ; durées LMD confirmées par la cliente ;
 *   fiches détaillées rédigées dans prisma/formation_content.ts (voir l'en-tête du fichier).
 * - Actualités : FICTIVES, inspirées des affiches de assets/annonces/ (non publiées).
 *   À supprimer avant la mise en ligne.
 * - Traductions anglaises : rédigées à partir du français, à faire relire.
 */
import { PrismaPg } from "@prisma/adapter-pg";
import { loadEnvConfig } from "@next/env";
import { PrismaClient } from "../src/generated/prisma/client";
import type {
  ActualiteCategory,
  FormationDomain,
  FormationLevel,
} from "../src/generated/prisma/enums";
import { frenchTypography } from "../src/lib/typography";
import { FORMATION_CONTENT } from "./formation_content";

loadEnvConfig(process.cwd());

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL manquante : voir .env.example.");
}
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

type FormationSeed = {
  slug: string;
  level: FormationLevel;
  domain: FormationDomain;
  name: { fr: string; en: string };
};

// Ordre d'affichage = ordre du kakémono (licences puis DUT).
const FORMATIONS: FormationSeed[] = [
  {
    slug: "licence-pro-agronomie",
    level: "LICENCE_PRO",
    domain: "PRODUCTION_VEGETALE",
    name: { fr: "Agronomie", en: "Agronomy" },
  },
  {
    slug: "licence-pro-agribusiness",
    level: "LICENCE_PRO",
    domain: "AGRIBUSINESS",
    name: { fr: "Agribusiness", en: "Agribusiness" },
  },
  {
    slug: "licence-pro-zootechnie",
    level: "LICENCE_PRO",
    domain: "ELEVAGE_SANTE_ANIMALE",
    name: { fr: "Zootechnie", en: "Animal Science" },
  },
  {
    slug: "licence-pro-medecine-veterinaire",
    level: "LICENCE_PRO",
    domain: "ELEVAGE_SANTE_ANIMALE",
    name: { fr: "Médecine vétérinaire", en: "Veterinary Medicine" },
  },
  {
    slug: "licence-pro-aquaculture",
    level: "LICENCE_PRO",
    domain: "AQUACULTURE",
    name: { fr: "Aquaculture", en: "Aquaculture" },
  },
  {
    slug: "licence-pro-agroforesterie",
    level: "LICENCE_PRO",
    domain: "AGROFORESTERIE",
    name: { fr: "Agroforesterie", en: "Agroforestry" },
  },
  {
    slug: "dut-production-maraichere",
    level: "DUT",
    domain: "PRODUCTION_VEGETALE",
    name: { fr: "Production maraîchère", en: "Market Gardening" },
  },
  {
    slug: "dut-production-lait-viande",
    level: "DUT",
    domain: "ELEVAGE_SANTE_ANIMALE",
    name: { fr: "Production de lait et de viande", en: "Milk and Meat Production" },
  },
  {
    slug: "dut-technico-commercial-pharmacie-veterinaire",
    level: "DUT",
    domain: "ELEVAGE_SANTE_ANIMALE",
    name: {
      fr: "Technico-commercial de pharmacie vétérinaire",
      en: "Veterinary Pharmacy Sales",
    },
  },
  {
    slug: "dut-production-semence-agricole",
    level: "DUT",
    domain: "PRODUCTION_VEGETALE",
    name: { fr: "Production de semence agricole", en: "Agricultural Seed Production" },
  },
  {
    slug: "dut-insemination-artificielle",
    level: "DUT",
    domain: "ELEVAGE_SANTE_ANIMALE",
    name: { fr: "Insémination artificielle", en: "Artificial Insemination" },
  },
  {
    slug: "dut-agroforesterie",
    level: "DUT",
    domain: "AGROFORESTERIE",
    name: { fr: "Agroforesterie", en: "Agroforestry" },
  },
];

type ActualiteSeed = {
  slug: string;
  category: ActualiteCategory;
  // Affiche de assets/annonces/ copiée dans public/images/actualites/ (générée par IA).
  imagePath: string;
  publishedAt: Date;
  fr: { title: string; excerpt: string; content: string };
  en: { title: string; excerpt: string; content: string };
};

// FICTIF : actualités de démonstration, conservées en brouillon.
const ACTUALITES: ActualiteSeed[] = [
  {
    slug: "preinscriptions-en-ligne-ouvertes",
    imagePath: "/images/actualites/affiche_inscriptions_continuent.jpg",
    category: "ADMISSIONS",
    publishedAt: new Date("2026-10-01T09:00:00Z"),
    fr: {
      title: "Les préinscriptions en ligne sont ouvertes",
      excerpt:
        "Vous pouvez désormais transmettre votre demande de préinscription depuis le site.",
      content:
        "Le formulaire de préinscription en ligne permet de transmettre vos premières informations à AGRI'SUP. L'établissement vous recontacte ensuite pour la suite de la procédure d'admission.\n\nAvant de remplir le formulaire, consultez la liste des formations et les conditions d'admission.",
    },
    en: {
      title: "Online pre-registration is open",
      excerpt: "You can now send your pre-registration request from the website.",
      content:
        "The online pre-registration form lets you send your first details to AGRI'SUP. The school will then contact you about the next steps of the admission process.\n\nBefore filling in the form, please check the list of programs and the admission requirements.",
    },
  },
  {
    slug: "sortie-pedagogique-visite-de-ferme",
    imagePath: "/images/actualites/affiche_sortie_pedagogique.jpg",
    category: "ACTIVITE_PRATIQUE",
    publishedAt: new Date("2026-09-24T09:00:00Z"),
    fr: {
      title: "Sortie pédagogique : apprendre sur le terrain",
      excerpt: "Une visite d'exploitation agricole pour relier les cours à la pratique.",
      content:
        "Les étudiants ont participé à une visite d'exploitation agricole encadrée par leurs enseignants.\n\nCe type de sortie illustre le parcours pédagogique d'AGRI'SUP : des connaissances théoriques à la mise en pratique, puis à l'immersion dans le domaine agricole.",
    },
    en: {
      title: "Field trip: learning on the ground",
      excerpt: "A farm visit to connect classroom learning with practice.",
      content:
        "Students took part in a farm visit supervised by their teachers.\n\nThis kind of trip reflects AGRI'SUP's teaching approach: from theoretical knowledge to hands-on practice, then immersion in the agricultural sector.",
    },
  },
  {
    slug: "pourquoi-etudier-a-agrisup",
    imagePath: "/images/actualites/affiche_pourquoi_agrisup.jpg",
    category: "ANNONCE",
    publishedAt: new Date("2026-09-15T09:00:00Z"),
    fr: {
      title: "Pourquoi étudier à AGRI'SUP ?",
      excerpt:
        "Formation supérieure agricole, professionnalisation et pratique de terrain.",
      content:
        "AGRI'SUP est une école supérieure privée spécialisée dans les sciences et technologies agricoles, implantée à Sotuba ACI, Bamako.\n\nSa formation s'articule autour de quatre axes : la formation supérieure agricole, la professionnalisation, la pratique de terrain et l'orientation vers les métiers agricoles.",
    },
    en: {
      title: "Why study at AGRI'SUP?",
      excerpt: "Higher agricultural education, professional training and fieldwork.",
      content:
        "AGRI'SUP is a private higher school specialising in agricultural sciences and technologies, based in Sotuba ACI, Bamako.\n\nIts training is built around four pillars: higher agricultural education, professional training, fieldwork and preparation for agricultural careers.",
    },
  },
];

async function seedFormations() {
  for (const [index, formation] of FORMATIONS.entries()) {
    const isLicence = formation.level === "LICENCE_PRO";
    const content = FORMATION_CONTENT[formation.slug];
    if (!content) throw new Error(`Contenu manquant pour ${formation.slug}.`);
    const data = {
      level: formation.level,
      domain: formation.domain,
      // Cadre LMD : licence professionnelle en 3 ans, DUT en 2 ans.
      durationSemesters: isLicence ? 6 : 4,
      credits: isLicence ? 180 : 120,
      published: true,
      verified: true,
      sortOrder: index,
    };
    const translations = (["fr", "en"] as const).map((locale) => {
      const text = content[locale];
      const typo = locale === "fr" ? frenchTypography : (value: string) => value;
      return {
        locale,
        name: formation.name[locale],
        summary: typo(text.summary),
        description: typo(text.description),
        objectives: text.objectives.map(typo),
        skills: text.skills.map(typo),
        program: typo(text.program),
        careerOpportunities: text.careers.map(typo),
      };
    });

    await db.formation.upsert({
      where: { slug: formation.slug },
      create: { slug: formation.slug, ...data, translations: { create: translations } },
      update: { ...data, translations: { deleteMany: {}, create: translations } },
    });
  }
}

async function seedActualites() {
  for (const actualite of ACTUALITES) {
    const data = {
      category: actualite.category,
      imagePath: actualite.imagePath,
      published: false,
      publishedAt: actualite.publishedAt,
      verified: false,
    };
    const translations = (["fr", "en"] as const).map((locale) => ({
      locale,
      ...actualite[locale],
    }));

    await db.actualite.upsert({
      where: { slug: actualite.slug },
      create: { slug: actualite.slug, ...data, translations: { create: translations } },
      update: { ...data, translations: { deleteMany: {}, create: translations } },
    });
  }
}

async function main() {
  await seedFormations();
  await seedActualites();
  console.log(
    `Données de test : ${FORMATIONS.length} formations, ${ACTUALITES.length} actualités.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
