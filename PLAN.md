# SNAV Tourism — Implementation Plan (Batches A–C)

**Status:** Approved by user — implemented batch-wise, one commit + push per batch.
**Domain used for SEO/emails:** `https://snavtourism.in` · **Analytics:** none · **Admin panel:** separate session later.

---

## Batch A — SEO & dependency hygiene (no external keys)

**Goal:** every route has unique title/description/canonical/OG; search engines can fully index the site.

### A1. `src/components/Seo.tsx` (new)
Zero-dependency tag manager. Props: `title`, `description`, optional `path` (defaults to `window.location.pathname`), optional `image` (defaults `/logo.png`).
Sets on mount (and on prop change via `useEffect`):
- `document.title`
- `<meta name="description">` (upsert)
- `<link rel="canonical">` → `https://snavtourism.in` + normalized path (no trailing slash, root = `/`)
- `<meta property="og:title|description|image|url">` (image/url absolute)
- `<meta name="twitter:title|description|image">`

### A2. Wire `<Seo>` into pages
Use existing titles/descriptions per route (descriptions summarized from page copy):
- `Home.tsx` — existing index.html copy
- `Packages.tsx` — "Tour Packages | SNAV Tourism"
- `Contact.tsx`, `About.tsx`, `Gallery.tsx`
- `NotFound.tsx`
- (Batches C pages get theirs in C.)

### A3. `index.html`
- `og:url` = `https://snavtourism.in/`
- `og:image` / `twitter:image` → absolute `https://snavtourism.in/logo.png`
- Add JSON-LD `<script type="application/ld+json">` with a `@graph` of:
  - **TravelAgency** (LocalBusiness): name, url, logo, image, telephone `+918652885584`, email `snavtourism@gmail.com`, address (Gopi Cine Mall, 210 / Dombivli West / Maharashtra / IN), opening hours `Mo-Fr 09:00-18:00`, `Sa 10:00-16:00`
  - **WebSite**: url + name + publisher → agency.

### A4. `public/sitemap.xml` (new)
Static sitemap, today's date: `/`, `/packages`, `/custom-trips`, `/destinations`, `/gallery`, `/about`, `/contact`.

### A5. `public/robots.txt`
Append `Sitemap: https://snavtourism.in/sitemap.xml`.

### A6. Dependency hygiene
- `npx update-browserslist-db` (removes the stale browserslist warning)
- `npm audit fix` (non-breaking only; verify `lint` + `build` after)

### A7. Verify + commit
`npm run lint` (expect only the 7 pre-existing ui/* fast-refresh warnings), `npm run build`, update `AUDIT.md` (new section), commit + push.

---

## Batch B — Newsletter, contact email & weekly digest (SMTP + Upstash + Vercel Cron)

**Requirement:** welcome email on subscribe (branded template) + weekly digest every Saturday, sent via SMTP. EmailJS cannot schedule, so this is a small Vercel serverless system.

### B1. Dependencies
- Add runtime: `nodemailer`, `@upstash/redis`
- Add dev: `@types/nodemailer`, `@vercel/node` (types for function handlers)
- Remove: `@emailjs/browser` (unused, replaced)

### B2. Serverless functions in `api/`
- `api/subscribe.ts` — `POST { email }` → validate format → upsert into Redis set `subscribers` → send branded **welcome email** → `201`. Friendly 400 on bad input.
- `api/contact.ts` — `POST { name, email, phone, subject, message }` → sends inquiry email to `SMTP_FROM` (owner) → `200`.
- `api/newsletter/send.ts` — `GET`, requires `Authorization: Bearer <CRON_SECRET>` (same header/secret used by cron) → weekly **idempotency guard** (Redis key `lastDigestWeek`) → send digest to all subscribers → `200` with summary JSON. Also callable manually with the secret for testing.

### B3. `api/_lib/` helpers
- `store.ts` — lazy Upstash Redis client (`@upstash/redis`); `addSubscriber`, `getSubscribers`, `getLastDigestWeek`/`setLastDigestWeek`, ISO-week helper.
- `mailer.ts` — `nodemailer` transport from env; `sendMail({ to, subject, html })`.
- `templates.ts` — inline-styled, SNAV-branded HTML (gold/emerald, logo at `https://snavtourism.in/logo.png`):
  - `welcomeEmailHtml(email)` — welcome copy + CTA to `/packages`.
  - `weeklyNewsletterHtml()` — static digest of featured destinations for now (becomes admin-editable later).
- `validate.ts` — email format + required-field helpers.

### B4. `vercel.json`
- Add `"crons": [{ "path": "/api/newsletter/send", "schedule": "0 8 * * 6" }]` (Sat 08:00 UTC; Hobby-valid, fires within the hour).
- **Critical fix:** change SPA rewrite source to `"/((?!assets/|api/).*)"` so `/api/*` is never swallowed by the `index.html` rewrite (guarantees functions are reachable regardless of routing order).

### B5. Frontend
- **`src/components/NewsletterForm.tsx`** (new): owns email input + submit + status message; posts to `/api/subscribe`; shows real success or a graceful "couldn't reach the newsletter service right now — please retry" fallback on failure (removes the current fake-success `TODO`).
- **`Home.tsx`** — replace inline newsletter block with `<NewsletterForm />`; give the section `id="newsletter"`.
- **`Footer.tsx`** — replace `mailto:...Subscribe` button with a compact `<NewsletterForm variant="footer" />`.
- **`Contact.tsx`** — `handleWhatsApp` also `POST`s to `/api/contact` (email you the inquiry) without blocking the WhatsApp window; brief "Sending…" state; failures non-blocking.

### B6. Env configuration
- `.gitignore`: ensure `.env*` ignored but `.env.example` committed (add `!.env.example` if needed).
- `.env.example` (new, committed) lists: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `CRON_SECRET`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`.
- You (user) will paste these into Vercel project env vars after connecting.

### B7. Verify + commit
Typecheck/build (`tsc`-style via `vite build`), `npm run lint`, update `AUDIT.md`, commit + push.
**Live email test requires your SMTP creds + Vercel connect.** Local function testing via `vercel dev` (needs CLI) — otherwise frontend shows the graceful fallback in `npm run dev`.

---

## Batch C — New pages: `/destinations` and `/custom-trips`

### C1. `src/pages/Destinations.tsx` (new)
- Data: 8 destinations (Uttarakhand, Manali, Kashmir, Rajasthan, Golden Temple–Amritsar, Kerala, Tamil Nadu, Goa) mapping to existing `hero-*`/`package-*` image imports, with tagline + 3 highlights each.
- Layout: hero header + responsive card grid (image, name, highlights, "View Packages" → `/packages`), matching site design language.
- `<Seo />` for `/destinations`.

### C2. `src/pages/CustomTrips.tsx` (new) — multi-step builder wizard
Steps with local state + per-step validation, using existing shadcn components (Card, Button, Input, Textarea, Badge, Select, Slider, Popover, Calendar, Progress):
1. **Destinations** — multi-select chips (≥1 required)
2. **Details** — preferred start date (Calendar via Popover) + duration select (3/5/7/10/14 days)
3. **Travelers & budget** — travelers stepper (1–20) + budget range slider (per person)
4. **Interests** — chips (Adventure, Heritage, Beaches, Spiritual, Wildlife, Luxury, Honeymoon, Food)
5. **Contact** — name, phone, email, notes → on submit: build summary → open WhatsApp (`wa.me/8652885584`) **and** `POST /api/contact` with the full trip brief; success + clear state.
Progress indicator across steps; back/next.
- `<Seo />` for `/custom-trips`.

### C3. `App.tsx`
Swap placeholders: `/custom-trips` → `CustomTrips`, `/destinations` → `Destinations`; add lazy-free static imports (both pages are small; no code-splitting in this batch, note for later).

### C4. Verify + commit
`npm run lint` + `npm run build`, update `AUDIT.md`, commit + push.

---

## Proposed commit messages
- Batch A: `chore: SEO - per-page meta, JSON-LD, sitemap, dep hygiene`
- Batch B: `feat: SMTP newsletter + contact email + weekly digest cron`
- Batch C: `feat: destinations page + custom trips builder`

## Open dependency / notes
- Batch B code is fully writable without keys; live email verification happens after you provide SMTP creds and connect Vercel.
- Admin panel (Clerk/Supabase etc.) is a future session, as agreed.