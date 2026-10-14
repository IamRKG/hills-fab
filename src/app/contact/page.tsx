import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, isPlaceholder } from "@/config/site";
import { PageHero } from "@/components/ui/PageHero";
import { Detail } from "@/components/ui/Placeholder";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { emailLink, fullAddress, phoneLink, whatsappLink } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Call, WhatsApp, email or send an enquiry for metal fabrication, welding, gates, railings and uPVC windows and doors.",
  path: "/contact",
});

function mapSrc(): string | null {
  if (siteConfig.mapEmbedUrl) return siteConfig.mapEmbedUrl;
  const a = siteConfig.address;
  if (isPlaceholder(a.street) || isPlaceholder(a.locality)) return null;
  return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress())}&output=embed`;
}

export default function ContactPage() {
  const tel = phoneLink();
  const wa = whatsappLink();
  const mail = emailLink();
  const map = mapSrc();
  const a = siteConfig.address;

  const cards = [
    { Icon: Phone, label: "Phone", content: tel ? <a href={tel} className="hover:text-accent-ink">{siteConfig.contact.phone}</a> : <Detail value={siteConfig.contact.phone} /> },
    {
      Icon: WhatsAppIcon,
      label: "WhatsApp",
      content: wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-accent-ink">Chat with us on WhatsApp</a> : <Detail value="[WhatsApp Number]" />,
    },
    { Icon: Mail, label: "Email", content: mail ? <a href={mail} className="break-all hover:text-accent-ink">{siteConfig.contact.email}</a> : <Detail value={siteConfig.contact.email} /> },
    {
      Icon: MapPin,
      label: "Address",
      content: (
        <span>
          <Detail value={a.street} />, <Detail value={a.locality} />, <Detail value={a.region} /> <Detail value={a.postalCode} />
        </span>
      ),
    },
  ];

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact us"
        title="Let's talk about your project."
        intro="Call, WhatsApp or send the form below. Photos and rough sizes help us respond with useful advice faster."
        image="/images/residential.jpg"
        imageAlt="Sample image: residential project"
      />

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <address className="grid gap-4 not-italic sm:grid-cols-2 lg:grid-cols-1">
              {cards.map(({ Icon, label, content }) => (
                <div key={label} className="flex gap-4 rounded-[6px] border border-line p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[4px] bg-charcoal text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="eyebrow text-steel">{label}</p>
                    <p className="mt-1 font-semibold">{content}</p>
                  </div>
                </div>
              ))}
            </address>

            <div className="mt-4 rounded-[6px] border border-line p-5">
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-accent-ink" aria-hidden="true" />
                <h2 className="eyebrow text-charcoal">Working hours</h2>
              </div>
              <dl className="mt-4 divide-y divide-line">
                {siteConfig.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 py-2.5 text-[0.9375rem]">
                    <dt className="text-steel">{h.days}</dt>
                    <dd className="text-right font-semibold"><Detail value={h.time} /></dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-4 overflow-hidden rounded-[6px] border border-line">
              {map ? (
                <iframe
                  title={`Map showing ${siteConfig.name} location`}
                  src={map}
                  className="aspect-[4/3] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="bg-blueprint flex aspect-[4/3] flex-col items-center justify-center gap-3 p-6 text-center text-steel-200">
                  <MapPin className="size-8 text-accent" aria-hidden="true" />
                  <p className="font-mono text-sm">[Google Map — appears automatically once the business address or NEXT_PUBLIC_MAP_EMBED_URL is set]</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[6px] border border-line bg-white p-6 shadow-[var(--shadow-lift)] sm:p-10">
            <p className="eyebrow text-accent-ink">Enquiry form</p>
            <h2 className="mt-2 mb-8 text-3xl font-[780]">Send us your requirement</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
