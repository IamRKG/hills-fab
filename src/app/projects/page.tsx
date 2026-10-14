import { projects } from "@/data/projects";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ButtonLink } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects — Gates, Railings, Fabrication & uPVC Windows",
  description: "Browse our portfolio of MS and stainless steel gates, railings, structural fabrication, welding work, and uPVC windows and doors.",
  path: "/projects",
});

export default function ProjectsPage() {
  const hasSamples = projects.some((p) => p.sample);
  return (
    <>
      <PageHero
        crumb="Projects"
        eyebrow="Portfolio"
        title="Our projects."
        intro="Gates, railings, structures and window installations across residential and commercial sites. Filter by category and tap any project to view it larger."
        image="/images/ms-gate.jpg"
        imageAlt="Sample image: MS entrance gate"
      />
      <section className="py-16 sm:py-24" aria-label="Project gallery">
        <div className="container-x">
          {hasSamples && (
            <p className="mb-8 rounded-[4px] border border-dashed border-accent/60 bg-accent/5 px-4 py-3 text-sm text-charcoal">
              Items marked <strong>Sample</strong> use illustrative placeholder images. Replace them with photos of completed work in <code className="font-mono">src/data/projects.ts</code>.
            </p>
          )}
          <ProjectGallery projects={projects} />
        </div>
      </section>
      <section className="border-t border-line bg-mist py-16">
        <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-[780]">Have a similar project in mind?</h2>
            <p className="mt-2 text-steel">Send a photo of the space and your rough sizes — we&apos;ll take it from there.</p>
          </div>
          <ButtonLink href="/get-a-quote" size="lg">Get a Free Quote</ButtonLink>
        </div>
      </section>
    </>
  );
}
