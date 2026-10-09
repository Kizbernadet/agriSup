import { getTranslations, setRequestLocale } from "next-intl/server";
import { FormationGrid } from "@/components/formations/formation_grid";
import { DomainCards } from "@/components/home/domain_cards";
import { HomeHero } from "@/components/home/home_hero";
import { PartnerCarousel } from "@/components/home/partner_carousel";
import { PhotoGallery } from "@/components/home/photo_gallery";
import { PresentationVideo } from "@/components/home/presentation_video";
import type { ComponentProps } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  FieldIcon,
  GlobeIcon,
  GraduationIcon,
  SproutIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { RichText } from "@/components/ui/rich_text";
import { Section } from "@/components/ui/section";
import { PedagogySteps } from "@/components/home/pedagogy_steps";
import { SECTOR_POINTS } from "@/content/domains";
import { INSTITUTION } from "@/content/placeholders";
import { toAppLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { listFormations, type FormationSummary } from "@/lib/data/formations";
import { revealProps } from "@/lib/reveal";
import kakemono from "../../../assets/photos/non_classes/kakemono_offre_formations.jpg";
import embleme from "../../../assets/site/campus/enseigne_entree.jpg";
import elevage from "../../../assets/site/domaines/elevage_bovins.jpg";
import elevagePratique from "../../../assets/site/domaines/elevage_travaux_pratiques.jpg";
import tracteur from "../../../assets/site/domaines/tracteur_champ.jpg";
import photoGroupe from "../../../assets/site/etudiants/photo_groupe_entree.jpg";
import travauxPratiques from "../../../assets/site/etudiants/tp_microscopes_salle.jpg";
import salleInformatique from "../../../assets/site/etudiants/salle_informatique_cours.jpg";
import labo1 from "../../../assets/site/salles/laboratoire_microscopes.jpg";
import salleCours from "../../../assets/site/salles/salle_cours.jpg";
import styles from "./home.module.css";

export const revalidate = 3600;

const SECTOR_ICONS = [GlobeIcon, UsersIcon, BriefcaseIcon];
// Une icône par axe (même ordre que INSTITUTION.axes).
const AXIS_ICONS = [GraduationIcon, BriefcaseIcon, FieldIcon, SproutIcon];

// Deux licences et un DUT, dans l'ordre d'affichage défini en base.
function pickFeatured(formations: FormationSummary[]): FormationSummary[] {
  const licences = formations.filter((formation) => formation.level === "LICENCE_PRO");
  const duts = formations.filter((formation) => formation.level === "DUT");
  return [licences[0], duts[0], licences[1]].filter(
    (formation): formation is FormationSummary => formation !== undefined,
  );
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tCommon, tGallery, tAdmission, formations] = await Promise.all([
    getTranslations("home"),
    getTranslations("common"),
    getTranslations("gallery"),
    getTranslations("admission_page"),
    listFormations({ locale }),
  ]);

  const joinSteps = [
    {
      href: "/formations",
      label: t("cta_step_1"),
      description: tAdmission("step_1_description"),
    },
    {
      href: { pathname: "/admission", hash: "conditions" },
      label: t("cta_step_2"),
      description: tAdmission("step_2_description"),
    },
    {
      href: "/preinscription",
      label: t("cta_step_3"),
      description: tAdmission("step_3_description"),
    },
  ] satisfies {
    href: ComponentProps<typeof Link>["href"];
    label: string;
    description: string;
  }[];

  return (
    <>
      <HomeHero />

      <Section id="presentation">
        <div className={styles.intro}>
          <div className={styles.intro_text} {...revealProps()}>
            <Eyebrow>{t("eyebrow_about")}</Eyebrow>
            <h2>
              <RichText text={t("intro_title")} />
            </h2>
            <p className={styles.presentation}>
              <RichText text={INSTITUTION.presentation[locale]} />
            </p>
            <ul className={styles.axes} aria-label={t("axes_title")}>
              {INSTITUTION.axes.map((axis, index) => {
                const Icon = AXIS_ICONS[index] ?? SproutIcon;
                return (
                  <li key={axis.fr}>
                    <span className={styles.axis_icon} aria-hidden="true">
                      <Icon />
                    </span>
                    {axis[locale]}
                  </li>
                );
              })}
            </ul>
            <div>
              <ButtonLink href="/agrisup" variant="secondary">
                {t("intro_more")}
              </ButtonLink>
            </div>
          </div>
          <div {...revealProps(1)} data-parallax="float">
            <PresentationVideo />
          </div>
        </div>
      </Section>

      <Section
        id="domaines"
        eyebrow={t("eyebrow_domains")}
        title={t("domains_title")}
        intro={t("domains_intro")}
      >
        <DomainCards locale={locale} />
      </Section>

      <Section
        id="formations"
        tone="surface"
        eyebrow={t("eyebrow_featured")}
        title={t("featured_title")}
      >
        <FormationGrid formations={pickFeatured(formations)} />
        <div>
          <ButtonLink href="/formations">
            {t("featured_all")}
            <ArrowRightIcon />
          </ButtonLink>
        </div>
      </Section>

      <Section
        id="secteur"
        eyebrow={t("eyebrow_sector")}
        title={t("sector_title")}
        intro={t("sector_intro")}
      >
        <ul className={styles.sector}>
          {SECTOR_POINTS.map((point, index) => {
            const Icon = SECTOR_ICONS[index] ?? GlobeIcon;
            return (
              <Card as="li" key={point.title.fr} {...revealProps(index)}>
                <span className={styles.sector_icon} aria-hidden="true">
                  <Icon />
                </span>
                <h3 className={styles.card_title}>{point.title[locale]}</h3>
                <p className={styles.muted}>{point.text[locale]}</p>
              </Card>
            );
          })}
        </ul>
      </Section>

      <Section
        id="galerie"
        tone="surface"
        eyebrow={tGallery("eyebrow")}
        title={tGallery("title")}
        intro={tGallery("intro")}
      >
        <PhotoGallery
          items={[
            {
              id: "labo",
              image: labo1,
              caption: tGallery("labo"),
              sizes: "(min-width: 1024px) 520px, (min-width: 640px) 66vw, 100vw",
            },
            {
              id: "kakemono",
              image: kakemono,
              caption: tGallery("kakemono"),
              sizes: "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw",
            },
            {
              id: "elevage",
              image: elevage,
              caption: tGallery("elevage"),
              sizes: "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
            },
            {
              id: "tracteur",
              image: tracteur,
              caption: tGallery("tracteur"),
              sizes: "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw",
            },
            {
              id: "embleme",
              image: embleme,
              caption: tGallery("embleme"),
              sizes: "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw",
            },
            {
              id: "informatique",
              image: salleInformatique,
              caption: tGallery("informatique"),
              sizes: "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw",
            },
            {
              id: "salle_cours",
              image: salleCours,
              caption: tGallery("salle_cours"),
              sizes: "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
            },
            {
              id: "microscopes",
              image: travauxPratiques,
              caption: tGallery("microscopes"),
              sizes: "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
            },
            {
              id: "pratique",
              image: elevagePratique,
              caption: tGallery("pratique"),
              sizes: "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 50vw",
            },
          ]}
        />
      </Section>

      <Section
        id="pourquoi"
        eyebrow={t("eyebrow_pedagogy")}
        title={t("why_title")}
        intro={t("why_intro")}
      >
        <PedagogySteps locale={locale} />
      </Section>

      <Section
        id="partenaires"
        tone="surface"
        eyebrow={t("eyebrow_partners")}
        title={t("partners_title")}
        intro={t("partners_intro")}
      >
        <PartnerCarousel locale={locale} />
      </Section>

      <section
        id="rejoindre"
        aria-labelledby="rejoindre_titre"
        className={styles.cta_band}
      >
        {/* Photo de fond décorative sous un voile sombre (texte lisible quelle que soit l'image). */}
        <Image
          src={photoGroupe}
          alt=""
          fill
          sizes="100vw"
          className={styles.cta_photo}
          data-parallax="layer"
        />
        <Container className={styles.cta_inner}>
          <div {...revealProps()}>
            <Eyebrow onBand>{t("eyebrow_join")}</Eyebrow>
            <h2 id="rejoindre_titre">
              <RichText text={t("cta_title")} />
            </h2>
          </div>
          <ol className={styles.admission_steps}>
            {joinSteps.map((step, index) => (
              <li key={step.label} className={styles.admission_step}>
                <span className={styles.admission_number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.admission_step_text}>
                  <Link href={step.href}>{step.label}</Link>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className={styles.cta_action}>
            <ButtonLink href="/preinscription">
              {tCommon("preinscription")}
              <ArrowRightIcon />
            </ButtonLink>
            <p className={styles.cta_note}>{t("cta_note")}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
