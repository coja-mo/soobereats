"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const FEATURES = [
    { icon: '📍', title: 'Live GPS Tracking', desc: 'Watch your order or ride move in real-time on an interactive map' },
    { icon: '🤖', title: 'AI Copilot', desc: 'Instant answers from our AI, available 24/7 on every screen' },
    { icon: '🔔', title: 'Smart Notifications', desc: 'Real-time push notifications for every order and ride status update' },
    { icon: '💳', title: 'Apple Pay & Google Pay', desc: 'One-tap checkout with your preferred payment method' },
    { icon: '🏆', title: 'Loyalty Rewards', desc: 'Earn points on every order, unlock tiers, get exclusive perks' },
    { icon: '🛴', title: 'E-Scooter Unlock', desc: 'Scan and ride boardwalk electric scooters straight from the app' },
    { icon: '🔐', title: 'Face ID & Touch ID', desc: 'Secure biometric login powered by your device' },
    { icon: '♿', title: 'Accessibility First', desc: 'VoiceOver and TalkBack optimized for everyone' },
];

const SCREENS = ['🍕 Food Ordering', '🚗 Ride Booking', '🗺️ Live Tracking', '🏆 Rewards'];

export default function AppPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeScreen, setActiveScreen] = useState(0);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Auto rotate screens
    useEffect(() => {
        const timer = setInterval(() => setActiveScreen(p => (p + 1) % SCREENS.length), 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{
                position: 'relative', overflow: 'hidden', textAlign: 'center',
                padding: isMobile ? '60px 16px 48px' : '80px 40px 64px',
            }}>
                <div style={{
                    position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
                    width: 900, height: 900, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, rgba(234,179,8,0.04) 40%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(60px)',
                }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)',
                        borderRadius: 100, padding: '8px 20px', marginBottom: 24,
                    }}>
                        <span style={{ fontSize: 14 }}>📱</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Coming Soon</span>
                    </div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                        fontSize: isMobile ? 36 : 60, letterSpacing: '-0.04em',
                        lineHeight: 1.05, color: theme.text, margin: '0 0 16px',
                    }}>
                        The Soobér App.{' '}
                        <span style={{ background: 'linear-gradient(135deg, #eab308, #f59e0b, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Everything Local.
                        </span>
                    </h1>

                    <p style={{
                        fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted,
                        maxWidth: 500, margin: '0 auto 32px',
                    }}>
                        Food delivery, rides, e-scooters, rewards, and community — all in one beautifully crafted app. Coming to iOS and Android.
                    </p>

                    {/* App Store Buttons */}
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '14px 28px', borderRadius: 14,
                            background: isDark ? '#fff' : '#000', border: 'none', cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <svg width="20" height="24" viewBox="0 0 24 24" fill={isDark ? '#000' : '#fff'}>
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: 9, color: isDark ? '#666' : '#aaa', fontWeight: 600 }}>Download on the</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: isDark ? '#000' : '#fff', fontFamily: "'DM Sans', sans-serif" }}>App Store</div>
                            </div>
                        </button>

                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '14px 28px', borderRadius: 14,
                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${theme.borderSubtle}`, cursor: 'pointer',
                            transition: 'transform 0.2s',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <svg width="20" height="22" viewBox="0 0 24 24">
                                <path d="M3 20.5v-17c0-.83.5-1.58 1.27-1.89l.03-.01L16.55 12 4.3 22.39c-.77-.31-1.3-1.06-1.3-1.89z" fill="#4285F4" />
                                <path d="M20.05 12c0 .37-.14.72-.36.96l-3.14 2.45L13.08 12l3.47-3.41 3.14 2.45c.22.24.36.59.36.96z" fill="#EA4335" />
                                <path d="M16.55 15.41l-3.47-3.41L4.3 22.39c.26.13.55.11.83.11l11.42-7.09z" fill="#34A853" />
                                <path d="M4.3 1.61L13.08 12l3.47-3.41L5.13 1.5c-.28 0-.57-.02-.83.11z" fill="#FBBC05" />
                            </svg>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: 9, color: theme.textFaint, fontWeight: 600 }}>Get it on</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>Google Play</div>
                            </div>
                        </button>
                    </div>

                    {/* Phone mockup area */}
                    <div style={{
                        width: isMobile ? 200 : 260, height: isMobile ? 400 : 520,
                        margin: '0 auto', borderRadius: 36,
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        border: `2px solid ${theme.borderSubtle}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', position: 'relative', overflow: 'hidden',
                    }}>
                        {/* Notch */}
                        <div style={{
                            position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
                            width: 80, height: 22, borderRadius: 100,
                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        }} />

                        <div style={{ fontSize: 48, marginBottom: 16 }}>🔱</div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: theme.text, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.02em' }}>Soobér</div>

                        {/* Simulated screen content */}
                        <div style={{ marginTop: 20, display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', padding: '0 16px' }}>
                            {SCREENS.map((s, i) => (
                                <div key={i} style={{
                                    padding: '6px 10px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                                    background: i === activeScreen ? 'rgba(234,179,8,0.15)' : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'),
                                    color: i === activeScreen ? '#eab308' : theme.textFaint,
                                    border: i === activeScreen ? '1px solid rgba(234,179,8,0.3)' : `1px solid transparent`,
                                    transition: 'all 0.3s',
                                }}>
                                    {s}
                                </div>
                            ))}
                        </div>

                        {/* Home indicator */}
                        <div style={{
                            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
                            width: 100, height: 4, borderRadius: 100,
                            background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                        }} />
                    </div>
                </div>
            </section>

            {/* ═══ Feature Grid ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1000, margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 24 : 32, letterSpacing: '-0.03em',
                    color: theme.text, margin: '0 0 28px', textAlign: 'center',
                }}>
                    Everything You Need, One Tap Away
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
                    {FEATURES.map((f, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 18, padding: 18, display: 'flex', gap: 12,
                            transition: 'all 0.2s',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(234,179,8,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                            <div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 4px' }}>{f.title}</h3>
                                <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Early Access CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <div style={{
                    background: isDark ? 'rgba(234,179,8,0.04)' : 'rgba(234,179,8,0.03)',
                    border: '1px solid rgba(234,179,8,0.15)', borderRadius: 28,
                    padding: isMobile ? '28px 20px' : '40px',
                }}>
                    <span style={{ fontSize: 36, display: 'block', marginBottom: 12 }}>🚀</span>
                    <h3 style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                        fontSize: isMobile ? 20 : 24, color: theme.text, margin: '0 0 8px',
                    }}>
                        Get Early Access
                    </h3>
                    <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 0 20px' }}>
                        Be the first to try the Soobér app when it launches. Enter your email for early access.
                    </p>
                    <div style={{ display: 'flex', gap: 8, maxWidth: 360, margin: '0 auto' }}>
                        <input type="email" placeholder="your@email.com" style={{
                            flex: 1, padding: '12px 16px', borderRadius: 12,
                            border: `1px solid ${theme.borderSubtle}`,
                            background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                            color: theme.text, fontSize: 14, outline: 'none',
                        }} />
                        <button style={{
                            padding: '12px 20px', borderRadius: 12, border: 'none',
                            background: 'linear-gradient(135deg, #eab308, #ca8a04)',
                            color: '#000', fontWeight: 700, fontSize: 14, cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                        }}>
                            Notify Me
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
