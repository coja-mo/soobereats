"use client";

import { useTheme } from '../lib/ThemeContext';
import { Footer } from './Footer';

export function PageShell({ children }) {
    const { theme } = useTheme();

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', transition: 'background 0.3s ease' }}>
            {children}
            <Footer />
        </div>
    );
}
