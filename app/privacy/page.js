"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

export default function PrivacyPage() {
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
    const ulStyle = { paddingLeft: 24, margin: '0 0 16px' };
    const liStyle = { ...pStyle, marginBottom: 8 };

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>
            <section style={{
                padding: isMobile ? '48px 0 32px' : '72px 0 48px',
                background: theme.mode === 'dark' ? '#09090b' : '#1c1917', color: '#fff', textAlign: 'center',
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto', padding: pad }}>
                    <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 32 : 44, fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 12 }}>Privacy Policy</h1>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>Last updated: March 9, 2026</p>
                </div>
            </section>

            <div style={{ maxWidth: 800, margin: '0 auto', padding: `${isMobile ? 32 : 56}px ${isMobile ? 16 : 40}px` }}>
                <div style={sectionStyle}>
                    <h2 style={h2Style}>1. Information We Collect</h2>
                    <p style={pStyle}>When you use Soobér, we collect information to provide and improve our service:</p>
                    <ul style={ulStyle}>
                        <li style={liStyle}><strong>Account information:</strong> Name, email address, phone number, and delivery address(es).</li>
                        <li style={liStyle}><strong>Order data:</strong> Items ordered, order history, preferences, and payment information (processed securely via third-party providers).</li>
                        <li style={liStyle}><strong>Device information:</strong> Browser type, operating system, and general location for delivery purposes.</li>
                        <li style={liStyle}><strong>Usage data:</strong> How you interact with our Platform, including pages visited and features used.</li>
                    </ul>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>2. How We Use Your Information</h2>
                    <p style={pStyle}>We use collected information to:</p>
                    <ul style={ulStyle}>
                        <li style={liStyle}>Process and deliver your orders</li>
                        <li style={liStyle}>Communicate order updates and support responses</li>
                        <li style={liStyle}>Improve our Platform experience and delivery operations</li>
                        <li style={liStyle}>Send promotional offers (with your opt-in consent)</li>
                        <li style={liStyle}>Comply with legal obligations</li>
                    </ul>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>3. Data Sharing</h2>
                    <p style={pStyle}>We share your information only with parties necessary to fulfill your order:</p>
                    <ul style={ulStyle}>
                        <li style={liStyle}><strong>Restaurants &amp; vendors:</strong> Your order details (not payment information) to prepare your food or goods.</li>
                        <li style={liStyle}><strong>Delivery drivers:</strong> Your name, address, and phone number for delivery coordination.</li>
                        <li style={liStyle}><strong>Payment processors:</strong> Secure payment handling through PCI-compliant services.</li>
                    </ul>
                    <p style={pStyle}>We do not sell your personal data to third parties. We do not share your information with advertisers.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>4. Data Security</h2>
                    <p style={pStyle}>We implement industry-standard security measures including encryption (TLS/SSL), secure authentication, and regular security audits. Payment data is never stored on our servers — it&apos;s handled entirely by PCI-compliant payment processors.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>5. Your Rights</h2>
                    <p style={pStyle}>As a user, you have the right to:</p>
                    <ul style={ulStyle}>
                        <li style={liStyle}>Access your personal data at any time through your account</li>
                        <li style={liStyle}>Request correction of inaccurate information</li>
                        <li style={liStyle}>Request deletion of your account and associated data</li>
                        <li style={liStyle}>Opt out of promotional communications</li>
                        <li style={liStyle}>Export your order history</li>
                    </ul>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>6. Cookies</h2>
                    <p style={pStyle}>We use essential cookies for platform functionality (authentication, preferences, cart state). We do not use third-party tracking cookies or sell cookie data. Session data is stored locally and cleaned when you close your browser.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>7. Data Retention</h2>
                    <p style={pStyle}>We retain your account data for as long as your account is active. Order history is retained for 2 years for reference and support purposes. Upon account deletion, personal data is purged within 30 days.</p>
                </div>

                <div style={sectionStyle}>
                    <h2 style={h2Style}>8. Children&apos;s Privacy</h2>
                    <p style={pStyle}>Soobér is not directed at children under 16. We do not knowingly collect information from individuals under 16 years of age.</p>
                </div>

                <div style={{
                    padding: isMobile ? 20 : 28, borderRadius: 20,
                    background: theme.accentBg, border: `1px solid ${theme.mode === 'dark' ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.2)'}`,
                }}>
                    <p style={{ fontSize: 14, color: theme.accent, fontWeight: 600, margin: 0, lineHeight: 1.6 }}>
                        Privacy questions? Contact us at hello@soobereats.ca — we believe in transparency and are happy to clarify anything.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
