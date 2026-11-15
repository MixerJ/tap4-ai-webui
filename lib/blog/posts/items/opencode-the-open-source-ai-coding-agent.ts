import { BlogPost } from '../../types';

const postOpencodeTheOpenSourceAiCodingAgent: BlogPost = {
  id: '3108',
  slug: 'opencode-the-open-source-ai-coding-agent',
  title: {
    en: 'OpenCode: Configure an AI Coding Agent for Your Repository',
    cn: 'OpenCode：为代码仓库配置 AI 编程代理',
    tw: 'OpenCode：為程式碼儲存庫設定 AI 程式設計代理',
    de: 'OpenCode: Einen KI-Coding-Agenten für das Repository konfigurieren',
    es: 'OpenCode: configura un agente de programación para tu repositorio',
    fr: 'OpenCode : configurer un agent de programmation pour son dépôt',
    jp: 'OpenCode：リポジトリに合わせて AI コーディングエージェントを設定する',
    pt: 'OpenCode: configure um agente de programação para seu repositório',
    ru: 'OpenCode: настройка ИИ-агента для вашего репозитория',
  },
  excerpt: {
    en: 'A practical OpenCode v2 guide to provider setup, ordered permission rules, Plan and Build agents, and verifying a focused repository change.',
    cn: '基于 OpenCode v2 的实用指南，涵盖提供商连接、有序权限规则、Plan 与 Build 代理，以及单一缺陷修改的验证。',
    tw: '依據 OpenCode v2 說明提供商連線、有序權限規則、Plan 與 Build 代理，以及單一缺陷修正的驗證方式。',
    de: 'Ein praktischer Leitfaden zu OpenCode v2: Anbieter verbinden, Berechtigungen ordnen, Plan und Build einsetzen und gezielte Änderungen überprüfen.',
    es: 'Guía práctica de OpenCode v2: conectar proveedores, ordenar permisos, usar Plan y Build y verificar un cambio concreto en el repositorio.',
    fr: 'Guide pratique OpenCode v2 : connexion des fournisseurs, règles de permission ordonnées, agents Plan et Build et vérification d’une modification ciblée.',
    jp: 'OpenCode v2 のプロバイダー接続、権限ルールの順序、Plan と Build、具体的な修正の検証方法を解説します。',
    pt: 'Guia prático do OpenCode v2: conexão de provedores, permissões ordenadas, agentes Plan e Build e verificação de uma alteração específica.',
    ru: 'Практическое руководство по OpenCode v2: подключение провайдера, порядок правил доступа, агенты Plan и Build и проверка конкретного исправления.',
  },
  content: {
    en: `# OpenCode: Configure an AI Coding Agent for Your Repository

OpenCode is an open source coding agent with terminal, desktop, and web interfaces. Its usefulness depends on the model you connect and the repository context you provide. This guide follows the v2 documentation checked on November 15, 2026; older tutorials can use different configuration fields. The [installation guide](https://opencode.ai/docs/) documents supported packages and the \`/connect\` provider command.

## Connect the repository and provider

Install a release appropriate to your operating system, open the project directory, and run \`opencode\`. Use \`/connect\` to configure a provider available to your account. A working client does not mean model usage is free: provider billing and data handling still apply.

Create \`opencode.jsonc\` in the repository and add the schema below. The [configuration reference](https://opencode.ai/docs/config/) explains project, global, and managed settings. Check those layers when a setting appears ineffective; managed configuration can override project choices. Keep credentials outside committed files.

## Set explicit command boundaries

This v2 example requests confirmation for shell commands, blocks pushes, and asks before accessing directories outside the project:

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

The last matching permission rule wins; inspect agent-specific overrides too. These are tool permissions, not an operating-system sandbox. The [permission reference](https://opencode.ai/docs/permissions/) describes action names and matching behavior.

## Investigate one concrete defect

For a form submitting twice, start with Plan: “Trace the submit handler and network request. Identify why one click creates two requests; propose the smallest correction.” Plan avoids editing ordinary project files, but its shell commands remain permission-controlled. Build is the agent for implementation, as documented in the [agent reference](https://opencode.ai/docs/agents/).

Give Build the identified files and acceptance criteria: one request per click, unchanged validation, and a regression check for repeated submission. Ask it to reuse the existing test framework and report the actual command output. Do not infer correctness from a plausible explanation.

## Review the result before adoption

Inspect \`git diff\`, run the relevant test and the repository's required checks, and review unexpected dependency or generated-file changes. Keep a clean Git checkpoint: filesystem undo does not reverse remote operations or database changes. Compare providers on this same defect, recording review time, remaining failures, and actual usage charges. That produces a useful selection record without inventing benchmark scores or assuming every model behaves alike.
`,
    cn: `# OpenCode：为代码仓库配置 AI 编程代理

OpenCode 是开源编程代理，提供终端、桌面和网页界面。实际效果取决于所连接的模型，以及提供给它的代码仓库上下文。本文依据 2026 年 11 月 15 日核查的 v2 文档；旧教程可能采用不同的配置字段。[安装指南](https://opencode.ai/docs/)列出了受支持的软件包和 \`/connect\` 提供商连接命令。

## 连接仓库与模型提供商

安装适合操作系统的版本，进入项目目录并运行 \`opencode\`。使用 \`/connect\` 配置当前账号可访问的提供商。客户端能正常工作，不代表模型调用免费：仍需遵守提供商的计费和数据处理规则。

在仓库创建 \`opencode.jsonc\`，加入下方 schema。[配置参考](https://opencode.ai/docs/config/)解释了项目、全局和受管理配置之间的关系。如果设置没有生效，应检查这些层级；受管理配置可以覆盖项目选项。不要把凭据写入会提交的文件。

## 明确命令执行边界

下面的 v2 示例要求执行 shell 命令前确认，禁止推送，并在访问项目外目录前询问：

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

最后一条匹配的权限规则生效，也要检查特定代理的覆盖规则。这些属于工具权限，并不是操作系统级沙箱。[权限参考](https://opencode.ai/docs/permissions/)说明了动作名称和匹配行为。

## 调查一个具体缺陷

遇到表单重复提交，可以先交给 Plan：“追踪提交处理函数和网络请求，说明为什么点击一次产生两次请求，并提出最小修正。”Plan 避免修改普通项目文件，但 shell 命令仍受权限规则控制。Build 负责实施修改，具体区别见[代理参考](https://opencode.ai/docs/agents/)。

把定位到的文件和验收要求交给 Build：每次点击只发一个请求，保留现有校验，并添加重复提交的回归检查。要求复用现有测试框架，报告真实的命令输出。解释听起来合理，并不能证明代码正确。

## 采用前检查结果

查看 \`git diff\`，执行相关测试和仓库要求的检查，审查意外出现的依赖或生成文件变更。保留干净的 Git 检查点：文件系统撤销无法逆转远程操作或数据库修改。用同一缺陷比较不同提供商，记录审查时间、剩余失败和实际调用费用。这才是可用的选型记录，无需编造跑分，也不能假设所有模型行为一致。
`,
    tw: `# OpenCode：為程式碼儲存庫設定 AI 程式設計代理

OpenCode 是開源程式設計代理，提供終端機、桌面和網頁介面。實際效果取決於連接的模型，以及提供給它的儲存庫背景資訊。本文依據 2026 年 11 月 15 日查核的 v2 文件；舊教學可能採用不同的設定欄位。[安裝指南](https://opencode.ai/docs/)列出支援的套件和 \`/connect\` 提供商連線指令。

## 連接儲存庫與模型提供商

安裝適合作業系統的版本，進入專案目錄並執行 \`opencode\`。使用 \`/connect\` 設定帳號可存取的提供商。用戶端能正常運作，不代表模型呼叫免費：仍須遵守提供商的計費和資料處理規則。

在儲存庫建立 \`opencode.jsonc\`，加入下方 schema。[設定參考](https://opencode.ai/docs/config/)解釋專案、全域和受管理設定的關係。如果設定沒有生效，應檢查這些層級；受管理設定可以覆寫專案選項。不要將憑證寫入會提交的檔案。

## 明確訂定指令執行界線

下方 v2 範例要求執行 shell 指令前確認，禁止推送，並在存取專案外目錄前詢問：

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

最後一條符合的權限規則生效，也須檢查個別代理的覆寫規則。這些是工具權限，並非作業系統層級的沙箱。[權限參考](https://opencode.ai/docs/permissions/)說明動作名稱和比對方式。

## 調查一個具體缺陷

遇到表單重複送出，可以先交給 Plan：「追蹤送出處理函式與網路請求，說明為何點擊一次產生兩次請求，並提出最小修正。」Plan 避免修改一般專案檔案，但 shell 指令仍受權限控制。Build 負責實作修改，差異詳見[代理參考](https://opencode.ai/docs/agents/)。

將定位到的檔案和驗收要求交給 Build：每次點擊只發送一個請求，保留現有驗證，並加入重複送出的迴歸檢查。要求沿用既有測試框架，回報實際指令輸出。解釋聽來合理，並不代表程式正確。

## 採用前檢查結果

查看 \`git diff\`，執行相關測試和儲存庫要求的檢查，審查意外出現的相依套件或產生檔案變更。保留乾淨的 Git 檢查點：檔案系統復原無法逆轉遠端操作或資料庫修改。使用同一缺陷比較不同提供商，記錄審查時間、剩餘失敗和實際呼叫費用。這才是可用的選型紀錄，無須杜撰評測分數，也不能假設所有模型行為一致。
`,
    de: `# OpenCode: Einen KI-Coding-Agenten für das Repository konfigurieren

OpenCode ist ein quelloffener Coding-Agent mit Terminal-, Desktop- und Weboberfläche. Sein Nutzen hängt vom verbundenen Modell und dem bereitgestellten Repository-Kontext ab. Dieser Leitfaden folgt der am 15. November 2026 geprüften v2-Dokumentation; ältere Anleitungen verwenden möglicherweise andere Konfigurationsfelder. Die [Installationsanleitung](https://opencode.ai/docs/) beschreibt unterstützte Pakete und den Anbieterbefehl \`/connect\`.

## Repository und Anbieter verbinden

Installieren Sie eine passende Version, öffnen Sie das Projektverzeichnis und starten Sie \`opencode\`. Über \`/connect\` richten Sie einen für Ihr Konto verfügbaren Anbieter ein. Ein funktionierender Client bedeutet keine kostenlose Modellnutzung: Abrechnung und Datenverarbeitung des Anbieters gelten weiterhin.

Erstellen Sie \`opencode.jsonc\` im Repository mit dem folgenden Schema. Die [Konfigurationsreferenz](https://opencode.ai/docs/config/) erläutert projektbezogene, globale und verwaltete Einstellungen. Prüfen Sie diese Ebenen bei scheinbar wirkungslosen Optionen; verwaltete Einstellungen können Projektentscheidungen überschreiben. Zugangsdaten gehören nicht in eingecheckte Dateien.

## Befehle ausdrücklich begrenzen

Dieses v2-Beispiel verlangt eine Bestätigung für Shell-Befehle, blockiert Pushes und fragt vor Zugriffen außerhalb des Projekts:

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

Die letzte passende Berechtigungsregel gewinnt. Prüfen Sie auch agentenspezifische Überschreibungen. Diese Werkzeugrechte sind keine Betriebssystem-Sandbox. Die [Berechtigungsreferenz](https://opencode.ai/docs/permissions/) erklärt Aktionen und Musterabgleich.

## Einen konkreten Fehler untersuchen

Bei einem doppelt gesendeten Formular beginnen Sie mit Plan: „Verfolge Submit-Handler und Netzwerkanfrage. Erkläre, weshalb ein Klick zwei Anfragen auslöst, und schlage die kleinste Korrektur vor.“ Plan vermeidet Änderungen an normalen Projektdateien; Shell-Befehle unterliegen weiterhin den Berechtigungen. Build übernimmt die Implementierung, wie die [Agentenreferenz](https://opencode.ai/docs/agents/) beschreibt.

Übergeben Sie Build die betroffenen Dateien und Abnahmekriterien: eine Anfrage pro Klick, unveränderte Validierung und eine Regressionsprüfung für wiederholtes Absenden. Verlangen Sie das vorhandene Testframework und tatsächliche Befehlsausgaben. Eine plausible Erklärung beweist keine Korrektheit.

## Ergebnis vor der Übernahme prüfen

Prüfen Sie \`git diff\`, den relevanten Test und die vorgeschriebenen Repository-Prüfungen sowie unerwartete Änderungen an Abhängigkeiten oder generierten Dateien. Bewahren Sie einen sauberen Git-Ausgangspunkt: Dateisystem-Rücknahmen machen weder entfernte Aktionen noch Datenbankänderungen rückgängig. Vergleichen Sie Anbieter anhand desselben Fehlers und erfassen Sie Prüfzeit, verbleibende Fehler und tatsächliche Nutzungskosten. So entsteht eine brauchbare Entscheidungsgrundlage ohne erfundene Benchmarkwerte oder die Annahme identischen Modellverhaltens.
`,
    es: `# OpenCode: configura un agente de programación para tu repositorio

OpenCode es un agente de programación de código abierto con interfaces de terminal, escritorio y web. Su utilidad depende del modelo conectado y del contexto del repositorio que recibe. Esta guía sigue la documentación de v2 consultada el 15 de noviembre de 2026; los tutoriales antiguos pueden utilizar otros campos. La [guía de instalación](https://opencode.ai/docs/) describe los paquetes compatibles y el comando \`/connect\`.

## Conecta el repositorio y el proveedor

Instala una versión adecuada para tu sistema, abre el directorio del proyecto y ejecuta \`opencode\`. Usa \`/connect\` para configurar un proveedor disponible en tu cuenta. Que el cliente funcione no significa que el modelo sea gratuito: siguen aplicándose la facturación y las condiciones de tratamiento de datos del proveedor.

Crea \`opencode.jsonc\` en el repositorio y añade el esquema siguiente. La [referencia de configuración](https://opencode.ai/docs/config/) explica los ajustes del proyecto, globales y administrados. Revisa esas capas cuando una opción parezca no funcionar; la configuración administrada puede prevalecer. Mantén las credenciales fuera de los archivos versionados.

## Delimita la ejecución de comandos

Este ejemplo de v2 pide confirmación para comandos de shell, bloquea los envíos y pregunta antes de acceder a directorios externos:

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

Prevalece la última regla coincidente; revisa también las modificaciones específicas del agente. Son permisos de herramientas, no un aislamiento del sistema operativo. La [referencia de permisos](https://opencode.ai/docs/permissions/) explica las acciones y la coincidencia de patrones.

## Investiga un fallo concreto

Para un formulario que se envía dos veces, comienza con Plan: «Rastrea el controlador de envío y la petición de red. Explica por qué un clic genera dos peticiones y propone la corrección mínima». Plan evita editar archivos normales del proyecto, pero sus comandos siguen sujetos a permisos. Build realiza la implementación, según la [referencia de agentes](https://opencode.ai/docs/agents/).

Entrega a Build los archivos afectados y estos criterios: una petición por clic, validación sin cambios y una comprobación de regresión del envío repetido. Pide reutilizar el marco de pruebas existente y mostrar la salida real de los comandos. Una explicación convincente no demuestra que el código sea correcto.

## Revisa antes de adoptar

Inspecciona \`git diff\`, ejecuta la prueba pertinente y las comprobaciones exigidas, y revisa cambios inesperados en dependencias o archivos generados. Conserva un punto de partida limpio en Git: deshacer archivos no revierte operaciones remotas ni cambios en bases de datos. Compara proveedores con el mismo fallo y registra tiempo de revisión, errores pendientes y costes reales. Así obtienes una base de selección útil, sin inventar puntuaciones ni asumir que todos los modelos se comportan igual.
`,
    fr: `# OpenCode : configurer un agent de programmation pour son dépôt

OpenCode est un agent de programmation open source accessible dans un terminal, une application de bureau ou une interface web. Son intérêt dépend du modèle connecté et du contexte du dépôt fourni. Ce guide suit la documentation v2 vérifiée le 15 novembre 2026 ; les anciens tutoriels peuvent utiliser d’autres champs. Le [guide d’installation](https://opencode.ai/docs/) présente les paquets disponibles et la commande \`/connect\`.

## Connecter le dépôt et le fournisseur

Installez une version adaptée à votre système, ouvrez le répertoire du projet et lancez \`opencode\`. Configurez avec \`/connect\` un fournisseur accessible à votre compte. Un client opérationnel ne signifie pas une utilisation gratuite du modèle : la facturation et les conditions de traitement des données du fournisseur s’appliquent.

Créez \`opencode.jsonc\` dans le dépôt avec le schéma ci-dessous. La [référence de configuration](https://opencode.ai/docs/config/) explique les paramètres du projet, globaux et administrés. Vérifiez ces couches si une option semble sans effet ; les paramètres administrés peuvent prévaloir. Gardez les identifiants hors des fichiers versionnés.

## Définir les limites des commandes

Cet exemple v2 demande confirmation pour les commandes shell, interdit les push et demande l’accord avant tout accès hors du projet :

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

La dernière règle correspondante l’emporte ; examinez aussi les exceptions propres à l’agent. Ces permissions d’outils ne constituent pas un bac à sable du système. La [référence des permissions](https://opencode.ai/docs/permissions/) précise les actions et les correspondances.

## Étudier un défaut précis

Pour un formulaire envoyé deux fois, commencez avec Plan : « Suis le gestionnaire d’envoi et la requête réseau. Explique pourquoi un clic produit deux requêtes et propose la correction minimale. » Plan évite de modifier les fichiers ordinaires du projet, mais ses commandes shell restent soumises aux permissions. Build réalise l’implémentation, selon la [référence des agents](https://opencode.ai/docs/agents/).

Donnez à Build les fichiers concernés et les critères : une requête par clic, validation inchangée et contrôle de non-régression des envois répétés. Demandez de réutiliser le cadre de tests et de fournir les sorties réelles. Une explication plausible ne prouve pas la correction du code.

## Vérifier avant d’adopter

Examinez \`git diff\`, lancez le test pertinent et les vérifications imposées par le dépôt, puis contrôlez les changements inattendus de dépendances ou de fichiers générés. Conservez un point de départ Git propre : l’annulation de fichiers ne rétablit ni opérations distantes ni bases de données. Comparez les fournisseurs sur ce même défaut en consignant temps de revue, erreurs restantes et frais réels. Vous obtenez une base de choix utile sans scores inventés ni hypothèse de comportement identique entre modèles.
`,
    jp: `# OpenCode：リポジトリに合わせて AI コーディングエージェントを設定する

OpenCode は、ターミナル、デスクトップ、Web のインターフェースを持つオープンソースのコーディングエージェントです。有用性は接続するモデルと、提供するリポジトリの情報に左右されます。本記事は 2026 年 11 月 15 日に確認した v2 の文書に基づきます。古いチュートリアルでは設定項目が異なる場合があります。[インストールガイド](https://opencode.ai/docs/)には対応パッケージと \`/connect\` コマンドが記載されています。

## リポジトリとプロバイダーを接続する

OS に合うリリースをインストールし、プロジェクトのディレクトリで \`opencode\` を起動します。\`/connect\` でアカウントから利用できるプロバイダーを設定します。クライアントが動作してもモデルの利用が無料になるわけではなく、提供元の課金とデータ処理条件が適用されます。

リポジトリに \`opencode.jsonc\` を作り、下記のスキーマを追加します。[設定リファレンス](https://opencode.ai/docs/config/)は、プロジェクト、グローバル、管理設定の関係を説明しています。設定が効かないときは各階層を確認してください。管理設定がプロジェクトの選択を上書きする場合があります。認証情報はコミット対象のファイルに含めません。

## コマンドの実行範囲を明示する

この v2 の例では、シェルコマンドに確認を求め、push を禁止し、プロジェクト外のディレクトリへのアクセス時にも確認します。

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

一致する最後の権限ルールが適用されるため、エージェント固有の上書きも確認します。これはツールの権限であり、OS のサンドボックスではありません。アクション名と照合の仕組みは[権限リファレンス](https://opencode.ai/docs/permissions/)を参照してください。

## 具体的な不具合を一つ調べる

フォームが二重送信される場合は Plan で始めます。「送信ハンドラーとネットワーク要求を追跡し、1 回のクリックで 2 回要求が送られる理由と最小の修正案を示して」と依頼します。Plan は通常のプロジェクトファイルの編集を避けますが、シェルコマンドは引き続き権限管理の対象です。実装を担当するのは Build で、違いは[エージェントリファレンス](https://opencode.ai/docs/agents/)に説明があります。

Build には対象ファイルと合格条件を渡します。クリックごとの要求は 1 回、入力検証は現状維持、連続送信には回帰チェックを用意する、という条件です。既存のテスト基盤を使い、実際のコマンド出力を報告させます。もっともらしい説明だけで正しさを判断しないでください。

## 採用前に結果を確認する

\`git diff\` を確認し、関連テストとリポジトリ必須のチェックを実行して、依存関係や生成ファイルの意図しない変更を調べます。クリーンな Git の基準点を残してください。ファイルの取り消しでは、リモート操作やデータベース変更を元に戻せません。同じ不具合でプロバイダーを比較し、レビュー時間、残った失敗、実際の利用料金を記録します。架空のスコアやモデルの挙動が同一という前提に頼らず、選定の根拠を作れます。
`,
    pt: `# OpenCode: configure um agente de programação para seu repositório

OpenCode é um agente de programação de código aberto com interfaces de terminal, desktop e web. Sua utilidade depende do modelo conectado e do contexto do repositório fornecido. Este guia segue a documentação v2 verificada em 15 de novembro de 2026; tutoriais antigos podem usar campos diferentes. O [guia de instalação](https://opencode.ai/docs/) descreve pacotes compatíveis e o comando \`/connect\`.

## Conecte o repositório e o provedor

Instale uma versão apropriada ao sistema, abra o diretório do projeto e execute \`opencode\`. Use \`/connect\` para configurar um provedor disponível na sua conta. Um cliente funcionando não significa uso gratuito do modelo: a cobrança e as condições de tratamento de dados do provedor continuam válidas.

Crie \`opencode.jsonc\` no repositório com o esquema abaixo. A [referência de configuração](https://opencode.ai/docs/config/) explica ajustes do projeto, globais e gerenciados. Confira essas camadas quando uma opção parecer não funcionar; configurações gerenciadas podem prevalecer. Mantenha credenciais fora dos arquivos versionados.

## Defina limites para os comandos

Este exemplo v2 solicita confirmação para comandos de shell, bloqueia envios e pergunta antes de acessar diretórios externos ao projeto:

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

A última regra correspondente prevalece; confira também as substituições específicas do agente. São permissões de ferramentas, não uma sandbox do sistema operacional. A [referência de permissões](https://opencode.ai/docs/permissions/) explica ações e correspondência de padrões.

## Investigue um defeito concreto

Para um formulário enviado duas vezes, comece com Plan: “Rastreie o manipulador de envio e a requisição de rede. Explique por que um clique cria duas requisições e proponha a menor correção.” Plan evita editar arquivos comuns do projeto, mas seus comandos continuam sujeitos às permissões. Build implementa a alteração, conforme a [referência de agentes](https://opencode.ai/docs/agents/).

Entregue ao Build os arquivos identificados e os critérios: uma requisição por clique, validação preservada e uma verificação de regressão para envio repetido. Peça que reutilize o framework de testes existente e apresente a saída real dos comandos. Uma explicação plausível não comprova a correção do código.

## Revise antes de adotar

Inspecione \`git diff\`, execute o teste relevante e as verificações exigidas pelo repositório e examine mudanças inesperadas em dependências ou arquivos gerados. Preserve um ponto inicial limpo no Git: desfazer arquivos não reverte operações remotas nem alterações no banco de dados. Compare provedores nesse mesmo defeito, registrando tempo de revisão, falhas restantes e custos reais. Isso cria uma base útil para escolher, sem inventar pontuações nem presumir comportamento idêntico entre modelos.
`,
    ru: `# OpenCode: настройка ИИ-агента для вашего репозитория

OpenCode — агент для программирования с открытым исходным кодом, терминальным, настольным и веб-интерфейсами. Его полезность зависит от подключённой модели и контекста репозитория. Руководство опирается на документацию v2, проверенную 15 ноября 2026 года; старые инструкции могут использовать другие поля конфигурации. [Руководство по установке](https://opencode.ai/docs/) описывает поддерживаемые пакеты и команду \`/connect\`.

## Подключите репозиторий и провайдера

Установите подходящий для ОС выпуск, откройте каталог проекта и запустите \`opencode\`. Через \`/connect\` настройте провайдера, доступного вашей учётной записи. Работающий клиент не означает бесплатного использования модели: сохраняются тарификация и условия обработки данных провайдера.

Создайте \`opencode.jsonc\` в репозитории, добавив схему ниже. [Справочник конфигурации](https://opencode.ai/docs/config/) объясняет проектные, глобальные и управляемые настройки. Проверьте эти уровни, если параметр не действует: управляемая конфигурация может переопределять проектную. Не помещайте секреты в отслеживаемые Git файлы.

## Явно ограничьте команды

Этот пример v2 запрашивает подтверждение команд оболочки, запрещает отправку изменений и спрашивает разрешение перед доступом за пределы проекта:

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "permissions": [
    { "action": "shell", "resource": "*", "effect": "ask" },
    { "action": "shell", "resource": "git push *", "effect": "deny" },
    { "action": "external_directory", "resource": "*", "effect": "ask" }
  ]
}
\`\`\`

Действует последнее совпавшее правило; проверьте также переопределения конкретного агента. Это разрешения инструментов, а не изоляция средствами ОС. [Справочник разрешений](https://opencode.ai/docs/permissions/) описывает действия и сопоставление шаблонов.

## Исследуйте конкретный дефект

Если форма отправляется дважды, начните с Plan: «Проследи обработчик отправки и сетевой запрос. Объясни, почему один клик создаёт два запроса, и предложи минимальное исправление». Plan избегает изменения обычных файлов проекта, но команды оболочки по-прежнему контролируются разрешениями. Реализацию выполняет Build; различия описаны в [справочнике агентов](https://opencode.ai/docs/agents/).

Передайте Build найденные файлы и критерии приёмки: один запрос на клик, прежняя валидация и регрессионная проверка повторной отправки. Попросите использовать существующий тестовый фреймворк и показать фактический вывод команд. Правдоподобное объяснение не доказывает корректность кода.

## Проверьте результат перед внедрением

Изучите \`git diff\`, запустите относящийся к изменению тест и обязательные проверки репозитория, проверьте неожиданные изменения зависимостей и сгенерированных файлов. Сохраните чистую исходную точку в Git: отмена файловых изменений не отменяет удалённые операции или изменения базы данных. Сравнивайте провайдеров на одном дефекте, фиксируя время проверки, оставшиеся ошибки и реальные расходы. Так появляется полезное основание для выбора без выдуманных баллов и предположений об одинаковом поведении моделей.
`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-03-27',
  updatedAt: '2026-11-15',
  category: 'Developer Tools',
  tags: [
    'AI Coding',
    'Open Source',
    'Developer Tools',
    'Code Assistant',
    'OpenCode',
    'opencode the open source ai coding agent',
  ],
};

export default postOpencodeTheOpenSourceAiCodingAgent;
