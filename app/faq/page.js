"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';

const faqCategories = [
    {
        title: 'Ordering',
        icon: '🛒',
        questions: [
            { q: 'How do I place an order?', a: 'Browse restaurants on our homepage, add items to your cart, and proceed to checkout. You can pay with credit card, debit, or digital wallet.' },
            { q: 'Can I schedule an order in advance?', a: 'Not yet, but scheduled ordering is coming soon! Currently, all orders are placed for immediate delivery.' },
            { q: 'What if an item I ordered is unavailable?', a: 'The restaurant will contact you directly to offer a substitution or remove the item. Your total will be adjusted accordingly.' },
            { q: 'Is there a minimum order amount?', a: 'There is no minimum order amount. However, a small delivery fee applies based on your delivery zone.' },
        ]
    },
    {
        title: 'Delivery',
        icon: '🚗',
        questions: [
            { q: 'What areas do you deliver to?', a: 'We cover all of Sault Ste. Marie across 5 delivery zones, from Downtown Core to the Extended Zone including Garden River approaches. Check our Delivery Zone page for details.' },
            { q: 'How long does delivery take?', a: 'Delivery typically takes 15–50 minutes depending on your zone and distance from the restaurant. You\'ll see an estimated time at checkout.' },
            { q: 'Are all deliveries really electric?', a: 'Yes! Soobér operates a 100% electric vehicle fleet. Every single delivery is emission-free.' },
            { q: 'Can I track my order in real-time?', a: 'Absolutely. Once your order is confirmed, you\'ll get a live tracking link showing your driver\'s location and estimated arrival time.' },
        ]
    },
    {
        title: 'Payment & Pricing',
        icon: '💳',
        questions: [
            { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, and digital wallets. All payments are processed securely through PCI-compliant payment processors.' },
            { q: 'How is tax calculated?', a: 'All orders include 13% HST (Harmonized Sales Tax), which is standard for Ontario, Canada.' },
            { q: 'Do you charge delivery fees?', a: 'Delivery fees range from free (Downtown Core) to $5.99 (Extended Zone). Gold and Diamond loyalty tier members enjoy waived delivery fees.' },
            { q: 'How do promo codes work?', a: 'Enter your promo code at checkout. The discount is applied to your subtotal before tax. Some codes have minimum order requirements.' },
        ]
    },
    {
        title: 'Account & Rewards',
        icon: '👤',
        questions: [
            { q: 'How does the loyalty program work?', a: 'You earn points on every order. As you accumulate orders, you unlock tiers: Bronze → Silver → Gold → Diamond. Each tier comes with better perks like free delivery and bonus points.' },
            { q: 'How do I refer a friend?', a: 'Visit the Refer a Friend page to find your unique code. When your friend places their first order using your code, you both get $10 in credits.' },
            { q: 'Can I delete my account?', a: 'Yes. Contact us at hello@soobereats.ca and we\'ll process your account deletion within 24 hours. Your personal data will be purged within 30 days.' },
        ]
    },
    {
        title: 'For Restaurants & Vendors',
        icon: '🏪',
        questions: [
            { q: 'How do I list my restaurant on Soobér?', a: 'Visit our Corporate page and fill out the partner application. Our team will review your submission and get back to you within 48 hours.' },
            { q: 'What commission does Soobér charge?', a: 'We offer fair, transparent commission rates significantly lower than the big national apps. Details are discussed during the onboarding process.' },
            { q: 'Do you provide a tablet or POS system?', a: 'Yes! We provide a Kitchen Display System (KDS) accessible from any device. It shows incoming orders in real-time with a kanban-style interface.' },
        ]
    },
];

export default function FAQPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeCategory, setActiveCategory] = useState(0);
    const [openQuestion, setOpenQuestion] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* Hero */}
            <section style={{
                padding: isMobile ? '48px 0 32px' : '72px 0 48px',
                background: theme.mode === 'dark' ? '#09090b' : '#1c1917', color: '#fff', textAlign: 'center',
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad }}>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 32 : 48, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 12 }}>Frequently Asked Questions</h1>
                    <p style={{ fontSize: isMobile ? 15 : 17, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto' }}>Everything you need to know about Soobér. Can&apos;t find your answer? <Link href="/contact" style={{ color: '#eab308', textDecoration: 'underline' }}>Contact us</Link>.</p>
                </div>
            </section>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: pad, paddingTop: isMobile ? 24 : 40 }}>

                {/* Category Tabs */}
                <div style={{
                    display: 'flex', gap: 6, overflowX: 'auto', WebkitOverflowScrolling: 'touch',
                    paddingBottom: 4, marginBottom: isMobile ? 20 : 32,
                }}>
                    {faqCategories.map((cat, i) => (
                        <button key={cat.title} onClick={() => { setActiveCategory(i); setOpenQuestion(null); }} style={{
                            padding: isMobile ? '10px 16px' : '12px 22px', borderRadius: 100, whiteSpace: 'nowrap',
                            border: `1.5px solid ${activeCategory === i ? theme.accent : theme.borderSubtle}`,
                            background: activeCategory === i ? theme.accentBg : 'transparent',
                            color: activeCategory === i ? theme.accent : theme.textMuted,
                            fontSize: isMobile ? 13 : 14, fontWeight: 700, cursor: 'pointer',
                            transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
                        }}>
                            {cat.icon} {cat.title}
                        </button>
                    ))}
                </div>

                {/* Questions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {faqCategories[activeCategory].questions.map((faq, i) => {
                        const isOpen = openQuestion === i;
                        return (
                            <div key={i} style={{
                                background: theme.bgCard,
                                border: `1px solid ${isOpen ? theme.border : theme.borderSubtle}`,
                                borderRadius: 18, overflow: 'hidden',
                                transition: 'all 0.2s',
                            }}>
                                <button onClick={() => setOpenQuestion(isOpen ? null : i)} style={{
                                    width: '100%', padding: isMobile ? '18px 20px' : '20px 24px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                                }}>
                                    <span style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 16,
                                        fontWeight: 700, color: theme.text, lineHeight: 1.4,
                                    }}>{faq.q}</span>
                                    <span style={{
                                        width: 28, height: 28, borderRadius: 8,
                                        background: isOpen ? theme.accent : theme.bgInput,
                                        color: isOpen ? '#09090b' : theme.textFaint,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 16, fontWeight: 700, flexShrink: 0,
                                        transition: 'all 0.2s',
                                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                                    }}>+</span>
                                </button>
                                {isOpen && (
                                    <div style={{
                                        padding: isMobile ? '0 20px 20px' : '0 24px 24px',
                                    }}>
                                        <p style={{
                                            fontSize: 14, color: theme.textSecondary, lineHeight: 1.7,
                                            margin: 0, borderTop: `1px solid ${theme.borderLight}`,
                                            paddingTop: 16,
                                        }}>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Contact CTA */}
                <div style={{
                    marginTop: isMobile ? 32 : 48,
                    padding: isMobile ? '28px 20px' : '36px 40px', borderRadius: 24,
                    background: theme.accentBg,
                    border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.12)' : 'rgba(234,179,8,0.18)'}`,
                    textAlign: 'center',
                }}>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: theme.text, marginBottom: 8 }}>Still have questions?</h3>
                    <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 20 }}>Our local team responds within a few hours.</p>
                    <Link href="/contact" style={{
                        display: 'inline-block', padding: '14px 28px', borderRadius: 14,
                        background: theme.accent, color: '#09090b', fontSize: 15, fontWeight: 700,
                        textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
                    }}>Contact Support</Link>
                </div>
            </div>
        </div>
    );
}
