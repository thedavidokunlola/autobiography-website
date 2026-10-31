---
name: implement-empty-state
description: >
  Load this skill when the task involves any of these words:
  "empty state", "no results", "no entries", "empty archive",
  "no photos", "no press", "no work", "zero results", "coming soon",
  "missing data", "conditional render", "empty category".
---

## What this skill does

Consolidates all PRD-defined empty state conditions, their exact messages, and their associated UI changes into one ordered reference. Without this skill, empty states are easy to implement incompletely — showing a message but failing to hide the filter controls, or rendering an empty H2 heading. The laws are in `rules/components.md` (RULE-P6, RULE-P8) and the PRD page-by-page functional requirements.

---

## Steps

1. **Identify which empty state condition this task involves.**
   There are six distinct conditions across the site. Match the task to the correct condition below before writing any code.

2. **Implement the condition exactly as the PRD specifies.**
   The message text is fixed. Do not paraphrase it. The associated UI changes are mandatory — the message alone is not sufficient.

3. **Test the condition in isolation.**
   Empty the relevant data array or simulate the filter condition in the development environment. Confirm the empty state renders correctly before restoring real data.

4. **Confirm the non-empty state is not broken.**
   After implementing the empty state, restore the data and confirm the normal render path works correctly. Empty state logic commonly breaks the non-empty path via incorrect conditional chaining.

---

## The six empty state conditions

### Condition 1: Press archive — zero total entries

**Where:** `app/press/page.tsx` and `PressFilter.tsx`

**Trigger:** `pressEntries.length === 0`

**Message:** `Press archive coming soon.`

**Required UI changes:**
- Display the message
- Hide the filter controls entirely — keyword input, publication dropdown, year dropdown, and the `Clear filters` button must not render
- The H1 (`Press` or `Media Coverage`) still renders

**Implementation pattern:**
```tsx
{pressEntries.length === 0 ? (
  <p>Press archive coming soon.</p>
) : (
  <>
    <PressFilter entries={pressEntries} />
    <PressEntryList entries={filteredEntries} />
  </>
)}
```

---

### Condition 2: Press archive — filters return zero results

**Where:** `PressFilter.tsx` or `PressEntryList.tsx`

**Trigger:** Filter is active and `filteredEntries.length === 0` (but `pressEntries.length > 0`)

**Message:** `No press entries match your search. Try adjusting the filters.`

**Required UI changes:**
- Display the message below the filter controls
- The filter controls remain visible — the user needs them to adjust or clear the search
- Render the `Clear filters` button below the message (it is already visible because at least one filter is active — RULE-P6)
- Do not hide the H1

**Implementation pattern:**
```tsx
{filteredEntries.length === 0 ? (
  <div>
    <p>No press entries match your search. Try adjusting the filters.</p>
    {/* Clear filters button renders here — already visible because filter is active (RULE-P6) */}
  </div>
) : (
  <PressEntryList entries={filteredEntries} />
)}
```

---

### Condition 3: Work page — a category has zero entries

**Where:** `WorkCategory.tsx`

**Trigger:** The entries array for a specific category has `length === 0`

**Message:** None. The category section does not render at all.

**Required UI changes:**
- The H2 heading for the empty category does not render (RULE-P8)
- No placeholder, no "coming soon" message, no empty section
- Other categories with entries render normally

**Implementation pattern:**
```tsx
export function WorkCategory({ category, entries }: WorkCategoryProps) {
  if (entries.length === 0) return null  // RULE-P8: no empty category heading
  
  return (
    <section>
      <h2>{category}</h2>
      {entries.map(entry => <WorkEntry key={entry.organization} entry={entry} />)}
    </section>
  )
}
```

---

### Condition 4: Work page — entire data file is empty

**Where:** `app/work/page.tsx`

**Trigger:** `workEntries.length === 0`

**Message:** `Work history coming soon.`

**Required UI changes:**
- Display the message
- Hide category sections entirely — no H2 headings render
- The H1 (`Work`) still renders

**Implementation pattern:**
```tsx
{workEntries.length === 0 ? (
  <p>Work history coming soon.</p>
) : (
  <>
    <WorkCategory category="Foundation" entries={foundations} />
    <WorkCategory category="NGO" entries={ngos} />
    <WorkCategory category="Advisory Role" entries={advisoryRoles} />
  </>
)}
```

---

### Condition 5: Home page — no gallery photos

**Where:** `PhotoGallery.tsx` or `app/page.tsx`

**Trigger:** `galleryPhotos.length === 0`

**Message:** None. The gallery section does not render.

**Required UI changes:**
- The gallery section does not render at all — no heading, no placeholder grid, no message
- The biography renders in full above the (now absent) gallery

**Implementation pattern:**
```tsx
{galleryPhotos.length > 0 && (
  <section>
    <p>Photos</p>
    <PhotoGallery photos={galleryPhotos} />
  </section>
)}
```

---

### Condition 6: Work entry — no `learnMoreUrl`

**Where:** `WorkEntry.tsx`

**Trigger:** `entry.learnMoreUrl` is `undefined` or absent

**Message:** None. The link simply does not render.

**Required UI changes:**
- The `Learn more` link does not render — no broken link, no placeholder text, no empty anchor
- All other entry fields (organization, role, dates, description) render normally

**Implementation pattern:**
```tsx
{entry.learnMoreUrl && (
  
    href={entry.learnMoreUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn more
    <span className="sr-only">(opens in new tab)</span> {/* RULE-A4 */}
  </a>
)}
```

---

## Traps

- **Showing the filter controls when the archive is empty.** Condition 1 hides them entirely. Condition 2 keeps them visible. These are different conditions with different requirements. Conflating them hides the controls when the user needs them to clear a filter.
- **Rendering an empty H2 for a Work category.** A `<h2>Foundations</h2>` with nothing below it looks broken on a professionally positioned site. RULE-P8 is explicit: return null. (RULE-P8)
- **Adding a placeholder gallery grid.** The PRD states explicitly: "The gallery does not display a placeholder grid for missing images." If photos are not provided, the section does not render.
- **Paraphrasing the message text.** The message strings are defined in the PRD. Use them verbatim. A different message string may be correct in intent but is not what was specified.
- **Breaking the non-empty path.** The most common mistake is wrapping the normal render in the wrong branch of the conditional, causing the page to show the empty state even when data exists. Always test both the empty and non-empty paths.
- **Missing the `Clear filters` button in Condition 2.** The message in Condition 2 requires the `Clear filters` button to appear below it. The button is already visible because a filter is active (RULE-P6). Do not hide it when showing the zero-results message.

---

## Verify before done

- [ ] Correct condition identified from the six conditions above
- [ ] Message text matches the PRD verbatim (Conditions 1, 2, 4)
- [ ] Conditions with no message render nothing (Conditions 3, 5, 6)
- [ ] Condition 1: filter controls are hidden when archive is empty
- [ ] Condition 2: filter controls remain visible when filter returns zero results
- [ ] Condition 2: `Clear filters` button is visible below the zero-results message (RULE-P6)
- [ ] Condition 3: `WorkCategory` returns `null` when entries array is empty (RULE-P8)
- [ ] Condition 4: category sections hidden when entire work data file is empty
- [ ] Condition 5: gallery section does not render when `galleryPhotos.length === 0`
- [ ] Condition 6: `Learn more` link does not render when `learnMoreUrl` is absent
- [ ] Non-empty path tested and confirmed working after empty state implementation
- [ ] `next build` completes with zero TypeScript errors
- [ ] Empty state verified in browser with data array manually set to `[]`
- [ ] Vercel preview deployment verified before merge to `main` (RULE-B3)

**Tests to write:**
- Render test for `PressFilter` confirming filter controls do not render when `entries.length === 0`
- Render test for `PressEntryList` confirming the zero-results message and `Clear filters` button render when `filteredEntries.length === 0` and a filter is active
- Render test for `WorkCategory` confirming it returns null when `entries.length === 0`
- Render test for `PhotoGallery` (or its parent) confirming the gallery section does not render when `galleryPhotos.length === 0`
- Render test for `WorkEntry` confirming no anchor tag renders when `learnMoreUrl` is undefined