"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { Footer } from '../../components/Footer';

const CAMPAIGN_PHASES = [
    {
        id: 'startup',
        phase: 'Phase 1',
        title: 'Startup & Pitch',
        subtitle: 'Building the Foundation',
        timeline: 'Months 1-2',
        color: '#6366f1',
        icon: '🚀',
        goal: 'Establish brand identity, build investor confidence, and create initial community buzz before anything launches.',
        kpis: ['Brand guideline completion', 'Pitch deck finalized', 'Core team assembled', 'Initial 500 social followers'],
        posts: [
            { type: 'Story', platform: 'Instagram', title: 'Behind the Scenes — Building Soob\u00e9r', desc: 'Candid founder shots. Whiteboard sessions. Late-night coding. Show the grind. Show the passion. Real people building something real for the Soo.', timing: '3x/week', engagement: 'High — authenticity drives connection' },
            { type: 'Reel', platform: 'TikTok + IG', title: '"Why the Soo Deserves Better"', desc: '60-sec video: show screenshots of national apps, fade to our local restaurants, fade to our electric fleet. Emotional hook — pride in the community.', timing: '1x/week', engagement: 'Very High — local pride content goes viral locally' },
            { type: 'Post', platform: 'LinkedIn', title: 'The Anti-Corporate Delivery Platform', desc: 'Long-form thought leadership. Why we charge 15% instead of 30%. Why every dollar stays local. Numbers, data, conviction.', timing: '2x/week', engagement: 'Medium — builds investor and B2B pipeline' },
            { type: 'Post', platform: 'Facebook', title: 'Meet the Team', desc: 'Introduce each team member. Their connection to the Soo. Why they joined. Human faces build trust faster than any logo.', timing: '1x/week', engagement: 'High — people in the Soo know people' },
            { type: 'Thread', platform: 'X/Twitter', title: '10 Things Wrong with Food Delivery', desc: 'Thread laying out the problems: 30% commissions, cold food, overseas support. Position Soob\u00e9r as the solution — thread by thread.', timing: '1x/2 weeks', engagement: 'Medium — builds thought leadership' },
        ],
    },
    {
        id: 'prelaunch',
        phase: 'Phase 2',
        title: 'Pre-Launch Hype',
        subtitle: 'Building the Waitlist',
        timeline: 'Months 3-4',
        color: '#d97706',
        icon: '🔥',
        goal: 'Create massive anticipation. Build a waitlist of 1,000+ customers and onboard 20+ restaurant partners before day one.',
        kpis: ['1,000+ waitlist signups', '20+ partner restaurants signed', '2,000+ social followers', 'Local media coverage'],
        posts: [
            { type: 'Reel', platform: 'Instagram + TikTok', title: '"Something Electric is Coming to the Soo"', desc: 'Teaser video: close-up of EV charging, quick cuts of local restaurants, the Soob\u00e9r logo reveal. Build mystery. Don\'t reveal too much yet.', timing: '2x/week', engagement: 'Very High — mystery + local creates buzz' },
            { type: 'Post', platform: 'All platforms', title: 'Restaurant Partner Reveals', desc: 'Announce each restaurant partner individually with gorgeous food photography. "Aurora\'s is ON Soob\u00e9r" — tag them, let them share.', timing: '3x/week', engagement: 'Very High — restaurants share to their own audience' },
            { type: 'Story', platform: 'Instagram', title: 'Waitlist Countdown', desc: 'Live counter. "247 people are waiting." "500 reached — next 100 unlocks a surprise." Gamify the waitlist.', timing: 'Daily', engagement: 'High — FOMO drives signups' },
            { type: 'Video', platform: 'YouTube + FB', title: 'The Soob\u00e9r Story (Full Pitch)', desc: '3-min documentary-style video. The problem, the vision, the team, the tech, the community impact. This is the pitch video.', timing: 'Once', engagement: 'High — share everywhere, pin it' },
            { type: 'Event', platform: 'Facebook + IG', title: 'Launch Party Announcement', desc: 'Announce the launch event. Location, date, food from partner restaurants. Electric vehicle showcase. Free delivery codes for attendees.', timing: 'Once + reminders', engagement: 'Very High — event-based content performs best' },
            { type: 'Collab', platform: 'Instagram', title: 'Local Influencer Tastings', desc: 'Invite 5-10 local food influencers/bloggers for a private tasting at partner restaurants. They post, tag Soob\u00e9r. Authentic content.', timing: 'Once', engagement: 'Very High — borrowed audience' },
        ],
    },
    {
        id: 'launch',
        phase: 'Phase 3',
        title: 'Go-Live',
        subtitle: 'Launch Week Blitz',
        timeline: 'Week 1',
        color: '#ef4444',
        icon: '⚡',
        goal: 'Maximum visibility during launch week. 500+ orders in first 7 days. Every person in the Soo should hear about Soob\u00e9r.',
        kpis: ['500+ orders in week 1', '100+ app downloads per day', '5,000+ social impressions daily', 'Local news coverage'],
        posts: [
            { type: 'Reel', platform: 'All platforms', title: '"WE\'RE LIVE \u2014 Soob\u00e9r is Here"', desc: 'High-energy launch video. First order being placed. First delivery being made. Reactions from restaurant owners. Celebration vibes.', timing: 'Launch day', engagement: 'Highest — milestone content' },
            { type: 'Story', platform: 'Instagram + FB', title: 'Live Order Tracking', desc: 'Real-time stories showing orders coming in. Driver POV of first deliveries. Customer reactions at their door. Raw and real.', timing: 'All day, launch day', engagement: 'Very High — real-time urgency' },
            { type: 'Post', platform: 'All platforms', title: 'Launch Day Promo Code', desc: '"Use code SOOBER for free delivery on your first 3 orders!" Pin this everywhere. Simple, clear, actionable.', timing: 'Pinned all week', engagement: 'Very High — promo codes drive immediate action' },
            { type: 'Reel', platform: 'TikTok + IG', title: '"We Replaced Uber\'s 30% Cut"', desc: 'Split-screen: what restaurants pay on national apps vs. Soob\u00e9r. Show real dollar amounts. Let restaurant owners react on camera.', timing: 'Day 2-3', engagement: 'Very High — controversy + savings = shares' },
            { type: 'Post', platform: 'Facebook', title: 'Customer Shoutouts', desc: 'Repost every customer photo, review, or mention. "Thank you @sarah for being one of our first 100 orders!" Community validation.', timing: 'Daily', engagement: 'High — social proof builds trust' },
            { type: 'Story', platform: 'IG + TikTok', title: 'Electric Fleet Showcase', desc: 'Film the fleet lined up. Drone shot. Walk around each vehicle. "Your food arrives in THIS." Premium feel, zero emissions messaging.', timing: 'Day 3-4', engagement: 'High — visual wow factor' },
        ],
    },
    {
        id: 'growth',
        phase: 'Phase 4',
        title: 'First 3 Months',
        subtitle: 'Building Momentum',
        timeline: 'Months 2-4 Post-Launch',
        color: '#10b981',
        icon: '📈',
        goal: 'Transition from launch buzz to sustained growth. Build recurring customers, expand partner network, and establish Soob\u00e9r as the default delivery platform for the Soo.',
        kpis: ['5,000+ total orders', '50+ partner restaurants', '10,000+ social followers', '40% repeat order rate'],
        posts: [
            { type: 'Series', platform: 'All platforms', title: '"Meet Your Neighbour" — Weekly Vendor Spotlights', desc: 'Every week, deep-dive into one partner restaurant. Their story, signature dishes, why they chose Soob\u00e9r. Builds emotional connection.', timing: '1x/week', engagement: 'High — ongoing series builds anticipation' },
            { type: 'Reel', platform: 'TikTok + IG', title: '"What $35 Gets You on Soob\u00e9r"', desc: 'Viral format: order, show the unboxing, the food quality, the eco packaging, the seed paper card. Satisfying content that sells itself.', timing: '2x/week', engagement: 'Very High — unboxing content performs great' },
            { type: 'Post', platform: 'All platforms', title: 'Monthly Impact Report', desc: '"This month: 2,400 orders delivered. $0 plastic used. 142 kg CO\u2082 saved. 100% local." Visual infographic. Share the numbers.', timing: '1x/month', engagement: 'High — data-driven content builds credibility' },
            { type: 'Campaign', platform: 'All platforms', title: '"Delivery That Grows" — Seed Paper Campaign', desc: 'Ask customers to plant their seed paper cards and share photos. Repost the best ones. Ongoing UGC campaign that builds organically.', timing: 'Ongoing', engagement: 'Very High — UGC is the most trusted content' },
            { type: 'Story', platform: 'Instagram', title: 'Customer Poll & Choice Series', desc: '"What should we add next? Vote!" Let the community decide features, new restaurant partners, menu items. They own the platform.', timing: '2x/week', engagement: 'High — polls drive engagement metrics' },
            { type: 'Collab', platform: 'All platforms', title: 'Soo Greyhounds Partnership Content', desc: 'Game-day promos. Player meals delivered by Soob\u00e9r. Arena sponsorship content. Tie into the energy of hockey season.', timing: 'During season', engagement: 'Very High — sports + local = peak engagement' },
            { type: 'Post', platform: 'LinkedIn + FB', title: 'Hiring & Growth Updates', desc: '"We\'re hiring 10 more drivers." "3 new restaurants joined this week." Growth content signals momentum and attracts talent.', timing: '1x/week', engagement: 'Medium — important for employer branding' },
            { type: 'Reel', platform: 'TikTok', title: '"A Day in the Life of a Soob\u00e9r Driver"', desc: 'Follow a driver from morning charge to last delivery. Show the EV, the routes, the tips, the community. Humanize the brand.', timing: '1x/2 weeks', engagement: 'Very High — day-in-the-life is trending format' },
        ],
    },
];

const PLATFORM_COLORS = {
    'Instagram': '#E4405F',
    'TikTok': '#000000',
    'TikTok + IG': '#E4405F',
    'Instagram + TikTok': '#E4405F',
    'IG + TikTok': '#E4405F',
    'Instagram + FB': '#1877F2',
    'Facebook': '#1877F2',
    'Facebook + IG': '#1877F2',
    'LinkedIn': '#0A66C2',
    'LinkedIn + FB': '#0A66C2',
    'X/Twitter': '#1DA1F2',
    'YouTube + FB': '#FF0000',
    'All platforms': '#8B5CF6',
};

export default function SocialsPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activePhase, setActivePhase] = useState('startup');
    const [expandedPost, setExpandedPost] = useState(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const phase = CAMPAIGN_PHASES.find(p => p.id === activePhase);
    const violet = '#8B5CF6';
    const violetGlow = 'rgba(139,92,246,0.15)';
    const violetSubtle = 'rgba(139,92,246,0.08)';

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
                    background: `radial-gradient(circle, ${violetGlow} 0%, rgba(139,92,246,0.05) 40%, transparent 70%)`,
                    pointerEvents: 'none', filter: 'blur(60px)',
                }} />

                <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: violetSubtle, border: '1px solid rgba(139,92,246,0.2)',
                        borderRadius: 100, padding: '8px 20px', marginBottom: 24,
                    }}>
                        <span style={{ fontSize: 16 }}>📱</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: violet, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Social Media Strategy</span>
                    </div>

                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                        fontSize: isMobile ? 36 : 64, letterSpacing: '-0.04em',
                        lineHeight: 1.05, color: theme.text, margin: '0 0 16px',
                    }}>
                        Campaign{' '}
                        <span style={{
                            background: `linear-gradient(135deg, ${violet}, #a78bfa, #c4b5fd)`,
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>Playbook</span>
                    </h1>

                    <p style={{ fontSize: isMobile ? 16 : 20, lineHeight: 1.6, color: theme.textMuted, maxWidth: 620, margin: '0 auto 12px' }}>
                        From first pitch to 10,000 customers — our complete social media campaign strategy across <strong style={{ color: theme.text }}>4 phases</strong>.
                    </p>
                    <p style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.6, color: theme.textMuted, maxWidth: 520, margin: '0 auto 28px' }}>
                        Every post, every platform, every timing decision — mapped out and ready to execute.
                    </p>

                    {/* Phase Overview */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 8 : 16, flexWrap: 'wrap' }}>
                        {CAMPAIGN_PHASES.map(p => (
                            <button key={p.id} onClick={() => { setActivePhase(p.id); setExpandedPost(null); }} style={{
                                padding: isMobile ? '10px 14px' : '12px 20px', borderRadius: 14,
                                background: activePhase === p.id ? `${p.color}15` : isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                border: activePhase === p.id ? `2px solid ${p.color}40` : `1px solid ${theme.borderSubtle}`,
                                color: activePhase === p.id ? p.color : theme.textMuted,
                                fontWeight: 700, fontSize: isMobile ? 11 : 13, cursor: 'pointer',
                                fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s ease',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                            }}>
                                <span style={{ fontSize: isMobile ? 20 : 24 }}>{p.icon}</span>
                                <span>{p.title}</span>
                                <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.7 }}>{p.timeline}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ ACTIVE PHASE HEADER ═══ */}
            {phase && (
                <section style={{ padding: isMobile ? '0 16px 24px' : '0 40px 32px', maxWidth: 1440, margin: '0 auto' }}>
                    <div style={{
                        background: isDark ? `linear-gradient(135deg, ${phase.color}08, ${phase.color}03)` : `linear-gradient(135deg, ${phase.color}08, ${phase.color}03)`,
                        border: `1px solid ${phase.color}20`, borderRadius: 24, padding: isMobile ? '24px 20px' : '32px 36px',
                    }}>
                        <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', gap: 16, flexDirection: isMobile ? 'column' : 'row', marginBottom: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <span style={{ fontSize: 36 }}>{phase.icon}</span>
                                <div>
                                    <span style={{ fontSize: 11, fontWeight: 700, color: phase.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{phase.phase} — {phase.timeline}</span>
                                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, color: theme.text, margin: '2px 0 0', letterSpacing: '-0.03em' }}>{phase.title}: {phase.subtitle}</h2>
                                </div>
                            </div>
                        </div>
                        <p style={{ fontSize: 14, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 18px', maxWidth: 700 }}>{phase.goal}</p>
                        <div style={{ display: 'flex', gap: isMobile ? 12 : 20, flexWrap: 'wrap' }}>
                            {phase.kpis.map((kpi, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: theme.textMuted }}>
                                    <span style={{ color: phase.color, fontWeight: 800 }}>✓</span> {kpi}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ CAMPAIGN POSTS DECK ═══ */}
            {phase && (
                <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 20 : 24, color: theme.text, margin: 0, letterSpacing: '-0.03em' }}>
                            📋 Content Deck — {phase.posts.length} Posts
                        </h3>
                        <span style={{ fontSize: 12, fontWeight: 600, color: theme.textFaint, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', padding: '4px 12px', borderRadius: 8 }}>{phase.timeline}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {phase.posts.map((post, i) => {
                            const platColor = PLATFORM_COLORS[post.platform] || violet;
                            const isExpanded = expandedPost === `${phase.id}-${i}`;
                            return (
                                <div key={i} style={{
                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                    border: `1px solid ${isExpanded ? `${phase.color}40` : theme.borderSubtle}`,
                                    borderRadius: 22, padding: isMobile ? 20 : 28,
                                    transition: 'all 0.3s ease', cursor: 'pointer',
                                }}
                                    onClick={() => setExpandedPost(isExpanded ? null : `${phase.id}-${i}`)}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = `${phase.color}44`; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = isExpanded ? `${phase.color}40` : theme.borderSubtle; }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                                        {/* Type badge */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 56, flexShrink: 0 }}>
                                            <span style={{ fontSize: 10, fontWeight: 800, color: phase.color, textTransform: 'uppercase', letterSpacing: '0.05em', background: `${phase.color}12`, padding: '3px 8px', borderRadius: 6 }}>{post.type}</span>
                                            <span style={{ fontSize: 9, fontWeight: 700, color: platColor, opacity: 0.8 }}>{post.platform}</span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: isMobile ? 14 : 16, color: theme.text, margin: 0, letterSpacing: '-0.02em', flex: 1 }}>{post.title}</h4>
                                                <span style={{ fontSize: 14, color: theme.textFaint, transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', marginLeft: 8 }}>▼</span>
                                            </div>
                                            {isExpanded && (
                                                <div style={{ marginTop: 10 }}>
                                                    <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: '0 0 14px' }}>{post.desc}</p>
                                                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                                        <div style={{ fontSize: 12, color: theme.textFaint }}>
                                                            <span style={{ fontWeight: 700, color: theme.textMuted }}>⏰ Timing:</span> {post.timing}
                                                        </div>
                                                        <div style={{ fontSize: 12, color: theme.textFaint }}>
                                                            <span style={{ fontWeight: 700, color: theme.textMuted }}>📊 Expected:</span> {post.engagement}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* ═══ CONTENT CALENDAR OVERVIEW ═══ */}
            <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 24 : 36, letterSpacing: '-0.04em', color: theme.text, margin: '0 0 12px' }}>
                        Platform Strategy
                    </h2>
                    <p style={{ fontSize: 15, color: theme.textMuted, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
                        Each platform has a distinct purpose. Here&apos;s how we use them.
                    </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
                    {[
                        { platform: 'Instagram', icon: '📸', purpose: 'Visual storytelling & community', content: 'Food photography, behind-the-scenes, Reels, Stories, partner spotlights', frequency: '5-7x/week', audience: '18-35, food lovers, local community', color: '#E4405F' },
                        { platform: 'TikTok', icon: '🎵', purpose: 'Viral reach & younger demographic', content: 'Unboxing, day-in-the-life, trend-jacking, local challenges, reaction content', frequency: '3-5x/week', audience: '16-28, trend-driven, discovery', color: '#000000' },
                        { platform: 'Facebook', icon: '👥', purpose: 'Community groups & local events', content: 'Partner announcements, promo codes, community polls, event pages', frequency: '3-4x/week', audience: '25-55, families, established locals', color: '#1877F2' },
                        { platform: 'LinkedIn', icon: '💼', purpose: 'B2B & investor relations', content: 'Growth updates, thought leadership, hiring, partnership announcements', frequency: '2-3x/week', audience: 'Business owners, investors, media', color: '#0A66C2' },
                        { platform: 'YouTube', icon: '🎬', purpose: 'Long-form brand storytelling', content: 'Pitch video, brand documentary, partner stories, eco-impact reports', frequency: '2x/month', audience: 'All demographics, high-intent viewers', color: '#FF0000' },
                        { platform: 'X / Twitter', icon: '🐦', purpose: 'Real-time updates & industry voice', content: 'Launch updates, threads, commentary on delivery industry, customer support', frequency: '3-5x/week', audience: 'Tech-savvy, media, thought leaders', color: '#1DA1F2' },
                    ].map((p, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 22, padding: isMobile ? 24 : 28,
                            borderTop: `3px solid ${p.color}`, transition: 'all 0.3s ease',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = `${p.color}44`; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = theme.borderSubtle; }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                <span style={{ fontSize: 24 }}>{p.icon}</span>
                                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: theme.text }}>{p.platform}</span>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 600, color: p.color, display: 'block', marginBottom: 8 }}>{p.purpose}</span>
                            <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.6, margin: '0 0 14px' }}>{p.content}</p>
                            <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
                                <span style={{ color: theme.textFaint }}>📅 {p.frequency}</span>
                                <span style={{ color: theme.textFaint }}>👥 {p.audience}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ KEY CONTENT THEMES ═══ */}
            <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 24px' }}>
                    🎨 Content Pillars
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 14 }}>
                    {[
                        { emoji: '❤️', title: 'Community Love', desc: 'Stories about the Soo, partner spotlights, customer shoutouts, neighbourhood events', pct: '30%', color: '#ef4444' },
                        { emoji: '🍽️', title: 'Food Porn', desc: 'Gorgeous food photography, unboxings, menu reveals, seasonal specials', pct: '25%', color: '#f59e0b' },
                        { emoji: '🌿', title: 'Sustainability', desc: 'Electric fleet, eco packaging, seed paper stories, impact numbers', pct: '20%', color: '#10b981' },
                        { emoji: '📣', title: 'Promo & Growth', desc: 'Promo codes, new partner announcements, milestones, hiring', pct: '25%', color: '#6366f1' },
                    ].map((p, i) => (
                        <div key={i} style={{
                            background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                            border: `1px solid ${theme.borderSubtle}`, borderRadius: 20, padding: isMobile ? 20 : 24,
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                <span style={{ fontSize: 28 }}>{p.emoji}</span>
                                <span style={{ fontSize: 18, fontWeight: 800, color: p.color, fontFamily: "'DM Sans', sans-serif" }}>{p.pct}</span>
                            </div>
                            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: theme.text, margin: '0 0 6px', letterSpacing: '-0.02em' }}>{p.title}</h4>
                            <p style={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ BRAND VOICE ═══ */}
            <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{
                    background: isDark ? `linear-gradient(135deg, ${violetSubtle}, rgba(139,92,246,0.02))` : 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(139,92,246,0.02))',
                    border: '1px solid rgba(139,92,246,0.15)', borderRadius: 28, padding: isMobile ? '32px 24px' : '48px 48px',
                    position: 'relative', overflow: 'hidden',
                }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${violetGlow} 0%, transparent 60%)`, filter: 'blur(80px)' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: isMobile ? 22 : 28, letterSpacing: '-0.03em', color: theme.text, margin: '0 0 20px' }}>
                            🗣️ Brand Voice Guide
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 16 }}>
                            {[
                                { label: 'Tone', value: 'Confident, warm, local, proud — never corporate', icon: '🎯' },
                                { label: 'Language', value: 'Canadian English (colour, neighbour). Casual but intelligent. No jargon.', icon: '📝' },
                                { label: 'Emojis', value: 'Yes — strategically. 2-3 per post max. Match the energy of the content.', icon: '⚡' },
                                { label: 'Hashtags', value: '#SooberEats #SaultSteMarie #NorthernOntario #EatLocal #ElectricDelivery', icon: '#️⃣' },
                                { label: 'Do', value: 'Be real, be passionate, share the human side, celebrate wins together', icon: '✅' },
                                { label: 'Don\'t', value: 'Never bash competitors directly. Never use stock photos. Never sound corporate.', icon: '🚫' },
                            ].map((v, i) => (
                                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: 20, flexShrink: 0 }}>{v.icon}</span>
                                    <div>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: violet, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: 2 }}>{v.label}</span>
                                        <span style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5 }}>{v.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ CAMPAIGN METRICS OVERVIEW ═══ */}
            <section style={{ padding: isMobile ? '0 16px 60px' : '0 40px 80px', maxWidth: 1440, margin: '0 auto' }}>
                <div style={{ width: '100%', height: 1, marginBottom: isMobile ? 36 : 48, background: `linear-gradient(90deg, transparent, ${theme.borderSubtle}, transparent)` }} />
                <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? 20 : 56, flexWrap: 'wrap' }}>
                    {[
                        { value: '25+', label: 'Content Pieces', color: '#6366f1' },
                        { value: '6', label: 'Platforms', color: '#0066FF' },
                        { value: '4', label: 'Campaign Phases', color: '#d97706' },
                        { value: '6mo', label: 'Total Duration', color: '#10b981' },
                        { value: '10K+', label: 'Follower Target', color: '#ef4444' },
                    ].map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: isMobile ? 24 : 36, fontWeight: 800, fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.03em', color: stat.color }}>{stat.value}</div>
                            <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 4 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
