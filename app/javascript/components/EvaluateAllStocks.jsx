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
            .then((res) => res.json())
            .then(setModels)
            .catch(() => setModels([]));
    }, []);

    const handleEvaluateAll = () => {
        if (!selectedModel && !customFormula.trim()) {
            setMessage("⚠️ Select a model or enter a custom formula.");
            return;
        }

        setLoading(true);
        setMessage("");

        axios
            .post("/api/valuations/evaluate_all", {
                valuation_model: selectedModel,
                custom_formula: customFormula || null,
            })
            .then((res) => {
                setResults(res.data.results || []);
                setLoading(false);
            })
            .catch(() => {
                setMessage("❌ Evaluation failed.");
                setLoading(false);
            });
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-xl">
            <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
                <option value="">Select a model (or leave blank)</option>
                {models.map((model) => (
                    <option key={model.id} value={model.name}>
                        {model.name}
                    </option>
                ))}
            </select>

            <textarea
                placeholder="Or enter custom formula (e.g., eps * (1 + growth_rate / 100))"
                value={customFormula}
                onChange={(e) => setCustomFormula(e.target.value)}
                rows={3}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
            />

            <button
                onClick={handleEvaluateAll}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? "Evaluating..." : "Evaluate All Stocks"}
            </button>

            {message && (
                <p className="text-sm text-red-600 dark:text-red-400">{message}</p>
            )}

            {results.length > 0 && (
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto text-sm mt-2">
                    {results.map((r, i) => (
                        <li
                            key={i}
                            className="p-3 border rounded bg-white dark:bg-gray-900 dark:text-white"
                        >
                            <strong>{r.symbol}</strong>: {r.valuation}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
