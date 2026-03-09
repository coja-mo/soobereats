"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const METRICS = [
    { label: 'Restaurant Partners', value: '90+', icon: '🏪', color: '#0066FF' },
    { label: 'Commission Rate', value: '15%', icon: '💰', color: '#22c55e' },
    { label: 'Fleet Emissions', value: '0g CO₂', icon: '⚡', color: '#10b981' },
    { label: 'Service Verticals', value: '6', icon: '📊', color: '#6366f1' },
    { label: 'Plastic Used', value: '$0', icon: '♻️', color: '#0891b2' },
    { label: 'Data Centres Used', value: '0', icon: '🏠', color: '#d97706' },
];

const MARKET_OPPORTUNITY = [
    { stat: '$35B', label: 'Canadian food delivery market by 2028', color: '#0066FF' },
    { stat: '72%', label: 'of Canadians prefer local businesses', color: '#22c55e' },
    { stat: '85%', label: 'of delivery customers care about sustainability', color: '#10b981' },
    { stat: '3x', label: 'faster growth in Northern Ontario delivery demand', color: '#d97706' },
];

const REVENUE_STREAMS = [
    { name: 'Food Delivery', pct: 55, color: '#0066FF', desc: '15% commission on $35 avg. orders from 90+ partners' },
    { name: 'Soobér Rides', pct: 20, color: '#6366f1', desc: 'Per-ride pricing across 4 vehicle tiers + airport transfers' },
    { name: 'Soo MRKT', pct: 10, color: '#a855f7', desc: 'Commission on curated artisan marketplace sales' },
    { name: 'Events & Catering', pct: 8, color: '#ef4444', desc: 'Premium fleet hire and event logistics coordination' },
    { name: 'Scooter Rental', pct: 5, color: '#d97706', desc: 'Seasonal boardwalk e-scooter rental program' },
    { name: 'Community MRKT', pct: 2, color: '#10b981', desc: 'Optional promoted listings (platform is free forever)' },
];

const COMPETITIVE = [
    { feature: 'Commission Rate', soober: '15%', uber: '30%', skip: '25%' },
    { feature: 'Fleet Type', soober: '100% Electric', uber: 'Mixed/Gas', skip: 'Mixed/Gas' },
    { feature: 'Local Ownership', soober: '✓ 100%', uber: '✗ SF, USA', skip: '✗ Winnipeg/UK' },
    { feature: 'In-Person Onboarding', soober: '✓ White-glove', uber: '✗ Self-serve', skip: '✗ Self-serve' },
    { feature: 'Free Photography', soober: '✓ Included', uber: '✗ No', skip: '✗ No' },
    { feature: 'Dedicated Account Mgr', soober: '✓ Named rep', uber: '✗ Ticket queue', skip: '✗ Ticket queue' },
    { feature: 'Community Marketplace', soober: '✓ Free forever', uber: '✗ N/A', skip: '✗ N/A' },
    { feature: 'Eco Packaging', soober: '✓ Compostable', uber: '✗ No', skip: '✗ No' },
    { feature: 'Ride-Hailing', soober: '✓ Premium EV', uber: '✓ Mixed', skip: '✗ No' },
    { feature: 'Data Sovereignty', soober: '✓ Local servers', uber: '✗ US/Cloud', skip: '✗ Cloud' },
];

const MILESTONES = [
    { q: 'Q1 2026', title: 'Platform Launch', items: ['Next.js 16 web platform live', '90+ restaurant partners onboarded', 'Electric fleet operational', 'KDS/POS deployed to all partners'], done: true },
    { q: 'Q2 2026', title: 'Expansion Phase', items: ['Community Marketplace launch', 'Soo MRKT artisan program', 'Boardwalk scooter rental (seasonal)', 'Soobér Academy training rollout'], done: false },
    { q: 'Q3 2026', title: 'Growth & Scale', items: ['Mobile app (iOS + Android)', 'Algoma District expansion', 'Zero single-use plastic achieved', '10,000+ monthly active users'], done: false },
    { q: 'Q4 2026', title: 'Regional Leader', items: ['Sudbury / North Bay exploration', 'Enterprise API partnerships', 'Profitability milestone', 'Series A preparation'], done: false },
];

export default function InvestorsPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const gold = '#eab308';
    const goldGlow = 'rgba(234,179,8,0.12)';

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{
                position: 'relative', overflow: 'hidden', textAlign: 'center',
                padding: isMobile ? '60px 16px 48px' : '80px 40px 64px',
            }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, ${goldGlow} 0%, rgba(234,179,8,0.04) 40%, transparent 70%)`, pointerEvents: 'none', filter: 'blur(60px)' }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>📈</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: gold, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Investor Relations</span>
                    </div>

                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 56, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        The{' '}
                        <span style={{ background: 'linear-gradient(135deg, #eab308, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Anti-Corporate</span>
                        {' '}Delivery Platform
                    </h1>

                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 640, margin: '0 auto 12px' }}>
                        Locally owned. 100% electric. Half the commission. Northern Ontario&apos;s only vertically integrated delivery, mobility, and commerce ecosystem.
                    </p>
                    <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.6, color: theme.textFaint, maxWidth: 520, margin: '0 auto 28px' }}>
                        Not another Silicon Valley burn-rate play. A sustainable, profitable platform built for communities that deserve better.
                    </p>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/contact" style={{
                            padding: '14px 32px', borderRadius: 14,
                            background: `linear-gradient(135deg, ${gold}, #f59e0b)`,
                            color: '#000', fontWeight: 700, fontSize: 15,
                            fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                            boxShadow: `0 4px 20px ${goldGlow}`, transition: 'transform 0.2s',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >Request Pitch Deck →</Link>
                        <Link href="/socials" style={{
                            padding: '14px 32px', borderRadius: 14,
                            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${theme.borderSubtle}`,
                            color: theme.text, fontWeight: 700, fontSize: 15,
                            fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}>View Campaign Strategy</Link>
                    </div>
                </div>
            </section>

            {/* ═══ KEY METRICS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: 14 }}>
                    {METRICS.map((m, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: 20,
                            textAlign: 'center', transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = `${m.color}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{m.icon}</span>
                            <div style={{ fontSize: 22, fontWeight: 800, color: m.color, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}>{m.value}</div>
                            <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ THE PROBLEM ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                    <div style={{
                        background: isDark ? 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(239,68,68,0.02))' : 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(239,68,68,0.02))',
                        border: '1px solid rgba(239,68,68,0.12)', borderRadius: 24, padding: isMobile ? 24 : 32,
                    }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.06em' }}>The Problem</span>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, color: theme.text, margin: '8px 0 14px', letterSpacing: '-0.03em' }}>National apps are bleeding local restaurants dry</h3>
                        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: theme.textMuted, lineHeight: 1.8 }}>
                            <li><strong style={{ color: '#ef4444' }}>30% commissions</strong> — restaurants can&apos;t survive</li>
                            <li>Zero local investment — profits leave the community</li>
                            <li>No relationship — generic, faceless, ticket-queue support</li>
                            <li>Environmental disaster — gas vehicles, plastic packaging</li>
                            <li>Small cities get second-class service or none at all</li>
                        </ul>
                    </div>
                    <div style={{
                        background: isDark ? 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))' : 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))',
                        border: '1px solid rgba(34,197,94,0.12)', borderRadius: 24, padding: isMobile ? 24 : 32,
                    }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Our Solution</span>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, color: theme.text, margin: '8px 0 14px', letterSpacing: '-0.03em' }}>A platform built by the community, for the community</h3>
                        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: theme.textMuted, lineHeight: 1.8 }}>
                            <li><strong style={{ color: '#22c55e' }}>15% commission</strong> — restaurants keep 85%</li>
                            <li>100% local ownership — every dollar stays in the Sault</li>
                            <li>White-glove onboarding — we visit, taste, photograph, train</li>
                            <li>100% electric fleet + compostable packaging</li>
                            <li>6 service verticals from one integrated platform</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ═══ MARKET OPPORTUNITY ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                    📊 Market Opportunity
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 14 }}>
                    {MARKET_OPPORTUNITY.map((m, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 20 : 24, textAlign: 'center' }}>
                            <div style={{ fontSize: isMobile ? 28 : 36, fontWeight: 800, color: m.color, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}>{m.stat}</div>
                            <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 6, lineHeight: 1.4 }}>{m.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ REVENUE MODEL ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                    💰 Revenue Model
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {REVENUE_STREAMS.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 16, padding: isMobile ? '14px 16px' : '14px 24px' }}>
                            <div style={{ minWidth: 50, textAlign: 'right' }}>
                                <span style={{ fontSize: 18, fontWeight: 800, color: r.color, fontFamily: "'DM Sans', sans-serif" }}>{r.pct}%</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ height: 6, borderRadius: 3, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: 6 }}>
                                    <div style={{ height: '100%', width: `${r.pct}%`, borderRadius: 3, background: `linear-gradient(90deg, ${r.color}, ${r.color}bb)`, transition: 'width 0.8s ease' }} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: theme.text }}>{r.name}</span>
                                    <span style={{ fontSize: 11, color: theme.textMuted }}>{r.desc}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ COMPETITIVE COMPARISON ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                    🏆 Competitive Advantage
                </h2>
                <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, overflow: 'hidden' }}>
                    {/* Table header */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1.5fr 1fr 1fr 1fr' : '2fr 1fr 1fr 1fr', padding: '14px 20px', borderBottom: `1px solid ${theme.borderSubtle}`, background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Feature</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: gold, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>Soobér</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>Uber Eats</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'center' }}>Skip</span>
                    </div>
                    {COMPETITIVE.map((row, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1.5fr 1fr 1fr 1fr' : '2fr 1fr 1fr 1fr', padding: '12px 20px', borderBottom: i < COMPETITIVE.length - 1 ? `1px solid ${theme.borderSubtle}` : 'none' }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{row.feature}</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', textAlign: 'center' }}>{row.soober}</span>
                            <span style={{ fontSize: 12, color: theme.textFaint, textAlign: 'center' }}>{row.uber}</span>
                            <span style={{ fontSize: 12, color: theme.textFaint, textAlign: 'center' }}>{row.skip}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ ROADMAP ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                    🗺️ 2026 Roadmap
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 14 }}>
                    {MILESTONES.map((m, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${m.done ? '#22c55e40' : theme.borderSubtle}`,
                            borderRadius: 22, padding: isMobile ? 20 : 24,
                            opacity: m.done ? 1 : 0.8,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: m.done ? '#22c55e' : gold, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.q}</span>
                                {m.done && <span style={{ fontSize: 10, fontWeight: 700, background: 'rgba(34,197,94,0.12)', color: '#22c55e', padding: '2px 8px', borderRadius: 6 }}>DONE</span>}
                            </div>
                            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 10px' }}>{m.title}</h4>
                            {m.items.map((item, j) => (
                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>
                                    <span style={{ color: m.done ? '#22c55e' : theme.textFaint, fontWeight: 700 }}>{m.done ? '✓' : '○'}</span> {item}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ ESG / SUSTAINABILITY ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))' : 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))',
                    border: '1px solid rgba(16,185,129,0.15)', borderRadius: 28, padding: isMobile ? '28px 20px' : '40px 40px',
                }}>
                    <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: 20, flexDirection: isMobile ? 'column' : 'row' }}>
                        <span style={{ fontSize: 52 }}>🌱</span>
                        <div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>ESG-Aligned by Design</h3>
                            <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, margin: 0, maxWidth: 600 }}>
                                100% electric fleet. Compostable packaging. Plantable seed paper cards. Local data sovereignty. Zero plastic target by EOY 2026. We don&apos;t have an ESG initiative — sustainability <strong style={{ color: '#10b981' }}>is</strong> the business model.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ THE ASK ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 36, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 12px' }}>
                    Interested?
                </h2>
                <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 28px', lineHeight: 1.6, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
                    We&apos;re not just building a delivery app. We&apos;re building the infrastructure for how Northern Ontario does commerce. Let&apos;s talk.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/contact" style={{
                        padding: '16px 40px', borderRadius: 14,
                        background: `linear-gradient(135deg, ${gold}, #f59e0b)`,
                        color: '#000', fontWeight: 700, fontSize: 16,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        boxShadow: `0 4px 20px ${goldGlow}`, transition: 'transform 0.2s',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >Request Pitch Deck</Link>
                    <Link href="/business" style={{
                        padding: '16px 40px', borderRadius: 14,
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                        border: `1px solid ${theme.borderSubtle}`,
                        color: theme.text, fontWeight: 700, fontSize: 16,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        transition: 'all 0.2s',
                    }}>View Business Solutions</Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
