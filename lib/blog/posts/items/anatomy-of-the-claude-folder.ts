import { BlogPost } from '../../types';

const postAnatomyOfTheClaudeFolder: BlogPost = {
  id: '3212',
  slug: 'anatomy-of-the-claude-folder',
  title: {
    en: 'Anatomy of the .claude Folder: What It Does and Why It Confuses People',
    cn: '解剖 .claude 文件夹：它的作用以及让人困惑的原因',
    tw: '解剖 .claude 資料夾：它的作用以及讓人困惑的原因',
    de: 'Anatomie des .claude-Ordners: Was er tut und warum er verwirrt',
    es: 'Anatomía de la carpeta .claude: Qué hace y por qué confunde',
    fr: 'Anatomie du dossier .claude : son rôle et pourquoi il déroute',
    jp: '.claude フォルダの解剖：何をするのか、なぜ混乱するのか',
    pt: 'Anatomia da pasta .claude: O que faz e por que confunde',
    ru: 'Анатомия папки .claude: зачем она нужна и почему путает людей',
  },
  excerpt: {
    en: 'The .claude folder is not just configuration storage — it shapes how your workflow behaves. Most confusion comes from mixing global and project-level scope, misunderstanding placement conventions, and treating hooks as passive. This breakdown covers what actually matters.',
    cn: '.claude 文件夹不仅仅是配置存储——它决定了工作流的行为方式。大多数困惑来自于混淆全局和项目级作用域、误解放置约定，以及将钩子视为被动的。这篇文章梳理了真正需要关注的部分。',
    tw: '.claude 資料夾不僅僅是設定儲存——它決定了工作流程的行為方式。大多數困惑來自於混淆全域和專案層級作用域、誤解放置慣例，以及將鉤子視為被動的。這篇文章梳理了真正需要關注的部分。',
    de: 'Der .claude-Ordner ist nicht nur Konfigurationsspeicher — er bestimmt, wie sich Ihr Workflow verhält. Die meisten Verwirrungen entstehen durch die Vermischung globaler und projektspezifischer Ebenen, falsche Platzierungskonventionen und passive Hooks.',
    es: 'La carpeta .claude no es solo almacenamiento de configuración — moldea cómo se comporta tu flujo de trabajo. La mayoría de la confusión surge de mezclar el alcance global y de proyecto, malentender las convenciones de ubicación y tratar los hooks como pasivos.',
    fr: "Le dossier .claude n'est pas qu'un stockage de configuration — il façonne le comportement de votre flux de travail. La plupart des confusions viennent du mélange des portées globale et projet, des conventions de placement mal comprises et des hooks traités comme passifs.",
    jp: '.claude フォルダは単なる設定ストレージではありません——ワークフローの動作を形作るものです。ほとんどの混乱は、グローバルとプロジェクトレベルのスコープの混同、配置規則の誤解、フックを受動的に扱うことから生まれます。',
    pt: 'A pasta .claude não é apenas armazenamento de configuração — ela molda como seu fluxo de trabalho se comporta. A maioria das confusões vem de misturar escopo global e de projeto, entender mal convenções de colocação e tratar hooks como passivos.',
    ru: 'Папка .claude — это не просто хранилище конфигураций. Она определяет поведение рабочего процесса. Большая часть путаницы возникает из-за смешивания глобального и проектного уровней, неправильного понимания соглашений о размещении и пассивного отношения к хукам.',
  },
  content: {
    en: `# Anatomy of the .claude Folder: What It Does and Why It Confuses People

If you've searched for "anatomy of the .claude folder," chances are you're trying to figure out what this folder actually does, why it trips people up, and which parts deserve your attention. That's a fair set of questions. The folder looks simple until you realize it's doing more than storing config files.

A Reddit thread from March 2026 laid this out clearly. A developer who had gotten burned by unclear placement conventions built a cheat sheet covering the .claude/ directory layout, hook events, settings.json, MCP configuration, skill structure, and context-management thresholds. The thread resonated because the folder doesn't just hold settings — it actively shapes what happens when you run commands, invoke skills, and manage agents.

## The Core Confusion: Global vs. Project-Level

The single biggest source of confusion is the difference between the global ~/.claude directory and the project-level .claude/ directory.

The global directory sits in your home folder and defines shared behavior across all projects. It includes your personal settings, global MCP server configurations, and skills you want available everywhere. Think of it as your personal defaults.

The project-level .claude/ directory lives inside a specific repository. It overrides or extends the global configuration for that particular project. Project-specific skills, agent definitions, hooks, and MCP configs go here.

When you mix these two layers — putting project-specific behavior in the global directory, or expecting global settings to apply when a project overrides them — the folder starts feeling mysterious. It's not mysterious. It's just scoped, and scope determines precedence.

A practical rule: if a behavior should apply everywhere, put it in ~/.claude. If it belongs to one project, put it in the project's .claude/. When in doubt, start project-level and promote to global only after confirming it works across multiple codebases.

## Placement Conventions: Where Things Actually Go

The folder structure isn't arbitrary. Specific types of content belong in specific locations, and getting this wrong is one of the most common mistakes.

**Skills** belong in .claude/skills/. Each skill gets its own directory containing a SKILL.md file. That SKILL.md is the entry point — it defines what the skill does, how to invoke it, and what it needs. Alongside SKILL.md, you might have scripts/, references/, and assets/ subdirectories depending on the skill's complexity.

**Agents** go in .claude/agents/, not scattered loose files in the top-level folder. Agents are defined with specific configuration files that the system needs to locate consistently. Loose placement means the system can't interpret what you meant.

**Settings** live in .claude/settings.json at the project level or ~/.claude/settings.json globally. This is where you configure hooks, permissions, and behavioral defaults.

**MCP configurations** have their own placement within the settings structure. They define how Claude connects to external tool servers, and mixing MCP config with general settings in the wrong scope can cause silent failures.

The pattern is consistent: structure determines whether the system can interpret your intent. A misplaced skill file isn't just disorganized — it's invisible to the runtime.

## Hooks Are Operational, Not Passive

Many developers treat hooks as optional decoration. They're not. Hooks are operational components that execute at specific points in the tool lifecycle.

The most common mistake is overly narrow matching. If you configure a PostToolUse hook that only matches "Write," you'll miss edits made through "Edit" or "MultiEdit" operations. The broader matcher pattern "Edit|MultiEdit|Write" catches more and prevents silent gaps in your automation.

Hook events fire at defined moments: PreToolUse before a tool runs, PostToolUse after it completes, and Notification when the system needs to alert you. Each event type serves a different purpose, and understanding the timing matters for building reliable automation.

A hook that runs PostToolUse to validate generated code is useful. A hook that runs PreToolUse to set up environment variables is useful. A hook configured for the wrong event type is invisible — it doesn't fail loudly, it just never fires.

The configuration directory is not passive storage. It's part of the runtime. Treat it that way.

## The Four Things That Actually Matter

When people look at the .claude folder for the first time, everything seems equally important. It's not. Four areas deserve focused attention.

**1. Scope.** Global vs. project-level is the first decision. Get this wrong and nothing else works as expected. The precedence rules are straightforward — project-level overrides global — but you need to know which layer you're configuring before you start.

**2. Placement conventions.** Skills need their own directories with SKILL.md. Agents go in agents/. Settings have a defined structure. These aren't suggestions. The runtime looks for content in specific locations, and wrong placement means silent invisibility.

**3. Content vs. orchestration.** Skills, agents, settings, hooks, and MCP configurations are not equivalent concepts. Skills define reusable capabilities. Agents define autonomous workflows. Settings define behavioral defaults. Hooks define lifecycle automation. MCP configs define external tool connections. Conflating these leads to muddled configurations where you're not sure what controls what.

**4. Signs of drift.** The documentation for the .claude folder moves fast. What worked in January 2026 may have changed by March. Skill structure conventions, hook event names, and MCP configuration formats all evolve. If your setup stopped working and you didn't change anything, check whether the underlying conventions shifted.

## How to Approach the Folder

The .claude folder combines scope, structure, and behavior into a single directory tree. The right way to learn it is in that order.

Start with scope. Understand what lives in the global directory versus the project directory, and why the distinction matters. Then learn placement conventions. Know where skills, agents, settings, and hooks belong, and why the runtime expects them there. Finally, understand behavior. Hooks, MCP configs, and settings aren't just metadata — they change what happens when you run commands.

Once you internalize that three-layer model, the folder stops looking like hidden clutter and starts looking like an operating map. The structure tells you what the system can do, where it looks for instructions, and when it acts on them.

That's the real anatomy of the .claude folder. Not a pile of config files, but a structured interface between your intent and the system's behavior.`,
    cn: `# 解剖 .claude 文件夹：它的作用以及让人困惑的原因

如果你搜索过".claude 文件夹的结构"，大概率是想搞清楚这个文件夹到底在做什么、为什么让人困惑、哪些部分值得关注。这几个问题问得很有道理。这个文件夹看起来很简单，直到你意识到它不仅仅是存放配置文件。

2026年3月的一个 Reddit 帖子把这件事讲得很清楚。一位开发者因为放置位置不明确吃过亏，于是整理了一份速查表，涵盖了 .claude/ 目录结构、钩子事件、settings.json、MCP 配置、技能结构和上下文管理阈值。帖子引起共鸣，是因为这个文件夹不只是保存设置——它在你运行命令、调用技能、管理代理时，主动影响发生的事情。

## 核心困惑：全局 vs 项目级

最大的困惑来源是全局目录 ~/.claude 和项目级目录 .claude/ 之间的区别。

全局目录在你的主文件夹里，定义了所有项目共享的行为。包括个人设置、全局 MCP 服务器配置，以及你希望随处可用的技能。把它理解为你的个人默认值。

项目级 .claude/ 目录在具体仓库内部。它覆盖或扩展该特定项目的全局配置。项目专属的技能、代理定义、钩子和 MCP 配置放在这里。

当你混淆这两个层级——把项目特定的行为放在全局目录里，或者期望全局设置在项目覆盖它们时仍然生效——文件夹就变得神秘了。它并不神秘。它只是有作用域，而作用域决定了优先级。

一个实用规则：如果一个行为应该在所有地方生效，放在 ~/.claude。如果它属于某个项目，放在项目的 .claude/ 里。不确定的时候，先放在项目级，确认在多个代码库中都能工作后再提升到全局。

## 放置约定：东西到底该放哪里

文件夹结构不是随意的。特定类型的内容属于特定位置，搞错这个是最常见的错误之一。

**技能**放在 .claude/skills/ 下。每个技能有自己的目录，包含 SKILL.md 文件。SKILL.md 是入口点——定义技能做什么、如何调用、需要什么。旁边可能有 scripts/、references/、assets/ 子目录，取决于技能的复杂程度。

**代理**放在 .claude/agents/，而不是散落在顶层文件夹的松散文件。代理用特定的配置文件定义，系统需要一致地找到它们。放错位置意味着系统无法理解你的意图。

**设置**在项目级的 .claude/settings.json 或全局的 ~/.claude/settings.json。在这里配置钩子、权限和行为默认值。

**MCP 配置**在设置结构中有自己的位置。它们定义 Claude 如何连接外部工具服务器，把 MCP 配置和一般设置放在错误的作用域里会导致静默失败。

模式是一致的：结构决定了系统能否理解你的意图。放错位置的技能文件不只是乱——它对运行时是不可见的。

## 钩子是操作性的，不是被动的

很多开发者把钩子当作可选装饰。它们不是。钩子是在工具生命周期的特定时刻执行的操作组件。

最常见的错误是匹配范围过窄。如果你配置的 PostToolUse 钩子只匹配"Write"，你会错过通过"Edit"或"MultiEdit"操作进行的修改。更宽泛的匹配模式"Edit|MultiEdit|Write"能捕获更多情况，防止自动化出现静默遗漏。

钩子事件在定义好的时刻触发：PreToolUse 在工具运行之前，PostToolUse 在完成之后，Notification 在系统需要通知你的时候。每种事件类型服务不同的目的，理解时序对于构建可靠的自动化至关重要。

一个在 PostToolUse 运行来验证生成代码的钩子是有用的。一个在 PreToolUse 运行来设置环境变量的钩子是有用的。一个配错事件类型的钩子是不可见的——它不会报错，只是永远不会触发。

配置目录不是被动存储。它是运行时的一部分。请这样对待它。

## 真正需要关注的四件事

当人们第一次看到 .claude 文件夹时，觉得每样东西都同样重要。不是的。四个领域值得集中注意力。

**1. 作用域。** 全局 vs 项目级是第一个决定。搞错了这个，其他一切都不会按预期工作。优先级规则很直接——项目级覆盖全局——但你需要在开始配置之前知道自己在哪个层级操作。

**2. 放置约定。** 技能需要自己的目录和 SKILL.md。代理放在 agents/。设置有定义好的结构。这些不是建议。运行时在特定位置寻找内容，放错位置意味着静默不可见。

**3. 内容 vs 编排。** 技能、代理、设置、钩子和 MCP 配置不是等价的概念。技能定义可复用能力。代理定义自主工作流。设置定义行为默认值。钩子定义生命周期自动化。MCP 配置定义外部工具连接。把这些混为一谈会导致混乱的配置，你搞不清什么控制什么。

**4. 漂移的迹象。** .claude 文件夹的文档变化很快。2026年1月能用的东西到3月可能就变了。技能结构约定、钩子事件名称、MCP 配置格式都在演进。如果你的设置突然不工作了但你没改过任何东西，检查一下底层约定是不是变了。

## 如何看待这个文件夹

.claude 文件夹将作用域、结构和行为组合在一棵目录树中。学习它的正确方式也按这个顺序来。

从作用域开始。理解全局目录和项目目录分别放什么、为什么要做这个区分。然后学习放置约定。知道技能、代理、设置和钩子应该放哪里、为什么运行时需要它们在那里。最后理解行为。钩子、MCP 配置和设置不只是元数据——它们改变你运行命令时发生的事情。

一旦你内化了这个三层模型，文件夹就不再是隐藏的杂物堆，而是一张操作地图。结构告诉你系统能做什么、在哪里寻找指令、什么时候执行它们。

这才是 .claude 文件夹真正的解剖。不是一堆配置文件，而是你的意图和系统行为之间的结构化接口。`,
    tw: `# 解剖 .claude 資料夾：它的作用以及讓人困惑的原因

如果你搜尋過「.claude 資料夾的結構」，大概率是想搞清楚這個資料夾到底在做什麼、為什麼讓人困惑、哪些部分值得關注。這幾個問題問得很有道理。這個資料夾看起來很簡單，直到你意識到它不僅僅是存放設定檔。

2026年3月的一則 Reddit 貼文把這件事講得很清楚。一位開發者因為放置位置不明確吃過虧，於是整理了一份速查表，涵蓋了 .claude/ 目錄結構、鉤子事件、settings.json、MCP 設定、技能結構和上下文管理閾值。貼文引起共鳴，是因為這個資料夾不只是儲存設定——它在你執行命令、呼叫技能、管理代理時，主動影響發生的事情。

## 核心困惑：全域 vs 專案層級

最大的困惑來源是全域目錄 ~/.claude 和專案層級目錄 .claude/ 之間的區別。

全域目錄在你的主資料夾裡，定義了所有專案共享的行為。包括個人設定、全域 MCP 伺服器設定，以及你希望隨處可用的技能。把它理解為你的個人預設值。

專案層級 .claude/ 目錄在具體儲存庫內部。它覆蓋或擴展該特定專案的全域設定。專案專屬的技能、代理定義、鉤子和 MCP 設定放在這裡。

當你混淆這兩個層級——把專案特定的行為放在全域目錄裡，或者期望全域設定在專案覆蓋它們時仍然生效——資料夾就變得神秘了。它並不神秘。它只是有作用域，而作用域決定了優先順序。

一個實用規則：如果一個行為應該在所有地方生效，放在 ~/.claude。如果它屬於某個專案，放在專案的 .claude/ 裡。不確定的時候，先放在專案層級，確認在多個程式碼庫中都能運作後再提升到全域。

## 放置慣例：東西到底該放哪裡

資料夾結構不是隨意的。特定類型的內容屬於特定位置，搞錯這個是最常見的錯誤之一。

**技能**放在 .claude/skills/ 下。每個技能有自己的目錄，包含 SKILL.md 檔案。SKILL.md 是進入點——定義技能做什麼、如何呼叫、需要什麼。

**代理**放在 .claude/agents/，而不是散落在頂層資料夾的鬆散檔案。代理用特定的設定檔定義，系統需要一致地找到它們。

**設定**在專案層級的 .claude/settings.json 或全域的 ~/.claude/settings.json。

## 鉤子是操作性的，不是被動的

很多開發者把鉤子當作可選裝飾。它們不是。鉤子是在工具生命週期的特定時刻執行的操作元件。

最常見的錯誤是匹配範圍過窄。如果你設定的 PostToolUse 鉤子只匹配「Write」，你會錯過透過「Edit」或「MultiEdit」操作進行的修改。更寬泛的匹配模式「Edit|MultiEdit|Write」能捕捉更多情況。

## 真正需要關注的四件事

**1. 作用域。** 全域 vs 專案層級是第一個決定。搞錯了這個，其他一切都不會按預期運作。

**2. 放置慣例。** 技能需要自己的目錄和 SKILL.md。代理放在 agents/。設定有定義好的結構。

**3. 內容 vs 編排。** 技能、代理、設定、鉤子和 MCP 設定不是等價的概念。不要混淆。

**4. 漂移的跡象。** 文件變化很快，如果設定突然不工作了，檢查底層約定是不是變了。

## 如何看待這個資料夾

.claude 資料夾將作用域、結構和行為組合在一棵目錄樹中。從作用域開始，然後學習放置約定，最後理解行為。一旦你內化了這個三層模型，資料夾就不再是隱藏的雜物堆，而是一張操作地圖。`,
    de: `# Anatomie des .claude-Ordners: Was er tut und warum er verwirrt

Wenn Sie nach „Anatomie des .claude-Ordners" gesucht haben, möchten Sie wahrscheinlich herausfinden, was dieser Ordner eigentlich tut, warum er Verwirrung stiftet und welche Teile Ihre Aufmerksamkeit verdienen.

Ein Reddit-Thread aus dem März 2026 hat das klar dargestellt. Ein Entwickler, der durch unklare Platzierungskonventionen Probleme bekommen hatte, erstellte ein Cheat Sheet zum .claude/-Verzeichnislayout, zu Hook-Ereignissen, settings.json, MCP-Konfiguration, Skill-Struktur und Kontextverwaltungsschwellenwerten.

## Die Kernverwirrung: Global vs. Projektebene

Die größte Verwirrungsquelle ist der Unterschied zwischen dem globalen ~/.claude-Verzeichnis und dem projektspezifischen .claude/-Verzeichnis.

Das globale Verzeichnis liegt im Home-Ordner und definiert geteiltes Verhalten über alle Projekte hinweg. Das projektspezifische .claude/-Verzeichnis liegt innerhalb eines bestimmten Repositorys und überschreibt oder erweitert die globale Konfiguration.

Wenn Sie diese beiden Ebenen vermischen, wird der Ordner mysteriös. Er ist nicht mysteriös — er ist nur skopiert, und die Skopierung bestimmt die Priorität.

## Platzierungskonventionen

**Skills** gehören in .claude/skills/. Jeder Skill bekommt sein eigenes Verzeichnis mit einer SKILL.md-Datei.

**Agenten** kommen in .claude/agents/, nicht als lose Dateien im Hauptverzeichnis.

**Einstellungen** liegen in .claude/settings.json auf Projektebene oder ~/.claude/settings.json global.

## Hooks sind operativ, nicht passiv

Die häufigste Fehlkonfiguration ist eine zu enge Matcher-Definition. Ein PostToolUse-Hook, der nur „Write" matched, verpasst Änderungen über „Edit" oder „MultiEdit". Das breitere Matcher-Muster „Edit|MultiEdit|Write" fängt mehr ab.

## Die vier wichtigsten Punkte

**1. Skopierung** — Global vs. Projektebene ist die erste Entscheidung.

**2. Platzierungskonventionen** — Skills brauchen SKILL.md, Agenten gehören in agents/.

**3. Inhalt vs. Orchestrierung** — Skills, Agenten, Einstellungen, Hooks und MCP-Konfigurationen sind nicht gleichwertig.

**4. Anzeichen von Drift** — Dokumentation ändert sich schnell. Wenn Ihr Setup plötzlich nicht mehr funktioniert, prüfen Sie, ob sich die zugrundeliegenden Konventionen geändert haben.

Der .claude-Ordner kombiniert Skopierung, Struktur und Verhalten. Sobald Sie dieses dreischichtige Modell verinnerlicht haben, sieht der Ordner nicht mehr wie versteckter Unrat aus, sondern wie eine Betriebskarte.`,
    es: `# Anatomía de la carpeta .claude: Qué hace y por qué confunde

Si has buscado "anatomía de la carpeta .claude", probablemente intentas entender qué hace realmente esta carpeta, por qué confunde a la gente y qué partes merecen tu atención.

Un hilo de Reddit de marzo de 2026 lo dejó claro. Un desarrollador que había tenido problemas por convenciones de ubicación poco claras creó una hoja de referencia sobre la estructura del directorio .claude/, los eventos de hooks, settings.json, la configuración MCP, la estructura de skills y los umbrales de gestión de contexto.

## La confusión central: Global vs. Nivel de proyecto

La mayor fuente de confusión es la diferencia entre el directorio global ~/.claude/ y el directorio a nivel de proyecto .claude/.

El directorio global está en tu carpeta personal y define comportamiento compartido. El directorio a nivel de proyecto vive dentro de un repositorio específico y sobreescribe o extiende la configuración global.

## Convenciones de ubicación

**Skills** van en .claude/skills/. Cada skill tiene su propio directorio con un archivo SKILL.md.

**Agentes** van en .claude/agents/, no como archivos sueltos en la carpeta raíz.

**Configuración** vive en .claude/settings.json a nivel de proyecto o ~/.claude/settings.json globalmente.

## Los hooks son operativos, no pasivos

El error más común es un matcher demasiado estrecho. Un hook PostToolUse que solo coincide con "Write" se pierde ediciones hechas con "Edit" o "MultiEdit".

## Cuatro cosas que importan de verdad

**1. Alcance** — Global vs. nivel de proyecto es la primera decisión.

**2. Convenciones de ubicación** — Los skills necesitan SKILL.md, los agentes van en agents/.

**3. Contenido vs. orquestación** — Skills, agentes, configuración, hooks y MCP no son conceptos equivalentes.

**4. Señales de deriva** — La documentación cambia rápido. Si tu configuración deja de funcionar sin que la hayas modificado, verifica si las convenciones subyacentes cambiaron.

La carpeta .claude combina alcance, estructura y comportamiento. Una vez que internalizas este modelo de tres capas, deja de parecer desorden oculto y empieza a verse como un mapa de operaciones.`,
    fr: `# Anatomie du dossier .claude : son rôle et pourquoi il déroute

Si vous avez cherché « anatomie du dossier .claude », vous essayez probablement de comprendre ce que fait ce dossier, pourquoi il embrouille les gens, et quelles parties méritent votre attention.

Un fil Reddit de mars 2026 l'a bien résumé. Un développeur ayant eu des problèmes à cause de conventions de placement peu claires a créé une fiche récapitulative couvrant l'arborescence .claude/, les événements de hooks, settings.json, la configuration MCP, la structure des skills et les seuils de gestion de contexte.

## La confusion centrale : global vs. niveau projet

La plus grande source de confusion est la différence entre le répertoire global ~/.claude/ et le répertoire au niveau projet .claude/.

Le répertoire global se trouve dans votre dossier personnel et définit un comportement partagé. Le répertoire niveau projet se trouve dans un dépôt spécifique et remplit ou étend la configuration globale.

## Conventions de placement

**Les skills** vont dans .claude/skills/. Chaque skill a son propre répertoire avec un fichier SKILL.md.

**Les agents** vont dans .claude/agents/, pas en fichiers épars à la racine.

**Les paramètres** se trouvent dans .claude/settings.json au niveau projet ou ~/.claude/settings.json globalement.

## Les hooks sont opérationnels, pas passifs

L'erreur la plus courante est un matcher trop étroit. Un hook PostToolUse qui ne correspond qu'à « Write » rate les modifications faites via « Edit » ou « MultiEdit ».

## Les quatre points essentiels

**1. Portée** — Global vs. niveau projet est la première décision.

**2. Conventions de placement** — Les skills ont besoin de SKILL.md, les agents vont dans agents/.

**3. Contenu vs. orchestration** — Skills, agents, paramètres, hooks et MCP ne sont pas des concepts équivalents.

**4. Signes de dérive** — La documentation évolue rapidement. Si votre configuration cesse de fonctionner, vérifiez si les conventions sous-jacentes ont changé.

Le dossier .claude combine portée, structure et comportement. Une fois ce modèle à trois couches intégré, le dossier cesse de ressembler à un encombrement caché et devient une carte opérationnelle.`,
    jp: `# .claude フォルダの解剖：何をするのか、なぜ混乱するのか

「.claude フォルダの構造」を検索したということは、このフォルダが実際に何をするのか、なぜ混乱を招くのか、どの部分に注目すべきかを知りたいということでしょう。

2026年3月のRedditスレッドで、はっきりと説明されました。配置規則が不明確でトラブルを経験した開発者が、.claude/ディレクトリレイアウト、フックイベント、settings.json、MCP設定、スキル構造、コンテキスト管理の閾値をまとめたチートシートを作成しました。

## 核心的な混乱：グローバル vs プロジェクトレベル

最大の混乱源は、グローバルディレクトリ ~/.claude とプロジェクトレベルのディレクトリ .claude/ の違いです。

グローバルディレクトリはホームフォルダにあり、すべてのプロジェクトに共通する動作を定義します。プロジェクトレベルの .claude/ は特定のリポジトリ内にあり、グローバル設定を上書きまたは拡張します。

## 配置規則

**スキル**は .claude/skills/ に置きます。各スキルにはSKILL.mdファイルを含む専用ディレクトリがあります。

**エージェント**は .claude/agents/ に置きます。トップレベルにバラバラのファイルを置かないでください。

**設定**はプロジェクトレベルでは .claude/settings.json、グローバルでは ~/.claude/settings.json にあります。

## フックは能動的、受動的ではない

最も一般的な間違いは、マッチャーの範囲が狭すぎることです。PostToolUseフックが「Write」のみにマッチすると、「Edit」や「MultiEdit」による変更を見逃します。「Edit|MultiEdit|Write」という広いマッチャーパターンの方が多くのケースを捕捉できます。

## 実際に重要な4つのこと

**1. スコープ** — グローバル vs プロジェクトレベルが最初の判断です。

**2. 配置規則** — スキルにはSKILL.mdが必要、エージェントはagents/に置きます。

**3. コンテンツ vs オーケストレーション** — スキル、エージェント、設定、フック、MCP設定は同等の概念ではありません。

**4. ドリフトの兆候** — ドキュメントは急速に変わります。設定が突然動かなくなったら、基盤となる規則が変わっていないか確認してください。

.claudeフォルダはスコープ、構造、動作を組み合わせたものです。この3層モデルを理解すれば、フォルダは隠された散らかりではなく、動作マップに見えてきます。`,
    pt: `# Anatomia da pasta .claude: O que faz e por que confunde

Se você pesquisou "anatomia da pasta .claude", provavelmente está tentando entender o que essa pasta realmente faz, por que confunde as pessoas e quais partes merecem atenção.

Um tópico do Reddit de março de 2026 deixou isso claro. Um desenvolvedor que teve problemas com convenções de colocação pouco claras criou uma folha de dicas cobrindo o layout do diretório .claude/, eventos de hooks, settings.json, configuração MCP, estrutura de skills e limites de gerenciamento de contexto.

## A confusão central: Global vs. Nível de projeto

A maior fonte de confusão é a diferença entre o diretório global ~/.claude/ e o diretório no nível do projeto .claude/.

O diretório global fica na sua pasta pessoal e define comportamento compartilhado. O diretório no nível do projeto fica dentro de um repositório específico e sobrescreve ou estende a configuração global.

## Convenções de colocação

**Skills** ficam em .claude/skills/. Cada skill tem seu próprio diretório com um arquivo SKILL.md.

**Agentes** ficam em .claude/agents/, não como arquivos soltos na pasta raiz.

**Configurações** ficam em .claude/settings.json no nível do projeto ou ~/.claude/settings.json globalmente.

## Hooks são operacionais, não passivos

O erro mais comum é um matcher muito restrito. Um hook PostToolUse que só corresponde a "Write" perde edições feitas com "Edit" ou "MultiEdit".

## Quatro coisas que realmente importam

**1. Escopo** — Global vs. nível de projeto é a primeira decisão.

**2. Convenções de colocação** — Skills precisam de SKILL.md, agentes vão em agents/.

**3. Conteúdo vs. orquestração** — Skills, agentes, configurações, hooks e MCP não são conceitos equivalentes.

**4. Sinais de deriva** — A documentação muda rápido. Se sua configuração parou de funcionar, verifique se as convenções subjacentes mudaram.

A pasta .claude combina escopo, estrutura e comportamento. Uma vez internalizado esse modelo de três camadas, a pasta deixa de parecer bagunça escondida e passa a parecer um mapa operacional.`,
    ru: `# Анатомия папки .claude: зачем она нужна и почему путает людей

Если вы искали «анатомия папки .claude», вы, вероятно, пытаетесь разобраться, что делает эта папка, почему она вводит людей в заблуждение и на что стоит обратить внимание.

Ветка Reddit от марта 2026 года разложила всё по полочкам. Разработчик, который пострадал из-за неясных правил размещения, составил шпаргалку по структуре директории .claude/, событиям хуков, settings.json, конфигурации MCP, структуре навыков и порогам управления контекстом.

## Главная путаница: глобальный vs проектный уровень

Главный источник путаницы — разница между глобальной директорией ~/.claude/ и проектной директорией .claude/.

Глобальная директория находится в домашней папке и определяет общее поведение для всех проектов. Проектная директория .claude/ расположена внутри конкретного репозитория и переопределяет или расширяет глобальную конфигурацию.

## Соглашения о размещении

**Навыки** размещаются в .claude/skills/. Каждый навык имеет собственную директорию с файлом SKILL.md.

**Агенты** размещаются в .claude/agents/, а не разбросанными файлами в корневой папке.

**Настройки** находятся в .claude/settings.json на проектном уровне или ~/.claude/settings.json глобально.

## Хуки — оперативные, а не пассивные

Самая частая ошибка — слишком узкий matcher. Хук PostToolUse, сматчивающий только «Write», пропустит правки через «Edit» или «MultiEdit». Более широкий паттерн «Edit|MultiEdit|Write» покрывает больше случаев.

## Четыре вещи, которые действительно важны

**1. Область действия** — Глобальный vs проектный уровень — это первое решение.

**2. Соглашения о размещении** — Навыкам нужен SKILL.md, агенты идут в agents/.

**3. Контент vs оркестрация** — Навыки, агенты, настройки, хуки и MCP — не эквивалентные понятия.

**4. Признаки дрейфа** — Документация меняется быстро. Если ваша перестала работать, проверьте, не изменились ли базовые соглашения.

Папка .claude объединяет область действия, структуру и поведение. Освоив эту трёхуровневую модель, вы увидите в папке не мусор, а операционную карту.`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-03-28',
  category: 'Developer Tools',
  tags: [
    'Claude Code',
    'Developer Tools',
    'AI Coding',
    'Configuration',
    'anatomy of the claude folder',
    'claude code configuration',
    'claude code setup guide',
    'claude code hooks',
    'how to configure claude code',
    'claude code vs cursor',
  ],
};

export default postAnatomyOfTheClaudeFolder;
