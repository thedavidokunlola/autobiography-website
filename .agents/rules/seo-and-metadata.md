---
description: Rules for meta titles, Open Graph tags, structured data, sitemap, robots.txt, and the 404 page.
globs: ["app/**/*.tsx", "app/sitemap.ts", "app/robots.ts", "app/not-found.tsx"]
alwaysApply: true
---

# SEO and Metadata Rules

## Meta title separator (RULE-S3)

The separator in every page meta title is an **en dash** `–` (U+2013) with **one space on each side**.

| Page | Correct | Wrong |
|---|---|---|
| Home | `Adaeze Okonkwo – Civic Leader and Foundation Chair` | `Adaeze Okonkwo - Civic Leader` |
| Press | `Press – Adaeze Okonkwo` | `Press — Adaeze Okonkwo` |
| Work | `Work – Adaeze Okonkwo` | `Work \| Adaeze Okonkwo` |
| Contact | `Contact – Adaeze Okonkwo` | `Contact: Adaeze Okonkwo` |

The en dash character is `–` (not `-` hyphen, not `—` em dash, not `|` pipe).

Implementation in `generateMetadata`:
```typescript
export const metadata: Metadata = {
  title: `Press \u2013 ${biography.name}`,  // U+2013 = en dash
}
```

Or use the character directly — both are acceptable. Verify the character in the rendered `<title>` tag using browser DevTools.

## 404 page: noindex and sitemap exclusion (RULE-S2)

`app/not-found.tsx` must:

1. Export metadata with a robots noindex directive:
```typescript
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
```

2. Not appear in `app/sitemap.ts`. The sitemap returns exactly four URLs:
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://[domain]/', ... },
    { url: 'https://[domain]/press', ... },
    { url: 'https://[domain]/work', ... },
    { url: 'https://[domain]/contact', ... },
    // 404 is never included — RULE-S2
  ]
}
```

## Person JSON-LD: url vs sameAs (RULE-S1)

The `Person` schema on the Home page puts the site's canonical URL in `url`. The `sameAs` array contains only external profile URLs.

Correct:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Adaeze Okonkwo",
  "url": "https://adaezeokonkwo.com",
  "sameAs": [
    "https://twitter.com/adaezeokonkwo",
    "https://linkedin.com/in/adaezeokonkwo",
    "https://en.wikipedia.org/wiki/Adaeze_Okonkwo"
  ]
}
```

Wrong:
```json
{
  "sameAs": [
    "https://adaezeokonkwo.com",  ← never put the site URL in sameAs
    "https://twitter.com/adaezeokonkwo"
  ]
}
```

`sameAs` tells Google "this entity also appears at these other places on the web." Listing the site's own URL in `sameAs` creates a self-referential assertion that does not help Knowledge Panel generation.

## All four main pages return HTTP 200 (RULE-S4)

The following must be true at launch:
- `GET /` → 200
- `GET /press` → 200
- `GET /work` → 200
- `GET /contact` → 200
- `GET /sitemap.xml` → 200 with `Content-Type: application/xml`
- `GET /robots.txt` → 200 with `Content-Type: text/plain`

None of the four main pages may include a `noindex` meta tag or `X-Robots-Tag: noindex` header.

Verify using `curl -I https://[preview-url]/` and check the response headers before launch.

## Page metadata templates

```typescript
// app/page.tsx (Home)
export const metadata: Metadata = {
  title: `${biography.name} \u2013 ${biography.tagline}`,
  description: `The official profile of ${biography.name}. [one sentence on primary role and significance]`,
  openGraph: {
    type: 'website',
    siteName: biography.name,
    title: `${biography.name} \u2013 ${biography.tagline}`,
    description: `...`,
    images: [{ url: 'https://[domain]/og/og-default.jpg', width: 1200, height: 630 }],
    url: 'https://[domain]/',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    site: contactInfo.socials.find(s => s.platform === 'Twitter')?.handle,
    creator: contactInfo.socials.find(s => s.platform === 'Twitter')?.handle,
  },
}
```

Repeat for each page with the templates from the PRD SEO section.

## Sitemap configuration

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://[domain]'
  const now = new Date()
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/press`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
```

Replace `[domain]` with the real domain before launch. The `[domain]` pattern will be caught by the placeholder detection script if it remains.

## robots.ts configuration

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://[domain]/sitemap.xml',
  }
}
```