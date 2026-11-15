import { BlogPost } from '../../types';

const postGemini25ProGettingStartedGuide: BlogPost = {
  id: '3105',
  slug: 'gemini-2-5-pro-getting-started-guide',
  title: {
    en: 'Gemini 2.5 Pro: Historical Guide and Migration Checks',
    cn: 'Gemini 2.5 Pro 历史入门与迁移检查',
    tw: 'Gemini 2.5 Pro 歷史入門與遷移檢查',
    de: 'Gemini 2.5 Pro: Historischer Einstieg und Migrationsprüfung',
    es: 'Gemini 2.5 Pro: guía histórica y revisión de migración',
    fr: 'Gemini 2.5 Pro : guide historique et vérifications de migration',
    jp: 'Gemini 2.5 Pro の旧ガイドと移行時の確認事項',
    pt: 'Gemini 2.5 Pro: guia histórico e revisão de migração',
    ru: 'Gemini 2.5 Pro: историческое руководство и проверка миграции',
  },
  excerpt: {
    en: 'Gemini 2.5 Pro is deprecated. Learn how to review an older integration and evaluate an available replacement with document, table, and grounding tests.',
    cn: 'Gemini 2.5 Pro 已弃用。通过文档摘要、表格计算与来源核验，评估旧集成并选择当前可用的替代模型。',
    tw: 'Gemini 2.5 Pro 已棄用。利用文件摘要、表格計算與來源核驗，評估舊整合並選擇目前可用的替代模型。',
    de: 'Die ältere Gemini-2.5-Pro-Integration anhand von Dokumenten, Berechnungen und Quellen prüfen und einen verfügbaren Nachfolger bewerten.',
    es: 'Revisa una integración antigua de Gemini 2.5 Pro y evalúa un sustituto disponible mediante documentos, cálculos y comprobación de fuentes.',
    fr: 'Évaluer une ancienne intégration Gemini 2.5 Pro et un remplacement disponible avec des documents, des calculs et une vérification des sources.',
    jp: '非推奨となった Gemini 2.5 Pro の既存連携を見直し、文書、表計算、出典確認で代替モデルを評価します。',
    pt: 'Revise uma integração antiga do Gemini 2.5 Pro e avalie um substituto disponível com documentos, cálculos e verificação de fontes.',
    ru: 'Как оценить старую интеграцию Gemini 2.5 Pro и доступную замену с помощью документов, расчётов и проверки источников.',
  },
  content: {
    en: `# Gemini 2.5 Pro: Historical Guide and Migration Checks

## Start with availability, not an old tutorial

Gemini 2.5 Pro is deprecated; new projects should choose an available model after checking Google's deprecation notice. This page remains a guide to evaluating an older integration, not an instruction to select 2.5 Pro in AI Studio. Record the date, project, model identifier, and API used by the existing application. A successful historical example does not establish access for a new account. Keep model selection in configuration so testing a replacement does not require rewriting the application.

## Establish a small document baseline

Begin with a document you can inspect manually: a short report with dated claims and a clearly labelled table. Ask for a summary that separates supplied facts from missing information and identifies the supporting section for each conclusion. Save the input and a human-written reference answer. Repeat with one page deliberately omitted. A useful system should acknowledge the gap rather than silently reconstruct missing material. Do not upload confidential files merely to reproduce a public tutorial.

## Separate analysis from verification

For a spreadsheet task, request column definitions and a proposed calculation before asking for a conclusion. Compute totals and percentages in your own code, then compare the generated explanation with those verified values. For research questions, check whether the configured request actually uses a supported search or grounding feature. Inspect cited pages yourself: a citation can be irrelevant or outdated even when it opens successfully. Neither confident wording nor a plausible URL proves that a claim was checked.

## Test the replacement as a new dependency

Use the current official setup instructions for authentication and SDK usage instead of copying an obsolete model example. Keep credentials on the server and test one non-sensitive request first. Evaluate the replacement with the same document, omitted-page case, arithmetic checks, and follow-up questions. Log errors, output validity, latency, and actual usage. Set acceptance criteria for your application; this article does not promise a free quota, a fixed response time, or benchmark superiority. Preserve the original fixtures and document the chosen replacement before switching production traffic.

## Sources

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
    cn: `# Gemini 2.5 Pro 历史入门与迁移检查

## 先确认可用性，再看旧教程

Gemini 2.5 Pro 已弃用，新项目应查看 Google 官方弃用说明后选择可用模型。本文保留的是旧集成的评估方法，不再指导新用户在 AI Studio 中选择 2.5 Pro。记录现有应用所用项目、模型标识、API 及检查日期。过去成功运行的示例，并不能证明新账号仍有权限。把模型选择放进配置，避免更换候选模型时必须重写应用。

## 用可人工核对的文档建立基线

先选择一份短报告，其中包含带日期的事实与清晰标注的表格。要求模型在摘要中区分原文事实和缺失信息，并给每个结论标出支持它的章节。保存输入，同时由人工撰写参考答案。随后故意删除一页，再执行相同任务。理想结果应明确说明缺少的材料，而不是默默补出内容。无需为了复现公开教程而上传客户文件；用脱敏样例即可检查主要流程。

## 将分析与核验分开

处理表格时，先让模型解释列含义和计划使用的计算，再要求结论。总额与百分比由自己的代码计算，然后核对生成说明是否与数值一致。处理资料检索时，应确认请求是否真的配置了受支持的搜索或来源关联功能。逐个打开引用页面，检查内容、日期和结论之间的关系。页面能够打开，也可能支持不了那句话；流畅表达和看似合理的网址都不能代替事实核验。

## 把替代模型当作新依赖测试

鉴权和 SDK 使用以当前官方入门文档为准，不复制已经过时的模型示例。密钥保存在服务端，先跑一条不含敏感信息的请求。对候选模型重复同一份文档、缺页测试、算术核验及追问，记录错误、输出格式、延迟与实际用量。根据自己的应用要求设定验收标准。本文不承诺固定免费额度、响应速度或榜单优势。保存测试样例并记录选择依据，再切换生产流量。

## 官方资料

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
    tw: `# Gemini 2.5 Pro 歷史入門與遷移檢查

## 先確認可用性

Gemini 2.5 Pro 已棄用，新專案應查閱 Google 官方棄用說明後選擇可用模型。本頁保留舊整合的評估方法，不再引導新使用者在 AI Studio 選擇 2.5 Pro。記錄現有應用程式使用的專案、模型識別碼、API 與查核日期。過去能執行的範例，不代表新帳號仍有相同權限。將模型選擇保存在設定中，讓更換候選模型不必重寫整個應用程式。

## 建立可人工驗證的文件基準

選一份篇幅短、包含日期與明確表格標題的報告。要求摘要區分文件事實與缺少的資訊，並為各項結論指出對應章節。保存輸入，另外人工撰寫參考答案。接著刻意移除其中一頁，再執行同樣的任務。系統應指出缺漏，而不是自行補齊不存在的內容。使用去識別化資料即可驗證流程，不需要為了重現公開教學上傳客戶的機密文件。

## 分開分析和事實查核

表格任務先要求說明欄位與預計採用的計算方式，再產生結論。總額和百分比由自己的程式計算，並檢查生成文字是否符合已驗證的數字。研究問題則要確認請求是否實際設定了支援的搜尋或來源連結功能。逐一開啟引用資料，核對日期與內容是否支持結論。連結能正常開啟並不代表引用正確，自信的語氣也不等於已查證。

## 將替代模型當作新依賴驗收

驗證身分與使用 SDK 的方式以最新官方入門文件為準，避免直接照搬過時範例。金鑰放在伺服器，先執行不含敏感資料的小型請求。用相同文件、缺頁情境、算術檢查和追問評估替代模型，記錄錯誤、格式正確性、延遲及實際用量。驗收門檻來自自己的應用需求；本文不保證免費額度、固定速度或評測優勢。保留樣例與選型紀錄，再切換正式流量。

## 官方資料

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
    de: `# Gemini 2.5 Pro: Historischer Einstieg und Migrationsprüfung

## Zuerst die Verfügbarkeit prüfen

Gemini 2.5 Pro ist abgekündigt; neue Projekte sollten nach Prüfung von Googles Abkündigungshinweisen ein verfügbares Modell wählen. Dieser Artikel dient zur Bewertung älterer Integrationen und fordert nicht dazu auf, 2.5 Pro in AI Studio auszuwählen. Notieren Sie Datum, Projekt, Modellkennung und verwendete API. Ein früher funktionierendes Beispiel belegt keinen Zugang für ein neues Konto. Halten Sie die Modellwahl konfigurierbar, damit ein Ersatz ohne Umbau der Anwendung getestet werden kann.

## Einen Dokumentvergleich vorbereiten

Verwenden Sie einen kurzen Bericht mit datierten Aussagen und einer klar beschrifteten Tabelle. Lassen Sie eine Zusammenfassung erstellen, die belegte Fakten von fehlenden Angaben trennt und für jede Schlussfolgerung einen Abschnitt nennt. Speichern Sie die Eingabe und eine selbst verfasste Referenzantwort. Entfernen Sie anschließend absichtlich eine Seite. Das System sollte die Lücke erkennen, statt fehlenden Inhalt unbemerkt zu ergänzen. Für diesen Test reichen anonymisierte Unterlagen; vertrauliche Kundendokumente sind nicht erforderlich.

## Analyse und Überprüfung trennen

Bei Tabellen soll das Modell zunächst Spalten und geplante Rechenwege erläutern. Berechnen Sie Summen und Prozentwerte selbst im Programm und vergleichen Sie die Erklärung mit diesen Ergebnissen. Prüfen Sie bei Recherchefragen, ob die Anfrage tatsächlich eine unterstützte Such- oder Quellenfunktion verwendet. Öffnen Sie zitierte Seiten und kontrollieren Sie Aussage, Datum und Zusammenhang. Ein erreichbarer Link kann trotzdem irrelevant sein. Sprachliche Sicherheit ersetzt keinen Beleg.

## Den Ersatz kontrolliert einführen

Verwenden Sie aktuelle offizielle Anleitungen für Authentifizierung und SDK, keine veraltete Modellvorlage. Bewahren Sie Zugangsdaten serverseitig auf und beginnen Sie mit einer unkritischen Anfrage. Testen Sie denselben Bericht, fehlende Seiten, Berechnungen und Rückfragen mit dem Ersatzmodell. Erfassen Sie Fehler, Ausgabeformat, Laufzeit und tatsächlichen Verbrauch. Legen Sie eigene Abnahmekriterien fest; kostenlose Kontingente oder feste Antwortzeiten werden hier nicht zugesichert. Bewahren Sie Testfälle und Auswahlbegründung auf, bevor Produktionsverkehr umgestellt wird.

## Offizielle Quellen

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
    es: `# Gemini 2.5 Pro: guía histórica y revisión de migración

## Comprobar la disponibilidad primero

Gemini 2.5 Pro está obsoleto; los proyectos nuevos deben consultar el aviso de retirada de Google y elegir un modelo disponible. Esta página explica cómo evaluar una integración antigua, no cómo seleccionar 2.5 Pro en AI Studio. Registra la fecha, el proyecto, el identificador del modelo y la API utilizada. Un ejemplo que funcionó antes no demuestra acceso para una cuenta nueva. Mantén la selección del modelo en la configuración para probar sustitutos sin rehacer la aplicación.

## Crear una referencia documental

Elige un informe breve con afirmaciones fechadas y una tabla bien rotulada. Pide un resumen que separe hechos proporcionados de información ausente y señale la sección que respalda cada conclusión. Guarda la entrada y escribe una respuesta de referencia. Después elimina una página deliberadamente y repite la tarea. El sistema debería reconocer la ausencia en lugar de inventar el contenido. Utiliza documentos anonimizados; no hace falta subir material confidencial para reproducir un tutorial público.

## Separar análisis y comprobación

Para una hoja de cálculo, solicita primero la definición de columnas y el cálculo propuesto. Calcula totales y porcentajes con tu propio código y contrasta la explicación con esos resultados. En preguntas de investigación, confirma que la solicitud utiliza realmente una función de búsqueda o fundamentación admitida. Abre las páginas citadas y revisa fecha, contenido y relación con la afirmación. Un enlace accesible puede ser irrelevante; un tono convincente tampoco constituye una verificación.

## Evaluar el sustituto

Sigue las instrucciones oficiales actuales para autenticación y SDK, evitando copiar ejemplos obsoletos. Guarda las credenciales en el servidor y prueba una solicitud sin datos sensibles. Evalúa el nuevo modelo con el mismo documento, la página omitida, las operaciones y las preguntas de seguimiento. Registra errores, formato, latencia y consumo real. Establece criterios propios: aquí no se prometen cuotas gratuitas, tiempos fijos ni superioridad en benchmarks. Conserva los casos y documenta la elección antes de cambiar el tráfico de producción.

## Fuentes oficiales

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
    fr: `# Gemini 2.5 Pro : guide historique et vérifications de migration

## Vérifier d’abord la disponibilité

Gemini 2.5 Pro est déprécié ; un nouveau projet doit consulter l’avis de Google et choisir un modèle disponible. Cette page sert à évaluer une ancienne intégration, pas à sélectionner 2.5 Pro dans AI Studio. Notez la date, le projet, l’identifiant du modèle et l’API utilisée. Un exemple autrefois fonctionnel ne prouve pas l’accès pour un nouveau compte. Gardez le modèle dans la configuration afin de tester un remplacement sans réécrire l’application.

## Construire une référence documentaire

Choisissez un rapport court contenant des affirmations datées et un tableau clairement légendé. Demandez un résumé séparant les faits fournis des informations manquantes et indiquant la section qui soutient chaque conclusion. Conservez l’entrée et rédigez une réponse de référence. Retirez ensuite volontairement une page. Le système devrait signaler le manque plutôt que reconstruire silencieusement le contenu. Des documents anonymisés suffisent ; inutile de transmettre des fichiers confidentiels pour reproduire un tutoriel public.

## Distinguer analyse et vérification

Pour un tableur, demandez d’abord la définition des colonnes et la méthode de calcul envisagée. Calculez totaux et pourcentages dans votre propre code, puis comparez l’explication aux valeurs vérifiées. Pour une recherche, contrôlez que la requête utilise réellement une fonction de recherche ou d’ancrage prise en charge. Ouvrez les pages citées et vérifiez leur date et leur rapport avec l’affirmation. Un lien accessible peut être sans pertinence ; un ton assuré ne constitue pas une preuve.

## Tester le remplacement

Suivez les instructions officielles actuelles pour l’authentification et le SDK plutôt qu’un ancien exemple de modèle. Gardez les identifiants côté serveur et commencez par une requête non sensible. Réutilisez le document, la page manquante, les calculs et les relances pour évaluer le candidat. Mesurez erreurs, validité du format, latence et consommation réelle. Définissez vos critères : ce guide ne garantit ni quota gratuit, ni délai fixe, ni supériorité mesurée. Conservez les cas et la justification du choix avant de basculer la production.

## Sources officielles

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
    jp: `# Gemini 2.5 Pro の旧ガイドと移行時の確認事項

## 古い手順より先に利用可否を確認する

Gemini 2.5 Pro は非推奨となっているため、新規プロジェクトは Google の廃止案内を確認し、利用可能なモデルを選んでください。本稿は既存連携を評価するためのガイドであり、AI Studio で 2.5 Pro を選ぶ手順ではありません。確認日、プロジェクト、モデル ID、使用 API を記録します。過去に動いた例が、新しいアカウントでの利用を保証するわけではありません。モデルは設定で切り替えられるようにします。

## 文書による比較基準を作る

日付のある記述と明確な見出し付きの表を含む、短い報告書を用意します。要約では、本文にある事実と不足情報を分け、結論ごとに根拠となる節を示すよう依頼してください。入力と人が作成した参照回答を保存します。次に一ページを意図的に除いて同じ課題を実行します。不足を説明できるか、勝手に内容を補わないかが確認点です。公開チュートリアルの再現に顧客の機密文書を使う必要はありません。

## 分析と検証を別の作業にする

表計算では、まず列の意味と計算方法を説明させ、その後で結論を求めます。合計や割合は自分のコードで計算し、生成された説明と照合してください。調査の質問では、実際のリクエストで対応する検索や根拠付け機能を利用しているか確認します。引用先を開き、日付と記載内容が主張を支持するか調べます。開ける URL でも無関係な場合があり、自信のある文体も検証の証拠にはなりません。

## 代替モデルを新しい依存先として評価する

認証と SDK の使い方は現行の公式ガイドに従い、古いモデル例をそのまま流用しないでください。鍵をサーバーに保管し、機密性のない小さなリクエストから始めます。同じ文書、欠落ページ、計算結果、追加質問で候補を比較し、エラー、形式、遅延、実際の使用量を記録します。無料枠や固定応答時間を前提にせず、自分のサービスで合格条件を決めます。判断理由と検証データを残してから本番を切り替えます。

## 公式資料

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
    pt: `# Gemini 2.5 Pro: guia histórico e revisão de migração

## Conferir primeiro a disponibilidade

O Gemini 2.5 Pro foi descontinuado para suporte; novos projetos devem consultar o aviso de depreciação do Google e escolher um modelo disponível. Esta página orienta a avaliação de integrações antigas, não a seleção do 2.5 Pro no AI Studio. Registre data, projeto, identificador do modelo e API utilizada. Um exemplo que funcionava antes não comprova acesso para uma conta nova. Mantenha o modelo na configuração para testar alternativas sem reescrever a aplicação.

## Preparar uma referência documental

Escolha um relatório curto com afirmações datadas e uma tabela bem identificada. Peça um resumo que separe fatos fornecidos de informações ausentes e indique a seção que sustenta cada conclusão. Salve a entrada e escreva uma resposta de referência. Depois remova uma página deliberadamente e repita a tarefa. O sistema deve reconhecer a lacuna, sem reconstruir silenciosamente o conteúdo. Documentos anonimizados bastam; não é necessário enviar arquivos confidenciais para reproduzir um tutorial público.

## Separar análise de verificação

Para uma planilha, solicite primeiro as definições das colunas e o cálculo proposto. Calcule totais e porcentagens no seu código e compare a explicação com esses valores. Em pesquisas, confira se a solicitação realmente utiliza um recurso de busca ou fundamentação compatível. Abra as páginas citadas e verifique data, conteúdo e relação com a afirmação. Um link acessível ainda pode ser irrelevante, e linguagem confiante não substitui evidência.

## Testar o substituto

Use as instruções oficiais atuais para autenticação e SDK, evitando copiar exemplos antigos de modelo. Guarde credenciais no servidor e comece com uma solicitação sem dados sensíveis. Avalie o candidato com o mesmo documento, a página ausente, os cálculos e as perguntas complementares. Registre erros, formato, latência e consumo real. Defina critérios próprios: este guia não promete cota gratuita, tempo fixo ou superioridade em testes. Preserve os casos e a justificativa da escolha antes de mudar o tráfego de produção.

## Fontes oficiais

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
    ru: `# Gemini 2.5 Pro: историческое руководство и проверка миграции

## Сначала проверьте доступность

Gemini 2.5 Pro объявлен устаревшим; для нового проекта следует проверить уведомление Google и выбрать доступную модель. Эта страница помогает оценить прежнюю интеграцию, а не предлагает выбрать 2.5 Pro в AI Studio. Запишите дату проверки, проект, идентификатор модели и используемый API. Ранее работавший пример не подтверждает доступ для нового аккаунта. Храните выбор модели в конфигурации, чтобы проверка замены не требовала переписывать приложение.

## Подготовьте документ для сравнения

Возьмите короткий отчёт с датированными утверждениями и ясно подписанной таблицей. Попросите составить резюме, отделяющее приведённые факты от отсутствующей информации, и указать раздел для каждого вывода. Сохраните входные данные и вручную подготовленный эталонный ответ. Затем намеренно удалите одну страницу и повторите задание. Система должна обозначить пробел, а не незаметно восстановить отсутствующий текст. Для такой проверки достаточно обезличенных материалов; загружать конфиденциальные документы клиентов ради публичного урока не нужно.

## Отделите анализ от проверки

Для таблицы сначала запросите описание столбцов и предлагаемый способ расчёта. Самостоятельно вычислите суммы и проценты в коде, затем сопоставьте объяснение с проверенными значениями. Для исследовательского вопроса убедитесь, что запрос действительно использует поддерживаемую функцию поиска или привязки к источникам. Откройте ссылки и проверьте дату, содержание и связь с утверждением. Доступная страница может оказаться нерелевантной, а уверенная формулировка не доказывает проверку фактов.

## Испытайте замену отдельно

Используйте актуальные официальные инструкции по авторизации и SDK вместо устаревшего примера модели. Храните ключи на сервере и начните с запроса без чувствительных данных. Сравните замену на том же документе, пропущенной странице, арифметических задачах и уточняющих вопросах. Записывайте ошибки, корректность формата, задержку и фактическое потребление. Критерии должны соответствовать вашему приложению: бесплатная квота, фиксированное время ответа и превосходство в тестах здесь не обещаются. Сохраните примеры и обоснование выбора перед переключением рабочего трафика, чтобы последующие изменения оценивались по воспроизводимой базе.

## Официальные источники

- [Google — Gemini deprecations](https://aistudio.google.com/docs/deprecations)
- [Google — Getting started](https://aistudio.google.com/docs/get-started)
`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-02-23',
  updatedAt: '2026-11-15',
  category: 'General User',
  tags: [
    'Gemini 2.5 Pro',
    'Beginner Guide',
    'AI Assistant',
    'Gemini 2.5 Pro tutorial step by step',
    'Gemini 2.5 Pro prompt guide best practices 2026',
    'Gemini 2.5 Pro vs ChatGPT for beginners',
  ],
};

export default postGemini25ProGettingStartedGuide;
