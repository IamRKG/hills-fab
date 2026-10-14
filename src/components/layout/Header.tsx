"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navLinks, siteConfig, isPlaceholder } from "@/config/site";
import { cn, phoneLink } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const tel = phoneLink();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change (state adjustment during render, per React docs)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close on Escape and lock page scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-shadow",
        scrolled ? "border-line shadow-[0_6px_24px_-16px_rgb(34_40_49/0.4)]" : "border-transparent",
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "relative px-3.5 py-2 text-[0.9375rem] font-medium text-charcoal/80 transition-colors hover:text-charcoal",
                    "after:absolute after:inset-x-3.5 after:-bottom-[1px] after:h-[2px] after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100",
                    isActive(l.href) && "text-charcoal after:scale-x-100",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {tel && (
            <a href={tel} className="flex items-center gap-2 text-sm font-semibold text-charcoal hover:text-accent-ink">
              <Phone className="size-4" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
          )}
          {!tel && isPlaceholder(siteConfig.contact.phone) && (
            <Link href="/contact" className="text-sm font-semibold text-charcoal hover:text-accent-ink">Contact us</Link>
          )}
          <ButtonLink href="/get-a-quote">Get a Free Quote</ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex size-12 items-center justify-center rounded-[4px] text-charcoal hover:bg-mist lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>
    </header>

      {/* Mobile menu — rendered outside <header>: its backdrop-filter would otherwise
          become the containing block for this fixed panel and clip it. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-white lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x py-6">
          <ul className="divide-y divide-line border-y border-line">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between py-4 font-display text-2xl font-bold",
                    isActive(l.href) ? "text-accent-ink" : "text-charcoal",
                  )}
                >
                  {l.label}
                  <span aria-hidden="true" className="font-mono text-xs text-steel">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <ButtonLink href="/get-a-quote" size="lg">Get a Free Quote</ButtonLink>
            {tel && (
              <a href={tel} className="flex min-h-12 items-center justify-center gap-2 rounded-[4px] border border-charcoal/25 font-semibold">
                <Phone className="size-4" aria-hidden="true" /> Call {siteConfig.contact.phone}
              </a>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
