import { Plus } from "lucide-react";

/** FAQ accordion built on <details>/<summary> — works without JavaScript. */
export function Faq({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-lg font-semibold text-charcoal hover:text-accent-ink">
            {f.q}
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45 group-open:border-accent group-open:bg-accent">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-steel">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
