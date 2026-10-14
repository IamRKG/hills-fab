import type { Metadata } from "next";
import { siteConfig, isBusinessInfoComplete, isPlaceholder } from "@/config/site";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/utils";

const loc = () => (isPlaceholder(siteConfig.primaryLocation) ? "" : ` in ${siteConfig.primaryLocation}`);

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${siteConfig.name}`, description, url: path, type: "website", siteName: siteConfig.name },
    twitter: { card: "summary_large_image", title: `${title} | ${siteConfig.name}`, description },
  };
}

/** e.g. "Metal Fabrication, Welding & uPVC Windows in Chennai" */
export const seoHeadline = () => `Metal Fabrication, Welding & uPVC Windows${loc()}`;

/**
 * LocalBusiness structured data — returned ONLY when the real business details
 * have been filled in (see isBusinessInfoComplete in src/config/site.ts).
 */
export function localBusinessJsonLd() {
  if (!isBusinessInfoComplete()) return null;
  const a = siteConfig.address;
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    ...(isPlaceholder(siteConfig.contact.email) ? {} : { email: siteConfig.contact.email }),
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.locality,
      ...(isPlaceholder(a.region) ? {} : { addressRegion: a.region }),
      ...(isPlaceholder(a.postalCode) ? {} : { postalCode: a.postalCode }),
      addressCountry: a.country,
    },
    areaServed: siteConfig.serviceAreas.filter((s) => !isPlaceholder(s)),
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "OfferCatalog",
        name: s.title,
        itemListElement: s.items.filter((i) => i.offered).map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i.name } })),
      })),
    },
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
