export async function similarity(prompt: string, paragraphs: string[]) {
    try {
        const request = {
            prompt: prompt,
            articles: paragraphs.map((para) => ({
                heading: "heading",
                content: para,
            })),
        };
        const url = process.env.BACKEND + "similarity/";

        const data = await (
            await fetch(url, {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    "Content-type": "application/json",
                },
            })
        ).json();

        return data.data;
    } catch (err) {
        console.log(err);
    }
}
