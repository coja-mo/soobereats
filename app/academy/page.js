"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useTheme } from '../../lib/ThemeContext';

// ── Course & Curriculum Data ──────────────────────────────────────────────────
const ROLES = [
    { id: 'all', label: 'All Courses', emoji: '📚', color: '#6366f1' },
    { id: 'driver', label: 'Driver', emoji: '🚗', color: '#10b981' },
    { id: 'dispatch', label: 'Dispatch', emoji: '📡', color: '#f59e0b' },
    { id: 'cs', label: 'Customer Service', emoji: '🎧', color: '#3b82f6' },
    { id: 'admin', label: 'Admin & Ops', emoji: '⚙️', color: '#8b5cf6' },
    { id: 'safety', label: 'Safety & Compliance', emoji: '🛡️', color: '#ef4444' },
    { id: 'leadership', label: 'Leadership', emoji: '👑', color: '#ec4899' },
];

const COURSES = [
    // ── Driver Training Path ──
    {
        id: 'drv-100', title: 'SOOber Driver Onboarding', role: 'driver', level: 'Foundation', duration: '2h 30m', modules: 8, progress: 100, status: 'completed', cert: true,
        desc: 'Platform basics, app navigation, delivery workflow, and your first shift.',
        modules_list: ['Welcome to SOOber', 'App Setup & Login', 'Receiving Orders', 'Navigation & Routing', 'Pickup Protocol', 'Delivery Handoff', 'Rating System', 'Final Assessment']
    },
    {
        id: 'drv-200', title: 'EV Fleet Operations', role: 'driver', level: 'Core', duration: '3h 15m', modules: 10, progress: 65, status: 'in_progress', cert: true,
        desc: 'Operating BYD, Hyundai, and Honda EV fleet vehicles with proper charging protocol.',
        modules_list: ['EV Fundamentals', 'BYD Seal Controls', 'IONIQ 5 Controls', 'Honda Prologue Controls', 'Charging Station Network', 'Range Management', 'Regenerative Braking', 'Winter EV Tips', 'Emergency Procedures', 'Certification Exam']
    },
    {
        id: 'drv-210', title: 'Extended Zone Delivery', role: 'driver', level: 'Core', duration: '1h 45m', modules: 6, progress: 30, status: 'in_progress', cert: false,
        desc: 'Garden River, Goulais River, and Echo Bay delivery routes, protocols, and premium handling.',
        modules_list: ['Extended Zone Overview', 'Garden River Routes', 'Goulais River Routes', 'Echo Bay Routes', 'Premium Service Standards', 'Winter Road Awareness']
    },
    {
        id: 'drv-300', title: 'Advanced Customer Experience', role: 'driver', level: 'Advanced', duration: '2h', modules: 7, progress: 0, status: 'locked', cert: true,
        desc: 'Mastering 5-star delivery: communication, presentation, and conflict resolution.',
        modules_list: ['Customer Psychology', 'Communication Mastery', 'Food Presentation', 'Problem Resolution', 'Accessibility Awareness', 'Cultural Sensitivity', 'Excellence Exam']
    },
    {
        id: 'drv-310', title: 'SOOber Rides Certification', role: 'driver', level: 'Advanced', duration: '4h', modules: 12, progress: 0, status: 'locked', cert: true,
        desc: 'Full rideshare certification: passenger safety, airport protocol, event fleet operations.',
        modules_list: ['Rides Platform Overview', 'Passenger Safety 101', 'Vehicle Inspection', 'Airport Transfer Protocol', 'Event Fleet Standards', 'Premium Service Tiers', 'Accessibility Requirements', 'Night Shift Protocols', 'Incident Reporting', 'Insurance & Liability', 'Defensive Driving', 'Certification Exam']
    },

    // ── Dispatch Training Path ──
    {
        id: 'dsp-100', title: 'Dispatch Console Fundamentals', role: 'dispatch', level: 'Foundation', duration: '3h', modules: 9, progress: 100, status: 'completed', cert: true,
        desc: 'Master the SOOber Dispatch Console: CAD interface, order queue, unit tracking.',
        modules_list: ['Console Interface', 'Order Queue Management', 'Unit Assignments', 'Map & Geofence', 'Status Codes', 'CLI Commands', 'Radio Protocol', 'Priority System', 'Assessment']
    },
    {
        id: 'dsp-200', title: 'Real-Time Fleet Coordination', role: 'dispatch', level: 'Core', duration: '2h 45m', modules: 8, progress: 45, status: 'in_progress', cert: true,
        desc: 'Multi-zone coordination, surge management, and AI copilot utilization.',
        modules_list: ['Zone Management', 'Surge Detection', 'AI Copilot Commands', 'Multi-Unit Dispatch', 'Analytics Dashboard', 'Escalation Matrix', 'Shift Handover', 'Practical Exam']
    },
    {
        id: 'dsp-300', title: 'Incident Command & Crisis Ops', role: 'dispatch', level: 'Advanced', duration: '3h 30m', modules: 10, progress: 0, status: 'locked', cert: true,
        desc: 'Emergency dispatch protocols, multi-agency coordination, crisis communications.',
        modules_list: ['Incident Classification', 'Emergency Response', 'Multi-Agency Coordination', 'Severe Weather Protocol', 'Vehicle Breakdown Handling', 'Missing Delivery Protocol', 'Customer Crisis Comms', 'Post-Incident Review', 'De-Escalation', 'Certification Exam']
    },

    // ── Customer Service Training Path ──
    {
        id: 'cs-100', title: 'CS Agent Onboarding', role: 'cs', level: 'Foundation', duration: '2h', modules: 7, progress: 100, status: 'completed', cert: true,
        desc: 'CRM dashboard, ticket management, AI copilot features, and response standards.',
        modules_list: ['CRM Interface Tour', 'Ticket Triage', 'AI Copilot Usage', 'Response Templates', 'Escalation Policy', 'KPI Targets', 'Final Assessment']
    },
    {
        id: 'cs-200', title: 'Advanced Complaint Resolution', role: 'cs', level: 'Core', duration: '2h 30m', modules: 8, progress: 80, status: 'in_progress', cert: true,
        desc: 'Handling refunds, disputes, dietary incidents, and high-value customer retention.',
        modules_list: ['Refund Request Workflow', 'Dispute Resolution', 'Dietary Incident Protocol', 'Account Escalation', 'Retention Techniques', 'Social Media Response', 'Live Agent Handoff', 'Certification Exam']
    },
    {
        id: 'cs-300', title: 'Enterprise Client Support', role: 'cs', level: 'Advanced', duration: '3h', modules: 9, progress: 0, status: 'locked', cert: true,
        desc: 'Supporting corporate accounts, catering orders, and white-glove service tier.',
        modules_list: ['Corporate Account Structure', 'Catering Order Workflow', 'White-Glove Protocol', 'SLA Management', 'Billing Inquiries', 'Corporate Onboarding', 'Executive Comms', 'Event Coordination', 'Final Exam']
    },

    // ── Admin & Operations ──
    {
        id: 'adm-100', title: 'Platform Administration', role: 'admin', level: 'Foundation', duration: '2h 30m', modules: 8, progress: 55, status: 'in_progress', cert: true,
        desc: 'SuperAdmin dashboard, feature flags, user management, and system health.',
        modules_list: ['Dashboard Overview', 'User & Role MGMT', 'Feature Flags', 'Audit Trail', 'System Health', 'Database Ops', 'Vendor Management', 'Assessment']
    },
    {
        id: 'adm-200', title: 'Data Operations & Sovereignty', role: 'admin', level: 'Core', duration: '3h', modules: 9, progress: 0, status: 'locked', cert: true,
        desc: 'Local compute architecture, data sovereignty principles, Mac Studio cluster management.',
        modules_list: ['Local Compute Overview', 'Mac Studio Clusters', 'Data Sovereignty Law', 'Backup & Replication', 'Network Architecture', 'Security Hardening', 'Incident Response', 'Compliance Audit', 'Certification Exam']
    },

    // ── Safety & Compliance ──
    {
        id: 'saf-100', title: 'Food Safety & HACCP', role: 'safety', level: 'Foundation', duration: '1h 45m', modules: 6, progress: 100, status: 'completed', cert: true,
        desc: 'Food handling, temperature control, allergen protocols, and HACCP principles.',
        modules_list: ['Food Safety Basics', 'Temperature Control', 'Allergen Awareness', 'Cross-Contamination', 'HACCP Principles', 'Certification Exam']
    },
    {
        id: 'saf-200', title: 'Workplace Safety & WHMIS', role: 'safety', level: 'Core', duration: '2h', modules: 7, progress: 0, status: 'not_started', cert: true,
        desc: 'Ontario workplace safety standards, WHMIS, and ergonomic best practices.',
        modules_list: ['Ontario OHSA Overview', 'WHMIS 2015', 'PPE Requirements', 'Ergonomics for Drivers', 'Incident Reporting', 'First Aid Basics', 'Final Exam']
    },
    {
        id: 'saf-300', title: 'Anti-Harassment & DEI', role: 'safety', level: 'Core', duration: '1h 30m', modules: 5, progress: 0, status: 'not_started', cert: true,
        desc: 'Diversity, equity, inclusion training and harassment prevention policies.',
        modules_list: ['DEI Principles', 'Respectful Workplace', 'Harassment Prevention', 'Bystander Intervention', 'Resources & Reporting']
    },

    // ── Leadership ──
    {
        id: 'ldr-100', title: 'Shift Lead Certification', role: 'leadership', level: 'Advanced', duration: '4h', modules: 11, progress: 0, status: 'locked', cert: true,
        desc: 'Leading shifts, coaching team members, performance management, and escalation handling.',
        modules_list: ['Leadership Mindset', 'Shift Planning', 'Team Briefings', 'Performance Coaching', 'Conflict Mediation', 'Escalation Authority', 'Quality Assurance', 'Time Management', 'Reporting & Analytics', 'Mentorship Program', 'Certification Exam']
    },
    {
        id: 'ldr-200', title: 'Operations Manager Program', role: 'leadership', level: 'Advanced', duration: '6h', modules: 14, progress: 0, status: 'locked', cert: true,
        desc: 'Strategic operations management: P&L, vendor relations, market expansion, and team scaling.',
        modules_list: ['Ops Strategy', 'P&L Fundamentals', 'Vendor Negotiations', 'Market Analysis', 'Team Scaling', 'Process Optimization', 'OKR Setting', 'Cross-Functional Leadership', 'Budget Management', 'Regulatory Compliance', 'Community Relations', 'Crisis Leadership', 'Capstone Project', 'Final Assessment']
    },
];

const CERTIFICATIONS = [
    { id: 'cert-driver-basic', name: 'Certified SOOber Driver', level: 'Foundation', icon: '🚗', color: '#10b981', courses: ['drv-100'], earned: true },
    { id: 'cert-ev-ops', name: 'EV Fleet Specialist', level: 'Core', icon: '⚡', color: '#3b82f6', courses: ['drv-100', 'drv-200'], earned: false },
    { id: 'cert-dispatch', name: 'Dispatch Operator', level: 'Foundation', icon: '📡', color: '#f59e0b', courses: ['dsp-100'], earned: true },
    { id: 'cert-cs-agent', name: 'CS Agent Certified', level: 'Foundation', icon: '🎧', color: '#6366f1', courses: ['cs-100'], earned: true },
    { id: 'cert-food-safety', name: 'Food Safety Certified', level: 'Foundation', icon: '🛡️', color: '#ef4444', courses: ['saf-100'], earned: true },
    { id: 'cert-rides', name: 'SOOber Rides Certified', level: 'Advanced', icon: '🏆', color: '#ec4899', courses: ['drv-100', 'drv-200', 'drv-310'], earned: false },
    { id: 'cert-ops-mgr', name: 'Operations Manager', level: 'Advanced', icon: '👑', color: '#f59e0b', courses: ['ldr-200'], earned: false },
];

// ── Quiz System ──────────────────────────────────────────────────────────────
const SAMPLE_QUIZ = [
    { q: 'What is the maximum holding temperature for hot food during delivery?', opts: ['40°C', '60°C', '75°C', '90°C'], correct: 1 },
    { q: 'Which CLI command activates geofence zones in dispatch?', opts: ['/zones', '/geofence on', '/map zones', '/toggle zones'], correct: 0 },
    { q: 'What is the delivery fee for extended zones (Garden River, Echo Bay)?', opts: ['Free', '$4.99', '$7.99 premium', '$12.99'], correct: 2 },
    { q: 'Which vehicle model is NOT in the current SOOber fleet?', opts: ['BYD Seal', 'IONIQ 5', 'Tesla Model 3', 'Honda Prologue'], correct: 2 },
    { q: 'What is the data sovereignty principle at SOOber?', opts: ['Cloud-first always', '100% local compute', 'Hybrid multi-cloud', 'AWS preferred'], correct: 1 },
];

export default function AcademyPage() {
    const { theme, isDark } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeRole, setActiveRole] = useState('all');
    const [view, setView] = useState('catalog'); // catalog | course | quiz | certs
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [quizState, setQuizState] = useState({ active: false, idx: 0, answers: [], score: null });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Stats
    const totalCourses = COURSES.length;
    const completedCourses = COURSES.filter(c => c.status === 'completed').length;
    const inProgress = COURSES.filter(c => c.status === 'in_progress').length;
    const certEarned = CERTIFICATIONS.filter(c => c.earned).length;
    const totalHours = COURSES.reduce((s, c) => {
        const m = c.duration.match(/(\d+)h\s*(\d+)?m?/);
        return s + (parseInt(m?.[1] || 0) * 60 + parseInt(m?.[2] || 0));
    }, 0);
    const completedHours = COURSES.filter(c => c.status === 'completed').reduce((s, c) => {
        const m = c.duration.match(/(\d+)h\s*(\d+)?m?/);
        return s + (parseInt(m?.[1] || 0) * 60 + parseInt(m?.[2] || 0));
    }, 0);

    const filteredCourses = useMemo(() => {
        let list = activeRole === 'all' ? COURSES : COURSES.filter(c => c.role === activeRole);
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            list = list.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
        }
        return list;
    }, [activeRole, searchQuery]);

    const statusColors = { completed: '#22c55e', in_progress: '#3b82f6', not_started: '#71717a', locked: '#52525b' };
    const statusLabels = { completed: 'Completed', in_progress: 'In Progress', not_started: 'Start', locked: '🔒 Locked' };
    const levelColors = { Foundation: '#10b981', Core: '#3b82f6', Advanced: '#8b5cf6' };

    const openCourse = (course) => { setSelectedCourse(course); setView('course'); };
    const startQuiz = () => setQuizState({ active: true, idx: 0, answers: [], score: null });
    const answerQuiz = (ansIdx) => {
        const newAnswers = [...quizState.answers, ansIdx];
        if (quizState.idx >= SAMPLE_QUIZ.length - 1) {
            const score = newAnswers.reduce((s, a, i) => s + (a === SAMPLE_QUIZ[i].correct ? 1 : 0), 0);
            setQuizState({ ...quizState, answers: newAnswers, score, idx: quizState.idx + 1 });
        } else {
            setQuizState({ ...quizState, answers: newAnswers, idx: quizState.idx + 1 });
        }
    };

    const pad = isMobile ? '20px 16px 100px' : '40px 40px 100px';

    return (
        <div style={{ background: theme.bg, minHeight: '100vh', transition: 'all 0.3s ease', paddingBottom: 100 }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: pad }}>

                {/* ── HEADER ────────────────────────────── */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 11, fontWeight: 700, color: '#10b981',
                        letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8,
                    }}>
                        🎓 SOOber Academy
                    </div>
                    <h1 style={{
                        fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 28 : 40,
                        fontWeight: 800, color: theme.text, letterSpacing: '-0.03em',
                        margin: 0, marginBottom: 8,
                    }}>
                        Learning & Development
                    </h1>
                    <p style={{ fontSize: 15, color: theme.textMuted, margin: 0, maxWidth: 600, lineHeight: 1.5 }}>
                        Enterprise training platform. Master your role, earn certifications, and build expertise across the SOOber ecosystem.
                    </p>
                </div>

                {/* ── STATS BAR ────────────────────────── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
                    gap: 12, marginBottom: 28,
                }}>
                    {[
                        { label: 'Completed', value: completedCourses, total: totalCourses, color: '#22c55e', icon: '✅' },
                        { label: 'In Progress', value: inProgress, color: '#3b82f6', icon: '📖' },
                        { label: 'Certifications', value: `${certEarned}/${CERTIFICATIONS.length}`, color: '#f59e0b', icon: '🏆' },
                        { label: 'Hours Logged', value: `${Math.floor(completedHours / 60)}h`, color: '#8b5cf6', icon: '⏱' },
                        { label: 'Total Program', value: `${Math.floor(totalHours / 60)}h`, color: '#6366f1', icon: '📚' },
                    ].map((stat, i) => (
                        <div key={i} style={{
                            background: theme.bgCard, borderRadius: 20, padding: '16px 20px',
                            border: `1px solid ${theme.borderSubtle}`, boxShadow: theme.shadow,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                                <span style={{ fontSize: 16 }}>{stat.icon}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</span>
                            </div>
                            <div style={{ fontSize: 24, fontWeight: 800, color: stat.color, fontFamily: "'DM Sans', sans-serif" }}>
                                {stat.value}{stat.total ? <span style={{ fontSize: 14, color: theme.textFaint }}>/{stat.total}</span> : ''}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── NAVIGATION TABS ──────────────────── */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                    {[
                        { id: 'catalog', label: '📚 Course Catalog', },
                        { id: 'certs', label: '🏆 Certifications' },
                        { id: 'quiz', label: '📝 Quick Quiz' },
                    ].map(t => (
                        <button key={t.id} onClick={() => { setView(t.id); setSelectedCourse(null); }} style={{
                            padding: '10px 20px', borderRadius: 14, border: `1.5px solid ${view === t.id ? theme.accent : theme.border}`,
                            background: view === t.id ? (isDark ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.06)') : theme.bgCard,
                            color: view === t.id ? '#10b981' : theme.textSecondary,
                            fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                            fontFamily: "'Inter', sans-serif",
                        }}>{t.label}</button>
                    ))}
                </div>

                {/* ═══════════════════════════════════════════
                    CATALOG VIEW
                   ═══════════════════════════════════════════ */}
                {view === 'catalog' && !selectedCourse && (
                    <>
                        {/* Role filter + Search */}
                        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexDirection: isMobile ? 'column' : 'row' }}>
                            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', flex: 1, padding: '2px 0' }}>
                                {ROLES.map(r => (
                                    <button key={r.id} onClick={() => setActiveRole(r.id)} style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        padding: '8px 16px', borderRadius: 100, whiteSpace: 'nowrap',
                                        border: activeRole === r.id ? 'none' : `1.5px solid ${theme.border}`,
                                        background: activeRole === r.id ? r.color : theme.bgCard,
                                        color: activeRole === r.id ? '#fff' : theme.textSecondary,
                                        fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                                    }}>
                                        <span>{r.emoji}</span> {r.label}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text" placeholder="Search courses..."
                                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                style={{
                                    background: theme.bgInput, border: `1px solid ${theme.border}`, borderRadius: 14,
                                    padding: '10px 16px', fontSize: 13, fontWeight: 500, color: theme.text,
                                    outline: 'none', width: isMobile ? '100%' : 240, fontFamily: "'Inter', sans-serif",
                                }}
                            />
                        </div>

                        {/* Course Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: 16,
                        }}>
                            {filteredCourses.map(course => {
                                const roleData = ROLES.find(r => r.id === course.role);
                                return (
                                    <div key={course.id} onClick={() => course.status !== 'locked' && openCourse(course)} style={{
                                        background: theme.bgCard, borderRadius: 24, padding: 24,
                                        border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
                                        cursor: course.status === 'locked' ? 'not-allowed' : 'pointer',
                                        opacity: course.status === 'locked' ? 0.5 : 1,
                                        transition: 'all 0.2s',
                                        position: 'relative', overflow: 'hidden',
                                    }}>
                                        {/* Top Row: Level + Role + Cert */}
                                        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                                            <span style={{
                                                fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6,
                                                background: `${levelColors[course.level]}15`, color: levelColors[course.level],
                                                textTransform: 'uppercase', letterSpacing: '0.04em',
                                            }}>{course.level}</span>
                                            <span style={{
                                                fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                                                background: `${roleData?.color}15`, color: roleData?.color,
                                            }}>{roleData?.emoji} {roleData?.label}</span>
                                            {course.cert && <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.06)', color: '#f59e0b' }}>🏆 Cert</span>}
                                        </div>

                                        {/* Title + Description */}
                                        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 6 }}>{course.title}</h3>
                                        <p style={{ fontSize: 13, color: theme.textMuted, margin: 0, marginBottom: 16, lineHeight: 1.5 }}>{course.desc}</p>

                                        {/* Meta Row */}
                                        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: theme.textFaint, marginBottom: 12 }}>
                                            <span>⏱ {course.duration}</span>
                                            <span>📖 {course.modules} modules</span>
                                            <span>#{course.id}</span>
                                        </div>

                                        {/* Progress Bar */}
                                        {course.status !== 'locked' && (
                                            <div>
                                                <div style={{ height: 6, borderRadius: 3, background: theme.bgInput, overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%', borderRadius: 3,
                                                        width: `${course.progress}%`,
                                                        background: course.status === 'completed' ? '#22c55e' : 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                                                        transition: 'width 0.6s ease',
                                                    }} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                                                    <span style={{ fontSize: 11, fontWeight: 600, color: statusColors[course.status] }}>{statusLabels[course.status]}</span>
                                                    <span style={{ fontSize: 11, fontWeight: 700, color: theme.textFaint }}>{course.progress}%</span>
                                                </div>
                                            </div>
                                        )}
                                        {course.status === 'locked' && (
                                            <div style={{ fontSize: 12, fontWeight: 600, color: theme.textFaint }}>
                                                🔒 Complete prerequisites to unlock
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* ═══════════════════════════════════════════
                    COURSE DETAIL VIEW
                   ═══════════════════════════════════════════ */}
                {view === 'course' && selectedCourse && (
                    <div>
                        <button onClick={() => { setView('catalog'); setSelectedCourse(null); }} style={{
                            background: 'none', border: 'none', cursor: 'pointer', color: theme.textFaint,
                            fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0,
                        }}>← Back to Catalog</button>

                        <div style={{
                            background: theme.bgCard, borderRadius: 28, padding: isMobile ? 24 : 40,
                            border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 24,
                        }}>
                            {/* Course Header */}
                            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 8, background: `${levelColors[selectedCourse.level]}15`, color: levelColors[selectedCourse.level], textTransform: 'uppercase' }}>{selectedCourse.level}</span>
                                {selectedCourse.cert && <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 8, background: isDark ? 'rgba(245,158,11,0.1)' : 'rgba(245,158,11,0.06)', color: '#f59e0b' }}>🏆 Earns Certification</span>}
                            </div>
                            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 24 : 32, fontWeight: 800, color: theme.text, margin: 0, marginBottom: 8, letterSpacing: '-0.02em' }}>
                                {selectedCourse.title}
                            </h2>
                            <p style={{ fontSize: 15, color: theme.textMuted, margin: 0, marginBottom: 24, lineHeight: 1.6 }}>{selectedCourse.desc}</p>

                            {/* Course Stats */}
                            <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                                {[
                                    { icon: '⏱', label: 'Duration', value: selectedCourse.duration },
                                    { icon: '📖', label: 'Modules', value: selectedCourse.modules },
                                    { icon: '📊', label: 'Progress', value: `${selectedCourse.progress}%` },
                                    { icon: '#️⃣', label: 'Course ID', value: selectedCourse.id.toUpperCase() },
                                ].map((s, i) => (
                                    <div key={i} style={{
                                        background: theme.bgInput, borderRadius: 16, padding: '12px 20px',
                                        border: `1px solid ${theme.borderSubtle}`, textAlign: 'center', flex: 1, minWidth: 100,
                                    }}>
                                        <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: theme.text }}>{s.value}</div>
                                        <div style={{ fontSize: 10, fontWeight: 600, color: theme.textFaint, textTransform: 'uppercase' }}>{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Progress bar */}
                            <div style={{ marginBottom: 32 }}>
                                <div style={{ height: 8, borderRadius: 4, background: theme.bgInput, overflow: 'hidden' }}>
                                    <div style={{
                                        height: '100%', borderRadius: 4,
                                        width: `${selectedCourse.progress}%`,
                                        background: selectedCourse.status === 'completed' ? '#22c55e' : 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                                        transition: 'width 1s ease',
                                    }} />
                                </div>
                            </div>

                            {/* Module List */}
                            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, marginBottom: 16 }}>
                                Course Modules
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {selectedCourse.modules_list.map((mod, i) => {
                                    const moduleProgress = selectedCourse.progress / 100;
                                    const moduleIdx = Math.floor(moduleProgress * selectedCourse.modules);
                                    const isComplete = i < moduleIdx;
                                    const isCurrent = i === moduleIdx && selectedCourse.status !== 'completed';
                                    const isLocked = i > moduleIdx && selectedCourse.status !== 'completed';

                                    return (
                                        <div key={i} style={{
                                            display: 'flex', alignItems: 'center', gap: 14,
                                            padding: '14px 20px', borderRadius: 16,
                                            background: isCurrent ? (isDark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.04)') : theme.bgInput,
                                            border: `1px solid ${isCurrent ? 'rgba(59,130,246,0.3)' : theme.borderSubtle}`,
                                            opacity: isLocked ? 0.5 : 1,
                                        }}>
                                            <div style={{
                                                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                                                background: isComplete ? '#22c55e' : (isCurrent ? '#3b82f6' : theme.bgCard),
                                                color: isComplete || isCurrent ? '#fff' : theme.textFaint,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 12, fontWeight: 700,
                                                border: isComplete || isCurrent ? 'none' : `1px solid ${theme.border}`,
                                            }}>
                                                {isComplete ? '✓' : (i + 1)}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 14, fontWeight: isCurrent ? 700 : 600, color: theme.text }}>{mod}</div>
                                                {isCurrent && <div style={{ fontSize: 11, color: '#3b82f6', fontWeight: 600, marginTop: 2 }}>▶ Continue</div>}
                                            </div>
                                            {isLocked && <span style={{ fontSize: 14 }}>🔒</span>}
                                            {isComplete && <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 700 }}>Done</span>}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* CTA */}
                            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                                <button style={{
                                    flex: 1, padding: '16px 24px', borderRadius: 16,
                                    background: selectedCourse.status === 'completed' ? '#22c55e' : (isDark ? '#fafafa' : '#09090b'),
                                    color: selectedCourse.status === 'completed' ? '#fff' : (isDark ? '#09090b' : '#fff'),
                                    border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                                    fontFamily: "'DM Sans', sans-serif",
                                }}>
                                    {selectedCourse.status === 'completed' ? '✅ Course Completed' : selectedCourse.status === 'in_progress' ? '▶ Continue Course' : '🚀 Start Course'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════
                    CERTIFICATIONS VIEW
                   ═══════════════════════════════════════════ */}
                {view === 'certs' && (
                    <div>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 800, color: theme.text, marginBottom: 8 }}>
                            Professional Certifications
                        </h2>
                        <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24 }}>
                            Complete required courses to earn industry-grade certifications. Each cert is verifiable and tied to your employee profile.
                        </p>
                        <div style={{
                            display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                            gap: 16,
                        }}>
                            {CERTIFICATIONS.map(cert => (
                                <div key={cert.id} style={{
                                    background: theme.bgCard, borderRadius: 24, padding: 28,
                                    border: `1px solid ${cert.earned ? cert.color + '40' : theme.border}`,
                                    boxShadow: cert.earned ? `0 0 24px ${cert.color}10` : theme.shadow,
                                    position: 'relative', overflow: 'hidden',
                                }}>
                                    {cert.earned && (
                                        <div style={{
                                            position: 'absolute', top: 16, right: 16,
                                            background: cert.color, color: '#fff',
                                            padding: '4px 12px', borderRadius: 100,
                                            fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
                                        }}>Earned ✓</div>
                                    )}
                                    <div style={{ fontSize: 40, marginBottom: 12 }}>{cert.icon}</div>
                                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: theme.text, margin: 0, marginBottom: 6 }}>{cert.name}</h3>
                                    <span style={{
                                        fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 6,
                                        background: `${levelColors[cert.level]}15`, color: levelColors[cert.level],
                                        textTransform: 'uppercase',
                                    }}>{cert.level}</span>
                                    <div style={{ marginTop: 16, fontSize: 12, color: theme.textFaint }}>
                                        <strong>Required courses:</strong>
                                        <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                                            {cert.courses.map(cId => {
                                                const course = COURSES.find(c => c.id === cId);
                                                return (
                                                    <li key={cId} style={{ marginBottom: 4 }}>
                                                        <span style={{ color: course?.status === 'completed' ? '#22c55e' : theme.textFaint }}>
                                                            {course?.status === 'completed' ? '✅' : '○'} {course?.title || cId}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════
                    QUIZ VIEW
                   ═══════════════════════════════════════════ */}
                {view === 'quiz' && (
                    <div>
                        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 800, color: theme.text, marginBottom: 8 }}>
                            Knowledge Check
                        </h2>
                        <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24 }}>
                            Test your SOOber knowledge. {SAMPLE_QUIZ.length} questions covering platform operations.
                        </p>

                        {!quizState.active && quizState.score === null && (
                            <div style={{
                                background: theme.bgCard, borderRadius: 28, padding: 40,
                                border: `1px solid ${theme.border}`, textAlign: 'center',
                            }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>📝</div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, color: theme.text, marginBottom: 8 }}>SOOber Platform Quick Quiz</h3>
                                <p style={{ fontSize: 14, color: theme.textMuted, marginBottom: 24 }}>{SAMPLE_QUIZ.length} multiple choice questions · No time limit</p>
                                <button onClick={startQuiz} style={{
                                    padding: '16px 40px', borderRadius: 16,
                                    background: isDark ? '#fafafa' : '#09090b',
                                    color: isDark ? '#09090b' : '#fff',
                                    border: 'none', fontSize: 16, fontWeight: 700, cursor: 'pointer',
                                }}>Start Quiz →</button>
                            </div>
                        )}

                        {quizState.active && quizState.idx < SAMPLE_QUIZ.length && (
                            <div style={{
                                background: theme.bgCard, borderRadius: 28, padding: isMobile ? 24 : 40,
                                border: `1px solid ${theme.border}`, boxShadow: theme.shadow,
                            }}>
                                {/* Question counter + progress */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: theme.textFaint }}>Question {quizState.idx + 1} / {SAMPLE_QUIZ.length}</span>
                                    <div style={{ width: 120, height: 6, borderRadius: 3, background: theme.bgInput, overflow: 'hidden' }}>
                                        <div style={{ height: '100%', width: `${((quizState.idx + 1) / SAMPLE_QUIZ.length) * 100}%`, background: '#10b981', borderRadius: 3, transition: 'width 0.3s' }} />
                                    </div>
                                </div>

                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 18 : 22, fontWeight: 700, color: theme.text, marginBottom: 24, lineHeight: 1.4 }}>
                                    {SAMPLE_QUIZ[quizState.idx].q}
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {SAMPLE_QUIZ[quizState.idx].opts.map((opt, i) => (
                                        <button key={i} onClick={() => answerQuiz(i)} style={{
                                            padding: '16px 20px', borderRadius: 16,
                                            background: theme.bgInput, border: `1.5px solid ${theme.border}`,
                                            color: theme.text, fontSize: 15, fontWeight: 600,
                                            cursor: 'pointer', textAlign: 'left',
                                            transition: 'all 0.2s', fontFamily: "'Inter', sans-serif",
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.background = isDark ? 'rgba(16,185,129,0.08)' : 'rgba(16,185,129,0.04)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.background = theme.bgInput; }}
                                        >
                                            <span style={{ color: theme.textFaint, marginRight: 12, fontWeight: 800 }}>{String.fromCharCode(65 + i)}.</span>
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {quizState.score !== null && (
                            <div style={{
                                background: theme.bgCard, borderRadius: 28, padding: 40,
                                border: `1px solid ${theme.border}`, textAlign: 'center',
                            }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>
                                    {quizState.score >= 4 ? '🎉' : quizState.score >= 3 ? '👍' : '📖'}
                                </div>
                                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 800, color: theme.text, margin: 0, marginBottom: 8 }}>
                                    {quizState.score}/{SAMPLE_QUIZ.length}
                                </h3>
                                <p style={{ fontSize: 15, color: theme.textMuted, marginBottom: 8 }}>
                                    {quizState.score >= 4 ? 'Excellent! You know the platform inside out.' : quizState.score >= 3 ? 'Good work! Review a few more modules.' : 'Keep studying — you\'ll get there!'}
                                </p>
                                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 24 }}>
                                    <button onClick={() => setQuizState({ active: false, idx: 0, answers: [], score: null })} style={{
                                        padding: '14px 28px', borderRadius: 14, background: theme.bgInput,
                                        border: `1px solid ${theme.border}`, color: theme.text,
                                        fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                    }}>Try Again</button>
                                    <button onClick={() => setView('catalog')} style={{
                                        padding: '14px 28px', borderRadius: 14,
                                        background: isDark ? '#fafafa' : '#09090b',
                                        color: isDark ? '#09090b' : '#fff',
                                        border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                    }}>Back to Courses</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
