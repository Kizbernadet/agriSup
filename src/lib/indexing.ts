// Indexation par les moteurs de recherche : bloquée par défaut tant que le site
// contient des données de test. Activer avec SITE_INDEXING=enabled une fois les
// coordonnées et contenus officiels validés.
export function isIndexingEnabled(): boolean {
  return process.env.SITE_INDEXING === "enabled";
}
