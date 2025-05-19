// components/StockSearch.jsx
import React, { useState, useContext } from "react";
import { ThemeContext } from "./App";

export default function StockSearch() {
    console.log("StockSearch component loaded");

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const { isDarkMode } = useContext(ThemeContext);

    const handleSearch = async () => {
        if (!query.trim()) return;

        const response = await fetch(`/api/stocks/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.bestMatches || []);
    };

    return (
        <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-center">Search Stocks</h2>

            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., TCS, INFY, RELIANCE"
                    className={`border rounded px-4 py-2 w-full max-w-md transition-colors ${isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
                        }`}
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                    Search
                </button>
            </div>

            {results.length > 0 && (
                <ul className="max-w-2xl mx-auto space-y-3">
                    {results.map((match, idx) => (
                        <li
                            key={idx}
                            className={`p-4 rounded shadow-md transition ${isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
                                }`}
                        >
                            <div className="font-semibold">{match["2. name"]}</div>
                            <div className="text-sm text-gray-500">Symbol: {match["1. symbol"]}</div>
                            <div className="text-sm text-gray-500">Region: {match["4. region"]}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
