import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/dev/page_placeholder";

export default async function AgrisupPage({ params }: PageProps<"/[locale]/agrisup">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PagePlaceholder page="agrisup" />;
}
