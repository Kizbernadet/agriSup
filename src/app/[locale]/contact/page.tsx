import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapEmbed } from "@/components/contact/map_embed";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { ContactForm } from "@/components/forms/contact_form";
import { Card } from "@/components/ui/card";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsappIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { RichText } from "@/components/ui/rich_text";
import { BROCHURE_PATH, CONTACT, SOCIAL_LINKS } from "@/content/placeholders";
import { toAppLocale } from "@/i18n/locale";
import { directionsUrl } from "@/lib/maps";
import styles from "./contact.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return { title: t("title"), description: t("description") };
}

// Cahier §9 : tous les moyens de contact réunis + formulaire.
export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tPage, tNav, tForm] = await Promise.all([
    getTranslations("pages.contact"),
    getTranslations("contact_page"),
    getTranslations("nav"),
    getTranslations("contact_form"),
  ]);
  const { address } = CONTACT;
  const socialLinks = Object.entries(SOCIAL_LINKS).filter(
    (entry): entry is [string, string] => entry[1] !== null,
  );

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>
            <RichText text={tPage("intro")} />
          </p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />

      <Section id="coordonnees" title={tPage("info_title")}>
        <div className={styles.info_layout}>
          <ul className={styles.info_list}>
            <InfoCard icon={<MapPinIcon />} title={tPage("address")}>
              <address className={styles.address}>
                <a
                  href={directionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.strong_link}
                >
                  {address.street}, {address.district}
                  <br />
                  {address.city}, {address.country}
                  <span className="visually_hidden"> ({tPage("open_in_maps")})</span>
                </a>
                <br />
                {address.landmark[locale]}
              </address>
              <a href={directionsUrl()} target="_blank" rel="noopener noreferrer">
                {tPage("directions")} ↗
              </a>
            </InfoCard>

            <InfoCard icon={<PhoneIcon />} title={tPage("phones")}>
              {CONTACT.phones.map((phone) => (
                <a
                  key={phone.tel}
                  href={`tel:${phone.tel}`}
                  className={styles.strong_link}
                >
                  {phone.display}
                </a>
              ))}
            </InfoCard>

            {CONTACT.whatsappNumber && (
              <InfoCard icon={<WhatsappIcon />} title={tPage("whatsapp")}>
                <p>{tPage("whatsapp_text")}</p>
                <div>
                  <WhatsappButton />
                </div>
              </InfoCard>
            )}

            {CONTACT.email && (
              <InfoCard icon={<MailIcon />} title={tPage("email")}>
                <a href={`mailto:${CONTACT.email}`} className={styles.strong_link}>
                  {CONTACT.email}
                </a>
                <p className={styles.secondary}>
                  {tPage("email_secondary")}{" "}
                  <a href={`mailto:${CONTACT.secondaryEmail}`}>
                    {CONTACT.secondaryEmail}
                  </a>
                </p>
              </InfoCard>
            )}

            {socialLinks.length > 0 && (
              <InfoCard title={tPage("social_title")}>
                {socialLinks.map(([network, url]) => (
                  <a key={network} href={url} target="_blank" rel="noopener noreferrer">
                    {network}
                  </a>
                ))}
              </InfoCard>
            )}

            {BROCHURE_PATH && (
              <InfoCard title={tPage("brochure_title")}>
                <a href={BROCHURE_PATH} download>
                  {tPage("brochure_download")}
                </a>
              </InfoCard>
            )}
          </ul>

          <div className={styles.map}>
            <h3>{tPage("map_title")}</h3>
            <MapEmbed />
          </div>
        </div>
      </Section>

      <Section id="formulaire" tone="surface" title={tForm("title")}>
        <div className={styles.form}>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon?: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card as="li" className={styles.info_card}>
      <h3 className={styles.info_title}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {title}
      </h3>
      <div className={styles.info_body}>{children}</div>
    </Card>
  );
}
