import React, { useState } from "react";
import axios from "../utils/axiosInstance";

export default function ValuationModelForm() {
    const [name, setName] = useState("");
    const [formula, setFormula] = useState("");
    const [message, setMessage] = useState("");

    const submit = (e) => {
        e.preventDefault();
        axios
            .post("/api/valuations", { name, formula })
            .then(() => {
                setMessage("✅ Model created!");
                setName("");
                setFormula("");
            })
            .catch(() => setMessage("❌ Failed to create model."));
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-4 w-full max-w-xl">
            <input
                type="text"
                placeholder="Model Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <textarea
                placeholder="Formula (e.g., eps * (1 + growth_rate / 100))"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
            />
            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
            >
                Create Model
            </button>
            {message && (
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{message}</p>
            )}
        </form>
    );
}
