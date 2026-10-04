import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/dev/page_placeholder";

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PagePlaceholder page="faq" />;
}
