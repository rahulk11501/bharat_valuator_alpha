import React from "react";
import { Link } from "react-router-dom";

export default function WatchlistStocks({ watchlist, isDarkMode }) {
    return (
        <>
            <h2 className="text-2xl font-bold mt-8 mb-4">My Watchlist</h2>
            <ul className="space-y-4">
                {watchlist.map(({ stock_symbol }) => (
                    <li key={stock_symbol} className={`p-4 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{stock_symbol}</p>
                            <Link to={`/stock/${stock_symbol}`} className="text-blue-500 hover:underline">
                                View Details
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
