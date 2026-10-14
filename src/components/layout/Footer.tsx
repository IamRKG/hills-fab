import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { Detail } from "@/components/ui/Placeholder";
import { emailLink, phoneLink, whatsappLink } from "@/lib/utils";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  const tel = phoneLink();
  const mail = emailLink();
  const wa = whatsappLink();
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="bg-blueprint text-steel-200">
      <div className="rule-hazard" aria-hidden="true" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-[0.9375rem]">{siteConfig.description}</p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize text-white hover:text-accent">{name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-white">Company</h2>
          <ul className="mt-5 space-y-3 text-[0.9375rem]">
            {navLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-accent">{l.label}</Link></li>
            ))}
            <li><Link href="/get-a-quote" className="hover:text-accent">Get a Quote</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-white">Services</h2>
          <ul className="mt-5 space-y-3 text-[0.9375rem]">
            {services.map((s) => (
              <li key={s.id}><Link href={`/services#${s.id}`} className="hover:text-accent">{s.title}</Link></li>
            ))}
            <li><Link href="/projects" className="hover:text-accent">Project gallery</Link></li>
          </ul>
        </div>

        <address className="not-italic">
          <h2 className="eyebrow text-white">Contact</h2>
          <ul className="mt-5 space-y-4 text-[0.9375rem]">
            <li className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              {tel ? <a href={tel} className="hover:text-accent">{siteConfig.contact.phone}</a> : <Detail value={siteConfig.contact.phone} />}
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-1 size-4 shrink-0 text-accent" />
              {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-accent">WhatsApp us</a> : <Detail value="[WhatsApp Number]" />}
            </li>
            <li className="flex gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              {mail ? <a href={mail} className="break-all hover:text-accent">{siteConfig.contact.email}</a> : <Detail value={siteConfig.contact.email} />}
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>
                <Detail value={siteConfig.address.street} />, <Detail value={siteConfig.address.locality} />
              </span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{siteConfig.hours[0].days}: <Detail value={siteConfig.hours[0].time} /></span>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-steel-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} <Detail value={siteConfig.name} />. All rights reserved.</p>
          <p className="font-mono text-xs uppercase tracking-[0.14em]">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
