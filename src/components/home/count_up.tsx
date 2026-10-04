"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1200;

// Compteur animé de 0 à la valeur finale lorsqu'il entre dans l'écran.
// Le HTML serveur contient déjà la valeur finale (référencement, sans JavaScript) ;
// pas d'animation si le visiteur demande moins de mouvement.
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        // Décélération en fin de course (ease-out cubique).
        setDisplay(Math.round(value * (1 - (1 - progress) ** 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} aria-hidden="true">
      {display}
    </span>
  );
}
