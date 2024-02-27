import { formatString } from "@/lib/formatter";
import React from "react";
import ArticleBar from "../ArticleBar";

type Props_T = { params: { slug: string } };
export type Article_T = {
    title: string;
    cosine: number;
    bert: number;
    hf: number;
    content: string;
};
export default async function Home({ params }: Props_T) {
    const articles: Article_T[] = await (
        await fetch(`http://localhost:3000/api/newsFetch`, {
            method: "POST",
            body: JSON.stringify({ prompt: params.slug, size: 10 }),
        })
    ).json();
    return (
        <main className="flex bg-red-400 min-h-screen flex-col items-center justify-between p-24">
            <p className="text-4xl text-black">{"prompt"}</p>
            <ul className="list-disc list-inside w-3/5">
                {articles?.map((article, i) => (
                    <ArticleBar article={article} key={`article${i}`} />
                ))}
            </ul>
        </main>
    );
}
