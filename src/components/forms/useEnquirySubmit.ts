"use client";

import { useState } from "react";
import type { FieldErrors } from "@/lib/enquiry";

export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; reference?: string }
  | { status: "error"; message: string; notConfigured?: boolean };

export function useEnquirySubmit() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function submit(form: HTMLFormElement): Promise<{ ok: boolean; fieldErrors?: FieldErrors }> {
    setState({ status: "submitting" });
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean; reference?: string; error?: string; code?: string; fieldErrors?: FieldErrors;
      };
      if (res.ok && data.ok) {
        setState({ status: "success", reference: data.reference });
        return { ok: true };
      }
      setState({
        status: "error",
        message: data.error ?? "Something went wrong. Please try again.",
        notConfigured: data.code === "NOT_CONFIGURED",
      });
      return { ok: false, fieldErrors: data.fieldErrors };
    } catch {
      setState({ status: "error", message: "We couldn't reach the server. Please check your connection and try again." });
      return { ok: false };
    }
  }

  return { state, submit, reset: () => setState({ status: "idle" }) };
}
