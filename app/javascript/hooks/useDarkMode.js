// hooks/useDarkMode.js
import { useEffect, useState } from "react";

export default function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "enabled";
    });

    useEffect(() => {
        const className = "dark";
        const bodyClass = document.documentElement.classList;

        if (isDarkMode) {
            bodyClass.add(className);
            localStorage.setItem("darkMode", "enabled");
        } else {
            bodyClass.remove(className);
            localStorage.setItem("darkMode", "disabled");
        }
    }, [isDarkMode]);

    return [isDarkMode, setIsDarkMode];
}
