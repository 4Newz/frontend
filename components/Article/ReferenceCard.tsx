import React from "react";

interface Props {
    url: string;
    image: string;
    heading: string;
    similarity: number;
}

function ReferenceCard({ url, image, heading, similarity }: Props) {
    const generateColor = () => {
        return `rgb(${Math.ceil((1 - similarity) * 255)},${Math.ceil(
            similarity * 255
        )},0)`;
    };

    return (
        <div className="flex gap-1 ">
            <img
                src={image}
                alt="Article Image"
                className="w-20 h-20 rounded-lg"
            />
            <div className="w-1 h-full bg-cream-100 bg-opacity-0" />
            <div className="flex flex-col justify-between">
                <a
                    href={url}
                    className="text-sm hover:underline leading-3"
                    target="_blank"
                >
                    {heading.slice(0, 70)}
                    {heading.length > 70 && "......"}
                </a>
                <span className="text-sm font-medium">
                    {url
                        .match(
                            /^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im
                        )
                        ?.at(1)}
                </span>
                <span
                    className="font-semibold w-full text-right"
                    style={{ color: generateColor() }}
                >
                    {similarity.toPrecision(1)}
                </span>
            </div>
        </div>
    );
}

export default ReferenceCard;
