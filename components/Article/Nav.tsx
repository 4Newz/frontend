import { useArticle } from "@/app/contexts/ArticleContext";
import React from "react";
import { MdCancelPresentation } from "react-icons/md";
import { TbCirclePlus } from "react-icons/tb";

export default function Nav() {
    const commonBtnStyle =
        "bg-brown-600 font-light h-12 flex items-center p-2 gap-2  hover:brightness-90 active:scale-95";

    const { handleAddArticle, handleClearNews } = useArticle()!;

    return (
        <nav>
            <div className="w-full flex justify-between items-end">
                <h2 className="text-3xl">
                    {" "}
                    <i>AI</i> <span className="font-bold">NEWSPAPER</span>
                </h2>

                <div className="flex gap-2 text-green-50">
                    <button
                        className={commonBtnStyle + " rounded-full"}
                        onClick={handleAddArticle}
                    >
                        <TbCirclePlus size={33} /> Add Article
                    </button>
                    <button
                        className={commonBtnStyle + " rounded-lg"}
                        onClick={handleClearNews}
                    >
                        <MdCancelPresentation size={33} /> Clear News
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center pt-2">
                <div className="w-full h-[2px] bg-grey-100" />
                <div className="w-16 h-[2px] bg-grey-100" />
            </div>
        </nav>
    );
}
