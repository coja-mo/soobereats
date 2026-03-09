"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const FLEET = [
    { name: 'Cadillac VISTIQ', class: 'Premium', type: 'SUV', range: '483 km', seats: 5, image: '🚙', accel: '0-100 in 5.4s', features: ['Massaging seats', 'AKG Studio audio', '33" OLED display', 'Night Vision'], color: '#3b82f6' },
    { name: 'GMC Hummer EV SUV', class: 'XL', type: 'SUV', range: '505 km', seats: 6, image: '🛻', accel: '0-100 in 3.5s', features: ['CrabWalk mode', 'Infinity Roof', '1,000 HP', 'Adaptive Air Ride'], color: '#ef4444' },
    { name: 'Hyundai IONIQ 5', class: 'Standard', type: 'Crossover', range: '488 km', seats: 5, image: '🚗', accel: '0-100 in 5.2s', features: ['V2L power outlet', 'Relaxion seats', 'Bose premium audio', 'Highway Driving Assist'], color: '#06b6d4' },
    { name: 'Honda Prologue', class: 'Standard', type: 'SUV', range: '476 km', seats: 5, image: '🚙', accel: '0-100 in 6.1s', features: ['11.3" touchscreen', 'Google Built-In', 'Hands-free tailgate', 'Wireless CarPlay'], color: '#10b981' },
    { name: 'Honda Accord Hybrid', class: 'Eco', type: 'Sedan', range: '880 km', seats: 5, image: '🚗', accel: '0-100 in 7.5s', features: ['204 HP hybrid', '5.5L/100km', 'Honda SENSING 360', '12-speaker Bose'], color: '#8b5cf6' },
    { name: 'BYD Atto 3', class: 'Standard', type: 'Compact SUV', range: '420 km', seats: 5, image: '🚙', accel: '0-100 in 7.3s', features: ['Blade Battery', 'Rotating 12.8" screen', 'NFC key', 'Heat pump HVAC'], color: '#f59e0b' },
    { name: 'BYD Dolphin', class: 'Eco', type: 'Hatchback', range: '427 km', seats: 5, image: '🚗', accel: '0-100 in 7.0s', features: ['Ocean-X design', 'Blade Battery', 'V2L capable', 'Compact urban'], color: '#ec4899' },
    { name: 'BYD Seal', class: 'Premium', type: 'Sport Sedan', range: '570 km', seats: 5, image: '🏎️', accel: '0-100 in 3.8s', features: ['530 HP dual motor', 'Cell-to-body tech', 'iTAC torque', 'Harman Kardon'], color: '#0066FF' },
];

const CLASSES = ['All', 'Premium', 'Standard', 'XL', 'Eco'];

export default function FleetPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [activeClass, setActiveClass] = useState('All');
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const filtered = activeClass === 'All' ? FLEET : FLEET.filter(f => f.class === activeClass);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', padding: isMobile ? '60px 16px 48px' : '80px 40px 64px' }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>⚡</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#0066FF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>100% Electric Fleet</span>
                    </div>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 52, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Meet Our{' '}
                        <span style={{ background: 'linear-gradient(135deg, #0066FF, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fleet</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 16 : 19, lineHeight: 1.6, color: theme.textMuted, maxWidth: 580, margin: '0 auto' }}>
                        Every ride in a premium electric vehicle. From the Cadillac VISTIQ to the BYD Seal — zero emissions, maximum luxury.
                    </p>
                </div>
            </section>

            {/* ═══ FLEET STATS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 36px' : '0 40px 48px', maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
                    {[
                        { label: 'Vehicle Models', value: '8', icon: '🚗' },
                        { label: 'Avg Range', value: '531 km', icon: '🔋' },
                        { label: 'Total HP', value: '3,200+', icon: '⚡' },
                        { label: 'CO₂ Emissions', value: '0g', icon: '🌍' },
                    ].map((s, i) => (
                        <div key={i} style={{
                            textAlign: 'center', padding: isMobile ? 16 : 20,
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 18,
                        }}>
                            <span style={{ fontSize: 22, display: 'block', marginBottom: 6 }}>{s.icon}</span>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, color: '#0066FF' }}>{s.value}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: theme.textFaint }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ CLASS FILTER ═══ */}
            <section style={{ padding: '0 16px 24px', maxWidth: 500, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', borderRadius: 14, padding: 4, gap: 2 }}>
                    {CLASSES.map(c => (
                        <button key={c} onClick={() => setActiveClass(c)} style={{
                            padding: '8px 16px', borderRadius: 10, border: 'none',
                            background: activeClass === c ? (isDark ? 'rgba(255,255,255,0.1)' : '#fff') : 'transparent',
                            color: activeClass === c ? theme.text : theme.textFaint,
                            fontWeight: 700, fontSize: 12, cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: activeClass === c ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                            transition: 'all 0.2s',
                        }}>{c}</button>
                    ))}
                </div>
            </section>

            {/* ═══ FLEET GRID ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                    {filtered.map((car, i) => (
                        <div key={i} onClick={() => setSelectedCar(selectedCar === i ? null : i)} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${selectedCar === i ? `${car.color}50` : theme.borderSubtle}`,
                            borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
                            transition: 'all 0.3s',
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {/* Car Header */}
                            <div style={{ padding: isMobile ? 20 : 24 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <div>
                                        <span style={{ fontSize: 10, fontWeight: 800, color: car.color, textTransform: 'uppercase', letterSpacing: '0.06em', background: `${car.color}12`, padding: '2px 8px', borderRadius: 6 }}>{car.class}</span>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 20, color: theme.text, margin: '6px 0 0' }}>{car.name}</h3>
                                        <span style={{ fontSize: 12, color: theme.textFaint }}>{car.type}</span>
                                    </div>
                                    <span style={{ fontSize: 36 }}>{car.image}</span>
                                </div>

                                {/* Quick Stats */}
                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                    {[
                                        { label: 'Range', val: car.range },
                                        { label: 'Seats', val: car.seats },
                                        { label: 'Accel', val: car.accel },
                                    ].map((s, j) => (
                                        <div key={j} style={{ fontSize: 12 }}>
                                            <span style={{ color: theme.textFaint }}>{s.label}: </span>
                                            <span style={{ fontWeight: 700, color: car.color }}>{s.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Expandable Features */}
                            {selectedCar === i && (
                                <div style={{
                                    borderTop: `1px solid ${theme.borderSubtle}`, padding: isMobile ? 16 : 20,
                                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                                    animation: 'fleetExpand 0.3s ease-out',
                                }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Features</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {car.features.map((f, k) => (
                                            <span key={k} style={{
                                                fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 8,
                                                background: `${car.color}10`, color: car.color,
                                            }}>{f}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <div style={{ width: '100%', height: 1, marginBottom: 36, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 26, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>Experience Electric Luxury</h2>
                <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 auto 20px', maxWidth: 420 }}>
                    Book your first Soobér ride and experience the future of mobility in the Soo.
                </p>
            </section>

            <style>{`
                @keyframes fleetExpand {
                    from { opacity: 0; max-height: 0; }
                    to { opacity: 1; max-height: 200px; }
                }
            `}</style>

            <Footer />
        </div>
    );
}
