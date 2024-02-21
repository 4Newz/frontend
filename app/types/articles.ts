interface article_T {
    heading: string;
    content: string;
}

type articleCollection_T = article_T[];

type templateConfig_T = {
    gridTemplateArea: string;
    areas: string[];
    availableSpace: number;
};
