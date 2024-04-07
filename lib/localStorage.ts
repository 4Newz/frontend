import { articleCollection_T, article_T } from "@/app/types/articles";

const key = "articles";

export function clearLocalArticles() {
    try {
        localStorage.setItem(key, "[]");
    } catch (e) {
        console.log("localStorage operation failed");
    }
}

export function readLocalArticles() {
    try {
        const articles: articleCollection_T = JSON.parse(
            localStorage.getItem(key)!
        );

        if (!articles) {
            clearLocalArticles();
            return [];
        }
        return articles;
    } catch (e) {
        console.log("localStorage operation failed");
    } finally {
        return [];
    }
}

export function appendToLocalArticle(article: article_T) {
    try {
        let articles: articleCollection_T = JSON.parse(
            localStorage.getItem(key)!
        );
        if (articles) articles.push(article);
        else articles = [article];
        const stringifiedJson = JSON.stringify(articles);
        localStorage.setItem(key, stringifiedJson);
    } catch (e) {
        console.log("localStorage operation failed");
    }
}
