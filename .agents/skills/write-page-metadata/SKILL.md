---
name: write-page-metadata
description: >
  Load this skill when the task involves any of these words:
  "metadata", "generateMetadata", "meta title", "meta description",
  "Open Graph", "OG tags", "Twitter card", "page title", "SEO",
  "sitemap", "structured data", "JSON-LD", "Person schema".
---

## What this skill does

Teaches the ordered procedure for writing or updating `generateMetadata` on any of the four pages. The laws are in `rules/seo-and-metadata.md` (RULE-S1, RULE-S2, RULE-S3, RULE-S4).

---

## Steps

1. **Identify which page this metadata is for.**
   The four pages have fixed title templates. Read the exact template from the PRD (SEO section) before writing anything. Do not paraphrase or simplify the template.

2. **Write the page title using the correct separator.**
   The separator is an en dash `–` (U+2013) with one space on each side. Verify the character: it is not a hyphen `-` (U+002D) and not an em dash `—` (U+2014). (RULE-S3)
   
   In code, use the Unicode escape to make intent explicit:
```typescript
   title: `Press \u2013 ${biography.name}`
```
   Or paste the character directly — both are acceptable. After writing, inspect the rendered `<title>` tag in browser DevTools to confirm the character is correct.

3. **Write the meta description.**
   Use the template from the PRD SEO section for the relevant page. Target 140–160 characters. Do not truncate below 120 characters. Do not exceed 160 characters.

4. **Write the Open Graph fields.**
   All six OG fields are required on every page: (PRD SEO section)
   - `og:type` → `"website"`
   - `og:site_name` → subject's full name from `biography.name`
   - `og:title` → same string as the page meta title
   - `og:description` → same string as the page meta description
   - `og:image` → **absolute URL** — not a relative path. Must be `https://[domain]/og/og-default.jpg`. (RULE-S4)
   - `og:url` → canonical page URL, absolute
   - `og:locale` → `"en_NG"`

5. **Write the Twitter card fields.**
   All five Twitter card fields are required on every page: (PRD SEO section)
   - `twitter:card` → `"summary_large_image"`
   - `twitter:title` → same string as the page meta title
   - `twitter:description` → same string as the page meta description
   - `twitter:image` → same absolute URL as `og:image`
   - `twitter:site` → Twitter/X handle from `contactInfo.socials`
   - `twitter:creator` → same handle

6. **Check whether this is the 404 page.**
   `app/not-found.tsx` requires a `robots` field set to noindex. (RULE-S2)
```typescript
   robots: { index: false, follow: false }
```
   The 404 page must not appear in `sitemap.ts`.

7. **Check whether this is the Home page.**
   The Home page requires a `Person` JSON-LD script in the `<head>`. (RULE-S1)
   - Place the canonical site URL in the `url` field.
   - Place external social profile URLs in the `sameAs` array.
   - Do not place the site's own URL in `sameAs`.
   Implement as an inline `<script type="application/ld+json">` in the page component's returned JSX, not in `generateMetadata`.

8. **Confirm all four main pages return HTTP 200 and carry no noindex directive.**
   After updating metadata on any page, confirm the page is not accidentally tagged with `robots: { index: false }`. (RULE-S4)

9. **Verify using an Open Graph debugger.**
   Before marking done, run the Vercel preview URL through [opengraph.xyz](https://opengraph.xyz) or the Facebook Sharing Debugger. Confirm the title, description, and image render correctly.

---

## Code skeleton

```typescript
// app/press/page.tsx — example for the Press page

import type { Metadata } from 'next'
import { biography } from '@/data/biography'
import { contactInfo } from '@/data/contact'

export const metadata: Metadata = {
  title: `Press \u2013 ${biography.name}`,  // en dash U+2013 — RULE-S3
  description: `A complete archive of media coverage featuring ${biography.name}. Interviews, features, and press.`,
  openGraph: {
    type: 'website',
    siteName: biography.name,
    title: `Press \u2013 ${biography.name}`,
    description: `A complete archive of media coverage featuring ${biography.name}. Interviews, features, and press.`,
    images: [{
      url: 'https://[domain]/og/og-default.jpg', // absolute URL — RULE-S4
      width: 1200,
      height: 630,
    }],
    url: 'https://[domain]/press',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Press \u2013 ${biography.name}`,
    description: `A complete archive of media coverage featuring ${biography.name}. Interviews, features, and press.`,
    images: ['https://[domain]/og/og-default.jpg'],
    site: contactInfo.socials.find(s => s.platform.toLowerCase() === 'twitter')?.handle,
    creator: contactInfo.socials.find(s => s.platform.toLowerCase() === 'twitter')?.handle,
  },
}

// Home page only — Person JSON-LD (RULE-S1)
// Place inside the page component's JSX, not in generateMetadata
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: biography.name,
  url: 'https://[domain]/',           // canonical site URL — RULE-S1
  sameAs: [                           // external profiles only — RULE-S1
    'https://twitter.com/handle',
    'https://linkedin.com/in/handle',
  ],
}

// In the Home page component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
/>

// 404 page — app/not-found.tsx (RULE-S2)
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

---

## Traps

- **Using a hyphen or em dash as the separator.** The separator is the en dash `–` (U+2013). A hyphen `-` looks similar but is wrong. An em dash `—` is too wide. Verify in DevTools after writing. (RULE-S3)
- **Using a relative path for `og:image`.** Open Graph crawlers require absolute URLs. `/og/og-default.jpg` will not work. `https://[domain]/og/og-default.jpg` is correct. (RULE-S4)
- **Putting the site URL in `sameAs`.** `sameAs` tells Google "this entity also exists at these external locations." The site's own URL belongs in `url`, not `sameAs`. Putting it in both creates a self-referential assertion. (RULE-S1)
- **Forgetting `og:locale: "en_NG"`.** The PRD specifies Nigerian English locale. This affects how Google and social platforms classify the content geographically.
- **Writing `generateMetadata` on the 404 page without the noindex field.** A crawlable 404 page wastes crawl budget. RULE-S2 is easy to miss because the 404 page looks like a regular page during development.
- **Including the 404 page in `sitemap.ts`.** The sitemap returns exactly four URLs. The 404 page is never included. (RULE-S2)
- **Writing the JSON-LD script inside `generateMetadata`.** `generateMetadata` produces `<meta>` and `<link>` tags, not arbitrary `<script>` tags. The JSON-LD `<script>` belongs in the page component's JSX return.

---

## Verify before done

- [ ] Page title uses en dash `–` (U+2013) separator with one space each side (RULE-S3)
- [ ] Meta description is 140–160 characters
- [ ] `og:type` is `"website"`
- [ ] `og:site_name` is the subject's full name
- [ ] `og:title` matches the page meta title exactly
- [ ] `og:description` matches the page meta description exactly
- [ ] `og:image` is an absolute URL (starts with `https://`)
- [ ] `og:image` dimensions are at least 1200×630px
- [ ] `og:url` is the canonical absolute page URL
- [ ] `og:locale` is `"en_NG"`
- [ ] `twitter:card` is `"summary_large_image"`
- [ ] `twitter:site` and `twitter:creator` are populated from `contactInfo.socials`
- [ ] If Home page: Person JSON-LD is present as `<script type="application/ld+json">` in JSX
- [ ] If Home page: `url` field in JSON-LD is the canonical site URL (RULE-S1)
- [ ] If Home page: `sameAs` contains only external profile URLs (RULE-S1)
- [ ] If 404 page: `robots: { index: false, follow: false }` is present (RULE-S2)
- [ ] If 404 page: URL is not in `sitemap.ts` (RULE-S2)
- [ ] All four main pages return HTTP 200 with no `noindex` directive (RULE-S4)
- [ ] Open Graph preview verified via opengraph.xyz or equivalent on the Vercel preview URL
- [ ] Twitter card verified via Twitter Card Validator on the Vercel preview URL
- [ ] `next build` completes with zero TypeScript errors

**Tests to write:**
- Unit test confirming the page title string contains `\u2013` (en dash), not `-` or `—`
- Unit test confirming `og:image` value starts with `https://`
- Unit test for Home page confirming the `sameAs` array contains no value equal to the site's canonical URL
- Render test for the 404 page confirming the `robots` metadata contains `index: false`