"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { useLiveOrders } from '../../lib/LiveOrderContext';
import { getActiveOrders, getPastOrders } from '../../lib/data/orders';

export default function OrdersPage() {
    const { theme } = useTheme();
    const { activeOrders: liveOrders } = useLiveOrders();
    const [isMobile, setIsMobile] = useState(false);
    const [tab, setTab] = useState('active');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const dataActive = getActiveOrders();
    const dataPast = getPastOrders();
    const pad = isMobile ? '24px 16px 100px' : '40px 40px 100px';

    const statusColors = {
        confirmed: '#3b82f6', preparing: '#f59e0b', ready: '#8b5cf6',
        delivering: '#10b981', delivered: '#22c55e', cancelled: '#ef4444',
    };

    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: pad, background: theme.bg }}>
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.03em', marginBottom: 8 }}>Your Orders</h1>
            <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: isMobile ? 24 : 32 }}>Track active deliveries and view past orders.</p>

            {/* Tabs */}
            <div style={{
                display: 'flex', gap: 4, background: theme.bgAlt, borderRadius: 16, padding: 4,
                marginBottom: isMobile ? 20 : 28, border: `1px solid ${theme.borderLight}`,
            }}>
                {[{ id: 'active', label: `Active (${liveOrders.length + dataActive.length})` }, { id: 'past', label: `Past (${dataPast.length})` }].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        flex: 1, padding: '12px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                        fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                        background: tab === t.id ? theme.bgCard : 'transparent',
                        color: tab === t.id ? theme.text : theme.textFaint,
                        boxShadow: tab === t.id ? theme.shadow : 'none', transition: 'all 0.2s',
                    }}>{t.label}</button>
                ))}
            </div>

            {/* Active Tab */}
            {tab === 'active' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {/* Live orders from context */}
                    {liveOrders.map(order => (
                        <Link key={order.id} href={`/orders/live/${order.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                background: theme.bgCard, border: `1.5px solid ${statusColors[order.status] || theme.border}`,
                                borderRadius: 20, padding: isMobile ? 16 : 24, boxShadow: theme.shadow,
                                display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20,
                                transition: 'all 0.2s', cursor: 'pointer',
                            }}>
                                <div style={{
                                    width: isMobile ? 48 : 60, height: isMobile ? 48 : 60, borderRadius: isMobile ? 14 : 18,
                                    background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: isMobile ? 24 : 30, flexShrink: 0,
                                }}>{order.restaurantLogo || '🍽️'}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17, fontWeight: 700, color: theme.text, margin: 0 }}>{order.restaurantName}</h3>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
                                            padding: '3px 8px', borderRadius: 6,
                                            background: `${statusColors[order.status]}20`, color: statusColors[order.status],
                                        }}>{order.status}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>{order.items?.length || 0} items · Tap to track</p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17, fontWeight: 700, color: theme.text }}>${order.total?.toFixed(2) || '0.00'}</div>
                                    <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>⚡ EV Delivery</span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Static active orders */}
                    {dataActive.map(order => (
                        <div key={order.id} style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: isMobile ? 16 : 24, boxShadow: theme.shadow,
                            display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20,
                        }}>
                            <div style={{
                                width: isMobile ? 48 : 60, height: isMobile ? 48 : 60, borderRadius: isMobile ? 14 : 18,
                                background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: isMobile ? 24 : 30, flexShrink: 0,
                            }}>{order.restaurantLogo}</div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3 }}>{order.restaurantName}</h3>
                                <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>{order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}</p>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17, fontWeight: 700, color: theme.text }}>${order.total.toFixed(2)}</div>
                                <span style={{
                                    fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                                    padding: '3px 8px', borderRadius: 6,
                                    background: `${statusColors[order.status]}20`, color: statusColors[order.status],
                                }}>{order.status}</span>
                            </div>
                        </div>
                    ))}

                    {liveOrders.length === 0 && dataActive.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div style={{ fontSize: 56, marginBottom: 16 }}>📦</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 8 }}>No active orders</h3>
                            <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24 }}>When you place an order, it&apos;ll show up here with live tracking.</p>
                            <Link href="/" style={{ display: 'inline-block', background: theme.dark, color: theme.darkText, padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Browse Restaurants</Link>
                        </div>
                    )}
                </div>
            )}

            {/* Past Tab */}
            {tab === 'past' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {dataPast.map(order => (
                        <div key={order.id} style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: isMobile ? 16 : 20, boxShadow: theme.shadow,
                            display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20,
                        }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 24, flexShrink: 0,
                            }}>{order.restaurantLogo}</div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3 }}>{order.restaurantName}</h3>
                                <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>
                                    {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                </p>
                                <p style={{ fontSize: 12, color: theme.textFaint, margin: '4px 0 0' }}>
                                    {new Date(order.orderedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>${order.total.toFixed(2)}</div>
                                <span style={{ fontSize: 11, fontWeight: 600, color: '#22c55e' }}>Delivered ✓</span>
                            </div>
                        </div>
                    ))}
                    {dataPast.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0' }}>
                            <div style={{ fontSize: 56, marginBottom: 16 }}>🕐</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text }}>No past orders yet</h3>
                            <p style={{ fontSize: 14, color: theme.textMuted }}>Your order history will appear here after your first delivery.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
