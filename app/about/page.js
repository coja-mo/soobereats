"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';

export default function AboutPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const pad = isMobile ? '0 16px' : '0 40px';

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', paddingBottom: 100, transition: 'background 0.3s ease' }}>

            {/* Hero */}
            <section style={{
                padding: isMobile ? '60px 0' : '100px 0',
                background: theme.mode === 'dark' ? '#09090b' : '#1c1917',
                color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad, position: 'relative', zIndex: 10 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        padding: '6px 14px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.2)',
                        background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                        color: '#10b981', marginBottom: 24,
                    }}>🌿 Our Story</div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 36 : 56, fontWeight: 700,
                        letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20,
                    }}>Born in the Soo.<br />Built for the Soo.</h1>

                    <p style={{ fontSize: isMobile ? 16 : 18, color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                        We got tired of watching Silicon Valley apps extract 30% from our favourite local restaurants. So we built our own damn platform.
                    </p>
                </div>
            </section>

            {/* The Mission */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 20 }}>The Mission</h2>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: theme.textMuted, lineHeight: 1.8, marginBottom: 24 }}>
                        Sault Ste. Marie has some of the best food in Northern Ontario. Aurora&apos;s legendary Italian. Uncle Gino&apos;s weekend buffets. Tandoori Gardan&apos;s butter chicken. The Saturday Farmers Market vendors who wake up at 4 AM to bring you the freshest produce in Algoma.
                    </p>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: theme.textMuted, lineHeight: 1.8, marginBottom: 24 }}>
                        But when Skip The Dishes and Uber Eats came to town, they didn&apos;t come to celebrate our food culture. They came to extract from it. Thirty cents of every dollar you spent on delivery went straight to San Francisco. Not to the cook who made your meal. Not to the driver who brought it to your door. To shareholders who&apos;ve never tasted a Soo pierogi.
                    </p>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: theme.text, lineHeight: 1.8, fontWeight: 600 }}>
                        Soobér is different because it has to be. We&apos;re 100% locally owned. Our commission rates are half of what the nationals charge. And every dollar we earn stays right here in the Sault.
                    </p>
                </div>
            </section>

            {/* Electric Fleet */}
            <section style={{
                padding: isMobile ? '64px 0' : '100px 0',
                background: theme.mode === 'dark'
                    ? 'linear-gradient(180deg, #09090b 0%, #0a1a0f 50%, #09090b 100%)'
                    : 'linear-gradient(180deg, #fafafa 0%, #ecfdf5 50%, #fafafa 100%)',
                borderTop: `1px solid ${theme.borderSubtle}`,
                borderBottom: `1px solid ${theme.borderSubtle}`,
            }}>
                <div style={{ maxWidth: 1000, margin: '0 auto', padding: pad }}>
                    <div style={{ textAlign: 'center', marginBottom: isMobile ? 40 : 56 }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            padding: '8px 20px', borderRadius: 100,
                            background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                            fontSize: 13, fontWeight: 700, color: '#10b981', marginBottom: 20,
                        }}>⚡ 100% Electric Fleet</div>

                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 42, fontWeight: 700, color: theme.text, letterSpacing: '-0.03em', marginBottom: 16 }}>
                            Zero Emissions.<br />Zero Compromise.
                        </h2>
                        <p style={{ fontSize: isMobile ? 15 : 17, color: theme.textMuted, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
                            Every single delivery on Soobér is made by an electric vehicle. No gas. No tailpipe emissions. Just clean, quiet delivery from your favourite local spots to your front door.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 16 : 24 }}>
                        {[
                            { icon: '🔋', title: 'All-Electric', desc: 'Our entire delivery fleet runs on electricity. EVs, e-bikes, and electric scooters — no exceptions.' },
                            { icon: '🌲', title: 'Northern Ontario Clean', desc: 'Ontario\'s grid is 94% emissions-free. When we charge, we charge clean. Your delivery is genuinely zero-carbon.' },
                            { icon: '🤫', title: 'Quiet Neighbourhoods', desc: 'No diesel engines idling outside your house at 9 PM. Electric delivery means quieter streets for everyone.' },
                        ].map(item => (
                            <div key={item.title} style={{
                                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                                padding: isMobile ? 24 : 32, borderRadius: 24, boxShadow: theme.shadow,
                            }}>
                                <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Soo MRKT Advantage */}
            <section style={{ padding: isMobile ? '64px 0' : '100px 0' }}>
                <div style={{ maxWidth: 800, margin: '0 auto', padding: pad }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 20 }}>The Soo MRKT</h2>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: theme.textMuted, lineHeight: 1.8, marginBottom: 24 }}>
                        Our secret weapon. The Soo MRKT is something no national platform will ever offer — a digital farmers market featuring Sault Ste. Marie&apos;s best artisan vendors. Penokean Hills grass-fed beef. Findlay&apos;s extraordinary mushrooms. Jenn&apos;s hand-laminated croissants. Mountain Maple&apos;s 4th-generation syrup.
                    </p>
                    <p style={{ fontSize: isMobile ? 16 : 18, color: theme.textMuted, lineHeight: 1.8 }}>
                        Every Saturday, these vendors set up at 73 Brock St. Now, with Soobér, you can order their products any day of the week — delivered to your door by our electric fleet, or picked up fresh at the market.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: isMobile ? '40px 0 80px' : '60px 0 100px', textAlign: 'center' }}>
                <div style={{ maxWidth: 600, margin: '0 auto', padding: pad }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 700, color: theme.text, letterSpacing: '-0.02em', marginBottom: 16 }}>Join the Movement</h2>
                    <p style={{ fontSize: 16, color: theme.textMuted, marginBottom: 32 }}>Whether you&apos;re hungry, a restaurant owner, or looking to drive — there&apos;s a place for you here.</p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/" style={{ display: 'inline-block', background: theme.dark, color: theme.darkText, padding: '16px 32px', borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}>Order Now</Link>
                        <Link href="/corporate" style={{ display: 'inline-block', background: 'transparent', color: theme.text, padding: '16px 32px', borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', border: `1.5px solid ${theme.border}` }}>Partner With Us</Link>
                        <Link href="/for-drivers" style={{ display: 'inline-block', background: 'transparent', color: theme.text, padding: '16px 32px', borderRadius: 16, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', border: `1.5px solid ${theme.border}` }}>Drive Electric</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
