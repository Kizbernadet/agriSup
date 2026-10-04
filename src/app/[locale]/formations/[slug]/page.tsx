import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { FormationMeta } from "@/components/formations/formation_meta";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page_header";
import { ToProvide } from "@/components/ui/to_provide";
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
        <Badge>{t(`level.${formation.level}`)}</Badge>
        <FormationMeta {...formation} />
        <div className={styles.actions}>
          <ButtonLink href={preinscriptionHref}>{tCommon("preinscription")}</ButtonLink>
          <WhatsappButton message={whatsappMessage} />
        </div>
      </PageHeader>

      <Container className={styles.body}>
        {!formation.verified && <Alert variant="info">{t("unverified")}</Alert>}

        <DetailSection id="presentation" title={tDetail("presentation")}>
          <Paragraphs text={formation.description} />
        </DetailSection>
        <DetailSection id="objectifs" title={tDetail("objectives")}>
          <BulletList items={formation.objectives} />
        </DetailSection>
        <DetailSection id="competences" title={tDetail("skills")}>
          <BulletList items={formation.skills} />
        </DetailSection>
        <DetailSection id="programme" title={tDetail("program")}>
          <Paragraphs text={formation.program} />
        </DetailSection>
        <DetailSection id="debouches" title={tDetail("careers")}>
          <BulletList items={formation.careerOpportunities} />
        </DetailSection>
        <DetailSection id="conditions" title={tDetail("admission")}>
          <BulletList items={formation.admissionRequirements} />
        </DetailSection>
        <DetailSection id="documents" title={tDetail("documents")}>
          <BulletList items={formation.requiredDocuments} />
        </DetailSection>

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

// Texte long : paragraphes séparés par une ligne vide.
function Paragraphs({ text }: { text: string | null }) {
  if (!text?.trim()) return <ToProvide />;
  return text.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>);
}

function BulletList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return <ToProvide />;
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
