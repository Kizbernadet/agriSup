import type { MetadataRoute } from "next";
import { isIndexingEnabled } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexingEnabled()
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
  };
}
