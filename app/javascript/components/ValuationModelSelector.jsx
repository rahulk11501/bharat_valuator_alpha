import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function ValuationModelSelector({ selectedSymbol }) {
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [valuation, setValuation] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/valuations")
            .then(res => res.json())
            .then(data => {
                console.log("Models fetched", data);
                setModels(data);
            })
            .catch(err => console.error("Error fetching models", err));
    }, []);

    const evaluate = () => {
        if (!selectedModel || !selectedSymbol) return;
        setLoading(true);
        axios.post("/api/valuations/evaluate", {
            model_id: selectedModel,
            symbol: selectedSymbol
        })
            .then(res => {
                setValuation(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Evaluation failed", err);
                setLoading(false);
            });
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Evaluate Stock</h2>
            <div className="flex gap-2 mb-2">
                <select
                    className="border p-2 rounded"
                    value={selectedModel || ""}
                    onChange={e => setSelectedModel(e.target.value)}
                >
                    <option value="">Select a model</option>
                    {models.map(model => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))}
                </select>
                <button
                    onClick={evaluate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    disabled={!selectedModel || loading}
                >
                    {loading ? "Evaluating..." : "Evaluate"}
                </button>
            </div>
            {valuation && (
                <div className="bg-green-100 p-4 rounded mt-2 text-green-800">
                    <strong>{valuation.model}:</strong> {valuation.valuation}
                </div>
            )}
        </div>
    );
}
