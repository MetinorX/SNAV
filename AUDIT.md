# SNAV Tourism - Deployment Audit & Fix Plan

**Date:** September 16, 2026
**Purpose:** Pre-deployment audit for Vercel + future admin panel

---

## Phase 1: Critical Fixes (Before Deploy)

| # | Issue | Location | Status |
|---|-------|----------|--------|
| 1 | `node_modules/` (20,117 files) tracked in git — massive repo bloat | git index | Done |
| 2 | `"by anurag"` test text in Kashmir package highlights | `src/pages/Home.tsx:323` | Done |
| 3 | Footer Subscribe button crashes — `onClick` receives URL string instead of function | `src/components/Footer.tsx:128` | Done |
| 4 | EmailJS completely broken — disabled with TODO for proper setup | `src/pages/Home.tsx:435-455` | Done |
| 5 | `vercel.json` and `.gitignore` created and tracked | repo root | Done |
| 6 | `/pattern.svg` missing — replaced with solid color overlay | `src/pages/Home.tsx:475,597` | Done |

---

## Phase 2: High-Severity Fixes (Before Client Sees It)

| # | Issue | Location | Status |
|---|-------|----------|--------|
| 7 | "View Details" on all package cards -> 404 (no `/packages/:id` route) | `src/components/PackageCard.tsx:291` | Done — link changed to `/packages` |
| 8 | Privacy Policy link -> 404 (no `/privacy` route) | `src/components/Footer.tsx:143` | Done — link removed |
| 9 | Terms & Conditions link -> 404 (no `/terms` route) | `src/components/Footer.tsx:149` | Done — link removed |
| 10 | Kerala package shows Andaman photo on Home (correct on Packages page) | `src/pages/Home.tsx:347` vs `Packages.tsx:280` | Done — now uses `package-kerala.jpg` |
| 11 | Golden Temple package shows Rishikesh photo on Home (correct on Packages page) | `src/pages/Home.tsx:397` vs `Packages.tsx:330` | Done — now uses `hero-golden-temple.jpg` |
| 12 | About page: "15+ Years Experience" contradicts "Since 2021" | `src/pages/About.tsx:149` | Done — changed to 5+ |
| 13 | Contact form email collected but discarded from WhatsApp message | `src/pages/Contact.tsx:217-223` | Done — email now included |
| 14 | Instagram URL has trailing `?` | `src/components/Footer.tsx:30` | Done |
| 15 | OG/Twitter images point to lovable.dev placeholder | `index.html:14,18` | Done — now uses `/logo.png` |
| 16 | NotFound.tsx uses `<a href>` instead of `<Link>` — full page reload | `src/pages/NotFound.tsx:16` | Done |
| 17 | Copyright year hardcoded as 2025 | `src/components/Footer.tsx:139` | Done — now 2026 |

---

## Phase 3: Medium Cleanup (Recommended)

| # | Issue | Location | Status |
|---|-------|----------|--------|
| 18 | 11 MB of video in `src/assets/` (6.6MB + 4.4MB) bloats bundle | `src/assets/` | Done — moved to `public/videos/`, loaded via `/videos/*.mp4` |
| 19 | Gallery imports `.mp4` as `<img>` — video won't display | `src/pages/Gallery.tsx:16,84` | Done — uses `package-jaipur.jpg`, no video |
| 20 | Gallery filter state declared but no filter UI exists | `src/pages/Gallery.tsx:35` | Done — removed dead state |
| 21 | ~913 lines of commented-out dead code across 5 files | Home, Packages, Contact, Navigation, PackageCard | Done — all removed |
| 22 | Unused component: `NavLink.tsx` never imported | `src/components/NavLink.tsx` | Done — deleted |
| 23 | Unused import: `Search` from lucide-react | `src/components/Navigation.tsx:150` | Done — removed |
| 24 | Unused import: `packageJaipur` (mp4) in gallery | `src/pages/Gallery.tsx:16` | Done — removed |
| 25 | HeroSlider `setTimeout` callbacks not cleaned up on unmount | `src/components/HeroSlider.tsx:76,82,88` | Done — ref + cleanup on unmount |
| 26 | `"use client"` directive — Next.js artifact | `src/pages/Contact.tsx:186` | Done — removed (dead code stripped) |
| 27 | Dead CSS variables: `--gradient-*`, `--shadow-*`, `--transition-smooth` | `src/index.css` | Done — removed |
| 28 | ~30+ unused npm dependencies (scaffolded UI components never imported) | `package.json` | Done — removed `@tanstack/react-query`, `zod`, `date-fns`, `@hookform/resolvers`; kept shadcn/ui deps (compiled via `ui/*`) |
| 29 | `@tanstack/react-query` wraps app but no component uses it | `src/App.tsx` | Done — removed provider |
| 30 | Missing accessibility: no `aria-label` on mobile menu, social icons, save button | Navigation, Footer, PackageCard | Done — added |
| 31 | Contact form email field not included in WhatsApp message | `src/pages/Contact.tsx:217-223` | Done — email now included (Phase 2) |
| 32 | Gallery close button double-fires (overlay click also triggers close) | `src/pages/Gallery.tsx:106-113` | Done — `stopPropagation` on all controls |

---

## Phase 4: SEO, Sitemap & Dependency Hygiene (Batch A)

| # | Item | Status |
|---|------|--------|
| 33 | New `<Seo>` component (zero-dep): per-route title/description/canonical/OG/Twitter | `src/components/Seo.tsx` — Done |
| 34 | `<Seo>` wired into Home, Packages, Contact, About, Gallery, NotFound | Done |
| 35 | JSON-LD `TravelAgency` + `WebSite` schema in `index.html` | Done |
| 36 | `og:url` + absolute `og:image`/`twitter:image` → `https://snavtourism.in/logo.png` | Done |
| 37 | `public/sitemap.xml` (7 routes) | Done |
| 38 | `robots.txt` → `Sitemap:` line | Done |
| 39 | `npx update-browserslist-db` | Done — no target changes, stale warning gone |
| 40 | `npm audit fix` + `react-router-dom` 6.30.1 → 6.30.6 — clears XSS/open-redirect (high) in `@remix-run/router` | Done — 18 → 17 remaining |

**Remaining audit (17, dev-only):** all in build tooling (`eslint` toolchain, `vite`/`esbuild`, `postcss`, `tailwindcss`, `rollup`, `browserslist`, etc.). Not shipped to production. Fixing needs `npm audit fix --force` → breaking Vite major upgrade; deferred intentionally.

---

## Phase 5: Newsletter, Contact Email & Weekly AI Digest (Batch B)

| # | Item | Status |
|---|------|--------|
| 41 | Serverless API layer: `api/_lib/{validate,store,mailer,ai,templates}.ts` | Done — TS typechecked, lint-clean |
| 42 | `api/subscribe.ts` POST — validates email, adds to Upstash Redis `subscribers` set, sends branded welcome email | Done — `maxDuration: 30` |
| 43 | `api/contact.ts` POST — forwards enquiry to `CONTACT_TO` (default `snavtourism@gmail.com`) | Done — added as backup to WhatsApp flow, `maxDuration: 30` |
| 44 | `api/newsletter/send.ts` GET — cron trigger, `Bearer CRON_SECRET` auth, weekly idempotency via `lastDigestWeek`, generates + sends digest to all subscribers | Done — `maxDuration: 300` |
| 45 | AI digest via NVIDIA NIM (`mistralai/mistral-nemotron`) with retry (2×45s) | Done — layered |
| 46 | AI fallback model `deepseek-ai/deepseek-v4-flash-0731` (reliable, ~90-100s) if Nemotron fails | Done |
| 47 | Static branded fallback digest if both models fail | Done |
| 48 | Email templates: `welcomeEmailHtml` + `weeklyNewsletterHtml` in shared `<shell>` — muted-blank `#f4f2ec` bg, navy `#14233b` + gold `#e2a316` header, emerald `#2a6b4f` CTA | Done — smoke-tested (rendering, escaping, unsubscribe) |
| 49 | HTML-escape everywhere (incl. `escapeHtml` shared in `templates.ts`); unsubscribe `mailto:` in every footer | Done |
| 50 | Vercel Cron `0 8 * * 6` (Sat 08:00 UTC) via `vercel.json`; rewrite excludes `/api/` | Done |
| 51 | Dependencies: +`nodemailer`, `@upstash/redis`; dev +`@types/nodemailer`, `@vercel/node`; `@emailjs/browser` removed | Done |
| 52 | Frontend: `NewsletterForm` (hero + footer variants), Home/Footer wired, Contact submits both WhatsApp + `/api/contact` (async, never blocks WhatsApp) | Done |
| 53 | `eslint.config.js` — node globals for `api/**/*.ts`; env examples in `.env.example` (tracked, placeholders), real key only in gitignored `.env.local` | Done |

**Notes**
- NIM key (`nvapi-…`) is **scoped**: `/v1/models` lists full catalog but the account only has `mistralai/mistral-nemotron` + `deepseek-ai/deepseek-v4-flash-0731`; everything else 404s. Nemotron is fast when healthy but intermittently errors (500/hang), hence the deepseek fallback.
- Requires user SMTP credentials + Upstash Redis creds in Vercel env; live send test after deployment.
- `npm audit`: 21 remaining (dev-only transitive, none production).

---

## Phase 6: Destinations Page & Custom Trip Builder (Batch C)

| # | Item | Status |
|---|------|--------|
| 54 | `src/pages/Destinations.tsx` — 8 destinations (Uttarakhand, Manali, Kashmir, Rajasthan, Golden Temple·Amritsar, Kerala, Tamil Nadu, Goa) using existing `hero-*`/`package-*` images, each with region badge, best-time, tagline + 3 highlights, "View Packages" CTA | Done |
| 55 | Destinations: bottom CTA banner → `/custom-trips`; `<Seo />` `/destinations` | Done |
| 56 | `src/pages/CustomTrips.tsx` — 5-step wizard (Destinations chips → date+duration → travelers+budget slider → interests → contact), progress bar, per-step validation, back/continue | Done |
| 57 | CustomTrips submit — builds trip brief, opens WhatsApp (`wa.me/8652885584`) **and** `POST /api/contact`, toasts success/warning, resets state | Done |
| 58 | CustomTrips uses shadcn Card/Button/Input/Textarea/Label/Badge/Select/Slider/Popover/Calendar/Progress + `sonner` toast; `<Seo />` `/custom-trips` | Done |
| 59 | `App.tsx` — placeholders swapped: `/custom-trips` → CustomTrips, `/destinations` → Destinations | Done |
| 60 | Bundle note: JS now 475.34 kB (gzip 146.73 kB) — calendar/day-picker pulled in. Code-splitting (`React.lazy`) deferred to a later performance batch | Note |

---

## Phase 7: Domain migration `.in` → `.com` + www redirect

| # | Item | Status |
|---|------|--------|
| 61 | `src/components/Seo.tsx` — `SITE_URL` → `https://snavtourism.com` | Done |
| 62 | `index.html` — og:url, og:image, twitter:image, JSON-LD `@graph` (`#agency`, `#website` ids, url, logo, image) | Done |
| 63 | `public/sitemap.xml` — all 7 `<loc>` entries | Done |
| 64 | `public/robots.txt` — `Sitemap:` line | Done |
| 65 | `api/_lib/templates.ts` — footer text + 2 CTA links to `/packages` | Done |
| 66 | `api/contact.ts` — default inquiry subject | Done |
| 67 | `vercel.json` — `www.snavtourism.com` → `https://snavtourism.com` 308 redirect (requires www domain attached in Vercel) | Done |
| 68 | `PLAN.md` — doc refs updated for consistency | Done |

**User-side Vercel steps remaining:** Attach `snavtourism.com` as production domain + `www.snavtourism.com` (CNAME) as redirect alias.

---

## Build / Lint Status

- `npm run build` passes (Vite 5). JS 475.34 kB (gzip 146.73 kB) after Batch C pages (no `/pattern.svg` warning).
- `npm run lint` — 0 errors. 7 pre-existing `react-refresh/only-export-components` warnings in `src/components/ui/*` (shadcn/ui generated files) — left as-is, cosmetic only.
- `npm audit`: 21 remaining (dev-only build tooling); prod runtime deps clean after `react-router-dom` 6.30.6 (Batch A).
