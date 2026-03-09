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
                                { href: '/market', label: 'Soo MRKT' },
                                { href: '/community', label: '🏘️ Community', community: true },
                                { href: '/business', label: '💼 Business Solutions', business: true },
                                { href: '/delivery-zone', label: 'Delivery Zones' },
                                { href: '/rewards', label: 'Rewards' },
                                { href: '/how-it-works', label: 'How It Works' },
                                { href: '/academy', label: 'Soobér Academy' },
                                { href: '/download', label: '📱 Get the App' },
                            ].map(l => (
                                <Link key={l.href} href={l.href} style={{ color: l.accent ? '#0066FF' : l.community ? '#d97706' : l.business ? '#10b981' : theme.textFaint, textDecoration: 'none', fontSize: 13, fontWeight: (l.accent || l.community || l.business) ? 700 : 500, transition: 'color 0.2s' }}>{l.label}</Link>
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
                                { href: '/dispatch', label: 'Dispatch Center' },
                                { href: '/driver-portal', label: 'Driver Portal' },
                                { href: '/login', label: 'Sign In / Sign Up' },
                                { href: '/status', label: '🟢 System Status' },
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
                                { href: '/safety', label: '🛡️ Safety & Trust' },
                                { href: '/accessibility', label: '♿ Accessibility' },
                                { href: '/careers', label: 'Careers' },
                                { href: '/partner', label: 'Partner With Us' },
                                { href: '/investors', label: 'Investors' },
                                { href: '/press', label: 'Press & Media' },
                                { href: '/socials', label: 'Social Media' },
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        {/* Social Media */}
                        <div style={{ display: 'flex', gap: 8 }}>
                            {[
                                { label: 'IG', href: '#', emoji: '📸' },
                                { label: 'FB', href: '#', emoji: '👥' },
                                { label: 'TT', href: '#', emoji: '🎵' },
                                { label: 'X', href: '#', emoji: '𝕏' },
                            ].map(s => (
                                <a key={s.label} href={s.href} title={s.label} style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                    border: `1px solid ${theme.borderSubtle}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 14, textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#0066FF'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                                >{s.emoji}</a>
                            ))}
                        </div>
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
            </div>
        </footer>
    );
}
