"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';

export default function ForDriversPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [hoursPerWeek, setHoursPerWeek] = useState(20);
    const [formState, setFormState] = useState({ name: '', email: '', phone: '', vehicle: 'ev-car', license: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const avgDeliveriesPerHour = 2.5;
    const avgEarningsPerDelivery = 8.50; // base + distance
    const avgTipPerDelivery = 4.00;
    const weeklyEarnings = hoursPerWeek * avgDeliveriesPerHour * (avgEarningsPerDelivery + avgTipPerDelivery);
    const monthlyEarnings = weeklyEarnings * 4.33;

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
    const update = (field, value) => setFormState(prev => ({ ...prev, [field]: value }));
    const pad = isMobile ? '0 16px' : '0 40px';
    const inputStyle = {
        width: '100%', padding: '14px 18px', borderRadius: 14,
        border: `1.5px solid ${theme.border}`, fontSize: 15, fontWeight: 500,
        color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
        background: theme.bgInput, transition: 'all 0.2s', boxSizing: 'border-box', marginBottom: 16,
    };
    const labelStyle = { fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 6, display: 'block', fontFamily: "'DM Sans', sans-serif" };

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* Hero */}
            <section style={{
                padding: isMobile ? '60px 0' : '100px 0',
                background: theme.mode === 'dark'
                    ? 'linear-gradient(135deg, #09090b 0%, #0a1a0f 50%, #09090b 100%)'
                    : 'linear-gradient(135deg, #1c1917 0%, #14532d 50%, #1c1917 100%)',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '8px 20px', borderRadius: 100,
                        background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
                        fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: '#34d399', marginBottom: 24,
                    }}>⚡ Drive Electric</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 36 : 56, fontWeight: 700,
                        letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20,
                    }}>Earn money.<br />Drive clean.<br />Support the Soo.</h1>

                    <p style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.7)', maxWidth: 550, margin: '0 auto 40px', lineHeight: 1.6 }}>
                        Join the Soo&apos;s first 100% electric delivery fleet. Flexible hours, transparent earnings, and the satisfaction of building something local.
                    </p>

                    <a href="#apply" style={{
                        display: 'inline-block', background: '#10b981', color: '#fff',
                        padding: '16px 36px', borderRadius: 16, fontSize: 16, fontWeight: 700,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(16,185,129,0.3)',
                    }}>Apply to Drive</a>
                </div>
            </section>

            {/* Earnings Calculator */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 12 }}>Estimate Your Earnings</h2>
                        <p style={{ fontSize: 16, color: theme.textMuted }}>Slide to see what you could earn driving for SOOber Eats.</p>
                    </div>

                    <div style={{ background: theme.bgCard, padding: isMobile ? 24 : 40, borderRadius: 24, border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow }}>
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text }}>Hours Per Week</label>
                                <span style={{ fontWeight: 700, color: '#10b981', fontSize: 18 }}>{hoursPerWeek}h</span>
                            </div>
                            <input
                                type="range" min="5" max="40" step="1"
                                value={hoursPerWeek} onChange={e => setHoursPerWeek(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: '#10b981', height: 6 }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                                <span style={{ fontSize: 12, color: theme.textFaint }}>Part-time (5h)</span>
                                <span style={{ fontSize: 12, color: theme.textFaint }}>Full-time (40h)</span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 20 }}>
                            <div style={{ background: theme.bgInput, padding: 24, borderRadius: 16 }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 8 }}>Weekly Estimate</p>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700, color: theme.text }}>${weeklyEarnings.toFixed(0)}</div>
                            </div>
                            <div style={{ background: '#10b981', padding: 24, borderRadius: 16 }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>Monthly Estimate</p>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700, color: '#fff' }}>${monthlyEarnings.toFixed(0)}</div>
                            </div>
                        </div>
                        <p style={{ fontSize: 12, color: theme.textFaint, textAlign: 'center' }}>Based on avg. {avgDeliveriesPerHour} deliveries/hour · ${avgEarningsPerDelivery.toFixed(2)} base + avg. ${avgTipPerDelivery.toFixed(2)} tip per delivery</p>
                    </div>
                </div>
            </section>

            {/* Why Drive */}
            <section style={{ padding: isMobile ? '0 0 64px' : '0 0 100px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: pad }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
                        {[
                            { icon: '💰', title: 'Transparent Pay', desc: 'See exactly how much each delivery pays before you accept it. Base pay + distance bonus + 100% of tips. No hidden deductions.' },
                            { icon: '⏰', title: 'Your Schedule', desc: 'Drive when you want. No minimum hours. Log on during lunch rush, after work, or weekends only — totally up to you.' },
                            { icon: '⚡', title: 'Electric Vehicle Support', desc: 'Don\'t have an EV? We\'re working on partnerships with local dealerships for driver discounts. E-bike? Even better.' },
                            { icon: '📊', title: 'Real-Time Dashboard', desc: 'Track your earnings, deliveries, and ratings in real time through the driver portal. Full transparency, always.' },
                            { icon: '🏘️', title: 'Local Impact', desc: 'You\'re not driving for a faceless corporation. You\'re delivering for Mike at Aurora\'s, for Jenn at Jenn Bakes, for your neighbours.' },
                            { icon: '🛡️', title: 'Insured & Protected', desc: 'All drivers are covered by our commercial delivery insurance. Drive with peace of mind knowing you\'re protected.' },
                        ].map(item => (
                            <div key={item.title} style={{ background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`, padding: isMobile ? 24 : 28, borderRadius: 20, boxShadow: theme.shadow }}>
                                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements */}
            <section style={{
                padding: isMobile ? '64px 0' : '100px 0',
                background: theme.bgAlt, borderTop: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, marginBottom: 32, textAlign: 'center' }}>Requirements</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                            '✅ Valid Ontario driver\'s license (G or G2)',
                            '✅ Vehicle insurance (personal auto with delivery endorsement)',
                            '✅ Electric vehicle, e-bike, or electric scooter',
                            '✅ Smartphone with data plan (iOS or Android)',
                            '✅ Clean criminal background check',
                            '✅ At least 18 years old',
                        ].map((req, i) => (
                            <div key={i} style={{
                                background: theme.bgCard, padding: '16px 20px', borderRadius: 14,
                                border: `1px solid ${theme.borderSubtle}`, fontSize: 15, color: theme.text, fontWeight: 500,
                            }}>{req}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply" style={{ padding: isMobile ? '64px 0 80px' : '100px 0' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: pad }}>
                    {submitted ? (
                        <div style={{ background: theme.bgCard, padding: 40, borderRadius: 24, border: `1px solid ${theme.border}`, textAlign: 'center', boxShadow: theme.shadow }}>
                            <div style={{ fontSize: 64, marginBottom: 20 }}>⚡</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Application Received!</h3>
                            <p style={{ fontSize: 15, color: theme.textSecondary }}>We&apos;ll review your application and reach out within 48 hours. Welcome to the fleet.</p>
                        </div>
                    ) : (
                        <div style={{ background: theme.bgCard, padding: isMobile ? 24 : 40, borderRadius: 24, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Apply to Drive</h2>
                            <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 32 }}>Join the Soo&apos;s electric delivery fleet. We&apos;ll get you started in no time.</p>

                            <form onSubmit={handleSubmit}>
                                <label style={labelStyle}>Full Name</label>
                                <input style={inputStyle} value={formState.name} onChange={e => update('name', e.target.value)} required placeholder="Jane Doe" />

                                <label style={labelStyle}>Email</label>
                                <input type="email" style={inputStyle} value={formState.email} onChange={e => update('email', e.target.value)} required placeholder="jane@example.com" />

                                <label style={labelStyle}>Phone Number</label>
                                <input type="tel" style={inputStyle} value={formState.phone} onChange={e => update('phone', e.target.value)} required placeholder="(705) 555-0199" />

                                <label style={labelStyle}>Vehicle Type</label>
                                <select style={{ ...inputStyle, appearance: 'none' }} value={formState.vehicle} onChange={e => update('vehicle', e.target.value)}>
                                    <option value="ev-car">Electric Car (Tesla, Chevy Bolt, etc.)</option>
                                    <option value="ev-suv">Electric SUV / Crossover</option>
                                    <option value="e-bike">E-Bike</option>
                                    <option value="e-scooter">Electric Scooter</option>
                                    <option value="phev">Plug-in Hybrid (PHEV)</option>
                                    <option value="other">Other (tell us more)</option>
                                </select>

                                <label style={labelStyle}>Driver&apos;s License Number</label>
                                <input style={inputStyle} value={formState.license} onChange={e => update('license', e.target.value)} required placeholder="A1234-56789-01234" />

                                <button type="submit" style={{
                                    width: '100%', padding: '16px 0', borderRadius: 14, marginTop: 16,
                                    background: '#10b981', color: '#fff', border: 'none',
                                    fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                                    cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                                }}>Submit Application</button>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
