"use client";

import { useState, useEffect } from "react";

export default function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollDirection, setScrollDirection] = useState("up");
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            const currentScrollY = window.scrollY;

            setScrollPosition(currentScrollY);
            setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", updatePosition, { passive: true });
        return () => window.removeEventListener("scroll", updatePosition);
    }, [lastScrollY]);

    return { scrollPosition, scrollDirection };
}
