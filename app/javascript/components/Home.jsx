import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from './App';
import StockSearch from "./StockSearch";
import PopularStocks from "./PopularStocks";
import WatchlistStocks from "./WatchlistStocks";

export default function Home() {
    const { isDarkMode } = useContext(ThemeContext);
    const [popularStocks, setPopularStocks] = useState([]);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        fetch("/api/stocks")
            .then((res) => res.json())
            .then(setPopularStocks);

        fetch("/api/watchlists")
            .then((res) => res.json())
            .then(setWatchlist);
    }, []);

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="max-w-7xl mx-auto p-6">
                <StockSearch />
                <PopularStocks stocks={popularStocks} isDarkMode={isDarkMode} />
                <WatchlistStocks watchlist={watchlist} isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}
