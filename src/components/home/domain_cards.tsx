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

export function DomainCards({ locale }: { locale: AppLocale }) {
  const tFormation = useTranslations("formation");
  const domains = Object.keys(DOMAINS) as FormationDomain[];

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
            <span className={styles.more} aria-hidden="true">
              {tFormation("domain_explore")}
              <ArrowRightIcon />
            </span>
          </p>
        </Card>
      ))}
    </ul>
  );
}
