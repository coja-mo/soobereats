'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { restaurants } from '../../lib/data/restaurants';
import { partnerDetails, getPartnerStats } from '../../lib/data/partnersData';

export default function PartnersDashboard() {
    const [search, setSearch] = useState('');
    const [tierFilter, setTierFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedId, setSelectedId] = useState(null);

    // ── Merge restaurant data with partner details ───────
    const allPartners = useMemo(() => {
        const merged = [];
        const seenIds = new Set();

        // Add restaurants that have partner details
        for (const r of restaurants) {
            const pd = partnerDetails[r.id];
            if (pd && !seenIds.has(r.id)) {
                seenIds.add(r.id);
                merged.push({
                    ...r,
                    pd,
                });
            }
        }

        // Add partner details that don't have restaurant entries (edge case)
        for (const [id, pd] of Object.entries(partnerDetails)) {
            if (!seenIds.has(id)) {
                seenIds.add(id);
                merged.push({
                    id,
                    name: pd.legalName,
                    category: pd.categories?.[0] || 'Other',
                    logo: '🏪',
                    rating: null,
                    menu: [],
                    pd,
                });
            }
        }

        return merged.sort((a, b) => a.name.localeCompare(b.name));
    }, []);

    // ── Filter + search logic ────────────────────────────
    const filtered = useMemo(() => {
        return allPartners.filter(p => {
            const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.pd?.legalName?.toLowerCase().includes(search.toLowerCase()) ||
                p.category?.toLowerCase().includes(search.toLowerCase()) ||
                p.pd?.phone?.includes(search) ||
                p.pd?.email?.toLowerCase().includes(search.toLowerCase());
            const matchTier = tierFilter === 'all' || p.pd?.tier === tierFilter;
            const matchStatus = statusFilter === 'all' || p.pd?.status === statusFilter;
            return matchSearch && matchTier && matchStatus;
        });
    }, [allPartners, search, tierFilter, statusFilter]);

    // ── Stats ────────────────────────────────────────────
    const stats = useMemo(() => getPartnerStats(), []);

    // ── Selected detail ──────────────────────────────────
    const selected = selectedId ? allPartners.find(p => p.id === selectedId) : null;
    const selectedRestaurant = selected ? restaurants.find(r => r.id === selected.id) : null;

    // ── Helpers ──────────────────────────────────────────
    const getTierClass = (tier) => {
        const map = { founding: styles.tierFounding, premium: styles.tierPremium, standard: styles.tierStandard, marketplace: styles.tierMarketplace };
        return map[tier] || styles.tierStandard;
    };

    const getStatusClass = (status) => {
        const map = { active: styles.statusActive, pending: styles.statusPending, paused: styles.statusPaused };
        return map[status] || styles.statusActive;
    };

    return (
        <div className={styles.container}>
            {/* ═══ Header ═══ */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.logo}>Local Partners</div>
                    <span className={styles.badge}>Admin Dashboard</span>
                </div>
                <div className={styles.headerRight}>
                    <Link href="/founder" className={styles.headerBtn}>← Founder</Link>
                    <Link href="/" className={styles.headerBtn}>🏠 Home</Link>
                </div>
            </header>

            <main className={styles.main}>
                {/* ═══ Stats Row ═══ */}
                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Total Partners</div>
                        <div className={styles.statValue} style={{ color: '#fff' }}>{stats.total}</div>
                        <div className={styles.statSub}>{stats.totalLocations} locations</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>Active</div>
                        <div className={styles.statValue} style={{ color: '#10b981' }}>{stats.active}</div>
                        <div className={styles.statSub}>Live on platform</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>🏆 Founding</div>
                        <div className={styles.statValue} style={{ color: '#f59e0b' }}>{stats.founding}</div>
                        <div className={styles.statSub}>Charter partners</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>💎 Premium</div>
                        <div className={styles.statValue} style={{ color: '#a855f7' }}>{stats.premium}</div>
                        <div className={styles.statSub}>Featured partners</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>📞 With Phone</div>
                        <div className={styles.statValue} style={{ color: '#3b82f6' }}>{stats.withPhone}</div>
                        <div className={styles.statSub}>of {stats.total} total</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statLabel}>🌐 With Website</div>
                        <div className={styles.statValue} style={{ color: '#3b82f6' }}>{stats.withWebsite}</div>
                        <div className={styles.statSub}>of {stats.total} total</div>
                    </div>
                </div>

                {/* ═══ Controls ═══ */}
                <div className={styles.controls}>
                    <div className={styles.searchWrapper}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search partners by name, category, phone, or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={styles.searchInput}
                        />
                    </div>

                    <button
                        className={`${styles.filterBtn} ${tierFilter === 'all' ? styles.filterBtnActive : ''}`}
                        onClick={() => setTierFilter('all')}
                    >All Tiers</button>
                    <button
                        className={`${styles.filterBtn} ${tierFilter === 'founding' ? styles.filterBtnActive : ''}`}
                        onClick={() => setTierFilter(tierFilter === 'founding' ? 'all' : 'founding')}
                    >🏆 Founding</button>
                    <button
                        className={`${styles.filterBtn} ${tierFilter === 'premium' ? styles.filterBtnActive : ''}`}
                        onClick={() => setTierFilter(tierFilter === 'premium' ? 'all' : 'premium')}
                    >💎 Premium</button>
                    <button
                        className={`${styles.filterBtn} ${tierFilter === 'standard' ? styles.filterBtnActive : ''}`}
                        onClick={() => setTierFilter(tierFilter === 'standard' ? 'all' : 'standard')}
                    >📋 Standard</button>
                </div>

                {/* ═══ Partner Table ═══ */}
                <div className={styles.tablePanel}>
                    <div className={styles.tablePanelHeader}>
                        <h2 className={styles.tablePanelTitle}>Partner Directory</h2>
                        <span className={styles.tablePanelCount}>{filtered.length} partners</span>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Partner</th>
                                <th>Tier</th>
                                <th>Status</th>
                                <th>Phone</th>
                                <th>Website</th>
                                <th>Locations</th>
                                <th>Commission</th>
                                <th>Onboarded</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((p) => (
                                <tr
                                    key={p.id}
                                    className={`${styles.tableRow} ${selectedId === p.id ? styles.selected : ''}`}
                                    onClick={() => setSelectedId(p.id)}
                                >
                                    <td>
                                        <div className={styles.partnerName}>
                                            <div className={styles.partnerLogo}>{p.logo || '🏪'}</div>
                                            <div className={styles.partnerInfo}>
                                                <span className={styles.partnerTitle}>{p.name}</span>
                                                <span className={styles.partnerCategory}>{p.category}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.tierBadge} ${getTierClass(p.pd?.tier)}`}>
                                            {p.pd?.tier || 'standard'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${getStatusClass(p.pd?.status)}`}>
                                            <span className={styles.statusDot} />
                                            {p.pd?.status || 'active'}
                                        </span>
                                    </td>
                                    <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: p.pd?.phone ? '#ccc' : '#333' }}>
                                        {p.pd?.phone || '—'}
                                    </td>
                                    <td style={{ fontSize: '0.78rem' }}>
                                        {p.pd?.website ? (
                                            <a href={`https://${p.pd.website}`} target="_blank" rel="noopener noreferrer"
                                                style={{ color: '#0066FF', textDecoration: 'none' }}
                                                onClick={(e) => e.stopPropagation()}
                                            >{p.pd.website}</a>
                                        ) : <span style={{ color: '#333' }}>—</span>}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {p.pd?.locations?.length || 1}
                                    </td>
                                    <td style={{ fontWeight: 600, color: '#10b981' }}>
                                        {p.pd?.commissionRate ? `${p.pd.commissionRate}%` : '—'}
                                    </td>
                                    <td style={{ fontSize: '0.75rem', color: '#666' }}>
                                        {p.pd?.onboardDate || '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* ═══ Detail Slide-out Panel ═══ */}
            {selected && (
                <div className={styles.detailOverlay} onClick={() => setSelectedId(null)}>
                    <div className={styles.detailPanel} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.detailHeader}>
                            <div className={styles.detailTitle}>
                                <div className={styles.detailLogo}>{selected.logo || '🏪'}</div>
                                <div>
                                    <h2 className={styles.detailName}>{selected.name}</h2>
                                    <div className={styles.detailLegal}>{selected.pd?.legalName}</div>
                                </div>
                            </div>
                            <button className={styles.closeBtn} onClick={() => setSelectedId(null)}>✕</button>
                        </div>

                        <div className={styles.detailBody}>
                            {/* ── Status & Meta ── */}
                            <div className={styles.detailSection}>
                                <div className={styles.detailSectionTitle}>📊 Partnership Info</div>
                                <div className={styles.detailGrid}>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Status</div>
                                        <div className={styles.detailFieldValue}>
                                            <span className={`${styles.statusBadge} ${getStatusClass(selected.pd?.status)}`}>
                                                <span className={styles.statusDot} />
                                                {selected.pd?.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Tier</div>
                                        <div className={styles.detailFieldValue}>
                                            <span className={`${styles.tierBadge} ${getTierClass(selected.pd?.tier)}`}>
                                                {selected.pd?.tier}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Commission Rate</div>
                                        <div className={styles.detailFieldValue}>{selected.pd?.commissionRate}%</div>
                                    </div>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Onboard Date</div>
                                        <div className={styles.detailFieldValue}>{selected.pd?.onboardDate}</div>
                                    </div>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Established</div>
                                        <div className={styles.detailFieldValue}>{selected.pd?.established || '—'}</div>
                                    </div>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Rating</div>
                                        <div className={styles.detailFieldValue}>
                                            {selected.rating ? `⭐ ${selected.rating}` : '—'}
                                            {selected.reviewCount ? ` (${selected.reviewCount} reviews)` : ''}
                                        </div>
                                    </div>
                                    {selected.pd?.notes && (
                                        <div className={styles.detailFieldFull}>
                                            <div className={styles.detailFieldLabel}>Notes</div>
                                            <div className={styles.detailFieldValue}>{selected.pd.notes}</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ── Contact Info ── */}
                            <div className={styles.detailSection}>
                                <div className={styles.detailSectionTitle}>📞 Contact Information</div>
                                <div className={styles.detailGrid}>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Primary Phone</div>
                                        <div className={styles.detailFieldValue}>
                                            {selected.pd?.phone ? (
                                                <a href={`tel:${selected.pd.phone}`}>{selected.pd.phone}</a>
                                            ) : '—'}
                                        </div>
                                    </div>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Alt Phone</div>
                                        <div className={styles.detailFieldValue}>
                                            {selected.pd?.phoneAlt ? (
                                                <a href={`tel:${selected.pd.phoneAlt}`}>{selected.pd.phoneAlt}</a>
                                            ) : '—'}
                                        </div>
                                    </div>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Email</div>
                                        <div className={styles.detailFieldValue}>
                                            {selected.pd?.email ? (
                                                <a href={`mailto:${selected.pd.email}`}>{selected.pd.email}</a>
                                            ) : '—'}
                                        </div>
                                    </div>
                                    <div className={styles.detailField}>
                                        <div className={styles.detailFieldLabel}>Website</div>
                                        <div className={styles.detailFieldValue}>
                                            {selected.pd?.website ? (
                                                <a href={`https://${selected.pd.website}`} target="_blank" rel="noopener noreferrer">{selected.pd.website}</a>
                                            ) : '—'}
                                        </div>
                                    </div>
                                    {(selected.pd?.social?.facebook || selected.pd?.social?.instagram) && (
                                        <div className={styles.detailFieldFull}>
                                            <div className={styles.detailFieldLabel}>Social Media</div>
                                            <div className={styles.detailFieldValue} style={{ display: 'flex', gap: '1rem' }}>
                                                {selected.pd.social.facebook && (
                                                    <a href={`https://facebook.com/${selected.pd.social.facebook}`} target="_blank" rel="noopener noreferrer">
                                                        📘 Facebook
                                                    </a>
                                                )}
                                                {selected.pd.social.instagram && (
                                                    <a href={`https://instagram.com/${selected.pd.social.instagram}`} target="_blank" rel="noopener noreferrer">
                                                        📷 Instagram
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ── Locations ── */}
                            {selected.pd?.locations?.length > 0 && (
                                <div className={styles.detailSection}>
                                    <div className={styles.detailSectionTitle}>📍 Locations ({selected.pd.locations.length})</div>
                                    {selected.pd.locations.map((loc, i) => (
                                        <div key={i} className={styles.locationCard}>
                                            <div className={styles.locationName}>📌 {loc.name}</div>
                                            <div className={styles.locationDetail}>
                                                <span className={styles.locationIcon}>🏠</span>
                                                {loc.address}
                                            </div>
                                            {loc.phone && (
                                                <div className={styles.locationDetail}>
                                                    <span className={styles.locationIcon}>📞</span>
                                                    <a href={`tel:${loc.phone}`} style={{ color: '#0066FF', textDecoration: 'none' }}>{loc.phone}</a>
                                                </div>
                                            )}
                                            {loc.hours && (
                                                <div className={styles.locationDetail}>
                                                    <span className={styles.locationIcon}>🕐</span>
                                                    {loc.hours}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* ── Categories ── */}
                            {selected.pd?.categories?.length > 0 && (
                                <div className={styles.detailSection}>
                                    <div className={styles.detailSectionTitle}>🏷️ Categories</div>
                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        {selected.pd.categories.map((cat, i) => (
                                            <span key={i} style={{
                                                background: 'rgba(0, 102, 255, 0.08)',
                                                color: '#0066FF',
                                                padding: '0.25rem 0.65rem',
                                                borderRadius: 6,
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                border: '1px solid rgba(0, 102, 255, 0.2)',
                                            }}>{cat}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── Menu Preview ── */}
                            {selectedRestaurant?.menu?.length > 0 && (
                                <div className={styles.detailSection}>
                                    <div className={styles.detailSectionTitle}>
                                        🍽️ Menu ({selectedRestaurant.menu.length} items)
                                    </div>
                                    <div className={styles.menuPreview}>
                                        {selectedRestaurant.menu.slice(0, 12).map((item) => (
                                            <div key={item.id} className={styles.menuItem}>
                                                <span className={styles.menuItemName}>{item.name}</span>
                                                <span className={styles.menuItemPrice}>${item.price.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {selectedRestaurant.menu.length > 12 && (
                                        <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#555' }}>
                                            +{selectedRestaurant.menu.length - 12} more items
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── Description ── */}
                            {(selected.description || selectedRestaurant?.description) && (
                                <div className={styles.detailSection}>
                                    <div className={styles.detailSectionTitle}>📝 Description</div>
                                    <div className={styles.detailFieldFull} style={{ gridColumn: 'unset' }}>
                                        <div className={styles.detailFieldValue} style={{ lineHeight: 1.6, color: '#aaa' }}>
                                            {selected.description || selectedRestaurant?.description}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
