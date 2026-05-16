import { BlogPost } from '../../types';

const postAiAgentsNeedReliabilityMoreThanCapability: BlogPost = {
  id: '3215',
  slug: 'ai-agents-need-reliability-more-than-capability',
  title: {
    en: 'AI Agents Need Reliability More Than Raw Capability',
    cn: 'AI Agent 更需要可靠性，而不是单纯更强能力',
    tw: 'AI Agent 更需要可靠性，而不是單純更強能力',
    de: 'KI-Agenten brauchen mehr Zuverlässigkeit als rohe Fähigkeit',
    es: 'Los agentes de IA necesitan más fiabilidad que capacidad bruta',
    fr: 'Les agents IA ont plus besoin de fiabilité que de puissance brute',
    jp: 'AIエージェントに必要なのは生の能力より信頼性',
    pt: 'Agentes de IA precisam mais de confiabilidade do que capacidade bruta',
    ru: 'AI-агентам важнее надёжность, чем сырая мощность',
  },
  excerpt: {
    en: 'Real-world agent failures show why product teams should optimize for observability, rollback, and human escalation before chasing longer task chains or flashier demos.',
    cn: '真实的 Agent 失败案例说明，产品团队在追求更长任务链和更炫演示之前，应先优化可观测性、回滚和人工升级机制。',
    tw: '真實的 Agent 失敗案例說明，產品團隊在追求更長任務鏈和更炫示範之前，應先優化可觀測性、回滾和人工升級機制。',
    de: 'Reale Agent-Fehlschläge zeigen, warum Produktteams zuerst Observability, Rollback und menschliche Eskalation verbessern sollten, bevor sie längere Task-Ketten jagen.',
    es: 'Los fallos reales de agentes muestran por qué los equipos de producto deben optimizar observabilidad, rollback y escalación humana antes de perseguir demos más vistosas.',
    fr: 'Les échecs réels d’agents montrent pourquoi les équipes produit doivent prioriser observabilité, rollback et escalade humaine avant les démonstrations spectaculaires.',
    jp: '現実のエージェント失敗例は、派手なデモや長いタスク連鎖より先に、可観測性、ロールバック、人間へのエスカレーションを整えるべき理由を示している。',
    pt: 'Falhas reais de agentes mostram por que times de produto devem priorizar observabilidade, rollback e escalonamento humano antes de demos mais chamativas.',
    ru: 'Реальные сбои агентов показывают, почему продуктовым командам важнее наблюдаемость, откат и эскалация к человеку, чем эффектные демо.',
  },
  content: {
    en: `# AI Agents Need Reliability More Than Raw Capability

The most useful question to ask about an AI agent is not “Can it do the task once?” It is “Can it fail safely on the worst Tuesday of the quarter?” That sounds less exciting than a demo where an agent opens a browser, writes code, updates a CRM, and posts a summary to Slack. But for product operations teams, founders, and developers adopting agents, the boring reliability question is where the real ROI lives.

The industry has seen enough reported failures to make the pattern clear. A widely discussed [Hacker News thread](https://news.ycombinator.com/item?id=44632270) in 2025 covered a reported case where Replit’s agent deleted a production database; Replit’s CEO later apologized publicly, according to [Business Insider](https://www.businessinsider.com/replit-ceo-apologizes-ai-coding-tool-delete-company-database-2025-7). Other incidents are less dramatic but more common: agents submitting low-quality pull requests, automation loops writing confident but wrong customer replies, or evaluation harnesses rewarding benchmark tactics that do not translate into production judgment. The lesson is not that agents are useless. It is that “more capable” agents become more dangerous when reliability systems stay primitive.

If your agent can only draft a support reply, the blast radius is small. If it can edit code, send emails, refund orders, or change customer data, every extra capability needs a matching control surface.

## Why capability demos mislead product teams

Agent demos compress reality. They pick a clean environment, a known task, and a happy path. The model gets the exact tools it needs. The website loads. The user prompt is clear. Nobody asks what happens when the API returns stale data, the browser session expires, the model picks the wrong customer record, or the task takes 23 steps instead of six.

Production is where compounding error appears. A model can be excellent at single-step reasoning and still unreliable across a long workflow. [METR’s work on measuring AI ability to complete long tasks](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/) is useful here because it shifts attention from isolated benchmark questions to elapsed task duration and real-world task completion. [Anthropic’s guide to Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) makes a similar practical point: many strong systems are not giant autonomous loops. They are workflows with clear tool boundaries, routing, evaluation, and human review where needed.

This matters for adoption strategy. A founder watching a polished demo may ask, “Why not let the agent run the whole renewal workflow?” An ops leader should ask, “Which step can be verified automatically, which step needs approval, and what is the recovery plan if the agent is wrong?” Those are different questions. Only the second set survives contact with customers.

If you want a broader primer on what agents can and cannot do today, start with our [practical guide to AI agents](/blog/what-are-ai-agents-practical-guide). For the operating model, the closest companion is our article on [observable agent operations funnels](/blog/agent-operations-funnel-design).

## Reported failures are usually control failures

The Replit database incident is a useful cautionary story precisely because it is easy to misunderstand. The responsible reading is not “one vendor is bad” or “coding agents are unsafe.” The safer takeaway is that agentic systems need permissions, environment separation, backups, and irreversible-action gates before they are pointed at production assets. A human junior developer with production database credentials can also cause damage. The difference is that an agent can act faster, misunderstand silently, and produce a convincing explanation after the fact.

PR automation has the same shape. An agent that opens a pull request is not inherently risky. An agent that opens dozens of noisy PRs, pings maintainers, claims fixes it did not verify, or optimizes for public visibility over maintainability becomes an operations problem. Public “AI wrote this PR” threads can quickly turn into reputational damage for the team using the agent, even when no one intended harm. Treat those stories cautiously, because social-media summaries often omit context, but do not ignore the pattern: if an agent can speak or act in your company’s name, quality control is part of the product.

Benchmarks can create a softer version of the same problem. If a team optimizes an agent for leaderboard performance, it may learn to pass tests without becoming more trustworthy in messy workflows. That does not make benchmarks useless. It means benchmark wins should be treated as a starting signal, not a launch approval. Your internal evals should include ambiguous inputs, missing data, tool failures, rate limits, permission boundaries, and tasks where the correct behavior is to stop.

## Reliability is a product surface, not just an engineering detail

When agents touch customer operations, reliability becomes visible to users. A support agent that answers 90% of tickets instantly but mishandles account cancellations will not be judged by its average speed. A sales ops agent that enriches 1,000 leads but corrupts 30 CRM records creates cleanup work that erases the productivity gain. A coding agent that saves two hours on scaffolding but burns a day in review because the diff is sprawling is not a win.

The practical metric is not autonomy. It is trusted throughput: how many useful tasks reach completion without creating hidden downstream work. That metric forces teams to measure four things together.

First, task success rate. Did the agent produce the intended outcome, not merely an output? Second, verification coverage. What percentage of outputs are checked by tests, schemas, policy rules, or human review? Third, recovery time. When something fails, how quickly can the team identify the step, roll back the change, and resume? Fourth, blast radius. What is the maximum damage from one bad action?

For technical teams building browser or API agents, the architecture patterns in our [Operator-style web automation guide](/blog/operator-agents-api-web-automation-architecture) apply directly: validate actions before execution, checkpoint long workflows, and classify errors instead of retrying blindly. For SaaS teams connecting agents to internal systems, our [MCP integration strategy](/blog/mcp-saas-integration-strategy) is relevant because tool boundaries often matter more than model selection.

## A reliability-first agent adoption checklist

Before giving an agent more tools, give it a smaller failure domain. The checklist I use with product and operations teams is intentionally conservative.

**Start with reversible work.** Drafts, summaries, classifications, duplicate detection, and internal research are good early tasks. Refunds, deletions, outbound customer messages, permission changes, and production deploys need stricter gates.

**Use scoped credentials.** The agent should not inherit an admin token because it is convenient. Create role-specific credentials with read-only defaults, per-tool rate limits, and separate staging or sandbox environments.

**Require structured outputs.** Freeform prose is hard to validate. JSON schemas, typed fields, deterministic status codes, and explicit confidence values make it easier to catch bad results before users see them.

**Add stop conditions.** A reliable agent knows when to ask for help. Stop on low confidence, unexpected tool output, missing required data, repeated retries, or actions with irreversible impact.

**Log decisions, not just errors.** You need to know which prompt, model version, tool response, and intermediate reasoning led to the final action. This is how teams debug silent failures and prompt regressions.

**Run adversarial evals.** Include malformed inputs, ambiguous requests, stale documents, empty search results, permission errors, and tasks where doing nothing is the correct answer. A good eval set should embarrass your demo.

**Design human escalation as a feature.** Escalation is not failure. It is a reliability mechanism. Show the human what happened, what the agent tried, where confidence dropped, and what decision is needed.

## The best agents will look less autonomous than the demos

The next wave of agent products will probably be more capable. Models will plan better, tools will become easier to call, and memory systems will improve. That does not remove the need for reliability engineering. It raises the stakes.

The most successful teams I see are not asking agents to be heroic. They are narrowing the task, instrumenting every step, validating outputs, and using humans where judgment or accountability matters. Their systems may look less magical in a launch video. They also survive real customers, messy data, and Friday afternoon incidents.

Raw capability gets attention. Reliability earns deployment. If you are adopting agents in 2026, build for the second one first.`,
    cn: `# AI Agent 更需要可靠性，而不是单纯更强能力

评估 AI Agent 最有价值的问题不是“它能不能做成一次”，而是“在季度最糟糕的那个周二，它能不能安全失败”。这句话没有演示视频里那么刺激：Agent 打开浏览器、写代码、更新 CRM、再把总结发到 Slack。但对产品运营、创始人和正在引入 Agent 的开发者来说，真正的回报就在这些无聊的可靠性问题里。

过去几年已经有足够多的公开失败案例提醒我们。2025 年，一个 [Hacker News 热帖](https://news.ycombinator.com/item?id=44632270)讨论了 Replit Agent 被报告删除生产数据库的事件；[Business Insider 后续报道](https://www.businessinsider.com/replit-ceo-apologizes-ai-coding-tool-delete-company-database-2025-7)中提到 Replit CEO 公开道歉。还有更多不那么戏剧化、却更常见的问题：Agent 提交低质量 PR、自动化流程写出自信但错误的客服回复、评测体系鼓励“刷榜技巧”而不是生产环境判断力。结论不是 Agent 没用，而是当可靠性系统很原始时，更强的 Agent 反而更危险。

如果 Agent 只能起草一封支持邮件，影响范围很小；如果它能改代码、发邮件、退款或修改客户数据，每增加一项能力，就需要同步增加一层控制面。

## 为什么能力演示会误导产品团队

Agent 演示会压缩现实。它选择干净环境、已知任务和顺利路径。模型拿到正好需要的工具，网页正常加载，用户提示很清楚。很少有人追问：API 返回过期数据怎么办？浏览器会话过期怎么办？模型选错客户记录怎么办？任务从 6 步变成 23 步怎么办？

生产环境里，错误会叠加。一个模型可能非常擅长单步推理，但在长流程里仍然不可靠。[METR 关于长期任务完成能力的研究](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)很有启发，因为它把注意力从孤立 benchmark 题目转向真实任务时长和完成率。[Anthropic 的 Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) 也强调了类似观点：很多强系统不是巨大的全自动循环，而是有明确工具边界、路由、评估和必要人工审核的工作流。

这会改变采用策略。创始人看完演示后可能会问：“为什么不让 Agent 跑完整续费流程？”运营负责人应该问：“哪一步可以自动验证？哪一步需要审批？如果 Agent 错了，恢复计划是什么？”只有第二组问题能经受客户环境考验。

如果你需要先理解 Agent 的基础能力边界，可以阅读我们的 [AI Agent 实用指南](/blog/what-are-ai-agents-practical-guide)。如果你关心运营监控，建议搭配阅读 [可观测 Agent 运营漏斗](/blog/agent-operations-funnel-design)。

## 公开失败通常是控制系统失败

Replit 数据库事件的价值在于，它很容易被误读。更负责任的理解不是“某个厂商不行”或“编码 Agent 都不安全”，而是：在把 Agent 指向生产资产之前，必须先有权限隔离、环境分离、备份和不可逆操作审批。一个拥有生产数据库权限的初级开发者也可能造成损失。差别在于 Agent 行动更快，可能静默误解，还能在事后给出看似合理的解释。

PR 自动化也是同样结构。Agent 打开一个 Pull Request 本身并不危险；但如果它批量打开噪音 PR、打扰维护者、声称修复了没有验证的问题，或把公开曝光当成目标，就会变成运营问题。围绕“AI 写了这个 PR”的公开讨论很容易演化成团队声誉风险，即使没人有恶意。社交媒体总结经常缺少上下文，所以要谨慎引用；但模式不能忽视：只要 Agent 能代表公司说话或行动，质量控制就是产品的一部分。

Benchmark 也会制造更隐蔽的问题。如果团队只为排行榜优化 Agent，它可能学会通过测试，却没有变得更值得信任。这并不意味着 benchmark 无用，而是 benchmark 胜利只能作为起点，不能作为上线许可。内部评测应包含模糊输入、缺失数据、工具失败、限流、权限边界，以及正确行为是停止的任务。

## 可靠性是产品界面，不只是工程细节

当 Agent 触达客户运营时，可靠性会被用户直接感知。一个支持 Agent 即使能即时回答 90% 工单，只要把账号取消流程处理错，用户也不会因为平均速度快而原谅它。一个销售运营 Agent 即使补全 1,000 条线索，只要污染 30 条 CRM 记录，清理成本就会吞掉收益。一个编码 Agent 即使节省两小时脚手架时间，但让评审多花一天看臃肿 diff，也不是胜利。

更实用的指标不是“自治程度”，而是“可信吞吐量”：有多少有用任务完成了，并且没有制造隐藏的下游工作。这个指标迫使团队同时衡量四件事：任务是否真正成功；输出被测试、schema、策略规则或人工审核覆盖的比例；失败后定位、回滚和恢复需要多久；一次错误动作的最大影响范围有多大。

对于构建浏览器或 API Agent 的技术团队，我们的 [Operator 风格网页自动化指南](/blog/operator-agents-api-web-automation-architecture) 里的模式可以直接复用：执行前验证动作、为长流程做检查点、分类错误而不是盲目重试。对于把 Agent 接入内部系统的 SaaS 团队，[MCP 集成策略](/blog/mcp-saas-integration-strategy) 也很相关，因为工具边界经常比模型选择更重要。

## 可靠性优先的 Agent 采用清单

在给 Agent 更多工具之前，先缩小它的失败范围。我的清单故意保守。

**从可逆工作开始。** 草稿、摘要、分类、重复检测和内部研究适合作为早期任务。退款、删除、对外客户消息、权限变更和生产部署需要更严格的闸门。

**使用受限凭证。** 不要因为方便就让 Agent 继承管理员 token。为不同角色创建专用凭证，默认只读，增加按工具限流，并使用独立的 staging 或 sandbox 环境。

**要求结构化输出。** 自由文本很难验证。JSON schema、类型字段、确定性状态码和明确置信度，可以让错误结果在用户看到前被拦住。

**加入停止条件。** 可靠的 Agent 知道何时求助。低置信度、异常工具输出、缺失必填数据、重复重试、不可逆操作，都应触发暂停。

**记录决策，而不只是错误。** 你需要知道哪个 prompt、模型版本、工具响应和中间步骤导致了最终动作。静默失败和 prompt 回归只能靠这些线索调试。

**运行对抗评测。** 加入格式错误输入、模糊请求、过期文档、空搜索结果、权限错误，以及“什么都不做才正确”的任务。好的评测集应该让演示显得尴尬。

**把人工升级设计成特性。** 升级不是失败，而是可靠性机制。告诉人工：发生了什么、Agent 尝试过什么、置信度在哪里下降、现在需要做什么判断。

## 最好的 Agent 会比演示看起来更不“自治”

下一代 Agent 产品大概率会更强。模型会更会规划，工具调用会更顺手，记忆系统也会改进。但这不会消除可靠性工程，反而会提高风险。

我见过表现最好的团队，并不要求 Agent 英雄主义。他们缩小任务范围，监控每一步，验证输出，并在需要判断或责任归属时引入人。它们在发布视频里可能没那么神奇，却能扛住真实客户、混乱数据和周五下午的事故。

原始能力带来关注，可靠性赢得部署。如果你在 2026 年采用 Agent，请先为后者构建。`,
    tw: `# AI Agent 更需要可靠性，而不是單純更強能力

評估 AI Agent 最有價值的問題不是「它能不能做成一次」，而是「在季度最糟糕的那個週二，它能不能安全失敗」。這句話沒有示範影片那麼刺激：Agent 開瀏覽器、寫程式碼、更新 CRM、再把摘要發到 Slack。但對產品營運、創辦人和正在導入 Agent 的開發者來說，真正的回報就在這些看似無聊的可靠性問題裡。

過去幾年已有足夠多公開失敗案例提醒我們。2025 年，一個 [Hacker News 熱帖](https://news.ycombinator.com/item?id=44632270)討論了 Replit Agent 被報導刪除生產資料庫的事件；[Business Insider 後續報導](https://www.businessinsider.com/replit-ceo-apologizes-ai-coding-tool-delete-company-database-2025-7)提到 Replit CEO 公開道歉。還有更多不那麼戲劇化、卻更常見的問題：Agent 提交低品質 PR、自動化流程寫出自信但錯誤的客服回覆、評測體系鼓勵「刷榜技巧」而不是生產環境判斷力。結論不是 Agent 沒用，而是當可靠性系統很原始時，更強的 Agent 反而更危險。

## 為什麼能力示範會誤導產品團隊

Agent 示範會壓縮現實。它選擇乾淨環境、已知任務和順利路徑。模型拿到正好需要的工具，網頁正常載入，使用者提示很清楚。很少有人追問：API 回傳過期資料怎麼辦？瀏覽器工作階段過期怎麼辦？模型選錯客戶記錄怎麼辦？任務從 6 步變成 23 步怎麼辦？

生產環境裡，錯誤會疊加。模型可能擅長單步推理，但在長流程裡仍然不可靠。[METR 關於長期任務完成能力的研究](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)很有啟發，因為它把注意力從孤立 benchmark 題目轉向真實任務時長和完成率。[Anthropic 的 Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) 也強調：很多強系統不是巨大的全自動迴圈，而是有明確工具邊界、路由、評估和必要人工審核的工作流程。

如果你需要先理解 Agent 的基礎能力邊界，可以閱讀我們的 [AI Agent 實用指南](/blog/what-are-ai-agents-practical-guide)。如果你關心營運監控，建議搭配閱讀 [可觀測 Agent 營運漏斗](/blog/agent-operations-funnel-design)。

## 公開失敗通常是控制系統失敗

Replit 資料庫事件的價值在於，它很容易被誤讀。更負責任的理解不是「某個廠商不行」或「編碼 Agent 都不安全」，而是：在把 Agent 指向生產資產之前，必須先有權限隔離、環境分離、備份和不可逆操作審批。人類初級工程師若擁有生產資料庫權限，也可能造成損失。差別在於 Agent 行動更快，可能靜默誤解，還能在事後給出看似合理的解釋。

PR 自動化也是同樣結構。Agent 開一個 Pull Request 本身並不危險；但如果它批量開噪音 PR、打擾維護者、聲稱修好了沒有驗證的問題，或把公開曝光當成目標，就會變成營運問題。只要 Agent 能代表公司說話或行動，品質控制就是產品的一部分。

Benchmark 也會製造更隱蔽的問題。如果團隊只為排行榜最佳化 Agent，它可能學會通過測試，卻沒有變得更值得信任。內部評測應包含模糊輸入、缺失資料、工具失敗、限流、權限邊界，以及正確行為是停止的任務。

## 可靠性是產品介面，不只是工程細節

當 Agent 觸達客戶營運時，可靠性會被使用者直接感知。支援 Agent 即使能即時回答 90% 工單，只要把帳號取消流程處理錯，使用者也不會因為平均速度快而原諒它。銷售營運 Agent 即使補全 1,000 條線索，只要污染 30 條 CRM 記錄，清理成本就會吞掉收益。

更實用的指標不是「自治程度」，而是「可信吞吐量」：有多少有用任務完成了，並且沒有製造隱藏的下游工作。它要求團隊同時衡量任務成功率、驗證覆蓋率、恢復時間和錯誤動作的最大影響範圍。

對於構建瀏覽器或 API Agent 的技術團隊，我們的 [Operator 風格網頁自動化指南](/blog/operator-agents-api-web-automation-architecture) 裡的模式可以直接複用：執行前驗證動作、為長流程做檢查點、分類錯誤而不是盲目重試。對於把 Agent 接入內部系統的 SaaS 團隊，[MCP 整合策略](/blog/mcp-saas-integration-strategy) 也很相關。

## 可靠性優先的 Agent 導入清單

在給 Agent 更多工具之前，先縮小它的失敗範圍。從草稿、摘要、分類、重複偵測和內部研究這類可逆工作開始。退款、刪除、對外客戶訊息、權限變更和生產部署需要更嚴格的閘門。

使用受限憑證，不要讓 Agent 繼承管理員 token。要求結構化輸出，讓 JSON schema、型別欄位、狀態碼和置信度幫你在交付前擋住錯誤。加入停止條件：低置信度、異常工具輸出、缺失必填資料、重複重試或不可逆操作，都應觸發暫停。

記錄決策，而不只是錯誤。你需要知道哪個 prompt、模型版本、工具回應和中間步驟導致了最終動作。還要把人工升級設計成特性：告訴人工發生了什麼、Agent 試過什麼、置信度在哪裡下降、現在需要什麼判斷。

## 最好的 Agent 會比示範看起來更不「自治」

下一代 Agent 產品大概率會更強。模型會更會規劃，工具呼叫會更順手，記憶系統也會改進。但這不會消除可靠性工程，反而會提高風險。

我見過表現最好的團隊，並不要求 Agent 英雄主義。他們縮小任務範圍，監控每一步，驗證輸出，並在需要判斷或責任歸屬時引入人。原始能力帶來關注，可靠性贏得部署。如果你在 2026 年導入 Agent，請先為後者構建。`,
    de: `# KI-Agenten brauchen mehr Zuverlässigkeit als rohe Fähigkeit

Die wichtigste Frage zu einem KI-Agenten lautet nicht: „Kann er die Aufgabe einmal erledigen?“ Sondern: „Kann er am schlechtesten Dienstag des Quartals sicher scheitern?“ Das klingt weniger aufregend als eine Demo, in der ein Agent den Browser öffnet, Code schreibt, das CRM aktualisiert und eine Slack-Zusammenfassung postet. Für Product Operations, Gründer und Entwickler, die Agenten einführen, liegt der echte ROI aber genau in dieser langweiligen Zuverlässigkeitsfrage.

Es gibt inzwischen genug öffentlich diskutierte Fehlschläge. 2025 diskutierte ein viel beachteter Hacker-News-Thread einen Bericht, wonach Replits Agent eine Produktionsdatenbank gelöscht habe; laut Business Insider entschuldigte sich der CEO später öffentlich. Andere Fälle sind weniger dramatisch, aber häufiger: Agenten eröffnen minderwertige Pull Requests, Automationsschleifen schreiben selbstbewusste, aber falsche Support-Antworten, oder Benchmarks belohnen Taktiken, die nicht in Produktionsurteil übersetzen.

Die Lehre ist nicht, dass Agenten nutzlos sind. Sie lautet: Je mehr ein Agent tun darf, desto gefährlicher wird er, wenn die Kontrollsysteme primitiv bleiben.

## Warum Capability-Demos Produktteams täuschen

Demos komprimieren Realität. Die Umgebung ist sauber, die Aufgabe bekannt, der Pfad glücklich. Das Modell bekommt genau die Tools, die es braucht. Die Website lädt, der Prompt ist klar. Selten fragt jemand: Was passiert bei veralteten API-Daten, abgelaufener Browser-Session, falschem Kundendatensatz oder einer Aufgabe, die 23 statt 6 Schritte braucht?

In Produktion häufen sich Fehler. Ein Modell kann bei Einzelschritten stark sein und über lange Workflows trotzdem unzuverlässig werden. METRs Forschung zu langen Aufgaben ist deshalb nützlich: Sie lenkt den Blick von isolierten Benchmark-Fragen auf echte Aufgabendauer und Abschlussraten. Anthropics Building Effective Agents macht einen ähnlichen Punkt: Gute Systeme sind oft keine riesigen autonomen Schleifen, sondern Workflows mit klaren Tool-Grenzen, Routing, Evaluation und menschlicher Prüfung.

Für Grundlagen empfehlen wir unseren [praktischen Guide zu KI-Agenten](/blog/what-are-ai-agents-practical-guide). Für das Betriebsmodell passt der Artikel über [beobachtbare Agent-Operations-Funnels](/blog/agent-operations-funnel-design).

## Öffentliche Fehlschläge sind meist Kontrollfehlschläge

Der Replit-Vorfall ist gerade deshalb wertvoll, weil er leicht missverstanden wird. Die verantwortliche Lesart ist nicht „ein Anbieter ist schlecht“ oder „Coding-Agenten sind unsicher“. Die bessere Lehre: Vor Produktionszugriff braucht ein Agent Berechtigungsgrenzen, getrennte Umgebungen, Backups und Gates für irreversible Aktionen. Ein Junior-Entwickler mit Produktionsrechten kann ebenfalls Schaden anrichten. Ein Agent handelt nur schneller, missversteht leiser und kann danach überzeugend erklären.

Pull-Request-Automation hat dieselbe Form. Ein Agent, der einen PR öffnet, ist nicht automatisch riskant. Ein Agent, der dutzende laute PRs erzeugt, Maintainer pingt oder unbewiesene Fixes behauptet, wird zum Operations-Problem. Wenn ein Agent im Namen des Unternehmens spricht oder handelt, ist Qualitätskontrolle Teil des Produkts.

Benchmarks erzeugen eine weichere Variante. Ein Agent kann lernen, Tests zu bestehen, ohne in chaotischen Workflows vertrauenswürdiger zu werden. Benchmark-Erfolge sind ein Startsignal, keine Launch-Freigabe. Interne Evals sollten Mehrdeutigkeit, fehlende Daten, Tool-Ausfälle, Rate Limits, Berechtigungsgrenzen und Aufgaben enthalten, bei denen Stoppen korrekt ist.

## Zuverlässigkeit ist Produktoberfläche

Sobald Agenten Kundenprozesse berühren, sehen Nutzer die Zuverlässigkeit direkt. Ein Support-Agent, der 90 Prozent der Tickets sofort beantwortet, aber Kündigungen falsch behandelt, wird nicht nach Durchschnittsgeschwindigkeit beurteilt. Ein Sales-Ops-Agent, der 1.000 Leads anreichert, aber 30 CRM-Datensätze beschädigt, erzeugt mehr Cleanup als Nutzen.

Die bessere Kennzahl ist vertrauenswürdiger Durchsatz: Wie viele nützliche Aufgaben werden abgeschlossen, ohne versteckte Folgearbeit zu schaffen? Dafür müssen Teams Erfolgsrate, Verifikationsabdeckung, Recovery-Zeit und Blast Radius gemeinsam messen.

Für Browser- oder API-Agenten gelten die Muster aus unserem [Operator-Web-Automation-Guide](/blog/operator-agents-api-web-automation-architecture): Aktionen vor Ausführung validieren, lange Workflows checkpointen und Fehler klassifizieren statt blind zu retryen. Für SaaS-Teams ist auch die [MCP-Integrationsstrategie](/blog/mcp-saas-integration-strategy) relevant, weil Tool-Grenzen oft wichtiger sind als Modellwahl.

## Eine Reliability-first-Checkliste

Beginnen Sie mit reversibler Arbeit: Entwürfe, Zusammenfassungen, Klassifikation, Dublettenprüfung und interne Recherche. Rückerstattungen, Löschungen, externe Kundennachrichten, Berechtigungsänderungen und Deployments brauchen strengere Gates.

Nutzen Sie eng begrenzte Credentials statt Admin-Tokens. Fordern Sie strukturierte Outputs, damit Schemas, typisierte Felder, Statuscodes und Confidence-Werte geprüft werden können. Definieren Sie Stop-Bedingungen für niedrige Confidence, unerwartete Tool-Ausgaben, fehlende Pflichtdaten, wiederholte Retries und irreversible Aktionen.

Loggen Sie Entscheidungen, nicht nur Fehler. Sie müssen Prompt, Modellversion, Tool-Antworten und Zwischenschritte rekonstruieren können. Und behandeln Sie menschliche Eskalation als Feature: Zeigen Sie, was passiert ist, was der Agent versucht hat, wo Confidence fiel und welche Entscheidung nötig ist.

## Die besten Agenten wirken weniger autonom

Die nächste Agentenwelle wird leistungsfähiger sein. Modelle planen besser, Tools werden leichter nutzbar, Memory-Systeme reifen. Das ersetzt Reliability Engineering nicht; es erhöht den Einsatz.

Die besten Teams verlangen keine Heldentaten. Sie schneiden Aufgaben enger, instrumentieren jeden Schritt, validieren Outputs und holen Menschen dort dazu, wo Urteil oder Verantwortung zählen. Rohe Fähigkeit bringt Aufmerksamkeit. Zuverlässigkeit verdient Deployment.`,
    es: `# Los agentes de IA necesitan más fiabilidad que capacidad bruta

La pregunta más útil sobre un agente de IA no es “¿puede hacer la tarea una vez?”, sino “¿puede fallar de forma segura en el peor martes del trimestre?”. Suena menos emocionante que una demo donde el agente abre un navegador, escribe código, actualiza el CRM y publica un resumen en Slack. Pero para operaciones de producto, founders y desarrolladores que adoptan agentes, el ROI real vive en esa pregunta aburrida.

Ya hay suficientes fallos públicos para ver el patrón. En 2025, un hilo muy comentado de Hacker News trató un caso reportado en el que el agente de Replit borró una base de datos de producción; Business Insider informó después que el CEO de Replit se disculpó públicamente. Otros incidentes son menos dramáticos pero más frecuentes: agentes que abren pull requests de baja calidad, automatizaciones que escriben respuestas de soporte seguras pero incorrectas, o benchmarks que premian tácticas que no se traducen en criterio de producción.

La lección no es que los agentes no sirvan. Es que un agente más capaz se vuelve más peligroso cuando los sistemas de control siguen siendo primitivos.

## Por qué las demos de capacidad engañan

Las demos comprimen la realidad. Usan un entorno limpio, una tarea conocida y el camino feliz. El modelo tiene las herramientas exactas, la web carga y el prompt es claro. Casi nadie pregunta qué ocurre cuando la API devuelve datos obsoletos, expira la sesión del navegador, el agente elige el registro de cliente equivocado o la tarea pasa de 6 pasos a 23.

En producción aparece el error compuesto. Un modelo puede razonar muy bien en un paso y aun así ser poco fiable en un flujo largo. El trabajo de METR sobre tareas largas es útil porque desplaza la atención desde preguntas aisladas de benchmark hacia duración y finalización de tareas reales. La guía Building Effective Agents de Anthropic hace un punto parecido: muchos sistemas sólidos no son bucles autónomos gigantes, sino workflows con límites de herramientas, routing, evaluación y revisión humana.

Para una base más amplia, lee nuestra [guía práctica de agentes de IA](/blog/what-are-ai-agents-practical-guide). Para el modelo operativo, acompáñala con el artículo sobre [funnels observables de operaciones con agentes](/blog/agent-operations-funnel-design).

## Los fallos reportados suelen ser fallos de control

El incidente de Replit es útil porque se puede malinterpretar fácilmente. La lectura responsable no es “un proveedor es malo” ni “los agentes de código son inseguros”. La conclusión más segura es que los sistemas agentic necesitan permisos, separación de entornos, backups y gates para acciones irreversibles antes de tocar producción.

La automatización de pull requests tiene la misma forma. Un agente que abre un PR no es peligroso por sí mismo. Un agente que abre docenas de PRs ruidosos, molesta a maintainers o afirma arreglos que no verificó se convierte en un problema de operaciones. Si el agente puede hablar o actuar en nombre de la empresa, el control de calidad forma parte del producto.

Los benchmarks pueden crear una versión más suave del problema. Ganar un leaderboard no demuestra que el agente sea confiable en workflows desordenados. Tus evals internas deben incluir entradas ambiguas, datos faltantes, fallos de herramientas, rate limits, límites de permisos y tareas donde la conducta correcta es detenerse.

## La fiabilidad es una superficie de producto

Cuando los agentes tocan operaciones de clientes, la fiabilidad se vuelve visible. Un agente de soporte que responde el 90% de tickets al instante pero gestiona mal cancelaciones no será juzgado por su velocidad media. Un agente de ventas que enriquece 1.000 leads pero corrompe 30 registros del CRM crea trabajo que borra el beneficio.

La métrica práctica no es autonomía, sino throughput confiable: cuántas tareas útiles llegan a completarse sin crear trabajo oculto aguas abajo. Eso obliga a medir tasa de éxito real, cobertura de verificación, tiempo de recuperación y radio máximo de daño.

Para agentes de navegador o API, aplica los patrones de nuestra [guía de automatización web estilo Operator](/blog/operator-agents-api-web-automation-architecture): validar acciones antes de ejecutarlas, guardar checkpoints y clasificar errores en vez de reintentar a ciegas. Para SaaS, la [estrategia de integración MCP](/blog/mcp-saas-integration-strategy) también importa porque los límites de herramientas suelen pesar más que el modelo elegido.

## Checklist de adopción reliability-first

Empieza con trabajo reversible: borradores, resúmenes, clasificación, detección de duplicados e investigación interna. Reembolsos, borrados, mensajes externos, cambios de permisos y despliegues necesitan gates más estrictos.

Usa credenciales con alcance limitado, no tokens de administrador. Exige salidas estructuradas con schemas, campos tipados, códigos de estado y confianza explícita. Define condiciones de parada para baja confianza, respuestas inesperadas de herramientas, datos obligatorios ausentes, reintentos repetidos o acciones irreversibles.

Registra decisiones, no solo errores. Necesitas reconstruir prompt, versión del modelo, respuesta de herramientas y pasos intermedios. Diseña la escalación humana como una función: muestra qué ocurrió, qué intentó el agente, dónde cayó la confianza y qué decisión falta.

## Los mejores agentes parecerán menos autónomos

La próxima ola será más capaz. Los modelos planificarán mejor, las herramientas serán más fáciles de llamar y la memoria mejorará. Eso no elimina la ingeniería de fiabilidad; sube las apuestas.

Los mejores equipos no piden heroísmo. Reducen el alcance, instrumentan cada paso, validan salidas y usan humanos donde importan juicio y responsabilidad. La capacidad bruta llama la atención. La fiabilidad gana despliegues.`,
    fr: `# Les agents IA ont plus besoin de fiabilité que de puissance brute

La meilleure question à poser sur un agent IA n’est pas « peut-il faire la tâche une fois ? », mais « peut-il échouer sans danger le pire mardi du trimestre ? ». C’est moins spectaculaire qu’une démo où l’agent ouvre un navigateur, écrit du code, met à jour le CRM et poste un résumé sur Slack. Pourtant, pour les équipes product ops, les fondateurs et les développeurs qui adoptent des agents, le vrai ROI se trouve dans cette question ennuyeuse.

Les échecs publics sont désormais assez nombreux pour voir le motif. En 2025, un fil Hacker News très commenté a discuté d’un cas rapporté où l’agent de Replit aurait supprimé une base de données de production ; Business Insider a ensuite rapporté que le CEO de Replit s’était excusé publiquement. D’autres incidents sont moins spectaculaires mais plus fréquents : pull requests de faible qualité, réponses support confiantes mais fausses, benchmarks qui récompensent des tactiques sans valeur opérationnelle.

La leçon n’est pas que les agents sont inutiles. Elle est que des agents plus capables deviennent plus dangereux lorsque les contrôles restent primitifs.

## Pourquoi les démos de capacité trompent les équipes produit

Les démos compressent la réalité. Elles choisissent un environnement propre, une tâche connue et un chemin heureux. Le modèle a les bons outils, le site charge, le prompt est clair. On demande rarement ce qui arrive si l’API renvoie des données périmées, si la session navigateur expire, si le mauvais client est sélectionné ou si la tâche passe de 6 à 23 étapes.

En production, les erreurs se composent. Un modèle peut être excellent sur une étape et peu fiable sur un long workflow. Les travaux de METR sur les tâches longues sont utiles car ils déplacent l’attention des questions de benchmark isolées vers la durée et la complétion réelles. Le guide Building Effective Agents d’Anthropic va dans le même sens : beaucoup de bons systèmes sont des workflows avec limites d’outils, routage, évaluation et revue humaine, pas des boucles autonomes géantes.

Pour les bases, lisez notre [guide pratique des agents IA](/blog/what-are-ai-agents-practical-guide). Pour l’exploitation, complétez avec l’article sur les [funnels observables d’opérations agentiques](/blog/agent-operations-funnel-design).

## Les échecs rapportés sont souvent des échecs de contrôle

L’incident Replit est utile parce qu’il peut être mal compris. La lecture responsable n’est pas « tel fournisseur est mauvais » ou « les agents de code sont dangereux ». La leçon plus solide : avant l’accès production, il faut permissions limitées, environnements séparés, sauvegardes et validation des actions irréversibles.

L’automatisation de pull requests suit la même logique. Un agent qui ouvre un PR n’est pas dangereux en soi. Un agent qui ouvre des dizaines de PRs bruyants, sollicite des mainteneurs ou prétend avoir corrigé sans vérifier devient un problème opérationnel. Si un agent parle ou agit au nom de l’entreprise, le contrôle qualité fait partie du produit.

Les benchmarks créent une version plus douce du problème. Une victoire de leaderboard n’est pas une autorisation de mise en production. Vos évaluations internes doivent inclure demandes ambiguës, données manquantes, pannes d’outils, rate limits, limites de permissions et tâches où la bonne réponse est de s’arrêter.

## La fiabilité est une surface produit

Quand les agents touchent les opérations client, la fiabilité devient visible. Un agent support qui répond instantanément à 90 % des tickets mais gère mal les annulations ne sera pas jugé sur sa vitesse moyenne. Un agent sales ops qui enrichit 1 000 leads mais corrompt 30 fiches CRM crée un travail de nettoyage qui annule le gain.

La métrique utile n’est pas l’autonomie, mais le débit fiable : combien de tâches utiles sont terminées sans créer de travail caché. Cela oblige à mesurer succès réel, couverture de vérification, temps de récupération et rayon maximal de dégâts.

Pour les agents navigateur ou API, les patterns de notre [guide d’automatisation web style Operator](/blog/operator-agents-api-web-automation-architecture) s’appliquent : valider les actions, checkpoint les workflows longs et classifier les erreurs au lieu de retry à l’aveugle. Pour le SaaS, la [stratégie d’intégration MCP](/blog/mcp-saas-integration-strategy) compte aussi, car les limites d’outils pèsent souvent plus que le modèle.

## Checklist reliability-first

Commencez par du travail réversible : brouillons, résumés, classification, détection de doublons, recherche interne. Remboursements, suppressions, messages externes, changements de permissions et déploiements demandent des portes plus strictes.

Utilisez des identifiants à portée limitée, pas des tokens admin. Exigez des sorties structurées avec schémas, champs typés, statuts déterministes et confiance explicite. Définissez des conditions d’arrêt : faible confiance, sortie outil inattendue, donnée obligatoire manquante, retries répétés ou action irréversible.

Journalisez les décisions, pas seulement les erreurs. Il faut reconstruire prompt, version du modèle, réponses outils et étapes intermédiaires. Concevez l’escalade humaine comme une fonctionnalité : montrez ce qui s’est passé, ce que l’agent a tenté, où la confiance a baissé et quelle décision reste à prendre.

## Les meilleurs agents paraîtront moins autonomes

La prochaine vague sera plus capable. Les modèles planifieront mieux, les outils seront plus simples à appeler et la mémoire progressera. Cela ne supprime pas l’ingénierie de fiabilité ; cela augmente l’enjeu.

Les meilleures équipes ne demandent pas aux agents d’être héroïques. Elles réduisent le périmètre, instrumentent chaque étape, valident les sorties et impliquent des humains quand jugement ou responsabilité comptent. La puissance attire l’attention. La fiabilité obtient le déploiement.`,
    jp: `# AIエージェントに必要なのは生の能力より信頼性

AIエージェントについて最も重要な問いは、「一度そのタスクを実行できるか」ではありません。「四半期で最悪の火曜日に、安全に失敗できるか」です。これは、エージェントがブラウザを開き、コードを書き、CRMを更新し、Slackに要約を投稿するデモほど派手ではありません。しかし、プロダクト運用、創業者、エージェントを導入する開発者にとって、本当のROIはこの地味な信頼性の問いにあります。

公開された失敗例は、すでに十分な警告になっています。2025年には、Replitのエージェントが本番データベースを削除したと報じられた件がHacker Newsで大きく議論され、Business Insiderはその後、ReplitのCEOが公に謝罪したと報じました。ほかにも、低品質なPull Request、確信に満ちているが誤ったサポート返信、実運用の判断力につながらないベンチマーク最適化など、より日常的な失敗があります。

教訓は、エージェントが役に立たないということではありません。信頼性の仕組みが未熟なまま能力だけが増えると、危険も増えるということです。

## なぜ能力デモは誤解を生むのか

デモは現実を圧縮します。環境はきれいで、タスクは既知で、ハッピーパスだけが選ばれます。モデルには必要なツールがあり、サイトは正常に読み込まれ、プロンプトは明確です。APIが古いデータを返したら？ブラウザセッションが切れたら？顧客レコードを間違えたら？6ステップのはずが23ステップになったら？こうした問いはあまり出てきません。

本番ではエラーが積み重なります。モデルは単一ステップで優秀でも、長いワークフローでは不安定になり得ます。METRの長時間タスク研究は、孤立したベンチマークではなく、実タスクの所要時間と完了率に焦点を移す点で有用です。AnthropicのBuilding Effective Agentsも同じ実践的な点を示しています。強いシステムの多くは巨大な自律ループではなく、明確なツール境界、ルーティング、評価、人間レビューを持つワークフローです。

基礎を確認したい場合は、[AIエージェント実践ガイド](/blog/what-are-ai-agents-practical-guide)を参照してください。運用モデルについては、[観測可能なエージェント運用ファネル](/blog/agent-operations-funnel-design)が近い内容です。

## 公開された失敗の多くは制御の失敗

Replitの件は、誤解されやすいからこそ重要です。責任ある読み方は、「特定ベンダーが悪い」でも「コーディングエージェントは危険」でもありません。本番資産に触れる前に、権限分離、環境分離、バックアップ、不可逆操作のゲートが必要だということです。本番DB権限を持つ新人開発者も被害を出せます。違いは、エージェントはより速く行動し、静かに誤解し、事後にもっともらしい説明を生成できる点です。

PR自動化も同じ構造です。PRを開くこと自体は危険ではありません。しかし、大量のノイズPRを出し、メンテナに通知し、検証していない修正を主張するなら、それは運用問題です。エージェントが会社の名前で話したり行動したりできるなら、品質管理は製品の一部です。

ベンチマークも似た問題を作ります。リーダーボードで勝っても、乱雑なワークフローで信頼できるとは限りません。内部評価には、曖昧な入力、欠損データ、ツール障害、レート制限、権限境界、そして正しい行動が停止であるタスクを含めるべきです。

## 信頼性はプロダクトの表面である

エージェントが顧客運用に触れると、信頼性はユーザーに見えます。サポートエージェントが90%のチケットに即答しても、解約処理を間違えれば平均速度では評価されません。営業運用エージェントが1,000件のリードを補完しても、30件のCRMレコードを壊せば、後処理で利益は消えます。

実用的な指標は自律性ではなく、信頼できるスループットです。隠れた下流作業を作らずに、どれだけ有用なタスクが完了したか。そのためには、成功率、検証カバレッジ、復旧時間、失敗時の最大影響範囲を同時に測る必要があります。

ブラウザやAPIエージェントを作るチームには、[Operator型Web自動化ガイド](/blog/operator-agents-api-web-automation-architecture)の設計が直接役立ちます。実行前のアクション検証、長いワークフローのチェックポイント、盲目的リトライではなくエラー分類です。SaaSチームには[MCP統合戦略](/blog/mcp-saas-integration-strategy)も関連します。

## 信頼性優先の導入チェックリスト

まず可逆な作業から始めます。下書き、要約、分類、重複検出、内部調査は初期タスクに向いています。返金、削除、外部顧客メッセージ、権限変更、本番デプロイには厳しいゲートが必要です。

管理者トークンではなく、スコープを限定した認証情報を使います。構造化出力を要求し、スキーマ、型付きフィールド、状態コード、明示的な信頼度で検証できるようにします。低信頼度、予期しないツール出力、必須データ欠落、繰り返しリトライ、不可逆操作では停止条件を設けます。

エラーだけでなく意思決定を記録します。プロンプト、モデルバージョン、ツール応答、中間ステップを再構成できる必要があります。人間へのエスカレーションは失敗ではなく機能です。何が起きたか、何を試したか、どこで信頼度が落ちたか、何を判断すべきかを示します。

## 優れたエージェントはデモより自律的に見えない

次の世代のエージェントはさらに高性能になるでしょう。モデルは計画がうまくなり、ツール呼び出しは簡単になり、記憶システムも改善します。しかし信頼性工学は不要になりません。むしろ重要性が増します。

優れたチームはエージェントに英雄的行動を求めません。タスクを狭め、各ステップを計測し、出力を検証し、判断や責任が必要なところで人間を入れます。生の能力は注目を集めます。信頼性は本番導入を勝ち取ります。`,
    pt: `# Agentes de IA precisam mais de confiabilidade do que capacidade bruta

A pergunta mais útil sobre um agente de IA não é “ele consegue fazer a tarefa uma vez?”, mas “ele consegue falhar com segurança na pior terça-feira do trimestre?”. Isso soa menos empolgante do que uma demo em que o agente abre o navegador, escreve código, atualiza o CRM e posta um resumo no Slack. Mas, para operações de produto, founders e desenvolvedores adotando agentes, o ROI real está nessa pergunta chata de confiabilidade.

Já vimos falhas públicas suficientes para reconhecer o padrão. Em 2025, uma discussão popular no Hacker News tratou de um caso reportado em que o agente da Replit apagou um banco de dados de produção; segundo o Business Insider, o CEO da Replit pediu desculpas publicamente depois. Outros incidentes são menos dramáticos, mas mais comuns: agentes abrindo pull requests ruins, automações escrevendo respostas de suporte confiantes porém erradas, ou benchmarks premiando táticas que não viram julgamento de produção.

A lição não é que agentes são inúteis. É que agentes mais capazes ficam mais perigosos quando os controles continuam primitivos.

## Por que demos de capacidade enganam

Demos comprimem a realidade. Elas escolhem ambiente limpo, tarefa conhecida e caminho feliz. O modelo tem as ferramentas certas, o site carrega e o prompt é claro. Pouca gente pergunta o que acontece quando a API devolve dado velho, a sessão do navegador expira, o agente escolhe o cliente errado ou a tarefa vira 23 passos em vez de 6.

Em produção, erros se acumulam. Um modelo pode ser ótimo em um passo e pouco confiável em um fluxo longo. O trabalho da METR sobre tarefas longas é útil porque muda o foco de perguntas isoladas de benchmark para duração e conclusão reais. O guia Building Effective Agents da Anthropic faz um ponto parecido: bons sistemas muitas vezes são workflows com limites de ferramentas, roteamento, avaliação e revisão humana, não loops autônomos gigantes.

Para a base, veja nosso [guia prático de agentes de IA](/blog/what-are-ai-agents-practical-guide). Para operação, leia também o artigo sobre [funis observáveis de operações com agentes](/blog/agent-operations-funnel-design).

## Falhas reportadas costumam ser falhas de controle

O caso Replit é útil porque é fácil entendê-lo errado. A leitura responsável não é “um fornecedor é ruim” ou “agentes de código são inseguros”. A conclusão melhor é que sistemas agentic precisam de permissões, separação de ambientes, backups e gates para ações irreversíveis antes de tocar produção.

Automação de pull requests tem o mesmo formato. Um agente abrir um PR não é arriscado por si só. Um agente abrir dezenas de PRs ruidosos, chamar maintainers ou afirmar correções que não verificou vira problema operacional. Se o agente pode falar ou agir em nome da empresa, controle de qualidade é parte do produto.

Benchmarks criam uma versão mais suave do problema. Vencer leaderboard não prova confiança em workflows bagunçados. Suas evals internas devem incluir pedidos ambíguos, dados ausentes, falhas de ferramentas, rate limits, limites de permissão e tarefas em que a resposta correta é parar.

## Confiabilidade é superfície de produto

Quando agentes tocam operações com clientes, confiabilidade fica visível. Um agente de suporte que responde 90% dos tickets instantaneamente, mas erra cancelamentos, não será julgado pela velocidade média. Um agente de vendas que enriquece 1.000 leads, mas corrompe 30 registros no CRM, cria limpeza que apaga o ganho.

A métrica prática não é autonomia, e sim throughput confiável: quantas tarefas úteis são concluídas sem criar trabalho oculto depois. Isso exige medir sucesso real, cobertura de verificação, tempo de recuperação e raio máximo de dano.

Para agentes de navegador ou API, os padrões do nosso [guia de automação web estilo Operator](/blog/operator-agents-api-web-automation-architecture) se aplicam: validar ações antes da execução, criar checkpoints e classificar erros em vez de tentar de novo às cegas. Para SaaS, a [estratégia de integração MCP](/blog/mcp-saas-integration-strategy) também importa.

## Checklist reliability-first

Comece com trabalho reversível: rascunhos, resumos, classificação, detecção de duplicados e pesquisa interna. Reembolsos, exclusões, mensagens externas, mudanças de permissão e deploys precisam de gates mais rígidos.

Use credenciais com escopo limitado, não tokens admin. Exija saídas estruturadas com schemas, campos tipados, códigos de status e confiança explícita. Defina condições de parada para baixa confiança, resposta inesperada de ferramenta, dado obrigatório ausente, retries repetidos e ações irreversíveis.

Registre decisões, não só erros. Você precisa reconstruir prompt, versão do modelo, respostas de ferramentas e passos intermediários. Trate escalonamento humano como recurso: mostre o que aconteceu, o que o agente tentou, onde a confiança caiu e qual decisão falta.

## Os melhores agentes parecerão menos autônomos

A próxima onda será mais capaz. Modelos planejarão melhor, ferramentas serão mais fáceis de chamar e memória vai melhorar. Isso não elimina engenharia de confiabilidade; aumenta o risco.

Os melhores times não pedem heroísmo. Eles reduzem escopo, instrumentam cada passo, validam saídas e usam humanos onde julgamento e responsabilidade importam. Capacidade bruta chama atenção. Confiabilidade conquista produção.`,
    ru: `# AI-агентам важнее надёжность, чем сырая мощность

Самый полезный вопрос об AI-агенте звучит не так: «Может ли он выполнить задачу один раз?» Гораздо важнее: «Может ли он безопасно ошибиться в самый плохой вторник квартала?» Это менее эффектно, чем демо, где агент открывает браузер, пишет код, обновляет CRM и отправляет резюме в Slack. Но для продуктовых операций, основателей и разработчиков реальная окупаемость живёт именно в этой скучной теме надёжности.

Публичных сбоев уже достаточно, чтобы увидеть паттерн. В 2025 году на Hacker News широко обсуждали сообщение о том, что агент Replit удалил production-базу данных; Business Insider позже писал, что CEO Replit публично извинился. Другие случаи менее драматичны, но чаще встречаются: агенты открывают низкокачественные pull request, автоматизация пишет уверенные, но неверные ответы поддержки, а бенчмарки поощряют тактики, которые не превращаются в производственную надёжность.

Вывод не в том, что агенты бесполезны. Вывод в том, что более способный агент становится опаснее, если системы контроля остаются примитивными.

## Почему демо способностей вводят в заблуждение

Демо сжимают реальность. Среда чистая, задача известная, путь счастливый. У модели есть нужные инструменты, сайт загружается, prompt понятен. Редко спрашивают: что будет, если API вернёт устаревшие данные, браузерная сессия истечёт, агент выберет не того клиента или задача растянется с 6 шагов до 23?

В production ошибки накапливаются. Модель может быть сильной на одном шаге и ненадёжной в длинном workflow. Исследования METR о длинных задачах полезны, потому что переводят внимание с отдельных benchmark-вопросов на длительность и завершение реальных задач. Руководство Anthropic Building Effective Agents говорит о том же: сильные системы часто являются workflow с границами инструментов, маршрутизацией, оценкой и human review, а не гигантскими автономными петлями.

Для основы посмотрите наш [практический гид по AI-агентам](/blog/what-are-ai-agents-practical-guide). Для операционной модели полезна статья про [наблюдаемые воронки agent operations](/blog/agent-operations-funnel-design).

## Публичные сбои обычно являются сбоями контроля

История Replit полезна именно потому, что её легко понять неправильно. Ответственная интерпретация не «один вендор плохой» и не «coding agents опасны». Более точный урок: перед доступом к production нужны ограничения прав, разделение сред, backups и gates для необратимых действий.

Автоматизация pull request устроена так же. Агент, который открывает PR, не опасен сам по себе. Агент, который открывает десятки шумных PR, пингует maintainers или заявляет о непроверенных исправлениях, становится операционной проблемой. Если агент говорит или действует от имени компании, контроль качества является частью продукта.

Бенчмарки создают мягкую версию той же проблемы. Победа в leaderboard не доказывает доверие в грязных workflow. Внутренние evals должны включать неоднозначные запросы, отсутствующие данные, сбои инструментов, rate limits, границы прав и задачи, где правильное поведение — остановиться.

## Надёжность — это продуктовая поверхность

Когда агенты касаются клиентских операций, надёжность становится видимой. Support-агент, который мгновенно отвечает на 90% тикетов, но ошибается в отменах аккаунтов, не будет оценён по средней скорости. Sales-ops агент, который обогащает 1 000 лидов, но портит 30 записей CRM, создаёт cleanup, который съедает выгоду.

Практичная метрика — не автономность, а доверенный throughput: сколько полезных задач завершено без скрытой последующей работы. Это заставляет измерять реальный success rate, покрытие проверками, время восстановления и максимальный blast radius.

Для browser и API agents применимы паттерны из нашего [гайда по Operator-style web automation](/blog/operator-agents-api-web-automation-architecture): валидировать действия до выполнения, делать checkpoints длинных workflow и классифицировать ошибки вместо слепых retry. Для SaaS-команд также важна [стратегия MCP-интеграции](/blog/mcp-saas-integration-strategy).

## Reliability-first checklist

Начинайте с обратимой работы: черновики, summaries, классификация, поиск дублей и внутренняя аналитика. Refunds, удаления, внешние сообщения клиентам, изменения прав и deploy требуют более строгих gates.

Используйте scoped credentials, а не admin tokens. Требуйте структурированные outputs со schemas, типизированными полями, статусами и явной confidence. Определите stop conditions для низкой confidence, неожиданного tool output, отсутствующих обязательных данных, повторных retries и необратимых действий.

Логируйте решения, а не только ошибки. Нужно восстановить prompt, версию модели, ответы инструментов и промежуточные шаги. Human escalation должна быть функцией: покажите, что произошло, что агент пробовал, где confidence упала и какое решение нужно.

## Лучшие агенты будут выглядеть менее автономными

Следующая волна агентов станет способнее. Модели будут лучше планировать, инструменты проще вызывать, память улучшится. Это не отменяет reliability engineering; это повышает ставки.

Лучшие команды не требуют от агентов героизма. Они сужают задачу, инструментируют каждый шаг, валидируют outputs и подключают людей там, где важны суждение и ответственность. Сырая способность привлекает внимание. Надёжность получает production-доступ.`,
  },
  author: 'Toolsify AI',
  date: '2026-05-16',
  category: 'Product & Ops',
  tags: [
    'AI agents',
    'agent reliability',
    'product operations',
    'AI automation',
    'human in the loop',
    'agent observability',
    'AI agent failure examples',
    'reliable AI agent workflows',
    'agent operations checklist',
    'AI automation risk management',
    'production AI agents',
  ],
};

export default postAiAgentsNeedReliabilityMoreThanCapability;
