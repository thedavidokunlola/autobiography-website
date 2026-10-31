---
description: Rules for component structure, rendering patterns, accessibility implementation, and gallery/filter/contact page behaviour.
globs: ["components/**/*.tsx", "app/**/*.tsx"]
alwaysApply: true
---

# Component Rules

These rules apply to every file in `/components/` and `/app/`. Breaking any rule here means the task has failed, even if the code compiles.

## Client Component restriction (RULE-B4)

`"use client"` may only appear in two components in v1:
- `components/PressFilter.tsx` (requires `useState` for filter state)
- The mobile navigation toggle (requires `useState` for open/close state)

Any additional `"use client"` directive requires explicit written justification referencing:
1. Which browser API or React hook makes Server Component rendering impossible
2. The PRD section or RULE that permits the addition

Adding `"use client"` unnecessarily breaks static generation and inflates the JavaScript bundle shipped to users.

## Contact page: no form elements (RULE-P1)

`app/contact/page.tsx` must contain zero of the following:
- `<form>`
- `<input>`
- `<textarea>`
- `<select>` (on the contact page — it is valid on the press filter)
- `<button type="submit">`

The only interactive elements on the Contact page are:
- `<a href="mailto:...">` links
- `<a href="https://..." target="_blank">` social links

A contact form introduces a server action or external service dependency this static architecture does not support.

## Photo gallery: no JavaScript image viewer (RULE-P2)

`components/PhotoGallery.tsx` must not import or implement:
- A lightbox (e.g., yet-another-react-lightbox, react-image-lightbox)
- A modal
- A carousel (e.g., Swiper, Embla, Slick)

Clicking a photo opens the full-resolution image in a new tab:
```tsx
<a href={photo.fullResSrc} target="_blank" rel="noopener noreferrer">
  {/* RULE-A4 */}
  <span className="sr-only">(opens in new tab)</span>
  <Image
    src={photo.src}
    alt={photo.alt}  // RULE-A1: non-empty, descriptive
    width={photo.width}
    height={photo.height}
  />
</a>
```

## Gallery image requirements (RULE-A1)

Every `<Image>` in the photo gallery must have:
- `alt` prop: non-empty string describing what is shown in the photo
- `width` prop: explicit pixel value matching the source image
- `height` prop: explicit pixel value matching the source image

`alt=""` is forbidden on gallery images. They are informational content, not decorative.

## Press filter: select dropdowns only (RULE-P4)

`components/PressFilter.tsx` uses `<select>` elements for the publication and year filters. No alternatives:

Correct:
```tsx
<select value={selectedPublication} onChange={e => setSelectedPublication(e.target.value)}>
  <option value="">All publications</option>
  {publications.map(pub => <option key={pub} value={pub}>{pub}</option>)}
</select>
```

Wrong: button groups, radio groups, custom dropdown components, comboboxes.

## Press filter: debounce (RULE-P5)

The keyword input fires synchronously on each keystroke with no debounce by default.

```tsx
<input
  type="text"
  value={keyword}
  onChange={e => setKeyword(e.target.value)}  // synchronous, no debounce
/>
```

Add 150ms debounce only if the press entry count exceeds 500. Add a comment if you add debounce:
```tsx
// Debounce added: entry count exceeds 500 (RULE-P5)
```

## Clear filters button visibility (RULE-P6)

The `Clear filters` button renders only when at least one filter is active:

```tsx
const isFiltered = keyword !== '' || selectedPublication !== '' || selectedYear !== ''

{isFiltered && (
  <button onClick={clearFilters}>Clear filters</button>
)}
```

## Work page: fully static (RULE-P7)

`app/work/page.tsx` and all work-related components (`WorkCategory.tsx`, `WorkEntry.tsx`) have no:
- `useState`
- `useEffect`
- Filter controls
- Search controls
- `"use client"` directives

The Work page is a Server Component that renders static HTML.

## Work category: suppress empty headings (RULE-P8)

`components/WorkCategory.tsx` does not render when its entries array is empty:

```tsx
if (entries.length === 0) return null
```

An empty `<h2>Foundations</h2>` with nothing below it is a credibility failure on a professionally positioned site.

## Header: persistent press contact link (RULE-P9)

`components/Header.tsx` renders a press contact link or `mailto:` in the navigation bar on every page. This element must be:
- Visible without scrolling on all viewport sizes
- Present in the DOM on all four pages (it is in the root layout)
- Either a direct `mailto:` link or a styled anchor pointing to `/contact#press-inquiries`

## Map embed: forbidden (RULE-P10)

No map embed may appear on the Contact page or anywhere else on the site. The office address in `data/contact.ts` is rendered as a `<p>` or `<address>` element containing plain text. No:
- Google Maps embed
- Mapbox embed
- OpenStreetMap iframe
- Any `<iframe>` on the Contact page

## Heading hierarchy (RULE-A2)

Each page has exactly one `<h1>`. Heading levels are never skipped.

Valid hierarchy:
h1 (page title)
h2 (section)
h3 (sub-item, e.g. work entry organization name)
Invalid:
- Two `<h1>` elements on one page
- `<h1>` followed immediately by `<h3>` (skipped h2)
- `<h4>` used where `<h3>` is the correct level

## Mobile navigation focus trap (RULE-A3)

When the mobile navigation menu is open:
1. Keyboard focus is programmatically moved into the menu on open
2. Tab key cycles through focusable elements within the menu only — it cannot reach elements behind the menu
3. Escape key closes the menu
4. The close button closes the menu
5. On close, focus returns to the toggle button that opened the menu

Use a focus trap utility (e.g., `focus-trap-react`) or implement manually using a `keydown` event listener. Add a comment: `// RULE-A3: intentional focus trap for WCAG 2.1 AA compliance`

## External link pattern (RULE-A4)

Every `<a target="_blank">` contains a visually hidden span:

```tsx
<a href={url} target="_blank" rel="noopener noreferrer">
  {linkText}
  <span className="sr-only">(opens in new tab)</span>  {/* RULE-A4 */}
</a>
```

Do not use `aria-label` as the sole screen reader affordance on external links. The `sr-only` span appends context; `aria-label` replaces the visible label entirely.

## Focus rings (RULE-A5)

All interactive elements display a focus ring on keyboard focus:
- Style: `outline: 2px solid #0057FF; outline-offset: 2px`
- Tailwind equivalent: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]`
- Never write `outline: none` or `outline: 0` without providing a custom focus indicator

## Mobile nav toggle keyboard activation (RULE-A6)

The toggle button that opens and closes the mobile navigation menu is a native `<button>` element. Native `<button>` responds to Enter and Space by default. Do not implement the toggle as a `<div>` with an `onClick` handler — that breaks keyboard activation.

## Filter fieldset (RULE-A7)

The press filter controls in `PressFilter.tsx` are wrapped in a `<fieldset>`:

```tsx
<fieldset>
  <legend>Filter press entries</legend>
  {/* keyword input, publication select, year select */}
</fieldset>
```

## Reduced motion (RULE-A8)

Any CSS transition or smooth scrolling behavior must be wrapped in a `prefers-reduced-motion` check:

```css
@media (prefers-reduced-motion: no-preference) {
  html {
    scroll-behavior: smooth;
  }
}
```

In Tailwind, use the `motion-safe:` variant:
```tsx
className="motion-safe:transition-opacity motion-safe:duration-200"
```

## Design system: link hover color (RULE-G1)

Link hover state uses `#333333`. Never use `#555555` for a link hover state. `#555555` is the secondary text color — using it as a hover state signals a deactivated/disabled link, which is the wrong affordance.

Tailwind token for hover: add `link-hover: '#333333'` to the color palette in `tailwind.config.ts`.

## Design system: no accent color (RULE-G2)

The palette contains:
- `#111111` — primary text
- `#FFFFFF` — background
- `#555555` — secondary text
- `#E5E5E5` — borders
- `#0057FF` — focus rings only

No additional colors may be introduced. If the client provides a brand color, stop and surface it as a change request.

## In-page nav: desktop only (RULE-G3)

The biography section navigation (table of contents) on the Home page:
- Renders on desktop (`lg:` breakpoint and above)
- Is hidden on mobile using `hidden lg:block` or equivalent

## Gallery layout (RULE-G4)

`components/PhotoGallery.tsx` implements:
- Desktop (lg+): 3-column masonry grid
- Tablet (md): 2 columns
- Mobile: 1 column

Do not alter this layout without a scope change request.