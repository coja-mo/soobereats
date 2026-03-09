"use client";

import { useState, useEffect, useRef } from 'react';
import { airportZones, airportVehicles } from '../../../lib/data/rides';
import { useTheme } from '../../../lib/ThemeContext';
import Link from 'next/link';
import { Footer } from '../../../components/Footer';

export default function AirportPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState('sedan');
    const [tripType, setTripType] = useState('to-airport');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [booked, setBooked] = useState(false);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const routeLayerRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const electric = '#0066FF';
    const electricBg = 'rgba(0,102,255,0.1)';
    const electricGlow = 'rgba(0,102,255,0.3)';
    const sky = '#0ea5e9';
    const skyBg = 'rgba(14,165,233,0.1)';

    const vehicleObj = airportVehicles.find(v => v.id === selectedVehicle);
    const fare = selectedZone ? (selectedZone.price * vehicleObj.multiplier).toFixed(2) : null;

    const handleBook = () => {
        if (selectedZone && date && time) setBooked(true);
    };

    // YAM Airport coordinates
    const YAM = [46.4850, -84.5094];

    // Zone center coordinates for map
    const zoneCenters = {
        'downtown': [46.5136, -84.3358],
        'east': [46.5250, -84.2900],
        'west': [46.5200, -84.3800],
        'north': [46.5500, -84.3200],
        'extended': [46.5800, -84.3000],
    };

    // Init map
    useEffect(() => {
        if (typeof window === 'undefined' || !mapContainerRef.current) return;

        const loadMap = async () => {
            if (!window.L) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);
                await new Promise(r => {
                    const s = document.createElement('script');
                    s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                    s.onload = r;
                    document.head.appendChild(s);
                });
            }

            if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }

            const L = window.L;
            const map = L.map(mapContainerRef.current, {
                center: [46.50, -84.40], zoom: 12,
                zoomControl: false, attributionControl: false,
            });

            L.tileLayer(
                isDark
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                { maxZoom: 18, subdomains: 'abcd' }
            ).addTo(map);

            L.control.zoom({ position: 'topright' }).addTo(map);

            // Airport marker
            const airportIcon = L.divIcon({
                className: 'yam-marker',
                html: `<div style="width:28px;height:28px;border-radius:8px;background:${sky};border:3px solid #fff;box-shadow:0 0 12px rgba(14,165,233,0.5);display:flex;align-items:center;justify-content:center;font-size:14px;">\u2708\ufe0f</div>`,
                iconSize: [28, 28], iconAnchor: [14, 14],
            });
            L.marker(YAM, { icon: airportIcon }).addTo(map)
                .bindPopup('<strong style="font-family:\'DM Sans\',sans-serif">YAM \u2014 Sault Ste. Marie Airport</strong>');

            mapRef.current = map;
        };

        loadMap();
        return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
    }, [isDark]);

    // Update route when zone selected
    useEffect(() => {
        if (!mapRef.current || !window.L || !selectedZone) return;

        const L = window.L;
        const map = mapRef.current;

        // Clear old route
        if (routeLayerRef.current) { map.removeLayer(routeLayerRef.current); routeLayerRef.current = null; }

        const zoneCenter = zoneCenters[selectedZone.id] || [46.5136, -84.3358];

        // Zone marker
        const zoneIcon = L.divIcon({
            className: 'zone-marker',
            html: `<div style="width:22px;height:22px;border-radius:50%;background:#22c55e;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
            iconSize: [22, 22], iconAnchor: [11, 11],
        });

        // Draw line from zone to airport
        routeLayerRef.current = L.layerGroup([
            L.marker(zoneCenter, { icon: zoneIcon }).bindPopup(`<strong>${selectedZone.name}</strong>`),
            L.polyline([zoneCenter, YAM], {
                color: sky, weight: 3, opacity: 0.7, dashArray: '8 6',
            }),
        ]).addTo(map);

        // Fit bounds
        map.fitBounds(L.latLngBounds([zoneCenter, YAM]), { padding: [50, 50] });
    }, [selectedZone]);

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, transition: 'background 0.3s ease' }}>

            {/* ═══ Hero ═══ */}
            <section style={{
                padding: isMobile ? '60px 16px 40px' : '80px 40px 60px',
                maxWidth: 1440, margin: '0 auto', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: -200, left: -100,
                    width: 600, height: 600, borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)`,
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />

                <Link href="/rides" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, color: theme.textMuted,
                    textDecoration: 'none', fontSize: 14, fontWeight: 500, marginBottom: 24,
                    transition: 'color 0.2s ease',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.color = electric}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.textMuted}
                >
                    ← Back to Soobér Rides
                </Link>

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: skyBg, border: `1px solid ${sky}33`,
                    borderRadius: 100, padding: '6px 16px', marginBottom: 24, display: 'flex', width: 'fit-content',
                }}>
                    <span style={{ fontSize: 14 }}>✈️</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: sky, letterSpacing: '-0.01em' }}>
                        Airport Transfers
                    </span>
                </div>

                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 32 : 48, lineHeight: 1.1, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 16px',
                }}>
                    Sault Ste. Marie Airport<br />
                    <span style={{ color: sky }}>Fixed-rate transfers</span>
                </h1>

                <p style={{
                    fontSize: isMobile ? 15 : 17, lineHeight: 1.6, color: theme.textMuted,
                    maxWidth: 520, margin: '0 0 40px',
                }}>
                    No meters, no surge, no surprises. Schedule ahead and know exactly what you&apos;ll pay.
                    Meet-and-greet available. 100% electric fleet.
                </p>
            </section>

            {/* ═══ Booking + Pricing ═══ */}
            <section style={{
                padding: isMobile ? '0 16px 40px' : '0 40px 60px',
                maxWidth: 1440, margin: '0 auto',
            }}>
                <div style={{
                    display: 'flex', flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 32 : 40,
                }}>
                    {/* Left — Zone Pricing */}
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                            fontSize: 20, color: theme.text, margin: '0 0 20px', letterSpacing: '-0.02em',
                        }}>
                            Select your zone
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {airportZones.map((zone) => (
                                <button
                                    key={zone.id}
                                    onClick={() => { setSelectedZone(zone); setBooked(false); }}
                                    style={{
                                        width: '100%', textAlign: 'left', cursor: 'pointer',
                                        background: selectedZone?.id === zone.id
                                            ? (isDark ? `${sky}12` : `${sky}08`)
                                            : theme.bgCard,
                                        border: selectedZone?.id === zone.id
                                            ? `2px solid ${sky}`
                                            : `1px solid ${theme.borderSubtle}`,
                                        borderRadius: 14, padding: '14px 18px',
                                        transition: 'all 0.2s ease',
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    }}
                                >
                                    <div>
                                        <span style={{
                                            fontWeight: 600, fontSize: 15, color: theme.text,
                                            fontFamily: "'Inter', sans-serif", display: 'block',
                                        }}>
                                            {zone.name}
                                        </span>
                                        <span style={{ fontSize: 12, color: theme.textMuted }}>
                                            {zone.description} · {zone.distance}
                                        </span>
                                    </div>
                                    <span style={{
                                        fontWeight: 700, fontSize: 18, color: sky,
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}>
                                        ${zone.price}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <p style={{
                            fontSize: 12, color: theme.textFaint, marginTop: 12, fontStyle: 'italic',
                        }}>
                            Prices shown for EV Sedan. SUV and Premium vehicles apply a multiplier.
                        </p>
                    </div>

                    {/* Right — Booking Form */}
                    <div style={{ flex: 1, maxWidth: isMobile ? '100%' : 480 }}>
                        <div style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 24, padding: isMobile ? 24 : 32,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                            position: 'sticky', top: 90,
                        }}>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                fontSize: 20, color: theme.text, margin: '0 0 24px', letterSpacing: '-0.02em',
                            }}>
                                Book your transfer
                            </h3>

                            {/* Trip direction */}
                            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                                <button onClick={() => setTripType('to-airport')} style={{
                                    flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer',
                                    background: tripType === 'to-airport' ? sky : theme.bgInput,
                                    color: tripType === 'to-airport' ? '#fff' : theme.textMuted,
                                    fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif",
                                    transition: 'all 0.2s ease',
                                }}>
                                    ✈️ To Airport
                                </button>
                                <button onClick={() => setTripType('from-airport')} style={{
                                    flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer',
                                    background: tripType === 'from-airport' ? sky : theme.bgInput,
                                    color: tripType === 'from-airport' ? '#fff' : theme.textMuted,
                                    fontWeight: 600, fontSize: 13, fontFamily: "'Inter', sans-serif",
                                    transition: 'all 0.2s ease',
                                }}>
                                    🏠 From Airport
                                </button>
                            </div>

                            {/* Vehicle type */}
                            <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, display: 'block', marginBottom: 8 }}>Vehicle</label>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                                {airportVehicles.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVehicle(v.id)}
                                        style={{
                                            flex: 1, padding: '10px 8px', borderRadius: 12, cursor: 'pointer',
                                            background: selectedVehicle === v.id ? `${sky}15` : theme.bgInput,
                                            border: selectedVehicle === v.id ? `2px solid ${sky}` : `1px solid ${theme.borderSubtle}`,
                                            color: theme.text, fontSize: 12, fontWeight: 600, textAlign: 'center',
                                            fontFamily: "'Inter', sans-serif", transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <div style={{ fontSize: 11, color: theme.textMuted, marginTop: 4 }}>
                                            {v.name}
                                        </div>
                                        <div style={{ fontSize: 10, color: theme.textFaint }}>
                                            {v.passengers} pax · {v.luggage} bags
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Date & Time */}
                            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Date</label>
                                    <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setBooked(false); }}
                                        style={{
                                            width: '100%', background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                            borderRadius: 12, padding: '12px', fontSize: 14, color: theme.text,
                                            outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
                                        }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Time</label>
                                    <input type="time" value={time} onChange={(e) => { setTime(e.target.value); setBooked(false); }}
                                        style={{
                                            width: '100%', background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                            borderRadius: 12, padding: '12px', fontSize: 14, color: theme.text,
                                            outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
                                        }} />
                                </div>
                            </div>

                            {/* Flight number */}
                            <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Flight Number (optional)</label>
                            <input type="text" placeholder="e.g. AC8501" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)}
                                style={{
                                    width: '100%', background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                    borderRadius: 12, padding: '12px 16px', fontSize: 14, color: theme.text,
                                    outline: 'none', fontFamily: "'Inter', sans-serif", marginBottom: 24, boxSizing: 'border-box',
                                }} />

                            {/* Price display */}
                            {selectedZone && (
                                <div style={{
                                    background: isDark ? 'rgba(14,165,233,0.06)' : 'rgba(14,165,233,0.04)',
                                    borderRadius: 14, padding: '16px 20px', marginBottom: 20,
                                    border: `1px solid ${sky}22`,
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                }}>
                                    <div>
                                        <span style={{ fontSize: 13, color: theme.textMuted, display: 'block' }}>Estimated fare</span>
                                        <span style={{ fontSize: 12, color: theme.textFaint }}>{selectedZone.name} · {vehicleObj.name}</span>
                                    </div>
                                    <span style={{
                                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                                        fontSize: 28, color: sky,
                                    }}>
                                        ${fare}
                                    </span>
                                </div>
                            )}

                            {/* Book button */}
                            <button onClick={handleBook} style={{
                                width: '100%', padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
                                background: selectedZone && date && time
                                    ? `linear-gradient(135deg, ${sky}, #0284c7)`
                                    : theme.bgInput,
                                color: selectedZone && date && time ? '#fff' : theme.textFaint,
                                fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif",
                                letterSpacing: '-0.02em', transition: 'all 0.3s ease',
                                boxShadow: selectedZone && date && time ? `0 4px 20px rgba(14,165,233,0.3)` : 'none',
                            }}>
                                {booked ? '✓ Transfer Booked!' : 'Book Transfer'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Airport Map ═══ */}
            <section style={{ padding: isMobile ? '0 16px 40px' : '0 40px 40px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{
                    borderRadius: 24, overflow: 'hidden',
                    border: `1px solid ${theme.borderSubtle}`,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    position: 'relative',
                }}>
                    <div ref={mapContainerRef} style={{ width: '100%', height: isMobile ? 220 : 320 }} />
                    <div style={{
                        position: 'absolute', bottom: 12, left: 12,
                        background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 12, padding: '8px 12px', zIndex: 1000,
                        border: `1px solid ${theme.borderSubtle}`,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 12 }}>✈️</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: sky }}>YAM Airport</span>
                            {selectedZone && (
                                <>
                                    <span style={{ fontSize: 10, color: theme.textFaint }}>→</span>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: theme.text }}>{selectedZone.name}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Features ═══ */}
            <section style={{ padding: isMobile ? '40px 16px 80px' : '60px 40px 100px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 24 : 32, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 32px', textAlign: 'center',
                }}>
                    Why Soobér Airport?
                </h2>

                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                    gap: 16,
                }}>
                    {[
                        { emoji: '💰', title: 'Fixed Rates', desc: 'Know your fare before you book. No meters, no surprises.' },
                        { emoji: '📅', title: 'Schedule Ahead', desc: 'Book days in advance. We track your flight for delays.' },
                        { emoji: '🤝', title: 'Meet & Greet', desc: 'Your driver waits inside the terminal with a name sign.' },
                        { emoji: '⚡', title: 'Electric Fleet', desc: 'Start or end your trip sustainably. Zero emissions.' },
                    ].map((f, i) => (
                        <div key={i} style={{
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            borderRadius: 20, padding: 24, textAlign: 'center',
                            transition: 'transform 0.2s ease',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <span style={{ fontSize: 32, display: 'block', marginBottom: 12 }}>{f.emoji}</span>
                            <h4 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                fontSize: 16, color: theme.text, margin: '0 0 6px',
                            }}>
                                {f.title}
                            </h4>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
}
