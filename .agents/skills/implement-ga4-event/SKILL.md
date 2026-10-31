---
name: implement-ga4-event
description: >
  Load this skill when the task involves any of these words:
  "GA4 event", "track click", "sendGAEvent", "analytics event",
  "custom event", "track interaction", "event tracking", "filter_applied",
  "contact_click", "press_entry_click", "social_click", "photo_click",
  "work_entry_click", "filter event", "tracking plan".
---

## What this skill does

Teaches the ordered procedure for implementing a GA4 custom event using `sendGAEvent`. The laws are in `rules/analytics-and-privacy.md` (RULE-V1, RULE-V2, RULE-V3) and `AGENTS.md` Section 3 (Privacy and Analytics rules).

---

## Steps

1. **Look up the event in the PRD tracking plan before writing any code.**
   The PRD (Analytics section) defines all seven custom events: their names, triggers, and exact parameter shapes. Do not invent event names or parameter names. Use the exact strings from the table.

2. **Check whether this event is the keyword filter event.**
   If `event_name` is `filter_applied` and `filter_type` is `"keyword"`, the PRIVACY HOLD applies. Go to Step 3a. For all other events, go to Step 3b.

3a. **PRIVACY HOLD path — keyword filter event only.**
   Log `filter_type` only. Do not log `filter_value`. Write the call and the required comment exactly as follows: (RULE-V1)
```typescript
   // PRIVACY HOLD: keyword filter_value withheld pending NDPR/GDPR compliance confirmation (RULE-V1)
   sendGAEvent('filter_applied', {
     filter_type: 'keyword',
     // filter_value: value  ← intentionally omitted — PRIVACY HOLD
   })
```
   Do not remove this comment. Do not enable `filter_value` logging without an explicit instruction from the project owner referencing a legal review outcome.

3b. **Standard path — all other events.**
   Construct the event call using the exact parameter names and value types from the PRD tracking plan:
```typescript
   sendGAEvent('event_name', {
     parameter_key: parameterValue,
   })
```

4. **Confirm the component is a Client Component.**
   `sendGAEvent` is a client-side function imported from `@next/third-parties/google`. It cannot run in a Server Component. The component that contains the `onClick` handler must have `"use client"`. If the interactive element is in a Server Component, extract it into a small Client Component or pass the `onClick` as a prop. (RULE-B4)

5. **Import `sendGAEvent` correctly.**
```typescript
   import { sendGAEvent } from '@next/third-parties/google'
```
   Do not import from `'next/third-parties'` (wrong path). Do not use `window.gtag` directly.

6. **Place the `sendGAEvent` call in the `onClick` handler.**
   Do not place it in a `useEffect`. Events fire in response to user action, not on mount or render.
```tsx
   onClick={() => sendGAEvent('event_name', { ... })}
```

7. **Confirm the GA4 Measurement ID is not hardcoded anywhere.**
   The ID is read from `process.env.NEXT_PUBLIC_GA_ID` in `app/layout.tsx` via the `<GoogleAnalytics>` component. You are adding an event call, not loading GA4. No Measurement ID appears in event call code. (RULE-V2)

8. **Verify the event fires in GA4 DebugView.**
   In the browser, open Chrome DevTools → Application → set `?gtm_debug=x` or enable GA4 DebugView in the GA4 property. Trigger the interaction. Confirm the event name and parameters appear in DebugView within 30 seconds.

---

## Code skeleton

```typescript
import { sendGAEvent } from '@next/third-parties/google'

// press_entry_click
sendGAEvent('press_entry_click', {
  publication: entry.publication,
  article_title: entry.title,
})

// work_entry_click
sendGAEvent('work_entry_click', {
  organization: entry.organization,
  category: entry.category,
})

// contact_click — press
sendGAEvent('contact_click', {
  link_type: 'press_email',
  link_url: `mailto:${contactInfo.pressEmail}`,
})

// contact_click — bookings
sendGAEvent('contact_click', {
  link_type: 'bookings_email',
  link_url: `mailto:${contactInfo.bookingsEmail}`,
})

// social_click
sendGAEvent('social_click', {
  platform: social.platform.toLowerCase(),
  location: 'footer', // or 'contact_page'
})

// photo_click
sendGAEvent('photo_click', {
  photo_alt: photo.alt,
})

// filter_applied — publication or year (standard path)
sendGAEvent('filter_applied', {
  filter_type: 'publication', // or 'year'
  filter_value: value,
})

// filter_applied — keyword (PRIVACY HOLD path)
// PRIVACY HOLD: keyword filter_value withheld pending NDPR/GDPR compliance confirmation (RULE-V1)
sendGAEvent('filter_applied', {
  filter_type: 'keyword',
  // filter_value: value  ← intentionally omitted — PRIVACY HOLD
})
```

---

## Traps

- **Using `window.gtag` directly.** The project uses `@next/third-parties/google`. `sendGAEvent` is the correct API. `window.gtag` bypasses the abstraction and is not type-safe.
- **Adding a `sendGAEvent` call to a Server Component.** It will throw at runtime. The component must be a Client Component.
- **Inventing event names not in the PRD tracking plan.** Custom dimensions `link_type` and `filter_type` are pre-created in the GA4 property for the seven defined events. An invented event name with different parameters will not appear in standard GA4 reports.
- **Removing or resolving the PRIVACY HOLD comment.** Only a project owner instruction following a confirmed legal review can remove this hold. The agent must not remove it independently.
- **Placing `sendGAEvent` in `useEffect`.** Events track user intent. A `useEffect` with no dependency fires on mount — that tracks page load, not a click. All events in the tracking plan are interaction events and belong in `onClick` or `onChange` handlers.
- **Using uppercase for the `platform` value in `social_click`.** The PRD parameter value is lowercase (e.g., `"twitter"`, `"linkedin"`). Call `.toLowerCase()` on the platform string from the data file.

---

## Verify before done

- [ ] Event name matches the PRD tracking plan exactly
- [ ] All parameter keys and value types match the PRD tracking plan exactly
- [ ] If `filter_type: "keyword"`: PRIVACY HOLD comment present and `filter_value` is omitted (RULE-V1)
- [ ] `sendGAEvent` imported from `'@next/third-parties/google'`
- [ ] Call placed in an `onClick` or `onChange` handler, not in `useEffect`
- [ ] Component containing the call has `"use client"` directive (RULE-B4)
- [ ] No Measurement ID appears in the event call code (RULE-V2)
- [ ] No new third-party analytics script introduced (RULE-V3)
- [ ] `next build` completes with zero TypeScript errors
- [ ] Event fires and appears in GA4 DebugView with correct name and parameters (manual verification)
- [ ] `// PRIVACY HOLD` comment is grep-able: `grep -r "PRIVACY HOLD" ./components ./app` returns at least one result (RULE-V1)
- [ ] Vercel preview deployment verified before merge to `main` (RULE-B3)

**Tests to write:**
- Unit test confirming `sendGAEvent` is called with the correct event name and parameter shape on the expected user interaction
- Unit test for the keyword filter confirming `filter_value` is not passed in the `sendGAEvent` call