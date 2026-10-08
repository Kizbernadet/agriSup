import { useTranslations } from "next-intl";
import { DomainCover } from "@/components/domains/domain_cover";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Link } from "@/i18n/navigation";
import { formationPhoto } from "@/content/visuals";
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
      <div className={styles.media}>
        <DomainCover
          domain={formation.domain}
          photo={formationPhoto(formation.slug, formation.domain)}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          zoomOnHover
          className={styles.cover}
        />
        <span className={styles.level}>
          <Badge>{t(`level.${formation.level}`)}</Badge>
        </span>
      </div>
      <span className={styles.icon}>
        <DomainIcon domain={formation.domain} />
      </span>
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
