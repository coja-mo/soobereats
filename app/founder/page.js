'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function FounderDashboard() {
    return (
        <div className={styles.founderContainer}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo}>SOOber Founder</div>
                    <div className={styles.badge}>God Mode</div>
                </div>

                <div className={styles.systemStatus}>
                    <div className={styles.statusItem}>
                        <span>Primary Mac Studio Cluster Core Active</span>
                        <div className={styles.pulse}></div>
                    </div>
                    <Link href="/">
                        <button style={{
                            background: '#09090b',
                            border: '1px solid #27272a',
                            color: '#fff',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                        }}>
                            Exit to Home
                        </button>
                    </Link>
                </div>
            </header>

            <main className={styles.mainGrid}>
                {/* Top Metrics Row */}
                <div className={styles.topStats}>
                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statTitle}>Gross Revenue Today</span>
                            <span className={styles.statIcon}>💰</span>
                        </div>
                        <div className={`${styles.statValue} ${styles.positive}`}>$14,284</div>
                        <div className={styles.statSub}>
                            <span className={`${styles.statTrend} ${styles.up}`}>+24%</span>
                            <span>vs yesterday</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statTitle}>Total Active Fleet</span>
                            <span className={styles.statIcon}>⚡</span>
                        </div>
                        <div className={`${styles.statValue} ${styles.neutral}`}>48</div>
                        <div className={styles.statSub}>
                            <span>30 EVs | 12 Bikes | 6 Segways</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statTitle}>Live Support Queue</span>
                            <span className={styles.statIcon}>💬</span>
                        </div>
                        <div className={`${styles.statValue} ${styles.warning}`}>12</div>
                        <div className={styles.statSub}>
                            <span className={`${styles.statTrend} ${styles.down}`}>-4</span>
                            <span>vs hourly avg</span>
                        </div>
                    </div>

                    <div className={styles.statCard}>
                        <div className={styles.statHeader}>
                            <span className={styles.statTitle}>Local AI Autonomy</span>
                            <span className={styles.statIcon}>🧠</span>
                        </div>
                        <div className={`${styles.statValue} ${styles.positive}`}>94%</div>
                        <div className={styles.statSub}>
                            <span>of actions resolved without human</span>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Area */}
                <div className={styles.dashboardsGrid}>

                    {/* --- COLUMN 1 --- */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Panel 1: Management Portals */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Management Portals</h2>
                            </div>
                            <div className={`${styles.panelContent} ${styles.linksGrid}`}>
                                <Link href="/dispatch" className={styles.quickLink}>
                                    <div className={styles.linkTitle}>📡 Dispatch Dashboard</div>
                                    <div className={styles.linkDesc}>Live fleet tracking, vector-routing, and anomaly detection.</div>
                                </Link>
                                <Link href="/cs-admin" className={styles.quickLink}>
                                    <div className={styles.linkTitle}>👩‍💻 CS Command Center</div>
                                    <div className={styles.linkDesc}>Salesforce-style multi-channel support resolution.</div>
                                </Link>
                                <Link href="/vendor/pos" className={styles.quickLink}>
                                    <div className={styles.linkTitle}>🛒 Merchant POS Preview</div>
                                    <div className={styles.linkDesc}>Observe the real-time fulfillment state at partner bounds.</div>
                                </Link>
                                <Link href="/scheduler" className={styles.quickLink}>
                                    <div className={styles.linkTitle}>📅 Enterprise Scheduler</div>
                                    <div className={styles.linkDesc}>AI-optimized fleet and staff shift management.</div>
                                </Link>
                            </div>
                        </section>

                        {/* Panel 2: Live Order Matrix */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Live Order Matrix (Sault Ste. Marie)</h2>
                                <span className={styles.statTrend} style={{ fontSize: '0.8rem', color: '#10b981' }}>Auto-refreshing</span>
                            </div>
                            <div className={styles.panelContent} style={{ padding: '0' }}>
                                <table className={styles.dataTable}>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>ID</th>
                                            <th>Status</th>
                                            <th>ETA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>🍔 Eats</td>
                                            <td>ORD-2901</td>
                                            <td><span style={{ color: '#f59e0b' }}>Preparing</span></td>
                                            <td>12 min</td>
                                        </tr>
                                        <tr>
                                            <td>🚗 Ride</td>
                                            <td>RDE-8821</td>
                                            <td><span style={{ color: '#3b82f6' }}>En Route</span></td>
                                            <td>2 min</td>
                                        </tr>
                                        <tr>
                                            <td>🛒 MRKT</td>
                                            <td>MKT-1192</td>
                                            <td><span style={{ color: '#10b981' }}>At Door</span></td>
                                            <td>0 min</td>
                                        </tr>
                                        <tr>
                                            <td>⚡ EVnts</td>
                                            <td>EVT-004</td>
                                            <td><span style={{ color: '#a855f7' }}>Scheduled</span></td>
                                            <td>Tomorrow</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Panel 3: Staff Management & Shift Health */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Shift Health Matrix</h2>
                            </div>
                            <div className={styles.panelContent}>
                                <div className={styles.progressRow}>
                                    <div className={styles.progressLabel}>
                                        <span>Fleet Drivers (Active/Target)</span>
                                        <span>30 / 35</span>
                                    </div>
                                    <div className={styles.progressBarBg}>
                                        <div className={styles.progressBarFill} style={{ width: '85%', background: '#f59e0b' }}></div>
                                    </div>
                                </div>
                                <div className={styles.progressRow}>
                                    <div className={styles.progressLabel}>
                                        <span>Support Agents Online</span>
                                        <span>4 / 5</span>
                                    </div>
                                    <div className={styles.progressBarBg}>
                                        <div className={styles.progressBarFill} style={{ width: '80%', background: '#10b981' }}></div>
                                    </div>
                                </div>
                                <div className={styles.progressRow} style={{ marginBottom: 0 }}>
                                    <div className={styles.progressLabel}>
                                        <span>Approaching Overtime Rules</span>
                                        <span style={{ color: '#ef4444' }}>2 Drivers</span>
                                    </div>
                                    <div className={styles.progressBarBg}>
                                        <div className={styles.progressBarFill} style={{ width: '15%', background: '#ef4444' }}></div>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* --- COLUMN 2 --- */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Panel 4: 7-Day Order Volume Chart */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>7-Day Order Volume</h2>
                            </div>
                            <div className={styles.panelContent}>
                                <div className={styles.chartArea}>
                                    <div className={styles.bar}><span className={styles.chartLabel}>Mon</span></div>
                                    <div className={styles.bar}><span className={styles.chartLabel}>Tue</span></div>
                                    <div className={styles.bar}><span className={styles.chartLabel}>Wed</span></div>
                                    <div className={styles.bar}><span className={styles.chartLabel}>Thu</span></div>
                                    <div className={styles.bar}><span className={styles.chartLabel}>Fri</span></div>
                                    <div className={styles.bar}><span className={styles.chartLabel}>Sat</span></div>
                                    <div className={styles.bar}><span className={styles.chartLabel}>Sun</span></div>
                                </div>
                            </div>
                        </section>

                        {/* Panel 5: Feature Flagging & Controls */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Super Admin Toggles</h2>
                            </div>
                            <div className={styles.panelContent} style={{ padding: '1rem' }}>
                                <div className={styles.toggleRow}>
                                    <div className={styles.toggleLabel}>
                                        <span className={styles.toggleTitle}>Surge Pricing Matrix</span>
                                        <span className={styles.toggleDesc}>Currently disabled globally</span>
                                    </div>
                                    <div className={`${styles.toggleSwitch} ${styles.off}`}><div className={styles.toggleKnob}></div></div>
                                </div>
                                <div className={styles.toggleRow}>
                                    <div className={styles.toggleLabel}>
                                        <span className={styles.toggleTitle}>Airport Pre-booking</span>
                                        <span className={styles.toggleDesc}>Enabled for YAM</span>
                                    </div>
                                    <div className={`${styles.toggleSwitch} ${styles.on}`}><div className={styles.toggleKnob}></div></div>
                                </div>
                                <div className={styles.toggleRow} style={{ borderBottom: 'none' }}>
                                    <div className={styles.toggleLabel}>
                                        <span className={styles.toggleTitle}>Pino's Fresh Mode</span>
                                        <span className={styles.toggleDesc}>Enables advanced prep times</span>
                                    </div>
                                    <div className={`${styles.toggleSwitch} ${styles.on}`}><div className={styles.toggleKnob}></div></div>
                                </div>
                            </div>
                        </section>

                        {/* Panel 6: Customer Sentiment & Escalations */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Customer Sentiment Hub</h2>
                            </div>
                            <div className={styles.panelContent}>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>82</div>
                                        <div style={{ fontSize: '0.75rem', color: '#888' }}>Current NPS</div>
                                    </div>
                                    <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>4.8</div>
                                        <div style={{ fontSize: '0.75rem', color: '#888' }}>Avg App Rating</div>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, paddingBottom: '0.5rem', color: '#ccc' }}>Top Flagged Issues (Last 1hr)</div>
                                    <ul style={{ fontSize: '0.8rem', color: '#888', margin: 0, paddingLeft: '1.2rem' }}>
                                        <li>"Driver couldn't find building" (3 instances)</li>
                                        <li>"Missing soy sauce" (2 instances)</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* --- COLUMN 3 --- */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Panel 7: Local Infrastructure */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Local Infrastructure</h2>
                            </div>
                            <div className={styles.panelContent}>

                                <div className={styles.infraNode}>
                                    <div className={styles.nodeInfo}>
                                        <div className={styles.nodeName}>Mac Studio Node 01</div>
                                        <div className={styles.nodeStatus}>
                                            <div className={`${styles.nodeDot} ${styles.active}`}></div>
                                            Fleet ML Engine
                                        </div>
                                    </div>
                                    <div className={styles.nodeLoad}>42%</div>
                                </div>

                                <div className={styles.infraNode}>
                                    <div className={styles.nodeInfo}>
                                        <div className={styles.nodeName}>Mac Studio Node 02</div>
                                        <div className={styles.nodeStatus}>
                                            <div className={`${styles.nodeDot} ${styles.active}`}></div>
                                            Copilot NLP Agent
                                        </div>
                                    </div>
                                    <div className={styles.nodeLoad}>28%</div>
                                </div>

                                <div className={styles.infraNode}>
                                    <div className={styles.nodeInfo}>
                                        <div className={styles.nodeName}>Mac Studio Node 03</div>
                                        <div className={styles.nodeStatus}>
                                            <div className={`${styles.nodeDot} ${styles.idle}`}></div>
                                            Data Lake Sync (Idle)
                                        </div>
                                    </div>
                                    <div className={styles.nodeLoad}>4%</div>
                                </div>

                            </div>
                        </section>

                        {/* Panel 8: Audit & Event Logs */}
                        <section className={styles.panel} style={{ flex: 1 }}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Live Security & Audit Feed</h2>
                            </div>
                            <div className={styles.panelContent}>
                                <div className={styles.activityFeed}>
                                    <div className={styles.feedItem}>
                                        <span className={styles.feedTime}>15:22:04</span>
                                        <span className={styles.feedContent}>Copilot authorized <strong>$4.55 refund</strong> for ORD-2847.</span>
                                    </div>
                                    <div className={styles.feedItem}>
                                        <span className={styles.feedTime}>15:21:18</span>
                                        <span className={styles.feedContent}>Driver <strong>Marcus T.</strong> marked ON DUTY via Node 01.</span>
                                    </div>
                                    <div className={styles.feedItem}>
                                        <span className={styles.feedTime}>15:19:44</span>
                                        <span className={styles.feedContent}>New vendor <strong>Jenn Bakes Cakes</strong> menu sync completed.</span>
                                    </div>
                                    <div className={styles.feedItem}>
                                        <span className={styles.feedTime}>15:15:02</span>
                                        <span className={styles.feedContent}>System: Background data scrubbing executed perfectly.</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Panel 9 & 10: Vendor & Data Lake Aggregated Insights */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Operations Telemetry</h2>
                            </div>
                            <div className={styles.panelContent} style={{ padding: '1rem', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: '#888' }}>Pino's Avg Prep Time</span>
                                    <strong style={{ color: '#fff' }}>4m 12s</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem' }}>
                                    <span style={{ color: '#888' }}>MRKT Sales Velocity</span>
                                    <strong style={{ color: '#10b981' }}>High (14 orders/hr)</strong>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: '#888' }}>On-Premise Data Array</span>
                                    <strong style={{ color: '#fff' }}>2.4 TB (Encrypted)</strong>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
}
