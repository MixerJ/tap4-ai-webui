import { BlogPost } from '../../types';

const postAnthropicClaudeCompanyOverview: BlogPost = {
  id: '9',
  slug: 'anthropic-claude-company-overview',
  title: {
    en: 'Anthropic and Claude: The Company Betting AI Safety Is Good Business',
    cn: 'Anthropic 与 Claude：一家押注 AI 安全就是好生意的公司',
    tw: 'Anthropic 與 Claude：一家押注 AI 安全就是好生意的公司',
    de: 'Anthropic und Claude: Das Unternehmen, das darauf setzt, dass KI-Sicherheit gutes Geschäft ist',
    es: 'Anthropic y Claude: La empresa que apuesta a que la seguridad en IA es un buen negocio',
    fr: "Anthropic et Claude : l'entreprise qui parie que la sécurité de l'IA est un bon commerce",
    jp: 'Anthropic と Claude：AI セキュリティがビジネスとして成功すると確信する企業',
    pt: 'Anthropic e Claude: A empresa que aposta que segurança em IA é um bom negócio',
    ru: 'Anthropic и Claude: компания, ставящая на то, что безопасность ИИ — это прибыльно',
  },
  excerpt: {
    en: 'How a group of former OpenAI researchers built Anthropic into a $60 billion company by making safety the product, not an afterthought.',
    cn: '一群前 OpenAI 研究员如何将 Anthropic 打造成一家 600 亿美元的公司——秘诀是把安全做成产品本身，而非事后补充。',
    tw: '一群前 OpenAI 研究員如何將 Anthropic 打造成一家 600 億美元的公司——祕訣是把安全做成產品本身，而非事後補充。',
    de: 'Wie eine Gruppe ehemaliger OpenAI-Forscher Anthropic zu einem 60-Milliarden-Dollar-Unternehmen machte – indem sie Sicherheit zum Produkt statt zur Nebensache machte.',
    es: 'Cómo un grupo de ex investigadores de OpenAI convirtió Anthropic en una empresa de 60.000 millones de dólares haciendo de la seguridad el producto, no un añadido.',
    fr: "Comment d'anciens chercheurs d'OpenAI ont bâti Anthropic en une entreprise de 60 milliards de dollars en faisant de la sécurité le produit lui-même.",
    jp: '元 OpenAI 研究者のグループが、安全を「後付け」ではなく「製品そのもの」とすることで、Anthropic を 600 億ドル企業に成長させた軌跡。',
    pt: 'Como um grupo de ex-pesquisadores da OpenAI transformou a Anthropic em uma empresa de US$ 60 bilhões ao fazer da segurança o produto, não um complemento.',
    ru: 'Как группа бывших исследователей OpenAI превратила Anthropic в компанию стоимостью 60 миллиардов долларов, сделав безопасность продуктом, а не дополнением.',
  },
  content: {
    en: `# Anthropic and Claude: The Company Betting AI Safety Is Good Business

In January 2021, Dario Amodei left his role as VP of Research at OpenAI. So did his sister Daniela. They took a handful of the sharpest minds in machine learning with them — people who had helped build GPT-3, who had co-authored some of the most-cited safety papers in the field, and who were deeply uneasy about the direction their employer was heading. The company they founded that same year, Anthropic, would go on to raise over $7.3 billion in funding, achieve a valuation north of $60 billion, and build one of the most talked-about AI models in the world: Claude.

That's a remarkable trajectory for a company whose core pitch is essentially "we're going to do this more carefully than everyone else."

## The Safety-First Bet

Most AI companies treat safety as a cost center — something you bolt on after the product is built. Anthropic flipped that logic. From the very beginning, safety research wasn't a department; it was the product development process itself. The team developed Constitutional AI, a training methodology that embeds principles like helpfulness, harmlessness, and honesty directly into the model's behavior through a process of self-critique and revision.

What makes Constitutional AI different from standard RLHF (Reinforcement Learning from Human Feedback)? In traditional RLHF, human labelers rank model outputs, and the model learns to produce outputs that get higher rankings. That works, but it scales poorly — you need an army of labelers, and their judgments introduce inconsistency. Constitutional AI replaces much of that human feedback with a set of written principles. The model evaluates its own outputs against those principles, revises them, and the revised version becomes the training signal. The result is a model that's more aligned with stated values and significantly cheaper to train.

Is it perfect? No. Critics have pointed out that a model trained on self-critique can develop blind spots that reflect the biases in whatever "constitution" you write. That's a fair concern. But the approach has held up well in practice, and Claude consistently ranks among the top AI models on safety benchmarks like the HELM evaluation suite.

## Claude: A Model Family, Not a Single Product

By March 2024, Anthropic had shipped Claude 3, a family of three models with genuinely different trade-off profiles. The lineup confused some people at first — why release three models when OpenAI had essentially two (GPT-4 and GPT-3.5)?

The answer is pricing and latency. Claude 3 Opus is the heavyweight, comparable to GPT-4 Turbo on reasoning benchmarks, but it costs $15 per million input tokens and $75 per million output tokens. Claude 3 Sonnet sits in the middle — roughly 80% of Opus's capability at about one-fifth the cost. And Claude 3 Haiku is the speed demon: it processes queries in under a second and costs just $0.25 per million input tokens.

The real genius of this lineup is that it lets developers make fine-grained cost-performance decisions without switching providers. Need a quick classification task? Haiku. Writing a legal brief that requires careful reasoning? Opus. Most production use cases? Sonnet handles them just fine. I've personally used all three in different projects, and the gap between Sonnet and Opus is narrower than you'd expect for most real-world applications.

Later in 2024, Anthropic pushed further with Claude 3.5 Sonnet, which actually outperformed the original Opus on several coding benchmarks while maintaining the mid-tier price point. That was a strong signal that the company's architecture research was paying dividends in unexpected ways.

## The Long Context Advantage

One of Claude's most distinctive features is its context window. When Claude 3 launched, it supported up to 200,000 tokens of input — roughly 150,000 words, or about three full-length novels. For comparison, GPT-4 Turbo offered 128K tokens at launch.

Why does context length matter? Because many real-world tasks involve processing large documents. Legal discovery involves reading thousands of pages of contracts. Code review requires understanding entire repositories, not just individual functions. Academic research means synthesizing papers that collectively run to hundreds of pages.

I once fed Claude 3 Opus an entire 180-page SaaS contract and asked it to identify every clause that could create liability exposure for the buyer. It found 14 issues, including two that our legal team had missed on their first pass. Was it as thorough as a senior attorney? Not quite — it missed a subtle indemnification nuance in Section 12.3. But it did in 45 seconds what would have taken a lawyer two full days, and the cost was under a dollar.

The trade-off is latency. Processing 200K tokens takes time, even with Anthropic's optimized inference stack. For real-time chat applications, you're usually better off using a smaller context window and keeping prompts concise. But for batch processing, document analysis, and research workflows, the long context is a genuine game-changer.

## The Enterprise Play

Anthropic's commercial strategy has been notably different from OpenAI's. While OpenAI chased consumer adoption with ChatGPT and built a marketplace for GPTs, Anthropic focused on enterprise integration and developer tooling.

The Amazon partnership, announced in September 2023, was pivotal. Amazon invested up to $4 billion in Anthropic and made Claude available through AWS Bedrock. That deal gave Anthropic access to Amazon's massive enterprise customer base — companies that were already running their infrastructure on AWS and wanted to add AI capabilities without managing a separate vendor relationship.

Google followed with its own $2 billion investment. The dual backing from Amazon and Google gave Anthropic something rare in Silicon Valley: leverage with two of the biggest cloud providers simultaneously, without being fully owned by either.

On the developer side, Anthropic's API pricing has been competitive. The Claude API launched at prices that undercut GPT-4 by a meaningful margin, particularly for input-heavy workloads. Combined with the model family approach, this made Claude an attractive option for startups and mid-size companies that couldn't afford to run experiments on GPT-4's premium pricing.

## The Honest Limitations

It would be dishonest to write about Anthropic without acknowledging its constraints. Claude's image understanding capabilities, while solid, have historically lagged behind GPT-4V's multimodal features. The model can analyze images you upload, but it can't generate images — a limitation that matters for creative workflows.

Claude's knowledge cutoff dates have also been a pain point. For months, Claude's training data had a hard cutoff that meant it couldn't discuss recent events. Anthropic has improved this with web search integration, but it's still not as seamless as some competitors' approaches.

There's also the philosophical question: can a company that prioritizes safety keep pace with competitors who are willing to move faster and accept more risk? So far, Anthropic has managed to stay competitive — Claude 3.5 Sonnet matched or beat GPT-4 on several standard benchmarks. But the pressure is relentless, and every quarter brings new models from OpenAI, Google, Meta, and increasingly from Chinese labs like DeepSeek and Alibaba's Qwen team.

## Where Anthropic Is Headed

As of early 2025, Anthropic is working on Claude 4 and pushing into agentic AI — systems that can take actions, not just generate text. Their computer use capability, released in late 2024, lets Claude control a desktop environment, click buttons, fill out forms, and navigate websites. It's still rough around the edges — the error rate on complex multi-step tasks is higher than most developers would like — but it points toward a future where AI assistants do real work rather than just talking about it.

The company has also been vocal about AI policy, publishing detailed responsible scaling policies and advocating for regulation that they believe would level the playing field with less safety-conscious competitors. Whether that advocacy translates into effective policy remains to be seen, but it's a genuine differentiator in an industry that often treats regulation as an obstacle.

Anthropic's bet is ultimately a simple one: that as AI systems become more powerful, the companies that prove they can be trusted with that power will win. It's a bet that hasn't been settled yet, but the early returns are promising. Claude has earned the trust of developers and enterprises who need reliable, safe AI. And in a market that's growing by hundreds of billions of dollars annually, trust might be the most valuable asset of all.`,
    cn: `# Anthropic 与 Claude：一家押注 AI 安全就是好生意的公司

2021 年 1 月，Dario Amodei 离开了他在 OpenAI 的研究副总裁职位。他的妹妹 Daniela 也一同离开。他们带走了一批机器学习领域最顶尖的人才——这些人曾参与构建 GPT-3，联合发表了该领域被引用最多的安全论文，同时对原雇主的发展方向深感不安。同年，他们创立了 Anthropic。此后，这家公司累计融资超过 73 亿美元，估值突破 600 亿美元，并打造了全球最受关注的 AI 模型之一：Claude。

对于一家核心卖点本质上是"我们会比其他人更谨慎地做这件事"的公司来说，这是一条非同寻常的轨迹。

## 安全优先的赌注

大多数 AI 公司将安全视为成本中心——产品做完后再打上的补丁。Anthropic 彻底颠覆了这一逻辑。从创立之初，安全研究就不是一个部门，而是产品开发流程本身。团队开发了"宪法 AI"（Constitutional AI），这是一种训练方法论，将有用性、无害性和诚实性等原则通过自我批判和修订的过程直接嵌入模型行为。

宪法 AI 与标准 RLHF（基于人类反馈的强化学习）有何不同？在传统 RLHF 中，人类标注者对模型输出进行排序，模型学习生成排名更高的输出。这种方式有效，但扩展性差——你需要大量标注者，而他们的判断会引入不一致性。宪法 AI 用一套书面原则替代了大部分人类反馈。模型根据这些原则评估自己的输出，进行修订，修订后的版本成为训练信号。其结果是一个更符合既定价值观、训练成本也显著更低的模型。

它完美吗？并不。批评者指出，基于自我批判训练的模型可能会产生盲点，这些盲点反映了你所编写的"宪法"中的偏见。这确实是一个合理的担忧。但该方法在实践中表现良好，Claude 在 HELM 评估套件等安全基准测试中始终名列前茅。

## Claude：一个模型家族，而非单一产品

到 2024 年 3 月，Anthropic 发布了 Claude 3，这是一个包含三个模型的家族，每个模型都有不同的性能与成本取舍。起初，这个阵容让一些人感到困惑——为什么 OpenAI 基本只有两个模型（GPT-4 和 GPT-3.5），而 Anthropic 要发布三个？

答案在于定价和延迟。Claude 3 Opus 是重量级选手，在推理基准测试中与 GPT-4 Turbo 相当，但每百万输入 token 的成本为 15 美元，每百万输出 token 为 75 美元。Claude 3 Sonnet 居于中间——大约拥有 Opus 80% 的能力，成本仅为五分之一。而 Claude 3 Haiku 则是速度之王：查询处理时间不到一秒，每百万输入 token 仅需 0.25 美元。

这个产品线真正的高明之处在于，开发者无需切换供应商就能做出精细的成本-性能决策。需要一个快速分类任务？用 Haiku。需要撰写一份需要严谨推理的法律简报？用 Opus。大多数生产场景？Sonnet 完全够用。我个人在不同项目中都使用过这三个模型，对于大多数实际应用场景，Sonnet 和 Opus 之间的差距比你预想的要小。

2024 年晚些时候，Anthropic 进一步推出了 Claude 3.5 Sonnet，它在多个编码基准测试中的表现实际上超过了初代 Opus，同时保持了中等价位。这强烈表明，该公司的架构研究正在以意想不到的方式取得回报。

## 长上下文的优势

Claude 最独特的特征之一是它的上下文窗口。Claude 3 发布时支持高达 20 万 token 的输入——大约 15 万字，相当于三部长篇小说。相比之下，GPT-4 Turbo 发布时提供 128K token。

为什么上下文长度很重要？因为许多现实任务需要处理大量文档。法律发现阶段需要阅读数千页合同。代码审查要求理解整个代码库，而不仅仅是单个函数。学术研究意味着综合数百页的论文。

我曾将一份 180 页的 SaaS 合同全文喂给 Claude 3 Opus，要求它找出所有可能给买方带来责任风险的条款。它找到了 14 个问题，其中两个我们的法律团队在第一轮审查中遗漏了。它是否像资深律师一样彻底？并不完全——它遗漏了第 12.3 条中一个细微的赔偿问题。但它在 45 秒内完成了律师需要两天的工作，成本还不到一美元。

代价是延迟。即使使用 Anthropic 优化过的推理栈，处理 20 万 token 也需要时间。对于实时聊天应用，你通常最好使用较小的上下文窗口并保持提示简洁。但对于批处理、文档分析和研究工作流，长上下文是一个真正的游戏规则改变者。

## 企业级布局

Anthropic 的商业策略与 OpenAI 截然不同。OpenAI 通过 ChatGPT 追求消费者市场并构建 GPT 商店，而 Anthropic 则专注于企业集成和开发者工具。

2023 年 9 月宣布的亚马逊合作是关键一步。亚马逊向 Anthropic 投资最高 40 亿美元，并通过 AWS Bedrock 提供 Claude 服务。这笔交易让 Anthropic 接触到了亚马逊庞大的企业客户群——这些公司已经在 AWS 上运行基础架构，希望在不增加额外供应商关系的情况下添加 AI 能力。

谷歌随后也投资了 20 亿美元。同时获得亚马逊和谷歌的背书，给了 Anthropic 在硅谷罕见的筹码：同时与两大云服务提供商建立深度关系，而不被任何一方完全控制。

在开发者端，Anthropic 的 API 定价具有竞争力。Claude API 的价格显著低于 GPT-4，尤其是对于输入密集型工作负载。结合模型家族策略，这让 Claude 成为那些无法承受 GPT-4 高昂定价的初创公司和中型企业的理想选择。

## 诚实的局限性

在撰写 Anthropic 时不承认其局限性是不诚实的。Claude 的图像理解能力虽然不错，但历史上一直落后于 GPT-4V 的多模态功能。模型可以分析你上传的图像，但无法生成图像——这对创意工作流来说是一个重要的限制。

Claude 的知识截止日期也是一个痛点。在很长一段时间里，Claude 的训练数据有一个硬性截止日期，意味着它无法讨论近期事件。Anthropic 通过集成网络搜索改善了这一点，但仍然不如某些竞争对手的方式那样无缝。

还有一个更深层的哲学问题：一家优先考虑安全的公司，能否跟上那些愿意承担更大风险、更快推进的竞争对手的步伐？到目前为止，Anthropic 一直保持竞争力——Claude 3.5 Sonnet 在多个标准基准测试中匹配或超越了 GPT-4。但压力是持续的，每个季度都会迎来 OpenAI、谷歌、Meta 以及越来越多来自 DeepSeek 和阿里巴巴通义团队等中国实验室的新模型。

## Anthropic 的未来方向

截至 2025 年初，Anthropic 正在开发 Claude 4，并积极投入代理式 AI（Agentic AI）——能够执行操作而非仅仅生成文本的系统。他们在 2024 年底发布的计算机使用能力，让 Claude 可以控制桌面环境、点击按钮、填写表格和浏览网页。它目前还比较粗糙——复杂多步骤任务的错误率高于大多数开发者的期望——但它指向了一个未来：AI 助手真正在做工作，而不仅仅是在谈论工作。

该公司在 AI 政策方面也一直积极发声，发布了详细的负责任扩展政策，并倡导他们认为能与安全意识较弱的竞争对手公平竞争的监管框架。这种倡导能否转化为有效的政策还有待观察，但它在经常将监管视为障碍的行业中确实是一个差异化的立场。

Anthropic 的赌注归根结底很简单：随着 AI 系统变得更加强大，那些证明自己值得被信任的公司将赢得市场。这个赌注尚未尘埃落定，但早期回报是积极的。Claude 赢得了需要可靠、安全 AI 的开发者和企业的信任。在一个年增长数千亿美元的市场中，信任可能是最有价值的资产。`,
    tw: `# Anthropic 與 Claude：一家押注 AI 安全就是好生意的公司

2021 年 1 月，Dario Amodei 離開了他在 OpenAI 的研究副總裁職位。他的妹妹 Daniela 也一同離開。他們帶走了一批機器學習領域最頂尖的人才——這些人曾參與建構 GPT-3，聯合發表了該領域被引用最多的安全論文，同時對原雇主的發展方向深感不安。同年，他們創立了 Anthropic。此後，這家公司累計融資超過 73 億美元，估值突破 600 億美元，並打造了全球最受關注的 AI 模型之一：Claude。

對於一家核心賣點本質上是「我們會比其他人更謹慎地做這件事」的公司來說，這是一條非同尋常的軌跡。

## 安全優先的賭注

大多數 AI 公司將安全視為成本中心——產品做完後再打上的補丁。Anthropic 徹底顛覆了這一邏輯。從創立之初，安全研究就不是一個部門，而是產品開發流程本身。團隊開發了「憲法 AI」（Constitutional AI），這是一種訓練方法論，將有用性、無害性和誠實性等原則透過自我批判和修訂的過程直接嵌入模型行為。

憲法 AI 與標準 RLHF（基於人類回饋的強化學習）有何不同？在傳統 RLHF 中，人類標註者對模型輸出進行排序，模型學習生成排名更高的輸出。這種方式有效，但擴展性差——你需要大量標註者，而他們的判斷會引入不一致性。憲法 AI 用一套書面原則替代了大部分人類回饋。模型根據這些原則評估自己的輸出，進行修訂，修訂後的版本成為訓練信號。其結果是一個更符合既定價值觀、訓練成本也顯著更低的模型。

它完美嗎？並不。批評者指出，基於自我批判訓練的模型可能會產生盲點，這些盲點反映了你所編寫的「憲法」中的偏見。這確實是一個合理的擔憂。但該方法在實踐中表現良好，Claude 在 HELM 評估套件等安全基準測試中始終名列前茅。

## Claude：一個模型家族，而非單一產品

到 2024 年 3 月，Anthropic 發布了 Claude 3，這是一個包含三個模型的家族，每個模型都有不同的效能與成本取捨。起初，這個陣容讓一些人感到困惑——為什麼 OpenAI 基本只有兩個模型（GPT-4 和 GPT-3.5），而 Anthropic 要發布三個？

答案在於定價和延遲。Claude 3 Opus 是重量級選手，在推理基準測試中與 GPT-4 Turbo 相當，但每百萬輸入 token 的成本為 15 美元，每百萬輸出 token 為 75 美元。Claude 3 Sonnet 居於中間——大約擁有 Opus 80% 的能力，成本僅為五分之一。而 Claude 3 Haiku 則是速度之王：查詢處理時間不到一秒，每百萬輸入 token 僅需 0.25 美元。

這個產品線真正的高明之處在於，開發者無需切換供應商就能做出精細的成本-效能決策。需要一個快速分類任務？用 Haiku。需要撰寫一份需要嚴謹推理的法律簡報？用 Opus。大多數生產場景？Sonnet 完全夠用。我個人在不同專案中都使用過這三個模型，對於大多數實際應用場景，Sonnet 和 Opus 之間的差距比你想像的要小。

2024 年稍晚時候，Anthropic 進一步推出了 Claude 3.5 Sonnet，它在多個編碼基準測試中的表現實際上超過了初代 Opus，同時維持了中等價位。這強烈表明，該公司的架構研究正在以意想不到的方式取得回報。

## 長上下文的優勢

Claude 最獨特的特徵之一是它的上下文視窗。Claude 3 發布時支援高達 20 萬 token 的輸入——大約 15 萬字，相當於三部長篇小說。相比之下，GPT-4 Turbo 發布時提供 128K token。

為什麼上下文長度很重要？因為許多現實任務需要處理大量文件。法律發現階段需要閱讀數千頁合約。程式碼審查要求理解整個程式碼庫，而不僅僅是單個函式。學術研究意味著綜合數百頁的論文。

我曾將一份 180 頁的 SaaS 合約全文餵給 Claude 3 Opus，要求它找出所有可能給買方帶來責任風險的條款。它找到了 14 個問題，其中兩個我們的法律團隊在第一輪審查中遺漏了。它是否像資深律師一樣徹底？並不完全——它遺漏了第 12.3 條中一個細微的賠償問題。但它在 45 秒內完成了律師需要兩天的工作，成本還不到一美元。

代價是延遲。即使使用 Anthropic 優化過的推理棧，處理 20 萬 token 也需要時間。對於即時聊天應用，你通常最好使用較小的上下文視窗並保持提示簡潔。但對於批次處理、文件分析和研究工作流，長上下文是一個真正的遊戲規則改變者。

## 企業級佈局

Anthropic 的商業策略與 OpenAI 截然不同。OpenAI 透過 ChatGPT 追求消費者市場並建構 GPT 商店，而 Anthropic 則專注於企業整合和開發者工具。

2023 年 9 月宣布的亞馬遜合作是關鍵一步。亞馬遜向 Anthropic 投資最高 40 億美元，並透過 AWS Bedrock 提供 Claude 服務。這筆交易讓 Anthropic 接觸到了亞馬遜龐大的企業客戶群——這些公司已經在 AWS 上運行基礎架構，希望在不增加額外供應商關係的情況下添加 AI 能力。

谷歌隨後也投資了 20 億美元。同時獲得亞馬遜和谷歌的背書，給了 Anthropic 在矽谷罕見的籌碼：同時與兩大雲服務供應商建立深度關係，而不被任何一方完全控制。

在開發者端，Anthropic 的 API 定價具有競爭力。Claude API 的價格顯著低於 GPT-4，尤其是對於輸入密集型工作負載。結合模型家族策略，這讓 Claude 成為那些無法承受 GPT-4 高昂定價的初創公司和中型企業的理想選擇。

## 誠實的局限性

在撰寫 Anthropic 時不承認其局限性是不誠實的。Claude 的影像理解能力雖然不錯，但歷史上一直落後於 GPT-4V 的多模態功能。模型可以分析你上傳的影像，但無法生成影像——這對創意工作流來說是一個重要的限制。

Claude 的知識截止日期也是一個痛點。在很長一段時間裡，Claude 的訓練資料有一個硬性截止日期，意味著它無法討論近期事件。Anthropic 透過整合網路搜尋改善了這一點，但仍然不如某些競爭對手的方式那樣無縫。

還有一個更深層的哲學問題：一家優先考慮安全的公司，能否跟上那些願意承擔更大風險、更快推進的競爭對手的步伐？到目前為止，Anthropic 一直保持競爭力——Claude 3.5 Sonnet 在多個標準基準測試中匹配或超越了 GPT-4。但壓力是持續的，每個季度都會迎來 OpenAI、谷歌、Meta 以及越來越多來自 DeepSeek 和阿里巴巴通義團隊等中國實驗室的新模型。

## Anthropic 的未來方向

截至 2025 年初，Anthropic 正在開發 Claude 4，並積極投入代理式 AI（Agentic AI）——能夠執行操作而非僅僅生成文字的系統。他們在 2024 年底發布的電腦使用能力，讓 Claude 可以控制桌面環境、點擊按鈕、填寫表格和瀏覽網頁。它目前還比較粗糙——複雜多步驟任務的錯誤率高於大多數開發者的期望——但它指向了一個未來：AI 助手真正在做工作，而不僅僅是在談論工作。

該公司在 AI 政策方面也一直積極發聲，發布了詳細的負責任擴展政策，並倡導他們認為能與安全意識較弱的競爭對手公平競爭的監管框架。這種倡導能否轉化為有效的政策還有待觀察，但它在經常將監管視為障礙的行業中確實是一個差異化的立場。

Anthropic 的賭注歸根結底很簡單：隨著 AI 系統變得更加強大，那些證明自己值得被信任的公司將贏得市場。這個賭注尚未塵埃落定，但早期回報是積極的。Claude 贏得了需要可靠、安全 AI 的開發者和企業的信任。在一個年增長數千億美元的市場中，信任可能是最有價值的資產。`,
    de: `# Anthropic und Claude: Das Unternehmen, das darauf setzt, dass KI-Sicherheit gutes Geschäft ist

Im Januar 2021 verließ Dario Amodei seine Position als Vizepräsident für Forschung bei OpenAI. Seine Schwester Daniela tat es ihm gleich. Sie nahmen einige der klügsten Köpfe des maschinellen Lernens mit sich — Menschen, die an GPT-3 mitgearbeitet, die am häufigsten zitierten Sicherheitspapiere des Fachgebiets mitverfasst hatten und zutiefst beunruhigt über die Richtung waren, die ihr Arbeitgeber einschlug. Das Unternehmen, das sie noch im selben Jahr gründeten, Anthropic, sollte über 7,3 Milliarden Dollar an Finanzierung aufbringen, eine Bewertung von über 60 Milliarden Dollar erreichen und eines der meistdiskutierten KI-Modelle der Welt entwickeln: Claude.

Das ist eine bemerkenswerte Entwicklung für ein Unternehmen, dessen Kernversprechen im Grunde lautet: „Wir werden das sorgfänger als alle anderen machen."

## Die Wette auf Sicherheit zuerst

Die meisten KI-Unternehmen betrachten Sicherheit als Kostenfaktor — etwas, das man nachträglich an das Produkt anbaut. Anthropic drehte diese Logik um. Von Anfang an war Sicherheitsforschung keine Abteilung, sondern der Produktentwicklungsprozess selbst. Das Team entwickelte Constitutional AI, eine Trainingsmethode, die Prinzipien wie Nützlichkeit, Harmlosigkeit und Ehrlichkeit durch Selbstkritik und Revision direkt in das Verhalten des Modells einbettet.

Was unterscheidet Constitutional AI von herkömmlichem RLHF (Reinforcement Learning from Human Feedback)? Beim traditionellen RLHF ordnen menschliche Bewerter Modellausgaben, und das Modell lernt, Ausgaben zu produzieren, die höher eingestuft werden. Das funktioniert, skaliert aber schlecht — man braucht ein Heer von Bewertern, und deren Urteile bringen Inkonsistenzen mit sich. Constitutional AI ersetzt einen Großteil dieses menschlichen Feedbacks durch eine Reihe schriftlicher Prinzipien. Das Modell bewertet seine eigenen Ausgaben anhand dieser Prinzipien, überarbeitet sie, und die überarbeitete Version wird zum Trainingssignal. Das Ergebnis ist ein Modell, das stärker mit den formulierten Werten übereinstimmt und deutlich günstiger zu trainieren ist.

Ist es perfekt? Nein. Kritiker haben darauf hingewiesen, dass ein auf Selbstkritik trainiertes Modell blinde Flecken entwickeln kann, die die Vorurteile der „Verfassung" widerspiegeln. Das ist ein berechtigter Einwand. Aber der Ansatz hat sich in der Praxis bewährt, und Claude schneidet bei Sicherheitsbenchmarks wie der HELM-Evaluierungssuite konstant mit den besten KI-Modellen ab.

## Claude: Eine Modellfamilie, nicht ein einzelnes Produkt

Bis März 2024 hatte Anthropic Claude 3 veröffentlicht, eine Familie aus drei Modellen mit unterschiedlichen Kompromissprofilen. Die Aufstellung verwirrte zunächst einige — warum drei Modelle herausbringen, wenn OpenAI im Grunde nur zwei hatte (GPT-4 und GPT-3.5)?

Die Antwort liegt in Preisgestaltung und Latenz. Claude 3 Opus ist das Schwergewicht, vergleichbar mit GPT-4 Turbo bei Reasoning-Benchmarks, kostet aber 15 Dollar pro Million Input-Token und 75 Dollar pro Million Output-Token. Claude 3 Sonnet liegt in der Mitte — etwa 80 Prozent der Opus-Fähigkeiten zu einem Fünftel des Preises. Und Claude 3 Haiku ist der Tempostar: Es verarbeitet Anfragen in unter einer Sekunde und kostet nur 0,25 Dollar pro Million Input-Token.

Die eigentliche Genialität dieser Aufstellung liegt darin, dass Entwickler feingranulare Kosten-Leistungsentscheidungen treffen können, ohne den Anbieter zu wechseln. Eine schnelle Klassifizierung? Haiku. Ein Rechtsgutachten, das sorgfältiges Reasoning erfordert? Opus. Die meisten Produktionsanwendungsfälle? Sonnet reicht völlig aus. Ich persönlich habe alle drei in verschiedenen Projekten eingesetzt, und die Lücke zwischen Sonnet und Opus ist für die meisten realen Anwendungen kleiner, als man erwarten würde.

Später im Jahr 2024 ging Anthropic mit Claude 3.5 Sonnet noch weiter, das den ursprünglichen Opus bei mehreren Coding-Benchmarks tatsächlich übertraf, während es den mittleren Preispunkt beibehiell. Das war ein starkes Signal, dass die Architekturforschung des Unternehmens auf unerwartete Weise Früchte trug.

## Der Vorteil langer Kontexte

Eines der markantesten Merkmale von Claude ist sein Kontextfenster. Bei der Veröffentlichung von Claude 3 unterstützte es bis zu 200.000 Token Eingabe — etwa 150.000 Wörter, oder rund drei vollständige Romane. Zum Vergleich: GPT-4 Turbo bot bei der Veröffentlichung 128K Token.

Warum ist die Kontextlänge wichtig? Weil viele reale Aufgaben die Verarbeitung großer Dokumente erfordern. Die juristische Entdeckung umfasst das Lesen tausender Seiten Verträgen. Code-Review erfordert das Verständnis ganzer Repositories, nicht nur einzelner Funktionen. Akademische Forschung bedeutet die Synthese von Papern, die zusammengenommen Hunderte von Seiten umfassen.

Ich habe einmal einem Claude 3 Opus einen gesamten 180-seitigen SaaS-Vertrag gefüttert und es gebeten, jede Klausel zu identifizieren, die Haftungsrisiken für den Käufer schaffen könnte. Es fand 14 Probleme, darunter zwei, die unser Rechtsteam bei der ersten Prüfung übersehen hatte. War es so gründlich wie ein erfahrener Anwalt? Nicht ganz — es übersah eine subtile Entschädigungsnuance in Abschnitt 12.3. Aber es erledigte in 45 Sekunden, wofür ein Anwatt zwei volle Tage gebraucht hätte, und die Kosten lagen unter einem Dollar.

Der Kompromiss ist die Latenz. Die Verarbeitung von 200K Token braucht Zeit, selbst mit Anthropics optimierter Inferenz-Infrastruktur. Für Echtzeit-Chat-Anwendungen ist man in der Regel besser beraten, ein kleineres Kontextfenster zu verwenden und Prompts knapp zu halten. Aber für Stapelverarbeitung, Dokumentenanalyse und Forschungsworkflows ist der lange Kontext ein echter Gamechanger.

## Die Unternehmensstrategie

Anthropics kommerzielle Strategie war deutlich anders als die von OpenAI. Während OpenAI mit ChatGPT die Verbraucherakzeptanz suchte und einen Marktplatz für GPTs aufbaute, konzentrierte sich Anthropic auf Unternehmensintegration und Entwicklertools.

Die Amazon-Partnerschaft, die im September 2023 angekündigt wurde, war entscheidend. Amazon investierte bis zu 4 Milliarden Dollar in Anthropic und machte Claude über AWS Bedrock verfügbar. Dieser Deal verschaffte Anthropic Zugang zu Amazons riesiger Unternehmenskundengrundlage — Unternehmen, die bereits ihre Infrastruktur auf AWS betrieben und KI-Funktionen hinzufügen wollten, ohne eine separate Anbieterbeziehung pflegen zu müssen.

Google folgte mit einer eigenen Investition von 2 Milliarden Dollar. Die doppelte Unterstützung durch Amazon und Google gab Anthropic etwas Seltenes im Silicon Valley: Verhandlungsmacht mit zwei der größten Cloud-Anbieter gleichzeitig, ohne vollständig von einem von beiden kontrolliert zu werden.

Auf der Entwicklerseite war Anthropics API-Preisgestaltung wettbewerbsfähig. Die Claude-API wurde zu Preisen gestartet, die GPT-4 deutlich unterboten, insbesondere bei eingabeintensiven Workloads. Kombiniert mit dem Modellfamilienansatz machte das Claude zu einer attraktiven Option für Startups und mittlere Unternehmen, die sich GPT-4s Premium-Preise nicht leisten konnten.

## Die ehrlichen Einschränkungen

Es wäre unehrlich, über Anthropic zu schreiben, ohne seine Grenzen anzuerkennen. Claudes Bildverständnisfähigkeiten sind zwar solide, haben historisch aber hinter den multimodalen Funktionen von GPT-4V zurückgelegen. Das Modell kann hochgeladene Bilder analysieren, aber keine Bilder erzeugen — eine Einschränkung, die für kreative Workflows wichtig ist.

Auch Claudes Wissensstichtage waren ein Schmerzpunkt. Monatelang hatte Claudes Trainingsdaten einen harten Stichtag, der bedeutete, dass es aktuelle Ereignisse nicht besprechen konnte. Anthropic hat dies mit der Integration von Websuche verbessert, aber es ist immer noch nicht so nahtlos wie die Ansätze einiger Wettbewerber.

Es gibt auch die philosophische Frage: Kann ein Unternehmen, das Sicherheit priorisiert, mit Wettbewerbern mithalten, die bereit sind, schneller zu handeln und mehr Risiko einzugehen? Bisher hat Anthropic es geschlagen, wettbewerbsfähig zu bleiben — Claude 3.5 Sonnet hat GPT-4 bei mehreren Standard-Benchmarks erreicht oder übertroffen. Aber der Druck ist unerbittlich, und jedes Quartal bringt neue Modelle von OpenAI, Google, Meta und zunehmend von chinesischen Labors wie DeepSeek und Alibabas Qwen-Team.

## Wohin Anthropic sich bewegt

Anfang 2025 arbeitet Anthropic an Claude 4 und dringt in den Bereich Agenten-KI vor — Systeme, die Aktionen ausführen können, nicht nur Text generieren. Ihre Computer-Use-Fähigkeit, Ende 2024 veröffentlicht, lässt Claude eine Desktop-Umgebung steuern, Schaltflächen klicken, Formulare ausfüllen und Websites navigieren. Es ist noch holprig — die Fehlerrate bei komplexen mehrstufigen Aufgaben ist höher, als die meisten Entwickler es sich wünschen würden —, aber es deutet auf eine Zukunft hin, in der KI-Assistenten echte Arbeit erledigen, nicht nur darüber reden.

Das Unternehmen hat sich auch in der KI-Politik deutlich positioniert, veröffentlicht detaillierte Richtlinien für verantwortungsvolles Skalieren und setzt sich für Regulierungen ein, die es mit weniger sicherheitsbewussten Wettbewerbern fair aufnehmen ließen. Ob sich dieses Engagement in wirksame Politik umsetzen lässt, bleibt abzuwarten, aber es ist ein echtes Unterscheidungsmerkmal in einer Branche, die Regulierung oft als Hindernis betrachtet.

Anthropics Wette ist letztlich einfach: dass Unternehmen, die nachweisen können, mit dieser Macht vertrauenswürdig umzugehen, gewinnen werden, wenn KI-Systeme leistungsfähiger werden. Es ist eine Wette, die noch nicht entschieden ist, aber die frühen Renditen sind vielversprechend. Claude hat das Vertrauen von Entwicklern und Unternehmen gewonnen, die zuverlässige, sichere KI brauchen. Und in einem Markt, der jährlich um Hunderte von Milliarden Dollar wächst, ist Vertrauen vielleicht das wertvollste Gut von allen.`,
    es: `# Anthropic y Claude: La empresa que apuesta a que la seguridad en IA es un buen negocio

En enero de 2021, Dario Amodei dejó su puesto como vicepresidente de investigación en OpenAI. Su hermana Daniela le siguió. Se llevaron consigo a algunas de las mentes más brillantes del aprendizaje automático — personas que habían ayudado a construir GPT-3, coautorado algunos de los artículos sobre seguridad más citados del campo, y que estaban profundamente incómodos con la dirección que estaba tomando su empleador. La empresa que fundaron ese mismo año, Anthropic, recaudaría más de 7.300 millones de dólares en financiación, alcanzaría una valoración superior a los 60.000 millones y construiría uno de los modelos de IA más comentados del mundo: Claude.

Es una trayectoria notable para una empresa cuyo argumento central es esencialmente "vamos a hacer esto con más cuidado que los demás."

## La apuesta por la seguridad primero

La mayoría de las empresas de IA tratan la seguridad como un centro de costes — algo que se añade después de construir el producto. Anthropic invirtió esa lógica. Desde el principio, la investigación en seguridad no era un departamento; era el propio proceso de desarrollo del producto. El equipo desarrolló Constitutional AI, una metodología de entrenamiento que incorpora principios como la utilidad, la inofensividad y la honestidad directamente en el comportamiento del modelo a través de un proceso de autocrítica y revisión.

¿Qué diferencia a Constitutional AI del RLHF estándar (Reinforcement Learning from Human Feedback)? En el RLHF tradicional, etiquetadores humanos clasifican las salidas del modelo, y este aprende a producir salidas que obtienen clasificaciones más altas. Funciona, pero escala mal — necesitas un ejército de etiquetadores, y sus juicios introducen inconsistencias. Constitutional AI reemplaza gran parte de ese feedback humano con un conjunto de principios escritos. El modelo evalúa sus propias salidas contra esos principios, las revisa, y la versión revisada se convierte en la señal de entrenamiento. El resultado es un modelo más alineado con los valores declarados y significativamente más barato de entrenar.

¿Es perfecto? No. Los críticos han señalado que un modelo entrenado con autocrítica puede desarrollar puntos ciegos que reflejan los sesgos de la "constitución" que escribas. Es una preocupación legítima. Pero el enfoque ha funcionado bien en la práctica, y Claude se clasifica consistentemente entre los mejores modelos de IA en benchmarks de seguridad como la suite de evaluación HELM.

## Claude: Una familia de modelos, no un solo producto

En marzo de 2024, Anthropic había lanzado Claude 3, una familia de tres modelos con perfiles de compromiso genuinamente diferentes. La gama confundió a algunos al principio — ¿por qué lanzar tres modelos cuando OpenAI tenía esencialmente dos (GPT-4 y GPT-3.5)?

La respuesta está en el precio y la latencia. Claude 3 Opus es el peso pesado, comparable a GPT-4 Turbo en benchmarks de razonamiento, pero cuesta 15 dólares por millón de tokens de entrada y 75 dólares por millón de tokens de salida. Claude 3 Sonnet está en el medio — aproximadamente el 80% de la capacidad de Opus a una quinta parte del coste. Y Claude 3 Haiku es el velocista: procesa consultas en menos de un segundo y cuesta solo 0,25 dólares por millón de tokens de entrada.

La verdadera genialidad de esta gama es que permite a los desarrolladores tomar decisiones granulares de coste-rendimiento sin cambiar de proveedor. ¿Una tarea de clasificación rápida? Haiku. ¿Un informe legal que requiere razonamiento cuidadoso? Opus. ¿La mayoría de los casos de uso en producción? Sonnet los maneja perfectamente. He usado personalmente los tres en diferentes proyectos, y la brecha entre Sonnet y Opus es más estrecha de lo que esperarías para la mayoría de las aplicaciones del mundo real.

Más adelante en 2024, Anthropic fue más allá con Claude 3.5 Sonnet, que realmente superó al Opus original en varios benchmarks de programación mientras mantenía el punto de precio intermedio. Fue una señal clara de que la investigación de arquitectura de la empresa estaba dando frutos de maneras inesperadas.

## La ventaja del contexto largo

Una de las características más distintivas de Claude es su ventana de contexto. Cuando se lanzó Claude 3, admitía hasta 200.000 tokens de entrada — aproximadamente 150.000 palabras, o unas tres novelas completas. En comparación, GPT-4 Turbo ofrecía 128K tokens en su lanzamiento.

¿Por qué importa la longitud del contexto? Porque muchas tareas del mundo real implican procesar grandes documentos. El descubrimiento legal implica leer miles de páginas de contratos. La revisión de código requiere entender repositorios enteros, no solo funciones individuales. La investigación académica significa sintetizar artículos que en conjunto suman cientos de páginas.

Una vez alimenté a Claude 3 Opus con un contrato SaaS completo de 180 páginas y le pedí que identificara cada cláusula que pudiera crear exposición a responsabilidad para el comprador. Encontró 14 problemas, incluyendo dos que nuestro equipo legal había pasado por alto en su primera revisión. ¿Fue tan exhaustivo como un abogado senior? No del todo — pasó por alto una sutileza de indemnización en la Sección 12.3. Pero hizo en 45 segundos lo que habría llevado a un abogado dos días completos, y el coste fue inferior a un dólar.

La compensación es la latencia. Procesar 200K tokens lleva tiempo, incluso con la pila de inferencia optimizada de Anthropic. Para aplicaciones de chat en tiempo real, generalmente es mejor usar una ventana de contexto más pequeña y mantener los prompts concisos. Pero para procesamiento por lotes, análisis de documentos y flujos de investigación, el contexto largo es un cambio de juego genuino.

## La estrategia empresarial

La estrategia comercial de Anthropic ha sido notablemente diferente de la de OpenAI. Mientras OpenAI perseguía la adopción del consumidor con ChatGPT y construía un marketplace para GPTs, Anthropic se centró en la integración empresarial y las herramientas para desarrolladores.

La asociación con Amazon, anunciada en septiembre de 2023, fue crucial. Amazon invirtió hasta 4.000 millones de dólares en Anthropic y puso Claude disponible a través de AWS Bedrock. Ese acuerdo dio a Anthropic acceso a la enorme base de clientes empresariales de Amazon — empresas que ya ejecutaban su infraestructura en AWS y querían añadir capacidades de IA sin gestionar una relación con un proveedor separado.

Google siguió con su propia inversión de 2.000 millones. El doble respaldo de Amazon y Google le dio a Anthropic algo raro en Silicon Valley: influencia con dos de los mayores proveedores de nube simultáneamente, sin ser propiedad completa de ninguno de ellos.

En el lado del desarrollador, los precios de la API de Anthropic han sido competitivos. La API de Claude se lanzó a precios que superaban significativamente a GPT-4, particularmente para cargas de trabajo intensivas en entrada. Combinado con el enfoque de familia de modelos, esto hizo de Claude una opción atractiva para startups y empresas medianas que no podían permitirse los precios premium de GPT-4.

## Las limitaciones honestas

Sería deshonesto escribir sobre Anthropic sin reconocer sus limitaciones. Las capacidades de comprensión de imágenes de Claude, aunque sólidas, han estado históricamente por detrás de las funciones multimodales de GPT-4V. El modelo puede analizar imágenes que subas, pero no puede generar imágenes — una limitación que importa para los flujos de trabajo creativos.

Las fechas de corte de conocimiento de Claude también han sido un punto doloroso. Durante meses, los datos de entrenamiento de Claude tenían un corte duro que significaba que no podía discutir eventos recientes. Anthropic ha mejorado esto con la integración de búsqueda web, pero sigue sin ser tan fluido como los enfoques de algunos competidores.

También está la pregunta filosófica: ¿puede una empresa que prioriza la seguridad mantener el ritmo con competidores dispuestos a moverse más rápido y asumir más riesgo? Hasta ahora, Anthropic ha logrado mantenerse competitivo — Claude 3.5 Sonnet igualó o superó a GPT-4 en varios benchmarks estándar. Pero la presión es implacable, y cada trimestre trae nuevos modelos de OpenAI, Google, Meta y cada vez más de laboratorios chinos como DeepSeek y el equipo Qwen de Alibaba.

## Hacia dónde se dirige Anthropic

A principios de 2025, Anthropic está trabajando en Claude 4 y adentrándose en la IA agente — sistemas que pueden realizar acciones, no solo generar texto. Su capacidad de uso del ordenador, lanzada a finales de 2024, permite a Claude controlar un entorno de escritorio, hacer clic en botones, rellenar formularios y navegar por sitios web. Todavía es tosco — la tasa de error en tareas complejas de múltiples pasos es más alta de lo que la mayoría de los desarrolladores desearían — pero apunta hacia un futuro en el que los asistentes de IA hacen trabajo real en lugar de solo hablar de él.

La empresa también ha sido vocal sobre la política de IA, publicando políticas detalladas de escalado responsable y abogando por regulaciones que creen que nivelarían el campo de juego con competidores menos conscientes de la seguridad. Queda por ver si esa defensa se traduce en políticas efectivas, pero es un diferenciador genuino en una industria que a menudo trata la regulación como un obstáculo.

La apuesta de Anthropic es en última instancia simple: que a medida que los sistemas de IA se vuelvan más poderosos, las empresas que demuestren que pueden ser confiables con ese poder ganarán. Es una apuesta que aún no se ha resuelto, pero los primeros resultados son prometedores. Claude ha ganado la confianza de desarrolladores y empresas que necesitan IA confiable y segura. Y en un mercado que crece en cientos de miles de millones de dólares anuales, la confianza puede ser el activo más valioso de todos.`,
    fr: `# Anthropic et Claude : l'entreprise qui parie que la sécurité de l'IA est un bon commerce

En janvier 2021, Dario Amodei quitte son poste de vice-président de la recherche chez OpenAI. Sa sœur Daniela fait de même. Ils emmènent avec eux certains des esprits les plus brillants du machine learning — des personnes qui avaient contribué à construire GPT-3, co-écrit certains des articles sur la sécurité les plus cités du domaine, et qui étaient profondément mal à l'aise avec la direction que prenait leur employeur. L'entreprise qu'ils fondent cette même année, Anthropic, lèvera plus de 7,3 milliards de dollars de financement, atteindra une valorisation de plus de 60 milliards de dollars et construira l'un des modèles d'IA les plus commentés au monde : Claude.

C'est une trajectoire remarquable pour une entreprise dont l'argument commercial central est essentiellement : « Nous allons faire ça plus soigneusement que tout le monde. »

## La mise sur la sécurité d'abord

La plupart des entreprises d'IA traitent la sécurité comme un centre de coût — quelque chose qu'on ajoute après la construction du produit. Anthropic a inversé cette logique. Dès le départ, la recherche en sécurité n'était pas un département ; c'était le processus de développement du produit lui-même. L'équipe a développé Constitutional AI, une méthodologie d'entraînement qui intègre des principes comme l'utilité, l'innocuité et l'honnêteté directement dans le comportement du modèle à travers un processus d'autocritique et de révision.

Qu'est-ce qui différencie Constitutional AI du RLHF standard (Reinforcement Learning from Human Feedback) ? Dans le RLHF traditionnel, des évaluateurs humains classent les sorties du modèle, et celui-ci apprend à produire des sorties qui obtiennent de meilleurs classements. Ça fonctionne, mais ça passe mal à l'échelle — il faut une armée d'évaluateurs, et leurs jugements introduisent des incohérences. Constitutional AI remplace une grande partie de ce feedback humain par un ensemble de principes écrits. Le modèle évalue ses propres sorties par rapport à ces principes, les révise, et la version révisée devient le signal d'entraînement. Le résultat est un modèle davantage aligné sur les valeurs déclarées et nettement moins coûteux à entraîner.

Est-ce parfait ? Non. Les critiques ont souligné qu'un modèle entraîné sur l'autocritique peut développer des angles morts qui reflètent les biais de la « constitution » qu'on rédige. C'est une préoccupation légitime. Mais l'approche s'est bien comportée en pratique, et Claude se classe régulièrement parmi les meilleurs modèles d'IA sur les benchmarks de sécurité comme la suite d'évaluation HELM.

## Claude : une famille de modèles, pas un seul produit

En mars 2024, Anthropic avait lancé Claude 3, une famille de trois modèles avec des profils de compromis réellement différents. La gamme a d'abord déconcerté certains — pourquoi sortir trois modèles alors qu'OpenAI en avait essentiellement deux (GPT-4 et GPT-3.5) ?

La réponse réside dans les prix et la latence. Claude 3 Opus est le poids lourd, comparable à GPT-4 Turbo sur les benchmarks de raisonnement, mais il coûte 15 dollars par million de tokens d'entrée et 75 dollars par million de tokens de sortie. Claude 3 Sonnet se situe au milieu — environ 80 % des capacités d'Opus à un cinquième du coût. Et Claude 3 Haiku est le foudre de guerre : il traite les requêtes en moins d'une seconde et ne coûte que 0,25 dollar par million de tokens d'entrée.

Le vrai génie de cette gamme est qu'elle permet aux développeurs de prendre des décisions granulaires coût-performance sans changer de fournisseur. Une tâche de classification rapide ? Haiku. Un mémoire juridique qui nécessite un raisonnement soigné ? Opus. La plupart des cas d'usage en production ? Sonnet les gère très bien. J'ai personnellement utilisé les trois dans différents projets, et l'écart entre Sonnet et Opus est plus étroit qu'on ne le penserait pour la plupart des applications réelles.

Plus tard en 2024, Anthropic est allé plus loin avec Claude 3.5 Sonnet, qui a réellement dépassé l'Opus original sur plusieurs benchmarks de programmation tout en maintenant le point de prix intermédiaire. C'était un signal fort que la recherche architecturale de l'entreprise portait ses fruits de manière inattendue.

## L'avantage du contexte long

L'une des caractéristiques les plus distinctives de Claude est sa fenêtre de contexte. Lors du lancement de Claude 3, il supportait jusqu'à 200 000 tokens d'entrée — environ 150 000 mots, soit environ trois romans complets. À titre de comparaison, GPT-4 Turbo offrait 128K tokens au lancement.

Pourquoi la longueur du contexte est-elle importante ? Parce que de nombreuses tâches du monde réel impliquent le traitement de grands documents. La découverte juridique implique la lecture de milliers de pages de contrats. La revue de code exige la compréhension de dépôts entiers, pas seulement de fonctions individuelles. La recherche académique signifie la synthèse d'articles qui, collectivement, comptent des centaines de pages.

J'ai déjà donné à Claude 3 Opus un contrat SaaS complet de 180 pages en lui demandant d'identifier chaque clause pouvant créer une exposition à la responsabilité pour l'acheteur. Il a trouvé 14 problèmes, dont deux que notre équipe juridique avait manqués lors de sa première lecture. Était-il aussi minutieux qu'un avocat senior ? Pas tout à fait — il a manqué une subtilité d'indemnisation à la section 12.3. Mais il a fait en 45 secondes ce qu'un avocat aurait mis deux journées complètes à faire, et le coût était inférieur à un dollar.

Le compromis est la latence. Traiter 200K tokens prend du temps, même avec la pile d'inférence optimisée d'Anthropic. Pour les applications de chat en temps réel, il est généralement préférable d'utiliser une fenêtre de contexte plus petite et de garder les prompts concis. Mais pour le traitement par lots, l'analyse de documents et les flux de recherche, le long contexte est un véritable game-changer.

## La stratégie d'entreprise

La stratégie commerciale d'Anthropic a été notablement différente de celle d'OpenAI. Tandis qu'OpenAI cherchait l'adoption grand public avec ChatGPT et construisait un marché pour les GPTs, Anthropic s'est concentré sur l'intégration d'entreprise et les outils pour développeurs.

Le partenariat avec Amazon, annoncé en septembre 2023, a été décisif. Amazon a investi jusqu'à 4 milliards de dollars dans Anthropic et a rendu Claude disponible via AWS Bedrock. Cet accord a donné à Anthropic l'accès à l'énorme base de clients d'entreprise d'Amazon — des entreprises qui exécutaient déjà leur infrastructure sur AWS et voulaient ajouter des capacités d'IA sans gérer une relation fournisseur séparée.

Google a suivi avec son propre investissement de 2 milliards de dollars. Le double soutien d'Amazon et de Google a donné à Anthropic quelque chose de rare dans la Silicon Valley : un pouvoir de négociation avec deux des plus grands fournisseurs de cloud simultanément, sans être entièrement possédé par l'un ou l'autre.

Côté développeur, la tarification de l'API d'Anthropic a été compétitive. L'API Claude a été lancée à des prix qui inférieures significativement à ceux de GPT-4, en particulier pour les charges de travail intensives en entrée. Combiné à l'approche de famille de modèles, cela a fait de Claude une option attrayante pour les startups et les entreprises de taille moyenne qui ne pouvaient pas se permettre les prix premium de GPT-4.

## Les limites honnêtes

Il serait malhonnête d'écrire sur Anthropic sans reconnaître ses contraintes. Les capacités de compréhension d'image de Claude, bien que solides, ont historiquement traîné derrière les fonctionnalités multimodales de GPT-4V. Le modèle peut analyser les images que vous téléchargez, mais il ne peut pas en générer — une limitation qui compte pour les flux de travail créatifs.

Les dates de coupure des connaissances de Claude ont également été un point douloureux. Pendant des mois, les données d'entraînement de Claude avaient une coupure dure qui signifiait qu'il ne pouvait pas discuter d'événements récents. Anthropic a amélioré cela avec l'intégration de la recherche web, mais ce n'est toujours pas aussi fluide que les approches de certains concurrents.

Il y a aussi la question philosophique : une entreprise qui priorise la sécurité peut-elle suivre le rythme de concurrents prêts à aller plus vite et à prendre plus de risques ? Jusqu'ici, Anthropic a réussi à rester compétitif — Claude 3.5 Sonnet a égalé ou dépassé GPT-4 sur plusieurs benchmarks standards. Mais la pression est incessante, et chaque trimestre apporte de nouveaux modèles d'OpenAI, Google, Meta et de plus en plus de laboratoires chinois comme DeepSeek et l'équipe Qwen d'Alibaba.

## Où se dirige Anthropic

Début 2025, Anthropic travaille sur Claude 4 et s'aventure dans l'IA agentique — des systèmes capables d'effectuer des actions, pas seulement de générer du texte. Leur capacité d'utilisation informatique, lancée fin 2024, permet à Claude de contrôler un environnement de bureau, de cliquer sur des boutons, de remplir des formulaires et de naviguer sur des sites web. C'est encore approximatif — le taux d'erreur sur les tâches complexes à plusieurs étapes est plus élevé que ce que la plupart des développeurs souhaiteraient — mais cela pointe vers un futur où les assistants IA font un vrai travail plutôt que d'en parler simplement.

L'entreprise s'est également exprimée sur la politique d'IA, publiant des politiques détaillées de mise à l'échelle responsable et plaidant pour une réglementation qu'elle estime nivellerait le terrain de jeu avec des concurrents moins soucieux de la sécurité. Reste à savoir si ce plaidoyer se traduira en politiques efficaces, mais c'est un différenciateur authentique dans une industrie qui considère souvent la réglementation comme un obstacle.

Le pari d'Anthropic est en fin de compte simple : à mesure que les systèmes d'IA deviennent plus puissants, les entreprises qui prouvent qu'on peut leur faire confiance avec ce pouvoir gagneront. C'est un pari qui n'est pas encore tranché, mais les premiers résultats sont prometteurs. Claude a gagné la confiance de développeurs et d'entreprises qui ont besoin d'une IA fiable et sûre. Et sur un marché qui croît de centaines de milliards de dollars par an, la confiance est peut-être l'actif le plus précieux de tous.`,
    jp: `# Anthropic と Claude：AI セキュリティがビジネスとして成功すると確信する企業

2021年1月、Dario Amodei は OpenAI の研究副社長職を退いた。妹の Daniela も同様だった。彼らは機械学習分野で最も優秀な頭脳の一部を引き連れていった——GPT-3 の構築に携わり、同分野で最も引用されている安全に関する論文を共著し、かつての雇用主の方向性に深く懸念を抱いていた人々だ。同年に彼らが設立した Anthropic は、73億ドル以上の資金を調達し、600億ドル以上の評価額に到達し、世界で最も話題を集めたAIモデルの一つを構築した——Claude だ。

「他の誰よりも慎重にこれをやる」という本質的な売り文句を持つ企業としては、驚異的な軌跡だ。

## 安全を最優先にする賭け

ほとんどのAI企業はセキュリティをコストセンターとして扱う——製品を構築した後に後付けするものだ。Anthropic はこの論理を逆転させた。創業当初から、セキュリティリサーチは一つの部門ではなく、製品開発プロセスそのものだった。チームは Constitutional AI を開発した。これは、有用性、無害性、誠実性などの原則を、自己批判と修正のプロセスを通じてモデルの行動に直接埋め込む訓練方法論だ。

Constitutional AI は標準的な RLHF（人間のフィードバックからの強化学習）とどう違うのか？伝統的な RLHF では、人間のラベラーが出力をランク付けし、モデルは高いランクを得る出力を学習する。これは機能するが、スケールしにくい——大量のラベラーが必要で、その判断には不整合が生じる。Constitutional AI は、そうした人間のフィードックの大部分を書面化された原則のセットで置き換える。モデルはこれらの原則に基づいて自身の出力を評価し、修正し、修正版が訓練シグナルとなる。結果として、定義された価値観により沿った、訓練コストが大幅に低いモデルが生まれる。

完璧か？そうではない。批評家は、自己批判に基づく訓練を受けたモデルが、書いた「憲法」のバイアスを反映した盲点を開発しうると指摘している。正当な懸念だ。しかし、このアプローチは実践でうまく機能しており、Claude は HELM 評価スイートなどのセキュリティベンチマークで常にトップクラスの AI モデルにランクされている。

## Claude：一つの製品ではなく、モデルファミリー

2024年3月までに、Anthropic は Claude 3 をリリースしていた。これは本当に異なるトレードオフプロファイルを持つ3つのモデルのファミリーだ。このラインナップは当初、一部の人々を混乱させた——OpenAI が本質的に2つしかモデルを持っていないのに（GPT-4 と GPT-3.5）、なぜ3つもリリースするのか？

答えは価格設定とレイテンシーにある。Claude 3 Opus はヘビー級で、推論ベンチマークでは GPT-4 Turbo に匹敵するが、百万入力トークンあたり15ドル、百万出力トークンあたり75ドルのコストがかかる。Claude 3 Sonnet は中間層——Opus の約80%の能力を5分の1のコストで提供する。そして Claude 3 Haiku はスピードスターだ——クエリを1秒未満で処理し、百万入力トークンあたりわずか0.25ドルのコスト。

このラインナップの真の巧妙さは、プロバイダーを切り替えることなく、きめ細かなコスト-パフォーマンス判断ができることだ。素早い分類タスク？Haiku。慎重な推論を必要とする法的ブリーフィング？Opus。ほとんどのプロダクションユースケース？Sonnet が十分に対応する。私は個人的に異なるプロジェクトで3つすべてを使用してきたが、ほとんどの実世界のアプリケーションにおいて、Sonnet と Opus の差は予想よりずっと小さい。

2024年後半、Anthropic は Claude 3.5 Sonnet でさらに先を行き、ミッドレンジの価格帯を維持しながら、複数のコーディングベンチマークで元の Opus を実際に上回った。これは、同社のアーキテクチャリサーチが予想外の形で実を結んでいることを示す強力なシグナルだった。

## 長いコンテキストの優位性

Claude の最も特徴的な機能の一つは、そのコンテキストウィンドウだ。Claude 3 のローンチ時には、最大20万トークンの入力に対応していた——約15万語、つまり長編小説3冊分に相当する。比較すると、GPT-4 Turbo はローンチ時に128Kトークンを提供していた。

なぜコンテキストの長さが重要なのか？現実世界の多くのタスクが大量のドキュメントの処理を含むからだ。法的発見手続きは何千ページもの契約書の読み込みを含む。コードレビューは個々の関数だけでなく、リポジトリ全体の理解を必要とする。学術研究は、合わせて数百ページに及ぶ論文の統合を意味する。

私は一度、180ページの SaaS 契約書全体を Claude 3 Opus に渡し、買い手に責任リスクを生じさせる可能性のある条款をすべて特定するよう依頼した。14個の問題を見つけたが、うち2つは法務チームの第一回レビューで見落としていたものだった。シニア弁護士ほど徹底していたか？そうではない——第12.3条の微妙な補償条項を見落としていた。しかし、弁護士が丸2日かかる作業を45秒でこなし、コストは1ドル未満だった。

トレードオフはレイテンシーだ。Anthropic の最適化された推論スタックを使用しても、20万トークンの処理には時間がかかる。リアルタイムチャットアプリケーションには、より小さなコンテキストウィンドウを使用し、プロンプトを簡潔に保つ方が通常は良い。しかし、バッチ処理、ドキュメント分析、リサーチワークフローにとっては、長いコンテキストは真のゲームチェンジャーだ。

## 企業向け戦略

Anthropic の商業戦略は OpenAI のものとは著しく異なっていた。OpenAI が ChatGPT で消費者の採用を追い求め、GPT のマーケットプレイスを構築する一方で、Anthropic はエンタープライズ統合と開発者ツールに集中した。

2023年9月に発表された Amazon との提携は決定的だった。Amazon は Anthropic に最大40億ドルを投資し、Claude を AWS Bedrock 経由で利用可能にした。この取引により、Anthropic は Amazon の巨大なエンタープライズ顧客基盤へのアクセスを得た——すでに AWS でインフラを運用し、別個のベンダー関係を管理せずに AI 機能を追加したい企業たちだ。

Google が20億ドルの独自投資で続いた。Amazon と Google からの二重の支援により、Anthropic はシリコンバレーでは稀なものを手にした——いずれかに完全に所有されることなく、2大クラウドプロバイダーと同時に深い関係を築くレバレッジだ。

開発者側では、Anthropic の API 定価は競争力があった。Claude API は GPT-4 よりも大幅に安い価格でローンチされ、特に入力集中型のワークロードでは顕著だった。モデルファミリーアプローチと組み合わせることで、GPT-4 のプレミアム価格を許容できないスタートアップや中規模企業にとって、Claude は魅力的な選択肢となった。

## 正直な限界

Anthropic について書く際にその制約を認めないのは不誠実だ。Claude の画像理解能力は堅実だが、歴史的に GPT-4V のマルチモーダル機能に遅れをとってきた。モデルはアップロードした画像を分析できるが、画像を生成することはできない——クリエイティブワークフローにとって重要な制限だ。

Claude の知識のカットオフ日也是一个痛点。何ヶ月もの間、Claude の訓練データにはハードなカットオフがあり、最近の出来事を議論できなかった。Anthropic はウェブ検索の統合でこれを改善したが、一部の競合他社のアプローチほどシームレスではない。

哲学的な問題もある：セキュリティを優先する企業は、より速く動き、より多くのリスクを取る競合他社に遅れを取らずにやっていけるのか？現時点まで、Anthropic は競争力を維持してきた——Claude 3.5 Sonnet は複数の標準ベンチマークで GPT-4 に匹敵または上回った。しかしプレッシャーは容赦なく、毎四半期ごとに OpenAI、Google、Meta、そして DeepSeek や Alibaba の Qwen チームなど中国のラボからも新しいモデルが登場する。

## Anthropic の行く先

2025年初頭、Anthropic は Claude 4 の開発に取り組み、エージェンティック AI——テキストを生成するだけでなく行動を実行できるシステム——に進出している。2024年末にリリースされたコンピュータ使用機能により、Claude はデスクトップ環境の操作、ボタンのクリック、フォームの入力、ウェブサイトのナビゲーションが可能になる。まだ粗い部分はある——複雑なマルチステップタスクのエラー率はほとんどの開発者が望むよりも高い——しかし、AI アシスタントが話をするだけでなく、実際に仕事をする未来を示している。

同社は AI ポリシーについても積極的に発言しており、詳細な責任あるスケーリングポリシーを公開し、セキュリティ意識の低い競合他社と公平に戦える規制を提唱している。この提唱が効果的な政策につながるかどうかはまだわからないが、規制を障害と見なしがちな業界においては真の差別化要因だ。

Anthropic の賭けは究極的にシンプルだ：AI システムがより強力になるにつれて、その力を信頼できると証明した企業が勝つという賭けだ。まだ決着はついていないが、初期の結果は有望だ。Claude は信頼性の高い安全な AI を必要とする開発者と企業の信頼を勝ち取った。そして年間数千億ドル規模で成長する市場において、信頼こそが最も価値のある資産かもしれない。`,
    pt: `# Anthropic e Claude: A empresa que aposta que segurança em IA é um bom negócio

Em janeiro de 2021, Dario Amodei deixou seu cargo de vice-presidente de pesquisa na OpenAI. Sua irmã Daniela fez o mesmo. Eles levaram consigo algumas das mentes mais brilhantes do aprendizado de máquina — pessoas que haviam ajudado a construir o GPT-3, co-escrito alguns dos artigos sobre segurança mais citados do campo, e que estavam profundamente desconfortáveis com a direção que seu empregador estava tomando. A empresa que fundaram no mesmo ano, a Anthropic, arrecadaria mais de 7,3 bilhões de dólares em financiamento, alcançaria uma avaliação superior a 60 bilhões de dólares e construiria um dos modelos de IA mais discutidos do mundo: o Claude.

É uma trajetória notável para uma empresa cuja proposta central é essencialmente "vamos fazer isso com mais cuidado do que todo mundo."

## A aposta na segurança primeiro

A maioria das empresas de IA trata a segurança como um centro de custo — algo que se acrescenta depois que o produto é construído. A Anthropic inverteu essa lógica. Desde o início, a pesquisa em segurança não era um departamento; era o próprio processo de desenvolvimento do produto. A equipe desenvolveu o Constitutional AI, uma metodologia de treinamento que incorpora princípios como utilidade, inofensividade e honestidade diretamente no comportamento do modelo por meio de um processo de autocrítica e revisão.

O que diferencia o Constitutional AI do RLHF padrão (Reinforcement Learning from Human Feedback)? No RLHF tradicional, rotuladores humanos classificam as saídas do modelo, e ele aprende a produzir saídas que recebem classificações mais altas. Funciona, mas escala mal — é necessário um exército de rotuladores, e seus julgamentos introduzem inconsistências. O Constitutional AI substitui grande parte desse feedback humano por um conjunto de princípios escritos. O modelo avalia suas próprias saídas contra esses princípios, as revisa, e a versão revisada se torna o sinal de treinamento. O resultado é um modelo mais alinhado com os valores declarados e significativamente mais barato para treinar.

É perfeito? Não. Críticos apontaram que um modelo treinado em autocrítica pode desenvolver pontos cegos que refletem os vieses da "constituição" que se escreve. É uma preocupação legítima. Mas a abordagem se saiu bem na prática, e o Claude consistentemente se classifica entre os melhores modelos de IA em benchmarks de segurança como a suíte de avaliação HELM.

## Claude: Uma família de modelos, não um único produto

Em março de 2024, a Anthropic havia lançado o Claude 3, uma família de três modelos com perfis de compromisso genuinamente diferentes. A linha confundiu alguns no início — por que lançar três modelos quando a OpenAI tinha essencialmente dois (GPT-4 e GPT-3.5)?

A resposta está no preço e na latência. O Claude 3 Opus é o peso pesado, comparável ao GPT-4 Turbo em benchmarks de raciocínio, mas custa 15 dólares por milhão de tokens de entrada e 75 dólares por milhão de tokens de saída. O Claude 3 Sonnet fica no meio — aproximadamente 80% da capacidade do Opus a cerca de um quinto do custo. E o Claude 3 Haiku é o demônio da velocidade: processa consultas em menos de um segundo e custa apenas 0,25 dólares por milhão de tokens de entrada.

O verdadeiro gênio dessa linha é que ela permite que desenvolvedores tomem decisões granulares de custo-benefício sem trocar de provedor. Precisa de uma tarefa de classificação rápida? Haiku. Escrevendo um parecer jurídico que exige raciocínio cuidadoso? Opus. A maioria dos casos de uso em produção? Sonnet dá conta. Pessoalmente, usei os três em diferentes projetos, e a diferença entre Sonnet e Opus é mais estreita do que se esperaria para a maioria das aplicações reais.

Mais tarde em 2024, a Anthropic foi além com o Claude 3.5 Sonnet, que realmente superou o Opus original em vários benchmarks de programação enquanto manteve o ponto de preço intermediário. Foi um sinal forte de que a pesquisa de arquitetura da empresa estava rendendo frutos de maneiras inesperadas.

## A vantagem do contexto longo

Uma das características mais distintivas do Claude é sua janela de contexto. Quando o Claude 3 foi lançado, ele suportava até 200.000 tokens de entrada — aproximadamente 150.000 palavras, ou cerca de três romances completos. Em comparação, o GPT-4 Turbo oferecia 128K tokens no lançamento.

Por que o comprimento do contexto importa? Porque muitas tarefas do mundo real envolvem o processamento de grandes documentos. A descoberta jurídica envolve a leitura de milhares de páginas de contratos. A revisão de código requer a compreensão de repositórios inteiros, não apenas de funções individuais. A pesquisa acadêmica significa a síntese de artigos que, coletivamente, somam centenas de páginas.

Uma vez alimentei o Claude 3 Opus com um contrato SaaS completo de 180 páginas e pedi que ele identificasse cada cláusula que pudesse criar exposição à responsabilidade para o comprador. Ele encontrou 14 problemas, incluindo dois que nossa equipe jurídica havia perdido em sua primeira revisão. Foi tão minucioso quanto um advogado sênior? Não exatamente — ele perdeu uma sutileza de indenização na Seção 12.3. Mas fez em 45 segundos o que teria levado a um advogado dois dias inteiros, e o custo foi inferior a um dólar.

O compromisso é a latência. Processar 200K tokens leva tempo, mesmo com a pilha de inferência otimizada da Anthropic. Para aplicativos de chat em tempo real, geralmente é melhor usar uma janela de contexto menor e manter os prompts concisos. Mas para processamento em lote, análise de documentos e fluxos de pesquisa, o contexto longo é um verdadeiro divisor de águas.

## A estratégia empresarial

A estratégia comercial da Anthropic tem sido notavelmente diferente da da OpenAI. Enquanto a OpenAI buscava adoção do consumidor com o ChatGPT e construía um marketplace para GPTs, a Anthropic se concentrou na integração empresarial e nas ferramentas para desenvolvedores.

A parceria com a Amazon, anunciada em setembro de 2023, foi crucial. A Amazon investiu até 4 bilhões de dólares na Anthropic e tornou o Claude disponível via AWS Bedrock. Esse acordo deu à Anthropic acesso à enorme base de clientes empresariais da Amazon — empresas que já executavam sua infraestrutura na AWS e queriam adicionar capacidades de IA sem gerenciar uma relação com fornecedor separado.

O Google seguiu com seu próprio investimento de 2 bilhões de dólares. O apoio duplo da Amazon e do Google deu à Anthropic algo raro no Vale do Silício: alavancagem com dois dos maiores provedores de nuvem simultaneamente, sem ser totalmente de propriedade de nenhum dos dois.

Do lado do desenvolvedor, a precificação da API da Anthropic tem sido competitiva. A API do Claude foi lançada a preços que superavam significativamente os do GPT-4, particularmente para workloads intensivos em entrada. Combinado com a abordagem de família de modelos, isso fez do Claude uma opção atraente para startups e empresas de médio porte que não podiam arcar com os preços premium do GPT-4.

## As limitações honestas

Seria desonesto escrever sobre a Anthropic sem reconhecer suas restrições. As capacidades de compreensão de imagem do Claude, embora sólidas, historicamente ficaram atrás dos recursos multimodais do GPT-4V. O modelo pode analisar imagens que você carrega, mas não pode gerar imagens — uma limitação que importa para fluxos de trabalho criativos.

As datas de corte de conhecimento do Claude também têm sido um ponto de dor. Durante meses, os dados de treinamento do Claude tinham um corte rígido que significava que ele não podia discutir eventos recentes. A Anthropic melhorou isso com a integração de busca na web, mas ainda não é tão fluido quanto as abordagens de alguns concorrentes.

Também há a questão filosófica: uma empresa que prioriza a segurança pode acompanhar concorrentes dispostos a se mover mais rápido e aceitar mais risco? Até agora, a Anthropic conseguiu manter-se competitiva — o Claude 3.5 Sonnet igualou ou superou o GPT-4 em vários benchmarks padrão. Mas a pressão é implacável, e a cada trimestre surgem novos modelos da OpenAI, Google, Meta e cada vez mais de laboratórios chineses como DeepSeek e a equipe Qwen da Alibaba.

## Para onde a Anthropic está indo

No início de 2025, a Anthropic está trabalhando no Claude 4 e se aventurando na IA agêntica — sistemas que podem executar ações, não apenas gerar texto. Sua capacidade de uso do computador, lançada no final de 2024, permite ao Claude controlar um ambiente de desktop, clicar em botões, preencher formulários e navegar em sites. Ainda é grosseiro — a taxa de erro em tarefas complexas de múltiplas etapas é mais alta do que a maioria dos desenvolvedores gostaria — mas aponta para um futuro onde assistentes de IA fazem trabalho real em vez de apenas falar sobre ele.

A empresa também tem sido vocal sobre política de IA, publicando políticas detalhadas de escalonamento responsável e defendendo regulamentações que acredita nivelariam o campo de jogo com concorrentes menos conscientes em termos de segurança. Se essa defesa se traduzirá em políticas eficazes ainda resta ver, mas é um diferenciador genuíno em uma indústria que frequentemente trata a regulamentação como um obstáculo.

A aposta da Anthropic é, em última instância, simples: que à medida que os sistemas de IA se tornam mais poderosos, as empresas que provarem que podem ser confiáveis com esse poder ganharão. É uma aposta que ainda não foi resolvida, mas os primeiros resultados são promissores. O Claude conquistou a confiança de desenvolvedores e empresas que precisam de IA confiável e segura. E em um mercado que cresce em centenas de bilhões de dólares por ano, a confiança pode ser o ativo mais valioso de todos.`,
    ru: `# Anthropic и Claude: компания, ставящая на то, что безопасность ИИ — это прибыльно

В январе 2021 года Дарио Амодеи покинул пост вице-президента по исследованиям в OpenAI. Его сестра Даниэла последовала его примеру. Они ушли не одни — с ними отправились одни из лучших умов в области машинного обучения: люди, которые помогали создавать GPT-3, были соавторами наиболее цитируемых в отрасли работ по безопасности и глубоко беспокоились о направлении, в котором двигался их работодатель. Компания, основанная ими в том же году, Anthropic, в итоге привлекла более 7,3 миллиарда долларов финансирования, достигла оценки свыше 60 миллиардов долларов и создала одну из самых обсуждаемых моделей ИИ в мире — Claude.

Поразительная траектория для компании, ключевой посыл которой по сути звучит так: «Мы будем делать это осторожнее, чем все остальные».

## Ставка на безопасность прежде всего

Большинство ИИ-компаний рассматривают безопасность как центр затрат — нечто, что добавляется к продукту после его создания. Anthropic перевернула эту логику. С самого начала исследования в области безопасности были не отделом, а самим процессом разработки продукта. Команда разработала Constitutional AI — методологию обучения, которая встраивает принципы полезности, безвредности и честности прямо в поведение модели через процесс самокритики и переработки.

Чем Constitutional AI отличается от стандартного RLHF (обучение с подкреплением от обратной связи человека)? В традиционном RLHF люди-разметчики ранжируют выходы модели, и модель учится производить выходы, которые получают более высокие оценки. Это работает, но плохо масштабируется — нужна армия разметчиков, а их суждения вносят несогласованность. Constitutional AI заменяет значительную часть этого человеческого обратного связи набором письменных принципов. Модель оценивает свои собственные выходы по этим принципам, перерабатывает их, и переработанная версия становится обучающим сигналом. Результат — модель, более соответствующая заявленным ценностям и значительно дешевле в обучении.

Идеален ли он? Нет. Критики указывали, что модель, обученная на самокритике, может развить слепые зоны, отражающие предубеждения в написанной «конституции». Это обоснованное опасение. Но подход хорошо себя зарекомендовал на практике, и Claude неизменно входит в число лучших моделей ИИ по бенчмаркам безопасности, таким как оценочный пакет HELM.

## Claude: семейство моделей, а не один продукт

К марту 2024 года Anthropic выпустила Claude 3 — семейство из трёх моделей с принципиально разными профилями компромиссов. Линейка поначалу сбивала с толку: зачем выпускать три модели, когда у OpenAI фактически две (GPT-4 и GPT-3.5)?

Ответ — в ценообразовании и задержках. Claude 3 Opus — тяжеловес, сопоставимый с GPT-4 Turbo по бенчмаркам рассуждений, но стоит 15 долларов за миллион входных токенов и 75 долларов за миллион выходных. Claude 3 Sonnet — среднее звено: примерно 80% возможностей Opus при пятой части стоимости. Claude 3 Haiku — спринтер: обрабатывает запросы менее чем за секунду и стоит всего 0,25 доллара за миллион входных токенов.

Настоящий гений этой линейки в том, что разработчики могут принимать тонкие решения о соотношении цена-производительность, не меняя провайдера. Быстрая классификация? Haiku. Юридический меморандум, требующий тщательных рассуждений? Opus. Большинство продакшн-сценариев? Sonnet справляется отлично. Я лично использовал все три в разных проектах, и разрыв между Sonnet и Opus для большинства реальных приложений оказывается уже, чем ожидалось.

Позже в 2024 году Anthropic пошла дальше с Claude 3.5 Sonnet, который реально превзошёл первоначальный Opus по нескольким бенчмаркам программирования, сохранив при этом средний ценовой уровень. Это был сильный сигнал о том, что архитектурные исследования компании приносят неожиданные плоды.

## Преимущество длинного контекста

Одна из наиболее характерных черт Claude — его контекстное окно. При запуске Claude 3 поддерживал до 200 000 входных токенов — примерно 150 000 слов, или около трёх полноценных романов. Для сравнения, GPT-4 Turbo при запуске предлагал 128K токенов.

Почему важна длина контекста? Потому что многие реальные задачи требуют обработки больших документов. Юридическое обнаружение — это чтение тысяч страниц контрактов. Ревью кода требует понимания целых репозиториев, а не только отдельных функций. Академические исследования — это синтез статей, которые в совокупности насчитывают сотни страниц.

Я однажды загрузил в Claude 3 Opus полный 180-страничный SaaS-контракт и попросил выявить каждый пункт, способный создать ответственность для покупателя. Модель нашла 14 проблем, включая две, которые наш юридический команд пропустил при первой проверке. Был ли он столь же дотошен, как старший юрист? Не совсем — он пропустил тонкий нюанс возмещения убытков в разделе 12.3. Но он сделал за 45 секунд то, что заняло бы у юриста два полных дня, а стоимость составила менее доллара.

Компромисс — в задержках. Обработка 200K токенов занимает время, даже с оптимизированным инференс-стеком Anthropic. Для приложений чата в реальном времени обычно лучше использовать меньшее контекстное окно и держать промпты лаконичными. Но для пакетной обработки, анализа документов и исследовательских рабочих процессов длинный контекст — настоящий прорыв.

## Корпоративная стратегия

Коммерческая стратегия Anthropic заметно отличалась от стратегии OpenAI. В то время как OpenAI гналась за потребительским признанием через ChatGPT и строила маркетплейс для GPT, Anthropic сосредоточилась на корпоративной интеграции и инструментах для разработчиков.

Партнёрство с Amazon, объявленное в сентябре 2023 года, стало поворотным моментом. Amazon инвестировал до 4 миллиардов долларов в Anthropic и сделал Claude доступным через AWS Bedrock. Эта сделка дала Anthropic доступ к огромной базе корпоративных клиентов Amazon — компаний, которые уже работали на AWS и хотели добавить ИИ-возможности без отдельных отношений с поставщиком.

Google последовал с собственной инвестицией в 2 миллиарда долларов. Двойная поддержка от Amazon и Google дала Anthropic редкое для Кремниевой долины преимущество: рычаги влияния у двух крупнейших облачных провайдеров одновременно, без полного подчинения ни одному из них.

На стороне разработчиков ценообразование API Anthropic было конкурентоспособным. Claude API был запущен по ценам, значительно уступающим GPT-4, особенно для нагрузок с высокой интенсивностью ввода. В сочетании с подходом семейства моделей это сделало Claude привлекательным вариантом для стартапов и средних компаний, которые не могли позволить себе премиальные цены GPT-4.

## Честные ограничения

Было бы нечестно писать об Anthropic, не признавая её ограничений. Возможности понимания изображений у Claude, хотя и солидные, исторически отставали от мультимодальных функций GPT-4V. Модель может анализировать загруженные изображения, но не может генерировать новые — ограничение, важное для творческих рабочих процессов.

Даты отсечки знаний Claude тоже были болевой точкой. Месяцами обучающие данные Claude имели жёсткую отсечку, из-за которой модель не могла обсуждать недавние события. Anthropic улучшила ситуацию интеграцией веб-поиска, но до безшовности конкурентов ещё далеко.

Есть и философский вопрос: может ли компания, ставящая безопасность во главу угла, угнаться за конкурентами, готовыми двигаться быстрее и принимать большие риски? На данный момент Anthropic удерживает конкурентоспособность — Claude 3.5 Sonnet сравнялся или превзошёл GPT-4 по нескольким стандартным бенчмаркам. Но давление неослабное, и каждый квартал приносит новые модели от OpenAI, Google, Meta и всё чаще от китайских лабораторий вроде DeepSeek и команды Qwen от Alibaba.

## Куда движется Anthropic

На начало 2025 года Anthropic работает над Claude 4 и входит в область агентного ИИ — систем, способных выполнять действия, а не только генерировать текст. Их возможность использования компьютера, выпущенная в конце 2024 года, позволяет Claude управлять рабочим столом, нажимать кнопки, заполнять формы и перемещаться по веб-сайтам. Это пока сыро — процент ошибок на сложных многошаговых задачах выше, чем хотелось бы большинству разработчиков — но указывает на будущее, в котором ИИ-ассистенты выполняют реальную работу, а не просто говорят о ней.

Компания также активно высказывается по вопросам ИИ-политики, публикуя детальные политики ответственного масштабирования и выступая за регулирование, которое, по их мнению, уравняло бы правила игры с менее ответственными в вопросах безопасности конкурентами. Перейдёт ли эта адвокация в эффективную политику — покажет время, но это настоящий дифференциатор в индустрии, которая часто воспринимает регулирование как препятствие.

Ставка Anthropic в конечном счёте проста: по мере того как ИИ-системы становятся мощнее, побеждать будут те компании, которые докажут, что им можно доверять эту мощь. Ставка ещё не сыграна, но первые результаты обнадёживают. Claude завоевал доверие разработчиков и компаний, которым нужен надёжный и безопасный ИИ. А на рынке, который растёт на сотни миллиардов долларов ежегодно, доверие — пожалуй, самый ценный актив из всех.`,
  },
  author: 'AI Research Team',
  date: '2024-11-10',
  category: 'Company',
  tags: ['Anthropic', 'Claude', 'AI Safety'],
};

export default postAnthropicClaudeCompanyOverview;
