# Repository Guidelines

## Project Structure & Module Organization
This project is a Next.js 14 + TypeScript app-router codebase.

- `app/`: route groups, pages, layouts, and API routes (`app/api/*`).
- `components/`: reusable UI and feature components (`ads`, `home`, `ui`, etc.).
- `lib/`: shared utilities, constants, data access helpers, styling helpers.
- `messages/`: locale JSON files for `next-intl`.
- `public/`: static assets (images, icons, `robots.txt`, `ads.txt`).
- `db/supabase/`: SQL and Supabase client/types.
- `docs/`: implementation notes and operational guides.
- `scripts/`: small maintenance scripts.

## Build, Test, and Development Commands
Use `pnpm` (required by `package.json` engines).

- `pnpm i`: install dependencies.
- `pnpm dev`: start local dev server on `0.0.0.0`.
- `pnpm build`: production build validation.
- `pnpm start`: run production server.
- `pnpm lint`: run Next.js ESLint checks.
- `pnpm lint:fix`: auto-fix lint issues.
- `pnpm prettier`: format repository files.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Formatting: Prettier (`tabWidth: 2`, single quotes, trailing commas, `printWidth: 120`).
- Linting: ESLint (`next/core-web-vitals`, Airbnb, TypeScript rules).
- Imports: sorted via `@ianvs/prettier-plugin-sort-imports`; Tailwind classes sorted automatically.
- Naming: components in `PascalCase` (`HeroSection.tsx`), utility modules in `camelCase` (`stringUtils.ts`), route folders in Next.js conventions (`[param]`, `(group)`).

## Testing Guidelines
There is currently no `pnpm test` script in this repository. For now, treat quality gates as:

1. `pnpm lint`
2. `pnpm build`

When adding tests, colocate as `*.test.ts`/`*.test.tsx` or under `__tests__/`, and prefer React Testing Library for UI behavior.

## Commit & Pull Request Guidelines
- Keep commits small and focused; use short, imperative subjects (history includes both Chinese and English).
- Recommended pattern: `feat(scope): add startup mobile table sorting` (or concise non-prefixed equivalent).
- PRs should include:
  - what changed and why,
  - linked issue (if any),
  - screenshots/GIFs for UI changes,
  - verification notes (`pnpm lint`, `pnpm build`).

## Security & Configuration Tips
- Copy `.env.example` and keep secrets in `.env.local`; never commit credentials.
- Review ad/crawler keys carefully before deployment (`CRAWLER_API_KEY`, `CRON_AUTH_KEY`, `SUBMIT_AUTH_KEY`).
