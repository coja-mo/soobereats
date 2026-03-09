"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../lib/ThemeContext';
import { Footer } from '../../../components/Footer';

// Simulated live order data
const ORDER = {
    id: 'ORD-4012',
    restaurant: "Pino's Fresh Market",
    restaurantAddr: '123 Queen St E',
    items: [
        { name: 'Organic 2% Milk', qty: 1, price: 5.99 },
        { name: 'Sourdough Bread', qty: 1, price: 7.49 },
        { name: 'Local Wildflower Honey', qty: 1, price: 12.99 },
        { name: 'Free-Range Eggs (dozen)', qty: 1, price: 6.00 },
    ],
    driver: { name: 'Marcus T.', rating: 4.97, trips: 812, vehicle: 'Black GMC Hummer EV', plate: 'SOOB 042' },
    status: 'en_route', // preparing, picked_up, en_route, arriving, delivered
    placedAt: '4:12 PM',
    estimatedDelivery: '4:38 PM',
    deliveryAddress: '456 Wellington St E',
};

const STATUSES = [
    { key: 'confirmed', label: 'Order Confirmed', icon: '✓', time: '4:12 PM' },
    { key: 'preparing', label: 'Being Prepared', icon: '👨‍🍳', time: '4:14 PM' },
    { key: 'picked_up', label: 'Picked Up', icon: '📦', time: '4:22 PM' },
    { key: 'en_route', label: 'On the Way', icon: '🚗', time: '4:26 PM' },
    { key: 'arriving', label: 'Arriving Soon', icon: '📍', time: null },
    { key: 'delivered', label: 'Delivered', icon: '✅', time: null },
];

export default function LiveTrackingPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [currentStep, setCurrentStep] = useState(3); // en_route index
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const accent = '#22c55e';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Simulated driver movement
    const driverPath = [
        [46.5120, -84.3380], [46.5128, -84.3360], [46.5135, -84.3340],
        [46.5140, -84.3320], [46.5145, -84.3300], [46.5150, -84.3280],
        [46.5155, -84.3265], [46.5160, -84.3250],
    ];

    const restaurantCoords = [46.5110, -84.3400];
    const deliveryCoords = [46.5160, -84.3250];

    // Init map
    useEffect(() => {
        if (typeof window === 'undefined' || !mapRef.current) return;

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

            if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; }
            const L = window.L;

            const map = L.map(mapRef.current, {
                center: [46.5135, -84.3330], zoom: 15,
                zoomControl: false, attributionControl: false,
            });

            L.tileLayer(
                isDark
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
                { maxZoom: 18, subdomains: 'abcd' }
            ).addTo(map);

            L.control.zoom({ position: 'topright' }).addTo(map);

            // Restaurant marker
            const restIcon = L.divIcon({
                className: 'rest-icon',
                html: `<div style="width:30px;height:30px;border-radius:10px;background:${accent};border:3px solid #fff;box-shadow:0 2px 12px rgba(34,197,94,0.4);display:flex;align-items:center;justify-content:center;font-size:14px;">🏪</div>`,
                iconSize: [30, 30], iconAnchor: [15, 15],
            });
            L.marker(restaurantCoords, { icon: restIcon }).addTo(map)
                .bindPopup(`<strong style="font-family:'DM Sans',sans-serif">Pino's Fresh Market</strong><br><span style="font-size:11px;color:#666">123 Queen St E</span>`);

            // Delivery marker
            const delIcon = L.divIcon({
                className: 'del-icon',
                html: `<div style="width:30px;height:30px;border-radius:10px;background:#eab308;border:3px solid #fff;box-shadow:0 2px 12px rgba(234,179,8,0.4);display:flex;align-items:center;justify-content:center;font-size:14px;">🏠</div>`,
                iconSize: [30, 30], iconAnchor: [15, 15],
            });
            L.marker(deliveryCoords, { icon: delIcon }).addTo(map)
                .bindPopup(`<strong style="font-family:'DM Sans',sans-serif">Your Address</strong><br><span style="font-size:11px;color:#666">456 Wellington St E</span>`);

            // Route line
            L.polyline(driverPath, {
                color: accent, weight: 3, opacity: 0.5, dashArray: '8 6',
            }).addTo(map);

            // Driver marker (animated)
            const driverIcon = L.divIcon({
                className: 'driver-icon',
                html: `<div style="width:34px;height:34px;border-radius:50%;background:#111;border:3px solid ${accent};box-shadow:0 0 16px rgba(34,197,94,0.5);display:flex;align-items:center;justify-content:center;font-size:15px;">🚗</div>`,
                iconSize: [34, 34], iconAnchor: [17, 17],
            });
            const driverMarker = L.marker(driverPath[0], { icon: driverIcon }).addTo(map);
            markerRef.current = driverMarker;

            mapInstanceRef.current = map;

            // Animate driver along path
            let pathIndex = 0;
            const moveDriver = () => {
                if (pathIndex < driverPath.length) {
                    driverMarker.setLatLng(driverPath[pathIndex]);
                    pathIndex++;
                    setTimeout(moveDriver, 2000);
                }
            };
            setTimeout(moveDriver, 1000);
        };

        loadMap();
        return () => { if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; } };
    }, [isDark]);

    // Simulate progress
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep(prev => (prev < 5 ? prev + 1 : prev));
        }, 12000);
        return () => clearInterval(timer);
    }, []);

    const subtotal = ORDER.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const deliveryFee = 2.99;
    const total = subtotal + deliveryFee;

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            <div style={{
                maxWidth: 1200, margin: '0 auto',
                padding: isMobile ? '16px' : '24px 40px',
                display: isMobile ? 'flex' : 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
                gap: isMobile ? 16 : 24,
                flexDirection: 'column',
            }}>

                {/* ═══ LEFT: MAP + STATUS ═══ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                                🟢 Live Tracking
                            </div>
                            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 26, letterSpacing: '-0.03em', color: theme.text, margin: 0 }}>
                                Order #{ORDER.id}
                            </h1>
                        </div>
                        <Link href="/support" style={{
                            padding: '8px 16px', borderRadius: 10,
                            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${theme.borderSubtle}`,
                            fontSize: 12, fontWeight: 700, color: theme.textMuted,
                            textDecoration: 'none',
                        }}>
                            💬 Help
                        </Link>
                    </div>

                    {/* Map */}
                    <div style={{
                        borderRadius: 22, overflow: 'hidden', position: 'relative',
                        border: `1px solid ${theme.borderSubtle}`,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                    }}>
                        <div ref={mapRef} style={{ width: '100%', height: isMobile ? 250 : 360 }} />

                        {/* ETA overlay */}
                        <div style={{
                            position: 'absolute', top: 12, left: 12, zIndex: 1000,
                            background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.92)',
                            backdropFilter: 'blur(12px)', borderRadius: 14, padding: '10px 14px',
                            border: `1px solid ${theme.borderSubtle}`,
                        }}>
                            <div style={{ fontSize: 10, color: theme.textFaint, fontWeight: 600, marginBottom: 2 }}>ESTIMATED ARRIVAL</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: theme.text, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em' }}>
                                {ORDER.estimatedDelivery}
                            </div>
                            <div style={{ fontSize: 10, color: accent, fontWeight: 600 }}>~12 min remaining</div>
                        </div>
                    </div>

                    {/* Progress Tracker */}
                    <div style={{
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                        padding: isMobile ? 16 : 20,
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                            {/* Progress line */}
                            <div style={{
                                position: 'absolute', top: 14, left: 20, right: 20, height: 3,
                                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                                borderRadius: 2,
                            }}>
                                <div style={{
                                    height: '100%', width: `${(currentStep / (STATUSES.length - 1)) * 100}%`,
                                    background: `linear-gradient(90deg, ${accent}, #16a34a)`,
                                    borderRadius: 2, transition: 'width 1s ease',
                                }} />
                            </div>

                            {STATUSES.map((s, i) => (
                                <div key={s.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, flex: 1 }}>
                                    <div style={{
                                        width: 30, height: 30, borderRadius: 10,
                                        background: i <= currentStep ? accent : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 13, transition: 'all 0.5s',
                                        border: i === currentStep ? `2px solid ${accent}` : '2px solid transparent',
                                        boxShadow: i === currentStep ? `0 0 12px rgba(34,197,94,0.4)` : 'none',
                                    }}>
                                        {i <= currentStep ? s.icon : ''}
                                    </div>
                                    <span style={{
                                        fontSize: 8, fontWeight: 700, color: i <= currentStep ? theme.text : theme.textFaint,
                                        marginTop: 6, textAlign: 'center', maxWidth: 60,
                                    }}>{!isMobile || i === currentStep ? s.label : ''}</span>
                                    {s.time && i <= currentStep && (
                                        <span style={{ fontSize: 8, color: theme.textFaint, marginTop: 1 }}>{s.time}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ═══ RIGHT: ORDER DETAILS ═══ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                    {/* Driver Card */}
                    <div style={{
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                        padding: isMobile ? 16 : 20,
                    }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Your Driver</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 14,
                                background: `linear-gradient(135deg, ${accent}, #16a34a)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 20, color: '#fff', fontWeight: 800, fontFamily: "'DM Sans', sans-serif",
                            }}>
                                {ORDER.driver.name.charAt(0)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 16, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>{ORDER.driver.name}</div>
                                <div style={{ fontSize: 11, color: theme.textMuted }}>
                                    ⭐ {ORDER.driver.rating} • {ORDER.driver.trips} trips
                                </div>
                            </div>
                        </div>
                        <div style={{
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                            borderRadius: 12, padding: 10, fontSize: 12,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                <span style={{ color: theme.textFaint }}>Vehicle</span>
                                <span style={{ fontWeight: 600, color: theme.text }}>{ORDER.driver.vehicle}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: theme.textFaint }}>Plate</span>
                                <span style={{ fontWeight: 600, color: theme.text }}>{ORDER.driver.plate}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                            <button style={{
                                flex: 1, padding: '10px', borderRadius: 10, border: 'none',
                                background: accent, color: '#000', fontWeight: 700, fontSize: 12,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                            }}>📞 Call</button>
                            <button style={{
                                flex: 1, padding: '10px', borderRadius: 10,
                                border: `1px solid ${theme.borderSubtle}`,
                                background: 'transparent', color: theme.text, fontWeight: 700, fontSize: 12,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                            }}>💬 Message</button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div style={{
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                        padding: isMobile ? 16 : 20,
                    }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Order Summary</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: theme.text, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
                            🏪 {ORDER.restaurant}
                        </div>
                        {ORDER.items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < ORDER.items.length - 1 ? `1px solid ${theme.borderSubtle}` : 'none' }}>
                                <span style={{ fontSize: 13, color: theme.text }}>{item.qty}× {item.name}</span>
                                <span style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>${item.price.toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${theme.borderSubtle}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>
                                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: theme.textMuted, marginBottom: 4 }}>
                                <span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: theme.text }}>
                                <span>Total</span><span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Details */}
                    <div style={{
                        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                        padding: isMobile ? 16 : 20,
                    }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Delivery Details</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <span style={{ fontSize: 14 }}>📍</span>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted }}>Delivering to</div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{ORDER.deliveryAddress}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <span style={{ fontSize: 14 }}>🕐</span>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted }}>Placed at</div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{ORDER.placedAt}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 8 }}>
                                <span style={{ fontSize: 14 }}>⚡</span>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: theme.textMuted }}>Delivery Mode</div>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: accent }}>100% Electric • Zero Emissions</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
}
