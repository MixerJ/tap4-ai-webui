import { BlogPost } from '../../types';

const postOpenAIMusicGenerator: BlogPost = {
  id: '3210',
  slug: 'just-found-out-openai-made-a-music-generator-in-2019-way-before-chatgpt',
  title: {
    en: 'Just Found Out OpenAI Made a Music Generator in 2019 — Way Before ChatGPT',
    cn: '才知道 OpenAI 在 2019 年就做了音乐生成器——远在 ChatGPT 之前',
    tw: '才知道 OpenAI 在 2019 年就做了音樂生成器——遠在 ChatGPT 之前',
    de: 'OpenAI hat 2019 schon einen Musikgenerator gebaut – lange vor ChatGPT',
    es: 'Resulta que OpenAI creó un generador de música en 2019, mucho antes de ChatGPT',
    fr: 'OpenAI a créé un générateur de musique en 2019, bien avant ChatGPT',
    jp: 'OpenAI は ChatGPT よりずっと前の 2019 年に音楽生成器を作っていた',
    pt: 'Descobri que a OpenAI fez um gerador de música em 2019, bem antes do ChatGPT',
    ru: 'Выяснилось, что OpenAI создала генератор музыки в 2019 году — задолго до ChatGPT',
  },
  excerpt: {
    en: "Most people think OpenAI's story starts with ChatGPT in late 2022. It doesn't. The company built serious generative music systems — MuseNet in 2019 and Jukebox in 2020 — years before the chatbot wave hit. Here's what those systems actually did and why it matters.",
    cn: '大多数人以为 OpenAI 的故事始于 2022 年底的 ChatGPT。其实不是。这家公司早在聊天机器人浪潮到来之前就构建了严肃的生成式音乐系统——2019 年的 MuseNet 和 2020 年的 Jukebox。以下是这些系统的真实面貌及其意义。',
    tw: '大多數人以為 OpenAI 的故事始於 2022 年底的 ChatGPT。其實不是。這家公司在聊天機器人浪潮到來之前就建構了嚴肅的生成式音樂系統——2019 年的 MuseNet 和 2020 年的 Jukebox。以下是這些系統的真實面貌及其意義。',
    de: 'Die meisten Leute denken, Openais Geschichte beginnt mit ChatGPT Ende 2022. Dem ist nicht so. Das Unternehmen baute bereits ernsthafte generative Musiksysteme — MuseNet 2019 und Jukebox 2020 — Jahre bevor die Chatbot-Welle einsetzte.',
    es: 'La mayoría de la gente piensa que la historia de OpenAI comienza con ChatGPT a finales de 2022. No es así. La empresa construyó sistemas serios de música generativa — MuseNet en 2019 y Jukebox en 2020 — años antes de que llegara la ola de chatbots.',
    fr: "La plupart des gens pensent que l'histoire d'OpenAI commence avec ChatGPT fin 2022. Pas du tout. L'entreprise a construit des systèmes de musique générative sérieux — MuseNet en 2019 et Jukebox en 2020 — des années avant la vague des chatbots.",
    jp: 'ほとんどの人は OpenAI の歴史が 2022 年末の ChatGPT から始まったと思っています。違います。同社はチャットボットの波が来る前の 2019 年に MuseNet、2020 年に Jukebox という本格的な生成音楽システムを構築していました。',
    pt: 'A maioria das pessoas pensa que a história da OpenAI começa com o ChatGPT no final de 2022. Não é verdade. A empresa construiu sistemas sérios de música generativa — MuseNet em 2019 e Jukebox em 2020 — anos antes da onda de chatbots.',
    ru: 'Большинство людей думает, что история OpenAI начинается с ChatGPT в конце 2022 года. Это не так. Компания создала серьёзные системы генеративной музыки — MuseNet в 2019 году и Jukebox в 2020 году — за годы до волны чат-ботов.',
  },
  content: {
    en: `# Just Found Out OpenAI Made a Music Generator in 2019 — Way Before ChatGPT

If you follow AI news casually, you probably associate OpenAI with ChatGPT, GPT-4, and the late-2022 explosion of large language models. That timeline is incomplete. OpenAI was building generative music systems years before the chatbot era, and two projects in particular — MuseNet and Jukebox — deserve a second look.

## MuseNet: April 25, 2019

MuseNet launched on April 25, 2019. It could generate up to four-minute compositions with ten different instruments, mixing styles that ranged from Mozart to The Beatles. That's not a typo — the same system could produce a baroque piano piece and then pivot to a pop-rock arrangement.

The critical technical detail: MuseNet worked with MIDI-style symbolic music. It dealt with notes, instrumentation, and structure — not raw recorded sound. Think of it as generating sheet music rather than audio files. That distinction matters because symbolic music is a much more constrained problem than raw audio generation.

Under the hood, MuseNet used the same general-purpose unsupervised technology that powered GPT-2. The model was trained to predict the next token in a sequence. Whether those tokens represent words in a sentence or notes in a musical passage, the fundamental pattern is similar. This is the transformer's core insight: sequence prediction generalizes across domains.

Four minutes of coherent, multi-instrument composition is not trivial. Keeping ten instruments musically aligned while shifting between genres requires the model to maintain long-range structure. That capability — managing long sequences with multiple concurrent threads — later proved directly relevant to how GPT models handle long documents and complex reasoning chains.

## Jukebox: April 30, 2020

Jukebox arrived a year later, on April 30, 2020, and it was a fundamentally different beast. Where MuseNet generated symbolic music, Jukebox pushed into raw audio. It could generate music — including rudimentary singing — directly as sound waves, in different genres and artist styles.

The development timeline for Jukebox tells a story of escalating ambition. OpenAI began work in July 2019, expanded the effort in September 2019, scaled up in January 2020, and released publicly in April 2020. That's roughly ten months from initial development to public release.

Jukebox showed just how hard raw audio generation really is. OpenAI was transparent about the major limitations: the output contained noise, the song structure was weak, and generation was painfully slow. Rendering one minute of audio could take approximately nine hours. Nine hours for sixty seconds of music. That's research-lab territory, not something you hand to a consumer on a Tuesday afternoon.

The noise issue was structural, not incidental. Audio at 44.1 kHz — standard CD quality — means processing 44,100 samples per second, per channel. Generating a three-minute song at that resolution involves predicting hundreds of thousands of sequential samples while maintaining musical coherence. The model had to compress its understanding of style, melody, rhythm, and lyrics into a generation pipeline that was orders of magnitude more complex than text generation.

## Why This Changes How You Read OpenAI's History

The existence of MuseNet and Jukebox reframes the common narrative about OpenAI. The path to ChatGPT was not a straight line from GPT-1 through GPT-4 to a chatbot interface. It was a decade-long exploration of sequence modeling across multiple domains: text, code, images, and music.

Each domain taught the team something different. Text taught them about language structure and coherence. Code taught them about logical reasoning and precision. Music taught them about long-range temporal structure and multi-channel generation. Images — through DALL-E — taught them about cross-modal mapping.

The viral claim that "OpenAI made a music generator before ChatGPT" is directionally correct but imprecise. The year 2019 maps to MuseNet and the early development of Jukebox. Jukebox itself was not released until April 2020. And neither system was a product — they were research demonstrations, hosted temporarily on OpenAI's website, eventually taken down as the company pivoted toward commercially viable tools.

## The Technical Thread That Connects Them

What connects MuseNet, Jukebox, and ChatGPT is not music or chat specifically. It's the underlying architecture: transformers trained on sequential data using unsupervised learning. The model learns patterns from massive datasets and then generates new sequences that follow those patterns.

For text, the sequences are tokens (roughly words or subwords). For symbolic music, the sequences are note events (pitch, duration, instrument). For raw audio, the sequences are audio samples at high temporal resolution. The architecture adapts. The training objective — predict what comes next — stays the same.

This generalization is why OpenAI could move between domains. The company didn't need a separate research team for music and another for text. The same core competency — training large transformers on sequential data — applied across the board.

## What Happened to the Music Projects?

OpenAI never shipped MuseNet or Jukebox as commercial products. The demo pages were eventually taken down. The company's focus shifted to GPT-3, ChatGPT, DALL-E, and eventually GPT-4. Music generation was deprioritized — not because it failed, but because the commercial path was clearer for text and images.

Other companies filled the gap. Google's MusicLM (later MusicFX), Stability AI's Stable Audio, Suno, and Udio all emerged as music generation tools in 2023 and 2024. Some of them delivered the consumer-friendly experience that Jukebox's nine-hour render times couldn't support.

## The Takeaway

OpenAI's music generation work in 2019 and 2020 is a reminder that the company's technical ambitions have always been broader than any single product. The same sequence-modeling foundations that powered MuseNet's four-minute compositions eventually powered ChatGPT's conversational abilities.

If someone tells you OpenAI only does chatbots, point them to MuseNet and Jukebox. The company was generating music with ten instruments and rudimentary vocals years before most people had heard of GPT. The timeline is real, the technology was serious, and it shaped the path to everything that came after.`,
    cn: `# 才知道 OpenAI 在 2019 年就做了音乐生成器——远在 ChatGPT 之前

如果你只是偶尔关注 AI 新闻，你可能会把 OpenAI 和 ChatGPT、GPT-4 以及 2022 年底的大语言模型爆发联系在一起。这个时间线是不完整的。OpenAI 在聊天机器人时代之前好几年就在构建生成式音乐系统，有两个项目特别值得重新审视——MuseNet 和 Jukebox。

## MuseNet：2019 年 4 月 25 日

MuseNet 于 2019 年 4 月 25 日发布。它能生成最长四分钟的乐曲，使用十种不同的乐器，混合从莫扎特到披头士的多种风格。这不是笔误——同一个系统既能生成巴洛克钢琴曲，也能切换到流行摇滚编曲。

关键的技术细节是：MuseNet 处理的是 MIDI 风格的符号音乐。它处理的是音符、乐器配置和结构——而不是原始录音。可以理解为它生成的是乐谱而不是音频文件。这个区别很重要，因为符号音乐是一个比原始音频生成受限得多的问题。

在底层，MuseNet 使用了与 GPT-2 相同的通用无监督技术。模型被训练来预测序列中的下一个 token。无论这些 token 代表句子中的单词还是乐曲中的音符，基本模式是相似的。这就是 Transformer 的核心洞察：序列预测可以跨领域泛化。

四分钟的连贯多乐器编曲绝非易事。在保持十种乐器音乐对齐的同时在不同风格间切换，要求模型维持长程结构。这种能力——管理具有多个并发线程的长序列——后来被证明与 GPT 模型处理长文档和复杂推理链的方式直接相关。

## Jukebox：2020 年 4 月 30 日

Jukebox 在一年后的 2020 年 4 月 30 日问世，它是一个根本不同的物种。MuseNet 生成符号音乐，Jukebox 则推进到了原始音频领域。它能直接以声波形式生成音乐——包括粗糙的人声——涵盖不同的流派和艺术家风格。

Jukebox 的开发时间线讲述了一个雄心不断升级的故事。OpenAI 在 2019 年 7 月开始开发，9 月扩大规模，2020 年 1 月进一步扩展，4 月公开发布。从初始开发到公开发布大约十个月。

Jukebox 展示了原始音频生成有多难。OpenAI 对主要限制非常坦诚：输出含有噪音、歌曲结构薄弱、生成速度极慢。渲染一分钟音频可能需要大约九个小时。九个小时换六十秒音乐。这是研究实验室的水平，不可能在某个周二下午交给普通消费者使用。

噪音问题是结构性的而非偶然的。44.1 kHz 的标准 CD 音质意味着每秒每声道处理 44,100 个采样。在这个分辨率下生成一首三分钟的歌曲，涉及预测数十万个连续采样，同时保持音乐连贯性。模型必须将风格、旋律、节奏和歌词的理解压缩到一个比文本生成复杂数个数量级的生成流程中。

## 这如何改变你对 OpenAI 历史的理解

MuseNet 和 Jukebox 的存在重构了关于 OpenAI 的常见叙事。通往 ChatGPT 的道路不是从 GPT-1 经过 GPT-4 到聊天界面的直线。它是对序列建模在多个领域——文本、代码、图像和音乐——的长达十年的探索。

每个领域教会团队不同的东西。文本教会他们语言结构和连贯性。代码教会他们逻辑推理和精确性。音乐教会长程时间结构和多通道生成。图像——通过 DALL-E——教会他们跨模态映射。

"OpenAI 在 ChatGPT 之前就做了音乐生成器"这个广为流传的说法方向正确但不够精确。2019 年对应的是 MuseNet 和 Jukebox 的早期开发。Jukebox 本身直到 2020 年 4 月才发布。而且两个系统都不是产品——它们是研究演示，曾短暂托管在 OpenAI 网站上，随着公司将重心转向商业可行的工具而被下线。

## 连接它们的技术线索

将 MuseNet、Jukebox 和 ChatGPT 连接在一起的不是音乐或聊天本身。而是底层架构：在序列数据上使用无监督学习训练的 Transformer。模型从海量数据中学习模式，然后生成遵循这些模式的新序列。

对于文本，序列是 token（大致是单词或子词）。对于符号音乐，序列是音符事件（音高、时长、乐器）。对于原始音频，序列是高时间分辨率的音频采样。架构会适配。训练目标——预测接下来是什么——保持不变。

这种泛化能力解释了 OpenAI 为什么能在不同领域间迁移。公司不需要为音乐和文本分别配备独立的研究团队。相同的核心能力——在序列数据上训练大型 Transformer——适用于所有领域。

## 音乐项目后来怎样了？

OpenAI 从未将 MuseNet 或 Jukebox 作为商业产品推出。演示页面最终被下线。公司的重心转向了 GPT-3、ChatGPT、DALL-E 以及最终的 GPT-4。音乐生成被降级——不是因为失败，而是因为文本和图像的商业路径更清晰。

其他公司填补了空白。Google 的 MusicLM（后来的 MusicFX）、Stability AI 的 Stable Audio、Suno 和 Udio 都在 2023 年和 2024 年作为音乐生成工具出现。其中一些提供了 Jukebox 九小时渲染时间无法支持的消费者友好体验。

## 结论

OpenAI 在 2019 年和 2020 年的音乐生成工作提醒我们，公司的技术雄心一直比任何单一产品更广泛。支撑 MuseNet 四分钟作曲的序列建模基础，最终也支撑了 ChatGPT 的对话能力。如果有人告诉你 OpenAI 只做聊天机器人，让他们去看看 MuseNet 和 Jukebox。在大多数人听说过 GPT 之前，这家公司就已经在用十种乐器和粗糙的人声生成音乐了。时间线是真实的，技术是严肃的，它塑造了之后一切的道路。`,
    tw: `# 才知道 OpenAI 在 2019 年就做了音樂生成器——遠在 ChatGPT 之前

如果你只是偶爾關注 AI 新聞，你可能會把 OpenAI 和 ChatGPT、GPT-4 以及 2022 年底的大語言模型爆發聯繫在一起。這個時間線是不完整的。OpenAI 在聊天機器人時代之前好幾年就在建構生成式音樂系統，有兩個專案特別值得重新審視——MuseNet 和 Jukebox。

## MuseNet：2019 年 4 月 25 日

MuseNet 於 2019 年 4 月 25 日發布。它能生成最長四分鐘的樂曲，使用十種不同的樂器，混合從莫札特到披頭士的多種風格。這不是筆誤——同一個系統既能生成巴洛克鋼琴曲，也能切換到流行搖滾編曲。

關鍵的技術細節是：MuseNet 處理的是 MIDI 風格的符號音樂。它處理的是音符、樂器配置和結構——而不是原始錄音。可以理解為它生成的是樂譜而不是音頻檔案。這個區別很重要，因為符號音樂是一個比原始音頻生成受限得多的問題。

在底層，MuseNet 使用了與 GPT-2 相同的通用無監督技術。模型被訓練來預測序列中的下一個 token。無論這些 token 代表句子中的單詞還是樂曲中的音符，基本模式是相似的。這就是 Transformer 的核心洞察：序列預測可以跨領域泛化。

四分鐘的連貫多樂器編曲絕非易事。在保持十種樂器音樂對齊的同時在不同風格間切換，要求模型維持長程結構。這種能力——管理具有多個並發線程的長序列——後來被證明與 GPT 模型處理長文檔和複雜推理鏈的方式直接相關。

## Jukebox：2020 年 4 月 30 日

Jukebox 在一年後的 2020 年 4 月 30 日問世，它是一個根本不同的物種。MuseNet 生成符號音樂，Jukebox 則推進到了原始音頻領域。它能直接以聲波形式生成音樂——包括粗糙的人聲——涵蓋不同的流派和藝術家風格。

Jukebox 的開發時間線講述了一個雄心不斷升級的故事。OpenAI 在 2019 年 7 月開始開發，9 月擴大規模，2020 年 1 月進一步擴展，4 月公開發布。從初始開發到公開發布大約十個月。

Jukebox 展示了原始音頻生成有多難。OpenAI 對主要限制非常坦誠：輸出含有噪音、歌曲結構薄弱、生成速度極慢。渲染一分鐘音頻可能需要大約九個小時。九個小時換六十秒音樂。這是研究實驗室的水平，不可能在某個週二下午交給普通消費者使用。

## 這如何改變你對 OpenAI 歷史的理解

MuseNet 和 Jukebox 的存在重構了關於 OpenAI 的常見敘事。通往 ChatGPT 的道路不是從 GPT-1 經過 GPT-4 到聊天介面的直線。它是對序列建模在多個領域——文本、程式碼、圖像和音樂——的長達十年的探索。

每個領域教會團隊不同的東西。文本教會他們語言結構和連貫性。程式碼教會他們邏輯推理和精確性。音樂教會長程時間結構和多通道生成。圖像——透過 DALL-E——教會他們跨模態映射。

## 結論

OpenAI 在 2019 年和 2020 年的音樂生成工作提醒我們，公司的技術雄心一直比任何單一產品更廣泛。支撐 MuseNet 四分鐘作曲的序列建模基礎，最終也支撐了 ChatGPT 的對話能力。如果有人告訴你 OpenAI 只做聊天機器人，讓他們去看看 MuseNet 和 Jukebox。`,
    de: `# OpenAI hat 2019 schon einen Musikgenerator gebaut – lange vor ChatGPT

Wenn man KI-Nachrichten nur gelegentlich verfolgt, verbindet man OpenAI wahrscheinlich mit ChatGPT, GPT-4 und dem Explosion großer Sprachmodelle Ende 2022. Diese Zeitleiste ist unvollständig. OpenAI baute bereits Jahre vor der Chatbot-Ära generative Musiksysteme, und zwei Projekte verdienen besondere Aufmerksamkeit: MuseNet und Jukebox.

## MuseNet: 25. April 2019

MuseNet wurde am 25. April 2019 gestartet. Es konnte bis zu vier Minuten lange Kompositionen mit zehn verschiedenen Instrumenten generieren und Stile von Mozart bis zu den Beatles mischen. Das ist kein Tippfehler — dasselbe System konnte ein Barock-Klavierstück erzeugen und dann zu einer Pop-Rock-Arrangement wechseln.

Das entscheidende technische Detail: MuseNet arbeitete mit MIDI-ähnlicher symbolischer Musik. Es verarbeitete Noten, Instrumentierung und Struktur — nicht rohen aufgenommenen Klang. Man kann es sich als Erzeugung von Notenblättern statt Audiodateien vorstellen. Dieser Unterschied ist wichtig, weil symbolische Musik ein viel eingeschränkteres Problem ist als die Rohaudiodarstellung.

Unter der Haube verwendete MuseNet dieselbe allgemeine unüberwachte Technologie wie GPT-2. Das Modell wurde darauf trainiert, das nächste Token in einer Sequenz vorherzusagen. Ob diese Token Wörter in einem Satz oder Noten in einer musikalischen Passage darstellen, das grundlegende Muster ist ähnlich.

## Jukebox: 30. April 2020

Jukebox erschien ein Jahr später, am 30. April 2020, und es war ein grundlegend anderes Wesen. Während MuseNet symbolische Musik generierte, drang Jukebox in den Roheitsbereich vor. Es konnte Musik — einschließlich rudimentärem Gesang — direkt als Schallwellen erzeugen, in verschiedenen Genres und Künstlerstilen.

Die Entwicklungszeitleiste zeigt eine Geschichte steigender Ambitionen. OpenAI begann die Arbeit im Juli 2019, erweiterte sie im September 2019, skalierte im Januar 2020 und veröffentlichte im April 2020. Das sind etwa zehn Monate von der anfänglichen Entwicklung bis zur öffentlichen Veröffentlichung.

Jukebox zeigte, wie schwierig Roheitsaudiodarstellung wirklich ist. OpenAI war transparent über die Hauptbeschränkungen: Rauschen, schwache Songstruktur und langsame Generierung. Eine Minute Audio zu rendern konnte etwa neun Stunden dauern.

## Warum das die Geschichte von OpenAI verändert

Die Existenz von MuseNet und Jukebox ordnet das übliche Narrativ über OpenAI neu ein. Der Weg zu ChatGPT war keine gerade Linie von GPT-1 über GPT-4 zu einer Chatbot-Oberfläche. Es war eine jahrzehntelange Erforschung der Sequenzmodellierung über mehrere Domänen hinweg: Text, Code, Bilder und Musik.

## Das technische Band, das sie verbindet

Was MuseNet, Jukebox und ChatGPT verbindet, ist nicht Musik oder Chat speziell. Es ist die zugrunde liegende Architektur: Transformer, die auf Sequenzdaten mit unüberwachtem Lernen trainiert wurden. Für Text sind die Sequenzen Tokens. Für symbolische Musik sind es Notenereignisse. Für Roheitsaudio sind es Audiosamples mit hoher zeitlicher Auflösung. Die Architektur passt sich an. Das Trainingsziel — vorhersagen, was als nächstes kommt — bleibt gleich.

## Fazit

OpenAIs Musikerzeugungsarbeit in 2019 und 2020 erinnert daran, dass die technischen Ambitionen des Unternehmens immer breiter waren als ein einzelnes Produkt. Wenn jemand sagt, OpenAI mache nur Chatbots, zeigen Sie ihm MuseNet und Jukebox.`,
    es: `# OpenAI creó un generador de música en 2019, mucho antes de ChatGPT

Si sigues las noticias de IA de forma casual, probablemente asocias OpenAI con ChatGPT, GPT-4 y la explosión de grandes modelos de lenguaje a finales de 2022. Esa línea temporal está incompleta. OpenAI estaba construyendo sistemas de música generativa años antes de la era de los chatbots, y dos proyectos merecen una segunda mirada: MuseNet y Jukebox.

## MuseNet: 25 de abril de 2019

MuseNet se lanzó el 25 de abril de 2019. Podía generar composiciones de hasta cuatro minutos con diez instrumentos diferentes, mezclando estilos que iban desde Mozart hasta los Beatles. No es un error tipográfico — el mismo sistema podía producir una pieza de piano barroco y luego cambiar a un arreglo de pop-rock.

El detalle técnico crucial: MuseNet trabajaba con música simbólica estilo MIDI. Trataba con notas, instrumentación y estructura — no sonido grabado en bruto. Piensa en ello como generar partituras en lugar de archivos de audio.

Bajo el capó, MuseNet usó la misma tecnología general no supervisada que impulsaba GPT-2. El modelo fue entrenado para predecir el siguiente token en una secuencia. Ya sea que esos tokens representen palabras en una oración o notas en un pasaje musical, el patrón fundamental es similar.

## Jukebox: 30 de abril de 2020

Jukebox llegó un año después, el 30 de abril de 2020, y fue una bestia fundamentalmente diferente. Donde MuseNet generaba música simbólica, Jukebox se adentró en el audio en bruto. Podía generar música — incluyendo canto rudimentario — directamente como ondas sonoras, en diferentes géneros y estilos de artistas.

La línea temporal de desarrollo cuenta una historia de ambición creciente. OpenAI comenzó el trabajo en julio de 2019, lo expandió en septiembre de 2019, escaló en enero de 2020 y lanzó públicamente en abril de 2020. Aproximadamente diez meses del desarrollo inicial al lanzamiento público.

Jukebox mostró lo difícil que es realmente la generación de audio en bruto. OpenAI fue transparente sobre las limitaciones principales: ruido, estructura débil de las canciones y generación lenta. Renderizar un minuto de audio podía tomar unas nueve horas.

## Por qué esto cambia la historia de OpenAI

La existencia de MuseNet y Jukebox reencuadra la narrativa común sobre OpenAI. El camino hacia ChatGPT no fue una línea recta de GPT-1 a través de GPT-4 hasta una interfaz de chatbot. Fue una exploración de diez años del modelado de secuencias en múltiples dominios: texto, código, imágenes y música.

## Conclusión

El trabajo de generación musical de OpenAI en 2019 y 2020 es un recordatorio de que las ambiciones técnicas de la empresa siempre han sido más amplias que cualquier producto individual. Si alguien te dice que OpenAI solo hace chatbots, señálale MuseNet y Jukebox.`,
    fr: `# OpenAI a créé un générateur de musique en 2019, bien avant ChatGPT

Si vous suivez l'actualité IA de manière occasionnelle, vous associez probablement OpenAI à ChatGPT, GPT-4 et l'explosion des grands modèles de langage fin 2022. Cette chronologie est incomplète. OpenAI construisait des systèmes de musique générative des années avant l'ère des chatbots, et deux projets méritent qu'on s'y attarde : MuseNet et Jukebox.

## MuseNet : 25 avril 2019

MuseNet a été lancé le 25 avril 2019. Il pouvait générer des compositions allant jusqu'à quatre minutes avec dix instruments différents, mélangeant des styles allant de Mozart aux Beatles. Ce n'est pas une faute de frappe — le même système pouvait produire une pièce de piano baroque puis passer à un arrangement pop-rock.

Le détail technique crucial : MuseNet travaillait avec de la musique symbolique de type MIDI. Il traitait des notes, de l'instrumentation et de la structure — pas du son brut enregistré. Pensez-y comme de la génération de partitions plutôt que de fichiers audio.

Sous le capot, MuseNet utilisait la même technologie non supervisée généraliste que GPT-2. Le modèle était entraîné à prédire le prochain token dans une séquence. Que ces tokens représentent des mots dans une phrase ou des notes dans un passage musical, le schéma fondamental est similaire.

## Jukebox : 30 avril 2020

Jukebox est arrivé un an plus tard, le 30 avril 2020, et c'était une bête fondamentalement différente. Là où MuseNet générait de la musique symbolique, Jukebox s'attaquait à l'audio brut. Il pouvait générer de la musique — y compris un chant rudimentaire — directement sous forme d'ondes sonores, dans différents genres et styles d'artistes.

La chronologie de développement raconte une histoire d'ambition croissante. OpenAI a commencé le travail en juillet 2019, l'a étendu en septembre 2019, a fait évoluer en janvier 2020 et a publié publiquement en avril 2020. Environ dix mois du développement initial à la publication publique.

Jukebox a montré à quel point la génération audio brute est réellement difficile. OpenAI a été transparent sur les limitations majeures : bruit, structure faible des chansons, génération lente. Rendre une minute d'audio pouvait prendre environ neuf heures.

## Pourquoi cela change la lecture de l'histoire d'OpenAI

L'existence de MuseNet et Jukebox recadre le récit commun sur OpenAI. Le chemin vers ChatGPT n'était pas une ligne droite de GPT-1 à GPT-4 vers une interface chatbot. C'était une exploration décennale de la modélisation de séquences à travers de multiples domaines : texte, code, images et musique.

## Conclusion

Le travail de génération musicale d'OpenAI en 2019 et 2020 rappelle que les ambitions techniques de l'entreprise ont toujours été plus larges qu'un seul produit. Si quelqu'un vous dit qu'OpenAI ne fait que des chatbots, pointez-le vers MuseNet et Jukebox.`,
    jp: `# OpenAI は ChatGPT よりずっと前の 2019 年に音楽生成器を作っていた

AI ニュースをたまにチェックしていると、OpenAI といえば ChatGPT、GPT-4、そして 2022 年末の大規模言語モデルの爆発を思い浮かべるかもしれません。そのタイムラインは不完全です。OpenAI はチャットボット時代の何年も前から生成音楽システムを構築しており、特に MuseNet と Jukebox の 2 つのプロジェクトは再評価に値します。

## MuseNet：2019年4月25日

MuseNet は 2019 年 4 月 25 日にリリースされました。最大 4 分間の楽曲を 10 種類の異なる楽器で生成でき、モーツァルトからビートルズまで幅広いスタイルを組み合わせることができました。誤植ではありません — 同じシステムがバロックピアノ曲を生成し、ポップロックアレンジに切り替えることもできました。

重要な技術的詳細：MuseNet は MIDI 形式のシンボリック音楽を扱いました。生の録音ではなく、音符、楽器構成、構造を処理したのです。楽譜を生成するのと似ており、音声ファイルではありません。シンボリック音楽は生の音声生成ほど複雑ではないため、この区別は重要です。

内部的には、MuseNet は GPT-2 と同じ汎用教師なし技術を使用しました。モデルはシーケンス内の次のトークンを予測するよう訓練されました。文の単語であれ楽曲の音符であれ、基本パターンは同じです。

## Jukebox：2020年4月30日

Jukebox はその 1 年後の 2020 年 4 月 30 日に登場し、まったく異なる存在でした。MuseNet がシンボリック音楽を生成したのに対し、Jukebox は生の音声に踏み込みました。粗い歌声を含む音楽を、さまざまなジャンルやアーティストスタイルで音波として直接生成できました。

開発タイムラインは野心の拡大を物語っています。OpenAI は 2019 年 7 に開発を開始し、9 月に拡大、2020 年 1 月にスケールアップ、4 月に公開リリースしました。初期開発から公開リリースまで約 10 ヶ月です。

Jukebox は生の音声生成がいかに困難かを示しました。OpenAI は主要な制限 — ノイズ、弱い曲構成、遅い生成 — を率直に認めました。音声 1 分をレンダリングするのに約 9 時間かかることがありました。

## なぜこれが OpenAI の歴史観を変えるのか

MuseNet と Jukebox の存在は、OpenAI に関する一般的な物語を再構成します。ChatGPT への道は GPT-1 から GPT-4 へ、そしてチャットボットインターフェースへの直線ではありませんでした。テキスト、コード、画像、音楽という複数のドメインにわたるシーケンスモデリングの 10 年にわたる探求でした。

## まとめ

OpenAI の 2019 年および 2020 年の音楽生成作業は、同社の技術的野心が常に単一の製品よりも広かったことを思い出させます。誰かが OpenAI はチャットボットだけを作っていると言ったら、MuseNet と Jukebox を指してください。`,
    pt: `# Descobri que a OpenAI fez um gerador de música em 2019, bem antes do ChatGPT

Se você acompanha notícias de IA de forma casual, provavelmente associa a OpenAI ao ChatGPT, GPT-4 e à explosão de grandes modelos de linguagem no final de 2022. Essa linha temporal está incompleta. A OpenAI estava construindo sistemas de música generativa anos antes da era dos chatbots, e dois projetos merecem uma segunda olhada: MuseNet e Jukebox.

## MuseNet: 25 de abril de 2019

O MuseNet foi lançado em 25 de abril de 2019. Podia gerar composições de até quatro minutos com dez instrumentos diferentes, misturando estilos que iam de Mozart aos Beatles. Não é erro de digitação — o mesmo sistema podia produzir uma peça de piano barroco e depois passar para um arranjo pop-rock.

O detalhe técnico crucial: o MuseNet trabalhava com música simbólica estilo MIDI. Tratava de notas, instrumentação e estrutura — não som gravado em bruto. Pense nisso como gerar partituras em vez de arquivos de áudio.

Por baixo dos panos, o MuseNet usava a mesma tecnologia geral não supervisionada que alimentava o GPT-2. O modelo era treinado para prever o próximo token em uma sequência. Quer esses tokens representem palavras em uma frase ou notas em uma passagem musical, o padrão fundamental é similar.

## Jukebox: 30 de abril de 2020

O Jukebox chegou um ano depois, em 30 de abril de 2020, e era uma criatura fundamentalmente diferente. Onde o MuseNet gerava música simbólica, o Jukebox avançou para o áudio bruto. Podia gerar música — incluindo canto rudimentar — diretamente como ondas sonoras, em diferentes gêneros e estilos de artistas.

A linha temporal de desenvolvimento conta uma história de ambição crescente. A OpenAI começou o trabalho em julho de 2019, expandiu em setembro de 2019, escalou em janeiro de 2020 e lançou publicamente em abril de 2020. Aproximadamente dez meses do desenvolvimento inicial ao lançamento público.

O Jukebox mostrou quão difícil a geração de áudio bruto realmente é. A OpenAI foi transparente sobre as principais limitações: ruído, estrutura fraca de músicas e geração lenta. Renderizar um minuto de áudio podia levar cerca de nove horas.

## Por que isso muda a história da OpenAI

A existência do MuseNet e do Jukebox reenquadra a narrativa comum sobre a OpenAI. O caminho para o ChatGPT não foi uma linha reta do GPT-1 passando pelo GPT-4 até uma interface de chatbot. Foi uma exploração de dez anos de modelagem de sequências em múltiplos domínios: texto, código, imagens e música.

## Conclusão

O trabalho de geração musical da OpenAI em 2019 e 2020 é um lembrete de que as ambições técnicas da empresa sempre foram mais amplas do que qualquer produto individual. Se alguém disser que a OpenAI só faz chatbots, aponte para o MuseNet e o Jukebox.`,
    ru: `# Выяснилось, что OpenAI создала генератор музыки в 2019 году — задолго до ChatGPT

Если вы нерегулярно следите за новостями ИИ, вы, вероятно, ассоциируете OpenAI с ChatGPT, GPT-4 и взрывом больших языковых моделей в конце 2022 года. Эта хронология неполная. OpenAI строила генеративные музыкальные системы за годы до эпохи чат-ботов, и два проекта заслуживают особого внимания: MuseNet и Jukebox.

## MuseNet: 25 апреля 2019

MuseNet был запущен 25 апреля 2019 года. Он мог генерировать композиции до четырёх минут с десятью различными инструментами, смешивая стили от Моцарта до Beatles. Это не опечатка — одна и та же система могла создать барочную фортепианную пьесу, а затем переключиться на поп-рок аранжировку.

Ключевая техническая деталь: MuseNet работал с MIDI-подобной символической музыкой. Он оперировал нотами, инструментовкой и структурой — не с сырым записанным звуком. Представьте себе генерацию партитуры, а не аудиофайлов. Это различие важно, потому что символическая музыка — гораздо более ограниченная задача, чем генерация сырого аудио.

Под капотом MuseNet использовал ту же универсальную неконтролируемую технологию, что и GPT-2. Модель обучалась предсказывать следующий токен в последовательности. Представляют ли эти токены слова в предложении или ноты в музыкальном отрывке, базовый паттерн аналогичен.

## Jukebox: 30 апреля 2020

Jukebox появился год спустя, 30 апреля 2020 года, и это было совершенно другое существо. Если MuseNet генерировал символическую музыку, Jukebox шагнул в область сырого аудио. Он мог генерировать музыку — включая зачаточное пение — непосредственно как звуковые волны, в разных жанрах и стилях исполнителей.

Хронология разработки рассказывает историю нарастающих амбиций. OpenAI начала работу в июле 2019, расширила её в сентябре 2019, масштабировала в январе 2020 и публично выпустила в апреле 2020. Примерно десять месяцев от начала разработки до публичного релиза.

Jukebox показал, насколько сложна генерация сырого аудио. OpenAI была прозрачна в отношении основных ограничений: шум, слабая структура песен, медленная генерация. Рендер одной минуты аудио мог занять около девяти часов.

## Почему это меняет понимание истории OpenAI

Существование MuseNet и Jukebox пересматривает распространённый нарратив об OpenAI. Путь к ChatGPT не был прямой линией от GPT-1 через GPT-4 к интерфейсу чат-бота. Это было десятилетнее исследование моделирования последовательностей в нескольких доменах: текст, код, изображения и музыка.

## Техническая нить, связывающая их

Что связывает MuseNet, Jukebox и ChatGPT — это не музыка или чат как таковые. Это базовая архитектура: трансформеры, обученные на последовательных данных с использованием неконтролируемого обучения. Для текста последовательности — это токены. Для символической музыки — нотные события. Для сырого аудио — аудиосэмплы с высоким временным разрешением. Архитектура адаптируется. Цель обучения — предсказать, что будет дальше — остаётся неизменной.

## Вывод

Работа OpenAI по генерации музыки в 2019–2020 годах напоминает, что технические амбиции компании всегда были шире любого отдельного продукта. Если кто-то говорит, что OpenAI делает только чат-боты, укажите ему на MuseNet и Jukebox.`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-03-26',
  category: 'AI History',
  tags: ['OpenAI', 'MuseNet', 'Jukebox', 'AI Music', 'ChatGPT'],
};

export default postOpenAIMusicGenerator;
