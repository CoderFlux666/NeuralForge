/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#ffffff", // Pure White
                foreground: "#0f172a", // Slate-900
                muted: "#f8fafc", // Slate-50
                "muted-foreground": "#64748b", // Slate-500
                border: "#e2e8f0", // Slate-200
                input: "#e2e8f0",
                primary: {
                    DEFAULT: "#6366f1", // Indigo-500
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#f1f5f9", // Slate-100
                    foreground: "#0f172a",
                },
                accent: {
                    DEFAULT: "#f8fafc",
                    foreground: "#0f172a",
                },
                brand: {
                    start: "#6366f1", // Indigo-500
                    end: "#a855f7",   // Purple-500
                }
            },
            fontFamily: {
                sans: ['"Inter"', '"Geist Sans"', 'sans-serif'],
            },
            animation: {
                "orbit": "orbit 20s linear infinite",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                orbit: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
