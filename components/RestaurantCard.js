"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../lib/ThemeContext';

export const RestaurantCard = ({ restaurant }) => {
    const [hovered, setHovered] = useState(false);
    const { theme } = useTheme();

    return (
        <Link href={`/restaurant/${restaurant.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    borderRadius: 24,
                    overflow: 'hidden',
                    background: theme.bgCard,
                    border: `1px solid ${theme.borderSubtle}`,
                    boxShadow: hovered ? theme.shadowLg : theme.shadow,
                    transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
                    transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                    height: '100%',
                    display: 'flex', flexDirection: 'column',
                    cursor: 'pointer',
                }}
            >
                {/* Image */}
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden', flex: '1 1 auto', minHeight: 180 }}>
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${restaurant.image})`,
                        backgroundColor: restaurant.coverColor || '#18181b',
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        transform: hovered ? 'scale(1.08)' : 'scale(1)',
                        transition: 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
                    }} />
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)',
                    }} />

                    {restaurant.promo && (
                        <div style={{
                            position: 'absolute', top: 16, left: 16,
                            background: '#09090b', color: '#fafafa',
                            padding: '6px 14px', borderRadius: 100,
                            fontSize: 12, fontWeight: 700,
                        }}>{restaurant.promo}</div>
                    )}

                    <button
                        onClick={(e) => { e.preventDefault(); }}
                        style={{
                            position: 'absolute', top: 16, right: 16,
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: '#fff',
                        }}
                    >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>

                    <div style={{ position: 'absolute', bottom: 16, left: 20, right: 80, color: '#fff' }}>
                        <h3 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                            fontSize: 22, lineHeight: 1.15, letterSpacing: '-0.03em',
                            textShadow: '0 2px 12px rgba(0,0,0,0.4)', margin: 0,
                        }}>{restaurant.name}</h3>
                    </div>

                    <div style={{
                        position: 'absolute', bottom: -22, right: 20,
                        width: 52, height: 52, borderRadius: 18,
                        background: theme.bgCard, boxShadow: theme.shadowMd,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 28, zIndex: 10,
                        transform: hovered ? 'translateY(-4px) rotate(-4deg)' : 'translateY(0) rotate(0)',
                        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    }}>{restaurant.logo}</div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px 20px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: theme.textMuted, fontWeight: 500, marginBottom: 12 }}>
                        <span>{restaurant.category}</span>
                        <span style={{ width: 3, height: 3, borderRadius: '50%', background: theme.border, display: 'inline-block' }}></span>
                        <span>{restaurant.distance} km</span>
                    </div>

                    <div style={{
                        marginTop: 'auto', paddingTop: 14,
                        borderTop: `1px solid ${theme.borderLight}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600, fontSize: 14, color: theme.text }}>
                            <svg width="14" height="14" fill="#eab308" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {restaurant.reviewCount > 0 ? (
                                <>
                                    <span>{restaurant.rating}</span>
                                    <span style={{ color: theme.textFaint, fontSize: 12, fontWeight: 400 }}>({restaurant.reviewCount})</span>
                                </>
                            ) : (
                                <span style={{ color: theme.textSecondary, fontSize: 12, fontWeight: 600, background: 'rgba(234,179,8,0.15)', color: '#eab308', padding: '2px 6px', borderRadius: 4 }}>New on Soober</span>
                            )}
                        </div>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            background: theme.bgInput, borderRadius: 10, padding: '5px 12px',
                            fontSize: 13, fontWeight: 600, color: theme.textSecondary,
                        }}>
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {restaurant.deliveryTime} min
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
