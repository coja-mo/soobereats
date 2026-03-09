"use client";

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime;
        let raf;
        const animate = (ts) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCount(Math.floor(eased * target));
            if (progress < 1) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [target, duration, start]);
    return count;
}

const IMPACT_STATS = [
    { label: 'Zero-Emission Deliveries', value: 12847, suffix: '', icon: '📦', color: '#22c55e' },
    { label: 'kg CO₂ Avoided', value: 48200, suffix: '', icon: '🌍', color: '#06b6d4' },
    { label: 'Trees Worth of Carbon', value: 2410, suffix: '', icon: '🌳', color: '#10b981' },
    { label: 'Electric km Driven', value: 98400, suffix: '', icon: '⚡', color: '#0066FF' },
];

const COMMITMENTS = [
    { icon: '🔋', title: '100% Electric Fleet', desc: 'Every vehicle in our fleet is fully electric or hybrid. Zero tailpipe emissions, zero compromise. Our fleet includes EVs from Cadillac, GMC, Hyundai, Honda, and BYD.', stat: '0g CO₂/km' },
    { icon: '📦', title: 'Eco-Packaging Program', desc: 'We provide our restaurant partners with compostable, plant-based packaging at no extra cost. No styrofoam, no single-use plastics.', stat: '100% compostable' },
    { icon: '🏘️', title: 'Hyperlocal Operations', desc: 'All data processing happens on-premise using Mac Studio compute nodes. No data leaves the Algoma District. Shorter supply chains, lower footprint.', stat: '0 external servers' },
    { icon: '🤝', title: 'Local-First Economy', desc: 'Every order supports a locally-owned business. Soobér charges 15% commission — half of what national apps take — keeping more money in the community.', stat: '85¢ of every $1 stays local' },
    { icon: '⚡', title: 'Green Charging', desc: 'Our fleet charges using Ontario\'s 90%+ clean energy grid (nuclear + hydro). We\'re exploring partnerships with local solar co-ops for dedicated charging.', stat: '90%+ clean grid' },
    { icon: '📉', title: 'Route Optimization AI', desc: 'Our dispatch AI minimizes driving distance by 22% on average through intelligent batching and routing. Fewer kilometers = less energy consumed.', stat: '-22% distance' },
];

const MONTHLY_DATA = [
    { month: 'Oct', deliveries: 850, co2: 3200, km: 7800 },
    { month: 'Nov', deliveries: 1240, co2: 4650, km: 11200 },
    { month: 'Dec', deliveries: 1890, co2: 7100, km: 16800 },
    { month: 'Jan', deliveries: 2340, co2: 8800, km: 20100 },
    { month: 'Feb', deliveries: 2870, co2: 10750, km: 22400 },
    { month: 'Mar', deliveries: 3657, co2: 13700, km: 20100 },
];

export default function ImpactPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [visible, setVisible] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Trigger counter on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.3 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const maxDeliveries = Math.max(...MONTHLY_DATA.map(d => d.deliveries));
    const green = '#22c55e';

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', padding: isMobile ? '60px 16px 48px' : '80px 40px 64px' }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, ${green}18 0%, ${green}05 40%, transparent 70%)`, pointerEvents: 'none', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${green}10`, border: `1px solid ${green}25`, borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>🌱</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: green, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sustainability Report</span>
                    </div>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 56, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Our{' '}
                        <span style={{ background: `linear-gradient(135deg, ${green}, #10b981, #06b6d4)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Impact</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>
                        Every ride, every delivery, every order — powered by clean energy. Here&apos;s the impact we&apos;re making together.
                    </p>
                </div>
            </section>

            {/* ═══ ANIMATED STATS ═══ */}
            <section ref={statsRef} style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 14 }}>
                    {IMPACT_STATS.map((s, i) => {
                        const count = useCounter(s.value, 2000 + i * 200, visible);
                        return (
                            <div key={i} style={{
                                textAlign: 'center', padding: isMobile ? 20 : 28,
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: `1px solid ${theme.borderSubtle}`, borderRadius: 22,
                            }}>
                                <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{s.icon}</span>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : 36, color: s.color, letterSpacing: '-0.03em' }}>
                                    {count.toLocaleString()}{s.suffix}
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 600, color: theme.textMuted, marginTop: 4 }}>{s.label}</div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ═══ GROWTH CHART ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>Monthly Growth</h2>
                <div style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 16 : 28,
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 12, height: 180 }}>
                        {MONTHLY_DATA.map((d, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: green }}>{d.deliveries.toLocaleString()}</span>
                                <div style={{
                                    width: '100%', borderRadius: 8,
                                    height: `${(d.deliveries / maxDeliveries) * 140}px`,
                                    background: `linear-gradient(180deg, ${green}, ${green}80)`,
                                    transition: 'height 0.5s ease',
                                }} />
                                <span style={{ fontSize: 11, fontWeight: 600, color: theme.textFaint }}>{d.month}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 12, fontSize: 12, color: theme.textFaint }}>Zero-emission deliveries per month</div>
                </div>
            </section>

            {/* ═══ COMMITMENTS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1100, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>Our Commitments</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                    {COMMITMENTS.map((c, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 20 : 24,
                            display: 'flex', gap: 16, alignItems: 'flex-start',
                            transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${green}44`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span style={{ fontSize: 28, flexShrink: 0 }}>{c.icon}</span>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 4px' }}>{c.title}</h3>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 8px' }}>{c.desc}</p>
                                <span style={{ fontSize: 11, fontWeight: 700, color: green, background: `${green}12`, padding: '3px 10px', borderRadius: 8 }}>{c.stat}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: 36, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 26, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>Every Order Makes a Difference</h2>
                <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 auto 20px', maxWidth: 420 }}>
                    When you choose Soobér, you choose a greener future for Sault Ste. Marie.
                </p>
            </section>

            <Footer />
        </div>
    );
}
