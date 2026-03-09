"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const SAFETY_FEATURES = [
    {
        icon: '🔒', title: 'End-to-End Encryption',
        desc: 'All data transmissions use TLS 1.3 encryption. Your payment info, personal details, and location data are encrypted at every step.',
        badge: 'Active',
    },
    {
        icon: '🇨🇦', title: 'Canadian Data Residency',
        desc: 'Your data never leaves Canada. We process and store everything on local compute infrastructure in Sault Ste. Marie — no US servers, no offshore data centers.',
        badge: 'Verified',
    },
    {
        icon: '💳', title: 'PCI DSS Compliant',
        desc: 'Payment processing meets the highest industry standard (PCI DSS Level 1). We never store raw credit card numbers on our systems.',
        badge: 'Compliant',
    },
    {
        icon: '🛡️', title: 'Background-Checked Drivers',
        desc: 'Every Soobér driver undergoes a comprehensive background check including criminal record, driving history, and identity verification before being approved.',
        badge: 'Required',
    },
    {
        icon: '📍', title: 'Real-Time GPS Tracking',
        desc: 'Track your delivery or ride in real-time on a live map. Share your trip link with family or friends so they know exactly where you are.',
        badge: 'Live',
    },
    {
        icon: '🤖', title: 'AI Safety Monitoring',
        desc: 'Our AI continuously monitors ride patterns, delivery routes, and user interactions for anomalies. Unusual activity triggers automatic human review.',
        badge: 'Always On',
    },
    {
        icon: '🚨', title: 'In-App Emergency Button',
        desc: 'Every ride includes a one-tap emergency button that connects directly to 911 and shares your live location with emergency services automatically.',
        badge: 'Critical',
    },
    {
        icon: '📸', title: 'Photo Verification',
        desc: 'Drivers verify their identity with a real-time selfie before going online. Delivery photos confirm successful drop-offs at your door.',
        badge: 'Required',
    },
];

const PRIVACY_PRINCIPLES = [
    { icon: '🚫', title: 'We Never Sell Your Data', desc: 'Period. No third-party data sales, no data brokers, no advertising targeting.' },
    { icon: '🗑️', title: 'Right to Delete', desc: 'Request full account deletion and we purge all personal data within 30 days.' },
    { icon: '📋', title: 'Transparent Collection', desc: 'We only collect data necessary to provide our services. Nothing more.' },
    { icon: '🔐', title: 'Zero-Knowledge Auth', desc: 'Passwords are hashed with bcrypt. We cannot read or recover your password.' },
    { icon: '📊', title: 'Usage Analytics = Anonymous', desc: 'Platform analytics are fully anonymized and aggregated. No individual tracking.' },
    { icon: '🏠', title: 'Local Processing', desc: 'AI and analytics run on our local M2 Ultra compute nodes — your data stays in the Soo.' },
];

const CERTIFICATIONS = [
    { icon: '🛡️', label: 'PCI DSS Level 1', desc: 'Payment Card Industry' },
    { icon: '🔒', label: 'TLS 1.3', desc: 'Transport Encryption' },
    { icon: '🇨🇦', label: 'PIPEDA', desc: 'Canadian Privacy Law' },
    { icon: '♿', label: 'WCAG 2.1 AA', desc: 'Web Accessibility' },
    { icon: '📋', label: 'SOC 2 Type II', desc: 'Security Compliance' },
    { icon: '🌿', label: 'B Corp Aligned', desc: 'Social & Environmental' },
];

export default function SafetyPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const teal = '#14b8a6';

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
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,184,166,0.10) 0%, rgba(20,184,166,0.03) 40%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${teal}10`, border: `1px solid ${teal}25`, borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>🛡️</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: teal, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Safety & Trust</span>
                    </div>

                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 56, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Your Safety{' '}
                        <span style={{ background: `linear-gradient(135deg, ${teal}, #0d9488, #2dd4bf)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Comes First</span>
                    </h1>

                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>
                        Every policy, feature, and design decision at Soobér starts with one question: is this safe for our community?
                    </p>
                </div>
            </section>

            {/* ═══ SAFETY FEATURES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                    {SAFETY_FEATURES.map((feat, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22,
                            padding: isMobile ? 20 : 24, display: 'flex', gap: 14,
                            transition: 'all 0.3s', cursor: 'default',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${teal}44`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0, marginTop: 2 }}>{feat.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, margin: 0 }}>{feat.title}</h3>
                                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: `${teal}12`, color: teal, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{feat.badge}</span>
                                </div>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ PRIVACY PRINCIPLES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px', textAlign: 'center' }}>
                    Privacy Principles
                </h2>
                <p style={{ fontSize: 15, color: theme.textMuted, textAlign: 'center', margin: '0 auto 28px', maxWidth: 500 }}>
                    Your data is yours. Here&apos;s how we treat it.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {PRIVACY_PRINCIPLES.map((p, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                            padding: isMobile ? 18 : 22, textAlign: 'center',
                        }}>
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{p.icon}</span>
                            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 6px' }}>{p.title}</h4>
                            <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ CERTIFICATIONS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 24px', textAlign: 'center' }}>
                    Certifications & Compliance
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: 10 }}>
                    {CERTIFICATIONS.map((cert, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(20,184,166,0.04)' : 'rgba(20,184,166,0.03)',
                            border: `1px solid ${teal}15`, borderRadius: 16,
                            padding: '14px 12px', textAlign: 'center',
                        }}>
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 6 }}>{cert.icon}</span>
                            <div style={{ fontSize: 12, fontWeight: 700, color: theme.text, marginBottom: 2 }}>{cert.label}</div>
                            <div style={{ fontSize: 10, color: theme.textFaint }}>{cert.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ EMERGENCY CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? 'rgba(239,68,68,0.06)' : 'rgba(239,68,68,0.04)',
                    border: '1px solid rgba(239,68,68,0.15)', borderRadius: 28,
                    padding: isMobile ? '28px 20px' : '40px 40px', textAlign: 'center',
                }}>
                    <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>🚨</span>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                        In an Emergency
                    </h3>
                    <p style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 20px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
                        If you feel unsafe during a Soobér ride or delivery, use the in-app emergency button. It calls 911 and shares your live GPS location automatically. You can also contact our safety team directly.
                    </p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <div style={{
                            padding: '14px 28px', borderRadius: 14,
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: '#fff', fontWeight: 700, fontSize: 16,
                            fontFamily: "'DM Sans', sans-serif",
                        }}>
                            📞 911 Emergency
                        </div>
                        <Link href="/support" style={{
                            padding: '14px 28px', borderRadius: 14,
                            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${theme.borderSubtle}`,
                            color: theme.text, fontWeight: 700, fontSize: 16,
                            fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        }}>
                            💬 Safety Team
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══ REPORT CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 12px' }}>
                    Report a Safety Concern
                </h2>
                <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 auto 24px', maxWidth: 480 }}>
                    See something that doesn&apos;t look right? We take every report seriously and respond within 24 hours.
                </p>
                <Link href="/contact" style={{
                    display: 'inline-block', padding: '16px 40px', borderRadius: 14,
                    background: `linear-gradient(135deg, ${teal}, #0d9488)`,
                    color: '#fff', fontWeight: 700, fontSize: 16,
                    fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                    boxShadow: `0 4px 20px rgba(20,184,166,0.25)`, transition: 'transform 0.2s',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Report a Concern →
                </Link>
            </section>

            <Footer />
        </div>
    );
}
