import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch("/api/stocks")
            .then((res) => res.json())
            .then(setStocks);
    }, []);

    return (
        <div>
            <h1>Popular Stocks</h1>
            <ul>
                {stocks.map(({ symbol, name }) => (
                    <li key={symbol}>
                        <Link to={`/stock/${symbol}`}>
                            {name} ({symbol})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
