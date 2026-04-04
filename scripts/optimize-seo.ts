#!/usr/bin/env tsx
import * as fs from 'fs';
import * as path from 'path';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// .env loader (no external dependency needed)
// ---------------------------------------------------------------------------

function loadEnv(envPath: string): void {
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed
      .slice(eqIdx + 1)
      .trim()
      .replace(/^["']|["']$/g, '');
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

loadEnv(path.join(process.cwd(), '.env'));
loadEnv(path.join(process.cwd(), '.env.local'));

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const BATCH_SIZE = 100;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WebNavRow {
  id: number;
  name: string;
  title: string;
  content: string;
  detail: string;
  url: string;
  category_name: string;
  website_data: string | null;
}

interface SEOInput {
  optimized_description: string;
  keywords: string[];
  meta_title: string;
  improved_content: string;
  improved_detail: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseArgs(argv: string[]): { command: string; flags: Record<string, string | boolean> } {
  const flags: Record<string, string | boolean> = {};
  const positional: string[] = [];
  for (let i = 2; i < argv.length; i += 1) {
    const k = argv[i];
    if (!k.startsWith('--')) {
      positional.push(k);
      continue;
    }
    const key = k.slice(2);
    if (key === 'force' || key === 'dry-run' || key === 'help') {
      flags[key] = true;
      continue;
    }
    const v = argv[i + 1];
    if (v && !v.startsWith('--')) {
      flags[key] = v;
      i += 1;
    } else {
      flags[key] = '';
    }
  }
  return { command: positional[0] || '', flags };
}

function printHelp() {
  console.log(`SEO content optimizer for AI tools (uses Supabase only).

Usage:
  pnpm seo:list  [options]          List unoptimized tools as JSON
  pnpm seo:write --name <slug>      Write SEO data from stdin (JSON)

seo:list options:
  --limit N       Show only N tools
  --name SLUG     Show a single tool by slug/name
  --force         Include already-optimized tools
  --help          Show this message

seo:write options:
  --name SLUG     Required. The tool slug to update.
  --file PATH     Read SEO JSON from a file (alternative to stdin pipe)
  --dry-run       Show what would be written without updating Supabase
  --help          Show this message

Environment:
  NEXT_PUBLIC_SUPABASE_URL         Required. Supabase project URL.
  SUPABASE_SERVICE_ROLE_KEY        Recommended. Bypasses RLS for writes.
  NEXT_PUBLIC_SUPABASE_ANON_KEY    Fallback if service role key not set.

Examples:
  pnpm seo:list --limit 5
  pnpm seo:list --name chatgpt
  pnpm seo:write --name chatgpt --file seo-output.json
  pnpm seo:write --name chatgpt --file seo-output.json --dry-run
`);
}

function isAlreadyOptimized(tool: WebNavRow): boolean {
  if (!tool.website_data) return false;
  try {
    const parsed = JSON.parse(tool.website_data);
    return Boolean(parsed.seo?.generated_at);
  } catch {
    return false;
  }
}

function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = '';
    let resolved = false;
    const finish = (val: string) => {
      if (!resolved) {
        resolved = true;
        resolve(val);
      }
    };
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk: string) => {
      data += chunk;
    });
    process.stdin.on('end', () => finish(data.trim()));
    // Safety timeout: if nothing arrives within 500ms, resolve with whatever we have
    setTimeout(() => finish(data.trim()), 500);
  });
}

async function fetchAllTools(supabase: SupabaseClient): Promise<WebNavRow[]> {
  const allTools: WebNavRow[] = [];
  let offset = 0;
  while (true) {
    const { data, error } = await supabase
      .from('web_navigation')
      .select('id,name,title,content,detail,url,category_name,website_data')
      .range(offset, offset + BATCH_SIZE - 1)
      .order('id', { ascending: true });

    if (error) throw new Error(`Supabase fetch error: ${error.message}`);
    if (!data || data.length === 0) break;
    allTools.push(...(data as WebNavRow[]));
    offset += BATCH_SIZE;
  }
  return allTools;
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

async function cmdList(flags: Record<string, string | boolean>) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const force = Boolean(flags.force);
  const limit = flags.limit ? Number(flags.limit) : Infinity;
  const singleName = flags.name ? String(flags.name) : null;

  const allTools = await fetchAllTools(supabase);

  let tools = allTools;
  if (singleName) {
    tools = tools.filter((t) => t.name === singleName);
    if (tools.length === 0) {
      console.error(`No tool found with name "${singleName}"`);
      process.exit(1);
    }
  }

  if (!force) {
    tools = tools.filter((t) => !isAlreadyOptimized(t));
  }

  if (tools.length > limit) {
    tools = tools.slice(0, limit);
  }

  // Output compact JSON for each tool (one per line)
  const output = tools.map((t) => ({
    id: t.id,
    name: t.name,
    title: t.title,
    content: t.content,
    detail: t.detail,
    url: t.url,
    category_name: t.category_name,
  }));

  console.log(JSON.stringify(output, null, 2));
}

async function cmdWrite(flags: Record<string, string | boolean>) {
  const singleName = flags.name ? String(flags.name) : null;
  if (!singleName) {
    console.error('Error: --name <slug> is required for write command');
    process.exit(1);
  }

  const dryRun = Boolean(flags['dry-run']);
  const filePath = flags.file ? String(flags.file) : null;

  // Read SEO JSON from file or stdin
  let inputData: string;
  if (filePath) {
    if (!fs.existsSync(filePath)) {
      console.error(`Error: File not found: ${filePath}`);
      process.exit(1);
    }
    inputData = fs.readFileSync(filePath, 'utf8').trim();
  } else {
    inputData = await readStdin();
    if (!inputData) {
      console.error('Error: No JSON input. Use --file <path> or pipe JSON via stdin.');
      process.exit(1);
    }
  }

  let seo: SEOInput;
  try {
    seo = JSON.parse(inputData);
  } catch (error) {
    console.error('Error: Invalid JSON input', (error as Error).message);
    process.exit(1);
  }

  // Validate
  const required: (keyof SEOInput)[] = [
    'optimized_description',
    'keywords',
    'meta_title',
    'improved_content',
    'improved_detail',
  ];
  const missing = required.filter((k) => !seo[k] || (Array.isArray(seo[k]) && (seo[k] as string[]).length === 0));
  if (missing.length > 0) {
    console.error(`Error: Missing required fields: ${missing.join(', ')}`);
    process.exit(1);
  }

  const websiteData = {
    seo: {
      optimized_description: seo.optimized_description,
      keywords: seo.keywords,
      meta_title: seo.meta_title,
      generated_at: new Date().toISOString(),
      model: 'claude-code-agent',
    },
  };

  console.log(`[seo:write] Tool: ${singleName}`);
  console.log(`  meta_title: ${seo.meta_title}`);
  console.log(`  description: ${seo.optimized_description.substring(0, 80)}...`);
  console.log(`  keywords: ${seo.keywords.join(', ')}`);

  if (dryRun) {
    console.log('\n  [DRY RUN] Would update:');
    console.log(`    content: ${seo.improved_content.substring(0, 60)}...`);
    console.log(`    detail: ${seo.improved_detail.substring(0, 60)}...`);
    console.log(`    website_data: ${JSON.stringify(websiteData).substring(0, 80)}...`);
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  const { error } = await supabase
    .from('web_navigation')
    .update({
      content: seo.improved_content,
      detail: seo.improved_detail,
      website_data: JSON.stringify(websiteData),
    })
    .eq('name', singleName);

  if (error) {
    console.error(`Error: Supabase update failed: ${error.message}`);
    process.exit(1);
  }

  console.log('  Updated in Supabase');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const { command, flags } = parseArgs(process.argv);

  if (flags.help || !command) {
    printHelp();
    return;
  }

  if (!SUPABASE_URL) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }
  if (!SUPABASE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)');
  }

  switch (command) {
    case 'list':
      await cmdList(flags);
      break;
    case 'write':
      await cmdWrite(flags);
      break;
    default:
      console.error(`Unknown command: ${command}. Use "list" or "write".`);
      printHelp();
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(`[seo] Fatal: ${error.message}`);
  process.exit(1);
});
