"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLiveOrders } from '../../../../lib/LiveOrderContext';
import { useTheme } from '../../../../lib/ThemeContext';

export default function LiveOrderTrackingPage() {
    const params = useParams();
    const router = useRouter();
    const { getOrderById } = useLiveOrders();
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    // We poll or just let React Context magically update us when state changes.
    // In this mocked environment, context updates trigger re-renders natively.
    const order = getOrderById(params.id);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    if (!order) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16, padding: 40, background: theme.bg }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>🤷‍♂️</div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text }}>Order not found</h1>
                <p style={{ color: theme.textMuted }}>We couldn't find an active order with ID: {params.id}</p>
                <Link href="/" style={{ marginTop: 16, background: theme.dark, color: theme.darkText, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Return Home</Link>
            </div>
        );
    }

    const statuses = [
        { key: 'confirmed', label: 'Confirmed', icon: '📝', desc: 'Order received by restaurant' },
        { key: 'preparing', label: 'Preparing', icon: '👨‍🍳', desc: 'The kitchen is preparing your food' },
        { key: 'ready', label: 'Ready', icon: '✅', desc: 'Order is ready, waiting for driver' },
        { key: 'delivering', label: 'Out for Delivery', icon: '🚗', desc: 'Driver is on the way' },
        { key: 'delivered', label: 'Delivered', icon: '🎉', desc: 'Enjoy your meal!' }
    ];

    const currentStatusIndex = statuses.findIndex(s => s.key === order.status);

    return (
        <div style={{ paddingBottom: 100, background: theme.bg, minHeight: '100vh', transition: 'background 0.3s ease' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: isMobile ? '24px 16px' : '40px' }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
                    <div>
                        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 4 }}>
                            Order Status
                        </h1>
                        <p style={{ fontSize: 14, color: theme.textMuted, margin: 0 }}>
                            Order #{order.id} • {new Date(order.orderedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <div style={{ width: 48, height: 48, borderRadius: 16, background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                        {order.restaurantLogo || '🍽️'}
                    </div>
                </div>

                {/* Status Tracker */}
                <div style={{
                    background: theme.bgCard, borderRadius: 24, padding: isMobile ? 24 : 32,
                    border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 24
                }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 24 }}>
                        {order.restaurantName} is {order.status === 'confirmed' ? 'reviewing your order' : statuses[currentStatusIndex]?.desc.toLowerCase()}
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {statuses.map((step, idx) => {
                            const isCompleted = idx <= currentStatusIndex;
                            const isCurrent = idx === currentStatusIndex;

                            return (
                                <div key={step.key} style={{ display: 'flex', gap: 16, alignItems: 'center', opacity: isCompleted ? 1 : 0.4 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                                        background: isCurrent ? theme.dark : (isCompleted ? theme.accentBg : theme.bgInput),
                                        color: isCurrent ? theme.darkText : (isCompleted ? theme.accent : theme.textMuted),
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 14, fontWeight: 700,
                                        boxShadow: isCurrent ? `0 0 0 4px ${theme.border}` : 'none',
                                        transition: 'all 0.3s'
                                    }}>
                                        {isCompleted ? '✓' : (idx + 1)}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 15, fontWeight: isCurrent ? 700 : 600, color: theme.text }}>{step.label}</div>
                                        {isCurrent && <div style={{ fontSize: 13, color: theme.textMuted, marginTop: 2 }}>{step.desc}</div>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Map Mockup (only shows if delivering) */}
                {order.status === 'delivering' && (
                    <div style={{
                        background: '#e5e7eb', height: 200, borderRadius: 24, marginBottom: 24,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${theme.borderSubtle}`, overflow: 'hidden', position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                        <div style={{ background: 'white', padding: '8px 16px', borderRadius: 100, fontSize: 13, fontWeight: 700, color: '#111', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            🚗 Driver is 5 mins away
                        </div>
                    </div>
                )}

                {/* Order Details */}
                <div style={{
                    background: theme.bgCard, borderRadius: 24, padding: isMobile ? 24 : 32,
                    border: `1px solid ${theme.border}`, boxShadow: theme.shadow
                }}>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 16 }}>Order Details</h3>
                    <div style={{ borderBottom: `1px solid ${theme.borderSubtle}`, paddingBottom: 16, marginBottom: 16 }}>
                        {order.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
                                <span style={{ color: theme.textSecondary }}>
                                    <span style={{ fontWeight: 700, marginRight: 8 }}>{item.quantity}x</span> {item.name}
                                </span>
                                <span style={{ color: theme.text }}>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 700, color: theme.text }}>
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
