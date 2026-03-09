'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

/* ─── Mock Ticket Queue ─── */
const INITIAL_TICKETS = [
    {
        id: 'TKT-001', customer: 'Elena R.', issue: "Driver couldn't find building", category: 'Rides', order: '#SBR-88219', waitTime: 2, urgent: true, status: 'active', tier: 'Diamond', messages: [
            { id: 1, sender: 'customer', text: "Hi, I'm waiting outside but I don't see the car.", time: '11:02 AM' },
            { id: 2, sender: 'ai', text: "AI Copilot: The driver (Marcus T.) is 2 minutes away in a Black GMC Hummer EV. Shall I send an automated ETA update?", time: '11:02 AM' },
            { id: 3, sender: 'agent', text: "Hi Elena! Checking on your driver now.", time: '11:03 AM' },
            { id: 4, sender: 'agent', text: "Marcus is just turning onto Main St and will be there in about 2 minutes. He is driving a Black GMC Hummer EV.", time: '11:03 AM' },
        ]
    },
    {
        id: 'TKT-002', customer: 'Thomas M.', issue: 'Missing item in grocery order', category: 'Delivery', order: '#ORD-4012', waitTime: 5, urgent: false, status: 'active', tier: 'Gold', messages: [
            { id: 1, sender: 'customer', text: "Hi, my order is missing the organic milk I ordered from Pino's.", time: '10:55 AM' },
            { id: 2, sender: 'ai', text: "AI Copilot: Order #ORD-4012 from Pino's Fresh Grocery confirmed 6 items, receipt shows 5 scanned. Missing: Organic 2% Milk ($5.99). Recommend immediate credit.", time: '10:55 AM' },
        ]
    },
    {
        id: 'TKT-003', customer: 'Sarah K.', issue: 'Payment method failed', category: 'Account', order: '#ORD-4007', waitTime: 8, urgent: false, status: 'active', tier: 'Silver', messages: [
            { id: 1, sender: 'customer', text: "My card keeps getting declined even though it works everywhere else.", time: '10:48 AM' },
        ]
    },
    {
        id: 'TKT-004', customer: 'Jake W.', issue: 'Late delivery — 40 min past ETA', category: 'Delivery', order: '#ORD-4018', waitTime: 12, urgent: true, status: 'active', tier: 'Bronze', messages: [
            { id: 1, sender: 'customer', text: "My food was supposed to be here 40 minutes ago. What is going on??", time: '10:35 AM' },
            { id: 2, sender: 'ai', text: "AI Copilot: Order #ORD-4018 is severely late. Driver D-027 had a flat tire at Great Northern Rd. Recommend: full refund + $10 credit + reassign to nearest available unit.", time: '10:36 AM' },
        ]
    },
    {
        id: 'TKT-005', customer: 'Priya N.', issue: 'Request to add delivery to Garden River', category: 'General', order: 'N/A', waitTime: 3, urgent: false, status: 'active', tier: 'Gold', messages: [
            { id: 1, sender: 'customer', text: "I just saw you now deliver to Garden River First Nation! That's amazing. Can I update my default address?", time: '11:00 AM' },
        ]
    },
    {
        id: 'TKT-006', customer: 'Marcus J.', issue: 'Ride cancellation fee dispute', category: 'Rides', order: '#SBR-88205', waitTime: 15, urgent: false, status: 'waiting', tier: 'Silver', messages: [
            { id: 1, sender: 'customer', text: "I was charged $5 for cancelling but my driver was 15 minutes late! That's not fair.", time: '10:30 AM' },
        ]
    },
];

const NEW_TICKETS = [
    { customer: 'Amanda L.', issue: 'Wrong restaurant order received', category: 'Delivery', tier: 'Gold' },
    { customer: 'Chris B.', issue: 'Driver asked for cash tip', category: 'Rides', tier: 'Bronze' },
    { customer: 'Kim S.', issue: 'App not loading in Echo Bay', category: 'General', tier: 'Silver' },
    { customer: 'David R.', issue: 'Food arrived cold — 2nd time this week', category: 'Delivery', tier: 'Diamond' },
    { customer: 'Lisa P.', issue: 'Loyalty points not showing up', category: 'Account', tier: 'Gold' },
];

const AI_SUGGESTIONS = {
    Rides: [
        'Share live driver location link',
        'Send automated ETA update to customer',
        'Ping driver via Dispatch system',
        'Waive cancellation fee (loyalty tier check)',
    ],
    Delivery: [
        'Issue immediate credit for missing item',
        'Reassign order to nearest available unit',
        'Process full refund + $10 gift credit',
        'Contact restaurant for replacement item',
    ],
    Account: [
        'Reset payment method authentication',
        'Send verification link to email',
        'Escalate to billing department',
        'Check for fraud flags on account',
    ],
    General: [
        'Update customer default address',
        'Send delivery zone info link',
        'Enroll in extended coverage notifications',
        'Forward to community outreach team',
    ],
};

let ticketCounter = 7;

export default function CSAdminDashboard() {
    const [tickets, setTickets] = useState(INITIAL_TICKETS);
    const [activeTicketId, setActiveTicketId] = useState('TKT-001');
    const [inputText, setInputText] = useState('');
    const [clock, setClock] = useState('');
    const [agentStatus, setAgentStatus] = useState('Online');
    const [queueFilter, setQueueFilter] = useState('All');
    const chatEndRef = useRef(null);
    const newTicketIdx = useRef(0);

    const activeTicket = tickets.find(t => t.id === activeTicketId) || tickets[0];

    // Clock
    useEffect(() => {
        const t = setInterval(() => setClock(new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })), 1000);
        return () => clearInterval(t);
    }, []);

    // New tickets arriving every 20s
    useEffect(() => {
        const t = setInterval(() => {
            const template = NEW_TICKETS[newTicketIdx.current % NEW_TICKETS.length];
            newTicketIdx.current++;
            ticketCounter++;
            const newTicket = {
                id: `TKT-${String(ticketCounter).padStart(3, '0')}`,
                customer: template.customer,
                issue: template.issue,
                category: template.category,
                order: `#ORD-${4000 + ticketCounter}`,
                waitTime: 0,
                urgent: Math.random() > 0.7,
                status: 'active',
                tier: template.tier,
                messages: [
                    { id: 1, sender: 'customer', text: template.issue, time: new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) },
                ],
            };
            setTickets(prev => [newTicket, ...prev]);
        }, 20000);
        return () => clearInterval(t);
    }, []);

    // Increment wait times every 60s
    useEffect(() => {
        const t = setInterval(() => {
            setTickets(prev => prev.map(tk => tk.status === 'active' ? { ...tk, waitTime: tk.waitTime + 1 } : tk));
        }, 60000);
        return () => clearInterval(t);
    }, []);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeTicket?.messages]);

    const handleSend = useCallback((e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const time = new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
        const newMsg = { id: Date.now(), sender: 'agent', text: inputText.trim(), time };

        setTickets(prev => prev.map(t =>
            t.id === activeTicketId ? { ...t, messages: [...t.messages, newMsg] } : t
        ));
        setInputText('');

        // Simulate AI follow-up after agent message
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: `AI Copilot: Response logged. Customer sentiment: positive. Suggested next: close ticket or ask if more help needed.`,
                time: new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }),
            };
            setTickets(prev => prev.map(t =>
                t.id === activeTicketId ? { ...t, messages: [...t.messages, aiMsg] } : t
            ));
        }, 1500);
    }, [inputText, activeTicketId]);

    const resolveTicket = () => {
        setTickets(prev => prev.map(t =>
            t.id === activeTicketId ? { ...t, status: 'resolved' } : t
        ));
    };

    const filteredTickets = queueFilter === 'All'
        ? tickets.filter(t => t.status === 'active')
        : tickets.filter(t => t.status === 'active' && t.category === queueFilter);

    const activeCount = tickets.filter(t => t.status === 'active').length;
    const urgentCount = tickets.filter(t => t.status === 'active' && t.urgent).length;
    const resolvedCount = tickets.filter(t => t.status === 'resolved').length;
    const avgWait = activeCount > 0 ? (tickets.filter(t => t.status === 'active').reduce((s, t) => s + t.waitTime, 0) / activeCount).toFixed(0) : 0;

    const suggestions = AI_SUGGESTIONS[activeTicket?.category] || AI_SUGGESTIONS.General;

    return (
        <div className={styles.csContainer}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo}>SOOber Support</div>
                    <div className={styles.badge}>CS Command Center</div>
                </div>

                <div className={styles.agentProfile}>
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: '#888', fontFamily: 'monospace' }}>
                        <span>{clock}</span>
                        <span>Queue: {activeCount}</span>
                        <span style={{ color: urgentCount > 0 ? '#cc0000' : 'inherit' }}>Urgent: {urgentCount}</span>
                        <span>Resolved: {resolvedCount}</span>
                        <span>Avg Wait: {avgWait}m</span>
                    </div>
                    <span className={styles.agentName}>Agent: Sarah Connor</span>
                    <div className={styles.avatar}>SC</div>
                    <Link href="/">
                        <button style={{
                            background: '#000', border: 'none', color: '#fff',
                            padding: '0.4rem 1rem', borderRadius: '4px', cursor: 'pointer',
                            marginLeft: '0.5rem', fontSize: '0.8rem'
                        }}>Exit CRM</button>
                    </Link>
                </div>
            </header>

            <main className={styles.mainGrid}>
                {/* ─── LEFT: Ticket Queue ─── */}
                <section className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Active Queue ({filteredTickets.length})</h2>
                    </header>
                    <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #e0e0e0', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {['All', 'Rides', 'Delivery', 'Account', 'General'].map(f => (
                            <button key={f} onClick={() => setQueueFilter(f)} style={{
                                padding: '3px 8px', borderRadius: '4px', border: '1px solid #ddd',
                                background: queueFilter === f ? '#0066cc' : 'transparent',
                                color: queueFilter === f ? '#fff' : '#666',
                                fontSize: '0.65rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase',
                            }}>{f}</button>
                        ))}
                    </div>
                    <div className={`${styles.panelContent} ${styles.queueList}`}>
                        {filteredTickets.map(item => (
                            <div
                                key={item.id}
                                className={`${styles.queueItem} ${activeTicketId === item.id ? styles.active : ''}`}
                                onClick={() => setActiveTicketId(item.id)}
                            >
                                <div className={styles.queueTop}>
                                    <span className={styles.custName}>{item.customer}</span>
                                    <span className={styles.waitTime}>{item.waitTime}m</span>
                                </div>
                                <div className={styles.queuePreview}>{item.issue}</div>
                                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem', alignItems: 'center' }}>
                                    {item.urgent && <span className={`${styles.tag} ${styles.urgent}`}>Urgent</span>}
                                    <span className={styles.tag}>{item.category}</span>
                                    <span style={{ fontSize: '0.65rem', color: '#888', marginLeft: 'auto' }}>{item.order}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── CENTER: Active Chat ─── */}
                <section className={styles.panel}>
                    <div className={styles.chatContainer}>
                        <header className={styles.chatHeader}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 className={styles.chatTitle}>{activeTicket?.customer}</h2>
                                    <div className={styles.chatSubtitle}>
                                        {activeTicket?.order} • {activeTicket?.category} • {activeTicket?.tier} Member
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={resolveTicket} style={{
                                        padding: '6px 14px', borderRadius: '4px', border: '1px solid #10b981',
                                        background: 'rgba(16,185,129,0.1)', color: '#10b981',
                                        fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                                    }}>✓ Resolve</button>
                                    <button style={{
                                        padding: '6px 14px', borderRadius: '4px', border: '1px solid #ef4444',
                                        background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                                        fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                                    }}>⇄ Escalate</button>
                                </div>
                            </div>
                        </header>

                        <div className={styles.chatMessages}>
                            {activeTicket?.messages.map(msg => (
                                <div key={msg.id} className={`${styles.message} ${styles[msg.sender]}`}>
                                    {msg.sender === 'ai' && <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#3b82f6', marginBottom: '0.3rem' }}>◆ AI COPILOT</div>}
                                    {msg.text}
                                    <div style={{ fontSize: '0.65rem', color: '#999', marginTop: '0.3rem', textAlign: msg.sender === 'agent' ? 'right' : 'left' }}>{msg.time}</div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        <div className={styles.chatInputArea}>
                            <div className={styles.inputWrapper}>
                                <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.75rem', flex: 1 }}>
                                    <textarea
                                        className={styles.chatInput}
                                        placeholder="Type a message or use AI suggestion..."
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(e); } }}
                                    ></textarea>
                                    <button type="submit" className={styles.sendBtn}>Send</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── RIGHT: CRM Profile + AI ─── */}
                <section className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Customer Profile</h2>
                    </header>
                    <div className={`${styles.panelContent} ${styles.crmDetails}`}>
                        <div className={styles.crmSection}>
                            <h3 className={styles.sectionTitle}>Details</h3>
                            <div className={styles.detailRow}>
                                <span>Customer</span>
                                <span style={{ fontWeight: 700 }}>{activeTicket?.customer}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Tier</span>
                                <span style={{ color: '#0066cc', fontWeight: 600 }}>{activeTicket?.tier} Member</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Category</span>
                                <span>{activeTicket?.category}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Order</span>
                                <span>{activeTicket?.order}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Wait Time</span>
                                <span style={{ color: activeTicket?.waitTime > 10 ? '#cc0000' : 'inherit' }}>{activeTicket?.waitTime} min</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Ticket</span>
                                <span>{activeTicket?.id}</span>
                            </div>
                        </div>

                        <div className={styles.crmSection}>
                            <h3 className={styles.sectionTitle}>Quick Stats</h3>
                            <div className={styles.detailRow}>
                                <span>Total Orders</span>
                                <span>{Math.floor(Math.random() * 80) + 10}</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Avg Rating</span>
                                <span>4.{Math.floor(Math.random() * 3) + 7} / 5.0</span>
                            </div>
                            <div className={styles.detailRow}>
                                <span>Lifetime Value</span>
                                <span>${(Math.floor(Math.random() * 1500) + 200).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className={styles.aiSuggested}>
                            <div className={styles.aiHeader}>
                                <div className={styles.aiPulse}></div>
                                <span>AI Suggestions ({activeTicket?.category})</span>
                            </div>
                            {suggestions.map((s, i) => (
                                <div key={i} className={styles.suggestedAction} onClick={() => setInputText(s)}>
                                    {s}
                                </div>
                            ))}
                            <p style={{ fontSize: '0.7rem', color: '#888', marginTop: '0.75rem', textAlign: 'center' }}>
                                Processed locally on Node #04 (6ms) • 100% data sovereignty
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
