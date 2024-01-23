"use client";

import React from "react";
import { Article_T } from "../[slug]/page";
export default function ArticleBar({ article }: { article: Article_T }) {
    const { title, cosine, bert, hf, content } = article;
    return (
        <details className="text-black p-2">
            <summary>
                {title}
                {`[${cosine.toFixed(2)}|${bert.toFixed(2)}|${hf.toFixed(2)}]`}
            </summary>
            <p>{content}</p>
        </details>
    );
}
