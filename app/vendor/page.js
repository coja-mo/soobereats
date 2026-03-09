"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLiveOrders } from '../../lib/LiveOrderContext';
import { useTheme } from '../../lib/ThemeContext';

export default function VendorDashboard() {
    const { activeOrders } = useLiveOrders();
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activePanel, setActivePanel] = useState(null);

    const vendorId = 'sakura-ramen';
    const vendorOrders = activeOrders.filter(o => o.restaurantId === vendorId);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const todaysRevenue = vendorOrders.reduce((sum, o) => sum + o.subtotal, 0) + 1285.50;
    const totalOrders = vendorOrders.length + 42;
    const pad = isMobile ? '0 16px' : '0 40px';
    const cardStyle = { background: theme.bgCard, borderRadius: 24, border: `1px solid ${theme.borderSubtle}`, padding: isMobile ? 20 : 28, boxShadow: theme.shadow };

    const managementPanels = [
        {
            id: 'menu', icon: '📋', title: 'Menu Management', desc: 'Edit items, prices, availability, and categories',
            content: (
                <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 20 }}>Current Menu Items</h3>
                    {[
                        { name: 'Tonkotsu Classic', price: 16.99, status: 'Active', category: 'Ramen' },
                        { name: 'Spicy Miso', price: 17.49, status: 'Active', category: 'Ramen' },
                        { name: 'Gyoza (6pc)', price: 9.99, status: 'Active', category: 'Appetizers' },
                        { name: 'Karaage Chicken', price: 12.99, status: 'Active', category: 'Appetizers' },
                        { name: 'Matcha Soft Serve', price: 6.99, status: 'Sold Out', category: 'Desserts' },
                    ].map(item => (
                        <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${theme.borderLight}` }}>
                            <div>
                                <span style={{ fontWeight: 700, color: theme.text, fontSize: 15 }}>{item.name}</span>
                                <span style={{ fontSize: 12, color: theme.textFaint, marginLeft: 8 }}>{item.category}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontWeight: 700, color: theme.text }}>${item.price.toFixed(2)}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: item.status === 'Active' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', color: item.status === 'Active' ? '#22c55e' : '#ef4444' }}>{item.status}</span>
                            </div>
                        </div>
                    ))}
                    <button style={{ marginTop: 20, padding: '12px 24px', borderRadius: 14, background: theme.dark, color: theme.darkText, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>+ Add Menu Item</button>
                </div>
            )
        },
        {
            id: 'hours', icon: '🕐', title: 'Store Hours', desc: 'Set operating hours and special closures',
            content: (
                <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 20 }}>Operating Hours</h3>
                    {[
                        { day: 'Monday', hours: '11:00 AM – 9:00 PM', open: true },
                        { day: 'Tuesday', hours: '11:00 AM – 9:00 PM', open: true },
                        { day: 'Wednesday', hours: '11:00 AM – 9:00 PM', open: true },
                        { day: 'Thursday', hours: '11:00 AM – 10:00 PM', open: true },
                        { day: 'Friday', hours: '11:00 AM – 11:00 PM', open: true },
                        { day: 'Saturday', hours: '12:00 PM – 11:00 PM', open: true },
                        { day: 'Sunday', hours: 'Closed', open: false },
                    ].map(d => (
                        <div key={d.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.borderLight}` }}>
                            <span style={{ fontWeight: 600, color: theme.text, fontSize: 14 }}>{d.day}</span>
                            <span style={{ color: d.open ? theme.textSecondary : theme.textFaint, fontSize: 14, fontWeight: d.open ? 500 : 600 }}>{d.hours}</span>
                        </div>
                    ))}
                </div>
            )
        },
        {
            id: 'finance', icon: '💰', title: 'Financial Reports', desc: 'Revenue, payouts, and commission breakdown',
            content: (
                <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 20 }}>This Week</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: 14, marginBottom: 28 }}>
                        {[
                            { label: 'Gross Revenue', value: '$4,285.00', color: theme.text },
                            { label: 'SOOber Fee (10%)', value: '-$428.50', color: '#ef4444' },
                            { label: 'Net Payout', value: '$3,856.50', color: '#22c55e' },
                        ].map(s => (
                            <div key={s.label} style={{ background: theme.bgInput, padding: 18, borderRadius: 16, border: `1px solid ${theme.borderLight}` }}>
                                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textFaint, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: 16, borderRadius: 14, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                        <p style={{ fontSize: 13, color: '#22c55e', fontWeight: 600, margin: 0 }}>💸 Next payout: $3,856.50 scheduled for Friday, Mar 14</p>
                    </div>
                </div>
            )
        },
        {
            id: 'promos', icon: '🎯', title: 'Marketing & Promos', desc: 'Create deals, featured listings, and promotions',
            content: (
                <div>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 20 }}>Active Promotions</h3>
                    {[
                        { name: 'First Order 15% Off', code: 'SAKURA15', uses: 23, status: 'Live' },
                        { name: 'Free Gyoza w/ Ramen', code: 'FREEGYOZA', uses: 8, status: 'Live' },
                    ].map(promo => (
                        <div key={promo.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${theme.borderLight}` }}>
                            <div>
                                <div style={{ fontWeight: 700, color: theme.text, fontSize: 14, marginBottom: 2 }}>{promo.name}</div>
                                <span style={{ fontSize: 12, color: theme.textFaint, fontFamily: 'monospace' }}>{promo.code}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 13, color: theme.textFaint }}>{promo.uses} uses</span>
                                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>{promo.status}</span>
                            </div>
                        </div>
                    ))}
                    <button style={{ marginTop: 20, padding: '12px 24px', borderRadius: 14, background: theme.dark, color: theme.darkText, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>+ Create Promotion</button>
                </div>
            )
        }
    ];

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad }}>

                {/* Header */}
                <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', padding: isMobile ? '32px 0 24px' : '48px 0 32px', flexDirection: isMobile ? 'column' : 'row', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <div style={{ width: 64, height: 64, borderRadius: 20, background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, boxShadow: theme.shadow }}>🍜</div>
                        <div>
                            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, margin: 0, letterSpacing: '-0.02em', marginBottom: 4 }}>Sakura Ramen House</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, fontWeight: 600 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#22c55e' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}></span> Online</span>
                                <span style={{ color: theme.textFaint }}>·</span>
                                <span style={{ color: theme.textFaint }}>⚡ Electric delivery zone</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/vendor/kds" style={{ textDecoration: 'none', padding: '12px 24px', borderRadius: 14, background: theme.dark, color: theme.darkText, fontSize: 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
                        Open KDS →
                    </Link>
                </div>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 10 : 16, marginBottom: isMobile ? 24 : 40 }}>
                    {[
                        { title: "Today's Revenue", value: `$${todaysRevenue.toFixed(2)}`, desc: '+12% vs. yesterday', icon: '💰' },
                        { title: "Active Orders", value: vendorOrders.length.toString(), desc: 'Live in KDS', icon: '📦' },
                        { title: "Total Orders", value: totalOrders.toString(), desc: 'Completed today', icon: '✅' },
                        { title: "Avg. Rating", value: "4.9", desc: '128 reviews', icon: '⭐' },
                    ].map(stat => (
                        <div key={stat.title} style={cardStyle}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                <span style={{ fontSize: 18 }}>{stat.icon}</span>
                                <span style={{ fontSize: 12, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.title}</span>
                            </div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 28, fontWeight: 700, color: theme.text, marginBottom: 4 }}>{stat.value}</div>
                            <p style={{ fontSize: 12, color: theme.textMuted, margin: 0 }}>{stat.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Main Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: isMobile ? 24 : 40 }}>

                    {/* Left Column */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* KDS CTA */}
                        <Link href="/vendor/kds" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
                                padding: isMobile ? 24 : 36, borderRadius: 28,
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                boxShadow: '0 16px 40px rgba(0,0,0,0.2)', transition: 'transform 0.2s', cursor: 'pointer',
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 8, background: 'rgba(34,197,94,0.2)', color: '#22c55e', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}></span> Live
                                    </div>
                                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#fff', margin: 0, marginBottom: 6 }}>Kitchen Display System</h2>
                                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>View and manage incoming orders in real-time.</p>
                                </div>
                                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </div>
                            </div>
                        </Link>

                        {/* Management Panels */}
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                            {managementPanels.map(panel => (
                                <div key={panel.id}
                                    onClick={() => setActivePanel(activePanel === panel.id ? null : panel.id)}
                                    style={{
                                        ...cardStyle, cursor: 'pointer', transition: 'all 0.2s',
                                        borderColor: activePanel === panel.id ? theme.accent : theme.borderSubtle,
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.bgCardHover; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = activePanel === panel.id ? theme.accent : theme.borderSubtle; e.currentTarget.style.background = theme.bgCard; }}
                                >
                                    <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{panel.icon}</span>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 4 }}>{panel.title}</h3>
                                    <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>{panel.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Expanded Panel */}
                        {activePanel && (
                            <div style={{ ...cardStyle, borderColor: theme.accent }}>
                                {managementPanels.find(p => p.id === activePanel)?.content}
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {/* Recent Activity */}
                        <div style={cardStyle}>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 20 }}>Recent Activity</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {[
                                    { msg: 'Payout initiated: $1,284.50', time: '10 min ago', icon: '💸' },
                                    { msg: 'New 5-star review', time: '1 hr ago', icon: '⭐' },
                                    { msg: '"Tonkotsu Classic" updated', time: '3 hrs ago', icon: '📝' },
                                    { msg: 'Store status → Online', time: '5 hrs ago', icon: '🟢' },
                                    { msg: 'Weekly report available', time: '1 day ago', icon: '📊' },
                                ].map((log, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <div style={{ width: 34, height: 34, borderRadius: 10, background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{log.icon}</div>
                                        <div>
                                            <p style={{ fontSize: 14, color: theme.text, fontWeight: 500, margin: 0, marginBottom: 3 }}>{log.msg}</p>
                                            <p style={{ fontSize: 12, color: theme.textMuted, margin: 0 }}>{log.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support */}
                        <div style={{
                            ...cardStyle,
                            background: theme.mode === 'dark' ? 'rgba(234,179,8,0.04)' : 'rgba(234,179,8,0.06)',
                            borderColor: theme.mode === 'dark' ? 'rgba(234,179,8,0.12)' : 'rgba(234,179,8,0.18)',
                        }}>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 8 }}>Need Help?</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, marginBottom: 16, lineHeight: 1.5 }}>Our local vendor support team is available 7 days a week.</p>
                            <Link href="/contact" style={{
                                display: 'inline-block', padding: '10px 20px', borderRadius: 12,
                                background: theme.accent, color: '#09090b', fontSize: 13, fontWeight: 700,
                                textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
                            }}>Contact Support</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
