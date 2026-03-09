"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const CITIES = [
    { name: 'Sault Ste. Marie', status: 'live', province: 'ON', pop: '73,000', restaurants: '18+', fleet: '8 EVs', since: 'Q1 2026', color: '#22c55e' },
    { name: 'Sudbury', status: 'next', province: 'ON', pop: '166,000', restaurants: 'TBD', fleet: 'Planning', since: 'Q3 2026', color: '#f59e0b' },
    { name: 'North Bay', status: 'planned', province: 'ON', pop: '52,000', restaurants: 'TBD', fleet: 'Planning', since: 'Q4 2026', color: '#3b82f6' },
    { name: 'Thunder Bay', status: 'planned', province: 'ON', pop: '121,000', restaurants: 'TBD', fleet: 'Planning', since: 'Q1 2027', color: '#8b5cf6' },
    { name: 'Timmins', status: 'exploring', province: 'ON', pop: '42,000', restaurants: 'TBD', fleet: 'TBD', since: 'TBD', color: '#06b6d4' },
    { name: 'Kenora', status: 'exploring', province: 'ON', pop: '15,000', restaurants: 'TBD', fleet: 'TBD', since: 'TBD', color: '#ec4899' },
];

const STATUS_LABELS = {
    live: { label: 'Live', bg: 'rgba(34,197,94,0.1)', color: '#22c55e' },
    next: { label: 'Next Up', bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
    planned: { label: 'Planned', bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' },
    exploring: { label: 'Exploring', bg: 'rgba(107,114,128,0.1)', color: '#6b7280' },
};

const MODEL_FEATURES = [
    { icon: '🏘️', title: 'Hyperlocal Model', desc: 'Each city gets its own local team, local partners, and local compute infrastructure. One app, but adapted for every community.' },
    { icon: '💰', title: 'Fair Economics', desc: '15% commission — always. No surge pricing. No hidden fees. The same deal in Sudbury as in the Soo.' },
    { icon: '🔒', title: 'Local Data, Everywhere', desc: 'Each city gets its own on-premise compute node. Data never leaves the region. True sovereignty at scale.' },
    { icon: '⚡', title: '100% Electric', desc: 'Every new city launches with a 100% electric fleet. We partner with local dealers and charging networks.' },
    { icon: '🤝', title: 'Community First', desc: 'We onboard local restaurants first, hire local drivers, and reinvest in the community through partnerships and sponsorships.' },
    { icon: '📡', title: 'Connected Network', desc: 'Your Soobér account works in every city. One wallet, one loyalty tier, one app across Northern Ontario.' },
];

export default function ExpansionPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);

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
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 750, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>🗺️</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Expansion</span>
                    </div>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 52, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Coming to a{' '}
                        <span style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>City Near You</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: theme.textMuted, maxWidth: 560, margin: '0 auto' }}>
                        What started in Sault Ste. Marie is expanding across Northern Ontario. Same local-first model, adapted for every community.
                    </p>
                </div>
            </section>

            {/* ═══ CITY CARDS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {CITIES.map((city, i) => {
                        const status = STATUS_LABELS[city.status];
                        return (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${city.status === 'live' ? 'rgba(34,197,94,0.3)' : theme.borderSubtle}`,
                                borderRadius: 22, padding: 22, position: 'relative', overflow: 'hidden',
                                transition: 'all 0.3s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {city.status === 'live' && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#22c55e' }} />}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: theme.text, margin: 0 }}>{city.name}</h3>
                                    <span style={{ fontSize: 10, fontWeight: 800, color: status.color, background: status.bg, padding: '3px 8px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{status.label}</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                                    {[
                                        { label: 'Population', val: city.pop },
                                        { label: 'Restaurants', val: city.restaurants },
                                        { label: 'Fleet', val: city.fleet },
                                        { label: 'Launch', val: city.since },
                                    ].map((r, j) => (
                                        <div key={j} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: theme.textFaint }}>{r.label}</span>
                                            <span style={{ fontWeight: 600, color: theme.text }}>{r.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ MODEL ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1000, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px', textAlign: 'center' }}>The Soobér Model</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {MODEL_FEATURES.map((f, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: 22 }}>
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{f.icon}</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 4px' }}>{f.title}</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ BRING SOOBER CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <div style={{
                    background: isDark ? 'rgba(139,92,246,0.04)' : 'rgba(139,92,246,0.03)',
                    border: '1px solid rgba(139,92,246,0.15)', borderRadius: 28, padding: isMobile ? 28 : 40,
                }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20, color: theme.text, margin: '0 0 8px' }}>Want Soobér in Your City?</h2>
                    <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 0 16px' }}>
                        We&apos;re looking for community champions in Northern Ontario towns to help us launch.
                    </p>
                    <input placeholder="Your email" style={{
                        width: '100%', padding: '12px 16px', borderRadius: 12, border: `1px solid ${theme.border}`,
                        background: theme.bgInput, color: theme.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                        outline: 'none', boxSizing: 'border-box', marginBottom: 8,
                    }} />
                    <input placeholder="Your city" style={{
                        width: '100%', padding: '12px 16px', borderRadius: 12, border: `1px solid ${theme.border}`,
                        background: theme.bgInput, color: theme.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                        outline: 'none', boxSizing: 'border-box', marginBottom: 12,
                    }} />
                    <button style={{
                        padding: '14px 32px', borderRadius: 14, border: 'none',
                        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                        color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif",
                        boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
                    }}>Bring Soobér to My City →</button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
