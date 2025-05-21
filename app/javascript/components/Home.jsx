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
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE.BSE");

    useEffect(() => {
        fetch("/api/stocks")
            .then(res => res.json())
            .then(data => setPopularStocks(data))
            .catch(() => setPopularStocks([]));

        fetch("/api/watchlists")
            .then(res => res.json())
            .then(data => setWatchlist(data))
            .catch(() => setWatchlist([]));

        const darkModePref = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(darkModePref);
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("darkMode", newMode);
    };

    return (
        <div className={isDarkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-gray-900 min-h-screen"}>

            <main className="p-4 max-w-4xl mx-auto">
                <StockSearch onSelect={setSelectedSymbol} />

                <div className="mt-6">
                    <ValuationModelForm />
                    <ValuationModelSelector selectedSymbol={selectedSymbol} />
                    <EvaluateAllStocks />
                </div>

                <div className="mt-8">
                    <PopularStocks stocks={popularStocks} isDarkMode={isDarkMode} />
                </div>

                <div className="mt-8">
                    <WatchlistStocks watchlist={watchlist} isDarkMode={isDarkMode} />
                </div>
            </main>
        </div>
    );
}
