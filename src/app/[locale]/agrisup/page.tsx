import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { CheckIcon, GlobeIcon, InstitutionIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { PedagogySteps } from "@/components/home/pedagogy_steps";
import { Timeline } from "@/components/ui/timeline";
import {
  CAMPUS_FACTS,
  EXPERTISE,
  HISTORY,
  HISTORY_INTRO,
  LMD_PATHS,
  MOTIVATION,
  MOTTO,
  PARTNERSHIPS,
  RECOGNITION,
  SEAL_MOTTO,
  VALUES,
} from "@/content/agrisup";
import { INSTITUTION, INSTITUTION_DETAILS } from "@/content/placeholders";
import { toAppLocale } from "@/i18n/locale";
import { revealProps } from "@/lib/reveal";
import fieldPhoto from "../../../../assets/photos/etudiants_3.webp";
import kakemono from "../../../../assets/photos/kakemono_offre_formations.jpg";
import labPhoto from "../../../../assets/photos/labo_1.jpeg";
import classroomPhoto from "../../../../assets/photos/salle_cours_1.jpeg";
import computerPhoto from "../../../../assets/photos/salle_informatique_2.jpeg";
import table from "@/components/ui/data_table.module.css";
import styles from "./agrisup.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/agrisup">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.agrisup" });
  return { title: t("title"), description: t("description") };
}

// Présentation de l'établissement : identité, histoire, valeurs, système LMD, expertise,
// partenariats, pédagogie et infrastructures. Une seule page, avec des ancres.
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
    { id: "valeurs", label: tPage("values_title") },
    { id: "lmd", label: tPage("lmd_title") },
    { id: "expertise", label: tPage("expertise_title") },
    { id: "partenariats", label: tPage("partners_title") },
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
            <p className={styles.recognition}>
              <InstitutionIcon className={styles.recognition_icon} />
              <span>
                <strong>{tPage("recognition_label")}</strong> {RECOGNITION[locale]}
              </span>
            </p>
            <blockquote className={styles.motto}>
              <p>{locale === "fr" ? `« ${MOTTO[locale]} »` : `“${MOTTO[locale]}”`}</p>
              <footer>{tPage("motto_label")}</footer>
            </blockquote>
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

      <Section
        id="histoire"
        tone="surface"
        title={tPage("history_title")}
        intro={HISTORY_INTRO[locale]}
      >
        <Timeline
          items={HISTORY.map((step) => ({
            label: step.label,
            title: step.title[locale],
            text: step.text[locale],
          }))}
        />
      </Section>

      <Section id="valeurs" title={tPage("values_title")} intro={MOTIVATION[locale]}>
        <ul className={styles.values}>
          {VALUES.map((value, index) => (
            <Card
              as="li"
              key={value.title.fr}
              className={styles.value}
              {...revealProps(index)}
            >
              <span className={styles.value_number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{value.title[locale]}</h3>
              <p>{value.text[locale]}</p>
            </Card>
          ))}
        </ul>
        <p className={styles.seal_motto}>
          <span>{tPage("seal_motto_label")}</span>
          <strong>{SEAL_MOTTO[locale]}</strong>
        </p>
      </Section>

      <Section
        id="lmd"
        tone="surface"
        title={tPage("lmd_title")}
        intro={tPage("lmd_intro")}
      >
        <div className={table.wrapper}>
          <table className={table.table}>
            <caption className="visually_hidden">{tPage("lmd_title")}</caption>
            <thead>
              <tr>
                <th scope="col">{tPage("lmd_col_level")}</th>
                <th scope="col">{tPage("lmd_col_duration")}</th>
                <th scope="col">{tPage("lmd_col_goal")}</th>
              </tr>
            </thead>
            <tbody>
              {LMD_PATHS.map((path) => (
                <tr key={path.level.fr}>
                  <th scope="row">{path.level[locale]}</th>
                  <td>{path.duration[locale]}</td>
                  <td>{path.goal[locale]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="expertise" title={tPage("expertise_title")}>
        <div className={styles.expertise}>
          <div className={styles.expertise_text}>
            {EXPERTISE.map((paragraph) => (
              <p key={paragraph.fr}>{paragraph[locale]}</p>
            ))}
          </div>
          <Card className={styles.campus}>
            <h3>{tPage("campus_title")}</h3>
            <ul>
              {CAMPUS_FACTS.map((fact) => (
                <li key={fact.fr}>
                  <CheckIcon className={styles.check} />
                  {fact[locale]}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section
        id="partenariats"
        tone="surface"
        title={tPage("partners_title")}
        intro={tPage("partners_intro")}
      >
        <div className={styles.partnerships}>
          {(["national", "international"] as const).map((scope) => (
            <div key={scope} className={styles.partner_group}>
              <h3>
                {scope === "national" ? (
                  <InstitutionIcon className={styles.group_icon} />
                ) : (
                  <GlobeIcon className={styles.group_icon} />
                )}
                {tPage(`partners_${scope}`)}
              </h3>
              <ul>
                {PARTNERSHIPS[scope].map((partner) => (
                  <li key={partner.name}>
                    <strong>{partner.name}</strong>
                    <span>{partner.description[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
