import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DomainCover } from "@/components/domains/domain_cover";
import { DomainIcon } from "@/components/formations/domain_icon";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/page_header";
import { Paragraphs } from "@/components/ui/paragraphs";
import { RichText } from "@/components/ui/rich_text";
import { DOMAINS } from "@/content/domains";
import { DOMAIN_PHOTOS } from "@/content/visuals";
import type { FormationDomain } from "@/generated/prisma/enums";
import { toAppLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { listFormations } from "@/lib/data/formations";
import { revealProps } from "@/lib/reveal";
import styles from "./domaines.module.css";

// Page statique régénérée au plus toutes les heures (formations lues en base).
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/domaines">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.domaines" });
  return { title: t("title"), description: t("description") };
}

// Les cinq domaines de formation, chacun avec sa couverture, sa présentation, des
// exemples de métiers et les formations qui s'y rattachent.
export default async function DomainesPage({ params }: PageProps<"/[locale]/domaines">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tPage, tNav, tFormation, formations] = await Promise.all([
    getTranslations("pages.domaines"),
    getTranslations("domaines_page"),
    getTranslations("nav"),
    getTranslations("formation"),
    listFormations({ locale }),
  ]);
  const domains = Object.keys(DOMAINS) as FormationDomain[];

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>
            <RichText text={tPage("intro")} />
          </p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      >
        <nav aria-label={tPage("on_this_page")} className={styles.anchors}>
          <ul>
            {domains.map((domain) => (
              <li key={domain}>
                <a href={`#${DOMAINS[domain].anchor}`}>
                  <DomainIcon domain={domain} variant="inline" />
                  {tFormation(`domain.${domain}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {domains.map((domain, index) => {
        const content = DOMAINS[domain];
        const titleId = `${content.anchor}_titre`;
        const domainFormations = formations.filter((item) => item.domain === domain);

        return (
          <section
            key={domain}
            id={content.anchor}
            aria-labelledby={titleId}
            className={styles.domain}
          >
            <Container className={styles.layout}>
              <div className={styles.media} {...revealProps()}>
                <DomainCover
                  domain={domain}
                  photo={DOMAIN_PHOTOS[domain]}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  priority={index === 0}
                  parallax
                  className={styles.cover}
                />
              </div>

              <div className={styles.content}>
                <div className={styles.heading} {...revealProps()}>
                  <Eyebrow>
                    {tPage("counter", { index: index + 1, total: domains.length })}
                  </Eyebrow>
                  <h2 id={titleId} className={styles.title}>
                    <DomainIcon domain={domain} />
                    {tFormation(`domain.${domain}`)}
                  </h2>
                </div>

                <div className={styles.overview} {...revealProps(1)}>
                  <Paragraphs text={content.overview[locale]} />
                </div>

                <div className={styles.block} {...revealProps(2)}>
                  <h3>{tPage("careers_title")}</h3>
                  <ul className={styles.chips}>
                    {content.careers.map((career) => (
                      <li key={career.fr}>{career[locale]}</li>
                    ))}
                  </ul>
                  {content.regulatoryNote && (
                    <p className={styles.note}>{content.regulatoryNote[locale]}</p>
                  )}
                </div>

                {domainFormations.length > 0 && (
                  <div className={styles.block} {...revealProps(3)}>
                    <h3>{tPage("formations_title")}</h3>
                    <ul className={styles.formations}>
                      {domainFormations.map((formation) => (
                        <li key={formation.slug}>
                          <Link
                            href={{
                              pathname: "/formations/[slug]",
                              params: { slug: formation.slug },
                            }}
                            className={styles.formation_link}
                          >
                            <span className={styles.formation_level}>
                              {tFormation(`level.${formation.level}`)}
                            </span>
                            <span className={styles.formation_name}>
                              {formation.name}
                            </span>
                            <ArrowRightIcon className={styles.formation_arrow} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <ButtonLink
                        href={{ pathname: "/formations", query: { domaine: domain } }}
                        variant="secondary"
                      >
                        {tPage("see_catalog")}
                      </ButtonLink>
                    </div>
                  </div>
                )}
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
