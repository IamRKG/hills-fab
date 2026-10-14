import Image from "next/image";
import { Expand } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type Props = { project: Project; onOpen?: () => void; sizes?: string; className?: string; priority?: boolean };

export function ProjectCard({ project, onOpen, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw", className, priority }: Props) {
  const media = (
    <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
      <Image
        src={project.image}
        alt={project.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {project.sample && (
        <span className="absolute top-3 left-3 rounded-[3px] bg-white/90 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-charcoal">
          Sample
        </span>
      )}
      {onOpen && (
        <span aria-hidden="true" className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-[4px] bg-accent text-charcoal opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand className="size-4" />
        </span>
      )}
    </div>
  );

  const body = (
    <div className="flex flex-1 flex-col p-5">
      <p className="eyebrow text-accent-ink">{project.categories[0]}</p>
      <h3 className="mt-2 text-lg font-bold leading-snug text-charcoal">{project.title}</h3>
      <p className="mt-2 text-[0.9375rem] text-steel">{project.description}</p>
    </div>
  );

  const cls = cn(
    "group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white text-left shadow-[var(--shadow-card)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
    className,
  );

  if (onOpen) {
    return (
      <button type="button" onClick={onOpen} className={cls} aria-label={`View larger image: ${project.title}`} aria-haspopup="dialog">
        {media}
        {body}
      </button>
    );
  }
  return <article className={cls}>{media}{body}</article>;
}
