---
description: Rules for GA4 integration, event tracking implementation, environment variable usage, and the NDPR/GDPR privacy hold on keyword filter logging.
globs: ["app/**/*.tsx", "components/PressFilter.tsx"]
alwaysApply: true
---

# Analytics and Privacy Rules

## GA4 Measurement ID from environment variable only (RULE-V2)

The GA4 Measurement ID is read exclusively from `process.env.NEXT_PUBLIC_GA_ID`. It is never hardcoded in source code.

Correct:
```tsx
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  )
}
```

Wrong:
```tsx
<GoogleAnalytics gaId="G-XXXXXXXXXX" />  // ← hardcoded ID, never do this
```

A hardcoded Measurement ID cannot be rotated without a code change and constitutes a data governance risk. It also leaks the client's analytics configuration publicly in the source repository.

## No third-party scripts beyond GA4 (RULE-V3)

The only third-party script permitted on any page is GA4, loaded via `@next/third-parties/google`. No additions:

- No Google Tag Manager
- No Meta Pixel / Facebook Pixel
- No Hotjar, Clarity, or session recording tools
- No chat widgets (Intercom, Crisp, etc.)
- No A/B testing scripts
- No affiliate tracking pixels

Each additional third-party script introduces:
1. A DNS lookup that degrades LCP
2. Data sharing with a third party the client has not consented to
3. Potential Lighthouse Best Practices score degradation

## Custom event implementation

All custom events use `sendGAEvent` from `@next/third-parties/google`:

```typescript
import { sendGAEvent } from '@next/third-parties/google'
```

### Correct event implementations

```typescript
// Press entry click
sendGAEvent('press_entry_click', {
  publication: entry.publication,
  article_title: entry.title,
})

// Work entry click
sendGAEvent('work_entry_click', {
  organization: entry.organization,
  category: entry.category,
})

// Contact click (press)
sendGAEvent('contact_click', {
  link_type: 'press_email',
  link_url: `mailto:${contactInfo.pressEmail}`,
})

// Contact click (bookings)
sendGAEvent('contact_click', {
  link_type: 'bookings_email',
  link_url: `mailto:${contactInfo.bookingsEmail}`,
})

// Social click
sendGAEvent('social_click', {
  platform: social.platform.toLowerCase(),
  location: 'footer', // or 'contact_page'
})

// Photo click
sendGAEvent('photo_click', {
  photo_alt: photo.alt,
})

// Filter applied — see PRIVACY HOLD below
```

## PRIVACY HOLD: keyword filter value logging (RULE-V1)

The `filter_applied` event for keyword searches must not log the `filter_value` parameter until NDPR/GDPR compliance is confirmed.

**Required implementation in `components/PressFilter.tsx`:**

```typescript
const handleKeywordChange = (value: string) => {
  setKeyword(value)

  // PRIVACY HOLD: keyword filter_value withheld pending NDPR/GDPR compliance confirmation (RULE-V1)
  // Log filter_type only. Do not log filter_value for keyword searches until legal review is complete.
  sendGAEvent('filter_applied', {
    filter_type: 'keyword',
    // filter_value: value  ← intentionally commented out — PRIVACY HOLD
  })
}

const handlePublicationChange = (value: string) => {
  setSelectedPublication(value)
  sendGAEvent('filter_applied', {
    filter_type: 'publication',
    filter_value: value,  // publication name is not user-generated PII
  })
}

const handleYearChange = (value: string) => {
  setSelectedYear(value)
  sendGAEvent('filter_applied', {
    filter_type: 'year',
    filter_value: value,  // year is not user-generated PII
  })
}
```

The `// PRIVACY HOLD` comment must be present. It is grep-able via:
```bash
grep -r "PRIVACY HOLD" ./components ./app
```

This comment must appear in the codebase until a human decision is made to enable keyword logging. The agent must not remove it, enable the logging, or resolve the hold unilaterally.

**Why:** User-typed search terms in the keyword filter constitute user-generated data. Logging them to GA4 without a consent mechanism may violate the Nigerian Data Protection Regulation (NDPR) and/or GDPR if EU visitors access the site. This is an open question (PRD Open Question #1) that requires client legal review, not a developer decision.

## GA4 custom dimensions

Before launch, two custom dimensions must be created in the GA4 property by the client or developer:

| Dimension Name | Scope | Purpose |
|---|---|---|
| `link_type` | Event | Distinguishes press vs bookings email clicks in `contact_click` |
| `filter_type` | Event | Categorizes filter type in `filter_applied` |

Without these dimensions, event parameters are not surfaced in standard GA4 reports. Creating them is a launch checklist item, not a code change.

## GA4 loading pattern

GA4 is loaded in `app/layout.tsx` via `<GoogleAnalytics>`. This component automatically defers the GA script so it does not block rendering. Do not:
- Load GA4 via a `<script>` tag in `<head>`
- Use `next/script` with `strategy="beforeInteractive"` for GA4
- Load GA4 on individual pages — it belongs in the root layout only