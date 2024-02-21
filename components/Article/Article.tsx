import React from "react";

type Props_T = {
    article: article_T;
    gridArea: string;
};

export default function Article({ article, gridArea }: Props_T) {
    const firstLetter = article.content.slice(0, 1);
    const remainingContent = article.content.slice(1);
    return (
        <div className="flex flex-col gap-8" style={{ gridArea: gridArea }}>
            <h3 className="text-3xl font-franklin font-medium">
                {article.heading}
            </h3>

            <p className="overflow-auto scrollbar-hidden text-justify text-xl font-light">
                <b className="font-bold text-2xl">{firstLetter}</b>
                {remainingContent}
            </p>
        </div>
    );
}
