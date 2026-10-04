import type { FormationSummary } from "@/lib/data/formations";
import { FormationCard } from "./formation_card";
import styles from "./formation_grid.module.css";

type FormationGridProps = {
  formations: readonly FormationSummary[];
  headingLevel?: "h2" | "h3";
};

export function FormationGrid({ formations, headingLevel }: FormationGridProps) {
  return (
    <ul className={styles.grid}>
      {formations.map((formation) => (
        <li key={formation.slug}>
          <FormationCard formation={formation} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
