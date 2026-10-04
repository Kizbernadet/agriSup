import { useTranslations } from "next-intl";
import { DomainIcon } from "@/components/formations/domain_icon";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { DOMAINS } from "@/content/domains";
import type { FormationDomain } from "@/generated/prisma/enums";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { revealProps } from "@/lib/reveal";
import styles from "./domain_cards.module.css";

type DomainCardsProps = {
  locale: AppLocale;
  // Nombre de formations publiées par domaine (domaines sans formation non affichés).
  counts: Partial<Record<FormationDomain, number>>;
};

export function DomainCards({ locale, counts }: DomainCardsProps) {
  const t = useTranslations("home");
  const tFormation = useTranslations("formation");
  const domains = (Object.keys(DOMAINS) as FormationDomain[]).filter(
    (domain) => (counts[domain] ?? 0) > 0,
  );

  return (
    <ul className={styles.grid}>
      {domains.map((domain, index) => (
        <Card
          as="li"
          key={domain}
          interactive
          className={styles.card}
          {...revealProps(index)}
        >
          <DomainIcon domain={domain} />
          <h3 className={styles.title}>
            {/* Toute la carte est cliquable via ce lien (pseudo-élément étendu). */}
            <Link
              href={{ pathname: "/formations", query: { domaine: domain } }}
              className={styles.link}
            >
              {tFormation(`domain.${domain}`)}
            </Link>
          </h3>
          <p className={styles.description}>{DOMAINS[domain].description[locale]}</p>
          <p className={styles.footer}>
            <span className={styles.count}>
              {t("domains_count", { count: counts[domain] ?? 0 })}
            </span>
            <span className={styles.more} aria-hidden="true">
              {t("domains_link")}
              <ArrowRightIcon />
            </span>
          </p>
        </Card>
      ))}
    </ul>
  );
}
