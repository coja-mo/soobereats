"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../lib/ThemeContext';

export function Footer() {
    const { theme, isDark, toggleTheme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <footer style={{
            borderTop: `1px solid ${theme.borderSubtle}`,
            padding: isMobile ? '40px 20px 24px' : '56px 40px 24px',
            background: theme.bg,
            transition: 'all 0.3s ease',
        }}>
            <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                {/* Footer Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1.5fr 1fr 1fr 1fr',
                    gap: isMobile ? 32 : 48,
                    marginBottom: 40,
                }}>
                    {/* Brand Column */}
                    <div>
                        <div style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 20, fontWeight: 700,
                            color: theme.text, letterSpacing: '-0.02em',
                            marginBottom: 12,
                        }}>
                            Soobér
                        </div>
                        <p style={{
                            fontSize: 13, color: theme.textMuted,
                            lineHeight: 1.6, maxWidth: 280, margin: 0, marginBottom: 16,
                        }}>
                            The Algoma District&apos;s local delivery platform. Built in Sault Ste. Marie, for the Soo and beyond.
                        </p>
                        <div style={{ display: 'flex', gap: 8, fontSize: 12, color: theme.textFaint }}>
                            <span>🌿 Zero-emission fleet</span>
                            <span>·</span>
                            <span>🍁 100% local</span>
                        </div>
                    </div>

                    {/* Explore Column */}
                    <div>
                        <h4 style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, marginTop: 0 }}>Explore</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { href: '/', label: 'Restaurants' },
                                { href: '/rides', label: '⚡ Soobér Rides', accent: true },
                                { href: '/delivery-zone', label: 'Delivery Zones' },
                                { href: '/rewards', label: 'Rewards' },
                                { href: '/how-it-works', label: 'How It Works' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: l.accent ? '#0066FF' : theme.textFaint, textDecoration: 'none', fontSize: 13, fontWeight: l.accent ? 700 : 500, transition: 'color 0.2s' }}>{l.label}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, marginTop: 0 }}>Services</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { href: '/corporate', label: 'For Business' },
                                { href: '/for-drivers', label: 'Drive Electric' },
                                { href: '/support', label: 'Support' },
                                { href: '/contact', label: 'Contact' },
                                { href: '/links', label: 'All Links' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: theme.textFaint, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>{l.label}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16, marginTop: 0 }}>Company</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[
                                { href: '/about', label: 'About Soobér' },
                                { href: '/terms', label: 'Terms of Service' },
                                { href: '/privacy', label: 'Privacy Policy' },
                                { href: '/faq', label: 'FAQ' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: theme.textFaint, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>{l.label}</Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: `1px solid ${theme.borderSubtle}`,
                    paddingTop: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 16 : 0,
                }}>
                    <p style={{
                        fontSize: 12, color: theme.textFaint,
                        fontWeight: 400, margin: 0,
                    }}>
                        © 2026 Soobér · Sault Ste. Marie, ON · Antigravity Solutions
                    </p>
                    <button
                        onClick={toggleTheme}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 100, padding: '8px 16px',
                            cursor: 'pointer', fontSize: 13, fontWeight: 500,
                            color: theme.textMuted, transition: 'all 0.3s ease',
                        }}
                    >
                        {isDark ? '☀️' : '🌙'}
                        <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
