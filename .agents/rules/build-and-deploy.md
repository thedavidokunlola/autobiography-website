---
description: Rules governing the build process, TypeScript strictness, static generation, pre-build scripts, and deployment verification.
globs: ["package.json", "next.config.ts", "tsconfig.json", "scripts/**/*.ts", "tailwind.config.ts"]
alwaysApply: true
---

# Build and Deploy Rules

## Pre-build hooks must both run (RULE-B1)

`package.json` must define a `prebuild` script that runs both pre-build scripts in sequence:

```json
{
  "scripts": {
    "prebuild": "ts-node scripts/detect-placeholders.ts && ts-node scripts/validate-data.ts",
    "build": "next build"
  }
}
```

The `&&` operator means: if `detect-placeholders.ts` fails, `validate-data.ts` does not run, and `next build` does not run. This is correct — a failing pre-build check must block the build entirely.

Never move either script out of `prebuild` into a CI-only check. They must run locally and in Vercel's build pipeline identically.

## Zero TypeScript errors and warnings (RULE-B2)

`next build` must complete cleanly. Check these specific failure modes:

**`@ts-ignore`:** Permitted only with a comment explaining:
1. Why the type system cannot model this case
2. Which PRD requirement or open question creates the gap

```typescript
// @ts-ignore: next/image type narrowing issue with dynamic src — see PRD Open Question #6
```

**Implicit `any`:** `strict: true` in `tsconfig.json` catches most of these. Do not disable `noImplicitAny`.

**Unused imports:** Remove them. TypeScript strict mode does not catch all of these — run the build and check.

**`tsconfig.json` required settings:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## All pages must be statically generated (RULE-P3)

`next.config.ts` must not set `output: 'server'` or `output: 'standalone'`. The correct setting is `output: 'export'` for full static export, or the default (no `output` key) for Vercel's static optimization.

Never use in any page file:
```typescript
export const dynamic = 'force-dynamic'
export const revalidate = 0
```

Every page must be renderable at build time from the `/data/` files alone. No runtime data fetching.

## Vercel preview verification before merge (RULE-B3)

The agent cannot enforce Git branch protection policies. The agent must, however, include the following statement in every task completion output:

> "Before merging this change to main: verify the Vercel preview deployment at the preview URL. Confirm the affected pages render correctly, all links work, and no placeholder values appear in the output."

This is not optional wording. It is a required part of the task completion handoff.

## Client Component restriction (RULE-B4)

In v1, `"use client"` is permitted in exactly two components:
1. `components/PressFilter.tsx`
2. The mobile navigation toggle

If a new `"use client"` directive is required, the task output must include:
- The name of the new Client Component
- The specific React hook or browser API that makes Server Component rendering impossible
- The PRD section that necessitates the interactive behavior

Without this justification, the addition is a scope violation.

## Folder structure is canonical

Do not:
- Rename `/data/` to `/content/` or `/cms/` or any other name
- Move `/lib/formatDate.ts` into `/utils/` or `/helpers/`
- Add a `/types/` directory — interfaces are colocated with their consumers or in the data files
- Add a `/hooks/` directory — custom hooks require `"use client"` and are restricted by RULE-B4
- Create subdirectories inside `/data/`

The structure in Section 4 of `AGENTS.md` is the canonical structure. Changes require explicit instruction.

## Environment variables

| Variable | Required | Used In |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Yes | `app/layout.tsx` via `<GoogleAnalytics>` |

- Never hardcode `NEXT_PUBLIC_GA_ID` in source (RULE-V2)
- Set in Vercel environment variables for production
- Set in `.env.local` for local development
- `.env.local` is in `.gitignore` — never commit it

## next.config.ts requirements

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Vercel static optimization — do not set output: 'server' or 'standalone'
  images: {
    // Only local images from /public — no remote domains in v1
    remotePatterns: [],
  },
}

export default nextConfig
```

Do not add `remotePatterns` entries for image CDNs or external hosts. All images are served from `/public/`.

## Tailwind config: design tokens

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'background': '#FFFFFF',
        'text-primary': '#111111',
        'text-secondary': '#555555',
        'border': '#E5E5E5',
        'link': '#111111',
        'link-hover': '#333333',  // RULE-G1: never use text-secondary for link hover
        'focus': '#0057FF',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
}

export default config
```

Do not add color tokens not present in the PRD color table (RULE-G2).