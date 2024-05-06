import { useArticle } from "@/app/contexts/ArticleContext";
import { refreshTemplate } from "@/lib/gridTemplate";
import React, { useEffect, useMemo, useState } from "react";
import Article from "./Article";
import { templateConfig_T } from "@/app/types/articles";

export default function ArticleSection() {
    const rowHeight = 300;
    const columWidth = "25%";
    const { articles } = useArticle()!;
    const [templateConfig, setTemplateConfig] = useState<templateConfig_T>({
        gridTemplateArea: "",
        areas: [],
        availableSpace: 0,
    });
    const renderedData = useMemo(
        () => (
            <>
                {articles.map((article, index) => (
                    <Article
                        gridArea={templateConfig.areas[index]}
                        article={article}
                        key={index}
                    />
                ))}
            </>
        ),
        [articles]
    );

    useEffect(() => {
        if (templateConfig.availableSpace > articles.length) return;
        setTemplateConfig(refreshTemplate(articles, templateConfig));
    }, [articles]);

    return (
        <section
            className="w-full h-full overflow-auto scrollbar-hidden grid gap-8"
            style={{
                gridAutoRows: rowHeight,
                // gridTemplateAreas: templateConfig.gridTemplateArea,
            }}
        >
            {renderedData}
        </section>
    );
}
