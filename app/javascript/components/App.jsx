import React from "react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function App() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">

            <BrowserRouter>
                {/* Place the toggle at the top, or wrap in a header if needed */}
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
