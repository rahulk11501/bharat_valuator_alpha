import React from "react";
import { Link } from "react-router-dom";

export default function PopularStocks({ stocks }) {
    return (
        <>
            {stocks.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No popular stocks found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {stocks.map(({ symbol, name }) => (
                        <Link
                            to={`/stock/${symbol}`}
                            key={symbol}
                            className="flex flex-col justify-between rounded-lg bg-gray-50 dark:bg-gray-700 p-3 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out"
                            style={{ minHeight: "75px" }} // Reduced height
                        >
                            <div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-0.5">
                                    {name}
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-300">{symbol}</p>
                            </div>
                            <span className="mt-1 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                View →
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}
