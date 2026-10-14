"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Base = { name: string; label: string; error?: string; hint?: string; optional?: boolean; className?: string };

function Wrap({ name, label, error, hint, optional, className, children }: Base & { children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className="field-label">
        {label}
        {optional ? <span className="ml-1.5 font-normal text-steel">(optional)</span> : <span aria-hidden="true" className="ml-0.5 text-accent-ink">*</span>}
      </label>
      {children}
      {hint && !error && <p id={`f-${name}-hint`} className="field-hint">{hint}</p>}
      {error && <p id={`f-${name}-error`} className="field-error" role="alert">{error}</p>}
    </div>
  );
}

const describedBy = (name: string, error?: string, hint?: string) =>
  [error ? `f-${name}-error` : null, hint && !error ? `f-${name}-hint` : null].filter(Boolean).join(" ") || undefined;

export function TextField({ name, label, error, hint, optional, className, ...props }: Base & Omit<ComponentProps<"input">, "name">) {
  return (
    <Wrap {...{ name, label, error, hint, optional, className }}>
      <input
        id={`f-${name}`}
        name={name}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className="field-input"
        {...props}
      />
    </Wrap>
  );
}

export function TextArea({ name, label, error, hint, optional, className, ...props }: Base & Omit<ComponentProps<"textarea">, "name">) {
  return (
    <Wrap {...{ name, label, error, hint, optional, className }}>
      <textarea
        id={`f-${name}`}
        name={name}
        rows={5}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className={cn("field-input min-h-[140px] resize-y")}
        {...props}
      />
    </Wrap>
  );
}

export function SelectField({
  name, label, error, hint, optional, className, options, placeholder = "Select…", ...props
}: Base & Omit<ComponentProps<"select">, "name"> & { options: readonly { value: string; label: string }[]; placeholder?: string }) {
  return (
    <Wrap {...{ name, label, error, hint, optional, className }}>
      <select
        id={`f-${name}`}
        name={name}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, error, hint)}
        className="field-input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%23222831%22 stroke-width=%222%22/></svg>')] bg-[length:12px_8px] bg-[right_1rem_center] bg-no-repeat pr-10"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </Wrap>
  );
}
