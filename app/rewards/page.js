"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';

// ── Tier Data ──────────────────────────────────────────────────────────────
const TIERS = [
    {
        name: 'Bronze', emoji: '🥉', minOrders: 0, pointsMultiplier: '1×',
        color: '#cd7f32', gradient: 'linear-gradient(135deg, #cd7f32, #a0522d)',
        glowColor: 'rgba(205,127,50,0.15)',
        benefits: ['1 pt per $1 spent', 'Birthday surprise', 'Seasonal promos'],
    },
    {
        name: 'Silver', emoji: '🥈', minOrders: 15, pointsMultiplier: '1.5×',
        color: '#a8a9ad', gradient: 'linear-gradient(135deg, #c0c0c0, #71797E)',
        glowColor: 'rgba(168,169,173,0.15)',
        benefits: ['1.5× points', 'Free delivery over $40', 'Priority support', 'Early restaurant access'],
    },
    {
        name: 'Gold', emoji: '🥇', minOrders: 40, pointsMultiplier: '2×',
        color: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
        glowColor: 'rgba(234,179,8,0.15)',
        benefits: ['2× points', 'Free delivery always', 'Gold-only promos', 'Monthly treat', 'Priority processing'],
    },
    {
        name: 'Diamond', emoji: '💎', minOrders: 100, pointsMultiplier: '3×',
        color: '#60a5fa', gradient: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
        glowColor: 'rgba(96,165,250,0.2)',
        benefits: ['3× points', 'Free delivery for life', 'Personal concierge', 'First access to new features', 'Diamond events', 'Annual gift', 'VIP reservations'],
    },
];

// ── Member Data (Simulated) ────────────────────────────────────────────────
const MEMBER = {
    name: 'Cody', currentTier: 2, points: 1847, totalEarned: 3240,
    orders: 47, nextTierAt: 100, streak: 5, memberSince: 'Jan 2026',
};

const REWARDS = [
    { points: 100, name: 'Free Drink', icon: '🥤', desc: 'Any beverage with your next order', category: 'food' },
    { points: 250, name: '$5 Credit', icon: '💵', desc: 'Applied to any order', category: 'credit' },
    { points: 500, name: 'Free Appetizer', icon: '🍟', desc: 'At participating restaurants', category: 'food' },
    { points: 750, name: 'Double Points Day', icon: '⚡', desc: '2× points on your next 3 orders', category: 'boost' },
    { points: 1000, name: 'Free Meal', icon: '🍽️', desc: 'Up to $25 value, on us', category: 'food' },
    { points: 1500, name: '$20 Credit', icon: '💰', desc: 'Applied to any orders', category: 'credit' },
    { points: 2500, name: 'Private Tasting', icon: '🥂', desc: "Exclusive chef's table experience", category: 'experience' },
    { points: 5000, name: 'Annual VIP Pass', icon: '👑', desc: 'Free delivery for 1 year + monthly credits', category: 'premium' },
];

const RECENT_ACTIVITY = [
    { type: 'earned', label: "Aurora's Restaurant", points: 48, date: 'Today' },
    { type: 'earned', label: "Tandoori Gardan", points: 33, date: 'Yesterday' },
    { type: 'redeemed', label: 'Free Drink Reward', points: -100, date: 'Mar 5' },
    { type: 'earned', label: "Sandro's", points: 39, date: 'Mar 5' },
    { type: 'bonus', label: 'Streak Bonus (5 orders)', points: 50, date: 'Mar 4' },
];

export default function RewardsPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeTier, setActiveTier] = useState(MEMBER.currentTier);
    const [animatedPoints, setAnimatedPoints] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [ringProgress, setRingProgress] = useState(0);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Animate points counter
    useEffect(() => {
        const target = MEMBER.points;
        const duration = 1200;
        const start = performance.now();
        const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setAnimatedPoints(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, []);

    // Animate ring
    useEffect(() => {
        const target = (MEMBER.orders / MEMBER.nextTierAt) * 100;
        const timer = setTimeout(() => setRingProgress(target), 300);
        return () => clearTimeout(timer);
    }, []);

    const pad = isMobile ? '0 16px' : '0 40px';
    const currentTierData = TIERS[MEMBER.currentTier];
    const nextTierData = TIERS[Math.min(MEMBER.currentTier + 1, TIERS.length - 1)];
    const ordersToNext = nextTierData.minOrders - MEMBER.orders;

    const filteredRewards = selectedCategory === 'all'
        ? REWARDS
        : REWARDS.filter(r => r.category === selectedCategory);

    // SVG ring dimensions
    const ringSize = isMobile ? 140 : 180;
    const ringStroke = isMobile ? 8 : 10;
    const ringRadius = (ringSize - ringStroke) / 2;
    const ringCircumference = 2 * Math.PI * ringRadius;
    const ringOffset = ringCircumference - (ringProgress / 100) * ringCircumference;

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* ═══════════ HERO ═══════════ */}
            <section style={{
                padding: isMobile ? '48px 0 0' : '64px 0 0',
                background: isDark
                    ? 'linear-gradient(160deg, #09090b 0%, #1a1520 30%, #0f0a1a 60%, #09090b 100%)'
                    : 'linear-gradient(160deg, #1c1917 0%, #292524 30%, #1c1917 100%)',
                color: '#fff', position: 'relative', overflow: 'hidden',
            }}>
                {/* Ambient glows */}
                <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: `radial-gradient(circle, ${currentTierData.glowColor} 0%, transparent 60%)`, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '0', right: '20%', width: 400, height: 300, background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    {/* Badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 16px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.12)',
                        background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: currentTierData.color, marginBottom: 24,
                    }}>🏆 Soobér Rewards</div>

                    {/* Hero Grid: Text + Status Card */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
                        gap: isMobile ? 32 : 48,
                        alignItems: 'center',
                        paddingBottom: isMobile ? 40 : 56,
                    }}>
                        {/* Left: Text */}
                        <div>
                            <h1 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 34 : 52, fontWeight: 700,
                                letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16,
                            }}>
                                Every order{' '}
                                <span style={{
                                    background: `linear-gradient(135deg, ${currentTierData.color}, #60a5fa)`,
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>earns you more</span>
                            </h1>
                            <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.55)', maxWidth: 500, lineHeight: 1.65, marginBottom: 28 }}>
                                Our loyalty program rewards you for supporting local. Earn points, unlock tiers, and redeem exclusive rewards — all while keeping your dollars in the Soo.
                            </p>

                            {/* Quick stats row */}
                            <div style={{ display: 'flex', gap: isMobile ? 16 : 24, flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Total Earned', value: `${MEMBER.totalEarned.toLocaleString()} pts` },
                                    { label: 'Orders', value: MEMBER.orders },
                                    { label: 'Streak', value: `${MEMBER.streak} 🔥` },
                                    { label: 'Member Since', value: MEMBER.memberSince },
                                ].map(s => (
                                    <div key={s.label}>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: '#fafafa', fontFamily: "'DM Sans', sans-serif" }}>{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Status Card */}
                        <div style={{
                            background: isDark ? 'rgba(24,24,27,0.6)' : 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                            border: `1px solid rgba(255,255,255,0.08)`,
                            borderRadius: 28, padding: isMobile ? 24 : 32,
                            textAlign: 'center',
                        }}>
                            {/* Progress Ring */}
                            <div style={{ position: 'relative', width: ringSize, height: ringSize, margin: '0 auto 20px' }}>
                                <svg width={ringSize} height={ringSize} style={{ transform: 'rotate(-90deg)' }}>
                                    <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius}
                                        fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={ringStroke} />
                                    <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius}
                                        fill="none" stroke={currentTierData.color} strokeWidth={ringStroke}
                                        strokeLinecap="round"
                                        strokeDasharray={ringCircumference}
                                        strokeDashoffset={ringOffset}
                                        style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)', filter: `drop-shadow(0 0 8px ${currentTierData.color}40)` }}
                                    />
                                </svg>
                                <div style={{
                                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <span style={{ fontSize: isMobile ? 32 : 40 }}>{currentTierData.emoji}</span>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: currentTierData.color, marginTop: 4 }}>{currentTierData.name}</span>
                                </div>
                            </div>

                            {/* Points display */}
                            <div style={{ fontSize: isMobile ? 36 : 44, fontWeight: 800, color: '#fafafa', fontFamily: "'DM Sans', sans-serif", fontVariantNumeric: 'tabular-nums', marginBottom: 4 }}>
                                {animatedPoints.toLocaleString()}
                            </div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>points available</div>

                            {/* Next tier progress */}
                            {MEMBER.currentTier < TIERS.length - 1 && (
                                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: '14px 18px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>Next: {nextTierData.emoji} {nextTierData.name}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: nextTierData.color }}>{ordersToNext} orders away</span>
                                    </div>
                                    <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                                        <div style={{
                                            height: '100%', borderRadius: 3,
                                            width: `${(MEMBER.orders / nextTierData.minOrders) * 100}%`,
                                            background: nextTierData.gradient,
                                            transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad }}>

                {/* ═══════════ TIER PROGRESSION ═══════════ */}
                <section style={{ paddingTop: isMobile ? 40 : 64, marginBottom: isMobile ? 40 : 56 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, letterSpacing: '-0.03em', marginBottom: 8, textAlign: 'center' }}>
                        Tier Progression
                    </h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>Unlock higher tiers for bigger rewards</p>

                    {/* Tier Timeline */}
                    <div style={{ position: 'relative', marginBottom: 32 }}>
                        {/* Connection line */}
                        {!isMobile && (
                            <div style={{
                                position: 'absolute', top: 28, left: '10%', right: '10%', height: 3,
                                background: theme.bgInput, borderRadius: 2, zIndex: 0,
                            }}>
                                <div style={{
                                    height: '100%', borderRadius: 2,
                                    width: `${((MEMBER.currentTier) / (TIERS.length - 1)) * 100}%`,
                                    background: currentTierData.gradient,
                                    transition: 'width 1s ease',
                                }} />
                            </div>
                        )}
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 12 : 16, position: 'relative', zIndex: 1 }}>
                            {TIERS.map((tier, i) => {
                                const isUnlocked = i <= MEMBER.currentTier;
                                const isCurrent = i === MEMBER.currentTier;
                                return (
                                    <button key={tier.name} onClick={() => setActiveTier(i)} style={{
                                        background: isCurrent ? theme.bgCard : (isUnlocked ? theme.bgCard : theme.bgInput),
                                        border: `2px solid ${isCurrent ? tier.color : (isUnlocked ? theme.borderSubtle : 'transparent')}`,
                                        borderRadius: 22, padding: isMobile ? '16px 14px' : '20px 20px',
                                        cursor: 'pointer', textAlign: 'center',
                                        transition: 'all 0.3s ease',
                                        transform: activeTier === i ? 'scale(1.03)' : 'scale(1)',
                                        boxShadow: isCurrent ? `0 8px 32px ${tier.color}20` : theme.shadow,
                                        opacity: isUnlocked ? 1 : 0.5,
                                    }}>
                                        <div style={{ fontSize: isMobile ? 28 : 36, marginBottom: 8 }}>{tier.emoji}</div>
                                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 14 : 16, fontWeight: 700, color: isUnlocked ? theme.text : theme.textFaint, marginBottom: 4 }}>{tier.name}</div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: tier.color }}>{tier.pointsMultiplier} points</div>
                                        {isCurrent && (
                                            <div style={{
                                                marginTop: 8, fontSize: 10, fontWeight: 700, color: tier.color,
                                                background: `${tier.color}18`, padding: '3px 10px', borderRadius: 6,
                                                display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.06em',
                                            }}>Current</div>
                                        )}
                                        {!isUnlocked && (
                                            <div style={{ marginTop: 8, fontSize: 11, color: theme.textFaint }}>
                                                🔒 {tier.minOrders} orders
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active Tier Benefits */}
                    <div style={{
                        background: theme.bgCard, borderRadius: 24, overflow: 'hidden',
                        border: `1px solid ${TIERS[activeTier].color}25`, boxShadow: theme.shadow,
                    }}>
                        <div style={{
                            background: TIERS[activeTier].gradient, padding: isMobile ? '20px 20px' : '28px 32px',
                            display: 'flex', alignItems: 'center', gap: 16,
                        }}>
                            <span style={{ fontSize: isMobile ? 28 : 36 }}>{TIERS[activeTier].emoji}</span>
                            <div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 20 : 26, fontWeight: 700, color: '#fff', margin: 0 }}>
                                    {TIERS[activeTier].name} Benefits
                                </h3>
                                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                                    {TIERS[activeTier].minOrders === 0 ? 'Starting tier' : `Unlock at ${TIERS[activeTier].minOrders} orders`}
                                </span>
                            </div>
                        </div>
                        <div style={{ padding: isMobile ? '16px 16px' : '24px 32px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 10 }}>
                            {TIERS[activeTier].benefits.map(b => (
                                <div key={b} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '12px 16px', borderRadius: 14,
                                    background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                }}>
                                    <span style={{ color: TIERS[activeTier].color, fontWeight: 800, fontSize: 14 }}>✦</span>
                                    <span style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{b}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════ REWARDS CATALOG ═══════════ */}
                <section style={{ marginBottom: isMobile ? 40 : 56 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, letterSpacing: '-0.03em', marginBottom: 8, textAlign: 'center' }}>
                        Rewards Catalog
                    </h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, textAlign: 'center', marginBottom: isMobile ? 20 : 32 }}>Redeem your points for exclusive perks</p>

                    {/* Category filter */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: isMobile ? 20 : 32 }}>
                        {[
                            { id: 'all', label: 'All Rewards', icon: '✨' },
                            { id: 'food', label: 'Food & Drink', icon: '🍴' },
                            { id: 'credit', label: 'Credits', icon: '💵' },
                            { id: 'boost', label: 'Boosts', icon: '⚡' },
                            { id: 'experience', label: 'Experiences', icon: '🥂' },
                            { id: 'premium', label: 'Premium', icon: '👑' },
                        ].map(cat => (
                            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} style={{
                                padding: '8px 18px', borderRadius: 100, border: 'none',
                                background: selectedCategory === cat.id ? (isDark ? '#fafafa' : '#09090b') : theme.bgInput,
                                color: selectedCategory === cat.id ? (isDark ? '#09090b' : '#fff') : theme.textMuted,
                                fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                            }}>
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Rewards grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 16 }}>
                        {filteredRewards.map(reward => (
                            <RewardCard key={reward.points} reward={reward} theme={theme} isMobile={isMobile} isDark={isDark} userPoints={MEMBER.points} />
                        ))}
                    </div>
                </section>

                {/* ═══════════ TWO COLUMN: Activity + How It Works ═══════════ */}
                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: 20, marginBottom: isMobile ? 40 : 56,
                }}>
                    {/* Recent Activity */}
                    <div style={{
                        background: theme.bgCard, borderRadius: 24, padding: isMobile ? 20 : 28,
                        border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow,
                    }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 20 }}>📋 Recent Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {RECENT_ACTIVITY.map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: '12px 14px', borderRadius: 14,
                                    background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: 10,
                                            background: item.type === 'earned' ? 'rgba(34,197,94,0.1)' : item.type === 'bonus' ? 'rgba(234,179,8,0.1)' : 'rgba(239,68,68,0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                                        }}>
                                            {item.type === 'earned' ? '📈' : item.type === 'bonus' ? '🔥' : '🎁'}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{item.label}</div>
                                            <div style={{ fontSize: 11, color: theme.textFaint }}>{item.date}</div>
                                        </div>
                                    </div>
                                    <span style={{
                                        fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums',
                                        color: item.points > 0 ? '#22c55e' : '#ef4444',
                                    }}>
                                        {item.points > 0 ? '+' : ''}{item.points} pts
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How Points Work */}
                    <div style={{
                        background: theme.bgCard, borderRadius: 24, padding: isMobile ? 20 : 28,
                        border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow,
                    }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 20 }}>✨ How Points Work</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {[
                                { step: '1', icon: '🛒', title: 'Order', desc: 'Place orders through Soobér from any restaurant or market vendor.' },
                                { step: '2', icon: '⭐', title: 'Earn', desc: 'Points accumulate automatically — higher tiers earn faster.' },
                                { step: '3', icon: '🎁', title: 'Redeem', desc: 'Exchange points for rewards right from your account.' },
                                { step: '4', icon: '📈', title: 'Level Up', desc: 'The more you order, the higher your tier and multiplier.' },
                            ].map(s => (
                                <div key={s.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                                        background: theme.accentBg, border: `1px solid ${theme.accent}30`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                                    }}>{s.icon}</div>
                                    <div>
                                        <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3 }}>{s.title}</h4>
                                        <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Multiplier table */}
                        <div style={{ marginTop: 24, background: theme.bgInput, borderRadius: 16, padding: '16px 18px' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Points Multiplier</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                                {TIERS.map(t => (
                                    <div key={t.name} style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: 14 }}>{t.emoji}</div>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: t.color, fontFamily: "'DM Sans', sans-serif" }}>{t.pointsMultiplier}</div>
                                        <div style={{ fontSize: 10, color: theme.textFaint }}>{t.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════ CTA BANNER ═══════════ */}
                <div style={{
                    background: currentTierData.gradient,
                    borderRadius: 28, padding: isMobile ? '28px 20px' : '40px 44px',
                    display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                    justifyContent: 'space-between', gap: 20,
                    flexDirection: isMobile ? 'column' : 'row',
                }}>
                    <div>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#fff', margin: 0, marginBottom: 8, letterSpacing: '-0.02em' }}>
                            {ordersToNext > 0 ? `${ordersToNext} orders until ${nextTierData.name}` : "You've reached the top!"}
                        </h3>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                            {ordersToNext > 0
                                ? `Unlock ${nextTierData.pointsMultiplier} points and exclusive ${nextTierData.name} perks.`
                                : 'Enjoy all the perks of Diamond status. You deserve it.'
                            }
                        </p>
                    </div>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div style={{
                            padding: '14px 32px', borderRadius: 14,
                            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.25)',
                            color: '#fff', fontSize: 15, fontWeight: 700,
                            fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap',
                            cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                            Order Now →
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ── Reward Card ────────────────────────────────────────────────────────────
function RewardCard({ reward, theme, isMobile, isDark, userPoints }) {
    const [hovered, setHovered] = useState(false);
    const canRedeem = userPoints >= reward.points;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? theme.bgCardHover : theme.bgCard,
                border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                borderRadius: 22, padding: isMobile ? 20 : 24,
                cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered ? theme.shadowMd : theme.shadow,
                position: 'relative', overflow: 'hidden',
            }}
        >
            {/* Glow on hover */}
            {hovered && (
                <div style={{
                    position: 'absolute', top: -20, right: -20, width: 80, height: 80,
                    background: `radial-gradient(circle, ${canRedeem ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.1)'} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                }} />
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, position: 'relative' }}>
                <span style={{ fontSize: 32 }}>{reward.icon}</span>
                <span style={{
                    fontSize: 11, fontWeight: 700,
                    color: canRedeem ? '#22c55e' : theme.accent,
                    background: canRedeem ? 'rgba(34,197,94,0.1)' : theme.accentBg,
                    padding: '4px 12px', borderRadius: 8,
                    letterSpacing: '0.04em',
                }}>{reward.points.toLocaleString()} pts</span>
            </div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 4 }}>{reward.name}</h3>
            <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, marginBottom: canRedeem ? 14 : 0 }}>{reward.desc}</p>

            {canRedeem && (
                <button style={{
                    width: '100%', padding: '10px 0', borderRadius: 12, border: 'none',
                    background: isDark ? '#22c55e' : '#16a34a', color: '#fff',
                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                }}>
                    Redeem Now
                </button>
            )}
        </div>
    );
}
