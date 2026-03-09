"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../lib/CartContext';
import { useLiveOrders } from '../../lib/LiveOrderContext';
import { useTheme } from '../../lib/ThemeContext';

// ── Saved Data (Simulated) ─────────────────────────────────────────────────
const SAVED_ADDRESSES = [
    { id: 1, label: 'Home', address: '123 Queen St E, Sault Ste. Marie, ON', isDefault: true, emoji: '🏠' },
    { id: 2, label: 'Office', address: '456 Northern Ave, Sault Ste. Marie, ON', isDefault: false, emoji: '🏢' },
];

const SAVED_CARDS = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true, color: '#1a1a2e' },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '06/27', isDefault: false, color: '#2d1b3d' },
];

const TIME_SLOTS = (() => {
    const slots = [{ label: 'ASAP', sublabel: '20-35 min', value: 'asap' }];
    const now = new Date();
    for (let i = 1; i <= 6; i++) {
        const start = new Date(now.getTime() + i * 30 * 60000);
        const end = new Date(start.getTime() + 30 * 60000);
        const fmt = d => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        slots.push({ label: `${fmt(start)} – ${fmt(end)}`, sublabel: 'Scheduled', value: `slot-${i}` });
    }
    return slots;
})();

// ── Confetti Particle ──────────────────────────────────────────────────────
function ConfettiCanvas({ active }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#eab308', '#0066FF', '#22c55e', '#f43f5e', '#a855f7', '#60a5fa', '#fb923c'];
        particlesRef.current = Array.from({ length: 150 }, () => ({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 200,
            w: 6 + Math.random() * 6,
            h: 4 + Math.random() * 4,
            vx: (Math.random() - 0.5) * 6,
            vy: 2 + Math.random() * 4,
            rot: Math.random() * 360,
            rotV: (Math.random() - 0.5) * 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: 1,
        }));

        let raf;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;
            particlesRef.current.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1;
                p.rot += p.rotV;
                p.opacity -= 0.003;
                if (p.opacity <= 0) return;
                alive = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rot * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            if (alive) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [active]);

    if (!active) return null;
    return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }} />;
}

// ── Step Indicator ─────────────────────────────────────────────────────────
function StepIndicator({ current, theme, isMobile }) {
    const steps = [
        { num: 1, label: 'Delivery' },
        { num: 2, label: 'Payment' },
        { num: 3, label: 'Review' },
    ];
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: isMobile ? 28 : 40 }}>
            {steps.map((s, i) => (
                <div key={s.num} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    }}>
                        <div style={{
                            width: isMobile ? 36 : 44, height: isMobile ? 36 : 44,
                            borderRadius: '50%',
                            background: current >= s.num
                                ? 'linear-gradient(135deg, #0066FF, #3b82f6)'
                                : theme.bgInput,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: current > s.num ? 18 : (isMobile ? 14 : 16),
                            fontWeight: 800, fontFamily: "'DM Sans', sans-serif",
                            color: current >= s.num ? '#fff' : theme.textFaint,
                            transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                            boxShadow: current === s.num ? '0 0 24px rgba(0,102,255,0.4)' : 'none',
                        }}>
                            {current > s.num ? '✓' : s.num}
                        </div>
                        <span style={{
                            fontSize: 11, fontWeight: 700, letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: current >= s.num ? '#0066FF' : theme.textFaint,
                            transition: 'color 0.3s',
                            fontFamily: "'DM Sans', sans-serif",
                        }}>{s.label}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <div style={{
                            width: isMobile ? 40 : 80, height: 2, borderRadius: 1,
                            background: current > s.num
                                ? 'linear-gradient(90deg, #0066FF, #3b82f6)'
                                : theme.border,
                            margin: '0 8px', marginBottom: 22,
                            transition: 'background 0.4s',
                        }} />
                    )}
                </div>
            ))}
        </div>
    );
}

// ── Main Checkout ──────────────────────────────────────────────────────────
export default function CheckoutPage() {
    const router = useRouter();
    const { items, restaurantName, restaurantLogo, subtotal, deliveryFee, tax, total, itemCount, clearCart, restaurantId } = useCart();
    const { placeOrder } = useLiveOrders();
    const { theme, isDark } = useTheme();

    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1); // 1=forward, -1=back
    const [animating, setAnimating] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Step 1 state
    const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0]?.id);
    const [showNewAddress, setShowNewAddress] = useState(false);
    const [newAddress, setNewAddress] = useState({ street: '', apt: '', instructions: '' });
    const [deliveryTime, setDeliveryTime] = useState('asap');

    // Step 2 state
    const [selectedCard, setSelectedCard] = useState(SAVED_CARDS[0]?.id);
    const [paymentMethod, setPaymentMethod] = useState('card'); // card | apple | google
    const [showNewCard, setShowNewCard] = useState(false);
    const [newCard, setNewCard] = useState({ number: '', expiry: '', cvc: '', name: '' });

    // Step 3 state
    const [tipPercent, setTipPercent] = useState(18);
    const [customTip, setCustomTip] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    // Post-order
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const tipAmount = customTip ? parseFloat(customTip) || 0 : subtotal * (tipPercent / 100);
    const grandTotal = total + tipAmount;

    const goToStep = useCallback((target) => {
        if (animating) return;
        setDirection(target > step ? 1 : -1);
        setAnimating(true);
        setTimeout(() => {
            setStep(target);
            setTimeout(() => setAnimating(false), 50);
        }, 250);
    }, [step, animating]);

    const handlePlaceOrder = () => {
        setShowConfetti(true);
        const orderId = placeOrder({
            restaurantId: restaurantId || 'unknown',
            restaurantName,
            restaurantLogo,
            items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
            subtotal, deliveryFee, tax,
            total: grandTotal,
            customer: {
                address: SAVED_ADDRESSES.find(a => a.id === selectedAddress)?.address || newAddress.street,
                paymentMethod,
            }
        });
        setOrderPlaced(true);
        setTimeout(() => {
            clearCart();
            router.push(`/orders/live/${orderId}`);
        }, 3500);
    };

    // ── Shared styles ──────────────────────────────────────────────────────
    const sectionStyle = {
        background: theme.bgCard, borderRadius: 24,
        border: `1px solid ${theme.borderLight}`,
        padding: isMobile ? 20 : 32, marginBottom: 20,
        boxShadow: theme.shadow,
    };
    const inputStyle = {
        width: '100%', padding: '14px 18px', borderRadius: 14,
        border: `1.5px solid ${theme.border}`, fontSize: 15, fontWeight: 500,
        color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
        background: theme.bgInput, transition: 'all 0.2s', boxSizing: 'border-box',
    };
    const labelStyle = {
        fontSize: 13, fontWeight: 600, color: theme.textSecondary,
        marginBottom: 6, display: 'block', fontFamily: "'DM Sans', sans-serif",
    };

    // ── Order Placed Success ───────────────────────────────────────────────
    if (orderPlaced) {
        return (
            <>
                <ConfettiCanvas active={showConfetti} />
                <div style={{
                    minHeight: '80vh', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexDirection: 'column',
                    padding: 40, textAlign: 'center', background: theme.bg,
                }}>
                    <div style={{
                        width: 110, height: 110, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 48, marginBottom: 28, color: '#fff',
                        boxShadow: '0 20px 60px rgba(34,197,94,0.35)',
                        animation: 'checkBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    }}>✓</div>
                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                        fontWeight: 800, color: theme.text, marginBottom: 12,
                        letterSpacing: '-0.03em',
                    }}>Order Confirmed!</h1>
                    <p style={{ fontSize: 16, color: theme.textMuted, maxWidth: 420, lineHeight: 1.6 }}>
                        Your order from <strong style={{ color: theme.text }}>{restaurantName}</strong> is being prepared.
                        You&apos;ll be redirected to live tracking momentarily.
                    </p>
                    <div style={{
                        marginTop: 28, padding: '14px 28px', borderRadius: 16,
                        background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.2)',
                        display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                        <span style={{ fontSize: 20 }}>⚡</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#0066FF' }}>
                            Electric delivery en route
                        </span>
                    </div>
                    <style>{`
                        @keyframes checkBounce {
                            0% { transform: scale(0) rotate(-45deg); opacity: 0; }
                            60% { transform: scale(1.15) rotate(0deg); opacity: 1; }
                            100% { transform: scale(1) rotate(0deg); }
                        }
                    `}</style>
                </div>
            </>
        );
    }

    // ── Empty Cart ─────────────────────────────────────────────────────────
    if (items.length === 0) {
        return (
            <div style={{
                minHeight: '80vh', display: 'flex', alignItems: 'center',
                justifyContent: 'center', flexDirection: 'column',
                padding: 40, textAlign: 'center', background: theme.bg,
            }}>
                <div style={{
                    width: 100, height: 100, borderRadius: 28,
                    background: theme.bgInput, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 48, marginBottom: 24,
                }}>🛒</div>
                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 28,
                    fontWeight: 700, color: theme.text, marginBottom: 12,
                }}>Nothing to check out</h1>
                <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 28 }}>
                    Add items from a restaurant to get started
                </p>
                <Link href="/" style={{
                    background: theme.dark, color: theme.darkText,
                    padding: '16px 36px', borderRadius: 16,
                    fontSize: 15, fontWeight: 700, textDecoration: 'none',
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}>Browse Restaurants</Link>
            </div>
        );
    }

    // ── Step slide style ───────────────────────────────────────────────────
    const stepContainerStyle = {
        transition: animating ? 'transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease' : 'none',
        transform: animating ? `translateX(${direction * -60}px)` : 'translateX(0)',
        opacity: animating ? 0 : 1,
    };

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: isMobile ? '24px 16px 120px' : '40px 40px 120px', background: theme.bg }}>
            {/* Back link */}
            <Link href="/" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 14, color: theme.textMuted, textDecoration: 'none',
                fontWeight: 600, marginBottom: 24,
            }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </Link>

            <h1 style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                fontWeight: 800, color: theme.text, letterSpacing: '-0.03em',
                marginBottom: 8, textAlign: 'center',
            }}>Checkout</h1>
            <p style={{
                fontSize: 14, color: theme.textFaint, textAlign: 'center',
                marginBottom: isMobile ? 20 : 8,
                fontFamily: "'DM Sans', sans-serif",
            }}>
                🔒 SSL Secured · ⚡ 100% Electric Delivery
            </p>

            <StepIndicator current={step} theme={theme} isMobile={isMobile} />

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gap: isMobile ? 20 : 40, alignItems: 'start' }}>
                {/* ─── Left Column: Steps ─────────────────────────────────── */}
                <div style={stepContainerStyle}>
                    {/* ═══ STEP 1: DELIVERY ═══ */}
                    {step === 1 && (
                        <div>
                            {/* Saved Addresses */}
                            <div style={sectionStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 14,
                                        background: 'rgba(0,102,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                                    }}>📍</div>
                                    <h2 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                        fontWeight: 700, color: theme.text, margin: 0,
                                    }}>Delivery Address</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {SAVED_ADDRESSES.map(addr => (
                                        <button key={addr.id} onClick={() => { setSelectedAddress(addr.id); setShowNewAddress(false); }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 14,
                                                padding: '16px 18px', borderRadius: 16,
                                                border: selectedAddress === addr.id && !showNewAddress
                                                    ? '2px solid #0066FF'
                                                    : `1.5px solid ${theme.border}`,
                                                background: selectedAddress === addr.id && !showNewAddress
                                                    ? (isDark ? 'rgba(0,102,255,0.08)' : 'rgba(0,102,255,0.04)')
                                                    : 'transparent',
                                                cursor: 'pointer', textAlign: 'left',
                                                transition: 'all 0.2s',
                                            }}>
                                            <span style={{ fontSize: 24 }}>{addr.emoji}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>{addr.label}</span>
                                                    {addr.isDefault && (
                                                        <span style={{
                                                            fontSize: 10, fontWeight: 700, color: '#0066FF',
                                                            background: 'rgba(0,102,255,0.1)', padding: '2px 8px',
                                                            borderRadius: 6, textTransform: 'uppercase',
                                                        }}>Default</span>
                                                    )}
                                                </div>
                                                <span style={{ fontSize: 13, color: theme.textMuted }}>{addr.address}</span>
                                            </div>
                                            <div style={{
                                                width: 22, height: 22, borderRadius: '50%',
                                                border: `2px solid ${selectedAddress === addr.id && !showNewAddress ? '#0066FF' : theme.border}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                {selectedAddress === addr.id && !showNewAddress && (
                                                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#0066FF' }} />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                    <button onClick={() => setShowNewAddress(!showNewAddress)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            padding: '14px 18px', borderRadius: 16,
                                            border: `1.5px dashed ${theme.border}`,
                                            background: 'transparent', cursor: 'pointer',
                                            color: theme.textMuted, fontSize: 14, fontWeight: 600,
                                            fontFamily: "'DM Sans', sans-serif",
                                            transition: 'all 0.2s',
                                        }}>
                                        <span style={{ fontSize: 18 }}>＋</span> Add new address
                                    </button>
                                </div>
                                {showNewAddress && (
                                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 120px', gap: 12 }}>
                                            <div><label style={labelStyle}>Street Address</label><input style={inputStyle} value={newAddress.street} onChange={e => setNewAddress(p => ({ ...p, street: e.target.value }))} placeholder="123 Queen St E" /></div>
                                            <div><label style={labelStyle}>Apt / Suite</label><input style={inputStyle} value={newAddress.apt} onChange={e => setNewAddress(p => ({ ...p, apt: e.target.value }))} placeholder="4B" /></div>
                                        </div>
                                        <div><label style={labelStyle}>Delivery Instructions</label><input style={inputStyle} value={newAddress.instructions} onChange={e => setNewAddress(p => ({ ...p, instructions: e.target.value }))} placeholder="Ring doorbell, leave at door..." /></div>
                                    </div>
                                )}
                            </div>

                            {/* Delivery Time */}
                            <div style={sectionStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 14,
                                        background: 'rgba(34,197,94,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                                    }}>🕐</div>
                                    <h2 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                        fontWeight: 700, color: theme.text, margin: 0,
                                    }}>Delivery Time</h2>
                                </div>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                                    gap: 8,
                                }}>
                                    {TIME_SLOTS.map(slot => (
                                        <button key={slot.value}
                                            onClick={() => setDeliveryTime(slot.value)}
                                            style={{
                                                padding: '14px 12px', borderRadius: 14, cursor: 'pointer',
                                                border: deliveryTime === slot.value
                                                    ? '2px solid #22c55e'
                                                    : `1.5px solid ${theme.border}`,
                                                background: deliveryTime === slot.value
                                                    ? (isDark ? 'rgba(34,197,94,0.08)' : 'rgba(34,197,94,0.04)')
                                                    : 'transparent',
                                                textAlign: 'center', transition: 'all 0.2s',
                                            }}>
                                            <div style={{
                                                fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                                                fontWeight: 700, color: theme.text, marginBottom: 2,
                                            }}>{slot.label}</div>
                                            <div style={{
                                                fontSize: 11, color: deliveryTime === slot.value ? '#22c55e' : theme.textFaint,
                                                fontWeight: 600,
                                            }}>{slot.sublabel}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Continue Button */}
                            <button onClick={() => goToStep(2)} style={{
                                width: '100%', padding: '18px 0', borderRadius: 16,
                                background: 'linear-gradient(135deg, #0066FF, #3b82f6)',
                                color: '#fff', border: 'none', fontSize: 17, fontWeight: 700,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                boxShadow: '0 8px 32px rgba(0,102,255,0.3)',
                                transition: 'all 0.2s',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,102,255,0.4)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,102,255,0.3)'; }}
                            >Continue to Payment <span style={{ fontSize: 18 }}>→</span></button>
                        </div>
                    )}

                    {/* ═══ STEP 2: PAYMENT ═══ */}
                    {step === 2 && (
                        <div>
                            {/* Digital Wallets */}
                            <div style={sectionStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 14,
                                        background: 'rgba(168,85,247,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                                    }}>⚡</div>
                                    <h2 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                        fontWeight: 700, color: theme.text, margin: 0,
                                    }}>Express Pay</h2>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                    {/* Apple Pay */}
                                    <button onClick={() => setPaymentMethod('apple')}
                                        style={{
                                            padding: '18px 16px', borderRadius: 16, cursor: 'pointer',
                                            border: paymentMethod === 'apple' ? '2px solid #09090b' : `1.5px solid ${theme.border}`,
                                            background: paymentMethod === 'apple' ? '#09090b' : theme.bgCard,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                            transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                                        }}>
                                        <span style={{
                                            fontSize: 22, filter: paymentMethod === 'apple' ? 'invert(1)' : (isDark ? 'invert(1)' : 'none'),
                                        }}></span>
                                        <span style={{
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                                            fontWeight: 700, color: paymentMethod === 'apple' ? '#fff' : theme.text,
                                        }}>Pay</span>
                                        {paymentMethod === 'apple' && (
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                                                animation: 'shimmer 2s infinite',
                                            }} />
                                        )}
                                    </button>
                                    {/* Google Pay */}
                                    <button onClick={() => setPaymentMethod('google')}
                                        style={{
                                            padding: '18px 16px', borderRadius: 16, cursor: 'pointer',
                                            border: paymentMethod === 'google' ? '2px solid #4285F4' : `1.5px solid ${theme.border}`,
                                            background: paymentMethod === 'google' ? (isDark ? 'rgba(66,133,244,0.12)' : 'rgba(66,133,244,0.06)') : theme.bgCard,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                            transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                                        }}>
                                        <span style={{ fontSize: 18, fontWeight: 800, color: '#4285F4' }}>G</span>
                                        <span style={{
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 16,
                                            fontWeight: 700, color: theme.text,
                                        }}>Pay</span>
                                        {paymentMethod === 'google' && (
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                background: 'linear-gradient(90deg, transparent, rgba(66,133,244,0.1), transparent)',
                                                animation: 'shimmer 2s infinite',
                                            }} />
                                        )}
                                    </button>
                                </div>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 14,
                                    margin: '18px 0 4px', color: theme.textFaint,
                                }}>
                                    <div style={{ flex: 1, height: 1, background: theme.border }} />
                                    <span style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>or pay with card</span>
                                    <div style={{ flex: 1, height: 1, background: theme.border }} />
                                </div>
                            </div>

                            {/* Saved Cards */}
                            <div style={sectionStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 14,
                                        background: 'rgba(234,179,8,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                                    }}>💳</div>
                                    <h2 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                        fontWeight: 700, color: theme.text, margin: 0,
                                    }}>Saved Cards</h2>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {SAVED_CARDS.map(card => (
                                        <button key={card.id}
                                            onClick={() => { setSelectedCard(card.id); setPaymentMethod('card'); setShowNewCard(false); }}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 16,
                                                padding: '16px 18px', borderRadius: 16,
                                                border: selectedCard === card.id && paymentMethod === 'card' && !showNewCard
                                                    ? '2px solid #eab308'
                                                    : `1.5px solid ${theme.border}`,
                                                background: selectedCard === card.id && paymentMethod === 'card' && !showNewCard
                                                    ? (isDark ? 'rgba(234,179,8,0.06)' : 'rgba(234,179,8,0.03)')
                                                    : 'transparent',
                                                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                                            }}>
                                            {/* Mini card visual */}
                                            <div style={{
                                                width: 60, height: 40, borderRadius: 10,
                                                background: `linear-gradient(135deg, ${card.color}, ${card.color}cc)`,
                                                display: 'flex', alignItems: 'flex-end',
                                                justifyContent: 'space-between', padding: '6px 8px',
                                                position: 'relative', overflow: 'hidden',
                                                flexShrink: 0,
                                            }}>
                                                {/* Chip */}
                                                <div style={{
                                                    width: 12, height: 10, borderRadius: 2,
                                                    background: 'linear-gradient(135deg, #d4a843, #c4993d)',
                                                    position: 'absolute', top: 8, left: 8,
                                                }} />
                                                <span style={{
                                                    fontSize: 8, color: 'rgba(255,255,255,0.7)',
                                                    fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                                                }}>····{card.last4}</span>
                                                <span style={{
                                                    fontSize: 7, color: 'rgba(255,255,255,0.5)',
                                                    fontWeight: 800, fontFamily: "'DM Sans', sans-serif",
                                                }}>{card.type === 'Visa' ? 'VISA' : 'MC'}</span>
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <span style={{
                                                        fontFamily: "'DM Sans', sans-serif",
                                                        fontSize: 15, fontWeight: 700, color: theme.text,
                                                    }}>{card.type} ····{card.last4}</span>
                                                    {card.isDefault && (
                                                        <span style={{
                                                            fontSize: 10, fontWeight: 700, color: '#eab308',
                                                            background: 'rgba(234,179,8,0.1)', padding: '2px 8px',
                                                            borderRadius: 6, textTransform: 'uppercase',
                                                        }}>Default</span>
                                                    )}
                                                </div>
                                                <span style={{ fontSize: 12, color: theme.textFaint }}>Expires {card.expiry}</span>
                                            </div>
                                            <div style={{
                                                width: 22, height: 22, borderRadius: '50%',
                                                border: `2px solid ${selectedCard === card.id && paymentMethod === 'card' && !showNewCard ? '#eab308' : theme.border}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                {selectedCard === card.id && paymentMethod === 'card' && !showNewCard && (
                                                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                    <button onClick={() => setShowNewCard(!showNewCard)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 10,
                                            padding: '14px 18px', borderRadius: 16,
                                            border: `1.5px dashed ${theme.border}`,
                                            background: 'transparent', cursor: 'pointer',
                                            color: theme.textMuted, fontSize: 14, fontWeight: 600,
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}>
                                        <span style={{ fontSize: 18 }}>＋</span> Add new card
                                    </button>
                                </div>
                                {showNewCard && (
                                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        <div><label style={labelStyle}>Cardholder Name</label><input style={inputStyle} value={newCard.name} onChange={e => setNewCard(p => ({ ...p, name: e.target.value }))} placeholder="Cody Mount" /></div>
                                        <div><label style={labelStyle}>Card Number</label><input style={inputStyle} value={newCard.number} onChange={e => setNewCard(p => ({ ...p, number: e.target.value }))} placeholder="4242 4242 4242 4242" /></div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                            <div><label style={labelStyle}>Expiry</label><input style={inputStyle} value={newCard.expiry} onChange={e => setNewCard(p => ({ ...p, expiry: e.target.value }))} placeholder="MM / YY" /></div>
                                            <div><label style={labelStyle}>CVC</label><input style={inputStyle} value={newCard.cvc} onChange={e => setNewCard(p => ({ ...p, cvc: e.target.value }))} placeholder="123" /></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Nav Buttons */}
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={() => goToStep(1)} style={{
                                    flex: '0 0 auto', padding: '18px 28px', borderRadius: 16,
                                    border: `1.5px solid ${theme.border}`, background: 'transparent',
                                    color: theme.textSecondary, fontSize: 15, fontWeight: 700,
                                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                }}>← Back</button>
                                <button onClick={() => goToStep(3)} style={{
                                    flex: 1, padding: '18px 0', borderRadius: 16,
                                    background: 'linear-gradient(135deg, #0066FF, #3b82f6)',
                                    color: '#fff', border: 'none', fontSize: 17, fontWeight: 700,
                                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                    boxShadow: '0 8px 32px rgba(0,102,255,0.3)',
                                    transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                >Review Order <span style={{ fontSize: 18 }}>→</span></button>
                            </div>
                        </div>
                    )}

                    {/* ═══ STEP 3: REVIEW & CONFIRM ═══ */}
                    {step === 3 && (
                        <div>
                            {/* Delivery Summary */}
                            <div style={sectionStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 22 }}>📍</span>
                                        <div>
                                            <div style={{ fontSize: 13, color: theme.textFaint, fontWeight: 600 }}>Delivering to</div>
                                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>
                                                {showNewAddress ? (newAddress.street || 'New address') : (SAVED_ADDRESSES.find(a => a.id === selectedAddress)?.address || '')}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => goToStep(1)} style={{
                                        fontSize: 13, fontWeight: 700, color: '#0066FF',
                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                    }}>Change</button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 22 }}>🕐</span>
                                        <div>
                                            <div style={{ fontSize: 13, color: theme.textFaint, fontWeight: 600 }}>Delivery time</div>
                                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>
                                                {TIME_SLOTS.find(s => s.value === deliveryTime)?.label || 'ASAP'}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => goToStep(1)} style={{
                                        fontSize: 13, fontWeight: 700, color: '#0066FF',
                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                    }}>Change</button>
                                </div>
                            </div>

                            {/* Payment Summary */}
                            <div style={sectionStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ fontSize: 22 }}>{paymentMethod === 'apple' ? '' : paymentMethod === 'google' ? '🔵' : '💳'}</span>
                                        <div>
                                            <div style={{ fontSize: 13, color: theme.textFaint, fontWeight: 600 }}>Paying with</div>
                                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>
                                                {paymentMethod === 'apple' ? 'Apple Pay' :
                                                    paymentMethod === 'google' ? 'Google Pay' :
                                                        `${SAVED_CARDS.find(c => c.id === selectedCard)?.type || 'Card'} ····${SAVED_CARDS.find(c => c.id === selectedCard)?.last4 || ''}`}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => goToStep(2)} style={{
                                        fontSize: 13, fontWeight: 700, color: '#0066FF',
                                        background: 'transparent', border: 'none', cursor: 'pointer',
                                    }}>Change</button>
                                </div>
                            </div>

                            {/* Tip */}
                            <div style={sectionStyle}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 14,
                                        background: 'rgba(34,197,94,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                                    }}>💚</div>
                                    <h2 style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                        fontWeight: 700, color: theme.text, margin: 0,
                                    }}>Tip your driver</h2>
                                </div>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {[15, 18, 20, 25].map(pct => (
                                        <button key={pct} onClick={() => { setTipPercent(pct); setCustomTip(''); }} style={{
                                            flex: 1, padding: '12px 0', borderRadius: 12, border: 'none',
                                            cursor: 'pointer', fontSize: 14, fontWeight: 700,
                                            fontFamily: "'DM Sans', sans-serif",
                                            background: !customTip && tipPercent === pct
                                                ? 'linear-gradient(135deg, #22c55e, #16a34a)' : theme.bgInput,
                                            color: !customTip && tipPercent === pct ? '#fff' : theme.textMuted,
                                            transition: 'all 0.2s',
                                            boxShadow: !customTip && tipPercent === pct ? '0 4px 16px rgba(34,197,94,0.25)' : 'none',
                                        }}>{pct}%</button>
                                    ))}
                                    <input placeholder="$" value={customTip} onChange={e => setCustomTip(e.target.value)}
                                        style={{
                                            flex: 1, padding: '12px', borderRadius: 12,
                                            border: `1.5px solid ${customTip ? '#22c55e' : theme.border}`,
                                            textAlign: 'center', fontSize: 14, fontWeight: 700,
                                            outline: 'none', background: theme.bgInput, color: theme.text,
                                            fontFamily: "'DM Sans', sans-serif",
                                        }} />
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div style={{ ...sectionStyle, display: 'flex', gap: 8, alignItems: 'center' }}>
                                <span style={{ fontSize: 20 }}>🏷️</span>
                                <input placeholder="Promo code" value={promoCode}
                                    onChange={e => setPromoCode(e.target.value)}
                                    style={{
                                        flex: 1, padding: '14px 16px', borderRadius: 14,
                                        border: `1.5px solid ${promoApplied ? '#22c55e' : theme.border}`,
                                        fontSize: 14, fontWeight: 500, color: theme.text,
                                        outline: 'none', background: theme.bgInput,
                                        fontFamily: "'Inter', sans-serif",
                                    }} />
                                <button onClick={() => { if (promoCode.trim()) setPromoApplied(true); }}
                                    style={{
                                        padding: '14px 22px', borderRadius: 14, border: 'none',
                                        background: promoApplied ? '#22c55e' : theme.bgInput,
                                        color: promoApplied ? '#fff' : theme.textSecondary,
                                        fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                        fontFamily: "'DM Sans', sans-serif",
                                        transition: 'all 0.2s',
                                    }}>{promoApplied ? 'Applied ✓' : 'Apply'}</button>
                            </div>

                            {/* Nav Buttons */}
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button onClick={() => goToStep(2)} style={{
                                    flex: '0 0 auto', padding: '18px 28px', borderRadius: 16,
                                    border: `1.5px solid ${theme.border}`, background: 'transparent',
                                    color: theme.textSecondary, fontSize: 15, fontWeight: 700,
                                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                }}>← Back</button>
                                <button onClick={handlePlaceOrder} style={{
                                    flex: 1, padding: '18px 0', borderRadius: 16,
                                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                                    color: '#fff', border: 'none', fontSize: 17, fontWeight: 700,
                                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                    boxShadow: '0 8px 32px rgba(34,197,94,0.3)',
                                    transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(34,197,94,0.4)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(34,197,94,0.3)'; }}
                                >Place Order · ${grandTotal.toFixed(2)}</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ─── Right Column: Order Summary (Sticky) ────────────────── */}
                <div style={{ position: isMobile ? 'relative' : 'sticky', top: 120 }}>
                    <div style={{
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(24,24,27,0.9), rgba(24,24,27,0.7))'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(250,250,250,0.7))',
                        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: 28, border: `1px solid ${theme.borderSubtle}`,
                        padding: isMobile ? 20 : 28, boxShadow: theme.shadowLg,
                    }}>
                        {/* Restaurant */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: 18,
                                background: theme.bgInput, display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: 28,
                            }}>{restaurantLogo}</div>
                            <div>
                                <h3 style={{
                                    fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                    fontWeight: 700, color: theme.text, margin: 0,
                                }}>Order Summary</h3>
                                <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>
                                    from {restaurantName} · {itemCount} item{itemCount !== 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>

                        {/* Items */}
                        <div style={{
                            borderTop: `1px solid ${theme.borderSubtle}`,
                            borderBottom: `1px solid ${theme.borderSubtle}`,
                            padding: '14px 0', marginBottom: 16,
                            maxHeight: 200, overflowY: 'auto',
                        }}>
                            {items.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    padding: '8px 0', fontSize: 14,
                                }}>
                                    <span style={{ color: theme.textSecondary, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{
                                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                            width: 24, height: 24, borderRadius: 8,
                                            background: 'rgba(0,102,255,0.1)', fontSize: 11,
                                            fontWeight: 800, color: '#0066FF',
                                        }}>{item.quantity}</span>
                                        {item.name}
                                    </span>
                                    <span style={{
                                        fontWeight: 700, color: theme.text,
                                        fontFamily: "'DM Sans', sans-serif",
                                    }}>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[
                                ['Subtotal', subtotal],
                                ['Delivery', deliveryFee],
                                ['13% HST', tax],
                                ...(step === 3 ? [['Tip', tipAmount]] : []),
                            ].map(([label, val]) => (
                                <div key={label} style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    fontSize: 14, color: theme.textMuted,
                                }}>
                                    <span>{label}</span>
                                    <span style={{ fontWeight: 600 }}>${val.toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{
                                display: 'flex', justifyContent: 'space-between',
                                fontSize: 22, fontWeight: 800, color: theme.text,
                                fontFamily: "'DM Sans', sans-serif",
                                paddingTop: 14, borderTop: `1px solid ${theme.borderSubtle}`,
                                marginTop: 4,
                            }}>
                                <span>Total</span>
                                <span>${(step === 3 ? grandTotal : total).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* EV Badge */}
                        <div style={{
                            marginTop: 20, padding: '14px 16px', borderRadius: 16,
                            background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.15)',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <span style={{ fontSize: 22 }}>⚡</span>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#0066FF' }}>100% Electric Delivery</div>
                                <div style={{ fontSize: 12, color: theme.textMuted }}>Zero-emission EV fleet</div>
                            </div>
                        </div>

                        {/* Estimated Delivery */}
                        <div style={{
                            marginTop: 10, padding: '12px 16px', borderRadius: 16,
                            background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)',
                            display: 'flex', alignItems: 'center', gap: 12,
                        }}>
                            <span style={{ fontSize: 22 }}>🕐</span>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e' }}>
                                    Est. {deliveryTime === 'asap' ? '20–35 min' : TIME_SLOTS.find(s => s.value === deliveryTime)?.label}
                                </div>
                                <div style={{ fontSize: 12, color: theme.textMuted }}>
                                    {deliveryTime === 'asap' ? 'Preparing immediately' : 'Scheduled delivery'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
}
