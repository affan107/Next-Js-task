"use client";

import { createContext, useContext, useState, useCallback } from "react";

const TopbarContext = createContext(null);

export function TopbarProvider({ children }) {
    const [topbarContent, setTopbarContent] = useState(null);

    const setTopbar = useCallback((content) => {
        setTopbarContent(content);
    }, []);

    const clearTopbar = useCallback(() => {
        setTopbarContent(null);
    }, []);

    return (
        <TopbarContext.Provider value={{ topbarContent, setTopbar, clearTopbar }}>
            {children}
        </TopbarContext.Provider>
    );
}

export function useTopbar() {
    const ctx = useContext(TopbarContext);
    if (!ctx) throw new Error("useTopbar must be used within TopbarProvider");
    return ctx;
}