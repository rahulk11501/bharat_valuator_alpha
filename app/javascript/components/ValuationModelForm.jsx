import React, { useState } from "react";
import axios from "../utils/axiosInstance";

export default function ValuationModelForm() {
    const [name, setName] = useState("");
    const [formula, setFormula] = useState("");
    const [message, setMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();
        axios.post("/api/valuations", { name, formula })
            .then(() => {
                setMessage("Model created!");
                setName("");
                setFormula("");
            })
            .catch(() => {
                setMessage("Failed to create model.");
            });
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Create Custom Valuation Model</h2>
            <form onSubmit={submit} className="flex flex-col gap-3">
                <input
                    className="border p-2 rounded"
                    placeholder="Model Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    className="border p-2 rounded"
                    placeholder="Formula (e.g., eps * (1 + growth_rate / 100))"
                    value={formula}
                    onChange={(e) => setFormula(e.target.value)}
                    required
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                    Create Model
                </button>
                {message && <p className="text-sm mt-2">{message}</p>}
            </form>
        </div>
    );
}
