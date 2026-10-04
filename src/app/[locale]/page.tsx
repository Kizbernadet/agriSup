import { getTranslations, setRequestLocale } from "next-intl/server";
import { FormationGrid } from "@/components/formations/formation_grid";
import { HomeHero } from "@/components/home/home_hero";
import { KeyFigures } from "@/components/home/key_figures";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Steps } from "@/components/ui/steps";
import { INSTITUTION } from "@/content/placeholders";
import { toAppLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { listFormations, type FormationSummary } from "@/lib/data/formations";
import styles from "./home.module.css";

export const revalidate = 3600;

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

  const [t, tCommon, formations] = await Promise.all([
    getTranslations("home"),
    getTranslations("common"),
    listFormations({ locale }),
  ]);

  const figures = [
    { value: formations.length, label: t("figures_formations") },
    { value: new Set(formations.map((f) => f.level)).size, label: t("figures_levels") },
    { value: new Set(formations.map((f) => f.domain)).size, label: t("figures_domains") },
  ];

  return (
    <>
      <HomeHero locale={locale} />

      <Section id="presentation" title={t("intro_title")}>
        <p className={styles.presentation}>{INSTITUTION.presentation[locale]}</p>
        <div>
          <ButtonLink href="/agrisup" variant="secondary">
            {t("intro_more")}
          </ButtonLink>
        </div>
      </Section>

      <Section id="chiffres" tone="surface" title={t("figures_title")}>
        <KeyFigures figures={figures} />
      </Section>

      <Section id="formations" title={t("featured_title")}>
        <FormationGrid formations={pickFeatured(formations)} />
        <div>
          <ButtonLink href="/formations">{t("featured_all")}</ButtonLink>
        </div>
      </Section>

      <Section id="pourquoi" tone="surface" title={t("why_title")} intro={t("why_intro")}>
        <Steps items={INSTITUTION.pedagogy.map((step) => step[locale])} />
      </Section>

      <Section id="partenaires" title={t("partners_title")} intro={t("partners_intro")}>
        <ul className={styles.partners}>
          {INSTITUTION.partners.map((partner) => (
            <Card as="li" key={partner.name}>
              <h3 className={styles.partner_name}>{partner.name}</h3>
              <p className={styles.partner_description}>{partner.description[locale]}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section id="rejoindre" tone="surface" title={t("cta_title")}>
        <Steps
          items={[
            <Link key="formations" href="/formations">
              {t("cta_step_1")}
            </Link>,
            <Link key="conditions" href={{ pathname: "/admission", hash: "conditions" }}>
              {t("cta_step_2")}
            </Link>,
            <Link key="preinscription" href="/preinscription">
              {t("cta_step_3")}
            </Link>,
          ]}
        />
        <div>
          <ButtonLink href="/preinscription">{tCommon("preinscription")}</ButtonLink>
        </div>
      </Section>
    </>
  );
}
