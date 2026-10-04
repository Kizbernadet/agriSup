import type { NextRequest } from "next/server";
import {
  apiInvalidQuery,
  apiOk,
  apiServerError,
  PUBLIC_CACHE_HEADERS,
} from "@/lib/api_response";
import { listFormations } from "@/lib/data/formations";
import {
  formationsQuerySchema,
  searchParamsToObject,
} from "@/lib/validation/api_queries";

// GET /api/formations?locale=fr&level=DUT&domain=AQUACULTURE
export async function GET(request: NextRequest) {
  const query = formationsQuerySchema.safeParse(
    searchParamsToObject(request.nextUrl.searchParams),
  );
  if (!query.success) return apiInvalidQuery(query.error);

  try {
    return apiOk(await listFormations(query.data), PUBLIC_CACHE_HEADERS);
  } catch (error) {
    return apiServerError(error);
  }
}
