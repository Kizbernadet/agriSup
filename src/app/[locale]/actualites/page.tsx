import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ActualiteCard } from "@/components/actualites/actualite_card";
import { PageHeader } from "@/components/ui/page_header";
import { Pagination } from "@/components/ui/pagination";
import { Section } from "@/components/ui/section";
import { toAppLocale } from "@/i18n/locale";
import { listActualites } from "@/lib/data/actualites";
import { revealProps } from "@/lib/reveal";
import styles from "./actualites.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/actualites">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.actualites" });
  return { title: t("title"), description: t("description") };
}

// Liste paginée (?page=2) : rendue à la demande, la pagination dépendant de l'URL.
export default async function ActualitesPage({
  params,
  searchParams,
}: PageProps<"/[locale]/actualites">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const requestedPage = Number((await searchParams).page);
  const page = Number.isInteger(requestedPage) && requestedPage > 1 ? requestedPage : 1;

  const [t, tPage, tNav, result] = await Promise.all([
    getTranslations("pages.actualites"),
    getTranslations("actualites_page"),
    getTranslations("nav"),
    listActualites({ locale, page }),
  ]);

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>{tPage("intro")}</p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />
      <Section>
        {result.items.length === 0 ? (
          <p>{tPage("empty")}</p>
        ) : (
          <ul className={styles.grid}>
            {result.items.map((actualite, index) => (
              <li key={actualite.slug} {...revealProps(index % 3)}>
                <ActualiteCard actualite={actualite} />
              </li>
            ))}
          </ul>
        )}
        <Pagination
          page={page}
          pageCount={result.pageCount}
          hrefFor={(target) => ({ pathname: "/actualites", query: { page: target } })}
          labels={{
            nav: tPage("pagination"),
            previous: tPage("previous"),
            next: tPage("next"),
            status: tPage("page_of", { page, count: Math.max(result.pageCount, 1) }),
          }}
        />
      </Section>
    </>
  );
}
