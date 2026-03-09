'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Link from 'next/link';

export default function DispatchDashboard() {
    const router = useRouter();
    const [activeDrivers, setActiveDrivers] = useState([
        { id: 1, name: "Marcus T.", status: "active", location: "Downtown Core", vehicle: "GMC Hummer EV", eta: "5 mins" },
        { id: 2, name: "Sarah J.", status: "busy", location: "SOOber Airport (YAM)", vehicle: "Cadillac VISTIQ", eta: "On Route" },
        { id: 3, name: "David L.", status: "active", location: "North End", vehicle: "Honda Prologue", eta: "Available" },
        { id: 4, name: "Jessica M.", status: "offline", location: "Base Station", vehicle: "Hyundai IONIQ 5", eta: "Charging" },
        { id: 5, name: "Alex K.", status: "active", location: "East Side", vehicle: "BYD Atto 3", eta: "12 mins" },
        { id: 6, name: "Ben W.", status: "active", location: "Downtown Core", vehicle: "Segway Ninebot Max", eta: "3 mins" },
        { id: 7, name: "Chloe F.", status: "active", location: "Great Northern Rd", vehicle: "Segway Ninebot Max", eta: "Available" },
    ]);

    const [aiLogs, setAiLogs] = useState([
        { id: 1, type: "info", message: "System initialized. Local Mac Studio node #04 active.", time: "10:00 AM" },
        { id: 2, type: "success", message: "Optimized route for Sarah J. to YAM. Estimated savings: 4 mins.", time: "10:12 AM" },
        { id: 3, type: "alert", message: "High demand detected in Downtown Core. Recommending fleet redistribution.", time: "10:28 AM" },
        { id: 4, type: "success", message: "Weather conditions clear. Auto-surged Segway Ninebot fleet to cover localized <3km radius orders on Great Northern Rd.", time: "10:30 AM" },
    ]);

    return (
        <div className={styles.dispatchContainer}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo}>SOOber Dispatch</div>
                    <div className={styles.badge}>Live Operations</div>
                </div>

                <div className={styles.systemStatus}>
                    <div className={styles.statusItem}>
                        <span>Local AI Compute Active</span>
                        <div className={styles.pulse}></div>
                    </div>
                    <Link href="/">
                        <button style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff',
                            padding: '0.4rem 1rem',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Exit to Home
                        </button>
                    </Link>
                </div>
            </header>

            <main className={styles.mainGrid}>
                {/* Left Panel: Active Fleet */}
                <section className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Active Fleet ({activeDrivers.filter(d => d.status !== 'offline').length})</h2>
                    </header>
                    <div className={styles.panelContent}>
                        <div className={styles.driverList}>
                            {activeDrivers.map(driver => (
                                <div key={driver.id} className={styles.driverCard}>
                                    <div className={styles.driverTop}>
                                        <span className={styles.driverName}>{driver.name}</span>
                                        <span className={`${styles.statusIndicator} ${styles[driver.status]}`}>
                                            {driver.status}
                                        </span>
                                    </div>
                                    <div className={styles.driverDetails}>
                                        <span>{driver.vehicle}</span>
                                        <span>{driver.location} • {driver.eta}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Center Panel: Map/Overview */}
                <section className={styles.mapArea}>
                    <div className={styles.simulatedMap}>
                        {/* Markers would go here in a real implementation */}
                        <div style={{ position: 'absolute', top: '30%', left: '40%', width: 12, height: 12, borderRadius: '50%', background: '#00ff80', boxShadow: '0 0 10px #00ff80' }}></div>
                        <div style={{ position: 'absolute', top: '60%', left: '70%', width: 12, height: 12, borderRadius: '50%', background: '#ffa600', boxShadow: '0 0 10px #ffa600' }}></div>
                        <div style={{ position: 'absolute', top: '45%', left: '25%', width: 12, height: 12, borderRadius: '50%', background: '#00ff80', boxShadow: '0 0 10px #00ff80' }}></div>
                    </div>
                    <div className={styles.mapOverlay}>
                        <div className={styles.mapStat}>
                            <span>Total Active Runs:</span>
                            <span>14</span>
                        </div>
                        <div className={styles.mapStat}>
                            <span>Active Ninebots:</span>
                            <span style={{ color: '#00ccff' }}>2</span>
                        </div>
                        <div className={styles.mapStat}>
                            <span>Avg ETA:</span>
                            <span>7.2 mins</span>
                        </div>
                        <div className={styles.mapStat}>
                            <span>Fleet Efficiency:</span>
                            <span style={{ color: '#00ff80' }}>94%</span>
                        </div>
                    </div>
                </section>

                {/* Right Panel: Local AI Copilot */}
                <section className={`${styles.panel} ${styles.aiPanel}`}>
                    <header className={`${styles.panelHeader} ${styles.aiHeader}`}>
                        <h2 className={`${styles.panelTitle} ${styles.aiTitle}`}>Local AI Copilot</h2>
                    </header>
                    <div className={styles.panelContent} style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className={styles.aiLog}>
                            {aiLogs.map(log => (
                                <div key={log.id} className={`${styles.aiMessage} ${styles[log.type]}`}>
                                    <span className={styles.messageTime}>{log.time}</span>
                                    {log.message}
                                </div>
                            ))}
                        </div>

                        <div className={styles.computeStats}>
                            <div className={styles.statRow}>
                                <span>Compute Node:</span>
                                <span>Mac Studio M2 Ultra</span>
                            </div>
                            <div className={styles.statRow}>
                                <span>Core Utilization:</span>
                                <span>34%</span>
                            </div>
                            <div className={styles.statRow}>
                                <span>Local Data Privacy:</span>
                                <span>Enforced (100%)</span>
                            </div>
                            <div className={styles.statRow}>
                                <span>Latency to Fleet:</span>
                                <span>12ms</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
