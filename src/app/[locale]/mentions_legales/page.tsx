import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/dev/page_placeholder";

export default async function MentionsLegalesPage({
  params,
}: PageProps<"/[locale]/mentions_legales">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PagePlaceholder page="mentions_legales" />;
}
