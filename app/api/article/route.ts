export async function POST(req: Request) {
    const payload = await req.json();
    const url = process.env.BACKEND + "article/";
    console.log(JSON.stringify(payload));
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-type": "application/json",
        },
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
}
