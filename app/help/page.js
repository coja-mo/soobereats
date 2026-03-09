"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const CATEGORIES = [
    {
        id: 'getting-started', title: 'Getting Started', icon: '🚀', color: '#0066FF',
        articles: [
            { title: 'How to create your Soobér account', content: 'Download the app or visit soober.ca. Sign up with your email, Apple ID, or Google account. Verify your phone number and you\'re ready to order.' },
            { title: 'Placing your first order', content: 'Browse restaurants, add items to your cart, choose delivery or pickup, enter your address, select payment method, and confirm. Track your order in real-time.' },
            { title: 'Setting your delivery address', content: 'Go to Account → Addresses. Add your home, work, or custom addresses. You can set a default for faster checkout.' },
            { title: 'Payment methods accepted', content: 'We accept Visa, Mastercard, American Express, Soobér gift cards, and Apple Pay / Google Pay. All transactions are encrypted and processed locally.' },
        ]
    },
    {
        id: 'orders', title: 'Orders & Delivery', icon: '📦', color: '#22c55e',
        articles: [
            { title: 'Tracking your order in real-time', content: 'Once your order is confirmed, tap "Track Order" to see your driver\'s live location on the map. You\'ll get notifications at each stage: confirmed, preparing, picked up, arriving.' },
            { title: 'Delivery times and zones', content: 'Standard delivery takes 25-40 minutes. We deliver across Sault Ste. Marie, Garden River First Nation, and parts of Prince Township. Check the delivery zone map on our website.' },
            { title: 'Free delivery on orders over $40', content: 'Orders over $40 qualify for free Standard delivery. Soobér Gold, Diamond, and Star members get free Priority delivery on all orders.' },
            { title: 'Missing or incorrect items', content: 'Report issues within 24 hours via the app or support chat. We\'ll issue an immediate credit or arrange a replacement. Our AI copilot usually resolves these in under 60 seconds.' },
        ]
    },
    {
        id: 'rides', title: 'Rides', icon: '🚗', color: '#8b5cf6',
        articles: [
            { title: 'Booking a ride', content: 'Enter your pickup and dropoff locations. Choose Standard, Premium, or XL. Confirm the fare estimate and your driver will be matched within 2 minutes.' },
            { title: 'Airport transfers (YAM)', content: 'Flat-rate rides to Sault Ste. Marie Airport starting at $25. Pre-book up to 7 days in advance. Premium vehicles available for all airport runs.' },
            { title: 'Event shuttles', content: 'Book shuttle service for hockey games, concerts, and festivals. Multiple pickup locations, fixed routes, and guaranteed capacity.' },
            { title: 'Ride cancellation policy', content: 'Cancel within 2 minutes of booking for free. After that, a $5 fee applies. If your driver is more than 10 minutes late, the fee is automatically waived.' },
        ]
    },
    {
        id: 'account', title: 'Account & Billing', icon: '👤', color: '#f59e0b',
        articles: [
            { title: 'Managing your account', content: 'Go to your profile to update your name, email, phone number, and delivery addresses. You can also manage notification preferences and connected accounts.' },
            { title: 'Understanding your receipt', content: 'Your receipt shows: item subtotal, delivery fee, service fee (5%), tip, and any discounts applied. Soobér charges 15% commission to restaurants — half of what national apps take.' },
            { title: 'Redeeming gift cards', content: 'Go to Account → Gift Cards → Redeem. Enter the code from your email. The balance applies automatically to future orders across delivery, rides, and Soo MRKT.' },
            { title: 'Deleting your account', content: 'Go to Account → Settings → Delete Account. Your data will be permanently removed from our local servers within 30 days. This action cannot be undone.' },
        ]
    },
    {
        id: 'rewards', title: 'Rewards & Loyalty', icon: '⭐', color: '#ec4899',
        articles: [
            { title: 'How the rewards program works', content: 'Earn 1 point per $1 spent. Points unlock perks at Bronze (100), Silver (500), Gold (1,000), Diamond (2,500), and Star (5,000) tiers. Points never expire while your account is active.' },
            { title: 'Tier benefits', content: 'Bronze: birthday bonus. Silver: priority support. Gold: free priority delivery. Diamond: exclusive menu items + early access. Star: VIP everything + personal concierge.' },
            { title: 'Referral rewards', content: 'Share your code. When a friend signs up and places their first order, you both get $10 credit. No limit on referrals.' },
        ]
    },
    {
        id: 'safety', title: 'Safety & Privacy', icon: '🔒', color: '#06b6d4',
        articles: [
            { title: 'How we protect your data', content: 'All data is processed on local Mac Studio compute nodes in Algoma District. No data leaves the region. No third-party cloud. 256-bit encryption at rest and in transit.' },
            { title: 'Driver safety standards', content: 'All drivers pass background checks, vehicle inspections, and safety training through Soobér Academy. GPS tracking and incident reporting on every trip.' },
            { title: 'Reporting a safety concern', content: 'Use the emergency button in the app during any active ride or delivery. For non-urgent concerns, contact support@soober.ca. All reports are reviewed within 1 hour.' },
        ]
    },
];

export default function HelpCenterPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCat, setExpandedCat] = useState(null);
    const [expandedArt, setExpandedArt] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Search filtering
    const filteredCategories = searchQuery.trim()
        ? CATEGORIES.map(cat => ({
            ...cat,
            articles: cat.articles.filter(a =>
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(cat => cat.articles.length > 0)
        : CATEGORIES;

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 36px' : '80px 40px 48px' }}>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 32 : 48, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    How can we help?
                </h1>
                <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 450, margin: '0 auto 24px' }}>
                    Search our knowledge base or browse by category.
                </p>
                {/* Search */}
                <div style={{ maxWidth: 500, margin: '0 auto' }}>
                    <input
                        type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search help articles..."
                        style={{
                            width: '100%', padding: '14px 20px', borderRadius: 16,
                            border: `1px solid ${theme.border}`, background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                            color: theme.text, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                            outline: 'none', boxSizing: 'border-box',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                        }}
                        onFocus={e => e.target.style.borderColor = '#0066FF'}
                        onBlur={e => e.target.style.borderColor = theme.border}
                    />
                </div>
            </section>

            {/* ═══ QUICK LINKS ═══ */}
            {!searchQuery && (
                <section style={{ padding: isMobile ? '0 16px 36px' : '0 40px 48px', maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: 10 }}>
                        {CATEGORIES.map((cat, i) => (
                            <button key={i} onClick={() => { setExpandedCat(expandedCat === cat.id ? null : cat.id); setExpandedArt(null); }}
                                style={{
                                    padding: 18, borderRadius: 18, border: `1px solid ${expandedCat === cat.id ? `${cat.color}40` : theme.borderSubtle}`,
                                    background: expandedCat === cat.id ? `${cat.color}08` : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                                    cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                                }}
                            >
                                <span style={{ fontSize: 24, display: 'block', marginBottom: 6 }}>{cat.icon}</span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: theme.text }}>{cat.title}</span>
                                <span style={{ display: 'block', fontSize: 11, color: theme.textFaint, marginTop: 2 }}>{cat.articles.length} articles</span>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* ═══ ARTICLES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 64px' : '0 40px 80px', maxWidth: 700, margin: '0 auto' }}>
                {filteredCategories
                    .filter(cat => searchQuery || expandedCat === cat.id || expandedCat === null)
                    .filter(cat => searchQuery || expandedCat === cat.id)
                    .map((cat, ci) => (
                        <div key={ci} style={{ marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                <span style={{ fontSize: 18 }}>{cat.icon}</span>
                                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: theme.text, margin: 0 }}>{cat.title}</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {cat.articles.map((art, ai) => {
                                    const key = `${cat.id}-${ai}`;
                                    return (
                                        <div key={ai} style={{
                                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 16,
                                            overflow: 'hidden',
                                        }}>
                                            <button onClick={() => setExpandedArt(expandedArt === key ? null : key)} style={{
                                                width: '100%', padding: '14px 18px', border: 'none', background: 'transparent',
                                                cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                                textAlign: 'left',
                                            }}>
                                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: theme.text }}>{art.title}</span>
                                                <span style={{ fontSize: 16, color: theme.textFaint, transform: expandedArt === key ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
                                            </button>
                                            {expandedArt === key && (
                                                <div style={{ padding: '0 18px 14px', fontSize: 13, color: theme.textMuted, lineHeight: 1.7 }}>
                                                    {art.content}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                {searchQuery && filteredCategories.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>🔍</span>
                        <p style={{ fontSize: 15, color: theme.textMuted }}>No articles found for &quot;{searchQuery}&quot;</p>
                        <p style={{ fontSize: 13, color: theme.textFaint }}>Try different keywords or <Link href="/support" style={{ color: '#0066FF' }}>contact support</Link></p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
