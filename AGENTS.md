# AGENTS.md: Public Figure Portfolio Website

> Source of truth: `PRD_PublicFigurePortfolio_v1_1.md`
> This file governs HOW you build. The PRD governs WHAT you build.
> When the two conflict, the PRD wins on scope. This file wins on method.

---

## 1. What is this project?

You are building a four-page static portfolio website for a Nigerian public figure. The site serves journalists, event organizers, and civic partners who need verified, well-organised information fast.

The four pages are:

- `/` (Home): long-form biography and photo gallery
- `/press` (Press Archive): filterable, chronological media coverage
- `/work` (Civic Work): categorised history of foundations, NGOs, and advisory roles
- `/contact` (Contact): mailto links and social handles only

You are building **v1 only**. No feature that belongs to a later version may be introduced at any point during this build. The PRD explicitly marks what is out of scope for v1. Do not touch it.

---

## 2. What is locked

Every item in this section is a final decision. Do not swap, upgrade, replace, or "improve" any of them. If you believe a locked choice is wrong, stop and ask. Do not act unilaterally.

### Framework and language

- Framework: **Next.js 14, App Router**. Do not use the Pages Router. Do not upgrade to a later version without instruction.
- Language: **TypeScript** throughout. No plain JavaScript files in the project.
- Styling: **Tailwind CSS** only. No CSS-in-JS, no styled-components, no Sass, no Emotion. No utility class libraries other than Tailwind.

### Fonts

- Headings (H1, H2): **Playfair Display**, weight 700. Loaded via `next/font/google`, self-hosted on Vercel's CDN, subset to `latin` only.
- Sub-headings (H3, H4): **Playfair Display**, weight 400 or 600.
- Body and UI: **Inter**, weight 400, 500, or 600. Loaded the same way.
- `display: 'swap'` is required on every font load. No exceptions.
- Do not load fonts from any source other than `next/font/google`.

### Image handling

- Use `next/image` for every gallery image. No `<img>` tag for gallery images.
- Every `<Image>` component must have explicit `width` and `height` props. No omissions.
- Full-resolution links wrap the `<Image>` in a standard `<a>` tag. Do not use a lightbox, modal, or carousel. No exceptions.

### Analytics

- GA4 only, loaded via `@next/third-parties/google` `<GoogleAnalytics>` component in `app/layout.tsx`.
- No other analytics service. No additional tracking pixels.
- Measurement ID is read from `process.env.NEXT_PUBLIC_GA_ID`. Never hardcode it.

### Deployment

- Target platform: **Vercel**. Do not configure for any other host.
- All pages must be fully statically generated. No server-side rendering. No edge functions.

### Content layer

- All content lives in typed TypeScript objects in `/data/`. No database. No CMS. No API calls at runtime for content.
- Every file in `/data/` must begin with `import 'server-only'` as its very first line. This is non-negotiable. A missing `server-only` import is a build failure.

### Out-of-scope features (v1 hard exclusions)

Do not build any of the following, regardless of how reasonable they seem:

- Blog or news section
- CMS or admin interface
- Server-side search
- PDF hosting or inline PDF viewer
- Contact form of any kind. No form element, no backend, no third-party form service.
- Map embed anywhere on the site
- Cookie consent banner (flagged as open question, not a v1 deliverable)
- E-commerce, donations, or payment flows
- User accounts or authentication
- Multilingual support
- Newsletter or email capture
- Video embeds
- Any feature not described in the PRD

---

## 3. What must never happen

Breaking any rule in this section means the task has failed, even if the code compiles and the page renders. There are no exceptions and no overrides.

### Data and content rules

**RULE-D1.** Every file in `/data/` must start with `import 'server-only'`. If you add a new data file, this is the first line you write before anything else.

**RULE-D2.** Store work entry dates as `"YYYY-MM"` strings in `startDate` and `endDate`. Never store them as `"Month YYYY"`. Sorting must use the raw `"YYYY-MM"` string. Conversion to `"Month YYYY"` happens only at render time via the `formatDate()` utility. An alphabetically sorted date field is a data error.

**RULE-D3.** Never ship placeholder values to production. The pre-build script must grep every file in `/data/` for strings matching `/\[[^\]]+\]/g`. If any match is found, the build must fail with a descriptive error naming the file and the field. Implement this as a `prebuild` hook.

**RULE-D4.** The build-time validation utility must check all required fields across all data files for blank, null, or whitespace-only values and fail the build with a file name, field name, and entry index if any are found.

**RULE-D5.** Press entry dates are stored as ISO 8601 `"YYYY-MM-DD"` strings in `data/press.ts`. Never use any other date format in the data layer.

### Page and component rules

**RULE-P1.** The Contact page must contain no form element of any kind. Every contact method is a `mailto:` link or a social profile URL. Nothing else.

**RULE-P2.** The photo gallery must have no lightbox, no modal, and no carousel. Clicking a photo opens the full-resolution image in a new browser tab via a standard `<a>` tag. No JavaScript image viewer of any kind.

**RULE-P3.** All pages must be statically generated. Never use `getServerSideProps`, dynamic rendering, or any pattern that moves content fetching to request time.

**RULE-P4.** The press publication filter must be a `<select>` dropdown. Never implement it as a button group or a custom toggle set.

**RULE-P5.** The keyword filter on the Press page fires synchronously on each keystroke. No debounce unless the entry count exceeds 500. Do not add debounce preemptively.

**RULE-P6.** The `Clear filters` button on the Press page is invisible when no filter is active. It appears only when at least one filter has a non-default value.

**RULE-P7.** The Work page has no filters and no search. It is fully static and read-only.

**RULE-P8.** If a Work category has zero entries, its H2 heading does not render. Never render an empty category heading.

**RULE-P9.** A persistent press contact link or mailto must appear in the site header on every page. This is not optional. Persona 1 (journalist) must be able to reach the press contact without scrolling or navigating to a separate page.

**RULE-P10.** The map embed is forbidden on the Contact page. The office address is plain text only. No third-party map service of any kind.

### Accessibility rules

**RULE-A1.** Every gallery image must have a non-empty, descriptive `alt` attribute. `alt=""` is forbidden on gallery images. They are informational, not decorative.

**RULE-A2.** There must be exactly one H1 per page. Heading levels must not be skipped. The hierarchy is H1 for the page title, H2 for sections, H3 for sub-items. A skipped heading level is an accessibility failure.

**RULE-A3.** When the mobile navigation menu is open, keyboard focus must be trapped within it. Focus must not escape to the page behind the menu. This is intentional and required for WCAG 2.1 AA compliance. When the menu closes (via Escape or the close button), focus must return to the toggle button.

**RULE-A4.** Every external link must contain a visually hidden span: `<span className="sr-only">(opens in new tab)</span>` inside the anchor element. Never use `aria-label` on external links as the sole screen reader affordance. The visually hidden span is the only accepted pattern.

**RULE-A5.** Every interactive element must display a visible focus ring: 2px solid `#0057FF`, 2px offset. Never suppress `outline: none` without providing an equivalent custom focus indicator.

**RULE-A6.** The mobile navigation toggle must be operable via keyboard. Enter and Space must activate it.

**RULE-A7.** The press filter section must be wrapped in a `<fieldset>` with a `<legend>` describing the filter group.

**RULE-A8.** `@media (prefers-reduced-motion: reduce)` must be respected. Smooth scrolling and CSS transitions must be disabled for users who have opted out.

### SEO and metadata rules

**RULE-S1.** The `Person` JSON-LD schema on the Home page must place the site's canonical URL in the `url` field. The `sameAs` array must contain only external profile URLs (social media, Wikipedia, Wikidata). Never put the site's own URL in `sameAs`.

**RULE-S2.** The 404 page must carry `<meta name="robots" content="noindex">` and must be excluded from `sitemap.xml`.

**RULE-S3.** The meta title separator is an en dash (–, U+2013) with one space on each side. Never use an em dash, a hyphen, or a vertical bar as the separator. This applies to every page meta title without exception.

**RULE-S4.** All four pages must return HTTP 200. `sitemap.xml` must be accessible at `/sitemap.xml`. `robots.txt` must be accessible at `/robots.txt`. The site must not ship with any `noindex` directive on the four main pages.

### Privacy and analytics rules

**RULE-V1.** The `filter_applied` GA4 event must not log the user-typed `filter_value` for `filter_type: "keyword"` until NDPR/GDPR privacy compliance is confirmed. Log `filter_type` only. Leave a comment in the code explaining why keyword values are withheld.

**RULE-V2.** The GA4 Measurement ID must be read from the `NEXT_PUBLIC_GA_ID` environment variable. Never hardcode a Measurement ID in source code.

**RULE-V3.** No third-party scripts beyond GA4 may be loaded on any page. No tag managers, no pixel trackers, no chat widgets.

### Design system rules

**RULE-G1.** The link hover color token is `#333333`. Never use `#555555` as a hover color for links. `#555555` is the secondary text color. Applying it to a hovered link signals deactivation, which is the wrong affordance.

**RULE-G2.** No accent color may be introduced. The palette is strictly black (`#111111`), white (`#FFFFFF`), and grey variants as defined in the color token table. If the client supplies a brand color later, stop and raise it as a change request before implementing.

**RULE-G3.** The in-page section navigation on the Home page is visible on desktop only. It must be hidden on mobile. No exceptions.

**RULE-G4.** The photo gallery layout is a masonry grid on desktop (3 columns), 2 columns on tablet, 1 column on mobile. Do not deviate from this layout.

### Build process rules

**RULE-B1.** The `prebuild` hook must run both the placeholder detection script and the data validation utility before `next build` executes. If either script fails, the build must not proceed.

**RULE-B2.** `next build` must complete with zero TypeScript errors and zero warnings. A build with suppressed errors (e.g., `@ts-ignore` without explanation) is a failed build.

**RULE-B3.** All content updates go through a feature branch. Merging directly to `main` without a verified Vercel preview deployment is not permitted.

**RULE-B4.** No `"use client"` directive may be added to any component that does not require React state or browser APIs. Only `PressFilter.tsx` and the mobile navigation toggle are permitted to be Client Components in v1. Any additional Client Component requires explicit justification.

---

## 4. How the work is arranged

This is the canonical folder structure. Do not reorganise it. Do not merge folders. Do not rename top-level directories without instruction.

```
/
├── app/
│   ├── layout.tsx              # Root layout: Header, Footer, font loading, GA4 script
│   ├── page.tsx                # Home page — biography + gallery
│   ├── press/
│   │   └── page.tsx            # Press Archive page
│   ├── work/
│   │   └── page.tsx            # Civic Work page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── not-found.tsx           # 404 page — includes noindex meta, links back to /
│   ├── sitemap.ts              # Auto-generated sitemap — four pages only, 404 excluded
│   └── robots.ts               # Auto-generated robots.txt — allows all, includes sitemap
│
├── components/
│   ├── Header.tsx              # Site name, nav links, active state, press contact link
│   ├── Footer.tsx              # Social links, copyright
│   ├── PhotoGallery.tsx        # Masonry grid — no lightbox, no modal, no carousel
│   ├── PressFilter.tsx         # "use client" — keyword input, publication select, year select
│   ├── PressEntryList.tsx      # Renders filtered press entries
│   ├── WorkCategory.tsx        # Renders one category section (H2 + entries)
│   └── WorkEntry.tsx           # Renders one work entry (H3, role, dates, description, link)
│
├── data/
│   ├── biography.ts            # server-only — name, tagline, biography sections
│   ├── press.ts                # server-only — PressEntry[] array
│   ├── work.ts                 # server-only — WorkEntry[] array
│   ├── contact.ts              # server-only — emails, address, socials
│   └── photos.ts               # server-only — GalleryPhoto[] array
│
├── lib/
│   └── formatDate.ts           # formatDate(date: "YYYY-MM"): string — render-time only
│
├── scripts/
│   ├── validate-data.ts        # Pre-build: checks required fields for blank/null values
│   └── detect-placeholders.ts  # Pre-build: fails build if [placeholder] pattern found in /data/
│
├── public/
│   ├── images/
│   │   └── gallery/            # Optimised gallery photos
│   └── og/
│       └── og-default.jpg      # OG image — minimum 1200x630px
│
├── styles/
│   └── globals.css             # Tailwind base/components/utilities + @font-face declarations
│
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

**Component placement rule:** If a component uses `useState`, `useEffect`, or any browser API, it goes in `/components/` with a `"use client"` directive and a comment explaining why client rendering is required. If it has no such dependency, it is a Server Component by default. Do not add `"use client"` to it.

**Lib rule:** Utilities that are pure functions with no framework dependency go in `/lib/`. Do not put business logic in `/components/` or `/data/`.

---

## 5. How the code must look

### Language

- TypeScript strict mode is on. `strict: true` in `tsconfig.json`. Do not relax it.
- All function parameters and return types are explicitly typed. No implicit `any`.
- All data structures match the typed interfaces defined in the PRD data layer exactly. Do not invent new fields without referencing a PRD requirement.

### Components

- Functional components only. No class components.
- Props interfaces are defined directly above the component that uses them, not in a separate types file unless shared across three or more components.
- One component per file. The file name matches the component name exactly.
- No default export magic that hides the component name. Use named exports. Use default export only where Next.js requires it (page files, layout files).

### Naming

- Files and folders: PascalCase for components, camelCase for utilities and data files, kebab-case for routes (Next.js App Router convention).
- Variables and functions: camelCase. Constants that are truly fixed values: SCREAMING_SNAKE_CASE.
- TypeScript interfaces: PascalCase, prefix with nothing. No `I` prefix.

### Tailwind

- Use design tokens from the PRD color table as Tailwind custom tokens in `tailwind.config.ts`. Do not hardcode hex values in class names.
- Do not use arbitrary Tailwind values (e.g., `w-[347px]`) unless there is no token equivalent and a comment explains why.
- Do not mix Tailwind with inline `style={}` props. Choose one approach per element.

### Comments

- Write a comment when a decision is non-obvious or when a rule in this file is the reason for a specific implementation choice. Reference the rule number (e.g., `// RULE-A4: visually hidden span pattern`).
- Do not write comments that describe what the code does. Write comments that explain why.
- Comments on privacy deferrals (RULE-V1) must include the phrase `// PRIVACY HOLD` so they are grep-able.

### Error handling

- Unexpected missing data (e.g., a required field that passes validation but is empty at render time) renders gracefully using the empty-state patterns defined in the PRD. Never throw an uncaught error to the user.
- External link failures are not caught. The site does not validate external URLs. This is intentional per the PRD.

---

## 6. What counts as done

After completing any task, produce this checklist and confirm every item. A task is not done until every applicable item is checked. The code must build with zero errors before this checklist is submitted.

```
TASK COMPLETION CHECKLIST

Build
[ ] `next build` completes with zero TypeScript errors
[ ] `next build` completes with zero warnings (or each warning is explained)
[ ] Pre-build placeholder detection script passes with zero findings
[ ] Pre-build data validation script passes with zero errors

Data layer
[ ] Every /data/ file begins with `import 'server-only'`
[ ] Work entry dates stored as "YYYY-MM", not "Month YYYY"
[ ] Press entry dates stored as "YYYY-MM-DD" ISO format
[ ] No hardcoded placeholder values in any data file

Rules compliance
[ ] Every gallery image has a non-empty, descriptive alt attribute (RULE-A1)
[ ] Heading hierarchy is correct on all affected pages: one H1, no skipped levels (RULE-A2)
[ ] Mobile nav focus trap implemented correctly (RULE-A3)
[ ] All external links contain the sr-only "(opens in new tab)" span (RULE-A4)
[ ] Focus rings are visible on all interactive elements: 2px solid #0057FF (RULE-A5)
[ ] Press filter uses <select> dropdowns only, no button groups (RULE-P4)
[ ] Contact page has zero form elements (RULE-P1)
[ ] Photo gallery has no lightbox, modal, or carousel (RULE-P2)
[ ] Work page has no filter or search UI (RULE-P7)
[ ] Press contact link is visible in the header on all pages (RULE-P9)
[ ] Person JSON-LD: canonical URL is in `url`, external profiles only in `sameAs` (RULE-S1)
[ ] 404 page carries noindex meta and is excluded from sitemap (RULE-S2)
[ ] Meta title separator is en dash (–) throughout (RULE-S3)
[ ] GA4 Measurement ID is read from environment variable only (RULE-V2)
[ ] keyword filter_value logging is withheld. PRIVACY HOLD comment present (RULE-V1)
[ ] No new "use client" directives beyond PressFilter.tsx and nav toggle (RULE-B4)

Scope
[ ] No v2 features introduced
[ ] No features from the Out of Scope table implemented
[ ] No third-party libraries added beyond the locked stack
[ ] No new data fields invented without a PRD reference

Performance
[ ] All pages are statically generated (no SSR)
[ ] Only PressFilter.tsx and mobile nav toggle are Client Components
[ ] Fonts loaded via next/font/google with display: 'swap' and latin subset
```

---

## 7. What the agent does when unsure

Follow these rules in order. Do not skip ahead.

**Rule 1: Stop before you invent.** If something is not described in the PRD and not covered by this file, do not build it. A missing specification is not an invitation to be creative.

**Rule 2: Check the PRD first.** Re-read the relevant section of `PRD_PublicFigurePortfolio_v1_1.md`. The answer is almost always there.

**Rule 3: Check this file second.** If the PRD answers the what but not the how, look here for the method.

**Rule 4: Ask, do not assume.** If the PRD and this file are both silent on a question, stop and surface the question as a comment or a flag. Write exactly what you need to know and why. Do not invent a solution to avoid asking.

**Rule 5: Never introduce scope to fill a gap.** If you cannot build something without adding a feature the PRD does not describe, the scope is the problem. Flag it. Do not add the feature.

**Rule 6: Never write spaghetti to unblock yourself.** If a clean implementation is not yet clear, write a stub that satisfies the type system and add a `// TODO: [description of what is needed]` comment. Do not write a tangled workaround and move on. The debt will be caught in the completion checklist.

**Rule 7: One question at a time.** When you surface an uncertainty, frame it as a single, specific, answerable question. Do not list five ambiguities and wait. The most blocking uncertainty goes first.
