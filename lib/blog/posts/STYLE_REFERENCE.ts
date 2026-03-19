/**
 * Style Reference for Blog Post Polishing
 *
 * This file serves as the quality standard for all blog posts.
 * Every article should match this level of depth, naturalness, and structure.
 *
 * STRUCTURE (~1500 words English):
 * 1. Hook/intro (100-150 words) — relatable scenario or surprising fact
 * 2. Why this matters (150-200 words) — personal perspective with context
 * 3. Main content (600-800 words) — topic-specific with H2/H3 subheadings
 * 4. Practical takeaways (200-300 words) — actionable advice
 * 5. Wrap-up (100-150 words) — forward-looking, no "In conclusion"
 *
 * HUMAN WRITING RULES:
 * - Vary sentence length. Mix short punchy sentences with longer ones.
 * - Use first person sparingly ("I found that...", "In my experience...")
 * - Include specific numbers, tool names, version numbers
 * - No bullet-point-only articles. Paragraphs between lists.
 * - Occasional contractions (don't, it's, we've)
 * - No "In conclusion" or "As we've seen"
 * - Break patterns: sometimes start section with question, sometimes anecdote
 * - Include real trade-offs and honest downsides
 *
 * TRANSLATION RULES:
 * - All 9 languages required: en, cn, tw, de, es, fr, jp, pt, ru
 * - Translations must be natural/idiomatic, not word-for-word
 * - Titles should be localized, not just translated
 * - Excerpts: 1-2 sentences summarizing the article
 */

// Example of a well-written article (abbreviated for reference)
const STYLE_EXAMPLE = `
The content should feel like a knowledgeable human wrote it — not a template,
not a list of bullet points, not corporate marketing speak. Real opinions,
specific examples, honest trade-offs.

Example opening (NOT "In today's fast-paced world..."):
"I spent three weeks migrating our production API from GPT-4 Turbo to GPT-5
last month. Here's what actually broke, what worked better than expected,
and the one thing nobody told me about beforehand."

Example of honest trade-offs:
"GPT-5 is genuinely better at complex reasoning — our benchmark suite showed
a 23% improvement on multi-step coding tasks. But it's also 40% more expensive
per token, and the latency increase from 1.2s to 1.8s average response time
mattered more than I expected for our real-time features."

Example of natural wrap-up:
"The migration isn't optional if you care about staying competitive, but
rushing it is a mistake. Start with your least critical workflow, measure
everything, and give your team time to build intuition for the new model's
quirks. Six months from now, you'll be glad you were methodical about it."
`;

export default STYLE_EXAMPLE;
