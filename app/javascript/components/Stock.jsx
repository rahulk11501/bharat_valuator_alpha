import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { ThemeContext } from "../context/ThemeContext";
import axios from "../utils/axiosInstance";

const ranges = {
    "1M": 22,
    "3M": 66,
    "6M": 132,
    "1Y": 264,
    "5Y": 1320,
};

export default function Stock() {
    const { symbol } = useParams();
    const [data, setData] = useState(null);
    const [range, setRange] = useState("6M");
    const [watchlist, setWatchlist] = useState(false); // now a boolean
    const [message, setMessage] = useState(null);
    const { isDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        fetch(`/api/stocks/${symbol}?range=${range}`)
            .then((res) => res.json())
            .then((result) => {
                const labels = result.history.map((h) => h.date);
                const prices = result.history.map((h) => h.close);

                setData({
                    labels,
                    datasets: [
                        {
                            label: `${symbol} (${range})`,
                            data: prices,
                            borderColor: "rgb(75, 192, 192)",
                            tension: 0.1,
                        },
                    ],
                });

                setWatchlist(result.watchlist || false); // update boolean watchlist
            });
    }, [symbol, range]);

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

    const addToWatchlist = () => {
        axios.post("/api/watchlists", { stock_symbol: symbol })
            .then(() => {
                setWatchlist(true);
                showMessage("Added to watchlist!");
            })
            .catch((err) => {
                console.error(err);
                showMessage("Failed to add to watchlist.");
            });
    };

    const removeFromWatchlist = () => {
        axios.delete(`/api/watchlists/${symbol}`)
            .then(() => {
                setWatchlist(false);
                showMessage("Removed from watchlist.");
            })
            .catch((err) => {
                console.error(err);
                showMessage("Failed to remove from watchlist.");
            });
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-3xl font-semibold mb-6 text-center">Stock Chart for {symbol}</h1>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {Object.keys(ranges).map((r) => (
                        <button
                            key={r}
                            onClick={() => setRange(r)}
                            className={`px-4 py-2 rounded-md text-sm sm:text-base ${r === range ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} 
                transition-colors duration-300 ease-in-out hover:bg-blue-500`}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                {data ? (
                    <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
                        <Line data={data} />
                    </div>
                ) : (
                    <p className="text-center">Loading chart...</p>
                )}

                <div className="text-center mb-6">
                    {watchlist ? (
                        <button
                            onClick={removeFromWatchlist}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >
                            Remove from Watchlist
                        </button>
                    ) : (
                        <button
                            onClick={addToWatchlist}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                            Add to Watchlist
                        </button>
                    )}
                    {message && (
                        <p className={`mt-2 ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'}`}>
                            {message}
                        </p>
                    )}
                </div>

                <div className="text-center">
                    <Link to="/" className="text-blue-500 hover:underline">← Back</Link>
                </div>
            </div>
        </div>
    );
}
