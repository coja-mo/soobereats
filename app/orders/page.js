"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { useLiveOrders } from '../../lib/LiveOrderContext';
import { getActiveOrders, getPastOrders, orderStatuses } from '../../lib/data/orders';

// ── Status Config ──────────────────────────────────────────────────────────
const STATUS_CONFIG = {
    confirmed: { color: '#3b82f6', label: 'Confirmed', icon: '✓', step: 0 },
    preparing: { color: '#f59e0b', label: 'Preparing', icon: '👨‍🍳', step: 1 },
    ready: { color: '#8b5cf6', label: 'Ready', icon: '📦', step: 2 },
    'picked-up': { color: '#06b6d4', label: 'Picked Up', icon: '🚗', step: 3 },
    delivering: { color: '#10b981', label: 'On the Way', icon: '⚡', step: 4 },
    delivered: { color: '#22c55e', label: 'Delivered', icon: '✓', step: 5 },
    cancelled: { color: '#ef4444', label: 'Cancelled', icon: '✕', step: -1 },
};

const PROGRESS_STEPS = ['Confirmed', 'Preparing', 'Ready', 'Picked Up', 'Delivering', 'Delivered'];

// ── Mini SVG Map ───────────────────────────────────────────────────────────
function MiniMap({ status, isDark }) {
    const driverProgress = STATUS_CONFIG[status]?.step ?? 0;
    const pathPct = Math.min(100, (driverProgress / 5) * 100);

    return (
        <svg width="100%" height="80" viewBox="0 0 300 80" style={{ borderRadius: 12, overflow: 'hidden' }}>
            <rect width="300" height="80" fill={isDark ? '#111113' : '#f1f5f9'} />
            {/* Grid lines */}
            {[60, 120, 180, 240].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="80" stroke={isDark ? '#1e1e22' : '#e2e8f0'} strokeWidth="0.5" />)}
            {[20, 40, 60].map(y => <line key={`h${y}`} x1="0" y1={y} x2="300" y2={y} stroke={isDark ? '#1e1e22' : '#e2e8f0'} strokeWidth="0.5" />)}
            {/* Route path */}
            <path d="M30 60 Q80 60 100 40 Q120 20 160 30 Q200 40 230 25 Q260 10 270 20" fill="none"
                stroke={isDark ? '#27272a' : '#cbd5e1'} strokeWidth="3" strokeLinecap="round" />
            <path d="M30 60 Q80 60 100 40 Q120 20 160 30 Q200 40 230 25 Q260 10 270 20" fill="none"
                stroke="#0066FF" strokeWidth="3" strokeLinecap="round"
                strokeDasharray="240" strokeDashoffset={240 - (240 * pathPct / 100)} />
            {/* Restaurant pin */}
            <circle cx="30" cy="60" r="6" fill="#f59e0b" />
            <text x="30" y="63" textAnchor="middle" fontSize="8" fill="#fff">🍽</text>
            {/* Home pin */}
            <circle cx="270" cy="20" r="6" fill="#22c55e" />
            <text x="270" y="23" textAnchor="middle" fontSize="8" fill="#fff">🏠</text>
            {/* Driver dot */}
            {status !== 'delivered' && status !== 'cancelled' && (
                <circle cx={30 + (240 * pathPct / 100)} cy={60 - (40 * pathPct / 100) + Math.sin(pathPct / 15) * 10}
                    r="5" fill="#0066FF" stroke="#fff" strokeWidth="2">
                    <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
                </circle>
            )}
        </svg>
    );
}

// ── Progress Bar ───────────────────────────────────────────────────────────
function OrderProgress({ status, theme, isMobile }) {
    const currentStep = STATUS_CONFIG[status]?.step ?? 0;
    const statusColor = STATUS_CONFIG[status]?.color || '#3b82f6';

    return (
        <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 6 }}>
                {PROGRESS_STEPS.map((label, i) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < PROGRESS_STEPS.length - 1 ? 1 : 0 }}>
                        <div style={{
                            width: isMobile ? 16 : 20, height: isMobile ? 16 : 20,
                            borderRadius: '50%',
                            background: i <= currentStep
                                ? statusColor
                                : theme.bgInput,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 8, color: '#fff', fontWeight: 800,
                            transition: 'all 0.3s',
                            boxShadow: i === currentStep ? `0 0 12px ${statusColor}60` : 'none',
                            flexShrink: 0,
                        }}>
                            {i < currentStep ? '✓' : i === currentStep ? '●' : ''}
                        </div>
                        {i < PROGRESS_STEPS.length - 1 && (
                            <div style={{
                                flex: 1, height: 3, borderRadius: 2,
                                background: i < currentStep ? statusColor : theme.bgInput,
                                transition: 'background 0.3s',
                                margin: '0 2px',
                            }} />
                        )}
                    </div>
                ))}
            </div>
            {!isMobile && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {PROGRESS_STEPS.map((label, i) => (
                        <span key={label} style={{
                            fontSize: 9, fontWeight: 600, textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            color: i <= currentStep ? statusColor : theme.textFaint,
                            transition: 'color 0.3s',
                            width: 0, textAlign: 'center',
                            whiteSpace: 'nowrap',
                        }}>{label}</span>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function OrdersPage() {
    const { theme, isDark } = useTheme();
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
    const allActive = [...liveOrders, ...dataActive];

    const cardStyle = {
        background: theme.bgCard, border: `1px solid ${theme.borderLight}`,
        borderRadius: 22, padding: isMobile ? 16 : 24,
        boxShadow: theme.shadow, transition: 'all 0.2s',
    };

    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: isMobile ? '24px 16px 100px' : '40px 40px 100px', background: theme.bg }}>
            {/* Header */}
            <div style={{ marginBottom: isMobile ? 20 : 32 }}>
                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                    fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 8,
                }}>Your Orders</h1>
                <p style={{ fontSize: 15, color: theme.textMuted }}>
                    Track active deliveries and view past orders.
                </p>
            </div>

            {/* Summary Cards */}
            <div style={{
                display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: 10, marginBottom: isMobile ? 20 : 28,
            }}>
                {[
                    { emoji: '🔥', value: allActive.length, label: 'Active', color: '#f59e0b' },
                    { emoji: '✅', value: dataPast.length, label: 'Completed', color: '#22c55e' },
                    { emoji: '⚡', value: '100%', label: 'Electric', color: '#0066FF' },
                    { emoji: '⭐', value: '4.9', label: 'Avg Rating', color: '#eab308' },
                ].map(s => (
                    <div key={s.label} style={{
                        ...cardStyle, textAlign: 'center', padding: isMobile ? 14 : 18,
                    }}>
                        <span style={{ fontSize: 20 }}>{s.emoji}</span>
                        <div style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 28,
                            fontWeight: 800, color: theme.text, lineHeight: 1.2,
                        }}>{s.value}</div>
                        <div style={{ fontSize: 11, color: theme.textFaint, fontWeight: 600 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex', gap: 4, background: theme.bgAlt, borderRadius: 16, padding: 4,
                marginBottom: isMobile ? 20 : 28, border: `1px solid ${theme.borderLight}`,
            }}>
                {[
                    { id: 'active', label: `Active (${allActive.length})`, emoji: '📡' },
                    { id: 'past', label: `Past (${dataPast.length})`, emoji: '📦' },
                ].map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        flex: 1, padding: '12px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                        fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                        background: tab === t.id ? theme.bgCard : 'transparent',
                        color: tab === t.id ? theme.text : theme.textFaint,
                        boxShadow: tab === t.id ? theme.shadowMd : 'none',
                        transition: 'all 0.25s',
                    }}>{t.emoji} {t.label}</button>
                ))}
            </div>

            {/* ─── Active Tab ──────────────────────────────────────────── */}
            {tab === 'active' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {allActive.map(order => {
                        const sc = STATUS_CONFIG[order.status] || STATUS_CONFIG.confirmed;
                        return (
                            <Link key={order.id} href={`/orders/live/${order.id}`}
                                style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{
                                    ...cardStyle,
                                    borderLeft: `4px solid ${sc.color}`,
                                    cursor: 'pointer',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = theme.shadowMd; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20, marginBottom: 12 }}>
                                        <div style={{
                                            width: isMobile ? 48 : 56, height: isMobile ? 48 : 56,
                                            borderRadius: isMobile ? 16 : 18,
                                            background: theme.bgInput, display: 'flex',
                                            alignItems: 'center', justifyContent: 'center',
                                            fontSize: isMobile ? 24 : 28, flexShrink: 0,
                                        }}>{order.restaurantLogo || '🍽️'}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                                                <h3 style={{
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    fontSize: isMobile ? 15 : 17, fontWeight: 700,
                                                    color: theme.text, margin: 0,
                                                }}>{order.restaurantName}</h3>
                                                <span style={{
                                                    fontSize: 10, fontWeight: 800,
                                                    textTransform: 'uppercase', letterSpacing: '0.05em',
                                                    padding: '3px 10px', borderRadius: 8,
                                                    background: `${sc.color}18`, color: sc.color,
                                                    display: 'inline-flex', alignItems: 'center', gap: 4,
                                                }}>
                                                    <span style={{ animation: 'pulse 1.5s infinite' }}>●</span> {sc.label}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>
                                                {order.items?.length || 0} items · {order.estimatedDelivery || 'Tracking live'}
                                            </p>
                                        </div>
                                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                            <div style={{
                                                fontFamily: "'DM Sans', sans-serif",
                                                fontSize: isMobile ? 17 : 20, fontWeight: 800, color: theme.text,
                                            }}>${order.total?.toFixed(2) || '0.00'}</div>
                                            <span style={{ fontSize: 11, color: '#0066FF', fontWeight: 600 }}>⚡ EV</span>
                                        </div>
                                    </div>

                                    {/* Mini Map */}
                                    <MiniMap status={order.status} isDark={isDark} />

                                    {/* Progress Bar */}
                                    <OrderProgress status={order.status} theme={theme} isMobile={isMobile} />
                                </div>
                            </Link>
                        );
                    })}

                    {allActive.length === 0 && (
                        <div style={{
                            textAlign: 'center', padding: '60px 0',
                            ...cardStyle,
                        }}>
                            <div style={{ fontSize: 56, marginBottom: 16 }}>📦</div>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 20,
                                fontWeight: 700, color: theme.text, marginBottom: 8,
                            }}>No active orders</h3>
                            <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24 }}>
                                When you place an order, it&apos;ll show up here with live tracking.
                            </p>
                            <Link href="/" style={{
                                display: 'inline-block', background: theme.dark, color: theme.darkText,
                                padding: '14px 32px', borderRadius: 14,
                                fontSize: 15, fontWeight: 700, textDecoration: 'none',
                                fontFamily: "'DM Sans', sans-serif",
                            }}>Browse Restaurants</Link>
                        </div>
                    )}
                </div>
            )}

            {/* ─── Past Tab ────────────────────────────────────────────── */}
            {tab === 'past' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {dataPast.map(order => (
                        <div key={order.id} style={{
                            ...cardStyle,
                            display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                            gap: isMobile ? 12 : 20,
                            flexDirection: isMobile ? 'column' : 'row',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = theme.shadowMd; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20, flex: 1, width: '100%' }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 16,
                                    background: theme.bgInput, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: 24, flexShrink: 0,
                                }}>{order.restaurantLogo}</div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                                        fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3,
                                    }}>{order.restaurantName}</h3>
                                    <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>
                                        {order.items?.map(i => `${i.quantity}× ${i.name}`).join(', ')}
                                    </p>
                                    <p style={{ fontSize: 12, color: theme.textFaint, margin: '3px 0 0' }}>
                                        {new Date(order.orderedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        {order.driverName && ` · Delivered by ${order.driverName}`}
                                    </p>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end',
                                flexDirection: 'column', gap: 8,
                                width: isMobile ? '100%' : 'auto',
                            }}>
                                <div style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: isMobile ? 17 : 20, fontWeight: 800, color: theme.text,
                                }}>${order.total.toFixed(2)}</div>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                    <span style={{
                                        fontSize: 11, fontWeight: 700, color: '#22c55e',
                                        background: 'rgba(34,197,94,0.1)', padding: '3px 10px',
                                        borderRadius: 8, textTransform: 'uppercase',
                                    }}>✓ Delivered</span>
                                    <Link href="/" style={{
                                        fontSize: 12, fontWeight: 700, color: '#0066FF',
                                        background: 'rgba(0,102,255,0.08)', padding: '5px 14px',
                                        borderRadius: 10, textDecoration: 'none',
                                    }}>🔄 Reorder</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    {dataPast.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '60px 0', ...cardStyle }}>
                            <div style={{ fontSize: 56, marginBottom: 16 }}>🕐</div>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 20,
                                fontWeight: 700, color: theme.text,
                            }}>No past orders yet</h3>
                            <p style={{ fontSize: 14, color: theme.textMuted }}>
                                Your order history will appear here after your first delivery.
                            </p>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>
        </div>
    );
}
