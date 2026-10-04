// Lien WhatsApp Click-to-Chat (https://wa.me) : aucun compte API nécessaire.
export function buildWhatsappLink(phoneNumber: string, message?: string): string {
  const digits = phoneNumber.replace(/\D/g, "");
  const url = new URL(`https://wa.me/${digits}`);
  if (message) {
    url.searchParams.set("text", message);
  }
  return url.toString();
}
