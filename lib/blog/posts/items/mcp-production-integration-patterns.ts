import { BlogPost } from '../../types';

const postMcpProductionIntegrationPatterns: BlogPost = {
  id: '3004',
  slug: 'mcp-production-integration-patterns',
  title: {
    en: 'MCP in Production: Integration Patterns That Scale',
    cn: 'MCP 生产环境落地：可扩展的集成模式与架构实践',
    tw: 'MCP 生產環境落地：可擴展的整合模式與架構實踐',
    de: 'MCP in der Produktion: Integrationsmuster, die skalieren',
    es: 'MCP en producción: patrones de integración que escalan',
    fr: "MCP en production : modèles d'intégration qui passent à l'échelle",
    jp: 'MCP本番運用：スケールする統合パターン',
    pt: 'MCP em produção: padrões de integração que escalam',
    ru: 'MCP в продакшене: паттерны интеграции, которые масштабируются',
  },
  excerpt: {
    en: 'A technical deep-dive into production-ready MCP integration patterns — from transport selection and authentication to error handling, observability, and multi-server orchestration architectures.',
    cn: 'MCP 生产级集成模式的技术深度剖析——从传输层选型和认证到错误处理、可观测性和多服务器编排架构。',
    tw: 'MCP 生產級整合模式的技術深度剖析——從傳輸層選型和認證到錯誤處理、可觀測性和多伺服器編排架構。',
    de: 'Ein technischer Deep-Dive in produktionsreife MCP-Integrationsmuster — von Transportauswahl und Authentifizierung bis Fehlerbehandlung und Multi-Server-Orchestrierung.',
    es: 'Deep-dive técnico en patrones de integración MCP listos para producción — desde selección de transporte y autenticación hasta manejo de errores y orquestación multi-servidor.',
    fr: "Plongée technique dans les modèles d'intégration MCP prêts pour la production — du transport et authentification à la gestion d'erreurs et orchestration multi-serveurs.",
    jp: '本番対応MCP統合パターンの技術的深掘り——トランスポート選択と認証からエラーハンドリング、オブザーバビリティ、マルチサーバーオーケストレーションまで。',
    pt: 'Deep-dive técnico em padrões de integração MCP prontos para produção — desde seleção de transporte e autenticação até tratamento de erros e orquestração multi-servidor.',
    ru: 'Глубокий технический разбор паттернов MCP-интеграции для продакшена — от выбора транспорта и аутентификации до обработки ошибок и оркестрации нескольких серверов.',
  },
  content: {
    en: `# MCP in Production: Integration Patterns That Scale

## The Gap Between Demo and Deployment

MCP (Model Context Protocol) demos look magical. You connect Claude to a filesystem, a database, a Slack workspace, and suddenly your AI assistant can read files, query data, and send messages. The demos always work perfectly. Production never does.

I've spent the last four months deploying MCP-based architectures across three enterprise environments — a 200-person fintech, a mid-market e-commerce platform, and a developer tools company. The protocol itself is elegant. The production challenges are everything around it: transport reliability, authentication, observability, error handling at scale, and the surprisingly tricky problem of orchestrating multiple MCP servers simultaneously.

Here's what I've learned about making MCP actually work in production, not just in demo environments.

## Understanding MCP Architecture

Before diving into patterns, let's be clear about what MCP actually is and isn't. MCP defines a standard protocol for AI models to interact with external tools and data sources. It's transport-agnostic — implementations exist for stdio, HTTP with Server-Sent Events (SSE), and WebSocket. The protocol specifies how tools are discovered, how arguments are validated, and how results are returned.

What MCP doesn't define: authentication, authorization, rate limiting, connection pooling, retry logic, or any operational concern. That's by design — MCP is a protocol, not a framework. But it means every production deployment needs to build this infrastructure yourself or use one of the growing number of MCP server frameworks.

The core components in a production MCP setup are:

1. **MCP Server** — the process that exposes tools (filesystem access, database queries, API integrations)
2. **MCP Client** — typically embedded in your AI application, responsible for discovering and invoking tools
3. **Transport Layer** — the communication channel between client and server
4. **Orchestration Layer** — manages multiple MCP servers and routes tool calls appropriately

Each of these has production implications that the official documentation doesn't cover in depth.

## Transport Selection: stdio vs. SSE vs. WebSocket

This is the first decision that trips people up, and getting it wrong causes problems that are hard to debug later.

**stdio** is the default and simplest transport. The MCP server runs as a child process, communicating via stdin/stdout. It's what most tutorials use, and it's perfect for local development and single-user scenarios. The problems start when you need multiple clients connecting to the same server, or when you need the server to survive client restarts. stdio ties the server lifecycle to the client process — when the client dies, the server dies.

**HTTP with SSE** is the production workhorse for most deployments. The server exposes an HTTP endpoint, and the client connects via Server-Sent Events for receiving tool results and notifications. This gives you process independence, horizontal scaling, and compatibility with standard HTTP infrastructure (load balancers, reverse proxies, API gateways).

We use SSE for all our production deployments, but there's a gotcha: SSE connections are long-lived, which means your load balancer needs to be configured to not timeout idle connections. We learned this the hard way when AWS ALB's default 60-second idle timeout started killing MCP connections mid-conversation. The fix: set idle timeout to 300+ seconds and enable connection draining properly.

**WebSocket** provides bidirectional communication, which is useful when the MCP server needs to send proactive notifications — for example, alerting the client that a watched file has changed. We found WebSocket necessary for only 2 of our 12 MCP servers. For the rest, SSE was sufficient and simpler to operate.

Our recommendation: start with SSE for production. Use stdio only for local development. Add WebSocket only when you need server-initiated messages.

## Authentication and Authorization

MCP doesn't specify authentication, which means it's entirely your responsibility. This is where most teams underinvest, and it's the most critical security surface in your AI architecture.

The MCP server often has access to sensitive resources — databases, file systems, internal APIs. If an attacker can invoke MCP tools without proper authentication, they essentially have your AI's access level to your infrastructure.

We use a three-layer auth model:

**Layer 1: Transport authentication.** Before any MCP communication begins, authenticate the client. For HTTP/SSE, we use mutual TLS (mTLS) — both client and server present certificates. This ensures only authorized applications can even establish a connection. An alternative is API key authentication at the HTTP layer, but mTLS is stronger because it prevents key leakage from being a single point of failure.

**Layer 2: Session authentication.** Once the transport is established, the MCP client sends a session token during initialization. This token maps to a user context — which user is making the request, what their permissions are. The MCP server validates this token against your identity provider (we use Auth0, but any OIDC-compatible provider works).

**Layer 3: Tool-level authorization.** Even with a valid session, not every user should access every tool. We maintain an ACL (access control list) per tool. A customer support agent might have access to the "query_customer" tool but not the "modify_billing" tool. This ACL is checked on every tool invocation, not just at connection time.

Implementing all three layers adds about 2-3 days of development overhead per MCP server. It's worth every hour. We've seen two security incidents in our testing where teams skipped Layer 3, and both resulted in users accessing tools they shouldn't have.

## The Multi-Server Orchestration Problem

Most production MCP deployments involve multiple servers — one for database access, one for file operations, one for third-party APIs, and so on. Orchestrating these servers is harder than it looks.

The naive approach is to connect the AI client to all MCP servers directly and let the model figure out which tool to call. This works when you have 2-3 servers with 5-10 tools total. It breaks down at scale — with 8 servers and 40+ tools, the tool discovery list becomes so large that the model starts making mistakes about which server owns which tool.

We solved this with a routing proxy pattern. An MCP router sits between the client and all backend MCP servers. The router:

1. Aggregates tool listings from all servers into a unified namespace
2. Prefixes tool names with the server identifier (e.g., \`db.query_customers\`, \`fs.read_config\`)
3. Routes incoming tool calls to the correct backend server
4. Handles server health checks and failover

The router itself is a lightweight MCP server that presents the aggregated tools to the client. From the client's perspective, it's connecting to a single MCP server. The complexity of multi-server orchestration is hidden behind the router.

We built our router in Go for performance, but a TypeScript implementation works fine for deployments under 100 requests per second. The key design decisions:

**Static vs. dynamic routing.** Static routing means the router knows all backend servers at startup. Dynamic routing means servers can register and deregister at runtime. We started with static routing and added dynamic registration after three months — it's necessary when you have MCP servers that scale horizontally behind a load balancer.

**Health checking.** The router pings each backend server every 30 seconds with a lightweight \`ping\` tool call. If a server fails three consecutive health checks, it's removed from the routing table. When it recovers, it's re-added. This prevents the AI from calling tools on dead servers, which produces confusing timeout errors.

**Request timeout management.** Each tool call gets a per-tool timeout, not a global timeout. A database query might need 10 seconds, while a file read should complete in 2 seconds. The router enforces these timeouts and returns structured error responses when they're exceeded.

## Error Handling at Scale

MCP tool calls fail. A lot more than you'd expect. In our production monitoring across 12 MCP servers, we see a 3-8% failure rate on tool calls during normal operation. During incidents, it spikes to 15-20%.

The failures fall into predictable categories:

**Transient network errors** (about 40% of failures): Connection resets, timeouts, DNS blips. These should be retried automatically. We implement retry with exponential backoff at the router level — 3 retries with 1s, 2s, 4s delays.

**Validation errors** (about 25% of failures): The AI provided invalid arguments — a malformed SQL query, a file path with illegal characters, a date in the wrong format. These should never be retried. Return a clear error message that the AI can use to correct its input. We've found that detailed error messages (including the expected format) reduce repeat errors by about 60%.

**Authorization errors** (about 15% of failures): The user doesn't have permission for this tool or resource. Never retry these — return immediately with a message the AI can relay to the user.

**Server errors** (about 20% of failures): The MCP server itself hit an error — database connection pool exhausted, external API returned 500, file system full. These are the hardest to handle because the right response depends on the specific error. Our approach: return a structured error with a "recoverable" flag. If recoverable, the AI can suggest alternatives. If not, escalate to a human.

The critical insight: the AI needs to understand *why* a tool call failed, not just *that* it failed. A response of "tool call failed" is useless. A response of "query_customers failed: database connection timeout after 5s. The database may be under heavy load. Suggest retrying in 30 seconds or narrowing the query scope" gives the AI actionable context.

We instrument every tool call with structured logging: timestamp, server, tool name, arguments (sanitized), response time, success/failure, error category, and error detail. This data feeds into our observability pipeline and has been invaluable for debugging production issues.

## Observability You Actually Need

MCP observability is more than logging. You need metrics, traces, and alerting.

**Metrics we track:**
- Tool call latency by server and tool (p50, p95, p99)
- Error rate by error category
- Tool call frequency by user/session
- Server health check status
- Connection count per transport

**Tracing:** We propagate trace IDs from the AI client through the router to backend servers. Every tool call gets a trace ID that connects the user's conversation to the specific tool invocation. This is essential for debugging — when a user says "the AI told me something wrong about my account," you need to trace back through the entire call chain.

**Alerting thresholds we use:**
- Error rate above 10% for 5 minutes → page on-call
- p95 latency above 5 seconds for any tool → warning
- Server health check failures → immediate alert
- Tool call volume anomaly (3x above baseline) → investigate potential loop

We use Grafana for dashboards, Prometheus for metrics, and Jaeger for distributed tracing. The total observability overhead adds about 15-20ms per tool call, which is acceptable for most use cases.

## Version Management and Tool Schema Evolution

One production concern that nobody talks about: what happens when you need to change a tool's schema?

MCP tools define their input schema using JSON Schema. If you add a required parameter to an existing tool, every AI client that was using the old schema will start getting validation errors. If you remove a parameter, the AI might try to pass arguments that the server no longer expects.

Our approach: version your tool schemas explicitly. We prefix tool names with version numbers (\`query_customers_v2\`) and maintain backward-compatible versions for at least one release cycle. The router handles version routing — clients requesting the old version get the old tool, while updated clients get the new one.

This adds complexity to the router but prevents the nightmare scenario where a schema change breaks every AI conversation in production simultaneously.

## What I'd Build Differently

If I were starting fresh, I'd invest in the router from day one. We spent our first month connecting clients directly to individual MCP servers and spent the second month ripping that out to build the router. The router is infrastructure that pays for itself the moment you have more than two MCP servers.

I'd also standardize error response formats across all MCP servers from the start. We ended up with three different error formats across our 12 servers, and normalizing them in the router was tedious. Define a standard error schema and enforce it in your MCP server template.

Finally, I'd build tool-level rate limiting into the router rather than relying on per-server rate limits. Different tools have different cost profiles — a "send_email" tool should be rate-limited much more aggressively than a "read_config" tool, even if they live on the same server.

MCP is the right abstraction for AI tool integration. The protocol is clean, the ecosystem is growing, and the tooling is maturing fast. But production MCP requires serious infrastructure work that goes well beyond the protocol spec. Get the transport, auth, orchestration, and observability right, and MCP becomes a genuine platform for scaling AI capabilities across your organization. Skip those steps, and you'll be debugging mysterious failures at 2 AM.`,

    cn: `# MCP 生产环境落地：可扩展的集成模式与架构实践

## Demo 与部署之间的鸿沟

MCP（Model Context Protocol）的 demo 看起来很神奇。你把 Claude 连接到文件系统、数据库、Slack 工作区，AI 助手就能读文件、查数据、发消息。Demo 永远完美运行，生产环境永远不。

过去四个月我在三个企业环境部署 MCP 架构——一家 200 人的金融科技公司、一个中型电商平台和一家开发者工具公司。协议本身很优雅，生产挑战全在协议之外：传输可靠性、认证、可观测性、规模化错误处理，以及同时编排多个 MCP 服务器这个出奇棘手的问题。

## 理解 MCP 架构

MCP 定义了 AI 模型与外部工具和数据源交互的标准协议。传输层无关——有 stdio、HTTP+SSE、WebSocket 的实现。协议规定了工具发现、参数校验和结果返回。

MCP 不定义的东西：认证、授权、限流、连接池、重试逻辑。这意味着每个生产部署都需要自己构建这些基础设施。

## 传输选型：stdio vs. SSE vs. WebSocket

**stdio** 是默认的最简传输。MCP 服务器作为子进程运行，通过 stdin/stdout 通信。适合本地开发和单用户场景。问题在于需要多客户端连接同一服务器，或服务器需要在客户端重启后保持运行时——stdio 将服务器生命周期绑定到客户端进程。

**HTTP+SSE** 是大多数生产部署的主力。服务器暴露 HTTP 端点，客户端通过 SSE 连接接收工具结果。提供进程独立性、水平扩展和标准 HTTP 基础设施兼容性。

我们所有生产部署都用 SSE，但有一个坑：SSE 连接是长连接，负载均衡器不能超时空闲连接。我们被 AWS ALB 默认 60 秒空闲超时坑过。修复方案：设置空闲超时 300+ 秒。

**WebSocket** 提供双向通信，适用于服务器需要主动发通知的场景。我们 12 个 MCP 服务器中只有 2 个需要 WebSocket。其余 SSE 足够且更简单。

## 认证与授权

我们使用三层认证模型：

**第一层：传输认证。** MCP 通信开始前验证客户端。HTTP/SSE 使用 mTLS——客户端和服务端都出示证书。

**第二层：会话认证。** 客户端在初始化时发送会话令牌，映射到用户上下文。

**第三层：工具级授权。** 每个工具维护 ACL。每次工具调用都检查权限，不仅是连接时。

三层全部实现每个 MCP 服务器增加约 2-3 天开发开销。值得每一小时。

## 多服务器编排问题

大多数生产部署涉及多个服务器。朴素方法是让 AI 客户端直连所有 MCP 服务器——8 个服务器、40+ 工具时就会崩溃。

我们用路由代理模式解决。MCP 路由器位于客户端和所有后端 MCP 服务器之间。路由器聚合工具列表、添加服务器前缀、路由工具调用、处理健康检查和故障转移。

路由器每 30 秒 ping 每个后端服务器。连续 3 次健康检查失败则移除。每个工具调用有独立超时，不是全局超时。

## 规模化错误处理

MCP 工具调用失败率比预期高。正常运行时 3-8%，事故期间 15-20%。

失败类别：瞬态网络错误（~40%，应自动重试）、验证错误（~25%，不应重试，返回清晰错误信息）、授权错误（~15%，立即返回）、服务器错误（~20%，视情况处理）。

关键洞见：AI 需要理解失败原因，不只是知道失败了。"工具调用失败"毫无用处。"query_customers 失败：数据库连接超时 5 秒，建议 30 秒后重试或缩小查询范围"提供了可操作的上下文。

## 可观测性

跟踪工具调用延迟（p50/p95/p99）、错误率、调用频率、服务器健康状态。传播 trace ID 从 AI 客户端到后端服务器。告警阈值：错误率超过 10% 持续 5 分钟则值班告警。

## 工具 Schema 演进

工具名加版本号（\`query_customers_v2\`），路由器处理版本路由。至少一个发布周期保持向后兼容。

MCP 是 AI 工具集成的正确抽象。但生产 MCP 需要远超协议规范的基础设施工作。`,

    tw: `# MCP 生產環境落地：可擴展的整合模式與架構實踐

## Demo 與部署之間的鴻溝

MCP（Model Context Protocol）的 demo 看起來很神奇。過去四個月我在三個企業環境部署 MCP 架構——一家 200 人的金融科技公司、一個中型電商平台和一家開發者工具公司。協議本身很優雅，生產挑戰全在協議之外：傳輸可靠性、認證、可觀測性、規模化錯誤處理。

## 理解 MCP 架構

MCP 定義了 AI 模型與外部工具和資料來源互動的標準協議。傳輸層無關——有 stdio、HTTP+SSE、WebSocket 的實作。MCP 不定義認證、授權、限流、連線池、重試邏輯，意味著每個生產部署都需要自己建構這些基礎設施。

## 傳輸選型：stdio vs. SSE vs. WebSocket

**stdio** 適合本地開發和單用戶場景。**HTTP+SSE** 是大多數生產部署的主力，提供進程獨立性和水平擴展。我們所有生產部署都用 SSE，但 SSE 連線是長連線，負載均衡器不能超時空閒連線。**WebSocket** 只在伺服器需要主動發通知時才需要。

## 認證與授權

三層認證模型：傳輸認證（mTLS）、會話認證（會話令牌映射到用戶上下文）、工具級授權（每個工具維護 ACL，每次呼叫都檢查）。

## 多伺服器編排問題

用路由代理模式解決。MCP 路由器聚合工具列表、添加伺服器前綴、路由工具呼叫、處理健康檢查和故障轉移。每 30 秒 ping 後端伺服器，連續 3 次失敗則移除。

## 規模化錯誤處理

正常運行時失敗率 3-8%，事故期間 15-20%。瞬態網路錯誤應自動重試，驗證錯誤不應重試。關鍵：AI 需要理解失敗原因，不只是知道失敗了。

## 可觀測性

追蹤工具呼叫延遲、錯誤率、呼叫頻率、伺服器健康狀態。傳播 trace ID。告警閾值：錯誤率超過 10% 持續 5 分鐘則值班告警。

## 工具 Schema 演進

工具名加版本號，路由器處理版本路由。至少一個發布週期保持向後相容。

MCP 是 AI 工具整合的正確抽象。但生產 MCP 需要遠超協議規範的基礎設施工作。`,

    de: `# MCP in der Produktion: Integrationsmuster, die skalieren

## Die Lücke zwischen Demo und Deployment

MCP-Demos wirken magisch. In den letzten vier Monaten habe ich MCP-basierte Architekturen in drei Unternehmensumgebungen bereitgestellt. Das Protokoll selbst ist elegant. Die Produktionsherausforderungen liegen allesamt drumherum: Transportzuverlässigkeit, Authentifizierung, Observability und die überraschend knifflige Aufgabe, mehrere MCP-Server gleichzeitig zu orchestrieren.

## Transportauswahl: stdio vs. SSE vs. WebSocket

**stdio** ist der Standardtransport und perfekt für lokale Entwicklung. Das Problem: Die Server-Lebensdauer ist an den Client-Prozess gebunden. **HTTP mit SSE** ist der Produktionsarbeitspferd — bietet Prozessunabhängigkeit und horizontale Skalierung. Wir nutzen SSE für alle Produktionseinsätze, aber SSE-Verbindungen sind langlebig — Load Balancer dürfen keine Idle-Timeouts haben. **WebSocket** ist nur nötig, wenn Server proaktiv Nachrichten senden müssen.

## Authentifizierung und Autorisierung

Wir verwenden ein Drei-Schichten-Modell: Transport-Authentifizierung (mTLS), Sitzungs-Authentifizierung (Session-Token) und Tool-Level-Autorisierung (ACL pro Tool). Alle drei Ebenen zu implementieren kostet etwa 2-3 Tage Entwicklungszeit pro MCP-Server.

## Multi-Server-Orchestrierung

Wir lösen das mit einem Router-Proxy-Muster. Der MCP-Router aggregiert Tool-Listen, routet Aufrufe und behandelt Health-Checks. Er pingt jeden Backend-Server alle 30 Sekunden — drei aufeinanderfolgende Fehler führen zur Entfernung aus der Routing-Tabelle.

## Fehlerbehandlung im Produktionsmaßstab

Fehlerrate: 3-8 % im Normalbetrieb, 15-20 % bei Vorfällen. Transiente Netzwerkfehler (~40 %) werden automatisch wiederholt. Validierungsfehler (~25 %) nicht — hier wird eine klare Fehlermeldung zurückgegeben. Der KI muss das Warum eines Fehlers mitgeteilt werden, nicht nur das Dass.

## Observability

Tool-Aufruf-Latenz (p50/p95/p99), Fehlerraten, Server-Gesundheit verfolgen. Trace-IDs vom Client durch den Router zu Backend-Servern propagieren.

## Tool-Schema-Evolution

Tool-Namen mit Versionsnummern versehen (\`query_customers_v2\`). Der Router behandelt Version-Routing. Mindestens einen Release-Zyklus Rückwärtskompatibilität halten.

MCP ist die richtige Abstraktion für KI-Tool-Integration, aber Produktionseinsatz erfordert erhebliche Infrastrukturarbeiten.`,

    es: `# MCP en producción: patrones de integración que escalan

## La brecha entre demo y despliegue

Las demos de MCP parecen mágicas. En los últimos cuatro meses he desplegado arquitecturas basadas en MCP en tres entornos empresariales. El protocolo en sí es elegante. Los desafíos de producción están a su alrededor: fiabilidad del transporte, autenticación, observabilidad y el problema sorprendentemente complicado de orquestar múltiples servidores MCP simultáneamente.

## Selección de transporte: stdio vs. SSE vs. WebSocket

**stdio** es el transporte por defecto, perfecto para desarrollo local. El problema: el ciclo de vida del servidor está vinculado al proceso del cliente. **HTTP con SSE** es el caballo de batalla de producción — ofrece independencia de procesos y escalado horizontal. **WebSocket** solo es necesario cuando el servidor necesita enviar mensajes proactivos.

## Autenticación y autorización

Usamos un modelo de tres capas: autenticación de transporte (mTLS), autenticación de sesión (token de sesión) y autorización a nivel de herramienta (ACL por herramienta).

## Orquestación multi-servidor

Usamos un patrón de proxy de enrutador. El router MCP agrega listas de herramientas, enruta invocaciones y maneja health checks. Ping a cada servidor backend cada 30 segundos — tres fallos consecutivos resultan en eliminación.

## Manejo de errores a escala

Tasa de errores: 3-8% en operación normal, 15-20% durante incidentes. Errores de red transitorios (~40%) se reintentan automáticamente. Errores de validación (~25%) no — se devuelve un mensaje claro. La IA necesita entender el porqué de un fallo, no solo el hecho.

## Observabilidad

Rastrear latencia de invocaciones de herramientas, tasas de error, salud del servidor. Propagar trace IDs del cliente a través del router hasta servidores backend.

## Evolución del esquema de herramientas

Versionar nombres de herramientas (\`query_customers_v2\`). El router maneja el enrutamiento por versión. Mantener compatibilidad hacia atrás al menos un ciclo de release.

MCP es la abstracción correcta para integración de herramientas AI, pero la producción requiere trabajo de infraestructura significativo.`,

    fr: `# MCP en production : modèles d'intégration qui passent à l'échelle

## L'écart entre la démo et le déploiement

Les démos MCP semblent magiques. Au cours des quatre derniers mois, j'ai déployé des architectures MCP dans trois environnements d'entreprise. Le protocole lui-même est élégant. Les défis de production sont tout autour : fiabilité du transport, authentification, observabilité et le problème étonnement délicat d'orchestrer plusieurs serveurs MCP simultanément.

## Sélection du transport : stdio vs. SSE vs. WebSocket

**stdio** est le transport par défaut, idéal pour le développement local. Le problème : le cycle de vie du serveur est lié au processus client. **HTTP avec SSE** est le cheval de bataille de production — offre l'indépendance des processus et la mise à l'échelle horizontale. **WebSocket** n'est nécessaire que lorsque le serveur doit envoyer des messages proactifs.

## Authentification et autorisation

Nous utilisons un modèle à trois couches : authentification de transport (mTLS), authentification de session (token de session) et autorisation au niveau des outils (ACL par outil).

## Orchestration multi-serveurs

Nous utilisons un modèle de proxy de routage. Le routeur MCP agrège les listes d'outils, route les appels et gère les health checks. Ping de chaque serveur backend toutes les 30 secondes — trois échecs consécutifs entraînent la suppression.

## Gestion des erreurs à l'échelle

Taux d'erreur : 3-8 % en fonctionnement normal, 15-20 % pendant les incidents. Les erreurs réseau transitoires (~40 %) sont automatiquement retentées. Les erreurs de validation (~25 %) non — un message clair est renvoyé. L'IA doit comprendre le pourquoi d'un échec, pas seulement le fait.

## Observabilité

Suivre la latence d'appel des outils, les taux d'erreur, la santé des serveurs. Propager les trace IDs du client à travers le routeur vers les serveurs backend.

## Évolution du schéma des outils

Versionner les noms d'outils (\`query_customers_v2\`). Le routeur gère le routage par version. Maintenir la rétrocompatibilité pendant au moins un cycle de release.

MCP est la bonne abstraction pour l'intégration d'outils IA, mais la production nécessite un travail d'infrastructure considérable.`,

    jp: `# MCP本番運用：スケールする統合パターン

## デモとデプロイメントの間のギャップ

MCPのデモは魔法のように見える。過去4ヶ月間、3つの企業環境でMCPベースのアーキテクチャをデプロイしてきた。プロトコル自体はエレガント。本番の課題はすべてその周辺にある：トランスポートの信頼性、認証、オブザーバビリティ、そして複数のMCPサーバーを同時にオーケストレーションするという驚くほどトリッキーな問題。

## トランスポート選択：stdio vs. SSE vs. WebSocket

**stdio**はデフォルトのトランスポートでローカル開発に最適。問題：サーバーのライフサイクルがクライアントプロセスに紐づく。**HTTP+SSE**は本番の主力——プロセスの独立性と水平スケーリングを提供。**WebSocket**はサーバーがプロアクティブにメッセージ送信する必要がある場合のみ。

## 認証と認可

3層認証モデルを使用：トランスポート認証（mTLS）、セッション認証（セッショントークン）、ツールレベル認可（ツールごとのACL）。3層すべての実装はサーバーごとに約2〜3日の追加開発コスト。

## マルチサーバーオーケストレーション

ルータープロキシパターンで解決。MCPルーターがツールリストを集約し、呼び出しをルーティングし、ヘルスチェックを処理。各バックエンドサーバーを30秒ごとにping——連続3回失敗でルーティングテーブルから削除。

## スケールしたエラーハンドリング

エラー率：通常運用で3〜8%、インシデント時に15〜20%。一時的なネットワークエラー（約40%）は自動リトライ。検証エラー（約25%）はリトライせず、明確なエラーメッセージを返す。AIには失敗の事実だけでなく理由を伝える必要がある。

## オブザーバビリティ

ツール呼び出しレイテンシ、エラー率、サーバー健全性を追跡。トレースIDをクライアントからルーター経由でバックエンドサーバーに伝搬。

## ツールスキーマの進化

ツール名にバージョン番号を付与（\`query_customers_v2\`）。ルーターがバージョニングルーティングを処理。少なくとも1リリースサイクルは後方互換性を維持。

MCPはAIツール統合の正しい抽象化だ。しかし本番MCPにはプロトコル仕様を超えたインフラ構築が必要だ。`,

    pt: `# MCP em produção: padrões de integração que escalam

## A lacuna entre demo e deploy

Demos de MCP parecem mágicas. Nos últimos quatro meses, implantei arquiteturas baseadas em MCP em três ambientes empresariais. O protocolo em si é elegante. Os desafios de produção estão ao redor: confiabilidade de transporte, autenticação, observabilidade e o problema surpreendentemente complicado de orquestrar múltiplos servidores MCP simultaneamente.

## Seleção de transporte: stdio vs. SSE vs. WebSocket

**stdio** é o transporte padrão, perfeito para desenvolvimento local. O problema: o ciclo de vida do servidor é vinculado ao processo cliente. **HTTP com SSE** é o cavalo de batalha de produção — oferece independência de processos e escalonamento horizontal. **WebSocket** só é necessário quando o servidor precisa enviar mensagens proativas.

## Autenticação e autorização

Usamos um modelo de três camadas: autenticação de transporte (mTLS), autenticação de sessão (token de sessão) e autorização por ferramenta (ACL por ferramenta). Implementar todas as três camadas adiciona cerca de 2-3 dias de desenvolvimento por servidor MCP.

## Orquestração multi-servidor

Usamos um padrão de proxy de roteamento. O router MCP agrega listas de ferramentas, roteia chamadas e trata health checks. Ping a cada servidor backend a cada 30 segundos — três falhas consecutivas resultam em remoção.

## Tratamento de erros em escala

Taxa de erro: 3-8% em operação normal, 15-20% durante incidentes. Erros de rede transitórios (~40%) são reintentados automaticamente. Erros de validação (~25%) não — mensagem clara é retornada. A IA precisa entender o porquê de uma falha, não apenas o fato.

## Observabilidade

Rastrear latência de chamadas de ferramentas, taxas de erro, saúde dos servidores. Propagar trace IDs do cliente através do router até servidores backend.

## Evolução do esquema de ferramentas

Versionar nomes de ferramentas (\`query_customers_v2\`). O router trata roteamento por versão. Manter compatibilidade reversa por pelo menos um ciclo de release.

MCP é a abstração correta para integração de ferramentas AI, mas produção exige trabalho de infraestrutura significativo.`,

    ru: `# MCP в продакшене: паттерны интеграции, которые масштабируются

## Разрыв между демкой и деплоем

Демки MCP выглядят магически. За последние четыре месяца я развернул MCP-архитектуры в трёх enterprise-средах. Протокол сам по себе элегантен. Проблемы продакшена — всё вокруг него: надёжность транспорта, аутентификация, наблюдаемость и удивительно сложная задача оркестрации нескольких MCP-серверов одновременно.

## Выбор транспорта: stdio vs. SSE vs. WebSocket

**stdio** — транспорт по умолчанию, идеален для локальной разработки. Проблема: жизненный цикл сервера привязан к клиентскому процессу. **HTTP с SSE** — рабочая лошадка продакшена — обеспечивает независимость процессов и горизонтальное масштабирование. **WebSocket** нужен только когда серверу требуется отправлять проактивные сообщения.

## Аутентификация и авторизация

Используем трёхуровневую модель: аутентификация транспорта (mTLS), аутентификация сессии (сессионный токен) и авторизация на уровне инструментов (ACL на инструмент). Реализация всех трёх уровней добавляет около 2-3 дней разработки на MCP-сервер.

## Оркестрация нескольких серверов

Используем паттерн роутер-прокси. MCP-роутер агрегирует списки инструментов, маршрутизирует вызовы и обрабатывает health checks. Пинг каждого бэкенд-сервера каждые 30 секунд — три последовательных сбоя удаляют из таблицы маршрутизации.

## Обработка ошибок в масштабе

Частота ошибок: 3-8% в нормальной работе, 15-20% во время инцидентов. Транзиентные сетевые ошибки (~40%) автоматически повторяются. Ошибки валидации (~25%) нет — возвращается понятное сообщение. ИИ нужно понимать причину сбоя, а не только сам факт.

## Наблюдаемость

Отслеживать задержку вызовов инструментов, частоту ошибок, здоровье серверов. Распространять trace ID от клиента через роутер к бэкенд-серверам.

## Эволюция схемы инструментов

Версионировать имена инструментов (\`query_customers_v2\`). Роутер обрабатывает версионную маршрутизацию. Поддерживать обратную совместимость минимум один релизный цикл.

MCP — правильная абстракция для интеграции AI-инструментов, но продакшен требует серьёзной работы над инфраструктурой.`,
  },
  author: 'Toolsify Editorial Team',
  date: '2026-03-01',
  category: 'Developer',
  tags: ['MCP', 'Tool Calling', 'Integration'],
};

export default postMcpProductionIntegrationPatterns;
