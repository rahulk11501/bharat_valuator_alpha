// app/javascript/components/Home.jsx
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
        async function fetchStocks() {
            try {
                const [popularRes, watchlistRes] = await Promise.all([
                    fetch("/api/stocks"),
                    fetch("/api/watchlists"),
                ]);
                if (!popularRes.ok || !watchlistRes.ok) throw new Error("Fetch error");

                const popularData = await popularRes.json();
                const watchlistData = await watchlistRes.json();

                setPopularStocks(popularData);
                setWatchlist(watchlistData);
            } catch {
                setPopularStocks([]);
                setWatchlist([]);
            }
        }
        fetchStocks();
    }, []);

    const toggleStep = (step) => {
        setOpenStep((current) => (current === step ? null : step));
    };

    return (
        <main className="max-w-6xl mx-auto p-4 space-y-10 min-h-screen">
            {/* Search Section */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.01]">
                <StockSearch onSelect={setSelectedSymbol} />
            </section>

            {/* Popular Stocks */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    📈 Popular Stocks
                </h2>
                <PopularStocks stocks={popularStocks} />
            </section>

            {/* Watchlist */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                    ⭐ My Watchlist
                </h2>
                <WatchlistStocks watchlist={watchlist} />
            </section>

            {/* Valuation Tool */}
            <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg divide-y divide-gray-200 dark:divide-gray-800">
                <h2 className="text-2xl font-bold p-6 text-gray-900 dark:text-white">
                    🧮 Valuation Tool
                </h2>

                {/* Evaluate All Stocks Accordion */}
                <button
                    onClick={() => toggleStep("evaluate")}
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    aria-expanded={openStep === "evaluate"}
                    aria-controls="evaluate-panel"
                    id="evaluate-header"
                >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                        🧠 Evaluate All Stocks
                    </span>
                    <span className="text-2xl text-gray-400 dark:text-gray-300">
                        {openStep === "evaluate" ? "−" : "+"}
                    </span>
                </button>
                {openStep === "evaluate" && (
                    <div
                        id="evaluate-panel"
                        role="region"
                        aria-labelledby="evaluate-header"
                        className="p-6 pt-4 transition-all duration-300"
                    >
                        <EvaluateAllStocks />
                    </div>
                )}

                {/* Select Model & Evaluate Stock Accordion */}
                <button
                    onClick={() => toggleStep("select")}
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    aria-expanded={openStep === "select"}
                    aria-controls="select-panel"
                    id="select-header"
                >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                        📊 Select Model & Evaluate Stock
                    </span>
                    <span className="text-2xl text-gray-400 dark:text-gray-300">
                        {openStep === "select" ? "−" : "+"}
                    </span>
                </button>
                {openStep === "select" && (
                    <div
                        id="select-panel"
                        role="region"
                        aria-labelledby="select-header"
                        className="p-6 pt-4 transition-all duration-300"
                    >
                        <ValuationModelSelector selectedSymbol={selectedSymbol} />
                    </div>
                )}

                {/* Create Custom Valuation Model Accordion */}
                <button
                    onClick={() => toggleStep("custom")}
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    aria-expanded={openStep === "custom"}
                    aria-controls="custom-panel"
                    id="custom-header"
                >
                    <span className="text-lg font-medium text-gray-900 dark:text-white">
                        ✏️ Create Custom Valuation Model
                    </span>
                    <span className="text-2xl text-gray-400 dark:text-gray-300">
                        {openStep === "custom" ? "−" : "+"}
                    </span>
                </button>
                {openStep === "custom" && (
                    <div
                        id="custom-panel"
                        role="region"
                        aria-labelledby="custom-header"
                        className="p-6 pt-4 transition-all duration-300"
                    >
                        <ValuationModelForm />
                    </div>
                )}
            </section>
        </main>
    );
}
