import { Source_T, article_T } from "@/app/types/articles";
import React, { ReactNode, useState } from "react";
import ReferenceSection from "./ReferenceSection";
import { Switch } from "@/components/ui/switch";
import Markdown from "markdown-to-jsx";

type Props_T = {
    article: article_T;
    gridArea: string;
};

type root_T = {
    similarity: number;
    source: Source_T;
    active?: boolean;
    content: string;
};

export default function Article({ article, gridArea }: Props_T) {
    const [active, setActive] = useState(false);
    const formatAritcle = () => {
        let index = 0;
        const sentences: string[] | ReactNode[] = article.content.split(".");
        const root: root_T[] = [];
        const mapping = article.reference.doc_sentence_map;

        console.log(active);

        while (index < sentences.length) {
            let content = "";
            do {
                content += sentences[index] + ".";
                index += 1;
            } while (mapping[index] === null);

            if (mapping[index])
                root.push({
                    similarity: mapping[index]?.similarity!,
                    source: article.reference.sources[mapping[index]?.source!],
                    active: active,
                    content: content,
                });
        }

        return (
            <>
                {root.map((section, index) => {
                    const { content, ...props } = section;
                    return (
                        <ReferenceSection
                            {...props}
                            key={`${props.source}${index}`}
                        >
                            {" "}
                            <Markdown>{content}</Markdown>
                        </ReferenceSection>
                    );
                })}
            </>
        );
    };

    return (
        <div className="flex flex-col gap-8" style={{ gridArea: gridArea }}>
            <h3 className="text-3xl font-franklin font-medium flex gap-2 items-center">
                {article.heading}
                <Switch
                    className="data-[state=checked]:!bg-brown-600 !bg-cream-100"
                    onClick={() => setActive(!active)}
                />
            </h3>

            <p className="overflow-auto scrollbar-hidden text-justify text-xl font-light">
                {formatAritcle()}
            </p>
        </div>
    );
}
