/** IDCA secretariat WhatsApp (international format, no + or spaces). */
export const IDCA_WHATSAPP_NUMBER = "6281212343407";

export const IDCA_WHATSAPP_URL = `https://wa.me/${IDCA_WHATSAPP_NUMBER}`;

export function openWhatsApp(message: string) {
  const url = `${IDCA_WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
