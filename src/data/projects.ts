import type { ProjectData } from "@/types/project";

export const projects: ProjectData[] = [
    {
        id: 1,
        title: "Lilac-CLI",
        year: "2026",
        category: "TUI Agent",
        color: "#101010",
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
            stack: ["Bun", "TypeScript", "React", "Ink", "gray-matter", "ink-text-input", "ink-spinner", "OpenAI-compatible APIs"]
        }
    },
    {
        id: 2,
        title: "Solana Private Fork Economics",
        year: "2026",
        category: "Blockchain R&D",
        color: "#0e1110",
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
            stack: ["Rust", "Solana validator", "GenesisConfig", "Inflation", "Bank runtime", "RPC", "Shell automation", "cargo test"]
        }
    },
    {
        id: 3,
        title: "AI Fundamentals Pre",
        year: "2025",
        category: "AI Theories",
        color: "#4a2b22",
        imagePlaceholder: "HO",
        src: "/images/2.PNG",
        description: "About Schrodinger Bridge.",
        detailImages: [
            "/images/projects/2/2-1.PNG",
            "/images/projects/2/2-2.PNG",
            "/images/projects/2/2-3.PNG",
            "/images/projects/2/2-4.PNG",
            "/images/projects/2/2-5.PNG",
            "/images/projects/2/2-6.PNG",
            "/images/projects/2/2-7.PNG",
            "/images/projects/2/2-8.PNG",
            "/images/projects/2/2-9.PNG",
            "/images/projects/2/2-10.PNG",
            "/images/projects/2/2-11.PNG"
        ]
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
        cardTitleLines: ["中本聪", "Bitcoin", "共识生长"],
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
        cardTitleLines: ["中本聪", "Bitcoin", "3D 叙事"],
        description: "A 3D scrollytelling version of the Satoshi and Bitcoin data story, using R3F, custom shaders, particles, BTC modeling, price data, and tap-hold interactions.",
        template: "bitcoin-monolith"
    }
];
