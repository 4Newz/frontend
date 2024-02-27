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
    let articles: articleCollection_T = JSON.parse(localStorage.getItem(key)!);
    if (articles) articles.push(article);
    else articles = [article];
    const stringifiedJson = JSON.stringify(articles);
    localStorage.setItem(key, stringifiedJson);
}
