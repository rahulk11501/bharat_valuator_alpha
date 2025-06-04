// app/javascript/components/AppContent.jsx
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import Home from "./Home";
import Stock from "./Stock";
import Navbar from "./Navbar";
import DarkModeToggle from "./DarkModeToggle";

function AppContent() {
    const { isDarkMode } = useContext(ThemeContext);

    const currentUserMeta = document.querySelector('meta[name="current-user"]');
    const currentUser = currentUserMeta ? JSON.parse(currentUserMeta.content) : {};

    return (
        <div
            className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                } transition-colors`}
        >
            <BrowserRouter>
                {currentUser?.email && <Navbar currentUser={currentUser} />}
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

export default AppContent;
