export async function newsFetch(prompt: string) {
    let url =
        "https://newsapi.org/v2/everything?" +
        `q=${prompt}&` +
        "sortBy=popularity&" +
        "apiKey=" +
        process.env.NEWS_API_KEY;
    const response = await (await fetch(url, { method: "GET" })).json();
    return response;
}
