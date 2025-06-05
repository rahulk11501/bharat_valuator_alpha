// app/javascript/components/Home.jsx
import React, { useEffect, useState } from "react";
import StockSearch from "./StockSearch";
import PopularStocks from "./PopularStocks";
import WatchlistStocks from "./WatchlistStocks";
import ValuationTool from "./valuation/ValuationTool";

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
            <ValuationTool selectedSymbol={selectedSymbol} />

        </main>
    );
}
