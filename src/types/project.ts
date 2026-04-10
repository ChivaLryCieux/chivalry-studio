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
    template?: "gallery" | "bitcoin-story";
}
