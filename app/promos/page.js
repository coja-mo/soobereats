"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const PROMOS = [
    { code: 'SOOLOCAL', discount: '20% OFF', desc: 'Your first order on Soobér', minOrder: '$0', expires: 'Apr 30, 2026', type: 'first-order', color: '#0066FF', emoji: '🎉', active: true },
    { code: 'FREERIDE', discount: 'FREE RIDE', desc: 'First Soobér Ride up to $15', minOrder: '$0', expires: 'Mar 31, 2026', type: 'rides', color: '#8b5cf6', emoji: '🚗', active: true },
    { code: 'SPRING40', discount: 'FREE DELIVERY', desc: 'Free delivery on orders over $40', minOrder: '$40', expires: 'May 1, 2026', type: 'delivery', color: '#22c55e', emoji: '🌸', active: true },
    { code: 'MRKT10', discount: '$10 OFF', desc: 'First Soo MRKT marketplace order', minOrder: '$25', expires: 'Apr 15, 2026', type: 'marketplace', color: '#f59e0b', emoji: '🛍️', active: true },
    { code: 'REFER10', discount: '$10 + $10', desc: 'You and your friend each get $10', minOrder: '$0', expires: 'Never', type: 'referral', color: '#ec4899', emoji: '🤝', active: true },
    { code: 'HOCKEY', discount: '15% OFF', desc: 'Game day shuttle + food combo', minOrder: '$20', expires: 'Apr 2026', type: 'events', color: '#ef4444', emoji: '🏒', active: true },
];

const DEALS = [
    { restaurant: "Aurora's Italian", emoji: '🍕', deal: 'Buy any pizza, get garlic bread FREE', until: 'This weekend', tag: 'Limited' },
    { restaurant: 'Tandoori Gardan', emoji: '🍛', deal: '2-for-1 butter chicken every Tuesday', until: 'Every Tuesday', tag: 'Weekly' },
    { restaurant: 'Soo Fresh Market', emoji: '🥬', deal: 'Free reusable bag with orders over $30', until: 'Ongoing', tag: 'Always On' },
    { restaurant: "Giovanni's", emoji: '🍝', deal: '20% off all pasta dishes after 8PM', until: 'Nightly', tag: 'Happy Hour' },
    { restaurant: 'Thai Orchid', emoji: '🥡', deal: 'Free spring rolls with any entrée', until: 'All March', tag: 'Monthly' },
    { restaurant: "Mike's Place", emoji: '🍔', deal: 'Kids eat free on Sundays', until: 'Every Sunday', tag: 'Family' },
];

export default function PromosPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [copiedCode, setCopiedCode] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const copyCode = (code) => {
        navigator.clipboard?.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 40px' : '80px 40px 48px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(236,72,153,0.08)', border: '1px solid rgba(236,72,153,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                    <span style={{ fontSize: 16 }}>🔥</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Deals & Promos</span>
                </div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    Save More, Eat Local
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 460, margin: '0 auto' }}>
                    Active promo codes, restaurant deals, and exclusive offers for the Soo.
                </p>
            </section>

            {/* ═══ PROMO CODES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 16px' }}>Promo Codes</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
                    {PROMOS.map((p, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 18 : 22,
                            position: 'relative', overflow: 'hidden', transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.color }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                <div>
                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 22, color: p.color }}>{p.discount}</div>
                                    <div style={{ fontSize: 13, color: theme.text, fontWeight: 600, marginTop: 2 }}>{p.desc}</div>
                                </div>
                                <span style={{ fontSize: 28 }}>{p.emoji}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                <div style={{ display: 'flex', gap: 8, fontSize: 11, color: theme.textFaint }}>
                                    {p.minOrder !== '$0' && <span>Min: {p.minOrder}</span>}
                                    <span>Expires: {p.expires}</span>
                                </div>
                                <button onClick={() => copyCode(p.code)} style={{
                                    padding: '6px 14px', borderRadius: 8, border: `1.5px dashed ${p.color}`,
                                    background: copiedCode === p.code ? `${p.color}15` : 'transparent',
                                    color: p.color, fontWeight: 800, fontSize: 12, cursor: 'pointer',
                                    fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.04em',
                                    transition: 'all 0.2s',
                                }}>
                                    {copiedCode === p.code ? '✓ Copied!' : p.code}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ RESTAURANT DEALS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 16px' }}>Restaurant Deals</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
                    {DEALS.map((d, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: 18,
                            transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(0,102,255,0.3)'; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <span style={{ fontSize: 24 }}>{d.emoji}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, color: '#0066FF', background: 'rgba(0,102,255,0.1)', padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase' }}>{d.tag}</span>
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 4px' }}>{d.restaurant}</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.4, margin: '0 0 6px' }}>{d.deal}</p>
                            <span style={{ fontSize: 11, color: theme.textFaint }}>{d.until}</span>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
