import React from "react";
import Nav from "./Nav";
import ArticleSection from "./ArticleSection";

export default function MainCard() {
    return (
        <main className="min-h-screen p-16 h-0 font-poppins">
            <div className="w-full h-full rounded-3xl bg-white-25 backdrop-blur-2xl shadow-2xl p-8">
                <Nav />
                <ArticleSection />
            </div>
        </main>
    );
}
