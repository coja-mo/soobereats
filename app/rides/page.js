"use client";

import { useState, useEffect } from 'react';
import { vehicleClasses, popularDestinations, safetyFeatures, fleetRoster } from '../../lib/data/rides';
import { useTheme } from '../../lib/ThemeContext';
import Link from 'next/link';
import { Footer } from '../../components/Footer';

export default function RidesPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('comfort');
    const [showEstimate, setShowEstimate] = useState(false);
    const [scheduleMode, setScheduleMode] = useState(false);
    const [selectedDest, setSelectedDest] = useState(null);
    const [selectedSafety, setSelectedSafety] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const pad = isMobile ? '0 16px' : '0 40px';
    const electric = '#0066FF';
    const electricBg = 'rgba(0,102,255,0.1)';
    const electricGlow = 'rgba(0,102,255,0.3)';

    const handleEstimate = () => {
        if (pickup && dropoff) setShowEstimate(true);
    };

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, transition: 'background 0.3s ease' }}>

            {/* ═══ Hero Section ═══ */}
            <section style={{
                padding: isMobile ? '60px 16px 40px' : '80px 40px 60px',
                maxWidth: 1440, margin: '0 auto',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Background glow */}
                <div style={{
                    position: 'absolute', top: -200, right: -200,
                    width: 600, height: 600, borderRadius: '50%',
                    background: `radial-gradient(circle, ${electricGlow} 0%, transparent 70%)`,
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />

                <div style={{
                    display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 40 : 60, alignItems: isMobile ? 'stretch' : 'flex-start',
                }}>
                    {/* Left — Copy + Booking */}
                    <div style={{ flex: 1 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: electricBg, border: `1px solid ${electric}33`,
                            borderRadius: 100, padding: '6px 16px', marginBottom: 24,
                        }}>
                            <span style={{ fontSize: 14 }}>⚡</span>
                            <span style={{ fontSize: 13, fontWeight: 600, color: electric, letterSpacing: '-0.01em' }}>
                                100% Electric Fleet
                            </span>
                        </div>

                        <h1 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                            fontSize: isMobile ? 36 : 52, lineHeight: 1.1, letterSpacing: '-0.04em',
                            color: theme.text, margin: '0 0 16px',
                        }}>
                            Go anywhere.<br />
                            <span style={{ color: electric }}>Zero emissions.</span>
                        </h1>

                        <p style={{
                            fontSize: isMobile ? 16 : 18, lineHeight: 1.6,
                            color: theme.textMuted, maxWidth: 480, margin: '0 0 32px',
                        }}>
                            Soobér Rides — the Soo's first all-electric ride-hailing service.
                            On-demand rides, airport transfers, and premium event fleets.
                            No surge pricing. Ever.
                        </p>

                        {/* ─── Booking Card ─── */}
                        <div style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: isMobile ? 20 : 28,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                                {/* Pickup */}
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                                        width: 10, height: 10, borderRadius: '50%', background: electric,
                                        boxShadow: `0 0 8px ${electric}`,
                                    }} />
                                    <input
                                        type="text" placeholder="Pickup location"
                                        value={pickup} onChange={(e) => { setPickup(e.target.value); setShowEstimate(false); }}
                                        style={{
                                            width: '100%', background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                            borderRadius: 14, padding: '14px 18px 14px 40px', fontSize: 15, fontWeight: 500,
                                            color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
                                            transition: 'border 0.2s ease', boxSizing: 'border-box',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = electric}
                                        onBlur={(e) => e.target.style.borderColor = theme.borderSubtle}
                                    />
                                </div>
                                {/* Connector */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 0, paddingLeft: 20 }}>
                                    <div style={{
                                        width: 2, height: 20, background: `linear-gradient(${electric}, ${theme.textFaint})`,
                                    }} />
                                </div>
                                {/* Dropoff */}
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                                        width: 10, height: 10, borderRadius: 3, background: theme.textFaint,
                                    }} />
                                    <input
                                        type="text" placeholder="Where to?"
                                        value={dropoff} onChange={(e) => { setDropoff(e.target.value); setShowEstimate(false); }}
                                        style={{
                                            width: '100%', background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                            borderRadius: 14, padding: '14px 18px 14px 40px', fontSize: 15, fontWeight: 500,
                                            color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
                                            transition: 'border 0.2s ease', boxSizing: 'border-box',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = electric}
                                        onBlur={(e) => e.target.style.borderColor = theme.borderSubtle}
                                    />
                                </div>
                            </div>

                            {/* Schedule toggle */}
                            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                                <button onClick={() => setScheduleMode(false)} style={{
                                    flex: 1, padding: '10px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                                    background: !scheduleMode ? electric : theme.bgInput,
                                    color: !scheduleMode ? '#fff' : theme.textMuted,
                                    fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif",
                                    transition: 'all 0.2s ease',
                                }}>
                                    🚗 Ride Now
                                </button>
                                <button onClick={() => setScheduleMode(true)} style={{
                                    flex: 1, padding: '10px 16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                                    background: scheduleMode ? electric : theme.bgInput,
                                    color: scheduleMode ? '#fff' : theme.textMuted,
                                    fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif",
                                    transition: 'all 0.2s ease',
                                }}>
                                    🕐 Schedule
                                </button>
                            </div>

                            {/* Go button */}
                            <button onClick={handleEstimate} style={{
                                width: '100%', padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
                                background: pickup && dropoff
                                    ? `linear-gradient(135deg, ${electric}, #0044CC)`
                                    : theme.bgInput,
                                color: pickup && dropoff ? '#fff' : theme.textFaint,
                                fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif",
                                letterSpacing: '-0.02em',
                                boxShadow: pickup && dropoff ? `0 4px 20px ${electricGlow}` : 'none',
                                transition: 'all 0.3s ease',
                            }}>
                                {showEstimate ? '✓ Ride Requested!' : 'See Prices'}
                            </button>
                        </div>
                    </div>

                    {/* Right — Vehicle Selector */}
                    <div style={{ flex: 1, maxWidth: isMobile ? '100%' : 520 }}>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                            fontSize: 18, color: theme.text, margin: '0 0 16px', letterSpacing: '-0.02em',
                        }}>
                            Choose your ride
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {vehicleClasses.map((vc) => (
                                <button
                                    key={vc.id}
                                    onClick={() => setSelectedVehicle(vc.id)}
                                    style={{
                                        width: '100%', textAlign: 'left', cursor: 'pointer',
                                        background: selectedVehicle === vc.id
                                            ? (isDark ? 'rgba(0,102,255,0.08)' : 'rgba(0,102,255,0.04)')
                                            : theme.bgCard,
                                        border: selectedVehicle === vc.id
                                            ? `2px solid ${electric}`
                                            : `1px solid ${theme.borderSubtle}`,
                                        borderRadius: 16, padding: isMobile ? 16 : 20,
                                        transition: 'all 0.25s cubic-bezier(0.19, 1, 0.22, 1)',
                                        transform: selectedVehicle === vc.id ? 'scale(1.01)' : 'scale(1)',
                                        boxShadow: selectedVehicle === vc.id ? `0 4px 20px ${electricGlow}` : '0 2px 8px rgba(0,0,0,0.04)',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                        <span style={{ fontSize: 32 }}>{vc.emoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{
                                                    fontWeight: 700, fontSize: 16, color: theme.text,
                                                    fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.02em',
                                                }}>
                                                    {vc.name}
                                                </span>
                                                <span style={{
                                                    fontWeight: 700, fontSize: 15, color: electric,
                                                    fontFamily: "'DM Sans', sans-serif",
                                                }}>
                                                    ${vc.minFare.toFixed(2)}+
                                                </span>
                                            </div>
                                            <p style={{
                                                fontSize: 13, color: theme.textMuted, margin: '4px 0 0',
                                                lineHeight: 1.4,
                                            }}>
                                                {vc.tagline} · up to {vc.capacity} passengers
                                            </p>
                                        </div>
                                    </div>

                                    {selectedVehicle === vc.id && (
                                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.borderSubtle}` }}>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
                                                {vc.features.map((f, i) => (
                                                    <span key={i} style={{
                                                        background: electricBg, color: electric, borderRadius: 8,
                                                        padding: '4px 10px', fontSize: 11, fontWeight: 600,
                                                    }}>
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                            {vc.models && (
                                                <p style={{ fontSize: 12, color: theme.textFaint, margin: 0 }}>
                                                    Vehicles: {vc.models.join(' · ')}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Service Cards ═══ */}
            <section style={{ padding: isMobile ? '40px 16px' : '60px 40px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 28 : 36, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 12px', textAlign: 'center',
                }}>
                    More than just rides
                </h2>
                <p style={{
                    fontSize: 16, color: theme.textMuted, textAlign: 'center',
                    margin: '0 0 40px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto',
                }}>
                    From daily commutes to once-in-a-lifetime celebrations
                </p>

                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: 20,
                }}>
                    {/* Rides Card */}
                    <div style={{
                        background: `linear-gradient(135deg, ${electric}15, ${electric}05)`,
                        border: `1px solid ${electric}33`,
                        borderRadius: 24, padding: isMobile ? 28 : 36, position: 'relative', overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${electricGlow}`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>🚗</span>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 22, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                            Soobér Rides
                        </h3>
                        <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 20px' }}>
                            On-demand rides across the Soo. Tap, ride, arrive — all in a zero-emission EV.
                        </p>
                        <span style={{ fontSize: 13, fontWeight: 600, color: electric }}>You&apos;re here →</span>
                    </div>

                    {/* Airport Card */}
                    <Link href="/rides/airport" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 24, padding: isMobile ? 28 : 36, height: '100%',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = electric; e.currentTarget.style.boxShadow = `0 12px 40px ${electricGlow}`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>✈️</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 22, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                                Soobér Airport
                            </h3>
                            <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 20px' }}>
                                Fixed-rate airport transfers. Schedule ahead, meet-and-greet, zero surprises.
                            </p>
                            <span style={{ fontSize: 13, fontWeight: 600, color: electric }}>Book a transfer →</span>
                        </div>
                    </Link>

                    {/* Events Card */}
                    <Link href="/rides/events" style={{ textDecoration: 'none' }}>
                        <div style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 24, padding: isMobile ? 28 : 36, height: '100%',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = electric; e.currentTarget.style.boxShadow = `0 12px 40px ${electricGlow}`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>💎</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 22, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
                                Soobér Events
                            </h3>
                            <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 20px' }}>
                                Electric Hummers, luxury fleets, red carpet arrivals. Make it unforgettable.
                            </p>
                            <span style={{ fontSize: 13, fontWeight: 600, color: electric }}>Explore fleets →</span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* ═══ Fleet Roster — Cinematic Showcase ═══ */}
            <section style={{ padding: isMobile ? '40px 16px' : '60px 40px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 28 : 40, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 12px', textAlign: 'center',
                }}>
                    The Soobér Fleet
                </h2>
                <p style={{
                    fontSize: isMobile ? 15 : 17, color: theme.textMuted, margin: '0 auto 48px', maxWidth: 600,
                    textAlign: 'center', lineHeight: 1.6,
                }}>
                    13 vehicles. 7 manufacturers. From BYD Dolphins to a Lamborghini Urus SE — the most diverse electrified fleet in Northern Ontario.
                </p>

                {/* ★ Lamborghini Urus SE — Crown Jewel Spotlight */}
                {fleetRoster.filter(v => v.exclusive).map(urus => (
                    <div key={urus.id} style={{
                        marginBottom: 48, borderRadius: 28, overflow: 'hidden',
                        background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)',
                        border: '1px solid rgba(234,179,8,0.2)',
                        boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                        position: 'relative',
                    }}>
                        {/* Gold accent line */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                            background: 'linear-gradient(90deg, transparent, #eab308, transparent)',
                        }} />

                        <div style={{
                            display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                            alignItems: 'stretch',
                        }}>
                            {/* Image */}
                            <div style={{
                                flex: isMobile ? 'auto' : '1 1 55%',
                                minHeight: isMobile ? 240 : 380,
                                background: `url(${urus.heroImage}) center/cover no-repeat`,
                                position: 'relative',
                            }}>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: isMobile
                                        ? 'linear-gradient(to bottom, transparent 40%, #0a0a0a)'
                                        : 'linear-gradient(to right, transparent 60%, #0a0a0a)',
                                }} />
                            </div>

                            {/* Copy */}
                            <div style={{
                                flex: isMobile ? 'auto' : '1 1 45%',
                                padding: isMobile ? '24px 24px 32px' : '48px 48px 48px 32px',
                                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                            }}>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)',
                                    borderRadius: 100, padding: '5px 14px', marginBottom: 16,
                                    alignSelf: 'flex-start',
                                }}>
                                    <span style={{ fontSize: 12 }}>★</span>
                                    <span style={{ fontSize: 11, fontWeight: 800, color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        Executive Exclusive
                                    </span>
                                </div>

                                <div style={{ fontSize: 12, fontWeight: 600, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                                    {urus.year} {urus.make}
                                </div>
                                <h3 style={{
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                                    fontSize: isMobile ? 32 : 42, color: '#fafafa', margin: '0 0 8px',
                                    letterSpacing: '-0.04em', lineHeight: 1.05,
                                }}>
                                    {urus.model}
                                </h3>
                                <p style={{
                                    fontSize: 18, fontStyle: 'italic', color: '#eab308',
                                    margin: '0 0 16px', fontFamily: "'DM Sans', sans-serif",
                                    letterSpacing: '-0.01em',
                                }}>
                                    "{urus.tagline}"
                                </p>
                                <p style={{
                                    fontSize: 14, color: '#a1a1aa', lineHeight: 1.7, margin: '0 0 24px',
                                }}>
                                    {urus.description}
                                </p>

                                {/* Specs row */}
                                <div style={{ display: 'flex', gap: isMobile ? 16 : 28, flexWrap: 'wrap', marginBottom: 20 }}>
                                    {[
                                        { val: '789 HP', label: 'Power' },
                                        { val: '3.4s', label: '0-100 km/h' },
                                        { val: urus.msrp, label: 'MSRP' },
                                        { val: `${urus.seats} seats`, label: 'Capacity' },
                                    ].map((s, i) => (
                                        <div key={i}>
                                            <div style={{ fontSize: 20, fontWeight: 800, color: '#fafafa', fontFamily: "'DM Sans', sans-serif" }}>{s.val}</div>
                                            <div style={{ fontSize: 11, color: '#71717a' }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Highlights */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {urus.highlights.map((h, i) => (
                                        <span key={i} style={{
                                            fontSize: 10, fontWeight: 700, color: '#eab308',
                                            background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)',
                                            borderRadius: 8, padding: '4px 10px',
                                        }}>
                                            {h}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Fleet Grid — All vehicles */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: 20,
                }}>
                    {fleetRoster.filter(v => !v.exclusive).map((vehicle) => (
                        <div key={vehicle.id} style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,0,0,0.12)`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            {/* Image or Gradient fallback */}
                            {vehicle.heroImage ? (
                                <div style={{
                                    height: 200,
                                    background: `url(${vehicle.heroImage}) center/cover no-repeat`,
                                    position: 'relative',
                                }}>
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                                        background: `linear-gradient(transparent, ${isDark ? theme.bgCard : '#fff'})`,
                                    }} />
                                </div>
                            ) : (
                                <div style={{
                                    background: `linear-gradient(135deg, ${vehicle.color}dd, ${vehicle.color}88)`,
                                    padding: '32px 20px', textAlign: 'center',
                                }}>
                                    <span style={{ fontSize: 48, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
                                        {vehicle.emoji}
                                    </span>
                                </div>
                            )}

                            <div style={{ padding: '18px 22px 22px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {vehicle.year} {vehicle.make}
                                    </span>
                                    <span style={{
                                        fontSize: 10, fontWeight: 600, color: electric,
                                        background: electricBg, borderRadius: 6, padding: '2px 8px',
                                    }}>
                                        {vehicle.powertrain}
                                    </span>
                                </div>
                                <h4 style={{
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                    fontSize: 20, color: theme.text, margin: '2px 0 4px', letterSpacing: '-0.02em',
                                }}>
                                    {vehicle.model}
                                </h4>
                                {vehicle.tagline && (
                                    <p style={{
                                        fontSize: 13, fontStyle: 'italic', color: electric,
                                        margin: '0 0 8px', fontWeight: 500,
                                    }}>
                                        "{vehicle.tagline}"
                                    </p>
                                )}
                                <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5, margin: '0 0 12px' }}>
                                    {vehicle.type} · {vehicle.seats} seats · {vehicle.range}
                                </p>

                                {/* Highlights */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                                    {vehicle.highlights.slice(0, 3).map((h, i) => (
                                        <span key={i} style={{
                                            fontSize: 10, fontWeight: 600, color: theme.textMuted,
                                            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                            borderRadius: 6, padding: '3px 8px',
                                        }}>
                                            {h}
                                        </span>
                                    ))}
                                </div>

                                {/* Tier badges */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                    {vehicle.tier.map((t, i) => (
                                        <span key={i} style={{
                                            fontSize: 10, fontWeight: 700, color: electric,
                                            background: electricBg, border: `1px solid ${electric}33`,
                                            borderRadius: 8, padding: '3px 10px',
                                        }}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Popular Destinations ═══ */}
            <section style={{ padding: isMobile ? '40px 16px' : '60px 40px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 24 : 32, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 8px',
                }}>
                    Popular destinations
                </h2>
                <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 0 24px' }}>
                    Tap any destination for details, tips, and features
                </p>

                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: 12,
                }}>
                    {popularDestinations.map((dest, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedDest(dest)}
                            style={{
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                borderRadius: 16, padding: '16px', textAlign: 'left', cursor: 'pointer',
                                transition: 'all 0.25s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = electric; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{dest.emoji}</span>
                            <span style={{
                                fontWeight: 600, fontSize: 14, color: theme.text, display: 'block',
                                fontFamily: "'Inter', sans-serif",
                            }}>
                                {dest.name}
                            </span>
                            <span style={{ fontSize: 13, color: electric, fontWeight: 600, marginTop: 4, display: 'block' }}>
                                {dest.estimate}
                            </span>
                            <span style={{ fontSize: 11, color: theme.textMuted, marginTop: 4, display: 'block' }}>Tap for details →</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ═══ Destination Detail Modal ═══ */}
            {selectedDest && (
                <div onClick={() => setSelectedDest(null)} style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 20, animation: 'fadeIn 0.2s ease',
                }}>
                    <div onClick={(e) => e.stopPropagation()} style={{
                        background: isDark ? '#18181b' : '#fff',
                        borderRadius: 24, maxWidth: 520, width: '100%',
                        border: `1px solid ${theme.borderSubtle}`,
                        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
                        overflow: 'hidden', animation: 'slideUp 0.3s ease',
                    }}>
                        {/* Header */}
                        <div style={{
                            background: `linear-gradient(135deg, ${electric}15, ${electric}05)`,
                            padding: '28px 28px 20px', borderBottom: `1px solid ${theme.borderSubtle}`,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <span style={{ fontSize: 36, display: 'block', marginBottom: 8 }}>{selectedDest.emoji}</span>
                                    <h3 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                                        fontSize: 22, color: theme.text, margin: '0 0 4px', letterSpacing: '-0.02em',
                                    }}>
                                        {selectedDest.name}
                                    </h3>
                                    <span style={{ fontSize: 22, fontWeight: 800, color: electric }}>{selectedDest.estimate}</span>
                                </div>
                                <button onClick={() => setSelectedDest(null)} style={{
                                    background: 'none', border: 'none', color: theme.textMuted,
                                    fontSize: 24, cursor: 'pointer', padding: 4,
                                }}>✕</button>
                            </div>
                        </div>
                        {/* Body */}
                        <div style={{ padding: '24px 28px' }}>
                            <p style={{ fontSize: 12, color: theme.textFaint, margin: '0 0 4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</p>
                            <p style={{ fontSize: 14, color: theme.text, margin: '0 0 16px', lineHeight: 1.4 }}>{selectedDest.address}</p>

                            <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 16px' }}>{selectedDest.description}</p>

                            <div style={{
                                background: isDark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.06)',
                                border: '1px solid rgba(16,185,129,0.2)',
                                borderRadius: 12, padding: '12px 16px', marginBottom: 16,
                            }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', display: 'block', marginBottom: 4 }}>💡 Pro Tip</span>
                                <span style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5 }}>{selectedDest.tip}</span>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {selectedDest.features.map((f, i) => (
                                    <span key={i} style={{
                                        fontSize: 11, fontWeight: 600, color: electric,
                                        background: electricBg, border: `1px solid ${electric}33`,
                                        borderRadius: 8, padding: '4px 10px',
                                    }}>{f}</span>
                                ))}
                            </div>

                            <button onClick={() => { setDropoff(selectedDest.name); setSelectedDest(null); }} style={{
                                marginTop: 20, width: '100%', padding: '14px',
                                background: electric, color: '#fff', border: 'none',
                                borderRadius: 14, fontWeight: 700, fontSize: 15,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                            }}>
                                Ride here — {selectedDest.estimate}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ═══ Safety Section ═══ */}
            <section style={{
                padding: isMobile ? '40px 16px' : '60px 40px', maxWidth: 1440, margin: '0 auto',
            }}>
                <div style={{
                    background: isDark
                        ? `linear-gradient(135deg, rgba(0,102,255,0.06), rgba(0,102,255,0.02))`
                        : `linear-gradient(135deg, rgba(0,102,255,0.08), rgba(0,102,255,0.03))`,
                    border: `1px solid ${electric}22`,
                    borderRadius: 28, padding: isMobile ? 28 : 48,
                }}>
                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                        fontSize: isMobile ? 24 : 32, letterSpacing: '-0.04em',
                        color: theme.text, margin: '0 0 8px', textAlign: 'center',
                    }}>
                        Safe. Local. Electric.
                    </h2>
                    <p style={{
                        fontSize: 15, color: theme.textMuted, textAlign: 'center',
                        margin: '0 auto 36px', maxWidth: 420,
                    }}>
                        Every ride supports the local economy and produces zero tailpipe emissions. Tap to learn more.
                    </p>

                    <div style={{
                        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: 20,
                    }}>
                        {safetyFeatures.map((sf, i) => (
                            <div key={i}
                                onClick={() => setSelectedSafety(selectedSafety?.title === sf.title ? null : sf)}
                                style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                                    borderRadius: 16, padding: 20, textAlign: 'center',
                                    border: selectedSafety?.title === sf.title ? `1px solid ${electric}` : `1px solid ${theme.borderSubtle}`,
                                    cursor: 'pointer', transition: 'all 0.3s ease',
                                    transform: selectedSafety?.title === sf.title ? 'translateY(-2px)' : 'none',
                                    boxShadow: selectedSafety?.title === sf.title ? `0 8px 24px ${electric}22` : 'none',
                                }}
                                onMouseEnter={(e) => { if (selectedSafety?.title !== sf.title) e.currentTarget.style.borderColor = `${electric}66`; }}
                                onMouseLeave={(e) => { if (selectedSafety?.title !== sf.title) e.currentTarget.style.borderColor = theme.borderSubtle; }}
                            >
                                <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{sf.emoji}</span>
                                <h4 style={{
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                    fontSize: 15, color: theme.text, margin: '0 0 6px',
                                }}>
                                    {sf.title}
                                </h4>
                                <p style={{
                                    fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0,
                                }}>
                                    {sf.description}
                                </p>
                                {selectedSafety?.title === sf.title && sf.details && (
                                    <div style={{
                                        marginTop: 16, textAlign: 'left',
                                        borderTop: `1px solid ${theme.borderSubtle}`, paddingTop: 12,
                                        animation: 'fadeIn 0.3s ease',
                                    }}>
                                        {sf.details.map((d, j) => (
                                            <div key={j} style={{
                                                display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8,
                                            }}>
                                                <span style={{ color: electric, fontWeight: 700, fontSize: 12, marginTop: 1 }}>✓</span>
                                                <span style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }}>{d}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <span style={{ display: 'block', fontSize: 11, color: electric, fontWeight: 600, marginTop: 10 }}>
                                    {selectedSafety?.title === sf.title ? 'Tap to close ▲' : 'Tap to learn more ▼'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section style={{
                padding: isMobile ? '40px 16px 80px' : '60px 40px 100px',
                maxWidth: 1440, margin: '0 auto', textAlign: 'center',
            }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 28 : 40, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 16px',
                }}>
                    Ready to ride <span style={{ color: electric }}>electric</span>?
                </h2>
                <p style={{
                    fontSize: 16, color: theme.textMuted, margin: '0 auto 32px', maxWidth: 400,
                }}>
                    First ride is on us. Use code <strong style={{ color: electric }}>SOOELECTRIC</strong> for a free ride up to $15.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{
                            padding: '16px 36px', borderRadius: 14, border: 'none', cursor: 'pointer',
                            background: `linear-gradient(135deg, ${electric}, #0044CC)`,
                            color: '#fff', fontWeight: 700, fontSize: 16,
                            fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.02em',
                            boxShadow: `0 4px 20px ${electricGlow}`,
                            transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Book a Ride
                    </button>
                    <Link href="/rides/events" style={{
                        padding: '16px 36px', borderRadius: 14, textDecoration: 'none',
                        background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                        color: theme.text, fontWeight: 700, fontSize: 16,
                        fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.02em',
                        transition: 'transform 0.2s ease, border-color 0.2s ease',
                        display: 'inline-block',
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.borderColor = electric; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                    >
                        Explore Events
                    </Link>
                </div>
            </section>

            {/* ═══ E-SCOOTERS / MICRO-MOBILITY ═══ */}
            <section style={{
                padding: isMobile ? '60px 16px' : '80px 40px', maxWidth: 1440, margin: '0 auto',
            }}>
                <div style={{
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))'
                        : 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))',
                    border: '1px solid rgba(16,185,129,0.2)',
                    borderRadius: 28, padding: isMobile ? 28 : 48, overflow: 'hidden',
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute', top: -60, right: -60,
                        width: 300, height: 300, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)',
                            borderRadius: 100, padding: '6px 16px', marginBottom: 20,
                        }}>
                            <span style={{ fontSize: 14 }}>🛴</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Micro-Mobility</span>
                        </div>

                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                            fontSize: isMobile ? 28 : 40, letterSpacing: '-0.04em',
                            color: theme.text, margin: '0 0 12px', lineHeight: 1.1,
                        }}>
                            Soobér <span style={{ color: '#10b981' }}>Scooters</span>
                        </h2>
                        <p style={{
                            fontSize: isMobile ? 15 : 17, color: theme.textMuted,
                            maxWidth: 520, margin: '0 0 36px', lineHeight: 1.6,
                        }}>
                            Hop on, ride electric, park anywhere in the zone. The fastest way to get around downtown Sault Ste. Marie — zero emissions, pure freedom.
                        </p>

                        {/* Pricing Plans */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: 16, marginBottom: 36,
                        }}>
                            {[
                                { title: 'Single Ride', price: '$1.50', unit: 'unlock + $0.35/min', desc: 'Perfect for a quick trip across downtown', emoji: '⚡', highlight: false },
                                { title: 'Day Pass', price: '$12', unit: '/day', desc: 'Unlimited 30-min rides all day. Explore the Soo at your pace.', emoji: '☀️', highlight: true },
                                { title: 'Monthly Pass', price: '$39', unit: '/month', desc: 'Unlimited 45-min rides. Best value for daily commuters and students.', emoji: '🏆', highlight: false },
                            ].map((plan, i) => (
                                <div key={i} style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                                    borderRadius: 20, padding: '24px 20px',
                                    border: plan.highlight ? '2px solid #10b981' : `1px solid ${theme.borderSubtle}`,
                                    position: 'relative', overflow: 'hidden',
                                }}>
                                    {plan.highlight && (
                                        <div style={{
                                            position: 'absolute', top: 12, right: 12,
                                            fontSize: 10, fontWeight: 700, color: '#fff',
                                            background: '#10b981', borderRadius: 8, padding: '3px 10px',
                                            textTransform: 'uppercase', letterSpacing: '0.05em',
                                        }}>Best Value</div>
                                    )}
                                    <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{plan.emoji}</span>
                                    <h4 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                        fontSize: 15, color: theme.text, margin: '0 0 4px',
                                    }}>{plan.title}</h4>
                                    <div style={{ marginBottom: 8 }}>
                                        <span style={{ fontSize: 28, fontWeight: 800, color: '#10b981' }}>{plan.price}</span>
                                        <span style={{ fontSize: 13, color: theme.textMuted, marginLeft: 4 }}>{plan.unit}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{plan.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Coverage Zones */}
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                            fontSize: 18, color: theme.text, margin: '0 0 16px',
                        }}>Coverage Zones</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                            gap: 12, marginBottom: 36,
                        }}>
                            {[
                                { zone: 'Downtown Core', streets: 'Queen St to Bay St', emoji: '🏙️' },
                                { zone: 'Waterfront Trail', streets: 'Boardwalk to Canal', emoji: '🌊' },
                                { zone: 'Queen St Corridor', streets: 'Pine to Trunk Rd', emoji: '🛤️' },
                                { zone: 'Campus Zone', streets: 'Algoma U & Sault College', emoji: '🎓' },
                            ].map((z, i) => (
                                <div key={i} style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
                                    borderRadius: 14, padding: '16px', textAlign: 'center',
                                    border: `1px solid ${theme.borderSubtle}`,
                                }}>
                                    <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{z.emoji}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, display: 'block' }}>{z.zone}</span>
                                    <span style={{ fontSize: 11, color: theme.textMuted }}>{z.streets}</span>
                                </div>
                            ))}
                        </div>

                        {/* How Scooters Work */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            gap: 12, marginBottom: 24,
                        }}>
                            {[
                                { step: '1', title: 'Find', desc: 'Locate a nearby scooter on the Soobér app map', emoji: '📍' },
                                { step: '2', title: 'Scan', desc: 'Scan the QR code to unlock — it\'s instant', emoji: '📱' },
                                { step: '3', title: 'Ride', desc: 'Cruise the Soo at up to 25 km/h. Helmets encouraged!', emoji: '🛴' },
                                { step: '4', title: 'Park', desc: 'Park responsibly in any zone. Lock in the app to end trip.', emoji: '🅿️' },
                            ].map((s, i) => (
                                <div key={i} style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
                                    borderRadius: 14, padding: '16px', textAlign: 'center',
                                    border: `1px solid ${theme.borderSubtle}`,
                                }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: '#10b981', color: '#fff', fontWeight: 700, fontSize: 13,
                                        marginBottom: 8,
                                    }}>{s.step}</span>
                                    <span style={{ fontSize: 20, display: 'block', marginBottom: 4 }}>{s.emoji}</span>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: theme.text, display: 'block', marginBottom: 2 }}>{s.title}</span>
                                    <span style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }}>{s.desc}</span>
                                </div>
                            ))}
                        </div>

                        {/* Safety */}
                        <div style={{
                            background: isDark ? 'rgba(234,179,8,0.06)' : 'rgba(234,179,8,0.04)',
                            border: '1px solid rgba(234,179,8,0.15)', borderRadius: 14,
                            padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12,
                        }}>
                            <span style={{ fontSize: 20 }}>⚠️</span>
                            <div>
                                <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, display: 'block', marginBottom: 4 }}>Safety First</span>
                                <span style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5 }}>
                                    Riders must be 16+. Helmets strongly encouraged. Stay in bike lanes where available. Max speed 25 km/h. Do not ride on sidewalks. Park upright in designated zones. Report damaged scooters in-app.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ BOARDWALK E-SCOOTER RENTALS ═══ */}
            <section style={{
                padding: isMobile ? '60px 16px' : '80px 40px', maxWidth: 1440, margin: '0 auto',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Background glow */}
                <div style={{
                    position: 'absolute', top: -80, left: -120,
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(8,145,178,0.10) 0%, transparent 65%)',
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: -100, right: -80,
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(60px)',
                }} />

                {/* Divider */}
                <div style={{
                    width: '100%', height: 1, marginBottom: isMobile ? 48 : 64,
                    background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)`,
                }} />

                <div style={{
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(8,145,178,0.06), rgba(8,145,178,0.02))'
                        : 'linear-gradient(135deg, rgba(8,145,178,0.08), rgba(8,145,178,0.03))',
                    border: '1px solid rgba(8,145,178,0.2)',
                    borderRadius: 28, padding: isMobile ? 28 : 48, position: 'relative', overflow: 'hidden',
                }}>
                    {/* Decorative wave */}
                    <div style={{
                        position: 'absolute', top: -60, right: -60,
                        width: 300, height: 300, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(8,145,178,0.10) 0%, transparent 70%)',
                        pointerEvents: 'none',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        {/* Badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: 'rgba(8,145,178,0.12)', border: '1px solid rgba(8,145,178,0.25)',
                            borderRadius: 100, padding: '6px 16px', marginBottom: 20,
                        }}>
                            <span style={{ fontSize: 14 }}>🌊</span>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#0891b2', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Boardwalk Rentals</span>
                        </div>

                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                            fontSize: isMobile ? 28 : 40, letterSpacing: '-0.04em',
                            color: theme.text, margin: '0 0 12px', lineHeight: 1.1,
                        }}>
                            Soobér <span style={{ color: '#0891b2' }}>Boardwalk</span> Rides
                        </h2>
                        <p style={{
                            fontSize: isMobile ? 15 : 17, color: theme.textMuted,
                            maxWidth: 560, margin: '0 0 36px', lineHeight: 1.6,
                        }}>
                            Cruise the Sault Ste. Marie waterfront on premium electric scooters.
                            Pick up at any dock station, ride the boardwalk, and drop off when you're done.
                            The best way to experience the shoreline — <strong style={{ color: theme.text }}>wind in your hair, zero emissions.</strong>
                        </p>

                        {/* Rental Tiers */}
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                            fontSize: 18, color: theme.text, margin: '0 0 16px',
                        }}>Rental Options</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                            gap: 14, marginBottom: 36,
                        }}>
                            {[
                                { title: 'Quick Cruise', duration: '30 min', price: '$8', desc: 'A quick spin along the waterfront. Perfect for a break.', emoji: '⚡', highlight: false },
                                { title: 'Explorer', duration: '1 hour', price: '$14', desc: 'See the full boardwalk from Bondar Pavilion to the Canal.', emoji: '🌊', highlight: true },
                                { title: 'Adventure', duration: '2 hours', price: '$22', desc: 'Take your time. Stop for photos, grab an ice cream, ride back.', emoji: '☀️', highlight: false },
                                { title: 'All Day', duration: 'Full day', price: '$35', desc: 'Your scooter from open to close. Explore every trail and path.', emoji: '🏆', highlight: false },
                            ].map((plan, i) => (
                                <div key={i} style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                                    borderRadius: 20, padding: '24px 20px',
                                    border: plan.highlight ? '2px solid #0891b2' : `1px solid ${theme.borderSubtle}`,
                                    position: 'relative', overflow: 'hidden',
                                    transition: 'transform 0.2s ease',
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    {plan.highlight && (
                                        <div style={{
                                            position: 'absolute', top: 12, right: 12,
                                            fontSize: 10, fontWeight: 700, color: '#fff',
                                            background: '#0891b2', borderRadius: 8, padding: '3px 10px',
                                            textTransform: 'uppercase', letterSpacing: '0.05em',
                                        }}>Popular</div>
                                    )}
                                    <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{plan.emoji}</span>
                                    <h4 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                        fontSize: 15, color: theme.text, margin: '0 0 2px',
                                    }}>{plan.title}</h4>
                                    <span style={{ fontSize: 12, color: theme.textMuted, display: 'block', marginBottom: 8 }}>{plan.duration}</span>
                                    <div style={{ marginBottom: 8 }}>
                                        <span style={{ fontSize: 28, fontWeight: 800, color: '#0891b2' }}>{plan.price}</span>
                                    </div>
                                    <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{plan.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Dock Stations */}
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                            fontSize: 18, color: theme.text, margin: '0 0 16px',
                        }}>Dock Stations</h3>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                            gap: 12, marginBottom: 36,
                        }}>
                            {[
                                { station: 'Roberta Bondar Pavilion', scooters: '12 available', emoji: '🏛️' },
                                { station: 'Boardwalk Park', scooters: '8 available', emoji: '🌊' },
                                { station: 'Canal District', scooters: '10 available', emoji: '⛵' },
                                { station: 'Bellevue Marina', scooters: '6 available', emoji: '🚢' },
                            ].map((d, i) => (
                                <div key={i} style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
                                    borderRadius: 14, padding: 16, textAlign: 'center',
                                    border: `1px solid ${theme.borderSubtle}`,
                                    transition: 'transform 0.2s ease',
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{d.emoji}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, display: 'block', lineHeight: 1.3 }}>{d.station}</span>
                                    <span style={{ fontSize: 11, color: '#0891b2', fontWeight: 600, marginTop: 4, display: 'block' }}>{d.scooters}</span>
                                </div>
                            ))}
                        </div>

                        {/* What's Included */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                            gap: 12, marginBottom: 24,
                        }}>
                            {[
                                { item: 'Helmet Included', emoji: '⛑️' },
                                { item: 'Phone Mount', emoji: '📱' },
                                { item: 'Waterfront Map', emoji: '🗺️' },
                                { item: 'Safety Briefing', emoji: '✅' },
                            ].map((inc, i) => (
                                <div key={i} style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.5)',
                                    borderRadius: 12, padding: '12px 14px',
                                    border: `1px solid ${theme.borderSubtle}`,
                                    display: 'flex', alignItems: 'center', gap: 10,
                                }}>
                                    <span style={{ fontSize: 18 }}>{inc.emoji}</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: theme.text }}>{inc.item}</span>
                                </div>
                            ))}
                        </div>

                        {/* Season Note */}
                        <div style={{
                            background: isDark ? 'rgba(234,179,8,0.06)' : 'rgba(234,179,8,0.04)',
                            border: '1px solid rgba(234,179,8,0.15)', borderRadius: 14,
                            padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12,
                        }}>
                            <span style={{ fontSize: 20 }}>📅</span>
                            <div>
                                <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, display: 'block', marginBottom: 4 }}>Seasonal Operation</span>
                                <span style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5 }}>
                                    Boardwalk rentals are available May through October, weather permitting.
                                    Dock stations open daily from 8:00 AM to sunset. All riders must be 16+.
                                    Book ahead in the Soobér app or walk up to any dock station.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ SOO GREYHOUNDS PARTNERSHIP ═══ */}
            <section style={{
                padding: isMobile ? '60px 16px' : '80px 40px',
                maxWidth: 1440, margin: '0 auto', position: 'relative', overflow: 'hidden',
            }}>
                {/* Background glow effects */}
                <div style={{
                    position: 'absolute', top: -100, left: -150,
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(178,34,34,0.15) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: -100, right: -100,
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                    pointerEvents: 'none', filter: 'blur(60px)',
                }} />

                {/* Divider */}
                <div style={{
                    width: '100%', height: 1, marginBottom: isMobile ? 48 : 64,
                    background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)`,
                }} />

                {/* Partnership Badge */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        background: 'rgba(178,34,34,0.08)', border: '1px solid rgba(178,34,34,0.25)',
                        borderRadius: 100, padding: '8px 20px',
                    }}>
                        <span style={{ fontSize: 18 }}>🏒</span>
                        <span style={{
                            fontSize: 13, fontWeight: 700, color: '#B22222',
                            letterSpacing: '0.05em', textTransform: 'uppercase',
                        }}>
                            Official Ride Partner
                        </span>
                        <span style={{ fontSize: 18 }}>⚡</span>
                    </div>
                </div>

                {/* Hero Title */}
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 32 : 52, lineHeight: 1.05, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 16px', textAlign: 'center',
                }}>
                    Soobér × <span style={{
                        background: 'linear-gradient(135deg, #B22222, #FF4444)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>Soo Greyhounds</span>
                </h2>

                <p style={{
                    fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: theme.textMuted,
                    textAlign: 'center', maxWidth: 640, margin: '0 auto 48px',
                }}>
                    Game nights just got a whole lot easier. Soobér is the proud ride partner of the
                    Soo Greyhounds OHL, providing <strong style={{ color: theme.text }}>dedicated drivers</strong> and
                    <strong style={{ color: theme.text }}> enhanced ride services</strong> for every home game at the
                    GFL Memorial Gardens.
                </p>

                {/* Feature Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: 20, marginBottom: isMobile ? 48 : 64,
                }}>
                    {[
                        {
                            emoji: '🚗',
                            title: 'Dedicated Game-Day Fleet',
                            desc: 'Extra drivers deployed 2 hours before puck-drop through 1 hour after the final horn. No waiting, no surge.',
                            accent: '#B22222',
                        },
                        {
                            emoji: '📍',
                            title: 'Arena Pickup Zone',
                            desc: 'Designated Soobér pickup at the GFL Memorial Gardens main entrance. Follow the ⚡ signs — your driver is already waiting.',
                            accent: electric,
                        },
                        {
                            emoji: '🍺',
                            title: 'Safe Rides Home',
                            desc: 'Enjoy the game, enjoy the night. Zero-emission rides home for you and your crew — up to 6 passengers in our XL EVs.',
                            accent: '#10b981',
                        },
                        {
                            emoji: '🎟️',
                            title: 'Fan Rewards',
                            desc: 'Flash your Greyhounds ticket in the app and earn 2x Soobér Rewards points on every game-night ride. Stack \'em up.',
                            accent: '#f59e0b',
                        },
                        {
                            emoji: '⏰',
                            title: 'Pre-Game Scheduling',
                            desc: 'Book your ride home before the game even starts. Set your pickup time and never miss the post-game rush.',
                            accent: '#a855f7',
                        },
                        {
                            emoji: '🏆',
                            title: 'Playoff Mode',
                            desc: 'When the stakes are highest, so is our fleet. Extended hours, premium vehicles, and triple rewards during OHL playoff games.',
                            accent: '#B22222',
                        },
                    ].map((feature, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: isMobile ? 24 : 28,
                            transition: 'transform 0.3s ease, border-color 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = feature.accent + '44'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <span style={{ fontSize: 32, display: 'block', marginBottom: 16 }}>{feature.emoji}</span>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                fontSize: 17, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.02em',
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Upcoming Games */}
                <div style={{
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(178,34,34,0.05), rgba(178,34,34,0.02))'
                        : 'linear-gradient(135deg, rgba(178,34,34,0.06), rgba(178,34,34,0.03))',
                    border: '1px solid rgba(178,34,34,0.15)',
                    borderRadius: 28, padding: isMobile ? 28 : 48,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
                        <div>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                                fontSize: isMobile ? 20 : 26, letterSpacing: '-0.03em',
                                color: theme.text, margin: 0,
                            }}>
                                🏒 Upcoming Home Games
                            </h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, margin: '4px 0 0' }}>
                                GFL Memorial Gardens · 2025–26 OHL Season
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(178,34,34,0.1)', border: '1px solid rgba(178,34,34,0.25)',
                            borderRadius: 10, padding: '8px 16px',
                        }}>
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#B22222' }}>
                                ⚡ ENHANCED SERVICE ACTIVE
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { date: 'Sun, Mar 15', opponent: 'Brantford Bulldogs', time: '2:00 PM', special: null },
                            { date: 'Fri, Mar 20', opponent: 'Saginaw Spirit', time: '7:07 PM', special: 'Rivalry Night' },
                            { date: 'Sun, Mar 22', opponent: 'Windsor Spitfires', time: '2:00 PM', special: 'Season Finale 🎉' },
                            { date: 'Thu, Mar 26+', opponent: 'OHL Playoffs Begin', time: 'TBD', special: 'PLAYOFF MODE 🏆' },
                        ].map((game, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20,
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                                border: `1px solid ${game.special ? 'rgba(178,34,34,0.2)' : theme.borderSubtle}`,
                                borderRadius: 14, padding: isMobile ? '14px 16px' : '16px 24px',
                                transition: 'transform 0.2s ease',
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                            >
                                <div style={{
                                    minWidth: isMobile ? 80 : 100,
                                    fontSize: 13, fontWeight: 700, color: '#B22222',
                                    fontFamily: "'DM Sans', sans-serif",
                                }}>
                                    {game.date}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontWeight: 600, fontSize: 15, color: theme.text,
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}>
                                        Greyhounds vs {game.opponent}
                                    </div>
                                    <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 2 }}>
                                        GFL Memorial Gardens · {game.time}
                                    </div>
                                </div>
                                {game.special && (
                                    <div style={{
                                        background: 'rgba(178,34,34,0.1)', color: '#B22222',
                                        padding: '4px 12px', borderRadius: 8,
                                        fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap',
                                    }}>
                                        {game.special}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Promo code */}
                    <div style={{
                        marginTop: 28, textAlign: 'center',
                        padding: '20px', borderRadius: 16,
                        background: isDark ? 'rgba(178,34,34,0.06)' : 'rgba(178,34,34,0.04)',
                        border: '1px dashed rgba(178,34,34,0.25)',
                    }}>
                        <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 0 8px' }}>
                            First game-night ride free (up to $12)
                        </p>
                        <div style={{
                            fontSize: isMobile ? 24 : 32, fontWeight: 800,
                            fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em',
                            color: '#B22222',
                        }}>
                            Code: <span style={{
                                background: 'rgba(178,34,34,0.12)', padding: '4px 16px',
                                borderRadius: 10, border: '1px solid rgba(178,34,34,0.3)',
                            }}>GOHOUNDS</span>
                        </div>
                        <p style={{ fontSize: 12, color: theme.textFaint, margin: '8px 0 0' }}>
                            Valid for rides starting or ending at GFL Memorial Gardens on game days
                        </p>
                    </div>
                </div>

                {/* Trust bar */}
                <div style={{
                    marginTop: 48, display: 'flex', justifyContent: 'center',
                    gap: isMobile ? 20 : 48, flexWrap: 'wrap',
                }}>
                    {[
                        { value: '30+', label: 'Home Games / Season' },
                        { value: '4,600', label: 'Arena Capacity' },
                        { value: '0', label: 'Surge Pricing. Ever.' },
                        { value: '100%', label: 'Electric Fleet' },
                    ].map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: isMobile ? 24 : 32, fontWeight: 800,
                                fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em',
                                color: i === 2 ? '#10b981' : theme.text,
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ MEDICAL RIDES — SOOBÉR CAREPASS ═══ */}
            <section style={{
                padding: isMobile ? '60px 16px' : '80px 40px',
                maxWidth: 1440, margin: '0 auto', position: 'relative', overflow: 'hidden',
            }}>
                {/* Background glow */}
                <div style={{
                    position: 'absolute', top: -80, right: -120,
                    width: 450, height: 450, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 65%)',
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />

                {/* Divider */}
                <div style={{
                    width: '100%', height: 1, marginBottom: isMobile ? 48 : 64,
                    background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)`,
                }} />

                {/* Badge */}
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
                        borderRadius: 100, padding: '8px 20px',
                    }}>
                        <span style={{ fontSize: 18 }}>🏥</span>
                        <span style={{
                            fontSize: 13, fontWeight: 700, color: '#10b981',
                            letterSpacing: '0.05em', textTransform: 'uppercase',
                        }}>
                            Soobér CarePass
                        </span>
                        <span style={{ fontSize: 18 }}>💚</span>
                    </div>
                </div>

                {/* Hero */}
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 30 : 48, lineHeight: 1.05, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 16px', textAlign: 'center',
                }}>
                    Medical rides. <span style={{
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>Taken care of.</span>
                </h2>

                <p style={{
                    fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: theme.textMuted,
                    textAlign: 'center', maxWidth: 640, margin: '0 auto 20px',
                }}>
                    For seniors, patients, and families — reliable, scheduled rides to every medical
                    appointment. Add your full appointment calendar and we'll handle the rest.
                    <strong style={{ color: theme.text }}> Automatically.</strong>
                </p>

                <p style={{
                    fontSize: 15, lineHeight: 1.6, color: theme.textMuted,
                    textAlign: 'center', maxWidth: 520, margin: '0 auto 48px',
                }}>
                    No more missed appointments. No more worrying if Mom has a ride.
                    Soobér CarePass gives your family <strong style={{ color: '#10b981' }}>peace of mind</strong>.
                </p>

                {/* How It Works */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                    gap: 16, marginBottom: isMobile ? 48 : 64,
                }}>
                    {[
                        { step: '01', emoji: '📅', title: 'Add Appointments', desc: 'Enter your medical schedule — recurring or one-time. Dialysis every Tue & Thu? We\'ve got it.' },
                        { step: '02', emoji: '🤖', title: 'Auto-Scheduled', desc: 'Soobér automatically assigns a driver for every appointment. No calls, no texts, no stress.' },
                        { step: '03', emoji: '🚗', title: 'Door-to-Door', desc: 'Your driver arrives on time, helps you in, and waits or returns. Zero-emission, comfortable EVs.' },
                        { step: '04', emoji: '👨‍👩‍👧', title: 'Family Dashboard', desc: 'Caregivers get real-time tracking, ride confirmations, and arrival alerts. Always in the loop.' },
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: isMobile ? 24 : 28,
                            position: 'relative', overflow: 'hidden',
                            transition: 'transform 0.3s ease, border-color 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = '#10b98144'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <div style={{
                                position: 'absolute', top: 12, right: 16,
                                fontSize: 48, fontWeight: 900, color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                                fontFamily: "'DM Sans', sans-serif",
                            }}>{item.step}</div>
                            <span style={{ fontSize: 32, display: 'block', marginBottom: 16 }}>{item.emoji}</span>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                fontSize: 16, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.02em',
                            }}>
                                {item.title}
                            </h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Features Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: 20, marginBottom: isMobile ? 48 : 64,
                }}>
                    {[
                        { emoji: '🧓', title: 'Senior-Friendly', desc: 'Drivers trained in mobility assistance. Extra patience, extra care. Help with walkers, wheelchairs, and getting safely to the door.', color: '#f59e0b' },
                        { emoji: '🔄', title: 'Recurring Rides', desc: 'Dialysis 3x/week? Physio every Tuesday? Set it once and forget it. Your driver knows the schedule.', color: '#a855f7' },
                        { emoji: '📱', title: 'Caregiver Alerts', desc: 'Adult children and caregivers get live tracking, pickup/dropoff notifications, and monthly ride summaries.', color: electric },
                        { emoji: '🏥', title: 'Multi-Clinic Support', desc: 'Different doctors at different clinics? No problem. Each appointment gets its own optimized route.', color: '#10b981' },
                        { emoji: '⏱️', title: 'Wait & Return', desc: 'Driver waits during short appointments and brings you straight home. No rebooking, no waiting.', color: '#ef4444' },
                        { emoji: '💳', title: 'Simplified Billing', desc: 'One monthly statement. No per-ride payments. Family members can manage billing on behalf of loved ones.', color: '#f59e0b' },
                    ].map((feature, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: isMobile ? 24 : 28,
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>{feature.emoji}</span>
                            <h4 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                fontSize: 15, color: theme.text, margin: '0 0 6px', letterSpacing: '-0.02em',
                            }}>
                                {feature.title}
                            </h4>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* CarePass Plans */}
                <div style={{
                    background: isDark
                        ? 'linear-gradient(135deg, rgba(16,185,129,0.04), rgba(16,185,129,0.01))'
                        : 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))',
                    border: '1px solid rgba(16,185,129,0.15)',
                    borderRadius: 28, padding: isMobile ? 28 : 48,
                }}>
                    <h3 style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                        fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em',
                        color: theme.text, margin: '0 0 8px', textAlign: 'center',
                    }}>
                        CarePass Membership Plans
                    </h3>
                    <p style={{
                        fontSize: 14, color: theme.textMuted, textAlign: 'center',
                        margin: '0 auto 32px', maxWidth: 440,
                    }}>
                        Simple, predictable pricing. Cancel anytime.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: 20,
                    }}>
                        {/* Essential */}
                        <div style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                            border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: 28, textAlign: 'center',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: 32, marginBottom: 12 }}>🩺</div>
                            <h4 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                fontSize: 18, color: theme.text, margin: '0 0 4px',
                            }}>Essential</h4>
                            <p style={{ fontSize: 12, color: theme.textMuted, margin: '0 0 16px' }}>
                                Up to 4 rides per month
                            </p>
                            <div style={{
                                fontSize: 36, fontWeight: 800, color: '#10b981',
                                fontFamily: "'DM Sans', sans-serif", margin: '0 0 4px',
                            }}>
                                $49<span style={{ fontSize: 16, fontWeight: 500, color: theme.textMuted }}>/mo</span>
                            </div>
                            <p style={{ fontSize: 11, color: theme.textFaint, margin: '0 0 20px' }}>
                                ~$12.25/ride vs $15+ standard
                            </p>
                            <div style={{ fontSize: 13, color: theme.textMuted, textAlign: 'left', lineHeight: 2 }}>
                                ✅ 4 scheduled rides/month<br />
                                ✅ Door-to-door service<br />
                                ✅ Appointment reminders<br />
                                ✅ Caregiver alerts<br />
                                ✅ Monthly summary
                            </div>
                        </div>

                        {/* Plus — Recommended */}
                        <div style={{
                            background: isDark ? 'rgba(16,185,129,0.05)' : 'rgba(16,185,129,0.03)',
                            border: '2px solid #10b981',
                            borderRadius: 20, padding: 28, textAlign: 'center',
                            position: 'relative',
                            boxShadow: '0 8px 32px rgba(16,185,129,0.15)',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                                background: '#10b981', color: '#fff', padding: '4px 16px',
                                borderRadius: 20, fontSize: 11, fontWeight: 800,
                                textTransform: 'uppercase', letterSpacing: '0.05em',
                            }}>
                                Most Popular
                            </div>
                            <div style={{ fontSize: 32, marginBottom: 12 }}>💚</div>
                            <h4 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                fontSize: 18, color: theme.text, margin: '0 0 4px',
                            }}>Plus</h4>
                            <p style={{ fontSize: 12, color: theme.textMuted, margin: '0 0 16px' }}>
                                Up to 10 rides per month
                            </p>
                            <div style={{
                                fontSize: 36, fontWeight: 800, color: '#10b981',
                                fontFamily: "'DM Sans', sans-serif", margin: '0 0 4px',
                            }}>
                                $99<span style={{ fontSize: 16, fontWeight: 500, color: theme.textMuted }}>/mo</span>
                            </div>
                            <p style={{ fontSize: 11, color: theme.textFaint, margin: '0 0 20px' }}>
                                ~$9.90/ride · Best for regular care
                            </p>
                            <div style={{ fontSize: 13, color: theme.textMuted, textAlign: 'left', lineHeight: 2 }}>
                                ✅ 10 scheduled rides/month<br />
                                ✅ Wait & Return service<br />
                                ✅ Priority scheduling<br />
                                ✅ Multi-clinic routing<br />
                                ✅ Family dashboard access<br />
                                ✅ Real-time GPS tracking
                            </div>
                        </div>

                        {/* Family */}
                        <div style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : '#fff',
                            border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: 28, textAlign: 'center',
                            transition: 'transform 0.3s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: 32, marginBottom: 12 }}>👨‍👩‍👧‍👦</div>
                            <h4 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                fontSize: 18, color: theme.text, margin: '0 0 4px',
                            }}>Family</h4>
                            <p style={{ fontSize: 12, color: theme.textMuted, margin: '0 0 16px' }}>
                                Unlimited rides for 2+ members
                            </p>
                            <div style={{
                                fontSize: 36, fontWeight: 800, color: '#10b981',
                                fontFamily: "'DM Sans', sans-serif", margin: '0 0 4px',
                            }}>
                                $179<span style={{ fontSize: 16, fontWeight: 500, color: theme.textMuted }}>/mo</span>
                            </div>
                            <p style={{ fontSize: 11, color: theme.textFaint, margin: '0 0 20px' }}>
                                Unlimited rides · Up to 2 members
                            </p>
                            <div style={{ fontSize: 13, color: theme.textMuted, textAlign: 'left', lineHeight: 2 }}>
                                ✅ Unlimited scheduled rides<br />
                                ✅ 2 covered household members<br />
                                ✅ Dedicated driver matching<br />
                                ✅ Wheelchair accessibility<br />
                                ✅ Monthly caregiver reports<br />
                                ✅ Direct clinic coordination<br />
                                ✅ 24/7 priority support
                            </div>
                        </div>
                    </div>

                    {/* Promo */}
                    <div style={{
                        marginTop: 28, textAlign: 'center',
                        padding: '20px', borderRadius: 16,
                        background: isDark ? 'rgba(16,185,129,0.06)' : 'rgba(16,185,129,0.04)',
                        border: '1px dashed rgba(16,185,129,0.25)',
                    }}>
                        <p style={{ fontSize: 14, color: theme.textMuted, margin: '0 0 8px' }}>
                            Try CarePass free for the first week
                        </p>
                        <div style={{
                            fontSize: isMobile ? 22 : 28, fontWeight: 800,
                            fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em',
                            color: '#10b981',
                        }}>
                            Code: <span style={{
                                background: 'rgba(16,185,129,0.12)', padding: '4px 16px',
                                borderRadius: 10, border: '1px solid rgba(16,185,129,0.3)',
                            }}>CAREPASS</span>
                        </div>
                        <p style={{ fontSize: 12, color: theme.textFaint, margin: '8px 0 0' }}>
                            No commitment. Cancel anytime. Your loved ones deserve reliable rides.
                        </p>
                    </div>
                </div>

                {/* Trust / Testimonial Bar */}
                <div style={{
                    marginTop: 48, display: 'flex', justifyContent: 'center',
                    gap: isMobile ? 20 : 48, flexWrap: 'wrap',
                }}>
                    {[
                        { value: '100%', label: 'On-Time Guarantee' },
                        { value: '0', label: 'Missed Appointments' },
                        { value: '$0', label: 'Cancellation Fees' },
                        { value: '24/7', label: 'Family Support Line' },
                    ].map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: isMobile ? 24 : 32, fontWeight: 800,
                                fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em',
                                color: '#10b981',
                            }}>
                                {stat.value}
                            </div>
                            <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
