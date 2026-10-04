import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FormationCatalog } from "@/components/formations/formation_catalog";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { toAppLocale } from "@/i18n/locale";
import { listFormations } from "@/lib/data/formations";

// Page statique régénérée au plus toutes les heures (modifications en base).
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/formations">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.formations" });
  return { title: t("title"), description: t("description") };
}

export default async function FormationsPage({
  params,
}: PageProps<"/[locale]/formations">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tNav, tPage, formations] = await Promise.all([
    getTranslations("pages.formations"),
    getTranslations("nav"),
    getTranslations("formations_page"),
    listFormations({ locale }),
  ]);

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>{tPage("intro")}</p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />
      <Section>
        <FormationCatalog formations={formations} />
      </Section>
    </>
  );
}
