import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { Alert } from "@/components/ui/alert";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BriefcaseIcon,
  CheckIcon,
  ClipboardIcon,
  GraduationIcon,
  SparklesIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { Steps } from "@/components/ui/steps";
import {
  ADMISSION_DOCUMENTS,
  ADMISSION_PROFILES,
  ADVANTAGES,
  FEES,
  FEES_NOTES,
} from "@/content/agrisup";
import { toAppLocale } from "@/i18n/locale";
import { revealProps } from "@/lib/reveal";
import table from "@/components/ui/data_table.module.css";
import styles from "./admission.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/admission">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.admission" });
  return { title: t("title"), description: t("description") };
}

const PROFILE_ICONS = [GraduationIcon, ClipboardIcon, BriefcaseIcon];

// Cahier §7 : « Qui peut candidater ? », « Quels documents ? », « Combien ? »,
// « Comment faire ? ». Contenu officiel : src/content/agrisup.ts.
export default async function AdmissionPage({
  params,
}: PageProps<"/[locale]/admission">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tPage, tNav, tCommon] = await Promise.all([
    getTranslations("pages.admission"),
    getTranslations("admission_page"),
    getTranslations("nav"),
    getTranslations("common"),
  ]);
  const amount = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US");

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
        <ul className={styles.profiles}>
          {ADMISSION_PROFILES.map((profile, index) => {
            const Icon = PROFILE_ICONS[index] ?? GraduationIcon;
            return (
              <Card as="li" key={profile.title.fr} {...revealProps(index)}>
                <span className={styles.profile_icon} aria-hidden="true">
                  <Icon />
                </span>
                <h3 className={styles.card_title}>{profile.title[locale]}</h3>
                <p className={styles.muted}>{profile.text[locale]}</p>
              </Card>
            );
          })}
        </ul>
        <Card className={`${styles.guidance_card} ${styles.conditions_card}`}>
          <span className={styles.conditions_visual} aria-hidden="true">
            <UsersIcon />
          </span>
          <div className={styles.guidance_content}>
            <p>{tPage("conditions_guidance")}</p>
            <ButtonLink href="/contact">{tCommon("contact_us")}</ButtonLink>
          </div>
        </Card>
      </Section>

      <Section
        id="documents"
        tone="surface"
        eyebrow={tPage("eyebrow_documents")}
        title={tPage("documents_title")}
        intro={tPage("documents_intro")}
      >
        <ul className={styles.documents}>
          {ADMISSION_DOCUMENTS.map((document) => (
            <li key={document.fr}>
              <CheckIcon className={styles.check} />
              {document[locale]}
            </li>
          ))}
        </ul>
        <Card className={`${styles.guidance_card} ${styles.documents_card}`}>
          <div className={styles.guidance_content}>
            <p>{tPage("documents_guidance")}</p>
            <ButtonLink href="/preinscription" variant="secondary">
              {tCommon("preinscription")}
            </ButtonLink>
          </div>
          <span className={styles.documents_visual} aria-hidden="true">
            <ClipboardIcon />
          </span>
        </Card>
      </Section>

      <Section
        id="frais"
        eyebrow={tPage("eyebrow_fees")}
        title={tPage("fees_title")}
        intro={tPage("fees_intro")}
      >
        <div className={styles.fees}>
          {FEES.map((group) => {
            const total = group.rows.reduce((sum, row) => sum + row.amount, 0);
            return (
              <div key={group.program.fr} className={table.wrapper}>
                <table className={table.table}>
                  <caption>{group.program[locale]}</caption>
                  <thead>
                    <tr>
                      <th scope="col">{tPage("fees_col_item")}</th>
                      <th scope="col" className={table.amount}>
                        {tPage("fees_col_amount")}
                      </th>
                      <th scope="col">{tPage("fees_col_terms")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((row) => (
                      <tr key={row.label.fr}>
                        <th scope="row">{row.label[locale]}</th>
                        <td className={table.amount}>{amount.format(row.amount)}</td>
                        <td>{row.terms[locale]}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th scope="row">{tPage("fees_total")}</th>
                      <td className={table.amount}>{amount.format(total)}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            );
          })}
        </div>
        <ul className={styles.notes}>
          {FEES_NOTES.map((note) => (
            <li key={note.fr}>{note[locale]}</li>
          ))}
        </ul>
      </Section>

      <Section
        id="avantages"
        tone="surface"
        eyebrow={tPage("eyebrow_advantages")}
        title={tPage("advantages_title")}
        intro={tPage("advantages_intro")}
      >
        <ul className={styles.advantages}>
          {ADVANTAGES.map((advantage, index) => (
            <Card as="li" key={advantage.title.fr} {...revealProps(index)}>
              <span className={styles.profile_icon} aria-hidden="true">
                <SparklesIcon />
              </span>
              <h3 className={styles.card_title}>{advantage.title[locale]}</h3>
              <p className={styles.muted}>{advantage.text[locale]}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section
        id="procedure"
        eyebrow={tPage("eyebrow_procedure")}
        title={tPage("procedure_title")}
      >
        <Steps
          layout="wrapped"
          showConnectors={false}
          items={[1, 2, 3, 4, 5].map((step) => ({
            label: tPage(`step_${step}` as "step_1"),
            description: tPage(`step_${step}_description` as "step_1_description"),
          }))}
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
        pattern
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
