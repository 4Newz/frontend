"use client";
import { useArticle } from "@/app/contexts/ArticleContext";
import React, { useEffect, useRef, useState } from "react";
import { modalEnum } from "./Article/MainCard";
import { Oval } from "react-loader-spinner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props_T = {};

export default function Modal() {
    const { modalState, handleClose, clearNews, addArticle } = useArticle()!;
    const [renderedData, setRenderedData] = useState(<></>);
    const [shake, setShake] = useState(false);
    const [loading, setLoading] = useState(false);
    const promptRef = useRef<HTMLInputElement>(null);
    const [model, setModel] = useState<"gpt3.5" | "gemini">("gpt3.5");

    const handleSelectChange = (value: "gpt3.5" | "gemini") => {
        setModel(value);
    };

    const handleConfirm = async () => {
        if (modalState === modalEnum.add_article) {
            const prompt = promptRef.current?.value;
            if (!prompt) {
                setShake(true);
                setTimeout(() => setShake(false), 1500);
            } else {
                setLoading(true);
                try {
                    await addArticle(prompt, model);
                    handleClose();
                } catch (e) {
                    console.log(e);
                } finally {
                    setTimeout(() => {
                        promptRef.current!.value = "";
                    }, 1500);
                }
                setLoading(false);
            }
        } else if (modalState === modalEnum.clear_news) {
            clearNews();
            handleClose();
        }
    };

    const renderSelect = () => (
        <Select defaultValue="gpt3.5" onValueChange={handleSelectChange}>
            <SelectTrigger
                className="bg-cream-100 focus:!outline-none max-w-[160px]"
                style={{ boxShadow: "none" }}
            >
                <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent className="bg-cream-100 ">
                <SelectGroup>
                    <SelectItem
                        value="gpt3.5"
                        className="focus:bg-brown-600 focus:bg-opacity-30"
                    >
                        GPT3.5
                    </SelectItem>
                    <SelectItem
                        value="gemini"
                        className="focus:bg-brown-600 focus:bg-opacity-30"
                    >
                        Gemini
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );

    useEffect(() => {
        const renderContent = () => {
            if (modalState === modalEnum.clear_news)
                return (
                    <div>
                        <h3 className="font-bold text-2xl w-full text-center  text-black-800 ">
                            Clear Newspaper
                        </h3>
                        <p className="py-4 max-w-sm text-center">
                            Clearing this newspaper will permanently delete it.
                            Are you sure you want to continue?
                        </p>
                    </div>
                );
            else if (modalState === modalEnum.add_article)
                return (
                    <div>
                        <h3 className="font-bold text-2xl w-full text-center  text-black-800 ">
                            Enter a prompt heading
                        </h3>
                        <div className="py-4 flex gap-2">
                            <input
                                type="text"
                                name="prompt"
                                className={`w-full bg-cream-100 rounded-md p-2 `}
                                ref={promptRef}
                            />
                            {renderSelect()}
                        </div>
                    </div>
                );
            return <div></div>;
        };
        if (modalState === modalEnum.closed) return;
        setRenderedData(renderContent());
    }, [modalState]);

    return (
        <div
            className={`w-full h-full fixed top-0 left-0 fadeInOut flex justify-center p-16 ${
                modalState !== modalEnum.closed ? "animActive" : ""
            } ${shake ? "shakeInput" : ""}`}
            onClick={handleClose}
        >
            <div
                className={`w-full max-w-xl bg-brown-600 bg-opacity-70 backdrop-blur-3xl rounded-3xl  h-fit dropInOut p-8 ${
                    modalState !== modalEnum.closed ? "animActive" : ""
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {renderedData}
                <div className="flex gap-2 justify-center ">
                    {[
                        { label: "Cancel", onClick: handleClose },
                        { label: "Confirm", onClick: handleConfirm },
                    ].map((btn) => (
                        <button
                            disabled={loading}
                            key={btn.label}
                            onClick={btn.onClick}
                            className="px-4 py-2 bg-cream-100 rounded-3xl hover:brightness-90 active:scale-95 flex-1 max-w-[6rem] disabled:brightness-50"
                        >
                            {loading && btn.label === "Confirm" ? (
                                <div className="flex justify-center w-full">
                                    <Oval
                                        visible={true}
                                        height="24"
                                        width="24"
                                        color="#2A2A2A"
                                        ariaLabel="oval-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        secondaryColor="#AF695C"
                                    />
                                </div>
                            ) : (
                                btn.label
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
