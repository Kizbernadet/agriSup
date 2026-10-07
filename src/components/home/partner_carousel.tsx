import Image, { type StaticImageData } from "next/image";
import { Card } from "@/components/ui/card";
import { BookIcon } from "@/components/ui/icons";
import { INSTITUTION } from "@/content/placeholders";
import type { AppLocale } from "@/i18n/routing";
import afgBankLogo from "../../../assets/photos/afg_bank_logo_2.png";
import iprIfraLogo from "../../../assets/photos/ipr_ifra_logo.jpg";
import styles from "./partner_carousel.module.css";

const PARTNER_LOGOS: Partial<Record<string, StaticImageData>> = {
  "IPR/IFRA de Katibougou": iprIfraLogo,
  "AFG Bank": afgBankLogo,
};

// Chaque moitié du ruban doit dépasser la largeur visible pour que la boucle soit
// continue : les partenaires sont répétés COPIES fois par moitié.
const COPIES = 3;

// Ruban de partenaires à défilement continu (animation CSS, aucun script) : pause au
// survol et au focus, arrêt complet si le visiteur demande moins d'animations.
// Choix validé par la cliente : pas de bouton de contrôle (voir docs/decisions.md).
export function PartnerCarousel({ locale }: { locale: AppLocale }) {
  const partners = INSTITUTION.partners.map((partner) => ({
    ...partner,
    logo: PARTNER_LOGOS[partner.name],
  }));
  const half = Array.from({ length: COPIES }, () => partners).flat();
  const ribbon = [...half, ...half];

  return (
    <div className={styles.marquee}>
      <ul className={styles.track}>
        {ribbon.map((partner, index) => {
          // Seule la première occurrence de chaque partenaire est lue par les lecteurs d'écran.
          const duplicate = index >= partners.length;
          return (
            <li
              key={`${partner.name}-${index}`}
              className={styles.item}
              aria-hidden={duplicate ? true : undefined}
              data-duplicate={duplicate ? "" : undefined}
            >
              <Card className={styles.card}>
                <div className={styles.logo_frame}>
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt=""
                      className={styles.logo}
                      sizes="(min-width: 640px) 128px, 96px"
                    />
                  ) : (
                    <BookIcon className={styles.logo_fallback} />
                  )}
                </div>
                <div className={styles.text}>
                  <h3>{partner.name}</h3>
                  <p>{partner.description[locale]}</p>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
