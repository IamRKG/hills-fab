"use client";

import { useMemo, useState } from "react";
import { projectCategories, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";
import { ProjectCard } from "./ProjectCard";

type Filter = "All" | ProjectCategory;

export function ProjectGallery({ projects, showFilters = true }: { projects: Project[]; showFilters?: boolean }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    projects.forEach((p) => p.categories.forEach((cat) => c.set(cat, (c.get(cat) ?? 0) + 1)));
    return c;
  }, [projects]);

  const visible = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  const filters: Filter[] = ["All", ...projectCategories.filter((c) => counts.get(c))];

  return (
    <div>
      {showFilters && (
        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" role="group" aria-label="Filter projects by category">
          <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            {filters.map((f) => {
              const active = filter === f;
              return (
                <li key={f}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-semibold transition-colors",
                      active ? "border-charcoal bg-charcoal text-white" : "border-line bg-white text-charcoal hover:border-charcoal",
                    )}
                  >
                    {f}
                    <span className={cn("font-mono text-xs", active ? "text-accent" : "text-steel")}>
                      {f === "All" ? projects.length : counts.get(f)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <p className="sr-only" aria-live="polite">{visible.length} projects shown</p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <li key={p.id} className="reveal">
            <ProjectCard project={p} onOpen={() => setOpen(i)} />
          </li>
        ))}
      </ul>

      <Lightbox items={visible} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </div>
  );
}
