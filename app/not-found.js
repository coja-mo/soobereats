"use client";

import Link from 'next/link';
import { useTheme } from '../lib/ThemeContext';
import { useState, useEffect } from 'react';

export default function NotFound() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div style={{
            minHeight: 'calc(100vh - 72px)', background: theme.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '40px 20px' : '60px 40px',
        }}>
            <div style={{ textAlign: 'center', maxWidth: 500 }}>
                {/* Big 404 */}
                <div style={{
                    fontSize: isMobile ? 80 : 120, fontWeight: 900,
                    fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.06em',
                    background: 'linear-gradient(135deg, #eab308, #f59e0b, #fbbf24)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    lineHeight: 1, marginBottom: 16,
                }}>
                    404
                </div>

                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 22 : 28, color: theme.text,
                    letterSpacing: '-0.03em', margin: '0 0 12px',
                }}>
                    This page took a wrong turn
                </h1>

                <p style={{
                    fontSize: 15, color: theme.textMuted, lineHeight: 1.6,
                    margin: '0 0 32px',
                }}>
                    Looks like this route doesn&apos;t exist in our delivery zone — yet.
                    Let&apos;s get you back on track.
                </p>

                {/* Quick links */}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
                    <Link href="/" style={{
                        padding: '14px 28px', borderRadius: 14,
                        background: 'linear-gradient(135deg, #eab308, #ca8a04)',
                        color: '#000', fontWeight: 700, fontSize: 15,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(234,179,8,0.25)', transition: 'transform 0.2s',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        🏠 Go Home
                    </Link>
                    <Link href="/support" style={{
                        padding: '14px 28px', borderRadius: 14,
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                        border: `1px solid ${theme.borderSubtle}`,
                        color: theme.text, fontWeight: 700, fontSize: 15,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                    }}>
                        💬 Get Help
                    </Link>
                </div>

                {/* Popular pages */}
                <div style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${theme.borderSubtle}`,
                    borderRadius: 18, padding: '16px 20px', textAlign: 'left',
                }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Popular pages
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6, marginTop: 10 }}>
                        {[
                            { href: '/', label: '🍟 Order Food' },
                            { href: '/rides', label: '⚡ Book a Ride' },
                            { href: '/market', label: '🛒 Soo MRKT' },
                            { href: '/rewards', label: '🏆 Rewards' },
                            { href: '/for-drivers', label: '🚗 Drive for Us' },
                            { href: '/faq', label: '❓ FAQ' },
                        ].map((link, i) => (
                            <Link key={i} href={link.href} style={{
                                fontSize: 13, fontWeight: 600, color: theme.textMuted,
                                textDecoration: 'none', padding: '6px 0',
                                transition: 'color 0.2s',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#eab308'}
                                onMouseLeave={(e) => e.currentTarget.style.color = theme.textMuted}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
