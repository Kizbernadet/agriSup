"use client";

import { useRef, useState, type ComponentType, type SVGProps } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { FilterGroup, type Filter } from "@/components/ui/filter_group";
import {
  ChartIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  GlobeIcon,
  GraduationIcon,
  MapPinIcon,
  PawIcon,
  UsersIcon,
  WheatIcon,
} from "@/components/ui/icons";
import {
  PARTNER_CATEGORIES,
  partnerInitials,
  type Partner,
  type PartnerCategory,
  type PartnerScope,
} from "@/content/partners";
import styles from "./partner_wall.module.css";

const SCOPES: PartnerScope[] = ["national", "international"];

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const CATEGORY_ICONS: Record<PartnerCategory, Icon> = {
  formation: GraduationIcon,
  animal: PawIcon,
  farm: WheatIcon,
  finance: ChartIcon,
};

// Mur des partenaires : chiffres clés, filtres (territoire, domaine) et cartes.
// Mobile : carrousel horizontal à faire glisser ; tablette et ordinateur : grille.
// Filtrage côté navigateur ; sans JavaScript, tous les partenaires restent affichés.
export function PartnerWall({ partners }: { partners: Partner[] }) {
  const t = useTranslations("partners");
  const locale = useLocale() === "en" ? "en" : "fr";
  const [scope, setScope] = useState<Filter<PartnerScope>>("all");
  const [category, setCategory] = useState<Filter<PartnerCategory>>("all");
  const scroller = useRef<HTMLDivElement>(null);

  // Flèches du carrousel mobile : avance d'environ une carte.
  function scrollCards(direction: 1 | -1) {
    const element = scroller.current;
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollBy({
      left: direction * element.clientWidth * 0.85,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  const visible = partners.filter(
    (partner) =>
      (scope === "all" || partner.scope === scope) &&
      (category === "all" || partner.category === category),
  );
  const stats: { value: number; label: string; icon: Icon }[] = [
    {
      value: partners.length,
      label: t("stats_partners", { count: partners.length }),
      icon: UsersIcon,
    },
    {
      value: new Set(partners.map((partner) => partner.country)).size,
      label: t("stats_countries"),
      icon: MapPinIcon,
    },
    {
      value: new Set(partners.map((partner) => partner.continent)).size,
      label: t("stats_continents"),
      icon: GlobeIcon,
    },
  ];

  return (
    <div className={styles.wall}>
      <dl className={styles.stats}>
        {stats.map(({ value, label, icon: StatIcon }) => (
          <div key={label} className={styles.stat}>
            <dt>
              <StatIcon className={styles.stat_icon} aria-hidden="true" />
              {label}
            </dt>
            <dd>{value}</dd>
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
          options={PARTNER_CATEGORIES.map((value) => {
            const CategoryIcon = CATEGORY_ICONS[value];
            return {
              value,
              label: t(`category.${value}`),
              icon: <CategoryIcon className={styles.chip_icon} aria-hidden="true" />,
            };
          })}
          allLabel={t("all")}
          selected={category}
          onSelect={setCategory}
        />
      </div>

      <div className={styles.toolbar}>
        <p className={styles.count} aria-live="polite">
          {t("results", { count: visible.length })}
        </p>
        {/* Mobile : flèches en complément du glissement au doigt. */}
        <div className={styles.arrows}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollCards(-1)}
            aria-label={t("previous")}
          >
            <ChevronLeftIcon aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => scrollCards(1)}
            aria-label={t("next")}
          >
            <ChevronRightIcon aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Zone défilante sur mobile : atteignable au clavier pour défiler aux flèches. */}
      <div
        ref={scroller}
        className={styles.scroller}
        role="region"
        aria-label={t("list_label")}
        tabIndex={0}
      >
        <ul className={styles.grid}>
          {visible.map((partner) => {
            const CategoryIcon = CATEGORY_ICONS[partner.category];
            const ScopeIcon = partner.scope === "national" ? MapPinIcon : GlobeIcon;
            return (
              <li
                key={partner.id}
                className={styles.card}
                data-category={partner.category}
              >
                <div className={styles.banner}>
                  {partner.photo && (
                    <Image
                      src={partner.photo}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 85vw"
                      className={styles.banner_photo}
                      placeholder="blur"
                    />
                  )}
                  <span className={styles.scope}>
                    <ScopeIcon aria-hidden="true" />
                    {t(`scope.${partner.scope}`)}
                  </span>
                </div>

                <div className={styles.plate}>
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={t("logo_alt", { name: partner.name })}
                      sizes="160px"
                      className={styles.logo}
                    />
                  ) : (
                    <span className={styles.monogram} aria-hidden="true">
                      {partnerInitials(partner.name)}
                    </span>
                  )}
                </div>

                <div className={styles.body}>
                  <p className={styles.category}>
                    <CategoryIcon aria-hidden="true" />
                    {t(`category.${partner.category}`)}
                  </p>
                  <h3 className={styles.name}>{partner.name}</h3>
                  <p className={styles.location}>
                    <MapPinIcon aria-hidden="true" />
                    {partner.location[locale]}
                  </p>
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
            );
          })}
        </ul>
      </div>
    </div>
  );
}
