import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";

export default function NotFoundPage() {
  const t = useTranslations("not_found");

  return (
    <Section>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <div>
        <ButtonLink href="/">{t("back_home")}</ButtonLink>
      </div>
    </Section>
  );
}
