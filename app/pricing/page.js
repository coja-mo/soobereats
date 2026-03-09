"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const DELIVERY_TIERS = [
    { name: 'Standard', eta: '25-40 min', fee: '$3.99', desc: 'Our core delivery. Uses the nearest available driver.', icon: '📦', highlight: false },
    { name: 'Priority', eta: '15-25 min', fee: '$5.99', desc: 'Bumped to the top of the queue. Next available premium EV.', icon: '⚡', highlight: true },
    { name: 'Scheduled', eta: 'You pick', fee: '$2.99', desc: 'Choose your delivery window up to 3 days in advance.', icon: '📅', highlight: false },
];

const RIDE_TIERS = [
    { name: 'Soo Standard', base: '$4.50', perKm: '$1.80/km', perMin: '$0.30/min', example: 'Downtown → North End: ~$12', vehicle: 'Hyundai IONIQ 5, Honda Prologue', icon: '🚗' },
    { name: 'Soo Premium', base: '$8.00', perKm: '$2.50/km', perMin: '$0.45/min', example: 'Downtown → Airport: ~$28', vehicle: 'Cadillac VISTIQ, GMC Hummer EV', icon: '✨' },
    { name: 'Soo XL', base: '$10.00', perKm: '$3.00/km', perMin: '$0.50/min', example: 'Group ride (up to 6): ~$18', vehicle: 'GMC Hummer EV SUV', icon: '🚐' },
];

const AIRPORT_PRICING = [
    { route: 'Downtown SSM → YAM', price: '$25', time: '~15 min' },
    { route: 'North End → YAM', price: '$30', time: '~20 min' },
    { route: 'Garden River → YAM', price: '$35', time: '~25 min' },
    { route: 'Goulais River → YAM', price: '$45', time: '~35 min' },
];

const SCOOTER_PRICING = [
    { label: 'Unlock Fee', value: '$1.00' },
    { label: 'Per Minute', value: '$0.35/min' },
    { label: 'Day Pass', value: '$14.99' },
    { label: 'Weekly Pass', value: '$39.99' },
];

const COMPARISON = [
    { feature: 'Commission Rate', soober: '15%', others: '25-30%' },
    { feature: 'Delivery Fee', soober: 'From $2.99', others: 'From $4.99' },
    { feature: 'Service Fee', soober: '5%', others: '10-15%' },
    { feature: 'Fleet Type', soober: '100% Electric', others: 'Gas vehicles' },
    { feature: 'Data Privacy', soober: 'Local servers', others: 'Cloud (US)' },
    { feature: 'Platform', soober: 'Locally owned', others: 'Bay St / Silicon Valley' },
];

export default function PricingPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('delivery');
    const blue = '#0066FF';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 40px' : '80px 40px 56px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${blue}10`, border: `1px solid ${blue}25`, borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                    <span style={{ fontSize: 16 }}>💎</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: blue, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Transparent Pricing</span>
                </div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    Simple, Fair Pricing
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 500, margin: '0 auto' }}>
                    No hidden fees. No surge pricing. Just honest rates that keep more money in the local economy.
                </p>
            </section>

            {/* ═══ TAB SWITCHER ═══ */}
            <section style={{ padding: '0 16px 32px', maxWidth: 400, margin: '0 auto' }}>
                <div style={{ display: 'flex', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', borderRadius: 14, padding: 4 }}>
                    {['delivery', 'rides', 'scooters'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            flex: 1, padding: '10px 0', borderRadius: 11, border: 'none',
                            background: activeTab === tab ? (isDark ? 'rgba(255,255,255,0.1)' : '#fff') : 'transparent',
                            color: activeTab === tab ? theme.text : theme.textFaint,
                            fontWeight: 700, fontSize: 13, cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                            transition: 'all 0.2s',
                            textTransform: 'capitalize',
                        }}>{tab}</button>
                    ))}
                </div>
            </section>

            {/* ═══ DELIVERY PRICING ═══ */}
            {activeTab === 'delivery' && (
                <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                        {DELIVERY_TIERS.map((t, i) => (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${t.highlight ? `${blue}40` : theme.borderSubtle}`,
                                borderRadius: 22, padding: 24, position: 'relative', overflow: 'hidden',
                            }}>
                                {t.highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: blue }} />}
                                <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{t.icon}</span>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: theme.text, margin: '0 0 4px' }}>{t.name}</h3>
                                <div style={{ fontSize: 28, fontWeight: 800, color: t.highlight ? blue : theme.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{t.fee}</div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textFaint, marginBottom: 10 }}>{t.eta}</div>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{t.desc}</p>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: 12, color: theme.textFaint, textAlign: 'center', marginTop: 16 }}>
                        + 5% service fee · Free delivery on orders over $40 · Soobér Gold members get free priority delivery
                    </p>
                </section>
            )}

            {/* ═══ RIDE PRICING ═══ */}
            {activeTab === 'rides' && (
                <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {RIDE_TIERS.map((t, i) => (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 18 : 24,
                                display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap',
                            }}>
                                <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                                <div style={{ flex: 1, minWidth: 200 }}>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: theme.text, margin: '0 0 6px' }}>{t.name}</h3>
                                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                                        {[{ label: 'Base Fare', val: t.base }, { label: 'Per km', val: t.perKm }, { label: 'Per min', val: t.perMin }].map((p, j) => (
                                            <div key={j} style={{ fontSize: 12 }}>
                                                <span style={{ color: theme.textFaint }}>{p.label}: </span>
                                                <span style={{ fontWeight: 700, color: blue }}>{p.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ fontSize: 12, color: theme.textMuted }}>
                                        <strong>Example:</strong> {t.example}
                                    </div>
                                    <div style={{ fontSize: 11, color: theme.textFaint, marginTop: 4 }}>Vehicles: {t.vehicle}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Airport table */}
                    <div style={{ marginTop: 24 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, marginBottom: 12 }}>✈️ Airport Fixed Rates (YAM)</h3>
                        <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 16, overflow: 'hidden' }}>
                            {AIRPORT_PRICING.map((r, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: i < AIRPORT_PRICING.length - 1 ? `1px solid ${theme.borderSubtle}` : 'none' }}>
                                    <span style={{ fontSize: 14, color: theme.text, fontWeight: 500 }}>{r.route}</span>
                                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                                        <span style={{ fontSize: 12, color: theme.textFaint }}>{r.time}</span>
                                        <span style={{ fontSize: 16, fontWeight: 800, color: blue, fontFamily: "'DM Sans', sans-serif" }}>{r.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ SCOOTER PRICING ═══ */}
            {activeTab === 'scooters' && (
                <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 500, margin: '0 auto' }}>
                    <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: 24 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: theme.text, margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>🛴 Soo Scooters</h3>
                        {SCOOTER_PRICING.map((p, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < SCOOTER_PRICING.length - 1 ? `1px solid ${theme.borderSubtle}` : 'none' }}>
                                <span style={{ fontSize: 14, color: theme.textMuted }}>{p.label}</span>
                                <span style={{ fontSize: 16, fontWeight: 800, color: blue, fontFamily: "'DM Sans', sans-serif" }}>{p.value}</span>
                            </div>
                        ))}
                        <p style={{ fontSize: 12, color: theme.textFaint, marginTop: 12, marginBottom: 0 }}>
                            Must be 16+ · Helmet recommended · Available citywide · Park responsibly at designated spots
                        </p>
                    </div>
                </section>
            )}

            {/* ═══ COMPARISON TABLE ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 700, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px', textAlign: 'center' }}>How We Compare</h2>
                <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '14px 18px', borderBottom: `1px solid ${theme.borderSubtle}`, background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase' }}>Feature</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: blue, textTransform: 'uppercase', textAlign: 'center' }}>Soobér</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', textAlign: 'center' }}>National Apps</span>
                    </div>
                    {COMPARISON.map((c, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '12px 18px', borderBottom: i < COMPARISON.length - 1 ? `1px solid ${theme.borderSubtle}` : 'none' }}>
                            <span style={{ fontSize: 13, color: theme.text, fontWeight: 500 }}>{c.feature}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', textAlign: 'center' }}>{c.soober}</span>
                            <span style={{ fontSize: 13, color: theme.textFaint, textAlign: 'center' }}>{c.others}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
