import Image from "next/image";
import { Compass, Target } from "lucide-react";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/data/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { Detail } from "@/components/ui/Placeholder";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: "Learn about our fabrication, welding and uPVC window team — our workmanship standards, capabilities and commitment to customers.",
  path: "/about",
});

export default function AboutPage() {
  const intro = aboutContent.intro.replace("[Company Name]", siteConfig.name);
  const facts = [
    { label: "Established", value: siteConfig.facts.yearEstablished || "[Year established]" },
    { label: "Our team", value: siteConfig.facts.teamSize || "[Team size]" },
    { label: "Workshop", value: siteConfig.facts.workshopSize || "[Workshop size / location]" },
  ];

  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="About us"
        title="Craftsmanship in steel. Precision in every window."
        intro="A fabrication, welding and window installation team focused on work that fits properly, finishes cleanly and lasts."
        image="/images/hero-workshop.jpg"
        imageAlt="Sample image: fabrication workshop"
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Who we are" title="Fabricators, welders and installers — under one roof." />
            <p className="mt-6 text-lg text-steel">{intro}</p>
            <dl className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[6px] border border-line bg-line sm:grid-cols-3">
              {facts.map((f) => (
                <div key={f.label} className="bg-white p-5">
                  <dt className="eyebrow text-steel">{f.label}</dt>
                  <dd className="mt-2 font-display text-lg font-bold"><Detail value={f.value} /></dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-[6px]">
              <Image src="/images/team.jpg" alt="Sample image: our fabrication team (replace with a real team photo)" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[6px]">
              <Image src="/images/welding.jpg" alt="Sample image: welding in the workshop" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[6px]">
              <Image src="/images/upvc-casement-window.jpg" alt="Sample image: uPVC window installation" fill sizes="25vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blueprint py-20 text-white sm:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          {[
            { Icon: Target, title: "Our mission", text: aboutContent.mission },
            { Icon: Compass, title: "Our vision", text: aboutContent.vision },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="rounded-[6px] border border-white/15 bg-white/[0.03] p-8 sm:p-10">
              <Icon className="size-8 text-accent" aria-hidden="true" />
              <h2 className="mt-6 text-3xl font-[780]">{title}</h2>
              <p className="mt-4 text-lg text-steel-200">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How we work" title="Standards we hold ourselves to." />
          <ol className="mt-14 grid gap-6 md:grid-cols-2">
            {aboutContent.pillars.map((p, i) => (
              <li key={p.title} className="reveal flex gap-6 rounded-[6px] border border-line bg-white p-7 shadow-[var(--shadow-card)]">
                <span className="font-display text-4xl font-[800] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-steel">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-16">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-[780]">Let&apos;s build something solid.</h2>
            <p className="mt-2 text-steel">Talk to us about your gate, railing, structure or windows.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/get-a-quote" size="lg">Get a Free Quote</ButtonLink>
            <ButtonLink href="/projects" size="lg" variant="outline">View projects</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
