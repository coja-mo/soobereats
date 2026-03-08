"use client";

import { useTheme } from '../lib/ThemeContext';

export function ThemedBody({ children }) {
    const { theme } = useTheme();

    return (
        <div style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            background: theme.bg,
            color: theme.text,
            minHeight: '100vh',
            overflowX: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            transition: 'background 0.3s ease, color 0.3s ease',
        }}>
            {children}
        </div>
    );
}
