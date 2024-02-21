"use client";
import { useArticle } from "@/app/contexts/ArticleContext";
import React, { useEffect, useRef, useState } from "react";
import { modalEnum } from "./Article/MainCard";
import { Oval } from "react-loader-spinner";

type Props_T = {};

export default function Modal() {
    const { modalState, handleClose, clearNews, addArticle } = useArticle()!;
    const [renderedData, setRenderedData] = useState(<></>);
    const [shake, setShake] = useState(false);
    const [loading, setLoading] = useState(false);
    const promptRef = useRef<HTMLInputElement>(null);

    const handleConfirm = async () => {
        if (modalState === modalEnum.add_article) {
            const prompt = promptRef.current?.value;
            if (!prompt) {
                setShake(true);
                setTimeout(() => setShake(false), 1500);
            } else {
                setLoading(true);
                try {
                    await addArticle(prompt);
                    handleClose();
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            }
        } else if (modalState === modalEnum.clear_news) clearNews();
    };

    useEffect(() => {
        const renderContent = () => {
            if (modalState === modalEnum.clear_news)
                return (
                    <div>
                        <h3 className="font-bold text-2xl w-full text-center  text-black-800 ">
                            Clear Newspaper
                        </h3>
                        <p className="py-4">
                            Clearing this newspaper will permanently delete it.
                            Are you sure you want to continue?
                        </p>
                    </div>
                );
            else if (modalState === modalEnum.add_article)
                return (
                    <div>
                        <h3 className="font-bold text-2xl w-full text-center  text-black-800 ">
                            Enter a prompt heading{shake}
                        </h3>
                        <div className="py-4">
                            <input
                                type="text"
                                name="prompt"
                                className={`w-full bg-cream-100 rounded-md p-2`}
                                ref={promptRef}
                            />
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
                className={`bg-brown-600 bg-opacity-70 backdrop-blur-3xl rounded-3xl max-w-[32rem] h-fit dropInOut p-8 ${
                    modalState !== modalEnum.closed ? "animActive" : ""
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {renderedData}
                <div className="flex gap-2 justify-center ">
                    {[
                        { label: "Confirm", onClick: handleConfirm },
                        { label: "Cancel", onClick: handleClose },
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
