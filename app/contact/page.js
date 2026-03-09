"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

export default function ContactPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', subject: 'general', message: '' });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
    const update = (field, val) => setFormState(prev => ({ ...prev, [field]: val }));
    const pad = isMobile ? '0 16px' : '0 40px';

    const inputStyle = {
        width: '100%', padding: '14px 18px', borderRadius: 14,
        border: `1.5px solid ${theme.border}`, fontSize: 15, fontWeight: 500,
        color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif",
        background: theme.bgInput, transition: 'all 0.2s', boxSizing: 'border-box', marginBottom: 16,
    };
    const labelStyle = { fontSize: 13, fontWeight: 600, color: theme.textSecondary, marginBottom: 6, display: 'block', fontFamily: "'DM Sans', sans-serif" };

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* Hero */}
            <section style={{
                padding: isMobile ? '60px 0 40px' : '80px 0 60px',
                background: theme.mode === 'dark' ? '#09090b' : '#1c1917',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-15%', left: '40%', width: 500, height: 400, background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#eab308', marginBottom: 24,
                    }}>📬 Get in Touch</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 700,
                        letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16,
                    }}>We&apos;re All Ears</h1>
                    <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
                        Real people, real fast. No ticket queues, no bots. We&apos;re a local team in Sault Ste. Marie and we&apos;d love to hear from you.
                    </p>
                </div>
            </section>

            {/* Content */}
            <div style={{ maxWidth: 1100, margin: '0 auto', padding: pad }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 360px',
                    gap: isMobile ? 32 : 56,
                    padding: isMobile ? '32px 0' : '56px 0',
                }}>
                    {/* Form */}
                    <div>
                        {submitted ? (
                            <div style={{
                                background: theme.bgCard, padding: isMobile ? 32 : 48, borderRadius: 28,
                                border: `1px solid ${theme.border}`, textAlign: 'center', boxShadow: theme.shadow,
                            }}>
                                <div style={{ fontSize: 64, marginBottom: 20 }}>📨</div>
                                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 12 }}>Message Sent!</h2>
                                <p style={{ fontSize: 15, color: theme.textSecondary, marginBottom: 32 }}>
                                    Thanks for reaching out. Our team typically responds within a few hours during business hours.
                                </p>
                                <Link href="/" style={{ display: 'inline-block', background: theme.dark, color: theme.darkText, padding: '14px 28px', borderRadius: 14, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
                                    Back to Home
                                </Link>
                            </div>
                        ) : (
                            <div style={{
                                background: theme.bgCard, padding: isMobile ? 24 : 40, borderRadius: 28,
                                border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
                            }}>
                                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Send a Message</h2>
                                <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 28 }}>Whether it&apos;s feedback, a question, or a partnership inquiry — drop us a line.</p>

                                <form onSubmit={handleSubmit}>
                                    <label style={labelStyle}>Your Name</label>
                                    <input style={inputStyle} value={formState.name} onChange={e => update('name', e.target.value)} required placeholder="Jane Doe" />

                                    <label style={labelStyle}>Email Address</label>
                                    <input type="email" style={inputStyle} value={formState.email} onChange={e => update('email', e.target.value)} required placeholder="jane@example.com" />

                                    <label style={labelStyle}>Subject</label>
                                    <select style={{ ...inputStyle, appearance: 'none' }} value={formState.subject} onChange={e => update('subject', e.target.value)}>
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Order Support</option>
                                        <option value="partner">Partnership / Vendor Inquiry</option>
                                        <option value="driver">Driver Application Follow-Up</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="press">Press / Media</option>
                                    </select>

                                    <label style={labelStyle}>Message</label>
                                    <textarea
                                        style={{ ...inputStyle, minHeight: 140, resize: 'vertical' }}
                                        value={formState.message} onChange={e => update('message', e.target.value)}
                                        required placeholder="Tell us what's on your mind..."
                                    />

                                    <button type="submit" style={{
                                        width: '100%', padding: '16px 0', borderRadius: 14, marginTop: 8,
                                        background: theme.dark, color: theme.darkText, border: 'none',
                                        fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                                        cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    }}>Send Message</button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {[
                            { icon: '📍', title: 'Location', content: 'Sault Ste. Marie, Ontario\nAlgoma District, Canada' },
                            { icon: '📞', title: 'Phone', content: '(705) 555-SOOB (7662)\nMon–Sat, 9 AM – 9 PM EST' },
                            { icon: '📧', title: 'Email', content: 'hello@soobereats.ca\nbiz@soobereats.ca (Partnerships)\npress@soobereats.ca (Media)' },
                            { icon: '🕐', title: 'Response Time', content: 'We typically respond within 2–4 hours during business hours (Mon–Sat, 9AM–9PM EST).' },
                            { icon: '⚡', title: '100% Electric Fleet', content: 'All deliveries and rides made by our 100% electric vehicle fleet. Zero emissions, every order.' },
                        ].map(info => (
                            <div key={info.title} style={{
                                background: theme.mode === 'dark' ? 'rgba(24,24,27,0.6)' : 'rgba(255,255,255,0.7)',
                                backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
                                border: `1px solid ${theme.borderSubtle}`,
                                borderRadius: 22, padding: isMobile ? 20 : 24,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                    <span style={{ fontSize: 22 }}>{info.icon}</span>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0 }}>{info.title}</h3>
                                </div>
                                <p style={{ fontSize: 14, color: theme.textSecondary, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>{info.content}</p>
                            </div>
                        ))}

                        {/* Quick links */}
                        <div style={{
                            background: theme.accentBg, border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.2)'}`,
                            borderRadius: 22, padding: isMobile ? 20 : 24,
                        }}>
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.accent, margin: 0, marginBottom: 14 }}>Quick Links</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {[
                                    { label: 'Sell on Soobér', href: '/corporate' },
                                    { label: 'Drive Electric for Us', href: '/for-drivers' },
                                    { label: 'How It Works', href: '/how-it-works' },
                                ].map(link => (
                                    <Link key={link.href} href={link.href} style={{
                                        fontSize: 14, fontWeight: 600, color: theme.accent,
                                        textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                                    }}>
                                        {link.label} <span style={{ fontSize: 12 }}>→</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
