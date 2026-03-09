'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

/* ─── Smart AI Response Engine ─── */
const AI_RESPONSES = {
    tracking: [
        "I can see your driver, Marcus T., is currently 2 minutes away in a Black GMC Hummer EV. He's turning onto Main St now. Would you like me to share his live location link?",
        "Your order #ORD-4012 is en route! Driver D-014 (Anika R.) is 4 minutes away with your Pino's grocery items. Everything was confirmed packed fresh.",
        "Your ride is being dispatched now. Expected pickup in 3 minutes at your saved address. Vehicle: Cadillac VISTIQ (Pearl White).",
    ],
    refund: [
        "I understand the concern. Since this involves a potential issue with your order, I can offer:\n\n• **Full credit** to your SOOber Wallet (instant)\n• **Partial refund** to original payment method (1-2 business days)\n• **Connect to Agent Sarah** for a detailed review\n\nWhich would you prefer?",
        "I see the missing item — Organic 2% Milk ($5.99) from Pino's. I've already issued a $5.99 credit to your SOOber Wallet. Is there anything else I can help with?",
    ],
    greeting: [
        "Hi there! I'm the SOOber AI Copilot, powered by local M2 Ultra compute right here in the Soo. How can I help you today?",
        "Welcome back! I can see you're a valued member. How can I assist you today?",
    ],
    agent: [
        "Absolutely — connecting you with a live agent right now. Agent Sarah C. is based right here in Sault Ste. Marie and will have full context of our conversation. One moment...",
    ],
    thanks: [
        "You're very welcome! Remember, you can always access support through the app or type here. Have a great day! 💚",
    ],
    delivery: [
        "Great news — we now deliver to Garden River First Nation, Goulais River, and Echo Bay! Premium rates apply for extended distance, but every restaurant and market vendor is available. Want me to update your delivery address?",
    ],
    fallback: [
        "I'm not quite sure about that one. Let me connect you with a live agent who can help — they're local to Sault Ste. Marie and will have the answer. Would you like me to transfer?",
    ],
};

function getAIResponse(text) {
    const t = text.toLowerCase();
    if (t.includes('where') || t.includes('status') || t.includes('track') || t.includes('how long') || t.includes('driver') || t.includes('eta'))
        return AI_RESPONSES.tracking[Math.floor(Math.random() * AI_RESPONSES.tracking.length)];
    if (t.includes('refund') || t.includes('cancel') || t.includes('wrong') || t.includes('missing') || t.includes('cold') || t.includes('late'))
        return AI_RESPONSES.refund[Math.floor(Math.random() * AI_RESPONSES.refund.length)];
    if (t.includes('hello') || t.includes('hi') || t.includes('hey'))
        return AI_RESPONSES.greeting[Math.floor(Math.random() * AI_RESPONSES.greeting.length)];
    if (t.includes('agent') || t.includes('human') || t.includes('real person') || t.includes('representative') || t.includes('talk to'))
        return AI_RESPONSES.agent[0];
    if (t.includes('thank') || t.includes('ok') || t.includes('perfect') || t.includes('great'))
        return AI_RESPONSES.thanks[0];
    if (t.includes('garden river') || t.includes('goulais') || t.includes('echo bay') || t.includes('deliver to'))
        return AI_RESPONSES.delivery[0];
    return AI_RESPONSES.fallback[0];
}

const QUICK_ACTIONS = [
    { label: '📍 Where is my order?', message: 'Where is my order right now?' },
    { label: '💳 I need a refund', message: 'I need a refund for my last order' },
    { label: '🗣️ Talk to an agent', message: 'Can I talk to a real person?' },
    { label: '🚗 Track my ride', message: 'Where is my driver right now?' },
    { label: '📦 Missing items', message: 'My order is missing items' },
    { label: '🏘️ Delivery to Garden River?', message: 'Do you deliver to Garden River First Nation?' },
];

export default function CustomerSupport() {
    const [chatMode, setChatMode] = useState("ai");
    const messagesEndRef = useRef(null);
    const [messages, setMessages] = useState([
        {
            id: 1, sender: "system", role: "ai", name: "SOOber Copilot",
            text: "Hi! I'm the SOOber AI Copilot — powered by local compute right here in the Soo. I can see your recent activity and I'm ready to help. What's on your mind?"
        }
    ]);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => { scrollToBottom(); }, [messages]);

    const handleSend = (e, overrideText) => {
        if (e) e.preventDefault();
        const userText = (overrideText || inputText).trim();
        if (!userText) return;

        const newUserMsg = { id: Date.now(), sender: "user", text: userText };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText("");
        setIsTyping(true);

        setTimeout(() => {
            if (chatMode === 'ai') {
                const responseText = getAIResponse(userText);

                // Check if user wants an agent
                if (userText.toLowerCase().includes('agent') || userText.toLowerCase().includes('human') || userText.toLowerCase().includes('real person')) {
                    setTimeout(() => setChatMode('human'), 2500);
                }

                const aiResponse = {
                    id: Date.now() + 1,
                    sender: "system",
                    role: "ai",
                    name: "SOOber Copilot",
                    text: responseText,
                };
                setMessages(prev => [...prev, aiResponse]);
            } else {
                const agentResponse = {
                    id: Date.now() + 1,
                    sender: "system",
                    role: "human",
                    name: "Agent Sarah C.",
                    text: "Hi there! I'm taking over from the AI. I've got the full context of your conversation. Let me look into this for you right away.",
                };
                setMessages(prev => [...prev, agentResponse]);
            }
            setIsTyping(false);
        }, 800 + Math.random() * 900);
    };

    return (
        <div className={styles.supportContainer}>
            <div className={styles.chatBox}>
                <header className={styles.chatHeader}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.title}>SOOber Support Center</h1>
                        <span className={styles.subtitle}>
                            {chatMode === 'ai' ? '◆ AI Copilot Active • Local Compute' : '● Live Agent — Sarah C. (Sault Ste. Marie)'}
                        </span>
                    </div>
                    <div className={styles.headerRight}>
                        <button
                            className={`${styles.pillBtn} ${chatMode === 'ai' ? styles.active : ''}`}
                            onClick={() => setChatMode('ai')}
                        >
                            <div className={styles.statusIndicator} style={{ marginRight: '0.5rem', background: '#00ccff', boxShadow: '0 0 8px #00ccff' }}></div>
                            AI Copilot
                        </button>
                        <button
                            className={`${styles.pillBtn} ${chatMode === 'human' ? styles.active : ''}`}
                            onClick={() => setChatMode('human')}
                        >
                            <div className={styles.statusIndicator} style={{ marginRight: '0.5rem' }}></div>
                            Live Agent
                        </button>
                    </div>
                </header>

                {/* Quick Actions */}
                <div className={styles.quickActions}>
                    {QUICK_ACTIONS.map((action, i) => (
                        <button key={i} className={styles.quickBtn} onClick={() => handleSend(null, action.message)}>
                            {action.label}
                        </button>
                    ))}
                </div>

                <div className={styles.chatArea}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`${styles.messageRow} ${styles[msg.sender]} ${msg.sender === 'system' ? styles[msg.role] : ''}`}>
                            <div className={styles.bubble}>
                                {msg.sender === 'system' && <span className={styles.senderName}>{msg.name}</span>}
                                <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className={`${styles.messageRow} ${styles.system} ${styles[chatMode === 'ai' ? 'ai' : 'human']}`}>
                            <div className={styles.bubble}>
                                <span className={styles.senderName}>{chatMode === 'ai' ? 'SOOber Copilot' : 'Agent Sarah C.'}</span>
                                <div className={styles.typingIndicator}>
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.inputArea}>
                    <form onSubmit={handleSend} className={styles.inputWrapper}>
                        <input
                            type="text"
                            className={styles.textInput}
                            placeholder={chatMode === 'ai' ? "Ask the AI Copilot anything..." : "Message Agent Sarah C..."}
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <button type="submit" className={styles.sendBtn}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>

                <div className={styles.privacyFooter}>
                    Secure Chat Environment • Processed purely on <span>Local Node #04 (M2 Ultra)</span> • 100% Data Sovereignty • Algoma District
                </div>
            </div>
        </div>
    );
}
