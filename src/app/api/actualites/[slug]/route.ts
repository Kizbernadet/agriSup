import type { NextRequest } from "next/server";
import {
  apiInvalidQuery,
  apiNotFound,
  apiOk,
  apiServerError,
  PUBLIC_CACHE_HEADERS,
} from "@/lib/api_response";
import { getActualiteBySlug } from "@/lib/data/actualites";
import {
  localeQuerySchema,
  searchParamsToObject,
  slugSchema,
} from "@/lib/validation/api_queries";

// GET /api/actualites/pourquoi-etudier-a-agrisup?locale=en
export async function GET(
  request: NextRequest,
  ctx: RouteContext<"/api/actualites/[slug]">,
) {
  const { slug } = await ctx.params;
  if (!slugSchema.safeParse(slug).success) return apiNotFound();

  const query = localeQuerySchema.safeParse(
    searchParamsToObject(request.nextUrl.searchParams),
  );
  if (!query.success) return apiInvalidQuery(query.error);

  try {
    const actualite = await getActualiteBySlug(query.data.locale, slug);
    return actualite ? apiOk(actualite, PUBLIC_CACHE_HEADERS) : apiNotFound();
  } catch (error) {
    return apiServerError(error);
  }
}
