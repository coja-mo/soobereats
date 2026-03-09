"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const DIETARY_FILTERS = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥗', color: '#22c55e', desc: 'No meat. May contain dairy and eggs.', restaurants: ["Aurora's", "Giovanni's", "Thai Orchid", "Tandoori Gardan", "Solo Trattoria"] },
    { id: 'vegan', label: 'Vegan', icon: '🌱', color: '#16a34a', desc: 'No animal products whatsoever.', restaurants: ["Thai Orchid", "Tandoori Gardan", "Soo Fresh Market"] },
    { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾', color: '#f59e0b', desc: 'No wheat, barley, rye, or oats.', restaurants: ["Aurora's", "Thai Orchid", "Tandoori Gardan", "Sushi Yummy", "Mike's Place"] },
    { id: 'halal', label: 'Halal', icon: '☪️', color: '#06b6d4', desc: 'Prepared according to Islamic dietary law.', restaurants: ["Tandoori Gardan", "Shawarma King"] },
    { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛', color: '#8b5cf6', desc: 'No milk, cheese, butter, or cream.', restaurants: ["Thai Orchid", "Sushi Yummy", "Tandoori Gardan"] },
    { id: 'nut-free', label: 'Nut-Free', icon: '🥜', color: '#ef4444', desc: 'No peanuts, tree nuts, or nut-derived ingredients.', restaurants: ["Aurora's", "Giovanni's", "Mike's Place", "Soo Fresh Market"] },
    { id: 'keto', label: 'Keto-Friendly', icon: '🥩', color: '#ec4899', desc: 'High fat, very low carb options available.', restaurants: ["Aurora's", "Mike's Place", "Soo Fresh Market"] },
    { id: 'kosher', label: 'Kosher', icon: '✡️', color: '#3b82f6', desc: 'Prepared according to Jewish dietary law.', restaurants: [] },
];

const ALLERGENS = [
    { name: 'Peanuts', icon: '🥜', severity: 'High' },
    { name: 'Tree Nuts', icon: '🌰', severity: 'High' },
    { name: 'Milk/Dairy', icon: '🥛', severity: 'Medium' },
    { name: 'Eggs', icon: '🥚', severity: 'Medium' },
    { name: 'Wheat/Gluten', icon: '🌾', severity: 'Medium' },
    { name: 'Soy', icon: '🫘', severity: 'Low' },
    { name: 'Fish', icon: '🐟', severity: 'Medium' },
    { name: 'Shellfish', icon: '🦐', severity: 'High' },
    { name: 'Sesame', icon: '🫘', severity: 'Medium' },
];

export default function DietaryPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const activeInfo = DIETARY_FILTERS.find(f => f.id === activeFilter);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 40px' : '80px 40px 48px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                    <span style={{ fontSize: 16 }}>🥗</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Dietary Guide</span>
                </div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    Eat Your Way
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 500, margin: '0 auto' }}>
                    Every dietary need, every allergen — clearly labelled. We take food safety seriously.
                </p>
            </section>

            {/* ═══ DIETARY FILTERS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 16px' }}>Dietary Preferences</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
                    {DIETARY_FILTERS.map((f, i) => (
                        <button key={i} onClick={() => setActiveFilter(activeFilter === f.id ? null : f.id)} style={{
                            padding: 16, borderRadius: 18, border: `1px solid ${activeFilter === f.id ? `${f.color}50` : theme.borderSubtle}`,
                            background: activeFilter === f.id ? `${f.color}08` : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                            cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                        }}>
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 4 }}>{f.icon}</span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: theme.text }}>{f.label}</span>
                        </button>
                    ))}
                </div>

                {/* Selected filter detail */}
                {activeInfo && (
                    <div style={{
                        marginTop: 16, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${activeInfo.color}30`, borderRadius: 22, padding: isMobile ? 20 : 24,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <span style={{ fontSize: 20 }}>{activeInfo.icon}</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, margin: 0 }}>{activeInfo.label}</h3>
                        </div>
                        <p style={{ fontSize: 13, color: theme.textMuted, margin: '0 0 12px' }}>{activeInfo.desc}</p>
                        <div style={{ fontSize: 12, fontWeight: 700, color: theme.textFaint, marginBottom: 6 }}>Available at:</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {activeInfo.restaurants.length > 0 ? activeInfo.restaurants.map((r, j) => (
                                <span key={j} style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 8, background: `${activeInfo.color}10`, color: activeInfo.color }}>{r}</span>
                            )) : (
                                <span style={{ fontSize: 12, color: theme.textFaint }}>No certified restaurants yet — coming soon</span>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* ═══ ALLERGEN TABLE ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 700, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 16px' }}>Common Allergens</h2>
                <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, overflow: 'hidden' }}>
                    {ALLERGENS.map((a, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'center', padding: '12px 18px',
                            borderBottom: i < ALLERGENS.length - 1 ? `1px solid ${theme.borderSubtle}` : 'none',
                        }}>
                            <span style={{ fontSize: 20, marginRight: 12 }}>{a.icon}</span>
                            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: theme.text }}>{a.name}</span>
                            <span style={{
                                fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '3px 8px', borderRadius: 6,
                                background: a.severity === 'High' ? 'rgba(239,68,68,0.1)' : a.severity === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                                color: a.severity === 'High' ? '#ef4444' : a.severity === 'Medium' ? '#f59e0b' : '#22c55e',
                            }}>{a.severity} Risk</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ COMMITMENT ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: 36, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 18 : 22, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>Our Commitment</h2>
                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
                    We work directly with every restaurant partner to maintain accurate allergen and dietary information. Every menu item is tagged at the source. If you have a severe allergy, always confirm with the restaurant directly.
                </p>
            </section>

            <Footer />
        </div>
    );
}
