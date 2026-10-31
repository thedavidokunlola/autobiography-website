# AGENTS.md — Public Figure Portfolio Website

> **Source of truth for scope:** `PRD_PublicFigurePortfolio_v1_1.md`
> **Source of truth for method:** This file.
> When they conflict: PRD wins on *what* to build. This file wins on *how* to build it.
> When this file is silent: re-read the PRD. If the PRD is also silent, stop and ask. Never invent.

---

## 1. Project Identity

You are building a four-page **fully static** portfolio website for a Nigerian public figure. It serves journalists, event organizers, and civic partners who need verified information fast.

Pages:
- `/` — Long-form biography + photo gallery
- `/press` — Filterable, chronological press archive
- `/work` — Categorised civic and philanthropic history
- `/contact` — Mailto links and social handles only

You are building **v1 only**. No feature from a future version may appear in this build for any reason.

---

## 2. Locked Stack (Final — Do Not Alter)

| Layer | Decision |
|---|---|
| Framework | Next.js 14, App Router. No Pages Router. No version upgrades. |
| Language | TypeScript throughout. `strict: true`. No `.js` files. |
| Styling | Tailwind CSS only. No CSS-in-JS, no Sass, no Emotion. |
| Fonts | `next/font/google` only. Playfair Display + Inter. `display: 'swap'`. Latin subset. |
| Images | `next/image` for all gallery images. No `<img>` tags for gallery. |
| Analytics | GA4 via `@next/third-parties/google` only. No other trackers. |
| Deployment | Vercel. Fully static. No SSR. No edge functions. |
| Content | Typed TypeScript objects in `/data/`. No CMS, no database, no runtime API calls. |

Changing any item in this table requires an explicit instruction from the project owner. Do not substitute "better" alternatives unilaterally.

---

## 3. Hard Rules — Breaking Any of These Means the Task Failed

Even if the code compiles and the page renders, the task has failed if any rule below is violated. There are no exceptions.

### Data Integrity (RULE-D)

**RULE-D1** Every file in `/data/` must have `import 'server-only'` as its first line — before imports, before comments, before type declarations. A missing `server-only` import is a build failure and a data privacy failure.

**RULE-D2** Work entry dates are stored as `"YYYY-MM"` strings in `startDate` and `endDate`. The human-readable `"Month YYYY"` format is a display value only, produced by `formatDate()` at render time. Never store `"Month YYYY"` in the data layer. Sorting always uses the raw `"YYYY-MM"` string (ISO 8601 lexicographic order is chronological — this is correct and intentional).

**RULE-D3** The `prebuild` hook must run `scripts/detect-placeholders.ts` before `next build`. This script greps every file in `/data/` for the pattern `/\[[^\]]+\]/g`. If any match is found, the build must fail immediately with an error message naming the file, field, and matched string. A contact email reading `press@[domain]` that ships to production is a broken user trust event.

**RULE-D4** The `prebuild` hook must also run `scripts/validate-data.ts`. This script checks all required fields in all data files for blank, null, or whitespace-only values. Build fails with file name, field name, and entry index if any required field is empty.

**RULE-D5** Press entry dates are stored as ISO 8601 `"YYYY-MM-DD"` strings in `data/press.ts`. No other format is acceptable in the data layer.

### Page and Component Behaviour (RULE-P)

**RULE-P1** The Contact page contains zero form elements. No `<form>`, no `<input>`, no `<textarea>`, no `<button type="submit">`. Every contact method is a `mailto:` link or an external social profile URL. A contact form introduces a backend dependency this architecture does not have.

**RULE-P2** The photo gallery has no lightbox, no modal, no carousel. Clicking a photo opens the full-resolution image in a new browser tab via a standard `<a>` tag wrapping the `<Image>` component. No JavaScript image viewer of any kind.

**RULE-P3** All four pages are statically generated. No `getServerSideProps`. No `export const dynamic = 'force-dynamic'`. No pattern that defers content to request time. A non-static page fails the performance KPI at launch.

**RULE-P4** The press publication filter and the year filter are `<select>` dropdown elements. Never implement either as a button group, a custom toggle set, or a combobox. Button groups do not scale beyond 10–15 items.

**RULE-P5** The keyword filter on the Press page fires synchronously on each keystroke with no debounce. Add a 150ms debounce only if the entry count exceeds 500. Do not add debounce preemptively.

**RULE-P6** The `Clear filters` button is invisible when no filter is active. It becomes visible when at least one filter holds a non-default value. This is not a style preference — it prevents a confusing UI state where clearing has no effect.

**RULE-P7** The Work page has no filters and no search. It is fully static and read-only. Adding interactivity requires a scope change request.

**RULE-P8** If a Work category has zero entries, its H2 heading does not render. An empty `<h2>Foundations</h2>` with no content beneath it is a credibility failure on a site designed to project professionalism.

**RULE-P9** A press contact link or `mailto:` must be visible in the site header on every page without scrolling. This is Persona 1's critical path. A journalist who cannot find press contact without hunting will leave.

**RULE-P10** No map embed of any kind on the Contact page. The office address is plain text only. A map embed adds third-party JavaScript, increases page weight, and degrades Lighthouse scores below the 90+ target.

### Accessibility (RULE-A)

**RULE-A1** Every gallery image has a non-empty, descriptive `alt` attribute. `alt=""` is forbidden on gallery images. They are informational, not decorative. An empty `alt` on a gallery image fails Lighthouse Accessibility and WCAG 2.1 AA.

**RULE-A2** Exactly one H1 per page. Heading levels are never skipped. Hierarchy: H1 (page title) → H2 (sections) → H3 (sub-items). A skipped heading level is a WCAG 2.1 AA failure and a Lighthouse Accessibility failure.

**RULE-A3** When the mobile navigation menu is open, keyboard focus is trapped within it. Focus cannot escape to content behind the menu. When the menu closes (Escape key or close button), focus returns to the toggle button. This is intentional and required for WCAG 2.1 AA compliance. Confirm this with a keyboard-only test.

**RULE-A4** Every external link contains `<span className="sr-only">(opens in new tab)</span>` inside the anchor element. Do not use `aria-label` as a substitute — `aria-label` replaces the visible link text entirely for screen readers; the `sr-only` span appends context without replacing it. This is the only accepted pattern.

**RULE-A5** Every interactive element displays a visible focus ring: `2px solid #0057FF`, `2px offset`. Never write `outline: none` without providing a custom focus indicator of equivalent visibility. A suppressed focus ring fails WCAG 2.1 AA keyboard navigation requirements.

**RULE-A6** The mobile navigation toggle is operable via keyboard. Enter and Space both activate it. A toggle that only responds to mouse clicks fails keyboard accessibility.

**RULE-A7** The press filter section is wrapped in a `<fieldset>` with a `<legend>` describing the filter group. This is required for screen reader users to understand the purpose of the grouped controls.

**RULE-A8** `@media (prefers-reduced-motion: reduce)` is respected. Smooth scrolling and CSS transitions are disabled for users who have opted out. Do not add motion without checking this media query applies.

### SEO and Metadata (RULE-S)

**RULE-S1** The `Person` JSON-LD schema on the Home page puts the site's canonical URL in the `url` field. The `sameAs` array contains only external profile URLs (social media, Wikipedia, Wikidata). Never put the site's own URL in `sameAs` — it creates a self-referential loop that misrepresents the schema's intent to Google.

**RULE-S2** The 404 page carries `<meta name="robots" content="noindex">` and is excluded from `sitemap.xml`. A crawlable 404 page wastes crawl budget and may appear in search results.

**RULE-S3** The meta title separator is an en dash `–` (U+2013) with one space on each side. Never use an em dash, a hyphen, or a vertical bar. Example: `Press – Adaeze Okonkwo`. This applies to every page meta title without exception.

**RULE-S4** All four main pages return HTTP 200. `/sitemap.xml` and `/robots.txt` are accessible. No `noindex` directive on any of the four main pages in production.

### Privacy and Analytics (RULE-V)

**RULE-V1** The `filter_applied` GA4 event must not log the `filter_value` parameter when `filter_type` is `"keyword"`. Log `filter_type` only. Add a comment at the call site reading exactly: `// PRIVACY HOLD: keyword filter_value withheld pending NDPR/GDPR compliance confirmation (RULE-V1)`. This comment must be grep-able. Logging user-typed search terms without a confirmed consent mechanism exposes the client to regulatory risk under NDPR.

**RULE-V2** The GA4 Measurement ID is read from `process.env.NEXT_PUBLIC_GA_ID`. Never hardcode a Measurement ID in source code. A hardcoded ID cannot be rotated without a code change and constitutes an unnecessary data governance risk.

**RULE-V3** No third-party scripts beyond GA4 may be loaded on any page. No tag managers, no pixel trackers, no chat widgets, no A/B testing tools. Each additional third-party script risks the Lighthouse Best Practices score and introduces data sharing the client has not consented to.

### Design System (RULE-G)

**RULE-G1** The link hover color is `#333333`. Never use `#555555` as a hover color for links. `#555555` is the secondary text color token. Using it on a hovered link signals deactivation — the wrong affordance.

**RULE-G2** No accent color may be introduced. The palette is `#111111` (primary text), `#FFFFFF` (background), `#555555` (secondary text), `#E5E5E5` (borders), `#0057FF` (focus only). If the client supplies a brand color, stop and surface it as a change request. Do not implement it unilaterally.

**RULE-G3** The in-page section navigation (table of contents) on the Home page is visible on desktop only (`lg:` breakpoint and above). It is hidden on mobile. No exceptions.

**RULE-G4** Photo gallery layout: 3-column masonry on desktop, 2-column on tablet, 1-column on mobile. Do not deviate from this layout structure.

### Build Process (RULE-B)

**RULE-B1** The `prebuild` hook in `package.json` runs both `scripts/detect-placeholders.ts` and `scripts/validate-data.ts` before `next build`. Both must pass with zero findings. A build that skips these checks can ship broken or placeholder content.

**RULE-B2** `next build` must complete with zero TypeScript errors. `@ts-ignore` is not acceptable without a comment explaining why the type system cannot handle the case and referencing an open issue or PRD gap. A silenced error is a hidden bug.

**RULE-B3** Before marking any task done, the agent must confirm: "This change has been verified in a Vercel preview deployment before any merge to `main`." The agent cannot enforce Git policy, but must surface this requirement explicitly in the task completion output.

**RULE-B4** `"use client"` may only appear in `PressFilter.tsx` and the mobile navigation toggle component. Any additional Client Component requires explicit written justification referencing which browser API or React state requirement makes it necessary. Unnecessary Client Components degrade static generation and inflate the client JavaScript bundle.

---

## 4. Folder Structure (Canonical — Do Not Reorganise)
/
├── app/
│ ├── layout.tsx # Root layout: Header, Footer, fonts, GA4
│ ├── page.tsx # Home: biography + gallery
│ ├── press/page.tsx # Press Archive
│ ├── work/page.tsx # Civic Work
│ ├── contact/page.tsx # Contact
│ ├── not-found.tsx # 404: noindex meta, link to /
│ ├── sitemap.ts # Four pages only, 404 excluded
│ └── robots.ts # Allow all, sitemap directive
│
├── components/
│ ├── Header.tsx
│ ├── Footer.tsx
│ ├── PhotoGallery.tsx # No lightbox, no modal, no carousel (RULE-P2)
│ ├── PressFilter.tsx # "use client" — state required
│ ├── PressEntryList.tsx
│ ├── WorkCategory.tsx
│ └── WorkEntry.tsx
│
├── data/ # All files begin with import 'server-only' (RULE-D1)
│ ├── biography.ts
│ ├── press.ts
│ ├── work.ts
│ ├── contact.ts
│ └── photos.ts
│
├── lib/
│ └── formatDate.ts # Pure function: "YYYY-MM" → "Month YYYY"
│
├── scripts/
│ ├── validate-data.ts # Pre-build required field check
│ └── detect-placeholders.ts # Pre-build placeholder pattern check
│
├── public/
│ ├── images/gallery/ # Gallery photos
│ └── og/og-default.jpg # OG image: min 1200×630px
│
├── styles/globals.css
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
**Placement rule:** A component with `useState`, `useEffect`, or any browser API goes in `/components/` with `"use client"` and a comment stating why client rendering is required. Everything else is a Server Component by default. Do not add `"use client"` to Server Components.

**Lib rule:** Pure functions with no framework dependency go in `/lib/`. Do not put business logic in `/components/` or `/data/`.

---

## 5. Code Standards

### TypeScript
- `strict: true` in `tsconfig.json`. Do not relax it.
- All function parameters and return types are explicitly typed.
- No implicit `any`. If a type is genuinely unknown, use `unknown` and handle it.
- Data structures match the typed interfaces in the PRD exactly. Do not add fields without a PRD reference.

### Components
- Functional components only.
- Props interfaces defined directly above the component that uses them (unless shared across 3+ components, in which case place in a colocated `types.ts`).
- One component per file. File name matches component name.
- Default exports only where Next.js requires it (page and layout files). Named exports everywhere else.

### Naming
- Components and files: PascalCase
- Utilities and data files: camelCase
- Route folders: kebab-case (Next.js convention)
- Variables and functions: camelCase
- True fixed-value constants: SCREAMING_SNAKE_CASE
- TypeScript interfaces: PascalCase, no `I` prefix

### Tailwind
- Extend `tailwind.config.ts` with the color tokens from the PRD. Reference tokens by name in classnames.
- Do not hardcode hex values in class names or inline styles.
- Do not use arbitrary values (e.g., `w-[347px]`) without a comment explaining why no token equivalent exists.
- Do not mix Tailwind with inline `style={}` on the same element.

### Comments
- Write comments that explain *why*, not *what*.
- Reference rule numbers when a non-obvious implementation choice is rule-driven. Example: `// RULE-A4: sr-only span is the required pattern, not aria-label`
- Privacy deferrals must contain the exact phrase `// PRIVACY HOLD` so they are grep-able. See RULE-V1.
- Do not write comments that describe what the code is doing — the code does that.

### Error Handling
- Missing optional data renders gracefully using the empty-state patterns defined in the PRD. No uncaught errors reach the user.
- External link failures are not caught. The site does not validate external URLs at runtime. This is intentional per the PRD.

---

## 6. Task Completion Checklist

A task is not done until `next build` passes and every applicable item below is confirmed. Submit this checklist with your output.
TASK COMPLETION CHECKLIST

Build
[ ] next build completes with zero TypeScript errors
[ ] next build completes with zero warnings (unexplained warnings = failed build)
[ ] detect-placeholders.ts passes with zero findings
[ ] validate-data.ts passes with zero errors

Data Layer
[ ] Every /data/ file begins with import 'server-only' (RULE-D1)
[ ] Work entry dates are stored as "YYYY-MM" strings (RULE-D2)
[ ] Press entry dates are stored as "YYYY-MM-DD" ISO strings (RULE-D5)
[ ] No [placeholder] values in any data file (RULE-D3)

Rules Compliance
[ ] All gallery images have non-empty descriptive alt text (RULE-A1)
[ ] Exactly one H1 per page, no skipped heading levels (RULE-A2)
[ ] Mobile nav focus trap implemented and tested (RULE-A3)
[ ] All external links contain sr-only "(opens in new tab)" span (RULE-A4)
[ ] Focus rings visible on all interactive elements: 2px solid 
#0057FF (RULE-A5)
[ ] Press filters use <select> dropdowns only (RULE-P4)
[ ] Contact page has zero form elements (RULE-P1)
[ ] Photo gallery has no lightbox, modal, or carousel (RULE-P2)
[ ] Work page has no filter or search UI (RULE-P7)
[ ] Press contact link visible in header on all pages without scrolling (RULE-P9)
[ ] Person JSON-LD: canonical URL in url, only external URLs in sameAs (RULE-S1)
[ ] 404 carries noindex meta and is excluded from sitemap (RULE-S2)
[ ] Meta title separator is en dash (–) on all pages (RULE-S3)
[ ] GA4 Measurement ID from environment variable only (RULE-V2)
[ ] PRIVACY HOLD comment present on keyword filter_value logging (RULE-V1)
[ ] No new "use client" directives beyond PressFilter.tsx and nav toggle (RULE-B4)
[ ] Vercel preview deployment verified before merge to main (RULE-B3)

Scope Guard
[ ] No v2 features introduced
[ ] No features from the Out of Scope table implemented
[ ] No third-party libraries added beyond the locked stack
[ ] No new data fields invented without a PRD reference
[ ] No third-party scripts beyond GA4 (RULE-V3)

Performance
[ ] All pages are statically generated (RULE-P3)
[ ] Fonts loaded via next/font/google with display: 'swap' and latin subset
[ ] Only PressFilter.tsx and mobile nav toggle are Client Components (RULE-B4)
---

## 7. When You Are Unsure

Follow these steps in order. Do not skip.

1. **Re-read the PRD.** The answer is almost always there.
2. **Re-read this file.** If the PRD answers *what* but not *how*, look here.
3. **Stop and surface the question.** Write exactly what you need to know and why. One question at a time. The most blocking uncertainty goes first.
4. **Never invent scope to fill a gap.** If a clean implementation requires a feature the PRD does not describe, the scope is the problem. Flag it. Do not add the feature.
5. **Write a stub, not a workaround.** If the correct implementation is unclear, write a stub that satisfies the type system and add `// TODO: [what is needed and why]`. Do not write tangled workarounds.