import React, { useContext } from "react";
import { ThemeContext } from './App'; // Import the ThemeContext from App.jsx

export default function DarkModeToggle() {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext); // Get context values

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)} // Toggle dark mode
            className={`px-3 py-1 rounded transition-colors duration-200 
                ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
        >
            {isDarkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
    );
}
