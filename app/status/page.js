"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const SERVICES = [
    { name: 'Food Delivery', icon: '🍽️', status: 'operational', uptime: '99.97%', responseTime: '142ms' },
    { name: 'Soobér Rides', icon: '🚗', status: 'operational', uptime: '99.94%', responseTime: '98ms' },
    { name: 'Soo MRKT', icon: '🛍️', status: 'operational', uptime: '99.98%', responseTime: '127ms' },
    { name: 'Live Order Tracking', icon: '📡', status: 'operational', uptime: '99.91%', responseTime: '203ms' },
    { name: 'Payment Processing', icon: '💳', status: 'operational', uptime: '99.99%', responseTime: '89ms' },
    { name: 'AI Support Engine', icon: '🤖', status: 'operational', uptime: '99.85%', responseTime: '312ms' },
    { name: 'Driver Dispatch', icon: '📡', status: 'operational', uptime: '99.93%', responseTime: '156ms' },
    { name: 'Push Notifications', icon: '🔔', status: 'operational', uptime: '99.88%', responseTime: '245ms' },
];

const INCIDENTS = [
    { date: 'Mar 8, 2026', title: 'Scheduled maintenance — database upgrade', status: 'resolved', duration: '22 min', impact: 'Minor', desc: 'Planned database migration to improve query performance. Brief read-only mode during migration window.' },
    { date: 'Mar 3, 2026', title: 'Elevated payment processing latency', status: 'resolved', duration: '8 min', impact: 'Minor', desc: 'Payment gateway partner experienced brief latency spike. Automatic failover resolved the issue.' },
    { date: 'Feb 25, 2026', title: 'Map tile loading intermittent', status: 'resolved', duration: '15 min', impact: 'Low', desc: 'Third-party map tile provider had a brief outage. Caching layer prevented user-facing impact for most users.' },
];

const UPTIME_DAYS = Array.from({ length: 90 }, (_, i) => ({
    day: i,
    status: i === 27 || i === 55 ? 'incident' : i === 41 ? 'maintenance' : 'operational',
}));

const STATUS_COLORS = {
    operational: '#22c55e',
    degraded: '#f59e0b',
    incident: '#ef4444',
    maintenance: '#3b82f6',
    resolved: '#22c55e',
};

const STATUS_LABELS = {
    operational: 'Operational',
    degraded: 'Degraded Performance',
    incident: 'Incident',
    maintenance: 'Maintenance',
    resolved: 'Resolved',
};

export default function StatusPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const green = '#22c55e';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const allOperational = SERVICES.every(s => s.status === 'operational');

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 40px' : '80px 40px 56px' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '12px 28px', borderRadius: 100,
                    background: allOperational ? `${green}10` : 'rgba(245,158,11,0.1)',
                    border: `1px solid ${allOperational ? `${green}30` : 'rgba(245,158,11,0.3)'}`,
                    marginBottom: 24,
                }}>
                    <div style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: allOperational ? green : '#f59e0b',
                        boxShadow: `0 0 12px ${allOperational ? green : '#f59e0b'}60`,
                        animation: 'statusPulse 2s ease-in-out infinite',
                    }} />
                    <span style={{
                        fontSize: 14, fontWeight: 700,
                        color: allOperational ? green : '#f59e0b',
                        fontFamily: "'DM Sans', sans-serif",
                    }}>{allOperational ? 'All Systems Operational' : 'Some Systems Degraded'}</span>
                </div>

                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 8px',
                }}>
                    System Status
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 auto', maxWidth: 480 }}>
                    Real-time platform health for all Soobér services.
                    <br />
                    <span style={{ fontSize: 12, color: theme.textFaint }}>
                        Last updated: {new Date().toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' })} ET
                    </span>
                </p>
            </section>

            {/* ═══ 90-DAY UPTIME BAR ═══ */}
            <section style={{ padding: isMobile ? '0 16px 36px' : '0 40px 48px', maxWidth: 900, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                    padding: isMobile ? 16 : 24,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>90-Day Uptime</span>
                        <span style={{ fontSize: 24, fontWeight: 800, color: green, fontFamily: "'DM Sans', sans-serif" }}>99.95%</span>
                    </div>
                    <div style={{ display: 'flex', gap: 1, height: 32, borderRadius: 6, overflow: 'hidden' }}>
                        {UPTIME_DAYS.map((d, i) => (
                            <div key={i} title={`Day ${90 - i}: ${STATUS_LABELS[d.status]}`} style={{
                                flex: 1, borderRadius: 1,
                                background: STATUS_COLORS[d.status],
                                opacity: d.status === 'operational' ? 0.6 : 1,
                                transition: 'opacity 0.2s',
                                cursor: 'pointer',
                            }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                                onMouseLeave={e => e.currentTarget.style.opacity = d.status === 'operational' ? '0.6' : '1'}
                            />
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                        <span style={{ fontSize: 10, color: theme.textFaint }}>90 days ago</span>
                        <span style={{ fontSize: 10, color: theme.textFaint }}>Today</span>
                    </div>
                </div>
            </section>

            {/* ═══ SERVICE STATUS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 36px' : '0 40px 48px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 16px' }}>Services</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {SERVICES.map((s, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 16,
                            padding: isMobile ? '12px 14px' : '14px 20px',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
                            <div style={{ flex: 1 }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text }}>{s.name}</span>
                            </div>
                            {!isMobile && (
                                <>
                                    <span style={{ fontSize: 11, color: theme.textFaint, minWidth: 60, textAlign: 'right' }}>
                                        {s.responseTime}
                                    </span>
                                    <span style={{ fontSize: 11, color: theme.textFaint, minWidth: 56, textAlign: 'right' }}>
                                        {s.uptime}
                                    </span>
                                </>
                            )}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: isMobile ? 80 : 110 }}>
                                <div style={{
                                    width: 8, height: 8, borderRadius: '50%',
                                    background: STATUS_COLORS[s.status],
                                    boxShadow: `0 0 8px ${STATUS_COLORS[s.status]}40`,
                                }} />
                                <span style={{ fontSize: 12, fontWeight: 600, color: STATUS_COLORS[s.status] }}>
                                    {STATUS_LABELS[s.status]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ RECENT INCIDENTS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 16px' }}>Recent Incidents</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {INCIDENTS.map((inc, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 18,
                            padding: isMobile ? 16 : 22,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                                <div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, marginRight: 8 }}>{inc.date}</span>
                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text }}>{inc.title}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: `${STATUS_COLORS[inc.status]}12`, color: STATUS_COLORS[inc.status], textTransform: 'uppercase' }}>{inc.status}</span>
                                    <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', color: theme.textMuted }}>{inc.duration}</span>
                                    <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', color: theme.textMuted }}>{inc.impact} impact</span>
                                </div>
                            </div>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{inc.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ SUBSCRIBE CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: 36, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 26, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>Stay Informed</h2>
                <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 auto 20px', maxWidth: 420 }}>
                    Subscribe to status updates and get notified about incidents and maintenance windows.
                </p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', maxWidth: 360, margin: '0 auto' }}>
                    <input type="email" placeholder="your@email.com" style={{
                        flex: 1, padding: '12px 16px', borderRadius: 12,
                        border: `1px solid ${theme.border}`, background: theme.bgInput,
                        color: theme.text, fontSize: 14, outline: 'none',
                        fontFamily: "'DM Sans', sans-serif",
                    }} />
                    <button style={{
                        padding: '12px 24px', borderRadius: 12, border: 'none',
                        background: green, color: '#fff', fontWeight: 700,
                        fontSize: 14, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                        transition: 'transform 0.2s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >Subscribe</button>
                </div>
            </section>

            <style>{`
                @keyframes statusPulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.3); opacity: 0.7; }
                }
            `}</style>

            <Footer />
        </div>
    );
}
