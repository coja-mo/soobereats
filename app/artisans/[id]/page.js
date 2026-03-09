"use client";

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getArtisanById } from '../../../lib/data/restaurants';
import { useCart } from '../../../lib/CartContext';
import { useTheme } from '../../../lib/ThemeContext';

export default function ArtisanPage() {
    const params = useParams();
    const artisan = getArtisanById(params.id);
    const { addToCart } = useCart();
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const productCategories = useMemo(() => {
        if (!artisan) return [];
        const grouped = {};
        artisan.products.forEach((item) => {
            const cat = item.category || 'Products';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(item);
        });
        return Object.entries(grouped).map(([name, items]) => ({ name, items }));
    }, [artisan]);

    if (!artisan) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16, padding: 40, background: theme.bg }}>
                <div style={{ fontSize: 80, marginBottom: 8 }}>🎨</div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700, color: theme.text }}>Artisan not found</h1>
                <Link href="/" style={{ background: theme.dark, color: theme.darkText, padding: '14px 32px', borderRadius: 16, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>← Back home</Link>
            </div>
        );
    }

    const handleAdd = (product) => {
        addToCart(product, {
            id: artisan.id,
            name: artisan.name,
            image: null,
            logo: artisan.emoji,
        });
    };

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ paddingBottom: 100, background: theme.bg, transition: 'background 0.3s ease' }}>

            {/* ═══ HERO ═══ */}
            <div style={{
                position: 'relative', overflow: 'hidden',
                minHeight: isMobile ? 340 : 420,
                display: 'flex', alignItems: 'flex-end',
            }}>
                {/* Rich gradient background */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(160deg, ${artisan.coverColor} 0%, #09090b 60%, ${artisan.coverColor}99 100%)`,
                }} />
                {/* Decorative grid pattern */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`,
                    backgroundSize: '32px 32px',
                    pointerEvents: 'none',
                }} />
                {/* Large decorative emoji */}
                <div style={{
                    position: 'absolute',
                    right: isMobile ? -20 : 80,
                    top: '50%', transform: 'translateY(-50%) rotate(-12deg)',
                    fontSize: isMobile ? 200 : 300,
                    opacity: 0.06,
                    pointerEvents: 'none',
                }}>{artisan.emoji}</div>
                {/* Warm glow */}
                <div style={{
                    position: 'absolute', bottom: -80, left: '40%',
                    width: 500, height: 350,
                    background: 'radial-gradient(ellipse, rgba(234,179,8,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                {/* Back button */}
                <Link href="/" style={{
                    position: 'absolute', top: isMobile ? 16 : 24, left: isMobile ? 16 : 24, zIndex: 20,
                    width: 44, height: 44, borderRadius: 14,
                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none',
                }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>

                {/* Artisan badge */}
                <div style={{
                    position: 'absolute', top: isMobile ? 16 : 24, right: isMobile ? 16 : 24, zIndex: 20,
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 100,
                    background: 'rgba(234,179,8,0.12)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(234,179,8,0.2)',
                    color: '#eab308', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>✦ Local Artisan</div>

                {/* Hero content */}
                <div style={{
                    position: 'relative', zIndex: 10, width: '100%',
                    maxWidth: 1440, margin: '0 auto',
                    padding: isMobile ? '0 16px 32px' : '0 40px 44px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 16 : 24 }}>
                        {/* Artisan icon */}
                        <div style={{
                            width: isMobile ? 80 : 110, height: isMobile ? 80 : 110,
                            borderRadius: isMobile ? 22 : 30,
                            background: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: isMobile ? 42 : 56, flexShrink: 0,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        }}>{artisan.emoji}</div>

                        <div style={{ flex: 1 }}>
                            {/* Badge */}
                            {artisan.badge && (
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '4px 12px', borderRadius: 100,
                                    background: 'rgba(234,179,8,0.12)',
                                    border: '1px solid rgba(234,179,8,0.2)',
                                    color: '#eab308', fontSize: 11, fontWeight: 700,
                                    letterSpacing: '0.04em', textTransform: 'uppercase',
                                    marginBottom: 10,
                                }}>✦ {artisan.badge}</div>
                            )}

                            <h1 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 30 : 46, fontWeight: 700,
                                color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.08,
                                textShadow: '0 2px 20px rgba(0,0,0,0.4)',
                                margin: 0, marginBottom: 10,
                            }}>{artisan.name}</h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 14, flexWrap: 'wrap' }}>
                                <span style={{
                                    color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? 13 : 15,
                                    fontWeight: 600,
                                }}>{artisan.category}</span>
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}></span>
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: isMobile ? 12 : 14 }}>
                                    {artisan.products.length} creations
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ TAGS ═══ */}
            {artisan.tags && artisan.tags.length > 0 && (
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                    <div style={{
                        display: 'flex', gap: 8, flexWrap: 'wrap',
                        padding: isMobile ? '16px 0' : '24px 0',
                        borderBottom: `1px solid ${theme.borderLight}`,
                    }}>
                        {artisan.tags.map((tag) => (
                            <span key={tag} style={{
                                padding: '6px 14px', borderRadius: 100,
                                background: theme.accentBg,
                                border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.2)' : 'rgba(234,179,8,0.3)'}`,
                                color: theme.accent,
                                fontSize: 12, fontWeight: 600,
                                letterSpacing: '0.02em',
                            }}>{tag}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══ STORY + INFO ═══ */}
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
                    gap: isMobile ? 28 : 56,
                    padding: isMobile ? '28px 0' : '48px 0',
                }}>
                    {/* The Maker's Story */}
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontSize: 12, fontWeight: 700, color: theme.accent,
                            letterSpacing: '0.06em', textTransform: 'uppercase',
                            marginBottom: 14,
                        }}>✦ The Maker&apos;s Story</div>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 22 : 28, fontWeight: 700,
                            color: theme.text, letterSpacing: '-0.02em',
                            marginBottom: 16, lineHeight: 1.15,
                        }}>Meet the hands behind the craft</h2>
                        <p style={{
                            fontSize: isMobile ? 15 : 17, color: theme.textSecondary,
                            lineHeight: 1.75, margin: 0,
                        }}>{artisan.story}</p>
                    </div>

                    {/* Info Card */}
                    <div style={{
                        background: theme.bgCard,
                        border: `1px solid ${theme.borderSubtle}`,
                        borderRadius: 22, padding: isMobile ? 20 : 28,
                        height: 'fit-content',
                    }}>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 17, fontWeight: 700, color: theme.text,
                            marginBottom: 24, letterSpacing: '-0.01em',
                        }}>Artisan Details</h3>

                        {[
                            { icon: '📍', label: 'Find Them', value: artisan.locationDetail },
                            { icon: '🕐', label: 'Hours', value: artisan.hours },
                            { icon: '🏷️', label: 'Craft', value: artisan.category },
                            { icon: '📦', label: 'Available', value: `${artisan.products.length} unique items` },
                        ].map((info) => (
                            <div key={info.label} style={{ marginBottom: 20 }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    fontSize: 11, fontWeight: 700, color: theme.textFaint,
                                    textTransform: 'uppercase', letterSpacing: '0.06em',
                                    marginBottom: 6,
                                }}>
                                    <span>{info.icon}</span><span>{info.label}</span>
                                </div>
                                <p style={{
                                    fontSize: 14, color: theme.textSecondary,
                                    lineHeight: 1.5, margin: 0,
                                }}>{info.value}</p>
                            </div>
                        ))}

                        {/* Support local callout */}
                        <div style={{
                            marginTop: 20, padding: '14px 16px',
                            borderRadius: 14,
                            background: theme.accentBg,
                            border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.2)'}`,
                        }}>
                            <p style={{
                                fontSize: 12, color: theme.accent,
                                fontWeight: 600, margin: 0, lineHeight: 1.5,
                            }}>
                                ✦ Every purchase directly supports a local artisan and their craft.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══ PRODUCT CATALOG ═══ */}
            <div style={{
                maxWidth: 1440, margin: '0 auto', padding: pad,
                borderTop: `1px solid ${theme.borderLight}`,
            }}>
                <div style={{
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                    paddingTop: isMobile ? 28 : 44,
                    marginBottom: isMobile ? 20 : 28,
                }}>
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontSize: 12, fontWeight: 700, color: theme.accent,
                            letterSpacing: '0.06em', textTransform: 'uppercase',
                            marginBottom: 8,
                        }}>🛍️ Shop Their Collection</div>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 24 : 32, fontWeight: 700,
                            color: theme.text, letterSpacing: '-0.03em',
                        }}>Handcrafted Goods</h2>
                    </div>
                </div>

                {productCategories.map((cat) => (
                    <div key={cat.name} style={{ marginBottom: isMobile ? 32 : 48 }}>
                        {productCategories.length > 1 && (
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 18 : 20, fontWeight: 700,
                                color: theme.text, letterSpacing: '-0.02em',
                                marginBottom: isMobile ? 14 : 18,
                            }}>{cat.name}</h3>
                        )}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: isMobile ? 12 : 16,
                        }}>
                            {cat.items.map((product) => (
                                <ArtisanProductCard
                                    key={product.id}
                                    product={product}
                                    theme={theme}
                                    isMobile={isMobile}
                                    onAdd={() => handleAdd(product)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ArtisanProductCard({ product, theme, isMobile, onAdd }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onAdd}
            style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: isMobile ? '18px 16px' : '22px 24px',
                borderRadius: isMobile ? 18 : 22,
                background: hovered ? theme.bgCardHover : theme.bgCard,
                border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.19, 1, 0.22, 1)',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hovered ? theme.shadowMd : theme.shadow,
                overflow: 'hidden',
            }}
        >
            {/* Hover accent glow */}
            {hovered && (
                <div style={{
                    position: 'absolute', top: -20, left: -20,
                    width: 80, height: 80,
                    background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
            )}

            <div style={{ flex: 1, marginRight: 16, position: 'relative' }}>
                <h4 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? 15 : 16, fontWeight: 700,
                    color: theme.text, margin: 0, marginBottom: 5,
                }}>{product.name}</h4>
                <p style={{
                    fontSize: 13, color: theme.textFaint,
                    lineHeight: 1.4, margin: 0, marginBottom: 10,
                }}>{product.description}</p>
                <span style={{
                    fontSize: isMobile ? 16 : 17, fontWeight: 700,
                    color: theme.text, fontFamily: "'DM Sans', sans-serif",
                }}>${product.price.toFixed(2)}</span>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onAdd(); }}
                style={{
                    width: isMobile ? 44 : 48, height: isMobile ? 44 : 48,
                    borderRadius: isMobile ? 14 : 16,
                    background: hovered
                        ? 'linear-gradient(135deg, #eab308, #d97706)'
                        : theme.bgInput,
                    color: hovered ? '#09090b' : theme.textMuted,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: 22, fontWeight: 300,
                    boxShadow: hovered ? '0 4px 16px rgba(234,179,8,0.3)' : 'none',
                }}
            >+</button>
        </div>
    );
}
