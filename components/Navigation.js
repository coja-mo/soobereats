"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/CartContext';
import { useTheme } from '../lib/ThemeContext';

export const Navigation = () => {
    const { itemCount, setIsCartOpen } = useCart();
    const { theme, isDark, toggleTheme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, height: isMobile ? 64 : 72,
                background: theme.bgNav,
                backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                borderBottom: `1px solid ${theme.borderSubtle}`,
                zIndex: 100, display: 'flex', alignItems: 'center',
                transition: 'background 0.3s ease',
            }}>
                <div style={{
                    width: '100%', maxWidth: 1440, margin: '0 auto',
                    padding: isMobile ? '0 16px' : '0 40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>

                    {/* Brand */}
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12, textDecoration: 'none' }}>
                        <div style={{
                            width: isMobile ? 36 : 42, height: isMobile ? 36 : 42,
                            borderRadius: isMobile ? 11 : 14,
                            background: isDark ? '#fafafa' : '#09090b',
                            color: isDark ? '#09090b' : '#fff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 800, fontSize: isMobile ? 13 : 16, letterSpacing: '-0.03em',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'all 0.3s ease',
                        }}>
                            SE
                        </div>
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                            fontSize: isMobile ? 17 : 20, letterSpacing: '-0.03em',
                            color: theme.text,
                            transition: 'color 0.3s ease',
                        }}>
                            Soober<span style={{ color: theme.textFaint }}> Eats</span>
                        </span>
                    </Link>

                    {/* Search Bar — desktop only */}
                    {!isMobile && (
                        <div style={{ flex: 1, maxWidth: 480, margin: '0 40px', position: 'relative' }}>
                            <div style={{ position: 'relative' }}>
                                <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: theme.textFaint, pointerEvents: 'none' }}
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search restaurants, cuisines, dishes..."
                                    style={{
                                        width: '100%', background: theme.bgInput,
                                        border: '1.5px solid transparent', borderRadius: 14,
                                        padding: '12px 18px 12px 44px', fontSize: 14, fontWeight: 500,
                                        color: theme.text, outline: 'none',
                                        transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                                        fontFamily: "'Inter', sans-serif",
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.background = theme.bgCard;
                                        e.target.style.borderColor = theme.border;
                                        e.target.style.boxShadow = `0 0 0 4px ${theme.accentBg}, 0 8px 24px rgba(0,0,0,0.06)`;
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.background = theme.bgInput;
                                        e.target.style.borderColor = 'transparent';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Right Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20 }}>
                        {/* Dark mode toggle */}
                        <button
                            onClick={toggleTheme}
                            style={{
                                width: isMobile ? 34 : 38, height: isMobile ? 34 : 38,
                                borderRadius: 12, background: theme.bgInput, border: 'none',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: isMobile ? 16 : 18,
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = theme.border; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = theme.bgInput; }}
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>

                        {/* Mobile hamburger */}
                        {isMobile && (
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                style={{
                                    width: 34, height: 34, borderRadius: 12,
                                    background: menuOpen ? theme.border : theme.bgInput,
                                    border: 'none', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 16, transition: 'all 0.2s',
                                }}
                            >
                                {menuOpen ? '✕' : '☰'}
                            </button>
                        )}

                        {!isMobile && (
                            <>
                                <Link href="/orders" style={{
                                    color: theme.textSecondary, fontSize: 14, fontWeight: 600,
                                    textDecoration: 'none', letterSpacing: '-0.01em',
                                }}>
                                    Orders
                                </Link>
                                <Link href="/corporate" style={{
                                    color: theme.textSecondary, fontSize: 14, fontWeight: 600,
                                    textDecoration: 'none', letterSpacing: '-0.01em',
                                }}>
                                    For Business
                                </Link>
                            </>
                        )}

                        {/* Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            style={{
                                position: 'relative', background: 'none', border: 'none',
                                padding: 6, cursor: 'pointer', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'transform 0.2s',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                        >
                            <svg style={{ width: 22, height: 22, color: theme.text }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {itemCount > 0 && (
                                <span style={{
                                    position: 'absolute', top: 0, right: 0,
                                    minWidth: 18, height: 18, borderRadius: 9,
                                    background: theme.accent, color: '#09090b',
                                    fontSize: 10, fontWeight: 800,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    padding: '0 5px',
                                    border: `2px solid ${theme.mode === 'dark' ? '#09090b' : '#fff'}`,
                                    animation: 'badgePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                }}>
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        {/* Avatar */}
                        <Link href="/account" style={{ textDecoration: 'none' }}>
                            <div style={{
                                width: isMobile ? 34 : 38, height: isMobile ? 34 : 38,
                                borderRadius: '50%', overflow: 'hidden',
                                border: `2px solid ${theme.border}`, cursor: 'pointer',
                                transition: 'border-color 0.2s',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.accent; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.border; }}
                            >
                                <img src="https://ui-avatars.com/api/?name=C+M&background=09090b&color=fafafa&bold=true&font-size=0.38" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {menuOpen && isMobile && (
                <div style={{
                    position: 'fixed', top: 64, left: 0, right: 0, bottom: 0, zIndex: 99,
                    background: theme.bg, padding: '24px 16px',
                    animation: 'fadeIn 0.2s ease',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {[
                            { href: '/', label: 'Home', emoji: '🏠' },
                            { href: '/orders', label: 'My Orders', emoji: '📦' },
                            { href: '/account', label: 'Account', emoji: '👤' },
                            { href: '/about', label: 'About SOOber', emoji: '🌿' },
                            { href: '/how-it-works', label: 'How It Works', emoji: '📖' },
                            { href: '/for-drivers', label: 'Drive Electric', emoji: '⚡' },
                            { href: '/corporate', label: 'For Restaurants', emoji: '🏢' },
                            { href: '/vendor', label: 'Vendor Dashboard', emoji: '📊' },
                            { href: '/links', label: 'All Links', emoji: '🔗' },
                        ].map(item => (
                            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '16px 20px', borderRadius: 16,
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                textDecoration: 'none', color: theme.text,
                                fontSize: 16, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                            }}>
                                <span style={{ fontSize: 20 }}>{item.emoji}</span>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}


            <style>{`
                @keyframes badgePop {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.3); }
                    100% { transform: scale(1); }
                }
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(-10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
};
