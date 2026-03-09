"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';

export default function ReferPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const referralCode = 'SOOCODY25';
    const handleCopy = () => {
        navigator.clipboard?.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* Hero */}
            <section style={{
                padding: isMobile ? '60px 0 48px' : '80px 0 64px',
                background: theme.mode === 'dark'
                    ? 'linear-gradient(160deg, #09090b 0%, #1a1208 40%, #09090b 100%)'
                    : 'linear-gradient(160deg, #1c1917 0%, #292524 50%, #1c1917 100%)',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-15%', left: '30%', width: 500, height: 400, background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-20%', right: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#eab308', marginBottom: 24,
                    }}>🎁 Refer & Earn</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 34 : 52, fontWeight: 700,
                        letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16,
                    }}>
                        Share the Soo.{' '}
                        <span style={{ background: 'linear-gradient(135deg, #eab308, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Earn $10.</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
                        When your friend places their first order, you both get $10 in Soobér credits. It&apos;s that simple.
                    </p>
                </div>
            </section>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: pad }}>

                {/* Referral Code Card */}
                <div style={{
                    marginTop: isMobile ? -32 : -40, position: 'relative', zIndex: 20,
                    background: theme.bgCard, borderRadius: 28,
                    border: `1px solid ${theme.border}`, padding: isMobile ? '28px 20px' : '40px 40px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)', textAlign: 'center',
                }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: theme.textMuted, marginBottom: 16 }}>Your referral code</p>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 14,
                        padding: '16px 28px', borderRadius: 18,
                        background: theme.accentBg, border: `2px dashed ${theme.accent}`,
                    }}>
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 800,
                            color: theme.accent, letterSpacing: '0.06em',
                        }}>{referralCode}</span>
                        <button onClick={handleCopy} style={{
                            padding: '10px 20px', borderRadius: 12, border: 'none',
                            background: copied ? '#22c55e' : theme.accent,
                            color: copied ? '#fff' : '#09090b',
                            fontSize: 14, fontWeight: 700, cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transform: copied ? 'scale(1.05)' : 'scale(1)',
                        }}>{copied ? '✓ Copied!' : 'Copy'}</button>
                    </div>
                    <p style={{ fontSize: 13, color: theme.textFaint, marginTop: 16, marginBottom: 0 }}>Share this code with friends. When they order, you both win.</p>
                </div>

                {/* How it works */}
                <div style={{ paddingTop: isMobile ? 40 : 56, marginBottom: isMobile ? 40 : 56 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 28, textAlign: 'center' }}>How It Works</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
                        {[
                            { step: '1', icon: '📤', title: 'Share Your Code', desc: 'Send your unique referral code to friends, family, or neighbours.' },
                            { step: '2', icon: '🍔', title: 'They Order', desc: 'Your friend enters the code at checkout on their first order.' },
                            { step: '3', icon: '💰', title: 'You Both Earn', desc: '$10 credit lands in both accounts instantly. No minimums.' },
                        ].map(s => (
                            <div key={s.step} style={{
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                borderRadius: 22, padding: isMobile ? 24 : 28, textAlign: 'center',
                                boxShadow: theme.shadow,
                            }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: 16,
                                    background: theme.accentBg, margin: '0 auto 16px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 24,
                                }}>{s.icon}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 6 }}>{s.title}</h3>
                                <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: 12, marginBottom: isMobile ? 40 : 56,
                }}>
                    {[
                        { value: '3', label: 'Friends Invited', emoji: '👥' },
                        { value: '2', label: 'Successful', emoji: '✅' },
                        { value: '$20', label: 'Credits Earned', emoji: '💵' },
                        { value: '$10', label: 'Pending', emoji: '⏳' },
                    ].map(stat => (
                        <div key={stat.label} style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 18, padding: isMobile ? 16 : 20, textAlign: 'center',
                            boxShadow: theme.shadow,
                        }}>
                            <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{stat.emoji}</span>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 26, fontWeight: 700, color: theme.text }}>{stat.value}</div>
                            <div style={{ fontSize: 12, color: theme.textFaint, marginTop: 2 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Fine print */}
                <div style={{
                    padding: isMobile ? 20 : 28, borderRadius: 20,
                    background: theme.bgInput, border: `1px solid ${theme.borderLight}`,
                }}>
                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Referral Program Details</h4>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                        {[
                            'Both you and your friend receive $10 in Soobér credits.',
                            'Your friend must be a new Soobér user.',
                            'Credits are applied after the referred friend completes their first order.',
                            'There is no limit to how many friends you can refer.',
                            'Credits expire after 90 days if unused.',
                            'Soobér reserves the right to modify or end this program at any time.',
                        ].map((item, i) => (
                            <li key={i} style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
