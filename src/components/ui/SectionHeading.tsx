import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "light", as: Tag = "h2", className }: Props) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center", dark ? "text-accent" : "text-accent-ink")}>
        <span aria-hidden="true" className="inline-block h-[2px] w-8 bg-accent" />
        {eyebrow}
      </p>
      <Tag className={cn("mt-4 text-3xl font-[750] sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-charcoal")}>{title}</Tag>
      {intro && <p className={cn("mt-5 text-lg", dark ? "text-steel-200" : "text-steel")}>{intro}</p>}
    </div>
  );
}
