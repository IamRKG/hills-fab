"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/data/projects";

type Props = { items: Project[]; index: number | null; onClose: () => void; onIndex: (i: number) => void };

/** Accessible image lightbox using the native <dialog> element (focus trap + Esc built in). */
export function Lightbox({ items, index, onClose, onIndex }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null && items[index];

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  if (index === null || !items[index]) return <dialog ref={ref} onClose={onClose} className="hidden" />;
  const p = items[index];
  const prev = () => onIndex((index - 1 + items.length) % items.length);
  const next = () => onIndex((index + 1) % items.length);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      onClick={(e) => { if (e.target === e.currentTarget) ref.current?.close(); }}
      aria-labelledby="lightbox-title"
      className="m-auto h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-charcoal-900/95 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col p-3 sm:p-6" onClick={(e) => { if (e.target === e.currentTarget) ref.current?.close(); }}>
        <div className="flex items-center justify-between gap-4 text-white">
          <p className="font-mono text-xs tracking-[0.14em] text-steel-200">{index + 1} / {items.length}</p>
          <button type="button" onClick={() => ref.current?.close()} className="inline-flex size-12 items-center justify-center rounded-[4px] hover:bg-white/10" aria-label="Close image viewer" autoFocus>
            <X className="size-6" />
          </button>
        </div>
        <div className="relative min-h-0 flex-1">
          <Image src={p.image} alt={p.alt} fill sizes="100vw" className="object-contain" />
          {items.length > 1 && (
            <>
              <button type="button" onClick={prev} aria-label="Previous image" className="absolute top-1/2 left-0 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-[4px] bg-charcoal/70 text-white hover:bg-accent hover:text-charcoal">
                <ChevronLeft className="size-6" />
              </button>
              <button type="button" onClick={next} aria-label="Next image" className="absolute top-1/2 right-0 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-[4px] bg-charcoal/70 text-white hover:bg-accent hover:text-charcoal">
                <ChevronRight className="size-6" />
              </button>
            </>
          )}
        </div>
        <div className="mx-auto w-full max-w-3xl pt-4 text-center text-white">
          <p className="eyebrow text-accent">{p.categories.join(" · ")}</p>
          <h2 id="lightbox-title" className="mt-2 text-xl font-bold sm:text-2xl">{p.title}</h2>
          <p className="mt-1 text-steel-200">{p.description}</p>
        </div>
      </div>
    </dialog>
  );
}
