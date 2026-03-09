"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';

const sections = [
    {
        title: '🍽️ Customer',
        links: [
            { href: '/', label: 'Homepage', desc: 'Browse restaurants & Soo MRKT' },
            { href: '/checkout', label: 'Checkout', desc: 'Cart & payment flow' },
            { href: '/orders', label: 'Order History', desc: 'Past orders & receipts' },
            { href: '/account', label: 'My Account', desc: 'Profile, addresses, loyalty' },
        ]
    },
    {
        title: '🏪 Restaurants',
        links: [
            { href: '/restaurant/auroras-italian', label: "Aurora's Italian", desc: 'Sample restaurant page' },
            { href: '/restaurant/solo-trattoria', label: 'Solo Trattoria', desc: 'Fine dining page' },
            { href: '/restaurant/uncle-ginos', label: "Uncle Gino's", desc: 'Family Italian page' },
            { href: '/restaurant/muio', label: 'Muio', desc: 'Premium Italian page' },
        ]
    },
    {
        title: '🛒 Soo MRKT',
        links: [
            { href: '/market/penokean-hills', label: 'Penokean Hills Farms', desc: 'Premium meats vendor page' },
            { href: '/market/findlays-fungus', label: "Findlay's Fungus", desc: 'Specialty mushrooms vendor page' },
            { href: '/market/jenn-bakes-cakes', label: 'Jenn Bakes Cakes', desc: 'Artisan bakery vendor page' },
        ]
    },
    {
        title: '🎨 Artisans',
        links: [
            { href: '/artisans/art-northshore', label: 'North Shore Pottery', desc: 'Artisan ceramics page' },
            { href: '/artisans/wildwood-candles', label: 'Wildwood Candle Co.', desc: 'Handmade candles page' },
        ]
    },
    {
        title: '🏢 Corporate & Vendor Ops',
        links: [
            { href: '/corporate', label: 'Corporate Affairs Portal', desc: 'B2B partner onboarding & commission calculator' },
            { href: '/vendor', label: 'Vendor Dashboard', desc: 'Store management & analytics' },
            { href: '/vendor/kds', label: 'Kitchen Display System', desc: 'Live order kanban for kitchens' },
        ]
    },
    {
        title: '📡 Live Tracking',
        links: [
            { href: '/orders/live/demo', label: 'Live Order Tracker (Demo)', desc: 'Real-time order status page' },
        ]
    }
];

export default function LinksPortal() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', padding: isMobile ? '32px 16px 100px' : '60px 40px 120px', transition: 'background 0.3s ease' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 64 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '8px 18px', borderRadius: 100, border: `1px solid ${theme.borderSubtle}`,
                        background: theme.bgInput, fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
                        textTransform: 'uppercase', color: theme.textMuted, marginBottom: 20,
                    }}>🔗 Quick Links</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 32 : 48,
                        fontWeight: 700, letterSpacing: '-0.03em', color: theme.text, marginBottom: 12,
                    }}>SOOber Eats Portal</h1>
                    <p style={{ fontSize: 16, color: theme.textMuted, maxWidth: 500, margin: '0 auto' }}>
                        Jump to any page across the platform — customer, vendor, corporate, and live ops.
                    </p>
                </div>

                {/* Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                    {sections.map(section => (
                        <div key={section.title}>
                            <h2 style={{
                                fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700,
                                color: theme.text, marginBottom: 16, letterSpacing: '-0.01em',
                            }}>{section.title}</h2>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                                gap: 12,
                            }}>
                                {section.links.map(link => (
                                    <LinkCard key={link.href} link={link} theme={theme} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function LinkCard({ link, theme }) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={link.href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 22px', borderRadius: 18,
                background: hovered ? theme.bgInput : theme.bgCard,
                border: `1px solid ${hovered ? theme.border : theme.borderSubtle}`,
                textDecoration: 'none', color: 'inherit',
                transition: 'all 0.25s ease',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hovered ? theme.shadowMd : theme.shadow,
            }}
        >
            <div>
                <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
                    color: theme.text, marginBottom: 3,
                }}>{link.label}</div>
                <div style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.4 }}>{link.desc}</div>
            </div>
            <svg
                width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={theme.textFaint} strokeWidth={2}
                style={{
                    flexShrink: 0, marginLeft: 12,
                    transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                    transition: 'transform 0.25s ease',
                }}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        </Link>
    );
}
