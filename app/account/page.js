"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../../lib/ThemeContext';

export default function AccountPage() {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('orders');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const tabs = [
        { id: 'orders', label: 'Order History', emoji: '📦' },
        { id: 'addresses', label: 'Addresses', emoji: '📍' },
        { id: 'payment', label: 'Payment', emoji: '💳' },
        { id: 'settings', label: 'Settings', emoji: '⚙️' },
    ];

    const cardStyle = {
        background: theme.bgCard,
        border: `1px solid ${theme.borderLight}`,
        borderRadius: 20,
        padding: isMobile ? 16 : 24,
        boxShadow: theme.shadow,
    };

    return (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: isMobile ? '24px 16px 100px' : '40px 40px 100px' }}>

            {/* Profile Header */}
            <div style={{
                background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #1c1917 100%)',
                borderRadius: isMobile ? 24 : 32,
                padding: isMobile ? '24px 20px' : '40px 44px',
                marginBottom: isMobile ? 20 : 32,
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: -50, right: -50,
                    width: 200, height: 200, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(234,179,8,0.12) 0%, transparent 70%)',
                }} />
                <div style={{
                    display: 'flex', alignItems: isMobile ? 'flex-start' : 'center',
                    gap: isMobile ? 16 : 24, position: 'relative',
                    flexDirection: isMobile ? 'column' : 'row',
                }}>
                    <div style={{
                        width: isMobile ? 72 : 100, height: isMobile ? 72 : 100,
                        borderRadius: isMobile ? 20 : 28,
                        background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: isMobile ? 28 : 40, fontWeight: 800, color: '#fff',
                        fontFamily: "'DM Sans', sans-serif",
                        boxShadow: '0 8px 32px rgba(96,165,250,0.3)',
                        flexShrink: 0,
                    }}>CM</div>
                    <div style={{ flex: 1 }}>
                        <h1 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                            fontSize: isMobile ? 24 : 32, letterSpacing: '-0.03em',
                            color: '#fafafa', margin: 0, marginBottom: 6,
                        }}>Cody Mount</h1>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0, marginBottom: 10 }}>cody@antigravitysolutions.ca</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{
                                fontSize: 12, fontWeight: 700, color: '#60a5fa',
                                background: 'rgba(96,165,250,0.15)', padding: '5px 14px', borderRadius: 8,
                                textTransform: 'uppercase', letterSpacing: '0.05em',
                            }}>💎 Soobér Diamond</span>
                            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Member since 2026</span>
                        </div>
                    </div>
                    {!isMobile && (
                        <button style={{
                            padding: '12px 24px', borderRadius: 14,
                            border: '1.5px solid rgba(255,255,255,0.2)',
                            background: 'transparent', color: '#fafafa',
                            fontSize: 14, fontWeight: 600, cursor: 'pointer',
                        }}>Edit Profile</button>
                    )}
                </div>
                {/* Stats */}
                <div style={{
                    display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? 8 : 12, marginTop: isMobile ? 20 : 28,
                }}>
                    {[
                        { emoji: '🛍️', value: '47', label: 'Orders' },
                        { emoji: '💰', value: '$234', label: 'Saved' },
                        { emoji: '❤️', value: '8', label: 'Favorites' },
                        { emoji: '⭐', value: '12', label: 'Reviews' },
                    ].map(stat => (
                        <div key={stat.label} style={{
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: 16, padding: isMobile ? '12px 14px' : '16px 20px',
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            <div style={{ fontSize: isMobile ? 18 : 22, marginBottom: 4 }}>{stat.emoji}</div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 700, color: '#fafafa' }}>{stat.value}</div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tabs */}
            <div style={{
                display: 'flex', gap: 4,
                background: theme.bgAlt, borderRadius: 16, padding: 4,
                marginBottom: isMobile ? 16 : 24,
                border: `1px solid ${theme.borderLight}`,
                overflowX: 'auto',
            }}>
                {tabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                        flex: 1, padding: isMobile ? '10px 8px' : '12px 16px',
                        borderRadius: 12, border: 'none', cursor: 'pointer',
                        fontSize: isMobile ? 12 : 14, fontWeight: 600, whiteSpace: 'nowrap',
                        background: activeTab === tab.id ? theme.bgCard : 'transparent',
                        color: activeTab === tab.id ? theme.text : theme.textFaint,
                        boxShadow: activeTab === tab.id ? theme.shadow : 'none',
                        transition: 'all 0.2s',
                        fontFamily: "'DM Sans', sans-serif",
                    }}>
                        {tab.emoji} {isMobile ? '' : tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'orders' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { name: "Aurora's Restaurant", items: 3, date: 'Mar 7, 2026 at 7:23 PM', total: 52.47, status: 'Delivered', logo: '🍝' },
                        { name: "Sandro's", items: 2, date: 'Mar 5, 2026 at 6:10 PM', total: 38.99, status: 'Delivered', logo: '🍕' },
                        { name: "Tandoori Gardan", items: 4, date: 'Mar 3, 2026 at 8:45 PM', total: 67.20, status: 'Delivered', logo: '🍛' },
                    ].map((order, i) => (
                        <div key={i} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: isMobile ? 12 : 20 }}>
                            <div style={{
                                width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: isMobile ? 14 : 18,
                                background: theme.bgInput, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: isMobile ? 22 : 28, flexShrink: 0,
                            }}>{order.logo}</div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3 }}>{order.name}</h3>
                                <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>{order.items} items · {order.date}</p>
                            </div>
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 15 : 17, fontWeight: 700, color: theme.text }}>${order.total.toFixed(2)}</div>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#22c55e' }}>{order.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'addresses' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { label: 'Home', address: '123 Queen St E, Sault Ste. Marie, ON', isDefault: true },
                        { label: 'Office', address: '456 Northern Ave, Sault Ste. Marie, ON', isDefault: false },
                    ].map((addr, i) => (
                        <div key={i} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: 16, border: addr.isDefault ? `1.5px solid ${theme.accent}` : cardStyle.border }}>
                            <div style={{
                                width: 48, height: 48, borderRadius: 16,
                                background: addr.isDefault ? theme.accentBg : theme.bgInput,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 22, flexShrink: 0,
                            }}>{addr.label === 'Home' ? '🏠' : '🏢'}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0 }}>{addr.label}</h3>
                                    {addr.isDefault && <span style={{ fontSize: 10, fontWeight: 700, color: theme.accent, background: theme.accentBg, padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase' }}>Default</span>}
                                </div>
                                <p style={{ fontSize: 14, color: theme.textMuted, margin: 0 }}>{addr.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'payment' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { type: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
                        { type: 'Mastercard', last4: '8888', expiry: '06/27', isDefault: false },
                    ].map((card, i) => (
                        <div key={i} style={{ ...cardStyle, display: 'flex', alignItems: 'center', gap: 16, border: card.isDefault ? `1.5px solid ${theme.accent}` : cardStyle.border }}>
                            <div style={{
                                width: 56, height: 38, borderRadius: 10,
                                background: card.isDefault ? 'linear-gradient(135deg, #1c1917, #292524)' : theme.bgInput,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 18, flexShrink: 0, color: card.isDefault ? '#fafafa' : theme.textMuted,
                                fontWeight: 800, fontFamily: "'DM Sans', sans-serif",
                            }}>{card.type === 'Visa' ? 'V' : 'MC'}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: theme.text, margin: 0 }}>{card.type} ····{card.last4}</h3>
                                    {card.isDefault && <span style={{ fontSize: 10, fontWeight: 700, color: theme.accent, background: theme.accentBg, padding: '2px 8px', borderRadius: 6, textTransform: 'uppercase' }}>Default</span>}
                                </div>
                                <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>Expires {card.expiry}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'settings' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={cardStyle}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 20 }}>Notifications</h3>
                        {[
                            { label: 'Order Updates', desc: 'Get notified when your order status changes', default: true },
                            { label: 'Promotions', desc: 'Deals and offers from your favorite restaurants', default: true },
                            { label: 'Weekly Digest', desc: 'New restaurants and trending picks in the Soo', default: false },
                        ].map((setting, i) => (
                            <ToggleRow key={i} setting={setting} theme={theme} />
                        ))}
                    </div>
                    <div style={cardStyle}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 16 }}>Dietary Preferences</h3>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Keto', 'Dairy-Free'].map(pref => (
                                <button key={pref} style={{
                                    padding: '8px 18px', borderRadius: 100,
                                    border: `1.5px solid ${theme.border}`,
                                    background: 'transparent', color: theme.textSecondary,
                                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = theme.dark; e.currentTarget.style.color = theme.darkText; e.currentTarget.style.borderColor = theme.dark; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = theme.textSecondary; e.currentTarget.style.borderColor = theme.border; }}
                                >{pref}</button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ToggleRow({ setting, theme }) {
    const [enabled, setEnabled] = useState(setting.default);
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: `1px solid ${theme.borderLight}` }}>
            <div>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 3 }}>{setting.label}</h4>
                <p style={{ fontSize: 13, color: theme.textFaint, margin: 0 }}>{setting.desc}</p>
            </div>
            <button onClick={() => setEnabled(!enabled)} style={{
                width: 52, height: 30, borderRadius: 15, border: 'none', cursor: 'pointer',
                background: enabled ? '#22c55e' : theme.bgInput,
                position: 'relative', transition: 'background 0.2s', flexShrink: 0, marginLeft: 16,
            }}>
                <div style={{
                    width: 24, height: 24, borderRadius: 12, background: '#fff',
                    position: 'absolute', top: 3,
                    left: enabled ? 25 : 3,
                    transition: 'left 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                }} />
            </button>
        </div>
    );
}
