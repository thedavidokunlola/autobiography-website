---
description: Enforces data integrity, date format correctness, server-only imports, and pre-build validation for the /data/ content layer.
globs: ["data/**/*.ts", "scripts/**/*.ts"]
alwaysApply: true
---

# Data Layer Rules

These rules apply to every file in `/data/` and every script in `/scripts/`. Breaking any rule here means the task has failed, even if the build succeeds.

## server-only import (RULE-D1)

Every file in `/data/` must begin with `import 'server-only'` as its absolute first line. This prevents data files from being accidentally bundled into the client JavaScript payload — which would expose the subject's contact details, data schemas, and any draft content to anyone who opens the browser's network tab.

Correct:
```typescript
import 'server-only'

export const contactInfo = { ... }
```

Wrong:
```typescript
// Contact data
import 'server-only'  // ← too late, must be line 1
export const contactInfo = { ... }
```

If you are creating a new file in `/data/`, the first keystroke you type is `import 'server-only'`.

## Work entry date format (RULE-D2)

`startDate` and `endDate` fields in `data/work.ts` are stored as `"YYYY-MM"` strings. This format is:
- Chronologically sortable using standard string comparison (ISO 8601 lexicographic order)
- Unambiguous (no locale-dependent month names)
- Convertible to a display format at render time via `formatDate()`

Never store `"March 2024"` or `"Mar 2024"` in the data layer. These are display values, not data values.

The `formatDate(date: string): string` utility in `lib/formatDate.ts` converts `"YYYY-MM"` to `"Month YYYY"` at render time. Call it in the component. Do not call it in the data file.

Sorting uses the raw `"YYYY-MM"` string. Lexicographic order on ISO dates is chronological order. This is correct behavior, not a workaround.

## Press entry date format (RULE-D5)

`date` fields in `data/press.ts` are stored as ISO 8601 `"YYYY-MM-DD"` strings.

Valid: `"2024-03-14"`
Invalid: `"14 March 2024"`, `"March 14, 2024"`, `"14/03/2024"`

The display format `"DD Month YYYY"` (e.g., `"14 March 2024"`) is a render-time transformation only.

## Placeholder detection (RULE-D3)

`scripts/detect-placeholders.ts` must be registered as a `prebuild` hook in `package.json`:

```json
{
  "scripts": {
    "prebuild": "ts-node scripts/detect-placeholders.ts && ts-node scripts/validate-data.ts",
    "build": "next build"
  }
}
```

The script searches all files in `/data/` for strings matching `/\[[^\]]+\]/g`. Any match is a build failure. The error message must name:
- The file where the match was found
- The field name
- The matched string

This prevents values like `press@[domain]`, `[Subject Full Name]`, or `[Foundation Name]` from shipping to production.

## Required field validation (RULE-D4)

`scripts/validate-data.ts` checks every required field across all data files for blank, null, or whitespace-only values. A field containing only spaces passes a truthiness check but is still invalid.

Check pattern:
```typescript
if (!value || value.trim() === '') {
  errors.push(`${fileName}: field "${fieldName}" at index ${index} is empty or whitespace-only`)
}
```

Build fails if `errors.length > 0`.

## Data structure contracts

These are the exact typed interfaces from the PRD. Do not add or remove fields without a PRD reference.

```typescript
// data/biography.ts
interface BiographySection {
  id: string       // anchor slug, e.g. "early-life"
  heading: string  // H2 display label, e.g. "Early Life"
  content: string  // prose, rendered as paragraphs
}

// data/press.ts
interface PressEntry {
  publication: string
  date: string           // "YYYY-MM-DD" — RULE-D5
  title: string
  summary: string
  url: string
  videoEmbedUrl?: string // optional, unused in v1, present to avoid v2 breaking change
}

// data/work.ts
interface WorkEntry {
  category: "Foundation" | "NGO" | "Advisory Role"
  organization: string
  role: string
  startDate: string   // "YYYY-MM" — RULE-D2
  endDate: string     // "YYYY-MM" or "Present" — RULE-D2
  description: string
  learnMoreUrl?: string
}

// data/contact.ts
interface SocialHandle {
  platform: string
  handle: string
  url: string
}

// data/photos.ts
interface GalleryPhoto {
  src: string          // path in /public/images/gallery/
  fullResSrc: string   // path to full-resolution version
  alt: string          // required, non-empty — RULE-A1
  width: number
  height: number
}
```