"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const lightTheme = {
    bg: '#fdfdfd',
    bgAlt: '#fafafa',
    bgCard: '#fff',
    bgCardHover: '#fafafa',
    bgInput: '#f4f4f5',
    bgNav: 'rgba(255,255,255,0.72)',
    text: '#09090b',
    textSecondary: '#52525b',
    textMuted: '#71717a',
    textFaint: '#a1a1aa',
    border: '#e4e4e7',
    borderLight: '#f4f4f5',
    borderSubtle: 'rgba(0,0,0,0.06)',
    accent: '#eab308',
    accentBg: 'rgba(234,179,8,0.08)',
    dark: '#09090b',
    darkText: '#fafafa',
    sooMrktBg: 'linear-gradient(135deg, #fafaf9 0%, #f5f0eb 100%)',
    heroGlow: 'radial-gradient(ellipse, rgba(234,179,8,0.08) 0%, transparent 70%)',
    categoryBg: 'rgba(253,253,253,0.85)',
    shadow: '0 1px 3px rgba(0,0,0,0.02)',
    shadowMd: '0 4px 16px rgba(0,0,0,0.06)',
    shadowLg: '0 12px 40px rgba(0,0,0,0.08)',
    vendorCard: 'rgba(255,255,255,0.7)',
    mode: 'light',
};

const darkTheme = {
    bg: '#09090b',
    bgAlt: '#111113',
    bgCard: '#18181b',
    bgCardHover: '#1f1f23',
    bgInput: '#27272a',
    bgNav: 'rgba(9,9,11,0.85)',
    text: '#fafafa',
    textSecondary: '#d4d4d8',
    textMuted: '#a1a1aa',
    textFaint: '#71717a',
    border: '#27272a',
    borderLight: '#1f1f23',
    borderSubtle: 'rgba(255,255,255,0.08)',
    accent: '#eab308',
    accentBg: 'rgba(234,179,8,0.12)',
    dark: '#fafafa',
    darkText: '#09090b',
    sooMrktBg: 'linear-gradient(135deg, #111113 0%, #1a1816 100%)',
    heroGlow: 'radial-gradient(ellipse, rgba(234,179,8,0.06) 0%, transparent 70%)',
    categoryBg: 'rgba(9,9,11,0.9)',
    shadow: '0 1px 3px rgba(0,0,0,0.3)',
    shadowMd: '0 4px 16px rgba(0,0,0,0.4)',
    shadowLg: '0 12px 40px rgba(0,0,0,0.5)',
    vendorCard: 'rgba(24,24,27,0.8)',
    mode: 'dark',
};

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('soober-theme');
        if (saved) {
            setIsDark(saved === 'dark');
        } else {
            // Default to dark mode
            setIsDark(true);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('soober-theme', isDark ? 'dark' : 'light');
        }
    }, [isDark, mounted]);

    const toggleTheme = () => setIsDark(prev => !prev);
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
}
