import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import "./stylesheets/application.css";


document.addEventListener("DOMContentLoaded", () => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<App />);
    }
});
