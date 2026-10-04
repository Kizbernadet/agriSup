import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MapEmbed } from "@/components/contact/map_embed";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { ContactForm } from "@/components/forms/contact_form";
import { Card } from "@/components/ui/card";
import { ChatIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { ToProvide } from "@/components/ui/to_provide";
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
        intro={<p>{tPage("intro")}</p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />

      <Section id="coordonnees" title={tPage("info_title")}>
        <div className={styles.info_layout}>
          <ul className={styles.info_list}>
            <InfoCard icon={<MapPinIcon />} title={tPage("address")}>
              <address className={styles.address}>
                {address.street}, {address.district}
                <br />
                {address.city}, {address.country}
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
              <InfoCard icon={<ChatIcon />} title={tPage("whatsapp")}>
                <p>{tPage("whatsapp_text")}</p>
                <div>
                  <WhatsappButton />
                </div>
              </InfoCard>
            )}

            <InfoCard icon={<MailIcon />} title={tPage("email")}>
              {CONTACT.email ? (
                <a href={`mailto:${CONTACT.email}`} className={styles.strong_link}>
                  {CONTACT.email}
                </a>
              ) : (
                <ToProvide />
              )}
            </InfoCard>

            <InfoCard title={tPage("social_title")}>
              {socialLinks.length > 0 ? (
                socialLinks.map(([network, url]) => (
                  <a key={network} href={url} target="_blank" rel="noopener noreferrer">
                    {network}
                  </a>
                ))
              ) : (
                <ToProvide />
              )}
            </InfoCard>

            <InfoCard title={tPage("brochure_title")}>
              {BROCHURE_PATH ? (
                <a href={BROCHURE_PATH} download>
                  {tPage("brochure_download")}
                </a>
              ) : (
                <ToProvide />
              )}
            </InfoCard>
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
