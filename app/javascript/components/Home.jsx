import React, { useEffect, useState } from "react";
import StockSearch from "./StockSearch";
import PopularStocks from "./PopularStocks";
import WatchlistStocks from "./WatchlistStocks";
import ValuationModelForm from "./ValuationModelForm";
import ValuationModelSelector from "./ValuationModelSelector";
import EvaluateAllStocks from "./EvaluateAllStocks";

export default function Home() {
    const [popularStocks, setPopularStocks] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE.BSE");
    const [openStep, setOpenStep] = useState(null);

    useEffect(() => {
        fetch("/api/stocks")
            .then((res) => res.json())
            .then((data) => setPopularStocks(data))
            .catch(() => setPopularStocks([]));

        fetch("/api/watchlists")
            .then((res) => res.json())
            .then((data) => setWatchlist(data))
            .catch(() => setWatchlist([]));
    }, []);

    function toggleStep(step) {
        setOpenStep(openStep === step ? null : step);
    }

    return (
        <main className="max-w-6xl mx-auto p-4 space-y-10 min-h-screen">
            {/* Modern Search Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition duration-300">
                <div className="transition-all duration-300 ease-in-out hover:scale-[1.01]">
                    <StockSearch onSelect={setSelectedSymbol} />
                </div>
            </section>

            {/* Popular Stocks Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    📈 Popular Stocks
                </h2>
                <PopularStocks stocks={popularStocks} />
            </section>

            {/* Watchlist Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    ⭐ My Watchlist
                </h2>
                <WatchlistStocks watchlist={watchlist} />
            </section>

            {/* Valuation Tool Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition divide-y divide-gray-200 dark:divide-gray-800">
                <h2 className="text-2xl font-bold p-6 text-gray-900 dark:text-white">
                    🧮 Valuation Tool
                </h2>

                {/* Accordion Step 1 */}
                <button
                    onClick={() => toggleStep("custom")}
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                        ✏️ Create Custom Valuation Model
                    </span>
                    <span className="text-2xl text-gray-400 dark:text-gray-300">
                        {openStep === "custom" ? "−" : "+"}
                    </span>
                </button>
                {openStep === "custom" && (
                    <div className="p-6 pt-0 transition-all duration-300">
                        <ValuationModelForm />
                    </div>
                )}

                {/* Accordion Step 2 */}
                <button
                    onClick={() => toggleStep("select")}
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                        📊 Select Model & Evaluate Stock
                    </span>
                    <span className="text-2xl text-gray-400 dark:text-gray-300">
                        {openStep === "select" ? "−" : "+"}
                    </span>
                </button>
                {openStep === "select" && (
                    <div className="p-6 pt-0 transition-all duration-300">
                        <ValuationModelSelector selectedSymbol={selectedSymbol} />
                    </div>
                )}

                {/* Accordion Step 3 */}
                <button
                    onClick={() => toggleStep("evaluate")}
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                        🧠 Evaluate All Stocks
                    </span>
                    <span className="text-2xl text-gray-400 dark:text-gray-300">
                        {openStep === "evaluate" ? "−" : "+"}
                    </span>
                </button>
                {openStep === "evaluate" && (
                    <div className="p-6 pt-0 transition-all duration-300">
                        <EvaluateAllStocks />
                    </div>
                )}
            </section>
        </main>
    );
}
