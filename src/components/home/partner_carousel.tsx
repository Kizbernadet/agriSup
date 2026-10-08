import Image, { type StaticImageData } from "next/image";
import { Card } from "@/components/ui/card";
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
// continue : avec peu de partenaires, la liste est répétée dans chaque moitié.
const MIN_ITEMS_PER_HALF = 4;

// Initiales d'un partenaire sans logo (« Tambaroua Business Farming » → « TBF »).
function initials(name: string) {
  const acronym = name.match(/^[A-Z0-9/]{2,}/)?.[0];
  if (acronym) {
    const letters = acronym.replace("/", "");
    return letters.length <= 5 ? letters : letters.slice(0, 3);
  }
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
}

// Ruban de partenaires à défilement continu (animation CSS, aucun script) : pause au
// survol et au focus, arrêt complet si le visiteur demande moins d'animations.
// Choix validé par la cliente : pas de bouton de contrôle (voir docs/decisions.md).
export function PartnerCarousel({ locale }: { locale: AppLocale }) {
  const partners = INSTITUTION.partners.map((partner) => ({
    ...partner,
    logo: PARTNER_LOGOS[partner.name],
  }));
  const copies = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / partners.length));
  const half = Array.from({ length: copies }, () => partners).flat();
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
                    <span className={styles.logo_fallback} aria-hidden="true">
                      {initials(partner.name)}
                    </span>
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
