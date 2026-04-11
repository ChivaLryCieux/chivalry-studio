import type { ProjectData } from "@/types/project";

export const projects: ProjectData[] = [
    {
        id: 1,
        title: "Arknights User Research",
        year: "2026",
        category: "UX Design",
        color: "#3e1c1c",
        imagePlaceholder: "CP",
        src: "/images/1.png",
        description: "An analysis of the user ecosystem and user stickiness based on cluster analysis and Markov chain modeling.",
        // 详情图
        detailImages: [
            "/images/projects/1/1-1.PNG",
            "/images/projects/1/1-2.PNG",
            "/images/projects/1/1-3.PNG",
            "/images/projects/1/1-4.PNG",
            "/images/projects/1/1-5.PNG"
        ]
    },
    {
        id: 2,
        title: "AI Fundamentals Pre",
        year: "2025",
        category: "AI Theories",
        color: "#4a2b22",
        imagePlaceholder: "HO",
        src: "/images/2.PNG",
        description: "About Schrödinger Bridge.",
        // 详情图
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
        id: 3,
        title: "Conference VI Design",
        year: "2025",
        category: "VI Design",
        color: "#572f27",
        imagePlaceholder: "NV",
        src: "/images/3.jpg"
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
        title: "Satoshi Monolith——莫比乌斯漫画式比特币数据叙事",
        year: "2026",
        category: "3D Data Story",
        color: "#2a0d0a",
        imagePlaceholder: "BTC",
        src: "/images/bitcoin-monolith-preview.svg",
        cardTitleLines: ["Satoshi", "Monolith", "BTC"],
        description: "A bold R3F scroll narrative remixing Satoshi, Bitcoin price data, particle systems, custom shaders, a BTC model, and tap-hold interactions.",
        template: "bitcoin-monolith"
    },

];
