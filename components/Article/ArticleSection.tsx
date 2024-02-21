import { useArticle } from "@/app/contexts/ArticleContext";
import { refreshTemplate } from "@/lib/gridTemplate";
import React, { useEffect, useMemo, useState } from "react";

export default function ArticleSection() {
    const rowHeight = 300;
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
                    <div
                        key={index}
                        className="flex flex-col"
                        style={{ gridArea: templateConfig.areas[index] }}
                    >
                        <h3>{article.heading}</h3>
                        <p>{article.content}</p>
                    </div>
                ))}
            </>
        ),
        [articles]
    );

    useEffect(() => {
        if (templateConfig.availableSpace > articles.length) return;
        setTemplateConfig(refreshTemplate(articles, templateConfig));
    }, [articles]);

    console.log(templateConfig.gridTemplateArea);

    return (
        <section
            className="w-full h-full overflow-auto grid"
            style={{
                gridAutoRows: rowHeight,
                gridTemplateAreas: templateConfig.gridTemplateArea,
            }}
        >
            {renderedData}
        </section>
    );
}
