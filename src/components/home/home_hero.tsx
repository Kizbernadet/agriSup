import { useTranslations } from "next-intl";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CheckIcon } from "@/components/ui/icons";
import { CONTACT, INSTITUTION } from "@/content/placeholders";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import styles from "./home_hero.module.css";

// Cahier §4.1 : AGRI'SUP, son domaine, son implantation, un message et les appels à l'action.
// Pas de photo tant qu'aucune photo réelle de l'école n'est disponible.
export function HomeHero({ locale }: { locale: AppLocale }) {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");
  const { address } = CONTACT;

  return (
    <section className={styles.hero} aria-labelledby="accueil_titre">
      <Container className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.kicker}>
            AGRI&apos;SUP · {address.street}, {address.city} — {address.country}
          </p>
          <h1 id="accueil_titre">{t("hero_title")}</h1>
          <p className={styles.lead}>{t("hero_lead")}</p>
          <div className={styles.actions}>
            <ButtonLink href="/formations">{tCommon("discover_formations")}</ButtonLink>
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
            {INSTITUTION.axes.map((axis) => (
              <li key={axis.fr}>
                <CheckIcon className={styles.check} />
                <span>{axis[locale]}</span>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </section>
  );
}
