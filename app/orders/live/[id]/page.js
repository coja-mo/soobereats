"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLiveOrders } from '../../../../lib/LiveOrderContext';
import { useTheme } from '../../../../lib/ThemeContext';

// Simulated driver data
const DRIVERS = [
    { name: 'Marcus T.', vehicle: 'BYD Seal', plate: 'BTYX 291', rating: 4.97, trips: 1842, avatar: '👨🏾' },
    { name: 'Sarah K.', vehicle: 'Hyundai IONIQ 5', plate: 'AZKP 405', rating: 4.95, trips: 2156, avatar: '👩🏼' },
    { name: 'James W.', vehicle: 'Honda Prologue', plate: 'CPZR 118', rating: 4.98, trips: 3201, avatar: '👨🏻' },
];

export default function LiveOrderTrackingPage() {
    const params = useParams();
    const router = useRouter();
    const { getOrderById } = useLiveOrders();
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [eta, setEta] = useState(null);
    const [elapsed, setElapsed] = useState(0);
    const [driver] = useState(() => DRIVERS[Math.floor(Math.random() * DRIVERS.length)]);
    const [driverPos, setDriverPos] = useState({ x: 25, y: 75 });

    const order = getOrderById(params.id);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // ETA countdown
    useEffect(() => {
        if (!order) return;
        const etaMap = { confirmed: 35, preparing: 25, ready: 15, delivering: 5, delivered: 0 };
        setEta(etaMap[order.status] ?? 20);
    }, [order?.status]);

    // Elapsed time
    useEffect(() => {
        if (!order) return;
        const start = new Date(order.orderedAt).getTime();
        const tick = () => setElapsed(Math.floor((Date.now() - start) / 1000));
        tick();
        const iv = setInterval(tick, 1000);
        return () => clearInterval(iv);
    }, [order?.orderedAt]);

    // Animate driver position
    useEffect(() => {
        if (!order || order.status !== 'delivering') return;
        const dest = { x: 78, y: 32 };
        const iv = setInterval(() => {
            setDriverPos(prev => ({
                x: prev.x + (dest.x - prev.x) * 0.02 + (Math.random() - 0.5) * 0.5,
                y: prev.y + (dest.y - prev.y) * 0.02 + (Math.random() - 0.5) * 0.5,
            }));
        }, 100);
        return () => clearInterval(iv);
    }, [order?.status]);

    const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    if (!order) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16, padding: 40, background: theme.bg }}>
                <div style={{ fontSize: 60, marginBottom: 8 }}>🤷‍♂️</div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text }}>Order not found</h1>
                <p style={{ color: theme.textMuted }}>We couldn&apos;t find an active order with ID: {params.id}</p>
                <Link href="/" style={{ marginTop: 16, background: theme.dark, color: theme.darkText, padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Return Home</Link>
            </div>
        );
    }

    const statuses = [
        { key: 'confirmed', label: 'Confirmed', icon: '📝', desc: 'Order received by restaurant' },
        { key: 'preparing', label: 'Preparing', icon: '👨‍🍳', desc: 'The kitchen is making your food' },
        { key: 'ready', label: 'Ready', icon: '✅', desc: 'Ready and waiting for pickup' },
        { key: 'delivering', label: 'On the Way', icon: '🚗', desc: `${driver.name} is bringing your order` },
        { key: 'delivered', label: 'Delivered', icon: '🎉', desc: 'Enjoy your meal!' }
    ];

    const currentIdx = statuses.findIndex(s => s.key === order.status);
    const progressPct = Math.min(100, ((currentIdx + 0.5) / statuses.length) * 100);
    const isDelivering = order.status === 'delivering';
    const isDelivered = order.status === 'delivered';

    // Simulated map streets
    const streets = [
        'M 10,50 Q 30,20 50,50 T 90,50',
        'M 20,10 L 20,90', 'M 40,10 L 40,90', 'M 60,10 L 60,90', 'M 80,10 L 80,90',
        'M 10,25 L 90,25', 'M 10,75 L 90,75',
    ];

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', transition: 'background 0.3s ease', paddingBottom: 100 }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: isMobile ? '20px 16px' : '40px' }}>

                {/* Back + Header */}
                <button onClick={() => router.back()} style={{
                    background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                    color: theme.textFaint, fontSize: 14, fontWeight: 600, marginBottom: 16, padding: 0,
                }}>
                    ← Back to Orders
                </button>

                {/* Status Hero */}
                <div style={{
                    background: theme.bgCard, borderRadius: 28, padding: isMobile ? '24px 20px' : '32px 40px',
                    border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 16,
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* Animated pulse background for active statuses */}
                    {!isDelivered && (
                        <div style={{
                            position: 'absolute', top: -50, right: -50, width: 200, height: 200, borderRadius: '50%',
                            background: `radial-gradient(circle, ${isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.06)'} 0%, transparent 70%)`,
                            animation: 'etaPulse 3s ease-in-out infinite',
                        }} />
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 1 }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 14, background: theme.bgInput,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                                    border: `1px solid ${theme.borderSubtle}`,
                                }}>
                                    {order.restaurantLogo || '🍽️'}
                                </div>
                                <div>
                                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 20 : 26, fontWeight: 700, color: theme.text, margin: 0, letterSpacing: '-0.02em' }}>
                                        {statuses[currentIdx]?.icon} {statuses[currentIdx]?.label}
                                    </h1>
                                    <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, marginTop: 2 }}>
                                        {statuses[currentIdx]?.desc}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ETA Badge */}
                        {eta !== null && !isDelivered && (
                            <div style={{
                                background: isDark ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: 20, padding: '12px 24px', textAlign: 'center',
                            }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: '#10b981', fontVariantNumeric: 'tabular-nums', fontFamily: "'DM Sans', sans-serif" }}>
                                    ~{eta} min
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Estimated
                                </div>
                            </div>
                        )}
                        {isDelivered && (
                            <div style={{
                                background: isDark ? 'rgba(34, 197, 94, 0.12)' : 'rgba(34, 197, 94, 0.08)',
                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                borderRadius: 20, padding: '12px 24px', textAlign: 'center',
                            }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: '#22c55e' }}>✓</div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Complete</div>
                            </div>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginTop: 24, position: 'relative', zIndex: 1 }}>
                        <div style={{
                            height: 6, borderRadius: 3, background: theme.bgInput, overflow: 'hidden',
                        }}>
                            <div style={{
                                height: '100%', borderRadius: 3,
                                width: `${progressPct}%`,
                                background: isDelivered ? '#22c55e' : 'linear-gradient(90deg, #10b981, #34d399)',
                                transition: 'width 1s cubic-bezier(0.32, 0.72, 0, 1)',
                                position: 'relative',
                            }}>
                                {!isDelivered && (
                                    <div style={{
                                        position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)',
                                        width: 14, height: 14, borderRadius: '50%', background: '#10b981',
                                        border: `3px solid ${isDark ? '#111' : '#fff'}`,
                                        boxShadow: '0 0 12px rgba(16, 185, 129, 0.5)',
                                    }} />
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                            {statuses.map((s, i) => (
                                <span key={s.key} style={{
                                    fontSize: 10, fontWeight: i <= currentIdx ? 700 : 500,
                                    color: i <= currentIdx ? (i === currentIdx ? '#10b981' : theme.textSecondary) : theme.textFaint,
                                    textAlign: 'center', flex: 1,
                                }}>
                                    {isMobile ? s.icon : s.label}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Elapsed time */}
                    <div style={{ marginTop: 12, display: 'flex', gap: 16, fontSize: 12, color: theme.textFaint, position: 'relative', zIndex: 1 }}>
                        <span>⏱ Elapsed: {fmtTime(elapsed)}</span>
                        <span>📋 Order #{order.id}</span>
                        <span>⚡ Zero-Emission EV</span>
                    </div>
                </div>

                {/* Two Column Layout: Map + Driver Info */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr',
                    gap: 16, marginBottom: 16,
                }}>
                    {/* Animated Map */}
                    <div style={{
                        background: isDark ? '#0c1a12' : '#eef7f1', borderRadius: 24,
                        border: `1px solid ${theme.border}`, overflow: 'hidden',
                        height: isMobile ? 220 : 280, position: 'relative',
                    }}>
                        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
                            {/* Street grid */}
                            {streets.map((d, i) => (
                                <path key={i} d={d} stroke={isDark ? '#1a3325' : '#c8e0d0'} strokeWidth="0.5" fill="none" />
                            ))}
                            {/* Main road */}
                            <path d="M 15,80 Q 45,50 78,32" stroke={isDark ? '#2a5a3a' : '#8ec4a0'} strokeWidth="1.5" fill="none" strokeDasharray="3,2" />
                            {/* Destination pin */}
                            <g transform="translate(78, 32)">
                                <circle r="4" fill="#10b981" opacity="0.2">
                                    <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle r="3" fill="#10b981" />
                                <text y="1.5" textAnchor="middle" fontSize="3.5" fill="white" fontWeight="bold">🏠</text>
                            </g>
                            {/* Driver dot */}
                            {isDelivering && (
                                <g transform={`translate(${driverPos.x}, ${driverPos.y})`}>
                                    <circle r="6" fill="#10b981" opacity="0.15">
                                        <animate attributeName="r" values="6;10;6" dur="1.5s" repeatCount="indefinite" />
                                    </circle>
                                    <circle r="3.5" fill={isDark ? '#111' : '#fff'} stroke="#10b981" strokeWidth="1.5" />
                                    <text y="1.2" textAnchor="middle" fontSize="3.5">🚗</text>
                                </g>
                            )}
                            {/* Restaurant pin */}
                            <g transform="translate(15, 80)">
                                <circle r="3" fill="#f59e0b" />
                                <text y="1.5" textAnchor="middle" fontSize="3.5" fill="white">🍽</text>
                            </g>
                        </svg>

                        {/* Map overlay badge */}
                        <div style={{
                            position: 'absolute', bottom: 12, left: 12,
                            background: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)',
                            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                            borderRadius: 12, padding: '6px 12px',
                            display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: theme.text }}>
                                {isDelivering ? 'Driver en route' : isDelivered ? 'Delivered' : 'At restaurant'}
                            </span>
                        </div>

                        {/* Sault Ste. Marie label */}
                        <div style={{
                            position: 'absolute', top: 12, right: 12,
                            fontSize: 10, fontWeight: 600, color: theme.textFaint,
                            background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
                            padding: '4px 8px', borderRadius: 6,
                        }}>
                            📍 Sault Ste. Marie, ON
                        </div>
                    </div>

                    {/* Driver Card */}
                    <div style={{
                        background: theme.bgCard, borderRadius: 24,
                        border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
                        padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    }}>
                        {isDelivering || isDelivered ? (
                            <>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                                        Your Driver
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                        <div style={{
                                            width: 56, height: 56, borderRadius: '50%', background: theme.bgInput,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32,
                                            border: `2px solid ${theme.border}`,
                                        }}>
                                            {driver.avatar}
                                        </div>
                                        <div>
                                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text }}>{driver.name}</div>
                                            <div style={{ fontSize: 13, color: theme.textFaint }}>{driver.vehicle}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                                        <div style={{ flex: 1, background: theme.bgInput, borderRadius: 14, padding: '10px 14px', textAlign: 'center' }}>
                                            <div style={{ fontSize: 18, fontWeight: 800, color: theme.text }}>{driver.rating}</div>
                                            <div style={{ fontSize: 10, fontWeight: 600, color: theme.textFaint, textTransform: 'uppercase' }}>Rating</div>
                                        </div>
                                        <div style={{ flex: 1, background: theme.bgInput, borderRadius: 14, padding: '10px 14px', textAlign: 'center' }}>
                                            <div style={{ fontSize: 18, fontWeight: 800, color: theme.text }}>{driver.trips.toLocaleString()}</div>
                                            <div style={{ fontSize: 10, fontWeight: 600, color: theme.textFaint, textTransform: 'uppercase' }}>Trips</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button style={{
                                        flex: 1, padding: '12px 16px', borderRadius: 14,
                                        background: theme.dark, color: theme.darkText, border: 'none',
                                        fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                    }}>💬 Message</button>
                                    <button style={{
                                        flex: 1, padding: '12px 16px', borderRadius: 14,
                                        background: theme.bgInput, color: theme.text,
                                        border: `1px solid ${theme.border}`,
                                        fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                    }}>📞 Call</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 40, marginBottom: 12 }}>👨‍🍳</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 6 }}>
                                    Being Prepared
                                </div>
                                <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, lineHeight: 1.5 }}>
                                    A driver will be assigned once your order is ready for pickup.
                                </p>
                                <div style={{
                                    marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6,
                                    background: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.08)',
                                    border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12,
                                    padding: '8px 14px', fontSize: 12, fontWeight: 600, color: '#f59e0b',
                                }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', animation: 'etaPulse 1.5s ease-in-out infinite' }} />
                                    Restaurant is preparing
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Details Card */}
                <div style={{
                    background: theme.bgCard, borderRadius: 24, padding: isMobile ? 24 : 32,
                    border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>
                            Order from {order.restaurantName}
                        </h3>
                        <span style={{ fontSize: 12, color: theme.textFaint }}>
                            {new Date(order.orderedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {order.items.map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '12px 16px', borderRadius: 16,
                                background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 12,
                                    background: isDark ? '#1a2a1f' : '#e8f5ec',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 14, fontWeight: 800, color: '#10b981', flexShrink: 0,
                                }}>
                                    {item.quantity}x
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{item.name}</div>
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 700, color: theme.text, fontVariantNumeric: 'tabular-nums' }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Totals */}
                    <div style={{ borderTop: `1px solid ${theme.borderSubtle}`, marginTop: 20, paddingTop: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: theme.textFaint, marginBottom: 8 }}>
                            <span>Subtotal</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: theme.textFaint, marginBottom: 8 }}>
                            <span>Delivery Fee</span>
                            <span style={{ color: '#10b981', fontWeight: 600 }}>Free</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: theme.textFaint, marginBottom: 12 }}>
                            <span>Service Fee</span>
                            <span>$1.99</span>
                        </div>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between',
                            fontSize: 18, fontWeight: 800, color: theme.text,
                            fontFamily: "'DM Sans', sans-serif",
                        }}>
                            <span>Total</span>
                            <span>${(order.total + 1.99).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Help / Support CTA */}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Link href="/support" style={{
                        fontSize: 13, fontWeight: 600, color: theme.textFaint,
                        textDecoration: 'none',
                    }}>
                        Need help? Contact Support →
                    </Link>
                </div>

            </div>

            <style>{`
                @keyframes etaPulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
}
