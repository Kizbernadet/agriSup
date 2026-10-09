import { useTranslations } from "next-intl";
import campusPhoto from "../../../assets/site/campus/batiment_facade.jpg";
import entrancePhoto from "../../../assets/site/campus/batiment_entree.jpg";
import communityPhoto from "../../../assets/site/etudiants/promotion_campus.jpg";
import labPhoto from "../../../assets/site/etudiants/tp_microscope_binome.jpg";
import bankLogo from "../../../assets/site/partenaires/afg_bank.png";
import iprIfraLogo from "../../../assets/site/partenaires/ipr_ifra.png";
import { HeroSlider, type HeroSlide } from "./hero_slider";
import styles from "./home_hero.module.css";

export function HomeHero() {
  const tSlider = useTranslations("slider");
  const tCommon = useTranslations("common");

  const slides: HeroSlide[] = [
    {
      id: "agriculture",
      image: campusPhoto,
      imageAlt: tSlider("alt_campus"),
      eyebrow: tSlider("s1_eyebrow"),
      title: tSlider("s1_title"),
      text: tSlider("s1_text"),
      action: { href: "/formations", label: tCommon("discover_formations") },
    },
    {
      id: "terrain",
      image: entrancePhoto,
      imageAlt: tSlider("alt_entrance"),
      eyebrow: tSlider("s2_eyebrow"),
      title: tSlider("s2_title"),
      text: tSlider("s2_text"),
      action: { href: { pathname: "/", hash: "domaines" }, label: tSlider("s2_cta") },
    },
    {
      id: "admissions",
      image: labPhoto,
      imageAlt: tSlider("alt_lab"),
      eyebrow: tSlider("s3_eyebrow"),
      title: tSlider("s3_title"),
      text: tSlider("s3_text"),
      action: { href: "/preinscription", label: tCommon("preinscription") },
    },
    {
      id: "partenaires",
      image: communityPhoto,
      imageAlt: tSlider("alt_partners"),
      eyebrow: tSlider("s4_eyebrow"),
      title: tSlider("s4_title"),
      text: tSlider("s4_text"),
      action: { href: "/contact", label: tCommon("contact_us") },
      partners: [
        { name: "IPR/IFRA de Katibougou", logo: iprIfraLogo },
        { name: "AFG Bank", logo: bankLogo },
      ],
    },
  ];

  return (
    <section className={styles.hero}>
      <HeroSlider slides={slides} />
    </section>
  );
}
