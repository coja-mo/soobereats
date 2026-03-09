"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

export default function CorporatePortal() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [formState, setFormState] = useState({ name: '', business: '', type: 'restaurant', email: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);

    // Calculator state
    const [ordersPerMonth, setOrdersPerMonth] = useState(1000);
    const avgOrderValue = 35;
    const nationalFee = ordersPerMonth * avgOrderValue * 0.30;
    const sooberFee = ordersPerMonth * avgOrderValue * 0.15;
    const annualSavings = (nationalFee - sooberFee) * 12;

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
    const updateField = (field, value) => setFormState(prev => ({ ...prev, [field]: value }));

    const pad = isMobile ? '0 16px' : '0 40px';
    const cardStyle = {
        background: theme.bgCard, border: `1px solid ${theme.borderLight}`,
        borderRadius: 22, padding: isMobile ? 20 : 28, boxShadow: theme.shadow,
    };
    const inputStyle = {
        width: '100%', padding: '14px 18px', borderRadius: 14,
        border: `1.5px solid ${theme.border}`, fontSize: 15, fontWeight: 500,
        color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
        background: theme.bgInput, transition: 'all 0.2s', boxSizing: 'border-box',
        marginBottom: 16,
    };
    const labelStyle = { fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 6, display: 'block', fontFamily: "'DM Sans', sans-serif" };

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100 }}>

            {/* ─────────────────── HERO ─────────────────── */}
            <section style={{
                padding: isMobile ? '60px 0' : '100px 0',
                background: isDark ? '#09090b' : '#1c1917',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(circle, rgba(234,179,8,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-15%', right: '25%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,102,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#eab308', marginBottom: 24,
                    }}>🏢 Corporate Affairs · ⚡ Electric Delivery</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 36 : 58,
                        fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20,
                    }}>Partner with the<br />Soo&apos;s Local Platform</h1>

                    <p style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.65)', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.7 }}>
                        Zero corporate gatekeepers. Fair commission rates. White-glove onboarding. Direct access to the Sault Ste. Marie community.
                    </p>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 12, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399', fontSize: 13, fontWeight: 600, marginBottom: 32 }}>
                        ⚡ 100% Electric Fleet — emission-free delivery for your customers
                    </div>

                    <br />
                    <a href="#apply" style={{
                        display: 'inline-block', background: '#eab308', color: '#111',
                        padding: '16px 36px', borderRadius: 16, fontSize: 16, fontWeight: 700,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(234,179,8,0.3)', transition: 'all 0.2s',
                    }}>Apply to Sell</a>
                </div>
            </section>

            {/* ─────────────────── SAVINGS CALCULATOR ─────────────────── */}
            <section style={{ padding: isMobile ? '64px 0 0' : '100px 0 0' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 38, fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 16 }}>Calculate Your Savings</h2>
                        <p style={{ fontSize: 16, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>Silicon Valley apps take 30% of your revenue. See how much you keep by switching to Soobér&apos;s 15% flat rate.</p>
                    </div>

                    <div style={{ ...cardStyle, padding: isMobile ? 24 : 40 }}>
                        <div style={{ marginBottom: 32 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <label style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text }}>Monthly Delivery Orders</label>
                                <span style={{ fontWeight: 700, color: theme.accent }}>{ordersPerMonth.toLocaleString()}</span>
                            </div>
                            <input type="range" min="100" max="5000" step="50"
                                value={ordersPerMonth} onChange={e => setOrdersPerMonth(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: theme.accent, height: 6 }} />
                            <p style={{ fontSize: 13, color: theme.textMuted, marginTop: 12 }}>Assuming $35 average order value</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
                            <div style={{ background: theme.bgInput, padding: 24, borderRadius: 16, border: `1px solid ${theme.borderSubtle}` }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 8 }}>National Apps (30%)</p>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, opacity: 0.5 }}>${nationalFee.toLocaleString()} / mo</div>
                            </div>
                            <div style={{ background: theme.dark, padding: 24, borderRadius: 16 }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Soobér (15%)</p>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 700, color: theme.darkText }}>${sooberFee.toLocaleString()} / mo</div>
                            </div>
                        </div>

                        <div style={{ marginTop: 24, padding: 24, background: 'rgba(34,197,94,0.1)', borderRadius: 16, border: '1px solid rgba(34,197,94,0.3)', textAlign: 'center' }}>
                            <p style={{ fontSize: 14, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>Your Annual Savings</p>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 36, fontWeight: 700, color: '#16a34a' }}>${annualSavings.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─────────────────── WHITE-GLOVE ONBOARDING ─────────────────── */}
            <section style={{
                padding: isMobile ? '64px 0' : '100px 0',
                background: isDark
                    ? 'linear-gradient(180deg, #09090b 0%, #0f0a1a 50%, #09090b 100%)'
                    : 'linear-gradient(180deg, #fafafa 0%, #faf5ff 50%, #fafafa 100%)',
                borderTop: `1px solid ${theme.borderSubtle}`,
                borderBottom: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 20px', borderRadius: 100,
                            background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)',
                            fontSize: 13, fontWeight: 700, color: '#a855f7', marginBottom: 20,
                        }}>🤝 White-Glove Onboarding</div>

                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 44,
                            fontWeight: 800, color: theme.text, letterSpacing: '-0.03em',
                            marginBottom: 16, lineHeight: 1.1,
                        }}>Your Store. Your Brand.<br />Our Obsession.</h2>

                        <p style={{ fontSize: isMobile ? 15 : 18, color: theme.textMuted, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
                            When you join Soobér, you don&apos;t get a cookie-cutter listing. Our team sits down with you — in person — and builds your digital storefront together. Every photo, every description, every menu item crafted until it feels like <strong style={{ color: theme.text }}>you</strong>.
                        </p>
                    </div>

                    {/* Onboarding Steps */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                        gap: isMobile ? 16 : 20, marginBottom: isMobile ? 40 : 56,
                    }}>
                        {[
                            {
                                step: '01', icon: '☕', title: 'The Conversation',
                                desc: "We start with a coffee. No forms, no pressure. We visit your business, taste your food, learn your story, and understand what makes you special. This isn't a transaction — it's a partnership that starts face-to-face.",
                                color: '#eab308', glowColor: 'rgba(234,179,8,0.12)',
                            },
                            {
                                step: '02', icon: '🎨', title: 'Crafting Your Brand',
                                desc: "Our design team meticulously builds your brand presence on the platform — custom photography, menu styling, your story told your way. We iterate with you until every pixel feels right. We won't rest until it's perfect.",
                                color: '#a855f7', glowColor: 'rgba(168,85,247,0.12)',
                            },
                            {
                                step: '03', icon: '⚙️', title: 'Tech Setup & Training',
                                desc: "We install and configure your KDS, set up your vendor portal, connect your POS, and walk your team through everything hands-on. Real humans, in your kitchen, on your schedule. Not a Zoom call — in person.",
                                color: '#0066FF', glowColor: 'rgba(0,102,255,0.12)',
                            },
                            {
                                step: '04', icon: '🚀', title: 'Launch Together',
                                desc: "On launch day, we're right there with you. Monitoring orders, managing your first deliveries, ensuring everything runs flawlessly. And after that? We stay. Your dedicated account manager is one call away, forever.",
                                color: '#22c55e', glowColor: 'rgba(34,197,94,0.12)',
                            },
                        ].map(s => (
                            <div key={s.step} style={{
                                background: isDark
                                    ? 'linear-gradient(135deg, rgba(24,24,27,0.9), rgba(17,17,19,0.95))'
                                    : theme.bgCard,
                                border: `1px solid ${theme.borderLight}`,
                                borderRadius: 24, padding: isMobile ? 24 : 32,
                                position: 'relative', overflow: 'hidden',
                                transition: 'all 0.3s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${s.glowColor}`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                {/* Corner glow */}
                                <div style={{
                                    position: 'absolute', top: -30, right: -30,
                                    width: 120, height: 120, borderRadius: '50%',
                                    background: `radial-gradient(circle, ${s.glowColor} 0%, transparent 70%)`,
                                }} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, position: 'relative' }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 16,
                                        background: `${s.color}12`, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        fontSize: 24, flexShrink: 0,
                                    }}>{s.icon}</div>
                                    <div>
                                        <div style={{
                                            fontSize: 11, fontWeight: 800, color: s.color,
                                            textTransform: 'uppercase', letterSpacing: '0.06em',
                                        }}>Step {s.step}</div>
                                        <h3 style={{
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 18,
                                            fontWeight: 700, color: theme.text, margin: 0,
                                        }}>{s.title}</h3>
                                    </div>
                                </div>
                                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, margin: 0, position: 'relative' }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Partnership Promise Quote */}
                    <div style={{
                        padding: isMobile ? '28px 20px' : '40px 48px',
                        borderRadius: 24,
                        background: isDark
                            ? 'linear-gradient(135deg, rgba(168,85,247,0.06), rgba(0,102,255,0.04))'
                            : 'linear-gradient(135deg, rgba(168,85,247,0.04), rgba(0,102,255,0.03))',
                        border: `1px solid ${isDark ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.1)'}`,
                        textAlign: 'center', position: 'relative',
                    }}>
                        <div style={{ fontSize: 36, marginBottom: 16 }}>🤝</div>
                        <p style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 18 : 24,
                            fontWeight: 700, color: theme.text,
                            lineHeight: 1.5, marginBottom: 12,
                            letterSpacing: '-0.02em',
                        }}>
                            &ldquo;We don&apos;t just list your business.<br />We build your digital home — together.&rdquo;
                        </p>
                        <p style={{ fontSize: 14, color: theme.textMuted, margin: 0 }}>
                            Your success is our success. That&apos;s not a slogan — it&apos;s our business model.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─────────────────── ONGOING SUPPORT ─────────────────── */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 20px', borderRadius: 100,
                            background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.25)',
                            fontSize: 13, fontWeight: 700, color: '#eab308', marginBottom: 20,
                        }}>✨ Beyond Onboarding</div>

                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                            fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 12,
                        }}>We Take Care of Our People</h2>
                        <p style={{ fontSize: isMobile ? 15 : 17, color: theme.textMuted, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                            Our partnership doesn&apos;t end at launch. We&apos;re in this together — every season, every challenge, every growth milestone.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 20 }}>
                        {[
                            { icon: '📞', title: 'Real Human Support', desc: "No bots. No ticket queues. Your dedicated local account manager picks up the phone when you call. They know your business by name.", color: '#22c55e' },
                            { icon: '📸', title: 'Free Photography', desc: "Need new menu photos? Seasonal updates? We send our photographer to your location — no charge, no hassle. Your brand stays fresh.", color: '#0066FF' },
                            { icon: '📊', title: 'Weekly Performance Briefings', desc: "Every Monday you get a bite-sized report — top sellers, trending items, customer sentiment. Data that actually helps you decide.", color: '#a855f7' },
                            { icon: '🎯', title: 'Marketing Muscle', desc: "We feature you in our community emails, social posts, and homepage spotlights. Your story reaches thousands of Soo residents.", color: '#f59e0b' },
                            { icon: '🔧', title: 'Menu & Tech Updates', desc: "Changed your prices? New seasonal item? One text to your account manager and it's live. Same day. Every time.", color: '#ef4444' },
                            { icon: '🤝', title: 'The Community', desc: "You join a family of 90+ local businesses supporting each other. Vendor events, cross-promotions, and genuine friendships.", color: '#eab308' },
                        ].map(item => (
                            <div key={item.title} style={{
                                ...cardStyle, transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = theme.shadowMd; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; }}
                            >
                                <div style={{
                                    width: 48, height: 48, borderRadius: 16,
                                    background: `${item.color}12`, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: 24, marginBottom: 16,
                                }}>{item.icon}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────────────── WHY PARTNER (Benefits) ─────────────────── */}
            <section style={{
                padding: isMobile ? '64px 0' : '100px 0',
                background: isDark
                    ? 'linear-gradient(180deg, #09090b, #0a120a, #09090b)'
                    : 'linear-gradient(180deg, #fafafa, #f0fdf4, #fafafa)',
                borderTop: `1px solid ${theme.borderSubtle}`,
                borderBottom: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
                        <h2 style={{
                            fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                            fontWeight: 800, color: theme.text, letterSpacing: '-0.03em', marginBottom: 12,
                        }}>The Anti-Corporate Alternative</h2>
                        <p style={{ fontSize: 16, color: theme.textMuted, maxWidth: 600, margin: '0 auto' }}>
                            You own your customers. You own your kitchen. We just give you the tools to succeed locally.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 20 }}>
                        {[
                            { icon: '💰', title: 'Fair 10% Flat Rate', desc: 'Keep your margins. We charge a flat 10% to cover dispatchers and drivers. No hidden marketing fees or surge pricing.' },
                            { icon: '📊', title: 'Own Your Data', desc: 'Full access to your customer base. Know exactly who orders, when, and how — directly from your vendor portal.' },
                            { icon: '🚀', title: 'Live KDS Access', desc: 'Every partner gets our real-time Kitchen Display System. Manage orders efficiently — no tablets piling up.' },
                            { icon: '⚡', title: '100% Electric Fleet', desc: 'Emission-free delivery. Your customers get green delivery — and you get the brand equity of sustainability.' },
                            { icon: '🏘️', title: 'Hyperlocal Focus', desc: 'We only serve the Soo and Algoma. Your business gets top billing, not buried below national chains.' },
                            { icon: '📐', title: 'Custom Vendor Portal', desc: 'Menu management, order analytics, inventory alerts, performance dashboard — built specifically for local businesses.' },
                        ].map(b => (
                            <div key={b.title} style={{
                                ...cardStyle, transition: 'all 0.2s',
                            }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = theme.shadowMd; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = theme.shadow; }}
                            >
                                <div style={{ fontSize: 32, marginBottom: 16 }}>{b.icon}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: theme.text, marginBottom: 8 }}>{b.title}</h3>
                                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────────────── PARTNER TESTIMONIALS ─────────────────── */}
            <section style={{ padding: isMobile ? '48px 0' : '80px 0' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: pad }}>
                    <h2 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36,
                        fontWeight: 800, color: theme.text, letterSpacing: '-0.03em',
                        marginBottom: isMobile ? 28 : 40, textAlign: 'center',
                    }}>What Our Partners Say</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 20 }}>
                        {[
                            { quote: "They came in, tasted everything, photographed every dish with studio lighting. My online menu looks better than my physical one now.", name: 'Aurora', role: "Aurora's Restaurant", emoji: '🍝' },
                            { quote: "When my printer broke on a Friday night rush, my account manager showed up with a replacement in 20 minutes. Who does that?", name: 'Marco', role: "Sandro's Pizzeria", emoji: '🍕' },
                            { quote: "I was on Skip for 2 years and never spoke to a human. With Soobér, I have my guy's cell number. He calls ME to check in.", name: 'Raj', role: 'Tandoori Gardan', emoji: '🍛' },
                        ].map((t, i) => (
                            <div key={i} style={{
                                ...cardStyle,
                                borderTop: `3px solid ${['#eab308', '#a855f7', '#0066FF'][i]}`,
                            }}>
                                <p style={{
                                    fontSize: 14, color: theme.text, lineHeight: 1.7,
                                    fontStyle: 'italic', marginBottom: 20,
                                }}>&ldquo;{t.quote}&rdquo;</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{
                                        width: 38, height: 38, borderRadius: 12,
                                        background: theme.bgInput, display: 'flex',
                                        alignItems: 'center', justifyContent: 'center', fontSize: 18,
                                    }}>{t.emoji}</div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: theme.text }}>{t.name}</div>
                                        <div style={{ fontSize: 12, color: theme.textFaint }}>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─────────────────── APPLICATION FORM ─────────────────── */}
            <section id="apply" style={{
                padding: isMobile ? '40px 0 80px' : '60px 0 100px',
                background: theme.bgAlt,
                borderTop: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: pad }}>
                    {submitted ? (
                        <div style={{ ...cardStyle, padding: 40, textAlign: 'center' }}>
                            <div style={{ fontSize: 64, marginBottom: 20 }}>🤝</div>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Application Received!</h3>
                            <p style={{ fontSize: 15, color: theme.textSecondary, marginBottom: 12 }}>
                                Our local team will review your application and contact you within 24 hours to schedule your in-person onboarding conversation.
                            </p>
                            <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 32 }}>
                                ☕ We&apos;ll bring the coffee.
                            </p>
                            <Link href="/vendor/kds" style={{
                                display: 'inline-block', background: theme.dark, color: theme.darkText,
                                padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600,
                                textDecoration: 'none',
                            }}>Preview the Admin Portal</Link>
                        </div>
                    ) : (
                        <div style={{ ...cardStyle, padding: isMobile ? 24 : 40 }}>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Let&apos;s Talk</h2>
                            <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 16 }}>
                                Tell us a bit about your business, and we&apos;ll set up an in-person visit within 24 hours.
                            </p>
                            <div style={{
                                padding: '12px 16px', borderRadius: 14,
                                background: isDark ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.04)',
                                border: '1px solid rgba(168,85,247,0.15)',
                                marginBottom: 28, display: 'flex', alignItems: 'center', gap: 10,
                            }}>
                                <span style={{ fontSize: 18 }}>🤝</span>
                                <span style={{ fontSize: 13, color: '#a855f7', fontWeight: 600 }}>
                                    White-glove onboarding included — we craft your brand presence together
                                </span>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <label style={labelStyle}>Your Name</label>
                                <input style={inputStyle} value={formState.name} onChange={e => updateField('name', e.target.value)} required placeholder="Jane Doe" />

                                <label style={labelStyle}>Business Name</label>
                                <input style={inputStyle} value={formState.business} onChange={e => updateField('business', e.target.value)} required placeholder="Jane's Bakery" />

                                <label style={labelStyle}>Business Type</label>
                                <select style={{ ...inputStyle, appearance: 'none', backgroundImage: 'linear-gradient(45deg, transparent 50%, gray 50%), linear-gradient(135deg, gray 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                                    value={formState.type} onChange={e => updateField('type', e.target.value)}>
                                    <option value="restaurant">Restaurant / Eatery</option>
                                    <option value="market">Market Vendor / Artisan</option>
                                    <option value="grocery">Grocery / Convenience</option>
                                    <option value="other">Other</option>
                                </select>

                                <label style={labelStyle}>Email Address</label>
                                <input type="email" style={inputStyle} value={formState.email} onChange={e => updateField('email', e.target.value)} required placeholder="jane@example.com" />

                                <label style={labelStyle}>Phone Number</label>
                                <input type="tel" style={inputStyle} value={formState.phone} onChange={e => updateField('phone', e.target.value)} required placeholder="(705) 555-0199" />

                                <button type="submit" style={{
                                    width: '100%', padding: '16px 0', borderRadius: 14, marginTop: 16,
                                    background: 'linear-gradient(135deg, #eab308, #f59e0b)',
                                    color: '#111', border: 'none',
                                    fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    boxShadow: '0 8px 24px rgba(234,179,8,0.25)',
                                }}>Let&apos;s Build Together →</button>
                            </form>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
