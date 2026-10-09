"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { CloseIcon, RestartIcon } from "@/components/ui/icons";
import styles from "./service_worker_registrar.module.css";

// Enregistre le service worker (public/sw.js : application installable, pages consultées
// disponibles hors ligne) et propose la mise à jour quand une nouvelle version du site
// est prête. Production uniquement : en développement, le cache gênerait les rechargements.
export function ServiceWorkerRegistrar() {
  const t = useTranslations("pwa");
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  // Recharger seulement après un clic sur « Mettre à jour » : à la toute première
  // installation, le service worker prend aussi le contrôle de la page (clients.claim).
  const updating = useRef(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const container = navigator.serviceWorker;

    const onControllerChange = () => {
      if (updating.current) window.location.reload();
    };
    container.addEventListener("controllerchange", onControllerChange);

    container
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .then((registration) => {
        // Une version déjà installée attendait (onglet resté ouvert pendant un déploiement).
        if (registration.waiting && container.controller) setWaiting(registration.waiting);
        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          worker?.addEventListener("statechange", () => {
            if (worker.state === "installed" && container.controller) setWaiting(worker);
          });
        });
      })
      .catch(() => {
        // Sans service worker, le site fonctionne normalement (simplement pas hors ligne).
      });

    return () => container.removeEventListener("controllerchange", onControllerChange);
  }, []);

  if (!waiting) return null;

  function update() {
    updating.current = true;
    waiting?.postMessage("SKIP_WAITING");
  }

  return (
    <div className={styles.notice} role="status">
      <p>{t("update_available")}</p>
      <div className={styles.actions}>
        <button type="button" className={styles.update} onClick={update}>
          <RestartIcon aria-hidden="true" />
          {t("update_action")}
        </button>
        <button
          type="button"
          className={styles.dismiss}
          onClick={() => setWaiting(null)}
          aria-label={t("dismiss")}
          title={t("dismiss")}
        >
          <CloseIcon aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
