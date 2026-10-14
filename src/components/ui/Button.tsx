import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[4px] font-semibold tracking-[0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 min-h-[48px]";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-charcoal hover:bg-accent-600 shadow-[inset_0_-2px_0_rgb(0_0_0/0.15)]",
  dark: "bg-charcoal text-white hover:bg-charcoal-800",
  outline: "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-white",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white hover:text-charcoal",
  ghost: "text-charcoal hover:text-accent-ink",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.9375rem]",
  lg: "px-7 py-4 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type LinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", size = "md", className, children, ...props }: LinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type BtnProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: BtnProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
