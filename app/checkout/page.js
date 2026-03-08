"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../lib/CartContext';
import { useTheme } from '../../lib/ThemeContext';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, restaurantName, restaurantLogo, subtotal, deliveryFee, tax, total, itemCount, clearCart } = useCart();
    const { theme } = useTheme();
    const [tipPercent, setTipPercent] = useState(18);
    const [customTip, setCustomTip] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', apt: '', instructions: '', cardNumber: '', expiry: '', cvc: '' });

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const tipAmount = customTip ? parseFloat(customTip) || 0 : subtotal * (tipPercent / 100);
    const grandTotal = total + tipAmount;
    const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        setTimeout(() => { clearCart(); router.push('/'); }, 4000);
    };

    if (orderPlaced) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 40, textAlign: 'center', background: theme.bg }}>
                <div style={{
                    width: 100, height: 100, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 44, marginBottom: 28, boxShadow: '0 20px 60px rgba(34,197,94,0.3)',
                    animation: 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}>✓</div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Order Placed!</h1>
                <p style={{ fontSize: 16, color: theme.textMuted, maxWidth: 400 }}>Your order from <strong>{restaurantName}</strong> is being prepared.</p>
                <p style={{ fontSize: 14, color: theme.textFaint, marginTop: 24 }}>Redirecting home...</p>
                <style>{`@keyframes scaleIn { 0% { transform: scale(0); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`}</style>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: 40, textAlign: 'center', background: theme.bg }}>
                <div style={{ fontSize: 72, marginBottom: 20, opacity: 0.5 }}>🛒</div>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Nothing to check out</h1>
                <Link href="/" style={{ background: theme.dark, color: theme.darkText, padding: '14px 32px', borderRadius: 14, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Browse Restaurants</Link>
            </div>
        );
    }

    const inputStyle = {
        width: '100%', padding: '14px 18px', borderRadius: 14,
        border: `1.5px solid ${theme.border}`, fontSize: 15, fontWeight: 500,
        color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
        background: theme.bgInput, transition: 'all 0.2s', boxSizing: 'border-box',
    };
    const labelStyle = { fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 6, display: 'block', fontFamily: "'DM Sans', sans-serif" };
    const sectionStyle = {
        background: theme.bgCard, borderRadius: 24, border: `1px solid ${theme.borderLight}`,
        padding: isMobile ? 20 : 32, marginBottom: 20, boxShadow: theme.shadow,
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '24px 16px 100px' : '40px 40px 100px', background: theme.bg }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, color: theme.textMuted, textDecoration: 'none', fontWeight: 600, marginBottom: 24 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                Back
            </Link>
            <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.03em', marginBottom: isMobile ? 24 : 40 }}>Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
                <div>
                    {/* Delivery */}
                    <div style={sectionStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 14, background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📍</div>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>Delivery Address</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 120px', gap: 14, marginBottom: 14 }}>
                            <div><label style={labelStyle}>Street Address</label><input style={inputStyle} value={form.address} onChange={e => updateField('address', e.target.value)} placeholder="123 Queen St E" /></div>
                            <div><label style={labelStyle}>Apt / Suite</label><input style={inputStyle} value={form.apt} onChange={e => updateField('apt', e.target.value)} placeholder="4B" /></div>
                        </div>
                        <div><label style={labelStyle}>Instructions</label><input style={inputStyle} value={form.instructions} onChange={e => updateField('instructions', e.target.value)} placeholder="Ring doorbell, leave at door..." /></div>
                    </div>
                    {/* Contact */}
                    <div style={sectionStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 14, background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>Contact Info</h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14, marginBottom: 14 }}>
                            <div><label style={labelStyle}>Full Name</label><input style={inputStyle} value={form.name} onChange={e => updateField('name', e.target.value)} placeholder="Cody Mount" /></div>
                            <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={e => updateField('phone', e.target.value)} placeholder="(705) 555-0123" /></div>
                        </div>
                        <div><label style={labelStyle}>Email</label><input style={inputStyle} value={form.email} onChange={e => updateField('email', e.target.value)} placeholder="cody@antigravitysolutions.ca" /></div>
                    </div>
                    {/* Payment */}
                    <div style={sectionStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 14, background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>💳</div>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>Payment</h2>
                        </div>
                        <div style={{ marginBottom: 14 }}><label style={labelStyle}>Card Number</label><input style={inputStyle} value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} placeholder="4242 4242 4242 4242" /></div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            <div><label style={labelStyle}>Expiry</label><input style={inputStyle} value={form.expiry} onChange={e => updateField('expiry', e.target.value)} placeholder="MM / YY" /></div>
                            <div><label style={labelStyle}>CVC</label><input style={inputStyle} value={form.cvc} onChange={e => updateField('cvc', e.target.value)} placeholder="123" /></div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div style={{ position: isMobile ? 'relative' : 'sticky', top: 120 }}>
                    <div style={{ ...sectionStyle, background: theme.bgAlt }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                            <span style={{ fontSize: 28 }}>{restaurantLogo}</span>
                            <div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0 }}>Order Summary</h3>
                                <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>from {restaurantName}</p>
                            </div>
                        </div>
                        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 14, marginBottom: 16 }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}>
                                    <span style={{ color: theme.textSecondary }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, borderRadius: 7, background: theme.border, fontSize: 11, fontWeight: 700, marginRight: 10, color: theme.text }}>{item.quantity}</span>
                                        {item.name}
                                    </span>
                                    <span style={{ fontWeight: 600, color: theme.text }}>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        {/* Tip */}
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ ...labelStyle, marginBottom: 10 }}>Tip your driver</label>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {[15, 18, 20, 25].map(pct => (
                                    <button key={pct} onClick={() => { setTipPercent(pct); setCustomTip(''); }} style={{
                                        flex: 1, padding: '9px 0', borderRadius: 10, border: 'none',
                                        cursor: 'pointer', fontSize: 13, fontWeight: 700,
                                        background: !customTip && tipPercent === pct ? theme.dark : theme.bgCard,
                                        color: !customTip && tipPercent === pct ? theme.darkText : theme.textMuted,
                                        transition: 'all 0.2s',
                                    }}>{pct}%</button>
                                ))}
                                <input placeholder="$" value={customTip} onChange={e => setCustomTip(e.target.value)} style={{
                                    flex: 1, padding: '9px', borderRadius: 10,
                                    border: `1px solid ${customTip ? theme.dark : theme.border}`,
                                    textAlign: 'center', fontSize: 13, fontWeight: 600,
                                    outline: 'none', background: theme.bgCard, color: theme.text,
                                }} />
                            </div>
                        </div>
                        {/* Totals */}
                        <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {[['Subtotal', subtotal], ['Delivery', deliveryFee], ['Tax (HST)', tax], ['Tip', tipAmount]].map(([label, val]) => (
                                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: theme.textMuted }}>
                                    <span>{label}</span><span>${val.toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, color: theme.text, fontFamily: "'DM Sans', sans-serif", paddingTop: 12, borderTop: `1px solid ${theme.border}`, marginTop: 4 }}>
                                <span>Total</span><span>${grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={handlePlaceOrder} style={{
                            width: '100%', padding: '17px 0', borderRadius: 16,
                            background: theme.dark, color: theme.darkText, border: 'none',
                            fontSize: 17, fontWeight: 700, cursor: 'pointer',
                            fontFamily: "'DM Sans', sans-serif", marginTop: 20,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                            transition: 'all 0.2s',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.01)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                        >Place Order · ${grandTotal.toFixed(2)}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
