"use client";

import { useEffect, useRef } from 'react';

/**
 * RouteMap — Interactive map display using Leaflet (loaded via CDN).
 * Shows pickup marker, dropoff marker, and route polyline.
 * Centered on Sault Ste. Marie by default.
 * 
 * Props:
 * - pickup: {lat, lng} | null
 * - dropoff: {lat, lng} | null
 * - routeGeometry: [[lat, lng], ...] | null
 * - height: CSS height string (default '300px')
 * - theme: theme object
 * - isDark: boolean
 * - accentColor: string (default '#0066FF')
 */
export default function RouteMap({
    pickup = null,
    dropoff = null,
    routeGeometry = null,
    height = '300px',
    theme,
    isDark = false,
    accentColor = '#0066FF',
}) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const routeLayerRef = useRef(null);

    // Load Leaflet CSS + JS via CDN once
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const loadLeaflet = async () => {
            // Check if already loaded
            if (window.L) {
                initMap();
                return;
            }

            // Load CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            // Load JS
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => initMap();
            document.head.appendChild(script);
        };

        loadLeaflet();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    const initMap = () => {
        if (mapRef.current || !containerRef.current || !window.L) return;

        const L = window.L;

        // Default center: Sault Ste. Marie
        const map = L.map(containerRef.current, {
            center: [46.5136, -84.3358],
            zoom: 13,
            zoomControl: false,
            attributionControl: false,
        });

        // Tile layer — dark or light
        L.tileLayer(
            isDark
                ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            {
                maxZoom: 19,
                subdomains: 'abcd',
            }
        ).addTo(map);

        // Zoom control top-right
        L.control.zoom({ position: 'topright' }).addTo(map);

        // Attribution
        L.control.attribution({ position: 'bottomleft', prefix: '© OpenStreetMap' }).addTo(map);

        mapRef.current = map;

        // Apply markers if they exist
        updateMarkers();
    };

    // Update markers and route when props change
    useEffect(() => {
        updateMarkers();
    }, [pickup, dropoff, routeGeometry]);

    const updateMarkers = () => {
        if (!mapRef.current || !window.L) return;

        const L = window.L;
        const map = mapRef.current;

        // Clear existing markers
        markersRef.current.forEach(m => map.removeLayer(m));
        markersRef.current = [];

        // Clear existing route
        if (routeLayerRef.current) {
            map.removeLayer(routeLayerRef.current);
            routeLayerRef.current = null;
        }

        // Custom marker icons
        const pickupIcon = L.divIcon({
            className: 'soober-marker',
            html: `<div style="
                width: 24px; height: 24px; border-radius: 50%;
                background: ${accentColor}; border: 3px solid #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 20px ${accentColor}66;
                display: flex; align-items: center; justify-content: center;
            "><div style="width: 6px; height: 6px; border-radius: 50%; background: #fff;"></div></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });

        const dropoffIcon = L.divIcon({
            className: 'soober-marker',
            html: `<div style="
                width: 24px; height: 24px; border-radius: 6px;
                background: #ef4444; border: 3px solid #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex; align-items: center; justify-content: center;
            "><div style="width: 6px; height: 6px; border-radius: 2px; background: #fff;"></div></div>`,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });

        // Add pickup marker
        if (pickup) {
            const m = L.marker([pickup.lat, pickup.lng], { icon: pickupIcon })
                .addTo(map)
                .bindPopup(`<strong style="font-family: 'DM Sans', sans-serif">Pickup</strong>`);
            markersRef.current.push(m);
        }

        // Add dropoff marker
        if (dropoff) {
            const m = L.marker([dropoff.lat, dropoff.lng], { icon: dropoffIcon })
                .addTo(map)
                .bindPopup(`<strong style="font-family: 'DM Sans', sans-serif">Dropoff</strong>`);
            markersRef.current.push(m);
        }

        // Draw route polyline
        if (routeGeometry && routeGeometry.length > 1) {
            routeLayerRef.current = L.polyline(routeGeometry, {
                color: accentColor,
                weight: 4,
                opacity: 0.8,
                smoothFactor: 1,
                dashArray: null,
            }).addTo(map);

            // Fit map to route bounds with padding
            const bounds = L.latLngBounds([
                ...(pickup ? [[pickup.lat, pickup.lng]] : []),
                ...(dropoff ? [[dropoff.lat, dropoff.lng]] : []),
                ...routeGeometry,
            ]);
            map.fitBounds(bounds, { padding: [40, 40] });
        } else if (pickup && dropoff) {
            // Fit to markers
            const bounds = L.latLngBounds([
                [pickup.lat, pickup.lng],
                [dropoff.lat, dropoff.lng],
            ]);
            map.fitBounds(bounds, { padding: [40, 40] });
        } else if (pickup) {
            map.setView([pickup.lat, pickup.lng], 15);
        } else if (dropoff) {
            map.setView([dropoff.lat, dropoff.lng], 15);
        }
    };

    return (
        <div style={{
            width: '100%', height,
            borderRadius: 20, overflow: 'hidden',
            border: `1px solid ${theme?.borderSubtle || 'rgba(255,255,255,0.1)'}`,
            position: 'relative',
        }}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

            {/* Empty state overlay */}
            {!pickup && !dropoff && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(4px)',
                    pointerEvents: 'none', zIndex: 500,
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: 32, display: 'block', marginBottom: 8 }}>📍</span>
                        <span style={{
                            fontSize: 13, fontWeight: 600,
                            color: theme?.textMuted || '#999',
                            fontFamily: "'Inter', sans-serif",
                        }}>
                            Enter pickup &amp; dropoff to see route
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
