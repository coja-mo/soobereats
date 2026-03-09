"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';

const tiers = [
    {
        name: 'Bronze', emoji: '🥉', minOrders: 0, color: '#cd7f32', gradient: 'linear-gradient(135deg, #cd7f32, #a0522d)',
        benefits: ['Earn 1 point per $1 spent', 'Birthday surprise on your special day', 'Access to seasonal promotions'],
        description: 'Welcome to SOOber Eats! Every order earns you points toward delicious rewards.',
    },
    {
        name: 'Silver', emoji: '🥈', minOrders: 15, color: '#a8a9ad', gradient: 'linear-gradient(135deg, #a8a9ad, #71797E)',
        benefits: ['Earn 1.5x points per $1', 'Free delivery on orders over $40', 'Priority customer support', 'Early access to new restaurants'],
        description: 'You\'re a regular! Enjoy upgraded perks and faster support.',
    },
    {
        name: 'Gold', emoji: '🥇', minOrders: 40, color: '#eab308', gradient: 'linear-gradient(135deg, #eab308, #ca8a04)',
        benefits: ['Earn 2x points per $1', 'Free delivery on all orders', 'Exclusive Gold-only promotions', 'Monthly treat on us', 'Priority order processing'],
        description: 'The Soo\'s most dedicated food lovers. Premium perks, always.',
    },
    {
        name: 'Diamond', emoji: '💎', minOrders: 100, color: '#60a5fa', gradient: 'linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6)',
        benefits: ['Earn 3x points per $1', 'Waived delivery fees for life', 'Personal account concierge', 'First access to new features', 'Exclusive Diamond events', 'Annual appreciation gift', 'VIP restaurant reservations'],
        description: 'Legendary status. You are SOOber Eats royalty.',
    },
];

const rewards = [
    { points: 100, name: 'Free Drink', icon: '🥤', desc: 'Any beverage with your next order' },
    { points: 250, name: '$5 Credit', icon: '💵', desc: 'Applied to any order' },
    { points: 500, name: 'Free Appetizer', icon: '🍟', desc: 'At participating restaurants' },
    { points: 1000, name: 'Free Meal', icon: '🍽️', desc: 'Up to $25 value, on us' },
    { points: 2500, name: 'Private Tasting', icon: '🥂', desc: 'Exclusive chef\'s table experience' },
    { points: 5000, name: 'Annual VIP Pass', icon: '👑', desc: 'Free delivery for 1 year + monthly credits' },
];

export default function RewardsPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeTier, setActiveTier] = useState(2); // Gold selected by default

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* Hero */}
            <section style={{
                padding: isMobile ? '60px 0 48px' : '80px 0 64px',
                background: theme.mode === 'dark'
                    ? 'linear-gradient(160deg, #09090b 0%, #1a1520 30%, #09090b 100%)'
                    : 'linear-gradient(160deg, #1c1917 0%, #292524 50%, #1c1917 100%)',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-20%', right: '30%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#eab308', marginBottom: 24,
                    }}>🏆 Soober Rewards</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 34 : 52, fontWeight: 700,
                        letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16,
                    }}>
                        Every order{' '}
                        <span style={{ background: 'linear-gradient(135deg, #eab308, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>earns you more</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
                        Our loyalty program rewards you for supporting local. Earn points, unlock tiers, and redeem exclusive rewards — all while keeping your dollars in the Soo.
                    </p>
                </div>
            </section>

            {/* Tier Selector */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad }}>
                <div style={{ paddingTop: isMobile ? 32 : 56, marginBottom: isMobile ? 32 : 48 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, letterSpacing: '-0.03em', marginBottom: 24, textAlign: 'center' }}>Loyalty Tiers</h2>

                    {/* Tier tabs */}
                    <div style={{
                        display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: isMobile ? 24 : 40,
                    }}>
                        {tiers.map((tier, i) => (
                            <button key={tier.name} onClick={() => setActiveTier(i)} style={{
                                padding: isMobile ? '10px 16px' : '12px 24px', borderRadius: 100,
                                border: `2px solid ${activeTier === i ? tier.color : theme.borderSubtle}`,
                                background: activeTier === i ? `${tier.color}18` : 'transparent',
                                color: activeTier === i ? tier.color : theme.textMuted,
                                fontSize: isMobile ? 13 : 14, fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.25s ease', fontFamily: "'DM Sans', sans-serif",
                            }}>
                                {tier.emoji} {tier.name}
                            </button>
                        ))}
                    </div>

                    {/* Active tier detail */}
                    {(() => {
                        const tier = tiers[activeTier];
                        return (
                            <div style={{
                                background: theme.mode === 'dark' ? 'rgba(24,24,27,0.5)' : 'rgba(255,255,255,0.6)',
                                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                                border: `1px solid ${tier.color}30`,
                                borderRadius: 28, overflow: 'hidden',
                            }}>
                                {/* Tier header */}
                                <div style={{
                                    background: tier.gradient, padding: isMobile ? '28px 20px' : '40px 40px',
                                    display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                                    gap: isMobile ? 16 : 24, flexDirection: isMobile ? 'column' : 'row',
                                }}>
                                    <div style={{
                                        width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, borderRadius: isMobile ? 20 : 24,
                                        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: isMobile ? 32 : 40, flexShrink: 0,
                                    }}>{tier.emoji}</div>
                                    <div>
                                        <h3 style={{
                                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 26 : 34, fontWeight: 700,
                                            color: '#fff', margin: 0, marginBottom: 6, letterSpacing: '-0.02em',
                                        }}>{tier.name}</h3>
                                        <p style={{ fontSize: isMobile ? 13 : 15, color: 'rgba(255,255,255,0.75)', margin: 0, marginBottom: 6 }}>{tier.description}</p>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)' }}>
                                            {tier.minOrders === 0 ? 'Starting tier' : `Unlock at ${tier.minOrders} orders`}
                                        </span>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div style={{ padding: isMobile ? '24px 20px' : '36px 40px' }}>
                                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 20, letterSpacing: '-0.01em' }}>Benefits</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
                                        {tier.benefits.map(benefit => (
                                            <div key={benefit} style={{
                                                display: 'flex', alignItems: 'center', gap: 12,
                                                padding: '14px 18px', borderRadius: 16,
                                                background: theme.bgInput, border: `1px solid ${theme.borderLight}`,
                                            }}>
                                                <span style={{ color: tier.color, fontSize: 16, fontWeight: 700, flexShrink: 0 }}>✦</span>
                                                <span style={{ fontSize: 14, color: theme.text, fontWeight: 500 }}>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Rewards Catalog */}
                <div style={{ paddingBottom: isMobile ? 32 : 56 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, letterSpacing: '-0.03em', marginBottom: 8, textAlign: 'center' }}>Rewards Catalog</h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, textAlign: 'center', marginBottom: isMobile ? 24 : 40 }}>Redeem your points for exclusive perks</p>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 16 }}>
                        {rewards.map(reward => (
                            <RewardCard key={reward.points} reward={reward} theme={theme} isMobile={isMobile} />
                        ))}
                    </div>
                </div>

                {/* How it works */}
                <div style={{
                    padding: isMobile ? '28px 20px' : '40px 40px', borderRadius: 28,
                    background: theme.accentBg, border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.12)' : 'rgba(234,179,8,0.18)'}`,
                    textAlign: 'center',
                }}>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 20 }}>How Points Work</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 32 }}>
                        {[
                            { step: '1', title: 'Order', desc: 'Place any order through SOOber Eats' },
                            { step: '2', title: 'Earn', desc: 'Points accumulate automatically with each order' },
                            { step: '3', title: 'Redeem', desc: 'Exchange points for rewards in your account' },
                        ].map(s => (
                            <div key={s.step}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 12, background: theme.accent,
                                    color: '#09090b', fontWeight: 800, fontSize: 18, fontFamily: "'DM Sans', sans-serif",
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: isMobile ? '0 auto 10px' : '0 auto 10px',
                                }}>{s.step}</div>
                                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, marginBottom: 4 }}>{s.title}</h4>
                                <p style={{ fontSize: 13, color: theme.textMuted, margin: 0 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function RewardCard({ reward, theme, isMobile }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: hovered ? theme.bgCardHover : theme.bgCard,
                border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                borderRadius: 22, padding: isMobile ? 20 : 24,
                cursor: 'pointer', transition: 'all 0.3s ease',
                transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered ? theme.shadowMd : theme.shadow,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ fontSize: 32 }}>{reward.icon}</span>
                <span style={{
                    fontSize: 11, fontWeight: 700, color: theme.accent,
                    background: theme.accentBg, padding: '4px 10px', borderRadius: 8,
                    letterSpacing: '0.04em',
                }}>{reward.points.toLocaleString()} pts</span>
            </div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 4 }}>{reward.name}</h3>
            <p style={{ fontSize: 13, color: theme.textMuted, margin: 0 }}>{reward.desc}</p>
        </div>
    );
}
