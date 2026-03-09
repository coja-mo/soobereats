"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const POSTS = [
    {
        id: 'soober-launch-story',
        title: 'Why We Built Soobér — A Love Letter to the Soo',
        excerpt: 'How one question changed everything: "Why can\'t Northern Ontario have what Toronto has?" This is the story of Soobér — from a frustration to a platform.',
        category: 'Story',
        readTime: '6 min',
        date: 'Mar 8, 2026',
        featured: true,
        emoji: '💙',
        color: '#0066FF',
    },
    {
        id: 'ev-fleet-announcement',
        title: 'Introducing Our 100% Electric Fleet',
        excerpt: 'From the Cadillac VISTIQ to the BYD Seal, we\'re rolling out 8 all-electric models for rides and delivery in Sault Ste. Marie.',
        category: 'Announcement',
        readTime: '4 min',
        date: 'Mar 7, 2026',
        featured: false,
        emoji: '⚡',
        color: '#22c55e',
    },
    {
        id: 'local-data-sovereignty',
        title: 'Your Data Stays in Algoma — Our Local Computing Promise',
        excerpt: 'While national apps ship your data to US cloud servers, Soobér processes everything locally on Mac Studio nodes. Here\'s why that matters.',
        category: 'Tech',
        readTime: '5 min',
        date: 'Mar 5, 2026',
        featured: false,
        emoji: '🔒',
        color: '#8b5cf6',
    },
    {
        id: 'restaurant-partner-spotlight',
        title: 'Partner Spotlight: How Local Restaurants Are Thriving',
        excerpt: '18 restaurants, 15% commission, zero setup fees. We sat down with three partners to hear how Soobér is helping them grow.',
        category: 'Partners',
        readTime: '7 min',
        date: 'Mar 3, 2026',
        featured: false,
        emoji: '🍽️',
        color: '#f59e0b',
    },
    {
        id: 'soo-mrkt-launch',
        title: 'Soo MRKT: Your Neighbourhood, Delivered',
        excerpt: 'From artisan cheese to handmade candles — Soo MRKT brings the best of local makers to your doorstep.',
        category: 'Product',
        readTime: '3 min',
        date: 'Feb 28, 2026',
        featured: false,
        emoji: '🛍️',
        color: '#ec4899',
    },
    {
        id: 'garden-river-expansion',
        title: 'Expanding to Garden River First Nation',
        excerpt: 'We\'re proud to announce that Soobér delivery now reaches Garden River First Nation — extending our commitment to serve all of Algoma.',
        category: 'Community',
        readTime: '3 min',
        date: 'Feb 25, 2026',
        featured: false,
        emoji: '🤝',
        color: '#06b6d4',
    },
    {
        id: 'airport-transfers',
        title: 'Airport Transfers: Flat-Rate Rides to YAM',
        excerpt: 'No surge, no surprises. Book a flat-rate ride to Sault Ste. Marie Airport (YAM) starting at $25.',
        category: 'Product',
        readTime: '2 min',
        date: 'Feb 20, 2026',
        featured: false,
        emoji: '✈️',
        color: '#3b82f6',
    },
    {
        id: 'sustainability-report-q1',
        title: 'Q1 2026 Sustainability Report',
        excerpt: '12,847 zero-emission deliveries. 48,200 kg CO₂ avoided. Here\'s our full environmental impact in numbers.',
        category: 'Impact',
        readTime: '5 min',
        date: 'Feb 15, 2026',
        featured: false,
        emoji: '🌱',
        color: '#22c55e',
    },
];

const CATEGORIES = ['All', 'Story', 'Announcement', 'Tech', 'Product', 'Partners', 'Community', 'Impact'];

export default function BlogPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const featured = POSTS.find(p => p.featured);
    const filtered = activeCategory === 'All'
        ? POSTS.filter(p => !p.featured)
        : POSTS.filter(p => !p.featured && p.category === activeCategory);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 40px' : '80px 40px 48px' }}>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>Blog</h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 480, margin: '0 auto' }}>
                    Stories, announcements, and insights from the team building Sault Ste. Marie&apos;s delivery platform.
                </p>
            </section>

            {/* ═══ FEATURED POST ═══ */}
            {featured && (
                <section style={{ padding: isMobile ? '0 16px 36px' : '0 40px 48px', maxWidth: 900, margin: '0 auto' }}>
                    <div style={{
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${featured.color}30`,
                        borderRadius: 28, padding: isMobile ? 24 : 36, position: 'relative', overflow: 'hidden',
                        cursor: 'pointer', transition: 'all 0.3s',
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${featured.color}, ${featured.color}80)` }} />
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: featured.color, textTransform: 'uppercase', letterSpacing: '0.06em', background: `${featured.color}12`, padding: '3px 10px', borderRadius: 6 }}>Featured</span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', padding: '3px 10px', borderRadius: 6 }}>{featured.category}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 20, alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                            <span style={{ fontSize: 56, flexShrink: 0 }}>{featured.emoji}</span>
                            <div>
                                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px', lineHeight: 1.2 }}>{featured.title}</h2>
                                <p style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 10px' }}>{featured.excerpt}</p>
                                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: theme.textFaint }}>
                                    <span>{featured.date}</span>
                                    <span>·</span>
                                    <span>{featured.readTime} read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ CATEGORY FILTER ═══ */}
            <section style={{ padding: '0 16px 24px', maxWidth: 700, margin: '0 auto', overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: 6, minWidth: 'min-content' }}>
                    {CATEGORIES.map(c => (
                        <button key={c} onClick={() => setActiveCategory(c)} style={{
                            padding: '6px 14px', borderRadius: 10, border: 'none',
                            background: activeCategory === c ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)') : 'transparent',
                            color: activeCategory === c ? theme.text : theme.textFaint,
                            fontWeight: 700, fontSize: 12, cursor: 'pointer', whiteSpace: 'nowrap',
                            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                        }}>{c}</button>
                    ))}
                </div>
            </section>

            {/* ═══ POST GRID ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                    {filtered.map((post, i) => (
                        <article key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22,
                            padding: isMobile ? 20 : 24, cursor: 'pointer',
                            transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${post.color}44`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: post.color, textTransform: 'uppercase', letterSpacing: '0.05em', background: `${post.color}12`, padding: '2px 8px', borderRadius: 6 }}>{post.category}</span>
                                <span style={{ fontSize: 28 }}>{post.emoji}</span>
                            </div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, lineHeight: 1.3, color: theme.text, margin: '0 0 6px' }}>{post.title}</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: '0 0 12px' }}>{post.excerpt}</p>
                            <div style={{ display: 'flex', gap: 10, fontSize: 11, color: theme.textFaint }}>
                                <span>{post.date}</span>
                                <span>·</span>
                                <span>{post.readTime} read</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
