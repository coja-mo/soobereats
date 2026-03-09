"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const REVIEWS = [
    { name: 'Sarah M.', tier: 'Gold', rating: 5, text: "I can't believe this exists in the Soo. Ordered from Aurora's and the driver showed up in a Hyundai IONIQ 5. The whole experience felt premium.", category: 'delivery', date: 'Mar 8', emoji: '🍕' },
    { name: 'Jake R.', tier: 'Diamond', rating: 5, text: "Booked a ride to the airport — Cadillac VISTIQ pulled up, zero emissions, heated seats. Better than any Uber I've taken in Toronto.", category: 'rides', date: 'Mar 7', emoji: '🚗' },
    { name: 'Emily T.', tier: 'Silver', rating: 4, text: "Love that they use all-electric vehicles. The delivery was about 5 minutes later than expected but the food was hot and the driver was super friendly.", category: 'delivery', date: 'Mar 6', emoji: '📦' },
    { name: 'Marcus L.', tier: 'Gold', rating: 5, text: "Used the event shuttle for a Greyhounds game. Picked up right on time, met some neighbours on the ride. Way better than parking downtown.", category: 'events', date: 'Mar 5', emoji: '🏒' },
    { name: 'Priya K.', tier: 'Star', rating: 5, text: "I'm from Sudbury and I wish we had Soobér here. The fact that it's locally owned and data stays in Algoma? That's incredible. Can't wait for it to expand.", category: 'platform', date: 'Mar 4', emoji: '💙' },
    { name: 'Tom W.', tier: 'Bronze', rating: 5, text: "First delivery app I've used where I feel good about it. 15% commission vs 30%? Supporting local restaurants AND getting great food? No brainer.", category: 'delivery', date: 'Mar 3', emoji: '🤝' },
    { name: 'Sophie A.', tier: 'Gold', rating: 5, text: "The Soo MRKT is a game changer. Ordered artisan cheese and local honey delivered in 25 minutes. Supporting makers I didn't even know existed.", category: 'marketplace', date: 'Mar 2', emoji: '🛍️' },
    { name: 'Chris D.', tier: 'Silver', rating: 4, text: "Really solid app. The command palette (⌘K) is slick. Feels like using a premium product, not a small-town delivery app. Impressed.", category: 'platform', date: 'Mar 1', emoji: '💻' },
    { name: 'Anika R.', tier: 'Gold', rating: 5, text: "I drive for Soobér — the BYD Dolphin is a blast. The driver portal is super clean and the pay is fair. Way better than driving for the big apps.", category: 'driver', date: 'Feb 28', emoji: '⚡' },
    { name: 'Dave P.', tier: 'Gold', rating: 5, text: "Ordered catering for our team lunch — 20 people, from Tandoori Gardan. Everything arrived hot, on time, in an EV. The coordinator was amazing.", category: 'catering', date: 'Feb 25', emoji: '🍛' },
];

const STATS = { avg: 4.8, total: 847, fiveStar: 91, fourStar: 7, threeStar: 1, twoStar: 0.5, oneStar: 0.5 };

const CATEGORIES = ['All', 'Delivery', 'Rides', 'Events', 'Marketplace', 'Platform', 'Driver', 'Catering'];

const TIER_COLORS = { Bronze: '#cd7f32', Silver: '#9ca3af', Gold: '#eab308', Diamond: '#06b6d4', Star: '#ec4899' };

export default function ReviewsPage() {
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

    const filtered = activeCategory === 'All' ? REVIEWS : REVIEWS.filter(r => r.category.toLowerCase() === activeCategory.toLowerCase());

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 36px' : '80px 40px 48px' }}>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    What People Are Saying
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 450, margin: '0 auto' }}>
                    Real reviews from real people in Sault Ste. Marie.
                </p>
            </section>

            {/* ═══ RATING SUMMARY ═══ */}
            <section style={{ padding: isMobile ? '0 16px 36px' : '0 40px 48px', maxWidth: 600, margin: '0 auto' }}>
                <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 24, padding: isMobile ? 20 : 28, display: 'flex', gap: 24, alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 52, color: '#f59e0b', letterSpacing: '-0.04em' }}>{STATS.avg}</div>
                        <div style={{ fontSize: 18, color: '#f59e0b', letterSpacing: 2 }}>★★★★★</div>
                        <div style={{ fontSize: 12, color: theme.textFaint, marginTop: 4 }}>{STATS.total} reviews</div>
                    </div>
                    <div style={{ flex: 1, width: '100%' }}>
                        {[
                            { stars: 5, pct: STATS.fiveStar },
                            { stars: 4, pct: STATS.fourStar },
                            { stars: 3, pct: STATS.threeStar },
                            { stars: 2, pct: STATS.twoStar },
                            { stars: 1, pct: STATS.oneStar },
                        ].map((r, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: theme.textFaint, width: 14 }}>{r.stars}</span>
                                <div style={{ flex: 1, height: 8, borderRadius: 4, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${r.pct}%`, borderRadius: 4, background: '#f59e0b', transition: 'width 0.5s' }} />
                                </div>
                                <span style={{ fontSize: 11, color: theme.textFaint, width: 32 }}>{r.pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CATEGORY FILTER ═══ */}
            <section style={{ padding: '0 16px 20px', maxWidth: 700, margin: '0 auto', overflowX: 'auto' }}>
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

            {/* ═══ REVIEWS GRID ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
                    {filtered.map((r, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 18 : 22,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 22 }}>{r.emoji}</span>
                                    <div>
                                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text }}>{r.name}</div>
                                        <span style={{ fontSize: 9, fontWeight: 800, color: TIER_COLORS[r.tier], textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.tier} Member</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: 14, color: '#f59e0b' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                                    <div style={{ fontSize: 10, color: theme.textFaint }}>{r.date}</div>
                                </div>
                            </div>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{r.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
