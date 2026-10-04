import type { ActualiteCategory, Locale } from "@/generated/prisma/enums";
import type { Prisma } from "@/generated/prisma/client";
import { db } from "@/lib/db";
import { localesToLoad, pickTranslation } from "./translations";

export const ACTUALITES_PAGE_SIZE = 9;

export type ActualiteSummary = {
  slug: string;
  category: ActualiteCategory;
  imagePath: string | null;
  publishedAt: Date;
  verified: boolean;
  title: string;
  excerpt: string;
};

export type ActualiteDetail = ActualiteSummary & {
  locale: Locale;
  content: string;
};

export type ActualitesPage = {
  items: ActualiteSummary[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

// Publiée et dont la date de publication est passée (permet de programmer une actualité).
function visibleNow(): Prisma.ActualiteWhereInput {
  return { published: true, publishedAt: { lte: new Date() } };
}

export async function listActualites({
  locale,
  page,
  pageSize = ACTUALITES_PAGE_SIZE,
}: {
  locale: Locale;
  page: number;
  pageSize?: number;
}): Promise<ActualitesPage> {
  const where = visibleNow();
  const [total, actualites] = await Promise.all([
    db.actualite.count({ where }),
    db.actualite.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { translations: { where: { locale: { in: localesToLoad(locale) } } } },
    }),
  ]);

  const items = actualites.flatMap(({ translations, ...actualite }) => {
    const translation = pickTranslation(translations, locale);
    if (!translation || !actualite.publishedAt) return [];
    return [
      {
        slug: actualite.slug,
        category: actualite.category,
        imagePath: actualite.imagePath,
        publishedAt: actualite.publishedAt,
        verified: actualite.verified,
        title: translation.title,
        excerpt: translation.excerpt,
      },
    ];
  });

  return { items, page, pageSize, total, pageCount: Math.ceil(total / pageSize) };
}

export async function getActualiteBySlug(
  locale: Locale,
  slug: string,
): Promise<ActualiteDetail | null> {
  const actualite = await db.actualite.findFirst({
    where: { slug, ...visibleNow() },
    include: { translations: { where: { locale: { in: localesToLoad(locale) } } } },
  });
  if (!actualite?.publishedAt) return null;

  const translation = pickTranslation(actualite.translations, locale);
  if (!translation) return null;

  return {
    slug: actualite.slug,
    category: actualite.category,
    imagePath: actualite.imagePath,
    publishedAt: actualite.publishedAt,
    verified: actualite.verified,
    locale: translation.locale,
    title: translation.title,
    excerpt: translation.excerpt,
    content: translation.content,
  };
}
