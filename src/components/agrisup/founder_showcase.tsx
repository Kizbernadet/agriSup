import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MapPinIcon } from "@/components/ui/icons";
import { RichText } from "@/components/ui/rich_text";
import { FOUNDER_MISSIONS, FOUNDER_TEXT } from "@/content/agrisup";
import { FOUNDER } from "@/content/placeholders";
import type { AppLocale } from "@/i18n/routing";
import { revealProps } from "@/lib/reveal";
import labPhoto from "../../../assets/site/promoteur/encadrement_laboratoire.jpg";
import portrait from "../../../assets/site/promoteur/portrait.jpg";
import styles from "./founder_showcase.module.css";

// Section « Le fondateur » de la page AGRI'SUP : portrait et photo au laboratoire,
// texte, puis missions de partenariat à l'étranger (carrousel sur mobile).
// Nom, fonction et message n'apparaissent qu'une fois confirmés (FOUNDER, placeholders.ts).
export async function FounderShowcase({ locale }: { locale: AppLocale }) {
  const t = await getTranslations("agrisup_page");

  return (
    <div className={styles.showcase}>
      <div className={styles.intro}>
        <div className={styles.collage} {...revealProps()}>
          <Image
            src={portrait}
            alt={t("founder_portrait_alt")}
            sizes="(min-width: 1024px) 420px, 80vw"
            className={styles.portrait}
            placeholder="blur"
          />
          <Image
            src={labPhoto}
            alt={t("founder_lab_alt")}
            sizes="(min-width: 1024px) 220px, 40vw"
            className={styles.inset}
            placeholder="blur"
          />
        </div>

        <div className={styles.text} {...revealProps(1)}>
          {FOUNDER.name && (
            <p className={styles.identity}>
              <span className={styles.name}>{FOUNDER.name}</span>
              {FOUNDER.role && (
                <span className={styles.role}>{FOUNDER.role[locale]}</span>
              )}
            </p>
          )}
          <p className={styles.lead}>
            <RichText text={FOUNDER_TEXT[locale]} />
          </p>
          {FOUNDER.message && (
            <blockquote className={styles.quote}>
              <p>{FOUNDER.message[locale]}</p>
              <footer>{t("founder_message_label")}</footer>
            </blockquote>
          )}
        </div>
      </div>

      <div className={styles.missions}>
        <h3 className={styles.missions_title}>{t("founder_missions_title")}</h3>
        <div
          className={styles.scroller}
          role="region"
          aria-label={t("founder_missions_title")}
          tabIndex={0}
        >
          <ul className={styles.mission_list}>
            {FOUNDER_MISSIONS.map((mission, index) => (
              <li key={mission.id} className={styles.mission} {...revealProps(index)}>
                <figure>
                  <div className={styles.mission_frame}>
                    <Image
                      src={mission.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 78vw"
                      className={styles.mission_image}
                      placeholder="blur"
                    />
                    <span className={styles.country}>
                      <MapPinIcon aria-hidden="true" />
                      {mission.country[locale]}
                    </span>
                  </div>
                  <figcaption>{mission.caption[locale]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
