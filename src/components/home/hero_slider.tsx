"use client";

import { useEffect, useState, type ComponentProps } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import useEmblaCarousel from "embla-carousel-react";
import { ButtonLink } from "@/components/ui/button";
import type { Link } from "@/i18n/navigation";
import styles from "./hero_slider.module.css";

export type HeroSlide = {
  id: string;
  image: StaticImageData;
  imageAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  action?: {
    href: ComponentProps<typeof Link>["href"];
    label: string;
  };
  partners?: {
    name: string;
    logo?: StaticImageData;
  }[];
};

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const t = useTranslations("slider");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 });
  const [selected, setSelected] = useState(0);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setHasChanged(true);
    };

    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div
      className={styles.slider}
      role="region"
      aria-roledescription="carrousel"
      aria-label={t("label")}
      data-animate={hasChanged ? "" : undefined}
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
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  sizes="100vw"
                  className={styles.image}
                  priority={index === 0}
                  placeholder="blur"
                />
                <div className={styles.content}>
                  <p className={styles.eyebrow}>{slide.eyebrow}</p>
                  <Heading className={styles.title}>{slide.title}</Heading>
                  <p className={styles.text}>{slide.text}</p>
                  {slide.partners && (
                    <ul className={styles.partners}>
                      {slide.partners.map((partner) => (
                        <li key={partner.name} className={styles.partner}>
                          {partner.logo && (
                            <Image
                              src={partner.logo}
                              alt=""
                              className={styles.partner_logo}
                              sizes="(min-width: 1024px) 180px, 120px"
                            />
                          )}
                          <span>{partner.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {slide.action && (
                    <ButtonLink href={slide.action.href} className={styles.action}>
                      {slide.action.label}
                    </ButtonLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.dots} role="group" aria-label={t("navigation")}>
        {slides.map((item, dotIndex) => (
          <button
            key={item.id}
            type="button"
            className={styles.dot}
            aria-label={t("go_to", { index: dotIndex + 1 })}
            aria-current={dotIndex === selected ? "true" : undefined}
            onClick={() => emblaApi?.scrollTo(dotIndex)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
