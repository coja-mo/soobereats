"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Button } from '../../components/ui/Button';

export default function CorporatePortal() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [formState, setFormState] = useState({ name: '', business: '', type: 'restaurant', email: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);

    // Calculator state
    const [ordersPerMonth, setOrdersPerMonth] = useState(1000);
    const avgOrderValue = 35; // assumed average order value
    const nationalFee = ordersPerMonth * avgOrderValue * 0.30; // 30% standard
    const sooberFee = ordersPerMonth * avgOrderValue * 0.15;   // 15% standard
    const annualSavings = (nationalFee - sooberFee) * 12;

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const updateField = (field, value) => setFormState(prev => ({ ...prev, [field]: value }));

    const pad = isMobile ? '0 16px' : '0 40px';
    const inputStyle = {
        width: '100%', padding: '14px 18px', borderRadius: 14,
        border: `1.5px solid ${theme.border}`, fontSize: 15, fontWeight: 500,
        color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
        background: theme.bgInput, transition: 'all 0.2s', boxSizing: 'border-box',
        marginBottom: 16
    };
    const labelStyle = { fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 6, display: 'block', fontFamily: "'DM Sans', sans-serif" };

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* Hero */}
            <section style={{
                padding: isMobile ? '60px 0' : '100px 0',
                background: theme.mode === 'dark' ? '#09090b' : '#1c1917',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#eab308', marginBottom: 24
                    }}>🏢 Corporate Affairs · ⚡ Electric Delivery</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 36 : 56, fontWeight: 700,
                        letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20
                    }}>Partner with the<br />Soo's Local Platform</h1>

                    <p style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.6 }}>
                        Zero corporate middlemen. Fair commission rates. Direct access to the Sault Ste. Marie community. Join SOOber Eats and grow your business with the Soo&apos;s only local delivery platform.
                    </p>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 12, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399', fontSize: 13, fontWeight: 600, marginBottom: 32 }}>
                        ⚡ 100% Electric Fleet — emission-free delivery for your customers
                    </div>

                    <a href="#apply" style={{
                        display: 'inline-block', background: '#eab308', color: '#111',
                        padding: '16px 32px', borderRadius: 16, fontSize: 16, fontWeight: 700,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', transition: 'all 0.2s',
                        boxShadow: '0 4px 20px rgba(234, 179, 8, 0.3)'
                    }}>Apply to Sell</a>
                </div>
            </section>

            {/* Savings Calculator */}
            <section style={{ padding: isMobile ? '64px 0 0' : '100px 0 0' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 16 }}>Calculate Your Savings</h2>
                        <p style={{ fontSize: 16, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>Silicon Valley apps take 30% of your revenue. See how much you keep by switching to Soober Eats 15% flat rate.</p>
                    </div>

                    <div style={{ background: theme.bgCard, padding: isMobile ? 24 : 40, borderRadius: 24, border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow }}>
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text }}>Monthly Delivery Orders</label>
                                <span style={{ fontWeight: 700, color: theme.accent }}>{ordersPerMonth.toLocaleString()}</span>
                            </div>
                            <input
                                type="range" min="100" max="5000" step="50"
                                value={ordersPerMonth} onChange={e => setOrdersPerMonth(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: theme.accent, height: 6 }}
                            />
                            <p style={{ fontSize: 13, color: theme.textMuted, marginTop: 12 }}>Assuming $35 average order value</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                            <div style={{ background: theme.bgInput, padding: 24, borderRadius: 16, border: `1px solid ${theme.borderSubtle}` }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 8 }}>National Apps (30%)</p>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, opacity: 0.5 }}>${nationalFee.toLocaleString()} / mo</div>
                            </div>
                            <div style={{ background: theme.dark, padding: 24, borderRadius: 16 }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Soober Eats (15%)</p>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 700, color: theme.darkText }}>${sooberFee.toLocaleString()} / mo</div>
                            </div>
                        </div>

                        <div style={{ marginTop: 24, padding: 24, background: 'rgba(34,197,94,0.1)', borderRadius: 16, border: '1px solid rgba(34,197,94,0.3)', textAlign: 'center' }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>Your Annual Savings</p>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 36, fontWeight: 700, color: '#16a34a' }}>${annualSavings.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Partner */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 16 }}>The Anti-Corporate Alternative</h2>
                        <p style={{ fontSize: 16, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>You own your customers. You own your kitchen. We just give you the tools to succeed locally.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 24 : 32 }}>
                        {[
                            { icon: '💰', title: 'Fair 10% Flat Rate', desc: 'Keep your margins. We only charge a flat 10% fee to cover our dispatchers and drivers. No hidden marketing fees or surge pricing.' },
                            { icon: '📊', title: 'Own Your Data', desc: 'You get full access to your customer base. Know exactly who is ordering, when, and their feedback directly in your vendor portal.' },
                            { icon: '🚀', title: 'Live KDS Access', desc: 'Every partner gets our real-time Kitchen Display System to manage orders efficiently — no tablets piling up on the counter.' },
                            { icon: '⚡', title: '100% Electric Fleet', desc: 'Every delivery made by our emission-free electric vehicles. Your customers get a green delivery — and you get the brand equity of being sustainable.' },
                            { icon: '🏘️', title: 'Hyperlocal Focus', desc: 'We only serve Sault Ste. Marie and the Algoma region. Your restaurant gets top billing, not buried by chains.' },
                            { icon: '🤝', title: 'Real Human Support', desc: 'No bots, no ticket queues. Your dedicated local account manager picks up the phone when you call.' }
                        ].map(benefit => (
                            <div key={benefit.title} style={{ background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`, padding: 32, borderRadius: 24, boxShadow: theme.shadow }}>
                                <div style={{ fontSize: 36, marginBottom: 20 }}>{benefit.icon}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 12 }}>{benefit.title}</h3>
                                <p style={{ fontSize: 15, color: theme.textSecondary, lineHeight: 1.6, margin: 0 }}>{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Form */}
            <section id="apply" style={{ padding: isMobile ? '40px 0 80px' : '60px 0 100px', background: theme.bgAlt, borderTop: `1px solid ${theme.borderSubtle}` }}>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: pad }}>
                    {submitted ? (
                        <div style={{ background: theme.bgCard, padding: 40, borderRadius: 24, border: `1px solid ${theme.border}`, textAlign: 'center', boxShadow: theme.shadow }}>
                            <div style={{ fontSize: 64, marginBottom: 20 }}>🤝</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Application Received!</h3>
                            <p style={{ fontSize: 15, color: theme.textSecondary, marginBottom: 32 }}>Our local team will review your application and contact you within 24 hours to set up your store.</p>
                            <Link href="/vendor/kds" style={{ display: 'inline-block', background: theme.dark, color: theme.darkText, padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Preview the Admin Portal Instead</Link>
                        </div>
                    ) : (
                        <div style={{ background: theme.bgCard, padding: isMobile ? 24 : 40, borderRadius: 24, border: `1px solid ${theme.border}`, boxShadow: theme.shadow }}>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Apply to Join</h2>
                            <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 16 }}>Tell us a bit about your business, and we&apos;ll be in touch within 24 hours.</p>
                            <div style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: `1px solid rgba(16,185,129,0.15)`, marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span>⚡</span>
                                <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>Your orders will be delivered by our 100% electric fleet</span>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <label style={labelStyle}>Your Name</label>
                                <input style={inputStyle} value={formState.name} onChange={e => updateField('name', e.target.value)} required placeholder="Jane Doe" />

                                <label style={labelStyle}>Business Name</label>
                                <input style={inputStyle} value={formState.business} onChange={e => updateField('business', e.target.value)} required placeholder="Jane's Bakery" />

                                <label style={labelStyle}>Business Type</label>
                                <select style={{ ...inputStyle, appearance: 'none', backgroundImage: 'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }} value={formState.type} onChange={e => updateField('type', e.target.value)}>
                                    <option value="restaurant">Restaurant / Eatery</option>
                                    <option value="market">Market Vendor / Artisan</option>
                                    <option value="grocery">Grocery / Convenience</option>
                                    <option value="other">Other</option>
                                </select>

                                <label style={labelStyle}>Email Address</label>
                                <input type="email" style={inputStyle} value={formState.email} onChange={e => updateField('email', e.target.value)} required placeholder="jane@example.com" />

                                <label style={labelStyle}>Phone Number</label>
                                <input type="tel" style={inputStyle} value={formState.phone} onChange={e => updateField('phone', e.target.value)} required placeholder="(705) 555-0199" />

                                <button type="submit" style={{
                                    width: '100%', padding: '16px 0', borderRadius: 14, marginTop: 16,
                                    background: theme.dark, color: theme.darkText, border: 'none',
                                    fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                                    cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}>Submit Application</button>
                            </form>
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
}
