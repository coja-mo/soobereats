'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function FounderDashboard() {
    const [isLightMode, setIsLightMode] = useState(false);

    return (
        <div className={`${styles.founderContainer} ${isLightMode ? styles.lightMode : ''}`}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo}>Soobér Founder</div>
                    <div className={styles.badge}>Superadmin</div>
                </div>

                <div className={styles.systemStatus}>
                    <div className={styles.statusItem}>
                        <span className={styles.statusText}>Primary Mac Studio Cluster Core Active</span>
                        <div className={styles.pulse}></div>
                    </div>

                    <button
                        onClick={() => setIsLightMode(!isLightMode)}
                        className={styles.themeToggleBtn}
                        aria-label="Toggle theme"
                    >
                        {isLightMode ? '🌙 Dark' : '☀️ Light'}
                    </button>

                    <Link href="/">
                        <button className={styles.themeToggleBtn}>
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
                                <Link href="/links" className={styles.quickLink}>
                                    <div className={styles.linkTitle}>🔗 All Ecosystem Links</div>
                                    <div className={styles.linkDesc}>Access the full directory of Soobér platform portals and tools.</div>
                                </Link>
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
                                <Link href="/scheduler" className={styles.quickLink} style={{ gridColumn: '1 / -1' }}>
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
                                            <td><span style={{ color: 'var(--color-warning)' }}>Preparing</span></td>
                                            <td>12 min</td>
                                        </tr>
                                        <tr>
                                            <td>🚗 Ride</td>
                                            <td>RDE-8821</td>
                                            <td><span style={{ color: 'var(--color-info)' }}>En Route</span></td>
                                            <td>2 min</td>
                                        </tr>
                                        <tr>
                                            <td>🛒 MRKT</td>
                                            <td>MKT-1192</td>
                                            <td><span style={{ color: 'var(--color-positive)' }}>At Door</span></td>
                                            <td>0 min</td>
                                        </tr>
                                        <tr>
                                            <td>⚡ EVnts</td>
                                            <td>EVT-004</td>
                                            <td><span style={{ color: 'var(--color-purple)' }}>Scheduled</span></td>
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

                        {/* Panel 5: Ecosystem Administration & Approvals */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Ecosystem Approvals</h2>
                                <span className={`${styles.authBadge} ${styles.orange}`}>3 Pending</span>
                            </div>
                            <div className={styles.panelContent} style={{ padding: '1rem' }}>
                                <div className={styles.actionFeed}>
                                    {/* App Override */}
                                    <div className={styles.actionCard}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong style={{ fontSize: '0.85rem' }}>POS Terminal #4 Override</strong>
                                            <span className={`${styles.authBadge} ${styles.purple}`}>Login Access</span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Manager passcode requested at Station Ops.</div>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                                            <button className={styles.btnAuth}>Grant Access</button>
                                            <button className={styles.btnDeny}>Deny</button>
                                        </div>
                                    </div>
                                    {/* KDS Void */}
                                    <div className={styles.actionCard}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong style={{ fontSize: '0.85rem' }}>Cancel Order MKT-881</strong>
                                            <span className={`${styles.authBadge} ${styles.orange}`}>KDS Void</span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pino's Kitchen requested to void 4x items.</div>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                                            <button className={styles.btnAuth}>Approve Void</button>
                                        </div>
                                    </div>
                                    {/* Scheduler AI */}
                                    <div className={styles.actionCard}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <strong style={{ fontSize: '0.85rem' }}>Shift Swap: Sarah J.</strong>
                                            <span className={`${styles.authBadge} ${styles.grey}`}>Scheduling</span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Requests Fri 16 swap with Marcus T.</div>
                                        <div className={styles.aiInsight}>✨ Local Compute: Marcus is NOT Event Certified. This violates surge requirements. Blocks recommended.</div>
                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem' }}>
                                            <button className={styles.btnDeny} style={{ flex: 1 }}>Block Swap</button>
                                        </div>
                                    </div>
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
                                    <div className={styles.sentimentCard}>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-positive)' }}>82</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current NPS</div>
                                    </div>
                                    <div className={styles.sentimentCard}>
                                        <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-warning)' }}>4.8</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Avg App Rating</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.sentimentTitle}>Top Flagged Issues (Last 1hr)</div>
                                    <ul style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, paddingLeft: '1.2rem' }}>
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
                                <div className={styles.telemetryRow}>
                                    <span style={{ color: '#888' }}>Pino's Avg Prep Time</span>
                                    <strong className={styles.telemetryValue}>4m 12s</strong>
                                </div>
                                <div className={styles.telemetryRow}>
                                    <span style={{ color: '#888' }}>MRKT Sales Velocity</span>
                                    <strong style={{ color: '#10b981' }}>High (14 orders/hr)</strong>
                                </div>
                                <div className={styles.telemetryRow} style={{ borderBottom: 'none', paddingBottom: 0 }}>
                                    <span style={{ color: '#888' }}>On-Premise Data Array</span>
                                    <strong className={styles.telemetryValue}>2.4 TB (Encrypted)</strong>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* --- FULL WIDTH ROW (Vector Intelligence) --- */}
                    <div className={styles.threeColSpan}>
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Live Vector Intelligence & Anomaly Detection</h2>
                                <span className={styles.statTrend} style={{ fontSize: '0.8rem', color: '#3b82f6' }}>Scanning SOO-Core</span>
                            </div>
                            <div className={styles.panelContent} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                {/* Radar */}
                                <div className={styles.radarWrapper}>
                                    <div className={styles.radarContainer}>
                                        <div className={styles.radarRing1}></div>
                                        <div className={styles.radarRing2}></div>
                                        <div className={styles.radarRing3}></div>
                                        <div className={styles.radarBlip} style={{ top: '30%', left: '70%' }}></div>
                                        <div className={styles.radarBlip} style={{ top: '60%', left: '25%', animationDelay: '1.2s' }}></div>
                                    </div>
                                    <div style={{ textAlign: 'center', color: '#10b981', fontSize: '0.75rem', marginTop: '0.5rem', fontFamily: 'monospace' }}>ML-NODE-01</div>
                                </div>
                                {/* Data streams */}
                                <div style={{ flex: 1 }}>
                                    <table className={styles.dataTable}>
                                        <thead>
                                            <tr>
                                                <th>Vector ID</th>
                                                <th>Anomaly Confidence</th>
                                                <th>Detection Event</th>
                                                <th>Automated Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ fontFamily: 'monospace', color: '#888' }}>VEC-A92B</td>
                                                <td><span style={{ color: '#f59e0b' }}>89.4%</span></td>
                                                <td>Route deviation detected, Driver #402. Highway 17 North.</td>
                                                <td><span style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>Pinged Device</span></td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontFamily: 'monospace', color: '#888' }}>VEC-X114</td>
                                                <td><span style={{ color: '#ef4444' }}>99.1%</span></td>
                                                <td>Fraudulent bulk order attempt. Sourced from external node.</td>
                                                <td><span style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>IP Blocked</span></td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontFamily: 'monospace', color: '#888' }}>VEC-K008</td>
                                                <td><span style={{ color: '#3b82f6' }}>64.2%</span></td>
                                                <td>Unusual demand surge: Goulais Ave. (Potential unlisted event)</td>
                                                <td><span style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>Redirected 2 EVs</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    );
}
