"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const zones = [
    { name: 'Downtown Core', radius: '0–3 km', fee: 'Free', time: '15–25 min', color: '#22c55e', desc: 'Queen St, Gore St, Bay St, Wellington St, Pim St corridor' },
    { name: 'East End', radius: '3–6 km', fee: '$2.99', time: '20–35 min', color: '#eab308', desc: 'Trunk Rd, Second Line, McNabb St, Pine St area' },
    { name: 'West End', radius: '3–6 km', fee: '$2.99', time: '20–35 min', color: '#eab308', desc: 'Great Northern Rd, Northern Ave, Old Garden River Rd' },
    { name: 'North End', radius: '4–8 km', fee: '$3.99', time: '25–40 min', color: '#f97316', desc: 'Third Line, Peoples Rd, Sackville area' },
    { name: 'Extended Zone', radius: '8–12 km', fee: '$5.99', time: '30–50 min', color: '#ef4444', desc: 'Garden River approaches, Heyden corridor' },
    { name: 'Garden River First Nation', radius: '~12 km', fee: '$7.99', time: '35–50 min', color: '#8b5cf6', desc: 'Ketegaunseebee — full delivery access for the Anishinaabe community' },
    { name: 'Echo Bay', radius: '~20 km', fee: '$9.99', time: '40–55 min', color: '#06b6d4', desc: 'Rural community east of the Soo, now connected to local food delivery' },
    { name: 'Goulais River', radius: '~25 km', fee: '$11.99', time: '45–65 min', color: '#ec4899', desc: 'Along the Lake Superior shore — premium delivery to an underserved corridor' },
];

const landmarks = [
    { name: 'Station Mall', emoji: '🏬', zone: 'Downtown Core' },
    { name: 'Sault College', emoji: '🎓', zone: 'North End' },
    { name: 'Algoma University', emoji: '📚', zone: 'East End' },
    { name: 'GFL Memorial Gardens', emoji: '🏒', zone: 'Downtown Core' },
    { name: 'Cambrian Mall', emoji: '🛍️', zone: 'East End' },
    { name: 'Sault Area Hospital', emoji: '🏥', zone: 'East End' },
    { name: 'Bellevue Park', emoji: '🌳', zone: 'West End' },
    { name: 'Hiawatha Highlands', emoji: '⛷️', zone: 'North End' },
];

export default function DeliveryZonePage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Initialize Leaflet map with zone circles
    useEffect(() => {
        if (typeof window === 'undefined' || !mapContainerRef.current) return;

        const loadLeaflet = async () => {
            if (!window.L) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
                document.head.appendChild(link);

                await new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }

            if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; }

            const L = window.L;
            const SSM_CENTER = [46.5136, -84.3358];

            const map = L.map(mapContainerRef.current, {
                center: SSM_CENTER, zoom: 11,
                zoomControl: false, attributionControl: false,
            });

            L.tileLayer(
                isDark
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                { maxZoom: 18, subdomains: 'abcd' }
            ).addTo(map);

            L.control.zoom({ position: 'topright' }).addTo(map);

            // Zone circles (approximate radii from downtown center)
            const zoneCircles = [
                { radius: 25000, color: '#ec4899', name: 'Goulais River', fee: '$11.99', time: '45-65 min' },
                { radius: 20000, color: '#06b6d4', name: 'Echo Bay', fee: '$9.99', time: '40-55 min' },
                { radius: 12000, color: '#8b5cf6', name: 'Garden River FN', fee: '$7.99', time: '35-50 min' },
                { radius: 8000, color: '#ef4444', name: 'Extended Zone', fee: '$5.99', time: '30-50 min' },
                { radius: 6000, color: '#f97316', name: 'North End', fee: '$3.99', time: '25-40 min' },
                { radius: 4500, color: '#eab308', name: 'East/West End', fee: '$2.99', time: '20-35 min' },
                { radius: 3000, color: '#22c55e', name: 'Downtown Core', fee: 'Free', time: '15-25 min' },
            ];

            zoneCircles.forEach(z => {
                L.circle(SSM_CENTER, {
                    radius: z.radius, color: z.color, fillColor: z.color,
                    fillOpacity: 0.06, weight: 2, opacity: 0.5, dashArray: '6 4',
                }).addTo(map).bindPopup(
                    `<div style="font-family: 'DM Sans', sans-serif; padding: 4px 0;">
                        <strong style="font-size: 14px; color: ${z.color};">${z.name}</strong><br/>
                        <span style="font-size: 12px; color: #666;">Fee: ${z.fee} · ETA: ${z.time}</span>
                    </div>`
                );
            });

            // Downtown marker
            const icon = L.divIcon({
                className: 'soober-core',
                html: `<div style="width:20px;height:20px;border-radius:50%;background:#22c55e;border:3px solid #fff;box-shadow:0 0 12px rgba(34,197,94,0.5);"></div>`,
                iconSize: [20, 20], iconAnchor: [10, 10],
            });
            L.marker(SSM_CENTER, { icon }).addTo(map)
                .bindPopup('<strong style="font-family:\'DM Sans\',sans-serif">Soobér HQ — Downtown SSM</strong>');

            mapRef.current = map;
        };

        loadLeaflet();
        return () => { if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; } };
    }, [isDark]);

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* Hero */}
            <section style={{
                padding: isMobile ? '60px 0 40px' : '80px 0 60px',
                background: theme.mode === 'dark' ? '#09090b' : '#1c1917',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#22c55e', marginBottom: 24,
                    }}>📍 Delivery Coverage</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 700,
                        letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16,
                    }}>We Deliver Across<br />the Entire Soo</h1>
                    <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
                        Five delivery zones covering Sault Ste. Marie plus extended premium delivery to Garden River First Nation, Goulais River, and Echo Bay. All on our 100% electric fleet.
                    </p>
                </div>
            </section>

            {/* Interactive Zone Map */}
            <section style={{ maxWidth: 1100, margin: '0 auto', padding: pad, paddingTop: isMobile ? 24 : 40 }}>
                <div style={{
                    borderRadius: 24, overflow: 'hidden',
                    border: `1px solid ${theme.borderSubtle}`,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    position: 'relative',
                }}>
                    <div ref={mapContainerRef} style={{ width: '100%', height: isMobile ? 280 : 420 }} />
                    {/* Map legend */}
                    <div style={{
                        position: 'absolute', bottom: 12, left: 12,
                        background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 14, padding: '10px 14px', zIndex: 1000,
                        border: `1px solid ${theme.borderSubtle}`,
                    }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 6 }}>Zones</span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {zones.slice(0, 5).map(z => (
                                <div key={z.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: z.color, flexShrink: 0 }} />
                                    <span style={{ fontSize: 10, color: theme.textMuted, fontWeight: 600 }}>{z.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ maxWidth: 1100, margin: '0 auto', padding: pad }}>

                {/* Zone Cards */}
                <div style={{ paddingTop: isMobile ? 32 : 56, marginBottom: isMobile ? 32 : 48 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 24 }}>Delivery Zones</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {zones.map((zone, i) => (
                            <div key={zone.name} style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '44px 1fr auto auto auto',
                                gap: isMobile ? 12 : 24,
                                alignItems: 'center',
                                padding: isMobile ? 20 : 24, borderRadius: 20,
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                boxShadow: theme.shadow,
                            }}>
                                {/* Zone indicator */}
                                <div style={{
                                    width: 44, height: 44, borderRadius: 14,
                                    background: `${zone.color}18`, border: `2px solid ${zone.color}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 800, color: zone.color, fontSize: 16,
                                    fontFamily: "'DM Sans', sans-serif",
                                }}>{i + 1}</div>

                                {/* Name + desc */}
                                <div>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3 }}>{zone.name}</h3>
                                    <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>{zone.desc}</p>
                                </div>

                                {/* Radius */}
                                <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Distance</div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{zone.radius}</div>
                                </div>

                                {/* Fee */}
                                <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>Fee</div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: zone.fee === 'Free' ? '#22c55e' : theme.text }}>{zone.fee}</div>
                                </div>

                                {/* Time */}
                                <div style={{ textAlign: isMobile ? 'left' : 'center' }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>ETA</div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>{zone.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Landmarks */}
                <div style={{ marginBottom: isMobile ? 32 : 48 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 28, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 24 }}>Popular Landmarks</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 12 }}>
                        {landmarks.map(lm => (
                            <div key={lm.name} style={{
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                borderRadius: 18, padding: 18, textAlign: 'center', boxShadow: theme.shadow,
                            }}>
                                <div style={{ fontSize: 28, marginBottom: 8 }}>{lm.emoji}</div>
                                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 4 }}>{lm.name}</h4>
                                <span style={{ fontSize: 12, color: theme.textFaint }}>{lm.zone}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Community Access Callout */}
                <div style={{
                    padding: isMobile ? '28px 20px' : '40px 40px', borderRadius: 28,
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(234,179,8,0.04) 100%)',
                    border: '1px solid rgba(139,92,246,0.15)',
                    display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? 16 : 24, flexDirection: isMobile ? 'column' : 'row',
                    marginBottom: isMobile ? 24 : 32,
                }}>
                    <div style={{ fontSize: 48, flexShrink: 0 }}>🤝</div>
                    <div>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 8 }}>Community Access Initiative</h3>
                        <p style={{ fontSize: 15, color: theme.textSecondary, margin: 0, lineHeight: 1.6 }}>
                            Garden River First Nation, Goulais River, and Echo Bay are communities that have been underserved by delivery platforms.
                            Soobér is committed to providing equal access. Premium rates reflect distance, not a premium on the people we serve.
                            As volume grows, we&apos;re working to bring these fees down.
                        </p>
                    </div>
                </div>

                {/* EV Callout */}
                <div style={{
                    padding: isMobile ? '28px 20px' : '40px 40px', borderRadius: 28,
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(34,197,94,0.04) 100%)',
                    border: '1px solid rgba(34,197,94,0.15)',
                    display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? 16 : 24, flexDirection: isMobile ? 'column' : 'row',
                }}>
                    <div style={{ fontSize: 48, flexShrink: 0 }}>⚡</div>
                    <div>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 8 }}>100% Electric Fleet</h3>
                        <p style={{ fontSize: 15, color: theme.textSecondary, margin: 0, lineHeight: 1.6 }}>
                            Every delivery across all zones is made by our emission-free electric vehicles. Great food, zero carbon footprint. Gold and Diamond tier members enjoy waived delivery fees on all orders.
                        </p>
                    </div>
                    <Link href="/rewards" style={{ flexShrink: 0, padding: '12px 24px', borderRadius: 14, background: '#22c55e', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap' }}>
                        View Rewards →
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}
