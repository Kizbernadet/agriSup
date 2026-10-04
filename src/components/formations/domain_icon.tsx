import type { ReactNode, SVGProps } from "react";
import type { FormationDomain } from "@/generated/prisma/enums";
import {
  ChartIcon,
  FishIcon,
  PawIcon,
  SproutIcon,
  TreeIcon,
} from "@/components/ui/icons";
import styles from "./domain_icon.module.css";

const ICONS: Record<FormationDomain, (props: SVGProps<SVGSVGElement>) => ReactNode> = {
  PRODUCTION_VEGETALE: SproutIcon,
  ELEVAGE_SANTE_ANIMALE: PawIcon,
  AQUACULTURE: FishIcon,
  AGRIBUSINESS: ChartIcon,
  AGROFORESTERIE: TreeIcon,
};

type DomainIconProps = {
  domain: FormationDomain;
  // "tile" : pastille colorée ; "inline" : icône seule, à côté d'un texte.
  variant?: "tile" | "inline";
};

export function DomainIcon({ domain, variant = "tile" }: DomainIconProps) {
  const Icon = ICONS[domain];
  if (variant === "inline") return <Icon className={styles.inline} />;
  return (
    <span className={styles.tile}>
      <Icon />
    </span>
  );
}
