import { useTranslations } from "next-intl";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  FieldIcon,
  GraduationIcon,
  SproutIcon,
} from "@/components/ui/icons";
import { CONTACT, INSTITUTION } from "@/content/placeholders";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import styles from "./home_hero.module.css";

// Une icône par axe (même ordre que INSTITUTION.axes).
const AXIS_ICONS = [GraduationIcon, BriefcaseIcon, FieldIcon, SproutIcon];

// Cahier §4.1 : AGRI'SUP, son domaine, son implantation, un message et les appels à l'action.
// Pas de photo tant qu'aucune photo réelle de l'école n'est disponible : le relief vient
// d'un motif décoratif (champs et soleil) dessiné avec les couleurs de la charte.
// Rien n'est masqué ni animé ici : c'est le premier contenu affiché (performance).
export function HomeHero({ locale }: { locale: AppLocale }) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const { address } = CONTACT;

  return (
    <section className={styles.hero} aria-labelledby="accueil_titre">
      <HeroPattern />
      <Container className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.kicker}>
            AGRI&apos;SUP · {address.street}, {address.city} — {address.country}
          </p>
          <h1 id="accueil_titre">{t("hero_title")}</h1>
          <p className={styles.lead}>{t("hero_lead")}</p>
          <ul className={styles.badges}>
            <li>{t("hero_badge_levels")}</li>
            <li>{t("hero_badge_lmd")}</li>
          </ul>
          <div className={styles.actions}>
            <ButtonLink href="/formations">
              {tCommon("discover_formations")}
              <ArrowRightIcon />
            </ButtonLink>
            <ButtonLink href="/preinscription" variant="secondary">
              {tCommon("preinscription")}
            </ButtonLink>
            <WhatsappButton />
          </div>
          <Link href="/contact" className={styles.contact_link}>
            {tCommon("contact_us")}
          </Link>
        </div>

        <aside className={styles.axes} aria-labelledby="axes_titre">
          <h2 id="axes_titre" className={styles.axes_title}>
            {t("axes_title")}
          </h2>
          <ul className={styles.axes_list}>
            {INSTITUTION.axes.map((axis, index) => {
              const Icon = AXIS_ICONS[index] ?? SproutIcon;
              return (
                <li key={axis.fr}>
                  <span className={styles.axis_icon}>
                    <Icon />
                  </span>
                  <span>{axis[locale]}</span>
                </li>
              );
            })}
          </ul>
        </aside>
      </Container>
    </section>
  );
}

// Motif décoratif : sillons de champ et soleil levant, purement visuel.
function HeroPattern() {
  return (
    <svg
      className={styles.pattern}
      viewBox="0 0 600 400"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <circle className={styles.sun} cx="470" cy="150" r="70" />
      <circle className={styles.sun_ring} cx="470" cy="150" r="105" />
      <path className={styles.field} d="M0 400 C150 300 350 270 600 290 L600 400 Z" />
      <path
        className={styles.field_back}
        d="M80 400 C230 330 420 320 600 340 L600 400 Z"
      />
      <g className={styles.furrows}>
        <path d="M120 400 C250 340 420 320 600 322" />
        <path d="M220 400 C320 355 460 345 600 350" />
        <path d="M330 400 C410 372 500 368 600 375" />
      </g>
    </svg>
  );
}
