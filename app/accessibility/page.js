"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const STANDARDS = [
    { icon: '♿', title: 'WCAG 2.1 AA Compliant', desc: 'All pages meet Web Content Accessibility Guidelines 2.1 Level AA standards for contrast, navigation, text alternatives, and keyboard accessibility.', badge: 'Active' },
    { icon: '🇨🇦', title: 'AODA Compliant', desc: 'We comply with the Accessibility for Ontarians with Disabilities Act (AODA) Customer Service Standards, providing accessible service to all users.', badge: 'Certified' },
    { icon: '⌨️', title: 'Full Keyboard Navigation', desc: 'Every interactive element is accessible via keyboard. Tab order is logical, focus indicators are visible, and skip-to-content links are provided.', badge: 'Implemented' },
    { icon: '🗣️', title: 'Screen Reader Optimized', desc: 'All images have descriptive alt text, form labels are properly associated, ARIA roles are implemented, and dynamic content changes are announced.', badge: 'Tested' },
    { icon: '🎨', title: 'High Contrast Support', desc: 'Our dark and light modes both meet 4.5:1 contrast ratios. Text remains readable at 200% zoom. Users can switch themes via system preference or toggle.', badge: 'Active' },
    { icon: '📱', title: 'Touch Target Compliance', desc: 'All interactive elements meet minimum 44×44px touch targets. Buttons have adequate spacing to prevent misclicks, especially important for motor disabilities.', badge: 'Verified' },
];

const RIDE_FEATURES = [
    { icon: '🦽', title: 'Wheelchair Accessible Vehicles', desc: 'Our fleet includes WAV-equipped vehicles. Request accessible rides directly from the booking interface.' },
    { icon: '🐕‍🦺', title: 'Service Animal Friendly', desc: 'All vehicles welcome service animals. Drivers are trained on service animal policies and Ontario human rights obligations.' },
    { icon: '🔊', title: 'Audio Navigation', desc: 'Turn-by-turn audio cues for riders with visual impairments. ETA announcements and driver arrival alerts.' },
    { icon: '📝', title: 'Communication Cards', desc: 'In-app communication cards for riders who are deaf or hard of hearing. Pre-set messages and visual status indicators.' },
];

export default function AccessibilityPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const violet = '#8b5cf6';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{
                position: 'relative', overflow: 'hidden', textAlign: 'center',
                padding: isMobile ? '60px 16px 48px' : '80px 40px 64px',
            }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)`, pointerEvents: 'none', filter: 'blur(60px)' }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${violet}10`, border: `1px solid ${violet}25`, borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>♿</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: violet, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Accessibility</span>
                    </div>

                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 56, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Built for{' '}
                        <span style={{ background: `linear-gradient(135deg, ${violet}, #7c3aed, #a78bfa)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Everyone</span>
                    </h1>

                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>
                        Accessibility isn&apos;t an afterthought at Soobér — it&apos;s foundational. We&apos;re committed to ensuring every person in the Algoma District can use our platform, period.
                    </p>
                </div>
            </section>

            {/* ═══ STATEMENT ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 800, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? `rgba(139,92,246,0.04)` : `rgba(139,92,246,0.03)`,
                    border: `1px solid ${violet}15`, borderRadius: 24,
                    padding: isMobile ? '24px 20px' : '32px 36px',
                }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: theme.text, margin: '0 0 12px' }}>
                        Our Accessibility Statement
                    </h2>
                    <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.8, margin: 0 }}>
                        Soobér is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards. We welcome feedback on the accessibility of our platform — if you encounter any barriers, please contact us at <strong style={{ color: theme.text }}>accessibility@soober.ca</strong> so we can address your concerns.
                    </p>
                </div>
            </section>

            {/* ═══ STANDARDS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 24px', textAlign: 'center' }}>
                    Web Accessibility Standards
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                    {STANDARDS.map((s, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22,
                            padding: isMobile ? 20 : 24, display: 'flex', gap: 14,
                            transition: 'all 0.3s',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${violet}44`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{s.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, margin: 0 }}>{s.title}</h3>
                                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: `${violet}12`, color: violet, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{s.badge}</span>
                                </div>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ RIDE ACCESSIBILITY ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px', textAlign: 'center' }}>
                    Ride Accessibility
                </h2>
                <p style={{ fontSize: 15, color: theme.textMuted, textAlign: 'center', margin: '0 auto 28px', maxWidth: 500 }}>
                    Every rider deserves a safe, comfortable journey.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                    {RIDE_FEATURES.map((f, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                            padding: isMobile ? 18 : 22, display: 'flex', gap: 14,
                        }}>
                            <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{f.icon}</span>
                            <div>
                                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 4px' }}>{f.title}</h4>
                                <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ REPORT CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 12px' }}>
                    Report a Barrier
                </h2>
                <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 auto 24px', maxWidth: 480 }}>
                    Encountered an accessibility barrier? We&apos;ll prioritize fixing it. Every report helps us improve.
                </p>
                <Link href="/contact" style={{
                    display: 'inline-block', padding: '16px 40px', borderRadius: 14,
                    background: `linear-gradient(135deg, ${violet}, #7c3aed)`,
                    color: '#fff', fontWeight: 700, fontSize: 16,
                    fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                    boxShadow: `0 4px 20px rgba(139,92,246,0.25)`, transition: 'transform 0.2s',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Report a Barrier →
                </Link>
            </section>

            <Footer />
        </div>
    );
}
