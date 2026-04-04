import { BlogPost } from '../../types';

const postHowIWriteSoftwareWithLlms: BlogPost = {
  id: '3207',
  slug: 'how-i-write-software-with-llms',
  title: {
    en: 'How I Write Software With LLMs: A Practical Multi-Model Workflow',
    cn: '我如何用 LLM 写软件：一套实用的多模型工作流',
    tw: '我如何用 LLM 寫軟體：一套實用的多模型工作流',
    de: 'Wie ich Software mit LLMs schreibe: Ein praktischer Multi-Model-Workflow',
    es: 'Cómo escribo software con LLMs: Un flujo de trabajo práctico multi-modelo',
    fr: "Comment j'écris des logiciels avec des LLMs : un flux de travail multi-modèles pratique",
    jp: 'LLM でソフトウェアを書く方法：実践的なマルチモデルワークフロー',
    pt: 'Como eu escrevo software com LLMs: Um fluxo de trabalho prático multi-modelo',
    ru: 'Как я пишу программное обеспечение с помощью LLM: практический мультимодельный workflow',
  },
  excerpt: {
    en: 'Stavros published a detailed write-up in March 2026 describing a multi-model workflow for shipping real software projects with LLMs. The key insight: use a planning model as architect, a cheaper model for implementation, and multiple reviewers.',
    cn: 'Stavros 于2026年3月发表了一篇详细文章，描述了用 LLM 交付真实软件项目的多模型工作流。核心思路：用一个规划模型做架构师，用更便宜的模型做实现，用多个模型做审查。',
    tw: 'Stavros 於2026年3月發表了一篇詳細文章，描述了用 LLM 交付真實軟體專案的多模型工作流。核心思路：用一個規劃模型做架構師，用更便宜的模型做實現，用多個模型做審查。',
    de: 'Stavros veröffentlichte im März 2026 einen detaillierten Beitrag über einen Multi-Model-Workflow für echte Softwareprojekte mit LLMs. Die Hauptidee: Ein Planungsmodell als Architekt, ein günstigeres Modell für die Implementierung und mehrere Reviewer.',
    es: 'Stavros publicó un artículo detallado en marzo de 2026 describiendo un flujo de trabajo multi-modelo para entregar proyectos de software reales con LLMs. La idea clave: usar un modelo de planificación como arquitecto, uno más barato para implementación y múltiples revisores.',
    fr: "Stavros a publié un article détaillé en mars 2026 décrivant un flux de travail multi-modèles pour livrer de vrais projets logiciels avec des LLMs. L'idée clé : utiliser un modèle de planification comme architecte, un moins cher pour l'implémentation et plusieurs reviewers.",
    jp: 'Stavros は2026年3月に、LLM で本番ソフトウェアプロジェクトを納品するためのマルチモデルワークフローを詳しく紹介する記事を発表しました。核心的な考え：計画モデルをアーキテクトとして使い、安価なモデルで実装し、複数のモデルでレビューします。',
    pt: 'Stavros publicou um artigo detalhado em março de 2026 descrevendo um fluxo de trabalho multi-modelo para entregar projetos de software reais com LLMs. A ideia-chave: usar um modelo de planejamento como arquiteto, um mais barato para implementação e múltiplos revisores.',
    ru: 'Ставрос опубликовал в марте 2026 года подробную статью о мультимодельном workflow для реальных программных проектов на LLM. Ключевая идея: использовать планирующую модель как архитектора, более дешёвую — для реализации, и несколько моделей-ревьюеров.',
  },
  content: {
    en: `# How I Write Software With LLMs: A Practical Multi-Model Workflow

On March 10, 2026, Stavros published what may be the most honest and practical guide to building software with large language models. Not a hype piece. Not a "look what the AI made in 10 minutes" demo. A real workflow, tested across multiple shipped projects, with clear-eyed acknowledgment of where it works and where it breaks.

The post matters because most writing about AI-assisted development falls into two camps: breathless enthusiasm or dismissive skepticism. Stavros lands somewhere more useful — he uses LLMs heavily, enjoys it, and still describes the failure modes with precision.

## The Starting Point: Making Things, Not Programming

Stavros opens with a distinction that reframes the entire conversation. He doesn't care about programming as an end in itself. He cares about making things. LLMs changed the equation by making programming feel closer to direct construction — less time fighting syntax, more time shaping what the software actually does.

This matters because it shifts the value proposition. If your goal is the craft of coding, LLMs might feel like cheating. If your goal is shipping working software, LLMs are a force multiplier. Stavros falls firmly in the second camp, and his workflow reflects that priority.

He has used this approach to build and maintain several projects: a personal assistant called Stavrobot, a voice-note recording device, an art-clock project, and a small town simulation called Pine Town. These aren't toy demos. They're maintained, evolving codebases with real users and real requirements.

## The Three-Model Architecture

The core of Stavros's workflow is a separation of concerns across three model roles. Each role uses a different model, selected for the specific task. This isn't about finding the "best" model — it's about matching model strengths to workflow stages.

### 1. The Planning Model (Architect)

The first model acts as the architect. Stavros spends up to 30 minutes in conversation with this model before any code is written. The discussion covers goals, trade-offs, edge cases, and architectural decisions. The key instruction he gives: don't start implementing until I explicitly approve the plan.

This constraint is critical. LLMs are eager to generate code. Without a hard gate, the planning conversation slides into implementation before the design is settled. By enforcing a "no code until approved" rule, Stavros gets the thinking separated from the typing.

The planning model needs to be strong at reasoning and trade-off analysis. This is where you want the most capable model in your rotation. A weak planning phase creates downstream problems that no amount of implementation skill can fix.

### 2. The Development Model (Implementer)

Once the plan is approved, a cheaper model handles implementation. This model gets limited leeway — it executes the plan, not redesigns it. The instructions are specific: follow the architecture, implement the described changes, don't introduce new patterns without asking.

Using a cheaper model here serves two purposes. First, it's cost-effective for the high-volume token generation that implementation requires. Second, constraining the implementation model reduces the risk of creative deviations from the agreed architecture.

Stavros is explicit about the leeway constraint. An implementation model with too much freedom will "improve" your architecture in ways that break the coherence of the overall design. The plan is the contract. The implementer's job is to fulfill it, not renegotiate it.

### 3. The Review Models (Multiple Reviewers)

After implementation, Stavros runs the code through multiple reviewer models. He specifically mentions using Codex, Gemini, and Opus for review. The diversity matters — different models catch different issues.

One model might flag performance problems. Another might catch edge cases in error handling. A third might notice inconsistencies in naming or API design. Using a single reviewer gives you one perspective. Using multiple reviewers creates overlapping coverage.

This mirrors a principle from human code review: a single reviewer, no matter how skilled, has blind spots. The same is true for models. Diversifying reviewers is cheap insurance against missing issues that any individual model overlooks.

## The Human Writes the Agent Instructions

One detail that separates Stavros's approach from the "let AI do everything" crowd: he writes agent instructions by hand. He does not ask an LLM to generate its own skill file or configuration. The human defines the constraints. The models execute within them.

This is a deliberate choice with a clear rationale. When you ask an LLM to write its own instructions, it optimizes for what it thinks you want to hear, not for what actually works. The generated instructions tend to be verbose, generic, and subtly misaligned with the actual use case. Hand-written instructions are shorter, more specific, and more honest about what the model should and shouldn't do.

## Where It Works Well

The multi-model workflow works best when Stavros already understands the technology stack he's working with. When he knows the frameworks, the patterns, and the expected behavior, he can evaluate the model's output against a clear mental model. He can spot when the implementation deviates from the plan. He can judge whether the reviewer's suggestions are actually improvements.

In this context, LLMs function as a productivity multiplier. The human provides the judgment and architectural vision. The models provide the speed and the mechanical implementation. The division of labor works because each side contributes what it does best.

## Where It Breaks Down

Stavros is candid about the limitation: the workflow works much less well in unfamiliar territory. When you don't understand the technology deeply, you can't effectively evaluate the model's output. Bad decisions compound. The codebase accumulates technical debt that the human doesn't recognize until it's too late.

This is the real operational risk, not the individual bugs or hallucinations that people typically worry about. A single bad output is easy to fix. A series of subtly wrong architectural decisions, accepted because the human couldn't evaluate them, creates a codebase that's expensive to repair.

The compounding design mistake problem is worse than it sounds. Early decisions set patterns that later code follows. If the initial architecture is weak because the human accepted the model's suggestions without sufficient understanding, every subsequent addition reinforces those weaknesses. By the time problems become visible, the cost of correction can exceed the time saved by using LLMs in the first place.

## The Shifting Role of the Developer

Stavros's workflow points to a broader trend in software development. The human role is moving from line-level coding to architecture-level oversight. The day-to-day work shifts from writing functions to defining constraints, evaluating trade-offs, and maintaining the coherence of the overall design.

This doesn't make the human less important. It makes the human's judgment more important, not less. Writing a function is a bounded task with clear success criteria. Defining the right architecture for a project requires understanding requirements, anticipating future needs, and making trade-offs that no model can fully evaluate.

The developers who will thrive in this environment aren't the ones who can code the fastest. They're the ones who can define clean constraints, recognize weak abstractions early, and run a disciplined multi-model process without letting any single model dominate the design.

## Practical Takeaways

If you're considering adopting a similar workflow, here are the principles that make Stavros's approach work:

Separate planning from implementation. Don't let the model start coding until the design is settled. The 30 minutes spent in planning conversation saves hours of rework.

Use different models for different roles. The best reasoning model isn't necessarily the best implementer. Match model strengths to workflow stages.

Diversify your reviewers. Multiple models catch different issues. A single reviewer, human or AI, has blind spots.

Write your own instructions. Don't ask the model to define its own constraints. The human sets the rules; the model follows them.

Stay in familiar territory. Use LLMs to amplify skills you already have. In unfamiliar domains, invest in learning before automating.

Watch for compounding errors. If early decisions feel wrong, investigate before building on top of them. Technical debt from misunderstood architecture is the most expensive kind.

The post is worth reading in full — it's dense with practical insight and refreshingly free of hype. Stavros doesn't claim LLMs will replace developers. He claims they change what developers do, and he shows exactly how he navigates that change in practice.`,
    cn: `# 我如何用 LLM 写软件：一套实用的多模型工作流

2026年3月10日，Stavros 发表了一篇可能是关于用大语言模型构建软件最诚实、最实用的指南。不是炒作文章。不是"看 AI 在10分钟内做出了什么"的演示。而是一套经过多个已交付项目验证的真实工作流，并清晰地指出了它的适用场景和失败模式。

这篇文章之所以重要，是因为大多数关于 AI 辅助开发的写作都落入两个阵营：狂热的拥护者或不屑的怀疑者。Stavros 落在了更有用的位置——他大量使用 LLM，乐在其中，同时精确地描述了失败模式。

## 起点：做东西，而不是写代码

Stavros 用一个区分重新定义了整个对话。他不把编程本身当作目的。他在乎的是做出东西来。LLM 改变了这个等式，让编程感觉更接近直接构建——花更少的时间与语法搏斗，花更多时间塑造软件的实际功能。

这很重要，因为它改变了价值主张。如果你的目标是编码手艺，LLM 可能感觉像作弊。如果你的目标是交付可用的软件，LLM 就是力量倍增器。Stavros 明确站在第二阵营，他的工作流反映了这个优先级。

他用这种方法构建和维护了多个项目：一个叫 Stavrobot 的个人助手、一个语音笔记录制设备、一个艺术时钟项目，以及一个叫 Pine Town 的小镇模拟。这些不是玩具演示。它们是有真实用户和真实需求的、在持续演进的代码库。

## 三模型架构

Stavros 工作流的核心是将关注点分离到三个模型角色中。每个角色使用不同的模型，根据具体任务选择。这不是要找到"最好的"模型，而是将模型优势与工作流阶段匹配。

### 1. 规划模型（架构师）

第一个模型扮演架构师角色。Stavros 在写任何代码之前，会花最多30分钟与这个模型对话。讨论覆盖目标、权衡、边界情况和架构决策。关键指令是：在我明确批准之前不要开始实现。

这个约束至关重要。LLM 渴望生成代码。没有硬性门槛，规划对话会在设计确定之前就滑入实现阶段。通过执行"批准前不写代码"规则，Stavros 把思考和打字分开了。

规划模型需要在推理和权衡分析方面足够强。这是你最应该使用最强模型的环节。薄弱的规划阶段会产生下游问题，无论实现多强都无法弥补。

### 2. 开发模型（实现者）

规划批准后，一个更便宜的模型负责实现。这个模型的自由度有限——它执行计划，而不是重新设计。指令是具体的：遵循架构，实现描述的变更，不经过允许不引入新模式。

使用更便宜的模型有两个目的。第一，对实现所需的高量级 token 生成来说更划算。第二，约束实现模型降低了偏离既定架构的风险。

Stavros 明确提到了自由度的限制。自由度过大的实现模型会以破坏整体设计一致性的方式"改进"你的架构。计划是合同。实现者的工作是履行合同，而不是重新谈判。

### 3. 审查模型（多个审查者）

实现完成后，Stavros 让代码通过多个审查模型。他明确提到了使用 Codex、Gemini 和 Opus 进行审查。多样性很重要——不同的模型捕捉不同的问题。

一个模型可能标记性能问题。另一个可能捕捉错误处理中的边界情况。第三个可能发现命名或 API 设计中的不一致。使用单一审查者给你一个视角。使用多个审查者创造重叠覆盖。

这与人类代码审查的原则一致：单一审查者，无论多强，都有盲点。模型也一样。多元化审查者是低成本的保险，防止遗漏任何单个模型可能忽视的问题。

## 人类手写 Agent 指令

一个将 Stavros 方法与"让 AI 做一切"阵营区分开来的细节：他手写 agent 指令。他不让 LLM 生成自己的技能文件或配置。人类定义约束。模型在约束内执行。

这个选择有清晰的理由。当你让 LLM 写自己的指令时，它优化的是它认为你想听的东西，而不是真正有效的东西。生成的指令往往冗长、通用，且与实际用例微妙地错位。手写的指令更短、更具体、更诚实地说明了模型该做什么和不该做什么。

## 它在哪里效果好

当 Stavros 已经理解他正在使用的技术栈时，多模型工作流效果最好。当他了解框架、模式和预期行为时，他可以对照清晰的心智模型评估模型的输出。他能发现实现何时偏离了计划。他能判断审查者的建议是否真的是改进。

在这种情况下，LLM 充当生产力倍增器。人类提供判断力和架构愿景。模型提供速度和机械实现。分工有效是因为各方贡献了各自最擅长的部分。

## 它在哪里会失败

Stavros 坦率地指出了局限性：在不熟悉的领域，工作流效果差得多。当你不深入理解技术时，你无法有效评估模型的输出。错误决策会累积。代码库堆积出人类直到为时已晚才认识到的技术债务。

这才是真正的运营风险，而不是人们通常担心的个别 bug 或幻觉。一个错误的输出容易修复。一系列微妙的错误架构决策——因为人类无法评估而被接受——创造了一个修复成本高昂的代码库。

设计错误累积的问题比听起来更严重。早期决策设定的模式会被后续代码遵循。如果初始架构因为人类在没有足够理解的情况下接受了模型的建议而薄弱，每一次后续的添加都会强化这些弱点。等到问题变得可见时，纠正的成本可能已经超过当初使用 LLM 节省的时间。

## 开发者角色的转变

Stavros 的工作流指向了软件开发中一个更广泛的转变。人类角色正从代码行级编码转向架构级监督。日常工作从写函数转向定义约束、评估权衡、维护整体设计的一致性。

这不意味着人类变得不那么重要。它意味着人类的判断力更重要了，而不是更不重要了。写函数是一个有明确成功标准的有界任务。为项目定义正确的架构需要理解需求、预见未来需求、做出模型无法完全评估的权衡。

在这个环境中脱颖而出的开发者不是编码最快的。而是能定义清晰约束、尽早识别薄弱抽象、并执行有纪律的多模型流程而不让任何单个模型主导设计的人。

## 实用要点

分离规划与实现。设计确定之前不要让模型开始编码。规划对话中花的30分钟能节省数小时的返工。

为不同角色使用不同模型。最强的推理模型不一定是最好的实现者。将模型优势匹配到工作流阶段。

多元化审查者。多个模型捕捉不同的问题。单一审查者，无论是人类还是 AI，都有盲点。

自己写指令。不要让模型定义自己的约束。人类制定规则，模型遵守规则。

保持在熟悉领域。用 LLM 放大你已有的技能。在不熟悉的领域，先投入学习再投入自动化。

警惕错误累积。如果早期决策感觉不对，在继续构建之前调查清楚。来自被误解的架构的技术债务是最昂贵的。`,
    tw: `# 我如何用 LLM 寫軟體：一套實用的多模型工作流

2026年3月10日，Stavros 發表了一篇可能是關於用大語言模型建構軟體最誠實、最實用的指南。不是炒作文章。不是「看 AI 在10分鐘內做出了什麼」的演示。而是一套經過多個已交付專案驗證的真實工作流，並清晰地指出了它的適用場景和失敗模式。

## 起點：做東西，而不是寫程式

Stavros 用一個區分重新定義了整個對話。他不把程式設計本身當作目的。他在乎的是做出東西來。LLM 改變了這個等式，讓程式設計感覺更接近直接建構——花更少的時間與語法搏鬥，花更多時間塑造軟體的實際功能。

他用這種方法建構和維護了多個專案：一個叫 Stavrobot 的個人助手、一個語音筆記錄製設備、一個藝術時鐘專案，以及一個叫 Pine Town 的小鎮模擬。

## 三模型架構

Stavros 工作流的核心是將關注點分離到三個模型角色中。每個角色使用不同的模型，根據具體任務選擇。

### 1. 規劃模型（架構師）

第一個模型扮演架構師角色。Stavros 在寫任何程式碼之前，會花最多30分鐘與這個模型對話。關鍵指令是：在我明確批准之前不要開始實作。這個約束至關重要。LLM 渴望生成程式碼。沒有硬性門檻，規劃對話會在設計確定之前就滑入實作階段。

### 2. 開發模型（實作者）

規劃批准後，一個更便宜的模型負責實作。這個模型的自由度有限——它執行計劃，而不是重新設計。使用更便宜的模型有兩個目的：對高量級 token 生成來說更划算，同時約束實作模型降低了偏離既定架構的風險。

### 3. 審查模型（多個審查者）

實作完成後，Stavros 讓程式碼通過多個審查模型。他明確提到了使用 Codex、Gemini 和 Opus 進行審查。多樣性很重要——不同的模型捕捉不同的問題。使用多個審查者創造重疊覆蓋。

## 人類手寫 Agent 指令

Stavros 手寫 agent 指令，不讓 LLM 生成自己的技能檔案或配置。人類定義約束。模型在約束內執行。當你讓 LLM 寫自己的指令時，它優化的是它認為你想聽的東西，而不是真正有效的東西。

## 它在哪裡效果好

當 Stavros 已經理解他正在使用的技術堆疊時，多模型工作流效果最好。他能發現實作何時偏離了計劃。他能判斷審查者的建議是否真的是改進。

## 它在哪裡會失敗

在不熟悉的領域，工作流效果差得多。錯誤決策會累積。程式碼庫堆積出人類直到為時已晚才認識到的技術債務。設計錯誤累積的問題比聽起來更嚴重。早期決策設定的模式會被後續程式碼遵循。

## 開發者角色的轉變

人類角色正從程式碼行級編碼轉向架構級監督。在這個環境中脫穎而出的開發者不是編碼最快的。而是能定義清晰約束、儘早識別薄弱抽象、並執行有紀律的多模型流程的人。

## 實用要點

分離規劃與實作。為不同角色使用不同模型。多元化審查者。自己寫指令。保持在熟悉領域。警惕錯誤累積。`,
    de: `# Wie ich Software mit LLMs schreibe: Ein praktischer Multi-Model-Workflow

Am 10. März 2026 veröffentlichte Stavros einen Beitrag, der als ehrlichste und praktischste Anleitung zum Softwarebau mit großen Sprachmodellen gelten kann. Kein Hype-Artikel. Sondern ein echter Workflow, der über mehrere ausgelieferte Projekte getestet wurde.

## Der Ausgangspunkt: Dinge machen, nicht programmieren

Stavros unterscheidet zwischen Programmieren als Selbstzweck und dem Ziel, funktionierende Software auszuliefern. LLMs haben die Gleichung verändert, indem sie Programmieren näher an direkte Konstruktion bringen.

Er hat diesen Ansatz für mehrere Projekte genutzt: einen persönlichen Assistenten namens Stavrobot, ein Sprachnotiz-Gerät, ein Kunst-Uhr-Projekt und eine Kleinstadt-Simulation namens Pine Town. Das sind keine Demo-Projekte, sondern gepflegte Codebasen mit echten Anforderern.

## Die Drei-Modell-Architektur

### 1. Das Planungsmodell (Architekt)

Das erste Modell fungiert als Architekt. Stavros verbringt bis zu 30 Minuten im Gespräch mit diesem Modell, bevor Code geschrieben wird. Die Schlüsselanweisung: Beginne nicht mit der Implementierung, bevor ich den Plan ausdrücklich genehmige.

Diese Einschränkung ist entscheidend. LLMs sind darauf aus, Code zu generieren. Ohne eine harte Barriere rutscht das Planungsgespräch in die Implementierung, bevor das Design steht.

### 2. Das Entwicklungsmodell (Implementierer)

Nach der Planungsgenehmigung übernimmt ein günstigeres Modell die Implementierung. Dieses Modell bekommt begrenzten Spielraum — es setzt den Plan um, statt ihn neu zu gestalten.

### 3. Die Review-Modelle (Mehrere Prüfer)

Nach der Implementierung lässt Stavros den Code durch mehrere Review-Modelle laufen. Er nutzt Codex, Gemini und Opus. Die Vielfalt ist wichtig — verschiedene Modelle erwischen verschiedene Probleme.

## Der Mensch schreibt die Agent-Anweisungen

Stavros schreibt Agent-Anweisungen von Hand. Er lässt kein LLM seine eigene Skill-Datei generieren. Der Mensch definiert die Einschränkungen. Die Modelle arbeiten innerhalb dieser Grenzen.

## Wo es gut funktioniert

Der Multi-Model-Workflow funktioniert am besten, wenn Stavros den Technologie-Stack bereits versteht. In diesem Kontext fungieren LLMs als Produktivitätsmultiplikator.

## Wo es scheitert

In unbekanntem Gebiet funktioniert der Workflow deutlich schlechter. Schlechte Entscheidungen kumulieren. Die Codebase sammelt technische Schulden an, die der Mensch erst erkennt, wenn es zu spät ist.

## Praktische Erkenntnisse

Trennen Sie Planung von Implementierung. Nutzen Sie verschiedene Modelle für verschiedene Rollen. Diversifizieren Sie Ihre Reviewer. Schreiben Sie eigene Anweisungen. Bleiben Sie in vertrautem Gebiet. Achten Sie auf kumulierende Fehler.`,
    es: `# Cómo escribo software con LLMs: Un flujo de trabajo práctico multi-modelo

El 10 de marzo de 2026, Stavros publicó lo que podría ser la guía más honesta y práctica para construir software con modelos de lenguaje grandes. No es un artículo de hype. Es un flujo de trabajo real, probado en múltiples proyectos entregados.

## El punto de partida: Hacer cosas, no programar

Stavros hace una distinción que reencuadra toda la conversación. No le importa la programación como fin en sí misma. Le importa hacer cosas. Los LLMs cambiaron la ecuación al acercar la programación a la construcción directa.

Ha usado este enfoque para construir y mantener varios proyectos: un asistente personal llamado Stavrobot, un dispositivo de notas de voz, un proyecto de reloj-artístico y una simulación de pueblo llamada Pine Town.

## La arquitectura de tres modelos

### 1. El modelo de planificación (Arquitecto)

El primer modelo actúa como arquitecto. Stavros pasa hasta 30 minutos en conversación antes de escribir código. La instrucción clave: no empieces a implementar hasta que apruebe explícitamente el plan.

### 2. El modelo de desarrollo (Implementador)

Una vez aprobado el plan, un modelo más barato maneja la implementación. Este modelo tiene libertad limitada — ejecuta el plan, no lo rediseña.

### 3. Los modelos de revisión (Múltiples revisores)

Después de la implementación, Stavros pasa el código por múltiples modelos de revisor. Usa Codex, Gemini y Opus. La diversidad importa — diferentes modelos detectan diferentes problemas.

## El humano escribe las instrucciones del agente

Stavros escribe las instrucciones del agente a mano. No permite que un LLM genere su propio archivo de habilidades. El humano define las restricciones; los modelos ejecutan dentro de ellas.

## Dónde funciona bien

El flujo de trabajo multi-modelo funciona mejor cuando Stavros ya entiende el stack tecnológico. En ese contexto, los LLMs funcionan como un multiplicador de productividad.

## Dónde falla

En territorio desconocido, el flujo de trabajo funciona mucho peor. Las malas decisiones se acumulan. La deuda técnica de arquitecturas mal entendidas es la más cara de reparar.

## Conclusiones prácticas

Separe planificación de implementación. Use diferentes modelos para diferentes roles. Diversifique sus revisores. Escriba sus propias instrucciones. Manténgase en territorio familiar. Vigile los errores acumulados.`,
    fr: `# Comment j'écris des logiciels avec des LLMs : un flux de travail multi-modèles pratique

Le 10 mars 2026, Stavros a publié ce qui pourrait être le guide le plus honnête et pratique pour construire des logiciels avec des grands modèles de langage. Pas un article de promotion. Un flux de travail réel, testé sur plusieurs projets livrés.

## Le point de départ : Faire des choses, pas programmer

Stavros fait une distinction qui recadre toute la conversation. Il ne se soucie pas de la programmation comme fin en soi. Il se soucie de faire des choses. Les LLMs ont changé l'équation en rapprochant la programmation de la construction directe.

Il a utilisé cette approche pour construire et maintenir plusieurs projets : un assistant personnel appelé Stavrobot, un dispositif de notes vocales, un projet d'horloge artistique et une simulation de petite ville appelée Pine Town.

## L'architecture à trois modèles

### 1. Le modèle de planification (Architecte)

Le premier modèle agit comme architecte. Stavros passe jusqu'à 30 minutes en conversation avant d'écrire du code. L'instruction clé : ne commence pas l'implémentation tant que j'approuve explicitement le plan.

### 2. Le modèle de développement (Implémenteur)

Une fois le plan approuvé, un modèle moins cher gère l'implémentation. Ce modèle a une marge limitée — il exécute le plan, ne le redessine pas.

### 3. Les modèles de révision (Plusieurs reviewers)

Après l'implémentation, Stavros fait passer le code par plusieurs modèles de révision. Il utilise Codex, Gemini et Opus. La diversité compte — différents modèles détectent différents problèmes.

## L'humain écrit les instructions de l'agent

Stavros écrit les instructions de l'agent à la main. Il ne demande pas à un LLM de générer son propre fichier de compétences. L'humain définit les contraintes ; les modèles exécutent dans ces limites.

## Où ça fonctionne bien

Le flux de travail multi-modèles fonctionne mieux quand Stavros comprend déjà la stack technologique. Dans ce contexte, les LLMs fonctionnent comme un multiplicateur de productivité.

## Où ça échoue

En terrain inconnu, le flux de travail fonctionne beaucoup moins bien. Les mauvaises décisions s'accumulent. La dette technique d'architectures mal comprises est la plus coûteuse à réparer.

## Enseignements pratiques

Séparez planification et implémentation. Utilisez différents modèles pour différents rôles. Diversifiez vos reviewers. Écrivez vos propres instructions. Restez en terrain familier. Surveillez les erreurs cumulatives.`,
    jp: `# LLM でソフトウェアを書く方法：実践的なマルチモデルワークフロー

2026年3月10日、Stavros は大規模言語モデルでソフトウェアを構築するための最も正直で実践的なガイドを発表しました。ハイプ記事ではありません。複数の納品済みプロジェクトでテストされた、実際のワークフローです。

## 出発点：プログラミングではなく「ものづくり」

Stavros は、プログラミング自体を目的としないという区別で議論を再構成します。彼が気にするのは「ものを作ること」です。LLM はプログラミングを直接的な構築に近づけることで、この方程式を変えました。

彼はこのアプローチで複数のプロジェクトを構築・維持しています。Stavrobot という個人アシスタント、音声メモデバイス、アートクロックプロジェクト、Pine Town という小さな町のシミュレーションなどです。

## 3つのモデルアーキテクチャ

### 1. 計画モデル（アーキテクト）

最初のモデルはアーキテクトとして機能します。コードを書く前に最大30分をこのモデルとの対話に費やします。重要な指示：明示的に承認するまで実装を始めないこと。

### 2. 開発モデル（実装者）

計画が承認されると、より安価なモデルが実装を担当します。このモデルの裁量は限定的——計画を実行するだけで、再設計はしません。

### 3. レビューモデル（複数のレビュー担当者）

実装後、Stavros はコードを複数のレビューモデルに通します。Codex、Gemini、Opus を使用。多様性が重要——異なるモデルが異なる問題を捕捉します。

## 人間がエージェント指示を書く

Stavros はエージェント指示を手書きします。LLM にスキルファイルを生成させません。人間が制約を定義し、モデルがその中で実行します。

## 効果が良い場所

マルチモデルワークフローは、Stavros が技術スタックをすでに理解している場合に最も効果的です。この文脈では、LLM は生産性の乗数として機能します。

## 失敗する場所

馴染みのない領域では、ワークフローの効果が大幅に低下します。間違った設計判断が蓄積し、理解不足のアーキテクチャによる技術的負債が膨らみます。

## 実践的な要点

計画と実装を分離する。異なる役割に異なるモデルを使う。レビュアーを多様化する。指示は自分で書く。馴染みのある領域に留まる。累積的なエラーに注意する。`,
    pt: `# Como eu escrevo software com LLMs: Um fluxo de trabalho prático multi-modelo

Em 10 de março de 2026, Stavros publicou o que pode ser o guia mais honesto e prático para construir software com grandes modelos de linguagem. Não é um artigo de hype. É um fluxo de trabalho real, testado em múltiplos projetos entregues.

## O ponto de partida: Fazer coisas, não programar

Stavros faz uma distincção que reenquadra toda a conversa. Ele não se importa com programação como fim em si mesma. Ele se importa em fazer coisas. Os LLMs mudaram a equação ao aproximar a programação da construção direta.

Ele usou essa abordagem para construir e manter vários projetos: um assistente pessoal chamado Stavrobot, um dispositivo de notas de voz, um projeto de relógio-artístico e uma simulação de cidade pequena chamada Pine Town.

## A arquitetura de três modelos

### 1. O modelo de planejamento (Arquiteto)

O primeiro modelo atua como arquiteto. Stavros passa até 30 minutos em conversação antes de escrever código. A instrução-chave: não comece a implementar até que eu aprove explicitamente o plano.

### 2. O modelo de desenvolvimento (Implementador)

Uma vez aprovado o plano, um modelo mais barato cuida da implementação. Este modelo tem liberdade limitada — executa o plano, não o redesenha.

### 3. Os modelos de revisão (Múltiplos revisores)

Após a implementação, Stavros passa o código por múltiplos modelos de revisão. Usa Codex, Gemini e Opus. A diversidade importa — diferentes modelos detectam diferentes problemas.

## O humano escreve as instruções do agente

Stavros escreve as instruções do agente à mão. Não permite que um LLM gere seu próprio arquivo de habilidades. O humano define as restrições; os modelos executam dentro delas.

## Onde funciona bem

O fluxo de trabalho multi-modelo funciona melhor quando Stavros já entende a stack tecnológica. Nesse contexto, os LLMs funcionam como um multiplicador de produtividade.

## Onde falha

Em território desconhecido, o fluxo de trabalho funciona muito pior. Más decisões se acumulam. A dívida técnica de arquiteturas mal compreendidas é a mais cara de reparar.

## Conclusões práticas

Separe planejamento de implementação. Use diferentes modelos para diferentes papéis. Diversifique seus revisores. Escreva suas próprias instruções. Mantenha-se em território familiar. Fique atento a erros acumulados.`,
    ru: `# Как я пишу программное обеспечение с помощью LLM: практический мультимодельный workflow

10 марта 2026 года Ставрос опубликовал, возможно, самое честное и практичное руководство по разработке ПО с помощью больших языковых моделей. Не хайповая статья. Реальный workflow, проверенный на нескольких реализованных проектах.

## Отправная точка: делать вещи, а не программировать

Ставрос проводит различие, которое переосмысливает весь разговор. Ему не интересно программирование ради самого себя. Ему интересно делать вещи. LLM изменили уравнение, приблизив программирование к прямому конструированию.

Он использовал этот подход для создания и поддержки нескольких проектов: личный ассистент Stavrobot, устройство голосовых заметок, проект арт-часов и симуляция маленького городка Pine Town.

## Трёхмодельная архитектура

### 1. Модель планирования (Архитектор)

Первая модель выступает в роли архитектора. Ставрос тратит до 30 минут на разговор с этой моделью до написания кода. Ключевая инструкция: не начинай реализацию, пока я явно не одобрю план.

Это ограничение критически важно. LLM стремятся генерировать код. Без жёсткого барьера разговор о планировании скатывается в реализацию до того, как дизайн утверждён.

### 2. Модель разработки (Реализатор)

После одобрения плана более дешёвая модель берёт на себя реализацию. Эта модель имеет ограниченные полномочия — выполняет план, а не переделывает его.

### 3. Модели ревью (Несколько проверяющих)

После реализации Ставрос прогоняет код через несколько моделей-ревьюеров. Использует Codex, Gemini и Opus. Разнообразие важно — разные модели ловят разные проблемы.

## Человек пишет инструкции агента

Ставрос пишет инструкции агента вручную. Не просит LLM сгенерировать собственный файл навыков. Человек определяет ограничения; модели работают в этих рамках.

## Где это хорошо работает

Мультимодельный workflow лучше всего работает, когда Ставрос уже понимает технологический стек. В этом контексте LLM выступают как мультипликатор продуктивности.

## Где это ломается

На незнакомой территории workflow работает значительно хуже. Плохие решения накапливаются. Технический долг от непонятой архитектуры — самый дорогой в исправлении.

## Практические выводы

Отделяйте планирование от реализации. Используйте разные модели для разных ролей. Диверсифицируйте ревьюеров. Пишите собственные инструкции. Оставайтесь на знакомой территории. Следите за кумулятивными ошибками.`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-03-25',
  category: 'AI Coding',
  tags: ['LLM', 'Software Development', 'AI Coding', 'Developer Workflow'],
};

export default postHowIWriteSoftwareWithLlms;
