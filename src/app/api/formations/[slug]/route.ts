import type { NextRequest } from "next/server";
import {
  apiInvalidQuery,
  apiNotFound,
  apiOk,
  apiServerError,
  PUBLIC_CACHE_HEADERS,
} from "@/lib/api_response";
import { getFormationBySlug } from "@/lib/data/formations";
import {
  localeQuerySchema,
  searchParamsToObject,
  slugSchema,
} from "@/lib/validation/api_queries";

// GET /api/formations/licence-pro-agronomie?locale=en
export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/formations/[slug]">,
) {
  const { slug } = await ctx.params;
  if (!slugSchema.safeParse(slug).success) return apiNotFound();

  const query = localeQuerySchema.safeParse(
    searchParamsToObject(request.nextUrl.searchParams),
  );
  if (!query.success) return apiInvalidQuery(query.error);

  try {
    const formation = await getFormationBySlug(query.data.locale, slug);
    return formation ? apiOk(formation, PUBLIC_CACHE_HEADERS) : apiNotFound();
  } catch (error) {
    return apiServerError(error);
  }
}
