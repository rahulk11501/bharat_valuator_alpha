import React from "react";
import { Link } from "react-router-dom";

export default function PopularStocks({ stocks, isDarkMode }) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Popular Stocks</h2>
            <ul className="space-y-4">
                {stocks.map(({ symbol, name }) => (
                    <li key={symbol} className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{name}</p>
                                <p className="text-sm text-gray-500">({symbol})</p>
                            </div>
                            <Link to={`/stock/${symbol}`} className="text-blue-500 hover:underline">
                                View Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
