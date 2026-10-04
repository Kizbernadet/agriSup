import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { Steps } from "@/components/ui/steps";
import { Timeline } from "@/components/ui/timeline";
import { ToProvide } from "@/components/ui/to_provide";
import { INSTITUTION, INSTITUTION_DETAILS } from "@/content/placeholders";
import { toAppLocale } from "@/i18n/locale";
import styles from "./agrisup.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/agrisup">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.agrisup" });
  return { title: t("title"), description: t("description") };
}

// Cahier §5 : présentation, histoire, vision et mission, pédagogie, direction.
// Une seule page, sous-parties accessibles par ancres (choix validé par la cliente).
export default async function AgrisupPage({ params }: PageProps<"/[locale]/agrisup">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tPage, tNav] = await Promise.all([
    getTranslations("pages.agrisup"),
    getTranslations("agrisup_page"),
    getTranslations("nav"),
  ]);

  const anchors = [
    { id: "presentation", label: tPage("presentation_title") },
    { id: "histoire", label: tPage("history_title") },
    { id: "vision-mission", label: tPage("vision_mission_title") },
    { id: "pedagogie", label: tPage("pedagogy_title") },
    { id: "direction", label: tPage("direction_title") },
  ];

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>{tPage("intro")}</p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      >
        <nav aria-label={tPage("on_this_page")} className={styles.anchors}>
          <ul>
            {anchors.map((anchor) => (
              <li key={anchor.id}>
                <a href={`#${anchor.id}`}>{anchor.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <Section id="presentation" title={tPage("presentation_title")}>
        <p className={styles.lead}>{INSTITUTION.presentation[locale]}</p>
        <div className={styles.block}>
          <h3>{tPage("fields_title")}</h3>
          <ul className={styles.fields}>
            {INSTITUTION_DETAILS.fields.map((field) => (
              <li key={field.fr}>
                <CheckIcon className={styles.check} />
                {field[locale]}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section id="histoire" tone="surface" title={tPage("history_title")}>
        <Alert variant="info">{tPage("history_unverified")}</Alert>
        <Timeline
          items={INSTITUTION_DETAILS.history.map((step) => ({
            label: step.label[locale],
            text: step.text[locale],
          }))}
        />
      </Section>

      <Section id="vision-mission" title={tPage("vision_mission_title")}>
        <div className={styles.cards}>
          <Card>
            <h3>{tPage("vision_title")}</h3>
            <ToProvide />
          </Card>
          <Card>
            <h3>{tPage("mission_title")}</h3>
            <ToProvide />
          </Card>
        </div>
      </Section>

      <Section
        id="pedagogie"
        tone="surface"
        title={tPage("pedagogy_title")}
        intro={tPage("pedagogy_intro")}
      >
        <Steps items={INSTITUTION.pedagogy.map((step) => step[locale])} />
        <Card>
          <h3>{tPage("infrastructures_title")}</h3>
          <ToProvide />
        </Card>
      </Section>

      <Section id="direction" title={tPage("direction_title")}>
        <p>{tPage("direction_text")}</p>
        <div>
          <ToProvide />
        </div>
      </Section>
    </>
  );
}
