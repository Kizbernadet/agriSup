import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { ActualiteSummary } from "@/lib/data/actualites";
import styles from "./actualite_card.module.css";

export function ActualiteCard({ actualite }: { actualite: ActualiteSummary }) {
  const t = useTranslations("actualites_page");
  const format = useFormatter();
  const href = {
    pathname: "/actualites/[slug]" as const,
    params: { slug: actualite.slug },
  };

  return (
    <Card as="article" className={styles.card}>
      {actualite.imagePath && (
        <div className={styles.media}>
          {/* Image décorative : le titre porte l'information. */}
          <Image
            src={actualite.imagePath}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.meta}>
          <Badge>{t(`category.${actualite.category}`)}</Badge>
          <time dateTime={actualite.publishedAt.toISOString()} className={styles.date}>
            {format.dateTime(actualite.publishedAt, { dateStyle: "long" })}
          </time>
        </div>
        <h2 className={styles.title}>
          {/* Toute la carte est cliquable via ce lien (pseudo-élément étendu). */}
          <Link href={href} className={styles.link}>
            {actualite.title}
          </Link>
        </h2>
        <p className={styles.excerpt}>{actualite.excerpt}</p>
        <span className={styles.more} aria-hidden="true">
          {t("read_more")} →
        </span>
      </div>
    </Card>
  );
}
