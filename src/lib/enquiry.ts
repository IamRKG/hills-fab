/**
 * Shared enquiry validation — used by the browser (instant feedback) and the
 * API route (authoritative check). Plain TypeScript, no dependencies, so it
 * adds almost nothing to the client bundle.
 */
import { serviceOptionValues } from "@/data/services";

export const ENQUIRY_LIMITS = {
  maxFiles: 5,
  maxFileBytes: 8 * 1024 * 1024, // 8 MB each
  maxTotalBytes: 20 * 1024 * 1024, // 20 MB total
  acceptedMime: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"],
  accept: ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf,image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf",
  minFillMs: 3000,
} as const;

export type EnquiryKind = "contact" | "quote";

export type EnquiryFields = {
  kind: EnquiryKind;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  budget: string;
  description: string;
  // quote-only
  dimensions: string;
  material: string;
  quantity: string;
  installation: string;
  contactPreference: string;
};

export const FIELD_KEYS: (keyof EnquiryFields)[] = [
  "kind", "name", "phone", "email", "service", "location", "budget", "description",
  "dimensions", "material", "quantity", "installation", "contactPreference",
];

export type FieldErrors = Partial<Record<keyof EnquiryFields | "attachments", string>>;

const MAX_LEN: Partial<Record<keyof EnquiryFields, number>> = {
  name: 80, phone: 24, email: 120, location: 160, budget: 60, description: 3000,
  dimensions: 300, material: 80, quantity: 60, installation: 80, contactPreference: 40,
};

const PHONE_RE = /^\+?[\d\s\-().]{7,24}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readFields(fd: FormData): EnquiryFields {
  const get = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v.trim() : "";
  };
  const out = {} as EnquiryFields;
  for (const k of FIELD_KEYS) (out as Record<string, string>)[k] = get(k);
  out.kind = out.kind === "quote" ? "quote" : "contact";
  return out;
}

export function validateFields(f: EnquiryFields, only?: (keyof EnquiryFields)[]): FieldErrors {
  const e: FieldErrors = {};
  const check = (k: keyof EnquiryFields) => !only || only.includes(k);

  if (check("name")) {
    if (f.name.length < 2) e.name = "Please enter your name.";
  }
  if (check("phone")) {
    const digits = f.phone.replace(/\D/g, "");
    if (!f.phone) e.phone = "Please enter a phone number so we can call you back.";
    else if (!PHONE_RE.test(f.phone) || digits.length < 7 || digits.length > 15) e.phone = "Please enter a valid phone number.";
  }
  if (check("email") && f.email && !EMAIL_RE.test(f.email)) e.email = "Please enter a valid email address, or leave it blank.";
  if (check("service")) {
    if (!f.service) e.service = "Please choose the service you need.";
    else if (!(serviceOptionValues as string[]).includes(f.service)) e.service = "Please choose a service from the list.";
  }
  if (check("location") && f.location.length < 2) e.location = "Please tell us where the project is located.";
  if (check("description")) {
    if (f.kind === "contact" && f.description.length < 10) e.description = "Please describe your project in a few words (at least 10 characters).";
  }
  if (f.kind === "quote" && check("dimensions") && f.dimensions.length < 2) {
    e.dimensions = "Please give approximate sizes (e.g. 12 ft × 6 ft), or write \"Not sure — need site visit\".";
  }

  for (const [k, max] of Object.entries(MAX_LEN) as [keyof EnquiryFields, number][]) {
    if (check(k) && f[k] && f[k].length > max) e[k] = `Please keep this under ${max} characters.`;
  }
  return e;
}

export function validateFiles(files: File[]): string | undefined {
  const real = files.filter((f) => f && f.size > 0);
  if (real.length > ENQUIRY_LIMITS.maxFiles) return `Please attach up to ${ENQUIRY_LIMITS.maxFiles} files.`;
  let total = 0;
  for (const file of real) {
    total += file.size;
    if (file.size > ENQUIRY_LIMITS.maxFileBytes) return `"${file.name}" is larger than 8 MB.`;
    const typeOk =
      (ENQUIRY_LIMITS.acceptedMime as readonly string[]).includes(file.type) ||
      /\.(jpe?g|png|webp|heic|heif|pdf)$/i.test(file.name);
    if (!typeOk) return `"${file.name}" isn't a supported file. Please use JPG, PNG, WebP, HEIC or PDF.`;
  }
  if (total > ENQUIRY_LIMITS.maxTotalBytes) return "Attachments are larger than 20 MB in total.";
  return undefined;
}

export const formatBytes = (n: number) =>
  n < 1024 * 1024 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1024 / 1024).toFixed(1)} MB`;
