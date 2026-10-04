"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  SearchIcon,
} from "@/components/ui/icons";
import { revealProps } from "@/lib/reveal";
import styles from "./photo_gallery.module.css";

export type GalleryItem = {
  id: string;
  image: StaticImageData;
  caption: string;
  // "tall" : image portrait (occupe deux rangées de la mosaïque).
  shape?: "tall" | "wide";
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
        {items.map((entry, index) => (
          <li
            key={entry.id}
            className={styles.tile}
            data-shape={entry.shape}
            {...revealProps(index)}
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
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className={styles.tile_image}
                placeholder="blur"
              />
              <span className={styles.caption} aria-hidden="true">
                <SearchIcon />
                {entry.caption}
              </span>
            </button>
          </li>
        ))}
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
