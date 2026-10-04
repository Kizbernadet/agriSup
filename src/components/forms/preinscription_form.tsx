"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsappButton } from "@/components/contact/whatsapp_button";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  CheckboxField,
  SelectField,
  TextAreaField,
  TextField,
  type SelectOption,
} from "@/components/ui/form_field";
import { EDUCATION_LEVELS } from "@/content/site_config";
import { Link } from "@/i18n/navigation";
import { HONEYPOT_FIELD } from "@/lib/validation/form_fields";
import { preinscriptionSchema } from "@/lib/validation/preinscription_schema";
import { FormErrorSummary, FormSuccess } from "./form_feedback";
import { HoneypotField } from "./honeypot_field";
import { fieldValue, useFormSubmission } from "./use_form_submission";
import styles from "./form_feedback.module.css";

type PreinscriptionFormProps = {
  formations: readonly SelectOption[];
  academicYears: readonly string[];
};

type Submitted = { firstName: string; formation: string };

export function PreinscriptionForm({
  formations,
  academicYears,
}: PreinscriptionFormProps) {
  const t = useTranslations("form");
  const tErrors = useTranslations("form_errors");
  const tPage = useTranslations("preinscription_page");
  const locale = useLocale();
  // Formation présélectionnée depuis sa page détail (?formation=<slug>). Lue après le
  // chargement (et non via useSearchParams) pour que le formulaire reste pré-rendu.
  const [defaultFormation, setDefaultFormation] = useState("");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("formation");
    if (formations.some((option) => option.value === requested)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- synchronisation unique avec l'URL au chargement
      setDefaultFormation(requested ?? "");
    }
  }, [formations]);
  const [submitted, setSubmitted] = useState<Submitted | null>(null);

  const { status, fieldErrors, formError, handleSubmit } = useFormSubmission({
    endpoint: "/api/preinscriptions",
    schema: preinscriptionSchema,
    toPayload: (formData) => ({
      firstName: fieldValue(formData, "firstName"),
      lastName: fieldValue(formData, "lastName"),
      phone: fieldValue(formData, "phone"),
      email: fieldValue(formData, "email"),
      city: fieldValue(formData, "city"),
      educationLevel: fieldValue(formData, "educationLevel"),
      formation: fieldValue(formData, "formation"),
      academicYear: fieldValue(formData, "academicYear"),
      message: fieldValue(formData, "message"),
      consent: formData.get("consent") === "on",
      locale,
      [HONEYPOT_FIELD]: fieldValue(formData, HONEYPOT_FIELD),
    }),
    onSuccess: (payload) => {
      const formation = formations.find((option) => option.value === payload.formation);
      setSubmitted({
        firstName: String(payload.firstName),
        formation: formation?.label ?? String(payload.formation),
      });
    },
  });

  if (status === "success" && submitted) {
    return (
      <FormSuccess>
        <Alert variant="success" title={tPage("success_title")}>
          <p>{tPage("success_text", { firstName: submitted.firstName })}</p>
          <p>{tPage("success_whatsapp")}</p>
        </Alert>
        <div className={styles.actions}>
          <WhatsappButton
            message={tPage("whatsapp_message", { formation: submitted.formation })}
            variant="primary"
          />
          <ButtonLink href="/" variant="secondary">
            {tPage("back_home")}
          </ButtonLink>
        </div>
      </FormSuccess>
    );
  }

  const error = (field: string) => {
    const key = fieldErrors[field];
    return key ? tErrors(key) : undefined;
  };
  const labels = {
    lastName: t("fields.last_name"),
    firstName: t("fields.first_name"),
    phone: t("fields.phone"),
    email: t("fields.email"),
    city: t("fields.city"),
    formation: t("fields.formation"),
    educationLevel: t("fields.education_level"),
    academicYear: t("fields.academic_year"),
    message: t("fields.message"),
    consent: t("fields.consent"),
  };
  const requiredLabel = t("required");

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <FormErrorSummary kind={formError} fieldErrors={fieldErrors} fieldLabels={labels} />
      <p className={styles.legend_note}>{t("required_legend")}</p>

      <fieldset className={styles.fieldset}>
        <legend className={styles.fieldset_legend}>{tPage("group_identity")}</legend>
        <div className={styles.two_columns}>
          <TextField
            name="lastName"
            label={labels.lastName}
            autoComplete="family-name"
            required
            requiredLabel={requiredLabel}
            error={error("lastName")}
          />
          <TextField
            name="firstName"
            label={labels.firstName}
            autoComplete="given-name"
            required
            requiredLabel={requiredLabel}
            error={error("firstName")}
          />
          <TextField
            name="phone"
            type="tel"
            label={labels.phone}
            hint={t("hints.phone")}
            autoComplete="tel"
            inputMode="tel"
            required
            requiredLabel={requiredLabel}
            error={error("phone")}
          />
          <TextField
            name="email"
            type="email"
            label={labels.email}
            hint={t("hints.email_optional")}
            autoComplete="email"
            inputMode="email"
            requiredLabel={requiredLabel}
            error={error("email")}
          />
        </div>
        <TextField
          name="city"
          label={labels.city}
          autoComplete="address-level2"
          required
          requiredLabel={requiredLabel}
          error={error("city")}
        />
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.fieldset_legend}>{tPage("group_project")}</legend>
        <SelectField
          // Clé : recrée le champ quand la présélection arrive après le chargement.
          key={defaultFormation}
          name="formation"
          label={labels.formation}
          placeholder={t("choose")}
          options={formations}
          defaultValue={defaultFormation}
          required
          requiredLabel={requiredLabel}
          error={error("formation")}
        />
        <div className={styles.two_columns}>
          <SelectField
            name="educationLevel"
            label={labels.educationLevel}
            placeholder={t("choose")}
            options={EDUCATION_LEVELS.map((value) => ({
              value,
              label: t(`education_levels.${value}`),
            }))}
            defaultValue=""
            required
            requiredLabel={requiredLabel}
            error={error("educationLevel")}
          />
          <SelectField
            name="academicYear"
            label={labels.academicYear}
            placeholder={t("choose")}
            options={academicYears.map((year) => ({ value: year, label: year }))}
            defaultValue=""
            required
            requiredLabel={requiredLabel}
            error={error("academicYear")}
          />
        </div>
        <TextAreaField
          name="message"
          label={labels.message}
          hint={t("hints.message_optional")}
          rows={4}
          requiredLabel={requiredLabel}
          error={error("message")}
        />
      </fieldset>

      <CheckboxField
        name="consent"
        required
        requiredLabel={requiredLabel}
        error={error("consent")}
        label={
          <>
            {t("consent_before")}
            <Link href="/mentions_legales">{t("consent_link")}</Link>.
          </>
        }
      />
      <HoneypotField />

      <div className={styles.actions}>
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? t("sending") : t("submit_preinscription")}
        </Button>
      </div>
    </form>
  );
}
