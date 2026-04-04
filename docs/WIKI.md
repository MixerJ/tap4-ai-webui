# Toolsify AI WebUI — Comprehensive Wiki

> A single reference for developers, content authors, and contributors.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Getting Started](#3-getting-started)
4. [Directory Structure](#4-directory-structure)
5. [Data Layer](#5-data-layer)
6. [Routing](#6-routing)
7. [Internationalization (i18n)](#7-internationalization-i18n)
8. [Blog System](#8-blog-system)
9. [SEO](#9-seo)
10. [SEO Optimization Script](#10-seo-optimization-script)
11. [AdSense Integration](#11-adsense-integration)
12. [API Reference](#12-api-reference)
13. [Crawler Integration](#13-crawler-integration)
14. [Code Conventions](#14-code-conventions)
15. [Branding Rules](#15-branding-rules)
16. [Deployment](#16-deployment)
17. [Quality Gates](#17-quality-gates)
18. [Troubleshooting](#18-troubleshooting)

---

## 1. Project Overview

Toolsify AI is an open-source AI tools directory built with **Next.js 14** (App Router), **TypeScript**, **Supabase**, and **Tailwind CSS**. Deployed on Vercel at [https://toolsify.ai](https://toolsify.ai).

**Key Features:**
- AI tools directory with card listings, detail pages, search, category filtering, pagination
- Tool submission form with automatic crawler integration
- Blog system with 9-language inline translations
- Full i18n via `next-intl` (9 locales: en, cn, tw, de, es, fr, jp, pt, ru)
- Google AdSense integration (responsive, in-feed, sidebar, lazy-loaded ads)
- GDPR consent management (CMP)
- SEO: dynamic sitemap, robots.txt, JSON-LD structured data, OpenGraph, Twitter cards, hreflang
- Google Analytics (GA4)

---

## 2. Architecture

```
┌─────────────────────────────────────────────────┐
│                   Vercel Edge                    │
│  Next.js 14 App Router + React Server Components│
├─────────────────────────────────────────────────┤
│  app/[locale]/  ────  next-intl middleware       │
│  components/    ────  Radix UI + Tailwind CSS    │
│  lib/           ────  utilities, SEO, blog       │
│  db/supabase/   ────  @supabase/ssr clients      │
├─────────────────────────────────────────────────┤
│                   Supabase (PostgreSQL)           │
│  web_navigation │ navigation_category │ submit   │
├─────────────────────────────────────────────────┤
│  External: Crawler Service (Python/FastAPI)      │
│  External: Google AdSense / GA4                  │
└─────────────────────────────────────────────────┘
```

---

## 3. Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0 (npm and yarn are blocked via `engines` field)

### Setup

```bash
# Clone
git clone https://github.com/6677-ai/toolsify-ai-webui.git
cd toolsify-ai-webui

# Switch Node version
nvm use

# Install dependencies
pnpm i

# Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials and other keys

# Run dev server
pnpm dev
```

### Available Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (0.0.0.0) |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint checks |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm prettier` | Format all files |
| `pnpm blog:new` | Scaffold a new blog post |
| `pnpm brand:check` | Check for legacy "tap4-ai" references |
| `pnpm seo:list` | List unoptimized tools from Supabase |
| `pnpm seo:write` | Write SEO data back to Supabase |

---

## 4. Directory Structure

```
toolsify-ai-webui/
├── app/
│   ├── [locale]/               # All routes (locale-prefixed)
│   │   ├── (with-footer)/      # Pages with Footer
│   │   │   ├── (home)/         # Homepage, search results
│   │   │   ├── category/[code]/ # Category listing + pagination
│   │   │   ├── ai/[websiteName]/ # AI tool detail pages
│   │   │   ├── blog/           # Blog listing, [slug], pagination
│   │   │   ├── explore/        # Explore listing + pagination
│   │   │   ├── startup/        # Startup directory
│   │   │   ├── submit/         # Tool submission form
│   │   │   └── (footer)/       # Privacy policy, terms of service
│   │   └── api/                # REST endpoints
│   │       ├── cron/           # Scheduled task trigger
│   │       ├── cron_callback/  # Crawler result callback
│   │       └── submit/         # Tool submission API
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # robots.txt
├── components/
│   ├── ads/                    # AdSense components
│   ├── analytics/              # GA4, Clarity
│   ├── blog/                   # Blog card, list
│   ├── common/                 # Shared UI components
│   ├── consent/                # GDPR CMP
│   ├── explore/                # Explore page components
│   ├── home/                   # Homepage components
│   ├── image/                  # Image components
│   ├── page/                   # Page-level components
│   ├── seo/                    # Structured data, SEO helpers
│   ├── ui/                     # Radix-based primitives
│   └── webNav/                 # Navigation card components
├── db/supabase/
│   ├── client.ts               # Browser Supabase client
│   ├── server.ts               # Server Supabase client (with cookies)
│   ├── types.d.ts              # Database type definitions
│   └── *.sql                   # Schema and seed SQL files
├── docs/                       # Documentation
├── lib/
│   ├── blog.ts                 # Blog post aggregator
│   ├── blog/
│   │   ├── types.ts            # BlogPost interface
│   │   └── posts/
│   │       ├── legacy.ts       # "AI Tools" category index
│   │       ├── hotDeveloper.ts # "Developer" category index
│   │       ├── hotGeneral.ts   # "General User" category index
│   │       ├── hotProductOps.ts # "Product & Ops" category index
│   │       ├── STYLE_REFERENCE.ts # Writing style guide
│   │       └── items/          # Individual blog post files
│   ├── seo.ts                  # SEO metadata builders
│   ├── ad-slots.config.ts      # Ad slot ID configuration
│   └── adsense-slots.ts        # Named ad slot mapping
├── messages/                   # i18n JSON files (9 locales)
├── middlewares/
│   └── intlMiddleware.ts       # next-intl middleware
├── public/                     # Static assets
├── scripts/
│   ├── create-blog-post.js     # Blog post scaffolding tool
│   ├── optimize-seo.ts         # SEO optimization utility
│   └── check-branding.sh       # Branding check (pre-commit hook)
├── AGENTS.md                   # AI agent guidance
├── PROJECT.md                  # Shared architecture reference
├── CLAUDE.md                   # Claude Code pointer
└── package.json
```

---

## 5. Data Layer

### Supabase Clients

Two client patterns (both using `@supabase/ssr`):

| Client | File | Usage | Cookies |
|--------|------|-------|---------|
| Browser | `db/supabase/client.ts` | Client components | No |
| Server | `db/supabase/server.ts` | Server components, API routes | Yes |

### Database Tables

#### `web_navigation` — AI Tool Listings

```sql
CREATE TABLE public.web_navigation (
  id            bigint GENERATED BY DEFAULT AS IDENTITY,
  name          TEXT PRIMARY KEY,       -- URL slug (e.g. "chatgpt")
  title         TEXT,                   -- Display title
  content       TEXT,                   -- Short description (card text)
  detail        TEXT,                   -- Full markdown description
  url           TEXT,                   -- External tool URL
  image_url     TEXT,                   -- Screenshot image key
  thumbnail_url TEXT,                   -- Thumbnail image key
  website_data  TEXT,                   -- JSON blob (SEO data, keywords)
  collection_time TIMESTAMPTZ,          -- When crawler collected
  star_rating   INTEGER,                -- Rating (0-5)
  tag_name      TEXT,                   -- Primary tag
  category_name TEXT                    -- Category name
);
```

**`website_data` JSON structure:**
```json
{
  "seo": {
    "optimized_description": "...",
    "keywords": ["keyword-1", "keyword-2"],
    "meta_title": "...",
    "generated_at": "2026-04-05T12:00:00Z",
    "model": "claude-code-agent"
  }
}
```

#### `navigation_category` — Tool Categories

```sql
CREATE TABLE public.navigation_category (
  id          bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name        TEXT NOT NULL,            -- Category slug
  title       TEXT,                     -- Display title
  sort        INTEGER,                  -- Sort order
  del_flag    INTEGER DEFAULT 0,       -- 0=active, 1=deleted
  create_by   bigint DEFAULT 0,
  create_time TIMESTAMPTZ DEFAULT now()
);
```

#### `submit` — Tool Submissions

```sql
CREATE TABLE public.submit (
  id         bigint GENERATED BY DEFAULT AS IDENTITY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name       TEXT,                      -- Tool name
  url        TEXT,                      -- Tool URL
  email      TEXT,                      -- Submitter email
  is_feature INTEGER DEFAULT 0,        -- Priority flag
  status     INTEGER DEFAULT 0,        -- 0=pending, 1=processed
  CONSTRAINT submit_pkey PRIMARY KEY (id)
);
```

---

## 6. Routing

All routes live under `app/[locale]/` using next-intl. Default locale is `en`; other locales use `/{locale}/` prefix.

| Route | Description |
|-------|-------------|
| `/` | Homepage (default locale) |
| `/{locale}/` | Localized homepage |
| `/category/{code}` | Category listing with pagination |
| `/ai/{websiteName}` | AI tool detail page |
| `/blog` | Blog listing |
| `/blog/{slug}` | Individual blog post |
| `/explore` | Explore listing with pagination |
| `/startup` | Startup directory |
| `/submit` | Tool submission form |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |
| `/api/cron` | Cron trigger (POST) |
| `/api/cron_callback` | Crawler callback (POST) |
| `/api/submit` | Tool submission (POST) |

---

## 7. Internationalization (i18n)

### Supported Locales

| Code | Language |
|------|----------|
| `en` | English (default) |
| `cn` | Simplified Chinese |
| `tw` | Traditional Chinese |
| `de` | German |
| `es` | Spanish |
| `fr` | French |
| `jp` | Japanese |
| `pt` | Portuguese |
| `ru` | Russian |

### How It Works

- **UI text**: Uses `useTranslations('Namespace')` hook with JSON files in `messages/{locale}.json`
- **Blog posts**: Inline translations in each post file (9 locale keys for `title`, `excerpt`, `content`)
- **Middleware**: `middlewares/intlMiddleware.ts` handles locale detection and URL prefixing

### Adding a New Locale

1. Create `messages/{new_locale}.json` (copy from `en.json` and translate)
2. Add locale to next-intl config
3. Add the new locale key to `BlogPost` type in `lib/blog/types.ts`
4. Update all blog post files with the new locale content

---

## 8. Blog System

### Post Format

Each blog post is a TypeScript file in `lib/blog/posts/items/` exporting a `BlogPost` object:

```typescript
import { BlogPost } from '../../types';

const myPost: BlogPost = {
  id: '40',
  slug: 'my-post-slug',
  title: { en: 'Title', cn: '标题', /* ...other locales */ },
  excerpt: { en: 'Summary...', cn: '摘要...', /* ... */ },
  content: { en: '# Markdown content', cn: '# 中文内容', /* ... */ },
  author: 'Toolsify Editorial Team',
  date: '2026-04-05',
  category: 'Developer',
  tags: ['AI', 'Development'],
};

export default myPost;
```

### Category Index Files

Posts are grouped into 4 category index files:

| File | Const | Category | Count |
|------|-------|----------|-------|
| `legacy.ts` | `BLOG_POSTS_LEGACY` | AI Tools | 18 |
| `hotDeveloper.ts` | `BLOG_POSTS_HOT_DEVELOPER` | Developer | 9 |
| `hotGeneral.ts` | `BLOG_POSTS_HOT_GENERAL` | General User | 7 |
| `hotProductOps.ts` | `BLOG_POSTS_HOT_PRODUCT_OPS` | Product & Ops | 5 |

All are aggregated in `lib/blog.ts`:
```typescript
export const BLOG_POSTS: BlogPost[] = [
  ...BLOG_POSTS_LEGACY,
  ...BLOG_POSTS_HOT_DEVELOPER,
  ...BLOG_POSTS_HOT_GENERAL,
  ...BLOG_POSTS_HOT_PRODUCT_OPS,
];
```

### Creating a New Blog Post

Use the scaffolding script:

```bash
pnpm blog:new --group hotDeveloper --slug my-new-post --title "My New Post" --tags "AI,Development"
```

This will:
1. Create `lib/blog/posts/items/my-new-post.ts` with 9-language template
2. Add import + register it in the appropriate category index file

**Options:**
- `--group` — `legacy`, `hotDeveloper`, `hotGeneral`, `hotProductOps`
- `--slug` — URL slug (lowercase, dashes only)
- `--title` — English title
- `--tags` — Comma-separated tags
- `--date` — Date in YYYY-MM-DD format (default: today)
- `--author` — Author name (default: "Toolsify Editorial Team")
- `--lang-template` — `minimal` (en/cn/tw only) or `full` (all 9 languages)
- `--force` — Overwrite existing file

### Writing Style Guide

See `lib/blog/posts/STYLE_REFERENCE.ts` for the quality standard. Key rules:
- ~1500 words English, varied sentence length
- First person sparingly, include specific numbers/names
- No "In conclusion" or "As we've seen"
- Real trade-offs and honest downsides
- All 9 languages required (idiomatic, not word-for-word)

---

## 9. SEO

### Features

- **Dynamic sitemap**: `app/sitemap.ts` — auto-generates from Supabase data
- **robots.txt**: `app/robots.ts`
- **JSON-LD**: `components/seo/StructuredData.tsx` — BreadcrumbList, WebPage schemas
- **OpenGraph & Twitter cards**: Built via `lib/seo.ts`
- **hreflang alternates**: Auto-generated for all 9 locales
- **Meta tags**: Dynamic per-page via `buildPageMetadata()` in `lib/seo.ts`

### SEO Metadata Builder

`lib/seo.ts` provides:
- `buildPageMetadata()` — generates full Next.js metadata with OG images, hreflang, etc.
- Handles both relative and absolute image URLs
- Supports custom title, description, path, and images per page

---

## 10. SEO Optimization Script

`scripts/optimize-seo.ts` is a Supabase read/write utility for batch SEO optimization.

### Commands

```bash
# List unoptimized tools (no seo.generated_at in website_data)
pnpm seo:list --limit 10

# List a specific tool
pnpm seo:list --name chatgpt

# Include already-optimized tools
pnpm seo:list --force

# Write SEO data from a JSON file
pnpm seo:write --name chatgpt --file seo-output.json

# Dry run (preview without writing)
pnpm seo:write --name chatgpt --file seo-output.json --dry-run
```

### SEO JSON Format

```json
{
  "optimized_description": "150-160 char meta description",
  "keywords": ["keyword-1", "keyword-2"],
  "meta_title": "SEO title under 60 chars",
  "improved_content": "Polished card summary (max 200 chars)",
  "improved_detail": "Expanded markdown description (300-500 words)"
}
```

### Workflow with Claude Code Agent

```
1. pnpm seo:list --limit 5           → get unoptimized tools
2. Agent generates SEO content        → for each tool
3. pnpm seo:write --name <slug> --file <json>  → write back to Supabase
```

### Environment

- `NEXT_PUBLIC_SUPABASE_URL` — Required
- `SUPABASE_SERVICE_ROLE_KEY` — Recommended (bypasses RLS)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Fallback

---

## 11. AdSense Integration

### Configuration

- Ad slot IDs: `lib/ad-slots.config.ts`
- Named slot mapping: `lib/adsense-slots.ts`
- Components: `components/ads/` (ResponsiveAd, InFeedAd, LazyAd, SidebarAd)

### Environment Variables

- `NEXT_PUBLIC_ADSENSE_ENABLED` — Enable/disable ads (`true`/`false`)
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` — AdSense publisher ID
- `GOOGLE_ADSENSE_URL` — AdSense script URL

### Documentation

See `docs/ADSENSE_INTEGRATION.md` for full integration guide, `docs/ADSENSE_TROUBLESHOOTING.md` for issues.

---

## 12. API Reference

### POST `/api/submit`

Submit a new AI tool for crawling.

**Auth**: `Authorization: Bearer {SUBMIT_AUTH_KEY}`

**Body:**
```json
{
  "name": "tool-name",
  "url": "https://example.com",
  "email": "user@example.com"
}
```

**Response:** `{ "message": "Success" }`

**Logic:**
1. Check if URL already exists in `web_navigation` → skip if duplicate
2. Insert into `submit` table with `status=0`

---

### POST `/api/cron`

Trigger the crawler to process the next pending submission.

**Auth**: `Authorization: Bearer {CRON_AUTH_KEY}`

**Logic:**
1. Fetch categories from `navigation_category`
2. Fetch first pending submission (`status=0`, ordered by `is_feature DESC, created_at ASC`)
3. Call external crawler with URL, categories, and callback URL
4. Crawler processes asynchronously and calls back

---

### POST `/api/cron_callback`

Receive crawl results from the crawler service.

**Auth**: `Authorization: Bearer {CRON_AUTH_KEY}`

**Body:**
```json
{
  "name": "tool-name",
  "url": "https://example.com",
  "title": "Tool Title",
  "description": "Short description",
  "detail": "Full markdown content",
  "screenshot_data": "image-key",
  "screenshot_thumbnail_data": "thumbnail-key",
  "tags": ["category1", "category2"],
  "keywords": ["kw1", "kw2"]
}
```

**Logic:**
1. If `name` exists in `web_navigation` → update; else → insert
2. Store `keywords` in `website_data` JSON column
3. Update `submit` table: set `status=1`

---

## 13. Crawler Integration

The crawler is a separate Python/FastAPI service at [toolsify-ai-crawler](https://github.com/6677-ai/toolsify-ai-crawler).

### Crawl Flow

```
User submits tool → /api/submit → Supabase submit table
                                      ↓
Cron triggers     → /api/cron → reads pending → calls crawler
                                      ↓
Crawler scrapes   → generates content, screenshots, keywords
                → calls /api/cron_callback with results
                                      ↓
Callback handler  → inserts/updates web_navigation → marks submit done
```

### Crawler Environment

- `CRAWLER_API` — Crawler endpoint URL
- `CRAWLER_API_KEY` — Authentication key
- `CRON_AUTH_KEY` — Shared key for cron/callback auth

---

## 14. Code Conventions

### React

- Server Components by default. Add `'use client'` only for interactivity, hooks, or browser APIs.
- Use `next/image` `Image` component instead of `<img>`.
- `<button>` elements must have `type` attribute.
- External links with `target="_blank"` must include `rel="noreferrer"`.
- Avoid array index as `key` — use meaningful identifiers.
- Avoid nested ternaries — use `cn()` with conditionals instead.
- Use `cn()` from `lib/utils` (clsx + tailwind-merge) for conditional class merging.

### Imports

Auto-sorted by `@ianvs/prettier-plugin-sort-imports`:
```
react → next → builtins → third-party → types → @/ aliases → relative
```

### Formatting

- Prettier: 2-space indent, single quotes (including JSX), trailing commas, 120 print width, semicolons.
- Tailwind classes auto-sorted by `prettier-plugin-tailwindcss`.

### Exports

- `import/prefer-default-export` enforced — use default export for single-export modules.

### Git Commits

Format: `feat(scope): description` or `fix(scope): description` (Chinese or English).

Examples:
- `feat(blog): add 4 new AI tools articles`
- `fix(seo): handle absolute URL OG images`
- `chore(ads): update ad slot configuration`

---

## 15. Branding Rules

The project was renamed from "tap4-ai" to "toolsify-ai".

- **Pre-commit hook** runs `pnpm brand:check` to block any legacy `tap4-ai` references.
- Never use `tap4-ai` in code, comments, filenames, or commit messages.
- GitHub org is `6677-ai`, product name is "Toolsify AI".

---

## 16. Deployment

### Vercel

1. Fork the repository
2. Create a Supabase project and run SQL scripts (`db/supabase/create_table.sql`, `insert_category_data.sql`, `insert_data.sql`)
3. Deploy to Vercel with environment variables (see `.env.example`)
4. Configure Vercel Cron Jobs (Pro) or manually trigger `/api/cron` (Free tier: 1x/day)

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `NEXT_PUBLIC_SITE_URL` | Yes | Your domain (e.g. https://toolsify.ai) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 ID |
| `NEXT_PUBLIC_ADSENSE_ENABLED` | No | Enable AdSense (default: false) |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | No | AdSense publisher ID |
| `CRAWLER_API` | Yes | Crawler endpoint URL |
| `CRAWLER_API_KEY` | Yes | Crawler auth key |
| `CRON_AUTH_KEY` | Yes | Cron/callback auth key |
| `SUBMIT_AUTH_KEY` | Yes | Submit API auth key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Service role key (for SEO script) |

---

## 17. Quality Gates

No test runner is configured. Quality is enforced through:

1. **Pre-commit hook** (`husky`):
   - `pnpm brand:check` — blocks legacy "tap4-ai" references
   - `lint-staged` — ESLint + Prettier on staged files

2. **Before claiming work complete**:
   ```bash
   pnpm lint    # must pass
   pnpm build   # must pass
   ```

3. **TypeScript**: Strict mode enabled. `npx tsc --noEmit` for type checking.

---

## 18. Troubleshooting

### Build fails with type errors

```bash
npx tsc --noEmit 2>&1
# Fix listed errors, then rebuild
pnpm build
```

### Branding check blocks commit

```bash
pnpm brand:check
# Find and replace any "tap4-ai" references with "toolsify-ai"
```

### Crawler not processing submissions

1. Check `submit` table for pending entries: `SELECT * FROM submit WHERE status = 0`
2. Verify `CRAWLER_API` and `CRAWLER_API_KEY` are correct
3. Manually trigger: `curl -X POST {domain}/api/cron -H "Authorization: Bearer {CRON_AUTH_KEY}"`
4. Check crawler service logs

### AdSense not showing

See `docs/ADSENSE_TROUBLESHOOTING.md` for detailed debugging steps.

### Blog post not appearing

1. Verify the post file exists in `lib/blog/posts/items/`
2. Verify it's imported and listed in the correct category index file
3. Verify it's exported as default
4. Run `pnpm build` to catch any compilation errors
