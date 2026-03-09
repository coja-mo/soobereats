"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLiveOrders } from '../../../lib/LiveOrderContext';
import { useTheme } from '../../../lib/ThemeContext';
import { orderStatuses } from '../../../lib/data/orders';

export default function VendorKDS() {
    const { activeOrders, updateOrderStatus } = useLiveOrders();
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    // Hardcoding a specific vendor for demo purposes.
    // In a real app, this would be tied to the authenticated user's session.
    const vendorId = 'sakura-ramen';
    const vendorOrders = activeOrders.filter(o => o.restaurantId === vendorId);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const columns = [
        { id: 'confirmed', title: 'New Orders', color: '#3b82f6' },
        { id: 'preparing', title: 'Preparing', color: '#eab308' },
        { id: 'ready', title: 'Ready for Pickup', color: '#22c55e' },
        { id: 'delivering', title: 'Out for Delivery', color: '#a855f7' }
    ];

    const moveOrder = (orderId, currentStatus) => {
        const currentIndex = orderStatuses.indexOf(currentStatus);
        if (currentIndex < orderStatuses.length - 1) {
            updateOrderStatus(orderId, orderStatuses[currentIndex + 1]);
        }
    };

    return (
        <div style={{ background: theme.bgAlt, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Nav / Header */}
            <div style={{
                background: theme.bgCard, padding: '16px 32px', borderBottom: `1px solid ${theme.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                position: 'sticky', top: 0, zIndex: 100, boxShadow: theme.shadow
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🧑‍🍳</div>
                    <div>
                        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>Kitchen Display System</h1>
                        <p style={{ fontSize: 13, color: theme.textMuted, margin: 0 }}>Sakura Ramen House</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: theme.textSecondary }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }}></span> Accepting Orders
                    </div>
                    <Link href="/vendor" style={{ padding: '8px 16px', borderRadius: 8, background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`, color: theme.text, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Admin Dashboard</Link>
                </div>
            </div>

            {/* Kanban Board */}
            <div style={{
                flex: 1, padding: isMobile ? 16 : 32,
                display: 'flex', gap: 24, overflowX: 'auto',
                alignItems: 'flex-start'
            }}>
                {columns.map(col => {
                    const colOrders = vendorOrders.filter(o => o.status === col.id);

                    return (
                        <div key={col.id} style={{
                            width: 320, flexShrink: 0, background: theme.bgInput,
                            borderRadius: 20, padding: 16, border: `1px solid ${theme.borderSubtle}`,
                            maxHeight: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column'
                        }}>
                            {/* Column Header */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, padding: '0 8px' }}>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text, display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: col.color }}></span>
                                    {col.title}
                                </h3>
                                <span style={{ background: theme.bgCard, padding: '2px 8px', borderRadius: 100, fontSize: 12, fontWeight: 700, color: theme.textSecondary }}>
                                    {colOrders.length}
                                </span>
                            </div>

                            {/* Orders List */}
                            <div style={{ overflowY: 'auto', flex: 1, paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {colOrders.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '32px 16px', color: theme.textFaint, fontSize: 13, fontWeight: 500 }}>
                                        No orders in this stage
                                    </div>
                                ) : (
                                    colOrders.map(order => (
                                        <div key={order.id} style={{
                                            background: theme.bgCard, borderRadius: 16, padding: 16,
                                            border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow,
                                            animation: 'slideIn 0.3s ease-out'
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                                <div>
                                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text }}>#{order.id.split('-')[1]}</div>
                                                    <div style={{ fontSize: 12, color: theme.textMuted }}>{new Date(order.orderedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </div>
                                                {order.customer && (
                                                    <div style={{ background: theme.bgInput, padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, color: theme.textSecondary }}>
                                                        {order.customer.name}
                                                    </div>
                                                )}
                                            </div>

                                            <div style={{ borderTop: `1px solid ${theme.border}`, borderBottom: `1px solid ${theme.border}`, padding: '12px 0', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                {order.items.map((item, i) => (
                                                    <div key={i} style={{ display: 'flex', gap: 8, fontSize: 14 }}>
                                                        <span style={{ fontWeight: 700, color: theme.text }}>{item.quantity}x</span>
                                                        <span style={{ color: theme.textSecondary }}>
                                                            {item.name}
                                                            {item.options && (
                                                                <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2 }}>{item.options.join(', ')}</div>
                                                            )}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {col.id !== 'delivering' && (
                                                <button
                                                    onClick={() => moveOrder(order.id, order.status)}
                                                    style={{
                                                        width: '100%', padding: '10px 0', borderRadius: 10,
                                                        background: col.id === 'confirmed' ? theme.dark : (col.id === 'preparing' ? '#eab308' : '#22c55e'),
                                                        color: col.id === 'confirmed' ? theme.darkText : '#fff',
                                                        border: 'none', cursor: 'pointer',
                                                        fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                                                        transition: 'opacity 0.2s'
                                                    }}
                                                    onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
                                                    onMouseLeave={e => e.currentTarget.style.opacity = 1}
                                                >
                                                    {col.id === 'confirmed' ? 'Mark as Preparing' : (col.id === 'preparing' ? 'Ready for Pickup' : 'Dispatch Driver')}
                                                </button>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <style>{`
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
