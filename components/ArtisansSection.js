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
            padding: isMobile ? '64px 0 72px' : '100px 0 110px',
            background: theme.mode === 'dark'
                ? 'linear-gradient(180deg, #09090b 0%, #0f0d14 30%, #12101a 50%, #0f0d14 70%, #09090b 100%)'
                : 'linear-gradient(180deg, #fdfdfd 0%, #f9f6f2 30%, #f5f0ea 50%, #f9f6f2 70%, #fdfdfd 100%)',
            position: 'relative', overflow: 'hidden',
            transition: 'background 0.3s ease',
        }}>
            {/* Ambient orbs */}
            <div style={{ position: 'absolute', top: '-5%', left: '30%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '-10%', right: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '60%', left: '10%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(244,63,94,0.03) 0%, transparent 60%)', pointerEvents: 'none' }} />

            {/* Dot pattern */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(circle at 1px 1px, ${theme.mode === 'dark' ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.015)'} 1px, transparent 0)`,
                backgroundSize: '28px 28px', pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad, position: 'relative' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64, maxWidth: 640, margin: '0 auto', marginBottom: isMobile ? 40 : 64 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '10px 24px', borderRadius: 100,
                        background: `linear-gradient(135deg, ${theme.mode === 'dark' ? 'rgba(234,179,8,0.08)' : 'rgba(234,179,8,0.1)'}, ${theme.mode === 'dark' ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.08)'})`,
                        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                        border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.12)' : 'rgba(234,179,8,0.18)'}`,
                        fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: theme.accent, marginBottom: 24,
                    }}>
                        <span style={{ fontSize: 16 }}>✦</span>
                        Local Artisans &amp; Crafters
                    </div>

                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? 36 : 56, fontWeight: 700,
                        letterSpacing: '-0.04em', lineHeight: 1.05,
                        color: theme.text, marginBottom: 16,
                    }}>
                        Made by hand.{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #eab308, #a855f7)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Made here.</span>
                    </h2>

                    <p style={{
                        fontSize: isMobile ? 15 : 18, color: theme.textMuted,
                        lineHeight: 1.6, maxWidth: 560, margin: '0 auto',
                    }}>
                        The Soo is home to extraordinary makers. Potters, woodworkers, jewelers, weavers — real people pouring their souls into every piece.
                    </p>
                </div>

                {/* Artisan Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: isMobile ? 16 : 24,
                }}>
                    {localArtisans.map((artisan, index) => (
                        <ArtisanCard key={artisan.id} artisan={artisan} theme={theme} isMobile={isMobile} index={index} />
                    ))}
                </div>

                {/* Bottom */}
                <div style={{
                    marginTop: isMobile ? 40 : 64, textAlign: 'center',
                    padding: isMobile ? '28px 20px' : '36px 40px',
                    background: theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${theme.borderSubtle}`,
                    borderRadius: 24,
                }}>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 16 : 20, fontWeight: 700, color: theme.text, marginBottom: 6 }}>
                        {localArtisans.length} local artisans. Every purchase supports a real person.
                    </p>
                    <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 0, fontStyle: 'italic' }}>
                        Interested in selling on Soobér? <Link href="/corporate" style={{ color: theme.accent, textDecoration: 'none', fontWeight: 600 }}>We&apos;d love to hear from you →</Link>
                    </p>
                </div>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes artisanFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-6px) rotate(3deg); }
                }
            `}</style>
        </section>
    );
}

function ArtisanCard({ artisan, theme, isMobile, index }) {
    const [hovered, setHovered] = useState(false);

    const accentColors = ['#eab308', '#a855f7', '#f43f5e', '#06b6d4', '#22c55e', '#f97316', '#3b82f6', '#ec4899'];
    const accent = accentColors[index % accentColors.length];

    return (
        <Link href={`/artisans/${artisan.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'relative', borderRadius: 28, overflow: 'hidden',
                    cursor: 'pointer', height: '100%',
                    transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hovered
                        ? `0 20px 60px rgba(0,0,0,${theme.mode === 'dark' ? '0.5' : '0.12'}), 0 0 0 1px ${accent}30`
                        : `0 4px 16px rgba(0,0,0,${theme.mode === 'dark' ? '0.3' : '0.06'})`,
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* Cover with gradient + emoji */}
                <div style={{
                    position: 'relative',
                    minHeight: isMobile ? 140 : 170,
                    background: `linear-gradient(145deg, ${artisan.coverColor} 0%, ${artisan.coverColor}cc 60%, #09090b 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden',
                }}>
                    {/* Accent top line */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                        opacity: hovered ? 1 : 0.4, transition: 'opacity 0.4s',
                    }} />

                    {/* Dot pattern */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
                        backgroundSize: '24px 24px', pointerEvents: 'none',
                    }} />

                    {/* Emoji */}
                    <div style={{
                        fontSize: isMobile ? 60 : 72, position: 'relative', zIndex: 2,
                        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        transform: hovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1) rotate(0)',
                        filter: hovered ? 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))' : 'none',
                        animation: hovered ? 'artisanFloat 3s ease-in-out infinite' : 'none',
                    }}>{artisan.emoji}</div>

                    {/* Badge */}
                    {artisan.badge && (
                        <div style={{
                            position: 'absolute', top: 14, right: 14, zIndex: 3,
                            padding: '5px 12px', borderRadius: 100,
                            background: `${accent}20`, border: `1px solid ${accent}40`,
                            color: accent, fontSize: 10, fontWeight: 700,
                            letterSpacing: '0.05em', textTransform: 'uppercase',
                            backdropFilter: 'blur(10px)',
                        }}>✦ {artisan.badge}</div>
                    )}

                    {/* Hover glow */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: `radial-gradient(circle at center, ${accent}18 0%, transparent 60%)`,
                        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: 'none',
                    }} />
                </div>

                {/* Content — Glassmorphic */}
                <div style={{
                    padding: isMobile ? '20px 18px 22px' : '24px 26px 28px',
                    background: theme.mode === 'dark' ? 'rgba(24,24,27,0.9)' : 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                    borderTop: `1px solid ${theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}`,
                    flex: 1, display: 'flex', flexDirection: 'column',
                }}>
                    <h3 style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? 18 : 20, fontWeight: 700,
                        color: theme.text, marginBottom: 4,
                        letterSpacing: '-0.02em', lineHeight: 1.2,
                    }}>{artisan.name}</h3>

                    <p style={{
                        fontSize: 11, color: theme.textFaint, fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10,
                    }}>{artisan.category}</p>

                    <p style={{
                        fontSize: isMobile ? 13 : 14, color: theme.textMuted,
                        lineHeight: 1.55, margin: 0, flex: 1,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>{artisan.description}</p>

                    {/* Tags */}
                    {artisan.tags && (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                            {artisan.tags.slice(0, 3).map((tag) => (
                                <span key={tag} style={{
                                    padding: '4px 10px', borderRadius: 100,
                                    background: theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                    border: `1px solid ${theme.borderSubtle}`,
                                    color: theme.textFaint, fontSize: 10, fontWeight: 600,
                                }}>{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        marginTop: 16, paddingTop: 16,
                        borderTop: `1px solid ${theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
                    }}>
                        <span style={{ fontSize: 13, color: theme.textFaint, fontWeight: 600 }}>
                            {artisan.products.length} items
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
                            Explore
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
