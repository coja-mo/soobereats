"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const FAVORITE_RESTAURANTS = [
    { name: "Aurora's Italian", emoji: '🍕', cuisine: 'Italian', rating: 4.9, deliveryTime: '25-35 min', lastOrdered: '2 days ago', orderCount: 7, topItem: 'Margherita Pizza' },
    { name: 'Tandoori Gardan', emoji: '🍛', cuisine: 'Indian', rating: 4.8, deliveryTime: '30-40 min', lastOrdered: '4 days ago', orderCount: 5, topItem: 'Butter Chicken' },
    { name: 'Soo Fresh Market', emoji: '🥬', cuisine: 'Grocery', rating: 4.9, deliveryTime: '20-30 min', lastOrdered: '1 week ago', orderCount: 3, topItem: 'Organic Milk' },
    { name: "Giovanni's", emoji: '🍝', cuisine: 'Italian', rating: 4.7, deliveryTime: '30-40 min', lastOrdered: '2 weeks ago', orderCount: 4, topItem: 'Fettuccine Alfredo' },
];

const FAVORITE_ITEMS = [
    { name: 'Margherita Pizza', restaurant: "Aurora's", price: 18.99, emoji: '🍕', orderedTimes: 4 },
    { name: 'Butter Chicken', restaurant: 'Tandoori Gardan', price: 17.99, emoji: '🍛', orderedTimes: 3 },
    { name: 'Caesar Salad', restaurant: "Aurora's", price: 12.99, emoji: '🥗', orderedTimes: 3 },
    { name: 'Garlic Naan (2)', restaurant: 'Tandoori Gardan', price: 5.99, emoji: '🫓', orderedTimes: 5 },
    { name: 'Organic 2% Milk', restaurant: 'Soo Fresh Market', price: 5.99, emoji: '🥛', orderedTimes: 3 },
    { name: 'Tiramisu', restaurant: "Aurora's", price: 9.99, emoji: '🍰', orderedTimes: 2 },
    { name: 'Classic Burger', restaurant: "Mike's Place", price: 14.99, emoji: '🍔', orderedTimes: 2 },
    { name: 'Mango Lassi', restaurant: 'Tandoori Gardan', price: 4.99, emoji: '🥤', orderedTimes: 4 },
];

const SAVED_ADDRESSES = [
    { label: 'Home', address: '123 Queen St E, Sault Ste. Marie', icon: '🏠', default: true },
    { label: 'Work', address: '456 Bay St, Sault Ste. Marie', icon: '🏢', default: false },
    { label: "Mom's", address: '789 Northern Ave, Sault Ste. Marie', icon: '❤️', default: false },
];

export default function FavoritesPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('restaurants');
    const blue = '#0066FF';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HEADER ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 32px' : '80px 40px 40px' }}>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : 40, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    Your Favorites
                </h1>
                <p style={{ fontSize: 14, color: theme.textMuted }}>Saved restaurants, go-to items, and delivery addresses.</p>
            </section>

            {/* ═══ TABS ═══ */}
            <section style={{ padding: '0 16px 24px', maxWidth: 500, margin: '0 auto' }}>
                <div style={{ display: 'flex', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', borderRadius: 14, padding: 4 }}>
                    {['restaurants', 'items', 'addresses'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            flex: 1, padding: '10px 0', borderRadius: 11, border: 'none',
                            background: activeTab === tab ? (isDark ? 'rgba(255,255,255,0.1)' : '#fff') : 'transparent',
                            color: activeTab === tab ? theme.text : theme.textFaint,
                            fontWeight: 700, fontSize: 12, cursor: 'pointer', textTransform: 'capitalize',
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                            transition: 'all 0.2s',
                        }}>{tab}</button>
                    ))}
                </div>
            </section>

            {/* ═══ RESTAURANTS TAB ═══ */}
            {activeTab === 'restaurants' && (
                <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {FAVORITE_RESTAURANTS.map((r, i) => (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                                padding: isMobile ? 16 : 20, display: 'flex', alignItems: 'center', gap: 14,
                                transition: 'all 0.2s', cursor: 'pointer',
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <span style={{ fontSize: 32, flexShrink: 0 }}>{r.emoji}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, margin: 0 }}>{r.name}</h3>
                                        <span style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700 }}>★ {r.rating}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4, fontSize: 12, color: theme.textFaint }}>
                                        <span>{r.cuisine}</span>
                                        <span>·</span>
                                        <span>{r.deliveryTime}</span>
                                        <span>·</span>
                                        <span>{r.orderCount} orders</span>
                                    </div>
                                    <div style={{ marginTop: 6, fontSize: 11, color: theme.textMuted }}>
                                        <span style={{ fontWeight: 600 }}>Top item:</span> {r.topItem} · Last ordered {r.lastOrdered}
                                    </div>
                                </div>
                                <button style={{ padding: '8px 14px', borderRadius: 10, border: 'none', background: blue, color: '#fff', fontWeight: 700, fontSize: 11, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", flexShrink: 0, whiteSpace: 'nowrap' }}>
                                    Reorder
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ═══ ITEMS TAB ═══ */}
            {activeTab === 'items' && (
                <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
                        {FAVORITE_ITEMS.map((item, i) => (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.borderSubtle}`, borderRadius: 18,
                                padding: 16, display: 'flex', alignItems: 'center', gap: 12,
                            }}>
                                <span style={{ fontSize: 28, flexShrink: 0 }}>{item.emoji}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 2px' }}>{item.name}</h4>
                                    <div style={{ fontSize: 11, color: theme.textFaint }}>{item.restaurant} · Ordered {item.orderedTimes}x</div>
                                </div>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 14, color: blue }}>${item.price.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ═══ ADDRESSES TAB ═══ */}
            {activeTab === 'addresses' && (
                <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 500, margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {SAVED_ADDRESSES.map((a, i) => (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${a.default ? 'rgba(0,102,255,0.3)' : theme.borderSubtle}`, borderRadius: 18,
                                padding: 16, display: 'flex', alignItems: 'center', gap: 12,
                            }}>
                                <span style={{ fontSize: 22 }}>{a.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text }}>{a.label}</span>
                                        {a.default && <span style={{ fontSize: 9, fontWeight: 800, color: blue, background: 'rgba(0,102,255,0.1)', padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase' }}>Default</span>}
                                    </div>
                                    <div style={{ fontSize: 12, color: theme.textFaint, marginTop: 2 }}>{a.address}</div>
                                </div>
                            </div>
                        ))}
                        <button style={{
                            padding: '14px 0', borderRadius: 14, border: `1.5px dashed ${theme.border}`,
                            background: 'transparent', color: theme.textMuted, fontWeight: 700, fontSize: 13,
                            cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                        }}>+ Add New Address</button>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
