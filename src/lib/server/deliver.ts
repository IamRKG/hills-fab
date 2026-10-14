/**
 * Enquiry delivery. Configure at least ONE channel via environment variables:
 *
 *  1) Email via Resend (https://resend.com):
 *       RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL
 *  2) Webhook (Zapier / Make / n8n / Google Apps Script / your CRM):
 *       ENQUIRY_WEBHOOK_URL, optional ENQUIRY_WEBHOOK_SECRET (sent as an HMAC-SHA256 signature)
 *
 * If neither is configured the API returns HTTP 503 and the form tells the
 * visitor to call / WhatsApp instead — submissions are never silently dropped
 * or faked.
 */
import { createHmac } from "node:crypto";
import { siteConfig } from "@/config/site";
import { serviceLabel } from "@/data/services";
import type { EnquiryFields } from "@/lib/enquiry";

export type Attachment = { filename: string; contentType: string; content: Buffer };

export class DeliveryNotConfiguredError extends Error {}

export const deliveryConfigured = () =>
  !!(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) || !!process.env.ENQUIRY_WEBHOOK_URL;

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(f: EnquiryFields): [string, string][] {
  const r: [string, string][] = [
    ["Enquiry type", f.kind === "quote" ? "Quotation request" : "Contact form"],
    ["Name", f.name],
    ["Phone", f.phone],
    ["Email", f.email || "—"],
    ["Service", serviceLabel(f.service)],
    ["Project location", f.location],
  ];
  if (f.kind === "quote") {
    r.push(["Dimensions", f.dimensions], ["Material preference", f.material || "—"], ["Quantity", f.quantity || "—"], ["Installation", f.installation || "—"], ["Preferred contact", f.contactPreference || "—"]);
  }
  r.push(["Approx. budget", f.budget || "—"], [f.kind === "quote" ? "Additional details" : "Project description", f.description || "—"]);
  return r;
}

async function sendEmail(f: EnquiryFields, attachments: Attachment[], ref: string) {
  const key = process.env.RESEND_API_KEY!;
  const to = process.env.ENQUIRY_TO_EMAIL!.split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.ENQUIRY_FROM_EMAIL || "Website Enquiries <onboarding@resend.dev>";
  const subject = `New ${f.kind === "quote" ? "quote request" : "enquiry"}: ${serviceLabel(f.service)} — ${f.name} [${ref}]`;
  const html = `<div style="font-family:Arial,sans-serif;color:#222831">
    <h2 style="margin:0 0 4px">New website ${f.kind === "quote" ? "quotation request" : "enquiry"}</h2>
    <p style="margin:0 0 16px;color:#52616B">Reference ${ref} · ${escapeHtml(siteConfig.name)}</p>
    <table cellpadding="8" style="border-collapse:collapse;max-width:640px">${rows(f)
      .map(([k, v]) => `<tr><td style="border:1px solid #e2e7eb;background:#f4f6f8;font-weight:bold;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="border:1px solid #e2e7eb;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`)
      .join("")}</table>
    <p style="color:#52616B">${attachments.length} attachment(s).</p></div>`;
  const text = rows(f).map(([k, v]) => `${k}: ${v}`).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
      ...(f.email ? { reply_to: f.email } : {}),
      attachments: attachments.map((a) => ({ filename: a.filename, content: a.content.toString("base64"), content_type: a.contentType })),
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

async function sendWebhook(f: EnquiryFields, attachments: Attachment[], ref: string) {
  const url = process.env.ENQUIRY_WEBHOOK_URL!;
  const body = JSON.stringify({
    reference: ref,
    receivedAt: new Date().toISOString(),
    source: siteConfig.url,
    enquiry: { ...f, serviceLabel: serviceLabel(f.service) },
    attachments: attachments.map((a) => ({ filename: a.filename, contentType: a.contentType, size: a.content.length, base64: a.content.toString("base64") })),
  });
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.ENQUIRY_WEBHOOK_SECRET;
  if (secret) headers["X-Signature-SHA256"] = createHmac("sha256", secret).update(body).digest("hex");
  const res = await fetch(url, { method: "POST", headers, body, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/** Sends through every configured channel. Succeeds if at least one channel accepted it. */
export async function deliverEnquiry(f: EnquiryFields, attachments: Attachment[], ref: string) {
  const tasks: Promise<void>[] = [];
  if (process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL) tasks.push(sendEmail(f, attachments, ref));
  if (process.env.ENQUIRY_WEBHOOK_URL) tasks.push(sendWebhook(f, attachments, ref));
  if (tasks.length === 0) throw new DeliveryNotConfiguredError("No enquiry delivery channel configured");

  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
  failures.forEach((r) => console.error(`[enquiry ${ref}] delivery channel failed:`, r.reason));
  if (failures.length === results.length) throw new Error("All delivery channels failed");
}
