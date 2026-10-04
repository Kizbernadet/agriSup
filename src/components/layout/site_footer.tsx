import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { ChatIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { CONTACT } from "@/content/placeholders";
import { MAIN_NAV } from "@/content/site_config";
import { Link } from "@/i18n/navigation";
import { buildWhatsappLink } from "@/lib/whatsapp_link";
import styles from "./site_footer.module.css";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tWhatsapp = useTranslations("whatsapp");
  const { address } = CONTACT;

  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <div className={styles.column}>
          <p className={styles.brand}>AGRI&apos;SUP</p>
          <p className={styles.muted}>{t("denomination")}</p>
        </div>

        <div className={styles.column}>
          <h2 className={styles.title}>{t("address_title")}</h2>
          <address className={styles.address}>
            <MapPinIcon className={styles.icon} />
            <span>
              {address.street}, {address.district}
              <br />
              {address.city}, {address.country}
            </span>
          </address>
        </div>

        <div className={styles.column}>
          <h2 className={styles.title}>{t("contact_title")}</h2>
          <ul className={styles.list}>
            {CONTACT.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className={styles.contact_link}>
                  <PhoneIcon className={styles.icon} />
                  <span>
                    <span className="visually_hidden">{t("phone")} : </span>
                    {phone.display}
                  </span>
                </a>
              </li>
            ))}
            {CONTACT.email && (
              <li>
                <a href={`mailto:${CONTACT.email}`} className={styles.contact_link}>
                  <MailIcon className={styles.icon} />
                  <span>
                    <span className="visually_hidden">{t("email")} : </span>
                    {CONTACT.email}
                  </span>
                </a>
              </li>
            )}
            {CONTACT.whatsappNumber && (
              <li>
                <a
                  href={buildWhatsappLink(
                    CONTACT.whatsappNumber,
                    tWhatsapp("default_message"),
                  )}
                  className={styles.contact_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ChatIcon className={styles.icon} />
                  <span>{tWhatsapp("button")}</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <nav className={styles.column} aria-label={tNav("footer_label")}>
          <h2 className={styles.title}>{t("navigation_title")}</h2>
          <ul className={styles.list}>
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.nav_link}>
                  {tNav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className={styles.bottom}>
        <p className={styles.muted}>
          © {new Date().getFullYear()} AGRI&apos;SUP. {t("rights")}
        </p>
        <Link href="/mentions_legales" className={styles.nav_link}>
          {t("legal")}
        </Link>
      </Container>
    </footer>
  );
}
