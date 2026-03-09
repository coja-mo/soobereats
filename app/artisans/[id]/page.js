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
        addToCart(product, { id: artisan.id, name: artisan.name, image: null, logo: artisan.emoji });
    };

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ paddingBottom: 100, background: theme.bg, transition: 'background 0.3s ease' }}>

            {/* ════════ HERO ════════ */}
            <div style={{
                position: 'relative', overflow: 'hidden',
                minHeight: isMobile ? 380 : 460,
                display: 'flex', alignItems: 'flex-end',
            }}>
                {/* Gradient background */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(160deg, ${artisan.coverColor} 0%, ${artisan.coverColor}cc 40%, ${theme.mode === 'dark' ? '#09090b' : '#1c1917'} 100%)`,
                }} />
                {/* Noise layer */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.025) 1px, transparent 0)',
                    backgroundSize: '32px 32px', pointerEvents: 'none',
                }} />
                {/* Accent orb */}
                <div style={{
                    position: 'absolute', top: '30%', right: '25%',
                    width: 450, height: 450,
                    background: `radial-gradient(circle, ${artisan.coverColor}50 0%, transparent 60%)`,
                    filter: 'blur(80px)', pointerEvents: 'none',
                }} />
                {/* Big emoji watermark */}
                <div style={{
                    position: 'absolute',
                    right: isMobile ? -30 : 80,
                    top: '50%', transform: 'translateY(-50%) rotate(-12deg)',
                    fontSize: isMobile ? 220 : 320,
                    opacity: 0.05, pointerEvents: 'none',
                }}>{artisan.emoji}</div>

                {/* Back button */}
                <Link href="/" style={{
                    position: 'absolute', top: isMobile ? 16 : 24, left: isMobile ? 16 : 24, zIndex: 20,
                    width: 44, height: 44, borderRadius: 14,
                    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none', transition: 'background 0.2s',
                }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>

                {/* Artisan badge */}
                <div style={{
                    position: 'absolute', top: isMobile ? 16 : 24, right: isMobile ? 16 : 24, zIndex: 20,
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px', borderRadius: 100,
                    background: 'rgba(234,179,8,0.1)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(234,179,8,0.2)',
                    color: '#eab308', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>✦ Local Artisan</div>

                {/* Hero content */}
                <div style={{
                    position: 'relative', zIndex: 10, width: '100%',
                    maxWidth: 1440, margin: '0 auto',
                    padding: isMobile ? '0 16px 36px' : '0 40px 52px',
                }}>
                    <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 16 : 28, flexDirection: isMobile ? 'column' : 'row' }}>
                        {/* Icon */}
                        <div style={{
                            width: isMobile ? 88 : 120, height: isMobile ? 88 : 120,
                            borderRadius: isMobile ? 26 : 34,
                            background: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: isMobile ? 46 : 62, flexShrink: 0,
                            boxShadow: '0 12px 48px rgba(0,0,0,0.3)',
                        }}>{artisan.emoji}</div>

                        <div style={{ flex: 1 }}>
                            {artisan.badge && (
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '5px 14px', borderRadius: 100,
                                    background: 'rgba(234,179,8,0.12)',
                                    border: '1px solid rgba(234,179,8,0.2)',
                                    color: '#eab308', fontSize: 11, fontWeight: 700,
                                    letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 14,
                                }}>✦ {artisan.badge}</div>
                            )}

                            <h1 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 34 : 54, fontWeight: 700,
                                color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.05,
                                textShadow: '0 4px 24px rgba(0,0,0,0.4)',
                                margin: 0, marginBottom: 12,
                            }}>{artisan.name}</h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16, flexWrap: 'wrap' }}>
                                <span style={{
                                    padding: '6px 16px', borderRadius: 12,
                                    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                }}>{artisan.category}</span>
                                <span style={{
                                    padding: '6px 16px', borderRadius: 12,
                                    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                }}>{artisan.products.length} creations</span>
                                <span style={{
                                    padding: '6px 16px', borderRadius: 12,
                                    background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)',
                                    color: '#34d399', fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                }}>⚡ Electric Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════ TAGS ════════ */}
            {artisan.tags && artisan.tags.length > 0 && (
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                    <div style={{
                        display: 'flex', gap: 8, flexWrap: 'wrap',
                        padding: isMobile ? '20px 0' : '28px 0',
                        borderBottom: `1px solid ${theme.borderLight}`,
                    }}>
                        {artisan.tags.map((tag) => (
                            <span key={tag} style={{
                                padding: '7px 16px', borderRadius: 100,
                                background: theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                border: `1px solid ${theme.borderSubtle}`,
                                color: theme.textSecondary, fontSize: 12, fontWeight: 600,
                            }}>{tag}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* ════════ STORY + INFO ════════ */}
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 380px',
                    gap: isMobile ? 28 : 56,
                    padding: isMobile ? '28px 0' : '52px 0',
                }}>
                    {/* Story */}
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontSize: 12, fontWeight: 700, color: theme.accent,
                            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14,
                        }}>✦ The Maker&apos;s Story</div>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 22 : 28, fontWeight: 700,
                            color: theme.text, letterSpacing: '-0.02em',
                            marginBottom: 16, lineHeight: 1.15,
                        }}>Meet the hands behind the craft</h2>
                        <p style={{
                            fontSize: isMobile ? 16 : 18, color: theme.textSecondary,
                            lineHeight: 1.8, margin: 0,
                        }}>{artisan.story}</p>
                    </div>

                    {/* Info Card — Glassmorphic */}
                    <div style={{
                        background: theme.mode === 'dark' ? 'rgba(24,24,27,0.6)' : 'rgba(255,255,255,0.7)',
                        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                        border: `1px solid ${theme.borderSubtle}`,
                        borderRadius: 24, padding: isMobile ? 24 : 28,
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
                            { icon: '⚡', label: 'Delivery', value: '100% electric fleet' },
                        ].map((info) => (
                            <div key={info.label} style={{ marginBottom: 20 }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    fontSize: 11, fontWeight: 700, color: theme.textFaint,
                                    textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
                                }}>
                                    <span>{info.icon}</span><span>{info.label}</span>
                                </div>
                                <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.5, margin: 0 }}>{info.value}</p>
                            </div>
                        ))}

                        {/* Support callout */}
                        <div style={{
                            marginTop: 20, padding: '14px 16px', borderRadius: 16,
                            background: theme.accentBg,
                            border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.2)'}`,
                        }}>
                            <p style={{
                                fontSize: 12, color: theme.accent, fontWeight: 600, margin: 0, lineHeight: 1.5,
                            }}>✦ Every purchase directly supports a local artisan and their craft.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════ PRODUCT CATALOG ════════ */}
            <div style={{
                maxWidth: 1440, margin: '0 auto', padding: pad,
                borderTop: `1px solid ${theme.borderLight}`,
            }}>
                <div style={{
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                    paddingTop: isMobile ? 28 : 48, marginBottom: isMobile ? 20 : 28,
                }}>
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontSize: 11, fontWeight: 700, color: theme.accent,
                            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8,
                        }}>🛍️ Shop</div>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 24 : 32, fontWeight: 700,
                            color: theme.text, letterSpacing: '-0.03em',
                        }}>Handcrafted Goods</h2>
                    </div>
                    <span style={{ fontSize: 14, color: theme.textFaint, fontWeight: 500 }}>
                        {artisan.products.length} items
                    </span>
                </div>

                {productCategories.map((cat) => (
                    <div key={cat.name} style={{ marginBottom: isMobile ? 36 : 48 }}>
                        {productCategories.length > 1 && (
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 18 : 22, fontWeight: 700,
                                color: theme.text, letterSpacing: '-0.02em',
                                marginBottom: isMobile ? 14 : 20,
                            }}>{cat.name}</h3>
                        )}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: isMobile ? 10 : 14,
                        }}>
                            {cat.items.map((product) => (
                                <ProductCard key={product.id} product={product} theme={theme} isMobile={isMobile} onAdd={() => handleAdd(product)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProductCard({ product, theme, isMobile, onAdd }) {
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);

    const handleClick = () => { onAdd(); setAdded(true); setTimeout(() => setAdded(false), 1200); };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
            style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: isMobile ? '18px 18px' : '22px 26px',
                borderRadius: isMobile ? 18 : 22,
                background: hovered
                    ? (theme.mode === 'dark' ? 'rgba(30,30,34,0.9)' : 'rgba(255,255,255,0.95)')
                    : (theme.mode === 'dark' ? 'rgba(24,24,27,0.6)' : 'rgba(255,255,255,0.7)'),
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.19, 1, 0.22, 1)',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hovered ? theme.shadowMd : theme.shadow,
                overflow: 'hidden',
            }}
        >
            {/* Hover glow */}
            {hovered && (
                <div style={{
                    position: 'absolute', top: -20, left: -20,
                    width: 100, height: 100,
                    background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
            )}

            <div style={{ flex: 1, marginRight: 16, position: 'relative' }}>
                <h4 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? 15 : 17, fontWeight: 700,
                    color: theme.text, margin: 0, marginBottom: 5,
                }}>{product.name}</h4>
                <p style={{
                    fontSize: 13, color: theme.textFaint,
                    lineHeight: 1.4, margin: 0, marginBottom: 10,
                    display: '-webkit-box', WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>{product.description}</p>
                <span style={{
                    fontSize: isMobile ? 16 : 17, fontWeight: 700,
                    color: theme.text, fontFamily: "'DM Sans', sans-serif",
                }}>${product.price.toFixed(2)}</span>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); handleClick(); }}
                style={{
                    width: isMobile ? 44 : 50, height: isMobile ? 44 : 50,
                    borderRadius: isMobile ? 14 : 16,
                    background: added ? '#22c55e' : (hovered ? 'linear-gradient(135deg, #eab308, #d97706)' : theme.bgInput),
                    color: added ? '#fff' : (hovered ? '#09090b' : theme.textMuted),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    fontSize: 22, fontWeight: 300,
                    transform: added ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: hovered && !added ? '0 4px 16px rgba(234,179,8,0.3)' : 'none',
                }}
            >{added ? '✓' : '+'}</button>
        </div>
    );
}
