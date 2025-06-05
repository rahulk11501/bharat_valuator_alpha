// app/javascript/components/Home.jsx
import React, { useState } from "react";
import StockSearch from "./StockSearch";
import PopularStocks from "./PopularStocks";
import WatchlistStocks from "./WatchlistStocks";
import ValuationTool from "./valuation/ValuationTool";

export default function Home() {
    const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE.BSE");

    return (
        <main className="max-w-6xl mx-auto p-4 space-y-10 min-h-screen">
            <StockSearch onSelect={setSelectedSymbol} />
            <PopularStocks />
            <WatchlistStocks />
            <ValuationTool selectedSymbol={selectedSymbol} />
        </main>
    );
}
