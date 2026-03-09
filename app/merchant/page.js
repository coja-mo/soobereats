"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const BENEFITS = [
    { icon: '💰', title: '15% Commission', desc: 'Half of what national apps charge. More profit stays with your restaurant.', stat: 'vs. 30% elsewhere' },
    { icon: '📡', title: 'Local Data', desc: 'Your customer data stays in Algoma. No selling to third parties. Ever.', stat: 'Zero external cloud' },
    { icon: '⚡', title: 'EV Delivery Fleet', desc: 'All deliveries by electric vehicle. Great for your brand and the planet.', stat: '100% electric' },
    { icon: '📊', title: 'Analytics Dashboard', desc: 'Real-time sales data, customer insights, and menu performance tracking.', stat: 'Live dashboard' },
    { icon: '🖥️', title: 'KDS + POS', desc: 'Free kitchen display and point-of-sale system included with your account.', stat: 'No extra cost' },
    { icon: '📱', title: 'Your Own Storefront', desc: 'Custom branded page with your menu, photos, hours, and reviews.', stat: 'Premium listing' },
];

const PROCESS_STEPS = [
    { num: '1', title: 'Apply Online', desc: 'Fill out the form below. Takes about 5 minutes.', time: '5 min' },
    { num: '2', title: 'Onboarding Call', desc: "We'll call to discuss your menu, hours, and preferences.", time: '1-2 days' },
    { num: '3', title: 'Menu Setup', desc: "We'll photograph your dishes and build your digital menu.", time: '2-3 days' },
    { num: '4', title: 'Go Live', desc: 'Your restaurant appears on Soobér. Start receiving orders.', time: 'Launch day!' },
];

const TESTIMONIALS = [
    { name: "Aurora's Italian", quote: "Switching to Soobér was the best decision. The 15% commission means we keep more of every order.", emoji: '🍕' },
    { name: "Tandoori Gardan", quote: "The KDS is clean and the orders come in smoothly. Way better than our old setup.", emoji: '🍛' },
];

export default function MerchantSignupPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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
            <section style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', padding: isMobile ? '60px 16px 48px' : '80px 40px 64px' }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>🏪</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Become a Partner</span>
                    </div>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 52, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 12px' }}>
                        Grow Your Restaurant{' '}
                        <span style={{ background: 'linear-gradient(135deg, #22c55e, #0066FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>with Soobér</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: theme.textMuted, maxWidth: 530, margin: '0 auto' }}>
                        15% commission. Local data sovereignty. All-electric delivery. Join 18+ restaurants already on the platform.
                    </p>
                </div>
            </section>

            {/* ═══ BENEFITS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {BENEFITS.map((b, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: 22,
                            transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{b.icon}</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 4px' }}>{b.title}</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: '0 0 8px' }}>{b.desc}</p>
                            <span style={{ fontSize: 10, fontWeight: 800, color: blue, background: 'rgba(0,102,255,0.1)', padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase' }}>{b.stat}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ PROCESS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 700, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px', textAlign: 'center' }}>How It Works</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 10 }}>
                    {PROCESS_STEPS.map((s, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: 16 }}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,102,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: blue }}>{s.num}</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 4px' }}>{s.title}</h3>
                            <p style={{ fontSize: 12, color: theme.textFaint, lineHeight: 1.4, margin: '0 0 4px' }}>{s.desc}</p>
                            <span style={{ fontSize: 10, fontWeight: 700, color: '#22c55e' }}>{s.time}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ PARTNER QUOTES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 36px' : '0 40px 48px', maxWidth: 600, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 18,
                            padding: 18, display: 'flex', gap: 12, alignItems: 'flex-start',
                        }}>
                            <span style={{ fontSize: 28, flexShrink: 0 }}>{t.emoji}</span>
                            <div>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: '0 0 6px', fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: theme.text }}>{t.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ APPLICATION FORM ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 520, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? 'rgba(0,102,255,0.04)' : 'rgba(0,102,255,0.02)',
                    border: '1px solid rgba(0,102,255,0.15)', borderRadius: 28, padding: isMobile ? 24 : 32,
                }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <span style={{ fontSize: 44, display: 'block', marginBottom: 12 }}>🎉</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20, color: theme.text, margin: '0 0 8px' }}>Application Received!</h3>
                            <p style={{ fontSize: 14, color: theme.textMuted }}>We&apos;ll be in touch within 48 hours to schedule your onboarding call.</p>
                        </div>
                    ) : (
                        <>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 18, color: theme.text, margin: '0 0 4px' }}>Apply to Join</h3>
                            <p style={{ fontSize: 13, color: theme.textFaint, margin: '0 0 16px' }}>Takes about 5 minutes. No commitment until you&apos;re ready.</p>
                            {[
                                { placeholder: 'Restaurant Name', type: 'text' },
                                { placeholder: 'Contact Name', type: 'text' },
                                { placeholder: 'Email', type: 'email' },
                                { placeholder: 'Phone', type: 'tel' },
                                { placeholder: 'Address', type: 'text' },
                                { placeholder: 'Cuisine Type (e.g. Italian, Indian, Grocery)', type: 'text' },
                            ].map((f, i) => (
                                <input key={i} placeholder={f.placeholder} type={f.type} style={{
                                    width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${theme.border}`,
                                    background: theme.bgInput, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                                    outline: 'none', boxSizing: 'border-box', marginBottom: 8,
                                }} />
                            ))}
                            <textarea placeholder="Tell us about your restaurant (optional)" rows={3} style={{
                                width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${theme.border}`,
                                background: theme.bgInput, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                                outline: 'none', boxSizing: 'border-box', marginBottom: 12, resize: 'vertical',
                            }} />
                            <button onClick={() => setSubmitted(true)} style={{
                                width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
                                background: 'linear-gradient(135deg, #22c55e, #0066FF)',
                                color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                                fontFamily: "'DM Sans', sans-serif",
                                boxShadow: '0 4px 20px rgba(0,102,255,0.3)',
                            }}>Submit Application →</button>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
