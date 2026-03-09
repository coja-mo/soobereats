"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const SOLUTIONS = [
    {
        id: 'delivery',
        icon: '🚗',
        title: 'Delivery Platform',
        tagline: 'List your restaurant on Soobér',
        desc: 'Get your restaurant, café, or eatery on the Soo\'s only locally-owned, 100% electric delivery platform. Fair 15% commission — half what national apps take. White-glove onboarding included.',
        features: ['100% electric fleet delivery', '15% flat commission rate', 'Real-time Kitchen Display System (KDS)', 'Dedicated account manager', 'Free professional photography', 'Weekly performance reports'],
        color: '#0066FF',
        cta: 'Apply to Sell',
        link: '/corporate',
    },
    {
        id: 'sooMrkt',
        icon: '🛍️',
        title: 'Soo MRKT',
        tagline: 'Your artisan shop, amplified',
        desc: 'Join the Soo MRKT — our curated marketplace for local artisans, specialty food producers, and craft makers. Get a full digital storefront with your story, your products, and your brand front and centre.',
        features: ['Full vendor storefront page', 'Custom branding & photography', 'Delivery through Soobér fleet', 'Community-first exposure', 'Zero listing fees for artisans', 'Cross-promotion with partners'],
        color: '#a855f7',
        cta: 'Join Soo MRKT',
        link: '/market',
    },
    {
        id: 'community',
        icon: '🏘️',
        title: 'Community Marketplace',
        tagline: 'Free marketplace for everyone',
        desc: 'Our community-powered marketplace is free for anyone to sell — home bakers, crafters, thrift finds, vehicles. Zero fees, forever. AI-moderated for safety. Think Kijiji meets your neighbourhood bulletin board.',
        features: ['Zero platform fees — forever', 'AI-powered content moderation', 'Seller verification system', 'In-app messaging', 'Delivery integration available', 'Bulletin board & seller spotlights'],
        color: '#d97706',
        cta: 'Start Selling Free',
        link: '/community',
    },
    {
        id: 'fleet',
        icon: '⚡',
        title: 'Fleet & Logistics',
        tagline: 'Electric fleet for hire',
        desc: 'Need delivery logistics? Our 100% electric fleet handles last-mile delivery, event logistics, and seasonal surge capacity. Available for businesses of any size across the Sault and Algoma region.',
        features: ['100% electric vehicles', 'Same-day local delivery', 'Real-time GPS tracking', 'Event & seasonal capacity', 'White-label delivery option', 'Insured & background-checked drivers'],
        color: '#10b981',
        cta: 'Get a Quote',
        link: '/contact',
    },
    {
        id: 'tech',
        icon: '💻',
        title: 'Business Technology',
        tagline: 'Enterprise tools, local prices',
        desc: 'Our vendor technology stack — KDS, POS terminal, inventory management, order analytics, and dispatch systems — is included for all partners. Built specifically for Northern Ontario businesses.',
        features: ['Kitchen Display System (KDS)', 'Touch-optimized POS terminal', 'Real-time order dispatching', 'Inventory & menu management', 'Customer analytics dashboard', 'Enterprise scheduling system'],
        color: '#6366f1',
        cta: 'See the Tech',
        link: '/vendor/kds',
    },
    {
        id: 'events',
        icon: '🎉',
        title: 'Events & Catering',
        tagline: 'Powered by our premium fleet',
        desc: 'From Soo Greyhounds games to corporate events and weddings — our premium fleet (Cadillac VISTIQ, GMC Hummer EV) and catering logistics team handles it all with luxury-grade execution.',
        features: ['Premium vehicle fleet', 'Catering logistics coordination', 'Event staffing support', 'Multi-vendor coordination', 'Real-time event tracking', 'VIP & corporate packages'],
        color: '#ef4444',
        cta: 'Plan an Event',
        link: '/rides/events',
    },
];

const ECO_PACKAGING = [
    { icon: '🛍️', item: 'Delivery Bags', current: 'Plastic bags', solution: 'Unbleached kraft paper (FSC-certified)', benefit: '100% recyclable & compostable', wow: 'Soy-ink branded, modern rustic premium feel' },
    { icon: '📦', item: 'Food Containers', current: 'Styrofoam / plastic', solution: 'Bagasse (sugarcane fibre) clamshells', benefit: 'Oil/grease resistant, compostable', wow: 'Clean, modern, restaurant-grade' },
    { icon: '🏷️', item: 'Sealing Tape', current: 'Plastic tape', solution: 'Water-activated paper tape', benefit: 'Recyclable with cardboard', wow: 'Clean branded seal, eco statement' },
    { icon: '✨', item: 'Logo Stickers', current: 'Vinyl stickers', solution: 'Compostable PLA stickers + soy ink', benefit: 'Decomposes naturally', wow: 'Vibrant colour, premium print quality' },
    { icon: '🌱', item: 'Thank-You Cards', current: 'Card stock', solution: 'Seed paper inserts — plantable!', benefit: 'Grows wildflowers when planted', wow: 'Viral marketing gold — customers share photos' },
    { icon: '🧵', item: 'Premium Bags', current: 'Branded plastic bags', solution: 'Organic cotton drawstring bags', benefit: 'Reusable — becomes walking billboard', wow: 'High-end boutique feel, free ongoing marketing' },
];

const SUSTAINABILITY_PILLARS = [
    { icon: '⚡', title: '100% Electric Fleet', desc: 'Every delivery vehicle in our fleet is fully electric. Zero tailpipe emissions. Every order you receive is a carbon-neutral delivery.', stat: '0g CO₂', statLabel: 'per delivery', color: '#10b981' },
    { icon: '🌱', title: 'Compostable Packaging', desc: 'Kraft paper bags, bagasse containers, paper tape, compostable stickers. Our entire packaging stack returns to the earth.', stat: '100%', statLabel: 'compostable', color: '#22c55e' },
    { icon: '🏘️', title: 'Local-First Economy', desc: 'Every dollar spent on Soobér stays in the Sault. No Silicon Valley shareholders. We reinvest locally — in jobs, infrastructure, and community.', stat: '100%', statLabel: 'local reinvestment', color: '#d97706' },
    { icon: '🌱', title: 'Seed Paper Program', desc: 'Every delivery includes a plantable seed paper card. When customers bury it, it grows into wildflowers. Delivery that literally gives back to the land.', stat: '🌸', statLabel: 'grows wildflowers', color: '#ec4899' },
    { icon: '🔋', title: 'Renewable Infrastructure', desc: 'Our dispatch and compute infrastructure runs on local Mac Studio servers — energy-efficient, powerful, and not shipped to an overseas data centre.', stat: '<50W', statLabel: 'per server', color: '#6366f1' },
    { icon: '♻️', title: 'Zero Waste Goal', desc: 'We\'re working toward zero single-use plastic across all operations by end of 2026. Every bag, sticker, container, and tape — fully compostable or reusable.', stat: '2026', statLabel: 'zero plastic target', color: '#0891b2' },
];

export default function BusinessSolutionsPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeSection, setActiveSection] = useState('solutions');
    const [expandedSolution, setExpandedSolution] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const emerald = '#10b981';
    const emeraldGlow = 'rgba(16,185,129,0.15)';
    const emeraldSubtle = 'rgba(16,185,129,0.08)';

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, transition: 'background 0.3s ease' }}>

            {/* ═══ HERO ═══ */}
            <section style={{
                position: 'relative', overflow: 'hidden',
                padding: isMobile ? '60px 16px 48px' : '80px 40px 64px',
                textAlign: 'center',
            }}>
                <div style={{
                    position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
                    width: 900, height: 900, borderRadius: '50%',
                    background: `radial-gradient(circle, ${emeraldGlow} 0%, rgba(16,185,129,0.05) 40%, transparent 70%)`,
                    pointerEvents: 'none', filter: 'blur(60px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: -100, right: -200,
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: emeraldSubtle, border: '1px solid rgba(16,185,129,0.2)',
                        borderRadius: 100, padding: '8px 20px', marginBottom: 24,
                    }}>
                        <span style={{ fontSize: 16 }}>💼</span>
                        <span style={{
                            fontSize: 12, fontWeight: 700, color: emerald,
                            textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>Business Solutions</span>
                    </div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                        fontSize: isMobile ? 36 : 64, letterSpacing: '-0.04em',
                        lineHeight: 1.05, color: theme.text, margin: '0 0 16px',
                    }}>
                        Grow Your Business{' '}
                        <span style={{
                            background: `linear-gradient(135deg, ${emerald}, #22c55e, #34d399)`,
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Sustainably</span>
                    </h1>

                    <p style={{
                        fontSize: isMobile ? 16 : 20, lineHeight: 1.6,
                        color: theme.textMuted, maxWidth: 620, margin: '0 auto 12px',
                    }}>
                        From delivery and logistics to technology and sustainability — everything your Northern Ontario business needs to thrive. <strong style={{ color: theme.text }}>Locally powered. Zero plastic.</strong>
                    </p>
                    <p style={{
                        fontSize: isMobile ? 14 : 16, lineHeight: 1.6,
                        color: theme.textMuted, maxWidth: 520, margin: '0 auto 32px',
                    }}>
                        The only platform where business growth and environmental responsibility go hand in hand.
                    </p>

                    {/* Quick Stats */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 16 : 40, flexWrap: 'wrap', marginTop: 8 }}>
                        {[
                            { value: '90+', label: 'Local Partners' },
                            { value: '15%', label: 'Flat Commission' },
                            { value: '100%', label: 'Electric Fleet' },
                            { value: '$0', label: 'Plastic Used' },
                        ].map((s, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, fontFamily: "'DM Sans', sans-serif", color: i === 3 ? emerald : theme.text, letterSpacing: '-0.03em' }}>{s.value}</div>
                                <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 2 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECTION TABS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 24px' : '0 40px 24px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{
                    display: 'flex', gap: 4, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    borderRadius: 14, padding: 4, width: 'fit-content',
                }}>
                    {[
                        { id: 'solutions', label: '💼 Solutions', count: SOLUTIONS.length },
                        { id: 'sustainability', label: '🌿 Sustainability', count: SUSTAINABILITY_PILLARS.length },
                        { id: 'packaging', label: '📦 Eco Packaging', count: ECO_PACKAGING.length },
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveSection(tab.id)} style={{
                            padding: isMobile ? '10px 14px' : '10px 20px', borderRadius: 10,
                            background: activeSection === tab.id ? (isDark ? 'rgba(255,255,255,0.08)' : '#fff') : 'transparent',
                            border: activeSection === tab.id ? `1px solid ${theme.borderSubtle}` : '1px solid transparent',
                            color: activeSection === tab.id ? theme.text : theme.textMuted,
                            fontWeight: activeSection === tab.id ? 700 : 500,
                            fontSize: isMobile ? 12 : 13, cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif", transition: 'all 0.2s ease',
                            boxShadow: activeSection === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                        }}>
                            {tab.label}
                            <span style={{
                                marginLeft: 6, fontSize: 10, fontWeight: 700,
                                background: activeSection === tab.id ? `${emerald}20` : 'transparent',
                                color: activeSection === tab.id ? emerald : theme.textFaint,
                                padding: '2px 7px', borderRadius: 6,
                            }}>{tab.count}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ═══ SOLUTIONS GRID ═══ */}
            {activeSection === 'solutions' && (
                <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 36, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>
                        Everything Your Business Needs
                    </h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 32px', lineHeight: 1.6, maxWidth: 600 }}>
                        Whether you&apos;re a restaurant, artisan, crafter, or event planner — we have a solution built just for you.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 18 }}>
                        {SOLUTIONS.map((sol) => (
                            <div key={sol.id} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${expandedSolution === sol.id ? `${sol.color}40` : theme.borderSubtle}`,
                                borderRadius: 24, padding: isMobile ? 24 : 32, transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                            }}
                                onClick={() => setExpandedSolution(expandedSolution === sol.id ? null : sol.id)}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${sol.color}15`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                {/* Top glow */}
                                <div style={{ position: 'absolute', top: -40, right: -40, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${sol.color}10 0%, transparent 70%)` }} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, position: 'relative' }}>
                                    <div style={{ width: 52, height: 52, borderRadius: 16, background: `${sol.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{sol.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 17 : 19, color: theme.text, margin: '0 0 2px', letterSpacing: '-0.02em' }}>{sol.title}</h3>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: sol.color }}>{sol.tagline}</span>
                                    </div>
                                    <span style={{ fontSize: 18, color: theme.textFaint, transition: 'transform 0.3s', transform: expandedSolution === sol.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                                </div>

                                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 14px', position: 'relative' }}>{sol.desc}</p>

                                {/* Expanded features */}
                                {expandedSolution === sol.id && (
                                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${theme.borderSubtle}` }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8, marginBottom: 18 }}>
                                            {sol.features.map((f, j) => (
                                                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: theme.textMuted }}>
                                                    <span style={{ color: sol.color, fontWeight: 700, fontSize: 14 }}>✓</span> {f}
                                                </div>
                                            ))}
                                        </div>
                                        <Link href={sol.link} style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 8,
                                            padding: '10px 22px', borderRadius: 12,
                                            background: `linear-gradient(135deg, ${sol.color}, ${sol.color}dd)`,
                                            color: '#fff', fontWeight: 700, fontSize: 13,
                                            fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                                            transition: 'transform 0.2s ease',
                                        }}
                                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                        >{sol.cta} →</Link>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ═══ SUSTAINABILITY PILLARS ═══ */}
            {activeSection === 'sustainability' && (
                <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 36, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>
                        🌿 Our Sustainability Commitment
                    </h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 32px', lineHeight: 1.6, maxWidth: 620 }}>
                        We don&apos;t just talk about sustainability — we build it into every delivery, every container, every decision. For our land. For our community. For Northern Ontario.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 18 }}>
                        {SUSTAINABILITY_PILLARS.map((p, i) => (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.borderSubtle}`, borderRadius: 24,
                                padding: isMobile ? 24 : 32, transition: 'all 0.3s ease',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${p.color}44`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                    <span style={{ fontSize: 32 }}>{p.icon}</span>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 20, fontWeight: 800, color: p.color, fontFamily: "'DM Sans', sans-serif" }}>{p.stat}</div>
                                        <div style={{ fontSize: 10, color: theme.textFaint, fontWeight: 600 }}>{p.statLabel}</div>
                                    </div>
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{p.title}</h3>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Sustainability Manifesto */}
                    <div style={{
                        marginTop: 36, background: isDark ? `linear-gradient(135deg, ${emeraldSubtle}, rgba(16,185,129,0.02))` : 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))',
                        border: '1px solid rgba(16,185,129,0.15)', borderRadius: 28, padding: isMobile ? '32px 24px' : '48px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${emeraldGlow} 0%, transparent 60%)`, filter: 'blur(80px)' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <span style={{ fontSize: 48, display: 'block', marginBottom: 20 }}>🍁</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 16px', lineHeight: 1.2 }}>
                                From Our Land,{' '}<span style={{ color: emerald }}>For Our Land</span>
                            </h3>
                            <div style={{ maxWidth: 600, margin: '0 auto', fontSize: 15, color: theme.textMuted, lineHeight: 1.8 }}>
                                <p style={{ margin: '0 0 14px' }}>We live here. We fish in these lakes. Our kids play in these parks. Every decision we make considers the land beneath our feet.</p>
                                <p style={{ margin: '0 0 14px' }}>When you choose Soobér, your food arrives in compostable packaging, delivered by an electric vehicle, supported by a platform that keeps <strong style={{ color: theme.text }}>every dollar local</strong>.</p>
                                <p style={{ margin: 0 }}>By 2026, we will eliminate <strong style={{ color: emerald }}>every piece of single-use plastic</strong> from our operations. Not because it&apos;s trendy — because it&apos;s right.</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ ECO PACKAGING TAB ═══ */}
            {activeSection === 'packaging' && (
                <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 36, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>
                        📦 Eco-Luxury Packaging
                    </h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 32px', lineHeight: 1.6, maxWidth: 620 }}>
                        Luxury quality. Zero plastic. Every item in our packaging stack is either compostable, biodegradable, or reusable. No exceptions.
                    </p>

                    {/* Packaging comparison cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {ECO_PACKAGING.map((pkg, i) => (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.borderSubtle}`, borderRadius: 22,
                                padding: isMobile ? 20 : 28, transition: 'all 0.3s ease',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${emerald}44`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr 1fr 1fr', gap: isMobile ? 12 : 20, alignItems: 'center' }}>
                                    {/* Item */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 28 }}>{pkg.icon}</span>
                                        <div>
                                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text }}>{pkg.item}</div>
                                            <div style={{ fontSize: 11, color: '#ef4444', textDecoration: 'line-through', opacity: 0.6 }}>{pkg.current}</div>
                                        </div>
                                    </div>
                                    {/* Solution */}
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: emerald, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Our Solution</div>
                                        <div style={{ fontSize: 13, color: theme.text, fontWeight: 600 }}>{pkg.solution}</div>
                                    </div>
                                    {/* Eco benefit */}
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: '#0891b2', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Eco Benefit</div>
                                        <div style={{ fontSize: 13, color: theme.textMuted }}>{pkg.benefit}</div>
                                    </div>
                                    {/* Wow factor */}
                                    <div>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Wow Factor</div>
                                        <div style={{ fontSize: 13, color: theme.textMuted }}>{pkg.wow}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Seed Paper Highlight */}
                    <div style={{
                        marginTop: 28, background: isDark ? 'linear-gradient(135deg, rgba(236,72,153,0.06), rgba(236,72,153,0.02))' : 'linear-gradient(135deg, rgba(236,72,153,0.06), rgba(236,72,153,0.02))',
                        border: '1px solid rgba(236,72,153,0.15)', borderRadius: 22, padding: isMobile ? '24px 20px' : '28px 32px',
                        display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: 16, flexDirection: isMobile ? 'column' : 'row',
                    }}>
                        <span style={{ fontSize: 42 }}>🌱</span>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontSize: 16, fontWeight: 700, color: theme.text, display: 'block', marginBottom: 4 }}>&ldquo;Delivery That Grows&rdquo;</span>
                            <span style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6 }}>Every Soobér delivery includes a seed paper card. When buried, it grows into Ontario wildflowers. Customers photograph them and share — organic viral marketing that costs less than a vinyl sticker. <strong style={{ color: '#ec4899' }}>This is the kind of thing people remember.</strong></span>
                        </div>
                    </div>

                    {/* Cost Comparison */}
                    <div style={{ marginTop: 28, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 24 : 32 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: theme.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}>💰 The Real Cost</h3>
                        <p style={{ fontSize: 13, color: theme.textMuted, margin: '0 0 18px', lineHeight: 1.6 }}>Eco packaging costs approximately $0.50–1.10 more per order. Here&apos;s why it pays for itself:</p>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 14 }}>
                            {[
                                { icon: '🏆', title: 'Premium Perception', desc: 'Customers subconsciously associate eco packaging with higher quality' },
                                { icon: '📸', title: 'Free Marketing', desc: 'Seed paper cards get photographed and shared — organic social reach' },
                                { icon: '❤️', title: 'Customer Loyalty', desc: 'Eco-conscious customers return more often and spend more' },
                                { icon: '💚', title: 'Green Add-on', desc: 'Optional $0.50 "Green Delivery" covers 100% of the cost increase' },
                            ].map((b, i) => (
                                <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderRadius: 16, padding: '16px 14px' }}>
                                    <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{b.icon}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, display: 'block', marginBottom: 4 }}>{b.title}</span>
                                    <span style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5 }}>{b.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ WHY SOOBÉR FOR BUSINESS ═══ */}
            <section style={{ padding: isMobile ? '48px 16px' : '64px 40px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 36, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 12px' }}>
                        Why Businesses Choose Soobér
                    </h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
                        We&apos;re not a Silicon Valley app. We&apos;re your neighbours — and that makes all the difference.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                        {
                            icon: '💰', title: 'Half the Commission', desc: 'National apps take 30%. We charge 15%. That\'s thousands back in your pocket every year.', color: '#22c55e'
                        },
                        { icon: '👤', title: 'Real Human Support', desc: 'Your dedicated account manager knows your business by name. No ticket queues. No bots.', color: '#0066FF' },
                        { icon: '📸', title: 'Free Photography', desc: 'Our team photographs your products with studio-quality lighting. Your brand deserves to look premium.', color: '#a855f7' },
                        { icon: '🏘️', title: 'Hyperlocal Focus', desc: 'We only serve the Soo and Algoma. Your business gets top billing — not buried below national chains.', color: '#d97706' },
                        { icon: '📊', title: 'You Own Your Data', desc: 'Full access to your customers, orders, and analytics. Your business intelligence, not ours.', color: '#6366f1' },
                        { icon: '🌿', title: 'Sustainability Built In', desc: 'Electric fleet, compostable packaging, local-first economy. Your brand gets the eco halo automatically.', color: '#10b981' },
                    ].map((b, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 24 : 28,
                            transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = `${b.color}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>{b.icon}</span>
                            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}>{b.title}</h4>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ TESTIMONIALS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                        { quote: "They came to my kitchen, tasted everything, shot professional photos, and built my digital storefront in a day. Who does that?", name: 'Aurora', role: "Aurora's Restaurant", emoji: '🍝' },
                        { quote: "I sell handmade candles. On the Community marketplace it's free to list. Through Soo MRKT I get a full storefront. Both options — incredible.", name: 'Jen M.', role: 'Local Artisan · West End', emoji: '🕯️' },
                        { quote: "The eco packaging blew my mind. My customers literally texted me photos of the seed paper growing flowers. That's marketing money can't buy.", name: 'Marco P.', role: "Sandro's Pizzeria", emoji: '🌱' },
                    ].map((t, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 24 : 28,
                            borderTop: `3px solid ${[emerald, '#d97706', '#ec4899'][i]}`,
                        }}>
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{t.emoji}</span>
                            <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, margin: '0 0 16px', fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
                            <div>
                                <span style={{ fontSize: 14, fontWeight: 700, color: theme.text, display: 'block' }}>{t.name}</span>
                                <span style={{ fontSize: 12, color: theme.textFaint }}>{t.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ FINAL CTA ═══ */}
            <section style={{ padding: isMobile ? '48px 16px 64px' : '48px 40px 80px', maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 36, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 12px' }}>
                    Ready to grow — sustainably?
                </h2>
                <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 28px', lineHeight: 1.6 }}>
                    Join 90+ local businesses already thriving on Soobér. Fair rates. Zero plastic. Real support.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/corporate" style={{
                        padding: '16px 40px', borderRadius: 14,
                        background: `linear-gradient(135deg, ${emerald}, #22c55e)`,
                        color: '#fff', fontWeight: 700, fontSize: 16,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        boxShadow: `0 4px 20px ${emeraldGlow}`, transition: 'transform 0.2s ease',
                        display: 'inline-block',
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >Partner With Us</Link>
                    <Link href="/community" style={{
                        padding: '16px 40px', borderRadius: 14,
                        background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                        color: theme.text, fontWeight: 700, fontSize: 16,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                        display: 'inline-block',
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.borderColor = emerald; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                    >Sell for Free</Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
