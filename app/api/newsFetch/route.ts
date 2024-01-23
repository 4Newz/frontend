import { newsFetch } from "@/lib/newsFetch";
import { similarity } from "@/lib/similarity";

export async function GET(req: Request) {
    try {
    } catch (err) {
        console.log(err);
    }
    const prompt = new URLSearchParams(req.url).get("prompt");

    // let url =
    //     "https://newsapi.org/v2/everything?" +
    //     `q=${prompt2}&` +
    //     "sortBy=popularity&" +
    //     "apiKey=" +
    //     process.env.NEWS_API_KEY;
    // const response = await fetch(url, { method: "GET" });
    // const data = await response.json();
    if (!prompt) return new Response(`{"error":"Failed"}`, { status: 400 });
    const data = await newsFetch(prompt);
    return new Response(JSON.stringify(data));
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const prompt = body.prompt;
        const size = body.size;
        var url =
            "https://newsapi.org/v2/everything?" +
            `q=${prompt}&` +
            "sortBy=popularity&" +
            "apiKey=" +
            process.env.NEWS_API_KEY;
        const response = await fetch(url, { method: "GET" });
        const data = (await response.json()).articles.slice(0, size);
        const similarityIndex = await similarity(
            prompt,
            data.map((value: any) => value.description.slice(0, 25))
        );
        const result = data.map((value, index) => ({
            ...value,
            ...similarityIndex[index],
        }));
        return new Response(JSON.stringify(result));
    } catch (err) {
        return new Response(`{"error":"${err}"}`, { status: 400 });
    }
}
