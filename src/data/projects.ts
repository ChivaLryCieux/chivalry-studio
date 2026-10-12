import type { ProjectData } from "@/types/project";

export const projects: ProjectData[] = [
    {
        id: 1,
        title: "GloryLink: Minecraft UGC Studio",
        year: "2015秋",
        category: "Minecraft UGC / 游戏工作室",
        color: "#241812",
        imagePlaceholder: "GL",
        src: "/images/projects/glorylink/glorylink-cover.svg",
        cardTitleLines: ["GloryLink", "耀临工作室", "系列作品"],
        award: "UGC 社区超1200万下载量",
        description: "耀临工作室（GloryLink）是一家基于《我的世界》（Minecraft）游戏生态的 UGC 游戏工作室，创立于2015年秋，系列原创游戏作品社区累计下载量超 1200 万。A Minecraft-based UGC game studio with over 12 million cumulative community downloads across its original series.",
        detailImages: [
            "/images/projects/glorylink/glorylink-cover.svg"
        ],
        template: "swiss-case",
        useLightFrame: true,
        isBilingual: true,
        caseStudy: {
            eyebrow: "Minecraft UGC / 12M+ Downloads",
            headline: "GloryLink Studio: Minecraft UGC Game Works\n耀临工作室：基于《我的世界》生态的UGC游戏创作",
            deck: "GloryLink is a Minecraft UGC game studio founded in Autumn 2015. Creating original narrative maps, custom gameplay mechanics, and voxel worlds, its series works have achieved over 12 million community downloads.\n耀临工作室（GloryLink）创立于2015年秋，是一家深耕《我的世界》（Minecraft）生态的 UGC 游戏工作室。团队专注于原创叙事地图、独立玩法机制与体素世界构建，系列作品在各大游戏社区累计下载量突破 1200 万次，深受海量玩家喜爱。",
            accent: "#d97706",
            repoPath: "GloryLink UGC Studio / Minecraft Ecosystem",
            imageFit: "contain",
            isBilingual: true,
            useLightFrame: true,
            metrics: [
                { label: "Downloads\n社区下载量", value: "12,000,000+\n超1200万" },
                { label: "Ecosystem\n依托生态", value: "Minecraft\n我的世界" },
                { label: "Creation Mode\n创作范式", value: "UGC Studio\n创作者工坊" },
                { label: "Founded\n创立时间", value: "Autumn 2015\n2015年秋" }
            ],
            sections: [
                {
                    kicker: "01 / Studio Inception 工坊创立与生态深耕",
                    title: "Pioneering UGC game creation inside Minecraft.\n深植沙盒生态，开启 UGC 游戏内容创作。",
                    body: "Founded in 2015, GloryLink Studio leveraged the voxel sandbox architecture of Minecraft to design self-contained interactive games, transitioning from casual building to systematic game production.\n耀临工作室创立于2015年秋，以《我的世界》无限自由度的沙盒体素架构为土壤，将玩家自发探索转化为系统化的游戏体验研发，打通从创意概念、红石/指令开发到场景搭建的完整工坊流水线。"
                },
                {
                    kicker: "02 / Gameplay & Narrative 玩法研发与叙事体验",
                    title: "Balancing sandbox mechanics with authored storytelling.\n兼顾沙盒自由机制与沉浸式关卡叙事。",
                    body: "Developing diverse gameplay archetypes ranging from narrative adventure, puzzle dungeons, to custom multiplayer mechanics, pushing the expressive limits of voxel game design.\n系列作品覆盖剧情冒险、解谜探险、多人对抗与合作生存等多元品类。在受限的体素网格中实现高度沉浸的环境叙事与细腻的机制设计，赋予沙盒世界独特的情感厚度与游玩乐趣。"
                },
                {
                    kicker: "03 / Community Scale 社区影响与千万级传播",
                    title: "12 million downloads building vibrant player resonance.\n1200万次社区下载汇聚庞大玩家社群。",
                    body: "The studio's releases gained massive organic traction across gaming forums and creator platforms, accumulating over 12 million downloads and inspiring extensive secondary community creations.\n作品在各大主流游戏社区、论坛及创作者中心引发持续热潮，累计下载量突破 1200 万次。庞大的玩家基数与活跃的二次创作生态，使耀临系列作品成为沙盒 UGC 领域的代表性创作案例之一。"
                }
            ],
            highlights: [
                "Achieved over 12,000,000 cumulative community downloads across studio releases. / 系列作品在玩家社区累计下载量突破 1200 万次。",
                "Built diverse original game portfolios inside the Minecraft sandbox ecosystem. / 基于《我的世界》沙盒生态打造涵盖冒险、解谜与玩法的原创作品矩阵。",
                "Engineered cohesive voxel environments with custom mechanics and authored narratives. / 融合体素美术、机关逻辑与定制化剧本构建沉浸式游玩体验。",
                "Fostered an active creator community with enduring engagement since 2015. / 自2015年创立以来沉淀出极具黏性与创作活力的玩家社区生态。"
            ],
            stack: [
                "Minecraft UGC",
                "Game Design",
                "Level Design",
                "Voxel Art",
                "Command & Redstone",
                "Narrative Design",
                "Community Operations"
            ],
            keywords: [
                "耀临工作室",
                "GloryLink",
                "我的世界",
                "Minecraft UGC",
                "1200万下载",
                "UGC游戏工作室",
                "游戏设计",
                "沙盒创作"
            ]
        }
    },
    {
        id: 2,
        title: "Chant as Lament: Metrical Poetry Practice",
        year: "2018夏",
        category: "Classical Poetry / 格律诗创作",
        color: "#3e2622",
        imagePlaceholder: "CL",
        src: "/images/projects/poetry/poetry-cover.svg",
        cardTitleLines: ["长歌当哭：", "格律诗创作实践"],
        description: "2018年夏近体格律诗创作实践。在严苛的平仄黏对、押韵声律与对仗工巧的格律框架下，探索抒情与言志的美学张力。A classical Chinese metrical poetry practice exploring regulated verse, tonal phonology, and lyric aesthetics in Summer 2018.",
        detailImages: [
            "/images/projects/poetry/poetry-cover.svg"
        ],
        template: "swiss-case",
        useLightFrame: true,
        isBilingual: true,
        caseStudy: {
            eyebrow: "Classical Poetry / 近体诗与声律实践",
            headline: "Chant as Lament: Classical Metrical Poetry Practice\n长歌当哭：格律诗创作实践与声律探索",
            deck: "A dedicated practice in classical Chinese metrical verse (Regulated Verse and Quatrains) exploring tonal phonology, semantic tension, and lyric expression within rigid poetic forms.\n2018年夏近体格律诗创作实践。在严苛的平仄黏对、押韵声律与对仗工巧的格律框架下，探索言志与抒情的张力，以古典形式承载现代哲思与深沉情感。",
            accent: "#c3182d",
            repoPath: "Chivalry Studio / Poetry Manuscripts 2018",
            imageFit: "contain",
            isBilingual: true,
            useLightFrame: true,
            metrics: [
                { label: "Form\n诗体形式", value: "Regulated Verse / 律绝" },
                { label: "Phonology\n音韵依据", value: "Pingshui Rhyme / 平水韵" },
                { label: "Timeframe\n创作时期", value: "Summer 2018 / 2018夏" },
                { label: "Theme\n核心母题", value: "Elegiac & Lyric / 抒怀与言志" }
            ],
            sections: [
                {
                    kicker: "01 / Metric Discipline 律制与格调",
                    title: "Strict tonal constraints create aesthetic compression.\n严苛格律约束下的意象压缩与美学凝练。",
                    body: "Adhering to canonical tonal alternation (Ping Ze), rhyme conventions, and parallel couplets. The rigid structural constraints do not limit expression, but rather compress emotion into potent aesthetic rhythm.\n严格遵循近体诗平仄相对、相黏与音韵规范。五言七言的格式约束非但不是束缚，反而使语言在高度自律的声律张力中提纯，形成精谨典雅的音节节律与形式美。"
                },
                {
                    kicker: "02 / Couplet Dynamics 对仗与意象",
                    title: "Syntactic and conceptual parallelism.\n虚实相生、声色互动的偶句对仗艺术。",
                    body: "Exploring semantic contrast and harmony in the middle couplets (Han Lian and Jing Lian). Balancing concrete sensory landscapes with abstract metaphysical reflections.\n颔联与颈联的对仗构型注重词性、词义与声调的对仗工稳。在景与情、虚与实、动与静的互文对照中，拓展诗意空间的纵深与哲理回味。"
                },
                {
                    kicker: "03 / Emotional Resonance 咏怀与言志",
                    title: "Classical lyricism engaging contemporary spirit.\n以古典风骨熔铸现代心绪与时代咏怀。",
                    body: "Drawing upon classical lyric traditions from Qu Yuan and Du Fu while addressing contemporary existential sensibility, transforming personal melancholia into enduring resonance.\n承续屈杜以来的忧患意识与风骨传统，将个体的生命体悟、离索幽思与时代关怀熔铸于篇章之中，达成“长歌当哭、慷慨任气”的情感广度。"
                }
            ],
            highlights: [
                "Authored complete sequences of five-character and seven-character regulated verse. / 完成五言、七言律绝等多首完整近体诗创作组篇。",
                "Rigorous adherence to Pingshui rhyme categories and tonal cadence. / 严循平水韵部与平仄正变格，保证声调和谐与朗诵韵律。",
                "Deep exploration of poetic parallelism across phonetics, syntax, and semantics. / 深入探索字声、词性与意象层面的深层对仗与互文交织。",
                "Harmonized classical aesthetic restraint with acute individual self-expression. / 融合古典含蓄典雅的形式自律与现代个体的深挚情感表达。"
            ],
            stack: [
                "近体诗 (Regulated Verse)",
                "平水韵 (Pingshui Rhyme)",
                "平仄声律 (Tonal Meter)",
                "对仗工巧 (Parallelism)",
                "古典诗学 (Poetics)",
                "格律辞赋 (Rhyme Prose)"
            ],
            keywords: [
                "长歌当哭",
                "格律诗",
                "平仄",
                "近体诗",
                "七律",
                "古典文学",
                "声律美学"
            ]
        }
    },
    {
        id: 3,
        title: "Text Classification: From TF-IDF to Pretrained Models",
        year: "2024秋",
        category: "NLP / 自然语言处理",
        color: "#0f172a",
        imagePlaceholder: "TC",
        src: "/images/projects/text-classification/text-classification-cover.svg",
        cardTitleLines: ["文本分类实验", "从词频统计到", "预训练模型"],
        description: "系统评测从传统统计特征（TF-IDF / Naive Bayes）到深度网络（TextCNN / LSTM）与预训练模型（BERT）的文本分类全链路演进实验。A comparative NLP benchmark investigating text classification paradigms from statistical TF-IDF to pretrained transformers.",
        detailImages: [
            "/images/projects/text-classification/text-classification-cover.svg"
        ],
        template: "swiss-case",
        useLightFrame: true,
        isBilingual: true,
        caseStudy: {
            eyebrow: "NLP Benchmark / 自然语言处理实验",
            headline: "Text Classification: From Word Frequency to Pretrained Models\n文本分类实验：从词频统计到预训练模型演进",
            deck: "A comprehensive comparative study tracing the evolution of text classification, evaluating statistical bag-of-words, deep neural networks, and pretrained transformers under reproducible benchmarks.\n系统梳理与评测文本分类技术的演进脉络，在统一测试基准下对比词袋统计（TF-IDF / Naive Bayes）、深度语义编码（TextCNN / BiLSTM）与微调预训练模型（BERT / RoBERTa）的表征能力与工程效能。",
            accent: "#2563eb",
            repoPath: "Chivalry Studio / NLP Benchmark Labs",
            imageFit: "contain",
            isBilingual: true,
            metrics: [
                { label: "Baseline\n传统基线", value: "TF-IDF + NB / SVM" },
                { label: "Neural Models\n深度神经网络", value: "TextCNN & BiLSTM" },
                { label: "Pretrained\n预训练模型", value: "BERT / RoBERTa" },
                { label: "Evaluation\n核心指标", value: "Accuracy / Macro-F1" }
            ],
            sections: [
                {
                    kicker: "01 / Statistical Baselines 统计基线",
                    title: "Word frequency, sparse representations, and linear decision boundaries.\n词频统计、稀疏特征向量与线性分类边界。",
                    body: "Evaluating bag-of-words and TF-IDF representations paired with Naive Bayes, Logistic Regression, and SVMs. Examining sparsity challenges, n-gram limitations, and computational efficiency on raw corpora.\n以词袋模型（BoW）与 TF-IDF 稀疏向量为起点，结合朴素贝叶斯、逻辑回归与 SVM 评估传统特征工程的表达瓶颈，分析高维稀疏特征与词序缺失对语义判别的局限。"
                },
                {
                    kicker: "02 / Deep Sequence Modeling 深度序列建模",
                    title: "Distributed representations and local vs sequential feature extraction.\n分布式词向量与局部/时序特征捕获。",
                    body: "Transitioning to dense word embeddings (Word2Vec / GloVe) combined with TextCNN for local n-gram filters and BiLSTM with Attention for long-range temporal dependencies.\n引入稠密词嵌入表征，对比卷积神经网络（TextCNN）多尺度卷积核的局部特征提取，与双向长短期记忆网络（BiLSTM + Attention）对语序上下文依赖的建模表现。"
                },
                {
                    kicker: "03 / Pretrained Transformers 预训练模型",
                    title: "Bidirectional contextual embeddings and transfer learning.\n双向注意力上下文表征与迁移学习微调。",
                    body: "Fine-tuning pretrained Transformers (BERT, RoBERTa), leveraging multi-head self-attention to capture nuanced syntactic and semantic shifts across classification domains.\n基于预训练语言模型（BERT / RoBERTa）进行下游微调，利用多头自注意力机制捕获深层上下文双向表征，在复杂语境与长距离依赖下取得显著的泛化性能飞跃。"
                }
            ],
            highlights: [
                "Implemented end-to-end benchmark pipelines comparing three generations of NLP models. / 搭建横跨三代文本分类范式的端到端评测流水线。",
                "Analyzed trade-offs between computational overhead, latency, and classification accuracy. / 深入剖析算力开销、推理延迟与分类准确率之间的工程权衡。",
                "Visualized embedding spaces and attention heatmaps across semantic categories. / 对稠密特征空间与自注意力权重进行可视化分析与可解释性探究。",
                "Standardized preprocessing, tokenization, and cross-validation pipelines. / 建立标准化的文本预处理、分词与交叉验证对比基准。"
            ],
            stack: [
                "PyTorch",
                "Transformers",
                "scikit-learn",
                "HuggingFace",
                "BERT",
                "TextCNN",
                "BiLSTM",
                "TF-IDF",
                "Python"
            ],
            keywords: [
                "文本分类",
                "NLP实验",
                "TF-IDF",
                "词频统计",
                "预训练模型",
                "BERT",
                "TextCNN",
                "深度学习"
            ]
        }
    },
    {
        id: 4,
        title: "Quest",
        year: "2025夏",
        category: "Quant Trading Framework",
        color: "#5a171d",
        imagePlaceholder: "QT",
        src: "/images/projects/quidem/quidem-cover.svg",
        cardTitleLines: ["Quest", "CTA系统", "量化分析与算法交易"],
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
            deck: "Quest is not a generic PyPI package. It is a personal trading framework that organizes live or paper execution, terminal interaction, Redis status channels, email reports, exchange access, position risk, backtest research, and logs in one repository.",
            accent: "#c3182d",
            repoPath: "https://github.com/ChivaLryCieux",
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
            stack: ["Python", "ccxt", "websocket-client", "pandas", "numpy", "Redis", "Resend", "matplotlib", "seaborn", "statsmodels", "hmmlearn", "scikit-learn"],
            keywords: ["CTA", "模拟盘/实盘", "终端监控", "Redis 报告", "仓位风控", "回测研究"]
        }
    },
    {
        id: 5,
        title: "Atrium",
        year: "2025冬",
        category: "DAG Multi-agent Orchestration",
        color: "#123f38",
        imagePlaceholder: "AT",
        src: "/images/projects/hyacinth/hyacinth-cover.svg",
        cardTitleLines: ["Atrium", "智役中庭", "Agent Harness"],
        description: "基于 DSH（DeepSeek Harness）内核的 Agent 项目，结合 DAG 工作流实现跨平台多智能体协同编排与运行调度。",
        detailImages: [
            "/images/projects/hyacinth/Hyacinth-intro.png",
            "/images/projects/hyacinth/hyacinth-cover.svg"
        ],
        template: "swiss-case",
        caseStudy: {
            eyebrow: "DSH Agent / Multi-agent DAG",
            headline: "An AI Agent project powered by the DSH (DeepSeek Harness) core, orchestrating multi-agent systems via DAG workflows.",
            deck: "Atrium is an AI Agent project built on the DSH (DeepSeek Harness) core. Instead of treating agents as simple chat participants, it leverages DAG-based orchestration to model agent tasks as directed workflow nodes with explicit dependencies, execution order, and reusable patterns across platforms.",
            accent: "#146c5f",
            repoPath: "https://github.com/ChivaLryCieux",
            imageFit: "contain",
            metrics: [
                { label: "Core", value: "DSH (DeepSeek Harness)" },
                { label: "Workflow", value: "DAG" },
                { label: "Role", value: "Agent Orchestrator" },
                { label: "Target", value: "Cross-platform" }
            ],
            sections: [
                {
                    kicker: "01 / DSH Core",
                    title: "Built on the DSH (DeepSeek Harness) core for reliable agent execution.",
                    body: "Atrium adopts the DeepSeek Harness (DSH) kernel to power its underlying agent reasoning, lifecycle control, and runtime execution, ensuring a robust and extensible harness layer for autonomous task execution."
                },
                {
                    kicker: "02 / DAG orchestration",
                    title: "Agent work is represented as a directed graph with clear dependencies.",
                    body: "Atrium uses DAG structure to make multi-agent coordination explicit. Each node can represent an agent task, transformation, or decision step, while graph edges define how context and outputs flow through the workflow."
                },
                {
                    kicker: "03 / Cross-platform runtime",
                    title: "The orchestration surface is designed to travel across desktop and mobile environments.",
                    body: "Packaged as a lightweight cross-platform application, Atrium provides a unified control interface for agent workflows, keeping orchestration logic consistent across supported devices."
                }
            ],
            highlights: [
                "Built on the DSH (DeepSeek Harness) core for agent runtime execution and lifecycle management.",
                "Uses DAG structure to model agent dependencies, execution order, and data flow.",
                "Coordinates multiple AI agents as a structured workflow instead of a loose group chat.",
                "Supports reusable orchestration patterns for complex AI-assisted tasks.",
                "Targets cross-platform use so the same orchestration logic can run across device contexts."
            ],
            stack: ["DSH (DeepSeek Harness)", "Agent Harness", "Tauri 2", "DAG", "Multi-agent orchestration", "Cross-platform app", "Workflow graph", "Task coordination"],
            keywords: ["DSH", "DeepSeek Harness", "Agent项目", "AI Harness", "DAG", "多智能体编排", "跨平台应用", "工作流图"]
        }
    },
    {
        id: 6,
        title: "Solana Private Fork Economics",
        year: "2026春",
        category: "Blockchain R&D",
        color: "#3e1c1c",
        imagePlaceholder: "SP",
        src: "/images/projects/solana/solana-cover.svg",
        cardTitleLines: ["Solana", "区块链私有硬分叉实验"],
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
            repoPath: "https://github.com/ChivaLryCieux",
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
        year: "2026春",
        category: "Paper / 论文研究",
        color: "#4a2b22",
        imagePlaceholder: "CB",
        src: "/images/projects/soa/SOA-display.png",
        cardTitleLines: ["联盟链", "国有资产治理"],
        description: "A bilingual Swiss-style project page for the paper on consortium blockchain and polycentric governance of state-owned asset transactions.",
        detailImages: [
            "/images/projects/soa/soa-paper-homepage.png",
            "/images/projects/soa/SOA-display.png"
        ],
        template: "swiss-case",
        coverPosition: "top",
        isBilingual: true,
        useLightFrame: true,
        caseStudy: {
            eyebrow: "Research Paper / 学术论文",
            headline: "Consortium Blockchain for State-Owned Asset Transaction Polycentric Governance\n国有资产交易复合治理的联盟链框架",
            deck: "An integrated framework combining evolutionary game theory and Mesa-based agent simulation to redesign SOA governance from delayed audit to real-time, incentive-compatible supervision.\n通过进化博弈与 Mesa 智能体仿真，推动国有资产治理从滞后审计转向实时、激励相容的链上监管。",
            accent: "#b61f2a",
            repoPath: "DOI: 10.5281/zenodo.19202351",
            imageFit: "contain",
            isBilingual: true,
            useLightFrame: true,
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
        title: "Aftermath: 残响",
        year: "2025冬",
        category: "Game Design",
        color: "#3e1c1c",
        imagePlaceholder: "NV",
        src: "/images/projects/aftermath/aftermath-cover.png",
        description: "A Game Built with Unity.",
        detailImages: [
            "/images/projects/aftermath/aftermath-2.png",
            "/images/projects/aftermath/aftermath-3.png",
            "/images/projects/aftermath/aftermath-4.png",
            "/images/projects/aftermath/aftermath-5.png",
            "/images/projects/aftermath/aftermath-6.png",
            "/images/projects/aftermath/aftermath-7.png",
            "/images/projects/aftermath/aftermath-8.png",
            "/images/projects/aftermath/aftermath-9.png"
        ]
    },
    {
        id: 9,
        title: "Signverse：联觉理论下的多模态叙事游戏",
        year: "2026春",
        category: "Game Design",
        color: "#1a1a2e",
        imagePlaceholder: "SV",
        src: "/images/projects/signverse/1.png",
        cardTitleLines: ["Signverse:", "标示界"],
        award: "2026腾讯光子游戏大赛铜奖",
        description: "Signverse/标示界。使用 Uinty 制作",
        detailImages: [
            "/images/projects/signverse/2.png",
            "/images/projects/signverse/3.png",
            "/images/projects/signverse/4.png",
            "/images/projects/signverse/5.png",
            "/images/projects/signverse/6.png",
            "/images/projects/signverse/7.png",
            "/images/projects/signverse/8.png",
            "/images/projects/signverse/9.png"
        ]
    },
    {
        id: 10,
        title: "Avoidant Syndrome",
        year: "2026夏",
        category: "Game Design",
        color: "#141419",
        imagePlaceholder: "AS",
        src: "/images/projects/avoidant/AS_Cover.jpg",
        cardTitleLines: ["Avoidant", "Syndrome:", "回避症候"],
        award: "2026网易MG挑战赛最佳人气奖",
        description: "A narrative exploration & atmospheric game built with Unity. In development.",
        content: "Avoidant Syndrome is an upcoming narrative and spatial exploration game focusing on embodied metaphors and psychological architecture. Detailed design documents and visual teasers will be unveiled soon.",
        detailImages: [
            "/images/projects/avoidant/AS_Cover.jpg"
        ]
    },
    {
        id: 11,
        title: "Parametric Design Practice",
        year: "2026春",
        category: "Computational Design / 参数化设计",
        color: "#0e1726",
        imagePlaceholder: "PD",
        src: "/images/projects/parametric/PD_Cover.jpg",
        cardTitleLines: ["数据映射 &", "参数化设计实践"],
        description: "探索计算几何、规则生成与拓扑优化的参数化设计实践。An exploratory computational and parametric design practice focusing on generative forms and algorithmic architecture.",
        detailImages: [
            "/images/projects/parametric/PD_Cover.jpg"
        ],
        template: "swiss-case",
        useLightFrame: true,
        isBilingual: true,
        caseStudy: {
            eyebrow: "Computational Design / 参数化实践",
            headline: "Parametric Design Practice: Algorithmic Form & Computational Geometry\n参数化设计实践：算法形式与计算几何探索",
            deck: "A research and design practice investigating rule-based morphogenesis, computational geometry, and algorithmic generative design.\n聚焦规则生成、拓扑关系与参数驱动形式的计算设计实践，探索算法逻辑与空间几何在数字建造维度的融合表达。",
            accent: "#0284c7",
            repoPath: "Chivalry Studio / Parametric Design Lab",
            imageFit: "contain",
            isBilingual: true,
            metrics: [
                { label: "Design Method\n设计方法", value: "Algorithmic / 参数驱动" },
                { label: "Core Toolchain\n核心工具链", value: "Rhino / GH / Python" },
                { label: "Geometry Logic\n几何逻辑", value: "NURBS & Mesh" },
                { label: "Status\n阶段", value: "In Progress / 实践中" }
            ],
            sections: [
                {
                    kicker: "01 / Generative Logic 规则生成",
                    title: "From static drafting to algorithmic logic.\n从静态图面到算法驱动的动态生成系统。",
                    body: "The practice explores parametric modeling driven by mathematical functions, field forces, and cellular automata, translating conceptual constraints into dynamic topological structures.\n实践围绕数学函数、力场引导与生长规则展开，将概念约束转化为自适应拓扑形体，建立输入参数与复杂几何的直接反馈回路。"
                },
                {
                    kicker: "02 / Computational Geometry 计算几何",
                    title: "Precise control of curvature, subdivision, and rationalization.\n曲率连续性、网格细分与构建合理化控制。",
                    body: "Employing mesh relaxation, developable surface analysis, and panel rationalization to bridge computational abstraction with material fabrication constraints.\n引入网格松弛、可展开曲面剖析与嵌板有理化算法，使复杂的流体曲面与离散单元在满足力学与制作规范的前提下达到形式与结构的平衡。"
                },
                {
                    kicker: "03 / Digital Iteration 数字化迭代",
                    title: "Performance-oriented multi-objective optimization.\n面向性能与环境的多元目标优化迭代。",
                    body: "Integrating structural analysis and environmental simulation into parametric loops to automate performance feedback and structural material distribution.\n将环境采光、受力分析等模拟引擎嵌入参数化工作流闭环中，通过多目标遗传算法实现基于性能反馈的设计演化。"
                }
            ],
            highlights: [
                "Constructed algorithmic pipelines connecting mathematical rules to spatial geometries. / 构建连接数学规则与三维空间拓扑的生成管线。",
                "Explored multi-parameter dynamic form-finding and topological relaxation. / 探索多参数动态形态寻优与拓扑松弛算法。",
                "Rationalized freeform surfaces for panelization and digital fabrication. / 针对离散嵌板制造对复杂曲面进行有理化拆解与优化。",
                "Integrated performance-based simulation feedback into design generation. / 将性能仿真与环境约束深度集成至参数化迭代闭环。"
            ],
            stack: [
                "Grasshopper",
                "Rhino 8",
                "Python",
                "Kangaroo",
                "Computational Geometry",
                "Topology Optimization",
                "Parametric Modeling"
            ],
            keywords: [
                "参数化设计",
                "计算几何",
                "算法生成",
                "拓扑优化",
                "Grasshopper",
                "形态寻优",
                "数字建造"
            ]
        }
    }
];
