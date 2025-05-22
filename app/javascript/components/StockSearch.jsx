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
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleSelect = (symbol) => {
        setQuery("");
        setResults([]);
        setShowSuggestions(false);
        navigate(`/stock/${symbol}`);
    };

    return (
        <div className="relative flex justify-center">
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                }}
                placeholder="Search Indian stocks (e.g., INFY, RELIANCE)"
                className={`w-full max-w-xl rounded-full px-6 py-3 border shadow-sm focus:outline-none focus:ring-2 transition duration-300 ease-in-out
                    ${isDarkMode
                        ? "bg-gray-800 text-white border-gray-700 focus:ring-blue-400"
                        : "bg-white text-black border-gray-300 focus:ring-blue-500"
                    }`}
            />

            {showSuggestions && results.length > 0 && (
                <ul className="absolute z-50 w-full max-w-xl mt-2 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-xl shadow-lg">
                    {results.map((match, idx) => (
                        <li
                            key={idx}
                            onClick={() => handleSelect(match["1. symbol"])}
                            className={`px-4 py-3 cursor-pointer transition-colors duration-200 hover:bg-indigo-100 dark:hover:bg-gray-700 ${isDarkMode ? "text-white" : "text-black"}`}
                        >
                            <div className="font-medium truncate">{match["2. name"]}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                ({match["1. symbol"]} - {match["4. region"]})
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
