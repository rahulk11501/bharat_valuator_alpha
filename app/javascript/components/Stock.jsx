import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Line } from "react-chartjs-2";

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
            });
    }, [symbol, range]);

    return (
        <div>
            <h1>Stock Chart for {symbol}</h1>
            <div className="my-2">
                {Object.keys(ranges).map((r) => (
                    <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={`px-3 py-1 m-1 rounded ${r === range ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                    >
                        {r}
                    </button>
                ))}
            </div>
            {data ? <Line data={data} /> : <p>Loading...</p>}
            <br />
            <Link to="/">← Back</Link>
        </div>
    );
}
