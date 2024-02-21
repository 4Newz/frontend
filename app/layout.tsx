import type { Metadata } from "next";
import { Fira_Code, Libre_Franklin, Poppins } from "next/font/google";
import "./globals.css";

const inter = Fira_Code({
    subsets: ["latin"],
    weight: "400",
});

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-poppin",
    subsets: ["latin"],
});

const franklin = Libre_Franklin({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-franklin",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI.News",
    description:
        "AI based article generator to create your very own personalized newspaper.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} ${franklin.variable}`}>
                {children}
            </body>
        </html>
    );
}
