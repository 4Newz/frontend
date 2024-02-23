const key = "articles";

export function clearLocalArticles() {
    localStorage.setItem(key, "[]");
}

export function readLocalArticles() {
    const articles: articleCollection_T = JSON.parse(
        localStorage.getItem(key)!
    );
    return articles;
}

export function appendToLocalArticle(article: article_T) {
    const articles: articleCollection_T = JSON.parse(
        localStorage.getItem(key)!
    );
    articles.push(article);
    const stringifiedJson = JSON.stringify(articles);
    localStorage.setItem(key, stringifiedJson);
}
