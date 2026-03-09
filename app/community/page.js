"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import Link from 'next/link';
import { Footer } from '../../components/Footer';

const CATEGORIES = [
    { name: 'Home Bakers & Sweets', emoji: '🍰', count: 34, color: '#f59e0b' },
    { name: 'Crafts & Handmade', emoji: '🧶', count: 52, color: '#ec4899' },
    { name: 'Woodworking & Furniture', emoji: '🪵', count: 18, color: '#92400e' },
    { name: 'Vintage & Thrift', emoji: '👗', count: 87, color: '#a855f7' },
    { name: 'Vehicles & Auto', emoji: '🚗', count: 41, color: '#0066FF' },
    { name: 'Home & Garden', emoji: '🏠', count: 63, color: '#10b981' },
    { name: 'Electronics & Gaming', emoji: '🎮', count: 29, color: '#6366f1' },
    { name: 'Books, Music & Media', emoji: '📚', count: 22, color: '#0891b2' },
    { name: 'Baby & Kids', emoji: '👶', count: 45, color: '#f472b6' },
    { name: 'Pets & Supplies', emoji: '🐕', count: 16, color: '#84cc16' },
    { name: 'Services & Trades', emoji: '🛠️', count: 38, color: '#ef4444' },
    { name: 'Art & Collectibles', emoji: '🎨', count: 27, color: '#d97706' },
];

const FEATURED_LISTINGS = [
    {
        title: 'Homemade Sourdough Bread — Weekly Orders',
        price: '$8',
        seller: 'Sarah K.',
        location: 'West End',
        category: 'Home Bakers',
        emoji: '🍞',
        hot: true,
        desc: 'Fresh loaves every Friday. Wild yeast, local flour. Order by Wednesday.',
    },
    {
        title: 'Hand-Knit Wool Toques — Custom Colours',
        price: '$25',
        seller: 'Marie L.',
        location: 'Steelton',
        category: 'Crafts',
        emoji: '🧶',
        hot: false,
        desc: 'Made with 100% Canadian wool. Perfect for Northern winters. Custom orders welcome.',
    },
    {
        title: '2019 Honda Civic — Low KMs, Certified',
        price: '$16,500',
        seller: 'Dave T.',
        location: 'East End',
        category: 'Vehicles',
        emoji: '🚗',
        hot: true,
        desc: '82,000 km. Safety certified. Winter tires included. One owner, no accidents.',
    },
    {
        title: 'Reclaimed Barn Wood Coffee Table',
        price: '$175',
        seller: 'Mike R.',
        location: 'Goulais River',
        category: 'Woodworking',
        emoji: '🪵',
        hot: false,
        desc: 'Handcrafted from century-old barn wood. Each piece is unique. Can deliver locally.',
    },
    {
        title: 'Vintage Nintendo 64 + 12 Games',
        price: '$120',
        seller: 'Jordan P.',
        location: 'Downtown',
        category: 'Electronics',
        emoji: '🎮',
        hot: false,
        desc: 'All tested and working. Includes GoldenEye, Mario Kart, Zelda OoT. Great condition.',
    },
    {
        title: 'Custom Birchbark Art Prints — Northern Ontario',
        price: '$45',
        seller: 'Alana W.',
        location: 'Garden River',
        category: 'Art',
        emoji: '🎨',
        hot: true,
        desc: 'Original watercolour reproductions on archival paper. Inspired by the Algoma landscape.',
    },
    {
        title: 'Weekly Meal Prep — Italian Family Recipes',
        price: '$35',
        seller: 'Rosa D.',
        location: 'Little Italy',
        category: 'Home Bakers',
        emoji: '🍝',
        hot: false,
        desc: 'Lasagna, meatballs, and Sunday sauce. Made from scratch with love. Feeds 4.',
    },
    {
        title: 'Baby Clothes Bundle — 6-12 Months',
        price: '$30',
        seller: 'Jess H.',
        location: 'West End',
        category: 'Baby & Kids',
        emoji: '👶',
        hot: false,
        desc: '20+ pieces. Gently used. Mix of onesies, sleepers, and outfits. Smoke-free home.',
    },
    {
        title: 'Fresh Perch & Pickerel — Caught This Week',
        price: '$15/lb',
        seller: 'Tom B.',
        location: 'Batchawana Bay',
        category: 'Home Bakers',
        emoji: '🐟',
        hot: true,
        desc: 'Fresh Lake Superior fish. Cleaned and filleted. Pickup in Batch or delivery via Soobér.',
    },
    {
        title: '2015 Ford F-150 XLT — Work Truck',
        price: '$18,900',
        seller: 'Chris G.',
        location: 'East End',
        category: 'Vehicles',
        emoji: '🛻',
        hot: false,
        desc: '178,000 km. 5.0L V8. New brakes, fresh oil. Solid Northern Ontario work truck. Safetied.',
    },
    {
        title: 'Custom Stained Glass Suncatchers',
        price: '$35-65',
        seller: 'Pauline M.',
        location: 'Prince Township',
        category: 'Art',
        emoji: '🌈',
        hot: false,
        desc: 'Handmade with love. Northern nature themes — loons, pines, sunsets. Custom orders 2 weeks.',
    },
    {
        title: 'Firewood — Seasoned Hardwood, Split & Delivered',
        price: '$280/bush cord',
        seller: 'Rick S.',
        location: 'Goulais River',
        category: 'Home',
        emoji: '🪓',
        hot: true,
        desc: 'Maple and birch. Seasoned 12+ months. Split to stove size. Free delivery in city limits.',
    },
    {
        title: 'PS5 + 6 Games — Mint Condition',
        price: '$450',
        seller: 'Alex N.',
        location: 'Downtown',
        category: 'Electronics',
        emoji: '🎮',
        hot: false,
        desc: 'Disc edition. Comes with extra controller, Spider-Man 2, God of War, and more. Like new.',
    },
    {
        title: 'Handmade Dog Bandanas — All Sizes',
        price: '$12',
        seller: 'Carla V.',
        location: 'West End',
        category: 'Pets',
        emoji: '🐕',
        hot: false,
        desc: 'Cotton, snap-on style. Plaid, solid colours, seasonal prints. Custom fabric available.',
    },
    {
        title: 'Snow Removal — Residential Driveways',
        price: '$40/visit',
        seller: 'Jake F.',
        location: 'City-wide',
        category: 'Services',
        emoji: '❄️',
        hot: true,
        desc: 'Reliable same-day service. Seasonal contracts available. Seniors get 20% off. Insured.',
    },
];

const SELLER_SPOTLIGHTS = [
    {
        name: 'Sarah\'s Kitchen',
        owner: 'Sarah K.',
        location: 'West End',
        emoji: '🍞',
        tagline: 'Sourdough, pastries, and weekend specials',
        listings: 12,
        rating: 4.9,
        reviews: 47,
        verified: true,
        story: 'Started baking sourdough during COVID and never stopped. Now I supply half the West End with Friday bread.',
    },
    {
        name: 'Mike\'s Wood Shop',
        owner: 'Mike R.',
        location: 'Goulais River',
        emoji: '🪵',
        tagline: 'Reclaimed wood furniture & cutting boards',
        listings: 8,
        rating: 5.0,
        reviews: 23,
        verified: true,
        story: 'Every piece has a history. I rescue wood from old barns and give it a second life as something beautiful.',
    },
    {
        name: 'Alana\'s Art Studio',
        owner: 'Alana W.',
        location: 'Garden River',
        emoji: '🎨',
        tagline: 'Algoma-inspired watercolours & prints',
        listings: 15,
        rating: 4.8,
        reviews: 31,
        verified: true,
        story: 'I paint what I see on my morning walks along the river. The Algoma landscape speaks for itself.',
    },
];

const BULLETIN_POSTS = [
    { type: 'event', title: 'Community Craft Fair — Mill Market', date: 'Saturday, March 22', emoji: '🎪', desc: '50+ local vendors. Live music, food trucks, and kids activities. Free admission.', color: '#d97706' },
    { type: 'wanted', title: 'ISO: Someone to teach piano lessons', date: 'Ongoing', emoji: '🎹', desc: 'Looking for a patient piano teacher for my 8-year-old. West End preferred. Willing to pay well.', color: '#6366f1' },
    { type: 'free', title: 'Free: Working washer & dryer set', date: 'This weekend', emoji: '🧺', desc: 'Moving and can\'t take them. You pick up from East End. Both work perfectly. First come first served.', color: '#10b981' },
    { type: 'event', title: 'Northern Makers Market — Monthly Pop-Up', date: 'First Saturday of every month', emoji: '🛍️', desc: 'Roberta Bondar Pavilion. Local makers, artisans, and bakers. Support your neighbours!', color: '#d97706' },
    { type: 'lost', title: 'Lost: Orange tabby cat near Queen St', date: 'March 7', emoji: '🐱', desc: 'Answers to "Marmalade." Very friendly, wearing a blue collar. Please call if found!', color: '#ef4444' },
    { type: 'wanted', title: 'Looking for a reliable babysitter', date: 'Weekends', emoji: '👶', desc: 'Two kids (3 and 6). Saturday evenings, 5-10pm. West End. References appreciated.', color: '#6366f1' },
];

const SHOP_STEPS = [
    { step: '01', emoji: '👤', title: 'Create Your Profile', desc: 'Sign up free and tell your community a bit about yourself. Add your photo, your story, and what you sell.' },
    { step: '02', emoji: '📸', title: 'List Your Items', desc: 'Snap photos, set your price, write a description. Our AI helps you write listings that sell.' },
    { step: '03', emoji: '💬', title: 'Connect with Buyers', desc: 'In-app messaging keeps it safe. No sharing personal info until you\'re ready.' },
    { step: '04', emoji: '💰', title: 'Get Paid', desc: 'Meet up locally or arrange delivery through Soobér. Secure payments, zero platform fees. Forever.' },
];

const SAFETY_FEATURES = [
    { emoji: '🤖', title: 'AI Content Moderation', desc: 'Every listing is scanned by our AI before it goes live. Inappropriate, offensive, or prohibited content is automatically flagged and removed.', color: '#6366f1' },
    { emoji: '✅', title: 'Verified Sellers', desc: 'Build trust with verified badges. Sellers can verify their identity to stand out and give buyers confidence in every transaction.', color: '#10b981' },
    { emoji: '🛡️', title: 'Buyer Protection', desc: 'If something isn\'t as described, we\'ve got your back. Report issues directly in-app and our community team responds within hours.', color: '#0066FF' },
    { emoji: '📋', title: 'Community Guidelines', desc: 'Clear rules everyone agrees to. No scams, no counterfeits, no prohibited items. We keep it clean so everyone feels welcome.', color: '#d97706' },
    { emoji: '🚫', title: 'Zero Tolerance Policy', desc: 'Hate speech, harassment, and discrimination have no place here. One strike and you\'re out. This is a safe space for everyone.', color: '#ef4444' },
    { emoji: '📍', title: 'Local-Only Verification', desc: 'Listings are geo-verified to Northern Ontario. No overseas scam operations — just real people in your real community.', color: '#0891b2' },
];

export default function CommunityPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateListing, setShowCreateListing] = useState(false);
    const [savedListings, setSavedListings] = useState([]);
    const [activeTab, setActiveTab] = useState('listings');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const amber = '#d97706';
    const amberGlow = 'rgba(217,119,6,0.15)';
    const amberSubtle = 'rgba(217,119,6,0.08)';

    const filteredListings = FEATURED_LISTINGS.filter(l => {
        const matchesCategory = selectedCategory === 'All' || l.category.toLowerCase().includes(selectedCategory.toLowerCase().split(' ')[0]);
        const matchesSearch = !searchQuery.trim() || l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.desc.toLowerCase().includes(searchQuery.toLowerCase()) || l.seller.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleSave = (i) => {
        setSavedListings(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
    };


return (
    <div style={{ minHeight: '100vh', background: theme.bg, transition: 'background 0.3s ease' }}>

        {/* ═══ HERO ═══ */}
        <section style={{
            position: 'relative', overflow: 'hidden',
            padding: isMobile ? '60px 16px 48px' : '80px 40px 64px',
            textAlign: 'center',
        }}>
            <div style={{
                position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
                width: 900, height: 900, borderRadius: '50%',
                background: `radial-gradient(circle, ${amberGlow} 0%, rgba(217,119,6,0.05) 40%, transparent 70%)`,
                pointerEvents: 'none', filter: 'blur(60px)',
            }} />
            <div style={{
                position: 'absolute', bottom: -100, right: -200,
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
                pointerEvents: 'none', filter: 'blur(80px)',
            }} />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: amberSubtle, border: `1px solid rgba(217,119,6,0.2)`,
                    borderRadius: 100, padding: '8px 20px', marginBottom: 24,
                }}>
                    <span style={{ fontSize: 16 }}>🏘️</span>
                    <span style={{
                        fontSize: 12, fontWeight: 700, color: amber,
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                    }}>Free Community Marketplace</span>
                </div>

                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                    fontSize: isMobile ? 36 : 64, letterSpacing: '-0.04em',
                    lineHeight: 1.05, color: theme.text, margin: '0 0 16px',
                }}>
                    Soobér{' '}
                    <span style={{
                        background: `linear-gradient(135deg, ${amber}, #f59e0b, #fbbf24)`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>Community</span>
                </h1>

                <p style={{
                    fontSize: isMobile ? 16 : 20, lineHeight: 1.6,
                    color: theme.textMuted, maxWidth: 600, margin: '0 auto 12px',
                }}>
                    Buy, sell, and trade with your neighbours. Home bakers, crafters, thrift finds,
                    vehicles — this is <strong style={{ color: theme.text }}>your</strong> neighbourhood marketplace.
                </p>
                <p style={{
                    fontSize: isMobile ? 14 : 16, lineHeight: 1.6,
                    color: theme.textMuted, maxWidth: 520, margin: '0 auto 32px',
                }}>
                    Zero fees. Forever. No catch. Just community helping community.
                </p>

                {/* Search Bar */}
                <div style={{ maxWidth: 560, margin: '0 auto', position: 'relative' }}>
                    <svg style={{
                        position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                        width: 20, height: 20, color: theme.textFaint, pointerEvents: 'none',
                    }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search for anything — sourdough, winter tires, vintage finds..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                            border: `1.5px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                            borderRadius: 16, padding: '16px 20px 16px 52px',
                            fontSize: 15, fontWeight: 500, color: theme.text, outline: 'none',
                            fontFamily: "'Inter', sans-serif",
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            boxSizing: 'border-box',
                        }}
                        onFocus={(e) => { e.target.style.borderColor = amber; e.target.style.boxShadow = `0 0 0 4px ${amberGlow}`; }}
                        onBlur={(e) => { e.target.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>

                {/* Quick Action Buttons */}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setShowCreateListing(true)}
                        style={{
                            padding: '12px 28px', borderRadius: 14,
                            background: `linear-gradient(135deg, ${amber}, #f59e0b)`,
                            color: '#fff', fontWeight: 700, fontSize: 14,
                            fontFamily: "'DM Sans', sans-serif",
                            border: 'none', cursor: 'pointer',
                            boxShadow: `0 4px 16px ${amberGlow}`,
                            transition: 'transform 0.2s ease',
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        ✏️ Post a Listing — Free
                    </button>
                    <button
                        onClick={() => setActiveTab('bulletin')}
                        style={{
                            padding: '12px 28px', borderRadius: 14,
                            background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                            color: theme.text, fontWeight: 700, fontSize: 14,
                            fontFamily: "'DM Sans', sans-serif",
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease, border-color 0.2s',
                            display: 'flex', alignItems: 'center', gap: 8,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.borderColor = amber; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                    >
                        📋 Bulletin Board
                    </button>
                </div>
            </div>
        </section>

        {/* ═══ TAB SWITCHER ═══ */}
        <section style={{ padding: isMobile ? '0 16px 24px' : '0 40px 24px', maxWidth: 1440, margin: '0 auto' }}>
            <div style={{
                display: 'flex', gap: 4, background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                borderRadius: 14, padding: 4, width: 'fit-content',
            }}>
                {[
                    { id: 'listings', label: '🛒 Marketplace', count: FEATURED_LISTINGS.length },
                    { id: 'bulletin', label: '📋 Bulletin Board', count: BULLETIN_POSTS.length },
                    { id: 'sellers', label: '⭐ Seller Spotlights', count: SELLER_SPOTLIGHTS.length },
                ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                        padding: isMobile ? '10px 14px' : '10px 20px', borderRadius: 10,
                        background: activeTab === tab.id ? (isDark ? 'rgba(255,255,255,0.08)' : '#fff') : 'transparent',
                        border: activeTab === tab.id ? `1px solid ${theme.borderSubtle}` : '1px solid transparent',
                        color: activeTab === tab.id ? theme.text : theme.textMuted,
                        fontWeight: activeTab === tab.id ? 700 : 500,
                        fontSize: isMobile ? 12 : 13, cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif", transition: 'all 0.2s ease',
                        boxShadow: activeTab === tab.id ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                    }}>
                        {tab.label}
                        <span style={{
                            marginLeft: 6, fontSize: 10, fontWeight: 700,
                            background: activeTab === tab.id ? `${amber}20` : 'transparent',
                            color: activeTab === tab.id ? amber : theme.textFaint,
                            padding: '2px 7px', borderRadius: 6,
                        }}>{tab.count}</span>
                    </button>
                ))}
            </div>
        </section>

        {/* ═══ CATEGORY GRID ═══ */}
        {activeTab === 'listings' && (
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 24px' }}>Browse by Category</h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 10 : 14 }}>
                    {CATEGORIES.map((cat, i) => (
                        <button key={i} onClick={() => setSelectedCategory(cat.name === selectedCategory ? 'All' : cat.name)} style={{
                            background: selectedCategory === cat.name ? `${cat.color}15` : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: selectedCategory === cat.name ? `2px solid ${cat.color}40` : `1px solid ${theme.borderSubtle}`,
                            borderRadius: 18, padding: isMobile ? '16px 12px' : '20px 16px',
                            cursor: 'pointer', textAlign: 'left', transition: 'all 0.25s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${cat.color}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = selectedCategory === cat.name ? `${cat.color}40` : theme.borderSubtle; }}
                        >
                            <span style={{ fontSize: isMobile ? 24 : 28, display: 'block', marginBottom: 8 }}>{cat.emoji}</span>
                            <span style={{ fontSize: isMobile ? 12 : 14, fontWeight: 700, color: theme.text, display: 'block', lineHeight: 1.3, fontFamily: "'DM Sans', sans-serif" }}>{cat.name}</span>
                            <span style={{ fontSize: 11, color: cat.color, fontWeight: 600, marginTop: 4, display: 'block' }}>{cat.count} listings</span>
                        </button>
                    ))}
                </div>
            </section>
        )}

        {/* ═══ FEATURED LISTINGS ═══ */}
        {activeTab === 'listings' && (
            <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 32, letterSpacing: '-0.03em', color: theme.text, margin: 0 }}>
                            {selectedCategory !== 'All' ? selectedCategory : 'Fresh Listings'}
                        </h2>
                        <span style={{ fontSize: 12, fontWeight: 700, color: theme.textFaint, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', padding: '4px 10px', borderRadius: 8 }}>{filteredListings.length} found</span>
                    </div>
                    {selectedCategory !== 'All' && (
                        <button onClick={() => setSelectedCategory('All')} style={{ background: amberSubtle, border: '1px solid rgba(217,119,6,0.2)', borderRadius: 10, padding: '6px 14px', cursor: 'pointer', fontSize: 12, fontWeight: 700, color: amber }}>✕ Clear Filter</button>
                    )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 14 : 18 }}>
                    {filteredListings.map((listing, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 20 : 24, transition: 'all 0.3s ease', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = `${amber}44`; e.currentTarget.style.boxShadow = `0 12px 40px ${amberGlow}`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            {listing.hot && (<div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '3px 10px', fontSize: 10, fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔥 Hot</div>)}
                            <button onClick={(e) => { e.stopPropagation(); toggleSave(i); }} style={{ position: 'absolute', bottom: 14, right: 14, background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 4, opacity: savedListings.includes(i) ? 1 : 0.4, transition: 'opacity 0.2s, transform 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >{savedListings.includes(i) ? '❤️' : '🤍'}</button>
                            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <div style={{ width: isMobile ? 60 : 80, height: isMobile ? 60 : 80, borderRadius: 16, flexShrink: 0, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? 28 : 36 }}>{listing.emoji}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 17, color: theme.text, margin: '0 0 6px', letterSpacing: '-0.02em', lineHeight: 1.3, paddingRight: listing.hot ? 60 : 0 }}>{listing.title}</h3>
                                    <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: '0 0 10px' }}>{listing.desc}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: 18, fontWeight: 800, color: amber, fontFamily: "'DM Sans', sans-serif" }}>{listing.price}</span>
                                        <span style={{ fontSize: 11, color: theme.textFaint, fontWeight: 600, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', padding: '3px 10px', borderRadius: 8 }}>📍 {listing.location}</span>
                                        <span style={{ fontSize: 11, color: theme.textFaint, fontWeight: 600, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', padding: '3px 10px', borderRadius: 8 }}>👤 {listing.seller}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {filteredListings.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <span style={{ fontSize: 48, display: 'block', marginBottom: 16 }}>🔍</span>
                        <p style={{ fontSize: 16, color: theme.textMuted, fontWeight: 600 }}>No listings found</p>
                        <p style={{ fontSize: 13, color: theme.textFaint }}>Try a different search or category</p>
                    </div>
                )}
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                    <button style={{ padding: '14px 36px', borderRadius: 14, background: `linear-gradient(135deg, ${amber}, #f59e0b)`, color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer', boxShadow: `0 4px 20px ${amberGlow}`, transition: 'transform 0.2s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >View All Listings</button>
                </div>
            </section>
        )}

        {/* ═══ BULLETIN BOARD TAB ═══ */}
        {activeTab === 'bulletin' && (
            <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>📋 Community Bulletin Board</h2>
                <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 28px', lineHeight: 1.6 }}>Events, wanted posts, freebies, and lost &amp; found — like the board at your local grocery store, but better.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {BULLETIN_POSTS.map((post, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 20 : 24, display: 'flex', gap: 16, alignItems: 'flex-start', transition: 'transform 0.2s ease, border-color 0.2s ease', cursor: 'pointer' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${post.color}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, background: `${post.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{post.emoji}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: post.color, textTransform: 'uppercase', letterSpacing: '0.05em', background: `${post.color}12`, padding: '2px 8px', borderRadius: 6 }}>{post.type}</span>
                                    <span style={{ fontSize: 11, color: theme.textFaint }}>{post.date}</span>
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{post.title}</h3>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{post.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 28 }}>
                    <button style={{ padding: '12px 28px', borderRadius: 14, background: amberSubtle, border: '1px solid rgba(217,119,6,0.2)', color: amber, fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'transform 0.2s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >✏️ Post to the Board</button>
                </div>
            </section>
        )}

        {/* ═══ SELLER SPOTLIGHTS TAB ═══ */}
        {activeTab === 'sellers' && (
            <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 32, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 8px' }}>⭐ Seller Spotlights</h2>
                <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 28px', lineHeight: 1.6 }}>Meet the people behind your favourite community shops. Every seller has a story.</p>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 18 }}>
                    {SELLER_SPOTLIGHTS.map((seller, i) => (
                        <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 24, padding: isMobile ? 24 : 32, transition: 'transform 0.3s ease, border-color 0.3s ease', cursor: 'pointer' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = `${amber}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: amberSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>{seller.emoji}</div>
                                <div>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, color: theme.text, margin: '0 0 2px', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: 6 }}>
                                        {seller.name}
                                        {seller.verified && <span title="Verified Seller" style={{ fontSize: 14 }}>✅</span>}
                                    </h3>
                                    <span style={{ fontSize: 12, color: theme.textMuted }}>📍 {seller.location} · {seller.owner}</span>
                                </div>
                            </div>
                            <p style={{ fontSize: 13, color: amber, fontWeight: 600, margin: '0 0 8px' }}>{seller.tagline}</p>
                            <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 16px', fontStyle: 'italic' }}>&ldquo;{seller.story}&rdquo;</p>
                            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: theme.textFaint }}>
                                <span>⭐ {seller.rating}</span>
                                <span>💬 {seller.reviews} reviews</span>
                                <span>📦 {seller.listings} listings</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* ═══ SOOBÉR DELIVERY INTEGRATION ═══ */}
        <section style={{ padding: isMobile ? '24px 16px 60px' : '24px 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ background: isDark ? 'linear-gradient(135deg, rgba(0,102,255,0.06), rgba(0,102,255,0.02))' : 'linear-gradient(135deg, rgba(0,102,255,0.06), rgba(0,102,255,0.02))', border: '1px solid rgba(0,102,255,0.15)', borderRadius: 22, padding: isMobile ? '24px 20px' : '28px 32px', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: 16, flexDirection: isMobile ? 'column' : 'row' }}>
                <span style={{ fontSize: 36 }}>🚗</span>
                <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: theme.text, display: 'block', marginBottom: 4 }}>Need it delivered? Soobér has got you.</span>
                    <span style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5 }}>Sellers and buyers can arrange local delivery through the Soobér fleet. Same-day delivery within city limits. Baked goods, furniture, you name it.</span>
                </div>
                <button style={{ padding: '10px 22px', borderRadius: 12, background: '#0066FF', color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >Learn More</button>
            </div>
        </section>

        {/* ═══ SET UP YOUR SHOP ═══ */}
        <section style={{ padding: isMobile ? '60px 16px' : '80px 40px', maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 48 : 64, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: amberSubtle, border: '1px solid rgba(217,119,6,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 20 }}>
                    <span style={{ fontSize: 16 }}>🛍️</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: amber, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Start Selling Today</span>
                </div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : 44, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 12px', lineHeight: 1.1 }}>
                    Set Up Your{' '}<span style={{ background: `linear-gradient(135deg, ${amber}, #f59e0b)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Shop</span>
                </h2>
                <p style={{ fontSize: isMobile ? 15 : 17, color: theme.textMuted, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
                    Whether you bake pies, knit scarves, restore furniture, or sell your old stuff — your shop is free. <strong style={{ color: theme.text }}>No fees, no cut, no catch.</strong>
                </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 16 }}>
                {SHOP_STEPS.map((item, i) => (
                    <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 24 : 28, position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease, border-color 0.3s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = `${amber}44`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                    >
                        <div style={{ position: 'absolute', top: 12, right: 16, fontSize: 48, fontWeight: 900, color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', fontFamily: "'DM Sans', sans-serif" }}>{item.step}</div>
                        <span style={{ fontSize: 32, display: 'block', marginBottom: 16 }}>{item.emoji}</span>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text, margin: '0 0 8px', letterSpacing: '-0.02em' }}>{item.title}</h3>
                        <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 28, background: isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: 14, flexDirection: isMobile ? 'column' : 'row', textAlign: 'left' }}>
                <span style={{ fontSize: 28 }}>🤖</span>
                <div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: theme.text, display: 'block', marginBottom: 2 }}>AI Listing Assistant</span>
                    <span style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5 }}>Not sure what to write? Our AI helps you craft the perfect listing — generating descriptions, suggesting prices based on local data, and even recommending the best photos to include.</span>
                </div>
            </div>
        </section>

        {/* ═══ AI SAFETY & MODERATION ═══ */}
        <section style={{ padding: isMobile ? '60px 16px' : '80px 40px', maxWidth: 1440, margin: '0 auto', position: 'relative' }}>
            <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 48 : 64, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 100, padding: '8px 20px', marginBottom: 20 }}>
                    <span style={{ fontSize: 16 }}>🛡️</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trust &amp; Safety</span>
                </div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : 44, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 12px', lineHeight: 1.1 }}>
                    Safe by{' '}<span style={{ background: 'linear-gradient(135deg, #10b981, #059669)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Design</span>
                </h2>
                <p style={{ fontSize: isMobile ? 15 : 17, color: theme.textMuted, maxWidth: 540, margin: '0 auto', lineHeight: 1.6 }}>AI-powered moderation and real humans behind the scenes. We keep our community clean, honest, and welcoming for everyone.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                {SAFETY_FEATURES.map((f, i) => (
                    <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 24 : 28, transition: 'transform 0.3s ease, border-color 0.3s ease' }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = `${f.color}44`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                    >
                        <span style={{ fontSize: 28, display: 'block', marginBottom: 14 }}>{f.emoji}</span>
                        <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}>{f.title}</h4>
                        <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* ═══ COMMUNITY SPIRIT / MANIFESTO ═══ */}
        <section style={{ padding: isMobile ? '60px 16px' : '80px 40px', maxWidth: 1440, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 48 : 64, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, borderRadius: '50%', background: `radial-gradient(circle, ${amberGlow} 0%, transparent 60%)`, pointerEvents: 'none', filter: 'blur(100px)' }} />
            <div style={{ position: 'relative', zIndex: 1, background: isDark ? `linear-gradient(135deg, ${amberSubtle}, rgba(217,119,6,0.02))` : 'linear-gradient(135deg, rgba(217,119,6,0.06), rgba(217,119,6,0.02))', border: '1px solid rgba(217,119,6,0.15)', borderRadius: 32, padding: isMobile ? '36px 24px' : '56px 48px', textAlign: 'center' }}>
                <span style={{ fontSize: 48, display: 'block', marginBottom: 20 }}>❤️</span>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 26 : 40, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 16px', lineHeight: 1.1 }}>
                    This is <span style={{ color: amber }}>Our</span> Town
                </h2>
                <div style={{ maxWidth: 640, margin: '0 auto', fontSize: isMobile ? 15 : 17, color: theme.textMuted, lineHeight: 1.8 }}>
                    <p style={{ margin: '0 0 16px' }}>Remember the classified ads in the Sault Star? The bulletin boards at the grocery store? The yard sales on Saturday mornings down every street in the West End?</p>
                    <p style={{ margin: '0 0 16px' }}><strong style={{ color: theme.text }}>That&apos;s what this is.</strong> But better. Because now your neighbour&apos;s fresh-baked butter tarts are just a tap away. That woodworker in Goulais who makes incredible cutting boards? You can find him here.</p>
                    <p style={{ margin: '0 0 16px' }}>We built this because our community deserves a marketplace that actually <strong style={{ color: amber }}>cares</strong>. No corporate fees eating into your earnings. No algorithm hiding your listing unless you pay to boost it.</p>
                    <p style={{ margin: 0 }}>This is <strong style={{ color: theme.text }}>Sault Ste. Marie</strong>. This is <strong style={{ color: theme.text }}>Algoma</strong>. This is <strong style={{ color: theme.text }}>Northern Ontario</strong>. And this marketplace is <strong style={{ color: amber }}>ours</strong>. 🍁</p>
                </div>
            </div>
        </section>

        {/* ═══ WHAT PEOPLE ARE SAYING ═══ */}
        <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                {[
                    { quote: "I've been baking out of my kitchen for 2 years and never had a way to reach people beyond Instagram. Now I have a real shop. This is amazing.", name: 'Sarah K.', role: 'Home Baker · West End', emoji: '🍞' },
                    { quote: "Sold my old snowblower in 2 hours. No fees taken. This is what Kijiji should have been — but it's actually made for us, by us.", name: 'Dan M.', role: 'Community Seller · East End', emoji: '❄️' },
                    { quote: "As a crafter, the zero-fee thing is life-changing. I was paying 15% on other platforms. Here it's free and I can actually talk to my buyers.", name: 'Lisa C.', role: 'Handmade Jewelry · Downtown', emoji: '💎' },
                ].map((t, i) => (
                    <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 24 : 28 }}>
                        <span style={{ fontSize: 28, display: 'block', marginBottom: 12 }}>{t.emoji}</span>
                        <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.7, margin: '0 0 16px', fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</p>
                        <div>
                            <span style={{ fontSize: 14, fontWeight: 700, color: theme.text, display: 'block' }}>{t.name}</span>
                            <span style={{ fontSize: 12, color: theme.textFaint }}>{t.role}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* ═══ COMMUNITY STATS ═══ */}
        <section style={{ padding: isMobile ? '48px 16px' : '64px 40px', maxWidth: 1440, margin: '0 auto' }}>
            <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 20 : 56, flexWrap: 'wrap' }}>
                {[
                    { value: '500+', label: 'Active Listings' },
                    { value: '120+', label: 'Community Sellers' },
                    { value: '$0', label: 'Platform Fees' },
                    { value: '100%', label: 'AI-Moderated' },
                    { value: '24hr', label: 'Avg. Sell Time' },
                ].map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: isMobile ? 24 : 36, fontWeight: 800, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em', color: i === 2 ? amber : theme.text }}>{stat.value}</div>
                        <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section style={{ padding: isMobile ? '48px 16px 64px' : '48px 40px 80px', maxWidth: 1440, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 36, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 12px' }}>Ready to join?</h2>
            <p style={{ fontSize: 15, color: theme.textMuted, margin: '0 0 28px', lineHeight: 1.6 }}>List your first item in under 2 minutes. It&apos;s free, it&apos;s local, and it&apos;s all yours.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => setShowCreateListing(true)} style={{ padding: '16px 40px', borderRadius: 14, background: `linear-gradient(135deg, ${amber}, #f59e0b)`, color: '#fff', fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer', boxShadow: `0 4px 20px ${amberGlow}`, transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >Start Selling — Free</button>
                <button style={{ padding: '16px 40px', borderRadius: 14, background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`, color: theme.text, fontWeight: 700, fontSize: 16, fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.borderColor = amber; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                >Browse Listings</button>
            </div>
        </section>

        {/* ═══ CREATE LISTING MODAL ═══ */}
        {showCreateListing && (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setShowCreateListing(false)}>
                <div style={{ background: theme.bg, borderRadius: 28, padding: isMobile ? 28 : 40, maxWidth: 520, width: '100%', maxHeight: '85vh', overflowY: 'auto', border: `1px solid ${theme.borderSubtle}`, boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 24, color: theme.text, margin: 0, letterSpacing: '-0.03em' }}>✏️ Create Listing</h2>
                        <button onClick={() => setShowCreateListing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 24, color: theme.textMuted, padding: 4 }}>✕</button>
                    </div>
                    {[
                        { label: 'Title', placeholder: 'What are you selling?', type: 'text' },
                        { label: 'Price', placeholder: '$0.00', type: 'text' },
                        { label: 'Category', placeholder: 'Select a category', type: 'select' },
                        { label: 'Description', placeholder: 'Describe your item...', type: 'textarea' },
                        { label: 'Location', placeholder: 'e.g., West End, Downtown', type: 'text' },
                    ].map((field, i) => (
                        <div key={i} style={{ marginBottom: 16 }}>
                            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: theme.text, marginBottom: 6 }}>{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea placeholder={field.placeholder} rows={4} style={{ width: '100%', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 12, padding: '12px 16px', fontSize: 14, color: theme.text, outline: 'none', resize: 'vertical', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }} />
                            ) : field.type === 'select' ? (
                                <select style={{ width: '100%', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 12, padding: '12px 16px', fontSize: 14, color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }}>
                                    <option value="">{field.placeholder}</option>
                                    {CATEGORIES.map((c, j) => <option key={j} value={c.name}>{c.emoji} {c.name}</option>)}
                                </select>
                            ) : (
                                <input type="text" placeholder={field.placeholder} style={{ width: '100%', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', border: `1px solid ${theme.borderSubtle}`, borderRadius: 12, padding: '12px 16px', fontSize: 14, color: theme.text, outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' }} />
                            )}
                        </div>
                    ))}
                    <div style={{ background: isDark ? 'rgba(99,102,241,0.06)' : 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 12, padding: '14px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 18 }}>🤖</span>
                        <span style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }}><strong style={{ color: theme.text }}>AI will review</strong> your listing for quality and safety before it goes live.</span>
                    </div>
                    <button style={{ width: '100%', padding: '14px 0', borderRadius: 14, background: `linear-gradient(135deg, ${amber}, #f59e0b)`, color: '#fff', fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif", border: 'none', cursor: 'pointer', boxShadow: `0 4px 20px ${amberGlow}`, transition: 'transform 0.2s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >Post Listing — Free</button>
                </div>
            </div>
        )}

        <Footer />
    </div>
);
}
