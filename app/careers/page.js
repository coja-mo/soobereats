"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const OPEN_ROLES = [
    { id: 'driver-food', category: 'Drivers', title: 'Food Delivery Driver', type: 'Part-time / Full-time', location: 'Sault Ste. Marie', icon: '🚗', color: '#0066FF', desc: 'Deliver food from local restaurants in our 100% electric fleet. Flexible hours, competitive pay, tips on every order.', requirements: ['Valid G license', 'Clean driving abstract', 'Smartphone', 'Customer service mindset', 'Electric vehicle experience (we can help!)'], perks: ['Flexible scheduling', 'Keep 100% of tips', 'Free Soobér Academy training', 'Electric vehicle provided or subsidy', 'Weekly pay + bonuses'] },
    { id: 'driver-rides', category: 'Drivers', title: 'Ride-Hail Driver', type: 'Part-time / Full-time', location: 'Sault Ste. Marie', icon: '⚡', color: '#10b981', desc: 'Drive passengers in premium electric vehicles. Airport transfers, city rides, event transportation. Professional, luxury-grade service.', requirements: ['Valid G license (2+ years)', 'Clean criminal background check', 'Professional demeanor', 'Knowledge of Sault Ste. Marie', 'Minimum 20 hrs/week availability'], perks: ['Premium vehicle fleet access', 'Event driving opportunities', 'Higher per-ride earnings', 'VIP client tips', 'Career growth path'] },
    { id: 'driver-scooter', category: 'Drivers', title: 'Scooter Fleet Technician', type: 'Seasonal (May-Oct)', location: 'Boardwalk / Waterfront', icon: '🛴', color: '#d97706', desc: 'Maintain and manage our boardwalk electric scooter fleet. Charge units, perform maintenance, assist renters, ensure dock stations are stocked.', requirements: ['Basic mechanical aptitude', 'Physical fitness (outdoor work)', 'Customer service skills', 'Reliable transportation', 'Available weekends'], perks: ['Outdoor waterfront work', 'Seasonal bonus', 'Free scooter access', 'Team environment', 'Flexible summer hours'] },
    { id: 'dispatcher', category: 'Operations', title: 'Dispatch Coordinator', type: 'Full-time', location: 'Remote / Sault Ste. Marie', icon: '📡', color: '#6366f1', desc: 'Coordinate real-time order dispatching across all service verticals. Manage driver assignments, optimize routes, handle escalations.', requirements: ['Strong multitasking ability', 'Experience with logistics or dispatch', 'Calm under pressure', 'Tech-savvy (our tools are state-of-the-art)', 'Available for rotating shifts'], perks: ['Work from home option', 'Enterprise scheduling system', 'Career advancement track', 'Health benefits', 'Performance bonuses'] },
    { id: 'cs-rep', category: 'Operations', title: 'Customer Service Representative', type: 'Full-time', location: 'Remote / Sault Ste. Marie', icon: '💬', color: '#ec4899', desc: 'Be the voice of Soobér. Handle customer inquiries, resolve issues, and ensure every interaction leaves customers feeling valued. Real human support — no scripts.', requirements: ['Excellent communication skills', 'Empathy and patience', 'Problem-solving mindset', 'Basic tech proficiency', 'Available for flexible hours'], perks: ['Work from home', 'Paid training via Soobér Academy', 'Growth into management', 'Health benefits', 'Team culture events'] },
    { id: 'account-mgr', category: 'Business', title: 'Restaurant Account Manager', type: 'Full-time', location: 'Sault Ste. Marie (in-field)', icon: '🤝', color: '#22c55e', desc: 'Be the dedicated point of contact for our restaurant partners. Onboard new partners, provide ongoing support, deliver performance reports, and build lasting relationships.', requirements: ['Sales or account management experience', 'Passion for food and local business', 'Strong relationship skills', 'Own vehicle for partner visits', 'Data-literate (weekly reporting)'], perks: ['In-field work (not a desk job)', 'Direct impact on local businesses', 'Commission on new partner signups', 'Company vehicle allowance', 'Leadership track'] },
    { id: 'marketing', category: 'Business', title: 'Social Media & Content Creator', type: 'Full-time', location: 'Sault Ste. Marie', icon: '📱', color: '#8B5CF6', desc: 'Own our social media presence across Instagram, TikTok, Facebook, LinkedIn, and YouTube. Create viral content, manage campaigns, and tell the Soobér story.', requirements: ['Portfolio of social media work', 'Video editing skills (Reels, TikTok)', 'Photography experience', 'Understanding of analytics', 'Passion for local community'], perks: ['Creative freedom', 'Professional camera equipment', 'Access to all events', 'Content creation budget', 'Growth into marketing leadership'] },
    { id: 'dev', category: 'Technology', title: 'Full-Stack Developer', type: 'Full-time', location: 'Remote / Sault Ste. Marie', icon: '💻', color: '#0891b2', desc: 'Build the platform that powers Northern Ontario\'s delivery ecosystem. Next.js, React, real-time systems, dispatch algorithms. State-of-the-art technology with real-world impact.', requirements: ['3+ years full-stack experience', 'React / Next.js proficiency', 'Real-time systems experience', 'API design skills', 'Passion for local impact'], perks: ['Fully remote option', 'Latest tech stack', 'Direct founder access', 'Equity potential', 'Ship features that matter'] },
];

const CULTURE_POINTS = [
    { emoji: '🏘️', title: 'Local First', desc: 'We live here. We work here. Every decision considers the community we serve.' },
    { emoji: '⚡', title: 'Move Fast, Stay Humble', desc: 'Startup energy with Northern Ontario warmth. We ship fast but never at the cost of quality.' },
    { emoji: '🤝', title: 'Real Relationships', desc: 'No corporate walls. Everyone — from drivers to founders — is on a first-name basis.' },
    { emoji: '🌱', title: 'Sustainability in Everything', desc: 'From our electric fleet to our compostable packaging, we walk the talk on eco responsibility.' },
    { emoji: '📈', title: 'Growth Opportunities', desc: 'We\'re growing fast. Early team members shape the culture and grow into leadership roles.' },
    { emoji: '🎯', title: 'Impact You Can See', desc: 'Your work directly affects local businesses and families. Not a Fortune 500 quarterly report — real people.' },
];

export default function CareersPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [expandedRole, setExpandedRole] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const categories = ['All', ...new Set(OPEN_ROLES.map(r => r.category))];
    const filteredRoles = selectedCategory === 'All' ? OPEN_ROLES : OPEN_ROLES.filter(r => r.category === selectedCategory);
    const teal = '#0891b2';

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{
                position: 'relative', overflow: 'hidden', textAlign: 'center',
                padding: isMobile ? '60px 16px 48px' : '80px 40px 64px',
            }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(8,145,178,0.12) 0%, rgba(8,145,178,0.04) 40%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(8,145,178,0.08)', border: '1px solid rgba(8,145,178,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>🚀</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: teal, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Join the Team</span>
                    </div>

                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 36 : 64, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Build the Future of{' '}
                        <span style={{ background: 'linear-gradient(135deg, #0891b2, #06b6d4, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Local Delivery</span>
                    </h1>

                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 620, margin: '0 auto 28px' }}>
                        We&apos;re a small, passionate team building something that actually matters — for our community, our environment, and Northern Ontario.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 16 : 40, flexWrap: 'wrap' }}>
                        {[
                            { value: `${OPEN_ROLES.length}`, label: 'Open Roles' },
                            { value: '100%', label: 'Electric Fleet' },
                            { value: 'Remote', label: 'Options Available' },
                            { value: '$0', label: 'Corporate BS' },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'DM Sans', sans-serif", color: i === 3 ? teal : theme.text, letterSpacing: '-0.03em' }}>{s.value}</div>
                                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CULTURE ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                    Why Work at Soobér?
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {CULTURE_POINTS.map((cp, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 20 : 24, transition: 'all 0.3s ease' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = `${teal}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{cp.emoji}</span>
                            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 6px' }}>{cp.title}</h4>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{cp.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ CATEGORY FILTER ═══ */}
            <section style={{ padding: isMobile ? '0 16px 20px' : '0 40px 24px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: 0 }}>
                        Open Positions ({filteredRoles.length})
                    </h2>
                    <div style={{ display: 'flex', gap: 4, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', borderRadius: 12, padding: 4 }}>
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
                                padding: '8px 16px', borderRadius: 8,
                                background: selectedCategory === cat ? (isDark ? 'rgba(255,255,255,0.08)' : '#fff') : 'transparent',
                                border: selectedCategory === cat ? `1px solid ${theme.borderSubtle}` : '1px solid transparent',
                                color: selectedCategory === cat ? theme.text : theme.textMuted,
                                fontWeight: selectedCategory === cat ? 700 : 500, fontSize: 12, cursor: 'pointer',
                                fontFamily: "'Inter', sans-serif", transition: 'all 0.2s ease',
                            }}>{cat}</button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ JOB LISTINGS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {filteredRoles.map((role) => {
                        const isExpanded = expandedRole === role.id;
                        return (
                            <div key={role.id} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${isExpanded ? `${role.color}40` : theme.borderSubtle}`,
                                borderRadius: 22, padding: isMobile ? 20 : 28, transition: 'all 0.3s ease', cursor: 'pointer',
                            }}
                                onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${role.color}44`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isExpanded ? `${role.color}40` : theme.borderSubtle; }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{ width: 52, height: 52, borderRadius: 16, background: `${role.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{role.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 16 : 18, color: theme.text, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{role.title}</h3>
                                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12 }}>
                                            <span style={{ color: role.color, fontWeight: 600 }}>{role.category}</span>
                                            <span style={{ color: theme.textFaint }}>📍 {role.location}</span>
                                            <span style={{ color: theme.textFaint }}>⏰ {role.type}</span>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 18, color: theme.textFaint, transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                                </div>

                                {isExpanded && (
                                    <div style={{ marginTop: 18, paddingTop: 18, borderTop: `1px solid ${theme.borderSubtle}` }}>
                                        <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, margin: '0 0 18px' }}>{role.desc}</p>
                                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 24 }}>
                                            <div>
                                                <span style={{ fontSize: 12, fontWeight: 700, color: theme.text, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>Requirements</span>
                                                {role.requirements.map((r, j) => (
                                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: theme.textMuted, marginBottom: 6 }}>
                                                        <span style={{ color: role.color, fontWeight: 700 }}>•</span> {r}
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <span style={{ fontSize: 12, fontWeight: 700, color: theme.text, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>Perks</span>
                                                {role.perks.map((p, j) => (
                                                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: theme.textMuted, marginBottom: 6 }}>
                                                        <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span> {p}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ marginTop: 18 }}>
                                            <Link href="/contact" style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                                padding: '12px 24px', borderRadius: 14,
                                                background: `linear-gradient(135deg, ${role.color}, ${role.color}dd)`,
                                                color: '#fff', fontWeight: 700, fontSize: 14,
                                                fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                                                transition: 'transform 0.2s ease',
                                            }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >Apply for {role.title} →</Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ JOIN CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <div style={{
                    background: isDark ? 'linear-gradient(135deg, rgba(8,145,178,0.06), rgba(8,145,178,0.02))' : 'linear-gradient(135deg, rgba(8,145,178,0.06), rgba(8,145,178,0.02))',
                    border: '1px solid rgba(8,145,178,0.15)', borderRadius: 28, padding: isMobile ? '32px 24px' : '48px 48px',
                }}>
                    <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>🍁</span>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 12px' }}>
                        Don&apos;t see your role?
                    </h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 24px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
                        We&apos;re always looking for passionate people who care about their community. Send us a message — let&apos;s talk.
                    </p>
                    <Link href="/contact" style={{
                        display: 'inline-block', padding: '16px 40px', borderRadius: 14,
                        background: `linear-gradient(135deg, ${teal}, #06b6d4)`,
                        color: '#fff', fontWeight: 700, fontSize: 16,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(8,145,178,0.25)', transition: 'transform 0.2s ease',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >Get in Touch →</Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
