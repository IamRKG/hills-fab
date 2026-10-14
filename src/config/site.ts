/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  COMPANY DETAILS — EDIT THIS FILE (or set the matching environment variables)
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every value wrapped in [square brackets] is a placeholder. Replace it with the
 *  real business detail before launch. Public contact details can be set either
 *  here or through NEXT_PUBLIC_* variables in `.env.local` / your host's settings.
 *
 *  Nothing on the site invents company facts: while a value is still a
 *  placeholder, the UI shows it as a clearly labelled placeholder, and the
 *  LocalBusiness structured data is NOT emitted (see `isBusinessInfoComplete`).
 */

const env = (key: string, fallback: string) => {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value.trim() : fallback;
};

export const siteConfig = {
  /** Legal / trading name, e.g. "Sri Murugan Fabrication & Windows" */
  name: env("NEXT_PUBLIC_COMPANY_NAME", "Hills Fabrication Works"),
  /** Short name used in the logo lock-up and browser tab */
  shortName: env("NEXT_PUBLIC_COMPANY_SHORT_NAME", "Hills Fab"),
  tagline: "Fabrication · Welding · uPVC Windows & Doors",
  description:
    "Custom metal fabrication, expert welding, MS and stainless steel gates, railings, and uPVC windows and doors for residential, commercial and industrial projects.",

  /** Production URL, no trailing slash. Used for canonical URLs, sitemap and Open Graph. */
  url: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000").replace(/\/$/, ""),

  contact: {
    /** Display format, e.g. "+91 98765 43210" */
    phone: env("NEXT_PUBLIC_PHONE", "+91 99529 10022"),
    /** WhatsApp number in international format, digits only, e.g. "919876543210" */
    whatsapp: env("NEXT_PUBLIC_WHATSAPP_NUMBER", "919952910022"),
    email: env("NEXT_PUBLIC_EMAIL", "[Email Address]"),
  },

  address: {
    street: env("NEXT_PUBLIC_ADDRESS_STREET", "Ottiyambakam Main Road, Ottiyambakkam"),
    locality: env("NEXT_PUBLIC_ADDRESS_CITY", "Chennai"),
    region: env("NEXT_PUBLIC_ADDRESS_REGION", "Tamil Nadu"),
    postalCode: env("NEXT_PUBLIC_ADDRESS_POSTCODE", "600130"),
    /** ISO 3166-1 alpha-2, e.g. "IN" */
    country: env("NEXT_PUBLIC_ADDRESS_COUNTRY", "IN"),
  },

  /** Optional: an exact Google Maps embed URL (Share → Embed a map → copy the src). */
  mapEmbedUrl: env("NEXT_PUBLIC_MAP_EMBED_URL", "https://maps.google.com/maps?q=Ottiyambakam+Main+Road,+Ottiyambakkam,+Chennai,+Tamil+Nadu+600130&output=embed"),

  /** Working hours shown on the Contact page and footer. */
  hours: [
    { days: "Monday – Saturday", time: "[Opening hours, e.g. 9:00 AM – 7:00 PM]" },
    { days: "Sunday", time: "[Closed / by appointment]" },
  ],

  /** Primary city or region, used in SEO titles ("… in [City]"). */
  primaryLocation: env("NEXT_PUBLIC_PRIMARY_LOCATION", "Chennai"),

  /** Areas you serve. Shown in the Service Area section. */
  serviceAreas: [
    "[Service area 1]",
    "[Service area 2]",
    "[Service area 3]",
    "[Service area 4]",
    "[Service area 5]",
    "[Service area 6]",
  ],

  /** Company facts for the About page — leave blank until confirmed. */
  facts: {
    yearEstablished: "", // e.g. "2008"
    teamSize: "", // e.g. "25 fabricators & installers"
    workshopSize: "", // e.g. "6,000 sq ft workshop"
  },

  social: {
    facebook: env("NEXT_PUBLIC_FACEBOOK_URL", ""),
    instagram: env("NEXT_PUBLIC_INSTAGRAM_URL", ""),
    youtube: env("NEXT_PUBLIC_YOUTUBE_URL", ""),
  },

  whatsappMessage:
    "Hello, I am interested in your fabrication and window services. Please contact me to discuss my requirements.",
} as const;

export type SiteConfig = typeof siteConfig;

/** True when a value is still an unfilled placeholder like "[City]" or empty. */
export const isPlaceholder = (value: string | undefined | null) =>
  !value || /^\s*\[.*\]\s*$/.test(value);

/** Only emit LocalBusiness structured data when the core facts are real. */
export const isBusinessInfoComplete = () =>
  !isPlaceholder(siteConfig.name) &&
  !isPlaceholder(siteConfig.contact.phone) &&
  !isPlaceholder(siteConfig.address.street) &&
  !isPlaceholder(siteConfig.address.locality) &&
  !isPlaceholder(siteConfig.address.country) &&
  !siteConfig.url.includes("localhost");

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
