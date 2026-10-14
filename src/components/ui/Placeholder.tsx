import { isPlaceholder } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Renders a business detail. While the value is still a "[placeholder]",
 * it is visibly marked so it can't be mistaken for real information.
 */
export function Detail({ value, className }: { value: string; className?: string }) {
  if (isPlaceholder(value)) {
    return (
      <span
        className={cn("rounded-[3px] border border-dashed border-accent/70 bg-accent/10 px-1.5 py-0.5 font-mono text-[0.85em]", className)}
        title="Placeholder — set this value in src/config/site.ts or your environment variables"
      >
        {value}
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}
