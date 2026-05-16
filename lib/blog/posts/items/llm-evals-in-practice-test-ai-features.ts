import { BlogPost } from '../../types';

const postLlmEvalsInPracticeTestAiFeatures: BlogPost = {
  id: '3406',
  slug: 'llm-evals-in-practice-test-ai-features',
  title: {
    en: 'LLM Evals in Practice: How to Test AI Features Before Users Do',
    cn: 'LLM 评测实战：如何在用户之前测试 AI 功能',
    tw: 'LLM 評測實戰：如何在使用者之前測試 AI 功能',
    de: 'LLM-Evals in der Praxis: KI-Features testen, bevor Nutzer es tun',
    es: 'Evals de LLM en la práctica: cómo probar funciones de IA antes que los usuarios',
    fr: 'Évals LLM en pratique : tester les fonctions IA avant les utilisateurs',
    jp: 'LLM評価の実践：ユーザーより先にAI機能をテストする方法',
    pt: 'Evals de LLM na prática: como testar recursos de IA antes dos usuários',
    ru: 'LLM evals на практике: как тестировать AI-функции до пользователей',
  },
  excerpt: {
    en: 'A practical LLM evals workflow for product teams: build golden datasets, compare prompts and models, add regression gates to CI/CD, use human review loops, and know when open-ended game-world evals are worth the extra effort.',
    cn: '一套面向产品团队的 LLM 评测工作流：构建黄金数据集、比较提示词和模型、把回归门禁接入 CI/CD、建立人工复审闭环，并判断何时需要开放式游戏世界评测。',
    tw: '一套面向產品團隊的 LLM 評測工作流：建立黃金資料集、比較提示詞和模型、把回歸閘門接入 CI/CD、建立人工複審閉環，並判斷何時需要開放式遊戲世界評測。',
    de: 'Ein praktischer LLM-Evals-Workflow für Produktteams: Golden Datasets, Prompt- und Modellvergleiche, Regression Gates in CI/CD, Human Review und der richtige Einsatz offener Game-World-Evals.',
    es: 'Un flujo práctico de evals de LLM para equipos de producto: datasets dorados, comparación de prompts y modelos, puertas de regresión en CI/CD, revisión humana y cuándo usar evals abiertas tipo juego.',
    fr: 'Un workflow pratique d’évals LLM pour les équipes produit : jeux de données dorés, comparaisons de prompts et modèles, gates de régression en CI/CD, revue humaine et évals ouvertes quand elles valent l’effort.',
    jp: 'プロダクトチーム向けの実践的なLLM評価ワークフロー。ゴールデンデータセット、プロンプトとモデル比較、CI/CDの回帰ゲート、人間レビュー、ゲーム世界型評価の使いどころを扱います。',
    pt: 'Um fluxo prático de evals de LLM para times de produto: datasets dourados, comparação de prompts e modelos, gates de regressão em CI/CD, revisão humana e quando usar evals abertas em mundos de jogo.',
    ru: 'Практический workflow LLM evals для продуктовых команд: golden dataset, сравнение промптов и моделей, regression gates в CI/CD, human review и понимание, когда нужны открытые игровые evals.',
  },
  content: {
    en: `# LLM Evals in Practice: How to Test AI Features Before Users Do

The first time an AI feature embarrasses you, it rarely looks like a benchmark failure. It looks like a support bot confidently refunding the wrong policy, a coding assistant changing a file it was told not to touch, or a sales copilot inventing a customer detail because the CRM field was empty. The demo looked fine. The prompt review looked fine. The model card looked impressive. Then a real user found the one input your team never tested.

That gap is what LLM evals are for. Not leaderboard chasing. Not a spreadsheet theater exercise where every new model gets a green cell. Practical LLM evals are the product team’s early warning system: they turn messy user expectations into repeatable tests, regression gates, and review loops before the feature reaches production.

If you are building AI features in 2026, evals should sit beside analytics, QA, and incident response. They are not only an ML concern. Developers need them before refactoring prompts. PMs need them before approving scope changes. Support and operations teams need them before trusting automation with customer-facing work.

## Why LLM evals are different from normal QA

Traditional software QA asks whether the system returned the expected output for a known input. LLM products are trickier because the correct answer may be a range of acceptable behaviors. A support assistant can phrase a reply in ten good ways. A code-review assistant can catch one severe bug and miss a stylistic nit. A research agent may be useful even when it stops and asks for missing context.

That does not mean evals should be vague. It means the rubric has to match the product risk. For a summarizer, you may grade factual consistency, completeness, tone, and refusal behavior. For an agent that can call tools, you need task success, tool selection, permission safety, recovery behavior, and whether the model stopped when it should have stopped. Our earlier post on [why AI agents need reliability more than raw capability](/blog/ai-agents-need-reliability-more-than-capability) makes the same operational point: users experience the model output and the controls around it as one product.

The first mistake teams make is evaluating only happy-path examples. The second mistake is treating an aggregate score as launch approval. A feature that passes 92 percent of a generic test set can still be unsafe if the failing 8 percent includes refunds, medical advice, legal commitments, account deletion, or customer data exposure. Practical LLM evals should make that risk visible.

## Build a golden dataset before you tune another prompt

A golden dataset is a curated set of realistic inputs with expected behavior, scoring notes, and metadata. It does not have to be large at first. A useful starting set might have 50 to 200 examples covering your most common user jobs, your most expensive failure modes, and a few deliberately awkward edge cases.

For a customer-support copilot, include normal requests, angry messages, multilingual tickets, partial information, policy conflicts, and cases where the right answer is escalation. For a developer tool, include small bug fixes, ambiguous refactors, failing tests, permission boundaries, and examples where the assistant should ask before editing. For a product analytics assistant, include malformed questions, stale dashboard names, missing data, and questions that require saying “I don’t know.”

Each row should include more than the input and the ideal answer. Add the user segment, task type, risk level, required sources, allowed actions, and pass/fail rationale. This metadata lets you slice results later. Maybe the new prompt improves English support tickets but hurts Spanish tickets. Maybe a faster model works for summarization but fails tool-routing examples. Without metadata, the average score hides the story.

Hamel Husain’s practical writing on [LLM evals](https://hamel.dev/blog/posts/evals/) is useful because it pushes teams toward product-specific examples and human judgment rather than abstract benchmark worship. The spirit is simple: collect the cases that actually matter in your product, then make them repeatable.

## Compare prompts and models like product experiments

Prompt and model comparisons should look less like taste tests and more like controlled experiments. Change one thing at a time when you can. Run the same golden dataset against the current production prompt, the candidate prompt, and any candidate model. Track not only the total score, but score movement by task type and risk level.

Tools can help here. [ChainForge](https://chainforge.ai/) is designed around comparing prompts and model responses across many inputs, which makes it useful for exploration and red-team style analysis. [Vellum](https://www.vellum.ai/) offers product workflows for prompt management, evaluations, and deployment, useful for teams that want a managed system rather than a collection of scripts. [DeepEval by Confident AI](https://docs.confident-ai.com/) provides an open-source testing framework for LLM applications, including metrics that can be used in automated checks.

The tool matters less than the discipline. Store the prompt version, model name, retrieval settings, tool schema version, temperature, and any system instructions with every eval run. Otherwise you will not know what changed when a regression appears. This is especially important for teams comparing multi-model workflows like the ones discussed in our [practical LLM software workflow article](/blog/how-i-write-software-with-llms).

A good comparison report should answer four questions: What improved? What regressed? Which failures are launch blockers? Which failures are acceptable trade-offs because the product can mitigate them with UX, human review, or narrower rollout?

## Add regression gates to CI/CD without blocking every experiment

Once a golden dataset exists, put a smaller version of it into CI/CD. Do not start with your entire eval suite. Start with a smoke set that covers the failures you never want to reintroduce: unsafe policy advice, broken JSON, forbidden tool calls, severe hallucinations, and examples where escalation is mandatory.

The CI gate should be boring. A pull request that changes a prompt, model configuration, retrieval pipeline, tool schema, or agent routing logic should run the smoke evals. If a high-risk test fails, the PR should not merge without review. Lower-risk score movement can create a warning rather than a hard block.

This is where many teams overcomplicate evals. They try to make every judgment fully automated before using the system at all. That delays learning. Start with deterministic checks where possible: schema validity, required citations, forbidden actions, refusal on disallowed requests, and exact tool choice for simple tasks. Then add LLM-as-judge or rubric-based scoring for subjective dimensions such as helpfulness, tone, and completeness. Treat automated judges as noisy reviewers, not absolute truth.

For agentic systems, borrow patterns from [production MCP integration](/blog/mcp-production-integration-patterns) and [Operator-style web automation](/blog/operator-agents-api-web-automation-architecture): log tool calls, classify errors, keep versioned schemas, and test failure paths. Your eval should not only ask whether the final answer was good. It should ask whether the system used the right data, respected permissions, and recovered safely.

## Human review loops turn failures into better tests

No eval suite stays good by itself. Users change behavior. Policies change. Models change. Product surfaces change. A useful review loop turns production observations into new test cases.

Create a weekly or biweekly review of sampled AI outputs, user complaints, thumbs-down feedback, escalations, and near misses. Ask reviewers to label the failure type instead of stopping at “good” or “bad”: missing context, wrong tool, unsupported claim, bad tone, unsafe action, stale source, over-refusal, under-refusal, or confusing UX. Then promote the best examples into the golden dataset.

Human review is also where PMs and domain experts belong. Engineers can test schemas and tool calls, but product owners often know whether an answer would actually satisfy a customer. Legal, support, sales, or clinical experts may be needed for high-risk domains. The point is not to make every reviewer read every output forever. The point is to keep the eval set aligned with real product judgment.

If your team already uses agent operations dashboards, connect eval failures to those views. Our [agent operations funnel design](/blog/agent-operations-funnel-design) article describes a useful pattern: measure where tasks enter, where they stall, where humans intervene, and where users lose trust. Evals should feed that same operational picture.

## When game-world and open-ended evals help

Most product teams should start with golden datasets and regression gates. Open-ended environments are heavier. They become useful when your AI feature must plan across long horizons, recover from unexpected states, or interact with a simulated world where the path matters as much as the final answer.

The [Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) is a good example of this direction: it uses the game Factorio as a sandbox for measuring agents that must plan, gather resources, build, and adapt in an open-ended setting. That kind of eval is not necessary for a FAQ bot. It may be relevant for browser agents, coding agents, operations copilots, or AI systems that need to coordinate many tool calls over time.

The trade-off is cost and interpretability. Open-ended evals can expose planning failures that a static dataset misses, but they are harder to run quickly, harder to debug, and easier to overfit to a toy world. Use them when your production feature has similar long-horizon behavior. Do not use them as a substitute for testing the real tasks your customers pay for.

## A practical LLM evals workflow for product teams

Here is the operating model I would start with for a serious AI feature:

1. Define the risky user promises. What must the feature never do? What must it always do? Where is human escalation required?
2. Build a 50 to 200 item golden dataset from real or realistic cases, with metadata and pass/fail rationales.
3. Run baseline evals for the current prompt, model, retrieval setup, and tool configuration.
4. Compare candidate prompts and models on the same dataset, sliced by task type, language, risk, and user segment.
5. Promote the most important tests into CI/CD as regression gates.
6. Review production outputs regularly and turn new failures into new eval rows.
7. Add open-ended simulations only when long-horizon planning is part of the actual product risk.

This workflow will not make an AI feature perfect. It will make the trade-offs visible before customers discover them for you. That is the point. The best eval systems are not academic trophies; they are product instrumentation for uncertainty.

The teams that win with LLMs will not be the ones that test the most examples for their own sake. They will be the ones that know which failures matter, catch regressions early, and keep humans in the loop where judgment and accountability still belong. Ship the AI feature when your evals have made you a little less surprised by it.`,
    cn: `# LLM 评测实战：如何在用户之前测试 AI 功能

AI 功能第一次让团队尴尬时，通常不像一次 benchmark 失败。它更像是客服机器人自信地套错退款政策，代码助手修改了明明不该碰的文件，或者销售 copilot 因为 CRM 字段为空就编造了客户细节。演示没问题，提示词评审没问题，模型介绍也很亮眼，但真实用户找到了你从未测试过的输入。

这正是 LLM 评测存在的意义。它不是刷榜，也不是把每个新模型填进绿色表格的表演。实用的 LLM 评测是产品团队的早期预警系统：把混乱的用户期望转化为可重复测试、回归门禁和复审闭环。

## 为什么 LLM 评测不同于普通 QA

传统 QA 通常检查已知输入是否返回预期输出。LLM 产品更难，因为正确答案可能是一组可接受行为。客服助手可以用十种好方式回答同一问题，代码审查助手可能抓住严重 bug 却忽略风格问题，研究 Agent 在缺少上下文时主动停止并追问反而是好行为。

这不意味着评测可以含糊。相反，评分标准必须匹配产品风险。摘要工具可以评事实一致性、完整性、语气和拒答行为；能调用工具的 Agent 还要评任务成功率、工具选择、权限安全、恢复行为，以及该停下时是否停下。我们在 [AI Agent 更需要可靠性](/blog/ai-agents-need-reliability-more-than-capability) 中也强调过：产品不只是模型输出，还包括围绕输出的控制系统。

## 先构建黄金数据集，再调提示词

黄金数据集是一组经过筛选的真实或高度仿真的输入，包含期望行为、评分说明和元数据。一开始不必很大，50 到 200 条就足以覆盖常见用户任务、高成本失败模式和一些刻意设计的边界情况。

客服 copilot 应包含普通请求、愤怒消息、多语言工单、信息不完整、政策冲突，以及正确答案是升级人工的案例。开发者工具应包含小 bug 修复、模糊重构、失败测试、权限边界，以及助手应该先询问再编辑的场景。每一行不只写输入和理想答案，还要记录用户类型、任务类型、风险等级、所需来源、允许动作和通过理由。

[Hamel Husain 关于 LLM evals 的实践文章](https://hamel.dev/blog/posts/evals/) 的价值就在于，它提醒团队围绕产品真实案例和人类判断构建评测，而不是崇拜抽象 benchmark。收集真正影响产品的案例，然后让它们可重复运行。

## 像产品实验一样比较提示词和模型

提示词和模型比较不应是主观品鉴，而应像受控实验。尽量一次只改一个变量，用同一黄金数据集跑生产提示词、候选提示词和候选模型。不要只看总分，还要按任务类型、语言、风险等级和用户群体切片。

[ChainForge](https://chainforge.ai/) 适合在大量输入上比较 prompt 和模型输出；[Vellum](https://www.vellum.ai/) 提供 prompt 管理、评测和部署相关工作流；[Confident AI 的 DeepEval](https://docs.confident-ai.com/) 则提供面向 LLM 应用的开源测试框架。工具选择重要，但更重要的是纪律：每次评测都记录提示词版本、模型名、检索设置、工具 schema 版本、温度和系统指令。

这对多模型工作流尤其重要。我们在 [用 LLM 写软件的实践流程](/blog/how-i-write-software-with-llms) 中讨论过，不同模型适合不同角色；但如果没有稳定评测，团队很难知道一次改动到底提升了哪里、损害了哪里。

## 把回归门禁接入 CI/CD

有了黄金数据集后，把一个较小的 smoke 集合接入 CI/CD。不要一开始就跑完整评测。先覆盖绝不能回归的失败：危险政策建议、破坏 JSON、禁止工具调用、严重幻觉，以及必须升级人工的案例。

任何修改提示词、模型配置、检索管线、工具 schema 或 Agent 路由逻辑的 PR，都应该运行这些 smoke evals。高风险用例失败时应阻止合并；低风险分数波动可以先作为警告。

自动化不必一次到位。先做确定性检查：schema 是否有效、是否给出必要引用、是否触发禁止动作、是否在不允许请求上拒答、简单任务是否选择正确工具。再加入 LLM-as-judge 或 rubric 评分，处理有主观性的有用性、语气和完整性。自动评审应被视为有噪声的 reviewer，而不是绝对真理。

对 Agent 系统，可以借鉴 [MCP 生产集成模式](/blog/mcp-production-integration-patterns) 和 [Operator 风格网页自动化架构](/blog/operator-agents-api-web-automation-architecture)：记录工具调用、分类错误、版本化 schema，并测试失败路径。

## 人工复审把失败变成更好的测试

评测集不会自动保持优秀。用户行为会变，政策会变，模型会变，产品界面也会变。有效的机制是定期复审抽样输出、用户差评、升级工单和险些出事的案例，并把最有代表性的失败提升为新的黄金数据。

复审标签不要只有“好”和“坏”。记录失败类型：上下文缺失、工具错误、无依据声明、语气不当、不安全动作、来源过期、过度拒答、拒答不足或 UX 误导。PM、客服、销售、法务或领域专家都应参与高风险场景，因为他们往往比工程师更清楚用户是否真的会满意。

如果团队已经有 Agent 运营看板，可以把评测失败接进去。我们的 [Agent 运营漏斗设计](/blog/agent-operations-funnel-design) 提供了类似思路：衡量任务在哪里进入、在哪里卡住、哪里需要人工介入，以及哪里损害用户信任。

## 何时需要游戏世界和开放式评测

多数产品团队应从黄金数据集和回归门禁开始。开放式环境更重，只有当 AI 功能需要长程规划、从意外状态恢复，或在模拟世界中交互时才更有价值。[Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) 是一个代表性方向：它用 Factorio 游戏环境衡量 Agent 的规划、资源获取、建造和适应能力。

这类评测不适合 FAQ 机器人，却可能适合浏览器 Agent、编码 Agent、运维 copilot 或需要连续调用多种工具的系统。代价是成本更高、调试更难，也更容易对玩具世界过拟合。只有当生产风险本身就是长程行为时，才值得投入。

## 一套实用 LLM 评测流程

从风险承诺开始：功能绝不能做什么？必须做什么？哪里必须升级人工？然后构建 50 到 200 条黄金数据，跑当前基线，比较候选提示词和模型，把最关键用例放入 CI/CD，定期复审生产输出，并在确有长程规划风险时加入开放式仿真。

这不会让 AI 功能完美，但会让取舍在用户发现前先暴露出来。最好的 eval 系统不是学术奖杯，而是面向不确定性的产品仪表盘。真正能把 LLM 用好的团队，不是测试最多样例的团队，而是知道哪些失败最重要、能尽早抓住回归、并在需要判断和责任时让人类留在闭环中的团队。`,
    tw: `# LLM 評測實戰：如何在使用者之前測試 AI 功能

AI 功能第一次讓團隊尷尬時，通常不像一次 benchmark 失敗。它更像是客服機器人自信地套錯退款政策，程式碼助手修改了明明不該碰的檔案，或銷售 copilot 因為 CRM 欄位為空就編造客戶細節。示範沒問題，提示詞審查沒問題，模型介紹也很亮眼，但真實使用者找到了你從未測試過的輸入。

這正是 LLM 評測存在的意義。它不是刷榜，也不是把每個新模型填進綠色表格的表演。實用的 LLM 評測是產品團隊的早期預警系統：把混亂的使用者期望轉化為可重複測試、回歸閘門和複審閉環。

## 為什麼 LLM 評測不同於普通 QA

傳統 QA 通常檢查已知輸入是否返回預期輸出。LLM 產品更難，因為正確答案可能是一組可接受行為。評分標準必須匹配產品風險：摘要工具要看事實一致性、完整性、語氣和拒答；能呼叫工具的 Agent 還要看任務成功率、工具選擇、權限安全和是否知道該停下。這也呼應我們在 [AI Agent 更需要可靠性](/blog/ai-agents-need-reliability-more-than-capability) 中的觀點：產品不只是模型輸出，還包括控制系統。

## 先建立黃金資料集，再調提示詞

黃金資料集是一組真實或高度仿真的輸入，包含期望行為、評分說明和元資料。起步不必很大，50 到 200 條就能覆蓋常見任務、高成本失敗和邊界情況。客服 copilot 應包含憤怒訊息、多語工單、資訊不完整和需要升級人工的案例；開發者工具應包含小 bug、模糊重構、失敗測試和權限邊界。

每一行都要記錄任務類型、風險等級、所需來源、允許動作和通過理由。[Hamel Husain 的 LLM evals 實踐文章](https://hamel.dev/blog/posts/evals/) 提醒團隊從產品真實案例和人類判斷出發，而不是崇拜抽象 benchmark。

## 像產品實驗一樣比較提示詞和模型

提示詞和模型比較應像受控實驗。用同一資料集跑生產提示詞、候選提示詞和候選模型，並按任務、語言、風險和使用者群體切片。[ChainForge](https://chainforge.ai/) 適合比較多組 prompt 和模型輸出；[Vellum](https://www.vellum.ai/) 提供 prompt 管理、評測和部署工作流；[DeepEval](https://docs.confident-ai.com/) 提供面向 LLM 應用的開源測試框架。

工具之外，更重要的是記錄每次評測的提示詞版本、模型名、檢索設定、工具 schema 版本和系統指令。若你採用多模型流程，可搭配閱讀 [用 LLM 寫軟體的實踐流程](/blog/how-i-write-software-with-llms)。

## 把回歸閘門接入 CI/CD

有了黃金資料集後，先把小型 smoke 集合接入 CI/CD。任何修改提示詞、模型配置、檢索管線、工具 schema 或 Agent 路由的 PR，都應跑關鍵 evals。高風險案例失敗時阻止合併，低風險波動可先警告。

先做 deterministic checks：schema 是否有效、是否給出必要引用、是否觸發禁止動作、是否在不允許請求上拒答。再加入 rubric 或 LLM-as-judge 處理語氣、完整性和有用性。對 Agent 系統，可借鑑 [MCP 生產整合模式](/blog/mcp-production-integration-patterns) 和 [Operator 風格網頁自動化架構](/blog/operator-agents-api-web-automation-architecture)：記錄工具呼叫、分類錯誤、版本化 schema，並測試失敗路徑。

## 人工複審把失敗變成更好的測試

評測集不會自動保持優秀。定期複審抽樣輸出、使用者差評、升級工單和差點出事的案例，並把最代表性的失敗提升為新測試。標籤不要只有好壞，還要記錄上下文缺失、工具錯誤、無依據聲明、語氣不當、不安全動作、來源過期、過度拒答或拒答不足。

PM、客服、銷售、法務或領域專家都應參與高風險場景。若已有營運看板，可把 eval failure 接進去；我們的 [Agent 營運漏斗設計](/blog/agent-operations-funnel-design) 就是相近的觀察框架。

## 何時需要開放式遊戲世界評測

多數團隊應從黃金資料集和回歸閘門開始。開放式環境更重，只在功能需要長程規劃、從意外狀態恢復或連續互動時才值得投入。[Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) 用 Factorio 作為沙盒，評估 Agent 的規劃、資源取得、建造和適應能力。它不適合 FAQ bot，卻可能適合瀏覽器 Agent、編碼 Agent 或運維 copilot。

好的 LLM 評測不會讓功能完美，但會讓取捨更早可見。真正成熟的團隊知道哪些失敗最重要，能在 CI/CD 中抓住回歸，並在需要判斷和責任時讓人類留在閉環中。`,
    de: `# LLM-Evals in der Praxis: KI-Features testen, bevor Nutzer es tun

Der erste peinliche Fehler eines KI-Features sieht selten wie ein Benchmark-Problem aus. Er sieht aus wie ein Support-Bot, der selbstbewusst die falsche Rückerstattungsregel nutzt, ein Coding-Assistent, der eine gesperrte Datei ändert, oder ein Sales-Copilot, der ein leeres CRM-Feld mit erfundenen Details füllt. Die Demo war sauber. Der Prompt-Review wirkte plausibel. Dann fand ein echter Nutzer den Fall, den niemand getestet hatte.

Dafür sind LLM-Evals da. Nicht für Leaderboard-Theater, sondern als Frühwarnsystem für Produktteams: realistische Erwartungen werden zu wiederholbaren Tests, Regression Gates und Review-Schleifen.

## Warum LLM-Evals anders sind als normale QA

Klassische QA prüft, ob ein bekanntes Input ein erwartetes Output liefert. LLM-Produkte haben oft mehrere akzeptable Antworten. Ein Support-Assistent kann in zehn guten Varianten antworten. Ein Research-Agent kann nützlich sein, wenn er stoppt und fehlenden Kontext erfragt.

Die Rubrik muss deshalb zum Risiko passen: Faktenkonsistenz, Vollständigkeit, Ton, Refusal-Verhalten, Tool-Auswahl, Berechtigungen, Recovery und sichere Stopps. Unser Beitrag zu [verlässlicheren AI Agents](/blog/ai-agents-need-reliability-more-than-capability) beschreibt dieselbe Produktlogik: Nicht nur das Modell zählt, sondern die Kontrollfläche um das Modell.

## Golden Dataset vor Prompt-Tuning

Ein Golden Dataset ist eine kuratierte Sammlung realistischer Fälle mit erwarteter Reaktion, Bewertungsnotizen und Metadaten. Starten Sie mit 50 bis 200 Beispielen: häufige Jobs, teure Fehler und unangenehme Edge Cases. Für Support gehören wütende Tickets, mehrere Sprachen, fehlende Informationen und Eskalationsfälle hinein. Für Developer Tools gehören kleine Bugs, unklare Refactorings, kaputte Tests und Berechtigungsgrenzen hinein.

Speichern Sie Task-Typ, Risikostufe, benötigte Quellen, erlaubte Aktionen und Pass/Fail-Begründung. So erkennen Sie später, ob ein neuer Prompt Spanisch verschlechtert, Tool-Routing verbessert oder nur den Durchschnitt verschönert. Hamel Husains Artikel zu [LLM evals](https://hamel.dev/blog/posts/evals/) ist hilfreich, weil er produktspezifische Beispiele und menschliches Urteil priorisiert.

## Prompts und Modelle wie Produktexperimente vergleichen

Vergleiche sollten kontrolliert sein. Lassen Sie Produktionsprompt, Kandidatenprompt und Kandidatenmodell auf demselben Dataset laufen und schneiden Sie die Ergebnisse nach Task, Sprache, Risiko und Segment. [ChainForge](https://chainforge.ai/) hilft beim Vergleichen vieler Prompts und Outputs, [Vellum](https://www.vellum.ai/) bietet Workflows für Prompt-Management, Evals und Deployment, und [DeepEval](https://docs.confident-ai.com/) ist ein Open-Source-Testframework für LLM-Anwendungen.

Wichtiger als das Tool ist die Disziplin: Prompt-Version, Modellname, Retrieval-Einstellungen, Tool-Schema, Temperatur und Systeminstruktionen müssen pro Run gespeichert werden. Das gilt besonders für Multi-Model-Workflows wie in unserem Artikel über [Softwareentwicklung mit LLMs](/blog/how-i-write-software-with-llms).

## Regression Gates in CI/CD

Nehmen Sie zuerst ein kleines Smoke-Set in CI/CD auf: gefährliche Policy-Antworten, kaputtes JSON, verbotene Tool Calls, schwere Halluzinationen und Pflicht-Eskalationen. Jeder Pull Request, der Prompt, Modellkonfiguration, Retrieval, Tool-Schema oder Routing ändert, sollte diese Evals ausführen. Hochriskante Fehler blockieren den Merge, niedrigere Bewegungen erzeugen Warnungen.

Beginnen Sie mit deterministischen Checks: Schema-Gültigkeit, notwendige Quellen, verbotene Aktionen, Refusals und einfache Tool-Wahl. Ergänzen Sie später Rubrics oder LLM-as-judge für Ton, Vollständigkeit und Nützlichkeit. Für Agenten passen die Muster aus [MCP in Produktion](/blog/mcp-production-integration-patterns) und [Operator-Web-Automation](/blog/operator-agents-api-web-automation-architecture): Tool Calls loggen, Fehler klassifizieren, Schemas versionieren und Failure Paths testen.

## Human Review hält Evals lebendig

Ein Eval-Set altert. Nutzer, Policies, Modelle und UI ändern sich. Prüfen Sie regelmäßig Stichproben, Beschwerden, Eskalationen und Near Misses. Labeln Sie nicht nur gut oder schlecht, sondern Fehlerarten: fehlender Kontext, falsches Tool, unbelegte Behauptung, schlechter Ton, unsichere Aktion, veraltete Quelle, Over-Refusal oder Under-Refusal. Danach wandern die besten Beispiele ins Golden Dataset.

PMs und Domain Experts gehören hier hinein. Wenn Sie Agent-Dashboards nutzen, verbinden Sie Eval-Fehler mit dem Betriebsbild; unser [Agent-Operations-Funnel](/blog/agent-operations-funnel-design) liefert dafür ein passendes Muster.

## Wann offene Game-World-Evals sinnvoll sind

Die meisten Teams sollten mit Golden Datasets und Regression Gates starten. Offene Umgebungen lohnen sich, wenn das Produkt lange Planung, Recovery und viele Tool-Schritte braucht. Die [Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) nutzt Factorio als Sandbox für Agenten, die planen, Ressourcen sammeln, bauen und adaptieren müssen. Für einen FAQ-Bot ist das übertrieben; für Browser-, Coding- oder Operations-Agenten kann es relevant sein.

Gute LLM-Evals machen ein Feature nicht perfekt. Sie machen die Trade-offs sichtbar, bevor Kunden sie finden. Reife Teams wissen, welche Fehler zählen, fangen Regressionen früh ab und halten Menschen dort im Loop, wo Urteil und Verantwortung nötig bleiben.`,
    es: `# Evals de LLM en la práctica: cómo probar funciones de IA antes que los usuarios

El primer fallo vergonzoso de una función de IA rara vez parece un fallo de benchmark. Parece un bot de soporte aplicando la política equivocada, un asistente de código tocando un archivo prohibido o un copiloto de ventas inventando un dato porque el CRM estaba vacío. La demo funcionó. El prompt parecía correcto. Luego un usuario real encontró el caso que nadie probó.

Para eso sirven las evals de LLM: no para perseguir rankings, sino para convertir expectativas de producto en pruebas repetibles, puertas de regresión y revisión humana.

## Por qué las evals de LLM no son QA normal

En QA tradicional se espera una salida concreta para una entrada conocida. En productos con LLM puede haber varias respuestas aceptables. La rúbrica debe seguir el riesgo: consistencia factual, completitud, tono, refusals, selección de herramientas, permisos, recuperación y cuándo detenerse. Nuestra pieza sobre [fiabilidad de agentes de IA](/blog/ai-agents-need-reliability-more-than-capability) lo resume bien: el producto no es solo el output, sino los controles alrededor.

## Crea un golden dataset antes de tocar el prompt

Un golden dataset reúne casos realistas con comportamiento esperado, notas de scoring y metadatos. Empieza con 50 a 200 ejemplos: tareas frecuentes, fallos caros y edge cases incómodos. Para soporte, incluye tickets enfadados, idiomas, información incompleta y escalaciones. Para herramientas de desarrollo, incluye bugs pequeños, refactors ambiguos, tests rotos y límites de permisos.

Guarda tipo de tarea, riesgo, fuentes necesarias, acciones permitidas y motivo de aprobado o fallido. El artículo práctico de Hamel Husain sobre [LLM evals](https://hamel.dev/blog/posts/evals/) es útil porque prioriza ejemplos del producto y juicio humano frente a benchmarks abstractos.

## Compara prompts y modelos como experimentos de producto

Usa el mismo dataset para el prompt de producción, el prompt candidato y el modelo candidato. Mira resultados por tarea, idioma, riesgo y segmento, no solo el promedio. [ChainForge](https://chainforge.ai/) ayuda a comparar prompts y respuestas; [Vellum](https://www.vellum.ai/) ofrece workflows de prompts, evals y despliegue; [DeepEval](https://docs.confident-ai.com/) es un framework open source para probar aplicaciones LLM.

Registra versión de prompt, modelo, retrieval, schema de herramientas, temperatura e instrucciones del sistema. Esto es crítico en workflows multi-modelo como los de nuestro artículo sobre [desarrollo de software con LLMs](/blog/how-i-write-software-with-llms).

## Lleva puertas de regresión a CI/CD

Convierte una parte pequeña del golden dataset en smoke tests: consejos peligrosos, JSON roto, tool calls prohibidos, alucinaciones severas y casos donde la escalación es obligatoria. Todo PR que cambie prompt, modelo, retrieval, schema o routing debe ejecutar esas evals. Los fallos de alto riesgo bloquean; los movimientos menores pueden advertir.

Empieza con checks deterministas: schema válido, citas requeridas, acciones prohibidas, refusals y elección simple de herramientas. Después añade rúbricas o LLM-as-judge para tono, utilidad y completitud. Para agentes, toma patrones de [MCP en producción](/blog/mcp-production-integration-patterns) y [automatización web tipo Operator](/blog/operator-agents-api-web-automation-architecture): logs de herramientas, errores clasificados, schemas versionados y pruebas de rutas de fallo.

## La revisión humana convierte fallos en mejores tests

Las evals envejecen. Revisa outputs, quejas, escalaciones y near misses. Etiqueta tipos de fallo: contexto faltante, herramienta incorrecta, afirmación sin fuente, mal tono, acción insegura, fuente obsoleta, exceso de refusal o falta de refusal. Luego promueve los mejores ejemplos al golden dataset.

PMs y expertos de dominio deben participar, sobre todo en casos de alto riesgo. Si ya tienes dashboards de agentes, conecta fallos de eval con ese flujo; nuestro [embudo de operaciones de agentes](/blog/agent-operations-funnel-design) ofrece una forma práctica de verlo.

## Cuándo ayudan las evals abiertas tipo juego

La mayoría de equipos debe empezar con golden datasets y gates. Las simulaciones abiertas valen la pena cuando la función necesita planificación larga, recuperación o muchos pasos con herramientas. [Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) usa Factorio para evaluar agentes que planifican, recolectan recursos, construyen y se adaptan. No hace falta para un FAQ bot, pero puede ayudar en agentes de navegador, coding u operaciones.

Las buenas evals no vuelven perfecto un producto de IA. Hacen visibles los riesgos antes de que los descubran los usuarios. Los equipos maduros saben qué fallos importan, detectan regresiones temprano y mantienen humanos en el loop donde hay juicio y responsabilidad.`,
    fr: `# Évals LLM en pratique : tester les fonctions IA avant les utilisateurs

Le premier échec embarrassant d’une fonction IA ressemble rarement à un échec de benchmark. C’est plutôt un bot support qui applique la mauvaise règle de remboursement, un assistant de code qui modifie un fichier interdit, ou un copilote commercial qui invente une information parce qu’un champ CRM est vide. La démo était propre. Le prompt semblait bon. Puis un utilisateur réel a trouvé le cas que personne n’avait testé.

Les évals LLM servent à cela : pas à courir après les classements, mais à transformer les attentes produit en tests répétables, gates de régression et boucles de revue.

## Pourquoi les évals LLM ne sont pas une QA classique

La QA classique vérifie une sortie attendue pour une entrée connue. Avec un LLM, plusieurs réponses peuvent être acceptables. La grille doit suivre le risque produit : cohérence factuelle, complétude, ton, refus, choix d’outil, permissions, récupération et capacité à s’arrêter. Notre article sur [la fiabilité des agents IA](/blog/ai-agents-need-reliability-more-than-capability) le formule ainsi : le produit n’est pas seulement la sortie du modèle, mais les contrôles autour.

## Construire un golden dataset avant de retoucher le prompt

Un golden dataset rassemble des cas réalistes avec comportement attendu, notes de scoring et métadonnées. Commencez avec 50 à 200 exemples : tâches fréquentes, erreurs coûteuses et cas limites. Pour le support, incluez messages agressifs, langues, informations manquantes et escalades. Pour un outil développeur, incluez petits bugs, refactors ambigus, tests cassés et limites de permission.

Ajoutez type de tâche, niveau de risque, sources requises, actions autorisées et justification du verdict. L’article de Hamel Husain sur les [LLM evals](https://hamel.dev/blog/posts/evals/) est utile car il privilégie les exemples produit et le jugement humain plutôt que les benchmarks abstraits.

## Comparer prompts et modèles comme des expériences produit

Faites tourner le même dataset sur le prompt de production, le prompt candidat et le modèle candidat. Analysez par tâche, langue, risque et segment, pas seulement par moyenne. [ChainForge](https://chainforge.ai/) aide à comparer prompts et réponses, [Vellum](https://www.vellum.ai/) propose des workflows de prompts, évals et déploiement, et [DeepEval](https://docs.confident-ai.com/) est un framework open source pour tester des applications LLM.

Conservez la version du prompt, le modèle, le retrieval, le schema d’outils, la température et les instructions système. C’est essentiel pour les workflows multi-modèles comme ceux décrits dans notre article sur [le développement logiciel avec LLMs](/blog/how-i-write-software-with-llms).

## Ajouter des gates de régression à CI/CD

Placez un petit smoke set dans CI/CD : conseils dangereux, JSON cassé, appels d’outils interdits, hallucinations sévères et escalades obligatoires. Tout changement de prompt, modèle, retrieval, schema ou routing doit exécuter ces évals. Les échecs à haut risque bloquent, les variations plus faibles avertissent.

Commencez par des checks déterministes : schema valide, citations requises, actions interdites, refus et choix d’outil simple. Ajoutez ensuite rubriques ou LLM-as-judge pour le ton, l’utilité et la complétude. Pour les agents, reprenez les patterns de [MCP en production](/blog/mcp-production-integration-patterns) et de [l’automatisation web façon Operator](/blog/operator-agents-api-web-automation-architecture) : logs d’outils, erreurs classées, schemas versionnés et tests des chemins d’échec.

## La revue humaine transforme les échecs en meilleurs tests

Un set d’évals vieillit. Revoyez sorties, plaintes, escalades et quasi-incidents. Étiquetez les types d’échec : contexte manquant, mauvais outil, affirmation sans source, mauvais ton, action dangereuse, source obsolète, refus excessif ou refus insuffisant. Les meilleurs exemples rejoignent le golden dataset.

Les PMs et experts métier doivent participer, surtout pour les domaines risqués. Si vous avez un dashboard d’agents, reliez les échecs d’évals à ce flux ; notre [funnel d’opérations d’agents](/blog/agent-operations-funnel-design) donne un cadre pratique.

## Quand les évals ouvertes type jeu aident

La plupart des équipes doivent commencer par golden datasets et gates. Les environnements ouverts deviennent utiles quand la fonction demande planification longue, récupération et nombreux appels d’outils. [Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) utilise Factorio pour évaluer des agents qui planifient, collectent, construisent et s’adaptent. C’est excessif pour un FAQ bot, mais pertinent pour des agents navigateur, code ou opérations.

Les bonnes évals ne rendent pas une fonction IA parfaite. Elles rendent les compromis visibles avant les utilisateurs. Les équipes mûres savent quels échecs comptent, détectent les régressions tôt et gardent l’humain dans la boucle quand jugement et responsabilité sont nécessaires.`,
    jp: `# LLM評価の実践：ユーザーより先にAI機能をテストする方法

AI機能が初めてチームを困らせる瞬間は、ベンチマークの失敗には見えません。サポートbotが誤った返金ポリシーを自信満々に適用する、コードアシスタントが触ってはいけないファイルを変更する、営業copilotが空のCRM項目を見て顧客情報を作り出す。デモは問題なく、プロンプトレビューも通ったのに、実ユーザーが未テストの入力を見つけます。

LLM evals はそのためにあります。ランキング競争ではなく、プロダクト上の期待を再現可能なテスト、回帰ゲート、人間レビューのループに変える仕組みです。

## LLM評価が通常のQAと違う理由

通常のQAは、既知の入力に期待出力が返るかを確認します。LLMプロダクトでは、許容できる答えが複数あります。だからこそ、ルーブリックはリスクに合わせる必要があります。事実整合性、網羅性、トーン、拒否、ツール選択、権限、安全な停止を評価します。これは [AIエージェントには能力より信頼性が必要](/blog/ai-agents-need-reliability-more-than-capability) という記事の考え方と同じです。

## プロンプト調整の前にゴールデンデータセットを作る

ゴールデンデータセットは、現実的な入力、期待される振る舞い、採点メモ、メタデータを持つケース集です。最初は50から200件で十分です。サポートなら怒ったチケット、多言語、情報不足、エスカレーションが必要なケース。開発者向けツールなら小さなバグ、曖昧なリファクタ、失敗テスト、権限境界を入れます。

タスク種別、リスク、必要な根拠、許可されたアクション、合否理由も保存します。Hamel Husain の [LLM evalsに関する実践記事](https://hamel.dev/blog/posts/evals/) は、抽象的なベンチマークよりもプロダクト固有の例と人間の判断を重視する点で参考になります。

## プロンプトとモデルをプロダクト実験として比較する

同じデータセットで本番プロンプト、候補プロンプト、候補モデルを実行します。平均点だけでなく、タスク、言語、リスク、ユーザーセグメントで結果を見ます。[ChainForge](https://chainforge.ai/) は複数プロンプトと出力の比較に向き、[Vellum](https://www.vellum.ai/) はプロンプト管理、評価、デプロイのワークフローを提供し、[DeepEval](https://docs.confident-ai.com/) はLLMアプリケーション向けのオープンソーステストフレームワークです。

各runではプロンプト版、モデル名、検索設定、ツールschema、temperature、システム指示を保存します。これは [LLMでソフトウェアを書く実践ワークフロー](/blog/how-i-write-software-with-llms) のようなマルチモデル運用では特に重要です。

## CI/CDに回帰ゲートを入れる

ゴールデンデータセットの一部をsmoke evalsとしてCI/CDに入れます。危険なポリシー回答、壊れたJSON、禁止ツール呼び出し、重大な幻覚、必須エスカレーションを含めます。プロンプト、モデル設定、retrieval、ツールschema、ルーティングを変えるPRはこれを実行すべきです。

まずは決定的なチェックから始めます。schemaの妥当性、必要な引用、禁止アクション、拒否、単純なツール選択です。その後、トーンや有用性にはrubricやLLM-as-judgeを追加します。エージェントでは [MCP本番統合](/blog/mcp-production-integration-patterns) と [Operator型Web自動化](/blog/operator-agents-api-web-automation-architecture) のように、ツール呼び出しを記録し、エラーを分類し、schemaをバージョン管理し、失敗経路をテストします。

## 人間レビューで失敗をテストに変える

eval setは古くなります。出力、苦情、エスカレーション、near missを定期的に確認し、欠落文脈、誤ったツール、根拠のない主張、不適切なトーン、危険な行動、古いソース、過剰拒否、拒否不足などに分類します。代表的な例をゴールデンデータセットに追加します。

PMやドメイン専門家も重要です。エージェントの運用ダッシュボードがあるなら、eval failureをそこにつなげます。[Agent運用ファネル設計](/blog/agent-operations-funnel-design) はその見方に近いです。

## ゲーム世界型のオープン評価が役立つとき

多くのチームはゴールデンデータセットと回帰ゲートから始めるべきです。オープン環境は、長期計画、予期せぬ状態からの復帰、多数のツール操作が本当のリスクである場合に役立ちます。[Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) はFactorioを使い、計画、資源収集、建設、適応を評価する例です。FAQ botには重すぎますが、ブラウザagent、coding agent、運用copilotには有用な場合があります。

良いLLM evalsはAI機能を完璧にはしません。ただし、ユーザーが見つける前にトレードオフを見える化します。成熟したチームは、重要な失敗を知り、回帰を早く見つけ、判断と責任が必要な場所に人間を残します。`,
    pt: `# Evals de LLM na prática: como testar recursos de IA antes dos usuários

A primeira falha constrangedora de um recurso de IA raramente parece uma falha de benchmark. Parece um bot de suporte aplicando a política errada, um assistente de código alterando um arquivo proibido ou um copiloto de vendas inventando um detalhe porque o CRM estava vazio. A demo funcionou. O prompt parecia bom. Então um usuário real encontrou o caso que ninguém testou.

Evals de LLM servem para isso: não para rankings, mas para transformar expectativas de produto em testes repetíveis, gates de regressão e revisão humana.

## Por que evals de LLM não são QA comum

QA tradicional verifica uma saída esperada para uma entrada conhecida. Em produtos com LLM, várias respostas podem ser aceitáveis. A rubrica precisa seguir o risco: consistência factual, completude, tom, recusas, escolha de ferramentas, permissões, recuperação e quando parar. Nosso artigo sobre [confiabilidade de agentes de IA](/blog/ai-agents-need-reliability-more-than-capability) reforça a mesma ideia: o produto não é só o output, mas os controles ao redor.

## Crie um golden dataset antes de mudar o prompt

Um golden dataset reúne casos realistas com comportamento esperado, notas de avaliação e metadados. Comece com 50 a 200 exemplos: tarefas comuns, falhas caras e edge cases. Para suporte, inclua tickets irritados, idiomas, informações incompletas e escalonamento. Para ferramentas de desenvolvimento, inclua pequenos bugs, refactors ambíguos, testes quebrados e limites de permissão.

Guarde tipo de tarefa, risco, fontes necessárias, ações permitidas e justificativa de aprovação. O artigo de Hamel Husain sobre [LLM evals](https://hamel.dev/blog/posts/evals/) é útil porque prioriza exemplos do produto e julgamento humano em vez de benchmarks abstratos.

## Compare prompts e modelos como experimentos de produto

Rode o mesmo dataset no prompt de produção, no prompt candidato e no modelo candidato. Analise por tarefa, idioma, risco e segmento, não só pela média. [ChainForge](https://chainforge.ai/) ajuda a comparar prompts e saídas, [Vellum](https://www.vellum.ai/) oferece fluxos de prompt, evals e deploy, e [DeepEval](https://docs.confident-ai.com/) é um framework open source para testar aplicações LLM.

Registre versão do prompt, modelo, retrieval, schema de ferramentas, temperatura e instruções de sistema. Isso é essencial em fluxos multi-modelo como os do nosso artigo sobre [desenvolvimento de software com LLMs](/blog/how-i-write-software-with-llms).

## Leve gates de regressão para CI/CD

Coloque um smoke set pequeno no CI/CD: conselhos perigosos, JSON quebrado, chamadas de ferramenta proibidas, alucinações graves e casos que exigem escalonamento. Todo PR que muda prompt, modelo, retrieval, schema ou roteamento deve executar essas evals. Falhas de alto risco bloqueiam; mudanças menores avisam.

Comece com checks determinísticos: schema válido, citações necessárias, ações proibidas, recusas e escolha simples de ferramentas. Depois adicione rubricas ou LLM-as-judge para tom, utilidade e completude. Para agentes, use padrões de [MCP em produção](/blog/mcp-production-integration-patterns) e [automação web estilo Operator](/blog/operator-agents-api-web-automation-architecture): logs de ferramentas, erros classificados, schemas versionados e testes de caminhos de falha.

## Revisão humana transforma falhas em testes melhores

Evals envelhecem. Revise outputs, reclamações, escalonamentos e quase-incidentes. Marque tipos de falha: contexto ausente, ferramenta errada, afirmação sem fonte, tom ruim, ação insegura, fonte antiga, excesso de recusa ou falta de recusa. Promova os melhores exemplos ao golden dataset.

PMs e especialistas de domínio devem participar, especialmente em áreas de risco. Se você já usa dashboards de agentes, conecte falhas de eval a esse funil; nosso [funil de operações de agentes](/blog/agent-operations-funnel-design) mostra uma forma prática.

## Quando evals abertas em mundos de jogo ajudam

A maioria dos times deve começar com golden datasets e gates. Ambientes abertos valem a pena quando o produto exige planejamento longo, recuperação e muitos passos com ferramentas. O [Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) usa Factorio para avaliar agentes que planejam, coletam recursos, constroem e se adaptam. É demais para um FAQ bot, mas pode ajudar em agentes de navegador, coding ou operações.

Boas evals não tornam um recurso de IA perfeito. Elas tornam os trade-offs visíveis antes dos usuários. Times maduros sabem quais falhas importam, detectam regressões cedo e mantêm humanos no loop onde julgamento e responsabilidade continuam necessários.`,
    ru: `# LLM evals на практике: как тестировать AI-функции до пользователей

Первый неловкий провал AI-функции редко выглядит как провал бенчмарка. Это скорее support-бот, который уверенно применил неверную политику возврата, coding assistant, изменивший запрещённый файл, или sales copilot, придумавший деталь клиента из-за пустого поля CRM. Демо работало. Prompt review выглядел нормально. Затем реальный пользователь нашёл кейс, который никто не тестировал.

Для этого и нужны LLM evals: не для гонки за leaderboard, а чтобы превратить ожидания продукта в повторяемые тесты, regression gates и циклы human review.

## Почему LLM evals отличаются от обычного QA

Обычное QA проверяет ожидаемый output для известного input. В LLM-продуктах допустимых ответов может быть несколько. Рубрика должна соответствовать риску: фактическая точность, полнота, тон, refusals, выбор инструментов, права доступа, восстановление и умение остановиться. В статье о том, почему [AI-агентам важнее надёжность](/blog/ai-agents-need-reliability-more-than-capability), мы говорим о том же: продукт — это не только ответ модели, но и контроль вокруг него.

## Сначала golden dataset, потом prompt tuning

Golden dataset — это набор реалистичных случаев с ожидаемым поведением, заметками для оценки и метаданными. Начните с 50–200 примеров: частые задачи, дорогие ошибки и неудобные edge cases. Для support нужны злые сообщения, разные языки, неполная информация и эскалации. Для developer tool — маленькие баги, неоднозначные refactors, падающие тесты и границы прав.

Сохраняйте тип задачи, риск, необходимые источники, разрешённые действия и причину pass/fail. Практическая статья Hamel Husain про [LLM evals](https://hamel.dev/blog/posts/evals/) полезна тем, что ставит продуктовые примеры и человеческое суждение выше абстрактных benchmark.

## Сравнивайте prompts и модели как продуктовые эксперименты

Запускайте один и тот же dataset на production prompt, candidate prompt и candidate model. Смотрите не только средний балл, но и срезы по задаче, языку, риску и сегменту. [ChainForge](https://chainforge.ai/) помогает сравнивать prompts и outputs, [Vellum](https://www.vellum.ai/) предлагает workflows для prompt management, evals и deployment, а [DeepEval](https://docs.confident-ai.com/) — open-source framework для тестирования LLM applications.

Для каждого run сохраняйте версию prompt, модель, retrieval, schema инструментов, temperature и system instructions. Это особенно важно для multi-model workflows вроде тех, что описаны в статье про [разработку с LLM](/blog/how-i-write-software-with-llms).

## Добавьте regression gates в CI/CD

Перенесите небольшой smoke set в CI/CD: опасные policy answers, сломанный JSON, запрещённые tool calls, серьёзные hallucinations и обязательные эскалации. Любой PR, который меняет prompt, модель, retrieval, schema или routing, должен запускать эти evals. Высокорисковые ошибки блокируют merge, менее критичные изменения дают warning.

Начните с deterministic checks: валидная schema, обязательные citations, запрещённые действия, refusals и простой выбор tool. Затем добавьте rubrics или LLM-as-judge для тона, полезности и полноты. Для агентов используйте паттерны из [MCP in production](/blog/mcp-production-integration-patterns) и [Operator-style web automation](/blog/operator-agents-api-web-automation-architecture): логируйте tool calls, классифицируйте ошибки, версионируйте schemas и тестируйте failure paths.

## Human review превращает ошибки в лучшие тесты

Eval set стареет. Регулярно проверяйте outputs, жалобы, эскалации и near misses. Помечайте типы ошибок: отсутствующий контекст, неправильный tool, неподтверждённое утверждение, плохой тон, небезопасное действие, устаревший источник, over-refusal или under-refusal. Лучшие примеры добавляйте в golden dataset.

PM и доменные эксперты должны участвовать, особенно в рискованных сценариях. Если у вас есть dashboards для agents, связывайте eval failures с операционной картиной; наш [agent operations funnel](/blog/agent-operations-funnel-design) даёт практичную модель.

## Когда помогают открытые game-world evals

Большинству команд стоит начать с golden datasets и gates. Открытые среды полезны, когда продукт требует долгого планирования, восстановления и многих tool steps. [Factorio Learning Environment](https://jackhopkins.github.io/factorio-learning-environment/) использует Factorio как sandbox для агентов, которые планируют, добывают ресурсы, строят и адаптируются. Для FAQ bot это лишнее, но для browser agents, coding agents или operations copilots может быть полезно.

Хорошие LLM evals не делают AI-функцию идеальной. Они показывают trade-offs до того, как их найдут пользователи. Зрелые команды знают, какие ошибки важны, ловят регрессии рано и оставляют человека в loop там, где нужны суждение и ответственность.`,
  },
  author: 'Toolsify AI',
  date: '2026-05-16',
  category: 'Product & Ops',
  tags: [
    'LLM evals',
    'AI product testing',
    'golden datasets',
    'prompt evaluation',
    'model comparison',
    'AI regression testing',
    'LLM CI/CD',
    'human review loops',
    'how to test AI features before launch',
    'LLM evals workflow for product teams',
    'prompt and model comparison guide',
    'golden dataset for LLM applications',
    'CI/CD checks for AI features',
  ],
};

export default postLlmEvalsInPracticeTestAiFeatures;
