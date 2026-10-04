import type { FormationSummary } from "@/lib/data/formations";
import { revealProps } from "@/lib/reveal";
import { FormationCard } from "./formation_card";
import styles from "./formation_grid.module.css";

type FormationGridProps = {
  formations: readonly FormationSummary[];
  headingLevel?: "h2" | "h3";
};

export function FormationGrid({ formations, headingLevel }: FormationGridProps) {
  return (
    <ul className={styles.grid}>
      {formations.map((formation, index) => (
        <li key={formation.slug} {...revealProps(index % 3)}>
          <FormationCard formation={formation} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
