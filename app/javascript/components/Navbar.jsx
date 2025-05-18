import React, { useState, useContext } from "react";
import { ThemeContext } from "./App";

export default function Navbar({ currentUser }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isDarkMode } = useContext(ThemeContext); // Access dark mode state

    const handleSignOut = async (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

        const response = await fetch("/users/sign_out", {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": csrfToken,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
        });

        if (response.ok) {
            window.location.href = "/";
        } else {
            alert("Sign out failed");
        }
    };

    // Conditionally apply classes based on isDarkMode
    const navBgClass = isDarkMode ? "bg-gray-900 text-white shadow-md" : "bg-white text-black shadow-md";
    const linkBaseClass = "hover:underline";
    const logoClass = isDarkMode ? "text-indigo-400" : "text-indigo-600";
    const loginClass = isDarkMode ? "text-blue-400" : "text-blue-600";
    const signOutClass = isDarkMode ? "text-red-400" : "text-red-600";
    const mobileButtonClass = isDarkMode ? "text-gray-300" : "text-gray-600";

    return (
        <nav className={`${navBgClass} px-4 py-3 sm:px-6`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-semibold">
                    <a href="/" className={logoClass}>BharatValuator</a>
                </div>

                {/* Desktop Links */}
                <div className="hidden sm:flex space-x-4 items-center">
                    {currentUser && currentUser.email ? (
                        <>
                            <span className="text-sm">Hi, {currentUser.email}</span>
                            <button
                                onClick={handleSignOut}
                                className={`${signOutClass} ${linkBaseClass}`}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/users/sign_in" className={`${loginClass} ${linkBaseClass}`}>
                                Login
                            </a>
                            <a href="/users/sign_up" className={`${loginClass} ${linkBaseClass}`}>
                                Sign Up
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="sm:hidden flex items-center space-x-2">
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`${mobileButtonClass} focus:outline-none`}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className={`sm:hidden mt-2 space-y-2 px-4 ${isDarkMode ? "text-white" : "text-black"}`}>
                    {currentUser && currentUser.email ? (
                        <>
                            <div className="text-sm">Hi, {currentUser.email}</div>
                            <button
                                onClick={handleSignOut}
                                className={`${signOutClass} block hover:underline`}
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/users/sign_in" className={`${loginClass} block hover:underline`}>
                                Login
                            </a>
                            <a href="/users/sign_up" className={`${loginClass} block hover:underline`}>
                                Sign Up
                            </a>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
