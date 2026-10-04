import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { CONTACT } from "@/content/placeholders";
import slideAgriculture from "../../../public/images/slider/slide_agriculture.jpg";
import slideEtudiants from "../../../public/images/slider/slide_etudiants.jpg";
import slideTerrain from "../../../public/images/slider/slide_terrain.jpg";
import { HeroSlider, type HeroSlide } from "./hero_slider";
import styles from "./home_hero.module.css";

// Cahier §4.1 : AGRI'SUP, son domaine, son implantation, un message et les appels à l'action,
// présentés en carrousel (demande de la cliente). Images : scènes extraites des affiches
// fournies (générées par IA), à remplacer par de vraies photos de l'école.
export function HomeHero({ formationsCount }: { formationsCount: number }) {
  const t = useTranslations("home");
  const tSlider = useTranslations("slider");
  const tCommon = useTranslations("common");
  const { address } = CONTACT;

  const slides: HeroSlide[] = [
    {
      id: "formations",
      image: slideTerrain,
      imageAlt: tSlider("alt_terrain"),
      eyebrow: `AGRI'SUP · ${address.street}, ${address.city} — ${address.country}`,
      title: t("hero_title"),
      text: t("hero_lead"),
      actions: [
        {
          href: "/formations",
          label: tCommon("discover_formations"),
          variant: "primary",
        },
        {
          href: "/preinscription",
          label: tCommon("preinscription"),
          variant: "secondary",
        },
      ],
      chips: [t("hero_badge_levels"), t("hero_badge_lmd")],
    },
    {
      id: "preinscription",
      image: slideEtudiants,
      imageAlt: tSlider("alt_etudiants"),
      eyebrow: tSlider("s2_eyebrow"),
      title: tSlider("s2_title"),
      text: tSlider("s2_text"),
      actions: [
        { href: "/preinscription", label: tCommon("preinscription"), variant: "primary" },
        { href: "/admission", label: tSlider("s2_cta"), variant: "secondary" },
      ],
      chips: [tSlider("s2_chip_1"), tSlider("s2_chip_2")],
    },
    {
      id: "domaines",
      image: slideAgriculture,
      imageAlt: tSlider("alt_agriculture"),
      eyebrow: tSlider("s3_eyebrow"),
      title: tSlider("s3_title"),
      text: tSlider("s3_text"),
      actions: [
        {
          href: { pathname: "/", hash: "domaines" },
          label: tSlider("s3_cta"),
          variant: "primary",
        },
        {
          href: "/formations",
          label: tCommon("discover_formations"),
          variant: "secondary",
        },
      ],
      chips: [tSlider("s3_chip", { count: formationsCount }), t("hero_badge_lmd")],
    },
  ];

  return (
    <section className={styles.hero}>
      <HeroPattern />
      <Container className={styles.inner}>
        <HeroSlider slides={slides} />
      </Container>
    </section>
  );
}

// Motif décoratif : sillons de champ et soleil levant, purement visuel.
function HeroPattern() {
  return (
    <svg
      className={styles.pattern}
      viewBox="0 0 600 400"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <circle className={styles.sun} cx="470" cy="150" r="70" />
      <circle className={styles.sun_ring} cx="470" cy="150" r="105" />
      <path className={styles.field} d="M0 400 C150 300 350 270 600 290 L600 400 Z" />
      <path
        className={styles.field_back}
        d="M80 400 C230 330 420 320 600 340 L600 400 Z"
      />
      <g className={styles.furrows}>
        <path d="M120 400 C250 340 420 320 600 322" />
        <path d="M220 400 C320 355 460 345 600 350" />
        <path d="M330 400 C410 372 500 368 600 375" />
      </g>
    </svg>
  );
}
