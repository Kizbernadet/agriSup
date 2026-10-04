import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import styles from "./form_field.module.css";

type FieldBaseProps = {
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  // Texte lu par les lecteurs d'écran à la place de l'astérisque (traduit par l'appelant).
  requiredLabel: string;
};

function fieldIds(name: string) {
  const id = `champ_${name}`;
  return { id, hintId: `${id}_aide`, errorId: `${id}_erreur` };
}

function describedBy(name: string, hint?: string, error?: string) {
  const { hintId, errorId } = fieldIds(name);
  return [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;
}

function FieldShell({
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  children,
}: FieldBaseProps & { children: ReactNode }) {
  const { id, hintId, errorId } = fieldIds(name);

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <>
            <span className={styles.required} aria-hidden="true">
              {" "}
              *
            </span>
            <span className="visually_hidden"> ({requiredLabel})</span>
          </>
        )}
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = FieldBaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id" | "required">;

export function TextField({
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  className,
  ...inputProps
}: TextFieldProps) {
  return (
    <FieldShell {...{ name, label, hint, error, required, requiredLabel }}>
      <input
        id={fieldIds(name).id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={[styles.control, className].filter(Boolean).join(" ")}
        {...inputProps}
      />
    </FieldShell>
  );
}

type TextAreaFieldProps = FieldBaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id" | "required">;

export function TextAreaField({
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  className,
  ...textareaProps
}: TextAreaFieldProps) {
  return (
    <FieldShell {...{ name, label, hint, error, required, requiredLabel }}>
      <textarea
        id={fieldIds(name).id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={[styles.control, styles.textarea, className].filter(Boolean).join(" ")}
        {...textareaProps}
      />
    </FieldShell>
  );
}

export type SelectOption = { value: string; label: string };

type SelectFieldProps = FieldBaseProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "id" | "required"> & {
    options: readonly SelectOption[];
    placeholder?: string;
  };

export function SelectField({
  name,
  label,
  hint,
  error,
  required,
  requiredLabel,
  className,
  options,
  placeholder,
  ...selectProps
}: SelectFieldProps) {
  return (
    <FieldShell {...{ name, label, hint, error, required, requiredLabel }}>
      <select
        id={fieldIds(name).id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={[styles.control, styles.select, className].filter(Boolean).join(" ")}
        {...selectProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

type CheckboxFieldProps = {
  name: string;
  // Libellé riche (peut contenir un lien).
  label: ReactNode;
  error?: string;
  required?: boolean;
  requiredLabel: string;
};

export function CheckboxField({
  name,
  label,
  error,
  required,
  requiredLabel,
}: CheckboxFieldProps) {
  const { id, errorId } = fieldIds(name);

  return (
    <div className={styles.field}>
      <div className={styles.checkbox_row}>
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={styles.checkbox}
        />
        <label htmlFor={id} className={styles.checkbox_label}>
          {label}
          {required && (
            <>
              <span className={styles.required} aria-hidden="true">
                {" "}
                *
              </span>
              <span className="visually_hidden"> ({requiredLabel})</span>
            </>
          )}
        </label>
      </div>
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
