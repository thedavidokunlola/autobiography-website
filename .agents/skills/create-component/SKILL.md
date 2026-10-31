---
name: create-component
description: >
  Load this skill when the task involves any of these words:
  "create component", "new component", "build component", "add component",
  "write component", "new UI element", "new widget", "new section".
---

## What this skill does

Teaches the decision sequence for creating a new component file in `/components/`. The laws are in `rules/components.md` (RULE-A1 through RULE-A8, RULE-B4, RULE-G1, RULE-G2) and `AGENTS.md` Section 5.

---

## Steps

1. **Confirm the component is described in the PRD or AGENTS.md.**
   If the component is not described in either document, stop. Do not build it. Surface the gap as a question. (AGENTS.md Section 7, Rule 1)

2. **Decide: Server Component or Client Component.**
   Ask these questions in order. Stop at the first Yes.
   - Does this component use `useState`? → Client Component.
   - Does this component use `useEffect`? → Client Component.
   - Does this component use any browser API (`window`, `document`, `localStorage`)? → Client Component.
   - Does this component attach event listeners that require client-side state? → Client Component.
   If none of the above apply → Server Component. Do not add `"use client"`.
   
   In v1, only `PressFilter.tsx` and the mobile navigation toggle are permitted Client Components. Any additional Client Component requires written justification before proceeding. (RULE-B4)

3. **Name the file.**
   - Component files: PascalCase. The file name must match the component name exactly.
   - One component per file. No exceptions.

4. **Create the file at `/components/[ComponentName].tsx`.**
   Do not place it anywhere else. Do not create subdirectories inside `/components/`.

5. **Write the props interface directly above the component function.**
```typescript
   interface ComponentNameProps {
     // ...
   }
```
   Place the interface in a shared `types.ts` file only if this interface is used by three or more components.

6. **Add `"use client"` as the first line if and only if Step 2 determined this is a Client Component.**
   Add a comment on the next line explaining why:
```typescript
   "use client"
   // Client Component: requires useState for [specific reason] — RULE-B4
```

7. **Apply accessibility rules by default for every component.**
   Work through this checklist before writing JSX:
   - Does this component contain an `<img>` or `<Image>`? → `alt` is required and non-empty. (RULE-A1)
   - Does this component introduce a heading? → Confirm it fits the hierarchy. One H1 per page, no skipped levels. (RULE-A2)
   - Does this component contain any `<a target="_blank">`? → Apply the external link skill. Load `implement-external-link`.
   - Does this component contain any `<a href="mailto:...">`? → Apply the mailto link skill. Load `implement-mailto-link`.
   - Does this component contain any interactive element (button, input, link)? → Confirm focus ring class is applied. (RULE-A5)
   - Does this component contain any CSS transition or scroll behavior? → Wrap in `motion-safe:` or `prefers-reduced-motion` media query. (RULE-A8)

8. **Apply design system constraints.**
   - Do not introduce any color outside the five tokens defined in `tailwind.config.ts`. (RULE-G2)
   - Do not use `#555555` as a link hover color. Use `link-hover` token (`#333333`). (RULE-G1)
   - Do not use arbitrary Tailwind values (e.g., `w-[347px]`) without a comment explaining why.
   - Do not mix Tailwind classes with inline `style={}` on the same element.

9. **Use a default export only if Next.js requires it (page and layout files only).**
   All components in `/components/` use named exports:
```typescript
   export function ComponentName({ prop }: ComponentNameProps) { ... }
```

10. **Write a comment for every non-obvious implementation choice.**
    Reference the rule number if a rule is the reason:
```typescript
    // RULE-A4: sr-only span is the required pattern for external links, not aria-label
```

11. **Run `next build`.**
    Must complete with zero TypeScript errors and zero warnings. (RULE-B2)

---

## Code skeleton

```typescript
// "use client"
// Client Component: requires useState for [reason] — RULE-B4
// (Remove the two lines above if this is a Server Component)

interface ComponentNameProps {
  // explicitly typed props
}

export function ComponentName({ prop }: ComponentNameProps) {
  return (
    <section>
      {/* JSX here */}
    </section>
  )
}
```

---

## Traps

- **Adding `"use client"` by default.** This is the most common mistake. A component that only renders data from props is a Server Component. `"use client"` is opt-in, not opt-out.
- **Skipping the accessibility checklist.** Accessibility rules apply to every component. It is easy to write a component that compiles and renders correctly but fails RULE-A1 (missing alt), RULE-A2 (skipped heading), or RULE-A5 (missing focus ring).
- **Introducing a new color.** The palette is locked. A new hex value in a Tailwind class or `style={}` prop violates RULE-G2 and will need to be removed.
- **Inventing a new field not in the PRD data contracts.** If the component needs data that does not exist in the typed interfaces, stop and surface the gap. Do not add fields to the data files to make the component work.
- **Using `aria-label` on external links instead of the `sr-only` span.** RULE-A4 specifies the span pattern. `aria-label` replaces visible text; the span appends context. They are not interchangeable.
- **Default export on a component that is not a page or layout file.** Named exports are required everywhere except `app/` files where Next.js mandates a default export.

---

## Verify before done

- [ ] Component is described in the PRD or AGENTS.md
- [ ] Server vs Client determination made and documented with a comment if Client
- [ ] `"use client"` absent from Server Components
- [ ] No additional Client Components beyond `PressFilter.tsx` and nav toggle without written justification (RULE-B4)
- [ ] File is named in PascalCase and matches the component name exactly
- [ ] File is located at `/components/[ComponentName].tsx`
- [ ] Props interface is directly above the component function (or in shared `types.ts` if used by 3+ components)
- [ ] Named export used (not default export)
- [ ] All `<Image>` and `<img>` elements have non-empty `alt` (RULE-A1)
- [ ] Heading hierarchy is correct — no skipped levels (RULE-A2)
- [ ] All external links use `implement-external-link` pattern (RULE-A4)
- [ ] All `mailto:` links use `implement-mailto-link` pattern
- [ ] Focus ring class applied to all interactive elements (RULE-A5)
- [ ] CSS transitions wrapped in `motion-safe:` or reduced-motion media query (RULE-A8)
- [ ] No colors outside the five design tokens (RULE-G2)
- [ ] No `#555555` used as link hover color (RULE-G1)
- [ ] No arbitrary Tailwind values without a comment
- [ ] Non-obvious choices have comments referencing rule numbers
- [ ] `next build` completes with zero TypeScript errors
- [ ] Vercel preview deployment verified before merge to `main` (RULE-B3)

**Tests to write:**
- Render test confirming the component renders without throwing for its expected props
- Render test confirming the component renders the correct empty/null state when optional props are absent
- Accessibility snapshot test confirming heading levels are correct