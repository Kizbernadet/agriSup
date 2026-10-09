"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FormationDomain, FormationLevel } from "@/generated/prisma/enums";
import { FilterGroup, type Filter } from "@/components/ui/filter_group";
import type { FormationSummary } from "@/lib/data/formations";
import { DomainIcon } from "./domain_icon";
import { FormationGrid } from "./formation_grid";
import styles from "./formation_catalog.module.css";

const LEVELS = Object.values(FormationLevel);
const DOMAINS = Object.values(FormationDomain);

function toFilter<T extends string>(values: readonly T[], raw: string | null): Filter<T> {
  return values.includes(raw as T) ? (raw as T) : "all";
}

// Filtrage côté navigateur : la liste complète est déjà dans la page (12 formations),
// ce qui évite tout aller-retour serveur sur une connexion lente.
// Sans JavaScript, toutes les formations restent affichées.
export function FormationCatalog({ formations }: { formations: FormationSummary[] }) {
  const t = useTranslations("formation");
  const tPage = useTranslations("formations_page");
  const [level, setLevel] = useState<Filter<FormationLevel>>("all");
  const [domain, setDomain] = useState<Filter<FormationDomain>>("all");

  // Filtres initiaux lus dans l'URL (?niveau=DUT&domaine=AQUACULTURE), liens utilisés par
  // les cartes de domaines de l'accueil. Lus après le chargement (et non via
  // useSearchParams) pour que la liste complète reste pré-rendue côté serveur.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronisation unique avec l'URL au chargement
    setLevel(toFilter(LEVELS, params.get("niveau")));
    setDomain(toFilter(DOMAINS, params.get("domaine")));
  }, []);

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
            icon: <DomainIcon domain={value} variant="inline" />,
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
