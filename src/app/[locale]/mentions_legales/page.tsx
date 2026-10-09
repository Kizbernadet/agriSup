import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Alert } from "@/components/ui/alert";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page_header";
import { RichText } from "@/components/ui/rich_text";
import { CONTACT, LEGAL } from "@/content/placeholders";
import { toAppLocale } from "@/i18n/locale";
import styles from "./mentions_legales.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/mentions_legales">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.mentions_legales" });
  return { title: t("title"), description: t("description") };
}

// Mentions légales et politique de confidentialité (texte provisoire à valider).
export default async function MentionsLegalesPage({
  params,
}: PageProps<"/[locale]/mentions_legales">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tPage, tNav, tFooter] = await Promise.all([
    getTranslations("pages.mentions_legales"),
    getTranslations("legal_page"),
    getTranslations("nav"),
    getTranslations("footer"),
  ]);
  const { address } = CONTACT;

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>
            <RichText text={tPage("intro")} />
          </p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />
      <Container className={styles.body}>
        <Alert variant="warning">{tPage("draft")}</Alert>

        <LegalSection id="editeur" title={tPage("editor_title")}>
          <dl className={styles.facts}>
            <Fact label={tPage("editor_name")}>
              AGRI&apos;SUP — {tFooter("denomination")}
            </Fact>
            <Fact label={tPage("editor_address")}>
              {address.street}, {address.district}, {address.city}, {address.country}
            </Fact>
            <Fact label={tPage("editor_phone")}>
              {CONTACT.phones.map((phone) => phone.display).join(" / ")}
            </Fact>
            {LEGAL.publicationManager && (
              <Fact label={tPage("editor_manager")}>{LEGAL.publicationManager}</Fact>
            )}
            {LEGAL.registration && (
              <Fact label={tPage("editor_registration")}>{LEGAL.registration}</Fact>
            )}
          </dl>
        </LegalSection>

        <LegalSection id="hebergement" title={tPage("host_title")}>
          <p>{tPage("host_text")}</p>
          <p>
            <strong>{LEGAL.host.name}</strong> — {LEGAL.host.address} —{" "}
            <a href={LEGAL.host.website} target="_blank" rel="noopener noreferrer">
              {LEGAL.host.website.replace("https://", "")}
            </a>
          </p>
          <p>{tPage("database_text")}</p>
        </LegalSection>

        <LegalSection id="donnees" title={tPage("data_title")}>
          <p>{tPage("data_collected")}</p>
          <p>{tPage("data_purpose")}</p>
          <p>{tPage("data_basis")}</p>
          <p>{tPage("data_recipients")}</p>
          {LEGAL.retentionPeriod && (
            <p>
              {tPage("data_retention")} {LEGAL.retentionPeriod}
            </p>
          )}
          <p>{tPage("data_security")}</p>
        </LegalSection>

        <LegalSection id="droits" title={tPage("rights_title")}>
          <p>{tPage("rights_text")}</p>
        </LegalSection>

        <LegalSection id="cookies" title={tPage("cookies_title")}>
          <ul className={styles.list}>
            <li>{tPage("cookies_locale")}</li>
            <li>{tPage("cookies_theme")}</li>
            <li>{tPage("cookies_youtube")}</li>
            <li>{tPage("cookies_maps")}</li>
            <li>{tPage("cookies_none")}</li>
          </ul>
        </LegalSection>

        <LegalSection id="propriete" title={tPage("ip_title")}>
          <p>{tPage("ip_text")}</p>
          <p>{tPage("credits")}</p>
        </LegalSection>
      </Container>
    </>
  );
}

function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}_titre`} className={styles.section}>
      <h2 id={`${id}_titre`}>{title}</h2>
      {children}
    </section>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.fact}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
