import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("not_found");

  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link href="/">{t("back_home")}</Link>
    </main>
  );
}
