import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function EvaluateAllStocks() {
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
    const [customFormula, setCustomFormula] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/valuations")
            .then(res => res.json())
            .then(data => setModels(data))
            .catch(() => setModels([]));
    }, []);

    const handleEvaluateAll = () => {
        if (!selectedModel && !customFormula.trim()) {
            setMessage("Select a model or enter a custom formula.");
            return;
        }

        setLoading(true);
        setMessage("");

        axios.post("/api/valuations/evaluate_all", {
            valuation_model: selectedModel,
            custom_formula: customFormula || null,
        })
            .then(res => {
                setResults(res.data.results || []);
                setLoading(false);
            })
            .catch(() => {
                setMessage("Evaluation failed.");
                setLoading(false);
            });
    };

    return (
        <div className="my-8">
            <h2 className="text-xl font-semibold mb-2">Evaluate All Stocks</h2>

            <div className="flex flex-col gap-3 mb-4">
                <select
                    className="border p-2 rounded"
                    value={selectedModel}
                    onChange={e => setSelectedModel(e.target.value)}
                >
                    <option value="">Select a model (or leave blank)</option>
                    {models.map(model => (
                        <option key={model.id} value={model.name}>
                            {model.name}
                        </option>
                    ))}
                </select>

                <textarea
                    className="border p-2 rounded"
                    placeholder="Or enter custom formula (e.g., eps * (1 + growth_rate / 100))"
                    value={customFormula}
                    onChange={(e) => setCustomFormula(e.target.value)}
                />

                <button
                    onClick={handleEvaluateAll}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Evaluating..." : "Evaluate All Stocks"}
                </button>

                {message && <p className="text-red-600">{message}</p>}
            </div>

            {results.length > 0 && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">Results</h3>
                    <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                        {results.map((r, i) => (
                            <li key={i} className="p-2 border rounded bg-white dark:bg-gray-900">
                                <strong>{r.symbol}</strong>: {r.valuation}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
