"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../lib/ThemeContext';

/* ═══════════════════════════════════════════════
   PRODUCT CATALOG
   ═══════════════════════════════════════════════ */
const posCategories = [
    { id: 'all', name: 'All Items', emoji: '📋' },
    { id: 'ramen', name: 'Ramen', emoji: '🍜' },
    { id: 'appetizers', name: 'Appetizers', emoji: '🥟' },
    { id: 'sides', name: 'Sides', emoji: '🥗' },
    { id: 'drinks', name: 'Drinks', emoji: '🥤' },
    { id: 'desserts', name: 'Desserts', emoji: '🍡' },
];

const posProducts = [
    { id: 1, name: 'Tonkotsu Classic', price: 16.99, category: 'ramen', emoji: '🍜', color: '#dc2626' },
    { id: 2, name: 'Spicy Miso', price: 17.49, category: 'ramen', emoji: '🌶️', color: '#ea580c' },
    { id: 3, name: 'Shoyu', price: 15.99, category: 'ramen', emoji: '🍜', color: '#ca8a04' },
    { id: 4, name: 'Shio (Salt)', price: 15.99, category: 'ramen', emoji: '🧂', color: '#0891b2' },
    { id: 5, name: 'Veggie Tantanmen', price: 16.49, category: 'ramen', emoji: '🥬', color: '#16a34a' },
    { id: 6, name: 'Tom Yum Fusion', price: 17.99, category: 'ramen', emoji: '🍲', color: '#e11d48' },
    { id: 7, name: 'Gyoza (6pc)', price: 9.99, category: 'appetizers', emoji: '🥟', color: '#7c3aed' },
    { id: 8, name: 'Karaage Chicken', price: 12.99, category: 'appetizers', emoji: '🍗', color: '#b45309' },
    { id: 9, name: 'Takoyaki (8pc)', price: 10.99, category: 'appetizers', emoji: '🐙', color: '#be185d' },
    { id: 10, name: 'Edamame', price: 5.99, category: 'appetizers', emoji: '🫘', color: '#15803d' },
    { id: 11, name: 'Agedashi Tofu', price: 8.99, category: 'appetizers', emoji: '🧈', color: '#a16207' },
    { id: 12, name: 'Rice Bowl', price: 4.99, category: 'sides', emoji: '🍚', color: '#64748b' },
    { id: 13, name: 'Miso Soup', price: 3.99, category: 'sides', emoji: '🥣', color: '#b45309' },
    { id: 14, name: 'Kimchi', price: 3.49, category: 'sides', emoji: '🥬', color: '#dc2626' },
    { id: 15, name: 'Chashu Add-on', price: 4.99, category: 'sides', emoji: '🥩', color: '#9f1239' },
    { id: 16, name: 'Ramune Soda', price: 3.99, category: 'drinks', emoji: '🍶', color: '#2563eb' },
    { id: 17, name: 'Japanese Beer', price: 7.99, category: 'drinks', emoji: '🍺', color: '#ca8a04' },
    { id: 18, name: 'Green Tea', price: 2.99, category: 'drinks', emoji: '🍵', color: '#16a34a' },
    { id: 19, name: 'Matcha Latte', price: 5.49, category: 'drinks', emoji: '🍵', color: '#059669' },
    { id: 20, name: 'Matcha Soft Serve', price: 6.99, category: 'desserts', emoji: '🍦', color: '#16a34a' },
    { id: 21, name: 'Mochi (3pc)', price: 5.99, category: 'desserts', emoji: '🍡', color: '#db2777' },
    { id: 22, name: 'Dorayaki', price: 4.99, category: 'desserts', emoji: '🥞', color: '#b45309' },
];

/* ═══════════════════════════════════════════════
   POS TERMINAL COMPONENT
   ═══════════════════════════════════════════════ */
export default function VendorPOS() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [cart, setCart] = useState([]);
    const [orderType, setOrderType] = useState('dine-in'); // dine-in, takeout, soober-delivery
    const [paymentMode, setPaymentMode] = useState(null); // null, 'cash', 'card', 'digital'
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptOrder, setReceiptOrder] = useState(null);
    const [orderNumber, setOrderNumber] = useState(1047);
    const [cashTendered, setCashTendered] = useState('');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const filteredProducts = activeCategory === 'all' ? posProducts : posProducts.filter(p => p.category === activeCategory);

    const addToCart = useCallback((product) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...product, qty: 1 }];
        });
    }, []);

    const updateQty = useCallback((id, delta) => {
        setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i).filter(i => i.qty > 0));
    }, []);

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const tax = subtotal * 0.13;
    const deliveryFee = orderType === 'soober-delivery' ? 2.99 : 0;
    const total = subtotal + tax + deliveryFee;
    const cashChange = cashTendered ? parseFloat(cashTendered) - total : 0;

    const processPayment = () => {
        setReceiptOrder({ items: [...cart], subtotal, tax, deliveryFee, total, orderType, paymentMode, orderNumber, time: new Date().toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' }) });
        setShowReceipt(true);
        setOrderNumber(prev => prev + 1);
    };

    const newOrder = () => {
        setCart([]);
        setPaymentMode(null);
        setShowReceipt(false);
        setReceiptOrder(null);
        setCashTendered('');
        setOrderType('dine-in');
    };

    /* Receipt overlay */
    if (showReceipt && receiptOrder) {
        return (
            <div style={{ background: '#09090b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <div style={{
                    background: '#fafaf9', borderRadius: 20, padding: isMobile ? 24 : 40,
                    maxWidth: 400, width: '100%', color: '#09090b', textAlign: 'center',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
                }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 26, fontWeight: 700, margin: 0, marginBottom: 4 }}>Order #{receiptOrder.orderNumber}</h2>
                    <p style={{ fontSize: 14, color: '#78716c', marginBottom: 24 }}>{receiptOrder.time} · {receiptOrder.orderType === 'dine-in' ? 'Dine In' : receiptOrder.orderType === 'takeout' ? 'Takeout' : 'SOOber Delivery'} · {receiptOrder.paymentMode === 'cash' ? 'Cash' : receiptOrder.paymentMode === 'card' ? 'Card' : 'Digital'}</p>

                    <div style={{ textAlign: 'left', borderTop: '2px dashed #d6d3d1', paddingTop: 16, marginBottom: 16 }}>
                        {receiptOrder.items.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14, borderBottom: '1px solid #e7e5e4' }}>
                                <span><strong>{item.qty}x</strong> {item.name}</span>
                                <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'left', paddingTop: 8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '4px 0', color: '#57534e' }}>
                            <span>Subtotal</span><span>${receiptOrder.subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '4px 0', color: '#57534e' }}>
                            <span>HST (13%)</span><span>${receiptOrder.tax.toFixed(2)}</span>
                        </div>
                        {receiptOrder.deliveryFee > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '4px 0', color: '#57534e' }}>
                                <span>SOOber Delivery</span><span>${receiptOrder.deliveryFee.toFixed(2)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, padding: '12px 0 0', borderTop: '2px solid #09090b', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                            <span>Total</span><span>${receiptOrder.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button onClick={newOrder} style={{
                        marginTop: 28, width: '100%', padding: '16px', borderRadius: 14, border: 'none',
                        background: '#09090b', color: '#fafafa', fontSize: 16, fontWeight: 700,
                        cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                    }}>New Order →</button>

                    <p style={{ fontSize: 11, color: '#a8a29e', marginTop: 16, marginBottom: 0 }}>SOOber Eats POS · Sakura Ramen House<br />Sault Ste. Marie, ON · soobereats.ca</p>
                </div>
            </div>
        );
    }

    /* Payment overlay */
    if (paymentMode) {
        return (
            <div style={{ background: '#09090b', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                <div style={{
                    background: '#18181b', borderRadius: 28, padding: isMobile ? 28 : 44,
                    maxWidth: 480, width: '100%', border: '1px solid #27272a',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
                }}>
                    <button onClick={() => { setPaymentMode(null); setCashTendered(''); }} style={{
                        background: '#27272a', border: 'none', color: '#a1a1aa', padding: '8px 16px',
                        borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 700, marginBottom: 28,
                        fontFamily: "'DM Sans', sans-serif",
                    }}>← Back</button>

                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <div style={{ fontSize: 44 }}>{paymentMode === 'cash' ? '💵' : paymentMode === 'card' ? '💳' : '📱'}</div>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 700, color: '#fafafa', margin: '12px 0 4px' }}>
                            {paymentMode === 'cash' ? 'Cash Payment' : paymentMode === 'card' ? 'Card Payment' : 'Digital Payment'}
                        </h2>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 42, fontWeight: 800, color: '#22c55e', marginTop: 8 }}>${total.toFixed(2)}</div>
                        <p style={{ fontSize: 13, color: '#71717a', marginTop: 4 }}>Order #{orderNumber} · {cart.reduce((s, i) => s + i.qty, 0)} items</p>
                    </div>

                    {paymentMode === 'cash' && (
                        <div style={{ marginBottom: 28 }}>
                            <label style={{ fontSize: 13, fontWeight: 700, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 8 }}>Cash Tendered</label>
                            <input
                                type="number"
                                value={cashTendered}
                                onChange={e => setCashTendered(e.target.value)}
                                placeholder="0.00"
                                style={{
                                    width: '100%', padding: '16px 20px', borderRadius: 14,
                                    background: '#27272a', border: '1.5px solid #3f3f46', color: '#fafafa',
                                    fontSize: 24, fontWeight: 700, textAlign: 'center', outline: 'none',
                                    fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box',
                                }}
                            />
                            {cashTendered && parseFloat(cashTendered) >= total && (
                                <div style={{
                                    marginTop: 12, padding: '14px 20px', borderRadius: 14,
                                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                                    textAlign: 'center',
                                }}>
                                    <span style={{ fontSize: 14, color: '#22c55e', fontWeight: 700 }}>Change: ${cashChange.toFixed(2)}</span>
                                </div>
                            )}
                            {/* Quick cash buttons */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 12 }}>
                                {[20, 50, 100, Math.ceil(total)].map(v => (
                                    <button key={v} onClick={() => setCashTendered(v.toString())} style={{
                                        padding: '12px', borderRadius: 10, border: '1px solid #3f3f46',
                                        background: '#27272a', color: '#fafafa', fontSize: 14, fontWeight: 700,
                                        cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                    }}>${v}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    {paymentMode === 'card' && (
                        <div style={{
                            padding: '28px 20px', borderRadius: 20, marginBottom: 28,
                            background: '#27272a', border: '1px solid #3f3f46', textAlign: 'center',
                        }}>
                            <div style={{ fontSize: 36, marginBottom: 12 }}>📡</div>
                            <p style={{ fontSize: 15, fontWeight: 600, color: '#fafafa', marginBottom: 4 }}>Waiting for card tap...</p>
                            <p style={{ fontSize: 13, color: '#71717a', margin: 0 }}>Present card or device to terminal</p>
                        </div>
                    )}

                    {paymentMode === 'digital' && (
                        <div style={{
                            padding: '28px 20px', borderRadius: 20, marginBottom: 28,
                            background: '#27272a', border: '1px solid #3f3f46', textAlign: 'center',
                        }}>
                            <div style={{ fontSize: 36, marginBottom: 12 }}>🔲</div>
                            <p style={{ fontSize: 15, fontWeight: 600, color: '#fafafa', marginBottom: 4 }}>Scan QR code to pay</p>
                            <div style={{ width: 120, height: 120, background: '#fafafa', borderRadius: 12, margin: '16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>📱</div>
                            <p style={{ fontSize: 13, color: '#71717a', margin: 0 }}>Apple Pay · Google Pay · e-Transfer</p>
                        </div>
                    )}

                    <button onClick={processPayment} disabled={paymentMode === 'cash' && (!cashTendered || parseFloat(cashTendered) < total)} style={{
                        width: '100%', padding: '18px', borderRadius: 16, border: 'none',
                        background: (paymentMode === 'cash' && (!cashTendered || parseFloat(cashTendered) < total)) ? '#27272a' : '#22c55e',
                        color: (paymentMode === 'cash' && (!cashTendered || parseFloat(cashTendered) < total)) ? '#52525b' : '#fff',
                        fontSize: 17, fontWeight: 800, cursor: 'pointer',
                        fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em',
                        transition: 'all 0.2s',
                    }}>
                        Complete Payment — ${total.toFixed(2)}
                    </button>
                </div>
            </div>
        );
    }

    /* Main POS Interface */
    return (
        <div style={{ display: 'flex', height: '100vh', background: '#09090b', overflow: 'hidden' }}>

            {/* Left Side — Product Grid */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #27272a' }}>

                {/* POS Header */}
                <div style={{
                    padding: '16px 20px', borderBottom: '1px solid #27272a',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#0f0f11',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Link href="/vendor" style={{ textDecoration: 'none' }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10, background: '#eab308',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 18, cursor: 'pointer',
                            }}>🍜</div>
                        </Link>
                        <div>
                            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: '#fafafa', margin: 0, letterSpacing: '-0.01em' }}>SOOber POS</h1>
                            <span style={{ fontSize: 11, color: '#71717a', fontWeight: 600 }}>Sakura Ramen House</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }}></span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#22c55e' }}>Online</span>
                        </div>
                        <span style={{ fontSize: 12, color: '#71717a', fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>#{orderNumber}</span>
                    </div>
                </div>

                {/* Category tabs */}
                <div style={{
                    padding: '10px 20px', display: 'flex', gap: 6, overflowX: 'auto',
                    borderBottom: '1px solid #1c1c1f',
                }}>
                    {posCategories.map(cat => (
                        <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                            padding: '8px 16px', borderRadius: 10, whiteSpace: 'nowrap',
                            border: `1.5px solid ${activeCategory === cat.id ? '#eab308' : '#27272a'}`,
                            background: activeCategory === cat.id ? 'rgba(234,179,8,0.1)' : 'transparent',
                            color: activeCategory === cat.id ? '#eab308' : '#a1a1aa',
                            fontSize: 13, fontWeight: 700, cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s',
                        }}>
                            {cat.emoji} {cat.name}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div style={{
                    flex: 1, overflow: 'auto', padding: 16,
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: 10, alignContent: 'start',
                }}>
                    {filteredProducts.map(product => (
                        <button key={product.id} onClick={() => addToCart(product)} style={{
                            padding: 14, borderRadius: 16,
                            background: '#18181b', border: '1.5px solid #27272a',
                            cursor: 'pointer', textAlign: 'center',
                            transition: 'all 0.15s', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', gap: 6,
                            minHeight: 110,
                        }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = product.color; e.currentTarget.style.background = `${product.color}10`; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = '#27272a'; e.currentTarget.style.background = '#18181b'; }}
                        >
                            <span style={{ fontSize: 28 }}>{product.emoji}</span>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, color: '#fafafa', lineHeight: 1.2 }}>{product.name}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#a1a1aa' }}>${product.price.toFixed(2)}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Side — Cart / Order Panel */}
            <div style={{
                width: isMobile ? '100%' : 360, display: 'flex', flexDirection: 'column',
                background: '#0f0f11',
            }}>

                {/* Order Type Selector */}
                <div style={{ padding: '14px 16px', borderBottom: '1px solid #27272a' }}>
                    <div style={{ display: 'flex', gap: 4, background: '#18181b', borderRadius: 12, padding: 4 }}>
                        {[
                            { id: 'dine-in', label: 'Dine In', emoji: '🍽️' },
                            { id: 'takeout', label: 'Takeout', emoji: '📦' },
                            { id: 'soober-delivery', label: 'SOOber', emoji: '⚡' },
                        ].map(type => (
                            <button key={type.id} onClick={() => setOrderType(type.id)} style={{
                                flex: 1, padding: '10px 8px', borderRadius: 10, border: 'none',
                                background: orderType === type.id ? '#27272a' : 'transparent',
                                color: orderType === type.id ? '#fafafa' : '#71717a',
                                fontSize: 12, fontWeight: 700, cursor: 'pointer',
                                fontFamily: "'DM Sans', sans-serif",
                                transition: 'all 0.15s',
                            }}>
                                {type.emoji} {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cart Items */}
                <div style={{ flex: 1, overflow: 'auto', padding: '8px 16px' }}>
                    {cart.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.4 }}>🛒</div>
                            <p style={{ fontSize: 14, color: '#52525b', fontWeight: 600 }}>No items yet</p>
                            <p style={{ fontSize: 12, color: '#3f3f46', margin: 0 }}>Tap a product to add it</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} style={{
                                display: 'flex', alignItems: 'center', gap: 10,
                                padding: '12px 0', borderBottom: '1px solid #1c1c1f',
                            }}>
                                <span style={{ fontSize: 18 }}>{item.emoji}</span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fafafa', fontFamily: "'DM Sans', sans-serif" }}>{item.name}</div>
                                    <div style={{ fontSize: 12, color: '#71717a' }}>${item.price.toFixed(2)} ea</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <button onClick={() => updateQty(item.id, -1)} style={{
                                        width: 28, height: 28, borderRadius: 8, border: '1px solid #3f3f46',
                                        background: '#27272a', color: '#fafafa', fontSize: 14, fontWeight: 700,
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>−</button>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: '#fafafa', minWidth: 20, textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }}>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, 1)} style={{
                                        width: 28, height: 28, borderRadius: 8, border: '1px solid #3f3f46',
                                        background: '#27272a', color: '#fafafa', fontSize: 14, fontWeight: 700,
                                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>+</button>
                                </div>
                                <span style={{ fontSize: 14, fontWeight: 700, color: '#fafafa', minWidth: 52, textAlign: 'right', fontFamily: "'DM Sans', sans-serif" }}>${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))
                    )}
                </div>

                {/* Totals + Payment */}
                {cart.length > 0 && (
                    <div style={{ padding: '16px', borderTop: '1px solid #27272a' }}>
                        <div style={{ marginBottom: 14 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#a1a1aa', padding: '3px 0' }}>
                                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#a1a1aa', padding: '3px 0' }}>
                                <span>HST (13%)</span><span>${tax.toFixed(2)}</span>
                            </div>
                            {deliveryFee > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#a1a1aa', padding: '3px 0' }}>
                                    <span>SOOber Delivery</span><span>${deliveryFee.toFixed(2)}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 800, color: '#fafafa', padding: '10px 0 0', borderTop: '1px solid #27272a', marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>
                                <span>Total</span><span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Payment Method Buttons */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                            {[
                                { id: 'cash', label: 'Cash', emoji: '💵', color: '#22c55e' },
                                { id: 'card', label: 'Card', emoji: '💳', color: '#3b82f6' },
                                { id: 'digital', label: 'Digital', emoji: '📱', color: '#8b5cf6' },
                            ].map(method => (
                                <button key={method.id} onClick={() => setPaymentMode(method.id)} style={{
                                    padding: '14px 8px', borderRadius: 14, border: `1.5px solid ${method.color}40`,
                                    background: `${method.color}15`, color: method.color,
                                    fontSize: 13, fontWeight: 800, cursor: 'pointer',
                                    fontFamily: "'DM Sans', sans-serif",
                                    transition: 'all 0.15s', textAlign: 'center',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = `${method.color}25`; e.currentTarget.style.borderColor = method.color; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = `${method.color}15`; e.currentTarget.style.borderColor = `${method.color}40`; }}
                                >
                                    <div style={{ fontSize: 22, marginBottom: 4 }}>{method.emoji}</div>
                                    {method.label}
                                </button>
                            ))}
                        </div>

                        {/* Clear Order */}
                        <button onClick={newOrder} style={{
                            width: '100%', marginTop: 10, padding: '12px', borderRadius: 12,
                            border: '1px solid #3f3f46', background: 'transparent',
                            color: '#71717a', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif",
                        }}>Clear Order</button>
                    </div>
                )}
            </div>
        </div>
    );
}
