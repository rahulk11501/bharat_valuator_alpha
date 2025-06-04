import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function DarkModeToggle() {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
}
