# YUKTI Engineering & Projects — Website

Corporate website for **YUKTI Engineering & Projects** — *Engineering Every Need.*
Built with Next.js (App Router), TypeScript and Tailwind CSS. All pages are statically pre-rendered.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

Quality checks: `npm run lint` and `npx tsc --noEmit`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Required in production.** Canonical URLs, Open Graph, `sitemap.xml`, `robots.txt`. |
| `ENQUIRY_WEBHOOK_URL` | Endpoint that receives enquiry form submissions as JSON (Formspree, Make/Zapier, a serverless email function…). |
| `ENQUIRY_WEBHOOK_TOKEN` | Optional bearer token for the webhook. |
| `NEXT_PUBLIC_GTM_ID` | Optional Google Tag Manager container. Nothing loads when empty. |

## Project structure

```
app/                      Routes (home, about, services, services/[slug], sectors, contact, legal, 404)
  api/enquiry/route.ts    Enquiry API: honeypot + timing spam checks, validation, delivery
  sitemap.ts robots.ts manifest.ts
components/
  layout/                 Header (sticky, services menu), MobileMenu, Footer
  sections/               HomeHero, PageHero, CTASection, EngineeringProcess, EvidenceDiagram, …
  cards/                  ServiceCard, SectorCard
  illustrations/          Original SVG engineering line art (replaceable)
  contact/ContactForm.tsx Accessible enquiry form (loading, success, error states)
  ui/ brand/ seo/ behaviour/
data/                     Content: services, sectors, company (about, values, approach…), navigation
lib/                      site-config, seo, schema (JSON-LD), analytics, enquiry/*
public/                   Logo marks, icons, Open Graph image
```

## Editing content

- **Company details, phone, email, social links:** `lib/site-config.ts` (single source — used everywhere).
- **Services & capabilities:** `data/services.ts`. Adding a service automatically creates its page, sitemap entry and structured data.
- **Sectors:** `data/sectors.ts`. **About, values, approach, why YUKTI:** `data/company.ts`.

All copy is sourced from the YUKTI company brochure. Do not add client names, statistics, certifications or
testimonials unless they are verified.

## Enquiry form

The form posts to `/api/enquiry`, which validates the submission (shared rules in `lib/enquiry/schema.ts`)
and forwards it via `lib/enquiry/deliver.ts`.

- With `ENQUIRY_WEBHOOK_URL` set, submissions are delivered and the user sees a success message.
- Without it, the API returns `503` and the form clearly tells the visitor the message was **not** sent,
  offering the phone number and email instead. Success is never faked.
- **SMTP:** replace the body of `deliverEnquiry` with a Nodemailer (or similar) implementation.
- **EmailJS / client-side providers:** replace the body of `submitEnquiry` in `lib/enquiry/client.ts`.
- **Spam protection:** honeypot field + minimum completion time. For higher traffic, add Cloudflare Turnstile
  or reCAPTCHA verification in the API route and rate limiting at the host/edge.

## Analytics

`lib/analytics.ts` pushes events to `window.dataLayer` only when GTM is configured.
Tracked automatically: `contact_click`, `phone_click`, `email_click`, `whatsapp_click` (delegated link listener),
`service_view` (service pages), `form_start`, `form_submit` (enquiry form). Map them to GA4 inside GTM.

## Brand assets

- `public/logo/yukti-logo-mark-*.webp` — cleaned transparent Y mark (navy/gold) for light backgrounds.
- `public/logo/yukti-logo-mark-light-*.webp` — the same mark with navy areas lightened for navy backgrounds.
- `components/brand/Wordmark.tsx` — vector YUKTI wordmark. `components/brand/Logo.tsx` — header/footer lockup.
- `app/icon.png`, `app/apple-icon.png`, `app/favicon.ico`, `public/og-image.png` — generated from the original mark.

The Y mark is a raster (from the supplied transparent PNG). A professionally traced master SVG of the mark
is recommended for print and very large uses.

## Before launch — items requiring client confirmation

1. Official domain → `NEXT_PUBLIC_SITE_URL`.
2. Contact phone and email in `lib/site-config.ts` are **temporary** values supplied for launch.
3. Business address, LinkedIn/WhatsApp links (currently hidden until provided).
4. Enquiry delivery endpoint → `ENQUIRY_WEBHOOK_URL`.
5. Privacy Policy and Terms — structural drafts; every "To be confirmed" item needs legal review.
6. Replace illustrations with real YUKTI project photography when available (do not present stock images as YUKTI projects).
