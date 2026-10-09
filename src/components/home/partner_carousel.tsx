import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PARTNERS, partnerInitials } from "@/content/partners";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import styles from "./partner_carousel.module.css";

// Chaque moitié du ruban doit dépasser la largeur visible pour que la boucle soit
// continue : avec peu de partenaires, la liste est répétée dans chaque moitié.
const MIN_ITEMS_PER_HALF = 4;

// Ruban de partenaires à défilement continu (animation CSS, aucun script) : pause au
// survol et au focus, arrêt complet si le visiteur demande moins d'animations.
// Choix validé par la cliente : pas de bouton de contrôle (voir docs/decisions.md).
// Partenaires « featured » de src/content/partners.ts ; liste complète sur la page AGRI'SUP.
export function PartnerCarousel({ locale }: { locale: AppLocale }) {
  const t = useTranslations("partners");
  const partners = PARTNERS.filter((partner) => partner.featured);
  const copies = Math.max(1, Math.ceil(MIN_ITEMS_PER_HALF / partners.length));
  const half = Array.from({ length: copies }, () => partners).flat();
  const ribbon = [...half, ...half];

  return (
    <div className={styles.wrapper}>
      <div className={styles.marquee}>
        <ul className={styles.track}>
          {ribbon.map((partner, index) => {
            // Seule la première occurrence de chaque partenaire est lue et atteignable au
            // clavier ; les doublons du ruban sont masqués et inertes.
            const duplicate = index >= partners.length;
            return (
              <li
                key={`${partner.id}-${index}`}
                className={styles.item}
                aria-hidden={duplicate ? true : undefined}
                inert={duplicate}
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
                        {partnerInitials(partner.name)}
                      </span>
                    )}
                  </div>
                  <div className={styles.text}>
                    <h3>
                      {partner.url ? (
                        <a
                          href={partner.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {partner.name}
                          <span className="visually_hidden">
                            {" "}
                            {t("new_tab", { name: partner.name })}
                          </span>
                        </a>
                      ) : (
                        partner.name
                      )}
                    </h3>
                    <p>{partner.location[locale]}</p>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
      <Link
        href={{ pathname: "/agrisup", hash: "partenariats" }}
        className={styles.see_all}
      >
        {t("see_all")}
        <ArrowRightIcon aria-hidden="true" />
      </Link>
    </div>
  );
}
