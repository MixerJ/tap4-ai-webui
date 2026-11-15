import { BlogPost } from '../../types';

const postGpt51CodexMaxGithubCopilot: BlogPost = {
  id: '3106',
  slug: 'gpt-5-1-codex-max-github-copilot',
  title: {
    en: 'GPT-5.1 Codex Max in Copilot: Retirement and Migration',
    cn: 'Copilot 中的 GPT-5.1 Codex Max：退役与迁移',
    tw: 'Copilot 中的 GPT-5.1 Codex Max：退役與遷移',
    de: 'GPT-5.1 Codex Max in Copilot: Einstellung und Migration',
    es: 'GPT-5.1 Codex Max en Copilot: retirada y migración',
    fr: 'GPT-5.1 Codex Max dans Copilot : retrait et migration',
    jp: 'Copilot の GPT-5.1 Codex Max：提供終了と移行',
    pt: 'GPT-5.1 Codex Max no Copilot: retirada e migração',
    ru: 'GPT-5.1 Codex Max в Copilot: прекращение поддержки и переход',
  },
  excerpt: {
    en: 'GPT-5.1-Codex-Max retired from GitHub Copilot on April 1, 2026. Check supported replacements and validate your repository workflow before migrating.',
    cn: 'GPT-5.1-Codex-Max 已于 2026 年 4 月 1 日从 GitHub Copilot 退役。了解如何核对替代模型，并用自己的仓库验证迁移。',
    tw: 'GPT-5.1-Codex-Max 已於 2026 年 4 月 1 日從 GitHub Copilot 退役。核對替代模型，並以自己的儲存庫驗證遷移。',
    de: 'GPT-5.1-Codex-Max wurde am 1. April 2026 in GitHub Copilot eingestellt. So prüfen Sie Ersatzmodelle und die Migration Ihres Entwicklungsablaufs.',
    es: 'GPT-5.1-Codex-Max dejó GitHub Copilot el 1 de abril de 2026. Comprueba las alternativas y valida la migración con tareas de tu repositorio.',
    fr: 'GPT-5.1-Codex-Max a quitté GitHub Copilot le 1er avril 2026. Vérifiez les alternatives et validez la migration sur votre propre dépôt.',
    jp: 'GPT-5.1-Codex-Max は2026年4月1日に GitHub Copilot で提供終了しました。代替モデルの確認とリポジトリ単位の移行検証を解説します。',
    pt: 'O GPT-5.1-Codex-Max saiu do GitHub Copilot em 1 de abril de 2026. Confira alternativas e valide a migração com tarefas do seu repositório.',
    ru: 'GPT-5.1-Codex-Max удалён из GitHub Copilot 1 апреля 2026 года. Как проверить замену и оценить переход на задачах своего репозитория.',
  },
  content: {
    en: `## Why the model disappeared

GPT-5.1-Codex-Max is a historical Copilot option. GitHub's [retirement notice](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/) records its removal on April 1, 2026. Reinstalling an extension cannot restore a retired model. This is a Copilot availability statement, not a claim about every OpenAI product.

The notice named GPT-5.3-Codex as a replacement at that time. For a decision today, consult the [supported-model documentation](https://docs.github.com/en/copilot/reference/ai-models/supported-models) and your account's model policies. An old recommendation does not establish access for every subscription or editor.

## Migrate the workflow, not just the name

We recommend inventorying repository instructions, reusable prompts, editor settings, and internal onboarding pages that mention Codex Max. Separate an explicit model selection from a general request for coding assistance. Update unsupported selections and explain the change to colleagues; avoid silently rewriting historical benchmark records.

Build a small evaluation from your own repository: a reproducible bug, a change crossing two modules, and a regression-test task. Give each candidate the same starting commit, requirements, and permitted commands. Record the selected model and client version so later comparisons remain interpretable.

## What to inspect before rollout

Judge the resulting patch: does it preserve public behavior, follow local conventions, and pass relevant checks? Include review effort and unnecessary edits in your notes. A confident explanation is not evidence that a migration is correct.

Keep the previous workflow instructions in version control and document a supported fallback. These are suggested evaluation practices, not results from a Toolsify benchmark. For wider context, see our [coding-assistant guide](/blog/ai-coding-assistants-review).`,
    cn: `## 为什么模型选择器里找不到了

GPT-5.1-Codex-Max 已是 Copilot 的历史选项。[GitHub 退役公告](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/)明确记录了 2026 年 4 月 1 日这一日期。重装扩展不能恢复已经退役的模型。这里说明的是 Copilot 的可用性，不代表所有 OpenAI 产品都采取相同安排。

公告当时推荐 GPT-5.3-Codex。今天选型还应核对[受支持模型文档](https://docs.github.com/en/copilot/reference/ai-models/supported-models)及组织策略，不能把旧公告理解为所有订阅和编辑器都拥有相同权限。

## 迁移时要检查哪些地方

建议先盘点仓库说明、常用提示词、编辑器配置和内部入职文档中对 Codex Max 的引用。区分明确指定模型的配置与一般编码任务描述：前者需要替换，后者可能只需更新说明。历史评测记录应保留原模型名称，避免修改后失去可追溯性。

从自己的仓库挑选一个可复现缺陷、一个涉及两个模块的修改，以及一个回归测试任务。为候选模型提供相同起始提交、需求和可执行命令范围，同时记录实际模型、客户端版本与测试日期。这样才能区分模型差异和环境变化。

## 如何判断迁移是否可接受

重点审查补丁是否维持公开行为、遵循仓库约定，并通过相关检查。把人工审查耗时和不必要修改也纳入记录；模型解释得流畅，并不能证明修复正确。检查生成的测试是否真的覆盖原来的失败条件，而不是只验证新实现能够运行。

将旧工作流保留在版本管理中，记录经过验证的受支持备选方案，再向团队推广。以上是建议的验证方法，不是本站声称已经完成的性能实测。更多选型维度见[编码助手指南](/blog/ai-coding-assistants-review)。`,
    tw: `## 為什麼模型選單找不到它

GPT-5.1-Codex-Max 已是 Copilot 的歷史選項。[GitHub 退役公告](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/)記錄的日期是 2026 年 4 月 1 日。重新安裝擴充套件不能恢復已退役的模型。這裡描述的是 Copilot 可用性，並不代表所有 OpenAI 產品都有相同安排。

公告當時建議 GPT-5.3-Codex。現在選型仍應查看[支援模型文件](https://docs.github.com/en/copilot/reference/ai-models/supported-models)及組織政策，不能把舊公告視為每種訂閱和編輯器都具備相同權限的保證。

## 遷移要檢查哪些內容

建議盤點儲存庫說明、常用提示詞、編輯器設定與內部新人文件中的 Codex Max 引用。明確指定模型的設定需要替換，一般程式設計需求則可能只需更新說明。歷史評測應保留原模型名稱，讓後續讀者能追溯結果。

從自己的儲存庫選一個可重現缺陷、一個跨兩個模組的修改，以及一個迴歸測試任務。讓候選模型使用相同起始提交、需求與允許執行的命令。記錄實際模型、用戶端版本及測試日期，避免把環境差異誤認為模型進步。

## 如何判斷遷移是否合格

審查補丁是否維持對外行為、遵循專案慣例並通過相關檢查。也記錄人工審查時間與多餘修改；解釋流暢不代表修復正確。生成的測試應涵蓋原來的失敗條件，而非只確認新程式可以執行。

將舊工作流程納入版本管理，記錄已驗證的受支援備案，再擴大團隊採用。這些是建議的驗證方法，不是本站完成實測後的性能結論。更多選型面向可參考[程式設計助手指南](/blog/ai-coding-assistants-review)。`,
    de: `## Warum das Modell fehlt

GPT-5.1-Codex-Max ist eine frühere Copilot-Option. Die [GitHub-Mitteilung](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/) nennt den 1. April 2026 als Einstellungstermin. Eine Neuinstallation der Erweiterung bringt das Modell nicht zurück. Diese Aussage betrifft Copilot und darf nicht auf sämtliche OpenAI-Produkte übertragen werden.

Damals wurde GPT-5.3-Codex als Alternative genannt. Prüfen Sie für eine heutige Entscheidung die [Dokumentation unterstützter Modelle](https://docs.github.com/en/copilot/reference/ai-models/supported-models) sowie die Richtlinien Ihres Kontos. Eine ältere Empfehlung garantiert keinen Zugang mit jedem Abonnement oder Editor.

## Den Entwicklungsablauf umstellen

Unsere Empfehlung: Erfassen Sie Verweise auf Codex Max in Repository-Anweisungen, wiederverwendbaren Prompts, Editor-Einstellungen und Einführungsunterlagen. Unterscheiden Sie eine konkrete Modellauswahl von einer allgemeinen Programmieraufgabe. Ersetzen Sie nicht unterstützte Einstellungen und erklären Sie die Änderung im Team. Historische Benchmark-Aufzeichnungen sollten ihre ursprüngliche Modellbezeichnung behalten.

Wählen Sie anschließend Aufgaben aus Ihrem Repository: einen reproduzierbaren Fehler, eine Änderung über zwei Module und einen Regressionstest. Geben Sie jedem Kandidaten denselben Ausgangscommit, dieselben Anforderungen und erlaubten Befehle. Halten Sie Modellname, Client-Version und Testdatum fest, damit spätere Vergleiche nachvollziehbar bleiben.

## Die Ergebnisse beurteilen

Entscheidend ist der Patch: Bleibt das öffentliche Verhalten erhalten? Werden Projektkonventionen und relevante Prüfungen eingehalten? Erfassen Sie auch Prüfaufwand und unnötige Änderungen. Eine überzeugende Erklärung beweist keine korrekte Migration; insbesondere sollten neue Tests den ursprünglichen Fehler tatsächlich abdecken.

Bewahren Sie bisherige Anweisungen in der Versionsverwaltung auf und dokumentieren Sie eine unterstützte Ausweichlösung. Dies sind vorgeschlagene Evaluationsschritte, keine Ergebnisse eines Toolsify-Benchmarks. Weitere Auswahlkriterien finden Sie im [Leitfaden zu Programmierassistenten](/blog/ai-coding-assistants-review).`,
    es: `## Por qué desapareció el modelo

GPT-5.1-Codex-Max es una opción histórica de Copilot. El [aviso de GitHub](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/) registra su retirada el 1 de abril de 2026. Reinstalar la extensión no devuelve un modelo retirado. Esta información se refiere a Copilot, no a todos los productos de OpenAI.

El aviso recomendaba GPT-5.3-Codex en aquel momento. Para decidir ahora, consulta la [documentación de modelos compatibles](https://docs.github.com/en/copilot/reference/ai-models/supported-models) y las políticas de tu cuenta. Una recomendación antigua no garantiza acceso con cualquier suscripción o editor.

## Migrar el proceso de desarrollo

Recomendamos inventariar las referencias a Codex Max en instrucciones del repositorio, prompts reutilizables, ajustes del editor y documentación interna. Distingue una selección explícita de modelo de una petición general de programación. Actualiza las selecciones incompatibles y explica el cambio al equipo; conserva los nombres originales en registros históricos de evaluación.

Prepara una prueba con trabajo propio: un fallo reproducible, una modificación entre dos módulos y una tarea de regresión. Ofrece a cada candidato el mismo commit inicial, requisitos y comandos permitidos. Anota modelo, versión del cliente y fecha para poder interpretar las diferencias después.

## Qué revisar antes de ampliar el uso

Evalúa el parche: comportamiento público conservado, convenciones respetadas y comprobaciones pertinentes superadas. Registra también esfuerzo de revisión y cambios innecesarios. Una explicación convincente no demuestra corrección; comprueba que los tests generados detecten el fallo original.

Guarda las instrucciones anteriores en el control de versiones y documenta una alternativa compatible. Son prácticas de evaluación propuestas, no resultados de un benchmark de Toolsify. Nuestra [guía de asistentes de programación](/blog/ai-coding-assistants-review) amplía los criterios de selección.`,
    fr: `## Pourquoi le modèle a disparu

GPT-5.1-Codex-Max est une ancienne option de Copilot. L'[annonce de GitHub](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/) indique un retrait le 1er avril 2026. Réinstaller une extension ne rétablit pas un modèle retiré. Cette information concerne Copilot, pas l'ensemble des produits OpenAI.

L'annonce recommandait alors GPT-5.3-Codex. Pour choisir aujourd'hui, consultez la [documentation des modèles pris en charge](https://docs.github.com/en/copilot/reference/ai-models/supported-models) et les règles de votre compte. Une recommandation passée ne garantit pas l'accès dans chaque abonnement ou éditeur.

## Migrer le travail du dépôt

Nous conseillons de recenser les références à Codex Max dans les consignes du dépôt, les prompts réutilisables, les réglages de l'éditeur et l'accueil des nouveaux développeurs. Distinguez une sélection explicite de modèle d'une demande générale de programmation. Remplacez les réglages obsolètes et expliquez le changement, sans réécrire les noms de modèles dans les anciens résultats d'évaluation.

Construisez ensuite une évaluation propre au dépôt : un défaut reproductible, une modification traversant deux modules et un test de régression. Fournissez le même commit initial, les mêmes exigences et les mêmes commandes autorisées aux candidats. Notez modèle, version du client et date.

## Vérifier le résultat concret

Examinez le patch : préserve-t-il le comportement public, respecte-t-il les conventions et passe-t-il les contrôles pertinents ? Consignez aussi le temps de relecture et les modifications superflues. Une explication assurée ne prouve pas la correction du code.

Conservez les anciennes consignes dans le gestionnaire de versions et documentez une solution de repli prise en charge. Ce sont des recommandations d'évaluation, pas des résultats mesurés par Toolsify. Consultez aussi notre [guide des assistants de programmation](/blog/ai-coding-assistants-review).`,
    jp: `## モデル一覧から消えた理由

GPT-5.1-Codex-Max は現在の Copilot の選択肢ではありません。[GitHub の終了告知](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/)では、提供終了日が2026年4月1日とされています。拡張機能の再インストールで復活するものではありません。これは Copilot の提供状況であり、OpenAI の全製品について同じことを意味するわけではありません。

告知当時の推奨代替は GPT-5.3-Codex でした。現在の選定では[対応モデルの文書](https://docs.github.com/en/copilot/reference/ai-models/supported-models)と組織のポリシーを確認してください。過去の推奨だけでは、すべての契約やエディターで利用できるとは判断できません。

## 名前の変更だけで移行を終えない

まず、リポジトリの指示、再利用するプロンプト、エディター設定、社内の導入文書にある Codex Max の参照を洗い出すことを勧めます。明示的なモデル指定と一般的な実装依頼を区別し、無効な設定を置き換えます。過去の評価記録のモデル名は、比較の意味が変わらないよう残してください。

自分のリポジトリから、再現可能な不具合、二つのモジュールにまたがる変更、回帰テストの作成を選びます。各候補には同じ開始コミット、要件、実行可能なコマンドを渡し、モデル名、クライアントのバージョン、実施日を記録します。

## 導入判断はパッチで行う

公開動作を維持しているか、既存の規約に従っているか、関連する検証に通るかを確認します。レビュー時間や不要な変更も評価に含めてください。説明の説得力は、コードが正しい証拠にはなりません。追加されたテストが元の不具合を検出できるかも重要です。

以前の手順をバージョン管理に残し、利用可能な代替手順を用意してから展開します。ここで示したのは評価の提案であり、Toolsify が実測した性能結果ではありません。[コーディング支援の選び方](/blog/ai-coding-assistants-review)も参考になります。`,
    pt: `## Por que o modelo desapareceu

O GPT-5.1-Codex-Max é uma opção histórica do Copilot. O [aviso do GitHub](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/) registra sua retirada em 1 de abril de 2026. Reinstalar a extensão não recupera um modelo descontinuado. A informação trata do Copilot, não de todos os produtos da OpenAI.

Naquele momento, o aviso recomendou GPT-5.3-Codex. Para escolher hoje, consulte a [documentação de modelos compatíveis](https://docs.github.com/en/copilot/reference/ai-models/supported-models) e as políticas da conta. Uma recomendação antiga não garante acesso em qualquer assinatura ou editor.

## Migrar o fluxo de desenvolvimento

Recomendamos levantar referências ao Codex Max nas instruções do repositório, prompts reutilizáveis, configurações do editor e materiais de integração da equipe. Diferencie uma seleção explícita de modelo de um pedido genérico de programação. Atualize configurações sem suporte e explique a mudança; preserve os nomes originais nos registros históricos de avaliação.

Monte um pequeno conjunto de tarefas reais: um defeito reproduzível, uma alteração entre dois módulos e um teste de regressão. Forneça aos candidatos o mesmo commit inicial, requisitos e comandos permitidos. Registre o modelo escolhido, a versão do cliente e a data para tornar comparações futuras interpretáveis.

## O que verificar antes de ampliar

Avalie o patch: mantém o comportamento público, respeita as convenções e passa nas verificações relevantes? Anote também esforço de revisão e alterações desnecessárias. Uma explicação convincente não comprova correção; verifique se os testes gerados detectam o defeito original.

Guarde as instruções anteriores no controle de versões e documente uma alternativa suportada. São práticas propostas, não resultados de um benchmark da Toolsify. Veja mais critérios no [guia de assistentes de programação](/blog/ai-coding-assistants-review).`,
    ru: `## Почему модель исчезла

GPT-5.1-Codex-Max — историческая опция Copilot. В [объявлении GitHub](https://github.blog/changelog/2026-04-03-gpt-5-1-codex-gpt-5-1-codex-max-and-gpt-5-1-codex-mini-deprecated/) датой прекращения поддержки указано 1 апреля 2026 года. Переустановка расширения не вернёт удалённую модель. Речь идёт о доступности в Copilot, а не обо всех продуктах OpenAI.

Тогда GitHub рекомендовал GPT-5.3-Codex. Для выбора сегодня проверьте [документацию поддерживаемых моделей](https://docs.github.com/en/copilot/reference/ai-models/supported-models) и политики учётной записи. Старая рекомендация не гарантирует доступ при любой подписке или в любом редакторе.

## Перенесите рабочий процесс

Рекомендуем найти упоминания Codex Max в инструкциях репозитория, повторно используемых запросах, настройках редактора и материалах для новых сотрудников. Отличайте явный выбор модели от обычной просьбы написать код. Замените неподдерживаемые настройки и объясните изменения коллегам. В исторических результатах оценки сохраняйте исходное название модели.

Подготовьте задания из собственного проекта: воспроизводимую ошибку, изменение двух модулей и регрессионный тест. Каждому кандидату предоставьте одинаковый исходный коммит, требования и разрешённые команды. Запишите выбранную модель, версию клиента и дату проверки. Так изменения среды не будут ошибочно приняты за улучшение модели.

## Проверяйте результат, а не объяснение

Оцените патч: сохраняется ли публичное поведение, соблюдаются ли соглашения проекта, проходят ли необходимые проверки? Учитывайте время ревью и лишние изменения. Уверенное объяснение не доказывает правильность кода. Убедитесь, что новые тесты действительно обнаруживают исходную ошибку, а не только запускают новую реализацию.

Сохраните прежние инструкции в системе контроля версий и опишите поддерживаемый запасной вариант. Это предлагаемый способ оценки, а не результаты проведённого Toolsify бенчмарка. Дополнительные критерии есть в [обзоре помощников программиста](/blog/ai-coding-assistants-review).`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-03-27',
  updatedAt: '2026-11-15',
  category: 'AI Models',
  tags: ['GitHub Copilot', 'GPT-5.1-Codex-Max', 'Model Retirement', 'Coding Workflow Migration'],
};

export default postGpt51CodexMaxGithubCopilot;
