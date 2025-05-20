import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./App";

export default function StockSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.trim()) {
                fetch(`/api/stocks/search?query=${encodeURIComponent(query)}`)
                    .then(res => res.json())
                    .then(data => setResults(data.bestMatches || []));
            } else {
                setResults([]);
            }
        }, 300); // Debounce input

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSelect = (symbol) => {
        setQuery(""); // Clear input
        setResults([]);
        setShowSuggestions(false);
        navigate(`/stock/${symbol}`);
    };

    return (
        <div className="mb-10 relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">Search Stocks</h2>

            <div className="flex justify-center mb-2 relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                    }}
                    placeholder="e.g., TCS, INFY, RELIANCE"
                    className={`border rounded px-4 py-2 w-full max-w-md transition-colors ${isDarkMode
                        ? "bg-gray-800 text-white border-gray-700"
                        : "bg-white text-black border-gray-300"
                        }`}
                />
            </div>

            {showSuggestions && results.length > 0 && (
                <ul className="absolute z-50 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded w-full max-w-md mx-auto mt-1 shadow-lg">
                    {results.map((match, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleSelect(match["1. symbol"])}
                            className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 dark:hover:bg-gray-700 ${isDarkMode ? "text-white" : "text-black"}`}
                        >
                            <div className="font-medium">{match["2. name"]}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">({match["1. symbol"]} - {match["4. region"]})</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
