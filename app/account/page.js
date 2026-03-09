"use client";

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import Link from 'next/link';
import { Footer } from '../../components/Footer';

// ── Tier Data ──────────────────────────────────────────────────────────────
const TIER = { name: 'Diamond', emoji: '💎', color: '#60a5fa', gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6, #818cf8)' };

const ORDER_HISTORY = [
    { name: "Aurora's Restaurant", items: 3, date: 'Mar 7, 2026 · 7:23 PM', total: 52.47, status: 'Delivered', logo: '🍝', rating: 5 },
    { name: "Sandro's", items: 2, date: 'Mar 5, 2026 · 6:10 PM', total: 38.99, status: 'Delivered', logo: '🍕', rating: 4 },
    { name: "Tandoori Gardan", items: 4, date: 'Mar 3, 2026 · 8:45 PM', total: 67.20, status: 'Delivered', logo: '🍛', rating: 5 },
    { name: "Mucho Burrito", items: 1, date: 'Mar 1, 2026 · 12:30 PM', total: 18.50, status: 'Delivered', logo: '🌯', rating: 4 },
    { name: "Tim Hortons", items: 3, date: 'Feb 28, 2026 · 8:15 AM', total: 14.47, status: 'Delivered', logo: '☕', rating: 3 },
];

const FAVORITES = [
    { name: "Aurora's", logo: '🍝', cuisine: 'Italian', orders: 12 },
    { name: "Sandro's", logo: '🍕', cuisine: 'Pizza', orders: 8 },
    { name: "Tandoori Gardan", logo: '🍛', cuisine: 'Indian', orders: 6 },
    { name: "Mucho Burrito", logo: '🌯', cuisine: 'Mexican', orders: 4 },
];

const SAVED_CARDS = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true, gradient: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)' },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/27', isDefault: false, gradient: 'linear-gradient(135deg, #2d1b3d, #44236b, #5c2d82)' },
];

const SAVED_ADDRESSES = [
    { id: 1, label: 'Home', address: '123 Queen St E, Sault Ste. Marie, ON', isDefault: true, emoji: '🏠' },
    { id: 2, label: 'Office', address: '456 Northern Ave, Sault Ste. Marie, ON', isDefault: false, emoji: '🏢' },
];

const ACTIVITY = [
    { type: 'order', icon: '📦', title: 'Order delivered', desc: "Aurora's Restaurant — 3 items", time: '2h ago', color: '#22c55e' },
    { type: 'reward', icon: '⭐', title: '+48 points earned', desc: "Aurora's order — Diamond 3× bonus", time: '2h ago', color: '#eab308' },
    { type: 'order', icon: '📦', title: 'Order delivered', desc: "Sandro's — 2 items", time: '2 days ago', color: '#22c55e' },
    { type: 'reward', icon: '⭐', title: '+33 points earned', desc: "Sandro's order — Diamond 3× bonus", time: '2 days ago', color: '#eab308' },
    { type: 'referral', icon: '🎁', title: 'Referral accepted!', desc: 'Sarah M. placed their first order', time: '4 days ago', color: '#a855f7' },
    { type: 'reward', icon: '🏆', title: 'Streak Bonus!', desc: '5 orders this week — +50 bonus points', time: '5 days ago', color: '#f59e0b' },
    { type: 'order', icon: '📦', title: 'Order delivered', desc: "Tandoori Gardan — 4 items", time: '6 days ago', color: '#22c55e' },
];

// ── Diamond Shimmer Particles ──────────────────────────────────────────────
function TierBadge({ theme, isMobile }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width = 200;
        const h = canvas.height = 60;
        const particles = Array.from({ length: 18 }, () => ({
            x: Math.random() * w, y: Math.random() * h,
            size: 1 + Math.random() * 2,
            speed: 0.2 + Math.random() * 0.4,
            opacity: Math.random(),
            dir: Math.random() * Math.PI * 2,
        }));

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += Math.cos(p.dir) * p.speed;
                p.y += Math.sin(p.dir) * p.speed;
                p.opacity += (Math.random() - 0.5) * 0.06;
                p.opacity = Math.max(0.1, Math.min(1, p.opacity));
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(96,165,250,${p.opacity * 0.6})`;
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(raf);
    }, []);

    return (
        <div style={{
            position: 'relative', display: 'inline-flex', alignItems: 'center',
            gap: 6, padding: '6px 18px 6px 12px', borderRadius: 10,
            background: 'rgba(96,165,250,0.12)', overflow: 'hidden',
        }}>
            <canvas ref={canvasRef} style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
            }} />
            <span style={{
                fontSize: 16, position: 'relative', zIndex: 1,
                animation: 'tierPulse 2s ease-in-out infinite',
            }}>💎</span>
            <span style={{
                fontSize: 12, fontWeight: 700, color: '#60a5fa',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                position: 'relative', zIndex: 1,
                fontFamily: "'DM Sans', sans-serif",
            }}>Soobér Diamond</span>
        </div>
    );
}

// ── Star Rating ────────────────────────────────────────────────────────────
function StarRating({ rating, interactive, onRate, theme }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3, 4, 5].map(star => (
                <button key={star}
                    onClick={() => interactive && onRate && onRate(star)}
                    onMouseEnter={() => interactive && setHovered(star)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    style={{
                        background: 'none', border: 'none', cursor: interactive ? 'pointer' : 'default',
                        fontSize: 16, padding: 0, transition: 'transform 0.15s',
                        transform: hovered === star ? 'scale(1.3)' : 'scale(1)',
                        filter: star <= (hovered || rating) ? 'none' : 'grayscale(1) opacity(0.3)',
                    }}>⭐</button>
            ))}
        </div>
    );
}

// ── Main Account Page ──────────────────────────────────────────────────────
export default function AccountPage() {
    const { theme, isDark } = useTheme();
    const [activeTab, setActiveTab] = useState('orders');
    const [isMobile, setIsMobile] = useState(false);
    const [ratings, setRatings] = useState({});

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const tabs = [
        { id: 'orders', label: 'Order History', emoji: '📦' },
        { id: 'favorites', label: 'Favorites', emoji: '❤️' },
        { id: 'payment', label: 'Payment', emoji: '💳' },
        { id: 'addresses', label: 'Addresses', emoji: '📍' },
        { id: 'activity', label: 'Activity', emoji: '⚡' },
        { id: 'settings', label: 'Settings', emoji: '⚙️' },
    ];

    const cardStyle = {
        background: theme.bgCard, border: `1px solid ${theme.borderLight}`,
        borderRadius: 22, padding: isMobile ? 16 : 24, boxShadow: theme.shadow,
    };

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', transition: 'background 0.3s ease' }}>
            <div style={{ maxWidth: 960, margin: '0 auto', padding: isMobile ? '24px 16px 100px' : '40px 40px 100px' }}>

                {/* ─── Profile Header ─────────────────────────────────────── */}
                <div style={{
                    background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)',
                    borderRadius: isMobile ? 24 : 32,
                    padding: isMobile ? '24px 20px' : '40px 44px',
                    marginBottom: isMobile ? 20 : 32,
                    position: 'relative', overflow: 'hidden',
                }}>
                    {/* Glow orbs */}
                    <div style={{
                        position: 'absolute', top: -50, right: -50,
                        width: 200, height: 200, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
                    }} />
                    <div style={{
                        position: 'absolute', bottom: -40, left: -30,
                        width: 160, height: 160, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(234,179,8,0.08) 0%, transparent 70%)',
                    }} />

                    <div style={{
                        display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                        gap: isMobile ? 16 : 24, position: 'relative',
                        flexDirection: isMobile ? 'column' : 'row',
                    }}>
                        {/* Avatar */}
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                width: isMobile ? 72 : 100, height: isMobile ? 72 : 100,
                                borderRadius: isMobile ? 22 : 28,
                                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: isMobile ? 28 : 40, fontWeight: 800, color: '#fff',
                                fontFamily: "'DM Sans', sans-serif",
                                boxShadow: '0 8px 32px rgba(96,165,250,0.3)',
                                flexShrink: 0,
                            }}>CM</div>
                            <div style={{
                                position: 'absolute', bottom: -4, right: -4,
                                width: 24, height: 24, borderRadius: '50%',
                                background: '#22c55e', display: 'flex',
                                alignItems: 'center', justifyContent: 'center',
                                border: '3px solid #1c1917', fontSize: 11,
                            }}>✓</div>
                        </div>

                        <div style={{ flex: 1 }}>
                            <h1 style={{
                                fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                                fontSize: isMobile ? 24 : 32, letterSpacing: '-0.03em',
                                color: '#fafafa', margin: 0, marginBottom: 8,
                            }}>Cody Mount</h1>
                            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0, marginBottom: 12 }}>cody@antigravitysolutions.ca</p>
                            <TierBadge theme={theme} isMobile={isMobile} />
                        </div>

                        {!isMobile && (
                            <button style={{
                                padding: '12px 24px', borderRadius: 14,
                                border: '1.5px solid rgba(255,255,255,0.15)',
                                background: 'rgba(255,255,255,0.05)', color: '#fafafa',
                                fontSize: 14, fontWeight: 600, cursor: 'pointer',
                                backdropFilter: 'blur(10px)',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                            >Edit Profile</button>
                        )}
                    </div>

                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: isMobile ? 8 : 12, marginTop: isMobile ? 20 : 28,
                    }}>
                        {[
                            { emoji: '🛍️', value: '47', label: 'Orders' },
                            { emoji: '⭐', value: '4,230', label: 'Points' },
                            { emoji: '❤️', value: '8', label: 'Favorites' },
                            { emoji: '🎁', value: '3', label: 'Referrals' },
                        ].map(stat => (
                            <div key={stat.label} style={{
                                background: 'rgba(255,255,255,0.04)',
                                borderRadius: 18, padding: isMobile ? '14px 14px' : '18px 20px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                transition: 'background 0.2s',
                            }}>
                                <div style={{ fontSize: isMobile ? 18 : 22, marginBottom: 4 }}>{stat.emoji}</div>
                                <div style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: isMobile ? 24 : 32, fontWeight: 800,
                                    color: '#fafafa', letterSpacing: '-0.02em',
                                }}>{stat.value}</div>
                                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── Tab Bar ────────────────────────────────────────────── */}
                <div style={{
                    display: 'flex', gap: 4,
                    background: theme.bgAlt, borderRadius: 18, padding: 4,
                    marginBottom: isMobile ? 16 : 24,
                    border: `1px solid ${theme.borderLight}`,
                    overflowX: 'auto',
                }}>
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                            flex: 1, padding: isMobile ? '10px 6px' : '12px 14px',
                            borderRadius: 14, border: 'none', cursor: 'pointer',
                            fontSize: isMobile ? 12 : 14, fontWeight: 600, whiteSpace: 'nowrap',
                            background: activeTab === tab.id ? theme.bgCard : 'transparent',
                            color: activeTab === tab.id ? theme.text : theme.textFaint,
                            boxShadow: activeTab === tab.id ? theme.shadowMd : 'none',
                            transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                            fontFamily: "'DM Sans', sans-serif",
                            minWidth: isMobile ? 44 : 'auto',
                        }}>
                            {tab.emoji}{isMobile ? '' : ` ${tab.label}`}
                        </button>
                    ))}
                </div>

                {/* ─── Orders Tab ─────────────────────────────────────────── */}
                {activeTab === 'orders' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {ORDER_HISTORY.map((order, i) => (
                            <div key={i} style={{
                                ...cardStyle,
                                display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                                gap: isMobile ? 12 : 20,
                                flexDirection: isMobile ? 'column' : 'row',
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = theme.shadowMd; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20, flex: 1, width: '100%' }}>
                                    <div style={{
                                        width: isMobile ? 48 : 56, height: isMobile ? 48 : 56,
                                        borderRadius: isMobile ? 16 : 18,
                                        background: theme.bgInput, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontSize: isMobile ? 24 : 28, flexShrink: 0,
                                    }}>{order.logo}</div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17,
                                            fontWeight: 700, color: theme.text, margin: 0, marginBottom: 4,
                                        }}>{order.name}</h3>
                                        <p style={{ fontSize: 13, color: theme.textFaint, margin: 0, marginBottom: 4 }}>
                                            {order.items} items · {order.date}
                                        </p>
                                        <StarRating
                                            rating={ratings[i] ?? order.rating}
                                            interactive={!ratings[i]}
                                            onRate={(r) => setRatings(prev => ({ ...prev, [i]: r }))}
                                            theme={theme}
                                        />
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex', alignItems: isMobile ? 'flex-start' : 'flex-end',
                                    flexDirection: 'column', gap: 8,
                                    width: isMobile ? '100%' : 'auto',
                                }}>
                                    <div style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: isMobile ? 17 : 20, fontWeight: 800,
                                        color: theme.text,
                                    }}>${order.total.toFixed(2)}</div>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, color: '#22c55e',
                                            background: 'rgba(34,197,94,0.1)', padding: '3px 10px',
                                            borderRadius: 8, textTransform: 'uppercase',
                                        }}>{order.status}</span>
                                        <Link href="/" style={{
                                            fontSize: 12, fontWeight: 700, color: '#0066FF',
                                            background: 'rgba(0,102,255,0.08)', padding: '5px 14px',
                                            borderRadius: 10, textDecoration: 'none',
                                            transition: 'all 0.2s',
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,102,255,0.15)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,102,255,0.08)'; }}
                                        >🔄 Reorder</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ─── Favorites Tab ──────────────────────────────────────── */}
                {activeTab === 'favorites' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                        gap: 12,
                    }}>
                        {FAVORITES.map((fav, i) => (
                            <Link key={i} href="/" style={{
                                ...cardStyle, textDecoration: 'none',
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                textAlign: 'center', padding: isMobile ? 20 : 28,
                                transition: 'all 0.2s', cursor: 'pointer',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = theme.shadowMd; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; }}
                            >
                                <div style={{
                                    width: 64, height: 64, borderRadius: 22,
                                    background: theme.bgInput, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: 32, marginBottom: 12,
                                }}>{fav.logo}</div>
                                <h3 style={{
                                    fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                                    fontWeight: 700, color: theme.text, margin: 0, marginBottom: 4,
                                }}>{fav.name}</h3>
                                <p style={{ fontSize: 12, color: theme.textFaint, margin: 0, marginBottom: 10 }}>
                                    {fav.cuisine} · {fav.orders} orders
                                </p>
                                <span style={{
                                    fontSize: 12, fontWeight: 700, color: '#0066FF',
                                    background: 'rgba(0,102,255,0.08)', padding: '6px 16px',
                                    borderRadius: 10,
                                }}>Order Again</span>
                            </Link>
                        ))}
                    </div>
                )}

                {/* ─── Payment Tab ────────────────────────────────────────── */}
                {activeTab === 'payment' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {SAVED_CARDS.map(card => (
                            <div key={card.id} style={{
                                borderRadius: 22, overflow: 'hidden',
                                border: card.isDefault ? '2px solid #eab308' : `1px solid ${theme.borderLight}`,
                                boxShadow: card.isDefault ? '0 8px 32px rgba(234,179,8,0.12)' : theme.shadow,
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {/* Mini Credit Card Render */}
                                <div style={{
                                    background: card.gradient,
                                    padding: isMobile ? '20px 20px 16px' : '28px 28px 20px',
                                    position: 'relative', overflow: 'hidden',
                                }}>
                                    {/* Holographic circle */}
                                    <div style={{
                                        position: 'absolute', top: -20, right: -20,
                                        width: 120, height: 120, borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
                                    }} />
                                    <div style={{
                                        position: 'absolute', bottom: -30, right: 40,
                                        width: 100, height: 100, borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
                                    }} />

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: isMobile ? 20 : 28 }}>
                                        {/* Chip */}
                                        <div style={{
                                            width: 36, height: 28, borderRadius: 5,
                                            background: 'linear-gradient(135deg, #d4a843, #c4993d)',
                                            position: 'relative',
                                        }}>
                                            <div style={{
                                                position: 'absolute', inset: 3,
                                                borderRadius: 3,
                                                border: '1px solid rgba(0,0,0,0.15)',
                                            }} />
                                        </div>
                                        {card.isDefault && (
                                            <span style={{
                                                fontSize: 10, fontWeight: 800, color: '#eab308',
                                                background: 'rgba(234,179,8,0.2)', padding: '3px 10px',
                                                borderRadius: 6, textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                            }}>Default</span>
                                        )}
                                    </div>

                                    <div style={{
                                        fontFamily: "'DM Sans', monospace", fontSize: isMobile ? 18 : 22,
                                        fontWeight: 600, color: 'rgba(255,255,255,0.9)',
                                        letterSpacing: '0.15em', marginBottom: isMobile ? 14 : 18,
                                    }}>
                                        •••• •••• •••• {card.last4}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <div>
                                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Cardholder</div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cody Mount</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Expires</div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{card.expiry}</div>
                                        </div>
                                        <div style={{
                                            fontSize: isMobile ? 18 : 24, fontWeight: 900,
                                            color: 'rgba(255,255,255,0.5)',
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontStyle: 'italic',
                                        }}>{card.type === 'Visa' ? 'VISA' : 'MC'}</div>
                                    </div>
                                </div>

                                {/* Card actions bar */}
                                <div style={{
                                    background: theme.bgCard, padding: '12px 20px',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                }}>
                                    <span style={{ fontSize: 13, color: theme.textMuted }}>{card.type} ending in {card.last4}</span>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button style={{
                                            fontSize: 12, fontWeight: 600, color: theme.textFaint,
                                            background: 'transparent', border: 'none', cursor: 'pointer',
                                        }}>Edit</button>
                                        <button style={{
                                            fontSize: 12, fontWeight: 600, color: '#ef4444',
                                            background: 'transparent', border: 'none', cursor: 'pointer',
                                        }}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            padding: '18px', borderRadius: 20,
                            border: `2px dashed ${theme.border}`,
                            background: 'transparent', cursor: 'pointer',
                            color: theme.textMuted, fontSize: 15, fontWeight: 600,
                            fontFamily: "'DM Sans', sans-serif",
                            transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0066FF'; e.currentTarget.style.color = '#0066FF'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textMuted; }}
                        >
                            <span style={{ fontSize: 20 }}>＋</span> Add New Card
                        </button>
                    </div>
                )}

                {/* ─── Addresses Tab ──────────────────────────────────────── */}
                {activeTab === 'addresses' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {SAVED_ADDRESSES.map(addr => (
                            <div key={addr.id} style={{
                                ...cardStyle, display: 'flex', alignItems: 'center', gap: 16,
                                border: addr.isDefault ? `2px solid #0066FF` : cardStyle.border,
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {/* Mini map illustration */}
                                <div style={{
                                    width: 56, height: 56, borderRadius: 18,
                                    background: isDark
                                        ? 'linear-gradient(135deg, #1e293b, #0f172a)'
                                        : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 28, flexShrink: 0, position: 'relative', overflow: 'hidden',
                                }}>
                                    {/* Tiny grid lines */}
                                    <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                                        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: isDark ? '#fff' : '#000' }} />
                                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: isDark ? '#fff' : '#000' }} />
                                        <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: 1, background: isDark ? '#fff' : '#000' }} />
                                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', width: 1, background: isDark ? '#fff' : '#000' }} />
                                    </div>
                                    <span style={{ position: 'relative', zIndex: 1 }}>{addr.emoji}</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <h3 style={{
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                                            fontWeight: 700, color: theme.text, margin: 0,
                                        }}>{addr.label}</h3>
                                        {addr.isDefault && (
                                            <span style={{
                                                fontSize: 10, fontWeight: 700, color: '#0066FF',
                                                background: 'rgba(0,102,255,0.1)', padding: '2px 10px',
                                                borderRadius: 6, textTransform: 'uppercase',
                                            }}>Default</span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: 14, color: theme.textMuted, margin: 0 }}>{addr.address}</p>
                                </div>
                                <button style={{
                                    fontSize: 13, fontWeight: 600, color: '#0066FF',
                                    background: 'transparent', border: 'none', cursor: 'pointer',
                                }}>Edit</button>
                            </div>
                        ))}
                        <button style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            padding: '18px', borderRadius: 20,
                            border: `2px dashed ${theme.border}`,
                            background: 'transparent', cursor: 'pointer',
                            color: theme.textMuted, fontSize: 15, fontWeight: 600,
                            fontFamily: "'DM Sans', sans-serif",
                            transition: 'all 0.2s',
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0066FF'; e.currentTarget.style.color = '#0066FF'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.color = theme.textMuted; }}
                        >
                            <span style={{ fontSize: 20 }}>＋</span> Add New Address
                        </button>
                    </div>
                )}

                {/* ─── Activity Tab ───────────────────────────────────────── */}
                {activeTab === 'activity' && (
                    <div style={{ ...cardStyle }}>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                            fontWeight: 700, color: theme.text, margin: 0, marginBottom: 20,
                        }}>Recent Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {ACTIVITY.map((item, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: 14,
                                    padding: '16px 0',
                                    borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${theme.borderLight}` : 'none',
                                }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 14,
                                        background: `${item.color}15`, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontSize: 18, flexShrink: 0,
                                    }}>{item.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                                            fontWeight: 700, color: theme.text, marginBottom: 2,
                                        }}>{item.title}</div>
                                        <div style={{ fontSize: 13, color: theme.textMuted }}>{item.desc}</div>
                                    </div>
                                    <span style={{ fontSize: 12, color: theme.textFaint, whiteSpace: 'nowrap', marginTop: 2 }}>{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─── Settings Tab ───────────────────────────────────────── */}
                {activeTab === 'settings' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={cardStyle}>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                fontWeight: 700, color: theme.text, margin: 0, marginBottom: 20,
                            }}>Notifications</h3>
                            {[
                                { label: 'Order Updates', desc: 'Get notified when your order status changes', default: true },
                                { label: 'Promotions', desc: 'Deals and offers from your favorite restaurants', default: true },
                                { label: 'Weekly Digest', desc: 'New restaurants and trending picks in the Soo', default: false },
                                { label: 'Rewards Alerts', desc: 'Point milestones and tier upgrade notifications', default: true },
                            ].map((setting, i) => (
                                <ToggleRow key={i} setting={setting} theme={theme} />
                            ))}
                        </div>
                        <div style={cardStyle}>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                fontWeight: 700, color: theme.text, margin: 0, marginBottom: 16,
                            }}>Dietary Preferences</h3>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Keto', 'Dairy-Free', 'Nut-Free', 'Kosher'].map(pref => (
                                    <DietButton key={pref} label={pref} theme={theme} />
                                ))}
                            </div>
                        </div>
                        <div style={cardStyle}>
                            <h3 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                fontWeight: 700, color: theme.text, margin: 0, marginBottom: 16,
                            }}>Account</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                {[
                                    { label: 'Privacy Policy', icon: '🔒' },
                                    { label: 'Terms of Service', icon: '📄' },
                                    { label: 'Help & Support', icon: '💬' },
                                ].map((item, i) => (
                                    <Link key={i} href={item.label === 'Privacy Policy' ? '/privacy' : item.label === 'Terms of Service' ? '/terms' : '/support'}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 12,
                                            padding: '14px 0', textDecoration: 'none',
                                            borderBottom: `1px solid ${theme.borderLight}`,
                                        }}>
                                        <span style={{ fontSize: 18 }}>{item.icon}</span>
                                        <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: theme.text }}>{item.label}</span>
                                        <span style={{ fontSize: 14, color: theme.textFaint }}>→</span>
                                    </Link>
                                ))}
                            </div>
                            <button style={{
                                marginTop: 20, width: '100%', padding: '14px',
                                borderRadius: 14, border: '1.5px solid #ef4444',
                                background: 'rgba(239,68,68,0.06)', color: '#ef4444',
                                fontSize: 15, fontWeight: 700, cursor: 'pointer',
                                fontFamily: "'DM Sans', sans-serif",
                                transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.06)'; }}
                            >Sign Out</button>
                        </div>
                    </div>
                )}

                <style>{`
                @keyframes tierPulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
            `}</style>
            </div>

            <Footer />
        </div>
    );
}

// ── Sub-Components ─────────────────────────────────────────────────────────
function ToggleRow({ setting, theme }) {
    const [enabled, setEnabled] = useState(setting.default);
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 0', borderBottom: `1px solid ${theme.borderLight}`,
        }}>
            <div>
                <h4 style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15,
                    fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3,
                }}>{setting.label}</h4>
                <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>{setting.desc}</p>
            </div>
            <button onClick={() => setEnabled(!enabled)} style={{
                width: 52, height: 30, borderRadius: 15, border: 'none', cursor: 'pointer',
                background: enabled ? '#22c55e' : theme.bgInput,
                position: 'relative', transition: 'background 0.2s', flexShrink: 0, marginLeft: 16,
            }}>
                <div style={{
                    width: 24, height: 24, borderRadius: 12, background: '#fff',
                    position: 'absolute', top: 3,
                    left: enabled ? 25 : 3,
                    transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }} />
            </button>
        </div>
    );
}

function DietButton({ label, theme }) {
    const [active, setActive] = useState(false);
    return (
        <button onClick={() => setActive(!active)} style={{
            padding: '8px 18px', borderRadius: 100,
            border: active ? '1.5px solid #22c55e' : `1.5px solid ${theme.border}`,
            background: active ? 'rgba(34,197,94,0.08)' : 'transparent',
            color: active ? '#22c55e' : theme.textSecondary,
            fontSize: 13, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: "'DM Sans', sans-serif",
        }}>{active ? '✓ ' : ''}{label}</button>
    );
}
