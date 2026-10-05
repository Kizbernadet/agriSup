import { useTranslations } from "next-intl";
import type { FormationSummary } from "@/lib/data/formations";
import styles from "./formation_meta.module.css";

type FormationMetaProps = Pick<
  FormationSummary,
  "domain" | "durationSemesters" | "credits" | "verified"
>;

// Domaine et durée d'une formation (carte et page détail).
export function FormationMeta({
  domain,
  durationSemesters,
  credits,
  verified,
}: FormationMetaProps) {
  const t = useTranslations("formation");

  return (
    <dl className={styles.meta}>
      <div className={styles.row}>
        <dt>{t("domain_label")}</dt>
        <dd>{t(`domain.${domain}`)}</dd>
      </div>
      <div className={styles.row}>
        <dt>{t("duration_label")}</dt>
        <dd>
          {verified && durationSemesters && credits
            ? t("duration", { semesters: durationSemesters, credits })
            : t("duration_unknown")}
        </dd>
      </div>
    </dl>
  );
}
