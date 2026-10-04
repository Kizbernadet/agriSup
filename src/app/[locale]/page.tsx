import { getTranslations, setRequestLocale } from "next-intl/server";
import { FormationGrid } from "@/components/formations/formation_grid";
import { DomainCards } from "@/components/home/domain_cards";
import { HomeHero } from "@/components/home/home_hero";
import { KeyFigures } from "@/components/home/key_figures";
import { PresentationVideo } from "@/components/home/presentation_video";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  ArrowRightIcon,
  BookIcon,
  BriefcaseIcon,
  ClipboardIcon,
  GlobeIcon,
  GraduationIcon,
  SearchIcon,
  SendIcon,
  SproutIcon,
  UsersIcon,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { Steps } from "@/components/ui/steps";
import { PedagogySteps } from "@/components/home/pedagogy_steps";
import { SECTOR_POINTS } from "@/content/domains";
import { INSTITUTION } from "@/content/placeholders";
import type { FormationDomain } from "@/generated/prisma/enums";
import { toAppLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { listFormations, type FormationSummary } from "@/lib/data/formations";
import { revealProps } from "@/lib/reveal";
import styles from "./home.module.css";

export const revalidate = 3600;

const SECTOR_ICONS = [GlobeIcon, UsersIcon, BriefcaseIcon];

// Deux licences et un DUT, dans l'ordre d'affichage défini en base.
function pickFeatured(formations: FormationSummary[]): FormationSummary[] {
  const licences = formations.filter((formation) => formation.level === "LICENCE_PRO");
  const duts = formations.filter((formation) => formation.level === "DUT");
  return [licences[0], duts[0], licences[1]].filter(
    (formation): formation is FormationSummary => formation !== undefined,
  );
}

function countByDomain(formations: FormationSummary[]) {
  const counts: Partial<Record<FormationDomain, number>> = {};
  for (const formation of formations) {
    counts[formation.domain] = (counts[formation.domain] ?? 0) + 1;
  }
  return counts;
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tCommon, formations] = await Promise.all([
    getTranslations("home"),
    getTranslations("common"),
    listFormations({ locale }),
  ]);

  const domainCounts = countByDomain(formations);
  const figures = [
    {
      value: formations.length,
      label: t("figures_formations"),
      icon: <GraduationIcon />,
    },
    {
      value: new Set(formations.map((f) => f.level)).size,
      label: t("figures_levels"),
      icon: <BookIcon />,
    },
    {
      value: Object.keys(domainCounts).length,
      label: t("figures_domains"),
      icon: <SproutIcon />,
    },
  ];

  return (
    <>
      <HomeHero locale={locale} />

      <Section id="presentation">
        <div className={styles.intro}>
          <div className={styles.intro_text} {...revealProps()}>
            <Eyebrow>{t("eyebrow_about")}</Eyebrow>
            <h2>{t("intro_title")}</h2>
            <p className={styles.presentation}>{INSTITUTION.presentation[locale]}</p>
            <div>
              <ButtonLink href="/agrisup" variant="secondary">
                {t("intro_more")}
              </ButtonLink>
            </div>
          </div>
          <div {...revealProps(1)}>
            <PresentationVideo />
          </div>
        </div>
      </Section>

      <Section
        id="chiffres"
        tone="surface"
        eyebrow={t("eyebrow_figures")}
        title={t("figures_title")}
      >
        <KeyFigures figures={figures} />
      </Section>

      <Section
        id="domaines"
        eyebrow={t("eyebrow_domains")}
        title={t("domains_title")}
        intro={t("domains_intro")}
      >
        <DomainCards locale={locale} counts={domainCounts} />
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
        id="pourquoi"
        tone="surface"
        eyebrow={t("eyebrow_pedagogy")}
        title={t("why_title")}
        intro={t("why_intro")}
      >
        <PedagogySteps locale={locale} />
      </Section>

      <Section
        id="partenaires"
        eyebrow={t("eyebrow_partners")}
        title={t("partners_title")}
        intro={t("partners_intro")}
      >
        <ul className={styles.partners}>
          {INSTITUTION.partners.map((partner, index) => (
            <Card as="li" key={partner.name} {...revealProps(index)}>
              <span className={styles.partner_monogram} aria-hidden="true">
                {partner.name.slice(0, 1)}
              </span>
              <h3 className={styles.card_title}>{partner.name}</h3>
              <p className={styles.muted}>{partner.description[locale]}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <section
        id="rejoindre"
        aria-labelledby="rejoindre_titre"
        className={styles.cta_band}
      >
        <Container className={styles.cta_inner}>
          <div {...revealProps()}>
            <Eyebrow>{t("eyebrow_join")}</Eyebrow>
            <h2 id="rejoindre_titre">{t("cta_title")}</h2>
          </div>
          <Steps
            items={[
              {
                label: <Link href="/formations">{t("cta_step_1")}</Link>,
                icon: <SearchIcon />,
              },
              {
                label: (
                  <Link href={{ pathname: "/admission", hash: "conditions" }}>
                    {t("cta_step_2")}
                  </Link>
                ),
                icon: <ClipboardIcon />,
              },
              {
                label: <Link href="/preinscription">{t("cta_step_3")}</Link>,
                icon: <SendIcon />,
              },
            ]}
          />
          <div>
            <ButtonLink href="/preinscription">
              {tCommon("preinscription")}
              <ArrowRightIcon />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
