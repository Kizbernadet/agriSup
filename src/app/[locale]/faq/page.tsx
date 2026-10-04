import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { Accordion } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page_header";
import { Section } from "@/components/ui/section";
import { FAQ_ITEMS } from "@/content/faq";
import { toAppLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import styles from "./faq.module.css";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const locale = toAppLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: "pages.faq" });
  return { title: t("title"), description: t("description") };
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const locale = toAppLocale((await params).locale);
  setRequestLocale(locale);

  const [t, tPage, tNav, tCommon] = await Promise.all([
    getTranslations("pages.faq"),
    getTranslations("faq_page"),
    getTranslations("nav"),
    getTranslations("common"),
  ]);

  return (
    <>
      <PageHeader
        title={t("title")}
        intro={<p>{tPage("intro")}</p>}
        breadcrumb={[{ label: tNav("home"), href: "/" }, { label: t("title") }]}
      />
      <Section>
        <Accordion
          items={FAQ_ITEMS.map((item) => ({
            id: item.id,
            question: item.question[locale],
            answer: (
              <>
                <p>{item.answer[locale]}</p>
                {item.link && (
                  <p>
                    <Link href={item.link.href} className={styles.link}>
                      {item.link.label[locale]} →
                    </Link>
                  </p>
                )}
              </>
            ),
          }))}
        />
      </Section>
      <Section tone="surface" title={tPage("more_title")} intro={tPage("more_text")}>
        <div className={styles.actions}>
          <ButtonLink href="/contact">{tCommon("contact_us")}</ButtonLink>
          <WhatsappButton />
        </div>
      </Section>
    </>
  );
}
