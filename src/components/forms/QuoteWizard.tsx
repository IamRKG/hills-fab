"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft, ArrowRight, Check, DoorOpen, Fence, Flame, HelpCircle, Layers, Loader2, PanelsTopLeft, Send, Shield, Wrench,
} from "lucide-react";
import { serviceOptions, serviceLabel } from "@/data/services";
import { readFields, validateFields, validateFiles, type EnquiryFields, type FieldErrors } from "@/lib/enquiry";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { SelectField, TextArea, TextField } from "./Fields";
import { FileDrop } from "./FileDrop";
import { SpamFields } from "./SpamFields";
import { Turnstile } from "./Turnstile";
import { ErrorBanner, SuccessPanel } from "./FormFeedback";
import { useEnquirySubmit } from "./useEnquirySubmit";
import { useHydrated } from "./useHydrated";

const STEPS = [
  { title: "Service", heading: "What do you need?" },
  { title: "Requirements", heading: "Tell us about the project" },
  { title: "Photos", heading: "Add photos or drawings" },
  { title: "Contact", heading: "How can we reach you?" },
  { title: "Review", heading: "Review and submit" },
] as const;

const STEP_FIELDS: (keyof EnquiryFields)[][] = [
  ["service"],
  ["dimensions", "material", "quantity", "installation", "location", "budget", "description"],
  [],
  ["name", "phone", "email", "contactPreference"],
  [],
];

const ICONS: Record<string, typeof Wrench> = {
  "metal-fabrication": Layers,
  welding: Flame,
  "ms-gate": Fence,
  "stainless-steel": Shield,
  railings: Fence,
  "upvc-windows": PanelsTopLeft,
  "upvc-doors": DoorOpen,
  other: HelpCircle,
};

const materialOptions = [
  { value: "Mild steel (MS)", label: "Mild steel (MS)" },
  { value: "Stainless steel", label: "Stainless steel" },
  { value: "uPVC", label: "uPVC" },
  { value: "Combination", label: "Combination of materials" },
  { value: "Not sure — please advise", label: "Not sure — please advise" },
];
const installOptions = [
  { value: "Supply and installation", label: "Supply and installation" },
  { value: "Supply only", label: "Supply only" },
  { value: "Installation only", label: "Installation only (materials available)" },
  { value: "Repair / modification", label: "Repair / modification of existing work" },
  { value: "Not sure", label: "Not sure yet" },
];
const contactOptions = [
  { value: "Phone call", label: "Phone call" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Email", label: "Email" },
];

export function QuoteWizard({ initialService = "" }: { initialService?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [service, setService] = useState(
    serviceOptions.some((o) => o.value === initialService) ? initialService : "",
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [summary, setSummary] = useState<{ fields: EnquiryFields; files: File[] } | null>(null);
  const { state, submit, reset } = useEnquirySubmit();
  const hydrated = useHydrated();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (hasNavigated) document.getElementById(`quote-step-${step}`)?.focus();
  }, [step, hasNavigated]);

  const snapshot = () => {
    const fd = new FormData(formRef.current!);
    return { fd, fields: readFields(fd) };
  };

  const validateStep = (i: number) => {
    const { fd, fields } = snapshot();
    const errs = STEP_FIELDS[i].length ? validateFields(fields, STEP_FIELDS[i]) : {};
    if (i === 2) {
      const fileErr = validateFiles(fd.getAll("attachments").filter((v): v is File => v instanceof File));
      if (fileErr) errs.attachments = fileErr;
    }
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(first === "service" ? `[name="service"]` : `#f-${first}`)?.focus();
      return false;
    }
    return true;
  };

  const go = (to: number) => {
    setHasNavigated(true);
    if (to === 4) {
      const { fd, fields } = snapshot();
      setSummary({ fields, files: fd.getAll("attachments").filter((v): v is File => v instanceof File && v.size > 0) });
    }
    setStep(to);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const next = () => {
    if (validateStep(step)) go(step + 1);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < 4) return next();
    // Final full validation across all steps
    const { fields } = snapshot();
    const errs = validateFields(fields);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0] as keyof EnquiryFields;
      const target = STEP_FIELDS.findIndex((f) => f.includes(firstKey));
      go(target >= 0 ? target : 0);
      return;
    }
    const result = await submit(e.currentTarget);
    if (!result.ok && result.fieldErrors) {
      setErrors(result.fieldErrors);
      const firstKey = Object.keys(result.fieldErrors)[0] as keyof EnquiryFields;
      const target = firstKey === ("attachments" as keyof EnquiryFields) ? 2 : STEP_FIELDS.findIndex((f) => f.includes(firstKey));
      if (target >= 0) go(target);
    }
  }

  const clear = (name: string) => errors[name as keyof FieldErrors] && setErrors((p) => ({ ...p, [name]: undefined }));

  if (state.status === "success") {
    return (
      <SuccessPanel
        title="Thank you — your quote request has been sent."
        reference={state.reference}
        onReset={() => {
          reset();
          setStep(0);
          setService("");
          setSummary(null);
        }}
      />
    );
  }

  return (
    <div>
      {/* Progress */}
      <nav aria-label="Quote form progress" className="mb-8">
        <p className="mb-3 text-sm font-semibold text-steel sm:hidden">
          Step {step + 1} of {STEPS.length}: <span className="text-charcoal">{STEPS[step].title}</span>
        </p>
        <ol className="grid grid-cols-5 gap-1.5 sm:gap-3">
          {STEPS.map((s, i) => (
            <li key={s.title} aria-current={i === step ? "step" : undefined}>
              <div className={cn("h-1.5 rounded-full transition-colors", i < step ? "bg-charcoal" : i === step ? "bg-accent" : "bg-line")} />
              <span className={cn("mt-2 hidden items-center gap-1.5 text-sm sm:flex", i === step ? "font-semibold text-charcoal" : "text-steel")}>
                <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
                {i < step && <Check className="size-3.5 text-success" aria-label="completed" />}
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <form
        ref={formRef}
        onSubmit={onSubmit}
        method="post"
        encType="multipart/form-data"
        noValidate
        className="relative scroll-mt-28"
        onChange={(e) => clear((e.target as unknown as HTMLInputElement).name)}
      >
        <input type="hidden" name="kind" value="quote" />
        <SpamFields />

        {/* Step 1 — Service */}
        <fieldset hidden={step !== 0} className="min-w-0">
          <legend className="sr-only">Select a service</legend>
          <StepHeading i={0} />
          <div className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-describedby={errors.service ? "f-service-error" : undefined}>
            {serviceOptions.map((o) => {
              const Icon = ICONS[o.value] ?? Wrench;
              const checked = service === o.value;
              return (
                <label
                  key={o.value}
                  className={cn(
                    "relative flex min-h-[88px] cursor-pointer items-center gap-3 rounded-[6px] border bg-white p-4 transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                    checked ? "border-charcoal shadow-[inset_0_0_0_1px_#222831] bg-mist" : "border-line hover:border-steel",
                  )}
                >
                  <input
                    type="radio"
                    name="service"
                    value={o.value}
                    checked={checked}
                    onChange={() => setService(o.value)}
                    className="sr-only"
                  />
                  <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-[4px]", checked ? "bg-accent text-charcoal" : "bg-mist text-steel")}>
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-semibold leading-snug">{o.label}</span>
                  {checked && <Check className="absolute top-3 right-3 size-4 text-charcoal" aria-hidden="true" />}
                </label>
              );
            })}
          </div>
          {errors.service && <p id="f-service-error" className="field-error" role="alert">{errors.service}</p>}
        </fieldset>

        {/* Step 2 — Requirements */}
        <fieldset hidden={step !== 1} className="min-w-0">
          <legend className="sr-only">Project requirements</legend>
          <StepHeading i={1} />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <TextField
              name="dimensions"
              label="Project dimensions"
              placeholder="e.g. Gate opening 12 ft × 6 ft"
              hint="Approximate is fine — we confirm at the site visit."
              error={errors.dimensions}
              className="sm:col-span-2"
            />
            <SelectField name="material" label="Material preference" optional options={materialOptions} error={errors.material} />
            <TextField name="quantity" label="Quantity" optional placeholder="e.g. 1 gate, 6 windows" error={errors.quantity} />
            <SelectField name="installation" label="Installation requirements" optional options={installOptions} error={errors.installation} />
            <TextField name="location" label="Project location" placeholder="Area / locality" autoComplete="address-level2" error={errors.location} />
            <TextField name="budget" label="Approximate budget" optional placeholder="e.g. 50,000 – 75,000" error={errors.budget} />
            <TextArea
              name="description"
              label="Anything else we should know?"
              optional
              placeholder="Design ideas, finish (paint / polish), floor level, timeline…"
              error={errors.description}
              className="sm:col-span-2"
            />
          </div>
        </fieldset>

        {/* Step 3 — Uploads */}
        <fieldset hidden={step !== 2} className="min-w-0">
          <legend className="sr-only">Reference photographs or drawings</legend>
          <StepHeading i={2} />
          <p className="mt-2 text-steel">Photos of the opening or site, sketches, or reference designs help us quote accurately. You can skip this step.</p>
          <div className="mt-6">
            <FileDrop label="Reference photos or drawings" error={errors.attachments} onErrorChange={(m) => setErrors((p) => ({ ...p, attachments: m }))} />
          </div>
        </fieldset>

        {/* Step 4 — Contact */}
        <fieldset hidden={step !== 3} className="min-w-0">
          <legend className="sr-only">Contact information</legend>
          <StepHeading i={3} />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <TextField name="name" label="Your name" autoComplete="name" error={errors.name} />
            <TextField name="phone" label="Phone number" type="tel" inputMode="tel" autoComplete="tel" error={errors.phone} />
            <TextField name="email" label="Email address" type="email" autoComplete="email" optional error={errors.email} />
            <SelectField name="contactPreference" label="Preferred contact method" optional options={contactOptions} error={errors.contactPreference} />
          </div>
        </fieldset>

        {/* Step 5 — Review */}
        <div hidden={step !== 4}>
          <StepHeading i={4} />
          {summary && (
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <ReviewBlock title="Service" onEdit={() => go(0)} rows={[["Service", serviceLabel(summary.fields.service)]]} />
              <ReviewBlock
                title="Contact"
                onEdit={() => go(3)}
                rows={[
                  ["Name", summary.fields.name],
                  ["Phone", summary.fields.phone],
                  ["Email", summary.fields.email],
                  ["Preferred contact", summary.fields.contactPreference],
                ]}
              />
              <ReviewBlock
                title="Requirements"
                onEdit={() => go(1)}
                className="md:col-span-2"
                rows={[
                  ["Dimensions", summary.fields.dimensions],
                  ["Material", summary.fields.material],
                  ["Quantity", summary.fields.quantity],
                  ["Installation", summary.fields.installation],
                  ["Location", summary.fields.location],
                  ["Budget", summary.fields.budget],
                  ["Notes", summary.fields.description],
                ]}
              />
              <ReviewBlock
                title="Attachments"
                onEdit={() => go(2)}
                className="md:col-span-2"
                rows={[["Files", summary.files.length ? summary.files.map((f) => f.name).join(", ") : ""]]}
              />
            </div>
          )}
          <div className="mt-6 grid gap-4">
            {step === 4 && <Turnstile />}
            <ErrorBanner state={state} />
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <Button variant="outline" onClick={() => { setErrors({}); go(step - 1); }}>
              <ArrowLeft className="size-4" aria-hidden="true" /> Back
            </Button>
          ) : (
            <span className="hidden sm:block" />
          )}
          {step < 4 ? (
            <Button type="submit" size="lg" disabled={!hydrated}>
              {step === 2 ? "Continue" : "Next step"} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Button>
          ) : (
            <Button type="submit" size="lg" disabled={!hydrated || state.status === "submitting"}>
              {state.status === "submitting" ? (
                <><Loader2 className="size-5 animate-spin" aria-hidden="true" /> Sending…</>
              ) : (
                <><Send className="size-4" aria-hidden="true" /> Submit quote request</>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepHeading({ i }: { i: number }) {
  return (
    <div>
      <p className="eyebrow text-accent-ink">Step {i + 1} of {STEPS.length}</p>
      <h2
        id={`quote-step-${i}`}
        tabIndex={-1}
        className="mt-2 text-2xl font-bold outline-none sm:text-3xl"
      >
        {STEPS[i].heading}
      </h2>
    </div>
  );
}

function ReviewBlock({ title, rows, onEdit, className }: { title: string; rows: [string, string][]; onEdit: () => void; className?: string }) {
  return (
    <section className={cn("rounded-[6px] border border-line bg-mist p-5", className)} aria-label={title}>
      <div className="flex items-center justify-between">
        <h3 className="eyebrow text-charcoal">{title}</h3>
        <button type="button" onClick={onEdit} className="min-h-11 px-2 text-sm font-semibold text-accent-ink underline underline-offset-4 hover:text-charcoal">
          Edit<span className="sr-only"> {title.toLowerCase()}</span>
        </button>
      </div>
      <dl className="mt-2 grid gap-x-6 gap-y-2 text-[0.9375rem] sm:grid-cols-[max-content_1fr]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-steel">{k}</dt>
            <dd className="break-words font-medium whitespace-pre-wrap">{v || <span className="text-steel">—</span>}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
