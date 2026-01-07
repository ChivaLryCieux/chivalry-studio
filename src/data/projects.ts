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
            "/images/projects/1/1-1.png",
            "/images/projects/1/1-2.png",
            "/images/projects/1/1-3.png",
            "/images/projects/1/1-4.png",
            "/images/projects/1/1-5.png"
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
            "/images/projects/2/2-1.png",
            "/images/projects/2/2-2.png",
            "/images/projects/2/2-3.png",
            "/images/projects/2/2-4.png",
            "/images/projects/2/2-5.png",
            "/images/projects/2/2-6.png",
            "/images/projects/2/2-7.png",
            "/images/projects/2/2-8.png",
            "/images/projects/2/2-9.png",
            "/images/projects/2/2-10.png",
            "/images/projects/2/2-11.png"
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

];