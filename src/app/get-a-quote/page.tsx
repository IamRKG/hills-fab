import { Clock, FileCheck2, Ruler } from "lucide-react";
import { QuoteWizard } from "@/components/forms/QuoteWizard";
import { DirectContact } from "@/components/forms/FormFeedback";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get a Free Quote",
  description: "Request a free quotation for metal fabrication, welding, MS gates, stainless steel work, railings, or uPVC windows and doors in five quick steps.",
  path: "/get-a-quote",
});

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function QuotePage({ searchParams }: Props) {
  const { service } = await searchParams;
  const initialService = typeof service === "string" ? service : "";
  return (
    <>
      <section className="bg-blueprint text-white">
        <div className="container-x py-12 sm:py-16">
          <p className="eyebrow text-accent">Free quotation</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-[780] sm:text-5xl">Get a free quote in five quick steps.</h1>
          <p className="mt-4 max-w-2xl text-lg text-steel-200">Tell us what you need, add a photo if you have one, and we&apos;ll get back to you with next steps.</p>
        </div>
        <div className="rule-hazard" aria-hidden="true" />
      </section>

      <section className="bg-mist py-10 sm:py-16">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="rounded-[6px] border border-line bg-white p-5 shadow-[var(--shadow-card)] sm:p-10">
            <QuoteWizard initialService={initialService} />
          </div>
          <aside className="space-y-4" aria-label="About quotations">
            {[
              { Icon: Clock, title: "Takes about 2 minutes", text: "Only your name, phone, service, sizes and location are required." },
              { Icon: Ruler, title: "Rough sizes are fine", text: "We confirm exact measurements during the site visit." },
              { Icon: FileCheck2, title: "Itemised quotation", text: "You receive a written quote with materials, sizes and finish specified." },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="rounded-[6px] border border-line bg-white p-5">
                <Icon className="size-5 text-accent-ink" aria-hidden="true" />
                <h2 className="mt-3 font-bold">{title}</h2>
                <p className="mt-1 text-sm text-steel">{text}</p>
              </div>
            ))}
            <div className="rounded-[6px] bg-charcoal p-5 text-white">
              <h2 className="font-bold">Prefer to talk?</h2>
              <p className="mt-1 text-sm text-steel-200">Call or WhatsApp us directly.</p>
              <div className="text-charcoal [&_p_a]:text-white"><DirectContact /></div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
