"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const PRESS_RELEASES = [
    {
        date: 'March 2026',
        title: 'Soobér Launches Northern Ontario\'s First All-Electric Delivery & Mobility Platform',
        excerpt: 'Sault Ste. Marie startup brings 100% electric delivery, ride-hailing, and community marketplace to the Algoma District — charging restaurants half the commission of national apps.',
        tag: 'Launch',
        tagColor: '#22c55e',
    },
    {
        date: 'March 2026',
        title: 'Soobér Introduces "Delivery That Grows" — Plantable Seed Paper in Every Order',
        excerpt: 'Every Soobér delivery includes a compostable seed paper card that customers can plant to grow Ontario wildflowers, creating organic viral marketing and reducing waste.',
        tag: 'Sustainability',
        tagColor: '#10b981',
    },
    {
        date: 'March 2026',
        title: 'Community Marketplace: Soobér Opens Free-Forever Platform for Local Crafters & Sellers',
        excerpt: 'Home bakers, crafters, and thrift sellers can now list products on Soobér\'s Community Marketplace with zero platform fees — forever. AI moderation ensures safety.',
        tag: 'Community',
        tagColor: '#d97706',
    },
    {
        date: 'February 2026',
        title: '90+ Restaurants Partner with Soobér — Saving Local Businesses $63,000/Year Each',
        excerpt: 'By charging 15% commission vs. the industry standard 30%, Soobér saves a mid-volume restaurant approximately $63,000 annually — money that stays in the local economy.',
        tag: 'Business',
        tagColor: '#0066FF',
    },
];

const MEDIA_KIT_ITEMS = [
    { icon: '🎨', label: 'Brand Guidelines', desc: 'Logos, colors, typography, usage rules', format: 'PDF' },
    { icon: '📸', label: 'Press Photos', desc: 'High-res fleet, team, and product photography', format: 'ZIP' },
    { icon: '📊', label: 'Fact Sheet', desc: 'Key stats, metrics, and company overview', format: 'PDF' },
    { icon: '🎬', label: 'Video Assets', desc: 'Launch trailer, fleet showcase, testimonials', format: 'MP4' },
    { icon: '📝', label: 'Founder Bio', desc: 'Biography and headshot for press coverage', format: 'PDF' },
    { icon: '💡', label: 'Story Angles', desc: 'Suggested story ideas for media coverage', format: 'PDF' },
];

const COVERAGE_QUOTES = [
    { source: 'Sault Star', quote: 'A homegrown alternative that actually puts local businesses first.', color: '#0066FF' },
    { source: 'Northern Life', quote: 'The eco-packaging initiative sets a new standard for food delivery in Canada.', color: '#10b981' },
    { source: 'Algoma Spotlight', quote: 'Finally, a delivery app that understands what Northern Ontario communities need.', color: '#d97706' },
];

const KEY_FACTS = [
    { stat: '90+', label: 'Restaurant Partners' },
    { stat: '15%', label: 'Commission Rate' },
    { stat: '100%', label: 'Electric Fleet' },
    { stat: '6', label: 'Service Verticals' },
    { stat: '$63K', label: 'Annual Savings/Restaurant' },
    { stat: '0g', label: 'CO₂ Per Delivery' },
    { stat: '8', label: 'Delivery Zones' },
    { stat: '2026', label: 'Zero Plastic Target' },
];

export default function PressPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const rose = '#f43f5e';

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{
                position: 'relative', overflow: 'hidden', textAlign: 'center',
                padding: isMobile ? '60px 16px 48px' : '80px 40px 64px',
            }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,63,94,0.10) 0%, rgba(244,63,94,0.03) 40%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>📰</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: rose, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Press & Media</span>
                    </div>

                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 56, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        The Soobér{' '}
                        <span style={{ background: 'linear-gradient(135deg, #f43f5e, #fb7185, #fda4af)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Newsroom</span>
                    </h1>

                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 600, margin: '0 auto 28px' }}>
                        Press releases, media kit, brand assets, and everything journalists need to tell the Soobér story.
                    </p>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/contact" style={{
                            padding: '14px 32px', borderRadius: 14,
                            background: `linear-gradient(135deg, ${rose}, #e11d48)`,
                            color: '#fff', fontWeight: 700, fontSize: 15,
                            fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                            boxShadow: '0 4px 20px rgba(244,63,94,0.25)', transition: 'transform 0.2s',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >Media Inquiries →</Link>
                        <a href="#media-kit" style={{
                            padding: '14px 32px', borderRadius: 14,
                            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${theme.borderSubtle}`,
                            color: theme.text, fontWeight: 700, fontSize: 15,
                            fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        }}>Download Media Kit</a>
                    </div>
                </div>
            </section>

            {/* ═══ KEY FACTS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 12 }}>
                    {KEY_FACTS.map((f, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 18, padding: '16px 18px', textAlign: 'center' }}>
                            <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, color: i < 3 ? rose : theme.text, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}>{f.stat}</div>
                            <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>{f.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ PRESS RELEASES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                    📢 Press Releases
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {PRESS_RELEASES.map((pr, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 20 : 28,
                            transition: 'all 0.3s ease', cursor: 'pointer',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${pr.tagColor}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                <span style={{ fontSize: 11, color: theme.textFaint }}>{pr.date}</span>
                                <span style={{ fontSize: 10, fontWeight: 700, background: `${pr.tagColor}15`, color: pr.tagColor, padding: '2px 10px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{pr.tag}</span>
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 16 : 18, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.02em', lineHeight: 1.3 }}>{pr.title}</h3>
                            <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{pr.excerpt}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ MEDIA COVERAGE ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                    💬 Media Coverage
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {COVERAGE_QUOTES.map((cq, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 20 : 24,
                        }}>
                            <div style={{ fontSize: 28, marginBottom: 10, color: cq.color }}>&ldquo;</div>
                            <p style={{ fontSize: 15, color: theme.text, lineHeight: 1.6, margin: '0 0 14px', fontStyle: 'italic', fontFamily: "'DM Sans', sans-serif" }}>{cq.quote}</p>
                            <span style={{ fontSize: 12, fontWeight: 700, color: cq.color }}>— {cq.source}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ MEDIA KIT ═══ */}
            <section id="media-kit" style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                    📦 Media Kit
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {MEDIA_KIT_ITEMS.map((item, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 20 : 24,
                            display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${rose}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 4px' }}>{item.label}</h4>
                                <p style={{ fontSize: 12, color: theme.textMuted, margin: '0 0 8px', lineHeight: 1.4 }}>{item.desc}</p>
                                <span style={{ fontSize: 10, fontWeight: 700, background: `${rose}12`, color: rose, padding: '3px 10px', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.format}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ BOILERPLATE ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? 'linear-gradient(135deg, rgba(244,63,94,0.06), rgba(244,63,94,0.02))' : 'linear-gradient(135deg, rgba(244,63,94,0.05), rgba(244,63,94,0.02))',
                    border: '1px solid rgba(244,63,94,0.12)', borderRadius: 28, padding: isMobile ? '28px 20px' : '40px 40px',
                }}>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 18 : 22, color: theme.text, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                        About Soobér
                    </h3>
                    <p style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.8, margin: '0 0 16px' }}>
                        Soobér is a locally-owned, 100% electric delivery and mobility platform serving Sault Ste. Marie, Ontario and the Algoma District. Founded on the principle that every community deserves premium service without premium extraction, Soobér charges local restaurants half the commission of national apps (15% vs. 30%) while operating an entirely zero-emission electric vehicle fleet.
                    </p>
                    <p style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.8, margin: '0 0 16px' }}>
                        The platform encompasses six service verticals: food delivery, premium ride-hailing, a curated artisan marketplace (Soo MRKT), a free community marketplace, event/catering logistics, and boardwalk electric scooter rental. All services are powered by state-of-the-art technology including AI-powered dispatch, enterprise scheduling, and local compute infrastructure.
                    </p>
                    <p style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.8, margin: 0 }}>
                        Soobér&apos;s sustainability commitment includes compostable packaging across all deliveries, a plantable seed paper program (&ldquo;Delivery That Grows&rdquo;), and a target of zero single-use plastic by end of 2026. Every dollar earned stays in the Sault — no Silicon Valley shareholders, no overseas data centres, no corporate extraction.
                    </p>
                </div>
            </section>

            {/* ═══ CONTACT CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 12px' }}>
                    Media Inquiries
                </h2>
                <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 8px' }}>
                    For press inquiries, interviews, or media access:
                </p>
                <p style={{ fontSize: 16, fontWeight: 700, color: rose, margin: '0 0 24px' }}>
                    press@soobereats.ca
                </p>
                <Link href="/contact" style={{
                    display: 'inline-block', padding: '16px 40px', borderRadius: 14,
                    background: `linear-gradient(135deg, ${rose}, #e11d48)`,
                    color: '#fff', fontWeight: 700, fontSize: 16,
                    fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(244,63,94,0.25)', transition: 'transform 0.2s',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >Contact Us →</Link>
            </section>

            <Footer />
        </div>
    );
}
