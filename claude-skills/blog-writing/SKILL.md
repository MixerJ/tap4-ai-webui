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

- Define a keyword map before drafting: 1 primary keyword, 3-6 secondary keywords/entities, 5-10 long-tail queries, and 3-5 reader questions.
- Match the primary keyword naturally in the title/H1, excerpt, opening section, at least one useful H2/H3, and tags when it reads naturally.
- Map secondary keywords and entities to specific sections so coverage is intentional, not sprinkled randomly.
- Use long-tail phrases in headings, examples, FAQ-like sections, or practical takeaways only when they match real reader intent.
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

Before drafting, create a short working brief in the conversation or your notes:

- Target audience and aggregator.
- Reader problem and why this post should exist now.
- Search intent and keyword map: primary keyword, secondary keywords/entities, long-tail queries, and reader questions.
- Differentiated angle versus existing posts and top search results.
- Source plan: primary sources to cite and claims that need verification.
- Internal link plan: existing posts/tool/category pages that genuinely help the reader.
- Expected structured data inputs: final title, excerpt, author, date, category, tags, slug, and optional image.

For a new blog post:

1. Clarify topic, audience, and category if not obvious.
2. Inspect similar existing posts and the target aggregator.
3. Build the keyword map and source/link plan before drafting.
4. Draft English canonical article first.
5. Create localized titles, excerpts, and content for all 9 languages.
6. Write the TypeScript post file under `lib/blog/posts/items/`.
7. Add import and entry to the correct `hot*` aggregator.
8. Run the project's available validation, normally `npx tsc --noEmit` or the repo's existing lint/typecheck command.

For polishing an existing post:

1. Preserve the existing `id`, `slug`, import/export name, and aggregator placement unless the user asks to change them.
2. Improve depth, specificity, structure, translations, tags, and excerpts.
3. Do not rewrite purely for style if the current article already meets the standard.

For importing source content:

1. Extract the real angle and useful claims from the source.
2. Rewrite into this site's editorial voice; do not paste or lightly paraphrase copyrighted content.
3. Keep the final article original, practical, and source-faithful.

## Content QA workflow

Run this QA pass before integrating or reporting a post as complete:

1. **Editorial QA:** Check that the article has a real hook, a clear reader problem, useful depth, concrete examples, honest trade-offs, and a non-generic ending. Remove filler, hype, repeated claims, and template-like transitions.
2. **People-first QA:** Confirm the post is written for a specific reader need, adds original value beyond summarizing sources, stays within the site's AI/tool expertise, and is not chasing a trend purely for search traffic. Do not fake freshness by adding dates or updates that are not meaningful.
3. **Fact QA:** Review every current factual claim, product capability, benchmark, price, release date, and quote. Keep the claim only if it is sourced, user-provided, or phrased cautiously enough to be defensible.
4. **Keyword QA:** Confirm the primary keyword, secondary keywords/entities, long-tail queries, and reader questions are covered in the right places: title/H1, excerpt, opening, headings, body sections, tags, and anchor text. Remove unnatural repetition and add missing high-intent variants only where they improve the article.
5. **SEO QA:** Confirm the title, excerpt, headings, and tags match a real search intent without keyword stuffing. Check that the article does not cannibalize an existing post unless it has a clearly different angle.
6. **Link QA:** Verify internal links point to relevant existing site pages and external links point to authoritative primary sources. Replace weak or generic anchors with descriptive anchor text.
7. **Structured Data QA:** The blog page template emits Article JSON-LD from `title`, `excerpt`, `author`, `date`, `category`, `tags`, `image`, and slug. Verify these fields are accurate, visible in the article, non-misleading, and suitable for Google's Article structured data guidance. If `image` is set, ensure it is relevant and crawlable; if omitted, confirm the default site image is acceptable. For important releases, validate the rendered page with Google's Rich Results Test after deployment.
8. **Localization QA:** Spot-check all 9 languages for missing sections, malformed Markdown, untranslated English leftovers, unnatural literal translations in titles/excerpts, and localized keyword intent.
9. **Technical QA:** Check TypeScript syntax, template literal safety, unique `id`/`slug`, export name consistency, and aggregator placement.

When creating multiple posts in parallel, run a final cross-post QA pass to catch duplicate IDs, overlapping slugs, repeated intros, internal-link loops, and topic cannibalization.

## Quality checklist before reporting done

- The post compiles as TypeScript.
- All 9 language keys exist in `title`, `excerpt`, and `content`.
- Markdown headings are balanced and natural.
- The article has concrete examples and honest trade-offs.
- No unverified current factual claims remain.
- A keyword map exists and the primary/secondary/long-tail keywords are naturally matched to title, excerpt, headings, body, tags, and anchors.
- Internal links point to relevant existing site pages and use natural anchor text.
- External links point to authoritative sources and support factual claims.
- Tags include both topical and long-tail SEO phrases.
- Article structured data inputs (`title`, `excerpt`, `author`, `date`, `category`, `tags`, `image`, slug) are accurate and consistent with visible content.
- The correct aggregator imports and includes the post.
- There are no raw backticks or `${...}` sequences that break template literals.
