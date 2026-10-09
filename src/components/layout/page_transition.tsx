"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Entrée en fondu du contenu à chaque changement de page (classe page_enter, base.css).
// La clé liée à l'adresse rejoue l'animation ; un template.tsx ne suffirait pas, car il
// n'est recréé que lorsque son propre segment ([locale]) change.
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page_enter">
      {children}
    </div>
  );
}
