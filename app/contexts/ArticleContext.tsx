import { modalEnum } from "@/components/Article/MainCard";
import {
    appendToLocalArticle,
    clearLocalArticles,
    readLocalArticles,
} from "@/lib/localStorage";
import React, { useContext, createContext, useState, useEffect } from "react";
import { articleCollection_T, article_T } from "../types/articles";

type ContextValue_T = {
    articles: articleCollection_T;
    setArticles: React.Dispatch<React.SetStateAction<articleCollection_T>>;
    modalState: modalEnum;
    handleAddArticle: () => void;
    handleClearNews: () => void;
    handleClose: () => void;
    clearNews: () => void;
    handleQuestionArticle: (article: article_T) => void;
    questionArticle: article_T | null;
    addArticle: (
        prompt: string,
        model: "gpt3.5" | "gemini"
    ) => Promise<boolean>;
};

const Context = createContext<ContextValue_T | null>(null);

export function useArticle() {
    return useContext(Context);
}

export default function ArticleContext({
    children,
}: {
    children: React.ReactNode;
}) {
    const [articles, setArticles] = useState<article_T[]>([]);
    const [questionArticle, setQuestionArticle] = useState<article_T | null>(
        null
    );
    const [modalState, setModalState] = useState<modalEnum>(modalEnum.closed);
    const handleAddArticle = () => setModalState(modalEnum.add_article);
    const handleClearNews = () => setModalState(modalEnum.clear_news);
    const handleClose = () => setModalState(modalEnum.closed);
    const handleQuestionArticle = (article: article_T) => {
        setQuestionArticle(article);
        setModalState(modalEnum.question_article);
    };
    const clearNews = () => {
        setArticles([]);
        clearLocalArticles();
    };

    useEffect(() => {
        setArticles(readLocalArticles());
    }, []);

    const addArticle = async (
        heading: string,
        model: "gpt3.5" | "gemini" = "gpt3.5"
    ) => {
        try {
            const response = await fetch("/api/article", {
                method: "POST",
                body: JSON.stringify({
                    heading,
                    model,
                }),
            });
            if (response.status !== 200) throw new Error("News Fetch Failed");
            const data = (await response.json()) as article_T;
            appendToLocalArticle(data);
            setArticles((articles) => [...articles, data]);
            return true;
        } catch (e) {
            console.log((e as Error).message);
            return false;
        }
    };

    return (
        <Context.Provider
            value={{
                articles,
                setArticles,
                modalState,
                handleAddArticle,
                handleClearNews,
                handleClose,
                clearNews,
                addArticle,
                handleQuestionArticle,
                questionArticle,
            }}
        >
            {children}
        </Context.Provider>
    );
}
