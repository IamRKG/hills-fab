# Fabrication · Welding · uPVC Windows & Doors — Website

A production-ready business website built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4** and **Lucide** icons.

Pages: Home · Services · Projects (filterable gallery + lightbox) · About · Contact · Get a Quote (5-step wizard) — plus a floating WhatsApp button, real form handling, SEO metadata, sitemap, robots.txt, Open Graph image and conditional LocalBusiness structured data.

> **Placeholders.** No company facts, customers, testimonials or certifications are invented. Anything in `[square brackets]` is a placeholder and is shown on the site with a dashed orange outline until you replace it. Images are clearly labelled **sample** illustrations.

---

## 1. Quick start

Requirements: **Node.js 20.9+** (22 LTS recommended).

```bash
npm install
cp .env.example .env.local     # then fill in your details
npm run dev                    # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Production build (type-checks too) |
| `npm start` | Serve the production build (`PORT=3000` by default) |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript only |
| `npm run images` | Regenerate the sample placeholder images |

---

## 2. Where to edit content

| What | File |
|---|---|
| Company name, phone, WhatsApp, email, address, hours, service areas, social links | `src/config/site.ts` (or `NEXT_PUBLIC_*` env vars) |
| Services, line items, benefits, applications | `src/data/services.ts` — set `offered: false` to hide anything you don't provide (e.g. TIG welding, on-site welding) |
| Projects / gallery | `src/data/projects.ts` |
| Why-choose-us, process, FAQs, testimonials, About copy | `src/data/content.ts` |
| Colours, fonts, spacing tokens | `src/app/globals.css` (`@theme` block) |
| Logo | `src/components/layout/Logo.tsx` (and `src/app/icon.svg` for the favicon) |

### Replacing images
Put real photos in `public/images/` (JPG or WebP, ~1600–2000 px wide). Either overwrite the sample files using the **same file names**, or add new files and point to them in the data files. Then set `sample: false` on each real project. Next.js automatically serves resized AVIF/WebP versions and lazy-loads gallery images.

### Testimonials
`testimonials` in `src/data/content.ts` is empty on purpose. Add **genuine** reviews (with permission); the placeholder layout is replaced automatically.

---

## 3. Enquiry forms (Contact + Get a Quote)

Both forms post to `POST /api/enquiry` (`src/app/api/enquiry/route.ts`). Configure **at least one** delivery channel:

**Option A — Email via [Resend](https://resend.com)**
```
RESEND_API_KEY=re_...
ENQUIRY_TO_EMAIL=you@yourdomain.com
ENQUIRY_FROM_EMAIL=Website <enquiries@yourdomain.com>   # verified domain
```
Photos/drawings are attached to the email. Customer email (if given) is set as Reply-To.

**Option B — Webhook** (Zapier, Make, n8n, Google Apps Script, CRM)
```
ENQUIRY_WEBHOOK_URL=https://...
ENQUIRY_WEBHOOK_SECRET=optional-shared-secret
```
Receives JSON `{ reference, receivedAt, enquiry: {...}, attachments: [{ filename, contentType, size, base64 }] }`. With a secret, the header `X-Signature-SHA256` contains the HMAC-SHA256 of the raw body.

If **neither** is configured the API returns **503** and the visitor sees *"Enquiry form not connected yet"* with your phone/WhatsApp — submissions are never faked or silently dropped.

### Built-in protection
- Shared validation in the browser and on the server (`src/lib/enquiry.ts`)
- Honeypot field + minimum fill-time check
- Per-IP rate limit (default 5 per 10 min; `ENQUIRY_RATE_LIMIT`). In-memory per server instance — add your host's firewall/rate rules for stronger limits on serverless.
- Same-origin check on the request
- Uploads: max 5 files, 8 MB each, 20 MB total; file **contents** are verified (JPEG/PNG/WebP/HEIC/PDF magic bytes), names sanitised
- Optional **Cloudflare Turnstile** CAPTCHA: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`
- Secrets are server-only env vars (never `NEXT_PUBLIC_`)

> Host body-size limits: Vercel serverless functions accept request bodies up to ~4.5 MB. If customers will upload larger photo sets on Vercel, lower the limits in `ENQUIRY_LIMITS` or deploy to a Node host (below) where 20 MB works.

---

## 4. WhatsApp

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in international format, digits only (e.g. `919876543210`). The floating button and every WhatsApp link open `wa.me` with this prefilled message (editable in `siteConfig.whatsappMessage`):

> Hello, I am interested in your fabrication and window services. Please contact me to discuss my requirements.

Until a number is set, the button links to the Contact page and says the number isn't configured.

---

## 5. SEO

- Per-page titles, descriptions, canonical URLs, Open Graph + Twitter cards
- Generated OG image: `src/app/opengraph-image.tsx`
- `sitemap.xml` and `robots.txt` (set `NEXT_PUBLIC_SITE_URL` to your real domain)
- `NEXT_PUBLIC_PRIMARY_LOCATION` adds your city to the default title (e.g. *"Metal Fabrication, Welding & uPVC Windows in Chennai"*)
- **LocalBusiness** (`HomeAndConstructionBusiness`) JSON-LD is emitted **only** once name, phone, street, city, country and a non-localhost site URL are all real (`isBusinessInfoComplete()` in `src/config/site.ts`)
- FAQPage JSON-LD on the home page

After launch: add the site to Google Search Console, submit `/sitemap.xml`, and create/verify your Google Business Profile with the same name, address and phone.

---

## 6. Deployment

### Vercel (simplest)
1. Push this folder to a GitHub repository.
2. Import it at vercel.com → *New Project* (framework auto-detected).
3. Add the environment variables from `.env.example` under *Settings → Environment Variables*.
4. Deploy, then add your custom domain and update `NEXT_PUBLIC_SITE_URL`.

### Any Node host / VPS
```bash
npm ci
npm run build
PORT=3000 npm start          # run behind Nginx/Caddy with HTTPS; use pm2 or systemd to keep it running
```
Set the environment variables in the process environment (or `.env.production.local`, which is git-ignored).

### Netlify / Cloudflare / Docker
Next.js 16 is supported via their official adapters; `next start` also runs in any `node:22-alpine` container.

---

## 7. Project structure

```
src/
  app/                 # routes (App Router): pages, API, sitemap, robots, OG image, error/loading states
  components/
    layout/            # Header, Footer, Logo, WhatsApp button
    home/              # Home page sections
    projects/          # Gallery, project card, lightbox
    forms/             # Contact form, quote wizard, fields, uploads, spam fields
    ui/                # Buttons, headings, page hero, FAQ, placeholder marker
  config/site.ts       # ← company details
  data/                # ← services, projects, page content
  lib/                 # validation, SEO helpers, utilities, server-only delivery & security
public/images/         # ← replace sample images
scripts/               # sample image generator
```

## 8. Accessibility & performance notes
- Semantic landmarks, skip link, visible focus rings, labelled form controls with inline errors, `aria-current` navigation, native `<dialog>` lightbox, `<details>` FAQ (works without JS)
- Colour contrast meets WCAG AA (orange text uses the darker `accent-ink` token on light backgrounds; buttons use charcoal text on orange)
- Respects `prefers-reduced-motion`
- Self-hosted fonts (no third-party font requests), static pre-rendering for all pages except the quote page, lazy-loaded responsive images, minimal client JavaScript (only header, gallery and forms are interactive)
