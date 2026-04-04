# Project Architecture

This file contains shared project architecture information for all AI agents.

## Project

Toolsify AI — an open-source AI tools directory built with Next.js 14 App Router, TypeScript, Supabase, and Tailwind
CSS. Deployed on Vercel at https://toolsify.ai.

## Commands

```bash
pnpm i          # Install dependencies
pnpm dev        # Dev server (0.0.0.0)
pnpm build      # Production build
pnpm lint       # ESLint checks
pnpm lint:fix   # Auto-fix lint issues
pnpm prettier   # Format all files
pnpm blog:new   # Scaffold a new blog post
pnpm brand:check # Check for legacy "tap4-ai" references (runs in pre-commit hook)
```

No test runner is configured. Quality gates are `pnpm lint` and `pnpm build`.

## Architecture

### Routing

All routes live under `app/[locale]/` using next-intl. Default locale is `en`; other locales use `/{locale}/` prefix.
Route groups:

- `(with-footer)/` — pages that include the Footer component
  - `(home)/` — homepage, search results
  - `category/[code]/` — category listing with pagination
  - `ai/[websiteName]/` — individual AI tool detail pages
  - `blog/` — blog listing, individual posts `[slug]`, pagination
  - `explore/` — explore listing with pagination
  - `startup/` — startup directory
  - `submit/` — tool submission form
  - `(footer)/` — privacy-policy, terms-of-service
- `api/` — REST endpoints (submit, cron, crawler)

### Key directories

- `components/` — UI components organized by feature (ads, home, blog, seo, consent, webNav, common, ui)
- `lib/` — utilities, constants, SEO builders, blog post registry, ad slot config
- `lib/blog/` — blog post types and individual post files in `lib/blog/posts/items/`
- `db/supabase/` — Supabase client (browser + server), database types, SQL schema
- `messages/` — i18n JSON files (9 locales: en, cn, tw, de, es, fr, jp, pt, ru)
- `middlewares/intlMiddleware.ts` — next-intl middleware

### Data layer

Supabase (PostgreSQL) with two client patterns:

- `db/supabase/client.ts` — browser client (no cookies)
- `db/supabase/server.ts` — server client (with cookie management via `@supabase/ssr`)

Three tables: `web_navigation` (AI tool listings), `navigation_category`, `submit` (user submissions).

### Internationalization

9 locales via next-intl. Use `useTranslations('Namespace')` hook for all user-visible text. Translation JSON files in
`messages/{locale}.json`. Blog posts have inline translations (en, cn, tw, de, es, fr, jp, pt, ru keys in each post
file).

### AdSense

Ad slot IDs are configured in `lib/ad-slots.config.ts`, mapped to named slots in `lib/adsense-slots.ts`, and rendered
via components in `components/ads/` (`ResponsiveAd`, `InFeedAd`, `LazyAd`, `SidebarAd`).

### SEO

Dynamic sitemap (`app/sitemap.ts`), robots.txt (`app/robots.ts`), JSON-LD structured data
(`components/seo/StructuredData.tsx`), OpenGraph, Twitter cards, and hreflang alternates. SEO metadata builders in
`lib/seo.ts`.

### Branding

The project was renamed from "tap4-ai" to "toolsify-ai". The pre-commit hook runs `pnpm brand:check` to block any legacy
`tap4-ai` references from entering the codebase.

## Code conventions

- React Server Components by default. Add `'use client'` only when needed (interactivity, hooks, browser APIs).
- Prettier: 2-space indent, single quotes (including JSX), trailing commas, 120 print width, semicolons.
- ESLint: extends `next/core-web-vitals`, `prettier`, `airbnb`, `airbnb-typescript`.
- Imports are auto-sorted by `@ianvs/prettier-plugin-sort-imports`. Order: react → next → builtins → third-party → types
  → `@/` aliases (env, types, config, lib, hooks, components/ui, components, styles, app) → relative.
- Tailwind classes are auto-sorted by `prettier-plugin-tailwindcss`.
- Use `cn()` from `lib/utils` (clsx + tailwind-merge) for conditional class merging.
- Use `next/image` `Image` component instead of `<img>`.
- `<button>` elements must have `type` attribute.
- External links with `target="_blank"` must include `rel="noreferrer"`.
- Avoid array index as `key` — use meaningful identifiers.
- Avoid nested ternaries — use `cn()` with conditionals instead.
- `import/prefer-default-export` is enforced — use default export for single-export modules.
- Pre-commit hook runs `pnpm brand:check` + `lint-staged` (ESLint + Prettier).
- Git commit convention: `feat(scope): description` or `fix(scope): description` (Chinese or English).

## Environment variables

Copy `.env.example` to `.env.local`. Key variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_ADSENSE_CLIENT_ID`, `CRAWLER_API_KEY`,
`CRON_AUTH_KEY`, `SUBMIT_AUTH_KEY`.

## Verification

Before claiming work complete, always run:

```bash
pnpm lint
pnpm build
```

Verify the output confirms clean lint and successful build.
