"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLiveOrders } from '../../lib/LiveOrderContext';
import { useTheme } from '../../lib/ThemeContext';

export default function VendorDashboard() {
    const { activeOrders } = useLiveOrders();
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    // Hardcoding for demo (Sakura Ramen House)
    const vendorId = 'sakura-ramen';
    const vendorOrders = activeOrders.filter(o => o.restaurantId === vendorId);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const todaysRevenue = vendorOrders.reduce((sum, o) => sum + o.subtotal, 0) + 1285.50; // Add baseline mock rev
    const totalOrders = vendorOrders.length + 42;

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: isMobile ? '32px 0 24px' : '48px 0 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 64, height: 64, borderRadius: 20, background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: theme.shadow }}>🍜</div>
                        <div>
                            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, margin: 0, letterSpacing: '-0.02em', marginBottom: 4 }}>Sakura Ramen House</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: theme.textSecondary, fontWeight: 600 }}>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></span> Online & Accepting Orders
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 20, marginBottom: isMobile ? 24 : 40 }}>
                    {[
                        { title: "Today's Revenue", value: `$${todaysRevenue.toFixed(2)}`, desc: '+12% from yesterday' },
                        { title: "Active Orders", value: vendorOrders.length.toString(), desc: 'Live currently in KDS' },
                        { title: "Total Orders", value: totalOrders.toString(), desc: 'Completed today' },
                        { title: "Average Rating", value: "4.9 ★", desc: 'From 128 reviews' }
                    ].map(stat => (
                        <div key={stat.title} style={{ background: theme.bgCard, padding: isMobile ? 20 : 24, borderRadius: 24, border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary, textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0, marginBottom: 8 }}>{stat.title}</p>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 700, color: theme.text, marginBottom: 4 }}>{stat.value}</div>
                            <p style={{ fontSize: 12, color: theme.textMuted, margin: 0 }}>{stat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? 24 : 40 }}>

                    {/* Primary actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 16 : 24 }}>
                        <Link href="/vendor/kds" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
                                padding: isMobile ? 24 : 40, borderRadius: 32,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.2)', transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>Live</div>
                                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#fff', margin: 0, marginBottom: 8 }}>Kitchen Display System</h2>
                                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: 0 }}>View and manage live orders in real-time.</p>
                                </div>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </div>
                        </Link>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
                            {['Menu Management', 'Store Settings', 'Financial Reports', 'Marketing & Promos'].map((btn, i) => (
                                <div key={i} style={{
                                    background: theme.bgCard, padding: 24, borderRadius: 24,
                                    border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow,
                                    cursor: 'pointer', transition: 'background 0.2s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.bgCardHover; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.background = theme.bgCard; }}
                                >
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0 }}>{btn}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Logs */}
                    <div>
                        <div style={{ background: theme.bgCard, borderRadius: 24, border: `1px solid ${theme.borderSubtle}`, padding: 24, boxShadow: theme.shadow }}>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 20 }}>Recent Activity</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[
                                    { msg: 'Payment payout initiated: $1,284.50', time: '10 mins ago', icon: '💸' },
                                    { msg: 'New 5-star review received', time: '1 hour ago', icon: '⭐' },
                                    { msg: 'Menu item "Tonkotsu Classic" updated', time: '3 hours ago', icon: '📝' },
                                    { msg: 'Store status changed to Online', time: '5 hours ago', icon: '🟢' }
                                ].map((log, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 10, background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{log.icon}</div>
                                        <div>
                                            <p style={{ fontSize: 14, color: theme.text, fontWeight: 500, margin: 0, marginBottom: 4 }}>{log.msg}</p>
                                            <p style={{ fontSize: 12, color: theme.textMuted, margin: 0 }}>{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
