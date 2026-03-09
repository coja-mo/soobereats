'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// Extended Mock Data for Proportional Timeline & AI
const roles = [
    { id: 'all', label: 'All Staff', count: 142 },
    { id: 'food', label: 'Food Delivery', count: 56 },
    { id: 'rides', label: 'Soobér Rides', count: 42 },
    { id: 'events', label: 'Event Operations', count: 12 },
    { id: 'dispatch', label: 'Dispatchers', count: 4 }
];

const daysOfWeek = [
    { label: 'Mon 12', index: 0 }, { label: 'Tue 13', index: 1 }, { label: 'Wed 14', index: 2 },
    { label: 'Thu 15', index: 3 }, { label: 'Fri 16', index: 4 }, { label: 'Sat 17', index: 5 }, { label: 'Sun 18', index: 6 }
];

// Helper to calculate visual width/offset based on 0-24 hours
// e.g "08:00" -> 8, "16:30" -> 16.5
const parseTime = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h + (m / 60);
};

const staffList = [
    {
        id: '1', name: 'Marcus T.', role: 'rides', roleName: 'Soobér Rides',
        competency: { label: 'EV Certified', type: 'certified' },
        shifts: [
            { day: 0, start: '08:00', end: '16:00', loc: 'Downtown', style: 'shiftRides' },
            { day: 1, start: '08:00', end: '16:00', loc: 'Downtown', style: 'shiftRides' },
            { day: 3, start: '10:00', end: '18:00', loc: 'Airport YAM', style: 'shiftRides' },
        ]
    },
    {
        id: '2', name: 'Sarah J.', role: 'food', roleName: 'Food Delivery',
        competency: { label: 'High Vol', type: 'certified' },
        shifts: [
            { day: 4, start: '16:00', end: '23:59', loc: 'North End', style: 'shiftFood' },
            { day: 5, start: '18:00', end: '23:59', loc: 'City Wide', style: 'shiftFood' },
            { day: 6, start: '18:00', end: '23:59', loc: 'City Wide', style: 'shiftFood' }
        ]
    },
    {
        id: '3', name: 'Chloe F.', role: 'events', roleName: 'Event Chauffeur',
        competency: { label: 'Event Spec.', type: 'event' },
        shifts: [
            { day: 4, start: '18:00', end: '02:00', loc: 'Essar Centre Surge', style: 'shiftEvent' },
            { day: 5, start: '18:00', end: '02:00', loc: 'Essar Centre Surge', style: 'shiftEvent', conflict: 'RestViolation' }, // Crosses over days natively, simplified for mock
            { day: 6, start: '12:00', end: '20:00', loc: 'Grid B', style: 'shiftEvent' }
        ]
    },
];

const pendingRequests = [
    {
        id: 1, staff: 'Sarah J.', type: 'pto', typeLabel: 'PTO Request',
        details: 'Sat 17th - Unwell',
        aiInsight: 'Approving drops Food Delivery coverage to 82% at peak. However, adjacent fleets can absorb volume. ✅ Safe to Approve.',
        allowApprove: true
    },
    {
        id: 2, staff: 'Chloe F.', type: 'swap', typeLabel: 'Shift Swap',
        details: 'Wants to swap Fri 16 with Marcus T.',
        aiInsight: 'Marcus T. is NOT Event Certified. This swap violates Essar Centre surge competency requirements. ❌ Block Swap.',
        allowApprove: false
    }
];

export default function EnterpriseScheduler() {
    const [activeRole, setActiveRole] = useState('all');
    const [isGenerating, setIsGenerating] = useState(false);
    const [aiPanelOpen, setAiPanelOpen] = useState(false);
    const [scheduleStatus, setScheduleStatus] = useState('Draft Mode');

    const filteredStaff = activeRole === 'all'
        ? staffList
        : staffList.filter(s => s.role === activeRole);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            setAiPanelOpen(true);
            setScheduleStatus('Optimized by Local Compute');
        }, 1200);
    };

    return (
        <div className={styles.schedulerContainer}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo}>Enterprise Scheduler</div>
                    <div className={styles.badge}>M3 Ultra Cluster Node</div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.btnSecondary} onClick={() => setAiPanelOpen(true)}>
                        View AI Insights
                    </button>
                    <button className={styles.btnAI} onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? (
                            <><span className={styles.spinIcon}>⟳</span> Analyzing Volume...</>
                        ) : (
                            <><span>✨</span> AI Auto-Schedule</>
                        )}
                    </button>
                    <Link href="/superadmin">
                        <button className={styles.btnPrimary}>Exit</button>
                    </Link>
                </div>
            </header>

            <main className={styles.mainGrid}>
                {/* Left Panel: Organization */}
                <section className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Workforce Filter</h2>
                    </header>
                    <div className={styles.panelContent}>
                        <div className={styles.roleTabs}>
                            {roles.map(role => (
                                <button
                                    key={role.id}
                                    className={`${styles.roleTab} ${activeRole === role.id ? styles.active : ''}`}
                                    onClick={() => setActiveRole(role.id)}
                                >
                                    <span>{role.label}</span>
                                    <span className={styles.roleCount}>{role.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Center Panel: Interactive Timeline */}
                <section className={`${styles.panel} ${styles.timelineArea}`}>
                    <header className={styles.panelHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 className={styles.panelTitle}>Aug 12 - Aug 18</h2>
                            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Status: <span style={{ color: scheduleStatus.includes('Optimized') ? '#00ff80' : '#fbbf24' }}>{scheduleStatus}</span></span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: 8, height: 8, background: '#ef4444', borderRadius: '50%' }}></div> 1 Conflict</span>
                        </div>
                    </header>
                    <div className={styles.timelineContent}>
                        <div className={styles.timelineHeader}>
                            <div className={styles.timeCell} style={{ textAlign: 'left', paddingLeft: '1.2rem' }}>Staff Member</div>
                            {daysOfWeek.map(day => (
                                <div key={day.index} className={styles.timeCell}>{day.label}</div>
                            ))}
                        </div>

                        <div>
                            {filteredStaff.map(staff => (
                                <div key={staff.id} className={styles.timelineRow}>
                                    <div className={styles.staffCell}>
                                        <div className={styles.staffNameWrapper}>
                                            <span className={styles.staffName}>{staff.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                            <span className={styles.roleLabel}>{staff.roleName}</span>
                                            {staff.competency && (
                                                <span className={`${styles.competencyBadge} ${styles[staff.competency.type]}`}>
                                                    {staff.competency.label}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* 7 Days rendering proportional shifts */}
                                    {daysOfWeek.map(day => {
                                        const shift = staff.shifts.find(s => s.day === day.index);
                                        return (
                                            <div key={day.index} className={styles.dayCell}>
                                                {shift && (() => {
                                                    const startH = parseTime(shift.start);
                                                    const endH = parseTime(shift.end);
                                                    const duration = endH < startH ? (24 - startH) + endH : endH - startH; // Simplified crossing midnight logic
                                                    const leftPct = (startH / 24) * 100;
                                                    const widthPct = (duration / 24) * 100;

                                                    return (
                                                        <div
                                                            className={`${styles.shiftBar} ${styles[shift.style] || ''}`}
                                                            style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                                                            title={`${shift.start} - ${shift.end} | ${shift.loc}`}
                                                        >
                                                            {shift.loc}
                                                            {shift.conflict && <span className={styles.warningIcon}>!</span>}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Right Panel: Action Required */}
                <section className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Action Required</h2>
                    </header>
                    <div className={styles.panelContent}>
                        {pendingRequests.map(req => (
                            <div key={req.id} className={styles.reqCard}>
                                <div className={styles.reqTop}>
                                    <span className={styles.reqName}>{req.staff}</span>
                                    <span className={styles.reqType}>{req.typeLabel}</span>
                                </div>
                                <div className={styles.reqDesc}>{req.details}</div>

                                <div className={styles.aiInsight}>
                                    <div className={styles.aiInsightTitle}>
                                        ✨ Local Compute Insight
                                    </div>
                                    <div className={styles.aiInsightText}>{req.aiInsight}</div>
                                </div>

                                <div className={styles.reqActions}>
                                    <button
                                        className={styles.btnApprove}
                                        style={{ opacity: req.allowApprove ? 1 : 0.4, cursor: req.allowApprove ? 'pointer' : 'not-allowed' }}
                                        disabled={!req.allowApprove}
                                    >
                                        Approve
                                    </button>
                                    <button className={styles.btnDeny}>Deny</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* AI Magic Slide Over Panel */}
            <div className={`${styles.aiPanelOverlay} ${aiPanelOpen ? styles.open : ''}`}>
                <div className={styles.aiPanel}>
                    <header className={styles.aiHeader}>
                        <div className={styles.aiTitle}>✨ AI Demand Model</div>
                        <button className={styles.closeBtn} onClick={() => setAiPanelOpen(false)}>×</button>
                    </header>
                    <div className={styles.aiContent}>
                        <div className={styles.aiBlock}>
                            <div className={styles.aiBlockTitle}>Event Sync APIs</div>
                            <div className={styles.aiBlockText}>
                                Detected <strong>Essar Centre Concert</strong> on Fri 16th. <br />
                                <span style={{ color: '#00ff80' }}>+4 Event Fleet Drivers</span> allocated.<br />
                                <span style={{ color: '#00ff80' }}>+1 Dispatcher</span> assigned to HQ.
                            </div>
                        </div>
                        <div className={styles.aiBlock}>
                            <div className={styles.aiBlockTitle}>Weather & Micro-Mobility</div>
                            <div className={styles.aiBlockText}>
                                Forecast predicts heavy rain on Thu 15th evening. <br />
                                <span style={{ color: '#f87171' }}>-2 Scooter Techs</span>. Shifted resources to Food Delivery fleet due to expected 35% surge in orders.
                            </div>
                        </div>
                        <div className={styles.aiBlock}>
                            <div className={styles.aiBlockTitle}>Violation Checking</div>
                            <div className={styles.aiBlockText}>
                                Chloe F. flagged for <strong>Rest Violation</strong>. Only 10 hours rest between Fri/Sat shift. Resolving conflict by suggesting substitute driver: Marcus T.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
