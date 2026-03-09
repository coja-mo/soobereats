"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';

export default function TermsPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const pad = isMobile ? '0 16px' : '0 40px';
    const sectionStyle = { marginBottom: 40 };
    const h2Style = { fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 22 : 26, fontWeight: 700, color: theme.text, marginBottom: 16, letterSpacing: '-0.02em' };
    const pStyle = { fontSize: isMobile ? 14 : 15, color: theme.textSecondary, lineHeight: 1.8, margin: '0 0 16px' };

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>
            <section style={{
                padding: isMobile ? '48px 0 32px' : '72px 0 48px',
                background: theme.mode === 'dark' ? '#09090b' : '#1c1917', color: '#fff', textAlign: 'center',
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad }}>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 32 : 44, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 12 }}>Terms of Service</h1>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Last updated: March 9, 2026</p>
                </div>
            </section>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: `${isMobile ? 32 : 56}px ${isMobile ? 16 : 40}px` }}>
                <div style={sectionStyle}>
                    <h2 style={h2Style}>1. Agreement to Terms</h2>
                    <p style={pStyle}>By accessing or using Soobér (&quot;the Platform&quot;), you agree to be bound by these Terms of Service. Soobér is locally owned and operated in Sault Ste. Marie, Ontario, Canada. If you do not agree with any part of these terms, you may not use our Platform.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>2. Services Description</h2>
                    <p style={pStyle}>Soobér provides a platform connecting customers with local restaurants, artisan vendors, and market sellers in the Sault Ste. Marie and Algoma region. All deliveries are made using our 100% electric vehicle fleet. We facilitate ordering, payment processing, and delivery logistics.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>3. Account Registration</h2>
                    <p style={pStyle}>You must create an account to place orders. You are responsible for maintaining the confidentiality of your account credentials. You must be at least 16 years of age to create an account. All information provided must be accurate and current.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>4. Ordering &amp; Payment</h2>
                    <p style={pStyle}>All prices are displayed in Canadian dollars (CAD) and include applicable sales tax (13% HST). A delivery fee may apply based on distance. Payment is processed securely at the time of order. We accept major credit cards, debit, and digital wallets.</p>
                    <p style={pStyle}>Promotional codes are subject to specific terms and may be withdrawn at any time. Orders cannot be modified once submitted to the restaurant or vendor.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>5. Delivery Policy</h2>
                    <p style={pStyle}>Estimated delivery times are provided at checkout but are not guaranteed. All deliveries within the Sault Ste. Marie area are completed by our emission-free electric vehicle fleet. Delivery availability is subject to operational hours and driver availability.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>6. Refunds &amp; Cancellations</h2>
                    <p style={pStyle}>Orders may be cancelled within 60 seconds of placement. After this window, cancellation fees may apply. Refunds for quality issues are reviewed on a case-by-case basis by our local support team. We aim to resolve all disputes within 24 hours.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>7. Vendor Responsibilities</h2>
                    <p style={pStyle}>Restaurants and vendors on our platform are independent businesses responsible for food safety, quality, and accuracy of menu descriptions and pricing. Soobér is not liable for the quality or safety of food prepared by third-party vendors.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>8. Limitation of Liability</h2>
                    <p style={pStyle}>Soobér shall not be liable for indirect, incidental, or consequential damages arising from use of the Platform. Our total liability shall not exceed the amount paid for the specific order giving rise to the claim.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>9. Governing Law</h2>
                    <p style={pStyle}>These terms shall be governed by the laws of the Province of Ontario, Canada. Any disputes shall be subject to the exclusive jurisdiction of the courts in Sault Ste. Marie, Ontario.</p>
                </div>

                <div style={{
                    padding: isMobile ? 20 : 28, borderRadius: 20,
                    background: theme.accentBg, border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.2)'}`,
                }}>
                    <p style={{ fontSize: 14, color: theme.accent, fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                        Questions about these terms? Reach out to us at hello@soobereats.ca — we&apos;re a local team and happy to explain anything in plain English.
                    </p>
                </div>
            </div>
        </div>
    );
}
