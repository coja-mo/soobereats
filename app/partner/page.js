"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const PARTNER_BENEFITS = [
    { icon: '💰', title: '15% Commission', desc: 'The lowest in Canadian delivery. National apps charge 25-30%. We keep it local and fair.', highlight: 'vs. 30% industry standard' },
    { icon: '📱', title: 'Free POS Tablet', desc: 'We provide a pre-configured tablet with our restaurant management system. No setup fees.', highlight: 'Zero hardware cost' },
    { icon: '📊', title: 'Real-Time Analytics', desc: 'Track orders, revenue, peak hours, top sellers, and customer ratings in real-time.', highlight: 'Dashboard included' },
    { icon: '⚡', title: '100% Electric Delivery', desc: 'Your food arrives in premium EVs. Customers love the sustainability angle — it drives orders.', highlight: 'Zero emissions' },
    { icon: '🎨', title: 'Custom Storefront', desc: 'Your restaurant gets a dedicated, beautifully-designed page with menu management, photos, and branding.', highlight: 'Your brand, your way' },
    { icon: '🤖', title: 'AI-Powered Dispatch', desc: 'Smart routing ensures the fastest delivery times. Hot food arrives hot. Cold food stays cold.', highlight: '18-min avg delivery' },
];

const REQUIREMENTS = [
    { label: 'Business License', desc: 'Valid City of SSM business license or equivalent' },
    { label: 'Food Handler Certificate', desc: 'At least one certified food handler on staff' },
    { label: 'Health Inspection', desc: 'Passing health inspection within the last 12 months' },
    { label: 'Digital Menu', desc: 'Complete menu with descriptions, prices, and allergen info' },
    { label: 'Operating Hours', desc: 'Minimum 5 days/week availability for delivery orders' },
    { label: 'Packaging', desc: 'Willingness to use Soobér eco-packaging (provided free)' },
];

const STEPS = [
    { step: 1, title: 'Apply', desc: 'Fill out the partner application form. Takes about 5 minutes.', icon: '📝' },
    { step: 2, title: 'Review', desc: 'Our team reviews your application within 48 hours.', icon: '🔍' },
    { step: 3, title: 'Onboard', desc: 'Menu setup, photography, tablet installation, and training.', icon: '📸' },
    { step: 4, title: 'Go Live', desc: 'Your restaurant goes live on Soobér. Start receiving orders.', icon: '🚀' },
];

export default function PartnerPage() {
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

    // Form state
    const [form, setForm] = useState({ name: '', restaurant: '', email: '', phone: '', cuisine: '', address: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', padding: isMobile ? '60px 16px 48px' : '80px 40px 64px' }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, ${green}18 0%, ${green}05 40%, transparent 70%)`, pointerEvents: 'none', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${green}10`, border: `1px solid ${green}25`, borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>🤝</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: green, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Partner With Us</span>
                    </div>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 56, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Grow Your{' '}
                        <span style={{ background: `linear-gradient(135deg, ${green}, #10b981, #34d399)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Restaurant</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>
                        Join 18+ local restaurants on Sault Ste. Marie&apos;s only delivery platform. 15% commission. Free POS tablet. Zero setup fees. 100% electric delivery.
                    </p>
                </div>
            </section>

            {/* ═══ BENEFITS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 24px', textAlign: 'center' }}>Why Partner With Soobér?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {PARTNER_BENEFITS.map((b, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 20 : 24,
                            transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${green}44`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{b.icon}</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, margin: '0 0 6px' }}>{b.title}</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 10px' }}>{b.desc}</p>
                            <span style={{ fontSize: 11, fontWeight: 700, color: green, background: `${green}12`, padding: '3px 10px', borderRadius: 8 }}>{b.highlight}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ HOW IT WORKS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 24px', textAlign: 'center' }}>How It Works</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 12 }}>
                    {STEPS.map((s, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: isMobile ? 16 : 20 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 16, background: `${green}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, margin: '0 auto 12px' }}>{s.icon}</div>
                            <div style={{ fontSize: 10, fontWeight: 800, color: green, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Step {s.step}</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, margin: '0 0 4px' }}>{s.title}</h3>
                            <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ APPLICATION FORM ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 700, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${theme.borderSubtle}`, borderRadius: 24, padding: isMobile ? 24 : 36,
                }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 24, color: theme.text, margin: '0 0 8px' }}>Application Received!</h3>
                            <p style={{ fontSize: 15, color: theme.textMuted }}>We&apos;ll review your application and reach out within 48 hours.</p>
                        </div>
                    ) : (
                        <>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, color: theme.text, margin: '0 0 8px' }}>Apply to Partner</h2>
                            <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 0 24px' }}>Fill out the form below and we&apos;ll be in touch within 48 hours.</p>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                                    {[
                                        { key: 'name', label: 'Your Name', placeholder: 'John Smith', type: 'text' },
                                        { key: 'restaurant', label: 'Restaurant Name', placeholder: "Aurora's Kitchen", type: 'text' },
                                        { key: 'email', label: 'Email', placeholder: 'john@restaurant.com', type: 'email' },
                                        { key: 'phone', label: 'Phone', placeholder: '(705) 555-0123', type: 'tel' },
                                        { key: 'cuisine', label: 'Cuisine Type', placeholder: 'Italian, Pizza, Thai...', type: 'text' },
                                        { key: 'address', label: 'Restaurant Address', placeholder: '123 Queen St E, SSM', type: 'text' },
                                    ].map(f => (
                                        <div key={f.key}>
                                            <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 4 }}>{f.label}</label>
                                            <input required type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                                                placeholder={f.placeholder}
                                                style={{
                                                    width: '100%', padding: '12px 14px', borderRadius: 12,
                                                    border: `1px solid ${theme.border}`, background: theme.bgInput,
                                                    color: theme.text, fontSize: 14, outline: 'none',
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    boxSizing: 'border-box',
                                                    transition: 'border-color 0.2s',
                                                }}
                                                onFocus={e => e.target.style.borderColor = green}
                                                onBlur={e => e.target.style.borderColor = theme.border}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 4 }}>Tell us about your restaurant</label>
                                    <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                        placeholder="What makes your restaurant special? How many orders do you expect per day?"
                                        rows={4}
                                        style={{
                                            width: '100%', padding: '12px 14px', borderRadius: 12,
                                            border: `1px solid ${theme.border}`, background: theme.bgInput,
                                            color: theme.text, fontSize: 14, outline: 'none', resize: 'vertical',
                                            fontFamily: "'DM Sans', sans-serif",
                                            boxSizing: 'border-box',
                                        }}
                                        onFocus={e => e.target.style.borderColor = green}
                                        onBlur={e => e.target.style.borderColor = theme.border}
                                    />
                                </div>
                                <button type="submit" style={{
                                    padding: '16px 40px', borderRadius: 14, border: 'none',
                                    background: `linear-gradient(135deg, ${green}, #10b981)`,
                                    color: '#fff', fontWeight: 700, fontSize: 16,
                                    fontFamily: "'DM Sans', sans-serif",
                                    cursor: 'pointer', boxShadow: `0 4px 20px ${green}40`,
                                    transition: 'transform 0.2s',
                                }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >Submit Application →</button>
                            </form>
                        </>
                    )}
                </div>
            </section>

            {/* ═══ REQUIREMENTS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 700, margin: '0 auto' }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: theme.text, margin: '0 0 16px' }}>Partner Requirements</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {REQUIREMENTS.map((r, i) => (
                        <div key={i} style={{
                            display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 16px', borderRadius: 14,
                            background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)', border: `1px solid ${theme.borderSubtle}`,
                        }}>
                            <span style={{ color: green, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>✓</span>
                            <div>
                                <span style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{r.label}</span>
                                <span style={{ fontSize: 12, color: theme.textMuted, display: 'block' }}>{r.desc}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
