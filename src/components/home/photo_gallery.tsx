"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ExpandIcon,
} from "@/components/ui/icons";
import { revealProps } from "@/lib/reveal";
import styles from "./photo_gallery.module.css";

export type GalleryItem = {
  // Sert aussi de nom de zone dans la grille « puzzle » (photo_gallery.module.css).
  id: string;
  image: StaticImageData;
  caption: string;
  // Largeur maximale affichée de la case : le navigateur télécharge la bonne résolution.
  sizes: string;
};

// Mosaïque + visionneuse. La visionneuse utilise l'élément natif <dialog> :
// piège du focus, fermeture par Échap et retour du focus gérés par le navigateur.
export function PhotoGallery({ items }: { items: GalleryItem[] }) {
  const t = useTranslations("gallery");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const open = (index: number) => {
    setCurrent(index);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const move = useCallback(
    (step: number) =>
      setCurrent((index) =>
        index === null ? index : (index + step + items.length) % items.length,
      ),
    [items.length],
  );

  // Flèches du clavier dans la visionneuse.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [move]);

  const item = current === null ? null : items[current];

  return (
    <>
      <ul className={styles.mosaic}>
        {items.map((entry, index) => {
          const reveal = revealProps(index);
          return (
            <li
              key={entry.id}
              className={styles.tile}
              {...reveal}
              style={{ ...reveal.style, gridArea: entry.id }}
            >
              <button
                type="button"
                className={styles.tile_button}
                onClick={() => open(index)}
                aria-label={t("open", { caption: entry.caption })}
              >
                <Image
                  src={entry.image}
                  alt=""
                  fill
                  sizes={entry.sizes}
                  quality={90}
                  className={styles.tile_image}
                  placeholder="blur"
                />
                {/* Révélé au survol ou au focus : voile dégradé, légende et pastille
                  « agrandir ». Au repos, la photo reste nue. */}
                <span className={styles.veil} aria-hidden="true">
                  <span className={styles.expand}>
                    <ExpandIcon />
                  </span>
                  <span className={styles.caption}>{entry.caption}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={t("dialog_label")}
        onClose={() => setCurrent(null)}
        // Clic sur le fond (hors de l'image) : fermeture.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {item && current !== null && (
          <figure className={styles.figure}>
            <div className={styles.viewer}>
              <Image
                src={item.image}
                alt={item.caption}
                fill
                sizes="90vw"
                quality={90}
                className={styles.viewer_image}
              />
            </div>
            <figcaption className={styles.figcaption}>
              <span>{item.caption}</span>
              <span className={styles.counter}>
                {t("counter", { index: current + 1, total: items.length })}
              </span>
            </figcaption>
            <div className={styles.dialog_controls}>
              <button type="button" onClick={() => move(-1)} aria-label={t("previous")}>
                <ChevronLeftIcon />
              </button>
              <button type="button" onClick={() => move(1)} aria-label={t("next")}>
                <ChevronRightIcon />
              </button>
              <button type="button" onClick={close} aria-label={t("close")} autoFocus>
                <CloseIcon />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </>
  );
}
