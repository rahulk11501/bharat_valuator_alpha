// app/javascript/components/valuation/ValuationTool.jsx
import React, { useState } from "react";
import EvaluateAllStocks from "./EvaluateAllStocks";
import ValuationModelForm from "./ValuationModelForm";
import ValuationModelSelector from "./ValuationModelSelector";

export default function ValuationTool({ selectedSymbol }) {
    const [openStep, setOpenStep] = useState(null);

    const toggleStep = (step) => {
        setOpenStep((current) => (current === step ? null : step));
    };

    return (
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg divide-y divide-gray-200 dark:divide-gray-800">
            <h2 className="text-2xl font-bold p-6 text-gray-900 dark:text-white">
                🧮 Valuation Tool
            </h2>

            {/* Evaluate All Stocks Accordion */}
            <button
                onClick={() => toggleStep("evaluate")}
                className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                aria-expanded={openStep === "evaluate"}
                aria-controls="evaluate-panel"
                id="evaluate-header"
            >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                    🧠 Evaluate All Stocks
                </span>
                <span className="text-2xl text-gray-400 dark:text-gray-300">
                    {openStep === "evaluate" ? "−" : "+"}
                </span>
            </button>
            {openStep === "evaluate" && (
                <div id="evaluate-panel" role="region" aria-labelledby="evaluate-header" className="p-6 pt-4 transition-all duration-300">
                    <EvaluateAllStocks />
                </div>
            )}

            {/* Select Model & Evaluate Stock Accordion */}
            <button
                onClick={() => toggleStep("select")}
                className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                aria-expanded={openStep === "select"}
                aria-controls="select-panel"
                id="select-header"
            >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                    📊 Select Model & Evaluate Stock
                </span>
                <span className="text-2xl text-gray-400 dark:text-gray-300">
                    {openStep === "select" ? "−" : "+"}
                </span>
            </button>
            {openStep === "select" && (
                <div id="select-panel" role="region" aria-labelledby="select-header" className="p-6 pt-4 transition-all duration-300">
                    <ValuationModelSelector selectedSymbol={selectedSymbol} />
                </div>
            )}

            {/* Create Custom Valuation Model Accordion */}
            <button
                onClick={() => toggleStep("custom")}
                className="flex justify-between items-center w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                aria-expanded={openStep === "custom"}
                aria-controls="custom-panel"
                id="custom-header"
            >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                    ✏️ Create Custom Valuation Model
                </span>
                <span className="text-2xl text-gray-400 dark:text-gray-300">
                    {openStep === "custom" ? "−" : "+"}
                </span>
            </button>
            {openStep === "custom" && (
                <div id="custom-panel" role="region" aria-labelledby="custom-header" className="p-6 pt-4 transition-all duration-300">
                    <ValuationModelForm />
                </div>
            )}
        </section>
    );
}
