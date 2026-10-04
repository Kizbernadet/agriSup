import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { FormationSummary } from "@/lib/data/formations";
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
    <Card as="article" className={styles.card}>
      <Badge>{t(`level.${formation.level}`)}</Badge>
      <Heading className={styles.title}>{formation.name}</Heading>
      <FormationMeta {...formation} />
      <p className={styles.summary}>{formation.summary}</p>
      <ButtonLink
        href={{ pathname: "/formations/[slug]", params: { slug: formation.slug } }}
        variant="secondary"
        className={styles.link}
      >
        {t("view")}
        <span className="visually_hidden"> : {formation.name}</span>
      </ButtonLink>
    </Card>
  );
}
