import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { Alert } from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ClipboardIcon,
  GraduationIcon,
  PhoneIcon,
  SearchIcon,
  SendIcon,
} from "@/components/ui/icons";
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
        eyebrow={tPage("eyebrow_conditions")}
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
        eyebrow={tPage("eyebrow_documents")}
        title={tPage("documents_title")}
        intro={tPage("documents_intro")}
      >
        <div>
          <ToProvide />
        </div>
      </Section>

      <Section
        id="procedure"
        eyebrow={tPage("eyebrow_procedure")}
        title={tPage("procedure_title")}
      >
        <Steps
          items={[
            { label: tPage("step_1"), icon: <SearchIcon /> },
            { label: tPage("step_2"), icon: <ClipboardIcon /> },
            { label: tPage("step_3"), icon: <SendIcon /> },
            { label: tPage("step_4"), icon: <PhoneIcon /> },
            { label: tPage("step_5"), icon: <GraduationIcon /> },
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
