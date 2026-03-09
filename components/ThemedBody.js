"use client";

import { useTheme } from '../lib/ThemeContext';
import { ElectricConstellationBg } from './ElectricConstellationBg';

export function ThemedBody({ children }) {
    const { theme } = useTheme();

    return (
        <div style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            background: theme.bg,
            color: theme.text,
            minHeight: '100vh',
            overflowX: 'clip',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            textRendering: 'optimizeLegibility',
            transition: 'background 0.3s ease, color 0.3s ease',
        }}>
            <ElectricConstellationBg />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
}
