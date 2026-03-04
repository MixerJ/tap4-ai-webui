#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();

const GROUPS = {
  legacy: {
    file: 'lib/blog/posts/legacy.ts',
    constName: 'BLOG_POSTS_LEGACY',
    defaultCategory: 'AI Tools',
  },
  hotDeveloper: {
    file: 'lib/blog/posts/hotDeveloper.ts',
    constName: 'BLOG_POSTS_HOT_DEVELOPER',
    defaultCategory: 'Developer',
  },
  hotGeneral: {
    file: 'lib/blog/posts/hotGeneral.ts',
    constName: 'BLOG_POSTS_HOT_GENERAL',
    defaultCategory: 'General User',
  },
  hotProductOps: {
    file: 'lib/blog/posts/hotProductOps.ts',
    constName: 'BLOG_POSTS_HOT_PRODUCT_OPS',
    defaultCategory: 'Product & Ops',
  },
};

function printHelp() {
  console.log(`Create a new blog post file and register it to a group.

Usage:
  node scripts/create-blog-post.js --group <group> --slug <slug> --title <title>

Required:
  --group   one of: ${Object.keys(GROUPS).join(', ')}
  --slug    URL slug, e.g. gpt-5-agent-evaluation-guide
  --title   English title

Optional:
  --id        explicit id (default: max existing id + 1)
  --date      YYYY-MM-DD (default: today)
  --author    default: Toolsify Editorial Team
  --category  default by group
  --tags      comma-separated, e.g. GPT-5,AI Agents,Evaluation
  --lang-template  minimal|full (default: minimal)
  --force     overwrite if item file already exists
  --help      show this message

Examples:
  pnpm blog:new --group hotDeveloper --slug gpt-5-eval-metrics --title "GPT-5 Evaluation Metrics for Agents"
  pnpm blog:new --group hotGeneral --slug best-ai-agents-2026 --title "Best AI Agents in 2026" --tags "AI Agents,Beginner"
  pnpm blog:new --group hotProductOps --slug ai-growth-loop --title "AI Growth Loop Design" --lang-template full
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const k = argv[i];
    if (!k.startsWith('--')) continue;
    const key = k.slice(2);
    if (key === 'force' || key === 'help') {
      args[key] = true;
      continue;
    }
    const v = argv[i + 1];
    if (v && !v.startsWith('--')) {
      args[key] = v;
      i += 1;
    } else {
      args[key] = '';
    }
  }
  return args;
}

function toVarName(slug) {
  return `post${slug
    .split('-')
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('')}`;
}

function sq(s) {
  return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function today() {
  const d = new Date();
  const y = String(d.getFullYear());
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function assertSlug(slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Invalid slug "${slug}". Use lowercase letters, numbers, and dashes only.`);
  }
}

function nextId() {
  const itemsDir = path.join(ROOT, 'lib/blog/posts/items');
  const files = fs.readdirSync(itemsDir).filter((f) => f.endsWith('.ts'));
  let max = 0;
  for (const file of files) {
    const content = fs.readFileSync(path.join(itemsDir, file), 'utf8');
    const m = content.match(/id:\s*'(\d+)'/);
    if (!m) continue;
    const idNum = Number(m[1]);
    if (Number.isFinite(idNum) && idNum > max) max = idNum;
  }
  return String(max + 1);
}

function buildItemContent({
  varName,
  id,
  slug,
  title,
  author,
  date,
  category,
  tags,
  langTemplate,
}) {
  const titleCn = `${title}（中文待完善）`;
  const titleTw = `${title}（繁中待完善）`;
  const titleDe = `${title} (Deutsch TBD)`;
  const titleEs = `${title} (Español TBD)`;
  const titleFr = `${title} (Français TBD)`;
  const titleJp = `${title}（日本語 TBD）`;
  const titlePt = `${title} (Português TBD)`;
  const titleRu = `${title} (Русский TBD)`;

  const excerptEn = `${title} guide with practical steps, trade-offs, and implementation notes.`;
  const excerptCn = `${title} 的实操指南，含步骤与取舍。`;
  const excerptTw = `${title} 的實作指南，含步驟與取捨。`;
  const excerptDe = `${title} Leitfaden mit praktischen Schritten und Trade-offs.`;
  const excerptEs = `Guía de ${title} con pasos prácticos y trade-offs.`;
  const excerptFr = `Guide ${title} avec étapes pratiques et compromis.`;
  const excerptJp = `${title} の実践ガイド。手順とトレードオフを解説。`;
  const excerptPt = `Guia ${title} com passos práticos e trade-offs.`;
  const excerptRu = `Практический гайд ${title}: шаги внедрения и компромиссы.`;

  const contentEn = `# ${title}

**TL;DR:** Practical guide with implementation steps and trade-offs.

## Why This Matters
- Add business context.
- Add technical context.

## Practical Steps
1. Define your goal and KPI.
2. Run a small pilot.
3. Measure and iterate.

## Trade-offs and Limitations
- Add constraints and risks.

## Conclusion
Add your final recommendation.
`;

  const contentCn = `# ${title}

**TL;DR：** 这是一篇可执行的实战指南。

## 为什么重要
- 补充业务背景。
- 补充技术背景。

## 实操步骤
1. 定义目标和指标。
2. 小范围试点。
3. 评估并迭代。

## 取舍与限制
- 补充风险和边界。

## 结论
补充你的最终建议。
`;

  const contentTw = `# ${title}

**TL;DR：** 這是一篇可執行的實戰指南。

## 為什麼重要
- 補充業務背景。
- 補充技術背景。

## 實作步驟
1. 定義目標與指標。
2. 小範圍試點。
3. 評估並迭代。

## 取捨與限制
- 補充風險與邊界。

## 結論
補充你的最終建議。
`;

  const contentDe = `# ${titleDe}

**TL;DR:** Praktischer Leitfaden mit umsetzbaren Schritten und realistischen Trade-offs.

## Warum das wichtig ist
- Geschäftlichen Kontext ergänzen.
- Technischen Kontext ergänzen.

## Umsetzungsschritte
1. Ziel und KPI definieren.
2. Kleinen Pilot starten.
3. Messen und iterieren.

## Trade-offs und Grenzen
- Risiken und Grenzen ergänzen.

## Fazit
Konkrete Empfehlung ergänzen.
`;

  const contentEs = `# ${titleEs}

**TL;DR:** Guía práctica con pasos de implementación y trade-offs realistas.

## Por qué importa
- Agrega contexto de negocio.
- Agrega contexto técnico.

## Pasos prácticos
1. Define objetivo y KPI.
2. Ejecuta un piloto pequeño.
3. Mide e itera.

## Trade-offs y límites
- Agrega riesgos y límites.

## Conclusión
Agrega la recomendación final.
`;

  const contentFr = `# ${titleFr}

**TL;DR :** Guide pratique avec étapes d’implémentation et compromis réalistes.

## Pourquoi c'est important
- Ajouter le contexte business.
- Ajouter le contexte technique.

## Étapes pratiques
1. Définir l’objectif et la KPI.
2. Lancer un petit pilote.
3. Mesurer et itérer.

## Compromis et limites
- Ajouter risques et limites.

## Conclusion
Ajouter la recommandation finale.
`;

  const contentJp = `# ${titleJp}

**TL;DR:** 実装手順と現実的なトレードオフをまとめた実践ガイド。

## なぜ重要か
- ビジネス文脈を補足する。
- 技術文脈を補足する。

## 実践ステップ
1. 目標とKPIを定義する。
2. 小さなパイロットを実施する。
3. 計測して改善する。

## トレードオフと制約
- リスクと制約を補足する。

## まとめ
最終提案を補足する。
`;

  const contentPt = `# ${titlePt}

**TL;DR:** Guia prático com passos de implementação e trade-offs realistas.

## Por que isso importa
- Adicione contexto de negócio.
- Adicione contexto técnico.

## Passos práticos
1. Defina objetivo e KPI.
2. Rode um piloto pequeno.
3. Meça e itere.

## Trade-offs e limitações
- Adicione riscos e limitações.

## Conclusão
Adicione a recomendação final.
`;

  const contentRu = `# ${titleRu}

**TL;DR:** Практический гайд с шагами внедрения и реалистичными компромиссами.

## Почему это важно
- Добавьте бизнес-контекст.
- Добавьте технический контекст.

## Практические шаги
1. Определите цель и KPI.
2. Запустите небольшой пилот.
3. Измеряйте и улучшайте.

## Компромиссы и ограничения
- Добавьте риски и ограничения.

## Вывод
Добавьте итоговую рекомендацию.
`;

  const useFull = langTemplate === 'full';

  return `import { BlogPost } from '../../types';

const ${varName}: BlogPost = {
  id: ${sq(id)},
  slug: ${sq(slug)},
  title: {
    en: ${sq(title)},
    cn: ${sq(titleCn)},
    tw: ${sq(titleTw)},
    de: ${sq(titleDe)},
    es: ${sq(titleEs)},
    fr: ${sq(titleFr)},
    jp: ${sq(titleJp)},
    pt: ${sq(titlePt)},
    ru: ${sq(titleRu)},
  },
  excerpt: {
    en: ${sq(excerptEn)},
    cn: ${sq(excerptCn)},
    tw: ${sq(excerptTw)},
    de: ${sq(useFull ? excerptDe : excerptEn)},
    es: ${sq(useFull ? excerptEs : excerptEn)},
    fr: ${sq(useFull ? excerptFr : excerptEn)},
    jp: ${sq(useFull ? excerptJp : excerptEn)},
    pt: ${sq(useFull ? excerptPt : excerptEn)},
    ru: ${sq(useFull ? excerptRu : excerptEn)},
  },
  content: {
    en: \`${contentEn}\`,
    cn: \`${contentCn}\`,
    tw: \`${contentTw}\`,
    de: \`${useFull ? contentDe : contentEn}\`,
    es: \`${useFull ? contentEs : contentEn}\`,
    fr: \`${useFull ? contentFr : contentEn}\`,
    jp: \`${useFull ? contentJp : contentEn}\`,
    pt: \`${useFull ? contentPt : contentEn}\`,
    ru: \`${useFull ? contentRu : contentEn}\`,
  },
  author: ${sq(author)},
  date: ${sq(date)},
  category: ${sq(category)},
  tags: [${tags.map(sq).join(', ')}],
};

export default ${varName};
`;
}

function injectToGroup(groupFilePath, importLine, constVar) {
  let src = fs.readFileSync(groupFilePath, 'utf8');
  if (!src.includes(importLine)) {
    const importInsertPos = src.lastIndexOf('\nimport ');
    if (importInsertPos === -1) {
      throw new Error(`Cannot find import block in ${groupFilePath}`);
    }
    const importEnd = src.indexOf('\n\n', importInsertPos);
    src = `${src.slice(0, importEnd)}\n${importLine}${src.slice(importEnd)}`;
  }

  const arrayMarker = 'const ';
  const arrStart = src.indexOf(arrayMarker);
  const openBracket = src.indexOf('[', arrStart);
  const closeBracket = src.indexOf('];', openBracket);
  if (openBracket === -1 || closeBracket === -1) {
    throw new Error(`Cannot find posts array in ${groupFilePath}`);
  }

  const before = src.slice(0, openBracket + 1);
  const inside = src.slice(openBracket + 1, closeBracket);
  const after = src.slice(closeBracket);
  if (inside.includes(constVar)) return src;

  const trimmed = inside.trimEnd();
  const sep = trimmed.length === 0 ? '\n  ' : `${trimmed.endsWith(',') ? '' : ','}\n  `;
  const newInside = `${trimmed}${sep}${constVar},\n`;
  return `${before}${newInside}${after}`;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }

  const group = args.group;
  const slug = args.slug;
  const title = args.title;
  if (!group || !slug || !title) {
    printHelp();
    throw new Error('Missing required args: --group, --slug, --title');
  }
  if (!GROUPS[group]) {
    throw new Error(`Unknown group "${group}". Use one of: ${Object.keys(GROUPS).join(', ')}`);
  }
  assertSlug(slug);

  const varName = toVarName(slug);
  const groupMeta = GROUPS[group];
  const groupFile = path.join(ROOT, groupMeta.file);
  const itemFile = path.join(ROOT, 'lib/blog/posts/items', `${slug}.ts`);
  const importLine = `import ${varName} from './items/${slug}';`;

  if (fs.existsSync(itemFile) && !args.force) {
    throw new Error(`Item file already exists: ${itemFile}. Use --force to overwrite.`);
  }

  const id = args.id || nextId();
  const date = args.date || today();
  const author = args.author || 'Toolsify Editorial Team';
  const category = args.category || groupMeta.defaultCategory;
  const tags = (args.tags ? args.tags.split(',') : [title]).map((s) => s.trim()).filter(Boolean);
  const langTemplate = args['lang-template'] || 'minimal';
  if (!['minimal', 'full'].includes(langTemplate)) {
    throw new Error(`Invalid --lang-template "${langTemplate}". Use minimal or full.`);
  }

  const itemContent = buildItemContent({
    varName,
    id,
    slug,
    title,
    author,
    date,
    category,
    tags,
    langTemplate,
  });
  fs.writeFileSync(itemFile, itemContent);

  const nextGroupSrc = injectToGroup(groupFile, importLine, varName);
  fs.writeFileSync(groupFile, nextGroupSrc);

  console.log(`Created: ${path.relative(ROOT, itemFile)}`);
  console.log(`Updated: ${path.relative(ROOT, groupFile)}`);
  console.log(`id=${id} group=${group} slug=${slug}`);
}

try {
  main();
} catch (error) {
  console.error(`[blog:new] ${error.message}`);
  process.exit(1);
}
