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
| 18 | 11 MB of video in `src/assets/` (6.6MB + 4.4MB) bloats bundle | `src/assets/` | |
| 19 | Gallery imports `.mp4` as `<img>` — video won't display | `src/pages/Gallery.tsx:16,84` | |
| 20 | Gallery filter state declared but no filter UI exists | `src/pages/Gallery.tsx:35` | |
| 21 | ~913 lines of commented-out dead code across 5 files | Home, Packages, Contact, Navigation, PackageCard | |
| 22 | Unused component: `NavLink.tsx` never imported | `src/components/NavLink.tsx` | |
| 23 | Unused import: `Search` from lucide-react | `src/components/Navigation.tsx:150` | |
| 24 | Unused import: `packageJaipur` (mp4) in gallery | `src/pages/Gallery.tsx:16` | |
| 25 | HeroSlider `setTimeout` callbacks not cleaned up on unmount | `src/components/HeroSlider.tsx:76,82,88` | |
| 26 | `"use client"` directive — Next.js artifact | `src/pages/Contact.tsx:186` | |
| 27 | Dead CSS variables: `--gradient-*`, `--shadow-*`, `--transition-smooth` | `src/index.css` | |
| 28 | ~30+ unused npm dependencies (scaffolded UI components never imported) | `package.json` | |
| 29 | `@tanstack/react-query` wraps app but no component uses it | `src/App.tsx` | |
| 30 | Missing accessibility: no `aria-label` on mobile menu, social icons, save button | Navigation, Footer, PackageCard | |
| 31 | Contact form email field not included in WhatsApp message | `src/pages/Contact.tsx:217-223` | |
| 32 | Gallery close button double-fires (overlay click also triggers close) | `src/pages/Gallery.tsx:106-113` | |
