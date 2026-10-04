import { z } from "zod";
import { FormationDomain, FormationLevel } from "@/generated/prisma/enums";
import { routing } from "@/i18n/routing";

// Paramètres d'URL des API publiques en lecture. Toute valeur inconnue est refusée (400).

const localeSchema = z.enum(routing.locales).default(routing.defaultLocale);

export const slugSchema = z
  .string()
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const formationsQuerySchema = z.object({
  locale: localeSchema,
  level: z.enum(FormationLevel).optional(),
  domain: z.enum(FormationDomain).optional(),
});

export const localeQuerySchema = z.object({ locale: localeSchema });

export const actualitesQuerySchema = z.object({
  locale: localeSchema,
  page: z.coerce.number().int().min(1).max(1000).default(1),
});

export function searchParamsToObject(searchParams: URLSearchParams) {
  return Object.fromEntries(searchParams);
}
