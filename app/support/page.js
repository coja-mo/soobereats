'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';
import { processMessage, ConversationContext } from '../../lib/ai-engine';
import { Footer } from '../../components/Footer';

// ══════════════════════════════════════════════════════════════════════════════
// QUICK ACTION CHIPS
// ══════════════════════════════════════════════════════════════════════════════

const QUICK_ACTIONS = [
    { label: '📍 Where is my order?', message: 'Where is my order right now?' },
    { label: '💳 I need a refund', message: 'I need a refund for my last order' },
    { label: '🚗 Book a ride', message: 'I want to book a ride' },
    { label: '🏆 My rewards', message: 'What are my rewards and loyalty status?' },
    { label: '📦 Missing items', message: 'My order is missing items' },
    { label: '🤝 Talk to agent', message: 'Can I talk to a real person?' },
    { label: '✈️ Airport transfer', message: 'I need an airport transfer' },
    { label: '🏘️ Community marketplace', message: 'Tell me about the community marketplace' },
];

export default function SupportPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [chatMode, setChatMode] = useState('ai');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(true);
    const contextRef = useRef(new ConversationContext());
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const accent = '#00ccff';

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Initial greeting
    useEffect(() => {
        const hour = new Date().getHours();
        const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
        setMessages([{
            id: 1, sender: 'system', role: 'ai', name: 'Soobér Copilot',
            text: `${timeGreeting}! 👋 I'm the **Soobér AI Copilot** — powered by local M2 Ultra compute right here in the Soo.\n\nI can help with order tracking, refunds, ride booking, rewards, and much more. What can I do for you?`,
            suggestions: ['Where is my order?', 'I need a refund', 'Book a ride', 'Check my rewards'],
            timestamp: Date.now(),
        }]);
    }, []);

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    }, []);

    useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

    const handleSend = useCallback((e, overrideText) => {
        if (e) e.preventDefault();
        const userText = (overrideText || inputText).trim();
        if (!userText) return;

        // Add user message
        const userMsg = {
            id: Date.now(), sender: 'user', text: userText,
            timestamp: Date.now(),
        };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsTyping(true);
        setShowQuickActions(false);

        // Process through AI engine
        setTimeout(() => {
            if (chatMode === 'ai') {
                const result = processMessage(userText, contextRef.current);

                const aiMsg = {
                    id: Date.now() + 1,
                    sender: 'system',
                    role: 'ai',
                    name: 'Soobér Copilot',
                    text: result.response.text,
                    actions: result.response.actions,
                    suggestions: result.response.suggestions,
                    card: result.response.card,
                    intent: result.intent,
                    confidence: result.confidence,
                    sentiment: result.sentiment?.label,
                    timestamp: Date.now(),
                };
                setMessages(prev => [...prev, aiMsg]);

                // Auto-escalate if intent is to talk to agent
                if (result.response.meta?.switchToHuman) {
                    setTimeout(() => {
                        setChatMode('human');
                        setMessages(prev => [...prev, {
                            id: Date.now() + 2,
                            sender: 'system', role: 'human', name: 'Agent Sarah C.',
                            text: "Hi there! I'm Sarah, based right here in Sault Ste. Marie. I've reviewed your full conversation with our AI Copilot and have all the context. How can I help?",
                            timestamp: Date.now(),
                        }]);
                    }, 2500);
                }
            } else {
                // Human agent mode
                const agentResponses = [
                    "Absolutely, let me look into that for you right away. I can see your full history here.",
                    "I understand completely. Let me pull up the details and get this sorted.",
                    "Great question! Here's what I can tell you...",
                ];
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: 'system', role: 'human', name: 'Agent Sarah C.',
                    text: agentResponses[Math.floor(Math.random() * agentResponses.length)],
                    timestamp: Date.now(),
                }]);
            }
            setIsTyping(false);
        }, 600 + Math.random() * 800);
    }, [inputText, chatMode]);

    const handleActionClick = useCallback((action) => {
        if (action.type === 'link') {
            window.location.href = action.href;
        } else if (action.action === 'escalate') {
            handleSend(null, 'I want to talk to a real person');
        } else {
            // Simulate action confirmation
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'system', role: 'ai', name: 'Soobér Copilot',
                text: `✅ Done! I've initiated **${action.label.replace(/^[^\w]+/, '')}** for you. You should see the update shortly.`,
                timestamp: Date.now(),
            }]);
        }
    }, [handleSend]);

    // ══════════════════════════════════════════════════════════════════════════
    // RENDER
    // ══════════════════════════════════════════════════════════════════════════

    const renderMarkdown = (text) => {
        // Simple bold + newline support
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');
    };

    return (
        <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', flexDirection: 'column' }}>

            {/* ═══ CHAT CONTAINER ═══ */}
            <div style={{
                flex: 1, maxWidth: 960, width: '100%', margin: '0 auto',
                display: 'flex', flexDirection: 'column',
                paddingTop: isMobile ? 60 : 70,
                height: 'calc(100vh - 0px)',
            }}>

                {/* ─── Header ─── */}
                <div style={{
                    padding: isMobile ? '12px 16px' : '16px 24px',
                    borderBottom: `1px solid ${theme.borderSubtle}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                    flexShrink: 0,
                }}>
                    <div>
                        <h1 style={{
                            fontFamily: "'DM Sans', sans-serif", fontWeight: 800,
                            fontSize: isMobile ? 18 : 22, color: theme.text, margin: 0,
                            letterSpacing: '-0.03em',
                        }}>
                            Soobér Support
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                            <div style={{
                                width: 7, height: 7, borderRadius: '50%',
                                background: chatMode === 'ai' ? accent : '#22c55e',
                                boxShadow: `0 0 8px ${chatMode === 'ai' ? accent : '#22c55e'}`,
                            }} />
                            <span style={{ fontSize: 11, color: theme.textMuted, fontWeight: 600 }}>
                                {chatMode === 'ai' ? 'AI Copilot • Local Compute • M2 Ultra' : 'Live Agent — Sarah C. • Sault Ste. Marie'}
                            </span>
                        </div>
                    </div>

                    {/* Mode Toggle */}
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setChatMode('ai')} style={{
                            padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                            background: chatMode === 'ai' ? accent : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                            color: chatMode === 'ai' ? '#000' : theme.textMuted,
                            fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                            transition: 'all 0.2s',
                        }}>
                            ◆ AI
                        </button>
                        <button onClick={() => setChatMode('human')} style={{
                            padding: '6px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                            background: chatMode === 'human' ? '#22c55e' : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                            color: chatMode === 'human' ? '#000' : theme.textMuted,
                            fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                            transition: 'all 0.2s',
                        }}>
                            ● Agent
                        </button>
                    </div>
                </div>

                {/* ─── Quick Actions Bar ─── */}
                {showQuickActions && (
                    <div style={{
                        display: 'flex', gap: 6, padding: '10px 16px',
                        overflowX: 'auto', WebkitOverflowScrolling: 'touch',
                        borderBottom: `1px solid ${theme.borderSubtle}`,
                        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                        flexShrink: 0, scrollbarWidth: 'none',
                    }}>
                        {QUICK_ACTIONS.map((qa, i) => (
                            <button key={i} onClick={() => handleSend(null, qa.message)} style={{
                                whiteSpace: 'nowrap', padding: '6px 12px', borderRadius: 8,
                                border: `1px solid ${theme.borderSubtle}`,
                                background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                                color: theme.textMuted, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                                fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}15`; e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.color = accent; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.color = theme.textMuted; }}
                            >
                                {qa.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* ─── Chat Messages ─── */}
                <div style={{
                    flex: 1, padding: isMobile ? '16px 12px' : '20px 24px',
                    overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16,
                }}>
                    {messages.map((msg) => (
                        <div key={msg.id} style={{
                            display: 'flex',
                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            width: '100%',
                        }}>
                            <div style={{ maxWidth: isMobile ? '90%' : '75%' }}>

                                {/* Sender name */}
                                {msg.sender === 'system' && (
                                    <div style={{
                                        fontSize: 10, fontWeight: 700, color: theme.textFaint,
                                        marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6,
                                    }}>
                                        {msg.role === 'ai' ? '◆' : '●'} {msg.name}
                                        {msg.confidence !== undefined && (
                                            <span style={{
                                                fontSize: 9, padding: '1px 6px', borderRadius: 4,
                                                background: msg.confidence > 0.6 ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
                                                color: msg.confidence > 0.6 ? '#22c55e' : '#eab308',
                                                fontWeight: 600,
                                            }}>
                                                {Math.round(msg.confidence * 100)}% match
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Message bubble */}
                                <div style={{
                                    padding: isMobile ? '10px 14px' : '12px 18px',
                                    borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                    fontSize: 14, lineHeight: 1.6,
                                    background: msg.sender === 'user'
                                        ? (isDark ? '#fff' : '#111')
                                        : msg.role === 'ai'
                                            ? (isDark ? 'rgba(0,204,255,0.06)' : 'rgba(0,102,204,0.04)')
                                            : (isDark ? 'rgba(34,197,94,0.06)' : 'rgba(34,197,94,0.04)'),
                                    color: msg.sender === 'user'
                                        ? (isDark ? '#000' : '#fff')
                                        : theme.text,
                                    border: msg.sender === 'system'
                                        ? `1px solid ${msg.role === 'ai' ? `${accent}22` : 'rgba(34,197,94,0.15)'}`
                                        : 'none',
                                }}>
                                    <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                                </div>

                                {/* Order Tracking Card */}
                                {msg.card?.type === 'order_tracking' && (
                                    <div style={{
                                        marginTop: 8, padding: 14, borderRadius: 14,
                                        background: isDark ? 'rgba(0,204,255,0.04)' : 'rgba(0,102,204,0.03)',
                                        border: `1px solid ${accent}22`,
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>{msg.card.orderId}</span>
                                            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: '#22c55e15', color: '#22c55e' }}>{msg.card.status}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: 16, fontSize: 11, color: theme.textMuted }}>
                                            <div>🚗 {msg.card.driver}</div>
                                            <div>🔋 {msg.card.vehicle}</div>
                                            <div>⏱️ {msg.card.eta}</div>
                                        </div>
                                        {/* Progress bar */}
                                        <div style={{ marginTop: 10, height: 4, borderRadius: 2, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}>
                                            <div style={{ height: '100%', width: '72%', borderRadius: 2, background: `linear-gradient(90deg, ${accent}, #22c55e)`, transition: 'width 1s ease' }} />
                                        </div>
                                        <div style={{ fontSize: 9, color: theme.textFaint, marginTop: 4 }}>Order 72% complete — driver en route</div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                {msg.actions && msg.actions.length > 0 && (
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                                        {msg.actions.map((action, i) => (
                                            action.type === 'link' ? (
                                                <Link key={i} href={action.href} style={{
                                                    padding: '6px 12px', borderRadius: 8, fontSize: 11,
                                                    fontWeight: 700, textDecoration: 'none',
                                                    background: isDark ? 'rgba(0,204,255,0.08)' : 'rgba(0,102,204,0.06)',
                                                    border: `1px solid ${accent}33`,
                                                    color: accent, fontFamily: "'DM Sans', sans-serif",
                                                    transition: 'all 0.2s',
                                                }}>
                                                    {action.label}
                                                </Link>
                                            ) : (
                                                <button key={i} onClick={() => handleActionClick(action)} style={{
                                                    padding: '6px 12px', borderRadius: 8, fontSize: 11,
                                                    fontWeight: 700, cursor: 'pointer',
                                                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                                    border: `1px solid ${theme.borderSubtle}`,
                                                    color: theme.textMuted, fontFamily: "'DM Sans', sans-serif",
                                                    transition: 'all 0.2s',
                                                }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.color = accent; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.color = theme.textMuted; }}
                                                >
                                                    {action.label}
                                                </button>
                                            )
                                        ))}
                                    </div>
                                )}

                                {/* Suggestion Chips */}
                                {msg.suggestions && msg.suggestions.length > 0 && (
                                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                                        {msg.suggestions.map((s, i) => (
                                            <button key={i} onClick={() => handleSend(null, s)} style={{
                                                padding: '4px 10px', borderRadius: 6, fontSize: 10,
                                                fontWeight: 600, cursor: 'pointer',
                                                background: 'transparent',
                                                border: `1px dashed ${theme.borderSubtle}`,
                                                color: theme.textFaint, fontFamily: "'DM Sans', sans-serif",
                                                transition: 'all 0.2s',
                                            }}
                                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.color = accent; e.currentTarget.style.borderStyle = 'solid'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.borderSubtle; e.currentTarget.style.color = theme.textFaint; e.currentTarget.style.borderStyle = 'dashed'; }}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Timestamp */}
                                {msg.timestamp && (
                                    <div style={{ fontSize: 9, color: theme.textFaint, marginTop: 4, opacity: 0.6 }}>
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <div style={{ maxWidth: '75%' }}>
                                <div style={{ fontSize: 10, fontWeight: 700, color: theme.textFaint, marginBottom: 4 }}>
                                    {chatMode === 'ai' ? '◆ Soobér Copilot' : '● Agent Sarah C.'}
                                </div>
                                <div style={{
                                    padding: '12px 18px', borderRadius: '16px 16px 16px 4px',
                                    background: isDark ? 'rgba(0,204,255,0.06)' : 'rgba(0,102,204,0.04)',
                                    border: `1px solid ${chatMode === 'ai' ? `${accent}22` : 'rgba(34,197,94,0.15)'}`,
                                    display: 'flex', gap: 4, alignItems: 'center',
                                }}>
                                    {[0, 1, 2].map(i => (
                                        <div key={i} style={{
                                            width: 6, height: 6, borderRadius: '50%',
                                            background: chatMode === 'ai' ? accent : '#22c55e',
                                            animation: 'typingBounce 1.4s infinite ease-in-out',
                                            animationDelay: `${i * 0.16}s`,
                                        }} />
                                    ))}
                                    <style jsx>{`
                                        @keyframes typingBounce {
                                            0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
                                            40% { transform: scale(1); opacity: 1; }
                                        }
                                    `}</style>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* ─── Input Area ─── */}
                <div style={{
                    padding: isMobile ? '10px 12px' : '12px 24px',
                    borderTop: `1px solid ${theme.borderSubtle}`,
                    background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                    flexShrink: 0,
                }}>
                    <form onSubmit={handleSend} style={{
                        display: 'flex', gap: 8, alignItems: 'center',
                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                        borderRadius: 14, padding: '4px 4px 4px 16px',
                        border: `1px solid ${theme.borderSubtle}`,
                        transition: 'border 0.2s',
                    }}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder={chatMode === 'ai' ? "Ask the AI Copilot anything..." : "Message Agent Sarah C..."}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            style={{
                                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                fontSize: 14, color: theme.text, fontFamily: "'Inter', sans-serif",
                                padding: '8px 0',
                            }}
                        />
                        <button type="submit" style={{
                            width: 36, height: 36, borderRadius: 10, border: 'none',
                            background: inputText.trim() ? `linear-gradient(135deg, ${accent}, #0088cc)` : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                            color: inputText.trim() ? '#fff' : theme.textFaint,
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s', flexShrink: 0,
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </form>

                    {/* Privacy footer */}
                    <div style={{
                        textAlign: 'center', padding: '8px 0 4px', fontSize: 10, color: theme.textFaint,
                    }}>
                        Encrypted • Processed on <span style={{ color: accent, fontWeight: 700 }}>Local Node #04 (M2 Ultra)</span> • 100% Data Sovereignty • Algoma District
                    </div>
                </div>
            </div>
        </div>
    );
}
