/*
 * Service worker d'AGRI'SUP (application installable, PWA). Écrit à la main, sans
 * bibliothèque. Enregistré par src/components/layout/service_worker.tsx.
 *
 * Stratégies :
 * - Pages (navigation) : réseau d'abord, pour toujours afficher le contenu à jour ; en
 *   cas d'échec, dernière version consultée, sinon page hors ligne (offline.html).
 * - Fichiers de Next.js (/_next/static/, noms uniques par version) : cache d'abord.
 * - Images (/_next/image, /images, /logo, /icons) : cache puis mise à jour en arrière-plan.
 * - Formulaires, API et requêtes d'une autre origine : jamais mis en cache.
 *
 * Mise à jour : changer VERSION à chaque modification de ce fichier. La nouvelle version
 * attend que le visiteur clique sur « Mettre à jour » (message SKIP_WAITING).
 */
const VERSION = "2026-10-09";
const PRECACHE = `agrisup-precache-${VERSION}`;
const PAGES = `agrisup-pages-${VERSION}`;
const ASSETS = `agrisup-assets-${VERSION}`;
const IMAGES = `agrisup-images-${VERSION}`;
const OFFLINE_URL = "/offline.html";

// Nombre maximal d'éléments conservés (stockage limité sur téléphone).
const LIMITS = { [PAGES]: 30, [IMAGES]: 80, [ASSETS]: 150 };

const PRECACHE_URLS = [
  OFFLINE_URL,
  "/logo/sceau_agrisup.png",
  "/icons/icone_192.png",
  "/icons/icone_512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PRECACHE).then((cache) => cache.addAll(PRECACHE_URLS)));
});

self.addEventListener("activate", (event) => {
  const current = [PRECACHE, PAGES, ASSETS, IMAGES];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("agrisup-") && !current.includes(key))
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

async function trim(cacheName) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const excess = keys.length - LIMITS[cacheName];
  for (let index = 0; index < excess; index += 1) await cache.delete(keys[index]);
}

async function put(cacheName, request, response) {
  if (!response || !response.ok || response.type === "opaque") return;
  const cache = await caches.open(cacheName);
  await cache.put(request, response);
  await trim(cacheName);
}

async function networkFirstPage(event) {
  try {
    const response = await fetch(event.request);
    event.waitUntil(put(PAGES, event.request, response.clone()));
    return response;
  } catch {
    const cached = await caches.match(event.request, { ignoreSearch: true });
    return cached || caches.match(OFFLINE_URL);
  }
}

async function cacheFirst(event, cacheName) {
  const cached = await caches.match(event.request);
  if (cached) return cached;
  const response = await fetch(event.request);
  event.waitUntil(put(cacheName, event.request, response.clone()));
  return response;
}

async function staleWhileRevalidate(event, cacheName) {
  const cached = await caches.match(event.request);
  const network = fetch(event.request)
    .then((response) => {
      event.waitUntil(put(cacheName, event.request, response.clone()));
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(event));
    return;
  }
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(event, ASSETS));
    return;
  }
  if (
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/images/") ||
    url.pathname.startsWith("/logo/") ||
    url.pathname.startsWith("/icons/")
  ) {
    event.respondWith(staleWhileRevalidate(event, IMAGES));
  }
  // Le reste (données de navigation de Next.js, manifeste…) passe directement par le
  // réseau : hors ligne, Next.js recharge la page, que le cas « navigation » prend en charge.
});
