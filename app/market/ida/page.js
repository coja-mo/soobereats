"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { shopPartners } from '../../../lib/data/restaurants';
import { useTheme } from '../../../lib/ThemeContext';
import { Footer } from '../../../components/Footer';

export default function IDAPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [nearestId, setNearestId] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [geoStatus, setGeoStatus] = useState('idle'); // idle | loading | success | denied

    const ida = shopPartners.find(p => p.id === 'ida-drug-mart');
    const sweetGreetings = shopPartners.find(p => p.id === 'sweet-greetings');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Geo-location for nearest store
    const getDistance = useCallback((lat1, lng1, lat2, lng2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }, []);

    const detectLocation = useCallback(() => {
        setGeoStatus('loading');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                setGeoStatus('success');
                // Find nearest
                let minDist = Infinity, closest = null;
                ida.locations.forEach(loc => {
                    const d = getDistance(latitude, longitude, loc.lat, loc.lng);
                    if (d < minDist) { minDist = d; closest = loc.id; }
                });
                setNearestId(closest);
            },
            () => setGeoStatus('denied'),
            { enableHighAccuracy: true, timeout: 8000 }
        );
    }, [ida, getDistance]);

    useEffect(() => {
        if (navigator.geolocation) detectLocation();
    }, [detectLocation]);

    const getDistanceText = (loc) => {
        if (!userLocation) return null;
        const d = getDistance(userLocation.lat, userLocation.lng, loc.lat, loc.lng);
        return d < 1 ? `${(d * 1000).toFixed(0)}m away` : `${d.toFixed(1)}km away`;
    };

    const sectionPad = isMobile ? '0 16px' : '0 40px';

    return (
        <>
            <main style={{
                minHeight: '100vh',
                background: isDark ? '#09090b' : '#fdfdfd',
                transition: 'background 0.3s ease',
            }}>

                {/* ═══════════════════════════════════════
                    HERO — IDA Blue Gradient
                   ═══════════════════════════════════════ */}
                <section style={{
                    padding: isMobile ? '48px 16px 56px' : '80px 40px 90px',
                    position: 'relative', overflow: 'hidden',
                    background: isDark
                        ? 'linear-gradient(180deg, #09090b 0%, #0a1628 30%, #0d1f3c 50%, #0a1628 70%, #09090b 100%)'
                        : 'linear-gradient(180deg, #fdfdfd 0%, #e8f0ff 30%, #dbe7ff 50%, #e8f0ff 70%, #fdfdfd 100%)',
                    borderBottom: `1px solid ${theme.borderSubtle}`,
                }}>
                    {/* Orbs */}
                    <div style={{ position: 'absolute', top: '-15%', right: '15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-10%', left: '25%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,102,255,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

                    <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
                        {/* Back to Shop */}
                        <Link href="/market" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 18px', borderRadius: 12,
                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${theme.borderSubtle}`,
                            fontSize: 13, fontWeight: 600, color: theme.textSecondary,
                            textDecoration: 'none', marginBottom: 28,
                            transition: 'all 0.2s',
                        }}>
                            ← Back to Shop
                        </Link>

                        {/* Badge */}
                        <div style={{
                            display: 'flex', justifyContent: 'center', marginBottom: 24,
                        }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 10,
                                padding: '10px 24px', borderRadius: 100,
                                background: 'rgba(0,102,255,0.1)',
                                border: '1px solid rgba(0,102,255,0.2)',
                                fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                                color: '#3b82f6',
                            }}>
                                <span style={{ fontSize: 15 }}>💊</span>
                                {ida.badge} · Family-Owned · 4 Locations
                            </div>
                        </div>

                        <h1 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 44 : 80, fontWeight: 800,
                            letterSpacing: '-0.05em', color: theme.text,
                            lineHeight: 0.95, marginBottom: 20,
                        }}>
                            IDA<span style={{
                                display: 'block', fontSize: isMobile ? 24 : 40,
                                fontWeight: 600, letterSpacing: '-0.02em',
                                color: '#3b82f6', marginTop: 8,
                            }}>Drug Mart</span>
                        </h1>

                        <p style={{
                            fontSize: isMobile ? 16 : 20, color: theme.textMuted,
                            maxWidth: 620, margin: '0 auto 32px', lineHeight: 1.7,
                        }}>
                            {ida.description}
                        </p>

                        {/* Tag pills */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                            {ida.tags.map(tag => (
                                <span key={tag} style={{
                                    padding: '6px 14px', borderRadius: 10,
                                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                    border: `1px solid ${theme.borderSubtle}`,
                                    fontSize: 12, fontWeight: 600, color: theme.textFaint,
                                }}>{tag}</span>
                            ))}
                        </div>

                        {/* Geo status */}
                        {geoStatus === 'success' && nearestId && (
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '10px 20px', borderRadius: 14,
                                background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                                fontSize: 13, fontWeight: 600, color: '#10b981',
                                animation: 'fadeIn 0.4s ease',
                            }}>
                                📍 Nearest store detected — scroll down to pick your location
                            </div>
                        )}
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    LOCATION PICKER
                   ═══════════════════════════════════════ */}
                <section style={{ padding: isMobile ? '48px 0' : '72px 0' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
                        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
                            <h2 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 28 : 44, fontWeight: 700,
                                letterSpacing: '-0.03em', color: theme.text,
                                marginBottom: 12,
                            }}>Choose Your Store</h2>
                            <p style={{ fontSize: isMobile ? 14 : 16, color: theme.textMuted, maxWidth: 480, margin: '0 auto' }}>
                                Four locations across the Sault — each locally owned and community-focused.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: isMobile ? 16 : 24,
                        }}>
                            {ida.locations.map((loc) => {
                                const isNearest = nearestId === loc.id;
                                const isSelected = selectedLocation === loc.id;
                                const isHovered = hoveredCard === loc.id;
                                const distText = getDistanceText(loc);

                                return (
                                    <div
                                        key={loc.id}
                                        onClick={() => setSelectedLocation(isSelected ? null : loc.id)}
                                        onMouseEnter={() => setHoveredCard(loc.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            position: 'relative',
                                            padding: isMobile ? 24 : 32,
                                            borderRadius: 24,
                                            background: isDark
                                                ? `rgba(24,24,27,${isSelected ? 0.95 : 0.7})`
                                                : `rgba(255,255,255,${isSelected ? 1 : 0.8})`,
                                            backdropFilter: 'blur(24px)',
                                            border: `2px solid ${isSelected ? '#3b82f6' : isNearest ? 'rgba(16,185,129,0.4)' : isHovered ? theme.border : theme.borderSubtle}`,
                                            cursor: 'pointer',
                                            transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                                            transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                                            boxShadow: isSelected
                                                ? '0 8px 40px rgba(59,130,246,0.2)'
                                                : isHovered ? '0 12px 40px rgba(0,0,0,0.12)' : 'none',
                                        }}
                                    >
                                        {/* Nearest badge */}
                                        {isNearest && (
                                            <div style={{
                                                position: 'absolute', top: -12, right: 20,
                                                padding: '5px 14px', borderRadius: 100,
                                                background: '#10b981', color: '#fff',
                                                fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                                                boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
                                            }}>
                                                📍 NEAREST
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                                            <div style={{
                                                width: 56, height: 56, borderRadius: 16,
                                                background: isDark ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.08)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 28, flexShrink: 0,
                                            }}>{loc.emoji}</div>
                                            <div style={{ flex: 1 }}>
                                                <h3 style={{
                                                    fontFamily: "'DM Sans', sans-serif",
                                                    fontSize: isMobile ? 18 : 20, fontWeight: 700,
                                                    color: theme.text, marginBottom: 4,
                                                }}>{loc.name}</h3>
                                                <p style={{ fontSize: 14, color: theme.textMuted, margin: 0 }}>
                                                    {loc.address}, {loc.city}
                                                </p>
                                                {distText && (
                                                    <span style={{
                                                        fontSize: 12, fontWeight: 700, color: '#10b981',
                                                        marginTop: 4, display: 'inline-block',
                                                    }}>{distText}</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                                            {loc.features.map(f => (
                                                <span key={f} style={{
                                                    padding: '4px 10px', borderRadius: 8,
                                                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                                    fontSize: 11, fontWeight: 600, color: theme.textFaint,
                                                }}>{f}</span>
                                            ))}
                                        </div>

                                        {/* Hours */}
                                        <div style={{
                                            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
                                            padding: '12px 16px', borderRadius: 14,
                                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                        }}>
                                            {[
                                                { label: 'Mon–Fri', val: loc.hours.weekday },
                                                { label: 'Saturday', val: loc.hours.saturday },
                                                { label: 'Sunday', val: loc.hours.sunday },
                                            ].map(h => (
                                                <div key={h.label} style={{ textAlign: 'center' }}>
                                                    <div style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{h.label}</div>
                                                    <div style={{ fontSize: 12, fontWeight: 600, color: theme.textSecondary }}>{h.val}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Phone */}
                                        <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <a href={`tel:${loc.phone}`} style={{
                                                fontSize: 13, fontWeight: 600, color: '#3b82f6',
                                                textDecoration: 'none',
                                            }}>📞 {loc.phone}</a>
                                            <div style={{
                                                padding: '8px 16px', borderRadius: 12,
                                                background: isSelected ? '#3b82f6' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                                                color: isSelected ? '#fff' : theme.textSecondary,
                                                fontSize: 13, fontWeight: 700,
                                                transition: 'all 0.3s',
                                            }}>
                                                {isSelected ? '✓ Selected' : 'Select Store'}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    PRODUCT CATEGORIES
                   ═══════════════════════════════════════ */}
                <section style={{
                    padding: isMobile ? '48px 0 56px' : '72px 0 80px',
                    background: isDark
                        ? 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.03) 50%, transparent 100%)'
                        : 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.04) 50%, transparent 100%)',
                }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
                        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
                            <h2 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 28 : 40, fontWeight: 700,
                                letterSpacing: '-0.03em', color: theme.text, marginBottom: 12,
                            }}>What We Carry</h2>
                            <p style={{ fontSize: 15, color: theme.textMuted }}>Everything you need — delivered by our ⚡ electric fleet.</p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                            gap: isMobile ? 12 : 20,
                        }}>
                            {ida.categories.map((cat, i) => (
                                <div key={cat.name} style={{
                                    padding: isMobile ? 20 : 28,
                                    borderRadius: 22,
                                    background: isDark ? 'rgba(24,24,27,0.7)' : 'rgba(255,255,255,0.8)',
                                    border: `1px solid ${theme.borderSubtle}`,
                                    backdropFilter: 'blur(20px)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'default',
                                }}>
                                    <div style={{ fontSize: isMobile ? 36 : 44, marginBottom: 12 }}>{cat.emoji}</div>
                                    <h3 style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: isMobile ? 16 : 18, fontWeight: 700,
                                        color: theme.text, marginBottom: 6,
                                    }}>{cat.name}</h3>
                                    <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{cat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    SWEET GREETINGS — SHOP IN SHOP
                   ═══════════════════════════════════════ */}
                {sweetGreetings && (
                    <section style={{
                        padding: isMobile ? '48px 0 56px' : '72px 0 80px',
                    }}>
                        <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
                            <div style={{
                                borderRadius: 28,
                                overflow: 'hidden',
                                background: isDark
                                    ? 'linear-gradient(145deg, rgba(236,72,153,0.08) 0%, rgba(24,24,27,0.9) 100%)'
                                    : 'linear-gradient(145deg, rgba(236,72,153,0.06) 0%, rgba(255,255,255,0.9) 100%)',
                                border: `1px solid ${isDark ? 'rgba(236,72,153,0.15)' : 'rgba(236,72,153,0.12)'}`,
                                padding: isMobile ? 28 : 48,
                                position: 'relative',
                            }}>
                                {/* Accent top line */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                    background: 'linear-gradient(90deg, transparent, #ec4899, transparent)',
                                }} />

                                {/* Large background emoji */}
                                <div style={{
                                    position: 'absolute', right: isMobile ? -20 : 40, bottom: isMobile ? -30 : -20,
                                    fontSize: isMobile ? 140 : 200, opacity: 0.04, pointerEvents: 'none',
                                }}>🎁</div>

                                <div style={{ position: 'relative', zIndex: 10 }}>
                                    {/* Badge */}
                                    <div style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 8,
                                        padding: '8px 18px', borderRadius: 100,
                                        background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.2)',
                                        fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                                        color: '#ec4899', marginBottom: 20,
                                    }}>
                                        🎁 Shop-in-Shop · Inside IDA Drug Mart
                                    </div>

                                    <h2 style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: isMobile ? 32 : 48, fontWeight: 700,
                                        letterSpacing: '-0.04em', color: theme.text,
                                        marginBottom: 12,
                                    }}>Sweet Greetings</h2>

                                    <p style={{
                                        fontSize: isMobile ? 15 : 18, color: theme.textMuted,
                                        maxWidth: 600, lineHeight: 1.7, marginBottom: 32,
                                    }}>
                                        {sweetGreetings.description}
                                    </p>

                                    {/* Category cards */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                                        gap: isMobile ? 10 : 16,
                                    }}>
                                        {sweetGreetings.categories.map(cat => (
                                            <div key={cat.name} style={{
                                                padding: isMobile ? 16 : 20,
                                                borderRadius: 18,
                                                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)',
                                                border: `1px solid ${theme.borderSubtle}`,
                                            }}>
                                                <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.emoji}</div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 4 }}>{cat.name}</div>
                                                <div style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }}>{cat.desc}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Coffee bar callout */}
                                    <div style={{
                                        marginTop: 28, padding: '16px 24px', borderRadius: 16,
                                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                        border: `1px solid ${theme.borderSubtle}`,
                                        display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
                                    }}>
                                        <span style={{ fontSize: 28 }}>☕</span>
                                        <div>
                                            <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>Coffee Bar</div>
                                            <div style={{ fontSize: 13, color: theme.textMuted }}>
                                                Artisanal coffees &amp; specialty beverages available at Market Mall &amp; Urban Square locations
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {/* ═══════════════════════════════════════
                    CTA BANNER
                   ═══════════════════════════════════════ */}
                <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 72px' }}>
                    <div style={{
                        maxWidth: 1440, margin: '0 auto',
                        padding: isMobile ? '32px 24px' : '48px 56px',
                        borderRadius: 28,
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(24,24,27,0.9) 100%)'
                            : 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(255,255,255,0.9) 100%)',
                        border: `1px solid ${isDark ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.1)'}`,
                        textAlign: 'center',
                    }}>
                        <p style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 20 : 28, fontWeight: 700,
                            color: theme.text, marginBottom: 10,
                        }}>
                            4 locations. 60+ years. 100% local.
                        </p>
                        <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 24 }}>
                            Every order delivered by our ⚡ electric fleet — zero emissions, full community.
                        </p>
                        <Link href="/market" style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '14px 32px', borderRadius: 14,
                            background: '#3b82f6', color: '#fff',
                            fontSize: 15, fontWeight: 700, textDecoration: 'none',
                            fontFamily: "'DM Sans', sans-serif",
                            transition: 'all 0.3s',
                            boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
                        }}>
                            ← Back to Shop
                        </Link>
                    </div>
                </section>

                <Footer />
            </main>

            <style>{`
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(-6px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </>
    );
}
