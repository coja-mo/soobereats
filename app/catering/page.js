"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const CATERING_PACKAGES = [
    {
        name: 'Office Lunch', emoji: '🏢', guests: '10-25', price: 'From $12/person',
        desc: 'Perfect for team lunches and meetings. Choose from Italian, Indian, or mix-and-match.',
        includes: ['Main entrée per person', 'Side dish', 'Drinks', 'Disposable plates & cutlery'],
        restaurants: ["Aurora's Italian", "Tandoori Gardan", "Giovanni's"],
        color: '#0066FF',
    },
    {
        name: 'Event Platter', emoji: '🎉', guests: '25-50', price: 'From $10/person',
        desc: 'Shareable platters for birthdays, celebrations, and gatherings.',
        includes: ['3 platter options', 'Dessert platter', 'Napkins & serving utensils', 'Delivery & setup'],
        restaurants: ["Aurora's Italian", "Thai Orchid", "Mike's Place"],
        color: '#8b5cf6',
    },
    {
        name: 'Corporate Function', emoji: '💼', guests: '50-200', price: 'Custom quote',
        desc: 'Full-service catering for conferences, galas, and corporate events.',
        includes: ['Custom menu planning', 'Multiple courses', 'Dietary accommodation', 'Dedicated coordinator', 'Setup & cleanup'],
        restaurants: ["Aurora's Italian", "Giovanni's", "Tandoori Gardan"],
        color: '#f59e0b',
    },
    {
        name: 'Game Day Spread', emoji: '🏒', guests: '10-30', price: 'From $15/person',
        desc: 'Wings, pizza, nachos — everything you need for game night.',
        includes: ['3 shareable mains', 'Snack platter', 'Drinks bundle', 'Fan favourites'],
        restaurants: ["Mike's Place", "Aurora's Italian"],
        color: '#ef4444',
    },
];

const PROCESS = [
    { step: '1', title: 'Choose Your Package', desc: 'Select a catering package or request a custom menu.', icon: '📋' },
    { step: '2', title: 'Customize & Confirm', desc: 'Specify guest count, dietary needs, date, and delivery address.', icon: '✏️' },
    { step: '3', title: 'We Coordinate', desc: 'Our team works directly with the restaurant to prepare your order.', icon: '🤝' },
    { step: '4', title: 'Delivered & Set Up', desc: 'Our EV fleet delivers on time. Setup included for 50+ guest orders.', icon: '🚗' },
];

export default function CateringPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [selectedPkg, setSelectedPkg] = useState(null);
    const [formSent, setFormSent] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 40px' : '80px 40px 48px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                    <span style={{ fontSize: 16 }}>🍽️</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Catering</span>
                </div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    Group Orders & Catering
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 480, margin: '0 auto' }}>
                    From team lunches to corporate galas — local food, delivered electric, for any group size.
                </p>
            </section>

            {/* ═══ PROCESS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 36px' : '0 40px 48px', maxWidth: 800, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
                    {PROCESS.map((p, i) => (
                        <div key={i} style={{ textAlign: 'center', padding: 16 }}>
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 6 }}>{p.icon}</span>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 12, color: '#f59e0b', marginBottom: 2 }}>Step {p.step}</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 4px' }}>{p.title}</h3>
                            <p style={{ fontSize: 12, color: theme.textFaint, lineHeight: 1.4, margin: 0 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ PACKAGES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 900, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 16px' }}>Catering Packages</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                    {CATERING_PACKAGES.map((pkg, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${selectedPkg === i ? `${pkg.color}50` : theme.borderSubtle}`,
                            borderRadius: 24, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s',
                        }}
                            onClick={() => setSelectedPkg(selectedPkg === i ? null : i)}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ padding: isMobile ? 18 : 22 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                    <div>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: theme.text, margin: '0 0 2px' }}>{pkg.name}</h3>
                                        <div style={{ fontSize: 12, color: theme.textFaint }}>{pkg.guests} guests</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: 24 }}>{pkg.emoji}</span>
                                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 14, color: pkg.color }}>{pkg.price}</div>
                                    </div>
                                </div>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{pkg.desc}</p>
                            </div>

                            {selectedPkg === i && (
                                <div style={{ borderTop: `1px solid ${theme.borderSubtle}`, padding: isMobile ? 16 : 20, background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' }}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>What&apos;s Included</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                                        {pkg.includes.map((inc, j) => (
                                            <span key={j} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: `${pkg.color}10`, color: pkg.color, fontWeight: 600 }}>✓ {inc}</span>
                                        ))}
                                    </div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Available From</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                        {pkg.restaurants.map((r, j) => (
                                            <span key={j} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', color: theme.text, fontWeight: 600 }}>{r}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ REQUEST FORM ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 500, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? 'rgba(245,158,11,0.03)' : 'rgba(245,158,11,0.02)',
                    border: '1px solid rgba(245,158,11,0.15)', borderRadius: 28, padding: isMobile ? 24 : 32,
                }}>
                    {formSent ? (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <span style={{ fontSize: 40, display: 'block', marginBottom: 10 }}>🎉</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: theme.text, margin: '0 0 6px' }}>Request Received!</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted }}>We&apos;ll reach out within 24 hours to finalize your catering details.</p>
                        </div>
                    ) : (
                        <>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: theme.text, margin: '0 0 14px' }}>Request a Custom Quote</h3>
                            {['Your Name', 'Email', 'Event Date', 'Guest Count', 'Special Requests'].map((label, i) => (
                                <input key={i} placeholder={label} style={{
                                    width: '100%', padding: '10px 14px', borderRadius: 10, border: `1px solid ${theme.border}`,
                                    background: theme.bgInput, color: theme.text, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                                    outline: 'none', boxSizing: 'border-box', marginBottom: 8,
                                }} />
                            ))}
                            <button onClick={() => setFormSent(true)} style={{
                                width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer',
                                fontFamily: "'DM Sans', sans-serif", marginTop: 4,
                            }}>Submit Request →</button>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
