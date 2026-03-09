"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

export default function LoginPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const accent = '#eab308';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 1500);
    };

    const handleSocialLogin = (provider) => {
        setLoading(true);
        // In production, this would redirect to the OAuth provider
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 1200);
    };

    const inputStyle = {
        width: '100%', padding: '14px 16px', borderRadius: 14,
        border: `1px solid ${theme.borderSubtle}`,
        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
        color: theme.text, fontSize: 15, fontFamily: "'Inter', sans-serif",
        outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box',
    };

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column' }}>

            <div style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: isMobile ? '80px 16px 40px' : '100px 40px 60px',
            }}>
                <div style={{
                    width: '100%', maxWidth: 420,
                }}>
                    {/* Logo / Brand */}
                    <div style={{ textAlign: 'center', marginBottom: 32 }}>
                        <div style={{ fontSize: 40, marginBottom: 8 }}>🔱</div>
                        <h1 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                            fontSize: 28, letterSpacing: '-0.04em', color: theme.text,
                            margin: '0 0 6px',
                        }}>
                            {mode === 'login' ? 'Welcome back' : 'Join Soobér'}
                        </h1>
                        <p style={{ fontSize: 14, color: theme.textMuted, margin: 0 }}>
                            {mode === 'login'
                                ? 'Sign in to your account to continue.'
                                : 'Create your account to get started.'
                            }
                        </p>
                    </div>

                    {/* ═══ SOCIAL LOGIN BUTTONS ═══ */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>

                        {/* Apple Sign-In */}
                        <button onClick={() => handleSocialLogin('apple')} disabled={loading} style={{
                            width: '100%', padding: '14px 20px', borderRadius: 14, border: 'none',
                            background: isDark ? '#fff' : '#000', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            transition: 'all 0.2s', opacity: loading ? 0.6 : 1,
                        }}
                            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'scale(1.01)'; }}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill={isDark ? '#000' : '#fff'}>
                                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            <span style={{
                                fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                                color: isDark ? '#000' : '#fff',
                            }}>
                                Continue with Apple
                            </span>
                        </button>

                        {/* Google Sign-In */}
                        <button onClick={() => handleSocialLogin('google')} disabled={loading} style={{
                            width: '100%', padding: '14px 20px', borderRadius: 14,
                            border: `1px solid ${theme.borderSubtle}`,
                            background: isDark ? 'rgba(255,255,255,0.04)' : '#fff',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            transition: 'all 0.2s', opacity: loading ? 0.6 : 1,
                        }}
                            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.transform = 'scale(1.01)'; }}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span style={{
                                fontWeight: 700, fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                                color: theme.text,
                            }}>
                                Continue with Google
                            </span>
                        </button>
                    </div>

                    {/* ═══ DIVIDER ═══ */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24,
                    }}>
                        <div style={{ flex: 1, height: 1, background: theme.borderSubtle }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            or
                        </span>
                        <div style={{ flex: 1, height: 1, background: theme.borderSubtle }} />
                    </div>

                    {/* ═══ EMAIL FORM ═══ */}
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>

                            {mode === 'signup' && (
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Full Name</label>
                                    <input
                                        type="text" placeholder="Your name"
                                        value={name} onChange={(e) => setName(e.target.value)}
                                        style={inputStyle}
                                        onFocus={(e) => e.target.style.borderColor = accent}
                                        onBlur={(e) => e.target.style.borderColor = theme.borderSubtle}
                                    />
                                </div>
                            )}

                            <div>
                                <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Email</label>
                                <input
                                    type="email" placeholder="you@example.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    style={inputStyle}
                                    onFocus={(e) => e.target.style.borderColor = accent}
                                    onBlur={(e) => e.target.style.borderColor = theme.borderSubtle}
                                />
                            </div>

                            <div style={{ position: 'relative' }}>
                                <label style={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, display: 'block', marginBottom: 6 }}>Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={mode === 'signup' ? 'Create a password' : 'Your password'}
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    style={{ ...inputStyle, paddingRight: 48 }}
                                    onFocus={(e) => e.target.style.borderColor = accent}
                                    onBlur={(e) => e.target.style.borderColor = theme.borderSubtle}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                                    position: 'absolute', right: 14, top: 34, background: 'none', border: 'none',
                                    cursor: 'pointer', fontSize: 14, color: theme.textFaint, padding: 0,
                                }}>
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        {mode === 'login' && (
                            <div style={{ textAlign: 'right', marginBottom: 16 }}>
                                <button type="button" style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontSize: 12, fontWeight: 600, color: accent,
                                    fontFamily: "'DM Sans', sans-serif",
                                }}>
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Submit */}
                        <button type="submit" disabled={loading} style={{
                            width: '100%', padding: '16px', borderRadius: 14, border: 'none',
                            background: success
                                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                                : `linear-gradient(135deg, ${accent}, #ca8a04)`,
                            color: success ? '#fff' : '#000',
                            fontWeight: 800, fontSize: 16, fontFamily: "'DM Sans', sans-serif",
                            letterSpacing: '-0.02em', cursor: loading ? 'wait' : 'pointer',
                            transition: 'all 0.3s', opacity: loading ? 0.7 : 1,
                            boxShadow: `0 4px 20px rgba(234,179,8,0.25)`,
                        }}>
                            {loading ? '...' : success ? '✓ Success!' : mode === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {/* ═══ TOGGLE MODE ═══ */}
                    <div style={{
                        textAlign: 'center', marginTop: 20,
                        fontSize: 13, color: theme.textMuted,
                    }}>
                        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setSuccess(false); }} style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontWeight: 700, color: accent, fontSize: 13,
                            fontFamily: "'DM Sans', sans-serif",
                        }}>
                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </button>
                    </div>

                    {/* ═══ TRUST BADGES ═══ */}
                    <div style={{
                        marginTop: 28, padding: '16px 0',
                        borderTop: `1px solid ${theme.borderSubtle}`,
                        display: 'flex', justifyContent: 'center', gap: isMobile ? 16 : 24,
                        flexWrap: 'wrap',
                    }}>
                        {[
                            { icon: '🔒', label: 'SSL Encrypted' },
                            { icon: '🇨🇦', label: 'Canadian Data' },
                            { icon: '🏔️', label: 'Local Compute' },
                            { icon: '🛡️', label: 'PCI Compliant' },
                        ].map((badge, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 4,
                                fontSize: 10, color: theme.textFaint, fontWeight: 600,
                            }}>
                                <span style={{ fontSize: 12 }}>{badge.icon}</span>
                                {badge.label}
                            </div>
                        ))}
                    </div>

                    {/* Terms */}
                    <p style={{
                        fontSize: 10, color: theme.textFaint, textAlign: 'center', lineHeight: 1.5,
                        marginTop: 12,
                    }}>
                        By continuing, you agree to Soobér&apos;s{' '}
                        <Link href="/terms" style={{ color: accent, textDecoration: 'underline' }}>Terms of Service</Link>{' '}
                        and{' '}
                        <Link href="/privacy" style={{ color: accent, textDecoration: 'underline' }}>Privacy Policy</Link>.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
}
