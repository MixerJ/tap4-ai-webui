import { BlogPost } from '../../types';

const postChineseAiModels2026Comparison: BlogPost = {
  id: '3413',
  slug: 'chinese-ai-models-2026-comparison',
  author: 'Toolsify AI',
  date: '2026-05-16',
  category: 'AI Models',
  title: {
    en: 'Chinese AI Models in 2026: Qwen, DeepSeek, Kimi, GLM, and MiMo Compared',
    cn: '2026 中国大模型对比：Qwen、DeepSeek、Kimi、GLM 与 MiMo 怎么选',
    tw: '2026 中國大模型對比：Qwen、DeepSeek、Kimi、GLM 與 MiMo 怎麼選',
    de: 'Chinesische KI-Modelle 2026: Qwen, DeepSeek, Kimi, GLM und MiMo im Vergleich',
    es: 'Modelos chinos de IA en 2026: Qwen, DeepSeek, Kimi, GLM y MiMo comparados',
    fr: 'Modèles IA chinois en 2026 : comparaison Qwen, DeepSeek, Kimi, GLM et MiMo',
    jp: '2026年の中国AIモデル比較：Qwen、DeepSeek、Kimi、GLM、MiMo',
    pt: 'Modelos chineses de IA em 2026: Qwen, DeepSeek, Kimi, GLM e MiMo comparados',
    ru: 'Китайские AI-модели в 2026: сравнение Qwen, DeepSeek, Kimi, GLM и MiMo',
  },
  excerpt: {
    en: 'The latest Chinese model race is not one leaderboard. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1, and MiMo V2.5 point to different bets: multimodal agents, long context, coding, local control, and production evaluation.',
    cn: '最新中国大模型竞争不是一张排行榜能讲清楚。Qwen3.6、DeepSeek V4、Kimi K2.6、GLM-5.1 和 MiMo V2.5 分别押注多模态 Agent、长上下文、代码、开源控制与生产评测。',
    tw: '最新中國大模型競爭不是一張排行榜能講清楚。Qwen3.6、DeepSeek V4、Kimi K2.6、GLM-5.1 與 MiMo V2.5 分別押注多模態 Agent、長上下文、程式碼、開源控制與生產評測。',
    de: 'Das Rennen chinesischer Modelle ist keine einfache Rangliste. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 und MiMo V2.5 setzen auf unterschiedliche Stärken.',
    es: 'La carrera de modelos chinos no cabe en un solo ranking. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 y MiMo V2.5 apuestan por cosas distintas.',
    fr: 'La course des modèles chinois ne se résume pas à un classement. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 et MiMo V2.5 misent sur des forces différentes.',
    jp: '中国モデル競争は単一ランキングでは説明できません。Qwen3.6、DeepSeek V4、Kimi K2.6、GLM-5.1、MiMo V2.5はそれぞれ異なる強みを狙っています。',
    pt: 'A corrida dos modelos chineses não cabe em um único ranking. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 e MiMo V2.5 apostam em forças diferentes.',
    ru: 'Гонка китайских моделей не сводится к одному рейтингу. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 и MiMo V2.5 делают разные ставки.',
  },
  content: {
    en: `# Chinese AI Models in 2026: Qwen, DeepSeek, Kimi, GLM, and MiMo Compared

The lazy version of a Chinese AI model comparison is a table of benchmark scores. It looks useful for ten seconds, then falls apart. One model is multimodal, another is optimized for long-context reasoning, another is better positioned for coding agents, and another may be easier to run under your license or infrastructure constraints. A single “best Chinese model” answer is usually a sign that the comparison is too shallow.

The current official model-card picture is more interesting. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1, and MiMo V2.5 all point toward the same market truth: Chinese labs are no longer competing only on chat quality. They are competing on agent workflows, multimodal inputs, long context, open-weight deployment, coding benchmarks, and production serving paths.

This guide compares the latest official model lines we found from official Hugging Face authors and model cards, not third-party GGUF derivatives. Treat the numbers as model-card claims, then run your own evals before switching.

## The short version: choose by workload, not brand

If you need a compact multimodal MoE with strong open licensing and practical serving guidance, start with [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B). The card lists Apache-2.0 licensing, 35B total parameters with about 3B active, image-text-to-text support, 262,144 native context, and extension up to 1,010,000 tokens with RoPE scaling and YaRN caveats. It also has explicit thinking-mode controls. That makes Qwen3.6 a strong candidate for teams that want a modern Chinese model with a familiar deployment ecosystem and manageable active-parameter size.

If you need the largest long-context reasoning candidate in this set, look at [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro). The card describes a 1.6T total-parameter MoE with 49B active parameters, 1M context, hybrid attention, and mixed FP4 plus FP8 precision. It reports strong scores on SWE Verified, SWE Pro, Terminal Bench 2.0, and GPQA Diamond. The catch is operational complexity: no Jinja chat template is included, and the card points users to encoding scripts. This is a serious model, not a drop-in replacement for every chat app.

If your priority is multimodal agent behavior, watch [Kimi-K2.6](https://huggingface.co/moonshotai/Kimi-K2.6). The official card calls it a native multimodal agentic model with 1T total parameters, 32B active, 256K context, text and image support, and experimental video support through the official API. It is positioned for long-horizon coding, design, autonomous execution, and orchestration. The license is a Modified MIT License, so legal review matters.

If your team evaluates coding agents and terminal-heavy engineering tasks, GLM-5.1 and MiMo V2.5 Pro deserve separate attention. We covered GLM in our [GLM-5.1 model guide](/blog/glm-5-1-model-guide) and MiMo in our [Xiaomi MiMo V2.5 guide](/blog/xiaomi-mimo-v2-5-model-guide). GLM-5.1 emphasizes agentic engineering at 754B parameters, while MiMo V2.5 Pro combines 1M context with a 1.02T total-parameter MoE and software-agent positioning.

## Qwen3.6: the practical open-stack candidate

Qwen’s advantage is not only benchmark reach. It is ecosystem maturity. The Qwen3.6-35B-A3B card gives unusually concrete operational guidance: vLLM and SGLang recommendations, thinking-mode toggles, preserve-thinking options, output-length guidance, and a warning that static YaRN can hurt short-context performance if used casually.

That last warning is the kind of detail teams should respect. Long context is valuable only if you know when to pay for it. A 262K native context may already be enough for many repository, research, and document workflows. Extending toward 1M context should be a deliberate choice, not a default checkbox.

Qwen3.6 is a natural first test for teams that want broad Chinese model coverage without immediately jumping to trillion-parameter serving. It is also useful for multimodal workflows where image and video inputs matter. If you work with private notes, screenshots, diagrams, and long documents, pair this comparison with our [local multimodal AI workflows](/blog/local-multimodal-ai-workflows) guide.

## DeepSeek V4: strongest when long context and hard reasoning matter

DeepSeek-V4-Pro looks like the heavyweight reasoning option in this group. The model card describes 1M context and a 1.6T total-parameter MoE. It also distinguishes V4-Pro from V4-Flash: Flash is smaller at 284B total and 13B active parameters, while Pro is positioned as stronger for knowledge-heavy and hardest agentic workflows.

That split is useful. Many teams do not need the Pro path for every request. A routing design may use a faster model for drafting, classification, or quick support replies, and reserve DeepSeek-V4-Pro for long-context analysis, hard coding repair, or high-stakes research synthesis.

The card’s deployment notes deserve attention. If there is no standard Jinja chat template and you need encoding scripts, your integration risk moves from prompt writing into message formatting, parsing, and observability. A model can be excellent and still fail inside your product because the wrapper is brittle.

## Kimi K2.6: multimodal agents and long-horizon work

Kimi-K2.6 is interesting because it does not pitch itself as ordinary text chat. The card emphasizes native multimodal agentic behavior, long-horizon coding, coding-driven design, proactive execution, and swarm-style orchestration. It reports claims on SWE-Bench Verified, SWE-Bench Pro, Terminal-Bench 2.0, AIME 2026, GPQA-Diamond, and BrowseComp.

The deployment story is also specific. The model supports vLLM, SGLang, and KTransformers, and the card notes that video chat is experimental and currently only supported through the official API. That sentence matters. If your product depends on video understanding, local open-weight serving and official API behavior may not match.

Kimi-K2.6 is a good candidate for teams evaluating visual agents, UI generation, multimodal research assistants, or coding workflows with screenshots and tool calls. It should be tested with failure-heavy tasks: ambiguous screenshots, partial specs, broken front-end states, and long tool loops.

## GLM-5.1 and MiMo V2.5: agentic engineering from two angles

GLM-5.1 and MiMo V2.5 are both Chinese flagship candidates, but they tell different stories.

[GLM-5.1](https://huggingface.co/zai-org/GLM-5.1) is framed around agentic engineering: repository tasks, terminal benchmarks, browsing, cybersecurity-style tasks, and long-horizon coding behavior. Its card lists 754B parameters and MIT licensing. If your team is building coding agents, GLM-5.1 belongs in the eval set even if you do not plan to self-host it immediately.

[MiMo V2.5](https://huggingface.co/XiaomiMiMo/MiMo-V2.5) has the broader multimodal story: text, image, video, audio, 1M context, and a 310B total / 15B active MoE. MiMo V2.5 Pro raises the scale to 1.02T total / 42B active and focuses more directly on agentic software tasks. The important caveat is custom_code and trust_remote_code. Treat model loading as part of the security review, not a harmless install step.

## How to evaluate Chinese models without chasing hype

Start with a small matrix. Put models on rows and workloads on columns: coding repair, long-document QA, multimodal analysis, Chinese-English translation, tool calling, cost, latency, licensing, local serving, and security review. Then fill it with results from your own tasks.

For public numbers, write down the source. Is the claim from an official model card, an independent benchmark, a third-party quantization repo, or your own test? Do not mix those as if they carry the same weight. Official model-card claims are useful, but they are not the same as your production logs.

Use a personal eval set before changing defaults. Our guide on [choosing AI models with personal evals](/blog/choose-ai-models-with-personal-evals) explains the method, and the [LLM evals in practice](/blog/llm-evals-in-practice-test-ai-features) article shows how to turn those checks into product gates. If coding is the main use case, compare against your current baseline and read the [Claude 4 vs GPT-5 coding benchmark guide](/blog/claude-4-vs-gpt-5-code-benchmarks-2026) for a reminder that benchmark winners can still lose on workflow fit.

## The practical ranking

For most teams, the first model to test is Qwen3.6 because it balances open licensing, clear serving guidance, multimodal inputs, and manageable active-parameter scale. The hardest reasoning candidate is DeepSeek-V4-Pro. The most agentic multimodal candidate is Kimi-K2.6. The engineering-agent specialist to watch is GLM-5.1. The most surprising ecosystem entrant is MiMo V2.5, especially if Xiaomi keeps pushing 1M-context multimodal and software-agent variants.

That is not a permanent ranking. It is a starting map. The Chinese model race is moving too quickly for static conclusions. The durable skill is learning how to evaluate each release: read official cards, separate claims from evidence, run your own prompts, inspect failure modes, and choose the model that fits the job rather than the one with the loudest launch.`,
    cn: `# 2026 中国大模型对比：Qwen、DeepSeek、Kimi、GLM 与 MiMo 怎么选

偷懒版中国大模型对比就是列一张分数表。但这很快就会失效：有的模型偏多模态，有的偏长上下文推理，有的更适合代码 Agent，有的在许可和部署上更友好。所谓“最好的中国模型”通常说明比较维度太少。

本文只采用官方组织和官方模型卡中的信息，而不是第三方 GGUF 或二次量化仓库。公开数字可以作为信号，但切换模型前仍要做自己的生产级评测。

## 按工作负载选，而不是按品牌选

如果你想要生态成熟、许可清晰、部署说明具体的多模态 MoE，可以先看 [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B)。它采用 Apache-2.0，35B 总参数、约 3B 激活参数，原生 262,144 token 上下文，并可通过 RoPE/YaRN 扩展到更长上下文，但官方也提醒要注意短上下文性能影响。

如果你需要更重的长上下文与复杂推理，可以看 [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)。模型卡描述它为 1.6T 总参数、49B 激活参数、1M 上下文的 MoE，并区分 V4-Pro 与更小的 V4-Flash。

如果重点是多模态 Agent，可以关注 [Kimi-K2.6](https://huggingface.co/moonshotai/Kimi-K2.6)。它是 1T 总参数、32B 激活参数、256K 上下文的原生多模态 Agent 模型，支持文本、图像，并在官方 API 中实验性支持视频。

GLM-5.1 和 MiMo V2.5 则值得单独看。我们分别写了 [GLM-5.1 指南](/blog/glm-5-1-model-guide) 和 [MiMo V2.5 指南](/blog/xiaomi-mimo-v2-5-model-guide)。前者偏 agentic engineering，后者强调 1M 上下文、多模态和 Agent 方向。

## 不同模型的核心差异

Qwen3.6 更像工程上容易先试的选择：Apache-2.0、SGLang/vLLM 支持、thinking mode 控制、多模态输入和相对可控的激活参数规模。DeepSeek V4 更像重型推理候选，适合长上下文分析、代码修复和高难研究综合。Kimi K2.6 的重点是多模态 Agent、UI/设计/代码场景和长链路执行。GLM-5.1 面向工程 Agent 与终端/仓库任务。MiMo V2.5 则把小米带进 1M 上下文、多模态和开源模型竞争。

## 怎么评估

先做一个小矩阵：代码修复、长文档问答、多模态分析、中英任务、工具调用、成本、延迟、许可、本地部署和安全审查。每个模型都用自己的真实任务跑一遍，而不是只看模型卡分数。

公开基准需要标明来源：官方模型卡、独立评测、第三方量化仓库、还是你自己的测试。它们不能混在一起当成同等级证据。可以参考 [personal evals](/blog/choose-ai-models-with-personal-evals) 和 [LLM evals](/blog/llm-evals-in-practice-test-ai-features) 的方法，把模型选择变成证据，而不是感觉。

## 实用排序

大多数团队可以先测 Qwen3.6，因为它平衡了许可、生态、部署和多模态。最重型的推理候选是 DeepSeek-V4-Pro。多模态 Agent 方向看 Kimi-K2.6。工程 Agent 看 GLM-5.1。想观察小米在开源模型里的动作，则看 MiMo V2.5。这个排序不是永恒结论，而是 2026 当前阶段的测试地图。`,
    tw: `# 2026 中國大模型對比：Qwen、DeepSeek、Kimi、GLM 與 MiMo 怎麼選

偷懶版中國大模型對比就是列一張分數表。但這很快失效：有的模型偏多模態，有的偏長上下文推理，有的更適合程式碼 Agent，有的在授權和部署上更友好。所謂「最好的中國模型」通常代表比較維度太少。

本文只採用官方組織和官方模型卡資訊，而不是第三方 GGUF 或二次量化倉庫。公開數字可以作為訊號，但切換模型前仍要做自己的生產級評測。

## 按工作負載選，而不是按品牌選

如果你想要生態成熟、授權清楚、部署說明具體的多模態 MoE，可以先看 [Qwen3.6-35B-A3B](https://huggingface.co/Qwen/Qwen3.6-35B-A3B)。它採用 Apache-2.0，35B 總參數、約 3B 啟用參數，原生 262,144 token 上下文，並可透過 RoPE/YaRN 擴展。

如果你需要更重的長上下文與複雜推理，可以看 [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)。模型卡描述它為 1.6T 總參數、49B 啟用參數、1M 上下文的 MoE。

如果重點是多模態 Agent，可以關注 [Kimi-K2.6](https://huggingface.co/moonshotai/Kimi-K2.6)。它是 1T 總參數、32B 啟用參數、256K 上下文的原生多模態 Agent 模型，支援文字、影像，並在官方 API 中實驗性支援影片。

GLM-5.1 和 MiMo V2.5 值得單獨看。站內已有 [GLM-5.1 指南](/blog/glm-5-1-model-guide) 和 [MiMo V2.5 指南](/blog/xiaomi-mimo-v2-5-model-guide)。前者偏 agentic engineering，後者強調 1M 上下文、多模態與 Agent 方向。

## 怎麼評估

先做一個小矩陣：程式碼修復、長文件問答、多模態分析、中英任務、工具調用、成本、延遲、授權、本地部署和安全審查。每個模型都用自己的真實任務跑一遍，而不是只看模型卡分數。

公開基準需要標明來源：官方模型卡、獨立評測、第三方量化倉庫，還是自己的測試。可以參考 [personal evals](/blog/choose-ai-models-with-personal-evals) 和 [LLM evals](/blog/llm-evals-in-practice-test-ai-features)，把模型選擇變成證據，而不是感覺。`,
    de: `# Chinesische KI-Modelle 2026: Qwen, DeepSeek, Kimi, GLM und MiMo im Vergleich

Ein Ranking reicht für chinesische Modelle nicht mehr aus. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 und MiMo V2.5 zielen auf unterschiedliche Jobs: Multimodalität, lange Kontexte, Coding Agents, offene Gewichte und produktionsnahe Evals.

Qwen3.6 ist der praktische Startpunkt: Apache-2.0, 35B total, rund 3B aktiv, multimodal, 262K nativer Kontext und klare Hinweise zu vLLM/SGLang. DeepSeek-V4-Pro ist der schwere Long-Context-Kandidat mit 1.6T total, 49B aktiv und 1M Kontext. Kimi-K2.6 zielt auf multimodale Agenten, Bild/Text-Workflows und langes Coding. GLM-5.1 ist stark auf agentic engineering ausgerichtet. MiMo V2.5 bringt Xiaomi mit 1M Kontext und Multimodalität in die Open-Model-Debatte.

Die richtige Auswahl hängt vom Workload ab. Baue eine kleine Eval-Matrix: Coding-Repair, lange Dokumente, multimodale Analyse, Tool Calls, Kosten, Latenz, Lizenz, Self-Hosting und Security Review. Offizielle Model-Card-Zahlen sind Signale, aber keine Produktionsfreigabe. Nutze [personal evals](/blog/choose-ai-models-with-personal-evals), bevor du ein Modell zum Standard machst.`,
    es: `# Modelos chinos de IA en 2026: Qwen, DeepSeek, Kimi, GLM y MiMo comparados

Un ranking ya no basta para comparar modelos chinos. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 y MiMo V2.5 apuntan a trabajos distintos: multimodalidad, contexto largo, agentes de código, pesos abiertos y evals de producción.

Qwen3.6 es el punto de partida práctico: Apache-2.0, 35B totales, unos 3B activos, multimodalidad, contexto nativo de 262K y guía clara para vLLM/SGLang. DeepSeek-V4-Pro es el candidato pesado de largo contexto, con 1.6T totales, 49B activos y contexto 1M. Kimi-K2.6 mira a agentes multimodales y coding largo. GLM-5.1 se centra en agentic engineering. MiMo V2.5 coloca a Xiaomi en la conversación de modelos abiertos con 1M contexto y multimodalidad.

Elige por carga de trabajo. Crea una matriz: reparación de código, documentos largos, análisis multimodal, tool calls, coste, latencia, licencia, self-hosting y seguridad. Los números oficiales son señales, no aprobación para producción. Usa [personal evals](/blog/choose-ai-models-with-personal-evals) antes de cambiar el modelo por defecto.`,
    fr: `# Modèles IA chinois en 2026 : comparaison Qwen, DeepSeek, Kimi, GLM et MiMo

Un classement unique ne suffit plus. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 et MiMo V2.5 visent des usages différents : multimodalité, contexte long, agents de code, poids ouverts et évaluations proches de la production.

Qwen3.6 est souvent le premier candidat pratique : Apache-2.0, 35B paramètres, environ 3B actifs, multimodalité, contexte natif 262K et bonnes indications vLLM/SGLang. DeepSeek-V4-Pro est le candidat lourd pour raisonnement et contexte 1M. Kimi-K2.6 vise les agents multimodaux. GLM-5.1 cible l’agentic engineering. MiMo V2.5 apporte Xiaomi dans la course open model avec contexte 1M et multimodalité.

Choisissez selon le workload : réparation de code, longs documents, analyse multimodale, appels d’outils, coût, latence, licence, self-hosting et sécurité. Les chiffres officiels sont des signaux, pas une validation production. Utilisez des [personal evals](/blog/choose-ai-models-with-personal-evals).`,
    jp: `# 2026年の中国AIモデル比較：Qwen、DeepSeek、Kimi、GLM、MiMo

中国モデルの比較は、単一のランキングでは足りません。Qwen3.6、DeepSeek V4、Kimi K2.6、GLM-5.1、MiMo V2.5は、それぞれマルチモーダル、長文脈、コードエージェント、オープンウェイト、実運用評価という異なる方向を狙っています。

Qwen3.6は実用的な出発点です。Apache-2.0、35B総パラメータ、約3Bアクティブ、262Kネイティブコンテキスト、vLLM/SGLang向けの具体的な案内があります。DeepSeek-V4-Proは1.6T総パラメータ、49Bアクティブ、1Mコンテキストの重い推論候補です。Kimi-K2.6はマルチモーダルエージェント、GLM-5.1はagentic engineering、MiMo V2.5はXiaomiの1Mコンテキスト・マルチモーダル路線です。

選定はワークロードで行うべきです。コード修復、長文書QA、マルチモーダル分析、ツール呼び出し、コスト、遅延、ライセンス、セルフホスト、セキュリティを小さな評価表にして、[personal evals](/blog/choose-ai-models-with-personal-evals) で検証しましょう。`,
    pt: `# Modelos chineses de IA em 2026: Qwen, DeepSeek, Kimi, GLM e MiMo comparados

Um ranking único já não explica os modelos chineses. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 e MiMo V2.5 miram trabalhos diferentes: multimodalidade, contexto longo, agentes de código, pesos abertos e evals de produção.

Qwen3.6 é o ponto de partida prático: Apache-2.0, 35B totais, cerca de 3B ativos, multimodalidade, contexto nativo de 262K e orientação clara para vLLM/SGLang. DeepSeek-V4-Pro é o candidato pesado de raciocínio e contexto 1M. Kimi-K2.6 mira agentes multimodais. GLM-5.1 foca agentic engineering. MiMo V2.5 coloca a Xiaomi na disputa open-model com 1M contexto e multimodalidade.

Escolha por workload: reparo de código, documentos longos, análise multimodal, chamadas de ferramentas, custo, latência, licença, self-hosting e segurança. Números oficiais são sinais, não aprovação para produção. Use [personal evals](/blog/choose-ai-models-with-personal-evals).`,
    ru: `# Китайские AI-модели в 2026: сравнение Qwen, DeepSeek, Kimi, GLM и MiMo

Один рейтинг уже не описывает китайские модели. Qwen3.6, DeepSeek V4, Kimi K2.6, GLM-5.1 и MiMo V2.5 нацелены на разные задачи: мультимодальность, длинный контекст, coding agents, open weights и production evals.

Qwen3.6 — практичная отправная точка: Apache-2.0, 35B всего, около 3B активных параметров, мультимодальность, 262K нативного контекста и понятные рекомендации для vLLM/SGLang. DeepSeek-V4-Pro — тяжелый кандидат для reasoning и 1M контекста. Kimi-K2.6 ориентирован на мультимодальных агентов. GLM-5.1 — на agentic engineering. MiMo V2.5 показывает ставку Xiaomi на 1M контекст и мультимодальность.

Выбирайте по workload: исправление кода, длинные документы, мультимодальный анализ, tool calls, стоимость, задержка, лицензия, self-hosting и безопасность. Официальные цифры — сигналы, а не production approval. Используйте [personal evals](/blog/choose-ai-models-with-personal-evals).`,
  },
  tags: [
    'Chinese AI models 2026',
    'Qwen3.6 vs DeepSeek V4',
    'Kimi K2.6',
    'GLM-5.1',
    'MiMo V2.5',
    'China LLM comparison',
    'open-weight Chinese models',
    'Chinese multimodal LLMs',
    'latest Chinese AI models',
  ],
};

export default postChineseAiModels2026Comparison;
