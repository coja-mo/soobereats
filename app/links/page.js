"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const sections = [
    {
        title: '🌐 Social Media',
        links: [
            { href: '#', label: '📸 Instagram', desc: '@soobereats — Follow us for updates and promos' },
            { href: '#', label: '👥 Facebook', desc: 'Soobér Eats — Community page and events' },
            { href: '#', label: '🎵 TikTok', desc: '@soobereats — Behind-the-scenes and fleet showcases' },
            { href: '#', label: '𝕏 X (Twitter)', desc: '@soobereats — Live updates and support' },
        ]
    },
    {
        title: '⭐️ Quick Access / Priority',
        links: [
            { href: '/', label: 'Homepage', desc: 'Main customer storefront' },
            { href: '/founder', label: 'Founder Dashboard', desc: 'Superadmin executive overview' },
            { href: '/cs-admin', label: 'CS Command Center', desc: 'Customer service admin portal' },
            { href: '/support', label: 'AI Support Chat', desc: 'Customer-facing copilot support' },
            { href: '/dispatch', label: 'Dispatch Portal', desc: 'Live fleet & order management' },
            { href: '/scheduler', label: 'Workforce Scheduler', desc: 'Enterprise staff scheduling' },
            { href: '/vendor', label: 'Vendor Dashboard', desc: "Store management & analytics" },
        ]
    },
    {
        title: '🍽️ Customer & Mobility',
        links: [
            { href: '/rides', label: 'Soobér Rides', desc: 'Electric mobility & event fleet' },
            { href: '/rides/airport', label: 'Airport Transfers', desc: 'Fixed-rate rides to YAM' },
            { href: '/rides/events', label: 'Events & Fleets', desc: 'Weddings, proms, corporate events' },
            { href: '/market', label: 'Soo MRKT', desc: 'Local marketplace & artisans' },
            { href: '/checkout', label: 'Checkout', desc: 'Cart & payment flow' },
            { href: '/orders', label: 'Order History', desc: 'Past orders & receipts' },
            { href: '/account', label: 'My Account', desc: 'Profile, addresses, loyalty' },
            { href: '/login', label: 'Sign In / Sign Up', desc: 'Apple, Google, or email login' },
            { href: '/rewards', label: 'Loyalty & Rewards', desc: 'Bronze → Silver → Gold → Diamond tier system' },
            { href: '/delivery-zone', label: 'Delivery Zone Map', desc: 'Coverage areas, fees & delivery times' },
            { href: '/community', label: 'Community Marketplace', desc: 'Free local marketplace — Kijiji meets bulletin board' },
            { href: '/refer', label: 'Refer a Friend', desc: 'Give $10, Get $10 program' },
            { href: '/orders/live', label: 'Live Order Tracking', desc: 'Real-time map tracking with driver ETA' },
            { href: '/download', label: 'Download the App', desc: 'iOS & Android — coming soon' },
        ]
    },
    {
        title: '🏪 Restaurants & Merchants',
        links: [
            { href: '/restaurant/auroras-italian', label: "Aurora's Italian", desc: 'Sample restaurant page' },
            { href: '/restaurant/solo-trattoria', label: 'Solo Trattoria', desc: 'Fine dining page' },
            { href: '/restaurant/uncle-ginos', label: "Uncle Gino's", desc: 'Family Italian page' },
            { href: '/restaurant/muio', label: 'Muio', desc: 'Premium Italian page' },
            { href: '/market/penokean-hills', label: 'Penokean Hills Farms', desc: 'Premium meats vendor page' },
            { href: '/market/findlays-fungus', label: "Findlay's Fungus", desc: 'Specialty mushrooms vendor page' },
            { href: '/market/jenn-bakes-cakes', label: 'Jenn Bakes Cakes', desc: 'Artisan bakery vendor page' },
            { href: '/artisans/art-northshore', label: 'North Shore Pottery', desc: 'Artisan ceramics page' },
            { href: '/artisans/wildwood-candles', label: 'Wildwood Candle Co.', desc: 'Handmade candles page' },
        ]
    },
    {
        title: '🏢 Corporate & Operations',
        links: [
            { href: '/corporate', label: 'Corporate Affairs Portal', desc: 'B2B partner onboarding & commission calculator' },
            { href: '/vendor/kds', label: 'Kitchen Display System', desc: 'Live order kanban for kitchens' },
            { href: '/vendor/pos', label: 'Point of Sale', desc: 'Terminal and payment processing' },
            { href: '/vendor/inventory', label: 'Inventory Manager', desc: 'Stock tracking and alerts' },
            { href: '/driver-portal', label: 'Driver Portal', desc: 'Driver management and assignments' },
            { href: '/academy', label: 'Soobér Academy', desc: 'LMS training platform' },
            { href: '/partners', label: 'Partners Dashboard', desc: 'Local partner management (PIN required)' },
            { href: '/orders/live/ORD-2901', label: 'Live Order Tracker (Demo)', desc: 'Real-time order status page' },
            { href: '/business', label: 'Business Solutions', desc: 'All business services & sustainability hub' },
            { href: '/socials', label: 'Social Campaign', desc: '4-phase social media campaign playbook' },
            { href: '/careers', label: 'Careers', desc: 'Open roles — drivers, ops, tech, business' },
            { href: '/investors', label: 'Investor Relations', desc: 'Pitch deck, metrics, roadmap, competitive analysis' },
        ]
    },
    {
        title: '📄 Information & Support',
        links: [
            { href: '/about', label: 'About Soobér', desc: 'Our story, mission, and 100% electric fleet' },
            { href: '/how-it-works', label: 'How It Works', desc: '3-step ordering guide and FAQ' },
            { href: '/faq', label: 'Frequently Asked Questions', desc: 'Helpful answers for users' },
            { href: '/for-drivers', label: 'Drive Electric', desc: 'Join the EV fleet — earnings calculator & application' },
            { href: '/contact', label: 'Contact Us', desc: 'Get in touch with our local team' },
            { href: '/terms', label: 'Terms of Service', desc: 'Platform terms and policies' },
            { href: '/privacy', label: 'Privacy Policy', desc: 'How we handle your data' },
            { href: '/press', label: 'Press & Newsroom', desc: 'Press releases, media kit, brand assets' },
            { href: '/safety', label: 'Safety & Trust', desc: 'Security, privacy, and rider safety measures' },
            { href: '/accessibility', label: 'Accessibility', desc: 'WCAG 2.1, AODA compliance, ride accessibility' },
            { href: '/careers', label: 'Careers', desc: 'Open roles and perks — we are hiring' },
            { href: '/investors', label: 'Investors', desc: 'Pitch deck, metrics, and roadmap' },
            { href: '/status', label: 'System Status', desc: 'Real-time platform health and uptime' },
            { href: '/partner', label: 'Partner With Us', desc: 'Restaurant application — 15% commission, free POS' },
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
                    }}>Soobér Portal</h1>
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

            <Footer />
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
