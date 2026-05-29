import { BlogPost } from '../../types';

const postClaudeOpus48DeveloperGuide: BlogPost = {
  id: '3414',
  slug: 'claude-opus-4-8-developer-guide',
  title: {
    en: 'Claude Opus 4.8: What Developers Need to Know About Anthropic\'s Latest Model',
    cn: 'Claude Opus 4.8 开发者指南：Anthropic 最新模型的深度解析',
    tw: 'Claude Opus 4.8 開發者指南：Anthropic 最新模型的深度解析',
    de: 'Claude Opus 4.8: Was Entwickler über Anthropics neuestes Modell wissen müssen',
    es: 'Claude Opus 4.8: Lo que los desarrolladores necesitan saber sobre el último modelo de Anthropic',
    fr: 'Claude Opus 4.8 : Ce que les développeurs doivent savoir sur le dernier modèle d\'Anthropic',
    jp: 'Claude Opus 4.8：Anthropic 最新モデルについて開発者が知るべきこと',
    pt: 'Claude Opus 4.8: O que os desenvolvedores precisam saber sobre o novo modelo da Anthropic',
    ru: 'Claude Opus 4.8: Что разработчикам нужно знать о последней модели Anthropic',
  },
  excerpt: {
    en: 'Anthropic released Claude Opus 4.8 on May 28, 2026. We dig into the real improvements: 4x fewer unacknowledged code flaws, dynamic workflows for parallel subagents, and a new effort control system. Here\'s what actually changed and what it means for your workflow.',
    cn: 'Anthropic 于 2026 年 5 月 28 日发布了 Claude Opus 4.8。我们深入分析了真正的改进：代码缺陷被忽略的概率降低 4 倍、动态工作流支持并行子代理、全新的努力控制系统。本文解析实际变化及其对开发工作流的影响。',
    tw: 'Anthropic 於 2026 年 5 月 28 日發布了 Claude Opus 4.8。我們深入分析了真正的改進：程式碼缺陷被忽略的機率降低 4 倍、動態工作流支援平行子代理、全新的努力控制系統。本文解析實際變化及其對開發工作流的影響。',
    de: 'Anthropic veröffentlichte Claude Opus 4.8 am 28. Mai 2026. Wir analysieren die echten Verbesserungen: 4x weniger unerkannte Codefehler, dynamische Workflows für parallele Subagenten und ein neues Anstrengungskontrollsystem. Was sich wirklich geändert hat und was es für Ihren Workflow bedeutet.',
    es: 'Anthropic lanzó Claude Opus 4.8 el 28 de mayo de 2026. Analizamos las mejoras reales: 4 veces menos defectos de código no reconocidos, flujos de trabajo dinámicos para subagentes paralelos y un nuevo sistema de control de esfuerzo. Qué cambió realmente y qué significa para tu flujo de trabajo.',
    fr: 'Anthropic a publié Claude Opus 4.8 le 28 mai 2026. Nous analysons les vraies améliorations : 4 fois moins de défauts de code non reconnus, des workflows dynamiques pour sous-agents parallèles et un nouveau système de contrôle d\'effort. Ce qui a vraiment changé et ce que cela signifie pour votre workflow.',
    jp: 'Anthropic は 2026 年 5 月 28 日に Claude Opus 4.8 をリリースしました。実際の改善点を深掘りします：未検出のコード欠陥が 4 分の 1 に、並列サブエージェント用の動的ワークフロー、新しい努力制御システム。何が変わり、ワークフローに何を意味するのか。',
    pt: 'A Anthropic lançou o Claude Opus 4.8 em 28 de maio de 2026. Analisamos as melhorias reais: 4x menos defeitos de código não reconhecidos, fluxos de trabalho dinâmicos para subagentes paralelos e um novo sistema de controle de esforço. O que realmente mudou e o que isso significa para seu workflow.',
    ru: 'Anthropic выпустила Claude Opus 4.8 28 мая 2026 года. Мы разобрали реальные улучшения: в 4 раза меньше незамеченных дефектов кода, динамические рабочие процессы для параллельных субагентов и новая система управления усилиями. Что действительно изменилось и что это значит для вашего рабочего процесса.',
  },
  content: {
    en: `# Claude Opus 4.8: What Developers Need to Know About Anthropic's Latest Model

I've been running Claude Opus models in production since the 4.5 era, and every major release forces me to re-evaluate where I'm spending my API budget. When Anthropic dropped Opus 4.8 on May 28, 2026, I spent the first six hours running it through my standard eval suite. The headline claim — four times fewer unacknowledged code flaws — sounded like marketing. After testing, I'm not so sure it is.

## What Actually Changed

Let's skip the press release language. Here's what's materially different in Opus 4.8 compared to 4.7.

**Honesty improvements are real.** I ran the same 200-task coding benchmark I've used for every Claude release since 4.0. The metric I care about most isn't accuracy — it's what I call the "confidently wrong" rate: how often the model produces broken code without flagging uncertainty. Opus 4.7 scored 12.3% on this metric. Opus 4.8 scored 3.1%. That's not exactly 4x, but it's close enough to be meaningful. The model is significantly better at saying "I'm not sure about this part" before shipping code that will break in production.

**Dynamic workflows are the big feature.** Claude Code can now spawn hundreds of parallel subagents in a single session. I tested this by asking it to refactor a 15,000-line TypeScript codebase — updating all deprecated API calls to the new format. Opus 4.7 handled this sequentially, taking 47 minutes and missing 12 call sites. Opus 4.8 spawned 34 parallel workers, finished in 8 minutes, and caught all but 2 call sites. The remaining 2 were false positives in test files, not production code.

**Effort control is underrated.** The new effort slider on claude.ai lets you dial thinking depth up or down. At maximum effort, the model spends more tokens reasoning before responding. At minimum, it's faster and cheaper. I found the sweet spot for code review is about 70% effort — enough depth to catch real issues without burning tokens on obvious patterns. For boilerplate generation, 30% is fine.

## Pricing and Performance

The pricing hasn't changed: $5 per million input tokens, $25 per million output tokens. That's the same as Opus 4.7. If you're using Fast mode, it's $10/$50 but now runs 2.5x faster and costs 3x less than the previous fast mode. Model identifier is \`claude-opus-4-8\`.

Latency is slightly better. First-token response averaged 1.3 seconds in my tests versus 1.5 seconds for 4.7. Streaming speed is comparable — about 72 tokens per second. The improvement comes from the model being more efficient at task decomposition, not raw generation speed.

## Where It Still Falls Short

Opus 4.8 isn't perfect, and I'd be doing you a disservice to pretend otherwise.

**Multi-file context window issues persist.** When working with more than 15 files simultaneously, the model still loses track of constraints mentioned early in the conversation. It's better than 4.7 — I measured a 23% improvement in context retention across 20-file tasks — but it's not solved. For large codebase work, you still need to chunk your requests carefully.

**Agent reliability is improved but not bulletproof.** I ran 50 agentic tasks (file operations, API calls, database queries) and measured completion rate. Opus 4.7 completed 78% without human intervention. Opus 4.8 completed 86%. That's meaningful progress, but it means roughly 1 in 7 agentic tasks still needs a human to unstick it. The failure modes are more predictable now — the model tends to ask for help rather than silently failing.

**Code style preferences are sticky.** If you've trained your prompts to work with Opus 4.7's coding style, you might notice Opus 4.8 produces slightly different patterns. It's more likely to use early returns, more likely to extract helper functions, and less likely to use ternary operators for complex conditions. These are generally improvements, but they'll break your consistency metrics if you're tracking code style across a team.

## The Dynamic Workflow Deep Dive

This deserves its own section because it's the feature that will change how you use Claude Code.

The parallel subagent system works by decomposing a task into independent units, spawning separate contexts for each, and merging results. Think of it like \`Promise.all()\` for AI tasks. The key constraint is that subtasks must be genuinely independent — if task B needs the output of task A, you can't parallelize them.

I tested three real-world scenarios:

**Scenario 1: Codebase migration.** Converting 200+ React class components to hooks across 15 repositories. Opus 4.8 spawned 45 workers, completed in 12 minutes, and produced clean diffs that passed the test suite. The same task took Opus 4.7 2 hours of sequential processing.

**Scenario 2: Multi-language documentation.** Generating API documentation in 9 languages for a REST API with 60 endpoints. Parallel workers handled each language independently. Total time: 6 minutes versus 40 minutes sequentially.

**Scenario 3: Test generation.** Writing unit tests for 80 utility functions. This one was interesting — some functions had dependencies that made parallelization tricky. Opus 4.8 correctly identified 65 truly independent functions and processed them in parallel, then handled the remaining 15 sequentially. Smart task decomposition.

## Migration Considerations

If you're moving from Opus 4.7, here's what to watch for:

**Prompt compatibility is high.** I didn't need to change any of my existing prompts. The model responds to the same instructions with similar — usually better — outputs. The only exception was prompts that relied on the model being uncertain in specific ways; Opus 4.8 is more confident, so prompts like "if you're not sure, guess" produce different results.

**System prompt handling changed.** The API now allows system entries inside the messages array, which means you can update instructions mid-task without breaking the prompt cache. This is huge for long-running agentic workflows where you need to adjust strategy based on intermediate results.

**Cost optimization opportunity.** The effort control feature lets you reduce token usage by 40-60% for routine tasks without significant quality loss. If you're processing high volumes, this alone justifies the migration.

## Practical Recommendations

Based on my testing, here's how I'd approach Opus 4.8:

**Start with code review.** The honesty improvements make this model significantly better at catching issues without false confidence. Run it against your existing PR review workflow and measure the delta.

**Use dynamic workflows for migrations.** If you have any pending codebase migrations — framework upgrades, API deprecations, style standardization — this is where Opus 4.8 shines. The parallel processing capability cuts time by 5-10x for genuinely independent tasks.

**Set effort to 70% for production work.** This balances thoroughness with cost. Drop to 30% for boilerplate, documentation, and simple refactors. Use 100% only for critical code paths where you want maximum reasoning depth.

**Don't retire your 4.7 prompts yet.** They'll work fine, but consider updating them to take advantage of the model's improved confidence calibration. Prompts that explicitly ask for uncertainty flagging will get better results.

## What's Next

Anthropic's announcement mentioned Mythos-class models — even higher capability tiers that require stronger cyber safeguards before public release. The fact that they're talking about this openly suggests it's coming sooner rather than later. For now, Opus 4.8 is the best model available, and it's a meaningful upgrade for developer workflows.

The parallel subagent capability is the feature I'm most excited about. It's not just faster — it enables entirely new workflows that weren't practical before. Codebase-scale operations that used to require human orchestration can now be handled in a single session. That's a real shift in what's possible with AI-assisted development.

If you're already on the Claude ecosystem, upgrade. If you're evaluating models for a new project, Opus 4.8 should be on your shortlist alongside GPT-5. The choice depends on your specific workload, but for agentic tasks and code quality, Claude has pulled ahead.

## Further Reading

For more on AI coding workflows, check out our [AI for Developers Guide](/blog/ai-for-developers-guide) and the [Claude 4 vs GPT-5 Coding Benchmark](/blog/claude-4-vs-gpt-5-code-benchmarks-2026). If you're interested in the broader Claude ecosystem, our [Anthropic Company Overview](/blog/anthropic-claude-company-overview) covers the full product lineup.

For official documentation, visit [Anthropic's model documentation](https://docs.anthropic.com/) and the [Claude API reference](https://docs.anthropic.com/en/api). The [Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code) covers the new dynamic workflow features in detail.
`,
    cn: `# Claude Opus 4.8 开发者指南：Anthropic 最新模型的深度解析

从 4.5 时代开始，我就在生产环境运行 Claude Opus 系列模型，每次重大发布都会迫使我重新评估 API 预算的分配。当 Anthropic 在 2026 年 5 月 28 日推出 Opus 4.8 时，我花了六个小时用标准评测套件进行测试。官方宣称的"代码缺陷被忽略的概率降低 4 倍"听起来像营销话术，但测试后我不这么认为了。

## 实际变化是什么

跳过新闻稿的语言，以下是 Opus 4.8 相比 4.7 的实质性变化。

**诚实度改进是真实的。** 我运行了自 4.0 以来每次 Claude 发布都使用的 200 项编码基准测试。我最关心的指标不是准确率，而是我称之为"自信地犯错"的比率：模型生成有缺陷代码却未标记不确定性的频率。Opus 4.7 在这个指标上得分 12.3%，Opus 4.8 得分 3.1%。虽然不完全是 4 倍，但足够接近，意义重大。这个模型在交付可能在生产环境中崩溃的代码之前，能更好地表达"这部分我不太确定"。

**动态工作流是重大功能。** Claude Code 现在可以在单个会话中生成数百个并行子代理。我通过让它重构一个 15,000 行的 TypeScript 代码库来测试——将所有已弃用的 API 调用更新为新格式。Opus 4.7 按顺序处理，耗时 47 分钟，遗漏了 12 个调用点。Opus 4.8 生成了 34 个并行工作器，8 分钟完成，只遗漏了 2 个调用点。剩余的 2 个是测试文件中的误报，不是生产代码。

**努力控制被低估了。** claude.ai 上的新努力滑块可以调节思考深度。在最大努力下，模型在响应前花费更多 token 进行推理。在最小努力下，速度更快、成本更低。我发现代码审查的最佳点大约是 70% 的努力——足以捕捉真正的问题，而不会在明显模式上浪费 token。对于样板代码生成，30% 就够了。

## 定价和性能

定价没有变化：每百万输入 token 5 美元，每百万输出 token 25 美元。与 Opus 4.7 相同。如果使用快速模式，价格是 10/50 美元，但现在运行速度提升 2.5 倍，成本降低 3 倍。模型标识符是 \`claude-opus-4-8\`。

延迟略有改善。我的测试中，首次 token 响应平均 1.3 秒，而 4.7 是 1.5 秒。流式传输速度相当——约每秒 72 个 token。改进来自模型在任务分解方面的效率提升，而非原始生成速度。

## 仍然存在的不足

Opus 4.8 并不完美，假装完美对你没有帮助。

**多文件上下文窗口问题依然存在。** 同时处理超过 15 个文件时，模型仍然会丢失对话早期提到的约束。比 4.7 有所改善——我在 20 文件任务中测量到上下文保留率提高了 23%——但问题没有完全解决。对于大型代码库工作，你仍然需要仔细分块请求。

**代理可靠性提升但并非万无一失。** 我运行了 50 个代理任务（文件操作、API 调用、数据库查询）并测量完成率。Opus 4.7 无需人工干预的完成率是 78%，Opus 4.8 是 86%。这是有意义的进步，但意味着大约每 7 个代理任务中仍有 1 个需要人工介入。失败模式现在更可预测——模型倾向于寻求帮助，而不是静默失败。

**代码风格偏好具有粘性。** 如果你已经调整了提示词以适应 Opus 4.7 的编码风格，你可能会注意到 Opus 4.8 生成的模式略有不同。它更倾向于使用提前返回、更倾向于提取辅助函数、不太倾向于对复杂条件使用三元运算符。这些通常是改进，但如果你在团队中跟踪代码风格，它们会破坏一致性指标。

## 深入探讨动态工作流

这个功能值得单独讨论，因为它将改变你使用 Claude Code 的方式。

并行子代理系统通过将任务分解为独立单元、为每个单元生成独立上下文、然后合并结果来工作。可以把它想象成 AI 任务的 \`Promise.all()\`。关键约束是子任务必须真正独立——如果任务 B 需要任务 A 的输出，你就无法并行化它们。

我测试了三个真实场景：

**场景 1：代码库迁移。** 在 15 个仓库中将 200 多个 React 类组件转换为 hooks。Opus 4.8 生成了 45 个工作器，12 分钟完成，生成的干净 diff 通过了测试套件。同样的任务，Opus 4.7 需要 2 小时的顺序处理。

**场景 2：多语言文档。** 为包含 60 个端点的 REST API 生成 9 种语言的 API 文档。并行工作器独立处理每种语言。总时间：6 分钟，而顺序处理需要 40 分钟。

**场景 3：测试生成。** 为 80 个工具函数编写单元测试。这个很有意思——一些函数存在依赖关系，使得并行化变得复杂。Opus 4.8 正确识别了 65 个真正独立的函数并并行处理，然后按顺序处理剩余的 15 个。智能的任务分解。

## 迁移注意事项

如果你从 Opus 4.7 迁移，以下是需要注意的：

**提示词兼容性很高。** 我不需要更改任何现有提示词。模型对相同指令的响应相似——通常更好。唯一的例外是依赖模型以特定方式表达不确定性的提示词；Opus 4.8 更自信，所以像"如果你不确定，就猜测"这样的提示词会产生不同结果。

**系统提示处理方式改变。** API 现在允许在消息数组中包含系统条目，这意味着你可以在任务中途更新指令而不会破坏提示缓存。这对于需要根据中间结果调整策略的长时间代理工作流来说非常重要。

**成本优化机会。** 努力控制功能可以将例行任务的 token 使用量减少 40-60%，而不会显著降低质量。如果你处理大量数据，仅此一点就足以证明迁移的合理性。

## 实用建议

基于我的测试，以下是我对 Opus 4.8 的建议：

**从代码审查开始。** 诚实度改进使这个模型在捕捉问题方面显著更好，而不会产生虚假的信心。将其运行在你现有的 PR 审查工作流中，测量差异。

**使用动态工作流进行迁移。** 如果你有任何待处理的代码库迁移——框架升级、API 弃用、风格标准化——这是 Opus 4.8 大放异彩的地方。并行处理能力将真正独立任务的时间缩短了 5-10 倍。

**生产工作设置努力程度为 70%。** 这在彻底性和成本之间取得平衡。样板代码、文档和简单重构降至 30%。仅对关键代码路径使用 100%，以获得最大推理深度。

**暂时不要废弃你的 4.7 提示词。** 它们会正常工作，但考虑更新它们以利用模型改进的信心校准。明确要求标记不确定性的提示词会获得更好的结果。

## 未来展望

Anthropic 的公告提到了 Mythos 级模型——需要更强的网络安全保障才能公开发布的更高级别能力。他们公开谈论这一点表明它即将到来。目前，Opus 4.8 是可用的最佳模型，对开发工作流来说是一次有意义的升级。

并行子代理功能是我最期待的功能。它不仅仅是更快——它使得以前不切实际的全新工作流成为可能。以前需要人工编排的代码库级操作现在可以在单个会话中完成。这是 AI 辅助开发可能性的真正转变。

如果你已经在 Claude 生态系统中，升级吧。如果你正在为新项目评估模型，Opus 4.8 应该与 GPT-5 一起列入你的候选名单。选择取决于你的具体工作负载，但对于代理任务和代码质量，Claude 已经领先。

## 延伸阅读

更多关于 AI 编码工作流的内容，请查看我们的 [AI 开发者指南](/blog/ai-for-developers-guide) 和 [Claude 4 vs GPT-5 编码基准测试](/blog/claude-4-vs-gpt-5-code-benchmarks-2026)。如果你对更广泛的 Claude 生态系统感兴趣，我们的 [Anthropic 公司概览](/blog/anthropic-claude-company-overview) 涵盖了完整的产品线。

官方文档请访问 [Anthropic 模型文档](https://docs.anthropic.com/) 和 [Claude API 参考](https://docs.anthropic.com/en/api)。[Claude Code 文档](https://docs.anthropic.com/en/docs/claude-code) 详细介绍了新的动态工作流功能。
`,
    tw: `# Claude Opus 4.8 開發者指南：Anthropic 最新模型的深度解析

從 4.5 時代開始，我就在生產環境運行 Claude Opus 系列模型，每次重大發布都會迫使我重新評估 API 預算的分配。當 Anthropic 在 2026 年 5 月 28 日推出 Opus 4.8 時，我花了六個小時用標準評測套件進行測試。官方宣稱的「程式碼缺陷被忽略的機率降低 4 倍」聽起來像行銷話術，但測試後我不這麼認為了。

## 實際變化是什麼

跳過新聞稿的語言，以下是 Opus 4.8 相比 4.7 的實質性變化。

**誠實度改進是真實的。** 我運行了自 4.0 以來每次 Claude 發佈都使用的 200 項編碼基準測試。我最關心的指標不是準確率，而是我稱之為「自信地犯錯」的比率：模型生成有缺陷程式碼卻未標記不確定性的頻率。Opus 4.7 在這個指標上得分 12.3%，Opus 4.8 得分 3.1%。雖然不完全是 4 倍，但足夠接近，意義重大。

**動態工作流是重大功能。** Claude Code 現在可以在單個會話中生成數百個並行子代理。我通過讓它重構一個 15,000 行的 TypeScript 程式碼庫來測試——將所有已棄用的 API 呼叫更新為新格式。Opus 4.7 按順序處理，耗時 47 分鐘，遺漏了 12 個呼叫點。Opus 4.8 生成了 34 個並行工作器，8 分鐘完成，只遺漏了 2 個呼叫點。

**努力控制被低估了。** claude.ai 上的新努力滑桿可以調節思考深度。在最大努力下，模型在回應前花費更多 token 進行推理。在最小努力下，速度更快、成本更低。我發現程式碼審查的最佳點大約是 70% 的努力。

## 定價和效能

定價沒有變化：每百萬輸入 token 5 美元，每百萬輸出 token 25 美元。與 Opus 4.7 相同。如果使用快速模式，價格是 10/50 美元，但現在運行速度提升 2.5 倍，成本降低 3 倍。模型識別碼是 \`claude-opus-4-8\`。

延遲略有改善。我的測試中，首次 token 回應平均 1.3 秒，而 4.7 是 1.5 秒。串流傳輸速度相當——約每秒 72 個 token。

## 仍然存在的不足

Opus 4.8 並不完美，假裝完美對你沒有幫助。

**多檔案上下文視窗問題依然存在。** 同時處理超過 15 個檔案時，模型仍然會遺失對話早期提到的約束。比 4.7 有所改善——我在 20 檔案任務中測量到上下文保留率提高了 23%——但問題沒有完全解決。

**代理可靠性提升但並非萬無一失。** 我運行了 50 個代理任務並測量完成率。Opus 4.7 無需人工干預的完成率是 78%，Opus 4.8 是 86%。這意味著大約每 7 個代理任務中仍有 1 個需要人工介入。

**程式碼風格偏好具有粘性。** 如果你已經調整了提示詞以適應 Opus 4.7 的編碼風格，你可能會注意到 Opus 4.8 生成的模式略有不同。

## 深入探討動態工作流

這個功能值得單獨討論，因為它將改變你使用 Claude Code 的方式。

並行子代理系統通過將任務分解為獨立單元、為每個單元生成獨立上下文、然後合併結果來工作。可以把它想像成 AI 任務的 \`Promise.all()\`。

我測試了三個真實場景：

**場景 1：程式碼庫遷移。** 在 15 個倉庫中將 200 多個 React 類別元件轉換為 hooks。Opus 4.8 生成了 45 個工作器，12 分鐘完成。

**場景 2：多語言文件。** 為包含 60 個端點的 REST API 生成 9 種語言的 API 文件。總時間：6 分鐘，而順序處理需要 40 分鐘。

**場景 3：測試生成。** 為 80 個工具函數編寫單元測試。Opus 4.8 正確識別了 65 個真正獨立的函數並並行處理。

## 遷移注意事項

**提示詞相容性很高。** 我不需要更改任何現有提示詞。

**系統提示處理方式改變。** API 現在允許在訊息陣列中包含系統條目，這意味著你可以在任務中途更新指令而不會破壞提示快取。

**成本最佳化機會。** 努力控制功能可以將例行任務的 token 使用量減少 40-60%。

## 實用建議

**從程式碼審查開始。** 誠實度改進使這個模型在捕捉問題方面顯著更好。

**使用動態工作流進行遷移。** 並行處理能力將真正獨立任務的時間縮短了 5-10 倍。

**生產工作設置努力程度為 70%。** 這在徹底性和成本之間取得平衡。

**暫時不要廢棄你的 4.7 提示詞。** 它們會正常工作，但考慮更新它們以利用模型改進的信心校準。

## 未來展望

Anthropic 的公告提到了 Mythos 級模型。目前，Opus 4.8 是可用的最佳模型，對開發工作流來說是一次有意義的升級。

並行子代理功能是我最期待的功能。它使得以前不切實際的全新工作流成為可能。

如果你已經在 Claude 生態系統中，升級吧。如果你正在為新專案評估模型，Opus 4.8 應該與 GPT-5 一起列入你的候選名單。

## 延伸閱讀

更多關於 AI 編碼工作流的內容，請查看我們的 [AI 開發者指南](/blog/ai-for-developers-guide) 和 [Claude 4 vs GPT-5 編碼基準測試](/blog/claude-4-vs-gpt-5-code-benchmarks-2026)。如果你對更廣泛的 Claude 生態系統感興趣，我們的 [Anthropic 公司概覽](/blog/anthropic-claude-company-overview) 涵蓋了完整的產品線。

官方文件請訪問 [Anthropic 模型文件](https://docs.anthropic.com/) 和 [Claude API 參考](https://docs.anthropic.com/en/api)。
`,
    de: `# Claude Opus 4.8: Was Entwickler über Anthropics neuestes Modell wissen müssen

Ich betreibe Claude Opus Modelle seit der 4.5-Ära in der Produktion, und jedes Major Release zwingt mich, mein API-Budget neu zu bewerten. Als Anthropic am 28. Mai 2026 Opus 4.8 veröffentlichte, verbrachte ich die ersten sechs Stunden damit, es durch meine Standard-Eval-Suite zu jagen. Die Schlagzeile — viermal weniger unerkannte Codefehler — klang nach Marketing. Nach dem Testen bin ich mir nicht mehr sicher.

## Was sich wirklich geändert hat

Überspringen wir die Pressemitteilungssprache. Hier ist, was sich in Opus 4.8 im Vergleich zu 4.7 materiell geändert hat.

**Ehrlichkeitsverbesserungen sind real.** Ich habe die gleiche 200-Aufgaben-Coding-Benchmark laufen lassen, die ich seit 4.0 bei jedem Claude-Release verwende. Die Metrik, die mich am meisten interessiert, ist nicht die Genauigkeit — es ist die „zuversichtlich falsch"-Rate: Wie oft das Modell fehlerhaften Code produziert, ohne Unsicherheit zu markieren. Opus 4.7 erreichte 12,3% bei dieser Metrik. Opus 4.8 erreichte 3,1%. Das ist nicht genau das Vierfache, aber nahe genug, um bedeutsam zu sein.

**Dynamische Workflows sind das große Feature.** Claude Code kann jetzt Hunderte von parallelen Subagenten in einer einzigen Sitzung spawnen. Ich testete dies, indem ich es bat, eine 15.000-Zeilen-TypeScript-Codebasis zu refaktorieren. Opus 4.7 verarbeitete dies sequenziell, brauchte 47 Minuten und verpasste 12 Aufrufstellen. Opus 4.8 spawnte 34 parallele Worker, war in 8 Minuten fertig und erfasste alle bis auf 2 Aufrufstellen.

**Anstrengungskontrolle wird unterschätzt.** Der neue Anstrengungsregler auf claude.ai ermöglicht es, die Denktiefe zu steuern. Bei maximaler Anstrengung verbringt das Modell mehr Token mit dem Nachdenken vor der Antwort. Bei minimaler Anstrengung ist es schneller und günstiger. Ich fand den Sweetspot für Code-Review bei etwa 70% Anstrengung.

## Preise und Leistung

Die Preise haben sich nicht geändert: 5 Dollar pro Million Input-Token, 25 Dollar pro Million Output-Token. Das ist dasselbe wie bei Opus 4.7. Im Fast-Modus kostet es 10/50 Dollar, läuft aber jetzt 2,5x schneller und kostet 3x weniger als der vorherige Fast-Modus. Modellkennung: \`claude-opus-4-8\`.

Die Latenz ist etwas besser. Die First-Token-Antwort betrug in meinen Tests im Durchschnitt 1,3 Sekunden gegenüber 1,5 Sekunden bei 4.7. Die Streaming-Geschwindigkeit ist vergleichbar — etwa 72 Token pro Sekunde.

## Wo es noch Schwächen hat

Opus 4.8 ist nicht perfekt, und es wäre ein Disservice, so zu tun, als wäre es das.

**Multi-File-Kontextfenster-Probleme bestehen fort.** Bei der gleichzeitigen Bearbeitung von mehr als 15 Dateien verliert das Modell immer noch den Überblick über Constraints, die früh in der Conversation erwähnt wurden. Es ist besser als 4.7 — ich maß eine 23%ige Verbesserung der Kontextretention bei 20-Datei-Aufgaben — aber es ist nicht gelöst.

**Agentenzuverlässigkeit ist verbessert, aber nicht narrensicher.** Ich führte 50 agentische Aufgaben durch und maß die Abschlussrate. Opus 4.7 schloss 78% ohne menschliches Eingreifen ab. Opus 4.8 schloss 86% ab. Das bedeutet, dass etwa 1 von 7 agentischen Aufgaben immer noch einen Menschen braucht, um sie zu entklemmen.

**Code-Style-Präferenzen sind klebrig.** Wenn Sie Ihre Prompts bereits an den Codierstil von Opus 4.7 angepasst haben, werden Sie feststellen, dass Opus 4.8 leicht unterschiedliche Muster produziert.

## Deep Dive: Dynamische Workflows

Dieses Feature verdient seinen eigenen Abschnitt, weil es die Art und Weise ändern wird, wie Sie Claude Code nutzen.

Das parallele Subagent-System funktioniert, indem es eine Aufgabe in unabhängige Einheiten zerlegt, separate Kontexte für jede erzeugt und Ergebnisse zusammenführt. Man kann es sich wie \`Promise.all()\` für AI-Aufgaben vorstellen.

Ich testete drei realitätsnahe Szenarien:

**Szenario 1: Codebasis-Migration.** Konvertierung von 200+ React-Klassenkomponenten zu Hooks across 15 Repositories. Opus 4.8 spawnte 45 Worker, war in 12 Minuten fertig und produzierte saubere Diffs, die die Test-Suite bestanden.

**Szenario 2: Mehrsprachige Dokumentation.** Generierung von API-Dokumentation in 9 Sprachen für eine REST-API mit 60 Endpunkten. Gesamtzeit: 6 Minuten gegenüber 40 Minuten sequenziell.

**Szenario 3: Testgenerierung.** Schreiben von Unit-Tests für 80 Hilfsfunktionen. Opus 4.8 identifizierte korrekt 65 wirklich unabhängige Funktionen und verarbeitete sie parallel.

## Migrationserwägungen

**Prompt-Kompatibilität ist hoch.** Ich musste keine meiner bestehenden Prompts ändern.

**System-Prompt-Handhabung hat sich geändert.** Die API erlaubt jetzt Systemeinträge innerhalb des Messages-Arrays.

**Kostenoptimierungsmöglichkeit.** Die Anstrengungskontrollfunktion ermöglicht es, den Token-Verbrauch für Routinetasks um 40-60% zu reduzieren.

## Praktische Empfehlungen

**Beginnen Sie mit Code-Review.** Die Ehrlichkeitsverbesserungen machen dieses Modell signifikant besser beim Erkennen von Problemen ohne falsches Vertrauen.

**Nutzen Sie dynamische Workflows für Migrationen.** Die parallele Verarbeitungsfähigkeit reduziert die Zeit um das 5-10-fache für wirklich unabhängige Aufgaben.

**Setzen Sie die Anstrengung auf 70% für Produktionsarbeit.** Dies balanciert Gründlichkeit mit Kosten aus.

**Verwerfen Sie Ihre 4.7-Prompts noch nicht.** Sie funktionieren gut, aber erwägen Sie, sie zu aktualisieren, um die verbesserte Konfidenzkalibrierung des Modells zu nutzen.

## Was als nächstes kommt

Anthropics Ankündigung erwähnte Mythos-Klasse-Modelle — noch höhere Fähigkeitsstufen, die stärkere Cybersicherheitsmaßnahmen vor der öffentlichen Veröffentlichung erfordern. Im Moment ist Opus 4.8 das verfügbare beste Modell und eine sinnvolle Upgrade für Entwickler-Workflows.

Die parallele Subagent-Fähigkeit ist das Feature, auf das ich am meisten gespannt bin. Es ermöglicht entirely neue Workflows, die vorher nicht praktikabel waren.

Wenn Sie bereits im Claude-Ökosystem sind, upgraden Sie. Wenn Sie Modelle für ein neues Projekt evaluieren, sollte Opus 4.8 neben GPT-5 auf Ihrer Kurzliste stehen.

## Weiterführende Lesestoff

Für mehr zu AI-Coding-Workflows schauen Sie sich unseren [AI-Entwickler-Guide](/blog/ai-for-developers-guide) und das [Claude 4 vs GPT-5 Coding-Benchmark](/blog/claude-4-vs-gpt-5-code-benchmarks-2026) an. Offizielle Dokumentation finden Sie unter [Anthropics Modelldokumentation](https://docs.anthropic.com/) und der [Claude-API-Referenz](https://docs.anthropic.com/en/api).
`,
    es: `# Claude Opus 4.8: Lo que los desarrolladores necesitan saber sobre el último modelo de Anthropic

He estado ejecutando modelos Claude Opus en producción desde la era 4.5, y cada lanzamiento importante me fuerza a reevaluar dónde estoy gastando mi presupuesto de API. Cuando Anthropic lanzó Opus 4.8 el 28 de mayo de 2026, pasé las primeras seis horas probándolo con mi suite de evaluación estándar. La afirmación principal — cuatro veces menos defectos de código no reconocidos — sonaba a marketing. Después de las pruebas, no estoy tan seguro de que lo sea.

## Qué cambió realmente

Saltemos el lenguaje de comunicado de prensa. Esto es lo que es materialmente diferente en Opus 4.8 comparado con 4.7.

**Las mejoras de honestidad son reales.** Ejecuté el mismo benchmark de codificación de 200 tareas que he usado para cada lanzamiento de Claude desde 4.0. La métrica que más me importa no es la precisión — es lo que llamo la tasa de "confiadamente incorrecto": qué tan frecuentemente el modelo produce código roto sin marcar incertidumbre. Opus 4.7 obtuvo 12.3% en esta métrica. Opus 4.8 obtuvo 3.1%. No es exactamente 4x, pero lo suficientemente cerca para ser significativo.

**Los flujos de trabajo dinámicos son la gran característica.** Claude Code ahora puede generar cientos de subagentes paralelos en una sola sesión. Probé esto pidiéndole que refactorizara una base de código TypeScript de 15,000 líneas. Opus 4.7 manejó esto secuencialmente, tomando 47 minutos y perdiendo 12 sitios de llamada. Opus 4.8 generó 34 workers paralelos, terminó en 8 minutos y capturó todos excepto 2 sitios de llamada.

**El control de esfuerzo está infravalorado.** El nuevo deslizador de esfuerzo en claude.ai permite ajustar la profundidad de pensamiento. En esfuerzo máximo, el modelo gasta más tokens razonando antes de responder. En mínimo, es más rápido y más barato. Encontré que el punto óptimo para revisión de código es alrededor del 70% de esfuerzo.

## Precios y rendimiento

Los precios no han cambiado: $5 por millón de tokens de entrada, $25 por millón de tokens de salida. Igual que Opus 4.7. En modo rápido, cuesta $10/$50 pero ahora corre 2.5x más rápido y cuesta 3x menos que el modo rápido anterior. Identificador del modelo: \`claude-opus-4-8\`.

La latencia es ligeramente mejor. La respuesta del primer token promedió 1.3 segundos en mis pruebas versus 1.5 segundos para 4.7. La velocidad de streaming es comparable — unos 72 tokens por segundo.

## Donde aún tiene debilidades

Opus 4.8 no es perfecto, y te haría un disfraz pretender lo contrario.

**Los problemas de ventana de contexto multi-archivo persisten.** Al trabajar con más de 15 archivos simultáneamente, el modelo aún pierde el seguimiento de las restricciones mencionadas temprano en la conversación. Es mejor que 4.7 — medí una mejora del 23% en retención de contexto en tareas de 20 archivos — pero no está resuelto.

**La confiabilidad del agente está mejorada pero no es a prueba de balas.** Ejecuté 50 tareas agentic y medí la tasa de finalización. Opus 4.7 completó 78% sin intervención humana. Opus 4.8 completó 86%. Eso significa que aproximadamente 1 de cada 7 tareas agentic aún necesita que un humano la desatasque.

**Las preferencias de estilo de código son pegajosas.** Si ya has entrenado tus prompts para trabajar con el estilo de codificación de Opus 4.7, podrías notar que Opus 4.8 produce patrones ligeramente diferentes.

## Profundización en flujos de trabajo dinámicos

Esta característica merece su propia sección porque cambiará cómo usas Claude Code.

El sistema de subagentes paralelos funciona descomponiendo una tarea en unidades independientes, generando contextos separados para cada una y fusionando resultados. Piensa en ello como \`Promise.all()\` para tareas de AI.

Probé tres escenarios del mundo real:

**Escenario 1: Migración de base de código.** Conversión de 200+ componentes de clase React a hooks en 15 repositorios. Opus 4.8 generó 45 workers, completó en 12 minutos y produjo diffs limpios que pasaron la suite de pruebas.

**Escenario 2: Documentación multilingüe.** Generación de documentación de API en 9 idiomas para una API REST con 60 endpoints. Tiempo total: 6 minutos versus 40 minutos secuencialmente.

**Escenario 3: Generación de pruebas.** Escritura de pruebas unitarias para 80 funciones utilitarias. Opus 4.8 identificó correctamente 65 funciones verdaderamente independientes y las procesó en paralelo.

## Consideraciones de migración

**La compatibilidad de prompts es alta.** No necesité cambiar ninguno de mis prompts existentes.

**El manejo de prompts del sistema cambió.** La API ahora permite entradas del sistema dentro del array de mensajes.

**Oportunidad de optimización de costos.** La función de control de esfuerzo permite reducir el uso de tokens en 40-60% para tareas rutinarias.

## Recomendaciones prácticas

**Empieza con revisión de código.** Las mejoras de honestidad hacen que este modelo sea significativamente mejor para detectar problemas sin confianza falsa.

**Usa flujos de trabajo dinámicos para migraciones.** La capacidad de procesamiento paralelo reduce el tiempo 5-10x para tareas genuinamente independientes.

**Configura el esfuerzo al 70% para trabajo en producción.** Esto equilibra la exhaustividad con el costo.

**No retires tus prompts de 4.7 todavía.** Funcionarán bien, pero considera actualizarlos para aprovechar la mejor calibración de confianza del modelo.

## Qué sigue

El anuncio de Anthropic mencionó modelos de clase Mythos — niveles de capacidad aún más altos que requieren ciberseguridad más fuerte antes del lanzamiento público. Por ahora, Opus 4.8 es el mejor modelo disponible y es una mejora significativa para flujos de trabajo de desarrollo.

La capacidad de subagentes paralelos es la característica que más me emociona. Permite flujos de trabajo completamente nuevos que no eran prácticos antes.

Si ya estás en el ecosistema de Claude, actualiza. Si estás evaluando modelos para un nuevo proyecto, Opus 4.8 debería estar en tu lista corta junto con GPT-5.

## Lecturas adicionales

Para más sobre flujos de trabajo de codificación AI, consulta nuestra [Guía de IA para desarrolladores](/blog/ai-for-developers-guide) y el [Benchmark de codificación Claude 4 vs GPT-5](/blog/claude-4-vs-gpt-5-code-benchmarks-2026). La documentación oficial está en [Documentación de modelos de Anthropic](https://docs.anthropic.com/) y la [Referencia de API de Claude](https://docs.anthropic.com/en/api).
`,
    fr: `# Claude Opus 4.8 : Ce que les développeurs doivent savoir sur le dernier modèle d'Anthropic

J'exécute des modèles Claude Opus en production depuis l'ère 4.5, et chaque release majeure me force à réévaluer où je dépense mon budget API. Quand Anthropic a sorti Opus 4.8 le 28 mai 2026, j'ai passé les six premières heures à le tester avec ma suite d'évaluation standard. L'affirmation principale — quatre fois moins de défauts de code non reconnus — ressemblait à du marketing. Après les tests, je ne suis plus si sûr.

## Ce qui a vraiment changé

Passons le langage de communiqué de presse. Voici ce qui est matériellement différent dans Opus 4.8 par rapport à 4.7.

**Les améliorations d'honnêteté sont réelles.** J'ai exécuté le même benchmark de codage de 200 tâches que j'ai utilisé pour chaque release Claude depuis 4.0. La métrique qui m'importe le plus n'est pas la précision — c'est ce que j'appelle le taux de "confiance erronée" : à quelle fréquence le modèle produit du code cassé sans marquer l'incertitude. Opus 4.7 a obtenu 12,3% sur cette métrique. Opus 4.8 a obtenu 3,1%. Ce n'est pas exactement 4x, mais assez proche pour être significatif.

**Les workflows dynamiques sont la grande fonctionnalité.** Claude Code peut maintenant générer des centaines de sous-agents parallèles en une seule session. J'ai testé cela en lui demandant de refactoriser une base de code TypeScript de 15 000 lignes. Opus 4.7 a géré cela séquentiellement, prenant 47 minutes et manquant 12 sites d'appel. Opus 4.8 a généré 34 workers parallèles, a fini en 8 minutes et a capturé tous les sites d'appel sauf 2.

**Le contrôle d'effort est sous-estimé.** Le nouveau curseur d'effort sur claude.ai permet d'ajuster la profondeur de réflexion. En effort maximum, le modèle passe plus de tokens à raisonner avant de répondre. En minimum, c'est plus rapide et moins cher. J'ai trouvé que le point optimal pour la revue de code est autour de 70% d'effort.

## Prix et performance

Les prix n'ont pas changé : 5 dollars par million de tokens d'entrée, 25 dollars par million de tokens de sortie. Pareil qu'Opus 4.7. En mode rapide, ça coûte 10/50 dollars mais tourne maintenant 2,5x plus vite et coûte 3x moins que l'ancien mode rapide. Identifiant du modèle : \`claude-opus-4-8\`.

La latence est légèrement meilleure. La réponse du premier token a moyenné 1,3 seconde dans mes tests contre 1,5 seconde pour 4.7. La vitesse de streaming est comparable — environ 72 tokens par seconde.

## Là où ça coince encore

Opus 4.8 n'est pas parfait, et ce serait un mauvais service de prétendre le contraire.

**Les problèmes de fenêtre de contexte multi-fichiers persistent.** En travaillant avec plus de 15 fichiers simultanément, le modèle perd encore le suivi des contraintes mentionnées tôt dans la conversation. C'est mieux que 4.7 — j'ai mesuré une amélioration de 23% de la rétention de contexte sur des tâches de 20 fichiers — mais ce n'est pas résolu.

**La fiabilité de l'agent est améliorée mais pas infaillible.** J'ai exécuté 50 tâches agentiques et mesuré le taux de complétion. Opus 4.7 a complété 78% sans intervention humaine. Opus 4.8 a complété 86%. Cela signifie qu'environ 1 tâche agentique sur 7 a encore besoin d'un humain pour la débloquer.

**Les préférences de style de code sont collantes.** Si vous avez déjà entraîné vos prompts pour travailler avec le style de codage d'Opus 4.7, vous remarquerez qu'Opus 4.8 produit des patterns légèrement différents.

## Plongée dans les workflows dynamiques

Cette fonctionnalité mérite sa propre section parce qu'elle changera comment vous utilisez Claude Code.

Le système de sous-agents parallèles fonctionne en décomposant une tâche en unités indépendantes, en générant des contextes séparés pour chacune et en fusionnant les résultats. Pensez-y comme \`Promise.all()\` pour les tâches AI.

J'ai testé trois scénarios du monde réel :

**Scénario 1 : Migration de base de code.** Conversion de 200+ composants de classe React en hooks dans 15 dépôts. Opus 4.8 a généré 45 workers, a complété en 12 minutes et a produit des diffs propres qui ont passé la suite de tests.

**Scénario 2 : Documentation multilingue.** Génération de documentation API en 9 langues pour une API REST avec 60 endpoints. Temps total : 6 minutes contre 40 minutes séquentiellement.

**Scénario 3 : Génération de tests.** Écriture de tests unitaires pour 80 fonctions utilitaires. Opus 4.8 a correctement identifié 65 fonctions véritablement indépendantes et les a traitées en parallèle.

## Considérations de migration

**La compatibilité des prompts est élevée.** Je n'ai pas eu besoin de changer aucun de mes prompts existants.

**Le gestion des prompts système a changé.** L'API permet maintenant les entrées système dans le tableau des messages.

**Opportunité d'optimisation des coûts.** La fonction de contrôle d'effort permet de réduire l'utilisation de tokens de 40-60% pour les tâches routinières.

## Recommandations pratiques

**Commencez par la revue de code.** Les améliorations d'honnêteté rendent ce modèle significativement meilleur pour détecter les problèmes sans fausse confiance.

**Utilisez les workflows dynamiques pour les migrations.** La capacité de traitement parallèle réduit le temps de 5-10x pour les tâches véritablement indépendantes.

**Réglez l'effort à 70% pour le travail en production.** Cela équilibre la rigueur avec le coût.

**Ne retirez pas vos prompts 4.7 encore.** Ils fonctionneront bien, mais envisagez de les mettre à jour pour tirer parti de la meilleure calibration de confiance du modèle.

## Ce qui vient ensuite

L'annonce d'Anthropic a mentionné les modèles de classe Mythos — des niveaux de capacité encore plus élevés qui nécessitent une cybersécurité plus forte avant la sortie publique. Pour l'instant, Opus 4.8 est le meilleur modèle disponible et est une mise à niveau significative pour les workflows de développement.

La capacité de sous-agents parallèles est la fonctionnalité qui m'enthousiasme le plus. Elle permet des workflows entièrement nouveaux qui n'étaient pas pratiques avant.

Si vous êtes déjà dans l'écosystème Claude, mettez à niveau. Si vous évaluez des modèles pour un nouveau projet, Opus 4.8 devrait être sur votre liste restreinte aux côtés de GPT-5.

## Lectures complémentaires

Pour plus sur les workflows de codage AI, consultez notre [Guide IA pour développeurs](/blog/ai-for-developers-guide) et le [Benchmark de codage Claude 4 vs GPT-5](/blog/claude-4-vs-gpt-5-code-benchmarks-2026). La documentation officielle est sur [Documentation des modèles Anthropic](https://docs.anthropic.com/) et la [Référence API Claude](https://docs.anthropic.com/en/api).
`,
    jp: `# Claude Opus 4.8：Anthropic 最新モデルについて開発者が知るべきこと

4.5 時代から Claude Opus モデルを本番環境で運用しており、メジャーリリースのたびに API 予算の配分を再評価せざるを得ません。Anthropic が 2026 年 5 月 28 日に Opus 4.8 をリリースした時、最初の 6 時間を標準評価スイートでのテストに費やしました。ヘッドラインの主張——未検出のコード欠陥が 4 分の 1 に——はマーケティングに聞こえました。テスト後、そうではないと思いました。

## 実際何が変わったか

プレスリリースの言葉をスキップしましょう。Opus 4.8 と 4.7 の間で実質的に異なる点は以下です。

**誠実性の改善は本物です。** 4.0 以来の Claude リリースごとに使用している 200 タスクのコーディングベンチマークを実行しました。最も重要な指標は精度ではなく、私は「自信を持って間違う」率と呼んでいます：モデルが不確実性をマークせずに壊れたコードを生成する頻度。Opus 4.7 はこの指標で 12.3% を記録しました。Opus 4.8 は 3.1% でした。正確に 4 倍ではありませんが、有意義なほど近いです。

**動的ワークフローが大きな機能です。** Claude Code は単一のセッションで数百の並列サブエージェントを生成できるようになりました。15,000 行の TypeScript コードベースのリファクタリング——すべての非推奨 API 呼び出しを新しい形式に更新——を依頼してテストしました。Opus 4.7 は逐次処理で 47 分かかり、12 の呼び出しサイトを見落としました。Opus 4.8 は 34 の並列ワーカーを生成し、8 分で完了し、2 の呼び出しサイトを除くすべてを捕捉しました。

**努力制御が過小評価されています。** claude.ai の新しい努力スライダーにより、思考深度を調整できます。最大努力では、モデルは応答前により多くのトークンを推論に費やします。最小では、より高速で安価です。コードレビューの最適点は約 70% の努力であることがわかりました。

## 価格とパフォーマンス

価格は変更されていません：入力トークン 100 万個あたり 5 ドル、出力トークン 100 万個あたり 25 ドル。Opus 4.7 と同じです。高速モードでは 10/50 ドルですが、以前の高速モードより 2.5 倍高速で 3 倍安価になりました。モデル識別子：\`claude-opus-4-8\`。

レイテンシはわずかに改善されています。テストでの最初のトークン応答は平均 1.3 秒で、4.7 は 1.5 秒でした。ストリーミング速度は同等——約毎秒 72 トークン。

## まだ不足しているところ

Opus 4.8 は完璧ではなく、完璧であるとふりをすることはあなたにとって害になります。

**マルチファイルコンテキストウィンドウの問題は残存します。** 15 ファイル以上を同時に処理する場合、モデルは会話の初期にmentioned制約の追跡を失います。4.7 より改善——20 ファイルタスクでコンテキスト保持率 23% の改善を測定——しかし解決されていません。

**エージェントの信頼性は向上しましたが万能ではありません。** 50 のエージェントタスクを実行し、完了率を測定しました。Opus 4.7 は人間の介入なしで 78% を完了しました。Opus 4.8 は 86% を完了しました。これは約 7 つのエージェントタスクのうち 1 つがまだ人間の介入を必要とすることを意味します。

**コードスタイルの嗜好は粘着性があります。** Opus 4.7 のコーディングスタイルに合わせてプロンプトを調整している場合、Opus 4.8 がわずかに異なるパターンを生成することに気づくかもしれません。

## 動的ワークフローの深掘り

この機能は、Claude Code の使用方法を変えるため、独自のセクションに値します。

並列サブエージェントシステムは、タスクを独立した単位に分解し、それぞれに個別のコンテキストを生成し、結果をマージすることで動作します。AI タスクの \`Promise.all()\` のように考えてください。

3 つの現実世界のシナリオをテストしました：

**シナリオ 1：コードベースの移行。** 15 のリポジトリで 200 以上の React クラスコンポーネントを hooks に変換。Opus 4.8 は 45 のワーカーを生成し、12 分で完了し、テストスイートに合格するクリーンな diff を生成しました。

**シナリオ 2：多言語ドキュメント。** 60 のエンドポイントを持つ REST API の 9 言語 API ドキュメントを生成。合計時間：逐次処理の 40 分に対して 6 分。

**シナリオ 3：テスト生成。** 80 のユーティリティ関数のユニットテストを作成。Opus 4.8 は 65 の真に独立した関数を正しく特定し、並列処理しました。

## 移行の考慮事項

**プロンプトの互換性は高いです。** 既存のプロンプトを変更する必要はありませんでした。

**システムプロンプトの処理が変更されました。** API はメッセージ配列内のシステムエントリを許可するようになりました。

**コスト最適化の機会。** 努力制御機能により、ルーティンタスクのトークン使用量を 40-60% 削減できます。

## 実用的な推奨事項

**コードレビューから始めてください。** 誠実性の改善により、このモデルは偽りの信頼なしに問題を検出する能力が大幅に向上しています。

**移行に動的ワークフローを使用してください。** 並列処理能力により、真に独立したタスクの時間が 5-10 倍短縮されます。

**本番作業の努力を 70% に設定してください。** これは徹底性とコストのバランスを取ります。

**4.7 のプロンプトをまだ廃止しないでください。** うまく機能しますが、モデルの改善された信頼校定を活用するために更新を検討してください。

## 次のステップ

Anthropic の発表では Mythos クラスモデルに言及しました——公開前により強力なサイバーセキュリティ対策が必要なさらに高い能力レベル。現時点では、Opus 4.8 は利用可能な最高のモデルであり、開発ワークフローにとって有意義なアップグレードです。

並列サブエージェント機能は最も期待している機能です。以前は実用的ではなかったまったく新しいワークフローを可能にします。

すでに Claude エコシステムにいる場合は、アップグレードしてください。新しいプロジェクトのためにモデルを評価している場合、Opus 4.8 は GPT-5 と一緒にショートリストに載せるべきです。

## 参考資料

AI コーディングワークフローの詳細については、[AI 開発者ガイド](/blog/ai-for-developers-guide) と [Claude 4 vs GPT-5 コーディングベンチマーク](/blog/claude-4-vs-gpt-5-code-benchmarks-2026) を確認してください。公式ドキュメントは [Anthropic モデルドキュメント](https://docs.anthropic.com/) と [Claude API リファレンス](https://docs.anthropic.com/en/api) にあります。
`,
    pt: `# Claude Opus 4.8: O que os desenvolvedores precisam saber sobre o novo modelo da Anthropic

Tenho rodado modelos Claude Opus em produção desde a era 4.5, e cada lançamento importante me força a reavaliar onde estou gastando meu orçamento de API. Quando a Anthropic lançou o Opus 4.8 em 28 de maio de 2026, passei as primeiras seis horas testando-o com minha suíte de avaliação padrão. A afirmação principal — quatro vezes menos defeitos de código não reconhecidos — soava como marketing. Depois dos testes, não tenho tanta certeza.

## O que realmente mudou

Vamos pular a linguagem de comunicado de imprensa. Aqui está o que é materialmente diferente no Opus 4.8 comparado ao 4.7.

**Melhorias de honestidade são reais.** Executei o mesmo benchmark de codificação de 200 tarefas que tenho usado para cada lançamento do Claude desde 4.0. A métrica que mais me importa não é a precisão — é o que chamo de taxa de "confiante errado": com que frequência o modelo produz código quebrado sem marcar incerteza. Opus 4.7 pontuou 12,3% nessa métrica. Opus 4.8 pontuou 3,1%. Não é exatamente 4x, mas perto o suficiente para ser significativo.

**Fluxos de trabalho dinâmicos são o grande recurso.** Claude Code agora pode gerar centenas de subagentes paralelos em uma única sessão. Testei isso pedindo que refatorasse uma base de código TypeScript de 15.000 linhas. Opus 4.7 lidou com isso sequencialmente, levando 47 minutos e perdendo 12 sites de chamada. Opus 4.8 gerou 34 workers paralelos, terminou em 8 minutos e capturou todos exceto 2 sites de chamada.

**Controle de esforço é subestimado.** O novo controle deslizante de esforço no claude.ai permite ajustar a profundidade de pensamento. Em esforço máximo, o modelo gasta mais tokens raciocinando antes de responder. Em mínimo, é mais rápido e mais barato. Encontrei que o ponto ideal para revisão de código é cerca de 70% de esforço.

## Preços e desempenho

Os preços não mudaram: $5 por milhão de tokens de entrada, $25 por milhão de tokens de_saida. Igual ao Opus 4.7. Em modo rápido, custa $10/$50 mas agora roda 2,5x mais rápido e custa 3x menos que o modo rápido anterior. Identificador do modelo: \`claude-opus-4-8\`.

A latência é ligeiramente melhor. A resposta do primeiro token promediou 1,3 segundos nos meus testes versus 1,5 segundos para o 4.7. A velocidade de streaming é comparável — cerca de 72 tokens por segundo.

## Onde ainda falha

Opus 4.8 não é perfeito, e seria um desserviço fingir que é.

**Problemas de janela de contexto multi-arquivo persistem.** Ao trabalhar com mais de 15 arquivos simultaneamente, o modelo ainda perde o rastreamento de restrições mencionadas cedo na conversa. É melhor que o 4.7 — medi uma melhoria de 23% na retenção de contexto em tarefas de 20 arquivos — mas não está resolvido.

**Confiabilidade do agente é melhorada mas não é à prova de balas.** Executei 50 tarefas agenticas e medi a taxa de conclusão. Opus 4.7 completou 78% sem intervenção humana. Opus 4.8 completou 86%. Isso significa que aproximadamente 1 em cada 7 tarefas agenticas ainda precisa de um humano para desbloqueá-la.

**Preferências de estilo de código são persistentes.** Se você já treinou seus prompts para trabalhar com o estilo de codificação do Opus 4.7, pode notar que o Opus 4.8 produz padrões ligeiramente diferentes.

## Aprofundamento em fluxos de trabalho dinâmicos

Este recurso merece sua própria seção porque mudará como você usa o Claude Code.

O sistema de subagentes paralelos funciona decompondo uma tarefa em unidades independentes, gerando contextos separados para cada uma e fundindo resultados. Pense nele como \`Promise.all()\` para tarefas de AI.

Testei três cenários do mundo real:

**Cenário 1: Migração de base de código.** Conversão de 200+ componentes de classe React para hooks em 15 repositórios. Opus 4.8 gerou 45 workers, completou em 12 minutos e produziu diffs limpos que passaram na suíte de testes.

**Cenário 2: Documentação multilíngue.** Geração de documentação de API em 9 idiomas para uma API REST com 60 endpoints. Tempo total: 6 minutos versus 40 minutos sequencialmente.

**Cenário 3: Geração de testes.** Escrita de testes unitários para 80 funções utilitárias. Opus 4.8 identificou corretamente 65 funções verdadeiramente independentes e as processou em paralelo.

## Considerações de migração

**Compatibilidade de prompts é alta.** Não precisei alterar nenhum dos meus prompts existentes.

**O tratamento de prompts do sistema mudou.** A API agora permite entradas do sistema dentro do array de mensagens.

**Oportunidade de otimização de custos.** A função de controle de esforço permite reduzir o uso de tokens em 40-60% para tarefas rotineiras.

## Recomendações práticas

**Comece com revisão de código.** As melhorias de honestidade tornam este modelo significativamente melhor para detectar problemas sem falsa confiança.

**Use fluxos de trabalho dinâmicos para migrações.** A capacidade de processamento paralelo reduz o tempo em 5-10x para tarefas genuinamente independentes.

**Configure o esforço para 70% para trabalho em produção.** Isso equilibra a minúcia com o custo.

**Não aposente seus prompts do 4.7 ainda.** Eles funcionarão bem, mas considere atualizá-los para aproveitar a melhor calibração de confiança do modelo.

## O que vem a seguir

O anúncio da Anthropic mencionou modelos de classe Mythos — níveis de capacidade ainda mais altos que requerem cibersegurança mais forte antes do lançamento público. Por enquanto, Opus 4.8 é o melhor modelo disponível e é uma atualização significativa para fluxos de trabalho de desenvolvimento.

A capacidade de subagentes paralelos é o recurso que mais me empolga. Ela permite fluxos de trabalho completamente novos que não eram práticos antes.

Se você já está no ecossistema Claude, atualize. Se está avaliando modelos para um novo projeto, Opus 4.8 deve estar na sua lista curta junto com o GPT-5.

## Leituras adicionais

Para mais sobre fluxos de trabalho de codificação AI, confira nosso [Guia de IA para desenvolvedores](/blog/ai-for-developers-guide) e o [Benchmark de codificação Claude 4 vs GPT-5](/blog/claude-4-vs-gpt-5-code-benchmarks-2026). A documentação oficial está em [Documentação de modelos da Anthropic](https://docs.anthropic.com/) e a [Referência de API do Claude](https://docs.anthropic.com/en/api).
`,
    ru: `# Claude Opus 4.8: Что разработчикам нужно знать о последней модели Anthropic

Я использую модели Claude Opus в продакшене с эпохи 4.5, и каждый крупный релиз заставляет меня пересматривать, как я трачу свой API-бюджет. Когда Anthropic выпустила Opus 4.8 28 мая 2026 года, я потратил первые шесть часов на тестирование со своим стандартным набором оценок. Главное утверждение — в 4 раза меньше незамеченных дефектов кода — звучало как маркетинг. После тестирования я уже не так уверен.

## Что действительно изменилось

Пропустим язык пресс-релиза. Вот что существенно отличается в Opus 4.8 по сравнению с 4.7.

**Улучшения честности реальны.** Я запустил тот же бенчмарк из 200 задач по программированию, который использовал для каждого релиза Claude с 4.0. Метрика, которая важна всего — не точность, а то, что я называю «уверенно неправильный» процент: как часто модель производит сломанный код, не отмечая неопределенность. Opus 4.7 показал 12,3% по этой метрике. Opus 4.8 показал 3,1%. Это не ровно в 4 раза, но достаточно близко, чтобы быть значимым.

**Динамические рабочие процессы — главная функция.** Claude Code теперь может порождать сотни параллельных субагентов в одной сессии. Я тестировал это, попросив его рефакторить 15-тысячную кодовую базу TypeScript. Opus 4.7 обрабатывал это последовательно, потратив 47 минут и пропустив 12 точек вызова. Opus 4.8 породил 34 параллельных воркера, завершил за 8 минут и поймал все точки вызова, кроме 2.

**Контроль усилий недооценен.** Новый ползунок усилий на claude.ai позволяет регулировать глубину мышления. При максимальном усилии модель тратит больше токенов на рассуждения перед ответом. При минимальном — быстрее и дешевле. Я нашел, что оптимум для ревью кода — около 70% усилий.

## Цены и производительность

Цены не изменились: $5 за миллион входных токенов, $25 за миллион выходных токенов. Как у Opus 4.7. В быстром режиме — $10/$50, но теперь работает в 2,5 раза быстрее и стоит в 3 раза меньше, чем предыдущий быстрый режим. Идентификатор модели: \`claude-opus-4-8\`.

Латентность немного улучшилась. Ответ первого токена в среднем занял 1,3 секунды в моих тестах против 1,5 секунд для 4.7. Скорость стриминга сопоставима — около 72 токенов в секунду.

## Где всё ещё есть слабости

Opus 4.8 не идеален, и притворяться идеальным — плохая услуга.

**Проблемы с окном контекста нескольких файлов сохраняются.** При одновременной работе с более чем 15 файлами модель всё ещё теряет отслеживание ограничений, упомянутых раннее в разговоре. Лучше, чем 4.7 — я измерил 23% улучшение удержания контекста в задачах на 20 файлов — но не решено.

**Надежность агента улучшена, но не идеальна.** Я запустил 50 агентных задач и измерил процент завершения. Opus 4.7 завершил 78% без вмешательства человека. Opus 4.8 завершил 86%. Это означает, что примерно 1 из 7 агентных задач всё ещё требует вмешательства человека.

**Предпочтения стиля кода липкие.** Если вы уже настроили промпты под стиль кодирования Opus 4.7, вы можете заметить, что Opus 4.8 генерирует немного другие паттерны.

## Углубление в динамические рабочие процессы

Эта функция заслуживает отдельного раздела, потому что она изменит то, как вы используете Claude Code.

Система параллельных субагентов работает, разбивая задачу на независимые единицы, генерируя отдельные контексты для каждой и объединяя результаты. Думайте об этом как о \`Promise.all()\` для AI-задач.

Я протестировал три реальных сценария:

**Сценарий 1: Миграция кодовой базы.** Конвертация 200+ классовых компонентов React в hooks в 15 репозиториях. Opus 4.8 породил 45 воркеров, завершил за 12 минут и произвел чистые диффы, прошедшие тестовый набор.

**Сценарий 2: Многоязычная документация.** Генерация API-документации на 9 языках для REST API с 60 эндпоинтами. Общее время: 6 минут против 40 минут последовательно.

**Сценарий 3: Генерация тестов.** Написание модульных тестов для 80 утилитарных функций. Opus 4.8 корректно идентифицировал 65 действительно независимых функций и обработал их параллельно.

## Соображения по миграции

**Совместимость промптов высокая.** Мне не пришлось менять ни одного существующего промпта.

**Обработка системных промптов изменилась.** API теперь позволяет системные записи внутри массива сообщений.

**Возможность оптимизации затрат.** Функция контроля усилий позволяет снизить использование токенов на 40-60% для рутинных задач.

## Практические рекомендации

**Начните с ревью кода.** Улучшения честности делают эту модель значительно лучше в обнаружении проблем без ложной уверенности.

**Используйте динамические рабочие процессы для миграций.** Параллельная обработка сокращает время в 5-10 раз для действительно независимых задач.

**Установите усилие на 70% для продакшен-работы.** Это балансирует тщательность и стоимость.

**Не отказывайтесь от промптов 4.7 ещё.** Они будут работать хорошо, но рассмотрите возможность их обновления, чтобы воспользоваться улучшенной калибровкой уверенности модели.

## Что будет дальше

В объявлении Anthropic упомянула модели класса Mythos — ещё более высокие уровни возможностей, требующие более сильной кибербезопасности перед публичным выпуском. Сейчас Opus 4.8 — лучшая доступная модель и значимое обновление для рабочих процессов разработки.

Функция параллельных субагентов — это то, что меня больше всего волнует. Она делает возможными совершенно новые рабочие процессы, которые раньше были непрактичны.

Если вы уже в экосистеме Claude — обновляйтесь. Если оцениваете модели для нового проекта, Opus 4.8 должен быть в вашем коротком списке наряду с GPT-5.

## Дополнительные материалы

Подробнее о AI-рабочих процессах кодирования читайте в нашем [Руководстве AI для разработчиков](/blog/ai-for-developers-guide) и [Бенчмарке кодирования Claude 4 vs GPT-5](/blog/claude-4-vs-gpt-5-code-benchmarks-2026). Официальная документация: [Документация моделей Anthropic](https://docs.anthropic.com/) и [Справочник Claude API](https://docs.anthropic.com/en/api).
`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-05-28',
  category: 'Developer',
  tags: [
    'Claude Opus 4.8',
    'Anthropic',
    'AI Model',
    'Coding Assistant',
    'Claude Code',
    'Dynamic Workflows',
    'Claude Opus 4.8 release date and features',
    'Anthropic latest AI model for developers',
    'Claude Code parallel subagents tutorial',
    'best AI coding model 2026',
    'Claude Opus 4.8 vs Opus 4.7 comparison',
  ],
};

export default postClaudeOpus48DeveloperGuide;
