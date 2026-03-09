"use client";

import { useState, useEffect } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { hasConsented, setConsent, getConsent } from '../lib/cookies';

export function CookieConsent() {
    const { theme } = useTheme();
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [prefs, setPrefs] = useState({
        essential: true,       // Always on
        preferences: true,     // Theme, vehicle, favorites
        analytics: true,       // Browsing history, recommendations
        marketing: false,      // Promotional (off by default)
    });

    useEffect(() => {
        // Show banner after a short delay if not consented
        const timer = setTimeout(() => {
            if (!hasConsented()) setShow(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleAcceptAll = () => {
        setConsent({ essential: true, preferences: true, analytics: true, marketing: true });
        setShow(false);
    };

    const handleAcceptSelected = () => {
        setConsent(prefs);
        setShow(false);
    };

    const handleEssentialOnly = () => {
        setConsent({ essential: true, preferences: false, analytics: false, marketing: false });
        setShow(false);
    };

    if (!show) return null;

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';

    return (
        <>
            <style>{`
                @keyframes cookieSlideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>
            <div style={{
                position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 99998,
                animation: 'cookieSlideUp 0.4s ease-out',
            }}>
                <div style={{
                    maxWidth: 720, margin: '0 auto 20px', padding: '0 16px',
                }}>
                    <div style={{
                        background: isDark ? 'rgba(24,24,27,0.95)' : 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: 20, border: `1px solid ${theme.borderSubtle}`,
                        boxShadow: '0 -8px 40px rgba(0,0,0,0.15)',
                        padding: '24px 28px',
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                            <span style={{ fontSize: 28 }}>🍪</span>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                                    fontSize: 16, color: theme.text, margin: '0 0 4px',
                                }}>
                                    We use cookies to enhance your experience
                                </h3>
                                <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>
                                    Soobér uses cookies to remember your preferences, improve recommendations, and provide a personalized experience. You can customize which cookies to accept.
                                </p>
                            </div>
                        </div>

                        {/* Expanded preferences */}
                        {expanded && (
                            <div style={{
                                margin: '16px 0', padding: '16px',
                                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                borderRadius: 14, border: `1px solid ${theme.borderSubtle}`,
                            }}>
                                {[
                                    { key: 'essential', label: 'Essential', desc: 'Required for the site to work. Cannot be disabled.', locked: true },
                                    { key: 'preferences', label: 'Preferences', desc: 'Remember your theme, vehicle preferences, favorites, and last ride.' },
                                    { key: 'analytics', label: 'Analytics & Recommendations', desc: 'Track browsing to provide personalized restaurant and ride recommendations.' },
                                    { key: 'marketing', label: 'Marketing', desc: 'Show relevant promotions and partner offers (e.g., Greyhounds game deals).' },
                                ].map((opt) => (
                                    <div key={opt.key} style={{
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        padding: '10px 0', borderBottom: opt.key !== 'marketing' ? `1px solid ${theme.borderSubtle}` : 'none',
                                    }}>
                                        {/* Toggle */}
                                        <button
                                            onClick={() => !opt.locked && setPrefs(p => ({ ...p, [opt.key]: !p[opt.key] }))}
                                            style={{
                                                width: 44, height: 24, borderRadius: 12, border: 'none',
                                                cursor: opt.locked ? 'not-allowed' : 'pointer',
                                                background: prefs[opt.key] ? '#0066FF' : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
                                                position: 'relative', transition: 'background 0.2s ease',
                                                flexShrink: 0, opacity: opt.locked ? 0.6 : 1,
                                            }}
                                        >
                                            <div style={{
                                                width: 18, height: 18, borderRadius: '50%',
                                                background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                                                position: 'absolute', top: 3,
                                                left: prefs[opt.key] ? 23 : 3,
                                                transition: 'left 0.2s ease',
                                            }} />
                                        </button>
                                        <div style={{ flex: 1 }}>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: theme.text, display: 'block' }}>
                                                {opt.label} {opt.locked && <span style={{ fontSize: 10, color: theme.textFaint }}>(Required)</span>}
                                            </span>
                                            <span style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.4 }}>{opt.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Buttons */}
                        <div style={{
                            display: 'flex', gap: 8, flexWrap: 'wrap',
                            marginTop: expanded ? 0 : 16,
                        }}>
                            <button onClick={handleAcceptAll} style={{
                                flex: 1, minWidth: 140, padding: '12px 20px',
                                background: '#0066FF', color: '#fff', border: 'none',
                                borderRadius: 12, fontWeight: 700, fontSize: 13,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                transition: 'transform 0.15s ease',
                            }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Accept All
                            </button>

                            {expanded && (
                                <button onClick={handleAcceptSelected} style={{
                                    flex: 1, minWidth: 140, padding: '12px 20px',
                                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                                    color: theme.text, border: `1px solid ${theme.borderSubtle}`,
                                    borderRadius: 12, fontWeight: 700, fontSize: 13,
                                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                }}>
                                    Accept Selected
                                </button>
                            )}

                            <button onClick={handleEssentialOnly} style={{
                                flex: expanded ? 1 : 'none', minWidth: expanded ? 140 : 'auto',
                                padding: '12px 20px',
                                background: 'transparent', color: theme.textMuted,
                                border: `1px solid ${theme.borderSubtle}`,
                                borderRadius: 12, fontWeight: 600, fontSize: 13,
                                cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                            }}>
                                Essential Only
                            </button>

                            {!expanded && (
                                <button onClick={() => setExpanded(true)} style={{
                                    padding: '12px 20px',
                                    background: 'transparent', color: '#0066FF',
                                    border: 'none', fontWeight: 600, fontSize: 13,
                                    cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                                    textDecoration: 'underline',
                                }}>
                                    Customize
                                </button>
                            )}
                        </div>

                        {/* Footer link */}
                        <p style={{
                            fontSize: 11, color: theme.textFaint, margin: '12px 0 0',
                            textAlign: 'center',
                        }}>
                            By continuing, you agree to our{' '}
                            <a href="/privacy" style={{ color: '#0066FF', textDecoration: 'none' }}>Privacy Policy</a>
                            {' '}and{' '}
                            <a href="/terms" style={{ color: '#0066FF', textDecoration: 'none' }}>Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
