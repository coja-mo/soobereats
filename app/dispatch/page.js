'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { generateDispatchUnits, INCIDENT_SEED, LIVE_EVENTS } from '@/lib/data/dispatchData';

/* ─── Geofence Zone Definitions ─── */
const GEOFENCE_ZONES = [
    { name: 'Downtown Core', radius: 18, color: '#22c55e', x: 50, y: 50, fee: 'Free', range: '0–3 km' },
    { name: 'East End', radius: 30, color: '#eab308', x: 50, y: 50, fee: '$2.99', range: '3–6 km' },
    { name: 'West End', radius: 30, color: '#eab308', x: 50, y: 50, fee: '$2.99', range: '3–6 km' },
    { name: 'North End', radius: 40, color: '#f97316', x: 50, y: 50, fee: '$3.99', range: '4–8 km' },
    { name: 'Extended Zone', radius: 52, color: '#ef4444', x: 50, y: 50, fee: '$5.99', range: '8–12 km' },
];

/* ─── Order Queue Generator ─── */
const ORDER_RESTAURANTS = [
    { name: "Pino's Fresh Grocery", emoji: '🥬', zone: 'Downtown Core' },
    { name: 'Sakura Ramen House', emoji: '🍜', zone: 'East Side' },
    { name: 'El Fuego Taqueria', emoji: '🌮', zone: 'North End' },
    { name: 'Bella Napoli', emoji: '🍕', zone: 'Downtown Core' },
    { name: 'The Burger Lab', emoji: '🍔', zone: 'Great Northern Rd' },
    { name: 'Northern Pho', emoji: '🍲', zone: 'East Side' },
    { name: 'Mama Mia Bakery', emoji: '🥐', zone: 'Downtown Core' },
    { name: 'Soo Sushi', emoji: '🍱', zone: 'Station Mall' },
];

const RIDE_ORIGINS = [
    { from: 'Algoma U', to: 'Downtown Core' },
    { from: 'Sault College', to: 'Station Mall' },
    { from: 'SOOber Airport (YAM)', to: 'North End' },
    { from: 'Station Mall', to: 'Algoma U' },
    { from: 'Great Northern Rd', to: 'East Side' },
    { from: 'Pine St Hub', to: 'SOOber Airport (YAM)' },
    { from: 'Downtown Core', to: 'Sault College' },
    { from: 'Base Station', to: 'Downtown Core' },
];

let orderCounter = 4000;
function generateOrder() {
    orderCounter++;
    const isDelivery = Math.random() > 0.4;
    if (isDelivery) {
        const rest = ORDER_RESTAURANTS[Math.floor(Math.random() * ORDER_RESTAURANTS.length)];
        const items = Math.floor(Math.random() * 4) + 1;
        const total = (Math.random() * 45 + 12).toFixed(2);
        return {
            id: `ORD-${orderCounter}`,
            type: 'Delivery',
            restaurant: rest.name,
            emoji: rest.emoji,
            destination: rest.zone,
            items,
            total,
            priority: Math.random() > 0.85 ? 'HIGH' : 'NORMAL',
            status: 'PENDING',
            assignedUnit: null,
            createdAt: new Date(),
        };
    } else {
        const route = RIDE_ORIGINS[Math.floor(Math.random() * RIDE_ORIGINS.length)];
        const passengers = Math.floor(Math.random() * 3) + 1;
        return {
            id: `RIDE-${orderCounter}`,
            type: 'Ride',
            from: route.from,
            destination: route.to,
            passengers,
            total: (Math.random() * 25 + 8).toFixed(2),
            priority: Math.random() > 0.9 ? 'VIP' : 'NORMAL',
            status: 'PENDING',
            assignedUnit: null,
            createdAt: new Date(),
        };
    }
}

function generateInitialOrders() {
    const orders = [];
    for (let i = 0; i < 6; i++) orders.push(generateOrder());
    return orders;
}

export default function DispatchDashboard() {
    const [units, setUnits] = useState([]);
    const [unitTypeFilter, setUnitTypeFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [command, setCommand] = useState('');
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [clock, setClock] = useState('');
    const [feed, setFeed] = useState([]);
    const [orders, setOrders] = useState([]);
    const [orderQueueFilter, setOrderQueueFilter] = useState('All');
    const [showZones, setShowZones] = useState(true);
    const [showAnalytics, setShowAnalytics] = useState(true);
    const endOfFeedRef = useRef(null);
    const liveEventIndex = useRef(0);

    const pushFeed = useCallback((type, message) => {
        setFeed(prev => [...prev, {
            id: Date.now() + Math.random(),
            type,
            message,
            time: new Date().toLocaleTimeString('en-US', { hour12: false })
        }]);
    }, []);

    // Initialise
    useEffect(() => {
        setUnits(generateDispatchUnits());
        setOrders(generateInitialOrders());
        const now = () => new Date().toLocaleTimeString('en-US', { hour12: false });
        setFeed(INCIDENT_SEED.map((e, i) => ({ ...e, id: i, time: now() })));
    }, []);

    // Real-time clock
    useEffect(() => {
        const tick = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        tick();
        const t = setInterval(tick, 1000);
        return () => clearInterval(t);
    }, []);

    // Live simulation: new event every 8s
    useEffect(() => {
        const t = setInterval(() => {
            const event = LIVE_EVENTS[liveEventIndex.current % LIVE_EVENTS.length];
            liveEventIndex.current++;
            pushFeed(event.type, event.message);
        }, 8000);
        return () => clearInterval(t);
    }, [pushFeed]);

    // New orders arriving every 12s
    useEffect(() => {
        const t = setInterval(() => {
            const newOrder = generateOrder();
            setOrders(prev => [newOrder, ...prev]);
            pushFeed('dispatch', `New ${newOrder.type.toLowerCase()} order ${newOrder.id} from ${newOrder.type === 'Delivery' ? newOrder.restaurant : newOrder.from}. ${newOrder.priority !== 'NORMAL' ? `⚡ ${newOrder.priority}` : ''}`);
        }, 12000);
        return () => clearInterval(t);
    }, [pushFeed]);

    // Auto-assign simulation: every 15s, assign the oldest PENDING order to an available unit
    useEffect(() => {
        const t = setInterval(() => {
            setOrders(prev => {
                const pendingIdx = prev.findIndex(o => o.status === 'PENDING');
                if (pendingIdx === -1) return prev;

                const order = prev[pendingIdx];
                const matchType = order.type === 'Delivery' ? 'Delivery' : 'Ride';

                setUnits(prevUnits => {
                    const availIdx = prevUnits.findIndex(u => u.type === matchType && u.status === 'Active');
                    if (availIdx === -1) return prevUnits;

                    const unit = prevUnits[availIdx];
                    pushFeed('dispatch', `AUTO-ASSIGN: ${unit.id} (${unit.name}) → ${order.id}. Route optimised via PremierRoute-v3.`);

                    const updated = [...prevUnits];
                    updated[availIdx] = { ...unit, status: 'En Route', eta: `${Math.floor(Math.random() * 12) + 3} mins` };
                    return updated;
                });

                const updated = [...prev];
                updated[pendingIdx] = { ...order, status: 'DISPATCHED' };
                return updated;
            });
        }, 15000);
        return () => clearInterval(t);
    }, [pushFeed]);

    // Auto-scroll feed
    useEffect(() => {
        endOfFeedRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [feed]);

    // Command handler
    const handleCommandSubmit = (e) => {
        e.preventDefault();
        if (!command.trim()) return;
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const echo = { id: Date.now(), type: 'system', message: `> ${command}`, time };
        let response = null;
        const cmd = command.toLowerCase().trim();

        if (cmd.startsWith('/assign')) {
            // /assign R-001 ORD-4001
            const parts = cmd.split(' ');
            if (parts.length >= 3) {
                const unitId = parts[1].toUpperCase();
                const orderId = parts[2].toUpperCase();
                const unit = units.find(u => u.id === unitId);
                const order = orders.find(o => o.id === orderId);

                if (!unit) {
                    response = { id: Date.now() + 1, type: 'alert', message: `Unit ${unitId} not found.`, time };
                } else if (!order) {
                    response = { id: Date.now() + 1, type: 'alert', message: `Order ${orderId} not found in queue.`, time };
                } else if (order.status !== 'PENDING') {
                    response = { id: Date.now() + 1, type: 'alert', message: `Order ${orderId} already ${order.status}.`, time };
                } else {
                    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'DISPATCHED', assignedUnit: unitId } : o));
                    setUnits(prev => prev.map(u => u.id === unitId ? { ...u, status: 'En Route', eta: `${Math.floor(Math.random() * 12) + 3} mins` } : u));
                    response = { id: Date.now() + 1, type: 'dispatch', message: `ACK: ${unitId} → ${orderId}. Route optimising...`, time };
                }
            } else {
                response = { id: Date.now() + 1, type: 'system', message: 'Usage: /assign <UNIT_ID> <ORDER_ID>', time };
            }
        } else if (cmd.startsWith('/status')) {
            const parts = cmd.split(' ');
            if (parts.length >= 3) {
                const unitId = parts[1].toUpperCase();
                const newStatus = parts.slice(2).join(' ');
                setUnits(prev => prev.map(u => u.id === unitId ? { ...u, status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1) } : u));
                response = { id: Date.now() + 1, type: 'system', message: `ACK: ${unitId} status → ${newStatus}.`, time };
            } else {
                response = { id: Date.now() + 1, type: 'system', message: 'Usage: /status <UNIT_ID> <new_status>', time };
            }
        } else if (cmd === '/clear') {
            setFeed([]); setCommand(''); return;
        } else if (cmd === '/zones') {
            setShowZones(prev => !prev);
            response = { id: Date.now() + 1, type: 'system', message: `Geofence zones ${!showZones ? 'ENABLED' : 'DISABLED'}.`, time };
        } else if (cmd === '/analytics') {
            setShowAnalytics(prev => !prev);
            response = { id: Date.now() + 1, type: 'system', message: `Analytics strip ${!showAnalytics ? 'ENABLED' : 'DISABLED'}.`, time };
        } else if (cmd === '/help') {
            response = { id: Date.now() + 1, type: 'system', message: 'Commands: /assign <unit> <order> | /status <unit> <status> | /locate <unit> | /queue | /zones | /analytics | /clear | /help', time };
        } else if (cmd.startsWith('/locate')) {
            const unitId = cmd.split(' ')[1]?.toUpperCase();
            const unit = units.find(u => u.id === unitId);
            if (unit) {
                setSelectedUnit(unit);
                response = { id: Date.now() + 1, type: 'system', message: `Located ${unitId}: ${unit.location} (${unit.vehicle}). Battery: ${unit.battery}%.`, time };
            } else {
                response = { id: Date.now() + 1, type: 'alert', message: `Unit ${unitId || '???'} not found.`, time };
            }
        } else if (cmd === '/queue') {
            const pending = orders.filter(o => o.status === 'PENDING').length;
            const dispatched = orders.filter(o => o.status === 'DISPATCHED').length;
            response = { id: Date.now() + 1, type: 'system', message: `Queue: ${pending} pending, ${dispatched} dispatched, ${orders.length} total.`, time };
        } else {
            response = { id: Date.now() + 1, type: 'alert', message: 'Unrecognised command. Type /help for available commands.', time };
        }

        setFeed(prev => [...prev, echo, response].filter(Boolean));
        setCommand('');
    };

    // Filtering
    const filteredUnits = useMemo(() => {
        return units.filter(u => {
            if (unitTypeFilter !== 'All' && u.type !== unitTypeFilter) return false;
            if (statusFilter === 'Active/EnRoute' && !['Active', 'En Route'].includes(u.status)) return false;
            else if (statusFilter !== 'All' && statusFilter !== 'Active/EnRoute' && u.status !== statusFilter) return false;
            if (search) {
                const q = search.toLowerCase();
                return u.id.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) || u.vehicle.toLowerCase().includes(q) || u.location.toLowerCase().includes(q);
            }
            return true;
        });
    }, [units, unitTypeFilter, statusFilter, search]);

    const filteredOrders = useMemo(() => {
        if (orderQueueFilter === 'All') return orders;
        return orders.filter(o => o.status === orderQueueFilter);
    }, [orders, orderQueueFilter]);

    // Stats
    const activeRides = units.filter(u => u.type === 'Ride' && ['Active', 'En Route'].includes(u.status)).length;
    const activeDelivery = units.filter(u => u.type === 'Delivery' && ['Active', 'En Route'].includes(u.status)).length;
    const offlineCount = units.filter(u => u.status === 'Offline' || u.status === 'Charging').length;
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
    const totalActive = activeRides + activeDelivery;
    const fleetUtil = units.length > 0 ? ((totalActive / units.length) * 100).toFixed(0) : 0;
    const ordersDispatched = orders.filter(o => o.status === 'DISPATCHED').length;
    const revenueRate = orders.reduce((sum, o) => sum + parseFloat(o.total), 0).toFixed(0);

    return (
        <div className={styles.dispatchContainer}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo}>SOOber PremierOne</div>
                    <div className={styles.badge}>CAD — Live Ops</div>
                </div>
                <div className={styles.systemStatus}>
                    <span className={styles.clock}>{clock}</span>
                    <span className={styles.separator}>|</span>
                    <span>QUEUE: {pendingOrders} pending</span>
                    <span className={styles.separator}>|</span>
                    <span>Node: M2 Ultra (12ms)</span>
                    <div className={styles.statusItem}>
                        <span>COMPUTE</span>
                        <div className={styles.pulse}></div>
                    </div>
                    <Link href="/">
                        <button style={{
                            background: 'transparent', border: '1px solid rgba(0,255,128,0.3)',
                            color: '#00ff80', padding: '0.25rem 0.75rem', borderRadius: '2px',
                            cursor: 'pointer', fontFamily: 'monospace', textTransform: 'uppercase', fontSize: '0.7rem'
                        }}>Exit CAD</button>
                    </Link>
                </div>
            </header>

            <main className={styles.mainGrid}>
                {/* ─── LEFT: Unit Roster ─── */}
                <section className={styles.panel}>
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Unit Roster ({filteredUnits.length}/{units.length})</h2>
                    </header>
                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Search by ID, name, vehicle..." value={search} onChange={(e) => setSearch(e.target.value)} className={styles.searchInput} />
                    </div>
                    <div className={styles.filters}>
                        {['All', 'Ride', 'Delivery'].map(t => (
                            <button key={t} className={`${styles.filterBtn} ${unitTypeFilter === t ? styles.active : ''}`} onClick={() => setUnitTypeFilter(t)}>
                                {t === 'All' ? 'ALL' : t.toUpperCase()}
                            </button>
                        ))}
                        <div className={styles.filterDivider}></div>
                        {['All', 'Active/EnRoute', 'Offline'].map(s => (
                            <button key={s} className={`${styles.filterBtn} ${statusFilter === s ? styles.active : ''}`} onClick={() => setStatusFilter(s)}>
                                {s === 'Active/EnRoute' ? 'ACT/ENR' : s.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className={styles.panelContent}>
                        <div className={styles.driverList}>
                            {filteredUnits.map(driver => (
                                <div key={driver.id} className={`${styles.driverCard} ${selectedUnit?.id === driver.id ? styles.selected : ''}`} onClick={() => setSelectedUnit(selectedUnit?.id === driver.id ? null : driver)}>
                                    <div className={styles.driverTop}>
                                        <div><span className={styles.driverId}>{driver.id}</span><span className={styles.driverName}>{driver.name}</span></div>
                                        <span className={`${styles.statusIndicator} ${styles[driver.status.replace(/\s+/g, '').toLowerCase()]}`}>{driver.status}</span>
                                    </div>
                                    <div className={styles.driverDetails}>
                                        <span>{driver.vehicle}</span>
                                        <span>{driver.location} • {driver.eta} • {driver.battery}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CENTER TOP: Map ─── */}
                <section className={styles.centerPane}>
                    <div className={styles.mapArea}>
                        <div className={styles.gridOverlay}></div>

                        {/* Geofence Zone Rings */}
                        {showZones && GEOFENCE_ZONES.map((zone, i) => (
                            <div key={zone.name} className={styles.geofenceRing} style={{
                                width: `${zone.radius}%`, height: `${zone.radius}%`,
                                top: `${zone.y}%`, left: `${zone.x}%`,
                                borderColor: zone.color,
                                animationDelay: `${i * 0.3}s`,
                            }}>
                                <span className={styles.zoneName} style={{ color: zone.color }}>{zone.name}</span>
                            </div>
                        ))}

                        {/* Zone toggle */}
                        <div className={styles.zoneToggle}>
                            <button className={`${styles.filterBtn} ${showZones ? styles.active : ''}`} onClick={() => setShowZones(!showZones)} style={{ fontSize: '0.55rem' }}>ZONES {showZones ? 'ON' : 'OFF'}</button>
                            <button className={`${styles.filterBtn} ${showAnalytics ? styles.active : ''}`} onClick={() => setShowAnalytics(!showAnalytics)} style={{ fontSize: '0.55rem' }}>KPIs {showAnalytics ? 'ON' : 'OFF'}</button>
                        </div>

                        {units.filter(u => ['Active', 'En Route', 'Busy'].includes(u.status)).map(u => (
                            <div key={u.id} className={`${styles.mapBlip} ${selectedUnit?.id === u.id ? styles.mapBlipSelected : ''}`} onClick={() => setSelectedUnit(u)} title={`${u.id} — ${u.name} (${u.vehicle})`}
                                style={{ top: `${u.mapY}%`, left: `${u.mapX}%`, background: u.type === 'Ride' ? '#00ff80' : '#00c8ff', color: u.type === 'Ride' ? '#00ff80' : '#00c8ff' }}></div>
                        ))}

                        {selectedUnit && (
                            <div className={styles.unitDetailOverlay}>
                                <div className={styles.detailClose} onClick={() => setSelectedUnit(null)}>×</div>
                                <div className={styles.detailHeader}>
                                    <span className={styles.detailId}>{selectedUnit.id}</span>
                                    <span className={`${styles.statusIndicator} ${styles[selectedUnit.status.replace(/\s+/g, '').toLowerCase()]}`}>{selectedUnit.status}</span>
                                </div>
                                <div className={styles.detailName}>{selectedUnit.name}</div>
                                <div className={styles.detailGrid}>
                                    <div><span>Vehicle</span><span>{selectedUnit.vehicle}</span></div>
                                    <div><span>Location</span><span>{selectedUnit.location}</span></div>
                                    <div><span>ETA</span><span>{selectedUnit.eta}</span></div>
                                    <div><span>Battery</span><span>{selectedUnit.battery}%</span></div>
                                    <div><span>Type</span><span>{selectedUnit.type}</span></div>
                                    <div><span>Coord</span><span>{selectedUnit.mapX.toFixed(1)}, {selectedUnit.mapY.toFixed(1)}</span></div>
                                </div>
                            </div>
                        )}

                        <div className={styles.mapOverlay}>
                            <div className={styles.mapStat}><span>Total Units:</span><span>{units.length}</span></div>
                            <div className={styles.mapStat}><span>Active Rides:</span><span style={{ color: '#00ff80' }}>{activeRides}</span></div>
                            <div className={styles.mapStat}><span>Active Delivery:</span><span style={{ color: '#00c8ff' }}>{activeDelivery}</span></div>
                            <div className={styles.mapStat}><span>Offline/Charging:</span><span style={{ color: '#ff6464' }}>{offlineCount}</span></div>
                            <div className={styles.mapStat}><span>Pending Orders:</span><span style={{ color: '#ffa600' }}>{pendingOrders}</span></div>
                        </div>
                    </div>

                    {/* Analytics Strip */}
                    {showAnalytics && (
                        <div className={styles.analyticsStrip}>
                            <div className={styles.kpi}>
                                <span className={styles.kpiLabel}>Avg Response</span>
                                <span className={styles.kpiValue}>4.2 min</span>
                            </div>
                            <div className={styles.kpi}>
                                <span className={styles.kpiLabel}>Orders / hr</span>
                                <span className={styles.kpiValue}>{Math.max(orders.length * 5, 28)}</span>
                            </div>
                            <div className={styles.kpi}>
                                <span className={styles.kpiLabel}>Fleet Util</span>
                                <span className={styles.kpiValue} style={{ color: parseInt(fleetUtil) > 60 ? '#00ff80' : '#ffa600' }}>{fleetUtil}%</span>
                            </div>
                            <div className={styles.kpi}>
                                <span className={styles.kpiLabel}>Dispatched</span>
                                <span className={styles.kpiValue}>{ordersDispatched}</span>
                            </div>
                            <div className={styles.kpi}>
                                <span className={styles.kpiLabel}>Revenue Pipeline</span>
                                <span className={styles.kpiValue}>${revenueRate}</span>
                            </div>
                            <div className={styles.kpi}>
                                <span className={styles.kpiLabel}>Active / Total</span>
                                <span className={styles.kpiValue}>{totalActive} / {units.length}</span>
                            </div>
                        </div>
                    )}

                    <div className={styles.commandBarArea}>
                        <form onSubmit={handleCommandSubmit} className={styles.commandForm}>
                            <span className={styles.commandPrompt}>CAD&gt;</span>
                            <input type="text" className={styles.commandInput} value={command} onChange={(e) => setCommand(e.target.value)} placeholder="/assign R-001 ORD-4001 | /status | /zones | /analytics | /help" autoFocus />
                            <button type="submit" className={styles.commandBtn}>EXEC</button>
                        </form>
                    </div>
                </section>

                {/* ─── RIGHT: Order Queue + Incident Feed + Copilot ─── */}
                <section className={`${styles.panel} ${styles.rightPanel}`}>
                    {/* Order Queue */}
                    <header className={styles.panelHeader}>
                        <h2 className={styles.panelTitle}>Order Queue ({orders.length})</h2>
                        <span className={styles.feedCount}>{pendingOrders} pending</span>
                    </header>
                    <div className={styles.filters} style={{ borderTop: 'none' }}>
                        {['All', 'PENDING', 'DISPATCHED'].map(f => (
                            <button key={f} className={`${styles.filterBtn} ${orderQueueFilter === f ? styles.active : ''}`} onClick={() => setOrderQueueFilter(f)}>
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className={styles.orderQueueContent}>
                        {filteredOrders.map(order => (
                            <div key={order.id} className={`${styles.orderCard} ${order.priority !== 'NORMAL' ? styles.highPriority : ''}`}>
                                <div className={styles.orderTop}>
                                    <div>
                                        <span className={styles.orderId}>{order.id}</span>
                                        {order.priority !== 'NORMAL' && <span className={styles.priorityBadge}>{order.priority}</span>}
                                    </div>
                                    <span className={`${styles.orderStatus} ${styles[order.status.toLowerCase()]}`}>{order.status}</span>
                                </div>
                                <div className={styles.orderDetails}>
                                    {order.type === 'Delivery' ? (
                                        <span>{order.emoji} {order.restaurant} → {order.destination} ({order.items} items)</span>
                                    ) : (
                                        <span>🚗 {order.from} → {order.destination} ({order.passengers} pax)</span>
                                    )}
                                </div>
                                <div className={styles.orderMeta}>
                                    <span>${order.total}</span>
                                    <span>{order.assignedUnit || 'Unassigned'}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Incident Feed */}
                    <div className={styles.copilotHeader}>
                        <span className={styles.copilotTitle}>◆ Incident Feed</span>
                        <span className={styles.feedCount} style={{ marginLeft: 'auto' }}>{feed.length}</span>
                    </div>
                    <div className={styles.feedContent}>
                        <div className={styles.incidentFeed}>
                            {feed.slice(-20).map(log => (
                                <div key={log.id} className={`${styles.feedItem} ${styles[log.type]}`}>
                                    <span className={styles.feedTime}>{log.time}</span>
                                    {log.message}
                                </div>
                            ))}
                            <div ref={endOfFeedRef} />
                        </div>
                    </div>

                    {/* Copilot Footer */}
                    <div className={styles.copilotFooter}>
                        <div className={styles.statRow}><span>◆ AI Copilot</span><span style={{ color: '#00ff80' }}>ONLINE</span></div>
                        <div className={styles.statRow}><span>Hardware:</span><span>M2 Ultra</span></div>
                        <div className={styles.statRow}><span>Neural Engine:</span><span>42.1%</span></div>
                        <div className={styles.statRow}><span>Data Residency:</span><span>Algoma (100%)</span></div>
                        <div className={styles.statRow}><span>PremierRoute:</span><span>v3 ACTIVE</span></div>
                    </div>
                </section>
            </main>
        </div>
    );
}
