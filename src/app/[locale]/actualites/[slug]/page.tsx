import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page_header";
import { Paragraphs } from "@/components/ui/paragraphs";
import { toAppLocale } from "@/i18n/locale";
import { getActualiteBySlug, listPublishedActualiteSlugs } from "@/lib/data/actualites";
import styles from "./actualite_detail.module.css";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await listPublishedActualiteSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/actualites/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const actualite = await getActualiteBySlug(toAppLocale(locale), slug);
  if (!actualite) return {};
  return { title: actualite.title, description: actualite.excerpt };
}

export default async function ActualiteDetailPage({
  params,
}: PageProps<"/[locale]/actualites/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  const locale = toAppLocale(rawLocale);
  setRequestLocale(locale);

  const actualite = await getActualiteBySlug(locale, slug);
  if (!actualite) notFound();

  const [tPage, tNav, format] = await Promise.all([
    getTranslations("actualites_page"),
    getTranslations("nav"),
    getFormatter(),
  ]);

  return (
    <>
      <PageHeader
        title={actualite.title}
        intro={<p>{actualite.excerpt}</p>}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("actualites"), href: "/actualites" },
          { label: actualite.title },
        ]}
      >
        <div className={styles.meta}>
          <Badge>{tPage(`category.${actualite.category}`)}</Badge>
          <time dateTime={actualite.publishedAt.toISOString()}>
            {tPage("published_on", {
              date: format.dateTime(actualite.publishedAt, { dateStyle: "long" }),
            })}
          </time>
        </div>
      </PageHeader>

      <Container className={styles.body}>
        <article className={styles.article}>
          {actualite.imagePath && (
            <div className={styles.media}>
              <Image
                src={actualite.imagePath}
                alt={actualite.title}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className={styles.image}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          )}
          <div className={styles.content}>
            <Paragraphs text={actualite.content} />
          </div>
        </article>
        <div>
          <ButtonLink href="/actualites" variant="secondary">
            ← {tPage("back")}
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
