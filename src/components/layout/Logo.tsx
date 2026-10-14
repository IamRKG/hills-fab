import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Logo lock-up. Replace the <svg> with your real logo (or an <Image>) when available. */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const light = tone === "light";
  return (
    <Link href="/" className={cn("group flex items-center gap-3", className)} aria-label={`${siteConfig.name} — home`}>
      <svg viewBox="0 0 40 40" className="size-10 shrink-0" aria-hidden="true">
        <rect width="40" height="40" rx="4" fill={light ? "#F28C28" : "#222831"} />
        {/* I-beam profile + window mullion */}
        <path d="M10 10h20v4h-7.5v12H30v4H10v-4h7.5V14H10z" fill={light ? "#222831" : "#F28C28"} />
      </svg>
      <span className="leading-none">
        <span
          className={cn("block font-display text-[1.05rem] font-[800] uppercase tracking-[0.02em]", light ? "text-white" : "text-charcoal")}
          style={{ fontVariationSettings: '"wdth" 118' }}
        >
          {siteConfig.shortName}
        </span>
        <span className={cn("mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.18em]", light ? "text-steel-300" : "text-steel")}>
          Fabrication &amp; Windows
        </span>
      </span>
    </Link>
  );
}
