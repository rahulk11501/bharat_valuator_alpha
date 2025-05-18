import React, { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage for theme preference
        const storedTheme = localStorage.getItem("theme");
        const darkModeStatus = localStorage.getItem("darkMode");

        // If theme is set to 'dark' and darkMode is not 'disabled', enable dark mode
        if (storedTheme === "dark" && darkModeStatus !== "disabled") {
            return true;
        }

        // Otherwise, use system preference
        return !storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        // Update the document class and localStorage whenever isDark state changes
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            localStorage.setItem("darkMode", "disabled");
        }
    }, [isDark]);

    return (
        <button
            onClick={() => setIsDark(!isDark)}
            className={`px-3 py-1 rounded transition-colors duration-200 
                ${isDark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
            {isDark ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
    );
}
