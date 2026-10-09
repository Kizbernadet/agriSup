"use client";

import type { ReactNode } from "react";
import styles from "./filter_group.module.css";

export type Filter<T> = T | "all";

// Groupe de boutons-filtres à choix unique (« Tous » + options), état exposé par
// aria-pressed. Utilisé par le catalogue des formations et le mur des partenaires.
type FilterGroupProps<T extends string> = {
  legend: string;
  options: { value: T; label: string; icon?: ReactNode }[];
  allLabel: string;
  selected: Filter<T>;
  onSelect: (value: Filter<T>) => void;
};

export function FilterGroup<T extends string>({
  legend,
  options,
  allLabel,
  selected,
  onSelect,
}: FilterGroupProps<T>) {
  const choices: { value: Filter<T>; label: string; icon?: ReactNode }[] = [
    { value: "all", label: allLabel },
    ...options,
  ];

  return (
    <fieldset className={styles.group}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.chips}>
        {choices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            className={styles.chip}
            aria-pressed={selected === choice.value}
            onClick={() => onSelect(choice.value)}
          >
            {choice.icon}
            {choice.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
