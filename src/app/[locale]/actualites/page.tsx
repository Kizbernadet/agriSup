import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/dev/page_placeholder";

export default async function ActualitesPage({
  params,
}: PageProps<"/[locale]/actualites">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PagePlaceholder page="actualites" />;
}
