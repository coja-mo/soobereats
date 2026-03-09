"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const TEAM = [
    { name: 'Cody Mount', role: 'Founder & CEO', bio: 'Born and raised in the Soo. Building the local platform that Northern Ontario deserves.', emoji: '🧠', color: '#0066FF' },
    { name: 'Operations Lead', role: 'VP Operations', bio: 'Managing fleet logistics, dispatch intelligence, and partner onboarding across Algoma.', emoji: '⚙️', color: '#f59e0b' },
    { name: 'Engineering Lead', role: 'CTO', bio: 'Architecting the local-first compute stack — Mac Studio nodes, on-premise AI, zero-cloud sovereignty.', emoji: '💻', color: '#8b5cf6' },
    { name: 'Community Lead', role: 'Head of Community', bio: 'Connecting restaurants, drivers, and customers. The voice of the Soo on every channel.', emoji: '🤝', color: '#ec4899' },
    { name: 'Fleet Manager', role: 'Fleet Operations', bio: 'Keeping 8 EV models charged, maintained, and deployed. From Hummer EVs to BYD Dolphins.', emoji: '🔋', color: '#22c55e' },
    { name: 'Design Lead', role: 'Head of Design', bio: 'Crafting the premium experience — from splash screens to command palettes. Apple-quality, Soo soul.', emoji: '🎨', color: '#06b6d4' },
];

const VALUES = [
    { icon: '🌱', title: 'Local First', desc: 'Every decision starts with "How does this benefit the Soo?"' },
    { icon: '⚡', title: 'Zero Emissions', desc: '100% electric fleet. No compromises.' },
    { icon: '🔒', title: 'Data Sovereignty', desc: 'Your data stays in Algoma. Processed on local nodes.' },
    { icon: '💎', title: 'Premium By Default', desc: 'Every pixel, every ride, crafted to a premium standard.' },
    { icon: '🤝', title: 'Fair Commission', desc: '15% — half of what national apps charge.' },
    { icon: '🚀', title: 'Ship Fast', desc: 'We build based on real feedback from real neighbours.' },
];

const TIMELINE = [
    { year: '2025', title: 'The Idea', desc: 'Soobér conceived as a homegrown alternative to national apps.' },
    { year: 'Q1 2026', title: 'Platform Launch', desc: '18 restaurants, full EV fleet, ride-hailing, Soo MRKT. 65+ pages.' },
    { year: 'Q2 2026', title: 'Regional Expansion', desc: 'Targeting Sudbury, North Bay, Thunder Bay.' },
    { year: '2027', title: 'Northern Ontario Network', desc: 'Connected local platforms across the North.' },
];

export default function TeamPage() {
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
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 750, margin: '0 auto' }}>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 52, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Built in the Soo.{' '}
                        <span style={{ background: 'linear-gradient(135deg, #0066FF, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>For the Soo.</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.7, color: theme.textMuted, maxWidth: 560, margin: '0 auto' }}>
                        We&apos;re your neighbours — building the delivery and mobility platform Northern Ontario deserves.
                    </p>
                </div>
            </section>

            {/* ═══ MISSION ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ background: isDark ? 'rgba(0,102,255,0.04)' : 'rgba(0,102,255,0.03)', border: '1px solid rgba(0,102,255,0.15)', borderRadius: 28, padding: isMobile ? 24 : 36 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: '#0066FF', margin: '0 0 10px' }}>Our Mission</h2>
                    <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.7, color: theme.text, fontWeight: 500, margin: 0, fontFamily: "'DM Sans', sans-serif" }}>
                        To prove that Northern Ontario communities can build world-class technology — keeping money local, data sovereign, and streets emission-free.
                    </p>
                </div>
            </section>

            {/* ═══ VALUES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1000, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px', textAlign: 'center' }}>What We Stand For</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {VALUES.map((v, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: 22, transition: 'all 0.3s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{v.icon}</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 4px' }}>{v.title}</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ TEAM ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1000, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px', textAlign: 'center' }}>The Team</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {TEAM.map((m, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: 24, textAlign: 'center', transition: 'all 0.3s' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${m.color}40`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <div style={{ width: 52, height: 52, borderRadius: '50%', margin: '0 auto 10px', background: `linear-gradient(135deg, ${m.color}20, ${m.color}40)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, border: `2px solid ${m.color}30` }}>{m.emoji}</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 2px' }}>{m.name}</h3>
                            <div style={{ fontSize: 11, fontWeight: 600, color: m.color, marginBottom: 6 }}>{m.role}</div>
                            <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{m.bio}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ TIMELINE ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 600, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px', textAlign: 'center' }}>Our Journey</h2>
                <div style={{ position: 'relative', paddingLeft: 32 }}>
                    <div style={{ position: 'absolute', left: 10, top: 8, bottom: 8, width: 2, background: `linear-gradient(180deg, #0066FF, ${theme.borderSubtle})` }} />
                    {TIMELINE.map((t, i) => (
                        <div key={i} style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? 24 : 0 }}>
                            <div style={{ position: 'absolute', left: -32, top: 4, width: 16, height: 16, borderRadius: '50%', background: i === 0 ? '#0066FF' : theme.bgCard, border: `2px solid ${i === 0 ? '#0066FF' : theme.border}` }} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#0066FF', letterSpacing: '0.06em' }}>{t.year}</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '2px 0 4px' }}>{t.title}</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{t.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ STATS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 800, margin: '0 auto' }}>
                <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 28, padding: isMobile ? 24 : 36 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 16, color: theme.text, margin: '0 0 16px', textAlign: 'center' }}>By the Numbers</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16, textAlign: 'center' }}>
                        {[
                            { val: '18+', label: 'Restaurant Partners' },
                            { val: '8', label: 'EV Models' },
                            { val: '65+', label: 'Platform Pages' },
                            { val: '100%', label: 'Electric Fleet' },
                            { val: '15%', label: 'Commission Rate' },
                            { val: '$0', label: 'VC Funding' },
                            { val: '1', label: 'Community' },
                            { val: '∞', label: 'Ambition' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 26, color: '#0066FF' }}>{s.val}</div>
                                <div style={{ fontSize: 11, fontWeight: 600, color: theme.textFaint }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
