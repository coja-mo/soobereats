"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '../lib/ThemeContext';

const PAGES = [
    { name: 'Home', path: '/', icon: '🏠', category: 'Navigate' },
    { name: 'Browse Restaurants', path: '/#restaurants', icon: '🍽️', category: 'Navigate' },
    { name: 'Soobér Rides', path: '/rides', icon: '🚗', category: 'Navigate' },
    { name: 'Airport Transfers', path: '/rides/airport', icon: '✈️', category: 'Navigate' },
    { name: 'Event Shuttles', path: '/rides/events', icon: '🎉', category: 'Navigate' },
    { name: 'Soo MRKT', path: '/market', icon: '🛍️', category: 'Navigate' },
    { name: 'Community Marketplace', path: '/community', icon: '🤝', category: 'Navigate' },
    { name: 'Business Solutions', path: '/business', icon: '💼', category: 'Navigate' },
    { name: 'Your Orders', path: '/orders', icon: '📦', category: 'Navigate' },
    { name: 'Rewards & Loyalty', path: '/rewards', icon: '⭐', category: 'Navigate' },
    { name: 'Refer a Friend', path: '/refer', icon: '🎁', category: 'Navigate' },
    { name: 'My Account', path: '/account', icon: '👤', category: 'Navigate' },
    { name: 'About Soobér', path: '/about', icon: '📖', category: 'Info' },
    { name: 'How It Works', path: '/how-it-works', icon: '❓', category: 'Info' },
    { name: 'FAQ', path: '/faq', icon: '💡', category: 'Info' },
    { name: 'Delivery Zones', path: '/delivery-zone', icon: '🗺️', category: 'Info' },
    { name: 'Safety & Trust', path: '/safety', icon: '🛡️', category: 'Info' },
    { name: 'Accessibility', path: '/accessibility', icon: '♿', category: 'Info' },
    { name: 'Contact Us', path: '/contact', icon: '📧', category: 'Info' },
    { name: 'Support', path: '/support', icon: '🤖', category: 'Info' },
    { name: 'System Status', path: '/status', icon: '🟢', category: 'Info' },
    { name: 'Careers', path: '/careers', icon: '🚀', category: 'Company' },
    { name: 'Investors', path: '/investors', icon: '📊', category: 'Company' },
    { name: 'Press & Media', path: '/press', icon: '📰', category: 'Company' },
    { name: 'Social Media', path: '/socials', icon: '📱', category: 'Company' },
    { name: 'Drive for Soobér', path: '/for-drivers', icon: '⚡', category: 'Company' },
    { name: 'Soobér Academy', path: '/academy', icon: '🎓', category: 'Company' },
    { name: 'Sign In', path: '/login', icon: '🔑', category: 'Quick' },
    { name: 'Download App', path: '/download', icon: '📲', category: 'Quick' },
    { name: 'All Links', path: '/links', icon: '🔗', category: 'Quick' },
];

const ACTIONS = [
    { name: 'Toggle Dark Mode', icon: '🌙', category: 'Action', action: 'toggle-theme' },
    { name: 'Open Cart', icon: '🛒', category: 'Action', action: 'open-cart' },
];

export function CommandPalette() {
    const { theme, isDark, toggleTheme } = useTheme();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    // Keyboard shortcut to open
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen(prev => !prev);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    // Focus input when open
    useEffect(() => {
        if (open) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    // Filter results
    const allItems = [...PAGES, ...ACTIONS];
    const results = query.trim()
        ? allItems.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase()) ||
            (item.path && item.path.toLowerCase().includes(query.toLowerCase()))
        )
        : allItems.slice(0, 12); // show top 12 by default

    // Keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && results[selectedIndex]) {
            e.preventDefault();
            handleSelect(results[selectedIndex]);
        }
    }, [results, selectedIndex]);

    const handleSelect = (item) => {
        setOpen(false);
        if (item.action === 'toggle-theme') {
            toggleTheme?.();
        } else if (item.action === 'open-cart') {
            // Cart toggle handled elsewhere
        } else if (item.path) {
            router.push(item.path);
        }
    };

    // Scroll selected item into view
    useEffect(() => {
        if (listRef.current) {
            const el = listRef.current.children[selectedIndex];
            el?.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex]);

    if (!open) return null;

    const blue = '#0066FF';
    const categories = [...new Set(results.map(r => r.category))];

    return (
        <>
            {/* Backdrop */}
            <div onClick={() => setOpen(false)} style={{
                position: 'fixed', inset: 0, zIndex: 99990,
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            }} />

            {/* Modal */}
            <div style={{
                position: 'fixed', top: '18%', left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 99991, width: '90%', maxWidth: 560,
                background: isDark ? '#18181b' : '#fff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 20, overflow: 'hidden',
                boxShadow: isDark
                    ? '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
                    : '0 24px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
                animation: 'cmdPaletteIn 0.15s ease-out',
            }}>
                {/* Search Input */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '16px 20px', borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                }}>
                    <span style={{ fontSize: 18, opacity: 0.4 }}>🔍</span>
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => { setQuery(e.target.value); setSelectedIndex(0); }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search pages, actions..."
                        style={{
                            flex: 1, border: 'none', outline: 'none',
                            background: 'transparent', fontSize: 16,
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 500, color: theme.text,
                        }}
                    />
                    <kbd style={{
                        fontSize: 10, fontWeight: 700, padding: '3px 8px',
                        borderRadius: 6, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                        color: theme.textFaint, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    }}>ESC</kbd>
                </div>

                {/* Results */}
                <div ref={listRef} style={{
                    maxHeight: 360, overflowY: 'auto',
                    padding: '8px',
                }}>
                    {results.length === 0 && (
                        <div style={{ padding: '32px 16px', textAlign: 'center' }}>
                            <span style={{ fontSize: 36, display: 'block', marginBottom: 8 }}>🔍</span>
                            <span style={{ fontSize: 14, color: theme.textFaint }}>No results for &ldquo;{query}&rdquo;</span>
                        </div>
                    )}
                    {categories.map(cat => {
                        const catItems = results.filter(r => r.category === cat);
                        if (catItems.length === 0) return null;
                        return (
                            <div key={cat}>
                                <div style={{
                                    fontSize: 10, fontWeight: 700, color: theme.textFaint,
                                    textTransform: 'uppercase', letterSpacing: '0.06em',
                                    padding: '10px 12px 4px',
                                }}>{cat}</div>
                                {catItems.map((item) => {
                                    const globalIdx = results.indexOf(item);
                                    const isSelected = globalIdx === selectedIndex;
                                    return (
                                        <div key={item.name}
                                            onClick={() => handleSelect(item)}
                                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 12,
                                                padding: '10px 12px', borderRadius: 12,
                                                cursor: 'pointer',
                                                background: isSelected ? (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)') : 'transparent',
                                                transition: 'background 0.1s',
                                            }}>
                                            <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</span>
                                            <span style={{
                                                flex: 1, fontSize: 14, fontWeight: 600,
                                                fontFamily: "'DM Sans', sans-serif",
                                                color: isSelected ? theme.text : theme.textMuted,
                                            }}>{item.name}</span>
                                            {isSelected && (
                                                <span style={{ fontSize: 10, color: theme.textFaint, fontWeight: 600 }}>↵</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '10px 16px',
                    borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    display: 'flex', gap: 16, justifyContent: 'center',
                }}>
                    {[
                        { keys: '↑↓', label: 'Navigate' },
                        { keys: '↵', label: 'Select' },
                        { keys: 'esc', label: 'Close' },
                    ].map(h => (
                        <span key={h.label} style={{ fontSize: 11, color: theme.textFaint, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <kbd style={{
                                fontSize: 9, padding: '2px 5px', borderRadius: 4,
                                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                                fontWeight: 700,
                            }}>{h.keys}</kbd>
                            {h.label}
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes cmdPaletteIn {
                    from { opacity: 0; transform: translateX(-50%) scale(0.96) translateY(-8px); }
                    to { opacity: 1; transform: translateX(-50%) scale(1) translateY(0); }
                }
            `}</style>
        </>
    );
}
