import { NextResponse, type NextRequest } from "next/server";
import { randomBytes } from "node:crypto";
import { ENQUIRY_LIMITS, readFields, validateFields, validateFiles } from "@/lib/enquiry";
import { clientIp, isSameOrigin, rateLimit, safeFileName, sniffFileType, verifyTurnstile } from "@/lib/server/security";
import { deliverEnquiry, deliveryConfigured, DeliveryNotConfiguredError, type Attachment } from "@/lib/server/deliver";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (status: number, body: Record<string, unknown>, headers?: HeadersInit) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(req: NextRequest) {
  if (!isSameOrigin(req.headers)) return json(403, { ok: false, error: "Invalid request origin." });

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.startsWith("multipart/form-data")) return json(415, { ok: false, error: "Unsupported request format." });

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > ENQUIRY_LIMITS.maxTotalBytes + 1024 * 1024) {
    return json(413, { ok: false, error: "Attachments are too large. Please keep the total under 20 MB." });
  }

  const ip = clientIp(req.headers);
  const limit = rateLimit(ip);
  if (!limit.ok) {
    return json(429, { ok: false, error: "Too many enquiries from this connection. Please try again later or call us." }, { "Retry-After": String(limit.retryAfter) });
  }

  if (!deliveryConfigured()) {
    return json(503, {
      ok: false,
      code: "NOT_CONFIGURED",
      error: "Online enquiries are not set up yet. Please call or WhatsApp us directly.",
    });
  }

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return json(400, { ok: false, error: "We couldn't read the form. Please try again." });
  }

  // Honeypot: real visitors never see or fill this field. Bots get a generic
  // response and nothing is delivered.
  const honeypot = fd.get("company_website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json(200, { ok: true });
  }

  // Time-trap: forms submitted faster than a human could fill them.
  const startedAt = Number(fd.get("startedAt"));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < ENQUIRY_LIMITS.minFillMs || Date.now() - startedAt > 1000 * 60 * 60 * 24) {
    return json(400, { ok: false, error: "Please refresh the page and try submitting again." });
  }

  const token = fd.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : "", ip))) {
    return json(400, { ok: false, error: "Spam check failed. Please complete the verification and try again." });
  }

  const fields = readFields(fd);
  const errors = validateFields(fields);
  const files = fd.getAll("attachments").filter((v): v is File => typeof v === "object" && v !== null && "arrayBuffer" in v && (v as File).size > 0);
  const fileError = validateFiles(files);
  if (fileError) errors.attachments = fileError;
  if (Object.keys(errors).length > 0) {
    return json(422, { ok: false, error: "Please check the highlighted fields.", fieldErrors: errors });
  }

  const attachments: Attachment[] = [];
  for (const [i, file] of files.entries()) {
    const buf = Buffer.from(await file.arrayBuffer());
    const mime = sniffFileType(buf);
    if (!mime) {
      return json(422, { ok: false, error: "Please check the highlighted fields.", fieldErrors: { attachments: `"${file.name}" doesn't look like a valid image or PDF.` } });
    }
    attachments.push({ filename: safeFileName(file.name, i, mime), contentType: mime, content: buf });
  }

  const reference = `ENQ-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${randomBytes(3).toString("hex").toUpperCase()}`;

  try {
    await deliverEnquiry(fields, attachments, reference);
  } catch (err) {
    if (err instanceof DeliveryNotConfiguredError) {
      return json(503, { ok: false, code: "NOT_CONFIGURED", error: "Online enquiries are not set up yet. Please call or WhatsApp us directly." });
    }
    console.error(`[enquiry ${reference}]`, err);
    return json(502, { ok: false, error: "We couldn't send your enquiry just now. Please try again in a moment, or call / WhatsApp us." });
  }

  return json(200, { ok: true, reference });
}

export function GET() {
  return json(405, { ok: false, error: "Method not allowed" }, { Allow: "POST" });
}
