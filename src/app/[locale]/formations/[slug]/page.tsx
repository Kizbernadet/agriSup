import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { DomainIcon } from "@/components/formations/domain_icon";
import { FormationMeta } from "@/components/formations/formation_meta";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page_header";
import { Paragraphs } from "@/components/ui/paragraphs";
import { DOMAINS } from "@/content/domains";
import { toAppLocale } from "@/i18n/locale";
import { getFormationBySlug, listPublishedFormationSlugs } from "@/lib/data/formations";
import styles from "./formation_detail.module.css";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await listPublishedFormationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/formations/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const formation = await getFormationBySlug(toAppLocale(locale), slug);
  if (!formation) return {};
  return { title: formation.name, description: formation.summary };
}

export default async function FormationDetailPage({
  params,
}: PageProps<"/[locale]/formations/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  const locale = toAppLocale(rawLocale);
  setRequestLocale(locale);

  const formation = await getFormationBySlug(locale, slug);
  if (!formation) notFound();

  const [t, tDetail, tNav, tCommon] = await Promise.all([
    getTranslations("formation"),
    getTranslations("formation_detail"),
    getTranslations("nav"),
    getTranslations("common"),
  ]);
  const whatsappMessage = t("whatsapp_message", { name: formation.name });
  const preinscriptionHref = {
    pathname: "/preinscription" as const,
    query: { formation: formation.slug },
  };
  const domainContent = DOMAINS[formation.domain];

  return (
    <>
      <PageHeader
        title={formation.name}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("formations"), href: "/formations" },
          { label: formation.name },
        ]}
      >
        <div className={styles.identity}>
          <DomainIcon domain={formation.domain} />
          <Badge>{t(`level.${formation.level}`)}</Badge>
        </div>
        <FormationMeta {...formation} />
        <div className={styles.actions}>
          <ButtonLink href={preinscriptionHref}>{tCommon("preinscription")}</ButtonLink>
          <WhatsappButton message={whatsappMessage} />
        </div>
      </PageHeader>

      <Container className={styles.body}>
        {!formation.verified && <Alert variant="info">{t("unverified")}</Alert>}

        {formation.description?.trim() && (
          <DetailSection id="presentation" title={tDetail("presentation")}>
            <Paragraphs text={formation.description} />
          </DetailSection>
        )}
        {formation.objectives.length > 0 && (
          <DetailSection id="objectifs" title={tDetail("objectives")}>
            <BulletList items={formation.objectives} />
          </DetailSection>
        )}
        {formation.skills.length > 0 && (
          <DetailSection id="competences" title={tDetail("skills")}>
            <BulletList items={formation.skills} />
          </DetailSection>
        )}
        {formation.program?.trim() && (
          <DetailSection id="programme" title={tDetail("program")}>
            <Paragraphs text={formation.program} />
            <p className={styles.note}>{tDetail("program_note")}</p>
          </DetailSection>
        )}
        {formation.careerOpportunities.length > 0 && (
          <DetailSection id="debouches" title={tDetail("careers")}>
            <BulletList items={formation.careerOpportunities} />
            <p className={styles.note}>{tDetail("careers_specific_note")}</p>
          </DetailSection>
        )}
        {formation.admissionRequirements.length > 0 && (
          <DetailSection id="conditions" title={tDetail("admission")}>
            <BulletList items={formation.admissionRequirements} />
          </DetailSection>
        )}
        {formation.requiredDocuments.length > 0 && (
          <DetailSection id="documents" title={tDetail("documents")}>
            <BulletList items={formation.requiredDocuments} />
          </DetailSection>
        )}

        <aside className={styles.domain} aria-labelledby="domaine_titre">
          <div className={styles.domain_heading}>
            <DomainIcon domain={formation.domain} />
            <div>
              <h2 id="domaine_titre">{tDetail("domain_title")}</h2>
              <p className={styles.domain_name}>{t(`domain.${formation.domain}`)}</p>
            </div>
          </div>
          <p>{domainContent.description[locale]}</p>
          <h3 className={styles.careers_title}>{tDetail("careers_examples")}</h3>
          <ul className={styles.careers}>
            {domainContent.careers.map((career) => (
              <li key={career.fr}>{career[locale]}</li>
            ))}
          </ul>
          <h3 className={styles.careers_title}>{tDetail("sectors_mali")}</h3>
          <ul className={styles.careers}>
            {domainContent.sectorsMali.map((sector) => (
              <li key={sector.fr}>{sector[locale]}</li>
            ))}
          </ul>
          <h3 className={styles.careers_title}>{tDetail("sectors_global")}</h3>
          <ul className={styles.careers}>
            {domainContent.sectorsGlobal.map((sector) => (
              <li key={sector.fr}>{sector[locale]}</li>
            ))}
          </ul>
          {domainContent.regulatoryNote && (
            <p className={styles.note}>{domainContent.regulatoryNote[locale]}</p>
          )}
          <p className={styles.note}>{tDetail("careers_note")}</p>
        </aside>

        <Card className={styles.apply}>
          <h2>{tDetail("apply_title")}</h2>
          <p>{tDetail("apply_text")}</p>
          <div className={styles.actions}>
            <ButtonLink href={preinscriptionHref}>{tCommon("preinscription")}</ButtonLink>
            <WhatsappButton message={whatsappMessage} />
            <ButtonLink href="/formations" variant="secondary">
              {tDetail("back")}
            </ButtonLink>
          </div>
        </Card>
      </Container>
    </>
  );
}

function DetailSection({
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

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
