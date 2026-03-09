"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';

// ── Simulated Driver Data ──────────────────────────────────────────────────
const DRIVER = {
    name: 'Marcus Thompson', avatar: '👨🏾', id: 'DRV-001',
    vehicle: 'BYD Seal', plate: 'BTYX 291', chargeLevel: 73,
    rating: 4.97, totalTrips: 1842, weeklyTrips: 31,
    status: 'online', tier: 'Gold',
};

const EARNINGS = {
    today: { base: 68.50, tips: 34.25, bonus: 12.00, total: 114.75, deliveries: 9 },
    week: { base: 412.00, tips: 198.50, bonus: 45.00, total: 655.50, deliveries: 52 },
    month: { base: 1680.00, tips: 812.00, bonus: 180.00, total: 2672.00, deliveries: 212 },
};

const RECENT_DELIVERIES = [
    { id: 'DEL-3847', restaurant: "Aurora's Restaurant", emoji: '🍝', items: 3, total: 48.50, tip: 8.00, distance: '3.2 km', time: '18 min', rating: 5, status: 'delivered', timestamp: '7:42 PM' },
    { id: 'DEL-3846', restaurant: "Tandoori Gardan", emoji: '🍛', items: 2, total: 32.99, tip: 6.00, distance: '2.1 km', time: '14 min', rating: 5, status: 'delivered', timestamp: '7:08 PM' },
    { id: 'DEL-3845', restaurant: "Sandro's", emoji: '🍕', items: 4, total: 56.75, tip: 10.00, distance: '4.5 km', time: '22 min', rating: 4, status: 'delivered', timestamp: '6:31 PM' },
    { id: 'DEL-3844', restaurant: "Thai Basil", emoji: '🥘', items: 1, total: 18.99, tip: 4.00, distance: '1.8 km', time: '11 min', rating: 5, status: 'delivered', timestamp: '5:55 PM' },
    { id: 'DEL-3843', restaurant: "Soo Fresh Market", emoji: '🥖', items: 5, total: 71.20, tip: 12.00, distance: '5.1 km', time: '25 min', rating: 5, status: 'delivered', timestamp: '5:12 PM' },
    { id: 'DEL-3842', restaurant: "Jenn Bakes", emoji: '🧁', items: 2, total: 24.50, tip: 5.00, distance: '2.8 km', time: '16 min', rating: 5, status: 'delivered', timestamp: '4:38 PM' },
];

const UPCOMING_SHIFTS = [
    { day: 'Tomorrow', date: 'Mar 10', start: '11:00 AM', end: '3:00 PM', zone: 'Downtown Core', type: 'Delivery' },
    { day: 'Wed', date: 'Mar 11', start: '5:00 PM', end: '9:00 PM', zone: 'East End + Extended', type: 'Delivery' },
    { day: 'Fri', date: 'Mar 13', start: '6:00 PM', end: '10:00 PM', zone: 'Full Coverage', type: 'Delivery + Rides' },
];

const PERFORMANCE = [
    { label: 'On-Time Rate', value: '98.2%', color: '#22c55e', icon: '⏱' },
    { label: 'Acceptance Rate', value: '94.5%', color: '#3b82f6', icon: '✅' },
    { label: 'Customer Rating', value: '4.97', color: '#f59e0b', icon: '⭐' },
    { label: 'Completion Rate', value: '99.8%', color: '#8b5cf6', icon: '🎯' },
];

export default function DriverPortalPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [earningsPeriod, setEarningsPeriod] = useState('today');
    const [isOnline, setIsOnline] = useState(true);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const tick = () => setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        tick();
        const iv = setInterval(tick, 1000);
        return () => clearInterval(iv);
    }, []);

    const currentEarnings = EARNINGS[earningsPeriod];
    const chargeColor = DRIVER.chargeLevel > 60 ? '#22c55e' : DRIVER.chargeLevel > 30 ? '#f59e0b' : '#ef4444';

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', transition: 'all 0.3s ease', paddingBottom: 100 }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '20px 16px' : '40px' }}>

                {/* ── HEADER ────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: '50%', background: theme.bgInput,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                            border: `2px solid ${isOnline ? '#22c55e' : theme.border}`,
                            boxShadow: isOnline ? '0 0 12px rgba(34,197,94,0.3)' : 'none',
                        }}>
                            {DRIVER.avatar}
                        </div>
                        <div>
                            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: theme.text, margin: 0, letterSpacing: '-0.02em' }}>
                                {DRIVER.name}
                            </h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#eab308', background: 'rgba(234,179,8,0.1)', padding: '2px 8px', borderRadius: 6 }}>🥇 {DRIVER.tier}</span>
                                <span style={{ fontSize: 12, color: theme.textFaint }}>{DRIVER.id} · {DRIVER.vehicle}</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: theme.textFaint, fontVariantNumeric: 'tabular-nums' }}>{currentTime}</span>
                        <button onClick={() => setIsOnline(!isOnline)} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '10px 20px', borderRadius: 100,
                            background: isOnline ? '#22c55e' : theme.bgInput,
                            color: isOnline ? '#fff' : theme.textFaint,
                            border: isOnline ? 'none' : `1px solid ${theme.border}`,
                            fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.3s',
                        }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: isOnline ? '#fff' : theme.textFaint }} />
                            {isOnline ? 'Online' : 'Offline'}
                        </button>
                    </div>
                </div>

                {/* ── STATUS BAR ───────────── */}
                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: 12, marginBottom: 24,
                }}>
                    {PERFORMANCE.map((p, i) => (
                        <div key={i} style={{
                            background: theme.bgCard, borderRadius: 20, padding: '16px 20px',
                            border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ fontSize: 16 }}>{p.icon}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.label}</span>
                            </div>
                            <div style={{ fontSize: 24, fontWeight: 800, color: p.color, fontFamily: "'DM Sans', sans-serif" }}>{p.value}</div>
                        </div>
                    ))}
                </div>

                {/* ── TWO COLUMN LAYOUT ──── */}
                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr',
                    gap: 20, marginBottom: 24,
                }}>
                    {/* Earnings Panel */}
                    <div style={{
                        background: theme.bgCard, borderRadius: 24, padding: 28,
                        border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>💰 Earnings</h2>
                            <div style={{ display: 'flex', gap: 4, background: theme.bgInput, borderRadius: 12, padding: 3 }}>
                                {['today', 'week', 'month'].map(p => (
                                    <button key={p} onClick={() => setEarningsPeriod(p)} style={{
                                        padding: '6px 14px', borderRadius: 10, border: 'none',
                                        background: earningsPeriod === p ? (isDark ? '#fafafa' : '#09090b') : 'transparent',
                                        color: earningsPeriod === p ? (isDark ? '#09090b' : '#fff') : theme.textFaint,
                                        fontSize: 12, fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize',
                                    }}>{p}</button>
                                ))}
                            </div>
                        </div>

                        {/* Total */}
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <div style={{ fontSize: 44, fontWeight: 800, color: '#10b981', fontFamily: "'DM Sans', sans-serif", fontVariantNumeric: 'tabular-nums' }}>
                                ${currentEarnings.total.toFixed(2)}
                            </div>
                            <div style={{ fontSize: 13, color: theme.textFaint, marginTop: 4 }}>{currentEarnings.deliveries} deliveries</div>
                        </div>

                        {/* Breakdown */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[
                                { label: 'Base Pay', value: currentEarnings.base, color: theme.text },
                                { label: 'Tips', value: currentEarnings.tips, color: '#22c55e' },
                                { label: 'Bonuses', value: currentEarnings.bonus, color: '#f59e0b' },
                            ].map(row => (
                                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 12, background: theme.bgInput }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: theme.textSecondary }}>{row.label}</span>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: row.color }}>${row.value.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Vehicle + Shifts */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {/* Vehicle Card */}
                        <div style={{
                            background: theme.bgCard, borderRadius: 24, padding: 24,
                            border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
                        }}>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 16 }}>⚡ Vehicle Status</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                <div style={{
                                    width: 60, height: 60, borderRadius: 18,
                                    background: isDark ? '#0c1a12' : '#e8f5ec',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
                                }}>🚗</div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: theme.text }}>{DRIVER.vehicle}</div>
                                    <div style={{ fontSize: 13, color: theme.textFaint }}>{DRIVER.plate}</div>
                                </div>
                            </div>
                            {/* Charge Bar */}
                            <div style={{ marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: theme.textFaint }}>Battery</span>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: chargeColor }}>{DRIVER.chargeLevel}%</span>
                                </div>
                                <div style={{ height: 8, borderRadius: 4, background: theme.bgInput, overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', borderRadius: 4, width: `${DRIVER.chargeLevel}%`,
                                        background: `linear-gradient(90deg, ${chargeColor}, ${chargeColor}cc)`,
                                        transition: 'width 1s ease',
                                    }} />
                                </div>
                                <div style={{ fontSize: 12, color: theme.textFaint, marginTop: 6 }}>~{Math.round(DRIVER.chargeLevel * 3.8)} km estimated range</div>
                            </div>
                        </div>

                        {/* Upcoming Shifts */}
                        <div style={{
                            background: theme.bgCard, borderRadius: 24, padding: 24,
                            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, flex: 1,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0 }}>📅 Upcoming Shifts</h3>
                                <Link href="/scheduler" style={{ fontSize: 12, fontWeight: 700, color: '#10b981', textDecoration: 'none' }}>View All →</Link>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {UPCOMING_SHIFTS.map((shift, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '12px 14px', borderRadius: 14,
                                        background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                    }}>
                                        <div style={{ textAlign: 'center', flex: '0 0 42px' }}>
                                            <div style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase' }}>{shift.day}</div>
                                            <div style={{ fontSize: 14, fontWeight: 800, color: theme.text }}>{shift.date.split(' ')[1]}</div>
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{shift.start} – {shift.end}</div>
                                            <div style={{ fontSize: 11, color: theme.textFaint }}>{shift.zone} · {shift.type}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RECENT DELIVERIES ──── */}
                <div style={{
                    background: theme.bgCard, borderRadius: 24, padding: isMobile ? 20 : 28,
                    border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 24,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>📋 Recent Deliveries</h2>
                        <Link href="/orders" style={{ fontSize: 12, fontWeight: 700, color: '#10b981', textDecoration: 'none' }}>All History →</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {RECENT_DELIVERIES.map((del) => (
                            <div key={del.id} style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '14px 16px', borderRadius: 16,
                                background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                            }}>
                                <div style={{
                                    width: 44, height: 44, borderRadius: 14,
                                    background: isDark ? '#1a2a1f' : '#e8f5ec',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
                                }}>{del.emoji}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{del.restaurant}</span>
                                        <span style={{ fontSize: 10, color: theme.textFaint }}>#{del.id.split('-')[1]}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: theme.textFaint }}>
                                        {del.items} items · {del.distance} · {del.time} · {del.timestamp}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#22c55e' }}>+${del.tip.toFixed(2)}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                                        {'⭐'.repeat(del.rating)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── QUICK LINKS ───────── */}
                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: 12,
                }}>
                    {[
                        { href: '/academy', icon: '🎓', label: 'Academy', desc: 'Continue training', color: '#6366f1' },
                        { href: '/scheduler', icon: '📅', label: 'Scheduler', desc: 'Manage shifts', color: '#10b981' },
                        { href: '/support', icon: '💬', label: 'Support', desc: 'Get help', color: '#3b82f6' },
                        { href: '/for-drivers', icon: '⚡', label: 'Fleet Info', desc: 'EV resources', color: '#f59e0b' },
                    ].map(link => (
                        <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                background: theme.bgCard, borderRadius: 20, padding: 20,
                                border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow,
                                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
                            }}>
                                <div style={{ fontSize: 28, marginBottom: 8 }}>{link.icon}</div>
                                <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 2 }}>{link.label}</div>
                                <div style={{ fontSize: 11, color: theme.textFaint }}>{link.desc}</div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
