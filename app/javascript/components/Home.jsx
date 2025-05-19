import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from './App';
import StockSearch from "./StockSearch";

export default function Home() {
    const { isDarkMode } = useContext(ThemeContext);
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch("/api/stocks")
            .then((res) => res.json())
            .then(setStocks);
    }, []);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-4xl font-semibold mb-6 text-center">Popular Stocks</h1>

                {/* Stock Search Box */}
                <StockSearch /> {/* 👈 injected search component */}

                <ul className="space-y-4">
                    {stocks.map(({ symbol, name }) => (
                        <li key={symbol}
                            className={`flex justify-between items-center p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{name}</span>
                                <span className="text-sm text-gray-500">({symbol})</span>
                            </div>
                            <Link
                                to={`/stock/${symbol}`}
                                className="text-blue-500 hover:underline"
                            >
                                View Details
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
