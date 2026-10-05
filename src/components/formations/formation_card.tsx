import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";
import type { FormationSummary } from "@/lib/data/formations";
import { DomainIcon } from "./domain_icon";
import { FormationMeta } from "./formation_meta";
import styles from "./formation_card.module.css";

type FormationCardProps = {
  formation: FormationSummary;
  // Niveau du titre selon la page (h2 dans une liste sans sous-titre, h3 sinon).
  headingLevel?: "h2" | "h3";
};

export function FormationCard({
  formation,
  headingLevel: Heading = "h3",
}: FormationCardProps) {
  const t = useTranslations("formation");

  return (
    <Card as="article" interactive className={styles.card}>
      <div className={styles.top}>
        <DomainIcon domain={formation.domain} />
        <Badge>{t(`level.${formation.level}`)}</Badge>
      </div>
      <Heading className={styles.title}>
        {/* Toute la carte est cliquable via ce lien (pseudo-élément étendu). */}
        <Link
          href={{ pathname: "/formations/[slug]", params: { slug: formation.slug } }}
          className={styles.link}
        >
          {formation.name}
        </Link>
      </Heading>
      {!formation.verified && <p className={styles.status}>{t("unverified_short")}</p>}
      <FormationMeta {...formation} />
      <p className={styles.summary}>{formation.summary}</p>
      <span className={styles.more} aria-hidden="true">
        {t("view")}
        <ArrowRightIcon />
      </span>
    </Card>
  );
}
