"use client";
import React from "react";

export default function BgCircle({
    background,
}: {
    background: `bg-${string}`;
}) {
    return (
        <div
            className={`w-full h-screen absolute overflow-hidden ${background}`}
        >
            <Circle
                radius="w-[1300px]"
                bg="bg-radial-brown"
                position="-bottom-1/2 -left-1/4"
            />
            <Circle
                radius="w-[1100px]"
                bg="bg-radial-brown"
                position="-top-1/2 -right-1/4"
            />
        </div>
    );
}

type Props_T = {
    radius: `w-${string}`;
    bg: `bg-${string}`;
    position: string;
};

function Circle({ radius, bg, position }: Props_T) {
    return (
        <div
            className={`${radius} ${bg} aspect-square rounded-full absolute ${position}`}
        />
    );
}
