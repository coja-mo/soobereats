"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { sooMrktVendors, shopPartners } from '../../lib/data/restaurants';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';


const CATEGORY_FILTERS = ['All', 'Meats', 'Produce', 'Baked Goods', 'Specialty', 'Prepared Foods', 'Seafood', 'Dairy & Eggs'];

export default function ShopPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [hoveredVendor, setHoveredVendor] = useState(null);
    const [hoveredPartner, setHoveredPartner] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const filteredVendors = activeFilter === 'All'
        ? sooMrktVendors
        : sooMrktVendors.filter(v => v.category === activeFilter);

    const totalProducts = sooMrktVendors.reduce((sum, v) => sum + v.products.length, 0);

    const sectionPad = isMobile ? '0 16px' : '0 40px';

    return (
        <>
            <main>

                {/* ═══════════════════════════════════════
                    HERO — SHOP LOCAL
                   ═══════════════════════════════════════ */}
                <section style={{
                    padding: isMobile ? '48px 16px 56px' : '80px 40px 90px',
                    position: 'relative', overflow: 'hidden',
                    background: isDark
                        ? 'linear-gradient(180deg, #09090b 0%, #111410 40%, #0f110f 100%)'
                        : 'linear-gradient(180deg, #fdfdfd 0%, #f5f0e8 40%, #faf9f5 100%)',
                    borderBottom: `1px solid ${theme.borderSubtle}`,
                }}>
                    {/* Decorative orbs */}
                    <div style={{ position: 'absolute', top: '-20%', right: '10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-10%', left: '20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '30%', left: '60%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

                    <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
                        {/* Badge */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            padding: '10px 24px', borderRadius: 100,
                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                            fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                            color: theme.textSecondary, marginBottom: 28,
                            backdropFilter: 'blur(20px)',
                        }}>
                            <span style={{ fontSize: 15 }}>🛒</span>
                            Local Commerce · Sault Ste. Marie
                        </div>

                        <h1 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 52 : 88, fontWeight: 800,
                            letterSpacing: '-0.05em', color: theme.text,
                            lineHeight: 0.95, marginBottom: 20, margin: '0 auto 20px',
                        }}>
                            Shop<span style={{ display: 'block', fontSize: isMobile ? 32 : 56, fontWeight: 600, letterSpacing: '-0.03em', color: theme.textMuted }}>Local</span>
                        </h1>

                        <p style={{
                            fontSize: isMobile ? 16 : 20, color: theme.textMuted,
                            maxWidth: 620, margin: '0 auto 32px', lineHeight: 1.7,
                            fontFamily: "'DM Sans', sans-serif",
                        }}>
                            Your neighbourhood marketplace — from farmers&apos; market vendors to pharmacies and gift shops. All local. All delivered by our ⚡ electric fleet.
                        </p>

                        {/* Stats row */}
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: isMobile ? 20 : 40,
                            padding: '16px 32px', borderRadius: 20,
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                            border: `1px solid ${theme.borderSubtle}`,
                        }}>
                            {[
                                { value: sooMrktVendors.length + shopPartners.length, label: 'Partners' },
                                { value: totalProducts + '+', label: 'Products' },
                                { value: '100%', label: 'Local' },
                            ].map((s, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 18 : 24, fontWeight: 800, color: theme.text }}>{s.value}</div>
                                    <div style={{ fontSize: 11, fontWeight: 600, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Location pills */}
                        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '8px 18px', borderRadius: 14,
                                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                border: `1px solid ${theme.borderSubtle}`,
                                fontSize: 13, fontWeight: 600, color: theme.textFaint,
                            }}>
                                🏙️ Sault Ste. Marie &amp; Algoma Region
                            </div>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                padding: '8px 18px', borderRadius: 14,
                                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                border: `1px solid ${theme.borderSubtle}`,
                                fontSize: 13, fontWeight: 600, color: theme.textFaint,
                            }}>
                                ⚡ Delivered by our 100% electric fleet
                            </div>
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    FEATURED PARTNERS — IDA + SWEET GREETINGS
                   ═══════════════════════════════════════ */}
                <section style={{
                    padding: isMobile ? '48px 0 32px' : '72px 0 48px',
                }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad }}>
                        <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '8px 18px', borderRadius: 100,
                                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                border: `1px solid ${theme.borderSubtle}`,
                                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                                color: theme.textFaint, marginBottom: 16,
                            }}>
                                ✦ Featured Partners
                            </div>
                            <h2 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 28 : 44, fontWeight: 700,
                                letterSpacing: '-0.03em', color: theme.text, marginBottom: 8,
                            }}>Local Businesses, Delivered</h2>
                            <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 500, margin: '0 auto' }}>
                                Shop from our featured local partners — each one community-owned and Sault-proud.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: isMobile ? 16 : 24,
                        }}>
                            {shopPartners.filter(p => p.featured).map((partner) => {
                                const isHovered = hoveredPartner === partner.id;
                                return (
                                    <Link key={partner.id} href={partner.slug === 'ida' ? '/market/ida' : `/market`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div
                                            onMouseEnter={() => setHoveredPartner(partner.id)}
                                            onMouseLeave={() => setHoveredPartner(null)}
                                            style={{
                                                position: 'relative', borderRadius: 28,
                                                overflow: 'hidden', cursor: 'pointer',
                                                transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                                                transform: isHovered ? 'translateY(-6px) scale(1.005)' : 'translateY(0) scale(1)',
                                                boxShadow: isHovered
                                                    ? `0 20px 60px rgba(0,0,0,${isDark ? 0.4 : 0.12})`
                                                    : `0 4px 20px rgba(0,0,0,${isDark ? 0.2 : 0.05})`,
                                                height: isMobile ? 280 : 320,
                                            }}
                                        >
                                            {/* Background */}
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: isDark
                                                    ? `linear-gradient(145deg, rgba(24,24,27,0.95), rgba(24,24,27,0.85))`
                                                    : `linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))`,
                                                backdropFilter: 'blur(40px)',
                                            }} />
                                            {/* Accent overlay */}
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: `linear-gradient(145deg, ${partner.heroColor}${isDark ? '18' : '10'} 0%, transparent 60%)`,
                                                opacity: isHovered ? 1 : 0.5, transition: 'opacity 0.4s',
                                            }} />
                                            {/* Top accent line */}
                                            <div style={{
                                                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                                background: `linear-gradient(90deg, transparent, ${partner.heroColor}, transparent)`,
                                                opacity: isHovered ? 1 : 0.5, transition: 'opacity 0.4s',
                                            }} />
                                            {/* Large bg emoji */}
                                            <div style={{
                                                position: 'absolute', right: -10, bottom: -20,
                                                fontSize: isMobile ? 120 : 160,
                                                opacity: isDark ? 0.06 : 0.05, pointerEvents: 'none',
                                            }}>{partner.emoji}</div>

                                            {/* Content */}
                                            <div style={{
                                                position: 'relative', zIndex: 10, height: '100%',
                                                padding: isMobile ? 24 : 32,
                                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                            }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                                        <div style={{
                                                            width: 56, height: 56, borderRadius: 18,
                                                            background: `${partner.heroColor}15`,
                                                            border: `1px solid ${partner.heroColor}25`,
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: 28,
                                                            transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                            transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                                                        }}>{partner.emoji}</div>
                                                        <div style={{
                                                            padding: '5px 14px', borderRadius: 100,
                                                            background: `${partner.heroColor}18`,
                                                            border: `1px solid ${partner.heroColor}30`,
                                                            color: partner.heroColor, fontSize: 10, fontWeight: 700,
                                                            letterSpacing: '0.06em', textTransform: 'uppercase',
                                                        }}>✦ {partner.badge}</div>
                                                    </div>
                                                    <h3 style={{
                                                        fontFamily: "'DM Sans', sans-serif",
                                                        fontSize: isMobile ? 22 : 26, fontWeight: 700,
                                                        color: theme.text, marginBottom: 6,
                                                    }}>{partner.name}</h3>
                                                    <p style={{
                                                        fontSize: 13, fontWeight: 600, color: partner.heroColor,
                                                        marginBottom: 8,
                                                    }}>{partner.tagline}</p>
                                                    <p style={{
                                                        fontSize: 14, color: theme.textMuted, lineHeight: 1.5,
                                                        display: '-webkit-box', WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                                    }}>{partner.description}</p>
                                                </div>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                    paddingTop: 16, borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                                }}>
                                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                                        {partner.tags.slice(0, 3).map(t => (
                                                            <span key={t} style={{
                                                                padding: '3px 10px', borderRadius: 8,
                                                                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                                                fontSize: 10, fontWeight: 600, color: theme.textFaint,
                                                            }}>{t}</span>
                                                        ))}
                                                    </div>
                                                    <div style={{
                                                        display: 'flex', alignItems: 'center', gap: 6,
                                                        padding: '8px 16px', borderRadius: 12,
                                                        background: isHovered ? partner.heroColor : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                                                        color: isHovered ? '#fff' : theme.textSecondary,
                                                        fontSize: 13, fontWeight: 700, transition: 'all 0.3s',
                                                    }}>
                                                        Shop Now <span style={{ transition: 'transform 0.3s', transform: isHovered ? 'translateX(3px)' : 'translateX(0)' }}>→</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    SOO MRKT SECTION HEADER
                   ═══════════════════════════════════════ */}
                <section style={{ padding: isMobile ? '32px 0 0' : '48px 0 0' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto', padding: sectionPad, textAlign: 'center' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 18px', borderRadius: 100,
                            background: isDark ? 'rgba(234,179,8,0.08)' : 'rgba(234,179,8,0.06)',
                            border: '1px solid rgba(234,179,8,0.15)',
                            fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                            color: '#eab308', marginBottom: 16,
                        }}>
                            🧺 Formerly the Mill Market · Est. 1976
                        </div>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 36 : 56, fontWeight: 800,
                            letterSpacing: '-0.04em', color: theme.text,
                            marginBottom: 12,
                        }}>
                            Soo MRKT
                        </h2>
                        <p style={{
                            fontSize: isMobile ? 15 : 17, color: theme.textMuted,
                            maxWidth: 560, margin: '0 auto 8px', lineHeight: 1.7,
                        }}>
                            Algoma&apos;s finest farmers, artisans, and food makers — from 73 Brock St. to your door.
                        </p>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 6,
                            padding: '8px 18px', borderRadius: 14,
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                            border: `1px solid ${theme.borderSubtle}`,
                            fontSize: 13, fontWeight: 600, color: theme.textFaint, marginTop: 12,
                        }}>
                            📍 73 Brock St · Saturdays 9AM–2PM
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    CATEGORY FILTERS
                   ═══════════════════════════════════════ */}
                <div style={{
                    position: 'sticky', top: 72, zIndex: 40,
                    background: isDark ? 'rgba(9,9,11,0.85)' : 'rgba(253,253,253,0.85)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${theme.borderSubtle}`,
                    padding: '12px 0',
                }}>
                    <div style={{
                        maxWidth: 1440, margin: '0 auto', padding: sectionPad,
                        display: 'flex', gap: 8, overflowX: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                    }}>
                        {CATEGORY_FILTERS.map(cat => {
                            const isActive = activeFilter === cat;
                            const count = cat === 'All' ? sooMrktVendors.length : sooMrktVendors.filter(v => v.category === cat).length;
                            if (cat !== 'All' && count === 0) return null;
                            return (
                                <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                                    padding: '8px 18px', borderRadius: 12, border: 'none',
                                    background: isActive
                                        ? (isDark ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.12)')
                                        : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                                    color: isActive ? '#eab308' : theme.textSecondary,
                                    fontSize: 13, fontWeight: isActive ? 700 : 600,
                                    cursor: 'pointer', whiteSpace: 'nowrap',
                                    transition: 'all 0.25s ease',
                                    fontFamily: "'Inter', sans-serif",
                                }}>
                                    {cat} <span style={{ opacity: 0.5, marginLeft: 4 }}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>


                {/* ═══════════════════════════════════════
                    VENDOR GRID
                   ═══════════════════════════════════════ */}
                <section style={{ padding: isMobile ? '32px 16px 56px' : '56px 40px 80px' }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
                            gap: isMobile ? 16 : 24,
                        }}>
                            {filteredVendors.map((vendor, i) => {
                                const isHovered = hoveredVendor === vendor.id;
                                const accentColors = ['#eab308', '#10b981', '#8b5cf6', '#0066FF', '#f97316', '#ec4899'];
                                const accent = accentColors[i % accentColors.length];

                                return (
                                    <Link key={vendor.id} href={`/market/${vendor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <div
                                            onMouseEnter={() => setHoveredVendor(vendor.id)}
                                            onMouseLeave={() => setHoveredVendor(null)}
                                            style={{
                                                position: 'relative',
                                                borderRadius: 24,
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                transition: 'all 0.45s cubic-bezier(0.19, 1, 0.22, 1)',
                                                transform: isHovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0)',
                                                boxShadow: isHovered
                                                    ? `0 20px 50px rgba(0,0,0,${isDark ? '0.4' : '0.12'})`
                                                    : `0 2px 12px rgba(0,0,0,${isDark ? '0.2' : '0.05'})`,
                                                height: isMobile ? 'auto' : 300,
                                                background: isDark
                                                    ? 'linear-gradient(145deg, rgba(24,24,27,0.95), rgba(24,24,27,0.85))'
                                                    : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                                backdropFilter: 'blur(40px)',
                                                border: `1px solid ${isHovered ? `${accent}40` : theme.borderSubtle}`,
                                            }}
                                        >
                                            {/* Accent gradient overlay */}
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: `linear-gradient(145deg, ${accent}${isDark ? '12' : '08'} 0%, transparent 60%)`,
                                                opacity: isHovered ? 1 : 0.3,
                                                transition: 'opacity 0.4s',
                                            }} />

                                            {/* Top accent line */}
                                            <div style={{
                                                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                                                opacity: isHovered ? 1 : 0.4,
                                                transition: 'opacity 0.4s',
                                            }} />

                                            {/* Large background emoji */}
                                            <div style={{
                                                position: 'absolute', right: -10, bottom: -15,
                                                fontSize: isMobile ? 100 : 130,
                                                opacity: isDark ? 0.06 : 0.05,
                                                pointerEvents: 'none',
                                                transition: 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                transform: isHovered ? 'rotate(-8deg) scale(1.1)' : 'rotate(0) scale(1)',
                                            }}>{vendor.emoji}</div>

                                            {/* Content */}
                                            <div style={{
                                                position: 'relative', zIndex: 10, height: '100%',
                                                padding: isMobile ? 24 : 28,
                                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                            }}>
                                                <div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                                        <div style={{
                                                            width: 56, height: 56, borderRadius: 18,
                                                            background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            fontSize: 28, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                                                            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                            transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1)',
                                                        }}>{vendor.emoji}</div>

                                                        {vendor.badge && (
                                                            <div style={{
                                                                padding: '5px 14px', borderRadius: 100,
                                                                background: `${accent}20`, border: `1px solid ${accent}40`,
                                                                color: accent, fontSize: 10, fontWeight: 700,
                                                                letterSpacing: '0.06em', textTransform: 'uppercase',
                                                            }}>✦ {vendor.badge}</div>
                                                        )}
                                                    </div>

                                                    <h3 style={{
                                                        fontFamily: "'DM Sans', sans-serif",
                                                        fontSize: isMobile ? 20 : 22, fontWeight: 700,
                                                        color: theme.text, letterSpacing: '-0.02em',
                                                        marginBottom: 4, lineHeight: 1.2,
                                                    }}>{vendor.name}</h3>

                                                    <p style={{
                                                        fontSize: 11, color: theme.textFaint, fontWeight: 700,
                                                        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10,
                                                    }}>{vendor.category}</p>

                                                    <p style={{
                                                        fontSize: 14, color: theme.textMuted, lineHeight: 1.5, margin: 0,
                                                        display: '-webkit-box', WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                                    }}>{vendor.description}</p>
                                                </div>

                                                {/* Tags + CTA */}
                                                <div>
                                                    {vendor.tags && (
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                                                            {vendor.tags.slice(0, 3).map(tag => (
                                                                <span key={tag} style={{
                                                                    padding: '3px 10px', borderRadius: 8,
                                                                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                                                    fontSize: 10, fontWeight: 600, color: theme.textFaint,
                                                                    letterSpacing: '0.02em',
                                                                }}>{tag}</span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                        paddingTop: 14,
                                                        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                                    }}>
                                                        <span style={{ fontSize: 13, color: theme.textFaint, fontWeight: 600 }}>
                                                            {vendor.products.length} products
                                                        </span>
                                                        <div style={{
                                                            display: 'flex', alignItems: 'center', gap: 6,
                                                            padding: '8px 16px', borderRadius: 12,
                                                            background: isHovered ? accent : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                                                            color: isHovered ? '#fff' : theme.textSecondary,
                                                            fontSize: 13, fontWeight: 700, transition: 'all 0.3s ease',
                                                            fontFamily: "'DM Sans', sans-serif",
                                                        }}>
                                                            Shop Now
                                                            <span style={{
                                                                transition: 'transform 0.3s',
                                                                transform: isHovered ? 'translateX(3px)' : 'translateX(0)',
                                                            }}>→</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    ABOUT THE MARKET
                   ═══════════════════════════════════════ */}
                <section style={{
                    padding: isMobile ? '48px 16px' : '80px 40px',
                    background: isDark
                        ? 'linear-gradient(180deg, #09090b, #111410, #09090b)'
                        : 'linear-gradient(180deg, #fdfdfd, #f5f0e8, #fdfdfd)',
                    borderTop: `1px solid ${theme.borderSubtle}`,
                }}>
                    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 28 : 40, fontWeight: 700,
                            letterSpacing: '-0.03em', color: theme.text,
                            marginBottom: 20,
                        }}>Our Story</h2>
                        <p style={{
                            fontSize: isMobile ? 15 : 18, color: theme.textMuted,
                            lineHeight: 1.8, marginBottom: 32,
                        }}>
                            Formerly the Mill Market, the Soo Market has been connecting Algoma&apos;s farmers,
                            artisans, and food makers to the community since 1976. Every Saturday from 9AM to 2PM
                            at 73 Brock Street in downtown Sault Ste. Marie, the market comes alive with the
                            freshest local produce, handcrafted goods, and the stories of the people who make them.
                        </p>
                        <p style={{
                            fontSize: isMobile ? 15 : 18, color: theme.textMuted,
                            lineHeight: 1.8, marginBottom: 40,
                        }}>
                            Through Soobér, we&apos;re extending the market beyond Saturday mornings — bringing
                            these same trusted vendors and their products directly to your door, delivered by our
                            100% electric fleet. Same local quality, zero emissions.
                        </p>

                        {/* Value props */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: 16,
                        }}>
                            {[
                                { emoji: '🌿', title: 'Farm to Door', desc: 'Directly from local farms and artisans to you' },
                                { emoji: '⚡', title: 'Zero Emissions', desc: '100% electric delivery fleet — guilt-free' },
                                { emoji: '🤝', title: 'Support Local', desc: 'Every dollar stays in the Algoma community' },
                            ].map(item => (
                                <div key={item.title} style={{
                                    padding: isMobile ? 24 : 32, borderRadius: 20,
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                    border: `1px solid ${theme.borderSubtle}`,
                                }}>
                                    <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
                                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 6 }}>{item.title}</div>
                                    <div style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.5 }}>{item.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    PAESANO'S FOOD — FEATURED PARTNER
                   ═══════════════════════════════════════ */}
                <section style={{
                    padding: isMobile ? '48px 16px 56px' : '80px 40px 80px',
                    borderTop: `1px solid ${theme.borderSubtle}`,
                    background: isDark
                        ? 'linear-gradient(180deg, #09090b 0%, #140d08 50%, #09090b 100%)'
                        : 'linear-gradient(180deg, #fdfdfd 0%, #faf5f0 50%, #fdfdfd 100%)',
                }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: isMobile ? 28 : 40 }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '8px 20px', borderRadius: 100,
                                background: isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)',
                                border: '1px solid rgba(239,68,68,0.2)',
                                fontSize: 12, fontWeight: 700, color: '#ef4444',
                                textTransform: 'uppercase', letterSpacing: '0.06em',
                                marginBottom: 20,
                            }}>🇮🇹 Featured Partner</div>

                            <h2 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 32 : 48, fontWeight: 800,
                                letterSpacing: '-0.04em', color: theme.text,
                                marginBottom: 12, lineHeight: 1.05,
                            }}>Paesano&apos;s Food</h2>
                            <p style={{
                                fontSize: isMobile ? 15 : 17, color: theme.textMuted,
                                maxWidth: 600, margin: '0 auto', lineHeight: 1.7,
                            }}>
                                Authentic Italian food made with love, right here in the Soo.
                                Fresh pasta, homemade sauces, and prepared meals — brought to your door.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                            gap: isMobile ? 16 : 24,
                            maxWidth: 1000, margin: '0 auto',
                        }}>
                            {/* Left: Story card */}
                            <div style={{
                                borderRadius: 24, overflow: 'hidden', position: 'relative',
                                background: isDark
                                    ? 'linear-gradient(145deg, rgba(24,24,27,0.95), rgba(24,24,27,0.85))'
                                    : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                backdropFilter: 'blur(40px)',
                                border: `1px solid ${theme.borderSubtle}`,
                                padding: isMobile ? 24 : 32,
                            }}>
                                {/* Top accent */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                    background: 'linear-gradient(90deg, transparent, #ef4444, #f97316, transparent)',
                                }} />

                                <div style={{
                                    width: 64, height: 64, borderRadius: 20,
                                    background: isDark ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 32, marginBottom: 20,
                                    border: '1px solid rgba(239,68,68,0.15)',
                                }}>🍝</div>

                                <h3 style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: isMobile ? 22 : 26, fontWeight: 700,
                                    color: theme.text, letterSpacing: '-0.02em',
                                    marginBottom: 12, lineHeight: 1.2,
                                }}>A Family Tradition</h3>

                                <p style={{
                                    fontSize: 15, color: theme.textMuted, lineHeight: 1.7,
                                    marginBottom: 20,
                                }}>
                                    Paesano&apos;s has been a cornerstone of Italian food in Sault Ste. Marie for generations.
                                    From their famous fresh pasta and homemade sauces to ready-to-heat prepared meals,
                                    every product is crafted with the same care and authenticity that made Paesano&apos;s a household name
                                    in the Soo. Now available for delivery through Soobér.
                                </p>

                                <div style={{
                                    display: 'flex', gap: 8, flexWrap: 'wrap',
                                }}>
                                    {['Fresh Pasta', 'Homemade Sauces', 'Prepared Meals', 'Italian Imports'].map(tag => (
                                        <span key={tag} style={{
                                            padding: '5px 14px', borderRadius: 10,
                                            background: isDark ? 'rgba(239,68,68,0.08)' : 'rgba(239,68,68,0.05)',
                                            border: '1px solid rgba(239,68,68,0.12)',
                                            fontSize: 11, fontWeight: 600, color: '#ef4444',
                                            letterSpacing: '0.02em',
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Products highlight */}
                            <div style={{
                                borderRadius: 24, overflow: 'hidden', position: 'relative',
                                background: isDark
                                    ? 'linear-gradient(145deg, rgba(24,24,27,0.95), rgba(24,24,27,0.85))'
                                    : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                backdropFilter: 'blur(40px)',
                                border: `1px solid ${theme.borderSubtle}`,
                                padding: isMobile ? 24 : 32,
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                            }}>
                                {/* Top accent */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                    background: 'linear-gradient(90deg, transparent, #f97316, #eab308, transparent)',
                                }} />

                                <div>
                                    <p style={{
                                        fontSize: 11, fontWeight: 700, color: theme.textFaint,
                                        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16,
                                    }}>Popular Items</p>

                                    {[
                                        { name: 'Fresh Fettuccine (500g)', price: '$8.99', desc: 'Hand-cut, made daily' },
                                        { name: 'Marinara Sauce (750ml)', price: '$9.99', desc: 'San Marzano tomatoes, slow-simmered' },
                                        { name: 'Homemade Lasagna (Family)', price: '$24.99', desc: 'Feeds 4-6, ready to bake' },
                                        { name: 'Italian Sausage (4 links)', price: '$12.99', desc: 'Mild or hot, house-made' },
                                        { name: 'Tiramisu (whole)', price: '$18.99', desc: 'Classic, serves 6-8' },
                                    ].map((item, i) => (
                                        <div key={i} style={{
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            padding: '12px 0',
                                            borderBottom: i < 4 ? `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` : 'none',
                                        }}>
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{item.name}</div>
                                                <div style={{ fontSize: 12, color: theme.textFaint }}>{item.desc}</div>
                                            </div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: '#ef4444', whiteSpace: 'nowrap', marginLeft: 12 }}>{item.price}</div>
                                        </div>
                                    ))}
                                </div>

                                <Link href="/restaurant/paesanos-food" style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    padding: '14px 28px', borderRadius: 14, marginTop: 20,
                                    background: '#ef4444', color: '#fff',
                                    fontWeight: 700, fontSize: 15, textDecoration: 'none',
                                    fontFamily: "'DM Sans', sans-serif",
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 16px rgba(239,68,68,0.25)',
                                }}>
                                    Order from Paesano&apos;s →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    LOCAL PARTNERS (NON-MARKET)
                   ═══════════════════════════════════════ */}
                <section style={{
                    padding: isMobile ? '48px 16px 56px' : '80px 40px 80px',
                    borderTop: `1px solid ${theme.borderSubtle}`,
                }}>
                    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '8px 20px', borderRadius: 100,
                                background: isDark ? 'rgba(0,102,255,0.1)' : 'rgba(0,102,255,0.06)',
                                border: '1px solid rgba(0,102,255,0.2)',
                                fontSize: 12, fontWeight: 700, color: '#0066FF',
                                textTransform: 'uppercase', letterSpacing: '0.06em',
                                marginBottom: 20,
                            }}>🏗️ Local Partners</div>

                            <h2 style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: isMobile ? 28 : 42, fontWeight: 800,
                                letterSpacing: '-0.03em', color: theme.text,
                                marginBottom: 12, lineHeight: 1.1,
                            }}>Beyond the Market</h2>
                            <p style={{
                                fontSize: isMobile ? 15 : 17, color: theme.textMuted,
                                maxWidth: 560, margin: '0 auto', lineHeight: 1.7,
                            }}>
                                Sault Ste. Marie&apos;s trusted local businesses — hardware, lumber, office supplies, and more — delivered with the same Soobér care.
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                            gap: isMobile ? 16 : 20,
                        }}>
                            {[
                                {
                                    name: 'Soo Mill', emoji: '🪵',
                                    category: 'Hardware & Building Supply',
                                    desc: 'Sault Ste. Marie\'s trusted source for building materials, hardware, and home improvement since 1918. From lumber to custom millwork, locally owned and community-rooted for over a century.',
                                    tags: ['Hardware', 'Lumber', 'Millwork', 'Home Improvement'],
                                    color: '#92400e',
                                    accent: '#d97706',
                                },
                                {
                                    name: 'Lyons Timber Mart', emoji: '🏗️',
                                    category: 'Lumber & Contractor Supply',
                                    desc: 'Professional-grade lumber, contractor supplies, and building materials for every project. Proudly serving Algoma\'s builders, renovators, and DIYers with local expertise and fair pricing.',
                                    tags: ['Lumber', 'Building', 'Contractors', 'Tools'],
                                    color: '#166534',
                                    accent: '#22c55e',
                                },
                                {
                                    name: 'Stone\'s Office Supply', emoji: '🖊️',
                                    category: 'Office & School Supplies',
                                    desc: 'Your local office supply headquarters. From ink cartridges to furniture, school supplies to shipping — Stone\'s has kept Soo businesses and students equipped for generations.',
                                    tags: ['Office', 'School', 'Printing', 'Furniture'],
                                    color: '#1e3a5f',
                                    accent: '#3b82f6',
                                },
                            ].map((vendor, i) => (
                                <div key={vendor.name}
                                    style={{
                                        position: 'relative', borderRadius: 24, overflow: 'hidden',
                                        background: isDark
                                            ? 'linear-gradient(145deg, rgba(24,24,27,0.95), rgba(24,24,27,0.85))'
                                            : 'linear-gradient(145deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))',
                                        backdropFilter: 'blur(40px)',
                                        border: `1px solid ${theme.borderSubtle}`,
                                        transition: 'all 0.35s cubic-bezier(0.19, 1, 0.22, 1)',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-6px) scale(1.01)';
                                        e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,${isDark ? '0.4' : '0.12'})`;
                                        e.currentTarget.style.borderColor = `${vendor.accent}40`;
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = `0 2px 12px rgba(0,0,0,${isDark ? '0.2' : '0.05'})`;
                                        e.currentTarget.style.borderColor = theme.borderSubtle;
                                    }}
                                >
                                    {/* Top accent line */}
                                    <div style={{
                                        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                                        background: `linear-gradient(90deg, transparent, ${vendor.accent}, transparent)`,
                                        opacity: 0.6,
                                    }} />

                                    {/* Background emoji */}
                                    <div style={{
                                        position: 'absolute', right: -10, bottom: -20,
                                        fontSize: isMobile ? 100 : 130,
                                        opacity: isDark ? 0.04 : 0.04,
                                        pointerEvents: 'none',
                                    }}>{vendor.emoji}</div>

                                    <div style={{ position: 'relative', zIndex: 10, padding: isMobile ? 24 : 28 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                                            <div style={{
                                                width: 56, height: 56, borderRadius: 18,
                                                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 28, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                                            }}>{vendor.emoji}</div>
                                            <div style={{
                                                padding: '5px 14px', borderRadius: 100,
                                                background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)',
                                                color: '#0066FF', fontSize: 10, fontWeight: 700,
                                                letterSpacing: '0.06em', textTransform: 'uppercase',
                                            }}>🤝 Local Partner</div>
                                        </div>

                                        <h3 style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: isMobile ? 20 : 22, fontWeight: 700,
                                            color: theme.text, letterSpacing: '-0.02em',
                                            marginBottom: 4, lineHeight: 1.2,
                                        }}>{vendor.name}</h3>

                                        <p style={{
                                            fontSize: 11, color: theme.textFaint, fontWeight: 700,
                                            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10,
                                        }}>{vendor.category}</p>

                                        <p style={{
                                            fontSize: 14, color: theme.textMuted, lineHeight: 1.6,
                                            marginBottom: 16,
                                        }}>{vendor.desc}</p>

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                                            {vendor.tags.map(tag => (
                                                <span key={tag} style={{
                                                    padding: '3px 10px', borderRadius: 8,
                                                    background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                                    fontSize: 10, fontWeight: 600, color: theme.textFaint,
                                                    letterSpacing: '0.02em',
                                                }}>{tag}</span>
                                            ))}
                                        </div>

                                        <div style={{
                                            paddingTop: 14,
                                            borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        }}>
                                            <span style={{
                                                fontSize: 12, color: '#0066FF', fontWeight: 600,
                                                display: 'flex', alignItems: 'center', gap: 4,
                                            }}>⚡ Soobér Delivery Available</span>
                                            <div style={{
                                                display: 'flex', alignItems: 'center', gap: 6,
                                                padding: '8px 16px', borderRadius: 12,
                                                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                                                color: theme.textSecondary,
                                                fontSize: 13, fontWeight: 700,
                                                fontFamily: "'DM Sans', sans-serif",
                                            }}>
                                                Coming Soon
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Become a partner callout */}
                        <div style={{
                            marginTop: isMobile ? 28 : 40,
                            padding: isMobile ? '24px 20px' : '32px 40px',
                            borderRadius: 22,
                            background: isDark ? 'rgba(0,102,255,0.04)' : 'rgba(0,102,255,0.03)',
                            border: '1px solid rgba(0,102,255,0.12)',
                            display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                            gap: isMobile ? 16 : 24,
                            flexDirection: isMobile ? 'column' : 'row',
                        }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                    fontWeight: 700, color: theme.text, marginBottom: 4,
                                }}>Own a local business?</h3>
                                <p style={{ fontSize: 14, color: theme.textMuted, margin: 0 }}>
                                    Join the Soobér Local Partner network and reach thousands of Soo customers with zero-emission delivery.
                                </p>
                            </div>
                            <Link href="/corporate" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '14px 28px', borderRadius: 14,
                                background: '#0066FF', color: '#fff',
                                fontWeight: 700, fontSize: 14, textDecoration: 'none',
                                fontFamily: "'DM Sans', sans-serif",
                                whiteSpace: 'nowrap', flexShrink: 0,
                                transition: 'all 0.2s',
                                boxShadow: '0 4px 16px rgba(0,102,255,0.25)',
                            }}>Partner With Us →</Link>
                        </div>
                    </div>
                </section>


                {/* ═══════════════════════════════════════
                    CTA
                   ═══════════════════════════════════════ */}
                <section style={{ padding: isMobile ? '48px 16px' : '64px 40px', textAlign: 'center' }}>
                    <div style={{ maxWidth: 700, margin: '0 auto' }}>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: isMobile ? 24 : 32, fontWeight: 700,
                            color: theme.text, marginBottom: 12, letterSpacing: '-0.02em',
                        }}>
                            {sooMrktVendors.length} local vendors. Zero intermediaries. 100% Soo.
                        </h2>
                        <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 28 }}>
                            Every product delivered by our ⚡ electric fleet.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <Link href="https://soomarket.ca" target="_blank" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '14px 28px', borderRadius: 14,
                                background: '#eab308', color: '#000',
                                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                                fontFamily: "'DM Sans', sans-serif",
                                transition: 'transform 0.2s',
                            }}>
                                Visit soomarket.ca ↗
                            </Link>
                            <Link href="/" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '14px 28px', borderRadius: 14,
                                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                                color: theme.text,
                                fontWeight: 700, fontSize: 15, textDecoration: 'none',
                                fontFamily: "'DM Sans', sans-serif",
                                border: `1px solid ${theme.borderSubtle}`,
                            }}>
                                ← Back to Soobér
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
