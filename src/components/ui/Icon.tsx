import { FileText, Flame, PanelsTopLeft, Ruler, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";

/** Maps icon names used in data files to Lucide components (keeps data serialisable). */
const map: Record<string, LucideIcon> = { FileText, Flame, PanelsTopLeft, Ruler, ShieldCheck, Wrench };

export function Icon({ name, className }: { name: string; className?: string }) {
  const C = map[name] ?? Wrench;
  return <C className={className} aria-hidden="true" />;
}
