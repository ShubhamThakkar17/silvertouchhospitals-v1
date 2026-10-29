# Items waiting on the hospital ([CONFIRM])

Everything below is either hidden on production builds or shown with a neutral fallback until the
hospital supplies it. On dev/staging builds each item shows as an amber `[CONFIRM]` tag in place
(set `NEXT_PUBLIC_SHOW_CONFIRM=true` on a staging deployment to review them).

Where to change each item is given in brackets.

## Launch blockers

- [ ] **Form delivery.** Choose Resend email and/or a webhook (Google Sheet, CRM). Until one is set,
      production forms tell patients to call. [`.env`: `RESEND_API_KEY` + `FORM_FROM_EMAIL`, or `FORM_WEBHOOK_URL`]
- [ ] **Legal copy.** Privacy Policy, Terms and Patient Rights are drafts and are `noindex`.
      Needs legal review (DPDP Act 2023). [`app/privacy-policy`, `app/terms`, `app/patient-rights`]
- [ ] **Health package names and ₹ prices.** Cards currently say "Call for price". [`content/packages.ts`]
- [ ] **GA4 and Meta Pixel IDs.** [`.env`: `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`]

## Doctors

- [ ] **Professional headshots** for 11 doctors. Only Dr Jil P. Patel, Dr Harshil, Dr Manthan Patel and
      Dr Simple Bhadania have real portraits. The other "photos" on the current site are OPD posters;
      they are shown on each profile as the published OPD schedule, and cards use initials until a
      headshot arrives. [`content/doctors.ts` → `photo`]
- [ ] **Branch-wise OPD days per doctor.** [`content/doctors.ts` → `branches`]
- [ ] **Dr Harshil**: surname and qualifications.
- [ ] **Dr Gopal Singh Rajpurohit**: the current page shows "Dr Harshil" and a photo named
      `dr-harisl.png`. Confirm name, role and photo, then drop the WordPress `-2` slug suffix and enable
      the redirect in `content/redirects.mjs`.
- [ ] **Dr Manish Hathila**: photo file is named `chirag-patel.png`; withheld until confirmed.
- [ ] **Dr Chirag Patel, Dr Mayur Patel, Dr Vikram Patel, Dr Jitendra Shah**: one-line profiles; need bios.
- [ ] **Dr Yuvraj Lakum**: named in a patient review, no profile. Hidden until details arrive. [`hidden: true`]
- [ ] **Bariatric surgeon name**, and doctors for Nephrology, Critical Care, Pulmonology,
      Endocrinology, Dentistry and Full Body Checkup (those pages show "Talk to our team" instead).
- [ ] Registration numbers, if the hospital wants them shown.

## New speciality pages (noindex until approved)

GI Surgery, Gynecology & Obstetrics and General Medicine had no real copy on the old site (the GI Surgery
and Gynecology pages are lorem ipsum). The new pages use only facts published elsewhere on the site
(doctor profiles, homepage, related specialities) and are excluded from the sitemap.
- [ ] Approve or replace copy, then set `status: "live"` in `content/specialities.ts`.

## Proof points and trust

- [ ] Counters: number of doctors, surgeries performed, years since founding, Google rating.
      Only the four real facts are shown (2 hospitals, 24/7, 3 OTs, ₹5 lakh PMJAY). [`lib/site.ts` → `PROOF_POINTS`]
- [ ] **NABH (6th Edition) accreditation, Satellite (Prahladnagar)**: taken from the hospital's own
      announcement image on the current site (`/wp-content/uploads/2026/05/silvertouch.jpg`). Confirm
      wording and date. [`content/insurers.ts` → `NABH`]
- [ ] Google Business Profile review URLs for both branches. [`lib/site.ts` → `reviewsUrl`]
- [ ] Exact geo-coordinates for both branches (improves the Hospital JSON-LD). [`lib/site.ts` → `geo`]
- [ ] Year founded, leadership / management team, branch photos (About page).
- [ ] "Promote Wellness" pillar copy; the old site repeated another pillar's sentence. A placeholder
      line is in `app/about-us/page.tsx`.

## Patients & Insurance

- [ ] PMJAY process and document list; admission checklist; visiting hours. [`app/patients-insurance/page.tsx`]

## Brand and media

- [ ] Logo as SVG or transparent PNG (the current logo is a 167×99 JPG).
- [ ] Colour direction: Silver Touch blue `#004EA0` (built) or group green `#0A3520`
      (switch by setting `data-theme="group"` on `<html>`; tokens are in `app/globals.css`).
- [ ] New photography for Pulmonology and Neurology (the old site used a placeholder); these pages
      currently use an icon panel instead of a photo.
- [ ] Press items, events and health camp photos; Instagram feed provider. [`app/media/page.tsx`, `NEXT_PUBLIC_INSTAGRAM_FEED_URL`]
- [ ] WhatsApp number (adds WhatsApp to the mobile action bar). [`NEXT_PUBLIC_WHATSAPP_NUMBER`]

## Blog

- [ ] Medical reviewer per category (replaces the old "admin" author and adds `reviewedBy` to the
      BlogPosting schema). [`content/categories.ts` → `REVIEWERS`]

## Compliance review

- [ ] Superlatives in migrated copy. Visible headings written for the rebuild avoid "best" and
      guaranteed outcomes, but SEO titles/meta descriptions and migrated body copy still contain phrases
      like "best ENT hospital in Ahmedabad" and the FAQ answers "Which is the best … hospital". Kept
      because they rank; the hospital should decide whether to keep them.
