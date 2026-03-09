"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';

const steps = [
    { num: '01', icon: '🔍', title: 'Browse', desc: 'Explore 18+ local restaurants and the Soo MRKT artisan marketplace. Filter by cuisine, browse menus, and discover new spots in the Sault.' },
    { num: '02', icon: '🛒', title: 'Order', desc: 'Add your favourites to the cart, choose your delivery address, and check out securely. Tip your driver and track your order in real-time.' },
    { num: '03', icon: '⚡', title: 'Enjoy', desc: 'Your order is delivered by our 100% electric fleet. Fresh from the kitchen, zero emissions, straight to your door. That\'s the Soober way.' },
];

const faqs = [
    { q: 'Where does Soobér deliver?', a: 'We deliver throughout Sault Ste. Marie, Ontario and surrounding areas within the Algoma District. Enter your address at checkout to confirm coverage.' },
    { q: 'What are the delivery fees?', a: 'Delivery starts at $3.99 and varies based on distance. We also charge a small service fee (5-8%) on the order subtotal. All prices are in CAD and include 13% Ontario HST.' },
    { q: 'How does the 100% electric fleet work?', a: 'Every delivery is made by an electric vehicle — EVs, e-bikes, or electric scooters. Ontario\'s grid is 94% emissions-free, so our deliveries are genuinely zero-carbon from charge to your door.' },
    { q: 'Can I tip my driver?', a: 'Absolutely. Tips go 100% to your driver. You can choose a suggested percentage (15%, 18%, 20%, 25%) or enter a custom amount at checkout.' },
    { q: 'What is the Soo MRKT?', a: 'The Soo MRKT is our digital farmers market — featuring 13+ local artisan vendors from the Saturday Market at 73 Brock St. Order meats, produce, baked goods, mushrooms, and more for delivery or market pickup.' },
    { q: 'How do I become a restaurant partner?', a: 'Visit our Corporate Affairs page and fill out the application form. We charge a flat 15% commission — about half of what the national apps take. We\'ll have your store live within 24 hours.' },
    { q: 'How do I drive for Soobér?', a: 'Visit our For Drivers page. You\'ll need a valid license, insurance, an electric vehicle (we can help with that), a smartphone, and a clean background check. Apply online and start earning.' },
    { q: 'What makes Soobér different?', a: '100% locally owned, 100% electric fleet, half the commission rates of national apps, and the Soo MRKT — a category no other delivery platform serves. Every dollar stays in the Sault.' },
];

export default function HowItWorksPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

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
            <section style={{ padding: isMobile ? '60px 0 40px' : '100px 0 60px', textAlign: 'center' }}>
                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: `1px solid ${theme.borderSubtle}`,
                        background: theme.bgInput, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                        textTransform: 'uppercase', color: theme.textMuted, marginBottom: 24,
                    }}>📖 How It Works</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 36 : 56, fontWeight: 700,
                        letterSpacing: '-0.03em', lineHeight: 1.1, color: theme.text, marginBottom: 16,
                    }}>Three steps to the best food in the Soo.</h1>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: theme.textMuted, maxWidth: 500, margin: '0 auto', lineHeight: 1.6 }}>
                        From craving to doorstep in 30 minutes. Delivered by our 100% electric fleet.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section style={{ padding: isMobile ? '20px 0 64px' : '20px 0 100px' }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: pad }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 20 : 32 }}>
                        {steps.map((step, i) => (
                            <div key={step.num} style={{
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                borderRadius: 28, padding: isMobile ? 28 : 36, boxShadow: theme.shadow,
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{
                                    position: 'absolute', top: -10, right: -10,
                                    fontSize: 100, fontWeight: 900, opacity: 0.04, color: theme.text,
                                    fontFamily: "'DM Sans', sans-serif",
                                }}>{step.num}</div>
                                <div style={{ fontSize: 48, marginBottom: 20 }}>{step.icon}</div>
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    fontSize: 11, fontWeight: 700, color: theme.accent, letterSpacing: '0.08em',
                                    textTransform: 'uppercase', marginBottom: 12,
                                }}>Step {step.num}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 12, letterSpacing: '-0.02em' }}>{step.title}</h3>
                                <p style={{ fontSize: 15, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section style={{
                padding: isMobile ? '64px 0' : '100px 0',
                background: theme.bgAlt, borderTop: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 8, textAlign: 'center' }}>Frequently Asked Questions</h2>
                    <p style={{ fontSize: 16, color: theme.textMuted, textAlign: 'center', marginBottom: isMobile ? 32 : 48 }}>Everything you need to know about ordering with Soobér.</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{
                                background: theme.bgCard, borderRadius: 18,
                                border: `1px solid ${openFaq === i ? theme.border : theme.borderSubtle}`,
                                overflow: 'hidden', transition: 'all 0.2s',
                            }}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    style={{
                                        width: '100%', padding: '18px 22px', border: 'none',
                                        background: 'transparent', cursor: 'pointer', textAlign: 'left',
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    }}
                                >
                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text }}>{faq.q}</span>
                                    <span style={{ fontSize: 18, color: theme.textFaint, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 12 }}>+</span>
                                </button>
                                {openFaq === i && (
                                    <div style={{ padding: '0 22px 18px' }}>
                                        <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0', textAlign: 'center' }}>
                <div style={{ maxWidth: 500, margin: '0 auto', padding: pad }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: theme.text, marginBottom: 16 }}>Ready to order?</h2>
                    <Link href="/" style={{
                        display: 'inline-block', background: theme.dark, color: theme.darkText,
                        padding: '16px 40px', borderRadius: 16, fontSize: 16, fontWeight: 700,
                        fontFamily: "'DM Sans', sans-serif", textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    }}>Browse Restaurants</Link>
                </div>
            </section>
        </div>
    );
}
