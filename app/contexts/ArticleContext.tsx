import { modalEnum } from "@/components/Article/MainCard";
import React, { useContext, createContext, useState } from "react";

type ContextValue_T = {
    articles: articleCollection_T;
    setArticles: React.Dispatch<React.SetStateAction<articleCollection_T>>;
    modalState: modalEnum;
    handleAddArticle: () => void;
    handleClearNews: () => void;
    handleClose: () => void;
    clearNews: () => void;
    addArticle: (prompt: string) => Promise<boolean>;
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
    const [articles, setArticles] = useState<articleCollection_T>([]);
    const [modalState, setModalState] = useState<modalEnum>(modalEnum.closed);
    const handleAddArticle = () => setModalState(modalEnum.add_article);
    const handleClearNews = () => setModalState(modalEnum.clear_news);
    const handleClose = () => setModalState(modalEnum.closed);
    const clearNews = () => {
        setArticles([]);
    };
    const addArticle = async (heading: string) => {
        await new Promise((res) => setTimeout(res, 3000));
        return true;
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
            }}
        >
            {children}
        </Context.Provider>
    );
}
