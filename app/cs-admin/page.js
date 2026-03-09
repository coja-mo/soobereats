'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function CSAdminDashboard() {
    const [activeChat, setActiveChat] = useState("chat-1");

    const queue = [
        { id: "chat-1", customer: "Elena R.", issue: "Driver couldn't find building", waitTime: "2 min", urgent: true },
        { id: "chat-2", customer: "Thomas M.", issue: "Missing item in grocery order", waitTime: "5 min", urgent: false },
        { id: "chat-3", customer: "Sarah K.", issue: "Payment method failed", waitTime: "8 min", urgent: false },
    ];

    const messages = [
        { id: 1, sender: "customer", text: "Hi, I'm waiting outside but I don't see the car.", time: "11:02 AM" },
        { id: 2, sender: "ai", text: "AI Copilot: The driver (Marcus T.) is 2 minutes away, currently turning onto Main St. Should I send an automated update to the customer?", time: "11:02 AM" },
        { id: 3, sender: "agent", text: "Hi Elena! Checking on your driver now.", time: "11:03 AM" },
        { id: 4, sender: "agent", text: "Marcus is just turning onto Main St and will be there in about 2 minutes. He is driving a Black GMC Hummer EV.", time: "11:03 AM" },
    ];

    return (
        <div className={styles.csContainer}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo}>SOOber Support</div>
                    <div className={styles.badge}>CS Command Center</div>
                </div>

                <div className={styles.agentProfile}>
                    <span className={styles.agentName}>Agent: Sarah Connor</span>
                    <div className={styles.avatar}>SC</div>
                    <Link href="/">
                        <button style={{
                            background: '#000',
                            border: 'none',
                            color: '#fff',
                            padding: '0.4rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginLeft: '1rem',
                            fontSize: '0.8rem'
                        }}>
                            Exit CRM
                        </button>
                    </Link>
                </div>
            </header>

            <main className={styles.mainGrid}>
                {/* Left Panel: Active Queue */}
                <section className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Active Queue (3)</h2>
                    </header>
                    <div className={`${styles.panelContent} ${styles.queueList}`}>
                        {queue.map(item => (
                            <div
                                key={item.id}
                                className={`${styles.queueItem} ${activeChat === item.id ? styles.active : ''}`}
                                onClick={() => setActiveChat(item.id)}
                            >
                                <div className={styles.queueTop}>
                                    <span className={styles.custName}>{item.customer}</span>
                                    <span className={styles.waitTime}>{item.waitTime}</span>
                                </div>
                                <div className={styles.queuePreview}>{item.issue}</div>
                                {item.urgent && <span className={`${styles.tag} ${styles.urgent}`}>Urgent</span>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Center Panel: Active Chat */}
                <section className={styles.panel}>
                    <div className={styles.chatContainer}>
                        <header className={styles.chatHeader}>
                            <h2 className={styles.chatTitle}>Elena R.</h2>
                            <div className={styles.chatSubtitle}>Order #SBR-88219 • Ride to SOOber Airport</div>
                        </header>

                        <div className={styles.chatMessages}>
                            {messages.map(msg => (
                                <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div className={styles.chatInputArea}>
                            <div className={styles.inputWrapper}>
                                <textarea
                                    className={styles.chatInput}
                                    placeholder="Type a message or type '/' for AI commands..."
                                ></textarea>
                                <button className={styles.sendBtn}>Send</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Right Panel: CRM Details & Local AI */}
                <section className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Customer Profile</h2>
                    </header>
                    <div className={`${styles.panelContent} ${styles.crmDetails}`}>

                        <div className={styles.crmSection}>
                            <h3 className={styles.sectionTitle}>Details</h3>
                            <div className={styles.detailRow}>
                                <span>Status</span>
                                <span style={{ color: '#0066cc', fontWeight: 600 }}>Diamond Member</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Total Rides</span>
                                <span>42</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Avg Rating</span>
                                <span>4.9 / 5.0</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Active Order</span>
                                <span>In Progress (Pickup)</span>
                            </div>
                        </div>

                        <div className={styles.aiSuggested}>
                            <div className={styles.aiHeader}>
                                <div className={styles.aiPulse}></div>
                                <span>Local AI Suggestions</span>
                            </div>
                            <div className={styles.suggestedAction}>
                                Automated Reply: "Your driver is 2 mins away in a Black Hummer EV."
                            </div>
                            <div className={styles.suggestedAction}>
                                Action: Ping Driver via Dispatch
                            </div>
                            <div className={styles.suggestedAction}>
                                Refund Workflow: Waive cancellation fee (Diamond Status)
                            </div>
                            <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '1rem', textAlign: 'center' }}>
                                Processed locally on Node #04 (6ms latency)
                            </p>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    );
}
