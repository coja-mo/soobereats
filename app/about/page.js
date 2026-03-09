"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

// ── Animated Counter ───────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix = '', prefix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const target = typeof value === 'number' ? value : parseInt(value, 10) || 0;
                const startTime = Date.now();
                const tick = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    setCount(Math.round(target * eased));
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            }
        }, { threshold: 0.3 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, duration]);

    return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

// ── Timeline ───────────────────────────────────────────────────────────────
const MILESTONES = [
    { year: '2024', title: 'The Idea', desc: 'Fed up with 30% commissions going to Silicon Valley, we decided to build a platform for the Soo.', icon: '💡' },
    { year: '2024', title: 'First Lines of Code', desc: 'Development begins. Antigravity Solutions starts building the local delivery engine.', icon: '⌨️' },
    { year: '2025', title: 'Electric Fleet', desc: 'Partnered with BYD, Hyundai, and GMC for a 100% zero-emission delivery fleet.', icon: '⚡' },
    { year: '2025', title: 'Soo MRKT Launch', desc: 'Brought the Saturday Farmers Market online — Penokean Hills, Findlay\'s Mushrooms, Mountain Maple, and more.', icon: '🏪' },
    { year: '2026', title: 'SOOber Academy', desc: 'Launched the enterprise LMS — 20 courses, 7 role paths, and professional certifications.', icon: '🎓' },
    { year: '2026', title: 'Soobér Rebrand', desc: 'Evolved from "SOOber Eats" to "Soobér" — a premium, integrated mobility & commerce ecosystem.', icon: '✨' },
];

// ── Local Compute Node ─────────────────────────────────────────────────────
function ComputeNode({ node, theme, isDark, index }) {
    return (
        <div style={{
            background: isDark
                ? 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(17,17,19,0.9))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,250,250,0.8))',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${theme.borderSubtle}`,
            borderRadius: 22, padding: 24,
            position: 'relative', overflow: 'hidden',
            transition: 'all 0.3s',
        }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,102,255,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
            <div style={{
                position: 'absolute', top: -20, right: -20,
                width: 80, height: 80, borderRadius: '50%',
                background: `radial-gradient(circle, ${node.glowColor} 0%, transparent 70%)`,
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, position: 'relative' }}>
                <div style={{
                    width: 40, height: 40, borderRadius: 14,
                    background: `${node.color}15`, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{node.icon}</div>
                <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>{node.name}</div>
                    <div style={{ fontSize: 11, color: theme.textFaint }}>{node.role}</div>
                </div>
                <div style={{
                    marginLeft: 'auto',
                    width: 10, height: 10, borderRadius: '50%',
                    background: '#22c55e',
                    animation: 'blink 2s infinite',
                    boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                }} />
            </div>
            {/* Usage bar */}
            <div style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: theme.textFaint, marginBottom: 4 }}>
                    <span>CPU Usage</span><span>{node.cpu}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: theme.bgInput, overflow: 'hidden' }}>
                    <div style={{
                        height: '100%', borderRadius: 3,
                        width: `${node.cpu}%`,
                        background: `linear-gradient(90deg, ${node.color}, ${node.color}99)`,
                        transition: 'width 1s ease',
                    }} />
                </div>
            </div>
            <div style={{ fontSize: 11, color: theme.textFaint }}>
                {node.tasks.join(' · ')}
            </div>
        </div>
    );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function AboutPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const pad = isMobile ? '0 16px' : '0 40px';

    const computeNodes = [
        { name: 'Mac Studio Node 1', role: 'AI & Route ML', icon: '🧠', cpu: 42, color: '#a855f7', glowColor: 'rgba(168,85,247,0.15)', tasks: ['Support LLM', 'Route Optimization', 'NLP Pipeline'] },
        { name: 'Mac Studio Node 2', role: 'Data Residency', icon: '🔒', cpu: 28, color: '#0066FF', glowColor: 'rgba(0,102,255,0.15)', tasks: ['Customer DB', 'Order Analytics', 'Privacy Vault'] },
        { name: 'Mac Studio Node 3', role: 'Operations Core', icon: '⚡', cpu: 56, color: '#22c55e', glowColor: 'rgba(34,197,94,0.15)', tasks: ['Dispatch Engine', 'Fleet Telemetry', 'KDS Sync'] },
    ];

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100 }}>

            {/* ─── Hero ────────────────────────────────────────────────── */}
            <section style={{
                padding: isMobile ? '70px 0 60px' : '100px 0 80px',
                background: isDark ? '#09090b' : '#1c1917',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#10b981', marginBottom: 24,
                    }}>🌿 Our Story</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 36 : 60,
                        fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20,
                    }}>Born in the Soo.<br />Built for the Soo.</h1>

                    <p style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.6)', maxWidth: 580, margin: '0 auto', lineHeight: 1.7 }}>
                        We got tired of watching Silicon Valley apps extract 30% from our favourite local restaurants. So we built our own damn platform.
                    </p>
                </div>
            </section>

            {/* ─── Stats Bar ───────────────────────────────────────────── */}
            <section style={{
                background: isDark
                    ? 'linear-gradient(135deg, #111113, #18181b)'
                    : 'linear-gradient(135deg, #fff, #fafafa)',
                borderBottom: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{
                    maxWidth: 1100, margin: '0 auto', padding: isMobile ? '28px 16px' : '36px 40px',
                    display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? 16 : 32, textAlign: 'center',
                }}>
                    {[
                        { value: 90, suffix: '+', prefix: '', label: 'Local Restaurants', icon: '🍽️' },
                        { value: 36, suffix: '+', prefix: '', label: 'EV Fleet Size', icon: '⚡' },
                        { value: 0, suffix: '', prefix: '', label: 'Gas Vehicles', icon: '🚫' },
                        { value: 100, suffix: '%', prefix: '', label: 'Locally Owned', icon: '🇨🇦' },
                    ].map(stat => (
                        <div key={stat.label}>
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 4 }}>{stat.icon}</span>
                            <div style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 32 : 44,
                                fontWeight: 800, color: theme.text, letterSpacing: '-0.03em',
                            }}>
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                            </div>
                            <div style={{ fontSize: 13, color: theme.textMuted, fontWeight: 600 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── The Mission ─────────────────────────────────────────── */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad }}>
                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                        fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 24,
                    }}>The Mission</h2>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: theme.textMuted, lineHeight: 1.8, marginBottom: 24 }}>
                        Sault Ste. Marie has some of the best food in Northern Ontario. Aurora&apos;s legendary Italian. Uncle Gino&apos;s weekend buffets. Tandoori Gardan&apos;s butter chicken. The Saturday Farmers Market vendors who wake up at 4 AM to bring you the freshest produce in Algoma.
                    </p>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: theme.textMuted, lineHeight: 1.8, marginBottom: 24 }}>
                        But when Skip The Dishes and Uber Eats came to town, they didn&apos;t come to celebrate our food culture. They came to extract from it. Thirty cents of every dollar you spent on delivery went straight to San Francisco. Not to the cook who made your meal. Not to the driver who brought it to your door. To shareholders who&apos;ve never tasted a Soo pierogi.
                    </p>
                    <div style={{
                        padding: isMobile ? '24px 20px' : '32px 36px', borderRadius: 22,
                        background: isDark ? 'rgba(0,102,255,0.06)' : 'rgba(0,102,255,0.04)',
                        borderLeft: '4px solid #0066FF',
                    }}>
                        <p style={{ fontSize: isMobile ? 16 : 19, color: theme.text, lineHeight: 1.7, fontWeight: 600, margin: 0, fontStyle: 'italic' }}>
                            &ldquo;Soobér is different because it has to be. We&apos;re 100% locally owned. Our commission rates are half of what the nationals charge. And every dollar we earn stays right here in the Sault.&rdquo;
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Timeline ────────────────────────────────────────────── */}
            <section style={{
                padding: isMobile ? '48px 0' : '80px 0',
                background: isDark
                    ? 'linear-gradient(180deg, #09090b, #0f0f14, #09090b)'
                    : 'linear-gradient(180deg, #fafafa, #f0f0f5, #fafafa)',
                borderTop: `1px solid ${theme.borderSubtle}`,
                borderBottom: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad }}>
                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                        fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 40,
                        textAlign: 'center',
                    }}>Our Journey</h2>

                    <div style={{ position: 'relative' }}>
                        {/* Vertical line */}
                        <div style={{
                            position: 'absolute', left: isMobile ? 16 : 24,
                            top: 0, bottom: 0, width: 2,
                            background: `linear-gradient(180deg, #0066FF, ${theme.border})`,
                        }} />

                        {MILESTONES.map((m, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: isMobile ? 16 : 24,
                                marginBottom: i < MILESTONES.length - 1 ? 32 : 0,
                                position: 'relative',
                            }}>
                                {/* Dot */}
                                <div style={{
                                    width: isMobile ? 34 : 48, height: isMobile ? 34 : 48,
                                    borderRadius: '50%',
                                    background: theme.bgCard, border: `3px solid #0066FF`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: isMobile ? 16 : 20, flexShrink: 0,
                                    zIndex: 1, boxShadow: '0 4px 16px rgba(0,102,255,0.15)',
                                }}>{m.icon}</div>
                                <div style={{
                                    background: theme.bgCard, border: `1px solid ${theme.borderLight}`,
                                    borderRadius: 18, padding: isMobile ? 16 : 20,
                                    boxShadow: theme.shadow, flex: 1,
                                }}>
                                    <div style={{
                                        fontSize: 11, fontWeight: 700, color: '#0066FF',
                                        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4,
                                    }}>{m.year}</div>
                                    <h3 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                                        fontWeight: 700, color: theme.text, margin: 0, marginBottom: 4,
                                    }}>{m.title}</h3>
                                    <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, lineHeight: 1.5 }}>{m.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Electric Fleet ───────────────────────────────────────── */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 20px', borderRadius: 100,
                            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)',
                            fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 20,
                        }}>⚡ 100% Electric Fleet</div>

                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 44,
                            fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 16,
                        }}>Zero Emissions.<br />Zero Compromise.</h2>
                        <p style={{ fontSize: isMobile ? 15 : 17, color: theme.textMuted, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                            Every single delivery on Soobér is made by an electric vehicle. No gas. No tailpipe emissions. Just clean, quiet delivery.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
                        {[
                            { icon: '🔋', title: 'All-Electric', desc: 'Our entire fleet runs on electricity. EVs, e-bikes, and electric scooters — no exceptions.', color: '#22c55e' },
                            { icon: '🌲', title: 'Northern Ontario Clean', desc: "Ontario's grid is 94% emissions-free. When we charge, we charge clean.", color: '#10b981' },
                            { icon: '🤫', title: 'Quiet Neighbourhoods', desc: 'No diesel engines idling outside your house at 9 PM. Electric means quieter streets.', color: '#06b6d4' },
                        ].map(item => (
                            <div key={item.title} style={{
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                padding: isMobile ? 24 : 32, borderRadius: 24, boxShadow: theme.shadow,
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = theme.shadowMd; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; }}
                            >
                                <div style={{
                                    width: 52, height: 52, borderRadius: 18,
                                    background: `${item.color}15`, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: 28, marginBottom: 16,
                                }}>{item.icon}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Local Compute Infrastructure ─────────────────────────── */}
            <section style={{
                padding: isMobile ? '48px 0 64px' : '80px 0 100px',
                background: isDark
                    ? 'linear-gradient(180deg, #09090b, #0a0a14, #09090b)'
                    : 'linear-gradient(180deg, #fafafa, #f0f4ff, #fafafa)',
                borderTop: `1px solid ${theme.borderSubtle}`,
                borderBottom: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 20px', borderRadius: 100,
                            background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)',
                            fontSize: 13, fontWeight: 700, color: '#0066FF', marginBottom: 20,
                        }}>🔒 Local Compute</div>

                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                            fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 12,
                        }}>Keep Local Data LOCAL</h2>
                        <p style={{ fontSize: isMobile ? 14 : 16, color: theme.textMuted, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
                            Our AI, route optimization, and customer data run on dedicated Mac Studio nodes right here in the Sault. Zero cloud dependency. 100% data sovereignty.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 16 }}>
                        {computeNodes.map((node, i) => (
                            <ComputeNode key={i} node={node} theme={theme} isDark={isDark} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─────────────────────────────────────────────────── */}
            <section style={{ padding: isMobile ? '48px 0 80px' : '80px 0 100px', textAlign: 'center' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: pad }}>
                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                        fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 16,
                    }}>Join the Movement</h2>
                    <p style={{ fontSize: 16, color: theme.textMuted, marginBottom: 32 }}>
                        Whether you&apos;re hungry, a restaurant owner, or looking to drive — there&apos;s a place for you here.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/" style={{
                            display: 'inline-block', background: 'linear-gradient(135deg, #0066FF, #3b82f6)',
                            color: '#fff', padding: '16px 36px', borderRadius: 16,
                            fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                            textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,102,255,0.25)',
                        }}>Order Now</Link>
                        <Link href="/corporate" style={{
                            display: 'inline-block', background: 'transparent',
                            color: theme.text, padding: '16px 36px', borderRadius: 16,
                            fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                            textDecoration: 'none', border: `1.5px solid ${theme.border}`,
                        }}>Partner With Us</Link>
                        <Link href="/for-drivers" style={{
                            display: 'inline-block', background: 'transparent',
                            color: theme.text, padding: '16px 36px', borderRadius: 16,
                            fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                            textDecoration: 'none', border: `1.5px solid ${theme.border}`,
                        }}>Drive Electric</Link>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>

            <Footer />
        </div>
    );
}
