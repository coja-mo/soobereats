"use client";

import { useState, useEffect, useRef } from 'react';

export function SplashScreen({ onComplete }) {
    const [phase, setPhase] = useState(0); // 0=logo, 1=text, 2=bar, 3=done
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const barRef = useRef(null);

    useEffect(() => {
        // Phase timeline
        const t1 = setTimeout(() => setPhase(1), 300);   // show text
        const t2 = setTimeout(() => setPhase(2), 800);   // start bar
        const t3 = setTimeout(() => setPhase(3), 2200);  // fade out
        const t4 = setTimeout(() => {
            setVisible(false);
            onComplete?.();
        }, 2700);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, [onComplete]);

    // Progress bar animation
    useEffect(() => {
        if (phase < 2) return;
        let start = null;
        let raf;
        const duration = 1200;
        const animate = (ts) => {
            if (!start) start = ts;
            const elapsed = ts - start;
            const pct = Math.min(100, (elapsed / duration) * 100);
            setProgress(pct);
            if (pct < 100) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [phase]);

    if (!visible) return null;

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#09090b',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            opacity: phase === 3 ? 0 : 1,
            transition: 'opacity 0.5s ease',
        }}>
            {/* Glow */}
            <div style={{
                position: 'absolute', width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)',
                filter: 'blur(60px)', pointerEvents: 'none',
            }} />

            {/* Logo Mark */}
            <div style={{
                fontSize: 56, marginBottom: 24,
                opacity: phase >= 0 ? 1 : 0,
                transform: phase >= 0 ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
                ⚡
            </div>

            {/* Brand */}
            <div style={{
                opacity: phase >= 1 ? 1 : 0,
                transform: phase >= 1 ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                textAlign: 'center',
            }}>
                <h1 style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 42, fontWeight: 800,
                    letterSpacing: '-0.04em', color: '#fafafa',
                    margin: '0 0 6px',
                }}>
                    Soob<span style={{
                        background: 'linear-gradient(135deg, #0066FF, #3b82f6)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    }}>é</span>r
                </h1>
                <p style={{
                    fontSize: 13, fontWeight: 500,
                    color: 'rgba(255,255,255,0.35)',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    margin: 0,
                }}>
                    Electric · Local · Yours
                </p>
            </div>

            {/* Progress Bar */}
            <div style={{
                position: 'absolute', bottom: 80,
                width: 200, height: 3, borderRadius: 3,
                background: 'rgba(255,255,255,0.06)',
                overflow: 'hidden',
                opacity: phase >= 2 ? 1 : 0,
                transition: 'opacity 0.3s',
            }}>
                <div ref={barRef} style={{
                    width: `${progress}%`, height: '100%',
                    background: 'linear-gradient(90deg, #0066FF, #3b82f6)',
                    borderRadius: 3,
                    transition: 'width 0.05s linear',
                    boxShadow: '0 0 12px rgba(0,102,255,0.5)',
                }} />
            </div>

            <style>{`
                @keyframes splashPulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
