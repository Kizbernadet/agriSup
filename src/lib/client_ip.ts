// Sur Vercel, l'IP du visiteur est la première valeur de x-forwarded-for
// (en-tête réécrit par la plateforme, non falsifiable par le visiteur).
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}
