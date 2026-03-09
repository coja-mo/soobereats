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

            {/* Hero */}
            <div style={{
                position: 'relative', overflow: 'hidden',
                minHeight: isMobile ? 320 : 400,
                display: 'flex', alignItems: 'flex-end',
            }}>
                {/* Gradient background */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(145deg, ${vendor.coverColor} 0%, ${vendor.coverColor}dd 40%, #09090b 100%)`,
                }} />
                {/* Decorative large emoji */}
                <div style={{
                    position: 'absolute',
                    right: isMobile ? -30 : 60,
                    top: '50%', transform: 'translateY(-50%)',
                    fontSize: isMobile ? 180 : 280,
                    opacity: 0.08,
                    pointerEvents: 'none',
                    filter: 'blur(2px)',
                }}>{vendor.emoji}</div>
                {/* Glow */}
                <div style={{
                    position: 'absolute', bottom: -100, left: '30%',
                    width: 400, height: 300,
                    background: 'radial-gradient(ellipse, rgba(234,179,8,0.12) 0%, transparent 70%)',
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
                    transition: 'background 0.2s',
                }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>

                {/* Soo MRKT badge */}
                <div style={{
                    position: 'absolute', top: isMobile ? 16 : 24, right: isMobile ? 16 : 24, zIndex: 20,
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: 100,
                    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fafafa', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>🧺 Soo MRKT</div>

                {/* Hero content */}
                <div style={{
                    position: 'relative', zIndex: 10, width: '100%',
                    maxWidth: 1440, margin: '0 auto',
                    padding: isMobile ? '0 16px 28px' : '0 40px 40px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 16 : 24 }}>
                        {/* Big emoji icon */}
                        <div style={{
                            width: isMobile ? 72 : 100, height: isMobile ? 72 : 100,
                            borderRadius: isMobile ? 20 : 28,
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: isMobile ? 38 : 52, flexShrink: 0,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                        }}>{vendor.emoji}</div>

                        <div style={{ flex: 1 }}>
                            {/* Badge */}
                            {vendor.badge && (
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '4px 12px', borderRadius: 100,
                                    background: 'rgba(234,179,8,0.15)',
                                    border: '1px solid rgba(234,179,8,0.25)',
                                    color: '#eab308', fontSize: 11, fontWeight: 700,
                                    letterSpacing: '0.04em', textTransform: 'uppercase',
                                    marginBottom: 10,
                                }}>✦ {vendor.badge}</div>
                            )}

                            <h1 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 28 : 42, fontWeight: 700,
                                color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
                                textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                                margin: 0, marginBottom: 8,
                            }}>{vendor.name}</h1>

                            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 14, flexWrap: 'wrap' }}>
                                <span style={{
                                    color: 'rgba(255,255,255,0.7)', fontSize: isMobile ? 12 : 14,
                                    fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em',
                                }}>{vendor.category}</span>
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }}></span>
                                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: isMobile ? 12 : 14 }}>
                                    {vendor.products.length} products
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tags */}
            {vendor.tags && vendor.tags.length > 0 && (
                <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                    <div style={{
                        display: 'flex', gap: 8, flexWrap: 'wrap',
                        padding: isMobile ? '16px 0' : '24px 0',
                        borderBottom: `1px solid ${theme.borderLight}`,
                    }}>
                        {vendor.tags.map((tag) => (
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

            {/* Content: Story + Info */}
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
                    gap: isMobile ? 24 : 48,
                    padding: isMobile ? '24px 0' : '40px 0',
                }}>
                    {/* Story */}
                    <div>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 20 : 24, fontWeight: 700,
                            color: theme.text, letterSpacing: '-0.02em',
                            marginBottom: 16,
                        }}>Our Story</h2>
                        <p style={{
                            fontSize: isMobile ? 15 : 17, color: theme.textSecondary,
                            lineHeight: 1.7, margin: 0,
                        }}>{vendor.story}</p>
                    </div>

                    {/* Info Sidebar */}
                    <div style={{
                        background: theme.bgCard,
                        border: `1px solid ${theme.borderSubtle}`,
                        borderRadius: 20, padding: isMobile ? 20 : 24,
                        height: 'fit-content',
                    }}>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 16, fontWeight: 700, color: theme.text,
                            marginBottom: 20, letterSpacing: '-0.01em',
                        }}>Vendor Info</h3>

                        {[
                            { icon: '📍', label: 'Location', value: vendor.locationDetail },
                            { icon: '🕐', label: 'Hours', value: vendor.hours },
                            { icon: '📦', label: 'Products', value: `${vendor.products.length} items available` },
                        ].map((info) => (
                            <div key={info.label} style={{ marginBottom: 18 }}>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 8,
                                    fontSize: 12, fontWeight: 700, color: theme.textFaint,
                                    textTransform: 'uppercase', letterSpacing: '0.06em',
                                    marginBottom: 6,
                                }}>
                                    <span>{info.icon}</span>
                                    <span>{info.label}</span>
                                </div>
                                <p style={{
                                    fontSize: 14, color: theme.textSecondary,
                                    lineHeight: 1.5, margin: 0,
                                }}>{info.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Product Catalog */}
            <div style={{
                maxWidth: 1440, margin: '0 auto', padding: pad,
                borderTop: `1px solid ${theme.borderLight}`,
            }}>
                <h2 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? 22 : 28, fontWeight: 700,
                    color: theme.text, letterSpacing: '-0.03em',
                    paddingTop: isMobile ? 24 : 40, marginBottom: isMobile ? 16 : 24,
                }}>Products</h2>

                {/* Category tabs */}
                {productCategories.length > 1 && (
                    <div style={{
                        display: 'flex', gap: 6, overflowX: 'auto',
                        paddingBottom: isMobile ? 16 : 20,
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                    }}>
                        {productCategories.map((cat) => (
                            <button key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                style={{
                                    padding: '8px 18px', borderRadius: 100,
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
                    <div key={cat.name} id={`cat-${cat.name.replace(/\s+/g, '-').toLowerCase()}`} style={{ marginBottom: isMobile ? 32 : 48 }}>
                        {productCategories.length > 1 && (
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 18 : 20, fontWeight: 700,
                                color: theme.text, letterSpacing: '-0.02em',
                                marginBottom: isMobile ? 12 : 16,
                            }}>{cat.name}</h3>
                        )}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: isMobile ? 10 : 14,
                        }}>
                            {cat.items.map((product) => (
                                <VendorProductCard
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

function VendorProductCard({ product, theme, isMobile, onAdd }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onAdd}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: isMobile ? '16px' : '20px 24px',
                borderRadius: isMobile ? 16 : 20,
                background: hovered ? theme.bgCardHover : theme.bgCard,
                border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hovered ? theme.shadowMd : theme.shadow,
            }}
        >
            <div style={{ flex: 1, marginRight: 16 }}>
                <h4 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? 15 : 16, fontWeight: 700,
                    color: theme.text, margin: 0, marginBottom: 4,
                }}>{product.name}</h4>
                <p style={{
                    fontSize: 13, color: theme.textFaint,
                    lineHeight: 1.4, margin: 0, marginBottom: 8,
                }}>{product.description}</p>
                <span style={{
                    fontSize: isMobile ? 15 : 16, fontWeight: 700,
                    color: theme.text, fontFamily: "'DM Sans', sans-serif",
                }}>${product.price.toFixed(2)}</span>
            </div>
            <button
                onClick={(e) => { e.stopPropagation(); onAdd(); }}
                style={{
                    width: isMobile ? 40 : 46, height: isMobile ? 40 : 46,
                    borderRadius: isMobile ? 12 : 14,
                    background: hovered ? theme.dark : theme.bgInput,
                    color: hovered ? theme.darkText : theme.textMuted,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, border: 'none', cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    fontSize: 22, fontWeight: 300,
                }}
            >+</button>
        </div>
    );
}
