"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '../lib/ThemeContext';
import { processMessage, ConversationContext } from '../lib/ai-engine';

/**
 * Floating AI Chat Widget — renders on every page
 * A minimized chat bubble that expands to a full chat panel
 */
export default function AIChatWidget() {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
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

    // Initialize with greeting
    useEffect(() => {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
        setMessages([{
            id: 1, sender: 'system', role: 'ai', name: 'Soobér Copilot',
            text: `Good ${greeting}! 👋 I'm the Soobér AI Copilot. Ask me anything — orders, rides, rewards, or more.`,
            suggestions: ['Where is my order?', 'Book a ride', 'My rewards'],
        }]);
    }, []);

    const scrollToBottom = useCallback(() => {
        setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }, []);

    useEffect(() => { if (isOpen) scrollToBottom(); }, [messages, isOpen, scrollToBottom]);

    useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

    const handleSend = useCallback((e, overrideText) => {
        if (e) e.preventDefault();
        const text = (overrideText || inputText).trim();
        if (!text) return;

        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text }]);
        setInputText('');
        setIsTyping(true);

        setTimeout(() => {
            const result = processMessage(text, contextRef.current);
            setMessages(prev => [...prev, {
                id: Date.now() + 1, sender: 'system', role: 'ai', name: 'Soobér Copilot',
                text: result.response.text,
                actions: result.response.actions,
                suggestions: result.response.suggestions,
            }]);
            setIsTyping(false);
        }, 500 + Math.random() * 700);
    }, [inputText]);

    const renderMarkdown = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br />');
    };

    // Don't render on /support (has its own full chat)
    if (typeof window !== 'undefined' && window.location.pathname === '/support') {
        return null;
    }

    return (
        <>
            {/* ═══ CHAT PANEL ═══ */}
            {isOpen && (
                <div style={{
                    position: 'fixed', zIndex: 99998,
                    bottom: isMobile ? 0 : 88, right: isMobile ? 0 : 20,
                    width: isMobile ? '100%' : 380, height: isMobile ? '100vh' : 520,
                    borderRadius: isMobile ? 0 : 20,
                    background: isDark ? '#0a0a0a' : '#fff',
                    border: isMobile ? 'none' : `1px solid ${theme.borderSubtle}`,
                    boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'chatSlideIn 0.25s ease-out',
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        borderBottom: `1px solid ${theme.borderSubtle}`,
                        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                        flexShrink: 0,
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                                width: 8, height: 8, borderRadius: '50%',
                                background: accent, boxShadow: `0 0 8px ${accent}`,
                            }} />
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 800, color: theme.text, fontFamily: "'DM Sans', sans-serif" }}>
                                    Soobér Copilot
                                </div>
                                <div style={{ fontSize: 9, color: theme.textFaint }}>AI • Local Compute • Always On</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Link href="/support" style={{
                                fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                                color: theme.textFaint, textDecoration: 'none',
                            }}>
                                Full Chat ↗
                            </Link>
                            <button onClick={() => setIsOpen(false)} style={{
                                width: 28, height: 28, borderRadius: 8, border: 'none',
                                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                                color: theme.textMuted, cursor: 'pointer', fontSize: 14,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>✕</button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1, padding: '12px', overflowY: 'auto',
                        display: 'flex', flexDirection: 'column', gap: 10,
                    }}>
                        {messages.map(msg => (
                            <div key={msg.id} style={{
                                display: 'flex',
                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            }}>
                                <div style={{ maxWidth: '85%' }}>
                                    <div style={{
                                        padding: '8px 12px', borderRadius: 12, fontSize: 13, lineHeight: 1.5,
                                        borderBottomRightRadius: msg.sender === 'user' ? 3 : 12,
                                        borderBottomLeftRadius: msg.sender === 'system' ? 3 : 12,
                                        background: msg.sender === 'user'
                                            ? (isDark ? '#fff' : '#111')
                                            : (isDark ? 'rgba(0,204,255,0.06)' : 'rgba(0,102,204,0.04)'),
                                        color: msg.sender === 'user' ? (isDark ? '#000' : '#fff') : theme.text,
                                        border: msg.sender === 'system' ? `1px solid ${accent}15` : 'none',
                                    }}>
                                        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }} />
                                    </div>

                                    {/* Action buttons */}
                                    {msg.actions && (
                                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 }}>
                                            {msg.actions.slice(0, 3).map((action, i) => (
                                                action.type === 'link' ? (
                                                    <Link key={i} href={action.href} style={{
                                                        padding: '4px 8px', borderRadius: 6, fontSize: 9,
                                                        fontWeight: 700, textDecoration: 'none',
                                                        background: `${accent}10`, border: `1px solid ${accent}25`,
                                                        color: accent,
                                                    }}>{action.label}</Link>
                                                ) : (
                                                    <button key={i} style={{
                                                        padding: '4px 8px', borderRadius: 6, fontSize: 9,
                                                        fontWeight: 700, cursor: 'pointer',
                                                        background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                                        border: `1px solid ${theme.borderSubtle}`,
                                                        color: theme.textMuted,
                                                    }}>{action.label}</button>
                                                )
                                            ))}
                                        </div>
                                    )}

                                    {/* Suggestion chips */}
                                    {msg.suggestions && (
                                        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: 4 }}>
                                            {msg.suggestions.map((s, i) => (
                                                <button key={i} onClick={() => handleSend(null, s)} style={{
                                                    padding: '3px 7px', borderRadius: 5, fontSize: 9,
                                                    fontWeight: 600, cursor: 'pointer',
                                                    background: 'transparent', border: `1px dashed ${theme.borderSubtle}`,
                                                    color: theme.textFaint, transition: 'all 0.2s',
                                                }}>{s}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div style={{
                                display: 'flex', gap: 4, padding: '8px 12px',
                                background: isDark ? 'rgba(0,204,255,0.06)' : 'rgba(0,102,204,0.04)',
                                borderRadius: 12, borderBottomLeftRadius: 3, width: 'fit-content',
                                border: `1px solid ${accent}15`,
                            }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} style={{
                                        width: 5, height: 5, borderRadius: '50%', background: accent,
                                        animation: `widgetBounce 1.4s infinite ease-in-out`,
                                        animationDelay: `${i * 0.16}s`,
                                    }} />
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: '8px 12px', borderTop: `1px solid ${theme.borderSubtle}`,
                        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                        flexShrink: 0,
                    }}>
                        <form onSubmit={handleSend} style={{
                            display: 'flex', gap: 6, alignItems: 'center',
                            background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                            borderRadius: 10, padding: '3px 3px 3px 12px',
                            border: `1px solid ${theme.borderSubtle}`,
                        }}>
                            <input
                                ref={inputRef} type="text" placeholder="Ask anything..."
                                value={inputText} onChange={(e) => setInputText(e.target.value)}
                                style={{
                                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                                    fontSize: 13, color: theme.text, padding: '6px 0',
                                }}
                            />
                            <button type="submit" style={{
                                width: 30, height: 30, borderRadius: 8, border: 'none',
                                background: inputText.trim() ? accent : 'transparent',
                                color: inputText.trim() ? '#000' : theme.textFaint,
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s', flexShrink: 0,
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* ═══ FLOATING BUTTON ═══ */}
            <button
                onClick={() => { setIsOpen(!isOpen); setHasNewMessage(false); }}
                style={{
                    position: 'fixed', bottom: 20, right: 20, zIndex: 99999,
                    width: 52, height: 52, borderRadius: 16, border: 'none',
                    background: isOpen
                        ? (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)')
                        : `linear-gradient(135deg, ${accent}, #0088cc)`,
                    color: isOpen ? theme.textMuted : '#fff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isOpen ? 'none' : `0 4px 20px rgba(0,204,255,0.3)`,
                    transition: 'all 0.25s ease',
                    fontSize: 22,
                }}
            >
                {isOpen ? '✕' : '◆'}
                {hasNewMessage && !isOpen && (
                    <div style={{
                        position: 'absolute', top: -2, right: -2,
                        width: 12, height: 12, borderRadius: '50%', background: '#ef4444',
                        border: '2px solid ' + theme.bg,
                    }} />
                )}
            </button>

            {/* Animations */}
            <style jsx global>{`
                @keyframes chatSlideIn {
                    from { opacity: 0; transform: translateY(10px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes widgetBounce {
                    0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </>
    );
}
