export interface article_T {
    heading: string;
    content: string;
    articles: articleCollection_T;
    reference: ReferenceData;
}

export interface Source_T {
    url: string;
    image: string;
    heading: string;
}
export interface ReferenceData {
    doc_sentence_map: ({ similarity: number; source: number } | null)[];
    sources: Source_T[];
}

export type articleCollection_T = article_T[];

export type templateConfig_T = {
    gridTemplateArea: string;
    areas: string[];
    availableSpace: number;
};
