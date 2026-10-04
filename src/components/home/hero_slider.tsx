"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
} from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ButtonLink } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import type { Link } from "@/i18n/navigation";
import styles from "./hero_slider.module.css";

// Durée d'affichage d'une diapositive (aussi utilisée par la barre de progression).
const SLIDE_DELAY_MS = 6500;

export type HeroSlide = {
  id: string;
  image: StaticImageData;
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  actions: {
    href: ComponentProps<typeof Link>["href"];
    label: string;
    variant: "primary" | "secondary";
  }[];
  chips: string[];
};

// Carrousel du bandeau d'accueil (Embla, ≈ 7 Ko).
// Accessibilité : rôle « carrousel », diapositives inactives inertes (non focalisables),
// pause au survol et au focus clavier, bouton pause/lecture, pas de défilement
// automatique si le visiteur demande moins de mouvement.
// Performance : la première diapositive (titre H1, image prioritaire) est rendue côté
// serveur et n'est pas animée à l'affichage initial.
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("slider");
  // Plugin créé une seule fois (initialisation paresseuse de l'état).
  const [autoplay] = useState(() =>
    Autoplay({
      delay: SLIDE_DELAY_MS,
      playOnInit: false,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 }, [autoplay]);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  // Les animations d'entrée ne démarrent qu'après le premier changement de diapositive.
  const [hasChanged, setHasChanged] = useState(false);
  const pausedByUser = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;
    const plugin = autoplay;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setHasChanged(true);
    };
    const onPlay = () => {
      // La pause demandée par le visiteur prime sur la reprise après survol.
      if (pausedByUser.current) plugin.stop();
      else setPlaying(true);
    };
    const onStop = () => setPlaying(plugin.isPlaying());

    emblaApi.on("select", onSelect);
    emblaApi.on("autoplay:play", onPlay);
    emblaApi.on("autoplay:stop", onStop);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) plugin.play();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("autoplay:play", onPlay);
      emblaApi.off("autoplay:stop", onStop);
    };
  }, [emblaApi, autoplay]);

  const togglePlay = useCallback(() => {
    const plugin = autoplay;
    if (plugin.isPlaying()) {
      pausedByUser.current = true;
      plugin.stop();
      setPlaying(false);
    } else {
      pausedByUser.current = false;
      plugin.play();
    }
  }, [autoplay]);

  return (
    <div
      className={styles.slider}
      role="region"
      aria-roledescription="carrousel"
      aria-label={t("label")}
      data-animate={hasChanged ? "" : undefined}
      style={{ "--slide-delay": `${SLIDE_DELAY_MS}ms` } as CSSProperties}
    >
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          {slides.map((slide, index) => {
            const active = index === selected;
            const Heading = index === 0 ? "h1" : "h2";
            return (
              <div
                key={slide.id}
                className={styles.slide}
                role="group"
                aria-roledescription="diapositive"
                aria-label={t("slide_label", { index: index + 1, total: slides.length })}
                data-active={active ? "" : undefined}
                inert={!active}
              >
                <div className={styles.content}>
                  <p className={styles.eyebrow}>{slide.eyebrow}</p>
                  <Heading className={styles.title}>{slide.title}</Heading>
                  <p className={styles.text}>{slide.text}</p>
                  <div className={styles.actions}>
                    {slide.actions.map((action) => (
                      <ButtonLink
                        key={action.label}
                        href={action.href}
                        variant={action.variant}
                      >
                        {action.label}
                        {action.variant === "primary" && <ArrowRightIcon />}
                      </ButtonLink>
                    ))}
                  </div>
                </div>

                <div className={styles.media}>
                  <div className={styles.frame}>
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 620px, 100vw"
                      className={styles.image}
                      priority={index === 0}
                      placeholder="blur"
                    />
                  </div>
                  {slide.chips.map((chip, chipIndex) => (
                    <p key={chip} className={styles.chip} data-position={chipIndex}>
                      <SparklesIcon />
                      {chip}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.dots}>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={styles.dot}
              aria-label={t("go_to", { index: index + 1 })}
              aria-current={index === selected ? "true" : undefined}
              data-playing={playing ? "" : undefined}
              onClick={() => emblaApi?.scrollTo(index)}
            >
              <span className={styles.dot_bar} />
            </button>
          ))}
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.control}
            aria-label={t("previous")}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label={playing ? t("pause") : t("play")}
            onClick={togglePlay}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label={t("next")}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
