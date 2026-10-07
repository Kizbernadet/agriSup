// Position d'AGRI'SUP (zone de Sotuba ACI), fournie par la cliente.
export const MAP_COORDINATES = { latitude: 12.663, longitude: -7.931 } as const;

const MAP_POINT = `${MAP_COORDINATES.latitude},${MAP_COORDINATES.longitude}`;

// Ouvre Google Maps (application ou site) centré sur l'établissement, sans clé API.
export function directionsUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${MAP_POINT}`;
}

// Carte intégrée de la page Contact.
export function mapEmbedUrl(locale: string): string {
  return `https://www.google.com/maps?q=${MAP_POINT}&z=16&hl=${locale}&output=embed`;
}
