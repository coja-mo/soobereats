"use client";

import { useState, useEffect } from 'react';
import { SplashScreen } from './SplashScreen';

export function SplashWrapper({ children }) {
    const [showSplash, setShowSplash] = useState(false);
    const [splashDone, setSplashDone] = useState(true);

    useEffect(() => {
        // Only show on first visit (per session)
        const hasShown = sessionStorage.getItem('soober-splash-shown');
        if (!hasShown) {
            setShowSplash(true);
            setSplashDone(false);
            sessionStorage.setItem('soober-splash-shown', '1');
        }
    }, []);

    return (
        <>
            {showSplash && !splashDone && (
                <SplashScreen onComplete={() => setSplashDone(true)} />
            )}
            <div style={{
                opacity: splashDone ? 1 : 0,
                transition: 'opacity 0.3s ease 0.1s',
            }}>
                {children}
            </div>
        </>
    );
}
