"use client";

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getVendorById } from '../../../lib/data/restaurants';
import { useCart } from '../../../lib/CartContext';
import { useTheme } from '../../../lib/ThemeContext';

export default function VendorPage() {
    const params = useParams();
    const vendor = getVendorById(params.id);
    const { addToCart } = useCart();
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const productCategories = useMemo(() => {
        if (!vendor) return [];
        const grouped = {};
        vendor.products.forEach((item) => {
            const cat = item.category || 'Products';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push(item);
        });
        return Object.entries(grouped).map(([name, items]) => ({ name, items }));
    }, [vendor]);

    const currentCategory = activeCategory || (productCategories[0]?.name ?? null);

    if (!vendor) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16, padding: 40, background: theme.bg }}>
                <div style={{ fontSize: 80, marginBottom: 8 }}>🧺</div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700, color: theme.text }}>Vendor not found</h1>
                <Link href="/" style={{ background: theme.dark, color: theme.darkText, padding: '14px 32px', borderRadius: 16, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>← Back to Soo MRKT</Link>
            </div>
        );
    }

    const handleAdd = (product) => {
        addToCart(product, {
            id: vendor.id,
            name: vendor.name,
            image: null,
            logo: vendor.emoji,
        });
    };

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ paddingBottom: 100, background: theme.bg, transition: 'background 0.3s ease' }}>

            {/* ════════ HERO ════════ */}
            <div style={{
                position: 'relative', overflow: 'hidden',
                minHeight: isMobile ? 360 : 440,
                display: 'flex', alignItems: 'flex-end',
            }}>
                {/* Rich gradient background */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(145deg, ${vendor.coverColor} 0%, ${vendor.coverColor}cc 40%, ${theme.mode === 'dark' ? '#09090b' : '#1c1917'} 100%)`,
                }} />
                {/* Glass noise layer */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: theme.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(0.5px)',
                }} />
                {/* Accent orb */}
                <div style={{
                    position: 'absolute', top: '20%', right: '20%',
                    width: 400, height: 400,
                    background: `radial-gradient(circle, ${vendor.coverColor}40 0%, transparent 60%)`,
                    pointerEvents: 'none', filter: 'blur(60px)',
                }} />
                {/* Big emoji watermark */}
                <div style={{
                    position: 'absolute',
                    right: isMobile ? -40 : 80,
                    top: '50%', transform: 'translateY(-50%)',
                    fontSize: isMobile ? 200 : 300,
                    opacity: 0.06, pointerEvents: 'none',
                }}>{vendor.emoji}</div>

                {/* Back + Soo MRKT badge */}
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

                <div style={{
                    position: 'absolute', top: isMobile ? 16 : 24, right: isMobile ? 16 : 24, zIndex: 20,
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px', borderRadius: 100,
                    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fafafa', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>🧺 Soo MRKT</div>

                {/* Hero content */}
                <div style={{
                    position: 'relative', zIndex: 10, width: '100%',
                    maxWidth: 1440, margin: '0 auto',
                    padding: isMobile ? '0 16px 32px' : '0 40px 48px',
                }}>
                    <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 16 : 28, flexDirection: isMobile ? 'column' : 'row' }}>
                        {/* Icon */}
                        <div style={{
                            width: isMobile ? 80 : 110, height: isMobile ? 80 : 110,
                            borderRadius: isMobile ? 24 : 32,
                            background: 'rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: isMobile ? 42 : 58, flexShrink: 0,
                            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                        }}>{vendor.emoji}</div>

                        <div style={{ flex: 1 }}>
                            {vendor.badge && (
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '5px 14px', borderRadius: 100,
                                    background: 'rgba(234,179,8,0.12)',
                                    border: '1px solid rgba(234,179,8,0.2)',
                                    color: '#eab308', fontSize: 11, fontWeight: 700,
                                    letterSpacing: '0.04em', textTransform: 'uppercase',
                                    marginBottom: 12,
                                }}>✦ {vendor.badge}</div>
                            )}

                            <h1 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 32 : 52, fontWeight: 700,
                                color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.05,
                                textShadow: '0 4px 24px rgba(0,0,0,0.4)',
                                margin: 0, marginBottom: 10,
                            }}>{vendor.name}</h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 16, flexWrap: 'wrap' }}>
                                <span style={{
                                    padding: '5px 14px', borderRadius: 10,
                                    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                }}>{vendor.category}</span>
                                <span style={{
                                    padding: '5px 14px', borderRadius: 10,
                                    background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                }}>{vendor.products.length} products</span>
                                <span style={{
                                    padding: '5px 14px', borderRadius: 10,
                                    background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)',
                                    color: '#34d399', fontSize: isMobile ? 12 : 13, fontWeight: 600,
                                }}>⚡ Electric Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════ TAGS ════════ */}
            {vendor.tags && vendor.tags.length > 0 && (
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                    <div style={{
                        display: 'flex', gap: 8, flexWrap: 'wrap',
                        padding: isMobile ? '20px 0' : '28px 0',
                        borderBottom: `1px solid ${theme.borderLight}`,
                    }}>
                        {vendor.tags.map((tag) => (
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
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
                    gap: isMobile ? 24 : 48,
                    padding: isMobile ? '28px 0' : '48px 0',
                }}>
                    {/* Story */}
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            fontSize: 11, fontWeight: 700, color: theme.textFaint,
                            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16,
                        }}>📖 Our Story</div>
                        <p style={{
                            fontSize: isMobile ? 16 : 18, color: theme.textSecondary,
                            lineHeight: 1.8, margin: 0,
                        }}>{vendor.story}</p>
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
                            marginBottom: 20, letterSpacing: '-0.01em',
                        }}>Vendor Details</h3>

                        {[
                            { icon: '📍', label: 'Location', value: vendor.locationDetail },
                            { icon: '🕐', label: 'Hours', value: vendor.hours },
                            { icon: '📦', label: 'Products', value: `${vendor.products.length} items in stock` },
                            { icon: '⚡', label: 'Delivery', value: '100% electric fleet' },
                        ].map((info) => (
                            <div key={info.label} style={{ marginBottom: 20 }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    fontSize: 11, fontWeight: 700, color: theme.textFaint,
                                    textTransform: 'uppercase', letterSpacing: '0.06em',
                                    marginBottom: 6,
                                }}>
                                    <span>{info.icon}</span>
                                    <span>{info.label}</span>
                                </div>
                                <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.5, margin: 0 }}>{info.value}</p>
                            </div>
                        ))}
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
                        }}>🛒 Shop</div>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 24 : 32, fontWeight: 700,
                            color: theme.text, letterSpacing: '-0.03em',
                        }}>Products</h2>
                    </div>
                    <span style={{ fontSize: 14, color: theme.textFaint, fontWeight: 500 }}>
                        {vendor.products.length} items
                    </span>
                </div>

                {/* Category tabs */}
                {productCategories.length > 1 && (
                    <div style={{
                        display: 'flex', gap: 6, overflowX: 'auto',
                        paddingBottom: isMobile ? 16 : 24,
                        WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
                    }}>
                        {productCategories.map((cat) => (
                            <button key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                style={{
                                    padding: '8px 20px', borderRadius: 100,
                                    border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                                    fontSize: 13, fontWeight: 600,
                                    fontFamily: "'DM Sans', sans-serif",
                                    background: currentCategory === cat.name ? theme.dark : theme.bgInput,
                                    color: currentCategory === cat.name ? theme.darkText : theme.textMuted,
                                    transition: 'all 0.25s ease',
                                }}
                            >{cat.name}</button>
                        ))}
                    </div>
                )}

                {/* Product grid */}
                {productCategories.map((cat) => (
                    <div key={cat.name} id={`cat-${cat.name.replace(/\s+/g, '-').toLowerCase()}`} style={{ marginBottom: isMobile ? 36 : 48 }}>
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
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
                            gap: isMobile ? 10 : 14,
                        }}>
                            {cat.items.map((product) => (
                                <ProductCard
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

function ProductCard({ product, theme, isMobile, onAdd }) {
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);

    const handleClick = () => {
        onAdd();
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: isMobile ? '16px 18px' : '22px 26px',
                borderRadius: isMobile ? 18 : 22,
                background: hovered
                    ? (theme.mode === 'dark' ? 'rgba(30,30,34,0.9)' : 'rgba(255,255,255,0.95)')
                    : (theme.mode === 'dark' ? 'rgba(24,24,27,0.6)' : 'rgba(255,255,255,0.7)'),
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: hovered ? theme.shadowMd : theme.shadow,
            }}
        >
            <div style={{ flex: 1, marginRight: 16 }}>
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
                    background: added ? '#22c55e' : (hovered ? theme.dark : theme.bgInput),
                    color: added ? '#fff' : (hovered ? theme.darkText : theme.textMuted),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, border: 'none', cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    fontSize: 22, fontWeight: 300,
                    transform: added ? 'scale(1.1)' : 'scale(1)',
                }}
            >{added ? '✓' : '+'}</button>
        </div>
    );
}
