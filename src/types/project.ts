export interface ProjectData {
    id: number;
    title: string;
    year: string;
    category: string;
    color: string;
    imagePlaceholder: string;
    src: string;
    cardTitleLines?: string[];
    description?: string;
    content?: string;
    detailImages?: string[];
    template?: "gallery" | "bitcoin-story" | "bitcoin-monolith" | "swiss-case";
    caseStudy?: {
        eyebrow: string;
        headline: string;
        deck: string;
        accent: string;
        repoPath: string;
        metrics: Array<{
            label: string;
            value: string;
        }>;
        sections: Array<{
            kicker: string;
            title: string;
            body: string;
        }>;
        highlights: string[];
        stack: string[];
        keywords?: string[];
        imageFit?: "cover" | "contain";
    };
}
