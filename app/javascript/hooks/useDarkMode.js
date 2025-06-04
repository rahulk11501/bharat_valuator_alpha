// hooks/useDarkMode.js
import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "enabled";
    });

    useEffect(() => {
        const className = "dark";
        const rootElement = document.documentElement.classList;

        if (isDarkMode) {
            rootElement.add(className);
            localStorage.setItem("darkMode", "enabled");
        } else {
            rootElement.remove(className);
            localStorage.setItem("darkMode", "disabled");
        }
    }, [isDarkMode]);

    return [isDarkMode, setIsDarkMode];
}
