"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const GIFT_AMOUNTS = [15, 25, 50, 75, 100, 150];
const DESIGN_THEMES = [
    { id: 'electric', label: 'Electric Blue', gradient: 'linear-gradient(135deg, #0066FF, #3b82f6, #60a5fa)', emoji: '⚡' },
    { id: 'soo', label: 'Soo Sunset', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444, #ec4899)', emoji: '🌅' },
    { id: 'northern', label: 'Northern Lights', gradient: 'linear-gradient(135deg, #10b981, #06b6d4, #8b5cf6)', emoji: '🌌' },
    { id: 'gold', label: 'Soobér Gold', gradient: 'linear-gradient(135deg, #eab308, #d97706, #92400e)', emoji: '✦' },
    { id: 'midnight', label: 'Midnight', gradient: 'linear-gradient(135deg, #1e1b4b, #312e81, #4338ca)', emoji: '🌙' },
    { id: 'fresh', label: 'Fresh Market', gradient: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)', emoji: '🍃' },
];

export default function GiftCardsPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState(50);
    const [customAmount, setCustomAmount] = useState('');
    const [selectedDesign, setSelectedDesign] = useState('electric');
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [senderName, setSenderName] = useState('');
    const [message, setMessage] = useState('');
    const [purchased, setPurchased] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const activeDesign = DESIGN_THEMES.find(d => d.id === selectedDesign);
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

    const handlePurchase = (e) => {
        e.preventDefault();
        setPurchased(true);
    };

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>

            {/* ═══ HERO ═══ */}
            <section style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', padding: isMobile ? '60px 16px 48px' : '80px 40px 64px' }}>
                <div style={{ position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)', width: 800, height: 800, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />
                <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 24 }}>
                        <span style={{ fontSize: 16 }}>🎁</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: '#eab308', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Gift Cards</span>
                    </div>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 52, letterSpacing: '-0.04em', lineHeight: 1.05, color: theme.text, margin: '0 0 16px' }}>
                        Give the Gift of{' '}
                        <span style={{ background: 'linear-gradient(135deg, #eab308, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Local</span>
                    </h1>
                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 520, margin: '0 auto' }}>
                        Soobér gift cards work across delivery, rides, and Soo MRKT. Support local every time they&apos;re used.
                    </p>
                </div>
            </section>

            {/* ═══ CARD BUILDER ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1000, margin: '0 auto' }}>
                {purchased ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px', background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', borderRadius: 28, border: `1px solid ${theme.borderSubtle}` }}>
                        <div style={{ fontSize: 72, marginBottom: 20 }}>🎉</div>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 28, color: theme.text, margin: '0 0 8px' }}>Gift Card Sent!</h2>
                        <p style={{ fontSize: 16, color: theme.textMuted, maxWidth: 400, margin: '0 auto 24px' }}>
                            A ${finalAmount.toFixed(2)} Soobér gift card has been sent to <strong>{recipientEmail || 'the recipient'}</strong>.
                        </p>
                        <button onClick={() => setPurchased(false)} style={{ padding: '14px 32px', borderRadius: 14, border: 'none', background: '#0066FF', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Send Another</button>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}>

                        {/* LEFT: Card Preview */}
                        <div>
                            <div style={{
                                background: activeDesign.gradient, borderRadius: 24,
                                padding: 32, minHeight: 220, position: 'relative',
                                overflow: 'hidden', boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
                            }}>
                                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                                <div style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>Soobér Gift Card</div>
                                    <div style={{ fontSize: 48, fontWeight: 800, color: '#fff', fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>${finalAmount || 0}</div>
                                    {recipientName && <div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>For {recipientName}</div>}
                                    <div style={{ position: 'absolute', bottom: 0, right: 0, fontSize: 32 }}>⚡</div>
                                </div>
                            </div>

                            {/* Design picker */}
                            <div style={{ marginTop: 16 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 8 }}>Card Design</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
                                    {DESIGN_THEMES.map(d => (
                                        <button key={d.id} onClick={() => setSelectedDesign(d.id)} title={d.label} style={{
                                            height: 36, borderRadius: 10, border: selectedDesign === d.id ? '2px solid #fff' : '2px solid transparent',
                                            background: d.gradient, cursor: 'pointer',
                                            boxShadow: selectedDesign === d.id ? '0 0 0 2px #0066FF' : 'none',
                                            transition: 'all 0.2s',
                                        }} />
                                    ))}
                                </div>
                            </div>

                            {/* Amount picker */}
                            <div style={{ marginTop: 16 }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 8 }}>Amount</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                                    {GIFT_AMOUNTS.map(a => (
                                        <button key={a} onClick={() => { setSelectedAmount(a); setCustomAmount(''); }} style={{
                                            padding: '12px 0', borderRadius: 12, border: `1.5px solid ${selectedAmount === a && !customAmount ? '#0066FF' : theme.border}`,
                                            background: selectedAmount === a && !customAmount ? (isDark ? 'rgba(0,102,255,0.12)' : 'rgba(0,102,255,0.06)') : 'transparent',
                                            color: selectedAmount === a && !customAmount ? '#0066FF' : theme.text,
                                            fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                            transition: 'all 0.2s',
                                        }}>${a}</button>
                                    ))}
                                </div>
                                <input type="number" placeholder="Custom amount ($5–$500)" value={customAmount}
                                    onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
                                    min={5} max={500}
                                    style={{
                                        width: '100%', marginTop: 8, padding: '12px 14px', borderRadius: 12,
                                        border: `1px solid ${theme.border}`, background: theme.bgInput,
                                        color: theme.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                                        outline: 'none', boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#eab308'}
                                    onBlur={e => e.target.style.borderColor = theme.border}
                                />
                            </div>
                        </div>

                        {/* RIGHT: Form */}
                        <form onSubmit={handlePurchase} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: theme.text, margin: 0 }}>Recipient Details</h3>
                            {[
                                { key: 'recipientName', label: "Recipient's Name", placeholder: 'Jane Smith', set: setRecipientName, val: recipientName },
                                { key: 'recipientEmail', label: "Recipient's Email", placeholder: 'jane@gmail.com', set: setRecipientEmail, val: recipientEmail, type: 'email', required: true },
                                { key: 'senderName', label: 'Your Name', placeholder: 'John Smith', set: setSenderName, val: senderName },
                            ].map(f => (
                                <div key={f.key}>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 4 }}>{f.label}</label>
                                    <input type={f.type || 'text'} required={f.required} value={f.val} onChange={e => f.set(e.target.value)}
                                        placeholder={f.placeholder}
                                        style={{
                                            width: '100%', padding: '12px 14px', borderRadius: 12,
                                            border: `1px solid ${theme.border}`, background: theme.bgInput,
                                            color: theme.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                                            outline: 'none', boxSizing: 'border-box',
                                        }}
                                        onFocus={e => e.target.style.borderColor = '#eab308'}
                                        onBlur={e => e.target.style.borderColor = theme.border}
                                    />
                                </div>
                            ))}
                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 4 }}>Personal Message (optional)</label>
                                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3}
                                    placeholder="Happy birthday! Enjoy some local eats on me 🎂"
                                    style={{
                                        width: '100%', padding: '12px 14px', borderRadius: 12,
                                        border: `1px solid ${theme.border}`, background: theme.bgInput,
                                        color: theme.text, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                                        outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#eab308'}
                                    onBlur={e => e.target.style.borderColor = theme.border}
                                />
                            </div>

                            <div style={{ width: '100%', height: 1, background: theme.borderSubtle, margin: '8px 0' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: 14, color: theme.textMuted }}>Card Total</span>
                                <span style={{ fontSize: 28, fontWeight: 800, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>${(finalAmount || 0).toFixed(2)}</span>
                            </div>

                            <button type="submit" style={{
                                padding: '16px 40px', borderRadius: 14, border: 'none',
                                background: 'linear-gradient(135deg, #eab308, #f59e0b)',
                                color: '#000', fontWeight: 800, fontSize: 16,
                                fontFamily: "'DM Sans', sans-serif",
                                cursor: 'pointer', boxShadow: '0 4px 20px rgba(234,179,8,0.35)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(234,179,8,0.5)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(234,179,8,0.35)'; }}
                            >Purchase Gift Card →</button>
                            <p style={{ fontSize: 11, color: theme.textFaint, textAlign: 'center', margin: 0 }}>
                                Delivered instantly via email. Valid for delivery, rides, and Soo MRKT. No expiry.
                            </p>
                        </form>
                    </div>
                )}
            </section>

            {/* ═══ FEATURES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 14 }}>
                    {[
                        { icon: '🍽️', title: 'Works Everywhere', desc: 'Delivery, rides, and marketplace — one card does it all' },
                        { icon: '⏳', title: 'Never Expires', desc: 'No expiry date, no fees, no minimums' },
                        { icon: '🌱', title: 'Supports Local', desc: 'Every dollar stays in the community' },
                    ].map((f, i) => (
                        <div key={i} style={{
                            textAlign: 'center', padding: 24,
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20,
                        }}>
                            <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>{f.icon}</span>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 4px' }}>{f.title}</h3>
                            <p style={{ fontSize: 13, color: theme.textMuted, margin: 0 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
