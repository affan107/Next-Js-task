"use client";

import { useEffect } from "react";
import { useTopbar } from "@/context/TopbarContext";

export default function TopbarSlot({ children }) {
    const { setTopbar, clearTopbar } = useTopbar();

    useEffect(() => {
        setTopbar(children);
        return () => clearTopbar();
    }, [children]);

    return null
}