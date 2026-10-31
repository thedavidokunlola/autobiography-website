---
name: add-work-entry
description: >
  Load this skill when the task involves any of these words:
  "add work entry", "new foundation", "new NGO", "advisory role",
  "civic work", "work history", "add organisation", "update work page",
  "remove work entry", "edit work entry".
---

## What this skill does

Teaches the ordered procedure for safely adding, editing, or removing a `WorkEntry` object in `data/work.ts`. The laws are in `rules/data-layer.md` (RULE-D1, RULE-D2, RULE-D3, RULE-D4) and `rules/components.md` (RULE-P7, RULE-P8).

---

## Steps

1. **Open `data/work.ts` and read the existing array before touching anything.**
   Confirm `import 'server-only'` is the first line. If it is missing, add it before doing anything else. (RULE-D1)

2. **Identify the correct category.**
   The `category` field accepts exactly three values:
   - `"Foundation"`
   - `"NGO"`
   - `"Advisory Role"`
   If the entry does not fit any of these, stop and ask. Do not invent a new category value. (RULE-D2, PRD data contracts)

3. **Gather all required fields.**
   - `organization` — string, must not be blank
   - `role` — string, must not be blank
   - `startDate` — must be `"YYYY-MM"` format (e.g., `"2019-03"`)
   - `endDate` — must be `"YYYY-MM"` format or the exact string `"Present"`
   - `description` — string, 2–5 sentences, must not be blank

4. **Check both date fields explicitly.**
   `"March 2019"` → `"2019-03"`. `"2019"` is missing the month — ask before proceeding. `"Present"` is the only non-date value accepted for `endDate`. (RULE-D2)
   The `"YYYY-MM"` format sorts chronologically using standard string comparison. Do not convert to any other format in the data layer.

5. **Check for placeholder patterns in every field.**
   No field may contain text matching `/\[[^\]]+\]/g`. Stop and ask for real values if found. (RULE-D3)

6. **Check the `learnMoreUrl` field.**
   This field is optional. Include it only when a URL is explicitly provided. Omit the key entirely when no URL is given. Do not write `learnMoreUrl: ""` or `learnMoreUrl: undefined`.

7. **Insert in descending start date order within the category.**
   Within each category group, entries sort by `startDate` descending — most recent first. Lexicographic order on `"YYYY-MM"` strings is chronological. Insert accordingly.

8. **Check whether the category now has at least one entry.**
   If the task involves removing an entry and the category will have zero entries after removal, confirm with the requester that the H2 heading for that category will disappear from the page entirely. This is correct behavior per RULE-P8, but it may be unexpected.

9. **Run the pre-build scripts.**
```bash
   ts-node scripts/detect-placeholders.ts
   ts-node scripts/validate-data.ts
```
   Both must pass with zero findings before proceeding to the build.

10. **Run `next build`.**
    Must complete with zero TypeScript errors and zero warnings. (RULE-B2)

11. **Verify the Work page in the browser or preview.**
    Confirm the entry appears under the correct category heading. Confirm the date range displays as `"Month YYYY – Month YYYY"` or `"Month YYYY – Present"`. Confirm `Learn more` link appears only when `learnMoreUrl` was provided, and opens in a new tab.

---

## Code skeleton

```typescript
import 'server-only' // Must be line 1 — RULE-D1

import type { WorkEntry } from '@/types/work'

export const workEntries: WorkEntry[] = [
  {
    category: "Foundation",             // "Foundation" | "NGO" | "Advisory Role" only
    organization: "Organisation Name",
    role: "Role or Title Held",
    startDate: "2021-06",               // "YYYY-MM" only — RULE-D2
    endDate: "Present",                 // "YYYY-MM" or "Present" — RULE-D2
    description: "Two to five sentences describing the organisation and the subject's involvement.",
    learnMoreUrl: "https://example.org", // omit entirely if not provided
  },
  // ... other entries
]
```

---

## Traps

- **Storing display format as data.** Writing `startDate: "June 2021"` instead of `"2021-06"` breaks chronological sort order and fails RULE-D2. `formatDate()` converts `"YYYY-MM"` to `"Month YYYY"` at render time — never in the data file.
- **Inventing a new category.** Writing `category: "Government"` or `category: "Board Member"` breaks the TypeScript union type and fails the build. The three valid values are fixed.
- **Empty `learnMoreUrl`.** Writing `learnMoreUrl: ""` causes a rendered empty link on the Work page. Omit the key entirely when no URL is provided.
- **Removing an entry and not flagging the empty category.** If the last entry in a category is removed, the entire H2 section for that category silently disappears from the page (RULE-P8). This can look like a bug. Always flag this consequence before completing a removal task.
- **Sorting within the wrong scope.** Entries sort within their category, not across the entire array. Placing a recent Foundation entry above all NGO entries is not correct — it must be newest-first within Foundations only.

---

## Verify before done

- [ ] `import 'server-only'` is line 1 of `data/work.ts`
- [ ] `category` is one of exactly three valid union values
- [ ] `startDate` and `endDate` are stored as `"YYYY-MM"` or `"Present"`
- [ ] No field contains a `[placeholder]` pattern
- [ ] No required field is blank or whitespace-only
- [ ] Entry appears in correct descending `startDate` order within its category
- [ ] `learnMoreUrl` is omitted entirely when not provided
- [ ] If a category was emptied, the consequence (H2 disappears) has been flagged to the requester
- [ ] `ts-node scripts/detect-placeholders.ts` passes with zero findings
- [ ] `ts-node scripts/validate-data.ts` passes with zero errors
- [ ] `next build` completes with zero TypeScript errors
- [ ] Entry renders under the correct category heading on `/work`
- [ ] Date range displays as `"Month YYYY – Month YYYY"` or `"Month YYYY – Present"`
- [ ] `Learn more` link appears only when URL was provided, opens in new tab
- [ ] Vercel preview deployment verified before merge to `main` (RULE-B3)

**Tests to write:**
- Unit test for `formatDate()` covering `startDate` and `endDate` of the new entry
- Unit test confirming entries within each category are sorted by `startDate` descending
- Render test confirming the category H2 does not render when its entries array is empty