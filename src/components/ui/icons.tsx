import type { SVGProps } from "react";

// Icônes décoratives (aria-hidden) : le sens est toujours porté par un texte ou un aria-label.
type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </BaseIcon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </BaseIcon>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5z" />
    </BaseIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </BaseIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </BaseIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </BaseIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </BaseIcon>
  );
}

// ---------- Domaines de formation ----------

export function SproutIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 21h10" />
      <path d="M12 21v-9" />
      <path d="M12 12C12 7.6 8.9 5 4 5c0 4.4 3.1 7 8 7z" />
      <path d="M12 12c0-3.3 2.3-6 7-6 0 3.3-2.3 6-7 6z" />
    </BaseIcon>
  );
}

export function PawIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="6" cy="10" r="1.8" />
      <circle cx="10" cy="5.5" r="1.8" />
      <circle cx="14" cy="5.5" r="1.8" />
      <circle cx="18" cy="10" r="1.8" />
      <path d="M8 17.5c0-3.2 1.8-5.5 4-5.5s4 2.3 4 5.5a2.5 2.5 0 0 1-4 1.9 2.5 2.5 0 0 1-4-1.9z" />
    </BaseIcon>
  );
}

export function FishIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M2.5 12c3-5 9.5-6.5 14.5-2l4.5-3.5v11L17 14c-5 4.5-11.5 3-14.5-2z" />
      <circle cx="8" cy="11" r="0.6" fill="currentColor" />
    </BaseIcon>
  );
}

export function ChartIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 3 3 6-7" />
      <path d="M16 7h4v4" />
    </BaseIcon>
  );
}

export function TreeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22v-7" />
      <path d="M9 18h6" />
      <path d="M12 15H7.5a4 4 0 0 1-1.3-7.8 6 6 0 0 1 11.6 0A4 4 0 0 1 16.5 15z" />
    </BaseIcon>
  );
}

// ---------- Étapes, sections et appels à l'action ----------

export function BookIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 21V5" />
      <path d="M8 7h7" />
    </BaseIcon>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 3h6" />
      <path d="M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" />
      <path d="M7 15h10" />
    </BaseIcon>
  );
}

export function FieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="17" cy="6" r="2.5" />
      <path d="M2 20c4-4 8-4 10-4s6 0 10 4" />
      <path d="M2 15c3-2 6-3 9-3" />
      <path d="M6 20v-3M10 20v-4M14 20v-4M18 20v-3" />
    </BaseIcon>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </BaseIcon>
  );
}

export function GraduationIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m2 9 10-5 10 5-10 5z" />
      <path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 9v6" />
    </BaseIcon>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1" />
      <path d="m9 13 2 2 4-4" />
    </BaseIcon>
  );
}

export function SendIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </BaseIcon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </BaseIcon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 4.5a3.5 3.5 0 0 1 0 7" />
      <path d="M18 14c2.2.6 3.5 2.8 3.5 6" />
    </BaseIcon>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z" />
    </BaseIcon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </BaseIcon>
  );
}
