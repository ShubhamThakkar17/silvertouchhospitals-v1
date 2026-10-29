# Silver Touch Hospitals website

Rebuild of [silvertouchhospitals.com](https://www.silvertouchhospitals.com/) in Next.js 14 (App Router), Tailwind CSS
and TypeScript, styled after the [Hospic](https://hospic.framer.website/) template and re-skinned for Silver Touch
Hospitals (Nirnay Nagar and Satellite, Ahmedabad).

Every URL on the current site keeps its slug or 301-redirects to its new home, so existing rankings carry over.
Items the hospital still has to supply are tracked in [CONFIRM.md](CONFIRM.md).

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static build of ~136 pages
npm start
```

Copy `.env.example` to `.env.local` for form delivery, analytics and the other optional settings.

## What's in it

| Area | Where |
|---|---|
| Home, About, Contact, FAQs, Media, Patients & Insurance, careers, legal | `app/*/page.tsx` |
| 19 specialities (16 migrated + GI Surgery, Gynecology & Obstetrics, General Medicine) | `content/specialities.ts` + `app/specialities-services/[slug]` |
| 15 doctors, filterable directory and profiles | `content/doctors.ts` + `app/doctor-team` |
| 52 blog posts at their original root-level slugs, categories, 9 per page | `content/imported/posts` + `app/[slug]`, `app/blogs`, `app/category` |
| 6 testimonials (text exactly as published) | `content/testimonials.ts` |
| Appointment form (modal, inline, sidebar), job application form | `components/forms`, `app/api/*` |
| Redirect map (301) | `content/redirects.mjs` (CSV copy in `content/redirects.csv`) |
| JSON-LD: MedicalOrganization, Hospital per branch, MedicalWebPage, Physician, FAQPage, BreadcrumbList, BlogPosting | `lib/schema.ts` |
| Sitemap and robots | `app/sitemap.ts`, `app/robots.ts` |
| Design tokens (colours, type scale) | `app/globals.css`, `tailwind.config.ts` |
| UI strings, ready for a Gujarati/Hindi dictionary | `lib/i18n.ts` |

## Content migration

`npm run import` re-runs [scripts/import-wordpress.ts](scripts/import-wordpress.ts):

- Blog posts come from the WordPress REST API.
- Pages and doctor profiles are built with WPBakery, whose REST output is raw shortcodes, so they are scraped
  from the rendered HTML (`article .entry-content-1`).
- The importer strips layout wrappers, the leftover theme logo strip and placeholder images, pulls accordions out as
  FAQs (rendered with FAQPage schema), rewrites internal links to the new paths and fixes the typos listed in the
  brief.
- Every image, in the content and in [scripts/assets.ts](scripts/assets.ts), is downloaded and converted to WebP
  (max 1600 px) in `public/media/`. Components refer to the original WordPress URL and resolve it with `img()` from
  `lib/media.ts`, so a missing image fails the build instead of shipping broken.

Long-form copy is kept verbatim. The structured "at a glance" sections on speciality pages and the doctor data are
hand-written from the brief and the old pages.

## Forms

Both forms validate in the browser and again on the server, with a honeypot, a per-IP rate limit and optional
reCAPTCHA v3. Delivery is configured with environment variables:

- `RESEND_API_KEY` + `FORM_FROM_EMAIL`: appointment requests go to the inbox of the branch the patient picks (both
  for "Either"); job applications go to HR with the resume attached.
- `FORM_WEBHOOK_URL`: the same data as JSON, for a Google Sheet, CRM or Zapier.

With neither set, development logs submissions and production answers 503, so the patient sees both phone numbers
instead of a false "thank you".

On Vercel, request bodies are capped at 4.5 MB, below the 10 MB resume limit in the brief. If larger resumes matter,
switch the upload to direct-to-storage (for example Vercel Blob).

## Analytics

Set `NEXT_PUBLIC_GA4_ID` and/or `NEXT_PUBLIC_META_PIXEL_ID`. Events: `call_click` (with branch), `form_submit` (with
form and department), `directions_click` (with branch) and `whatsapp_click`.

## Design notes

- Geist throughout; pill buttons with the rotating arrow disc, eyebrow chips, 10 px cards, `#F6F6F6` alternating
  sections, fade-and-rise reveals, count-up stats, logo marquee and draggable carousels. All motion respects
  `prefers-reduced-motion`.
- Primary `#004EA0`. Red is reserved for emergency: the brand red `#ED1B24` gives white text only 4.39:1, below WCAG
  AA, so red behind or under text uses `#D3131B`; the brand red stays for non-text accents.
- Tap targets are at least 48 px, body text at least 16 px. The 24x7 emergency strip is sticky on every page, and
  mobile gets a bottom bar with Call / Book / Directions.
- `[CONFIRM]` placeholders appear on dev and staging builds and are hidden on production builds
  (`NEXT_PUBLIC_SHOW_CONFIRM` overrides this).

## Deploying

Vercel works with no extra configuration. Set `NEXT_PUBLIC_SITE_URL` and the form variables. `robots.txt` blocks
indexing on preview deployments (`VERCEL_ENV !== "production"`).
