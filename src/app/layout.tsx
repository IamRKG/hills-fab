import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { JsonLd, localBusinessJsonLd, seoHeadline } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | ${seoHeadline()}`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "metal fabrication services", "welding services", "MS gate manufacturers", "stainless steel fabrication",
    "uPVC windows and doors", "custom window installation", "residential metal fabrication", "staircase railings", "window grills",
  ],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: siteConfig.name, url: "/", title: siteConfig.name, description: siteConfig.description },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#222831",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white">
        <a href="#main" className="sr-only z-[60] rounded bg-accent px-4 py-3 font-semibold text-charcoal focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
