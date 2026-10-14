import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-blueprint text-white">
      <div className="container-x flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="eyebrow text-accent">Error 404</p>
        <h1 className="mt-4 text-4xl font-[780] sm:text-6xl">This page isn&apos;t on the drawing.</h1>
        <p className="mt-5 max-w-xl text-lg text-steel-200">The page you&apos;re looking for may have moved. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/services" variant="outline-light">Our services</ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">Contact us</ButtonLink>
        </div>
      </div>
    </section>
  );
}
