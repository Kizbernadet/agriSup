"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PRESENTATION_VIDEO } from "@/content/placeholders";
// Photo réelle d'une promotion au champ d'expérimentation, en image d'aperçu.
import cover from "../../../assets/site/etudiants/promotion_encadrants.jpg";
import styles from "./presentation_video.module.css";

// Façade « chargement au clic » : aucune ressource YouTube (≈ 1 Mo de scripts) n'est
// téléchargée tant que le visiteur ne lance pas la vidéo. Domaine youtube-nocookie :
// pas de cookie de suivi avant la lecture.
export function PresentationVideo() {
  const t = useTranslations("home");
  const [playing, setPlaying] = useState(false);
  const videoId = PRESENTATION_VIDEO.youtubeId;

  if (playing && videoId) {
    return (
      <div className={styles.frame}>
        <iframe
          className={styles.iframe}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={t("video_iframe_title")}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={styles.frame}>
      <Image
        src={cover}
        alt={t("video_cover_alt")}
        className={styles.cover}
        sizes="(min-width: 1024px) 560px, 100vw"
        placeholder="blur"
      />
      {videoId ? (
        <button
          type="button"
          className={styles.play}
          onClick={() => setPlaying(true)}
          aria-label={t("video_play")}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      ) : (
        // Emplacement provisoire volontairement visible : vidéo non fournie.
        <p className={styles.coming}>{t("video_coming")}</p>
      )}
    </div>
  );
}
