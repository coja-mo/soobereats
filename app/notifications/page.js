"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const NOTIFICATION_GROUPS = [
    {
        title: 'Orders & Delivery',
        icon: '📦',
        settings: [
            { key: 'order_updates', label: 'Order status updates', desc: 'Preparing, en route, delivered', default: true },
            { key: 'order_offers', label: 'Promotions & deals', desc: 'Discounts, free delivery, flash sales', default: true },
            { key: 'order_rating', label: 'Rate your order', desc: 'Post-delivery rating reminders', default: true },
            { key: 'order_reorder', label: 'Reorder suggestions', desc: 'Based on your order history', default: false },
        ]
    },
    {
        title: 'Rides',
        icon: '🚗',
        settings: [
            { key: 'ride_updates', label: 'Ride status updates', desc: 'Driver assigned, arriving, completed', default: true },
            { key: 'ride_receipts', label: 'Ride receipts', desc: 'Fare breakdown after each ride', default: true },
            { key: 'ride_promos', label: 'Ride promotions', desc: 'Discounted rides, airport specials', default: false },
        ]
    },
    {
        title: 'Rewards & Loyalty',
        icon: '⭐',
        settings: [
            { key: 'rewards_points', label: 'Points earned', desc: 'Notifications when you earn points', default: true },
            { key: 'rewards_tier', label: 'Tier milestones', desc: 'When you reach a new loyalty tier', default: true },
            { key: 'rewards_expiry', label: 'Points expiring soon', desc: '30-day warning before points expire', default: true },
        ]
    },
    {
        title: 'Community & Social',
        icon: '🤝',
        settings: [
            { key: 'community_new', label: 'New marketplace listings', desc: 'Items posted near you', default: false },
            { key: 'community_events', label: 'Local events', desc: 'Community happenings and event shuttles', default: true },
            { key: 'referral_rewards', label: 'Referral updates', desc: 'When friends sign up using your code', default: true },
        ]
    },
    {
        title: 'Account & Security',
        icon: '🔒',
        settings: [
            { key: 'security_login', label: 'Login alerts', desc: 'New device or location sign-ins', default: true },
            { key: 'security_password', label: 'Password changes', desc: 'Confirmation when password is updated', default: true },
            { key: 'account_newsletter', label: 'Newsletter', desc: 'Monthly updates from the Soobér team', default: false },
        ]
    },
];

export default function NotificationsPage() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [isMobile, setIsMobile] = useState(false);
    const [prefs, setPrefs] = useState({});
    const [saved, setSaved] = useState(false);
    const blue = '#0066FF';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Initialize defaults
    useEffect(() => {
        const defaults = {};
        NOTIFICATION_GROUPS.forEach(g => g.settings.forEach(s => { defaults[s.key] = s.default; }));
        setPrefs(defaults);
    }, []);

    const togglePref = (key) => {
        setPrefs(p => ({ ...p, [key]: !p[key] }));
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div style={{ minHeight: '100vh', background: theme.bg }}>
            {/* ═══ HERO ═══ */}
            <section style={{ textAlign: 'center', padding: isMobile ? '60px 16px 40px' : '80px 40px 48px' }}>
                <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 28 : 40, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 8px' }}>
                    Notification Preferences
                </h1>
                <p style={{ fontSize: 14, color: theme.textMuted, maxWidth: 420, margin: '0 auto' }}>
                    Choose what you want to hear about. You can change these anytime.
                </p>
            </section>

            {/* ═══ SETTINGS ═══ */}
            <section style={{ padding: isMobile ? '0 16px 48px' : '0 40px 64px', maxWidth: 700, margin: '0 auto' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {NOTIFICATION_GROUPS.map((group, gi) => (
                        <div key={gi} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22,
                            overflow: 'hidden',
                        }}>
                            {/* Group Header */}
                            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.borderSubtle}`, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <span style={{ fontSize: 20 }}>{group.icon}</span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: theme.text }}>{group.title}</span>
                            </div>

                            {/* Settings */}
                            {group.settings.map((setting, si) => (
                                <div key={si} style={{
                                    padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    borderBottom: si < group.settings.length - 1 ? `1px solid ${theme.borderSubtle}` : 'none',
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: theme.text }}>{setting.label}</div>
                                        <div style={{ fontSize: 12, color: theme.textFaint }}>{setting.desc}</div>
                                    </div>
                                    <button onClick={() => togglePref(setting.key)} style={{
                                        width: 44, height: 24, borderRadius: 12, border: 'none',
                                        background: prefs[setting.key] ? blue : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'),
                                        cursor: 'pointer', position: 'relative',
                                        transition: 'background 0.2s',
                                        flexShrink: 0, marginLeft: 12,
                                    }}>
                                        <div style={{
                                            width: 18, height: 18, borderRadius: '50%', background: '#fff',
                                            position: 'absolute', top: 3,
                                            left: prefs[setting.key] ? 23 : 3,
                                            transition: 'left 0.2s',
                                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                                        }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Save Button */}
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <button onClick={handleSave} style={{
                        padding: '14px 40px', borderRadius: 14, border: 'none',
                        background: saved ? '#22c55e' : blue,
                        color: '#fff', fontWeight: 700, fontSize: 15,
                        fontFamily: "'DM Sans', sans-serif",
                        cursor: 'pointer', transition: 'all 0.3s',
                        boxShadow: `0 4px 16px ${saved ? 'rgba(34,197,94,0.3)' : 'rgba(0,102,255,0.3)'}`,
                    }}>
                        {saved ? '✓ Preferences Saved' : 'Save Preferences'}
                    </button>
                </div>
            </section>

            <Footer />
        </div>
    );
}
