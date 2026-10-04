import { createHmac } from "node:crypto";
import { db } from "@/lib/db";

// Fenêtre fixe : au plus MAX_REQUESTS envois par adresse IP et par formulaire
// toutes les WINDOW_SECONDS secondes.
const WINDOW_SECONDS = 10 * 60;
const MAX_REQUESTS = 5;

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfter: number };

// Sur Vercel, l'IP du visiteur est la première valeur de x-forwarded-for.
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}

// L'IP n'est jamais stockée : on conserve une empreinte HMAC avec une clé secrète,
// impossible à inverser sans cette clé (un simple SHA-256 se « casse » en testant
// les 4 milliards d'adresses IPv4).
function fingerprint(ip: string): string {
  const secret = process.env.RATE_LIMIT_SECRET;
  if (!secret) throw new Error("RATE_LIMIT_SECRET manquante : voir .env.example.");
  return createHmac("sha256", secret).update(ip).digest("hex");
}

export async function checkRateLimit(
  scope: string,
  ip: string,
): Promise<RateLimitResult> {
  const key = `${scope}:${fingerprint(ip)}`;

  // Incrément atomique en une requête : pas de course entre deux envois simultanés.
  const [row] = await db.$queryRaw<{ count: number; elapsed: number }[]>`
    INSERT INTO rate_limits (key, window_start, count)
    VALUES (${key}, now(), 1)
    ON CONFLICT (key) DO UPDATE SET
      count = CASE
        WHEN rate_limits.window_start < now() - ${WINDOW_SECONDS} * interval '1 second' THEN 1
        ELSE rate_limits.count + 1
      END,
      window_start = CASE
        WHEN rate_limits.window_start < now() - ${WINDOW_SECONDS} * interval '1 second' THEN now()
        ELSE rate_limits.window_start
      END
    RETURNING count, EXTRACT(EPOCH FROM now() - window_start)::int AS elapsed`;

  // Nettoyage occasionnel des fenêtres expirées (évite de faire grossir la table).
  if (Math.random() < 0.02) {
    await db.$executeRaw`DELETE FROM rate_limits WHERE window_start < now() - interval '1 day'`;
  }

  if (row.count <= MAX_REQUESTS) return { allowed: true };
  return { allowed: false, retryAfter: Math.max(WINDOW_SECONDS - row.elapsed, 1) };
}
