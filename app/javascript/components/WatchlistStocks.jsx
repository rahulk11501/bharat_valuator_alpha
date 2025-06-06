import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function WatchlistStocks() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        fetch("/api/watchlists")
            .then(res => res.json())
            .then(data => setWatchlist(data))
            .catch(() => setWatchlist([]));
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">⭐ My Watchlist</h2>
            {watchlist.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Your watchlist is empty.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {watchlist.map(({ stock_symbol }) => (
                        <Link
                            to={`/stock/${stock_symbol}`}
                            key={stock_symbol}
                            className="flex flex-col justify-between rounded-lg bg-gray-50 dark:bg-gray-700 p-3 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out"
                            style={{ minHeight: "75px" }}
                        >
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{stock_symbol}</h3>
                            <span className="mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">View →</span>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
