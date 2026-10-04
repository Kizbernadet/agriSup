import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { Alert } from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { Steps } from "@/components/ui/steps";
import { ToProvide } from "@/components/ui/to_provide";
import { FormationLevel } from "@/generated/prisma/enums";
import { toAppLocale } from "@/i18n/locale";
import styles from "./admission.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/admission">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.admission" });
  return { title: t("title"), description: t("description") };
}

// Cahier §7 : répondre à « Qui peut candidater ? », « Quels documents ? », « Comment faire ? ».
// Conditions et documents officiels : à fournir par AGRI'SUP.
export default async function AdmissionPage({
  params,
}: PageProps<"/[locale]/admission">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tPage, tNav, tFormation, tCommon] = await Promise.all([
    getTranslations("pages.admission"),
    getTranslations("admission_page"),
    getTranslations("nav"),
    getTranslations("formation"),
    getTranslations("common"),
  ]);

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>{tPage("intro")}</p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />

      <Section
        id="conditions"
        title={tPage("conditions_title")}
        intro={tPage("conditions_intro")}
      >
        <ul className={styles.levels}>
          {Object.values(FormationLevel).map((level) => (
            <Card as="li" key={level}>
              <h3>{tFormation(`level.${level}`)}</h3>
              <ToProvide />
            </Card>
          ))}
        </ul>
      </Section>

      <Section
        id="documents"
        tone="surface"
        title={tPage("documents_title")}
        intro={tPage("documents_intro")}
      >
        <div>
          <ToProvide />
        </div>
      </Section>

      <Section id="procedure" title={tPage("procedure_title")}>
        <Steps
          items={[
            tPage("step_1"),
            tPage("step_2"),
            tPage("step_3"),
            tPage("step_4"),
            tPage("step_5"),
          ]}
        />
        <Alert variant="info">{tPage("disclaimer")}</Alert>
        <div className={styles.actions}>
          <ButtonLink href="/preinscription">{tCommon("preinscription")}</ButtonLink>
          <ButtonLink href="/formations" variant="secondary">
            {tCommon("discover_formations")}
          </ButtonLink>
        </div>
      </Section>

      <Section
        id="questions"
        tone="surface"
        title={tPage("questions_title")}
        intro={tPage("questions_text")}
      >
        <div className={styles.actions}>
          <ButtonLink href="/contact" variant="secondary">
            {tCommon("contact_us")}
          </ButtonLink>
          <WhatsappButton />
        </div>
      </Section>
    </>
  );
}
