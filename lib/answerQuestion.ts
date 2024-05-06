export const answerQuestion = async (question: string, paragraph: string) => {
    try {
        const response = await fetch("/api/question", {
            method: "POST",
            body: JSON.stringify({
                question,
                paragraph,
            }),
        });
        if (response.status !== 200) throw new Error("News Answering Failed");
        const result = await response.json();
        return result.result;
    } catch (e) {
        console.log((e as Error).message);
        return false;
    }
};
