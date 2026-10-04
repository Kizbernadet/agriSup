import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { PreinscriptionForm } from "@/components/forms/preinscription_form";
import { Alert } from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PhoneIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page_header";
import { CONTACT } from "@/content/placeholders";
import { toAppLocale } from "@/i18n/locale";
import { academicYearOptions } from "@/lib/academic_year";
import { listFormations } from "@/lib/data/formations";
import styles from "./preinscription.module.css";

// Liste des formations et années académiques recalculées au plus toutes les heures.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/preinscription">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.preinscription" });
  return { title: t("title"), description: t("description") };
}

export default async function PreinscriptionPage({
  params,
}: PageProps<"/[locale]/preinscription">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tPage, tNav, tAdmission, tFormation, tCommon, formations] = await Promise.all(
    [
      getTranslations("pages.preinscription"),
      getTranslations("preinscription_page"),
      getTranslations("nav"),
      getTranslations("admission_page"),
      getTranslations("formation"),
      getTranslations("common"),
      listFormations({ locale }),
    ],
  );

  const formationOptions = formations.map((formation) => ({
    value: formation.slug,
    label: `${tFormation(`level.${formation.level}`)} — ${formation.name}`,
  }));

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>{tPage("intro")}</p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />
      <Container className={styles.layout}>
        <div className={styles.main}>
          <Alert variant="info">{tAdmission("disclaimer")}</Alert>
          {/* Suspense requis : le formulaire lit ?formation= dans l'URL. */}
          <Suspense>
            <PreinscriptionForm
              formations={formationOptions}
              academicYears={academicYearOptions()}
            />
          </Suspense>
        </div>

        <aside className={styles.aside} aria-labelledby="aide_titre">
          <Card>
            <h2 id="aide_titre" className={styles.aside_title}>
              {tPage("help_title")}
            </h2>
            <p>{tPage("help_text")}</p>
            <ul className={styles.phones}>
              {CONTACT.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className={styles.phone}>
                    <PhoneIcon />
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
            <div className={styles.aside_actions}>
              <WhatsappButton />
              <ButtonLink href="/admission" variant="secondary">
                {tNav("admission")}
              </ButtonLink>
              <ButtonLink href="/formations" variant="secondary">
                {tCommon("discover_formations")}
              </ButtonLink>
            </div>
          </Card>
        </aside>
      </Container>
    </>
  );
}
