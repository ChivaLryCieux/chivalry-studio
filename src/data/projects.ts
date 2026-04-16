import type { ProjectData } from "@/types/project";

export const projects: ProjectData[] = [
    {
        id: 1,
        title: "Quidem",
        year: "2026",
        category: "Quant Trading Framework",
        color: "#5a171d",
        imagePlaceholder: "QD",
        src: "/images/projects/quidem/quidem-cover.svg",
        cardTitleLines: ["Quidem", "量化交易框架"],
        description: "A personal Python quant trading framework that combines Binance Futures execution, TUI monitoring, Redis-based reporting, risk control, backtesting research, and operational logs.",
        detailImages: [
            "/images/projects/quidem/kmeans_20260106_000544.png",
            "/images/projects/quidem/hmm_20260208_230739.png",
            "/images/projects/quidem/bocpd_solusdt.png"
        ],
        template: "swiss-case",
        caseStudy: {
            eyebrow: "Personal quant system / Binance futures",
            headline: "A local quant workbench where execution, risk, reporting, and research stay in one reproducible loop.",
            deck: "Quidem is not a generic PyPI package. It is a personal trading framework that organizes live or paper execution, terminal interaction, Redis status channels, email reports, exchange access, position risk, backtest research, and logs in one repository.",
            accent: "#c3182d",
            repoPath: "/home/lry/Projects/PythonRepo/quidem",
            imageFit: "contain",
            metrics: [
                { label: "Exchange", value: "Binance" },
                { label: "Mode", value: "Paper / Live" },
                { label: "State channel", value: "Redis" },
                { label: "Research", value: "Backtest" }
            ],
            sections: [
                {
                    kicker: "01 / Execution core",
                    title: "Strategy code only decides whether to trade; the engine owns how trades are executed.",
                    body: "The core engine connects market data, strategy signals, risk checks, and order execution. bot.py drives exchange connection, historical warmup, realtime ticks, UI refresh, and heartbeat, while trader.py owns open and close actions, paper fills, fee estimation, position state, and trade journal pushes."
                },
                {
                    kicker: "02 / Operating surface",
                    title: "A terminal-first interface keeps long-running trading visible without a web backend.",
                    body: "The TUI uses standard output, ANSI control sequences, colorama, and cross-platform keyboard input to show position direction, market state, key indicators, current price, floating PnL, open events, close events, errors, pause, resume, and exit controls."
                },
                {
                    kicker: "03 / Risk and review",
                    title: "Redis reporting and backtests make trading behavior observable after the session ends.",
                    body: "Closed trades are queued in Redis for scheduled HTML mail reports, CSV attachments, equity curves, and archive files. Backtest modules reuse core strategy, indicator, and risk code, while HMM, clustering, BOCPD, and diagnostic replay scripts support research and post-loss analysis."
                }
            ],
            highlights: [
                "Binance Futures REST and WebSocket access are isolated behind ccxt and websocket-client adapters.",
                "Paper mode records simulated orders without touching real exchange order endpoints.",
                "Risk management covers order sizing, leverage, taker fee estimation, stop loss, take profit, cooldown, circuit breaking, breakeven protection, and trailing stops.",
                "The report pipeline decouples the trading loop from email delivery through Redis, Resend, schedule, pandas, and matplotlib.",
                "Backtest and diagnostics reuse core modules to avoid a hard split between research logic and live trading logic."
            ],
            stack: ["Python", "ccxt", "websocket-client", "pandas", "numpy", "Redis", "Resend", "matplotlib", "seaborn", "statsmodels", "hmmlearn", "scikit-learn", "unittest"],
            keywords: ["个人量化", "模拟盘/实盘", "终端监控", "Redis 报告", "仓位风控", "回测研究"]
        }
    },
    {
        id: 2,
        title: "Colonnade DApp",
        year: "2026",
        category: "Ethereum Data Visualization",
        color: "#68141d",
        imagePlaceholder: "CD",
        src: "/images/projects/colonnade/colonnade-cover.svg",
        cardTitleLines: ["Colonnade", "以太坊链上数据", "可视化 DApp"],
        description: "An Ethereum on-chain data visualization DApp built with Vite, React, TypeScript, Wagmi, Viem, and D3.",
        detailImages: [
            "/images/projects/colonnade/intro-1.png",
            "/images/projects/colonnade/intro-2.png"
        ],
        template: "swiss-case",
        caseStudy: {
            eyebrow: "Ethereum DApp / Realtime block data",
            headline: "A Swiss-style Ethereum dashboard for recent block activity, gas usage, wallet state, and RPC resilience.",
            deck: "Colonnade uses Wagmi and Viem to connect browser wallets and query live Ethereum data, then uses D3 scales and path generation to render recent block transaction activity and gas utilization as readable SVG charts.",
            accent: "#d21f2f",
            repoPath: "/home/lry/Projects/TS-Repo/colonnade",
            imageFit: "contain",
            metrics: [
                { label: "Recent blocks", value: "12" },
                { label: "Networks", value: "Mainnet / Sepolia" },
                { label: "Charts", value: "D3 SVG" },
                { label: "RPC", value: "Fallback" }
            ],
            sections: [
                {
                    kicker: "01 / Wallet layer",
                    title: "Wallet connection and account state are handled through Web3 React hooks.",
                    body: "WagmiProvider initializes the network configuration, while useConnect, useDisconnect, useAccount, useBlockNumber, useGasPrice, useBalance, and usePublicClient coordinate wallet connection, latest block subscription, gas price, balance reads, and custom RPC queries."
                },
                {
                    kicker: "02 / Data pipeline",
                    title: "Viem reads the recent chain window directly from RPC and formats Ethereum units.",
                    body: "The app calculates the latest twelve block numbers from the watched block height, calls publicClient.getBlock for each block, extracts transaction counts, gas used, and gas limits, then formats ETH and Gwei values through Viem utilities."
                },
                {
                    kicker: "03 / Visualization system",
                    title: "D3 calculates the graphics, React keeps ownership of the DOM.",
                    body: "D3 scaleBand, scaleLinear, line, curveMonotoneX, and format convert block data into bar positions, gas utilization points, smooth line paths, and compact block labels. The interface keeps a black-white-gray Swiss grid with red status emphasis."
                }
            ],
            highlights: [
                "Connects browser-injected wallets such as MetaMask through Wagmi.",
                "Reads current Ethereum block number, gas price, and connected wallet ETH balance.",
                "Queries recent block transaction counts, gas used, and gas limits through Viem public client calls.",
                "Uses multiple public mainnet RPC endpoints through fallback transport to reduce rate-limit stalls.",
                "Builds chart geometry with D3 while rendering the final SVG through React."
            ],
            stack: ["Vite", "React", "TypeScript", "Wagmi", "Viem", "D3.js", "React Query", "Ethereum RPC", "SVG"],
            keywords: ["以太坊", "链上数据", "钱包连接", "Gas 使用率", "D3 可视化", "RPC fallback"]
        }
    },
    {
        id: 3,
        title: "Sermon",
        year: "2026",
        category: "Markdown Editor",
        color: "#4c1a1f",
        imagePlaceholder: "SM",
        src: "/images/projects/sermon/sermon-cover.svg",
        cardTitleLines: ["Sermon", "布道 Markdown", "编辑器"],
        description: "A restrained Windows Markdown editor built with WPF and .NET 10, focused on writing, previewing, file management, and Swiss-style clarity.",
        detailImages: [
            "/images/projects/sermon/sermon-cover.svg"
        ],
        template: "swiss-case",
        caseStudy: {
            eyebrow: "Writing tool / WPF desktop",
            headline: "A calm Markdown editor for writing, previewing, and managing drafts inside a disciplined Windows interface.",
            deck: "Sermon is a Windows Markdown editor built with WPF and .NET 10. It favors clear grids, black-white-gray hierarchy, red structural emphasis, low-decoration controls, and readable typography for technical documents, blog drafts, sermon notes, and daily writing.",
            accent: "#b61f2a",
            repoPath: "/home/lry/Projects/CsRepo/Sermon",
            imageFit: "contain",
            metrics: [
                { label: "Runtime", value: ".NET 10" },
                { label: "UI", value: "WPF" },
                { label: "Preview", value: "WebView2" },
                { label: "Autosave", value: "2 min" }
            ],
            sections: [
                {
                    kicker: "01 / Writing modes",
                    title: "Edit, preview, and split modes support different phases of Markdown writing.",
                    body: "Sermon provides focused editing with syntax highlighting, realtime HTML preview, and a split mode that keeps the source and rendered document visible together. Preview refresh is debounced to reduce repeated rendering while typing."
                },
                {
                    kicker: "02 / File workflow",
                    title: "The editor treats document management as part of the writing surface.",
                    body: "New, open, save, save as, folder browsing, tree navigation, multi-tab editing, unsaved-state indicators, and two-minute autosave create a practical local writing workflow instead of a single-buffer text box."
                },
                {
                    kicker: "03 / Desktop architecture",
                    title: "WPF, AvalonEdit, Markdig, and WebView2 split the editor into reliable desktop responsibilities.",
                    body: "AvalonEdit handles text editing and Markdown syntax color, Markdig converts Markdown into HTML, WebView2 renders the preview, MahApps.Metro supplies the window frame and Material icons, and RelayCommand keeps toolbar and shortcut actions bound to UI state."
                }
            ],
            highlights: [
                "Supports standard Markdown and extended syntax including tables, code blocks, and strikethrough.",
                "Includes formatting buttons, Ctrl+B, Ctrl+I, Ctrl+F, Ctrl+H, and common file shortcuts.",
                "Shows word count and cursor position in a restrained low-contrast status bar.",
                "Targets Windows 10/11 with .NET Desktop Runtime and WebView2 Runtime.",
                "Provides both framework-dependent and self-contained win-x64 publish paths."
            ],
            stack: [".NET 10", "C#", "WPF", "MahApps.Metro", "Material IconPacks", "AvalonEdit", "Markdig", "Microsoft.Web.WebView2", "XAML"],
            keywords: ["Markdown 编辑器", "Windows 写作", "实时预览", "分屏模式", "自动保存", "瑞士风格 UI"]
        }
    },
    {
        id: 4,
        title: "Hyacinth",
        year: "2026",
        category: "Cross-platform AI Chat",
        color: "#123f38",
        imagePlaceholder: "HY",
        src: "/images/projects/hyacinth/hyacinth-cover.svg",
        cardTitleLines: ["Hyacinth", "跨平台多 AI", "群聊应用"],
        description: "A Rust, Tauri 2, React, and Vite based cross-platform AI chat app with Android-first layout, local settings, and multi-agent group replies.",
        detailImages: [
            "/images/projects/hyacinth/hyacinth-cover.svg"
        ],
        template: "swiss-case",
        caseStudy: {
            eyebrow: "AI group chat / Tauri mobile",
            headline: "A mobile-first AI conversation app where multiple configured assistants can answer in the same room.",
            deck: "Hyacinth is a cross-platform AI chat application built with Rust, Tauri 2, React, and Vite. It prioritizes Android while retaining desktop builds, and lets each AI keep independent identity, endpoint, model, prompt, key, and temperature settings.",
            accent: "#146c5f",
            repoPath: "/home/lry/Projects/RustRepo/Hyacinth",
            imageFit: "contain",
            metrics: [
                { label: "Shell", value: "Tauri 2" },
                { label: "Backend", value: "Rust" },
                { label: "Frontend", value: "React" },
                { label: "Target", value: "Android" }
            ],
            sections: [
                {
                    kicker: "01 / Multi-AI room",
                    title: "Each assistant has its own configuration, then selected assistants reply together.",
                    body: "Every AI can define name, avatar text, API key, base URL, model, system prompt, and temperature. Users can select multiple assistants for the same message, creating a group-chat workflow over OpenAI-compatible chat/completions APIs."
                },
                {
                    kicker: "02 / Local persistence",
                    title: "Settings and conversations stay local to the device.",
                    body: "The Tauri backend stores assistant settings in the native application configuration directory, while chat history is kept in browser localStorage. This keeps personal API configuration and everyday conversation state close to the user."
                },
                {
                    kicker: "03 / Cross-platform build path",
                    title: "Android is the priority, but the same codebase keeps a desktop route open.",
                    body: "The project includes npm build scripts for Tauri desktop and Android workflows, with Android Studio SDK, NDK, build tools, command-line tools, Rust Android targets, and Linux WebKitGTK dependencies documented in the README."
                }
            ],
            highlights: [
                "Connects to OpenAI-compatible chat/completions endpoints rather than a single fixed provider.",
                "Supports independent model, prompt, endpoint, API key, avatar text, and temperature per assistant.",
                "Allows multiple selected AIs to respond in one conversation, turning single-user chat into a group workflow.",
                "Uses an Android-first responsive layout while keeping a desktop AI management panel.",
                "Documents Android SDK, NDK, Rust target, and Linux desktop build prerequisites."
            ],
            stack: ["Rust", "Tauri 2", "React", "Vite", "TypeScript", "Android SDK", "OpenAI-compatible APIs", "localStorage", "Native app config"],
            keywords: ["多 AI 群聊", "Tauri Android", "本地配置", "OpenAI 兼容接口", "移动端优先", "跨平台桌面"]
        }
    },
    {
        id: 5,
        title: "Lilac-CLI",
        year: "2026",
        category: "TUI Agent",
        color: "#4a2b22",
        imagePlaceholder: "LC",
        src: "/images/projects/lilac/lilac-cover.svg",
        cardTitleLines: ["Lilac-CLI", "智能体设计"],
        description: "A Bun and Ink based terminal agent framework with skill-driven behavior, OpenAI-compatible providers, streaming responses, and live token cost awareness.",
        detailImages: [
            "/images/projects/lilac/intro.png",
            "/images/projects/lilac/lilac-system.svg"
        ],
        template: "swiss-case",
        caseStudy: {
            eyebrow: "Terminal intelligence / Skill orchestration",
            headline: "A refined command-line agent interface where behavior is edited like content.",
            deck: "Lilac-CLI turns Markdown skill files into swappable agent identities, then renders the conversation through a polished Ink interface built for fast local iteration and focused developer work.",
            accent: "#7f5cff",
            repoPath: "/home/lry/Projects/TsRepo/lilac",
            imageFit: "contain",
            metrics: [
                { label: "Runtime", value: "Bun" },
                { label: "Interface", value: "Ink" },
                { label: "Skill format", value: ".md" },
                { label: "API layer", value: "OpenAI style" }
            ],
            sections: [
                {
                    kicker: "01 / Product premise",
                    title: "Agent identity becomes a local, versionable design surface.",
                    body: "Instead of baking behavior into code, Lilac loads persona, model, temperature, and constraints from Markdown frontmatter. A new assistant mode can be created by adding a skill file, which keeps experimentation fast and transparent."
                },
                {
                    kicker: "02 / Interface system",
                    title: "React patterns brought into the terminal without losing terminal speed.",
                    body: "The UI is composed with Ink components for header, message list, input, spinner states, and streaming text. The result feels closer to a professional developer tool than a plain prompt loop."
                },
                {
                    kicker: "03 / Operating feedback",
                    title: "Live token estimation makes model usage visible during the session.",
                    body: "A lightweight token utility feeds the header cost monitor, so the interface keeps both conversation state and resource pressure visible while responses stream."
                }
            ],
            highlights: [
                "Markdown skills define agent persona, model, temperature, and instruction constraints.",
                "Provider-agnostic API client works with OpenAI-style services including GPT, DeepSeek, and local Ollama-compatible endpoints.",
                "Gradient terminal typography, side-line message layout, and loading motion give the CLI a designed, premium feel.",
                "Bun keeps startup and TypeScript execution tight enough for daily command-line use."
            ],
            stack: ["Bun", "TypeScript", "React", "Ink", "gray-matter", "ink-text-input", "ink-spinner", "OpenAI-compatible APIs"],
            keywords: ["终端智能体", "技能驱动", "流式交互", "实时成本", "本地优先", "高性能启动"]
        }
    },
    {
        id: 6,
        title: "Solana Private Fork Economics",
        year: "2026",
        category: "Blockchain R&D",
        color: "#3e1c1c",
        imagePlaceholder: "SP",
        src: "/images/projects/solana/solana-cover.svg",
        cardTitleLines: ["Solana", "私有硬分叉", "Tokenomics修改"],
        description: "A private hard-fork experiment that redesigns Solana inflation parameters, isolates mainnet assumptions, and validates a local block-producing network through RPC.",
        detailImages: [
            "/images/projects/solana/solana-economics.svg",
            "/images/projects/solana/solana-validation.svg"
        ],
        template: "swiss-case",
        caseStudy: {
            eyebrow: "Private hard fork / Token economics",
            headline: "A Solana local network rebuilt around a smaller supply and a fixed private-chain inflation model.",
            deck: "This work keeps Solana's account, stake, vote, fee, rent, epoch, and reward machinery intact, while replacing mainnet-oriented genesis defaults with a reproducible private development chain.",
            accent: "#0b8f7a",
            repoPath: "/home/lry/Projects/RustRepo/solana",
            metrics: [
                { label: "Initial mint", value: "10M SOL" },
                { label: "Validator stake", value: "100K SOL" },
                { label: "Annual inflation", value: "0.5%" },
                { label: "Foundation share", value: "0%" }
            ],
            sections: [
                {
                    kicker: "01 / Genesis boundary",
                    title: "The default chain identity moves from mainnet semantics to development semantics.",
                    body: "The genesis CLI now defaults to the Development cluster type. That avoids automatic injection of historical mainnet allocation accounts and makes the private chain start from an intentionally smaller, cleaner ledger."
                },
                {
                    kicker: "02 / Economic redesign",
                    title: "Inflation is simplified into a fixed private-fork curve.",
                    body: "A new private_fork inflation constructor sets initial and terminal annual inflation to 0.5%, taper to 1.0, and foundation parameters to zero. Rewards still flow through Solana's existing epoch reward pipeline."
                },
                {
                    kicker: "03 / Local validation",
                    title: "The fork is verified as a running block-producing network.",
                    body: "A private-localnet script starts solana-test-validator with a short 64-slot epoch, 8 ticks per slot, a dedicated ledger, and faucet funding. RPC checks confirm genesis hash, advancing slots, inflation governor values, and zero mainnet non-circulating accounts."
                }
            ],
            highlights: [
                "Added a private inflation option and a Development default path for genesis creation.",
                "Reduced local test-validator mint from 500,000,000 SOL to 10,000,000 SOL.",
                "Reduced bootstrap validator stake from 1,000,000 SOL to 100,000 SOL.",
                "Excluded mainnet-beta non-circulating supply lists from Development cluster supply reporting.",
                "Validated getGenesisHash, getEpochInfo, getInflationGovernor, and getSupply over local RPC."
            ],
            stack: ["Rust", "Solana validator", "GenesisConfig", "Inflation", "Bank runtime", "RPC", "Shell automation", "cargo test"],
            keywords: ["私有硬分叉", "通胀重设计", "本地验证网", "创世配置", "质押奖励", "供应隔离"]
        }
    },
    {
        id: 7,
        title: "Consortium Blockchain for SOA Governance",
        year: "2026",
        category: "Paper / 论文研究",
        color: "#4a2b22",
        imagePlaceholder: "CB",
        src: "/images/projects/soa/main-p1.png",
        cardTitleLines: ["联盟链", "国有资产治理"],
        description: "A bilingual Swiss-style project page for the paper on consortium blockchain and polycentric governance of state-owned asset transactions.",
        detailImages: [
            "/images/projects/soa/main-p1.png"
        ],
        template: "swiss-case",
        caseStudy: {
            eyebrow: "Research Paper / 学术论文",
            headline: "Consortium Blockchain for State-Owned Asset Transaction Polycentric Governance\n国有资产交易复合治理的联盟链框架",
            deck: "An integrated framework combining evolutionary game theory and Mesa-based agent simulation to redesign SOA governance from delayed audit to real-time, incentive-compatible supervision.\n通过进化博弈与 Mesa 智能体仿真，推动国有资产治理从滞后审计转向实时、激励相容的链上监管。",
            accent: "#b61f2a",
            repoPath: "DOI: 10.5281/zenodo.19202351",
            imageFit: "contain",
            metrics: [
                { label: "Compliance\n合规收敛", value: "85.2%" },
                { label: "Convergence\n收敛迭代", value: "30 steps" },
                { label: "Byzantine tolerance\n拜占庭鲁棒性", value: "20%" },
                { label: "Regime uplift\n相对基线提升", value: "3x" }
            ],
            sections: [
                {
                    kicker: "01 / Framework 架构",
                    title: "A four-layer consortium blockchain links governance roles, contracts, consensus, and applications.\n四层联盟链将治理主体、合约规则、共识协议与应用层打通。",
                    body: "The architecture connects SASAC regulators, exchanges, auditors, and enterprises through permissioned identity, PBFT consensus, and threshold-triggered smart contracts, enabling polycentric but coordinated supervision.\n系统以 CA + DID 身份体系、PBFT 共识与阈值触发合约形成“多中心协同监管”，在分布式节点中保持统一规则与可追溯执行。"
                },
                {
                    kicker: "02 / Theory 理论",
                    title: "Threshold functions reveal a penalty-detection substitution law.\n阈值函数揭示了惩罚强度与检测概率的替代关系。",
                    body: "The model derives λ* = f(B, Ce, p, D) and p* = g(B, Ce, λ, D). In on-chain regimes (p > 0.7), required penalty intensity drops to λ* in [0.15, 0.45], far below off-chain regimes where λ* rises to [1.8, 3.2].\n论文推导 λ* 与 p* 两个关键阈值：当检测概率提升到链上区间（p > 0.7）时，达成稳定合规所需惩罚系数显著降低，形成可工程化的政策替代关系。"
                },
                {
                    kicker: "03 / Simulation 仿真",
                    title: "Mesa ABM validates ESS predictions under bounded rationality.\nMesa 智能体仿真在有限理性条件下验证了 ESS 预测。",
                    body: "With λ = 2.5 and p = 0.85, compliance converges to 85.2% (SD = 3.1%) versus 27.8% baseline (SD = 6.4%). A compliance ridge around λ·p > 0.6 and resilience beyond 20% Byzantine infiltration confirm robust mechanism design.\n在异质主体、噪声决策与无标度网络下，链上机制依然快速收敛并具备抗串谋能力，证明该治理框架具有现实可实施性。"
                }
            ],
            highlights: [
                "Formal mapping from blockchain design parameters (λ, p, τ) to payoff structure in the regulator-enterprise game. / 将链上设计参数映射到监管博弈收益结构。",
                "Derived operational thresholds for mechanism design before deployment. / 在部署前即可给出可执行的阈值设计目标。",
                "Demonstrated 85.2% compliance equilibrium under treatment conditions with rapid divergence from 50% initial state. / 从 50% 初始状态快速分化并稳定到 85.2% 合规水平。",
                "Maintained over 80% compliance under 20% Byzantine node infiltration. / 在 20% 拜占庭节点渗透下仍保持 80% 以上合规。",
                "Identified the policy substitution ridge λ·p > 0.6 for practical regulator tuning. / 识别 λ·p > 0.6 的政策调参“合规脊线”。",
                "Provided concrete recommendation: λ ≥ 2.5 and p ≥ 0.85 for transactions above ¥10M. / 给出面向千万元级交易的参数建议：λ ≥ 2.5、p ≥ 0.85。"
            ],
            stack: [
                "Consortium Blockchain",
                "PBFT Consensus",
                "Smart Contract Governance",
                "Evolutionary Game Theory",
                "Mesa ABM",
                "Polycentric Governance",
                "DID + CA Identity",
                "Mechanism Design"
            ],
            keywords: [
                "联盟链治理",
                "国有资产交易",
                "Polycentric Governance",
                "Evolutionary Game",
                "Mesa Simulation",
                "机制设计"
            ]
        }
    },
    {
        id: 8,
        title: "Unity Game Design",
        year: "2026",
        category: "Game Design",
        color: "#3e1c1c",
        imagePlaceholder: "NV",
        src: "/images/4.PNG",
        description: "A Game Design.",
        detailImages: [
            "/images/projects/4/4-2.PNG",
            "/images/projects/4/4-3.PNG",
            "/images/projects/4/4-4.PNG",
            "/images/projects/4/4-5.PNG",
            "/images/projects/4/4-6.PNG",
            "/images/projects/4/4-7.PNG",
            "/images/projects/4/4-8.PNG",
            "/images/projects/4/4-9.PNG"
        ]
    },
    {
        id: 9,
        title: "神秘人中本聪与他的个人比特币项目——共识的18年野蛮生长",
        year: "2026",
        category: "Data Story",
        color: "#1a120b",
        imagePlaceholder: "BTC",
        src: "/images/bitcoin-story-preview.svg",
        cardTitleLines: ["中本聪", "Bitcoin", "可视化叙事"],
        description: "A scrollytelling data story about Satoshi, the 2008 whitepaper, the genesis block, Bitcoin's repricing arc, and the scale of a 1.1M BTC fortune.",
        template: "bitcoin-story"
    },
    {
        id: 10,
        title: "神秘人中本聪与他的个人比特币项目——3D 数据叙事版本",
        year: "2026",
        category: "3D Data Story",
        color: "#2a0d0a",
        imagePlaceholder: "BTC",
        src: "/images/bitcoin-monolith-preview.svg",
        cardTitleLines: ["中本聪", "Bitcoin", "R3F游戏化叙事"],
        description: "A 3D scrollytelling version of the Satoshi and Bitcoin data story, using R3F, custom shaders, particles, BTC modeling, price data, and tap-hold interactions.",
        template: "bitcoin-monolith"
    }
];
