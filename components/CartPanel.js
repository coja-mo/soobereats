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
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

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

    if (!isCartOpen) return null;

    return (
        <>
            <div onClick={() => setIsCartOpen(false)} style={{
                position: 'fixed', inset: 0, zIndex: 200,
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
                animation: 'fadeIn 0.3s ease',
            }} />

            <div style={{
                position: 'fixed',
                top: isMobile ? 'auto' : 0, right: isMobile ? 0 : 0,
                bottom: 0, left: isMobile ? 0 : 'auto',
                zIndex: 201,
                width: isMobile ? '100%' : '100%', maxWidth: isMobile ? '100%' : 440,
                maxHeight: isMobile ? '85vh' : '100vh',
                background: theme.bgCard,
                borderRadius: isMobile ? '24px 24px 0 0' : 0,
                boxShadow: '-20px 0 60px rgba(0,0,0,0.15)',
                display: 'flex', flexDirection: 'column',
                animation: isMobile ? 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)' : 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                {/* Drag handle on mobile */}
                {isMobile && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
                        <div style={{ width: 36, height: 4, borderRadius: 2, background: theme.border }} />
                    </div>
                )}

                {/* Header */}
                <div style={{
                    padding: isMobile ? '12px 20px 16px' : '24px 28px',
                    borderBottom: `1px solid ${theme.borderLight}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 24 }}>🛒</div>
                        <div>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text, margin: 0 }}>Your Order</h2>
                            {restaurantName && <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>from {restaurantName}</p>}
                        </div>
                    </div>
                    <button onClick={() => setIsCartOpen(false)} style={{
                        width: 36, height: 36, borderRadius: 12,
                        background: theme.bgInput, border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18, color: theme.textMuted,
                    }}>✕</button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '8px 20px' : '12px 28px' }}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px 0' }}>
                            <div style={{ fontSize: 56, marginBottom: 16, opacity: 0.6 }}>🛒</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Your cart is empty</h3>
                            <p style={{ color: theme.textFaint, fontSize: 14, marginBottom: 28 }}>Browse restaurants and add items to start your order</p>
                            <button onClick={() => setIsCartOpen(false)} style={{
                                background: theme.dark, color: theme.darkText,
                                padding: '14px 32px', borderRadius: 14, border: 'none',
                                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                            }}>Browse Restaurants</button>
                        </div>
                    ) : (
                        <div>
                            {items.map((item) => (
                                <div key={item.id} style={{
                                    display: 'flex', alignItems: 'flex-start', gap: 14,
                                    padding: '16px 0', borderBottom: `1px solid ${theme.borderLight}`,
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3 }}>{item.name}</h4>
                                        <p style={{ fontSize: 12, color: theme.textFaint, margin: 0, marginBottom: 8, lineHeight: 1.4 }}>
                                            {item.description?.substring(0, 50)}{item.description?.length > 50 ? '...' : ''}
                                        </p>
                                        <span style={{ fontSize: 15, fontWeight: 700, color: theme.text }}>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <div style={{
                                        display: 'flex', alignItems: 'center',
                                        background: theme.bgInput, borderRadius: 12,
                                        border: `1px solid ${theme.border}`, overflow: 'hidden',
                                    }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{
                                            width: 34, height: 34, border: 'none', background: 'transparent',
                                            cursor: 'pointer', fontSize: 16, color: theme.textSecondary,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>−</button>
                                        <span style={{ width: 28, textAlign: 'center', fontSize: 14, fontWeight: 700, color: theme.text }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{
                                            width: 34, height: 34, border: 'none', background: 'transparent',
                                            cursor: 'pointer', fontSize: 16, color: theme.textSecondary,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>+</button>
                                    </div>
                                </div>
                            ))}
                            <button onClick={clearCart} style={{
                                width: '100%', padding: '10px', marginTop: 8,
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 13, color: '#ef4444', fontWeight: 600,
                            }}>Clear Cart</button>
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div style={{ padding: isMobile ? '20px 20px' : '24px 28px', borderTop: `1px solid ${theme.borderLight}`, background: theme.bgAlt }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                            {[['Subtotal', subtotal], ['Delivery', deliveryFee], ['Tax (HST)', tax]].map(([label, val]) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: theme.textMuted }}>
                                    <span>{label}</span><span>${val.toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                fontSize: 18, fontWeight: 700, color: theme.text,
                                fontFamily: "'DM Sans', sans-serif",
                                paddingTop: 10, borderTop: `1px solid ${theme.border}`,
                            }}>
                                <span>Total</span><span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: '100%', padding: '16px 0', borderRadius: 16,
                            background: theme.dark, color: theme.darkText, border: 'none',
                            fontSize: 16, fontWeight: 700, textDecoration: 'none',
                            fontFamily: "'DM Sans', sans-serif",
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                        }}>
                            Checkout · ${total.toFixed(2)}
                        </Link>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
                @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
            `}</style>
        </>
    );
};
