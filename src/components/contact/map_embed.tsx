"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "@/components/ui/icons";
import { mapEmbedUrl } from "@/lib/maps";
import styles from "./map_embed.module.css";

// Carte chargée au clic : Google Maps pèse plusieurs centaines de Ko et transmet
// des données à Google ; rien n'est chargé sans action du visiteur.
export function MapEmbed() {
  const t = useTranslations("contact_page");
  const locale = useLocale();
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          src={mapEmbedUrl(locale)}
          title={t("map_iframe_title")}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.frame} ${styles.placeholder}`}>
      <MapPinIcon className={styles.pin} />
      <p className={styles.notice}>{t("map_notice")}</p>
      <Button variant="secondary" onClick={() => setLoaded(true)}>
        {t("map_load")}
      </Button>
    </div>
  );
}
