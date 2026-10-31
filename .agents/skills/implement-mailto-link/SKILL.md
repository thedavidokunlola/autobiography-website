---
name: implement-mailto-link
description: >
  Load this skill when the task involves any of these words:
  "mailto", "email link", "press email", "bookings email", "contact email",
  "press inquiry link", "speaking engagements link", "header email link".
---

## What this skill does

Teaches the ordered implementation for `mailto:` links, which are distinct from external links. `mailto:` links open the user's email client — they do not open a new tab. The laws are in `rules/components.md` (RULE-P1, RULE-P9, RULE-A5) and `rules/analytics-and-privacy.md` (RULE-V1, RULE-V2).

---

## Steps

1. **Confirm the email address is in `data/contact.ts`.**
   Do not hardcode an email address directly in a component. Read it from `contactInfo.pressEmail` or `contactInfo.bookingsEmail`. (RULE-D1 — data lives in `/data/` only)

2. **Confirm no `<form>` element is involved.**
   A `mailto:` link is not a form. There is no `<input>`, no `<button type="submit">`, no `<form>` wrapper. The entire contact mechanism is a plain anchor tag. (RULE-P1)

3. **Write the anchor tag.**
   `mailto:` links do not use `target="_blank"`. They do not open a new tab — they hand off to the OS mail client. Attributes required:
   - `href={`mailto:${email}`}`
   
   Attributes explicitly not used:
   - No `target="_blank"`
   - No `rel="noopener noreferrer"`
   - No `<span className="sr-only">(opens in new tab)</span>`

4. **Apply the focus ring class.** (RULE-A5)
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus


5. **Apply the hover color class if this is a text link.** (RULE-G1)

hover:text-link-hover
6. **Add the `sendGAEvent` call.**
   Every `mailto:` link on this site is tracked. Use the `contact_click` event. The `link_type` parameter distinguishes press from bookings. (PRD Analytics section)
   - Press inquiry link → `link_type: "press_email"`
   - Bookings link → `link_type: "bookings_email"`
   
   Load `implement-ga4-event` if the event call shape is unclear.

7. **Confirm this component is a Client Component if it contains `sendGAEvent`.**
   `sendGAEvent` is a client-side function. The component holding the `onClick` handler must have `"use client"` or receive the `onClick` as a prop from a Client Component parent. (RULE-B4)

8. **Verify the Header contains the press inquiry mailto link.**
   If this task involves the press inquiry link, confirm it exists in `Header.tsx` and is visible in the navigation bar without scrolling on all viewport sizes. (RULE-P9)

---

## Code skeleton

```tsx
"use client"
// Client Component: requires onClick for sendGAEvent — RULE-B4

import { sendGAEvent } from '@next/third-parties/google'
import { contactInfo } from '@/data/contact'

{/* Press inquiry mailto link */}

  href={`mailto:${contactInfo.pressEmail}`}
  className="hover:text-link-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
  onClick={() =>
    sendGAEvent('contact_click', {
      link_type: 'press_email',
      link_url: `mailto:${contactInfo.pressEmail}`,
    })
  }
>
  Press Inquiries
</a>

{/* Bookings mailto link */}

  href={`mailto:${contactInfo.bookingsEmail}`}
  className="hover:text-link-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
  onClick={() =>
    sendGAEvent('contact_click', {
      link_type: 'bookings_email',
      link_url: `mailto:${contactInfo.bookingsEmail}`,
    })
  }
>
  Speaking Engagements
</a>
```

---

## Traps

- **Adding `target="_blank"` to a `mailto:` link.** Some browsers ignore it, others open a blank tab before handing off to the mail client. The behavior is inconsistent and wrong. `mailto:` links never use `target="_blank"`.
- **Adding the `sr-only` "(opens in new tab)" span.** This span communicates tab behavior. `mailto:` links do not open a tab. Adding it misleads screen reader users. Do not include it.
- **Adding `rel="noopener noreferrer"`.** This attribute is for `target="_blank"` links. It has no meaning on a `mailto:` link.
- **Hardcoding the email address in the component.** The email address lives in `data/contact.ts`. Reading it from there means a single content update propagates everywhere. Hardcoding creates a maintenance failure.
- **Missing the `sendGAEvent` call.** Both `mailto:` links are in the GA4 tracking plan. An untracked email click is a missing KPI data point. The PRD explicitly tracks these as the primary conversion events.
- **Forgetting RULE-P9 for the press inquiry link.** The press inquiry `mailto:` must appear in the Header on every page without scrolling. After implementing or moving this link, confirm it is still present and visible in `Header.tsx`.

---

## Verify before done

- [ ] Email address read from `data/contact.ts`, not hardcoded in the component
- [ ] `href` is `mailto:${contactInfo.pressEmail}` or `mailto:${contactInfo.bookingsEmail}`
- [ ] No `target="_blank"` on the anchor
- [ ] No `rel="noopener noreferrer"` on the anchor
- [ ] No `sr-only` "(opens in new tab)" span inside the anchor
- [ ] Focus ring classes applied (RULE-A5)
- [ ] Hover color uses `link-hover` token (RULE-G1)
- [ ] `sendGAEvent('contact_click', { link_type: ..., link_url: ... })` present in `onClick`
- [ ] `link_type` is `"press_email"` or `"bookings_email"` — not any other value
- [ ] Component has `"use client"` directive with justification comment (RULE-B4)
- [ ] If this is the press inquiry link: it is visible in `Header.tsx` without scrolling on all viewports (RULE-P9)
- [ ] No `<form>` element anywhere near this link (RULE-P1)
- [ ] `next build` completes with zero TypeScript errors
- [ ] Clicking the link opens the correct email address in the default mail client (manual verification)
- [ ] GA4 `contact_click` event fires with correct parameters (verify in GA4 DebugView)
- [ ] Vercel preview deployment verified before merge to `main` (RULE-B3)

**Tests to write:**
- Render test confirming the `href` attribute contains the correct `mailto:` value from `contactInfo`
- Render test confirming no `target="_blank"` attribute is present
- Unit test confirming `sendGAEvent` is called with the correct `link_type` parameter on click