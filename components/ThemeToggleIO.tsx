"use client";
import { useEffect, useState } from "react";

export default function ThemeToggleIO({ className = "" }: { className?: string }) {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        const saved = localStorage.getItem("theme") as "dark" | "light" | null;

        if (saved) {
            setTheme(saved);
            document.documentElement.setAttribute("data-theme", saved);
        } else {
            const prefersLight = window.matchMedia(
                "(prefers-color-scheme: light)"
            ).matches;

            const initial = prefersLight ? "light" : "dark";

            setTheme(initial);
            document.documentElement.setAttribute("data-theme", initial);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";

        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`flex items-center justify-center w-9 h-9 rounded-lg border transition-all hover:scale-105 ${className}`}
            style={{
                borderColor: "var(--border)",
                background: "var(--surface-2)",
                color: "var(--text-primary)",
            }}
        >
            {theme === "dark" ? "🌞" : "🌙"}
        </button>
    );
}
