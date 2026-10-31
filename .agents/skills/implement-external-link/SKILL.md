---
name: implement-external-link
description: >
  Load this skill when the task involves any of these words:
  "external link", "open in new tab", "article link", "learn more link",
  "social link", "press link", "outbound link", "target blank".
---

## What this skill does

Teaches the complete ordered implementation for any anchor tag that opens in a new browser tab. This pattern applies to press article title links, work entry `Learn more` links, social media links in the Footer and Contact page, and gallery photo links. The laws are in `rules/components.md` (RULE-A4, RULE-A5, RULE-A8) and `rules/analytics-and-privacy.md`.

---

## Steps

1. **Identify whether this link is tracked in the GA4 event plan.**
   Check the tracking plan in the PRD (Analytics section). Links that require a `sendGAEvent` call:
   - Press article title links → `press_entry_click`
   - Work `Learn more` links → `work_entry_click`
   - Social media links → `social_click`
   - Gallery photo links → `photo_click`
   
   If the link is tracked, this component must be a Client Component or the `onClick` must be passed as a prop from a Client Component parent. Resolve the Server/Client question before writing the link. Load `create-component` if needed.

2. **Write the anchor tag with the required attributes.**
   Three attributes are required on every external link, with no exceptions:
   - `target="_blank"`
   - `rel="noopener noreferrer"`
   - `href={url}` where `url` is a non-empty string

3. **Add the `sr-only` span inside the anchor.**
   This is the only accepted pattern for communicating "opens in new tab" to screen readers. Do not use `aria-label` as a substitute. (RULE-A4)
```tsx
   <span className="sr-only">(opens in new tab)</span>
```
   Place this span after the visible link content, not before it.

4. **Apply the focus ring class.**
   Every interactive element must display `2px solid #0057FF` on keyboard focus. Use the Tailwind utility classes: (RULE-A5)
   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus

   The `focus` token maps to `#0057FF` in `tailwind.config.ts`.

5. **Apply the hover color class if this is a text link.**
   Use the `link-hover` token (`#333333`), not the `text-secondary` token (`#555555`). (RULE-G1)

hover:text-link-hover
6. **Add the `sendGAEvent` call if Step 1 identified this link as tracked.**
   Place the call in an `onClick` handler. Load `implement-ga4-event` for the correct event shape.

7. **Add a comment referencing RULE-A4.**
```tsx
   {/* RULE-A4: sr-only span is required pattern, not aria-label */}
```

---

## Code skeleton

```tsx
{/* Untracked external link */}

  href={url}
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-link-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
>
  {linkText}
  {/* RULE-A4: sr-only span is required pattern, not aria-label */}
  <span className="sr-only">(opens in new tab)</span>
</a>

{/* Tracked external link — press article example */}

  href={entry.url}
  target="_blank"
  rel="noopener noreferrer"
  className="hover:text-link-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
  onClick={() =>
    sendGAEvent('press_entry_click', {
      publication: entry.publication,
      article_title: entry.title,
    })
  }
>
  {entry.title}
  {/* RULE-A4: sr-only span is required pattern, not aria-label */}
  <span className="sr-only">(opens in new tab)</span>
</a>
```

---

## Traps

- **Using `aria-label` instead of the `sr-only` span.** `aria-label` on an anchor replaces all of its text content for screen readers. The `sr-only` span appends "(opens in new tab)" after the visible text. They are not equivalent. RULE-A4 specifies the span. (RULE-A4)
- **Missing `rel="noopener noreferrer"`.** `target="_blank"` without `rel="noopener noreferrer"` is a security vulnerability (reverse tabnapping) and a Lighthouse Best Practices failure.
- **Placing the `sr-only` span before the link text.** Screen readers read the span content after the visible text. Placing it first reads "(opens in new tab) Article Title" — grammatically wrong.
- **Using `#555555` as the hover color.** This is the secondary text token, not the hover token. It signals deactivation. Use `link-hover` (`#333333`). (RULE-G1)
- **Forgetting the focus ring on a link styled as a button or card.** A link that looks like a button still needs the `focus-visible:outline` classes. Styling does not exempt an element from RULE-A5.
- **Adding a `sendGAEvent` call to a Server Component.** `sendGAEvent` is a client-side function. If the link is in a Server Component, pass the `onClick` as a prop from a Client Component parent, or move the link into a Client Component.

---

## Verify before done

- [ ] `href` is a non-empty URL string
- [ ] `target="_blank"` is present
- [ ] `rel="noopener noreferrer"` is present
- [ ] `<span className="sr-only">(opens in new tab)</span>` is inside the anchor, after the visible text (RULE-A4)
- [ ] Focus ring classes applied: `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus` (RULE-A5)
- [ ] Hover color uses `link-hover` token, not `text-secondary` (RULE-G1)
- [ ] If tracked: `sendGAEvent` call present with correct event name and parameters
- [ ] If tracked: component is a Client Component or receives `onClick` from a Client Component parent (RULE-B4)
- [ ] `// RULE-A4` comment present
- [ ] `next build` completes with zero TypeScript errors
- [ ] Link opens correct URL in a new tab (manual verification in preview)
- [ ] Link is reachable and operable via Tab key
- [ ] Focus ring is visible on keyboard focus

**Tests to write:**
- Render test confirming `target="_blank"` and `rel="noopener noreferrer"` are present on the anchor
- Render test confirming the `sr-only` span with text "(opens in new tab)" exists inside the anchor
- Accessibility test confirming the link has an accessible name