import React, { createContext, useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Stock from "./Stock";
import DarkModeToggle from './DarkModeToggle';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Create a Context for dark mode
export const ThemeContext = createContext();

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for the current dark mode setting
        return localStorage.getItem("darkMode") === "enabled";
    });

    useEffect(() => {
        // Update localStorage and document class based on dark mode state
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "disabled");
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <AppContent />
        </ThemeContext.Provider>
    );
}

// AppContent component to use dark mode and routes
function AppContent() {
    const { isDarkMode } = useContext(ThemeContext); // Get dark mode value from context

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
            <BrowserRouter>
                {/* Dark mode toggle button */}
                <div className="p-4 flex justify-end">
                    <DarkModeToggle />
                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/stock/:symbol" element={<Stock />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
