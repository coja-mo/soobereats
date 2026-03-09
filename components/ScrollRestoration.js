"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Saves scroll position before navigating away and restores it
 * when the user navigates back using browser back/forward.
 *
 * Uses sessionStorage keyed by pathname.
 */
export function ScrollRestoration() {
    const pathname = usePathname();

    useEffect(() => {
        // On mount (new page), check if we have a saved scroll position
        const saved = sessionStorage.getItem(`scroll:${pathname}`);
        if (saved) {
            const y = parseInt(saved, 10);
            // Small delay to let the DOM render first
            requestAnimationFrame(() => {
                window.scrollTo(0, y);
            });
        } else {
            // New navigation — scroll to top
            window.scrollTo(0, 0);
        }

        // Save scroll position on every scroll (debounced)
        let timeout;
        const handleScroll = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY));
            }, 100);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            // Save final position when leaving the page
            sessionStorage.setItem(`scroll:${pathname}`, String(window.scrollY));
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, [pathname]);

    return null;
}
