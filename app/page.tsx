"use client";
import BgCircle from "@/components/BgCircle";
import MainCard from "@/components/Article/MainCard";
import ArticleContext from "./contexts/ArticleContext";

export default function Home() {
    return (
        <>
            <BgCircle background="bg-cream-100" />
            <ArticleContext>
                <MainCard />
            </ArticleContext>
        </>
    );
}
