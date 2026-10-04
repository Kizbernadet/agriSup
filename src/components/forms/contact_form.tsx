"use client";

import { useLocale, useTranslations } from "next-intl";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckboxField, TextAreaField, TextField } from "@/components/ui/form_field";
import { Link } from "@/i18n/navigation";
import { HONEYPOT_FIELD } from "@/lib/validation/form_fields";
import { contactSchema } from "@/lib/validation/contact_schema";
import { FormErrorSummary, FormSuccess } from "./form_feedback";
import { HoneypotField } from "./honeypot_field";
import { fieldValue, useFormSubmission } from "./use_form_submission";
import styles from "./form_feedback.module.css";

export function ContactForm() {
  const t = useTranslations("form");
  const tErrors = useTranslations("form_errors");
  const tContact = useTranslations("contact_form");
  const locale = useLocale();

  const { status, fieldErrors, formError, handleSubmit, reset } = useFormSubmission({
    endpoint: "/api/contact",
    schema: contactSchema,
    toPayload: (formData) => ({
      name: fieldValue(formData, "name"),
      email: fieldValue(formData, "email"),
      phone: fieldValue(formData, "phone"),
      subject: fieldValue(formData, "subject"),
      message: fieldValue(formData, "message"),
      consent: formData.get("consent") === "on",
      locale,
      [HONEYPOT_FIELD]: fieldValue(formData, HONEYPOT_FIELD),
    }),
  });

  if (status === "success") {
    return (
      <FormSuccess>
        <Alert variant="success" title={tContact("success_title")}>
          <p>{tContact("success_text")}</p>
        </Alert>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={reset}>
            {tContact("send_another")}
          </Button>
        </div>
      </FormSuccess>
    );
  }

  const error = (field: string) => {
    const key = fieldErrors[field];
    return key ? tErrors(key) : undefined;
  };
  const labels = {
    name: t("fields.name"),
    email: t("fields.email"),
    phone: t("fields.phone"),
    subject: t("fields.subject"),
    message: t("fields.message"),
    consent: t("fields.consent"),
  };
  const requiredLabel = t("required");

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <FormErrorSummary kind={formError} fieldErrors={fieldErrors} fieldLabels={labels} />
      <p className={styles.legend_note}>{t("required_legend")}</p>

      <TextField
        name="name"
        label={labels.name}
        autoComplete="name"
        required
        requiredLabel={requiredLabel}
        error={error("name")}
      />
      <div className={styles.two_columns}>
        <TextField
          name="email"
          type="email"
          label={labels.email}
          hint={t("hints.email_or_phone")}
          autoComplete="email"
          inputMode="email"
          requiredLabel={requiredLabel}
          error={error("email")}
        />
        <TextField
          name="phone"
          type="tel"
          label={labels.phone}
          hint={t("hints.phone")}
          autoComplete="tel"
          inputMode="tel"
          requiredLabel={requiredLabel}
          error={error("phone")}
        />
      </div>
      <TextField
        name="subject"
        label={labels.subject}
        required
        requiredLabel={requiredLabel}
        error={error("subject")}
      />
      <TextAreaField
        name="message"
        label={labels.message}
        rows={6}
        required
        requiredLabel={requiredLabel}
        error={error("message")}
      />
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
          {status === "submitting" ? t("sending") : t("submit_contact")}
        </Button>
      </div>
    </form>
  );
}
