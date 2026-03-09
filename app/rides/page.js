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

            {/* ═══ Fleet Roster ═══ */}
            <section style={{ padding: isMobile ? '40px 16px' : '60px 40px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 24 : 32, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 12px',
                }}>
                    The Soobér Fleet
                </h2>
                <p style={{
                    fontSize: 15, color: theme.textMuted, margin: '0 0 32px', maxWidth: 560,
                }}>
                    12 vehicles. 6 manufacturers. 100% electric or hybrid. From BYD Dolphins to Hummer EVs — the most diverse EV fleet in Northern Ontario.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: 16,
                }}>
                    {fleetRoster.map((vehicle) => (
                        <div key={vehicle.id} style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, overflow: 'hidden',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 8px 28px rgba(0,0,0,0.1)`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <div style={{
                                background: `linear-gradient(135deg, ${vehicle.color}dd, ${vehicle.color}88)`,
                                padding: '28px 20px', textAlign: 'center',
                            }}>
                                <span style={{ fontSize: 44, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}>
                                    {vehicle.emoji}
                                </span>
                            </div>
                            <div style={{ padding: '18px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
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
                                    fontSize: 18, color: theme.text, margin: '2px 0 6px', letterSpacing: '-0.02em',
                                }}>
                                    {vehicle.model}
                                </h4>
                                <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5, margin: '0 0 10px' }}>
                                    {vehicle.type} · {vehicle.seats} seats · {vehicle.range}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                    {vehicle.tier.map((t, i) => (
                                        <span key={i} style={{
                                            fontSize: 10, fontWeight: 600, color: theme.textMuted,
                                            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                            borderRadius: 6, padding: '3px 8px',
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
                    color: theme.text, margin: '0 0 24px',
                }}>
                    Popular destinations
                </h2>

                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: 12,
                }}>
                    {popularDestinations.map((dest, i) => (
                        <button
                            key={i}
                            onClick={() => { setDropoff(dest.name); }}
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
                        </button>
                    ))}
                </div>
            </section>

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
                        Every ride supports the local economy and produces zero tailpipe emissions
                    </p>

                    <div style={{
                        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gap: 20,
                    }}>
                        {safetyFeatures.map((sf, i) => (
                            <div key={i} style={{
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)',
                                borderRadius: 16, padding: 20, textAlign: 'center',
                                border: `1px solid ${theme.borderSubtle}`,
                            }}>
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

            <Footer />
        </div>
    );
}
