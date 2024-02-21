import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "radial-brown":
                    "radial-gradient( rgba(175,105,92,1)  , rgba(175,105,92,0) 70% )",
            },
            colors: {
                "grey-100": "#EAEAEA",
                "cream-100": "#F9F4ED",
                "black-800": "#2A2A2A",
                "brown-600": "#AF695C",
                "white-25": "#FFFFFF40",
                "black-25": "#00000040",
            },
            fontFamily: {
                poppins: "var(--font-poppin)",
            },
        },
    },
    plugins: [],
};
export default config;
