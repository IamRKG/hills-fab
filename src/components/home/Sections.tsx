import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock, Mail, MapPin, Phone, Quote } from "lucide-react";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { featuredProjects } from "@/data/projects";
import { faqs, processSteps, testimonials, whyChooseUs } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Faq } from "@/components/ui/Faq";
import { Detail } from "@/components/ui/Placeholder";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { emailLink, phoneLink, whatsappLink } from "@/lib/utils";

/* ── Featured services ─────────────────────────────────────────────────── */
export function ServicesOverview() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="services-h">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Three trades. One accountable team."
            intro="Metalwork and windows are usually two contractors and two schedules. We handle both — measured, made and installed to one standard."
          />
          <ButtonLink href="/services" variant="outline" className="self-start lg:self-auto">
            All services <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.id} className="reveal">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-charcoal">
                  <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span className="absolute top-0 left-0 bg-accent px-3 py-2 font-mono text-sm font-medium text-charcoal">{s.number}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 id={`svc-${s.id}`} className="text-2xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-steel">{s.summary}</p>
                  <ul className="mt-5 grid gap-2 text-[0.9375rem]">
                    {s.items.filter((i) => i.offered).slice(0, 4).map((i) => (
                      <li key={i.name} className="flex gap-2.5">
                        <Check className="mt-1 size-4 shrink-0 text-accent-ink" aria-hidden="true" />
                        {i.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services#${s.id}`}
                    className="mt-auto flex items-center gap-2 pt-6 font-semibold text-charcoal after:absolute after:inset-0 hover:text-accent-ink"
                    aria-describedby={`svc-${s.id}`}
                  >
                    Explore {s.shortTitle} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Why choose us ─────────────────────────────────────────────────────── */
export function WhyChooseUs() {
  return (
    <section className="bg-mist py-20 sm:py-28" aria-labelledby="why-h">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why choose us"
            title="Built right the first time."
            intro="The difference between metalwork that lasts and metalwork that rusts, sags or rattles is in the details. These are ours."
          />
          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[6px]">
            <Image src="/images/welding.jpg" alt="Sample image: close-up of a weld being made" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-2">
          {whyChooseUs.map((w, i) => (
            <li key={w.title} className="reveal bg-white p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="flex size-12 items-center justify-center rounded-[4px] bg-charcoal text-accent">
                  <Icon name={w.icon} className="size-6" />
                </span>
                <span className="font-mono text-xs text-steel">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold">{w.title}</h3>
              <p className="mt-2 text-steel">{w.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Featured projects ─────────────────────────────────────────────────── */
export function FeaturedProjects() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="projects-h">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Featured work" title="Recent projects" intro="A selection of gates, railings, structures and window installations. Tap any project to view it larger." />
          <ButtonLink href="/projects" variant="outline" className="self-start lg:self-auto">
            Explore our projects <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <div className="mt-6">
          <ProjectGallery projects={featuredProjects.slice(0, 6)} showFilters={false} />
        </div>
      </div>
    </section>
  );
}

/* ── Process ───────────────────────────────────────────────────────────── */
export function Process() {
  return (
    <section className="bg-blueprint py-20 text-white sm:py-28" aria-labelledby="process-h">
      <div className="container-x">
        <SectionHeading tone="dark" eyebrow="Our work process" title="From first call to final handover." intro="A clear, five-stage process so you always know what happens next." />
        <ol className="mt-14 grid gap-0 md:grid-cols-5">
          {processSteps.map((p, i) => (
            <li key={p.title} className="reveal relative border-l border-white/15 pb-10 pl-8 md:border-t md:border-l-0 md:pt-10 md:pr-6 md:pb-0 md:pl-0">
              <span aria-hidden="true" className="absolute top-0 -left-[7px] size-3.5 rotate-45 bg-accent md:-top-[7px] md:left-0" />
              <span className="font-mono text-sm text-accent">Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-steel-200">{p.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap gap-3">
          <ButtonLink href="/get-a-quote" size="lg">Start with a free quote</ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonials ──────────────────────────────────────────────────────── */
export function Testimonials() {
  const hasReal = testimonials.length > 0;
  return (
    <section className="py-20 sm:py-28" aria-labelledby="testimonials-h">
      <div className="container-x">
        <SectionHeading eyebrow="Customer feedback" title="What our customers say" align="center" />
        {hasReal ? (
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="reveal">
                <figure className="flex h-full flex-col rounded-[6px] border border-line bg-white p-7 shadow-[var(--shadow-card)]">
                  <Quote className="size-8 text-accent" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-lg">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <span className="block font-semibold">{t.name}</span>
                    <span className="text-sm text-steel">{t.context}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <ul className="mt-14 grid gap-6 md:grid-cols-3" aria-describedby="testimonial-note">
              {[1, 2, 3].map((n) => (
                <li key={n}>
                  <figure className="flex h-full flex-col rounded-[6px] border border-dashed border-steel-300 bg-mist p-7">
                    <Quote className="size-8 text-steel-300" aria-hidden="true" />
                    <blockquote className="mt-4 flex-1 font-mono text-sm text-steel">[Customer testimonial {n} — add a genuine review with the customer&apos;s permission]</blockquote>
                    <figcaption className="mt-6 border-t border-dashed border-steel-300 pt-4 font-mono text-sm text-steel">[Customer name] · [Project type]</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            <p id="testimonial-note" className="mt-6 text-center text-sm text-steel">
              Placeholder layout — add real reviews in <code className="font-mono">src/data/content.ts</code>.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

/* ── Service area ──────────────────────────────────────────────────────── */
export function ServiceArea() {
  return (
    <section className="bg-mist py-20 sm:py-28" aria-labelledby="area-h">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Service area"
            title="Fabrication and installation across the region."
            intro={`Based in ${siteConfig.primaryLocation}, our team serves homes, builders and businesses in the following areas. Not listed? Ask us — we regularly travel for larger projects.`}
          />
          <ButtonLink href="/contact" variant="dark" className="mt-8">Check your location</ButtonLink>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {siteConfig.serviceAreas.map((a) => (
            <li key={a} className="flex min-h-14 items-center gap-2.5 rounded-[4px] border border-line bg-white px-4 py-3 font-medium">
              <MapPin className="size-4 shrink-0 text-accent-ink" aria-hidden="true" />
              <Detail value={a} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────────────────────── */
export function FaqSection() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-h">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title="Frequently asked questions" intro="Can't find your answer? Call, WhatsApp or send us a message." />
          <ButtonLink href="/contact" variant="outline" className="mt-8">Ask a question</ButtonLink>
        </div>
        <Faq items={faqs} />
      </div>
    </section>
  );
}

/* ── Contact block (home page) ─────────────────────────────────────────── */
export function ContactSection() {
  const tel = phoneLink();
  const wa = whatsappLink();
  const mail = emailLink();
  return (
    <section id="enquiry" className="scroll-mt-20 bg-blueprint py-20 text-white sm:py-28" aria-labelledby="contact-h">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading tone="dark" eyebrow="Get in touch" title="Tell us about your project." intro="Share a few details and we'll call you back to discuss sizes, materials and a site visit." />
          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[4px] bg-white/10 text-accent"><Phone className="size-5" aria-hidden="true" /></span>
              <span><span className="block text-sm text-steel-300">Call us</span>{tel ? <a href={tel} className="text-lg font-semibold hover:text-accent">{siteConfig.contact.phone}</a> : <Detail value={siteConfig.contact.phone} />}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[4px] bg-white/10 text-accent"><WhatsAppIcon className="size-5" /></span>
              <span><span className="block text-sm text-steel-300">WhatsApp</span>{wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold hover:text-accent">Start a chat</a> : <Detail value="[WhatsApp Number]" />}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[4px] bg-white/10 text-accent"><Mail className="size-5" aria-hidden="true" /></span>
              <span><span className="block text-sm text-steel-300">Email</span>{mail ? <a href={mail} className="text-lg font-semibold break-all hover:text-accent">{siteConfig.contact.email}</a> : <Detail value={siteConfig.contact.email} />}</span>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[4px] bg-white/10 text-accent"><Clock className="size-5" aria-hidden="true" /></span>
              <span><span className="block text-sm text-steel-300">{siteConfig.hours[0].days}</span><Detail value={siteConfig.hours[0].time} /></span>
            </li>
          </ul>
        </div>
        <div className="rounded-[6px] bg-white p-6 text-charcoal shadow-2xl sm:p-10">
          <h3 className="text-2xl font-bold">Request a call back</h3>
          <p className="mt-1 mb-8 text-steel">For detailed requirements, use our <Link href="/get-a-quote" className="font-semibold text-accent-ink underline underline-offset-4">step-by-step quote form</Link>.</p>
          <ContactForm compact />
        </div>
      </div>
    </section>
  );
}

