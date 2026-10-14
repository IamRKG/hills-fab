import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services — Metal Fabrication, Welding & uPVC Windows",
  description:
    "Custom metal fabrication, MS and stainless steel gates, railings, grills, structural steel, MIG/TIG/arc welding, and uPVC sliding and casement windows and doors.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Services"
        eyebrow="Our services"
        title="Fabrication, welding and window solutions."
        intro="Everything from a single window grill to structural steel and full uPVC window packages — measured, made and installed by one team."
        image="/images/structural.jpg"
        imageAlt="Sample image: structural steel fabrication"
      >
        <ButtonLink href="/get-a-quote" size="lg">Get a Free Quote</ButtonLink>
      </PageHero>

      {/* In-page navigation */}
      <nav aria-label="Services on this page" className="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur">
        <ul className="container-x flex gap-1 overflow-x-auto py-2">
          {services.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="flex min-h-11 items-center gap-2 whitespace-nowrap rounded-[4px] px-3 text-sm font-semibold hover:bg-mist">
                <span className="font-mono text-xs text-accent-ink">{s.number}</span> {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {services.map((s, idx) => {
        const offered = s.items.filter((i) => i.offered);
        const flip = idx % 2 === 1;
        return (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={cn("scroll-mt-32 py-20 sm:py-28", flip && "bg-mist")}>
            <div className="container-x">
              <div className={cn("grid items-start gap-12 lg:grid-cols-2 lg:gap-16", flip && "lg:[&>*:first-child]:order-2")}>
                <div className="lg:sticky lg:top-40">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[6px] bg-charcoal">
                    <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                    <span className="absolute top-0 left-0 bg-accent px-4 py-2.5 font-mono text-base font-medium text-charcoal">{s.number}</span>
                  </div>
                </div>

                <div>
                  <p className="eyebrow text-accent-ink">Service {s.number}</p>
                  <h2 id={`${s.id}-h`} className="mt-3 text-3xl font-[780] sm:text-4xl">{s.title}</h2>
                  <p className="mt-5 text-lg text-steel">{s.description}</p>

                  <h3 className="eyebrow mt-10 text-charcoal">What we offer</h3>
                  <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {offered.map((i) => (
                      <li key={i.name} className="flex gap-2.5 border-b border-line pb-3">
                        <Check className="mt-1 size-4 shrink-0 text-accent-ink" aria-hidden="true" /> {i.name}
                      </li>
                    ))}
                  </ul>

                  <h3 className="eyebrow mt-10 text-charcoal">Key benefits</h3>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    {s.benefits.map((b) => (
                      <div key={b.title} className="rounded-[6px] border border-line bg-white p-5">
                        <dt className="font-bold">{b.title}</dt>
                        <dd className="mt-1.5 text-[0.9375rem] text-steel">{b.text}</dd>
                      </div>
                    ))}
                  </dl>

                  <h3 className="eyebrow mt-10 text-charcoal">Typical applications</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.applications.map((a) => (
                      <li key={a} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium">{a}</li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-wrap gap-3">
                    <ButtonLink href={`/get-a-quote?service=${s.quoteService}`} size="lg">
                      Get a quote: {s.shortTitle} <ArrowRight className="size-4" aria-hidden="true" />
                    </ButtonLink>
                    <ButtonLink href="/projects" size="lg" variant="outline">See projects</ButtonLink>
                  </div>
                  {s.id === "upvc-windows-doors" && (
                    <p className="mt-6 text-sm text-steel">
                      Performance depends on the profile system, glazing and installation selected. We&apos;ll share the specifications for the products quoted.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-blueprint py-16 text-white">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-[780]">Not sure what you need?</h2>
            <p className="mt-2 text-steel-200">Send us photos of the space — we&apos;ll recommend the right solution.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/get-a-quote" size="lg">Get a Free Quote</ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="outline-light">Contact us</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
