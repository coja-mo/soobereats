"use client";

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getRestaurantById } from '../../../lib/data/restaurants';
import { useCart } from '../../../lib/CartContext';
import { useTheme } from '../../../lib/ThemeContext';

export default function RestaurantPage() {
    const params = useParams();
    const restaurant = getRestaurantById(params.id);
    const { addToCart } = useCart();
    const { theme } = useTheme();
    const [activeMenuCategory, setActiveMenuCategory] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const menuCategories = useMemo(() => {
        if (!restaurant) return [];
        const grouped = {};
        restaurant.menu.forEach((item) => {
            if (!grouped[item.category]) grouped[item.category] = [];
            grouped[item.category].push(item);
        });
        return Object.entries(grouped).map(([name, items]) => ({ name, items }));
    }, [restaurant]);

    const activeCategory = activeMenuCategory || (menuCategories[0]?.name ?? null);

    if (!restaurant) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16, padding: 40, background: theme.bg }}>
                <div style={{ fontSize: 80, marginBottom: 8 }}>🍽️</div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700, color: theme.text }}>Restaurant not found</h1>
                <Link href="/" style={{ background: theme.dark, color: theme.darkText, padding: '14px 32px', borderRadius: 16, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>← Back to restaurants</Link>
            </div>
        );
    }

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ paddingBottom: 100, background: theme.bg, transition: 'background 0.3s ease' }}>
            {/* Hero */}
            <div style={{ position: 'relative', height: isMobile ? 260 : 340, overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${restaurant.image})`,
                    backgroundColor: restaurant.coverColor || '#18181b',
                    backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />

                <Link href="/" style={{
                    position: 'absolute', top: isMobile ? 16 : 24, left: isMobile ? 16 : 24, zIndex: 20,
                    width: 44, height: 44, borderRadius: 14,
                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none',
                }}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>

                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, padding: isMobile ? '0 16px 20px' : '0 40px 32px', maxWidth: 1440, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 14 : 20 }}>
                        <div style={{
                            width: isMobile ? 56 : 80, height: isMobile ? 56 : 80, borderRadius: isMobile ? 16 : 22,
                            background: theme.bgCard, boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: isMobile ? 28 : 42, flexShrink: 0,
                        }}>{restaurant.logo}</div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 36, fontWeight: 700,
                                color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
                                textShadow: '0 2px 16px rgba(0,0,0,0.4)', margin: 0, marginBottom: 8,
                            }}>{restaurant.name}</h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 16, flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#fafafa', fontSize: isMobile ? 12 : 14, fontWeight: 600 }}>
                                    <svg width="14" height="14" fill="#eab308" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {restaurant.rating}
                                </div>
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }}></span>
                                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: isMobile ? 12 : 14 }}>{restaurant.category}</span>
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }}></span>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 5,
                                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
                                    padding: '4px 12px', borderRadius: 10,
                                    color: '#fff', fontSize: isMobile ? 11 : 13, fontWeight: 600,
                                }}>🕐 {restaurant.deliveryTime} min</div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 5,
                                    background: 'rgba(16,185,129,0.15)', backdropFilter: 'blur(8px)',
                                    padding: '4px 12px', borderRadius: 10,
                                    color: '#34d399', fontSize: isMobile ? 11 : 13, fontWeight: 600,
                                }}>⚡ Electric</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                <div style={{
                    padding: isMobile ? '16px 0' : '28px 0', borderBottom: `1px solid ${theme.borderLight}`,
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                    gap: 20, flexDirection: isMobile ? 'column' : 'row',
                }}>
                    <p style={{ fontSize: isMobile ? 14 : 16, color: theme.textMuted, lineHeight: 1.6, maxWidth: 600, margin: 0 }}>{restaurant.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: theme.textFaint, flexShrink: 0 }}>
                        <span>📍</span><span>{restaurant.address}</span>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: pad }}>
                <div style={{
                    position: 'sticky', top: isMobile ? 64 : 72, zIndex: 40,
                    background: theme.categoryBg,
                    backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)',
                    borderBottom: `1px solid ${theme.borderSubtle}`,
                    padding: '10px 0', margin: isMobile ? '0 -16px' : '0 -40px',
                    paddingLeft: isMobile ? 16 : 40, paddingRight: isMobile ? 16 : 40,
                    display: 'flex', gap: 6, overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                }}>
                    {menuCategories.map((cat) => (
                        <button key={cat.name}
                            onClick={() => {
                                setActiveMenuCategory(cat.name);
                                const el = document.getElementById(`cat-${cat.name.replace(/\s+/g, '-').toLowerCase()}`);
                                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            style={{
                                padding: '7px 18px', borderRadius: 100, border: 'none',
                                cursor: 'pointer', whiteSpace: 'nowrap',
                                fontSize: isMobile ? 13 : 14, fontWeight: 600,
                                fontFamily: "'DM Sans', sans-serif",
                                background: activeCategory === cat.name ? theme.dark : 'transparent',
                                color: activeCategory === cat.name ? theme.darkText : theme.textMuted,
                                transition: 'all 0.25s ease',
                            }}
                        >{cat.name}</button>
                    ))}
                </div>

                <div style={{ paddingTop: isMobile ? 24 : 40 }}>
                    {menuCategories.map((cat) => (
                        <div key={cat.name} id={`cat-${cat.name.replace(/\s+/g, '-').toLowerCase()}`} style={{ marginBottom: isMobile ? 32 : 48, scrollMarginTop: 160 }}>
                            <h2 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 20 : 24, fontWeight: 700,
                                color: theme.text, letterSpacing: '-0.02em', marginBottom: isMobile ? 14 : 20,
                            }}>{cat.name}</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))',
                                gap: isMobile ? 10 : 16,
                            }}>
                                {cat.items.map((item) => (
                                    <MenuItem key={item.id} item={item} restaurant={restaurant} theme={theme} isMobile={isMobile} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MenuItem({ item, restaurant, theme, isMobile }) {
    const [hovered, setHovered] = useState(false);
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    const handleAdd = (e) => {
        e.stopPropagation();
        addToCart(item, restaurant);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleAdd}
            style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                padding: isMobile ? '14px 16px' : '20px 24px',
                background: hovered ? theme.bgCardHover : theme.bgCard,
                border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                borderRadius: isMobile ? 16 : 20, cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hovered ? theme.shadowMd : theme.shadow,
            }}
        >
            <div style={{ flex: 1, paddingRight: 12 }}>
                <h3 style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 14 : 16, fontWeight: 700,
                    color: theme.text, margin: 0, marginBottom: 4,
                }}>{item.name}</h3>
                <p style={{
                    fontSize: isMobile ? 12 : 13, color: theme.textFaint, lineHeight: 1.5,
                    margin: 0, marginBottom: 10,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>{item.description}</p>
                <span style={{ fontSize: isMobile ? 14 : 16, fontWeight: 700, color: theme.text }}>${item.price.toFixed(2)}</span>
            </div>
            <button onClick={handleAdd} style={{
                width: isMobile ? 38 : 44, height: isMobile ? 38 : 44, borderRadius: isMobile ? 12 : 14,
                background: added ? '#22c55e' : (hovered ? theme.dark : theme.bgInput),
                color: added ? '#fff' : (hovered ? theme.darkText : theme.textMuted),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 4, border: 'none', cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                fontSize: 20,
                transform: added ? 'scale(1.1)' : 'scale(1)',
            }}>{added ? '✓' : '+'}</button>
        </div>
    );
}
