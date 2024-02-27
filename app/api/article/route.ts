import { newsFetch } from "@/lib/newsFetch";

type payload_T = {
    heading: string;
    model: string;
    articles?: articleCollection_T;
};

type response_T = {
    prompt: string;
    news_articles: article_T[];
    summary: string;
};

export async function POST(req: Request) {
    const payload: payload_T = await req.json();
    const url =
        process.env.BACKEND +
        `kamisama_tasukete/?query=${payload.heading}&model=${payload.model}`;

    const response = await fetch(url, {
        method: "GET",
        // body: JSON.stringify(payload),
        // headers: {
        //     "Content-type": "application/json",
        // },
    });
    const data: response_T = await response.json();
    // let news = await newsFetch(payload.heading);
    // news = news.slice(0, 5).map((news_singular: any) => ({
    //     heading: news_singular.title,
    //     content: news_singular.content,
    //     date: news_singular.publishedAt,
    // }));
    // const url = process.env.BACKEND + "summarize";
    // const response = await fetch(url, {
    //     headers: {
    //         "Content-type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //         prompt: payload.heading,
    //         news_articles: news,
    //     }),
    // });
    // const data = await response.json();
    return new Response(
        JSON.stringify({ heading: payload.heading, content: data.summary }),
        { status: 200 }
    );
}
