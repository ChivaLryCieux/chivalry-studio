// src/data/projects.ts

export interface ProjectData {
    id: number;
    title: string;
    year: string;
    category: string;
    color: string;
    imagePlaceholder: string;
    src: string;
    description?: string;
    content?: string;
    detailImages?: string[]; // ✅ 详情页专用图片数组
}

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

];