# PRD: Public Figure Portfolio Website

---

## Document Header

| Field | Value |
|---|---|
| Project Name | Public Figure Portfolio Website |
| Version | 1.1 |
| Date | August 11, 2026 |
| Author | |
| Approver | |
| Status | Draft — Awaiting Client Content |
| Last Reviewed Date | August 11, 2026 |
| Next Review Trigger | Before development begins, or when any High-urgency open question is resolved |

---

## Executive Summary

This product is a four-page static portfolio website that serves as the authoritative digital presence for a Nigerian public figure. It functions simultaneously as a biographical record, a press archive, a civic portfolio, and a press kit. The primary audience is journalists, who need verified, well-organized information about the subject quickly, followed by media professionals, event organizers, and civic partners. The site solves the problem of a fragmented digital footprint by consolidating the subject's biography, media coverage, and public work into a single credible, fast, and search-optimized destination.

---

## Goals and Success Metrics

### Business Goals

- Establish a single authoritative digital presence for the subject.
- Surface existing press coverage in a format that journalists can act on immediately.
- Enable event organizers and civic partners to assess the subject's credentials and make contact without friction.
- Achieve strong organic search visibility for the subject's full name and primary title within 90 days of launch.

### User Goals

- Journalists find verified biographical information, high-resolution photos, and a complete press history without emailing a PR contact.
- Event organizers confirm the subject's credentials, areas of work, and booking contact in under three minutes.
- Civic partners review the subject's foundation and advisory commitments before initiating outreach.

### KPIs

| KPI | Target | Measurement Method | Timeline |
|---|---|---|---|
| Google Lighthouse Performance | 90+ | Lighthouse CLI / Vercel Analytics | At launch |
| Google Lighthouse Accessibility | 90+ | Lighthouse CLI | At launch |
| Google Lighthouse SEO | 90+ | Lighthouse CLI | At launch |
| Google Lighthouse Best Practices | 90+ | Lighthouse CLI | At launch |
| Page load time (4G) | Under 2 seconds | WebPageTest / Chrome DevTools | At launch |
| Press inquiry link clicks | Baseline to be set in Month 1. Target to be reviewed and agreed in Month 2. | GA4 event count | Monthly |
| Speaking/bookings link clicks | Baseline to be set in Month 1. Target to be reviewed and agreed in Month 2. | GA4 event count | Monthly |
| Organic search impressions (subject name) | Baseline established | Google Search Console | 60–90 days post-launch |

---

## User Personas

### Persona 1: Journalist / Media Professional

**Name:** Chisom Adeyemi
**Role:** Staff writer at a Lagos-based national newspaper, covers civic affairs and public interest stories

**Goals:**
- Verify biographical facts quickly before filing a story or making a request for comment.
- Find a usable press photo without having to email a publicist and wait 48 hours.
- Identify prior media coverage to understand what angles have already been covered.
- Locate the correct contact for press inquiries without hunting through a generic contact form.

**Frustrations:**
- Public figures with fragmented digital presences, forcing reliance on third-party sources that may be outdated or inaccurate.
- Websites that bury the press contact behind a general contact form.
- Photo galleries with low-resolution images or unclear usage rights.
- Biographical information scattered across unverified social media profiles.

**What they need from this site:**
- A clearly structured biography they can cross-reference and quote from.
- High-resolution photos they can download directly by opening the image in a new tab.
- A press archive that shows the full history of coverage so they can assess uniqueness of their angle.
- A direct press inquiry mailto link visible without scrolling — accessible from the persistent site header on every page.

---

### Persona 2: Event Organizer / Civic Partner

**Name:** Emeka Nwosu
**Role:** Director at a pan-African civic foundation, evaluates speakers and advisory board candidates

**Goals:**
- Assess the subject's professional credibility and public standing before initiating outreach.
- Understand the scope and nature of the subject's civic and philanthropic commitments.
- Find a speaking engagement or partnership contact without navigating multiple pages.
- Confirm that the subject has a verifiable, professional public record.

**Frustrations:**
- Public figures whose online presence consists only of social media, which signals a lack of institutional seriousness.
- Sites with no work history or credentials, requiring a separate background research step.
- Contact pages that offer only a generic form with no indication of who reads it or how quickly.

**What they need from this site:**
- A Work page that presents foundations, NGOs, and advisory roles with dates and context, organized by type.
- A biography that establishes the subject's trajectory and areas of expertise clearly.
- A direct speaking engagement mailto link.
- A professional, visually credible site that itself signals seriousness.

---

## Sitemap and Information Architecture

### Page Hierarchy

```
/ (Root)
├── / — Home (Biographical Profile)
├── /press — Press Archive
├── /work — Civic and Philanthropic Work
└── /contact — Contact
```

### URL Slugs

| Page | Slug |
|---|---|
| Home | `/` |
| Press | `/press` |
| Work | `/work` |
| Contact | `/contact` |

### Shared Components

| Component | Appears On |
|---|---|
| Header (site name + navigation + press contact link) | All pages |
| Footer (social links + copyright) | All pages |

### Header Contents

- Site name or wordmark (links to `/`)
- Navigation links: Home, Press, Work, Contact
- Active state on current page link
- A Press Inquiries link or email address is present in the site header on all pages, visually subdued, positioned in the top navigation bar. This may be a direct mailto link or a styled link to `/contact#press-inquiries`. This satisfies Persona 1's requirement to reach press contact without scrolling.

### Footer Contents

- Social media links (Twitter/X required at minimum; additional handles if provided by client)
- Copyright line: `© [YEAR] [Subject Full Name]. All rights reserved.` [ASSUMPTION: Copyright is held by the subject or their office.]

---

## Page-by-Page Functional Requirements

---

### Page 1: Home (`/`)

**Purpose:** Present a long-form, authoritative biography of the subject in editorial prose. Give visitors a complete picture of who the subject is, where they came from, and what they do.

#### Content Components

- **Page title (H1):** Subject's full name
- **Tagline or subtitle:** Subject's primary title or role, displayed beneath the name in a smaller typographic treatment
- **Biography body:** 1,500 to 2,500 words of prose, structured into named sections using H2 headings:
  - Early Life
  - Education [ASSUMPTION: Education is a meaningful part of the subject's public record and warrants its own section. Flag for client to confirm or remove.]
  - Career
  - Civic Work
  - Current Role
- **In-page section navigation:** [ASSUMPTION: A sticky or inline table of contents is included on desktop so visitors can jump to named sections without scrolling the full page. This is common on long-form editorial pages and improves usability.] A list of anchor links rendered above or beside the biography body, linking to each H2 section. Visible on desktop only. Hidden on mobile.
- **Photo gallery:** Displayed at the bottom of the page, below the biography. Masonry grid layout. Minimum 6 photos at launch. Each image links to the full-resolution version in a new tab (`target="_blank"` with `rel="noopener noreferrer"`). No lightbox. No modal. No carousel.
- **Gallery caption:** A single line above the gallery: `Photos` or `Gallery`. No individual photo captions unless the client supplies them.

#### Interactive Behaviors

- Clicking a photo opens the full-resolution image in a new browser tab.
- Anchor links in the table of contents scroll the page smoothly to the corresponding H2 section (`scroll-behavior: smooth` or Next.js scroll handling). `@media (prefers-reduced-motion: reduce)` is respected — smooth scrolling and transitions are disabled for users who have opted out.
- Navigation links in the header highlight the Home link as active.

#### Edge Cases

- If fewer than 6 photos are provided at launch, the gallery renders with whatever is available. The gallery does not display a placeholder grid for missing images. [ASSUMPTION]
- If the biography exists but falls below 1,500 words, the page renders as-is. Below 800 words is flagged as a credibility risk but does not block launch.
- If a photo file fails to load, the `<img>` element renders its `alt` text. Alt text must be provided for every image in the data file.

#### Empty States

- If no photos are provided, the gallery section does not render. The biography renders in full.
- If biography sections have no content for a named heading (e.g., client skips Civic Work), that H2 and its block are omitted from the rendered output. [ASSUMPTION]

---

### Page 2: Press (`/press`)

**Purpose:** Provide a searchable, chronological archive of all significant media coverage. Serve as a living media file journalists and editors can reference.

#### Content Components

- **Page title (H1):** `Press` or `Media Coverage` [ASSUMPTION: `Press` as H1 unless client specifies a preferred label.]
- **Optional introductory line:** One sentence below the H1 summarizing the archive. [ASSUMPTION: Included but optional. Client can leave it blank.]
- **Filter controls:**
  - Keyword search input: filters by article title, publication name, and summary text simultaneously. Filter fires synchronously on each keystroke. No debounce. Add 150ms debounce only if entry count exceeds 500.
  - Publication filter: a `<select>` dropdown listing all unique publication names present in the data, auto-populated and sorted alphabetically. Do not use a button group — it does not scale beyond 10–15 items.
  - Year filter: a `<select>` dropdown listing all unique years present in the data.
  - All filters operate client-side. No page reload on filter change.
  - A `Clear filters` button resets all three controls simultaneously.
- **Press entry list:** Chronological order, newest first (descending by date). Each entry contains:
  - Publication name (styled as a label or eyebrow text)
  - Date (formatted as `DD Month YYYY`, e.g., `14 March 2025`)
  - Article title (clickable, links to external URL, opens in new tab with `rel="noopener noreferrer"`)
  - One-line summary (plain text, not a link)
  - A visible external link indicator (e.g., arrow icon or `↗`) on the article title link

#### Interactive Behaviors

- Keyword input filters the entry list in real time on each keystroke, synchronously.
- Publication and year dropdowns filter the list immediately on selection change.
- All three filters compound: applying a keyword and a year simultaneously shows only entries matching both.
- Active filter state is visible (e.g., dropdown shows selected value, not placeholder text).
- `Clear filters` button is only visible when at least one filter is active.

#### Edge Cases

- If filters return zero results, display the empty state message (see below). Do not show a broken or empty grid.
- If the data file contains entries with missing dates, those entries sort to the bottom of the list. [ASSUMPTION]
- If an external URL is broken or unavailable, the link still renders. The site does not validate external URLs at build time. [ASSUMPTION]
- If the publication name field is blank for an entry, the publication label renders as `Unknown Publication`. [ASSUMPTION]

#### Empty States

- Zero filter results: Display the message `No press entries match your search. Try adjusting the filters.` Render the `Clear filters` button below the message.
- Zero total press entries (data file is empty): Display the message `Press archive coming soon.` Hide filter controls entirely.

---

### Page 3: Work (`/work`)

**Purpose:** Document the subject's civic and philanthropic commitments in an organized, verifiable format. Allow visitors to understand the breadth and depth of the subject's public work.

#### Content Components

- **Page title (H1):** `Work` [ASSUMPTION: Unless client supplies a preferred label such as `Civic Work` or `Public Service`.]
- **Optional introductory paragraph:** Two to four sentences describing the subject's overall civic mission. Client supplies. [ASSUMPTION: Included and recommended.]
- **Category sections:** Entries are grouped by type. Each category renders as a named H2 section:
  - Foundations
  - Non-Governmental Organizations (NGOs)
  - Advisory Roles
  - [ASSUMPTION: These three are the default categories. Additional categories can be added if client supplies entries that do not fit these three.]
- **Within each category:** Entries are sorted by start date, most recent first. Sorting uses the raw `YYYY-MM` date field and is therefore chronologically correct.
- **Each work entry contains:**
  - Organization name (H3 or equivalent heading level)
  - Role or title held
  - Date range (formatted at render time as `Month YYYY – Month YYYY` or `Month YYYY – Present`)
  - Short description: two to five sentences of context about the organization and the subject's involvement
  - `Learn more` link (external URL, opens in new tab with `rel="noopener noreferrer"`). Link is optional; entry renders without it if no URL is provided.

#### Interactive Behaviors

- No filters. No search. Work page is read-only and fully static.
- `Learn more` links open in a new tab.
- Navigation links in the header highlight the Work link as active.

#### Edge Cases

- If a category has zero entries (e.g., no Foundations in the data), that H2 section does not render. No empty category heading appears on the page.
- If a date range has no end date, render `Present` as the end value.
- If a `Learn more` URL is not provided, the link does not render. No broken or placeholder link appears.
- If the description field is blank, the entry renders without a description block rather than showing an empty paragraph. [ASSUMPTION]

#### Empty States

- If the entire work data file is empty, display the message `Work history coming soon.` and hide category sections.

---

### Page 4: Contact (`/contact`)

**Purpose:** Give press and booking contacts a direct, frictionless path to reach the subject's office. No form. No clutter.

#### Content Components

- **Page title (H1):** `Contact`
- **Press Inquiries block:**
  - Label: `Press Inquiries`
  - Email address rendered as a `mailto:` link
  - [ASSUMPTION: A one-line description is included: e.g., `For interview requests, media coverage, and press materials.`]
- **Speaking Engagements block:**
  - Label: `Speaking Engagements`
  - Email address rendered as a `mailto:` link
  - [ASSUMPTION: A one-line description is included: e.g., `For keynote invitations, panel appearances, and public lectures.`]
- **Office Address block:**
  - Label: `Office`
  - Full postal address rendered as plain text (not a map embed)
  - [ASSUMPTION: No map embed. A map would add third-party JavaScript dependencies and is inconsistent with the site's performance and editorial design goals.]
- **Social media links block:**
  - Label: `Follow`
  - Each handle listed with platform name and linked to the profile URL
  - Opens in a new tab with `rel="noopener noreferrer"`
  - Twitter/X is required. Additional platforms included if client provides handles.

#### Interactive Behaviors

- Clicking a `mailto:` link opens the user's default email client.
- Clicking a social link opens the profile in a new tab.
- Navigation links in the header highlight the Contact link as active.

#### Edge Cases

- If only one email address is provided for both press and bookings, both blocks render with the same address. [ASSUMPTION: This is acceptable at launch. Flag as open question for client.]
- If the office address is not provided, the Office block does not render.
- If social handles beyond Twitter/X are not provided, only Twitter/X renders.

#### Empty States

- This page has no dynamic data. It does not have a meaningful empty state. If the client has not yet provided email addresses, the developer renders placeholder text (`press@[domain]` and `bookings@[domain]`) that is replaced before launch. A pre-build script will fail the build if any `[placeholder]` patterns remain in data files (see Technical Architecture).

---

## Content Requirements

The developer requires all of the following from the client before launch. Items marked **Required** block launch. Items marked **Recommended** are included if provided but do not block launch.

### Biography and Identity

- [ ] **Required** Full legal name and any preferred public name variant
- [ ] **Required** Primary title or tagline (e.g., `Founder, [Foundation Name] | Civic Leader`)
- [ ] **Required** Biography text. Target: 1,500 to 2,500 words, structured with the following sections: Early Life, Education, Career, Civic Work, Current Role. Below 800 words is flagged as a credibility risk but does not block launch. Client may supply rough notes; developer will shape into prose. [ASSUMPTION: Developer has editorial responsibility for shaping notes into publishable prose if client cannot supply finished copy.]
- [ ] **Recommended** A preferred one-line introductory description of the subject (used in OG metadata and as a page subtitle)

### Photography

- [ ] **Required** Minimum 6 photos, high resolution (minimum 1,200px on the longest side), suitable for public web use
- [ ] **Required** Client confirmation that all submitted photos are cleared for public web publication with no attribution requirement, or explicit attribution text if required
- [ ] **Recommended** Alt text descriptions for each photo. If not provided, developer writes descriptive alt text. [ASSUMPTION]
- [ ] **Recommended** One designated primary photo for use in Open Graph metadata (the image that appears when the page is shared on social media). If not designated, the developer selects one from the gallery. [ASSUMPTION]

### Press Archive

- [ ] **Required** At least 1 press entry for the archive to launch in non-empty state. Format per entry: Publication Name | Date (YYYY-MM-DD) | Article Title | One-line summary | External URL
- [ ] **Recommended** All significant press entries the client can supply. Target: 10 or more entries at launch.

### Work History

- [ ] **Required** At least 1 work entry per category the client wants to display. Format per entry: Organization Name | Category (Foundation / NGO / Advisory Role) | Role/Title | Start Date (YYYY-MM) | End Date (YYYY-MM or `Present`) | Short description (2–5 sentences) | Learn more URL (optional)
- [ ] **Recommended** External URLs for `Learn more` links where available

### Contact Details

- [ ] **Required** Press inquiry email address
- [ ] **Required** Speaking engagements email address (can be the same as press if only one address exists)
- [ ] **Required** Office postal address, or confirmation that this field should be omitted
- [ ] **Required** Twitter/X handle or profile URL
- [ ] **Recommended** Additional social media handles (LinkedIn, Instagram, Facebook, YouTube — include only what is active and regularly maintained) [ASSUMPTION: Inactive profiles are excluded at client's direction.]

### Domain and Branding

- [ ] **Required** Domain name or confirmation that the developer should recommend one [ASSUMPTION]
- [ ] **Required** Preferred site name or wordmark text for the header (e.g., full name, initials, or a short title)
- [ ] **Recommended** Favicon image or instruction to use initials as a text-based favicon [ASSUMPTION]

---

## Design Requirements

### Typography

| Role | Typeface | Weight(s) | Notes |
|---|---|---|---|
| Display / Headings (H1, H2) | Playfair Display | 700 (Bold) | Loaded via Google Fonts. Subset to Latin characters. |
| Sub-headings (H3, H4) | Playfair Display | 400 (Regular) or 600 (SemiBold) | Used for work entry organization names and press publication labels. |
| Body text | Inter | 400 (Regular) | All paragraph text, summaries, descriptions. |
| UI labels, captions, navigation | Inter | 500 (Medium) or 600 (SemiBold) | Filter labels, nav links, category eyebrows. |

**Type Scale (mobile-first, in rem):**

| Element | Mobile | Desktop |
|---|---|---|
| H1 | 2rem (32px) | 3rem (48px) |
| H2 | 1.5rem (24px) | 2rem (32px) |
| H3 | 1.25rem (20px) | 1.5rem (24px) |
| Body | 1rem (16px) | 1.125rem (18px) |
| Caption / Label | 0.875rem (14px) | 0.875rem (14px) |

**Line Height:**
- Body text: 1.75
- Headings: 1.2
- Labels and captions: 1.4

### Color Tokens

| Token Name | Hex Value | Usage |
|---|---|---|
| `color-background` | `#FFFFFF` | Page background |
| `color-text-primary` | `#111111` | All primary text |
| `color-text-secondary` | `#555555` | Secondary text, captions, dates, summaries |
| `color-border` | `#E5E5E5` | Dividers, input borders, card borders |
| `color-link` | `#111111` | Link text (same as primary; underlined) |
| `color-link-hover` | `#333333` | Link text on hover. On hover, text links retain their underline and transition to `#333333`. Links that already have underlines transition to `#333333`. This distinguishes hover from the default and visited states without signalling deactivation. |
| `color-focus` | `#0057FF` | Keyboard focus outline. Chosen for WCAG AA contrast against white. |

[ASSUMPTION: No accent color is used. The design is strictly black, white, and grey. If the client supplies a brand color, this token set should be revisited.]

### Meta Title Separator

The title separator character is an en dash (–, U+2013) with a single space on each side. Example: `Press – Adaeze Okonkwo`. Do not use an em dash or a hyphen. This applies consistently across all page meta titles.

### Spacing System

- Base unit: 4px
- Common spacing values: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Section vertical padding: 64px on desktop, 48px on mobile
- Max content width: 720px for biography text; 960px for press and work entry lists; 1200px for the overall page container [ASSUMPTION]
- Horizontal page padding: 24px on mobile, 48px on tablet, auto-centering via container on desktop

### Responsive Behavior

- Mobile-first. All components are designed for the smallest viewport first and enhanced for larger viewports.
- Breakpoints:

| Name | Min Width | Use |
|---|---|---|
| `sm` | 640px | Minor layout adjustments |
| `md` | 768px | Two-column layouts where applicable |
| `lg` | 1024px | Desktop header, sidebar table of contents on Home |
| `xl` | 1280px | Max content width capping |

- Navigation: On mobile, the header navigation collapses into a hamburger menu or a stacked list below the site name. [ASSUMPTION: A hamburger/toggle menu is implemented for mobile. This is the only interactive JavaScript component in the header.]
- Photo gallery: Masonry grid on desktop (3 columns). Two columns on tablet. Single column on mobile. [ASSUMPTION]
- Press and Work entry lists: Single column on all viewports.

### Image Handling Rules

- All gallery images use `next/image` for automatic optimization (WebP conversion, lazy loading, responsive `srcset`).
- Provide `width` and `height` attributes to prevent layout shift (CLS).
- `alt` text is required for every image. No empty `alt=""` on gallery images (they are informational, not decorative).
- Gallery images link to the original uploaded file at full resolution via a standard `<a>` tag wrapping the `<Image>` component.
- Open Graph image: minimum 1200px x 630px, JPEG or PNG.

### Accessibility Notes in Design

- Minimum color contrast ratio: 4.5:1 for normal text, 3:1 for large text (WCAG 2.1 AA).
- Focus outline: visible, 2px solid `#0057FF`, on all interactive elements.
- No color-only information encoding. All status indicators use text or icons alongside color.
- Hover and focus states are distinct from each other and from the default state.

---

## Technical Architecture

### Stack

| Layer | Technology | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | Static generation, built-in image optimization, metadata API, file-based routing, Vercel-native |
| Language | TypeScript | Type safety for content data structures, reduces runtime errors |
| Styling | Tailwind CSS | Utility-first, no unused CSS in production, consistent spacing and color tokens |
| Fonts | Google Fonts (self-hosted via `next/font`) | Eliminates third-party font request, improves performance and privacy |
| Images | `next/image` | Automatic WebP conversion, responsive srcset, lazy loading, layout shift prevention |
| Analytics | Google Analytics 4 via `@next/third-parties` | Official Next.js GA4 integration, loads asynchronously, does not block rendering |
| Deployment | Vercel | Zero-config Next.js hosting, automatic preview deployments, global CDN |

### Folder Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout: header, footer, font loading, GA4 script
│   ├── page.tsx            # Home page
│   ├── press/
│   │   └── page.tsx        # Press archive page
│   ├── work/
│   │   └── page.tsx        # Work history page
│   ├── contact/
│   │   └── page.tsx        # Contact page
│   ├── sitemap.ts          # Auto-generated sitemap via Next.js metadata API
│   └── robots.ts           # Auto-generated robots.txt via Next.js metadata API
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── PhotoGallery.tsx
│   ├── PressFilter.tsx     # Client component (uses React state for filtering)
│   ├── PressEntryList.tsx
│   ├── WorkCategory.tsx
│   └── WorkEntry.tsx
├── data/
│   ├── biography.ts        # Subject name, tagline, biography sections as typed objects
│   ├── press.ts            # Array of press entry objects
│   ├── work.ts             # Array of work entry objects, grouped by category
│   ├── contact.ts          # Email addresses, office address, social handles
│   └── photos.ts           # Array of photo objects: src, alt, fullResolutionSrc
├── public/
│   ├── images/
│   │   └── gallery/        # Uploaded gallery photos (optimized at build time)
│   └── og/
│       └── og-default.jpg  # Default Open Graph image
├── scripts/
│   └── validate-data.ts    # Pre-build validation and placeholder detection
├── styles/
│   └── globals.css         # Tailwind base/components/utilities + font-face declarations
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

### Data Layer

All content is stored as typed TypeScript objects in the `/data/` directory. No database. No API calls at runtime for content.

Every file in `/data/` must begin with `import 'server-only'` as its first import. This causes a build-time error if the file is accidentally imported in a Client Component, preventing content data from being bundled into the client JavaScript payload.

**`data/biography.ts` structure:**
```typescript
import 'server-only'

export const biography = {
  name: string,
  tagline: string,
  sections: Array<{
    id: string,       // used for anchor links, e.g. "early-life"
    heading: string,  // H2 label, e.g. "Early Life"
    content: string,  // Raw prose. Can be multiline. Rendered as paragraphs.
  }>
}
```

**`data/press.ts` structure:**
```typescript
import 'server-only'

export const pressEntries: PressEntry[] = [
  {
    publication: string,
    date: string,           // ISO 8601: "YYYY-MM-DD"
    title: string,
    summary: string,
    url: string,
    videoEmbedUrl?: string, // Optional. Unused in v1. Included to prevent a breaking change in v2.
  }
]
```

**`data/work.ts` structure:**
```typescript
import 'server-only'

export const workEntries: WorkEntry[] = [
  {
    category: "Foundation" | "NGO" | "Advisory Role",
    organization: string,
    role: string,
    startDate: string,   // "YYYY-MM" — stored in this format for correct chronological sorting
    endDate: string,     // "YYYY-MM" or "Present"
    description: string,
    learnMoreUrl?: string,
  }
]
```

Date display: A `formatDate(date: string): string` utility converts `"YYYY-MM"` to `"Month YYYY"` at render time. All sorting uses the raw `"YYYY-MM"` string, which sorts chronologically.

**`data/contact.ts` structure:**
```typescript
import 'server-only'

export const contactInfo = {
  pressEmail: string,
  bookingsEmail: string,
  officeAddress?: string,
  socials: Array<{ platform: string, handle: string, url: string }>
}
```

**`data/photos.ts` structure:**
```typescript
import 'server-only'

export const galleryPhotos: GalleryPhoto[] = [
  {
    src: string,             // Path to optimized image in /public/images/gallery/
    fullResSrc: string,      // Path to full-resolution version
    alt: string,
    width: number,
    height: number,
  }
]
```

### Pre-Build Scripts

Two scripts run as part of the build process, before `next build`. Both are defined in `package.json` under a `prebuild` hook.

**Placeholder detection:** A script that searches all files in `/data/` for strings matching the pattern `/\[[^\]]+\]/g` (i.e., any text inside square brackets). If any match is found, the build fails with a descriptive error listing the file name, field name, and matched string. This prevents placeholder values such as `press@[domain]` from shipping to production.

**Data validation:** A validation utility checks all entries in all data files for blank, whitespace-only, or null values in required fields. Build fails with a descriptive error listing file, field, and entry index if any required field is empty.

### Content Update Process

1. Client sends change requests via email to the developer.
2. Email must include the page name, the field to change, and the new value. [ASSUMPTION: A simple shared Google Doc or Notion page can serve as a structured change log if the client prefers. This is optional.]
3. For press entries, client supplies: Publication Name, Date, Article Title, One-line Summary, URL.
4. For work entries, client supplies: all fields as listed in Content Requirements.
5. For photos, client supplies: image files at full resolution via Google Drive, WeTransfer, or equivalent. [ASSUMPTION]
6. Developer applies the change in a feature branch.
7. Developer verifies the change in the Vercel preview deployment before merging.
8. Developer merges the feature branch to main. Vercel automatically rebuilds and redeploys the production site. Downtime is zero.

| Update Type | File to Edit | Estimated Effort |
|---|---|---|
| Add a press entry | `data/press.ts` | 5 minutes |
| Edit biography text | `data/biography.ts` | 10–30 minutes |
| Add a work entry | `data/work.ts` | 10 minutes |
| Add a gallery photo | `data/photos.ts` + upload to `/public/images/gallery/` | 10 minutes |
| Update contact details | `data/contact.ts` | 5 minutes |
| Update social links | `data/contact.ts` | 5 minutes |

### Routing

- All routes use the Next.js 14 App Router with `generateStaticParams` where applicable.
- All pages are statically generated at build time (`export const dynamic = 'force-static'` or default static behavior).
- No dynamic routes in v1.
- 404 page: Next.js default `not-found.tsx` with a brief message and a link back to `/`. The 404 page carries `<meta name="robots" content="noindex">` and is excluded from the sitemap. [ASSUMPTION]

### Metadata Generation

- Each page exports a `generateMetadata` function returning title, description, and Open Graph fields.
- Root `layout.tsx` defines default metadata inherited by all pages.
- `sitemap.ts` exports a default function returning all four static page URLs with `lastModified` set to the build date.
- `robots.ts` exports a default function allowing all crawlers and pointing to the sitemap URL.

### Analytics Integration

- GA4 is loaded via `@next/third-parties/google` `<GoogleAnalytics>` component in `app/layout.tsx`.
- This defers the GA script to avoid render-blocking.
- Custom event calls use `sendGAEvent` from `@next/third-parties/google`.
- No cookie consent banner is included in v1. [ASSUMPTION: If the client's legal counsel determines NDPR or GDPR consent is required, a consent banner is added as a v1.1 task. This is flagged as an open question.]

### Performance Strategy

- `next/font` self-hosts Playfair Display and Inter, eliminating third-party font DNS lookups.
- `next/image` handles all gallery images with automatic WebP output and lazy loading.
- No client-side JavaScript except the PressFilter component and the mobile navigation toggle.
- No third-party scripts except GA4 (loaded deferred).
- Tailwind CSS purges all unused classes at build time, keeping the CSS bundle minimal.
- All pages are statically generated. Vercel serves them from its edge CDN with no server compute on request.

---

## SEO Requirements

### Page-Level Meta Title Templates

| Page | Meta Title Format | Example |
|---|---|---|
| Home | `[Full Name] – [Primary Title]` | `Adaeze Okonkwo – Civic Leader and Foundation Chair` |
| Press | `Press – [Full Name]` | `Press – Adaeze Okonkwo` |
| Work | `Work – [Full Name]` | `Work – Adaeze Okonkwo` |
| Contact | `Contact – [Full Name]` | `Contact – Adaeze Okonkwo` |

Separator is an en dash (–, U+2013) with a single space on each side. See Design Requirements.

### Page-Level Meta Description Templates

| Page | Description Format | Character Target |
|---|---|---|
| Home | `The official profile of [Full Name]. [One sentence on their primary role and significance.]` | 140–160 chars |
| Press | `A complete archive of media coverage featuring [Full Name]. Interviews, features, and press.` | 140–160 chars |
| Work | `[Full Name]'s record of foundations, NGOs, and advisory roles. A full account of their civic commitments.` | 140–160 chars |
| Contact | `Contact [Full Name] for press inquiries, speaking engagements, and official correspondence.` | 140–160 chars |

### Open Graph Metadata (all pages)

| Field | Value |
|---|---|
| `og:type` | `website` |
| `og:site_name` | Subject's full name |
| `og:title` | Same as page meta title |
| `og:description` | Same as page meta description |
| `og:image` | Absolute URL to `/public/og/og-default.jpg` (minimum 1200x630px) |
| `og:url` | Canonical page URL |
| `og:locale` | `en_NG` [ASSUMPTION] |

### Twitter Card Metadata (all pages)

| Field | Value |
|---|---|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Same as page meta title |
| `twitter:description` | Same as page meta description |
| `twitter:image` | Same as `og:image` |
| `twitter:site` | Client's Twitter/X handle |
| `twitter:creator` | Client's Twitter/X handle |

### Sitemap

- Auto-generated at `/sitemap.xml` via `app/sitemap.ts`.
- Includes all four static pages. The 404 page is excluded.
- `lastModified` set to the build timestamp.
- `changeFrequency`: `monthly` for Home and Work; `weekly` for Press. [ASSUMPTION]
- `priority`: `1.0` for Home, `0.8` for Press, `0.8` for Work, `0.6` for Contact. [ASSUMPTION]

### robots.txt

- Auto-generated at `/robots.txt` via `app/robots.ts`.
- Allows all crawlers.
- Includes `Sitemap:` directive pointing to the absolute sitemap URL.

### Structured Data

- Home page: Add `Person` schema (JSON-LD) in the `<head>`. The `url` field contains the site's canonical URL. The `sameAs` array contains the URLs of the subject's external social profiles and any Wikipedia or Wikidata entries. Do not place the site's own URL in `sameAs` — `sameAs` links point outward to external profiles only. [ASSUMPTION: This is a lightweight addition that directly improves how Google represents the subject in Knowledge Panels. Recommended.]
- Other pages: No structured data in v1. [ASSUMPTION]

---

## Accessibility Requirements

All requirements target WCAG 2.1 Level AA compliance.

### Color Contrast

- Normal text (body, labels): minimum 4.5:1 contrast ratio against background.
- Large text (H1, H2 at their specified sizes): minimum 3:1 contrast ratio.
- `#111111` on `#FFFFFF` achieves a ratio of 19.1:1. All primary text passes.
- `#555555` on `#FFFFFF` achieves a ratio of 7.4:1. All secondary text passes.
- Focus outline `#0057FF` on `#FFFFFF` achieves a ratio of 5.9:1. Passes for UI components.

### Keyboard Navigation

- Every interactive element (navigation links, press entry links, filter controls, mailto links, social links, photo links) is reachable and operable via Tab key.
- Tab order follows the visual reading order: Header > Main content > Footer.
- The mobile navigation toggle must be operable via keyboard (Enter and Space activate it).
- When the mobile navigation menu is open, keyboard focus is trapped within the menu until the user closes it via Escape or the close button. Focus returns to the toggle button on close. This is intentional and required for WCAG 2.1 AA compliance. There are no unintentional keyboard traps anywhere on the site.
- The PressFilter component's keyword input, publication dropdown, and year dropdown are all keyboard-accessible.
- The `Clear filters` button is reachable via Tab and operable via Enter/Space.

### Screen Reader Compatibility

- All images have descriptive `alt` text. Decorative images (if any) use `alt=""`.
- All interactive elements have accessible names. Icon-only buttons include `aria-label`.
- The header `<nav>` element includes `aria-label="Main navigation"`.
- Active navigation links include `aria-current="page"`.
- The press filter section is wrapped in a `<fieldset>` with a `<legend>` describing the filter group. [ASSUMPTION]
- Heading hierarchy is strict: one H1 per page, H2 for sections, H3 for sub-items. No skipped heading levels.
- External links include a visually hidden `<span className="sr-only">(opens in new tab)</span>` inside the anchor element. Do not use `aria-label` on these links — the visually hidden span is the specified pattern.

### Focus States

- All focusable elements display a visible focus ring.
- Focus ring: 2px solid `#0057FF`, 2px offset.
- Focus styles are not suppressed with `outline: none` unless a custom equivalent is provided.
- `@media (prefers-reduced-motion: reduce)` is respected. No smooth scrolling or transitions for users who have opted out.

### Forms and Inputs

- The keyword input in the PressFilter has a visible `<label>` element associated via `for` / `id`.
- Dropdown filters have visible labels.
- No custom form elements that break native browser accessibility.

---

## Performance Requirements

### Targets

| Metric | Target | Tool |
|---|---|---|
| Lighthouse Performance | 90+ | Lighthouse CLI, Vercel Speed Insights |
| Lighthouse Accessibility | 90+ | Lighthouse CLI |
| Lighthouse SEO | 90+ | Lighthouse CLI |
| Lighthouse Best Practices | 90+ | Lighthouse CLI |
| First Contentful Paint (FCP) | Under 1.5s | WebPageTest, Chrome DevTools |
| Largest Contentful Paint (LCP) | Under 2.0s | WebPageTest |
| Cumulative Layout Shift (CLS) | Under 0.1 | Chrome DevTools |
| Total Blocking Time (TBT) | Under 200ms | Lighthouse |
| Page load (4G emulated) | Under 2s | WebPageTest |

If any Core Web Vitals target is missed at pre-launch testing, the launch is paused until the metric is resolved.

### WebPageTest Configuration

- Location: Lagos, Nigeria or Johannesburg, South Africa (nearest available node to the target audience).
- Connection type: 4G preset (9 Mbps, 170ms RTT).
- Run against the Vercel preview URL before domain connection.

### Strategy

**Fonts:**
- Load Playfair Display and Inter via `next/font/google`. This self-hosts the fonts on Vercel's CDN and eliminates the Google Fonts DNS lookup.
- Specify `display: 'swap'` to prevent invisible text during font load.
- Subset fonts to `latin` character set only.

**Images:**
- Use `next/image` for all gallery images. Next.js converts to WebP, generates multiple sizes, and serves the correct size per device.
- Specify `width` and `height` on every `<Image>` component to prevent CLS.
- Set `priority` prop on the first visible image (if any image appears above the fold on Home). [ASSUMPTION: The Home page biography is text-only until the gallery at the bottom, so no `priority` image is required unless a portrait photo is added above the biography. Flag for review.]
- Lazy load all gallery images by default (Next.js default behavior).

**JavaScript:**
- All pages are Server Components by default in Next.js 14. Only `PressFilter.tsx` and the mobile nav toggle require `"use client"`.
- No third-party JavaScript except GA4, loaded via `@next/third-parties` which defers the script automatically.
- No UI component library. No animation library. No carousel library.

**CSS:**
- Tailwind CSS purges all unused utility classes at build time.
- No global CSS beyond the Tailwind base layer and font declarations.

**Delivery:**
- Vercel serves all static assets from its global edge CDN with automatic caching headers.
- No server-side rendering. All pages are fully static.

### Measurement

- Developer runs Lighthouse locally and via Vercel's built-in Speed Insights before launch.
- Vercel Speed Insights is enabled on the production deployment to track real-user Core Web Vitals post-launch.
- WebPageTest is used to simulate 4G load time before launch sign-off, run from Lagos or Johannesburg.

---

## Analytics and Tracking Plan

### GA4 Setup

- Measurement ID provided by client after they create a GA4 property. [ASSUMPTION: Client creates the GA4 property and provides the Measurement ID (`G-XXXXXXXXXX`) to the developer.]
- GA4 loaded in `app/layout.tsx` via `<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />`.
- Measurement ID stored in `.env.local` as `NEXT_PUBLIC_GA_ID` and in Vercel environment variables for production.
- Standard GA4 pageview tracking is automatic via the component.

### Custom Dimensions

Before launch, two custom dimensions must be created in the GA4 property. Without them, event parameters are not visible in standard GA4 reports:

- `link_type` — Event scope. Distinguishes press email clicks from bookings email clicks in the `contact_click` event.
- `filter_type` — Event scope. Categorizes which filter was applied in the `filter_applied` event.

### Custom Events

| Event Name | Trigger | Parameters |
|---|---|---|
| `contact_click` | User clicks press inquiry mailto link | `{ link_type: "press_email", link_url: "mailto:..." }` |
| `contact_click` | User clicks speaking/bookings mailto link | `{ link_type: "bookings_email", link_url: "mailto:..." }` |
| `social_click` | User clicks any social media link in footer or Contact page | `{ platform: "twitter" \| "linkedin" \| etc., location: "footer" \| "contact_page" }` |
| `press_entry_click` | User clicks an article title link in the Press archive | `{ publication: string, article_title: string }` |
| `work_entry_click` | User clicks a `Learn more` link on the Work page | `{ organization: string, category: string }` |
| `photo_click` | User clicks a gallery photo on the Home page | `{ photo_alt: string }` |
| `filter_applied` | User applies any filter on the Press page | `{ filter_type: "keyword" \| "publication" \| "year", filter_value: string }` |

All events use `sendGAEvent` from `@next/third-parties/google`, called in `onClick` handlers on the relevant elements.

### Privacy Note: Keyword Filter Logging

The `filter_applied` event logs user-typed keyword values. This constitutes user-generated search data and may have implications under NDPR or GDPR depending on whether a consent requirement is confirmed. Disable logging of the `filter_value` parameter for `filter_type: "keyword"` until privacy compliance is confirmed. Log `filter_type` only until resolved.

---

## Launch Checklist

### Content

- [ ] Full name and tagline confirmed and entered in `data/biography.ts`
- [ ] Biography text complete (1,500–2,500 words) and entered in `data/biography.ts`
- [ ] All biography sections (Early Life, Education, Career, Civic Work, Current Role) populated
- [ ] Minimum 6 gallery photos uploaded to `/public/images/gallery/`
- [ ] Alt text written for every gallery photo
- [ ] Primary OG image uploaded to `/public/og/og-default.jpg` (min 1200x630px)
- [ ] Press archive contains at least 1 real entry in `data/press.ts`
- [ ] Work history contains at least 1 entry per displayed category in `data/work.ts`
- [ ] Press email address entered in `data/contact.ts`
- [ ] Bookings email address entered in `data/contact.ts`
- [ ] Office address entered or field intentionally omitted in `data/contact.ts`
- [ ] Twitter/X handle and all other social handles entered in `data/contact.ts`
- [ ] Copyright year and name correct in footer

### Design QA

- [ ] All four pages reviewed on iPhone SE (375px width) — smallest common mobile viewport
- [ ] All four pages reviewed on iPad (768px width)
- [ ] All four pages reviewed on desktop at 1440px width
- [ ] Typography renders correctly (Playfair Display for headings, Inter for body)
- [ ] No layout overflow on any viewport
- [ ] Photo gallery renders in masonry grid on desktop, 2-column on tablet, 1-column on mobile
- [ ] Press filter controls are usable on mobile
- [ ] Empty states tested: empty press archive, zero filter results, missing optional fields
- [ ] All external links open in a new tab
- [ ] All mailto links open the correct email address in the default mail client
- [ ] No placeholder text remains in the production build
- [ ] Press contact link is visible in the header on all four pages without scrolling

### Technical

- [ ] Pre-build placeholder detection script passes with zero findings
- [ ] Pre-build data validation script passes with zero errors
- [ ] `next build` runs without TypeScript errors or warnings
- [ ] No console errors in production build
- [ ] All environment variables (`NEXT_PUBLIC_GA_ID`) set in Vercel production environment
- [ ] Custom domain connected and SSL certificate active on Vercel
- [ ] 404 page renders correctly for unknown routes
- [ ] 404 page carries `<meta name="robots" content="noindex">`
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] All four pages return HTTP 200
- [ ] No broken internal links
- [ ] Content update deployed via feature branch and verified in preview before merging

### SEO

- [ ] Meta title and description set for all four pages
- [ ] En dash separator used consistently in all meta titles
- [ ] Open Graph metadata verified for all four pages using https://opengraph.xyz or equivalent
- [ ] Twitter card metadata verified using Twitter Card Validator
- [ ] `og:image` is reachable at its absolute URL and meets minimum dimensions (1200x630px)
- [ ] `Person` JSON-LD structured data added to Home page `<head>`
- [ ] `url` field in Person schema holds the site's canonical URL
- [ ] `sameAs` array in Person schema contains only external profile URLs
- [ ] Rich Results Test run on Home page to confirm structured data is valid
- [ ] Google Search Console property created and sitemap submitted
- [ ] Site is not blocked by `noindex` or robots.txt in production

### Analytics

- [ ] GA4 Measurement ID set in Vercel production environment variables
- [ ] GA4 custom dimensions `link_type` and `filter_type` created in GA4 property
- [ ] GA4 pageview firing confirmed on all four pages using GA4 DebugView
- [ ] All custom events in the tracking plan tested and confirmed firing in GA4 DebugView
- [ ] Keyword filter value logging disabled until NDPR/privacy compliance is confirmed
- [ ] Vercel Speed Insights enabled on the production project

### Accessibility

- [ ] Lighthouse Accessibility score is 90+ on all four pages
- [ ] Keyboard navigation tested on all four pages (Tab through all interactive elements)
- [ ] Mobile navigation keyboard trap tested: focus stays within open menu, Escape closes it, focus returns to toggle
- [ ] Screen reader test completed on Home and Press pages using VoiceOver (macOS) or NVDA (Windows) [ASSUMPTION]
- [ ] All images have non-empty, descriptive alt text
- [ ] Color contrast verified for all text and UI elements using a contrast checker
- [ ] Focus rings visible on all interactive elements
- [ ] Mobile navigation toggle is keyboard-accessible
- [ ] No heading levels are skipped on any page
- [ ] All external links include `<span class="sr-only">(opens in new tab)</span>`

### Performance

- [ ] Lighthouse Performance score is 90+ on all four pages
- [ ] LCP under 2.0s confirmed via WebPageTest (4G throttled, Lagos or Johannesburg node)
- [ ] CLS under 0.1 confirmed via Chrome DevTools
- [ ] No render-blocking resources detected in Lighthouse report
- [ ] All gallery images served in WebP format (confirm via Chrome DevTools Network tab)

---

### Post-Launch Checks

Completed within 48 hours of production deployment.

- [ ] Production site does not return a `noindex` header on any of the four main pages (verify via browser DevTools > Network > response headers)
- [ ] Google Search Console indexing requested for all four pages via URL Inspection tool
- [ ] GA4 live event confirmation: at least one real pageview and one custom event confirmed in GA4 real-time view from the production domain
- [ ] Rich Results Test run on production Home page URL to confirm JSON-LD structured data is valid and parsed correctly
- [ ] WebPageTest run from Lagos or Johannesburg node against production domain with custom domain active

---

## Out of Scope

The following features are explicitly excluded from v1 of this product.

| Feature | Status | Notes |
|---|---|---|
| Blog or news section | Out of scope | Architecture must not block this. App Router structure supports adding `/blog/[slug]` in v2 without restructuring. |
| CMS or admin interface | Out of scope | All content updates go through the developer editing data files directly. |
| Server-side search | Out of scope | Press archive filtering is entirely client-side. |
| PDF hosting | Out of scope | All press links are external URLs only. |
| Contact form with submission handling | Out of scope | Contact page uses mailto links only. No form, no backend, no third-party form service. |
| Map embed on Contact page | Out of scope | Address is rendered as plain text only. |
| Cookie consent banner | Out of scope | Legal requirement is an open question. Added in v1.1 if required. |
| E-commerce, donations, or payment flows | Out of scope | No transactional features in this product. |
| User accounts or authentication | Out of scope | Fully public site. No login. |
| Multilingual support | Out of scope | English only in v1. [ASSUMPTION: If Yoruba, Igbo, or Hausa language versions are required, this is a significant v2 scope item.] |
| Newsletter or email capture | Out of scope | No mailing list integration in v1. |
| Video embeds | Out of scope | [ASSUMPTION: If the client has significant video content (interviews, speeches), a video section is a logical v2 addition. The `videoEmbedUrl` field is already present in the PressEntry type to avoid a breaking change.] |

---

## Open Questions

| # | Question | Owner | Urgency | Must Be Resolved By |
|---|---|---|---|---|
| 1 | Does the client require a cookie consent banner to comply with NDPR or any applicable data protection regulation given that GA4 sets cookies? | Client + Legal | High | Before development begins |
| 2 | Are the press email and bookings email address the same, or are they different addresses? | Client | High | Before content integration |
| 3 | What is the agreed content update turnaround SLA (e.g., 48 business hours for routine additions)? | Client + Developer | High | Before launch |
| 4 | Has the client selected and registered a domain name? If not, does the developer recommend one? | Client | High | Before development begins |
| 5 | Does the client want a text-based wordmark (full name) in the header, or will a logo image be supplied? | Client | Medium | Before design handoff |
| 6 | Should individual gallery photos have captions? If yes, the client must supply caption text for each photo and the data schema must be updated to include a `caption` field. | Client | Medium | Before content integration |
| 7 | Is the Education section of the biography a required section, or should it be merged into Early Life or Career? | Client | Low | Before content integration |
| 8 | Does the client want Vercel Speed Insights data shared with them on a regular basis, and if so, in what format and frequency? | Client + Developer | Low | Before launch |
| 9 | Are there any active social profiles beyond Twitter/X that should appear in the footer and Contact page (LinkedIn, Instagram, YouTube, Facebook)? | Client | Medium | Before content integration |
| 10 | Does the client have existing press coverage that is not in English? If so, should non-English entries appear in the Press archive, and how should they be labeled? | Client | Low | Before content integration |
| 11 | Is there a specific launch date target? This determines whether content integration is on the critical path. | Client | High | Before development begins |
| 12 | Is a signed engagement agreement or IP ownership clause confirmed before development begins? | Both parties | High | Before development begins |
