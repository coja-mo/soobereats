"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../lib/CartContext';
import { useTheme } from '../lib/ThemeContext';

export const CartPanel = () => {
    const {
        items, restaurantName, isCartOpen, setIsCartOpen,
        subtotal, deliveryFee, tax, total, itemCount,
        updateQuantity, clearCart,
    } = useCart();
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') setIsCartOpen(false); };
        if (isCartOpen) document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isCartOpen, setIsCartOpen]);

    useEffect(() => {
        document.body.style.overflow = isCartOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isCartOpen]);

    // Auto-expand when opening with items
    useEffect(() => {
        if (isCartOpen && items.length > 0) setExpanded(true);
        if (!isCartOpen) setExpanded(false);
    }, [isCartOpen, items.length]);

    if (!isCartOpen) return null;

    // ─── Apple Design Tokens ───
    const glass = isDark
        ? 'rgba(28, 28, 30, 0.82)'
        : 'rgba(255, 255, 255, 0.78)';
    const glassBorder = isDark
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.06)';
    const surfacePrimary = isDark ? '#1c1c1e' : '#ffffff';
    const surfaceSecondary = isDark ? 'rgba(44, 44, 46, 0.6)' : 'rgba(242, 242, 247, 0.8)';
    const textPrimary = isDark ? '#f5f5f7' : '#1d1d1f';
    const textSecondary = isDark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
    const textTertiary = isDark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
    const accent = '#eab308';
    const accentBg = isDark ? 'rgba(234,179,8,0.12)' : 'rgba(234,179,8,0.1)';
    const separator = isDark ? 'rgba(84,84,88,0.36)' : 'rgba(60,60,67,0.12)';
    const destructive = '#ff453a';
    const ctaGradient = 'linear-gradient(135deg, #1d1d1f 0%, #2c2c2e 100%)';
    const ctaGradientLight = 'linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%)';

    // Free delivery threshold
    const FREE_DELIVERY_THRESHOLD = 35;
    const deliveryProgress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
    const freeDeliveryAchieved = subtotal >= FREE_DELIVERY_THRESHOLD;

    return (
        <>
            {/* Backdrop */}
            <div onClick={() => setIsCartOpen(false)} style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.25)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                animation: 'cartFadeIn 0.3s ease',
            }} />

            {/* ─── Cart Sheet ─── */}
            <div style={{
                position: 'fixed',
                bottom: 0, left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 201,
                width: '100%',
                maxWidth: isMobile ? '100%' : 480,
                maxHeight: isMobile ? '88vh' : '75vh',
                background: glass,
                backdropFilter: 'saturate(180%) blur(40px)',
                WebkitBackdropFilter: 'saturate(180%) blur(40px)',
                borderRadius: isMobile ? '24px 24px 0 0' : '24px 24px 0 0',
                border: `0.5px solid ${glassBorder}`,
                borderBottom: 'none',
                boxShadow: isDark
                    ? '0 -20px 80px rgba(0,0,0,0.4), 0 -4px 20px rgba(0,0,0,0.3)'
                    : '0 -20px 80px rgba(0,0,0,0.08), 0 -4px 20px rgba(0,0,0,0.04)',
                display: 'flex', flexDirection: 'column',
                animation: 'cartSlideUp 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
            }}>
                {/* Drag Handle */}
                <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 6px' }}>
                    <div style={{
                        width: 36, height: 5, borderRadius: 100,
                        background: isDark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.2)',
                    }} />
                </div>

                {/* ─── Header ─── */}
                <div style={{
                    padding: '8px 24px 16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: accentBg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 20,
                        }}>🛍️</div>
                        <div>
                            <h2 style={{
                                fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em',
                                color: textPrimary, margin: 0, lineHeight: 1.2,
                            }}>
                                {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                            </h2>
                            {restaurantName && (
                                <p style={{ fontSize: 13, color: textSecondary, margin: 0, marginTop: 2 }}>
                                    from {restaurantName}
                                </p>
                            )}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                            fontSize: 18, fontWeight: 700, color: textPrimary,
                            letterSpacing: '-0.02em',
                        }}>
                            ${subtotal.toFixed(2)}
                        </span>
                        <button onClick={() => setExpanded(!expanded)} style={{
                            width: 32, height: 32, borderRadius: 100,
                            background: surfaceSecondary, border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14, color: textSecondary,
                            transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
                            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        }}>▾</button>
                    </div>
                </div>

                {/* ─── Free Delivery Progress ─── */}
                {!freeDeliveryAchieved && items.length > 0 && (
                    <div style={{ padding: '0 24px 12px' }}>
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            marginBottom: 6,
                        }}>
                            <span style={{ fontSize: 12, color: textSecondary, fontWeight: 500 }}>
                                Add ${(FREE_DELIVERY_THRESHOLD - subtotal).toFixed(2)} for free delivery
                            </span>
                            <span style={{ fontSize: 11, color: accent, fontWeight: 600 }}>
                                {deliveryProgress.toFixed(0)}%
                            </span>
                        </div>
                        <div style={{
                            height: 4, borderRadius: 100,
                            background: separator, overflow: 'hidden',
                        }}>
                            <div style={{
                                height: '100%', borderRadius: 100,
                                background: `linear-gradient(90deg, ${accent}, #f59e0b)`,
                                width: `${deliveryProgress}%`,
                                transition: 'width 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
                            }} />
                        </div>
                    </div>
                )}
                {freeDeliveryAchieved && items.length > 0 && (
                    <div style={{ padding: '0 24px 12px' }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            fontSize: 12, color: '#34c759', fontWeight: 600,
                        }}>
                            <span>✓</span> Free delivery unlocked!
                        </div>
                    </div>
                )}

                {/* ─── Expanded Items ─── */}
                {expanded && (
                    <div style={{
                        flex: 1, overflowY: 'auto', padding: '0 24px',
                        borderTop: `0.5px solid ${separator}`,
                    }}>
                        {items.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '48px 0' }}>
                                <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>🛍️</div>
                                <h3 style={{ fontSize: 17, fontWeight: 600, color: textPrimary, marginBottom: 6 }}>
                                    Your bag is empty
                                </h3>
                                <p style={{ color: textSecondary, fontSize: 14, marginBottom: 24 }}>
                                    Browse restaurants to start your order
                                </p>
                                <button onClick={() => setIsCartOpen(false)} style={{
                                    background: ctaGradient, color: '#fff',
                                    padding: '12px 28px', borderRadius: 100, border: 'none',
                                    fontSize: 15, fontWeight: 600, cursor: 'pointer',
                                    letterSpacing: '-0.01em',
                                }}>Browse Restaurants</button>
                            </div>
                        ) : (
                            <div>
                                {items.map((item, idx) => (
                                    <div key={item.id} style={{
                                        display: 'flex', alignItems: 'center', gap: 14,
                                        padding: '14px 0',
                                        borderBottom: idx < items.length - 1 ? `0.5px solid ${separator}` : 'none',
                                    }}>
                                        {/* Item Icon/Emoji */}
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12,
                                            background: surfaceSecondary,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 22, flexShrink: 0,
                                        }}>
                                            {item.emoji || '🍽️'}
                                        </div>

                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{
                                                fontSize: 15, fontWeight: 600, color: textPrimary,
                                                margin: 0, marginBottom: 2,
                                                letterSpacing: '-0.01em',
                                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                            }}>{item.name}</h4>
                                            <span style={{
                                                fontSize: 14, fontWeight: 600, color: textSecondary,
                                            }}>${item.price.toFixed(2)}</span>
                                        </div>

                                        {/* Stepper — Apple-style pill */}
                                        <div style={{
                                            display: 'flex', alignItems: 'center',
                                            background: surfaceSecondary,
                                            borderRadius: 100, overflow: 'hidden',
                                            border: `0.5px solid ${separator}`,
                                        }}>
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{
                                                width: 32, height: 32, border: 'none', background: 'transparent',
                                                cursor: 'pointer', fontSize: 16, color: item.quantity <= 1 ? destructive : textSecondary,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 500,
                                            }}>{item.quantity <= 1 ? '🗑' : '−'}</button>
                                            <span style={{
                                                width: 24, textAlign: 'center', fontSize: 14,
                                                fontWeight: 700, color: textPrimary,
                                                fontVariantNumeric: 'tabular-nums',
                                            }}>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{
                                                width: 32, height: 32, border: 'none', background: 'transparent',
                                                cursor: 'pointer', fontSize: 16, color: accent,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontWeight: 600,
                                            }}>+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ─── Footer: Totals & CTA ─── */}
                {items.length > 0 && (
                    <div style={{
                        padding: expanded ? '16px 24px 28px' : '12px 24px 28px',
                        borderTop: expanded ? `0.5px solid ${separator}` : 'none',
                    }}>
                        {/* Zero-Waste Delivery Upsell */}
                        {expanded && (
                            <div style={{
                                background: surfaceSecondary,
                                borderRadius: 16, padding: '14px 16px',
                                marginBottom: 16,
                                border: `0.5px solid ${separator}`,
                            }}>
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'center', marginBottom: 6,
                                }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>
                                        Zero-Emission Delivery
                                    </span>
                                    <span style={{
                                        fontSize: 10, fontWeight: 700, color: '#34c759',
                                        textTransform: 'uppercase', letterSpacing: '0.04em',
                                    }}>Standard</span>
                                </div>
                                <p style={{
                                    fontSize: 12, color: textSecondary, margin: 0, lineHeight: 1.4,
                                }}>
                                    Your order arrives via our 100% electric fleet. Zero carbon, zero noise.
                                </p>
                            </div>
                        )}

                        {/* Price Summary */}
                        {expanded && (
                            <div style={{ marginBottom: 16 }}>
                                {[
                                    ['Subtotal', subtotal],
                                    ['Delivery', freeDeliveryAchieved ? 0 : deliveryFee],
                                    ['HST (13%)', tax],
                                ].map(([label, val]) => (
                                    <div key={label} style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        fontSize: 14, color: textSecondary, padding: '3px 0',
                                    }}>
                                        <span>{label}</span>
                                        <span style={{
                                            fontVariantNumeric: 'tabular-nums',
                                            color: label === 'Delivery' && freeDeliveryAchieved ? '#34c759' : 'inherit',
                                            fontWeight: label === 'Delivery' && freeDeliveryAchieved ? 600 : 400,
                                        }}>
                                            {label === 'Delivery' && freeDeliveryAchieved ? 'Free' : `$${val.toFixed(2)}`}
                                        </span>
                                    </div>
                                ))}
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    fontSize: 17, fontWeight: 700, color: textPrimary,
                                    paddingTop: 10, marginTop: 8,
                                    borderTop: `0.5px solid ${separator}`,
                                    letterSpacing: '-0.02em',
                                }}>
                                    <span>Total</span>
                                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                                        ${(freeDeliveryAchieved ? total - deliveryFee : total).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* CTA Button */}
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '100%', padding: '16px 0', borderRadius: 100,
                            background: isDark ? ctaGradientLight : ctaGradient,
                            color: '#fff', border: 'none',
                            fontSize: 16, fontWeight: 600, textDecoration: 'none',
                            letterSpacing: '-0.01em',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                            transition: 'transform 0.2s cubic-bezier(0.32, 0.72, 0, 1)',
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Place Order · ${(freeDeliveryAchieved ? total - deliveryFee : total).toFixed(2)}
                        </Link>

                        {/* Clear */}
                        {expanded && (
                            <button onClick={clearCart} style={{
                                width: '100%', padding: '10px', marginTop: 8,
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 13, color: destructive, fontWeight: 500,
                                letterSpacing: '-0.01em',
                            }}>Remove All Items</button>
                        )}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes cartFadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes cartSlideUp {
                    from { opacity: 0; transform: translateX(-50%) translateY(100%); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>
        </>
    );
};
