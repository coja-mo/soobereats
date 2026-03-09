"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const CHANGELOG = [
    {
        version: '2.4.0',
        date: 'Mar 9, 2026',
        tag: 'Latest',
        tagColor: '#22c55e',
        items: [
            { type: 'new', text: '⌘K Command Palette — search all pages and actions instantly' },
            { type: 'new', text: 'Platform Status page with 90-day uptime visualization' },
            { type: 'new', text: 'Premium splash screen on first visit' },
            { type: 'new', text: 'Partner application page for restaurant onboarding' },
            { type: 'new', text: 'Live activity feed showing real-time platform activity' },
            { type: 'improved', text: 'SEO metadata across all 35+ pages with Open Graph & Twitter cards' },
            { type: 'improved', text: 'Back-to-top button with glassmorphic design' },
        ]
    },
    {
        version: '2.3.0',
        date: 'Mar 9, 2026',
        tag: 'Platform Audit',
        tagColor: '#3b82f6',
        items: [
            { type: 'new', text: 'Accessibility page — WCAG 2.1 AA, AODA compliance' },
            { type: 'new', text: 'Careers page with 6 perks and open roles' },
            { type: 'new', text: 'Toast notification system (7 types, auto-dismiss, stacking)' },
            { type: 'new', text: 'App Download page with early access signup' },
            { type: 'new', text: 'Live Order Tracking with animated map' },
            { type: 'fixed', text: 'Removed duplicate testimonials section on homepage' },
            { type: 'improved', text: 'Footer expanded with 10+ new navigation links' },
        ]
    },
    {
        version: '2.2.0',
        date: 'Mar 9, 2026',
        tag: 'AI & Auth',
        tagColor: '#8b5cf6',
        items: [
            { type: 'new', text: 'AI Engine with 20+ intents, NLU, sentiment analysis' },
            { type: 'new', text: 'Global floating AI chat widget on every page' },
            { type: 'new', text: 'Apple & Google sign-in integration' },
            { type: 'new', text: 'Custom 404 page with navigation suggestions' },
            { type: 'new', text: 'Safety & Trust page with 8 security features' },
        ]
    },
    {
        version: '2.1.0',
        date: 'Mar 9, 2026',
        tag: 'GIS & Maps',
        tagColor: '#f59e0b',
        items: [
            { type: 'new', text: 'GIS ride routing system with address autocomplete' },
            { type: 'new', text: 'Interactive Leaflet map on delivery zone page' },
            { type: 'new', text: 'Airport transfers map with YAM marker' },
            { type: 'new', text: 'Press & Newsroom page' },
            { type: 'improved', text: 'Header nav divider between primary and secondary tabs' },
            { type: 'improved', text: 'FAQ search filter with category tabs' },
        ]
    },
    {
        version: '2.0.0',
        date: 'Mar 9, 2026',
        tag: 'Major',
        tagColor: '#ef4444',
        items: [
            { type: 'new', text: 'Soobér Rides — full ride-hailing with airport + event shuttles' },
            { type: 'new', text: 'Soo MRKT marketplace with vendor storefronts' },
            { type: 'new', text: 'Community Marketplace for local classifieds' },
            { type: 'new', text: 'Business Solutions & Corporate page' },
            { type: 'new', text: 'Social Media Campaign Playbook page' },
            { type: 'new', text: 'Driver Portal with earnings dashboard' },
            { type: 'new', text: 'Cookie Consent with granular preferences' },
            { type: 'new', text: 'Rewards & Loyalty with animated tier progression' },
        ]
    },
];

const TYPE_COLORS = {
    new: { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', label: 'New' },
    improved: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', label: 'Improved' },
    fixed: { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', label: 'Fixed' },
};

export default function ChangelogPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 40px' : '80px 40px 56px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                    <span style={{ fontSize: 16 }}>📋</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Changelog</span>
                </div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    What&apos;s New
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 480, margin: '0 auto' }}>
                    Every update, feature, and improvement to the Soobér platform.
                </p>
            </section>

            {/* ═══ TIMELINE ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 800, margin: '0 auto' }}>
                <div style={{ position: 'relative', paddingLeft: isMobile ? 0 : 32 }}>
                    {/* Timeline line */}
                    {!isMobile && <div style={{ position: 'absolute', left: 10, top: 12, bottom: 12, width: 2, background: `linear-gradient(180deg, #8b5cf6, ${theme.borderSubtle})` }} />}

                    {CHANGELOG.map((release, ri) => (
                        <div key={ri} style={{ position: 'relative', marginBottom: 32 }}>
                            {/* Timeline dot */}
                            {!isMobile && (
                                <div style={{
                                    position: 'absolute', left: -32, top: 6,
                                    width: 18, height: 18, borderRadius: '50%',
                                    background: ri === 0 ? '#8b5cf6' : theme.bgCard,
                                    border: `2px solid ${ri === 0 ? '#8b5cf6' : theme.border}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 8, color: '#fff',
                                }}>{ri === 0 ? '✦' : ''}</div>
                            )}

                            {/* Header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20, color: theme.text }}>v{release.version}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 8, background: `${release.tagColor}15`, color: release.tagColor, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{release.tag}</span>
                                <span style={{ fontSize: 12, color: theme.textFaint }}>{release.date}</span>
                            </div>

                            {/* Items */}
                            <div style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.borderSubtle}`, borderRadius: 18,
                                padding: isMobile ? 16 : 22,
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {release.items.map((item, ii) => {
                                        const tc = TYPE_COLORS[item.type];
                                        return (
                                            <div key={ii} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                                                <span style={{
                                                    fontSize: 9, fontWeight: 800, padding: '2px 6px',
                                                    borderRadius: 5, background: tc.bg, color: tc.color,
                                                    textTransform: 'uppercase', letterSpacing: '0.04em',
                                                    flexShrink: 0, marginTop: 3,
                                                }}>{tc.label}</span>
                                                <span style={{ fontSize: 14, color: theme.text, lineHeight: 1.5 }}>{item.text}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
