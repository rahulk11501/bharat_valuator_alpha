// context/ThemeContext.jsx
import React, { createContext } from "react";
import useDarkMode from "../hooks/useDarkMode";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useDarkMode();

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
