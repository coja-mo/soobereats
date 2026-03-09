"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { localArtisans } from '../lib/data/restaurants';
import { useTheme } from '../lib/ThemeContext';

export function ArtisansSection() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const sectionPad = isMobile ? '0 16px' : '0 40px';

    return (
        <section style={{
            padding: isMobile ? '56px 0 64px' : '80px 0 88px',
            background: theme.mode === 'dark'
                ? 'linear-gradient(180deg, #0d0d10 0%, #111118 50%, #0d0d10 100%)'
                : 'linear-gradient(180deg, #fafafa 0%, #f8f5f0 50%, #fafafa 100%)',
            transition: 'background 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative elements */}
            <div style={{
                position: 'absolute', top: 60, left: -60,
                width: 400, height: 400,
                background: `radial-gradient(circle, ${theme.mode === 'dark' ? 'rgba(234,179,8,0.04)' : 'rgba(234,179,8,0.06)'} 0%, transparent 70%)`,
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: 40, right: -40,
                width: 300, height: 300,
                background: `radial-gradient(circle, ${theme.mode === 'dark' ? 'rgba(168,85,247,0.04)' : 'rgba(168,85,247,0.05)'} 0%, transparent 70%)`,
                pointerEvents: 'none',
            }} />
            {/* Dot pattern overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} 1px, transparent 0)`,
                backgroundSize: '24px 24px',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad, position: 'relative' }}>
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: isMobile ? 36 : 52,
                    maxWidth: 640,
                    margin: '0 auto',
                    marginBottom: isMobile ? 36 : 52,
                }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '8px 20px', borderRadius: 100,
                        background: `linear-gradient(135deg, ${theme.mode === 'dark' ? 'rgba(234,179,8,0.1)' : 'rgba(234,179,8,0.12)'}, ${theme.mode === 'dark' ? 'rgba(168,85,247,0.08)' : 'rgba(168,85,247,0.1)'})`,
                        border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.2)'}`,
                        fontSize: 11, fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        marginBottom: 20,
                        color: theme.accent,
                    }}>✦ Local Artisans &amp; Crafters</div>

                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? 30 : 44, fontWeight: 700,
                        letterSpacing: '-0.04em', lineHeight: 1.08,
                        color: theme.text, marginBottom: 14,
                    }}>
                        Made by hand.{' '}
                        <span style={{
                            background: `linear-gradient(135deg, #eab308, #a855f7)`,
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Made here.</span>
                    </h2>

                    <p style={{
                        fontSize: isMobile ? 14 : 17, color: theme.textMuted,
                        lineHeight: 1.6, maxWidth: 520, margin: '0 auto',
                    }}>
                        The Soo is home to extraordinary makers. Potters, woodworkers, jewelers, weavers, printers — real people pouring their souls into every piece. Give them the spotlight they deserve.
                    </p>
                </div>

                {/* Artisan Grid — larger, more dramatic cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile
                        ? '1fr'
                        : 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: isMobile ? 16 : 22,
                }}>
                    {localArtisans.map((artisan, index) => (
                        <ArtisanCard
                            key={artisan.id}
                            artisan={artisan}
                            theme={theme}
                            isMobile={isMobile}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom message */}
                <div style={{
                    textAlign: 'center',
                    paddingTop: isMobile ? 36 : 52,
                }}>
                    <p style={{
                        fontSize: isMobile ? 13 : 15, color: theme.textFaint,
                        fontWeight: 500, marginBottom: 4,
                    }}>
                        8 local artisans. Every purchase supports a real person, not a corporation.
                    </p>
                    <p style={{
                        fontSize: isMobile ? 12 : 13, color: theme.textMuted,
                        fontStyle: 'italic',
                    }}>
                        Interested in selling on SOOber Eats? We&apos;d love to hear from you.
                    </p>
                </div>
            </div>
        </section>
    );
}

function ArtisanCard({ artisan, theme, isMobile }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={`/artisans/${artisan.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'relative',
                    borderRadius: isMobile ? 20 : 24,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hovered ? theme.shadowLg : theme.shadow,
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* Cover area with gradient */}
                <div style={{
                    position: 'relative',
                    minHeight: isMobile ? 120 : 140,
                    background: `linear-gradient(135deg, ${artisan.coverColor} 0%, ${artisan.coverColor}ee 50%, #09090b 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                }}>
                    {/* Pattern overlay */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)`,
                        backgroundSize: '20px 20px',
                        pointerEvents: 'none',
                    }} />

                    {/* Emoji */}
                    <div style={{
                        fontSize: isMobile ? 52 : 64,
                        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: hovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1) rotate(0)',
                        filter: hovered ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' : 'none',
                        position: 'relative', zIndex: 2,
                    }}>{artisan.emoji}</div>

                    {/* Badge overlay */}
                    {artisan.badge && (
                        <div style={{
                            position: 'absolute', top: 12, right: 14,
                            padding: '4px 10px', borderRadius: 100,
                            background: 'rgba(234,179,8,0.15)',
                            border: '1px solid rgba(234,179,8,0.25)',
                            color: '#eab308', fontSize: 10, fontWeight: 700,
                            letterSpacing: '0.04em', textTransform: 'uppercase',
                            zIndex: 3,
                        }}>✦ {artisan.badge}</div>
                    )}

                    {/* Glow on hover */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'radial-gradient(circle at center, rgba(234,179,8,0.08) 0%, transparent 70%)',
                        opacity: hovered ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                        pointerEvents: 'none',
                    }} />
                </div>

                {/* Content */}
                <div style={{
                    padding: isMobile ? '18px 16px 20px' : '22px 24px 24px',
                    background: theme.bgCard,
                    border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                    borderTop: 'none',
                    borderRadius: `0 0 ${isMobile ? 20 : 24}px ${isMobile ? 20 : 24}px`,
                    flex: 1, display: 'flex', flexDirection: 'column',
                    transition: 'border-color 0.3s ease',
                }}>
                    <h3 style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? 17 : 19, fontWeight: 700,
                        color: theme.text, marginBottom: 4,
                        letterSpacing: '-0.02em', lineHeight: 1.2,
                    }}>{artisan.name}</h3>

                    <p style={{
                        fontSize: 12, color: theme.textFaint,
                        fontWeight: 600, textTransform: 'uppercase',
                        letterSpacing: '0.05em', marginBottom: 10,
                    }}>{artisan.category}</p>

                    <p style={{
                        fontSize: isMobile ? 13 : 14, color: theme.textMuted,
                        lineHeight: 1.5, margin: 0, flex: 1,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{artisan.description}</p>

                    {/* Tags preview */}
                    {artisan.tags && (
                        <div style={{
                            display: 'flex', gap: 6, flexWrap: 'wrap',
                            marginTop: 14,
                        }}>
                            {artisan.tags.slice(0, 2).map((tag) => (
                                <span key={tag} style={{
                                    padding: '3px 10px', borderRadius: 100,
                                    background: theme.accentBg,
                                    color: theme.accent,
                                    fontSize: 10, fontWeight: 600,
                                    letterSpacing: '0.02em',
                                }}>{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 16, paddingTop: 14,
                        borderTop: `1px solid ${theme.borderSubtle}`,
                    }}>
                        <span style={{
                            fontSize: 13, color: theme.textFaint, fontWeight: 600,
                        }}>{artisan.products.length} items</span>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            fontSize: 13, fontWeight: 600,
                            color: hovered ? theme.accent : theme.textMuted,
                            transition: 'color 0.3s ease',
                        }}>
                            Explore
                            <span style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                width: 22, height: 22, borderRadius: 7,
                                background: hovered ? theme.accentBg : theme.bgInput,
                                transition: 'all 0.3s ease',
                                fontSize: 12,
                            }}>→</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
