import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FormationCatalog } from "@/components/formations/formation_catalog";
import { PosterFan } from "@/components/formations/poster_fan";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { toAppLocale } from "@/i18n/locale";
import { listFormations } from "@/lib/data/formations";
import affichesInscriptions from "../../../../assets/photos/annonce_1.jpeg";
import kakemono from "../../../../assets/photos/kakemono_offre_formations.jpg";
import afficheLmd from "../../../../assets/photos/poster_2.jpg";

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

  const [t, tNav, tPage, tGallery, formations] = await Promise.all([
    getTranslations("pages.formations"),
    getTranslations("nav"),
    getTranslations("formations_page"),
    getTranslations("gallery"),
    listFormations({ locale }),
  ]);

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>{tPage("intro")}</p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
        aside={
          <PosterFan
            posters={[
              {
                id: "affiche_inscriptions",
                image: affichesInscriptions,
                alt: tGallery("affiche_inscriptions"),
                sizes: "(min-width: 1024px) 290px, 46vw",
              },
              {
                id: "kakemono",
                image: kakemono,
                alt: tGallery("kakemono"),
                sizes: "(min-width: 1024px) 340px, 54vw",
              },
              {
                id: "affiche_lmd",
                image: afficheLmd,
                alt: tGallery("affiche_lmd"),
                sizes: "(min-width: 1024px) 290px, 46vw",
              },
            ]}
          />
        }
      />
      <Section>
        <FormationCatalog formations={formations} />
      </Section>
    </>
  );
}
