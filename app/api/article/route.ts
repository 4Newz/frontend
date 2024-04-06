import { ReferenceData, article_T } from "@/app/types/articles";

type payload_T = {
    heading: string;
    model: string;
};

type response_T = {
    articles: article_T[];
    summary: string;
    reference: ReferenceData;
};

export async function POST(req: Request) {
    const payload: payload_T = await req.json();
    const url =
        process.env.BACKEND +
        `generate_article/?query=${payload.heading}&model=${payload.model}`;

    const response = await fetch(url, { method: "GET" });
    const data: response_T = await response.json();
    const result: article_T = {
        heading: payload.heading,
        content: data.summary,
        articles: data.articles,
        reference: data.reference,
    };

    return new Response(JSON.stringify(result), { status: 200 });
}
