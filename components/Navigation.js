"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/CartContext';
import { useTheme } from '../lib/ThemeContext';
import { restaurants, localArtisans, sooMrktVendors } from '../lib/data/restaurants';

export const Navigation = () => {
    const { itemCount, setIsCartOpen } = useCart();
    const { theme, isDark, toggleTheme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const searchRef = useRef(null);

    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const q = searchQuery.toLowerCase();
        const results = [];
        restaurants.forEach(r => {
            if (r.name.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)) {
                results.push({ type: 'Restaurant', name: r.name, emoji: r.logo, href: `/restaurant/${r.id}`, sub: r.category });
            }
        });
        (sooMrktVendors || []).forEach(v => {
            if (v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q)) {
                results.push({ type: 'Market', name: v.name, emoji: v.emoji, href: `/market/${v.id}`, sub: v.category });
            }
        });
        (localArtisans || []).forEach(a => {
            if (a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)) {
                results.push({ type: 'Artisan', name: a.name, emoji: a.emoji, href: `/artisans/${a.id}`, sub: a.category });
            }
        });
        // Search menu items too
        restaurants.forEach(r => {
            (r.menu || []).forEach(m => {
                if (m.name.toLowerCase().includes(q) && results.length < 8) {
                    results.push({ type: 'Dish', name: m.name, emoji: r.logo, href: `/restaurant/${r.id}`, sub: `at ${r.name} · $${m.price.toFixed(2)}` });
                }
            });
        });
        return results.slice(0, 8);
    }, [searchQuery]);

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


                    {/* Right Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 12, marginLeft: 'auto' }}>

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
                                <Link href="/rides" style={{
                                    color: '#10b981', fontSize: 14, fontWeight: 600,
                                    textDecoration: 'none', letterSpacing: '-0.01em',
                                }}>
                                    ⚡ Rides
                                </Link>
                                <Link href="/corporate" style={{
                                    color: theme.textSecondary, fontSize: 14, fontWeight: 600,
                                    textDecoration: 'none', letterSpacing: '-0.01em',
                                }}>
                                    For Business
                                </Link>
                                <Link href="/support" style={{
                                    color: theme.textSecondary, fontSize: 14, fontWeight: 600,
                                    textDecoration: 'none', letterSpacing: '-0.01em',
                                }}>
                                    Support
                                </Link>
                            </>
                        )}

                        {/* Search — animated magnifying glass (next to cart) */}
                        {!isMobile && (
                            <div ref={searchRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                {!searchFocused && (
                                    <button onClick={() => setSearchFocused(true)} style={{
                                        width: 38, height: 38, borderRadius: 12,
                                        background: theme.bgInput, border: 'none', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                    }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = theme.border; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = theme.bgInput; }}
                                    >
                                        <svg style={{ width: 18, height: 18, color: theme.textFaint }}
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                )}
                                {searchFocused && (
                                    <div style={{
                                        position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
                                        animation: 'searchExpand 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards',
                                        width: 380,
                                    }}>
                                        <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: theme.textFaint, pointerEvents: 'none' }}
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search restaurants, dishes..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            autoFocus
                                            style={{
                                                width: '100%', background: theme.bgCard,
                                                border: `1.5px solid ${theme.border}`, borderRadius: 14,
                                                padding: '12px 18px 12px 44px', fontSize: 14, fontWeight: 500,
                                                color: theme.text, outline: 'none',
                                                fontFamily: "'Inter', sans-serif",
                                                boxShadow: `0 0 0 4px ${theme.accentBg}, 0 8px 24px rgba(0,0,0,0.06)`,
                                            }}
                                            onBlur={() => setTimeout(() => { setSearchFocused(false); setSearchQuery(''); }, 200)}
                                        />
                                    </div>
                                )}
                                {searchFocused && searchResults.length > 0 && (
                                    <div style={{
                                        position: 'absolute', top: '100%', right: 0,
                                        width: 380, marginTop: 8, background: theme.bgCard,
                                        border: `1px solid ${theme.borderSubtle}`,
                                        borderRadius: 18, overflow: 'hidden',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                                        zIndex: 200, maxHeight: 420, overflowY: 'auto',
                                    }}>
                                        <div style={{ padding: '8px 12px 4px', fontSize: 11, fontWeight: 700, color: theme.textFaint, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                                            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                                        </div>
                                        {searchResults.map((r, i) => (
                                            <Link key={`${r.href}-${i}`} href={r.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', gap: 14,
                                                    padding: '12px 16px', cursor: 'pointer',
                                                    transition: 'background 0.15s',
                                                    borderTop: i === 0 ? 'none' : `1px solid ${theme.borderSubtle}`,
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.background = theme.bgCardHover}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                                >
                                                    <div style={{
                                                        width: 36, height: 36, borderRadius: 10,
                                                        background: theme.bgInput, display: 'flex',
                                                        alignItems: 'center', justifyContent: 'center',
                                                        fontSize: 18, flexShrink: 0,
                                                    }}>{r.emoji}</div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                                                        <div style={{ fontSize: 12, color: theme.textFaint }}>{r.sub}</div>
                                                    </div>
                                                    <span style={{
                                                        fontSize: 10, fontWeight: 700, color: theme.textFaint,
                                                        background: theme.bgInput, padding: '3px 8px',
                                                        borderRadius: 6, textTransform: 'uppercase',
                                                    }}>{r.type}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                                {searchFocused && searchQuery.trim() && searchResults.length === 0 && (
                                    <div style={{
                                        position: 'absolute', top: '100%', right: 0,
                                        width: 380, marginTop: 8, background: theme.bgCard,
                                        border: `1px solid ${theme.borderSubtle}`,
                                        borderRadius: 18, padding: '24px 20px', textAlign: 'center',
                                        boxShadow: '0 20px 60px rgba(0,0,0,0.2)', zIndex: 200,
                                    }}>
                                        <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
                                        <p style={{ fontSize: 14, fontWeight: 600, color: theme.text, margin: 0, marginBottom: 4 }}>No results found</p>
                                        <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>Try a restaurant, dish, or vendor</p>
                                    </div>
                                )}
                            </div>
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
                    {/* Mobile Search */}
                    <div style={{ position: 'relative', marginBottom: 16 }}>
                        <svg style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: theme.textFaint, pointerEvents: 'none' }}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search restaurants, dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%', background: theme.bgInput,
                                border: `1.5px solid ${theme.borderSubtle}`, borderRadius: 14,
                                padding: '14px 18px 14px 44px', fontSize: 15, fontWeight: 500,
                                color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
                                boxSizing: 'border-box',
                            }}
                        />
                        {searchQuery.trim() && searchResults.length > 0 && (
                            <div style={{
                                marginTop: 8, background: theme.bgCard,
                                border: `1px solid ${theme.borderSubtle}`,
                                borderRadius: 16, overflow: 'hidden',
                            }}>
                                {searchResults.map((r, i) => (
                                    <Link key={`m-${r.href}-${i}`} href={r.href} onClick={() => { setMenuOpen(false); setSearchQuery(''); }} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: 12,
                                            padding: '12px 16px',
                                            borderTop: i === 0 ? 'none' : `1px solid ${theme.borderSubtle}`,
                                        }}>
                                            <span style={{ fontSize: 20 }}>{r.emoji}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{r.name}</div>
                                                <div style={{ fontSize: 12, color: theme.textFaint }}>{r.sub}</div>
                                            </div>
                                            <span style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, background: theme.bgInput, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>{r.type}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {[
                            { href: '/', label: 'Home', emoji: '🏠' },
                            { href: '/orders', label: 'My Orders', emoji: '📦' },
                            { href: '/account', label: 'Account', emoji: '👤' },
                            { href: '/rewards', label: 'Rewards', emoji: '🏆' },
                            { href: '/rides', label: 'SOOber Rides', emoji: '🚗' },
                            { href: '/rides/airport', label: 'Airport Transfers', emoji: '✈️' },
                            { href: '/rides/events', label: 'Events & Fleets', emoji: '💎' },
                            { href: '/founder', label: 'Founder Dash', emoji: '👑' },
                            { href: '/dispatch', label: 'Dispatch', emoji: '📡' },
                            { href: '/support', label: 'Support', emoji: '💬' },
                            { href: '/academy', label: 'SOOber Academy', emoji: '🎓' },
                            { href: '/about', label: 'About SOOber', emoji: '🌿' },
                            { href: '/how-it-works', label: 'How It Works', emoji: '📖' },
                            { href: '/for-drivers', label: 'Drive Electric', emoji: '⚡' },
                            { href: '/corporate', label: 'For Business', emoji: '🏢' },
                            { href: '/contact', label: 'Contact', emoji: '📬' },
                            { href: '/delivery-zone', label: 'Delivery Zone', emoji: '📍' },
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
                @keyframes searchExpand {
                    0% { width: 38px; opacity: 0; }
                    100% { width: 420px; opacity: 1; }
                }
            `}</style>
        </>
    );
};
