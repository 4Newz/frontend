"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { formatString } from "@/lib/formatter";

export default function PromptForm() {
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // @ts-ignore
        const fStr = formatString(e.target.prompt.value, true);
        router.push("/news/" + fStr);
    };

    // const [input, setInput] = useState("");
    // const clickHandler = async () => {
    //   localStorage.setItem("prompt", input);
    //   const response = await fetch("/api/newsFetch?prompt=" + input, {
    //     method: "GET",
    //   });
    //   const data = await response.json();
    //   console.log(data);
    //   localStorage.setItem("news", JSON.stringify(data));
    //   router.push("/news/");
    // };
    return (
        <form
            onSubmit={handleSubmit}
            className="grow flex gap-4 w-full rounded-xl items-center justify-center"
        >
            <input
                type="text"
                name="prompt"
                placeholder="Enter a prompt"
                className="w-80 text-lg p-4 rounded-md outline-none text-black"
            />
            <button
                type="submit"
                className="bg-red-500 h-fit w-fit border-white rounded-md p-4 px-6 text-lg italic"
            >
                Fetch News!
            </button>
        </form>
    );
}
