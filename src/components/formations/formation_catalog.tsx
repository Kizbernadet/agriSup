"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { FormationDomain, FormationLevel } from "@/generated/prisma/enums";
import type { FormationSummary } from "@/lib/data/formations";
import { FormationGrid } from "./formation_grid";
import styles from "./formation_catalog.module.css";

type Filter<T> = T | "all";

const LEVELS = Object.values(FormationLevel);
const DOMAINS = Object.values(FormationDomain);

// Filtrage côté navigateur : la liste complète est déjà dans la page (12 formations),
// ce qui évite tout aller-retour serveur sur une connexion lente.
// Sans JavaScript, toutes les formations restent affichées.
export function FormationCatalog({ formations }: { formations: FormationSummary[] }) {
  const t = useTranslations("formation");
  const tPage = useTranslations("formations_page");
  const [level, setLevel] = useState<Filter<FormationLevel>>("all");
  const [domain, setDomain] = useState<Filter<FormationDomain>>("all");

  // On ne propose que les domaines réellement présents dans les données.
  const availableDomains = DOMAINS.filter((value) =>
    formations.some((formation) => formation.domain === value),
  );
  const visible = formations.filter(
    (formation) =>
      (level === "all" || formation.level === level) &&
      (domain === "all" || formation.domain === domain),
  );
  const isFiltered = level !== "all" || domain !== "all";

  return (
    <div className={styles.catalog}>
      <div className={styles.filters} role="group" aria-label={tPage("filters_title")}>
        <FilterGroup
          legend={t("level_label")}
          options={LEVELS.map((value) => ({ value, label: t(`level.${value}`) }))}
          allLabel={tPage("all")}
          selected={level}
          onSelect={setLevel}
        />
        <FilterGroup
          legend={t("domain_label")}
          options={availableDomains.map((value) => ({
            value,
            label: t(`domain.${value}`),
          }))}
          allLabel={tPage("all")}
          selected={domain}
          onSelect={setDomain}
        />
      </div>

      <div className={styles.status}>
        <p aria-live="polite" className={styles.count}>
          {tPage("results", { count: visible.length })}
        </p>
        {isFiltered && (
          <button
            type="button"
            className={styles.reset}
            onClick={() => {
              setLevel("all");
              setDomain("all");
            }}
          >
            {tPage("reset")}
          </button>
        )}
      </div>

      <FormationGrid formations={visible} headingLevel="h2" />
    </div>
  );
}

type FilterGroupProps<T extends string> = {
  legend: string;
  options: { value: T; label: string }[];
  allLabel: string;
  selected: Filter<T>;
  onSelect: (value: Filter<T>) => void;
};

function FilterGroup<T extends string>({
  legend,
  options,
  allLabel,
  selected,
  onSelect,
}: FilterGroupProps<T>) {
  const choices: { value: Filter<T>; label: string }[] = [
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
            {choice.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
