import type { NextRequest } from "next/server";
import {
  apiInvalidQuery,
  apiOk,
  apiServerError,
  PUBLIC_CACHE_HEADERS,
} from "@/lib/api_response";
import { listActualites } from "@/lib/data/actualites";
import {
  actualitesQuerySchema,
  searchParamsToObject,
} from "@/lib/validation/api_queries";

// GET /api/actualites?locale=fr&page=1 (9 actualités par page)
export async function GET(request: NextRequest) {
  const query = actualitesQuerySchema.safeParse(
    searchParamsToObject(request.nextUrl.searchParams),
  );
  if (!query.success) return apiInvalidQuery(query.error);

  try {
    return apiOk(await listActualites(query.data), PUBLIC_CACHE_HEADERS);
  } catch (error) {
    return apiServerError(error);
  }
}
