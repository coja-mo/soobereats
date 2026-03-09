'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function CustomerSupport() {
    const [chatMode, setChatMode] = useState("ai"); // 'ai' or 'human'
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([
        { id: 1, sender: "system", role: "ai", name: "SOOber Copilot", text: "Hi Elena! I see you currently have an active ride request (Order #SBR-88219) picking up at 123 Main St. How can I help you today?" }
    ]);

    const [inputText, setInputText] = useState("");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userText = inputText.trim();
        const userTextLower = userText.toLowerCase();

        // Add user message
        const newUserMsg = { id: Date.now(), sender: "user", text: userText };
        setMessages(prev => [...prev, newUserMsg]);
        setInputText("");

        // Simulate response delay
        setTimeout(() => {
            if (chatMode === 'ai') {
                let aiResponseText = "I'm sorry, I didn't quite catch that. Could you rephrase your question, or would you like me to connect you with a live agent for further assistance?";

                // Mock Intelligence Logic
                if (userTextLower.includes('where is') || userTextLower.includes('status') || userTextLower.includes('track') || userTextLower.includes('how long')) {
                    aiResponseText = "I can see your driver, Marcus T., is currently 2 minutes away in a Black GMC Hummer EV. Would you like me to ping him or share his live location link?";
                } else if (userTextLower.includes('refund') || userTextLower.includes('cancel') || userTextLower.includes('wrong') || userTextLower.includes('missing')) {
                    aiResponseText = "I understand you have an issue with your order. Because this involves a potential refund or cancellation for Order #SBR-88219, I can process a standard 100% credit to your SOOber Wallet immediately, or I can connect you to agent Sarah to review the details. What would you prefer?";
                } else if (userTextLower.includes('thank') || userTextLower.includes('ok') || userTextLower.includes('good') || userTextLower.includes('perfect')) {
                    aiResponseText = "You're very welcome! Is there anything else I can assist you with today regarding your SOOber experience?";
                } else if (userTextLower.includes('hello') || userTextLower.includes('hi ') || userTextLower === 'hi') {
                    aiResponseText = "Hi there! How can I help you with your active ride today?";
                } else if (userTextLower.includes('agent') || userTextLower.includes('human') || userTextLower.includes('real person') || userTextLower.includes('representative')) {
                    aiResponseText = "I'd be happy to connect you with a live agent. Please hold for just a moment while I transfer this chat to our local support team in Sault Ste. Marie.";
                    setTimeout(() => setChatMode('human'), 2000); // Auto-switch to human mode
                }

                const aiResponse = {
                    id: Date.now() + 1,
                    sender: "system",
                    role: "ai",
                    name: "SOOber Copilot",
                    text: aiResponseText
                };
                setMessages(prev => [...prev, aiResponse]);
            } else {
                // Human mode simulated response
                const agentResponse = {
                    id: Date.now() + 1,
                    sender: "system",
                    role: "human",
                    name: "Agent Sarah C.",
                    text: "Hi Elena, I'm taking over from the AI. I can see you're looking for Marcus. He just turned onto your street, you should see him in about 30 seconds."
                };
                setMessages(prev => [...prev, agentResponse]);
            }
        }, 800 + Math.random() * 700); // Random delay between 800ms and 1500ms
    };

    return (
        <div className={styles.supportContainer}>
            <div className={styles.chatBox}>
                <header className={styles.chatHeader}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.title}>SOOber Support Center</h1>
                        <span className={styles.subtitle}>Order #SBR-88219</span>
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

                <div className={styles.chatArea}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`${styles.messageRow} ${styles[msg.sender]} ${msg.sender === 'system' ? styles[msg.role] : ''}`}>
                            <div className={styles.bubble}>
                                {msg.sender === 'system' && <span className={styles.senderName}>{msg.name}</span>}
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.inputArea}>
                    <form onSubmit={handleSend} className={styles.inputWrapper}>
                        <input
                            type="text"
                            className={styles.textInput}
                            placeholder={chatMode === 'ai' ? "Ask the AI Copilot..." : "Message Agent Sarah..."}
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
                    Secure Chat Environment • Processed purely on <span>Local Node #04</span> • Max Data Privacy
                </div>
            </div>
        </div>
    );
}
