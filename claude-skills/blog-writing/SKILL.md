---
name: blog-writing
description: Write, polish, or integrate blog posts for the Toolsify AI web UI. Use when the user asks to create a blog post, rewrite an article into the site's blog format, polish existing blog content, localize blog posts, add a post to hotGeneral/hotDeveloper/hotProductOps, or prepare SEO-focused AI/tool/model content for this repo.
---

# Toolsify AI Blog Writing Skill

Use this skill to create blog posts that match this repository's current blog system and editorial bar.

## First inspect the current blog state

Before writing or changing a post, read the relevant current files instead of relying on memory:

- `lib/blog/types.ts` for the `BlogPost` shape.
- `lib/blog/posts/STYLE_REFERENCE.ts` for the editorial standard.
- 1-3 close examples in `lib/blog/posts/items/*.ts` from the same audience/category.
- The target aggregator: `lib/blog/posts/hotGeneral.ts`, `hotDeveloper.ts`, or `hotProductOps.ts`.

Use the current code as source of truth. If a remembered rule conflicts with the repo, follow the repo.

## BlogPost contract

Create or update a TypeScript file under `lib/blog/posts/items/` exporting a single `BlogPost` object:

```ts
import { BlogPost } from '../../types';

const postExampleName: BlogPost = {
  id: '3200',
  slug: 'example-slug',
  title: { en, cn, tw, de, es, fr, jp, pt, ru },
  excerpt: { en, cn, tw, de, es, fr, jp, pt, ru },
  content: { en, cn, tw, de, es, fr, jp, pt, ru },
  author: 'Toolsify AI',
  date: 'YYYY-MM-DD',
  category: '...',
  tags: [...],
};

export default postExampleName;
```

Required quality target:

- All 9 languages: `en`, `cn`, `tw`, `de`, `es`, `fr`, `jp`, `pt`, `ru`.
- English is the canonical version; other languages should be natural localizations, not literal translations.
- Use Markdown inside template literals for `content`.
- Keep headings inside content aligned with `title.en` and localized equivalents.
- Escape backticks and `${...}` sequences inside template literals, or rewrite the sentence to avoid them.
- Pick a unique numeric `id` by checking nearby existing IDs.
- Pick a URL-safe kebab-case `slug` matching the file name.

## Editorial standard

Match the current polished posts, especially the standard in `STYLE_REFERENCE.ts`:

- English article target: about 1,200-1,700 words unless the user asks otherwise.
- Start with a concrete hook: personal scenario, surprising benchmark, recent event, or practical pain point.
- Avoid generic openings like “In today's fast-paced world”.
- Use a knowledgeable, practical, slightly opinionated voice.
- Include specific tools, dates, numbers, workflows, prices, model names, benchmarks, or examples where relevant.
- Include honest trade-offs, limitations, and failure modes.
- Prefer paragraphs with occasional short lists; never produce a bullet-point-only article.
- Vary sentence length. Use occasional contractions in English where natural.
- Do not end with “In conclusion”, “As we have seen”, or generic recap filler.
- Do not sound like corporate marketing copy.

Recommended structure:

1. Hook/intro: 100-150 words.
2. Why it matters: 150-250 words.
3. Main sections with H2/H3 headings: 600-900 words.
4. Practical takeaways, checklist, or workflow: 200-300 words.
5. Forward-looking wrap-up: 100-150 words.

## Site audience and topic fit

The site blog currently favors AI tools, LLMs, AI agents, developer workflows, product operations, SEO/content operations, and practical AI adoption.

Choose category and aggregator by audience:

- `hotGeneral.ts`: non-technical AI explainers, everyday use cases, consumer/product guides.
- `hotDeveloper.ts`: coding agents, model benchmarks, API/migration workflows, MCP, developer tooling.
- `hotProductOps.ts`: SEO, content ops, customer support, SaaS operations, funnel/conversion workflows.

If a post does not clearly fit one of these, ask the user which audience to target before integrating it.

## SEO requirements

Every new or polished post should be useful for search without keyword stuffing:

- Title: clear topic + practical angle + year/version when useful.
- Excerpt: 1-2 sentences, concrete value proposition, no vague hype.
- Tags: include 4-8 core topical tags plus 3-8 natural long-tail search phrases when appropriate.
- Include search-intent phrases in headings naturally.
- Add 3-6 relevant internal links to existing blog posts, tool pages, category pages, or related site resources when they genuinely help the reader.
- Add 2-5 authoritative external links for sources, product documentation, benchmarks, original announcements, or primary references.
- Use descriptive anchor text; avoid vague anchors like "click here".
- Cover comparison, use case, guide, benchmark, setup, migration, alternatives, or workflow angles when relevant.
- Add current-year context only when it is truthful and useful.

## Fact and sourcing rules

Do not invent facts, prices, dates, benchmarks, quotes, product capabilities, legal claims, or current availability.

When writing about current products or recent events:

- Use web/search tools or user-provided sources for current claims.
- Link external references to primary or authoritative sources, not low-quality SEO rewrites.
- Attribute uncertain claims cautiously or remove them.
- Prefer verifiable specifics over decorative statistics.
- If the user provides source material, preserve its claims accurately and flag gaps instead of filling them with guesses.

## Writing workflow

For a new blog post:

1. Clarify topic, audience, and category if not obvious.
2. Inspect similar existing posts and the target aggregator.
3. Draft English canonical article first.
4. Create localized titles, excerpts, and content for all 9 languages.
5. Write the TypeScript post file under `lib/blog/posts/items/`.
6. Add import and entry to the correct `hot*` aggregator.
7. Run the project's available validation, normally `npx tsc --noEmit` or the repo's existing lint/typecheck command.

For polishing an existing post:

1. Preserve the existing `id`, `slug`, import/export name, and aggregator placement unless the user asks to change them.
2. Improve depth, specificity, structure, translations, tags, and excerpts.
3. Do not rewrite purely for style if the current article already meets the standard.

For importing source content:

1. Extract the real angle and useful claims from the source.
2. Rewrite into this site's editorial voice; do not paste or lightly paraphrase copyrighted content.
3. Keep the final article original, practical, and source-faithful.

## Quality checklist before reporting done

- The post compiles as TypeScript.
- All 9 language keys exist in `title`, `excerpt`, and `content`.
- Markdown headings are balanced and natural.
- The article has concrete examples and honest trade-offs.
- No unverified current factual claims remain.
- Internal links point to relevant existing site pages and use natural anchor text.
- External links point to authoritative sources and support factual claims.
- Tags include both topical and long-tail SEO phrases.
- The correct aggregator imports and includes the post.
- There are no raw backticks or `${...}` sequences that break template literals.
