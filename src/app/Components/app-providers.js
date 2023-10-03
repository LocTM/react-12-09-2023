"use client";

import { Provider } from "react-redux";
import { useState } from "react";

import { AppButton } from "./app-button";

import { AppFirebase } from "./app-firebase";
import { ThemeContext } from "../contexts/theme.context";
import { store } from "../store/store";

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            return;
        }
        setTheme("light");
    };


    return (
        <Provider store={store}>
            <AppFirebase>
        <ThemeContext.Provider value={theme}>
            <AppButton className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" color="blue" onClick={toggleTheme}>
                Toggle theme
            </AppButton>
            {children}
        </ThemeContext.Provider>
        </AppFirebase>
        </Provider>
    )
}