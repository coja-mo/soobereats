"use client";

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

// ── Referral Pipeline ──────────────────────────────────────────────────────
const REFERRAL_PIPELINE = [
    { name: 'Sarah M.', status: 'completed', date: 'Mar 7', earned: 10, emoji: '👩‍💻' },
    { name: 'Jake R.', status: 'completed', date: 'Mar 4', earned: 10, emoji: '👨‍🎤' },
    { name: 'Emma L.', status: 'pending', date: 'Mar 8', earned: 0, emoji: '👩‍🎓' },
];

const LEADERBOARD = [
    { rank: 1, name: 'Alex K.', referrals: 24, earned: 240, badge: '🥇' },
    { rank: 2, name: 'Priya S.', referrals: 18, earned: 180, badge: '🥈' },
    { rank: 3, name: 'Marcus T.', referrals: 15, earned: 150, badge: '🥉' },
    { rank: 4, name: 'You', referrals: 3, earned: 20, badge: '🔥', isYou: true },
    { rank: 5, name: 'Jordan W.', referrals: 2, earned: 20, badge: '' },
];

// ── Floating Coins ─────────────────────────────────────────────────────────
function FloatingCoins({ active }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 120;

        const coins = Array.from({ length: 12 }, () => ({
            x: 50 + Math.random() * 200,
            y: 120 + Math.random() * 40,
            vx: (Math.random() - 0.5) * 2,
            vy: -(3 + Math.random() * 4),
            size: 8 + Math.random() * 8,
            rot: Math.random() * 360,
            rotV: (Math.random() - 0.5) * 10,
            opacity: 1,
        }));

        let raf;
        const animate = () => {
            ctx.clearRect(0, 0, 300, 120);
            let alive = false;
            coins.forEach(c => {
                c.x += c.vx;
                c.y += c.vy;
                c.vy += 0.12;
                c.rot += c.rotV;
                c.opacity -= 0.015;
                if (c.opacity <= 0) return;
                alive = true;
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate((c.rot * Math.PI) / 180);
                ctx.globalAlpha = c.opacity;
                ctx.beginPath();
                ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2);
                ctx.fillStyle = '#eab308';
                ctx.fill();
                ctx.strokeStyle = '#d4a843';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.fillStyle = '#d4a843';
                ctx.font = `bold ${c.size * 0.5}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('$', 0, 0);
                ctx.restore();
            });
            if (alive) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [active]);

    if (!active) return null;
    return <canvas ref={canvasRef} style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 10 }} />;
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function ReferPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showCoins, setShowCoins] = useState(false);

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
        setShowCoins(true);
        setTimeout(() => setCopied(false), 2000);
        setTimeout(() => setShowCoins(false), 2000);
    };

    const pad = isMobile ? '0 16px' : '0 40px';
    const cardStyle = {
        background: theme.bgCard, border: `1px solid ${theme.borderLight}`,
        borderRadius: 22, padding: isMobile ? 20 : 28, boxShadow: theme.shadow,
    };

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100 }}>

            {/* ─── Hero ────────────────────────────────────────────────── */}
            <section style={{
                padding: isMobile ? '60px 0 48px' : '80px 0 64px',
                background: isDark
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
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 34 : 56,
                        fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 16,
                    }}>
                        Share the Soo.{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #eab308, #f59e0b)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Earn $10.</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
                        When your friend places their first order, you both get $10 in Soobér credits. It&apos;s that simple.
                    </p>
                </div>
            </section>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: pad }}>

                {/* ─── Referral Code Card ──────────────────────────────── */}
                <div style={{
                    marginTop: isMobile ? -32 : -40, position: 'relative', zIndex: 20,
                    ...cardStyle, textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                }}>
                    <FloatingCoins active={showCoins} />
                    <p style={{ fontSize: 14, fontWeight: 600, color: theme.textMuted, marginBottom: 16 }}>Your referral code</p>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 14,
                        padding: '16px 28px', borderRadius: 18,
                        background: theme.accentBg, border: `2px dashed ${theme.accent}`,
                    }}>
                        <span style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36,
                            fontWeight: 800, color: theme.accent, letterSpacing: '0.06em',
                        }}>{referralCode}</span>
                        <button onClick={handleCopy} style={{
                            padding: '10px 22px', borderRadius: 12, border: 'none',
                            background: copied ? '#22c55e' : theme.accent,
                            color: copied ? '#fff' : '#09090b',
                            fontSize: 14, fontWeight: 700, cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            transform: copied ? 'scale(1.05)' : 'scale(1)',
                        }}>{copied ? '✓ Copied!' : 'Copy'}</button>
                    </div>

                    {/* Share Buttons */}
                    <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                        {[
                            { label: 'Text', icon: '💬', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
                            { label: 'WhatsApp', icon: '📱', color: '#25D366', bg: 'rgba(37,211,102,0.1)' },
                            { label: 'Email', icon: '✉️', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
                            { label: 'X', icon: '𝕏', color: theme.text, bg: theme.bgInput },
                        ].map(s => (
                            <button key={s.label}
                                onClick={() => { /* sharing stub */ }}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '10px 18px', borderRadius: 12,
                                    border: `1px solid ${theme.border}`,
                                    background: s.bg, color: s.color,
                                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                    fontFamily: "'DM Sans', sans-serif",
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <span style={{ fontSize: 16 }}>{s.icon}</span>
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ─── How It Works ────────────────────────────────────── */}
                <div style={{ paddingTop: isMobile ? 40 : 56, marginBottom: isMobile ? 40 : 56 }}>
                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 30,
                        fontWeight: 800, color: theme.text, letterSpacing: '-0.02em',
                        marginBottom: 28, textAlign: 'center',
                    }}>How It Works</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
                        {[
                            { step: '1', icon: '📤', title: 'Share Your Code', desc: 'Send your unique referral code to friends, family, or neighbours.', color: '#eab308' },
                            { step: '2', icon: '🍔', title: 'They Order', desc: 'Your friend enters the code at checkout on their first Soobér order.', color: '#0066FF' },
                            { step: '3', icon: '💰', title: 'You Both Earn', desc: '$10 credit lands in both accounts instantly. No minimums.', color: '#22c55e' },
                        ].map(s => (
                            <div key={s.step} style={{
                                ...cardStyle, textAlign: 'center', position: 'relative', overflow: 'hidden',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = theme.shadowMd; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; }}
                            >
                                <div style={{
                                    position: 'absolute', top: -20, right: -20,
                                    width: 80, height: 80, borderRadius: '50%',
                                    background: `radial-gradient(circle, ${s.color}15, transparent)`,
                                }} />
                                <div style={{
                                    width: 52, height: 52, borderRadius: 18,
                                    background: `${s.color}12`, margin: '0 auto 16px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 24,
                                }}>{s.icon}</div>
                                <div style={{
                                    fontSize: 11, fontWeight: 800, color: s.color,
                                    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
                                }}>Step {s.step}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 6 }}>{s.title}</h3>
                                <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Stats & Pipeline ────────────────────────────────── */}
                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? 16 : 24, marginBottom: isMobile ? 40 : 56,
                }}>
                    {/* Your Stats */}
                    <div style={cardStyle}>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: 17,
                            fontWeight: 700, color: theme.text, marginBottom: 16, margin: 0,
                        }}>Your Referral Stats</h3>
                        <div style={{
                            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 10, marginTop: 16,
                        }}>
                            {[
                                { value: '3', label: 'Invited', emoji: '👥', color: '#3b82f6' },
                                { value: '2', label: 'Converted', emoji: '✅', color: '#22c55e' },
                                { value: '$20', label: 'Earned', emoji: '💵', color: '#eab308' },
                                { value: '$10', label: 'Pending', emoji: '⏳', color: '#f59e0b' },
                            ].map(s => (
                                <div key={s.label} style={{
                                    background: `${s.color}08`, border: `1px solid ${s.color}20`,
                                    borderRadius: 16, padding: 14, textAlign: 'center',
                                }}>
                                    <span style={{ fontSize: 20 }}>{s.emoji}</span>
                                    <div style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 24,
                                        fontWeight: 800, color: theme.text,
                                    }}>{s.value}</div>
                                    <div style={{ fontSize: 11, color: theme.textFaint, fontWeight: 600 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Referral Pipeline */}
                    <div style={cardStyle}>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: 17,
                            fontWeight: 700, color: theme.text, margin: 0, marginBottom: 16,
                        }}>Referral Pipeline</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {REFERRAL_PIPELINE.map((r, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 0',
                                    borderBottom: i < REFERRAL_PIPELINE.length - 1 ? `1px solid ${theme.borderLight}` : 'none',
                                }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 12,
                                        background: theme.bgInput, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', fontSize: 18,
                                    }}>{r.emoji}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{r.name}</div>
                                        <div style={{ fontSize: 12, color: theme.textFaint }}>{r.date}</div>
                                    </div>
                                    {r.status === 'completed' ? (
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, color: '#22c55e',
                                            background: 'rgba(34,197,94,0.1)', padding: '4px 10px',
                                            borderRadius: 8,
                                        }}>+${r.earned} earned</span>
                                    ) : (
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, color: '#f59e0b',
                                            background: 'rgba(245,158,11,0.1)', padding: '4px 10px',
                                            borderRadius: 8,
                                        }}>Pending</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── Leaderboard ─────────────────────────────────────── */}
                <div style={{ ...cardStyle, marginBottom: isMobile ? 40 : 56 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <span style={{ fontSize: 24 }}>🏆</span>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                            fontWeight: 700, color: theme.text, margin: 0,
                        }}>Referral Leaderboard</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {LEADERBOARD.map((entry, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '14px 12px',
                                borderRadius: 14,
                                background: entry.isYou
                                    ? (isDark ? 'rgba(234,179,8,0.06)' : 'rgba(234,179,8,0.04)')
                                    : 'transparent',
                                border: entry.isYou ? '1px solid rgba(234,179,8,0.2)' : '1px solid transparent',
                                marginBottom: i < LEADERBOARD.length - 1 ? 4 : 0,
                            }}>
                                <span style={{
                                    fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                                    fontWeight: 800, color: theme.textFaint, width: 24, textAlign: 'center',
                                }}>{entry.badge || `#${entry.rank}`}</span>
                                <div style={{ flex: 1 }}>
                                    <span style={{
                                        fontSize: 14, fontWeight: entry.isYou ? 800 : 600,
                                        color: entry.isYou ? '#eab308' : theme.text,
                                    }}>{entry.name}</span>
                                </div>
                                <span style={{ fontSize: 13, color: theme.textMuted, fontWeight: 600 }}>
                                    {entry.referrals} referrals
                                </span>
                                <span style={{
                                    fontSize: 13, fontWeight: 700, color: '#22c55e',
                                    fontFamily: "'DM Sans', sans-serif",
                                }}>${entry.earned}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Fine Print ──────────────────────────────────────── */}
                <div style={{
                    padding: isMobile ? 20 : 28, borderRadius: 20,
                    background: theme.bgInput, border: `1px solid ${theme.borderLight}`,
                }}>
                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Referral Program Details</h4>
                    <ul style={{ paddingLeft: 20, margin: 0 }}>
                        {[
                            'Both you and your friend receive $10 in Soobér credits.',
                            'Your friend must be a new Soobér user.',
                            'Credits are applied after the first completed order.',
                            'There is no limit to how many friends you can refer.',
                            'Credits expire after 90 days if unused.',
                            'Soobér reserves the right to modify this program at any time.',
                        ].map((item, i) => (
                            <li key={i} style={{ fontSize: 13, color: theme.textSecondary, lineHeight: 1.7, marginBottom: 4 }}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
}
