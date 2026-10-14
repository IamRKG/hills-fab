"use client";

import { useRef, useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { serviceOptions } from "@/data/services";
import { readFields, validateFields, validateFiles, type FieldErrors } from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { SelectField, TextArea, TextField } from "./Fields";
import { FileDrop } from "./FileDrop";
import { SpamFields } from "./SpamFields";
import { Turnstile } from "./Turnstile";
import { ErrorBanner, SuccessPanel } from "./FormFeedback";
import { useEnquirySubmit } from "./useEnquirySubmit";
import { useHydrated } from "./useHydrated";

export function ContactForm({ compact = false, defaultService = "" }: { compact?: boolean; defaultService?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const { state, submit, reset } = useEnquirySubmit();
  const hydrated = useHydrated();

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`#f-${first}`)?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const errs = validateFields(readFields(fd));
    const fileErr = validateFiles(fd.getAll("attachments").filter((v): v is File => v instanceof File));
    if (fileErr) errs.attachments = fileErr;
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);

    const result = await submit(form);
    if (result.ok) {
      form.reset();
      setErrors({});
    } else if (result.fieldErrors) {
      setErrors(result.fieldErrors);
      focusFirstError(result.fieldErrors);
    }
  }

  const clear = (name: keyof FieldErrors) => errors[name] && setErrors((p) => ({ ...p, [name]: undefined }));

  if (state.status === "success") {
    return <SuccessPanel reference={state.reference} onReset={reset} />;
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      method="post"
      encType="multipart/form-data"
      noValidate
      className="relative grid gap-5"
      aria-describedby="contact-form-note"
      onChange={(e) => clear((e.target as unknown as HTMLInputElement).name as keyof FieldErrors)}
    >
      <input type="hidden" name="kind" value="contact" />
      <SpamFields />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="name" label="Your name" autoComplete="name" error={errors.name} />
        <TextField name="phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} />
        <TextField name="email" label="Email address" type="email" autoComplete="email" optional error={errors.email} />
        <SelectField name="service" label="Service required" options={serviceOptions} defaultValue={defaultService} error={errors.service} />
        <TextField name="location" label="Project location" placeholder="Area / locality" autoComplete="address-level2" error={errors.location} />
        <TextField name="budget" label="Approximate budget" optional placeholder="e.g. 50,000 – 75,000" error={errors.budget} />
      </div>

      <TextArea
        name="description"
        label="Project description"
        placeholder="What would you like made, repaired or installed? Sizes, material and finish if known."
        error={errors.description}
      />

      {!compact && (
        <FileDrop
          label="Photos or drawings"
          error={errors.attachments}
          onErrorChange={(m) => setErrors((p) => ({ ...p, attachments: m }))}
        />
      )}

      <Turnstile />
      <ErrorBanner state={state} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="text-sm text-steel">
          <span aria-hidden="true" className="text-accent-ink">*</span> Required. We only use your details to respond to this enquiry.
        </p>
        <Button type="submit" size="lg" disabled={!hydrated || state.status === "submitting"} className="sm:min-w-52">
          {state.status === "submitting" ? (
            <><Loader2 className="size-5 animate-spin" aria-hidden="true" /> Sending…</>
          ) : (
            <><Send className="size-4" aria-hidden="true" /> Send enquiry</>
          )}
        </Button>
      </div>
    </form>
  );
}
