// Recherche Google Maps par adresse : intégration et itinéraire sans clé API.
// À remplacer par des coordonnées précises (latitude, longitude) quand AGRI'SUP les fournit.
export const MAP_QUERY = "Sotuba ACI, Bamako, Mali";

export function directionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
}
