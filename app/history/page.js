"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const ORDERS = [
    {
        id: 'ORD-4048', restaurant: "Aurora's Italian", emoji: '🍕', date: 'Today, 12:15 PM', status: 'delivered',
        items: [{ name: 'Margherita Pizza', qty: 1, price: 18.99 }, { name: 'Caesar Salad', qty: 1, price: 12.99 }, { name: 'Tiramisu', qty: 1, price: 9.99 }],
        subtotal: 41.97, deliveryFee: 3.99, serviceFee: 2.10, tip: 6.00, total: 54.06, driver: 'Marcus T.', vehicle: 'Hyundai IONIQ 5', rating: null,
    },
    {
        id: 'ORD-4041', restaurant: "Tandoori Gardan", emoji: '🍛', date: 'Yesterday, 7:22 PM', status: 'delivered',
        items: [{ name: 'Butter Chicken', qty: 1, price: 17.99 }, { name: 'Garlic Naan (2)', qty: 1, price: 5.99 }, { name: 'Mango Lassi', qty: 2, price: 4.99 }],
        subtotal: 33.96, deliveryFee: 3.99, serviceFee: 1.70, tip: 5.00, total: 44.65, driver: 'Anika R.', vehicle: 'BYD Dolphin', rating: 5,
    },
    {
        id: 'ORD-4035', restaurant: "Soo Fresh Market", emoji: '🥬', date: 'Mar 7, 10:45 AM', status: 'delivered',
        items: [{ name: 'Organic 2% Milk', qty: 1, price: 5.99 }, { name: 'Sourdough Bread', qty: 1, price: 6.49 }, { name: 'Local Honey', qty: 1, price: 12.99 }, { name: 'Mixed Greens', qty: 1, price: 4.99 }],
        subtotal: 30.46, deliveryFee: 2.99, serviceFee: 1.52, tip: 4.00, total: 38.97, driver: 'Jake P.', vehicle: 'Honda Prologue', rating: 5,
    },
    {
        id: 'ORD-4028', restaurant: "Giovanni's", emoji: '🍝', date: 'Mar 5, 6:30 PM', status: 'delivered',
        items: [{ name: 'Fettuccine Alfredo', qty: 1, price: 16.99 }, { name: 'Bruschetta', qty: 1, price: 10.99 }],
        subtotal: 27.98, deliveryFee: 3.99, serviceFee: 1.40, tip: 5.00, total: 38.37, driver: 'Sophie L.', vehicle: 'BYD Atto 3', rating: 4,
    },
    {
        id: 'RDE-8850', restaurant: null, emoji: '🚗', date: 'Mar 4, 9:15 PM', status: 'completed',
        ride: { from: 'Downtown Core', to: 'North End', distance: '5.2 km', duration: '11 min', fare: 13.86 },
        total: 13.86, driver: 'Chris M.', vehicle: 'Cadillac VISTIQ', rating: 5,
    },
    {
        id: 'ORD-4019', restaurant: "Mike's Place", emoji: '🍔', date: 'Mar 3, 12:00 PM', status: 'delivered',
        items: [{ name: 'Classic Burger', qty: 2, price: 14.99 }, { name: 'Loaded Fries', qty: 1, price: 8.99 }, { name: 'Milkshake', qty: 2, price: 6.99 }],
        subtotal: 52.95, deliveryFee: 0, serviceFee: 2.65, tip: 8.00, total: 63.60, driver: 'Emma K.', vehicle: 'Honda Accord Hybrid', rating: 5,
    },
];

export default function OrderHistoryPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [ratingOrder, setRatingOrder] = useState(null);
    const [hoveredStar, setHoveredStar] = useState(0);
    const blue = '#0066FF';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const totalSpent = ORDERS.reduce((s, o) => s + o.total, 0);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 36px' : '80px 40px 48px' }}>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : 40, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>Order History</h1>
                <p style={{ fontSize: 14, color: theme.textMuted }}>Your recent orders and rides</p>
            </section>

            {/* ═══ SUMMARY BAR ═══ */}
            <section style={{ padding: '0 16px 24px', maxWidth: 700, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                    {[
                        { label: 'Total Orders', value: ORDERS.length },
                        { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}` },
                        { label: 'Avg Rating', value: '4.8 ⭐' },
                    ].map((s, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: 14, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 16 }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20, color: blue }}>{s.value}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: theme.textFaint }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ ORDER LIST ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 700, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {ORDERS.map((order, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                            overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s',
                        }}
                            onClick={() => setExpanded(expanded === i ? null : i)}
                        >
                            {/* Order Header */}
                            <div style={{ padding: isMobile ? 16 : 18, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 28, flexShrink: 0 }}>{order.emoji}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: 0 }}>
                                            {order.restaurant || 'Soobér Ride'}
                                        </h3>
                                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 15, color: theme.text }}>${order.total.toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                                        <span style={{ fontSize: 12, color: theme.textFaint }}>{order.date}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            {order.rating && <span style={{ fontSize: 11, color: '#f59e0b' }}>{'★'.repeat(order.rating)}</span>}
                                            <span style={{ fontSize: 10, fontWeight: 700, color: order.status === 'delivered' ? '#22c55e' : blue, textTransform: 'uppercase', background: order.status === 'delivered' ? 'rgba(34,197,94,0.1)' : 'rgba(0,102,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            {expanded === i && (
                                <div style={{ borderTop: `1px solid ${theme.borderSubtle}`, padding: isMobile ? 14 : 18, background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)' }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    {order.items ? (
                                        <>
                                            {order.items.map((item, j) => (
                                                <div key={j} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                                                    <span style={{ color: theme.text }}>{item.qty}x {item.name}</span>
                                                    <span style={{ color: theme.textMuted }}>${item.price.toFixed(2)}</span>
                                                </div>
                                            ))}
                                            <div style={{ width: '100%', height: 1, background: theme.borderSubtle, margin: '8px 0' }} />
                                            {[
                                                { label: 'Subtotal', val: order.subtotal },
                                                { label: order.deliveryFee === 0 ? 'Delivery (FREE 🎉)' : 'Delivery', val: order.deliveryFee },
                                                { label: 'Service Fee', val: order.serviceFee },
                                                { label: 'Tip', val: order.tip },
                                            ].map((f, k) => (
                                                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 2, color: theme.textFaint }}>
                                                    <span>{f.label}</span>
                                                    <span>${f.val.toFixed(2)}</span>
                                                </div>
                                            ))}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, color: theme.text, marginTop: 6 }}>
                                                <span>Total</span>
                                                <span>${order.total.toFixed(2)}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div>
                                            <div style={{ fontSize: 13, color: theme.text, marginBottom: 4 }}>
                                                📍 {order.ride.from} → {order.ride.to}
                                            </div>
                                            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: theme.textFaint }}>
                                                <span>{order.ride.distance}</span>
                                                <span>{order.ride.duration}</span>
                                                <span style={{ fontWeight: 700, color: blue }}>${order.ride.fare.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Driver info */}
                                    <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: theme.textFaint }}>
                                        <span>🚗 {order.driver}</span>
                                        <span>·</span>
                                        <span>{order.vehicle}</span>
                                    </div>

                                    {/* Reorder / Rate */}
                                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                                        {order.items && (
                                            <button style={{ padding: '8px 16px', borderRadius: 10, border: 'none', background: blue, color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                                                🔄 Reorder
                                            </button>
                                        )}
                                        {!order.rating && (
                                            <button onClick={() => setRatingOrder(ratingOrder === i ? null : i)} style={{ padding: '8px 16px', borderRadius: 10, border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                                                ⭐ Rate
                                            </button>
                                        )}
                                    </div>

                                    {/* Star Rating UI */}
                                    {ratingOrder === i && !order.rating && (
                                        <div style={{ display: 'flex', gap: 4, marginTop: 10, justifyContent: 'center' }}>
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <button key={s}
                                                    onMouseEnter={() => setHoveredStar(s)}
                                                    onMouseLeave={() => setHoveredStar(0)}
                                                    style={{ fontSize: 24, border: 'none', background: 'none', cursor: 'pointer', color: s <= hoveredStar ? '#f59e0b' : theme.textFaint, transition: 'color 0.15s' }}
                                                >★</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
