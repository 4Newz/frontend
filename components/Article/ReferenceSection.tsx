import React, { ReactNode } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Source_T } from "@/app/types/articles";
import ReferenceCard from "./ReferenceCard";
interface Props {
    children?: ReactNode;
    similarity: number;
    active?: boolean;
    source: Source_T;
}

function ReferenceSection({ children, similarity, source, active }: Props) {
    return (
        <HoverCard {...(!active && { open: false })}>
            <HoverCardTrigger>
                <span
                    className={`${
                        active &&
                        (similarity > 0.5
                            ? "hover:bg-green-100"
                            : "hover:bg-red-300")
                    }`}
                >
                    {children}
                </span>
            </HoverCardTrigger>
            <HoverCardContent className="bg-brown-600 bg-opacity-70 border-none w-fit max-w-[24rem] h-fit">
                <ReferenceCard {...{ similarity, ...source }} />
            </HoverCardContent>
        </HoverCard>
    );
}

export default ReferenceSection;
