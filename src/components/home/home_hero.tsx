import { useTranslations } from "next-intl";
import bankLogo from "../../../assets/photos/partenaires/afg_bank_logo_2.png";
import campusPhoto from "../../../assets/photos/batiments/batiment_1.jpg";
import entrancePhoto from "../../../assets/photos/batiments/batiment_3.jpeg";
import communityPhoto from "../../../assets/photos/etudiants/etudiants_1.png";
import labPhoto from "../../../assets/photos/etudiants/etudiants_2.jpg";
import iprIfraLogo from "../../../assets/photos/partenaires/ipr_ifra_logo.jpg";
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
