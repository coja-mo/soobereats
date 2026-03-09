"use client";

import { useState, useEffect } from 'react';
import { eventFleet, eventTypes, eventPackages } from '../../../lib/data/rides';
import { useTheme } from '../../../lib/ThemeContext';
import Link from 'next/link';

export default function EventsPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState('wedding');
    const [selectedPackage, setSelectedPackage] = useState('premium');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', date: '', details: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const electric = '#0066FF';
    const gold = '#f59e0b';
    const goldBg = 'rgba(245,158,11,0.1)';
    const goldGlow = 'rgba(245,158,11,0.25)';
    const purple = '#8b5cf6';

    const handleSubmit = () => {
        if (formData.name && formData.email && formData.date) setSubmitted(true);
    };

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, transition: 'background 0.3s ease' }}>

            {/* ═══ Hero ═══ */}
            <section style={{
                padding: isMobile ? '60px 16px 40px' : '80px 40px 60px',
                maxWidth: 1440, margin: '0 auto', position: 'relative', overflow: 'hidden',
            }}>
                {/* Multiple gradient orbs */}
                <div style={{
                    position: 'absolute', top: -150, right: -100,
                    width: 500, height: 500, borderRadius: '50%',
                    background: `radial-gradient(circle, ${goldGlow} 0%, transparent 70%)`,
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />
                <div style={{
                    position: 'absolute', bottom: -100, left: -100,
                    width: 400, height: 400, borderRadius: '50%',
                    background: `radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)`,
                    pointerEvents: 'none', filter: 'blur(80px)',
                }} />

                <Link href="/rides" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8, color: theme.textMuted,
                    textDecoration: 'none', fontSize: 14, fontWeight: 500, marginBottom: 24,
                    transition: 'color 0.2s ease',
                }}
                    onMouseEnter={(e) => e.currentTarget.style.color = gold}
                    onMouseLeave={(e) => e.currentTarget.style.color = theme.textMuted}
                >
                    ← Back to Soobér Rides
                </Link>

                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: goldBg, border: `1px solid ${gold}33`,
                    borderRadius: 100, padding: '6px 16px', marginBottom: 24, display: 'flex', width: 'fit-content',
                }}>
                    <span style={{ fontSize: 14 }}>💎</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: gold, letterSpacing: '-0.01em' }}>
                        Premium Event Fleet
                    </span>
                </div>

                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 36 : 56, lineHeight: 1.05, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 16px',
                }}>
                    Make every entrance<br />
                    <span style={{
                        background: `linear-gradient(135deg, ${gold}, #d97706)`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>
                        unforgettable.
                    </span>
                </h1>

                <p style={{
                    fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: theme.textMuted,
                    maxWidth: 560, margin: '0 0 24px',
                }}>
                    Electric Hummers. Tesla Falcon Wings. Matching luxury fleets.
                    Soobér Events turns your special moments into legendary arrivals —
                    all zero-emission, all jaw-dropping.
                </p>
            </section>

            {/* ═══ Event Types ═══ */}
            <section style={{
                padding: isMobile ? '0 16px 40px' : '0 40px 60px',
                maxWidth: 1440, margin: '0 auto',
            }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 24 : 32, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 24px',
                }}>
                    What&apos;s the occasion?
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                    gap: 12,
                }}>
                    {eventTypes.map((et) => (
                        <button
                            key={et.id}
                            onClick={() => setSelectedEvent(et.id)}
                            style={{
                                width: '100%', textAlign: 'left', cursor: 'pointer',
                                background: selectedEvent === et.id
                                    ? (isDark ? `${gold}12` : `${gold}08`)
                                    : theme.bgCard,
                                border: selectedEvent === et.id
                                    ? `2px solid ${gold}`
                                    : `1px solid ${theme.borderSubtle}`,
                                borderRadius: 16, padding: isMobile ? 16 : 20,
                                transition: 'all 0.25s cubic-bezier(0.19, 1, 0.22, 1)',
                            }}
                        >
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>{et.emoji}</span>
                            <span style={{
                                fontWeight: 700, fontSize: 15, color: theme.text,
                                fontFamily: "'DM Sans', sans-serif", display: 'block', marginBottom: 4,
                            }}>
                                {et.name}
                            </span>
                            <span style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.4, display: 'block' }}>
                                {et.description}
                            </span>
                        </button>
                    ))}
                </div>
            </section>

            {/* ═══ Fleet Gallery ═══ */}
            <section style={{
                padding: isMobile ? '40px 16px' : '60px 40px',
                maxWidth: 1440, margin: '0 auto',
            }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 24 : 32, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 12px',
                }}>
                    The Fleet
                </h2>
                <p style={{
                    fontSize: 15, color: theme.textMuted, margin: '0 0 32px', maxWidth: 480,
                }}>
                    Every vehicle is 100% electric. Zero emissions. Maximum wow factor.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: 20,
                }}>
                    {eventFleet.map((vehicle) => (
                        <div
                            key={vehicle.id}
                            style={{
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                borderRadius: 24, overflow: 'hidden',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.12)`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            {/* Vehicle header */}
                            <div style={{
                                background: `linear-gradient(135deg, ${vehicle.color}cc, ${vehicle.color}99)`,
                                padding: '40px 28px', textAlign: 'center',
                            }}>
                                <span style={{ fontSize: 64, display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
                                    {vehicle.emoji}
                                </span>
                            </div>

                            <div style={{ padding: isMobile ? 20 : 28 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <h3 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                        fontSize: 20, color: theme.text, margin: 0, letterSpacing: '-0.03em',
                                    }}>
                                        {vehicle.name}
                                    </h3>
                                    <span style={{
                                        fontWeight: 700, fontSize: 16, color: gold,
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}>
                                        ${vehicle.hourlyRate}/hr
                                    </span>
                                </div>

                                <p style={{
                                    fontSize: 14, color: theme.textMuted, lineHeight: 1.5,
                                    margin: '0 0 4px', fontStyle: 'italic',
                                }}>
                                    &ldquo;{vehicle.tagline}&rdquo;
                                </p>

                                <p style={{
                                    fontSize: 13, color: theme.textMuted, lineHeight: 1.5,
                                    margin: '0 0 16px',
                                }}>
                                    {vehicle.description}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                    {vehicle.features.map((f, i) => (
                                        <span key={i} style={{
                                            background: goldBg, color: gold, borderRadius: 8,
                                            padding: '4px 10px', fontSize: 11, fontWeight: 600,
                                        }}>
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Packages ═══ */}
            <section style={{
                padding: isMobile ? '40px 16px' : '60px 40px',
                maxWidth: 1440, margin: '0 auto',
            }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 24 : 32, letterSpacing: '-0.04em',
                    color: theme.text, margin: '0 0 12px', textAlign: 'center',
                }}>
                    Packages
                </h2>
                <p style={{
                    fontSize: 15, color: theme.textMuted, textAlign: 'center',
                    margin: '0 auto 36px', maxWidth: 420,
                }}>
                    Choose a package or build a custom experience
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
                    gap: 16,
                }}>
                    {eventPackages.map((pkg) => {
                        const isSelected = selectedPackage === pkg.id;
                        const isPopular = pkg.id === 'premium';
                        return (
                            <button
                                key={pkg.id}
                                onClick={() => setSelectedPackage(pkg.id)}
                                style={{
                                    width: '100%', textAlign: 'left', cursor: 'pointer',
                                    background: isSelected
                                        ? (isDark ? `${gold}10` : `${gold}06`)
                                        : theme.bgCard,
                                    border: isSelected ? `2px solid ${gold}` : `1px solid ${theme.borderSubtle}`,
                                    borderRadius: 20, padding: isMobile ? 20 : 24,
                                    position: 'relative', overflow: 'hidden',
                                    transition: 'all 0.25s ease',
                                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                                }}
                            >
                                {isPopular && (
                                    <div style={{
                                        position: 'absolute', top: 12, right: -30,
                                        background: gold, color: '#000', fontSize: 10, fontWeight: 700,
                                        padding: '4px 40px', transform: 'rotate(45deg)',
                                        letterSpacing: '0.05em',
                                    }}>
                                        POPULAR
                                    </div>
                                )}

                                <h4 style={{
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                    fontSize: 18, color: theme.text, margin: '0 0 4px',
                                }}>
                                    {pkg.name}
                                </h4>
                                <div style={{
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                                    fontSize: 32, color: gold, margin: '8px 0',
                                }}>
                                    ${pkg.price}
                                </div>
                                <p style={{ fontSize: 13, color: theme.textMuted, margin: '0 0 16px' }}>
                                    {pkg.hours} hours · {pkg.vehicles} vehicle{pkg.vehicles > 1 ? 's' : ''}
                                </p>

                                <div style={{
                                    borderTop: `1px solid ${theme.borderSubtle}`,
                                    paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6,
                                }}>
                                    {pkg.includes.map((item, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ color: electric, fontSize: 12 }}>✓</span>
                                            <span style={{ fontSize: 12, color: theme.textMuted }}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* ═══ Inquiry Form ═══ */}
            <section style={{
                padding: isMobile ? '40px 16px' : '60px 40px',
                maxWidth: 1440, margin: '0 auto',
            }}>
                <div style={{
                    background: isDark
                        ? `linear-gradient(135deg, rgba(245,158,11,0.04), rgba(139,92,246,0.03))`
                        : `linear-gradient(135deg, rgba(245,158,11,0.06), rgba(139,92,246,0.04))`,
                    border: `1px solid ${gold}22`,
                    borderRadius: 28, padding: isMobile ? 28 : 48,
                    maxWidth: 640, margin: '0 auto',
                }}>
                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                        fontSize: isMobile ? 24 : 32, letterSpacing: '-0.04em',
                        color: theme.text, margin: '0 0 8px', textAlign: 'center',
                    }}>
                        {submitted ? '✓ Inquiry Sent!' : 'Request a Quote'}
                    </h2>
                    <p style={{
                        fontSize: 14, color: theme.textMuted, textAlign: 'center',
                        margin: '0 0 32px',
                    }}>
                        {submitted
                            ? 'Our events team will reach out within 24 hours.'
                            : 'Tell us about your event and we\'ll build a custom package'
                        }
                    </p>

                    {!submitted && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row' }}>
                                <input type="text" placeholder="Your name" value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        flex: 1, background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                        borderRadius: 14, padding: '14px 18px', fontSize: 14, color: theme.text,
                                        outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
                                    }} />
                                <input type="email" placeholder="Email" value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{
                                        flex: 1, background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                        borderRadius: 14, padding: '14px 18px', fontSize: 14, color: theme.text,
                                        outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
                                    }} />
                            </div>
                            <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row' }}>
                                <input type="tel" placeholder="Phone" value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    style={{
                                        flex: 1, background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                        borderRadius: 14, padding: '14px 18px', fontSize: 14, color: theme.text,
                                        outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
                                    }} />
                                <input type="date" value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    style={{
                                        flex: 1, background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                        borderRadius: 14, padding: '14px 18px', fontSize: 14, color: theme.text,
                                        outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box',
                                    }} />
                            </div>
                            <textarea placeholder="Tell us about your event — type, number of guests, travel requirements, special requests..."
                                rows={4} value={formData.details}
                                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                style={{
                                    width: '100%', background: theme.bgInput, border: `1px solid ${theme.borderSubtle}`,
                                    borderRadius: 14, padding: '14px 18px', fontSize: 14, color: theme.text,
                                    outline: 'none', fontFamily: "'Inter', sans-serif", resize: 'vertical',
                                    boxSizing: 'border-box',
                                }} />
                            <button onClick={handleSubmit} style={{
                                width: '100%', padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
                                background: formData.name && formData.email && formData.date
                                    ? `linear-gradient(135deg, ${gold}, #d97706)`
                                    : theme.bgInput,
                                color: formData.name && formData.email && formData.date ? '#000' : theme.textFaint,
                                fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif",
                                letterSpacing: '-0.02em', transition: 'all 0.3s ease',
                                boxShadow: formData.name && formData.email && formData.date ? `0 4px 20px ${goldGlow}` : 'none',
                            }}>
                                Send Inquiry
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══ Bottom CTA ═══ */}
            <section style={{
                padding: isMobile ? '20px 16px 80px' : '20px 40px 100px',
                maxWidth: 1440, margin: '0 auto', textAlign: 'center',
            }}>
                <p style={{
                    fontSize: 14, color: theme.textFaint, margin: '0 0 8px',
                }}>
                    Need something custom? Call us at <strong style={{ color: theme.text }}>(705) 555-SOOB</strong>
                </p>
                <p style={{ fontSize: 13, color: theme.textFaint }}>
                    All vehicles are 100% electric · Professional chauffeurs · Fully insured
                </p>
            </section>
        </div>
    );
}
