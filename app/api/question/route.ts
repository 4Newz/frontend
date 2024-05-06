import { ReferenceData, article_T } from "@/app/types/articles";

type payload_T = {
    question: string;
    paragraph: string;
};

export async function POST(req: Request) {
    const payload: payload_T = await req.json();
    const url = process.env.BACKEND + `ask_question`;
    const request = {
        question: payload.question,
        paragraph: payload.paragraph,
    };
    console.log(request);
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await response.json();
    console.log(result);
    try {
        return new Response(JSON.stringify({ result }), { status: 200 });
    } catch (err) {
        console.log(err);
        return new Response(JSON.stringify({ error: err }), { status: 500 });
    }
}
