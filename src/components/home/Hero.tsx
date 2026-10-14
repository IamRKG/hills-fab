import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import { services } from "@/data/services";
import { whatsappLink } from "@/lib/utils";

export function Hero() {
  const wa = whatsappLink();
  return (
    <section className="bg-blueprint relative overflow-hidden text-white">
      {/* Accent beam */}
      <div aria-hidden="true" className="absolute top-0 left-0 h-full w-1.5 bg-accent" />

      <div className="container-x relative grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:pt-24 lg:pb-24">
        <div className="animate-rise">
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span aria-hidden="true" className="inline-block h-[2px] w-8 bg-accent" />
            Fabrication · Welding · uPVC Windows &amp; Doors
          </p>
          <h1 className="mt-6 text-[2.35rem] leading-[1.04] font-[800] sm:text-[3.4rem] xl:text-[4rem]" style={{ fontVariationSettings: '"wdth" 100' }}>
            Precision Fabrication.
            <br />
            Stronger Structures.
            <br />
            <span className="text-accent">Smarter Window Solutions.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg text-steel-200 sm:text-xl">
            From custom metal fabrication and expert welding to modern uPVC windows and doors, we deliver durable, functional,
            and professionally finished solutions tailored to your requirements.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/get-a-quote" size="lg">
              Get a Free Quote <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/projects" size="lg" variant="outline-light">Explore Our Projects</ButtonLink>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-[4px] px-4 py-4 font-semibold text-white underline-offset-4 hover:underline"
              >
                <WhatsAppIcon className="size-5 text-[#3ad17a]" /> WhatsApp us
              </a>
            )}
          </div>
        </div>

        {/* Image composition */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[6px] ring-1 ring-white/10">
            <Image
              src="/images/hero-workshop.jpg"
              alt="Sample image: fabrication workshop with welding in progress"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-4 hidden w-[46%] overflow-hidden rounded-[6px] border-4 border-charcoal shadow-2xl sm:block lg:-left-10">
            <div className="relative aspect-[4/3]">
              <Image src="/images/upvc-sliding-window.jpg" alt="Sample image: uPVC sliding window" fill sizes="22vw" className="object-cover" />
            </div>
          </div>
          <div className="absolute -top-5 -right-3 hidden rounded-[4px] bg-accent px-4 py-3 text-charcoal shadow-xl sm:block">
            <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em]">Residential · Commercial · Industrial</p>
          </div>
        </div>
      </div>

      {/* Service strip */}
      <div className="relative border-t border-white/10 bg-charcoal-900/60">
        <ul className="container-x grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {services.map((s) => (
            <li key={s.id}>
              <Link href={`/services#${s.id}`} className="group flex items-center gap-4 py-5 sm:px-6">
                <span className="font-mono text-sm text-accent">{s.number}</span>
                <span className="font-display text-lg font-bold">{s.title}</span>
                <ArrowRight className="ml-auto size-4 text-steel-300 transition-transform group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
