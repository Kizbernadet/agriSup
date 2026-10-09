"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { FilterGroup, type Filter } from "@/components/ui/filter_group";
import { ExternalLinkIcon, MapPinIcon } from "@/components/ui/icons";
import {
  PARTNER_CATEGORIES,
  partnerInitials,
  type Partner,
  type PartnerCategory,
  type PartnerScope,
} from "@/content/partners";
import styles from "./partner_wall.module.css";

const SCOPES: PartnerScope[] = ["national", "international"];

// Mur des partenaires : chiffres clés, filtres (territoire, domaine) et cartes.
// Filtrage côté navigateur ; sans JavaScript, tous les partenaires restent affichés.
export function PartnerWall({ partners }: { partners: Partner[] }) {
  const t = useTranslations("partners");
  const locale = useLocale() === "en" ? "en" : "fr";
  const [scope, setScope] = useState<Filter<PartnerScope>>("all");
  const [category, setCategory] = useState<Filter<PartnerCategory>>("all");

  const visible = partners.filter(
    (partner) =>
      (scope === "all" || partner.scope === scope) &&
      (category === "all" || partner.category === category),
  );
  const stats = [
    { value: partners.length, label: t("stats_partners", { count: partners.length }) },
    {
      value: new Set(partners.map((partner) => partner.country)).size,
      label: t("stats_countries"),
    },
    {
      value: new Set(partners.map((partner) => partner.continent)).size,
      label: t("stats_continents"),
    },
  ];

  return (
    <div className={styles.wall}>
      <dl className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.filters} role="group" aria-label={t("filters_label")}>
        <FilterGroup
          legend={t("scope_legend")}
          options={SCOPES.map((value) => ({ value, label: t(`scope.${value}`) }))}
          allLabel={t("all")}
          selected={scope}
          onSelect={setScope}
        />
        <FilterGroup
          legend={t("category_legend")}
          options={PARTNER_CATEGORIES.map((value) => ({
            value,
            label: t(`category.${value}`),
          }))}
          allLabel={t("all")}
          selected={category}
          onSelect={setCategory}
        />
      </div>

      <p className={styles.count} aria-live="polite">
        {t("results", { count: visible.length })}
      </p>

      <ul className={styles.grid}>
        {visible.map((partner) => (
          <li key={partner.id} className={styles.card} data-category={partner.category}>
            <div className={styles.visual}>
              {partner.logo ? (
                <Image
                  src={partner.logo}
                  alt={t("logo_alt", { name: partner.name })}
                  sizes="(min-width: 1024px) 160px, 40vw"
                  className={styles.logo}
                />
              ) : (
                <span className={styles.monogram} aria-hidden="true">
                  {partnerInitials(partner.name)}
                </span>
              )}
            </div>
            <div className={styles.body}>
              <p className={styles.meta}>
                <span className={styles.category}>
                  {t(`category.${partner.category}`)}
                </span>
                <span className={styles.location}>
                  <MapPinIcon aria-hidden="true" />
                  {partner.location[locale]}
                </span>
              </p>
              <h3 className={styles.name}>{partner.name}</h3>
              <p className={styles.description}>{partner.description[locale]}</p>
              {partner.url && (
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {t("website")}
                  <ExternalLinkIcon aria-hidden="true" />
                  <span className="visually_hidden">
                    {" "}
                    {t("new_tab", { name: partner.name })}
                  </span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
