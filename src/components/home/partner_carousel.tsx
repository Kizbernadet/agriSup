"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import { Card } from "@/components/ui/card";
import { BookIcon, PauseIcon, PlayIcon } from "@/components/ui/icons";
import { INSTITUTION } from "@/content/placeholders";
import type { AppLocale } from "@/i18n/routing";
import afgBankLogo from "../../../assets/photos/afg_bank_logo_2.png";
import iprIfraLogo from "../../../assets/photos/ipr_ifra_logo.jpg";
import styles from "./partner_carousel.module.css";

const AUTOPLAY_DELAY = 6500;

const PARTNER_LOGOS: Partial<Record<string, StaticImageData>> = {
  "IPR/IFRA de Katibougou": iprIfraLogo,
  "AFG Bank": afgBankLogo,
};

export function PartnerCarousel({ locale }: { locale: AppLocale }) {
  const t = useTranslations("home");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    duration: 32,
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Défilement automatique possible (mouvement non réduit) et pause demandée par le visiteur.
  const [canAutoplay, setCanAutoplay] = useState(false);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  // Pause temporaire pendant le survol ou le focus clavier.
  const holdRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateSelection = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    const stopAutoplay = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };
    const updateAutoplay = () => {
      stopAutoplay();
      setCanAutoplay(!motionPreference.matches);
      if (!motionPreference.matches && document.visibilityState === "visible") {
        timer = window.setInterval(() => {
          // WCAG 2.2.2 : le visiteur peut arrêter le mouvement (bouton, survol, focus).
          if (!pausedRef.current && !holdRef.current) emblaApi.scrollNext();
        }, AUTOPLAY_DELAY);
      }
    };

    emblaApi.on("select", updateSelection);
    motionPreference.addEventListener("change", updateAutoplay);
    document.addEventListener("visibilitychange", updateAutoplay);
    updateAutoplay();

    return () => {
      emblaApi.off("select", updateSelection);
      motionPreference.removeEventListener("change", updateAutoplay);
      document.removeEventListener("visibilitychange", updateAutoplay);
      stopAutoplay();
    };
  }, [emblaApi]);

  const partners = INSTITUTION.partners.map((partner) => ({
    ...partner,
    logo: PARTNER_LOGOS[partner.name],
  }));
  const slides = [...partners, ...partners, ...partners];

  const togglePause = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };
  const hold = () => {
    holdRef.current = true;
  };
  const release = () => {
    holdRef.current = false;
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-label={t("partners_carousel_label")}
      aria-roledescription={t("partners_carousel_role")}
      onMouseEnter={hold}
      onMouseLeave={release}
      onFocus={hold}
      onBlur={release}
    >
      <div className={styles.viewport} ref={emblaRef} aria-live="off">
        <div className={styles.track}>
          {slides.map((partner, index) => {
            const partnerIndex = index % partners.length;
            const active = index === selectedIndex;

            return (
              <div
                key={`${partner.name}-${index}`}
                className={styles.slide}
                role="group"
                aria-roledescription={t("partners_slide_role")}
                aria-label={t("partners_slide_label", {
                  index: partnerIndex + 1,
                  total: partners.length,
                })}
                aria-current={
                  index < partners.length &&
                  partnerIndex === selectedIndex % partners.length
                    ? "true"
                    : undefined
                }
                aria-hidden={index >= partners.length ? true : undefined}
                data-active={active ? "" : undefined}
              >
                <Card className={styles.card}>
                  <div className={styles.text}>
                    <h3>{partner.name}</h3>
                    <p>{partner.description[locale]}</p>
                  </div>
                  <div
                    className={styles.logo_frame}
                    style={
                      partner.logo
                        ? {
                            aspectRatio: `${partner.logo.width} / ${partner.logo.height}`,
                          }
                        : undefined
                    }
                  >
                    {partner.logo ? (
                      <Image
                        src={partner.logo}
                        alt=""
                        fill
                        className={styles.logo}
                        sizes="(min-width: 1024px) 192px, (min-width: 640px) 160px, 35vw"
                      />
                    ) : (
                      <BookIcon className={styles.logo_fallback} />
                    )}
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      {canAutoplay && (
        <button
          type="button"
          className={styles.pause}
          aria-label={paused ? t("partners_play") : t("partners_pause")}
          onClick={togglePause}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      )}
    </div>
  );
}
