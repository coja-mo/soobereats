"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { sooMrktVendors } from '../lib/data/restaurants';
import { useTheme } from '../lib/ThemeContext';

export function SooMrktSection() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const sectionPad = isMobile ? '0 16px' : '0 40px';

    // Split vendors: first 3 get featured treatment, rest in grid
    const featured = sooMrktVendors.slice(0, 3);
    const rest = sooMrktVendors.slice(3);

    return (
        <section ref={sectionRef} style={{
            padding: isMobile ? '64px 0 72px' : '100px 0 110px',
            background: theme.mode === 'dark'
                ? 'linear-gradient(180deg, #09090b 0%, #0f110f 30%, #111410 50%, #0f110f 70%, #09090b 100%)'
                : 'linear-gradient(180deg, #fdfdfd 0%, #faf9f5 30%, #f5f0e8 50%, #faf9f5 70%, #fdfdfd 100%)',
            position: 'relative', overflow: 'hidden',
            transition: 'background 0.3s ease',
        }}>
            {/* Ambient orbs */}
            <div style={{ position: 'absolute', top: '-10%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-15%', right: '15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '50%', left: '60%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 60%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad, position: 'relative' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        padding: '10px 24px', borderRadius: 100,
                        background: theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                        border: `1px solid ${theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                        fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: theme.textSecondary, marginBottom: 24,
                    }}>
                        <span style={{ fontSize: 18 }}>🧺</span>
                        Algoma&apos;s Local Marketplace
                    </div>

                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? 40 : 64, fontWeight: 700,
                        letterSpacing: '-0.04em', color: theme.text,
                        lineHeight: 1.05, marginBottom: 16,
                    }}>
                        Soo MRKT
                    </h2>
                    <p style={{
                        fontSize: isMobile ? 15 : 18, color: theme.textMuted,
                        maxWidth: 560, margin: '0 auto 24px', lineHeight: 1.6,
                    }}>
                        A curated digital marketplace featuring Sault Ste. Marie&apos;s finest farmers, artisans, and food makers. Fresh from the Saturday market at 73 Brock St.
                    </p>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '8px 18px', borderRadius: 14,
                        background: theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        border: `1px solid ${theme.borderSubtle}`,
                        fontSize: 13, fontWeight: 600, color: theme.textFaint,
                    }}>
                        <span>📍</span> 73 Brock St · Saturdays 8AM–1PM
                    </div>
                </div>

                {/* Featured Vendors — Large Hero Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: isMobile ? 16 : 24,
                    marginBottom: isMobile ? 32 : 48,
                }}>
                    {featured.map((vendor, i) => (
                        <FeaturedVendorCard key={vendor.id} vendor={vendor} theme={theme} isMobile={isMobile} index={i} />
                    ))}
                </div>

                {/* Remaining Vendors — Compact Grid */}
                {rest.length > 0 && (
                    <>
                        <div style={{
                            textAlign: 'center', marginBottom: isMobile ? 20 : 32,
                        }}>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 20 : 24, fontWeight: 700,
                                color: theme.text, letterSpacing: '-0.02em',
                            }}>More Local Vendors</h3>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(240px, 1fr))',
                            gap: isMobile ? 12 : 16,
                        }}>
                            {rest.map((vendor) => (
                                <CompactVendorCard key={vendor.id} vendor={vendor} theme={theme} isMobile={isMobile} />
                            ))}
                        </div>
                    </>
                )}

                {/* Bottom banner */}
                <div style={{
                    marginTop: isMobile ? 40 : 64, textAlign: 'center',
                    padding: isMobile ? '32px 20px' : '40px 40px',
                    background: theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${theme.borderSubtle}`,
                    borderRadius: 24,
                }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 18 : 22, fontWeight: 700, color: theme.text, marginBottom: 8 }}>
                        {sooMrktVendors.length} local vendors. Zero intermediaries. 100% Soo.
                    </p>
                    <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 0 }}>
                        Every product delivered by our ⚡ electric fleet.
                    </p>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes sooFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(2deg); }
                }
                @keyframes sooShimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes sooGlow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.8; }
                }
            `}</style>
        </section>
    );
}

function FeaturedVendorCard({ vendor, theme, isMobile, index }) {
    const [hovered, setHovered] = useState(false);

    const accentColors = ['#eab308', '#10b981', '#8b5cf6'];
    const accent = accentColors[index % 3];

    return (
        <Link href={`/market/${vendor.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'relative',
                    borderRadius: 28,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: hovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0) scale(1)',
                    boxShadow: hovered
                        ? `0 20px 60px rgba(0,0,0,${theme.mode === 'dark' ? '0.5' : '0.15'}), 0 0 0 1px rgba(255,255,255,${theme.mode === 'dark' ? '0.1' : '0.5'})`
                        : `0 4px 20px rgba(0,0,0,${theme.mode === 'dark' ? '0.3' : '0.06'})`,
                    height: isMobile ? 280 : 340,
                }}
            >
                {/* Glass background */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: theme.mode === 'dark'
                        ? `linear-gradient(145deg, rgba(24,24,27,0.95) 0%, rgba(24,24,27,0.85) 100%)`
                        : `linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)`,
                    backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)',
                }} />

                {/* Accent gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(145deg, ${accent}${theme.mode === 'dark' ? '15' : '10'} 0%, transparent 60%)`,
                    transition: 'opacity 0.4s',
                    opacity: hovered ? 1 : 0.5,
                }} />

                {/* Decorative accent line at top */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    opacity: hovered ? 1 : 0.5,
                    transition: 'opacity 0.4s',
                }} />

                {/* Large floating emoji */}
                <div style={{
                    position: 'absolute',
                    right: isMobile ? -10 : -5,
                    bottom: isMobile ? -15 : -10,
                    fontSize: isMobile ? 120 : 160,
                    opacity: theme.mode === 'dark' ? 0.08 : 0.06,
                    pointerEvents: 'none',
                    animation: hovered ? 'sooFloat 3s ease-in-out infinite' : 'none',
                    transition: 'opacity 0.4s',
                }}>{vendor.emoji}</div>

                {/* Content */}
                <div style={{
                    position: 'relative', zIndex: 10, height: '100%',
                    padding: isMobile ? 24 : 32,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                    {/* Top */}
                    <div>
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            marginBottom: isMobile ? 16 : 20,
                        }}>
                            <div style={{
                                width: isMobile ? 56 : 68, height: isMobile ? 56 : 68,
                                borderRadius: isMobile ? 18 : 22,
                                background: theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: isMobile ? 28 : 34,
                                transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0)',
                            }}>{vendor.emoji}</div>

                            {vendor.badge && (
                                <div style={{
                                    padding: '5px 14px', borderRadius: 100,
                                    background: `${accent}20`,
                                    border: `1px solid ${accent}40`,
                                    color: accent, fontSize: 10, fontWeight: 700,
                                    letterSpacing: '0.06em', textTransform: 'uppercase',
                                }}>✦ {vendor.badge}</div>
                            )}
                        </div>

                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 20 : 24, fontWeight: 700,
                            color: theme.text, letterSpacing: '-0.02em',
                            marginBottom: 6, lineHeight: 1.2,
                        }}>{vendor.name}</h3>
                        <p style={{
                            fontSize: 11, color: theme.textFaint, fontWeight: 700,
                            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: isMobile ? 8 : 12,
                        }}>{vendor.category}</p>
                        <p style={{
                            fontSize: isMobile ? 13 : 14, color: theme.textMuted,
                            lineHeight: 1.5, margin: 0,
                            display: '-webkit-box', WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>{vendor.description}</p>
                    </div>

                    {/* Bottom */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        paddingTop: isMobile ? 14 : 18,
                        borderTop: `1px solid ${theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    }}>
                        <span style={{ fontSize: 13, color: theme.textFaint, fontWeight: 600 }}>
                            {vendor.products.length} products
                        </span>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '8px 16px', borderRadius: 12,
                            background: hovered ? accent : (theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                            color: hovered ? '#fff' : theme.textSecondary,
                            fontSize: 13, fontWeight: 700,
                            transition: 'all 0.3s ease',
                            fontFamily: "'DM Sans', sans-serif",
                        }}>
                            Shop Now
                            <span style={{
                                transition: 'transform 0.3s',
                                transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                            }}>→</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function CompactVendorCard({ vendor, theme, isMobile }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={`/market/${vendor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'relative',
                    background: theme.mode === 'dark' ? 'rgba(24,24,27,0.8)' : 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                    border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                    borderRadius: isMobile ? 18 : 22,
                    padding: isMobile ? '20px 16px' : '24px 22px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hovered ? theme.shadowLg : 'none',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* Hover glow */}
                <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 120, height: 120,
                    background: 'radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.4s',
                }} />

                <div style={{
                    fontSize: isMobile ? 32 : 36,
                    marginBottom: isMobile ? 12 : 16,
                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0)',
                }}>{vendor.emoji}</div>

                {vendor.badge && !isMobile && (
                    <div style={{
                        display: 'inline-flex', alignSelf: 'flex-start',
                        padding: '3px 10px', borderRadius: 100,
                        background: theme.accentBg,
                        color: theme.accent, fontSize: 10, fontWeight: 700,
                        letterSpacing: '0.04em', textTransform: 'uppercase',
                        marginBottom: 8,
                    }}>✦ {vendor.badge}</div>
                )}

                <h3 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? 14 : 16, fontWeight: 700,
                    color: theme.text, marginBottom: 4,
                    letterSpacing: '-0.01em', lineHeight: 1.2,
                }}>{vendor.name}</h3>

                <p style={{
                    fontSize: isMobile ? 10 : 11, color: theme.textFaint,
                    fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: isMobile ? 6 : 8,
                }}>{vendor.category}</p>

                {!isMobile && (
                    <p style={{
                        fontSize: 13, color: theme.textMuted, lineHeight: 1.45, margin: 0,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1,
                    }}>{vendor.description}</p>
                )}

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginTop: isMobile ? 8 : 14, paddingTop: isMobile ? 8 : 12,
                    borderTop: `1px solid ${theme.borderSubtle}`,
                }}>
                    <span style={{ fontSize: isMobile ? 11 : 12, color: theme.textFaint, fontWeight: 600 }}>
                        {vendor.products.length} products
                    </span>
                    <div style={{
                        width: 26, height: 26, borderRadius: 8,
                        background: hovered ? theme.dark : theme.bgInput,
                        color: hovered ? theme.darkText : theme.textMuted,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.25s ease', fontSize: 14,
                    }}>→</div>
                </div>
            </div>
        </Link>
    );
}
