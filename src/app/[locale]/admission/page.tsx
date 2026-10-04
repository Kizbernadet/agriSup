import { setRequestLocale } from "next-intl/server";
import { PagePlaceholder } from "@/components/dev/page_placeholder";

export default async function AdmissionPage({
  params,
}: PageProps<"/[locale]/admission">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PagePlaceholder page="admission" />;
}
