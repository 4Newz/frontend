"use client";
import React, { useState } from "react";
import Nav from "./Nav";
import ArticleSection from "./ArticleSection";
import Modal from "../Modal";
import { useArticle } from "@/app/contexts/ArticleContext";

export enum modalEnum {
    closed,
    add_article,
    clear_news,
}

export default function MainCard() {
    // const [modalState, setModalState] = useState<modalEnum>(modalEnum.closed);
    // // const handleAddArticle = () => setModalState(modalEnum.add_article);
    // // const handleClearNews = () => setModalState(modalEnum.clear_news);

    const { handleAddArticle, handleClearNews, handleClose } = useArticle()!;

    return (
        <main className="min-h-screen p-16 h-0 font-poppins">
            <div className="w-full h-full rounded-3xl bg-white-25 backdrop-blur-2xl shadow-2xl p-8">
                <Nav />
                <ArticleSection />
                <Modal />
            </div>
        </main>
    );
}
