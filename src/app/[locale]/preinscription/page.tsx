import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/dev/page_placeholder";

export default async function PreinscriptionPage({
  params,
}: PageProps<"/[locale]/preinscription">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PagePlaceholder page="preinscription" />;
}
