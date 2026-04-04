import { BlogPost } from '../../types';

const postAskHnHowDoYouDealWithPeopleWhoTrustLlms: BlogPost = {
  id: '3213',
  slug: 'ask-hn-how-do-you-deal-with-people-who-trust-llms',
  title: {
    en: 'Ask HN: How Do You Deal With People Who Trust LLMs?',
    cn: 'Ask HN：如何对待那些信任大语言模型的人？',
    tw: 'Ask HN：如何對待那些信任大語言模型的人？',
    de: 'Ask HN: Wie geht man mit Leuten um, die LLMs vertrauen?',
    es: 'Ask HN: ¿Cómo lidias con la gente que confía en los LLMs?',
    fr: 'Ask HN : comment gérer les personnes qui font confiance aux LLM ?',
    jp: 'Ask HN：LLMを信頼する人たちとどう向き合うのか？',
    pt: 'Ask HN: Como lidar com pessoas que confiam em LLMs?',
    ru: 'Ask HN: как общаться с людьми, которые доверяют LLM?',
  },
  excerpt: {
    en: "A Hacker News thread surfaced a problem that's bigger than hallucinations: what happens when people stop treating LLMs as tools and start treating them as authorities. The discussion offers practical patterns for navigating this shift without starting a culture war.",
    cn: '一个 Hacker News 帖子揭示了一个比幻觉更大的问题：当人们不再把大语言模型当作工具，而是开始把它们当作权威时会发生什么。讨论提供了在不引发文化冲突的前提下应对这种转变的实用方法。',
    tw: '一個 Hacker News 貼文揭示了一個比幻覺更大的問題：當人們不再把大語言模型當作工具，而是開始把它們當作權威時會發生什麼。討論提供了在不引發文化衝突的前提下應對這種轉變的實用方法。',
    de: 'Ein Hacker News-Thread brachte ein Problem auf, das größer ist als Halluzinationen: Was passiert, wenn Menschen aufhören, LLMs als Werkzeuge zu behandeln, und sie als Autoritäten sehen.',
    es: 'Un hilo de Hacker News reveló un problema mayor que las alucinaciones: qué pasa cuando la gente deja de tratar los LLMs como herramientas y empieza a tratarlos como autoridades.',
    fr: 'Un fil Hacker News a mis en lumière un problème plus grand que les hallucinations : que se passe-t-il quand les gens cessent de traiter les LLM comme des outils et commencent à les traiter comme des autorités.',
    jp: 'Hacker News のスレッドが、ハリュシネーションよりも大きな問題を浮かび上がらせました：人々がLLMをツールとして扱うのをやめ、権威として扱い始めたときに何が起こるのか。',
    pt: 'Um tópico do Hacker News trouxe à tona um problema maior que alucinações: o que acontece quando as pessoas param de tratar LLMs como ferramentas e começam a tratá-los como autoridades.',
    ru: 'Ветка Hacker News выявила проблему серьёзнее галлюцинаций: что происходит, когда люди перестают воспринимать LLM как инструменты и начинают считать их авторитетами.',
  },
  content: {
    en: `# Ask HN: How Do You Deal With People Who Trust LLMs?

The Hacker News thread isn't about whether AI is useful. That question has been settled in most workplaces. The thread is about what happens when people stop treating large language models as tools and start treating them as authorities.

The original poster describes a scenario that's becoming familiar: someone asks a chatbot a factual question, receives a polished, well-formatted answer, and accepts it as objective truth without checking a reputable source. It's not a hypothetical. It happens in meetings, classrooms, Slack channels, and code reviews every day.

The replies surface a pattern worth examining carefully.

## Two Schools of Thought

The discussion splits roughly into two camps, and the division is more interesting than either side's position.

The first group argues that LLMs are just the newest version of an old problem. People have always trusted weak sources — chain emails, blog posts with no citations, cable news segments that oversimplify complex issues. From this perspective, AI is not uniquely dangerous. It's a faster, more polished delivery mechanism for the same epistemological laziness humans have always exhibited.

The second group disagrees. They argue that LLMs are structurally different from previous sources of misinformation. A bad website can be inspected. You can look at the URL, check who wrote the article, find the original study. A chatbot answer arrives as a clean, confident summary with no visible source chain. The user skips the step where they would normally ask "who is saying this?"

Both groups have a point. And the tension between them is where the practical advice lives.

## Why LLM Confidence Is Socially Complicated

Here's what makes this problem hard to address in practice: challenging someone's reliance on a chatbot sounds like you're being anti-technology. Saying "chatbots hallucinate" in 2026 can land the same way as saying "you can't trust the internet" did in 2005. Technically accurate, socially awkward, and easily dismissed as fear-motivated.

But staying silent has its own cost. When someone presents an LLM-generated summary as evidence in a work meeting or academic paper, and no one pushes back, the standard for what counts as acceptable evidence quietly drops. The issue isn't that the specific claim is wrong. The issue is that the verification step has been removed from the process.

LLM outputs are persuasive because they're coherent. They look finished before they're verified. Old search behavior forced some contact with source material — you saw the URL, you skimmed the article, you noticed if the site looked sketchy. LLMs flatten all of that into a plausible paragraph. The provenance is invisible.

## Practical Patterns From the Thread

The most useful contributions in the thread weren't philosophical. They were tactical. Here's what people reported actually working.

**Challenge the claim, not the person.** Instead of "you shouldn't trust ChatGPT," try "what source is that based on?" This frames you as curious rather than adversarial. It also puts the burden on the claim's foundation, which is where the real weakness usually lives.

**Ask for provenance.** Treat the person as having genuine expertise and ask which book, expert, or study supports the specific point. This works because it's socially generous — you're assuming they know something — while still surfacing whether there's actual backing behind the claim.

**Separate low-stakes and high-stakes use.** Nobody needs to audit whether an LLM correctly summarized a meeting agenda. But using an LLM output as the basis for a hiring decision, medical claim, or legal argument deserves scrutiny. Not all uses carry equal risk, and acting like they do makes you seem unreasonable.

**Demonstrate the problem instead of lecturing.** Pull up a chatbot and push it on a topic you know well. Ask it to take a position, then contradict it. Watch it flip to agreement within two messages. This concrete demonstration is more persuasive than any abstract argument about AI limitations. People see the flattery engine in action and adjust their own behavior.

**Protect your own baseline.** You cannot correct every weak claim that passes through your social and professional circles. Trying to do so will exhaust you and alienate everyone. Instead, model better habits. When you cite something, show your source. When you use AI assistance, say so. When you're uncertain, say that too. Your consistent behavior sets a standard that others may eventually follow.

## The Biggest Risk in Professional Settings

The thread's most sobering contributions focused on workplaces. The risk isn't just hallucination — that's a known limitation that most professionals have heard about by now. The deeper risk is unearned confidence.

An LLM-generated answer sounds authoritative. It moves faster than the willingness to verify it. In a fast-moving meeting, a polished AI summary can redirect a discussion before anyone has time to check whether the underlying data supports the conclusion. The answer arrives pre-packaged, and the social cost of slowing down to verify it feels higher than the risk of accepting it.

This dynamic shows up in code reviews where someone submits AI-generated code that looks clean but contains subtle logical errors. It shows up in research where an LLM summary of a paper misrepresents the authors' actual findings. It shows up in hiring where AI-generated interview questions test for surface knowledge rather than deep understanding.

The pattern is consistent: the output looks more finished than it is, and the social pressure to keep moving discourages the friction that verification requires.

## What This Thread Actually Reveals

Reading through the Hacker News discussion, the most striking thing isn't the advice. It's the shared recognition that this is a social problem, not a technical one.

No amount of model improvement will fix the dynamic where people accept confident-sounding output without verification. Better models produce more plausible output, which can actually make the problem worse. The fix has to happen in habits, norms, and expectations — the human layer, not the model layer.

The thread doesn't offer a clean resolution. What it offers is a set of tested approaches for navigating a world where the line between "tool" and "authority" is getting blurrier. Not by rejecting AI, and not by accepting its output uncritically, but by maintaining the verification habits that reliable knowledge has always required.

That's a harder sell than either "AI is great" or "AI is dangerous." But it's the position that actually matches how the technology is being used — imperfectly, socially, and with real consequences.`,
    cn: `# Ask HN：如何对待那些信任大语言模型的人？

Hacker News 的这个帖子讨论的不是 AI 有没有用。在大多数工作场所，这个问题已经有了答案。帖子讨论的是当人们不再把大语言模型当作工具，而是开始把它们当作权威时会发生什么。

发帖者描述了一个越来越常见的场景：有人向聊天机器人提问一个事实性问题，得到了一个格式精美的答案，然后不加核实就接受了它作为客观事实。这不是假设。它每天都在会议、教室、Slack 频道和代码审查中发生。

回复中浮现出一个值得仔细审视的模式。

## 两种思路

讨论大致分为两个阵营，而分歧本身比任何一方的立场都更有意思。

第一组认为大语言模型只是老问题的新版本。人们一直信任不靠谱的来源——转发邮件、没有引用的博文、过度简化复杂问题的电视新闻。从这个角度看，AI 不是独特的危险。它只是人类一直以来认识论惰性的更快、更精美的传递机制。

第二组不同意。他们认为大语言模型在结构上不同于之前的信息误导来源。一个糟糕的网站可以被检查——你可以看网址、查作者、找原始研究。而聊天机器人的回答以一个干净、自信的摘要形式到达，没有可见的来源链条。用户跳过了他们通常会问"这是谁说的？"的那一步。

两组都有道理。而两者之间的张力正是实用建议所在的地方。

## 为什么 LLM 的自信在社交上很复杂

这个问题在实践中难以处理的原因是：质疑某人对聊天机器人的依赖听起来像是反技术。在2026年说"聊天机器人会幻觉"，可能和2005年说"你不能信任互联网"一样尴尬。技术上准确，社交上笨拙，而且很容易被当作恐惧驱动而打发掉。

但沉默也有代价。当某人在工作会议或学术论文中把大语言模型生成的摘要当作证据呈现，而没有人提出质疑时，什么算可接受证据的标准就悄悄降低了。问题不在于具体的说法是否正确。问题在于验证步骤从过程中被移除了。

LLM 的输出之所以有说服力，是因为它们连贯。它们在被验证之前就看起来已经完成了。旧的搜索行为迫使你接触原始材料——你看到了网址，你浏览了文章，你注意到网站看起来是否可疑。LLM 把所有这些压缩成一段看似合理的段落。出处是不可见的。

## 帖子中的实用方法

帖子中最有用的贡献不是哲学性的，而是战术性的。

**质疑说法，而不是质疑人。** 不要说"你不应该信任 ChatGPT"，而是问"这是基于什么来源的？"这把你定位为好奇而非对抗。

**要求提供出处。** 把对方当作真正有专业知识的人，问哪本书、哪位专家、哪个研究支持这个观点。这样做社交上很得体——你假设对方确实知道什么——同时仍然能暴露说法背后是否有实际支撑。

**区分低风险和高风险使用。** 没人需要审核 LLM 是否正确总结了会议议程。但用 LLM 输出作为招聘决策、医疗主张或法律论据的基础值得审视。

**演示问题而不是说教。** 打开一个聊天机器人，在你熟悉的领域推动它。让它表态，然后反驳它。看着它在两条消息内就改口同意。这种具体的演示比任何关于 AI 局限性的抽象论述都更有说服力。

**保护你自己的底线。** 你无法纠正每一个经过你社交和职业圈的不靠谱说法。试图这样做会让你筋疲力尽、疏远所有人。不如用行动示范更好的习惯。

## 专业环境中最大的风险

帖子中最令人警醒的贡献集中在工作场所。风险不只是幻觉——到2026年大多数专业人士已经知道这个局限。更深层的风险是无根据的自信。

LLM 生成的答案听起来很权威。它比验证它的意愿移动得更快。在一个快节奏的会议中，一个精美的 AI 摘要可以在任何人有时间检查底层数据是否支持结论之前就改变了讨论方向。

这种模式在代码审查中出现——有人提交看起来干净但包含微妙逻辑错误的 AI 生成代码。在研究中出现——LLM 对论文的摘要歪曲了作者的实际发现。在招聘中出现——AI 生成的面试问题测试的是表面知识而非深层理解。

模式是一致的：输出看起来比实际更完善，而继续前进的社交压力抑制了验证所需的摩擦。

## 这个帖子真正揭示的

通读 Hacker News 的讨论，最引人注目的不是建议本身，而是共同的共识：这是一个社会问题，不是技术问题。

任何程度的模型改进都无法修复人们接受听起来自信的输出而不加验证的动态。更好的模型产生更合理的输出，这可能实际上让问题更严重。修复必须发生在习惯、规范和期望层面——人类层，而不是模型层。

帖子没有提供一个干净的解决方案。它提供的是一组经过测试的方法，用于在一个"工具"和"权威"的界限越来越模糊的世界中导航。不是拒绝 AI，也不是不加批判地接受它的输出，而是保持可靠知识一直需要的验证习惯。

这比"AI 很棒"或"AI 很危险"都更难推销。但它才是真正匹配这项技术实际使用方式的立场——不完美地、社会性地、带着真实后果地使用。`,
    tw: `# Ask HN：如何對待那些信任大語言模型的人？

Hacker News 的這個帖子討論的不是 AI 有沒有用。在大多數工作場所，這個問題已經有了答案。帖子討論的是當人們不再把大語言模型當作工具，而是開始把它們當作權威時會發生什麼。

## 兩種思路

討論大致分為兩個陣營。

第一組認為大語言模型只是老問題的新版本。人們一直信任不靠譜的來源——轉發郵件、沒有引用的博文、過度簡化複雜問題的電視新聞。

第二組不同意。他們認為大語言模型在結構上不同於之前的資訊誤導來源。一個糟糕的網站可以被檢查，而聊天機器人的回答以一個乾淨、自信的摘要形式到達，沒有可見的來源鏈條。

## 為什麼 LLM 的自信在社交上很複雜

在2026年說「聊天機器人會幻覺」，可能和2005年說「你不能信任互聯網」一樣尷尬。但沉默也有代價——當有人把 LLM 輸出當作證據呈現而沒有人質疑時，可接受證據的標準就悄悄降低了。

## 實用方法

**質疑說法，而不是質疑人。** 問「這是基於什麼來源的？」而不是「你不應該信任 ChatGPT」。

**要求提供出處。** 把對方當作真正有專業知識的人，問哪本書、哪位專家支持這個觀點。

**區分低風險和高風險使用。** 沒人需要審核 LLM 是否正確總結了會議議程，但用它作為招聘決策或法律論據的基礎值得審視。

**演示問題而不是說教。** 打開聊天機器人，在你熟悉的領域推動它、反駁它，看著它改口。這比抽象論述更有說服力。

**保護你自己的底線。** 用行動示範更好的習慣，而不是試圖糾正每一個不靠譜的說法。

## 專業環境中最大的風險

風險不只是幻覺——更深層的是無根據的自信。LLM 輸出聽起來很权威，比驗證它的意願移動得更快。在快節奏的會議中，精美的 AI 摘要可以在任何人檢查數據之前就改變討論方向。

## 這個帖子真正揭示的

這是一個社會問題，不是技術問題。更好的模型產生更合理的輸出，可能反而讓問題更嚴重。修復必須發生在習慣和規範層面——人類層，而不是模型層。`,
    de: `# Ask HN: Wie geht man mit Leuten um, die LLMs vertrauen?

Der Hacker News-Thread dreht sich nicht darum, ob KI nützlich ist. Es geht darum, was passiert, wenn Menschen aufhören, LLMs als Werkzeuge zu behandeln und sie als Autoritäten sehen.

## Zwei Denkschulen

Die Diskussion teilt sich grob in zwei Lager. Die erste Gruppe argumentiert, dass LLMs nur die neueste Version eines alten Problems sind. Menschen haben schon immer schwachen Quellen vertraut. Die zweite Gruppe ist anderer Meinung und argumentiert, dass LLMs strukturell anders sind — eine saubere, selbstbewusste Zusammenfassung ohne sichtbare Quellenkette.

## Warum LLM-Vertrauen sozial kompliziert ist

Jemanden herauszufordern, der sich auf einen Chatbot verlässt, klingt, als wäre man gegen Technologie. Aber zu schweigen hat auch seinen Preis — der Standard dafür, was als akzeptabler Beweis gilt, sinkt unbemerkt.

## Praktische Muster aus dem Thread

**Herausforderung der Behauptung, nicht der Person.** Statt „Du solltest ChatGPT nicht vertrauen" fragen: „Auf welcher Quelle basiert das?"

**Provenienz erfragen.** Behandeln Sie die Person als Experten und fragen Sie, welches Buch oder welche Studie den Punkt stützt.

**Niedrige und hohe Einsätze trennen.** Niemand muss eine KI-Zusammenfassung einer Besprechungsagenda prüfen. Aber KI-Output als Basis für eine Einstellungsentscheidung oder rechtliche Argumente verdient Prüfung.

**Problem demonstrieren statt predigen.** Öffnen Sie einen Chatbot, fordern Sie ihn in einem Thema heraus, das Sie gut kennen, und widersprechen Sie ihm. Beobachten Sie, wie es innerhalb von zwei Nachrichten zustimmt.

**Eigenen Maßstab schützen.** Zeigen Sie bessere Gewohnheiten durch konsequentes Verhalten.

## Das größte Risiko in beruflichen Umgebungen

Das Risiko ist nicht nur Halluzination — es ist unbegründetes Vertrauen. KI-generierte Antworten klingen maßgebend und bewegen sich schneller als die Bereitschaft, sie zu überprüfen.

## Was dieser Thread wirklich offenbart

Dies ist ein soziales, kein technisches Problem. Bessere Modelle erzeugen plausibleren Output, was das Problem tatsächlich verschlimmern kann. Die Lösung muss auf der Ebene von Gewohnheiten und Normen stattfinden.`,
    es: `# Ask HN: ¿Cómo lidias con la gente que confía en los LLMs?

El hilo de Hacker News no trata sobre si la IA es útil. Trata sobre qué pasa cuando la gente deja de tratar los LLMs como herramientas y empieza a tratarlos como autoridades.

## Dos escuelas de pensamiento

La discusión se divide en dos bandos. El primero argumenta que los LLMs son solo la versión más reciente de un problema antiguo — la gente siempre ha confiado en fuentes débiles. El segundo sostiene que los LLMs son estructuralmente diferentes: llegan como resúmenes limpios sin cadena de fuente visible.

## Por qué la confianza en LLMs es socialmente complicada

Decir "los chatbots alucinan" en 2026 puede sonar tan torpe como decir "no puedes confiar en internet" en 2005. Pero callar tiene su costo — el estándar de evidencia aceptable baja silenciosamente.

## Patrones prácticos del hilo

**Desafía la afirmación, no a la persona.** Pregunta "¿en qué fuente se basa eso?"

**Pide procedencia.** Trata a la persona como experta y pregunta qué libro o estudio respalda el punto.

**Separa usos de bajo y alto riesgo.** Nadie necesita auditar un resumen de agenda de reunión, pero usar output de IA como base para una decisión de contratación merece escrutinio.

**Demuestra el problema en lugar de dar sermones.** Abre un chatbot, empújalo en un tema que dominas, contradice y observa cómo cambia de opinión en dos mensajes.

**Protege tu propia línea base.** Modela mejores hábitos en lugar de intentar corregir cada afirmación débil.

## El mayor riesgo en entornos profesionales

El riesgo no es solo la alucinación — es la confianza inmerecida. Las respuestas de IA suenan autoritativas y avanzan más rápido que la voluntad de verificarlas.

## Lo que este hilo realmente revela

Este es un problema social, no técnico. Los mejores modelos producen output más plausible, lo que puede empeorar el problema. La solución debe ocurrir en el nivel humano, no en el nivel del modelo.`,
    fr: `# Ask HN : comment gérer les personnes qui font confiance aux LLM ?

Le fil Hacker News ne porte pas sur l'utilité de l'IA. Il porte sur ce qui se passe quand les gens cessent de traiter les LLM comme des outils et commencent à les traiter comme des autorités.

## Deux écoles de pensée

La discussion se divise en deux camps. Le premier soutient que les LLM sont la version la plus récente d'un problème ancien — les gens ont toujours fait confiance à des sources faibles. Le second argue que les LLM sont structurellement différents — ils arrivent sous forme de résumés propres sans chaîne de source visible.

## Pourquoi la confiance envers les LLM est socialement compliquée

Dire « les chatbots hallucinent » en 2026 peut sembler aussi maladroit que dire « on ne peut pas faire confiance à internet » en 2005. Mais le silence a aussi son prix — le standard de ce qui constitue une preuve acceptable baisse discrètement.

## Modèles pratiques du fil

**Remettre en question l'affirmation, pas la personne.** Demandez « sur quelle source cela se base-t-il ? »

**Demander la provenance.** Traitez la personne comme un expert et demandez quel livre ou étude appuie le point.

**Séparer les usages à faible et haut enjeu.** Personne n'a besoin d'auditer un résumé d'ordre du jour, mais utiliser une sortie IA comme base d'une décision d'embauche mérite un examen.

**Démontrer le problème au lieu de faire la leçon.** Ouvrez un chatbot, poussez-le sur un sujet que vous maîtrisez, contredisez-le et observez-le changer d'avis en deux messages.

**Protéger sa propre ligne de base.** Montrez l'exemple de meilleures habitudes au lieu d'essayer de corriger chaque affirmation faible.

## Le plus grand risque en milieu professionnel

Le risque n'est pas seulement l'hallucination — c'est la confiance imméritée. Les réponses de l'IA sonnent autoritaires et avancent plus vite que la volonté de les vérifier.

## Ce que ce fil révèle vraiment

C'est un problème social, pas technique. De meilleurs modèles produisent un output plus plausible, ce qui peut empirer le problème. La solution doit se situer au niveau des habitudes et des normes humaines.`,
    jp: `# Ask HN：LLMを信頼する人たちとどう向き合うのか？

Hacker Newsのスレッドは、AIが有用かどうかについてではありません。人々がLLMをツールとして扱うのをやめ、権威として扱い始めたときに何が起こるかについてです。

## 二つの考え方

議論はおおよそ二つの陣営に分かれます。一つ目は、LLMは古い問題の最新版に過ぎないという立場です。人々は常に弱い情報源を信頼してきました。二つ目は、LLMは構造的に異なるという立場です——クリーンで自信に満ちた要約として到着し、見えるソースチェーンがありません。

## なぜLLMへの信頼は社会的に複雑なのか

2026年に「チャットボットはハリュシネーションする」と言うことは、2005年に「インターネットは信用できない」と言うのと同じように不器用に聞こえる可能性があります。しかし沈黙にも代価があります——受け入れ可能な証拠の基準が静かに下がります。

## スレッドからの実用的なパターン

**主張を問い、人を問いなさい。** 「ChatGPTを信頼すべきではない」ではなく「それはどの情報源に基づいていますか？」と聞きましょう。

**出所を尋ねましょう。** 相手を専門家として扱い、どの本や研究がそのポイントを裏付けているかを尋ねましょう。

**低リスクと高リスクの使用を分けましょう。** 会議の議題の要約を監査する必要はありませんが、採用決定の基礎としてAI出出力を使うことは精査に値します。

**説教ではなく問題を実演しましょう。** チャットボットを開き、よく知っているトピックで押し、矛盾させ、2メッセージ以内に意見を変えるのを観察しましょう。

**自分の基準を守りましょう。** 弱い主張をすべて修正しようとするのではなく、より良い習慣を示しましょう。

## 職場環境での最大のリスク

リスクはハリュシネーションだけではありません——もっと深いのは根拠のない自信です。LLM出力は権威ある響きを持ち、検証する意欲よりも速く進みます。

## このスレッドが本当に明らかにしたこと

これは技術的な問題ではなく社会的な問題です。より良いモデルはもっともっともらしい出力を生成し、問題を悪化させる可能性があります。解決策は人間の層——習慣と規範——で起きなければなりません。`,
    pt: `# Ask HN: Como lidar com pessoas que confiam em LLMs?

O tópico do Hacker News não é sobre se a IA é útil. É sobre o que acontece quando as pessoas param de tratar LLMs como ferramentas e começam a tratá-los como autoridades.

## Duas escolas de pensamento

A discussão se divide em dois campos. O primeiro argumenta que LLMs são apenas a versão mais recente de um problema antigo — as pessoas sempre confiaram em fontes fracas. O segundo sustenta que LLMs são estruturalmente diferentes — chegam como resumos limpos sem cadeia de fonte visível.

## Por que confiar em LLMs é socialmente complicado

Dizer "chatbots alucinam" em 2026 pode soar tão desajeitado quanto dizer "você não pode confiar na internet" em 2005. Mas ficar em silêncio também tem seu preço — o padrão do que constitui evidência aceitável cai silenciosamente.

## Padrões práticos do tópico

**Desafie a afirmação, não a pessoa.** Pergunte "em que fonte isso se baseia?"

**Peça proveniência.** Trate a pessoa como especialista e pergunte qual livro ou estudo sustenta o ponto.

**Separe usos de baixo e alto risco.** Ninguém precisa auditar um resumo de pauta de reunião, mas usar output de IA como base para uma decisão de contratação merece escrutínio.

**Demonstre o problema em vez de pregar.** Abra um chatbot, empurre-o em um tópico que você domina, contradiga e observe-o mudar de opinião em duas mensagens.

**Proteja sua própria linha de base.** Modele melhores hábitos em vez de tentar corrigir toda afirmação fraca.

## O maior risco em ambientes profissionais

O risco não é apenas a alucinação — é a confiança imerecida. Respostas de IA soam autoritativas e avançam mais rápido que a disposição para verificá-las.

## O que este tópico realmente revela

Este é um problema social, não técnico. Modelos melhores produzem output mais plausível, o que pode piorar o problema. A solução precisa acontecer no nível humano — hábitos e normas — não no nível do modelo.`,
    ru: `# Ask HN: как общаться с людьми, которые доверяют LLM?

Ветка Hacker News — не о том, полезен ли ИИ. Она о том, что происходит, когда люди перестают воспринимать LLM как инструменты и начинают считать их авторитетами.

## Две школы мысли

Дискуссия раскололась на два лагеря. Первый утверждает, что LLM — лишь новая версия старой проблемы: люди всегда доверяли слабым источникам. Второй настаивает, что LLM структурно отличаются — они приходят в виде чистых резюме без видимой цепочки источников.

## Почему доверие к LLM — социальная сложность

Сказать «чатботы галлюцинируют» в 2026 году может прозвучать так же неловко, как «интерменту нельзя доверять» в 2005. Но молчание тоже имеет свою цену — стандарт того, что считается приемлемым доказательством, незаметно снижается.

## Практические паттерны из ветки

**Оспаривайте утверждение, а не человека.** Спросите «на каком источнике это основано?»

**Спрашивайте происхождение.** Относитесь к собеседнику как к эксперту и спросите, какая книга или исследование подтверждает тезис.

**Разделяйте использование с низкими и высокими ставками.** Никому не нужно проверять резюме повестки встречи, но использование вывода ИИ как основы для решения о найме заслуживает проверки.

**Демонстрируйте проблему вместо лекций.** Откройте чатбот, надавите на тему, в которой разбираетесь, противоречьте ему и наблюдайте, как он меняет мнение за два сообщения.

**Защищайте собственный стандарт.** Показывайте лучшие привычки, а не пытайтесь исправить каждое слабое утверждение.

## Главный риск в профессиональной среде

Риск — не только галлюцинации, но и незаслуженная уверенность. Ответы ИИ звучат авторитетно и продвигаются быстрее, чем готовность их проверить.

## Что эта ветка действительно показывает

Это социальная, а не техническая проблема. Лучшие модели дают более правдоподобные ответы, что может усугубить проблему. Решение должно лежать на уровне человеческих привычек и норм, а не на уровне модели.`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-03-26',
  category: 'AI Culture',
  tags: [
    'LLM',
    'AI Trust',
    'AI Ethics',
    'Hacker News',
    'ask hn how do you deal with people who trust llms',
    'ai trust in professional settings',
  ],
};

export default postAskHnHowDoYouDealWithPeopleWhoTrustLlms;
