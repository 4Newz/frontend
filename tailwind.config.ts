import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
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
                franklin: "var(--font-franklin)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
