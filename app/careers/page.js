"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const OPEN_ROLES = [
    { title: 'Senior Full-Stack Developer', location: 'Sault Ste. Marie, ON · Remote OK', type: 'Full-Time', dept: 'Engineering', desc: 'Build the platform powering local delivery and mobility for Northern Ontario. Next.js, React, Node.js.', hot: true },
    { title: 'Mobile App Developer (iOS/Android)', location: 'Sault Ste. Marie, ON · Hybrid', type: 'Full-Time', dept: 'Engineering', desc: 'Lead our native mobile app development for both App Store and Google Play launches.' },
    { title: 'EV Fleet Operations Manager', location: 'Sault Ste. Marie, ON', type: 'Full-Time', dept: 'Operations', desc: 'Manage our growing electric fleet — charging schedules, maintenance, driver allocation, and route optimization.' },
    { title: 'Community Marketing Lead', location: 'Sault Ste. Marie, ON', type: 'Full-Time', dept: 'Marketing', desc: 'Own the local marketing strategy. Events, partnerships, social campaigns, all hyper-local to the Soo.' },
    { title: 'Delivery Driver (EV)', location: 'Sault Ste. Marie & Algoma District', type: 'Part-Time / Flex', dept: 'Delivery', desc: 'Drive our electric vehicles. Flexible hours, tips, bonuses. No gas costs — ever.', hot: true },
    { title: 'Customer Success Representative', location: 'Remote (Ontario)', type: 'Part-Time', dept: 'Support', desc: 'Help customers and restaurant partners via chat and phone. Be the voice of Soobér.' },
];

const PERKS = [
    { icon: '⚡', title: 'Electric Everything', desc: 'Company EV for team leads. Free charging for all drivers.' },
    { icon: '🏠', title: 'Remote-First', desc: 'Work from anywhere in Ontario. We trust results, not hours.' },
    { icon: '🍕', title: '$200/mo Food Credit', desc: 'Eat from partner restaurants on us. You should know what we deliver.' },
    { icon: '💊', title: 'Full Benefits', desc: 'Health, dental, vision from Day 1 for all full-time team members.' },
    { icon: '📈', title: 'Equity Options', desc: 'Pre-seed employee stock options. Own a piece of what you build.' },
    { icon: '🎓', title: 'Learning Budget', desc: '$2,000/yr for courses, conferences, certifications. Grow with us.' },
];

export default function CareersPage() {
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
            <section style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', padding: isMobile ? '60px 16px 48px' : '80px 40px 64px' }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.10) 0%, rgba(34,197,94,0.03) 40%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>🚀</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>We&apos;re Hiring</span>
                    </div>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 56, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Build the Future of{' '}
                        <span style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Local</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>
                        We&apos;re a small, scrappy team building Northern Ontario&apos;s first local-first delivery and mobility platform. Join us and make a real impact.
                    </p>
                </div>
            </section>

            {/* ═══ PERKS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1200, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px', textAlign: 'center' }}>Why Soobér?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 12 }}>
                    {PERKS.map((p, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 16 : 22, transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{p.icon}</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 4px' }}>{p.title}</h3>
                            <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ OPEN ROLES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px', textAlign: 'center' }}>Open Roles</h2>
                <p style={{ fontSize: 14, color: theme.textMuted, textAlign: 'center', margin: '0 auto 24px' }}>{OPEN_ROLES.length} positions open</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {OPEN_ROLES.map((role, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                            padding: isMobile ? 18 : 24, transition: 'all 0.2s', cursor: 'pointer',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, gap: 12 }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 17, color: theme.text, margin: 0 }}>{role.title}</h3>
                                        {role.hot && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.1)', color: '#ef4444', textTransform: 'uppercase' }}>🔥 Hot</span>}
                                    </div>
                                    <p style={{ fontSize: 12, color: theme.textFaint, margin: 0 }}>{role.location}</p>
                                </div>
                                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                                    <span style={{ fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: 'rgba(0,102,255,0.08)', color: '#0066FF' }}>{role.dept}</span>
                                    <span style={{ fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', color: theme.textMuted }}>{role.type}</span>
                                </div>
                            </div>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{role.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: 36, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 12px' }}>Don&apos;t see your role?</h2>
                <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 auto 24px', maxWidth: 440 }}>
                    We&apos;re always looking for exceptional people. Send us your resume and tell us how you want to help the Soo.
                </p>
                <a href="mailto:careers@soober.ca" style={{
                    display: 'inline-block', padding: '16px 40px', borderRadius: 14,
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    color: '#fff', fontWeight: 700, fontSize: 16,
                    fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(34,197,94,0.25)', transition: 'transform 0.2s',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >careers@soober.ca</a>
            </section>

            <Footer />
        </div>
    );
}
