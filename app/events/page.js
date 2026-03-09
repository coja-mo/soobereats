"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const EVENTS = [
    { id: 'hockey-night', title: 'Hockey Night Shuttle', venue: 'GFL Memorial Gardens', date: 'Every Home Game', price: '$12', desc: 'Direct shuttle service to every Soo Greyhounds home game. Pickup from 5 locations.', emoji: '🏒', color: '#ef4444', capacity: '48 seats', pickups: ['Station Mall', 'Cambrian Mall', 'Downtown Core', 'North End Hub', 'East Side Plaza'] },
    { id: 'concert-shuttle', title: 'Concert & Show Shuttle', venue: 'Various Venues', date: 'On-Demand', price: '$15', desc: 'Pre-book shuttle service for concerts, comedy shows, and live performances across the Soo.', emoji: '🎵', color: '#8b5cf6', capacity: '24 seats', pickups: ['Downtown Core', 'North End Hub', 'Station Mall'] },
    { id: 'festival-express', title: 'Festival Express', venue: 'Clergue Park / Roberta Bondar', date: 'Summer 2026', price: '$10', desc: 'Loop shuttle during major summer festivals. Runs every 15 minutes from key locations.', emoji: '🎪', color: '#f59e0b', capacity: 'Continuous loop', pickups: ['Station Mall', 'Downtown Core', 'Pier', 'Clergue Park'] },
    { id: 'wedding-luxury', title: 'Wedding Fleet', venue: 'Your Venue', date: 'By Reservation', price: 'From $200', desc: 'Premium EV fleet for your wedding party. Cadillac VISTIQ and GMC Hummer EV available.', emoji: '💒', color: '#ec4899', capacity: 'Up to 12 guests', pickups: ['Custom pickup'] },
    { id: 'corporate-shuttle', title: 'Corporate Event Shuttle', venue: 'Any Venue', date: 'By Reservation', price: 'Custom Quote', desc: 'Branded electric shuttle service for corporate events, conferences, and team outings.', emoji: '🏢', color: '#0066FF', capacity: 'Scalable', pickups: ['Custom routes'] },
    { id: 'new-years-safe', title: "New Year's Safe Ride", venue: 'Citywide', date: 'Dec 31', price: '$8', desc: 'Flat-rate rides all night. Get home safe. Runs midnight–4AM from all venues and bars.', emoji: '🎆', color: '#22c55e', capacity: 'Full fleet', pickups: ['All major venues'] },
];

export default function EventsBookingPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [booked, setBooked] = useState(false);
    const [passengers, setPassengers] = useState(1);

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
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                    <span style={{ fontSize: 16 }}>🎟️</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Event Shuttles</span>
                </div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    Get There Electric
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 500, margin: '0 auto' }}>
                    Book shuttle service for games, concerts, festivals, and private events. All-electric, always on time.
                </p>
            </section>

            {/* ═══ EVENT GRID ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1000, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 14 }}>
                    {EVENTS.map((event, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${selectedEvent === i ? `${event.color}50` : theme.borderSubtle}`,
                            borderRadius: 24, overflow: 'hidden', transition: 'all 0.3s', cursor: 'pointer',
                        }}
                            onClick={() => { setSelectedEvent(selectedEvent === i ? null : i); setBooked(false); }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ padding: isMobile ? 20 : 24 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                    <div>
                                        <span style={{ fontSize: 10, fontWeight: 800, color: event.color, textTransform: 'uppercase', letterSpacing: '0.06em', background: `${event.color}12`, padding: '2px 8px', borderRadius: 6 }}>{event.date}</span>
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: theme.text, margin: '6px 0 0' }}>{event.title}</h3>
                                    </div>
                                    <span style={{ fontSize: 32 }}>{event.emoji}</span>
                                </div>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: '0 0 10px' }}>{event.desc}</p>
                                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 12 }}>
                                    <span style={{ color: theme.textFaint }}>📍 {event.venue}</span>
                                    <span style={{ fontWeight: 700, color: event.color }}>{event.price}</span>
                                    <span style={{ color: theme.textFaint }}>🪑 {event.capacity}</span>
                                </div>
                            </div>

                            {/* Booking Panel */}
                            {selectedEvent === i && (
                                <div style={{
                                    borderTop: `1px solid ${theme.borderSubtle}`, padding: isMobile ? 16 : 20,
                                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                                }}>
                                    {booked ? (
                                        <div style={{ textAlign: 'center', padding: '12px 0' }}>
                                            <span style={{ fontSize: 36, display: 'block', marginBottom: 8 }}>✅</span>
                                            <div style={{ fontWeight: 700, color: theme.text, fontSize: 15 }}>Booking Confirmed!</div>
                                            <div style={{ fontSize: 12, color: theme.textFaint, marginTop: 4 }}>{passengers} passenger{passengers > 1 ? 's' : ''} · Confirmation sent to your email</div>
                                        </div>
                                    ) : (
                                        <div onClick={e => e.stopPropagation()}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Pickup Locations</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                                                {event.pickups.map((p, j) => (
                                                    <span key={j} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: `${event.color}10`, color: event.color, fontWeight: 600 }}>{p}</span>
                                                ))}
                                            </div>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <label style={{ fontSize: 12, color: theme.textMuted }}>Passengers:</label>
                                                <select value={passengers} onChange={e => setPassengers(parseInt(e.target.value))} style={{
                                                    padding: '6px 10px', borderRadius: 8, border: `1px solid ${theme.border}`,
                                                    background: theme.bgInput, color: theme.text, fontSize: 13,
                                                }}>
                                                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                                                </select>
                                                <button onClick={() => setBooked(true)} style={{
                                                    marginLeft: 'auto', padding: '8px 20px', borderRadius: 10, border: 'none',
                                                    background: event.color, color: '#fff', fontWeight: 700, fontSize: 13,
                                                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                                }}>Book Now</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
