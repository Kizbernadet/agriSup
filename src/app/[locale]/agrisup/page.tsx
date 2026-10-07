import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { CheckIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { PedagogySteps } from "@/components/home/pedagogy_steps";
import { Timeline } from "@/components/ui/timeline";
import { INSTITUTION, INSTITUTION_DETAILS } from "@/content/placeholders";
import { toAppLocale } from "@/i18n/locale";
import fieldPhoto from "../../../../assets/photos/etudiants_3.webp";
import kakemono from "../../../../assets/photos/kakemono_offre_formations.jpg";
import labPhoto from "../../../../assets/photos/labo_1.jpeg";
import classroomPhoto from "../../../../assets/photos/salle_cours_1.jpeg";
import computerPhoto from "../../../../assets/photos/salle_informatique_2.jpeg";
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

  const [t, tPage, tNav, tGallery] = await Promise.all([
    getTranslations("pages.agrisup"),
    getTranslations("agrisup_page"),
    getTranslations("nav"),
    getTranslations("gallery"),
  ]);

  const anchors = [
    { id: "presentation", label: tPage("presentation_title") },
    { id: "histoire", label: tPage("history_title") },
    { id: "pedagogie", label: tPage("pedagogy_title") },
    { id: "infrastructures", label: tPage("infrastructures_title") },
  ];

  // Photos réelles de l'établissement (assets/photos).
  const facilities = [
    { id: "lab", image: labPhoto },
    { id: "computer", image: computerPhoto },
    { id: "classroom", image: classroomPhoto },
    { id: "field", image: fieldPhoto },
  ] as const;

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
        <div className={styles.presentation}>
          <div className={styles.presentation_text}>
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
          </div>
          <figure className={styles.kakemono}>
            <Image
              src={kakemono}
              alt={tGallery("kakemono")}
              sizes="(min-width: 1024px) 320px, 80vw"
              className={styles.kakemono_image}
              placeholder="blur"
            />
            <figcaption>{tGallery("kakemono")}</figcaption>
          </figure>
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

      <Section
        id="pedagogie"
        title={tPage("pedagogy_title")}
        intro={tPage("pedagogy_intro")}
      >
        <PedagogySteps locale={locale} />
      </Section>

      <Section
        id="infrastructures"
        tone="surface"
        title={tPage("infrastructures_title")}
        intro={tPage("infrastructures_intro")}
      >
        <ul className={styles.facilities}>
          {facilities.map((facility) => (
            <Card as="li" key={facility.id} className={styles.facility}>
              <Image
                src={facility.image}
                alt=""
                sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                quality={90}
                className={styles.facility_image}
                placeholder="blur"
              />
              <h3>{tPage(`infra_${facility.id}_title`)}</h3>
              <p>{tPage(`infra_${facility.id}_text`)}</p>
            </Card>
          ))}
        </ul>
      </Section>
    </>
  );
}
