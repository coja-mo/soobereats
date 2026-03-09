"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

const VALID_PINS = ['800895', '051995'];
const PIN_LENGTH = 6;
const STORAGE_KEY = 'soober-pin-unlocked';

export function PinGate({ children }) {
    const [unlocked, setUnlocked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored === 'true') {
            setUnlocked(true);
        }
        setMounted(true);
    }, []);

    const handleSuccess = useCallback(() => {
        setSuccess(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');
        setTimeout(() => setUnlocked(true), 600);
    }, []);

    const handleChange = useCallback((index, value) => {
        if (!/^\d*$/.test(value)) return;

        const digit = value.slice(-1);
        setError(false);

        setPin(prev => {
            const newPin = [...prev];
            newPin[index] = digit;

            // Check if PIN is complete
            const fullPin = newPin.join('');
            if (fullPin.length === PIN_LENGTH && newPin.every(d => d !== '')) {
                if (fullPin === MASTER_PIN) {
                    handleSuccess();
                } else {
                    setError(true);
                    setShake(true);
                    setTimeout(() => {
                        setShake(false);
                        setPin(['', '', '', '', '', '']);
                        inputRefs.current[0]?.focus();
                    }, 600);
                }
            }

            return newPin;
        });

        // Move to next input
        if (digit && index < PIN_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [handleSuccess]);

    const handleKeyDown = useCallback((index, e) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setPin(prev => {
                const newPin = [...prev];
                newPin[index - 1] = '';
                return newPin;
            });
        }
    }, [pin]);

    const handlePaste = useCallback((e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, PIN_LENGTH);
        if (!pasted) return;

        const newPin = [...pin];
        for (let i = 0; i < pasted.length; i++) {
            newPin[i] = pasted[i];
        }
        setPin(newPin);

        if (pasted.length === PIN_LENGTH) {
            if (pasted === MASTER_PIN) {
                handleSuccess();
            } else {
                setError(true);
                setShake(true);
                setTimeout(() => {
                    setShake(false);
                    setPin(['', '', '', '', '', '']);
                    inputRefs.current[0]?.focus();
                }, 600);
            }
        } else {
            inputRefs.current[Math.min(pasted.length, PIN_LENGTH - 1)]?.focus();
        }
    }, [pin, handleSuccess]);

    // Don't render anything until mounted (avoid hydration mismatch)
    if (!mounted) {
        return null;
    }

    if (unlocked) {
        return children;
    }

    return (
        <div style={overlayStyle}>
            {/* Animated background particles */}
            <div style={particlesContainerStyle}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} style={{
                        ...particleStyle,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        animationDelay: `${Math.random() * 6}s`,
                        animationDuration: `${Math.random() * 4 + 4}s`,
                    }} />
                ))}
            </div>

            <div style={{
                ...cardStyle,
                animation: shake ? 'pinShake 0.5s ease-in-out' : success ? 'pinSuccess 0.6s ease-out' : 'pinFadeIn 0.5s ease-out',
            }}>
                {/* Lock Icon */}
                <div style={lockIconContainerStyle}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: success ? '#22c55e' : '#eab308' }}>
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                <h1 style={titleStyle}>
                    {success ? 'Access Granted' : 'Enter Access PIN'}
                </h1>
                <p style={subtitleStyle}>
                    {success ? 'Welcome back' : 'This site is protected. Enter your 6-digit PIN to continue.'}
                </p>

                {/* PIN Input */}
                <div style={pinContainerStyle} onPaste={handlePaste}>
                    {pin.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="tel"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            autoFocus={index === 0}
                            style={{
                                ...pinInputStyle,
                                borderColor: error ? '#ef4444' : digit ? '#eab308' : 'rgba(255,255,255,0.12)',
                                background: digit ? 'rgba(234,179,8,0.08)' : 'rgba(255,255,255,0.04)',
                                color: error ? '#ef4444' : '#fafafa',
                                boxShadow: digit ? '0 0 20px rgba(234,179,8,0.15)' : 'none',
                            }}
                            aria-label={`PIN digit ${index + 1}`}
                        />
                    ))}
                </div>

                {error && (
                    <p style={errorStyle}>Incorrect PIN. Please try again.</p>
                )}

                {/* Dots indicator */}
                <div style={dotsContainerStyle}>
                    {pin.map((digit, i) => (
                        <div key={i} style={{
                            ...dotStyle,
                            background: digit ? '#eab308' : 'rgba(255,255,255,0.15)',
                            transform: digit ? 'scale(1.3)' : 'scale(1)',
                        }} />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes pinFadeIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes pinShake {
                    0%, 100% { transform: translateX(0); }
                    10%, 50%, 90% { transform: translateX(-8px); }
                    30%, 70% { transform: translateX(8px); }
                }
                @keyframes pinSuccess {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                    100% { transform: scale(0.95); opacity: 0; }
                }
                @keyframes pinFloat {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
                    50% { transform: translateY(-30px) rotate(180deg); opacity: 0.8; }
                }
                @keyframes pinPulseGlow {
                    0%, 100% { box-shadow: 0 0 30px rgba(234,179,8,0.1); }
                    50% { box-shadow: 0 0 60px rgba(234,179,8,0.2); }
                }
                input:focus {
                    outline: none;
                    border-color: #eab308 !important;
                    box-shadow: 0 0 0 3px rgba(234,179,8,0.15), 0 0 20px rgba(234,179,8,0.1) !important;
                }
            `}</style>
        </div>
    );
}

// --- Styles ---

const overlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, #09090b 0%, #111113 40%, #1a1510 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    WebkitFontSmoothing: 'antialiased',
};

const particlesContainerStyle = {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
};

const particleStyle = {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(234,179,8,0.3)',
    animation: 'pinFloat 6s ease-in-out infinite',
};

const cardStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: 420,
    padding: '48px 40px 40px',
    borderRadius: 24,
    background: 'rgba(24,24,27,0.6)',
    backdropFilter: 'blur(40px)',
    WebkitBackdropFilter: 'blur(40px)',
    border: '1px solid rgba(255,255,255,0.08)',
    textAlign: 'center',
    animation: 'pinPulseGlow 4s ease-in-out infinite',
};

const lockIconContainerStyle = {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'rgba(234,179,8,0.1)',
    border: '1px solid rgba(234,179,8,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
};

const titleStyle = {
    fontSize: 24,
    fontWeight: 700,
    color: '#fafafa',
    margin: '0 0 8px',
    letterSpacing: '-0.02em',
};

const subtitleStyle = {
    fontSize: 14,
    color: '#a1a1aa',
    margin: '0 0 32px',
    lineHeight: 1.5,
};

const pinContainerStyle = {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 16,
};

const pinInputStyle = {
    width: 48,
    height: 56,
    borderRadius: 12,
    border: '2px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.04)',
    color: '#fafafa',
    fontSize: 22,
    fontWeight: 600,
    textAlign: 'center',
    transition: 'all 0.2s ease',
    fontFamily: "'Inter', monospace",
    caretColor: '#eab308',
};

const errorStyle = {
    fontSize: 13,
    color: '#ef4444',
    margin: '8px 0 0',
    fontWeight: 500,
};

const dotsContainerStyle = {
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    marginTop: 24,
};

const dotStyle = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    transition: 'all 0.2s ease',
};
