import { siteConfig, isPlaceholder } from "@/config/site";

/** Tiny className joiner (avoids an extra dependency). */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** wa.me link with the configured number and prefilled message. Returns null when no number is configured. */
export function whatsappLink(message: string = siteConfig.whatsappMessage): string | null {
  const digits = siteConfig.contact.whatsapp.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** tel: link for the configured phone, or null while it is still a placeholder. */
export function phoneLink(): string | null {
  const phone = siteConfig.contact.phone;
  if (isPlaceholder(phone)) return null;
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function emailLink(): string | null {
  const email = siteConfig.contact.email;
  if (isPlaceholder(email)) return null;
  return `mailto:${email}`;
}

export function fullAddress(): string {
  const a = siteConfig.address;
  return [a.street, a.locality, a.region, a.postalCode, a.country].join(", ");
}

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
