"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle2, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { phoneLink, whatsappLink } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/layout/WhatsAppIcon";
import type { SubmitState } from "./useEnquirySubmit";

export function DirectContact() {
  const tel = phoneLink();
  const wa = whatsappLink();
  if (!tel && !wa) {
    return (
      <p className="mt-3 text-sm">
        <Link href="/contact" className="font-semibold underline underline-offset-4">See all contact details</Link>
      </p>
    );
  }
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {tel && (
        <a href={tel} className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-charcoal/20 bg-white px-4 font-semibold hover:border-charcoal">
          <Phone className="size-4" aria-hidden="true" /> Call {siteConfig.contact.phone}
        </a>
      )}
      {wa && (
        <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-[4px] border border-charcoal/20 bg-white px-4 font-semibold hover:border-charcoal">
          <WhatsAppIcon className="size-4" /> WhatsApp us
        </a>
      )}
    </div>
  );
}

export function ErrorBanner({ state }: { state: SubmitState }) {
  if (state.status !== "error") return null;
  return (
    <div role="alert" className="flex gap-3 rounded-[4px] border border-danger/30 bg-[#fdf1f0] p-4 text-[0.9375rem]">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden="true" />
      <div>
        <p className="font-semibold text-charcoal">{state.notConfigured ? "Enquiry form not connected yet" : "Your enquiry wasn't sent"}</p>
        <p className="mt-1 text-charcoal/80">{state.message}</p>
        <DirectContact />
      </div>
    </div>
  );
}

export function SuccessPanel({ reference, onReset, title = "Thank you — your enquiry has been sent." }: { reference?: string; onReset: () => void; title?: string }) {
  return (
    <div role="status" aria-live="polite" className="rounded-[6px] border border-success/30 bg-[#eef8f2] p-6 sm:p-8">
      <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
      <h3 className="mt-4 text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-charcoal/80">
        We&apos;ve received your details and will get back to you shortly{siteConfig.hours[0] ? " during working hours" : ""}.
        {reference && <> Your reference number is <strong className="font-mono">{reference}</strong>.</>}
      </p>
      <button type="button" onClick={onReset} className="mt-6 font-semibold text-accent-ink underline underline-offset-4 hover:text-charcoal">
        Send another enquiry
      </button>
    </div>
  );
}
