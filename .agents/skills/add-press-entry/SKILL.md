---
name: add-press-entry
description: >
  Load this skill when the task involves any of these words:
  "add press", "new article", "press entry", "media coverage", "news item",
  "update press archive", "remove press entry", "edit press entry".
---

## What this skill does

Teaches the ordered procedure for safely adding, editing, or removing a `PressEntry` object in `data/press.ts`. The laws are in `rules/data-layer.md` (RULE-D1, RULE-D3, RULE-D4, RULE-D5).

---

## Steps

1. **Open `data/press.ts` and read the existing array before touching anything.**
   Confirm `import 'server-only'` is the first line. If it is missing, add it before doing anything else. (RULE-D1)

2. **Gather all five required fields from the task input.**
   - `publication` — string, must not be blank
   - `date` — must be `"YYYY-MM-DD"` format. Convert any other format before writing. (RULE-D5)
   - `title` — string, must not be blank
   - `summary` — string, must not be blank
   - `url` — string, must not be blank

3. **Check the date format explicitly.**
   `"14 March 2024"` → `"2024-03-14"`. `"March 2024"` is missing the day — ask for the exact date before proceeding. Do not guess or default to `"01"`.

4. **Check for placeholder patterns in every field.**
   No field may contain text matching `/\[[^\]]+\]/g`. Examples that must be rejected: `"[Publication Name]"`, `"[TBD]"`, `"[URL]"`. If found, stop and ask for the real value. (RULE-D3)

5. **Construct the object.**
   Insert it into the array in descending date order — newest entry first. Sort by the `date` string. ISO 8601 lexicographic order is chronological, so standard string comparison is correct.

6. **Include `videoEmbedUrl` only if explicitly provided.**
   This field is optional and unused in v1. If not provided, omit it entirely. Do not write `videoEmbedUrl: undefined` or `videoEmbedUrl: ""`.

7. **Run the pre-build scripts.**
```bash
   ts-node scripts/detect-placeholders.ts
   ts-node scripts/validate-data.ts
```
   Both must pass with zero findings before proceeding to the build.

8. **Run `next build`.**
   Must complete with zero TypeScript errors and zero warnings. (RULE-B2)

9. **Verify the Press page in the browser or preview.**
   Confirm the new entry appears at the correct position in the list. Confirm the article title link opens the correct URL in a new tab. Confirm the date renders as `"DD Month YYYY"` format on screen.

---

## Code skeleton

```typescript
import 'server-only' // Must be line 1 — RULE-D1

import type { PressEntry } from '@/types/press'

export const pressEntries: PressEntry[] = [
  {
    publication: "The Guardian Nigeria",
    date: "2025-11-04",            // "YYYY-MM-DD" only — RULE-D5
    title: "Article title here",
    summary: "One-line summary here.",
    url: "https://guardian.ng/example",
    // videoEmbedUrl: omit if not provided
  },
  // ... existing entries follow, newest first
]
```

---

## Traps

- **Wrong date format.** Storing `"November 2025"` or `"04/11/2025"` instead of `"2025-11-04"` breaks the sort order and fails RULE-D5. Always convert to ISO 8601 before writing.
- **Inserting at the wrong position.** Appending to the end of the array when the entry is recent places it last in the list, which is newest-last — wrong. Insert in descending date order.
- **Leaving a placeholder.** A `url` value of `"[URL pending]"` passes TypeScript but fails `detect-placeholders.ts` and must never reach production.
- **Blank summary.** An empty `summary: ""` passes TypeScript strict mode but fails `validate-data.ts`. Check all five required fields are non-empty and non-whitespace.
- **Writing `videoEmbedUrl: ""`.** An empty string for an optional field is not the same as omitting it. Omit the key entirely when no value is provided.

---

## Verify before done

- [ ] `import 'server-only'` is line 1 of `data/press.ts`
- [ ] New entry date is stored as `"YYYY-MM-DD"` string
- [ ] No field contains a `[placeholder]` pattern
- [ ] No required field is blank or whitespace-only
- [ ] Entry appears in correct descending date order in the array
- [ ] `ts-node scripts/detect-placeholders.ts` passes with zero findings
- [ ] `ts-node scripts/validate-data.ts` passes with zero errors
- [ ] `next build` completes with zero TypeScript errors
- [ ] Entry renders on `/press` with correct date display format (`DD Month YYYY`)
- [ ] Article title link opens the correct URL in a new tab
- [ ] Vercel preview deployment verified before merge to `main` (RULE-B3)

**Tests to write:**
- Unit test for `formatDate()` covering the new entry's date string
- Unit test for the press entry array confirming descending sort order is maintained after insertion