import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  crumb: string;
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, intro, image, imageAlt, crumb, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-charcoal text-white">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover opacity-35" />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,#222831_25%,rgb(34_40_49/0.55)_70%,rgb(34_40_49/0.2))]" />
      <div className="container-x relative py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-steel-200">
            <li><Link href="/" className="hover:text-accent">Home</Link></li>
            <li aria-hidden="true"><ChevronRight className="size-3.5" /></li>
            <li aria-current="page" className="text-white">{crumb}</li>
          </ol>
        </nav>
        <p className="eyebrow flex items-center gap-3 text-accent">
          <span aria-hidden="true" className="inline-block h-[2px] w-8 bg-accent" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-[780] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-steel-200">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
      <div className="rule-hazard relative" aria-hidden="true" />
    </section>
  );
}
