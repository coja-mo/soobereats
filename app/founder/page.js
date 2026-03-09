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
                    {/* Left Column (Wider) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Unified Quick Access */}
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
                                <Link href="/superadmin" className={styles.quickLink}>
                                    <div className={styles.linkTitle}>🛠️ Super Admin Config</div>
                                    <div className={styles.linkDesc}>Manage feature flags and deployment vectors.</div>
                                </Link>
                            </div>
                        </section>

                        {/* Order Volume Chart Placeholder */}
                        <section className={styles.panel}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>7-Day Order Volume (Local Ecosystem)</h2>
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
                    </div>

                    {/* Right Column (Narrower) */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <section className={styles.panel} style={{ flex: 1 }}>
                            <div className={styles.panelHeader}>
                                <h2 className={styles.panelTitle}>Local Infrastructure</h2>
                            </div>
                            <div className={styles.panelContent}>

                                <div className={styles.infraNode}>
                                    <div className={styles.nodeInfo}>
                                        <div className={styles.nodeName}>Mac Studio Node 01</div>
                                        <div className={styles.nodeStatus}>
                                            <div className={`${styles.nodeDot} ${styles.active}`}></div>
                                            Fleet ML Routing Engine
                                        </div>
                                    </div>
                                    <div className={styles.nodeLoad}>42%</div>
                                </div>

                                <div className={styles.infraNode}>
                                    <div className={styles.nodeInfo}>
                                        <div className={styles.nodeName}>Mac Studio Node 02</div>
                                        <div className={styles.nodeStatus}>
                                            <div className={`${styles.nodeDot} ${styles.active}`}></div>
                                            Customer Auth & Support NLP
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

                                <div style={{ marginTop: '1.5rem', background: 'rgba(255,166,0,0.1)', border: '1px solid rgba(255,166,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
                                    <div style={{ color: '#ffa600', fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Cloud Failover Status</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Standby mode active. 100% of data currently retained on-premise local arrays.</div>
                                </div>

                            </div>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
}
