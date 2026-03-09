"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { sooMrktVendors } from '../lib/data/restaurants';
import { useTheme } from '../lib/ThemeContext';

export function SooMrktSection() {
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
            padding: isMobile ? '48px 0 56px' : '72px 0 80px',
            background: theme.sooMrktBg,
            transition: 'background 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative background */}
            <div style={{
                position: 'absolute', top: -100, right: -50,
                width: 500, height: 500,
                background: 'radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad, position: 'relative' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: isMobile ? 'flex-start' : 'flex-end',
                    justifyContent: 'space-between',
                    marginBottom: isMobile ? 28 : 40,
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 16 : 0,
                }}>
                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '7px 18px', borderRadius: 100,
                            background: theme.mode === 'dark' ? '#fafafa' : '#1c1917',
                            color: theme.mode === 'dark' ? '#09090b' : '#fafaf9',
                            fontSize: 11, fontWeight: 700,
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            marginBottom: 16,
                            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                        }}>🧺 Algoma&apos;s Local Marketplace</div>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 30 : 40, fontWeight: 700,
                            letterSpacing: '-0.03em', color: theme.text,
                            marginBottom: 8, lineHeight: 1.1,
                        }}>
                            Soo MRKT
                        </h2>
                        <p style={{
                            fontSize: isMobile ? 14 : 16, color: theme.textMuted,
                            fontWeight: 400, maxWidth: 520, lineHeight: 1.5,
                        }}>
                            Farmers, artisans, and food makers from across the Algoma district — fresh from the Saturday market at 73 Brock St. Each vendor is a story worth knowing.
                        </p>
                    </div>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 20px', borderRadius: 14,
                        background: theme.bgCard,
                        border: `1px solid ${theme.borderSubtle}`,
                        fontSize: 13, fontWeight: 600, color: theme.textSecondary,
                    }}>
                        <span style={{ fontSize: 20 }}>📍</span>
                        <span>73 Brock St · Saturdays 8AM–1PM</span>
                    </div>
                </div>

                {/* Vendor Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile
                        ? 'repeat(2, 1fr)'
                        : 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: isMobile ? 12 : 18,
                }}>
                    {sooMrktVendors.map((vendor, index) => (
                        <VendorCard
                            key={vendor.id}
                            vendor={vendor}
                            theme={theme}
                            isMobile={isMobile}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{
                    textAlign: 'center',
                    paddingTop: isMobile ? 32 : 48,
                }}>
                    <p style={{
                        fontSize: isMobile ? 14 : 16,
                        color: theme.textMuted,
                        marginBottom: 8,
                    }}>
                        13 local vendors. Zero middlemen. 100% Soo.
                    </p>
                </div>
            </div>
        </section>
    );
}

function VendorCard({ vendor, theme, isMobile, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link href={`/market/${vendor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: 'relative',
                    background: theme.vendorCard,
                    backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                    border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                    borderRadius: isMobile ? 18 : 22,
                    padding: isMobile ? '18px 16px' : '28px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                    transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: hovered ? theme.shadowLg : 'none',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                }}
            >
                {/* Hover glow */}
                {hovered && (
                    <div style={{
                        position: 'absolute', top: -20, right: -20,
                        width: 100, height: 100,
                        background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%)',
                        pointerEvents: 'none',
                        transition: 'opacity 0.3s',
                    }} />
                )}

                {/* Emoji */}
                <div style={{
                    fontSize: isMobile ? 30 : 36,
                    marginBottom: isMobile ? 10 : 14,
                    transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0)',
                }}>{vendor.emoji}</div>

                {/* Badge */}
                {vendor.badge && !isMobile && (
                    <div style={{
                        display: 'inline-flex',
                        alignSelf: 'flex-start',
                        padding: '3px 10px', borderRadius: 100,
                        background: theme.accentBg,
                        color: theme.accent,
                        fontSize: 10, fontWeight: 700,
                        letterSpacing: '0.04em', textTransform: 'uppercase',
                        marginBottom: 8,
                    }}>✦ {vendor.badge}</div>
                )}

                {/* Name */}
                <h3 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? 14 : 16, fontWeight: 700,
                    color: theme.text, marginBottom: 4,
                    letterSpacing: '-0.01em', lineHeight: 1.2,
                }}>{vendor.name}</h3>

                {/* Category */}
                <p style={{
                    fontSize: isMobile ? 10 : 11, color: theme.textFaint,
                    fontWeight: 600, textTransform: 'uppercase',
                    letterSpacing: '0.05em', marginBottom: isMobile ? 6 : 8,
                }}>{vendor.category}</p>

                {/* Description */}
                {!isMobile && (
                    <p style={{
                        fontSize: 13, color: theme.textMuted,
                        lineHeight: 1.45, margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1,
                    }}>{vendor.description}</p>
                )}

                {/* Product count + arrow */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginTop: isMobile ? 8 : 14,
                    paddingTop: isMobile ? 8 : 12,
                    borderTop: `1px solid ${theme.borderSubtle}`,
                }}>
                    <span style={{
                        fontSize: isMobile ? 11 : 12,
                        color: theme.textFaint, fontWeight: 600,
                    }}>{vendor.products.length} products</span>
                    <div style={{
                        width: 24, height: 24, borderRadius: 8,
                        background: hovered ? theme.dark : theme.bgInput,
                        color: hovered ? theme.darkText : theme.textMuted,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.25s ease',
                        fontSize: 14,
                    }}>→</div>
                </div>
            </div>
        </Link>
    );
}
