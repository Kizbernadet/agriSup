import type { FormationDomain, FormationLevel, Locale } from "@/generated/prisma/enums";
import { DOMAINS } from "@/content/domains";
import { db } from "@/lib/db";
import { localesToLoad, pickTranslation } from "./translations";

function formationSummary(summary: string, domain: FormationDomain, locale: Locale) {
  if (!summary.trim() || /^\s*\[(?:à fournir|to be provided)\]/i.test(summary)) {
    return DOMAINS[domain].description[locale];
  }
  return summary;
}

export type FormationSummary = {
  slug: string;
  level: FormationLevel;
  domain: FormationDomain;
  durationSemesters: number | null;
  credits: number | null;
  verified: boolean;
  name: string;
  summary: string;
};

export type FormationDetail = FormationSummary & {
  // Langue réellement servie (différente de la demande si la traduction manque).
  locale: Locale;
  description: string | null;
  program: string | null;
  objectives: string[];
  skills: string[];
  careerOpportunities: string[];
  admissionRequirements: string[];
  requiredDocuments: string[];
};

type ListFormationsOptions = {
  locale: Locale;
  level?: FormationLevel;
  domain?: FormationDomain;
};

export async function listFormations({
  locale,
  level,
  domain,
}: ListFormationsOptions): Promise<FormationSummary[]> {
  const formations = await db.formation.findMany({
    where: { published: true, level, domain },
    orderBy: { sortOrder: "asc" },
    include: { translations: { where: { locale: { in: localesToLoad(locale) } } } },
  });

  return formations.flatMap(({ translations, ...formation }) => {
    const translation = pickTranslation(translations, locale);
    if (!translation) return [];
    return [
      {
        slug: formation.slug,
        level: formation.level,
        domain: formation.domain,
        durationSemesters: formation.verified ? formation.durationSemesters : null,
        credits: formation.verified ? formation.credits : null,
        verified: formation.verified,
        name: translation.name,
        summary: formationSummary(translation.summary, formation.domain, locale),
      },
    ];
  });
}

// Pour la génération statique des pages détail au build.
export async function listPublishedFormationSlugs(): Promise<string[]> {
  const formations = await db.formation.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return formations.map((formation) => formation.slug);
}

export async function getFormationBySlug(
  locale: Locale,
  slug: string,
): Promise<FormationDetail | null> {
  const formation = await db.formation.findFirst({
    where: { slug, published: true },
    include: { translations: { where: { locale: { in: localesToLoad(locale) } } } },
  });
  if (!formation) return null;

  const translation = pickTranslation(formation.translations, locale);
  if (!translation) return null;

  return {
    slug: formation.slug,
    level: formation.level,
    domain: formation.domain,
    durationSemesters: formation.verified ? formation.durationSemesters : null,
    credits: formation.verified ? formation.credits : null,
    verified: formation.verified,
    locale: translation.locale,
    name: translation.name,
    summary: formationSummary(translation.summary, formation.domain, locale),
    description: translation.description,
    program: translation.program,
    objectives: translation.objectives,
    skills: translation.skills,
    careerOpportunities: translation.careerOpportunities,
    admissionRequirements: translation.admissionRequirements,
    requiredDocuments: translation.requiredDocuments,
  };
}
