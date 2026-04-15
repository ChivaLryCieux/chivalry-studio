import type { ProjectData } from "@/types/project";

export const projects: ProjectData[] = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
