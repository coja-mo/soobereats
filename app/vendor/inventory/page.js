"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../../lib/ThemeContext';

const inventoryItems = [
    { id: 1, name: 'Ramen Noodles (fresh)', category: 'Noodles', unit: 'kg', stock: 24, min: 10, cost: 8.50, emoji: '🍜' },
    { id: 2, name: 'Tonkotsu Broth Base', category: 'Broth', unit: 'L', stock: 18, min: 8, cost: 12.00, emoji: '🥣' },
    { id: 3, name: 'Miso Paste', category: 'Broth', unit: 'kg', stock: 5, min: 3, cost: 15.00, emoji: '🫘' },
    { id: 4, name: 'Chashu Pork Belly', category: 'Protein', unit: 'kg', stock: 7, min: 5, cost: 22.00, emoji: '🥩' },
    { id: 5, name: 'Soft-Boiled Eggs', category: 'Toppings', unit: 'pc', stock: 48, min: 20, cost: 0.45, emoji: '🥚' },
    { id: 6, name: 'Green Onions', category: 'Toppings', unit: 'bunch', stock: 12, min: 8, cost: 1.50, emoji: '🧅' },
    { id: 7, name: 'Nori Sheets', category: 'Toppings', unit: 'pc', stock: 200, min: 50, cost: 0.15, emoji: '🌿' },
    { id: 8, name: 'Bean Sprouts', category: 'Toppings', unit: 'kg', stock: 3, min: 4, cost: 3.50, emoji: '🌱' },
    { id: 9, name: 'Corn', category: 'Toppings', unit: 'kg', stock: 6, min: 3, cost: 4.00, emoji: '🌽' },
    { id: 10, name: 'Gyoza Wrappers', category: 'Appetizers', unit: 'pc', stock: 180, min: 80, cost: 0.08, emoji: '🥟' },
    { id: 11, name: 'Ground Pork (Gyoza)', category: 'Appetizers', unit: 'kg', stock: 4, min: 3, cost: 16.00, emoji: '🥩' },
    { id: 12, name: 'Chicken Thighs', category: 'Protein', unit: 'kg', stock: 8, min: 5, cost: 14.50, emoji: '🍗' },
    { id: 13, name: 'Tofu (firm)', category: 'Protein', unit: 'block', stock: 10, min: 5, cost: 3.00, emoji: '🧈' },
    { id: 14, name: 'Sesame Oil', category: 'Oils & Sauces', unit: 'L', stock: 2.5, min: 1, cost: 18.00, emoji: '🫒' },
    { id: 15, name: 'Soy Sauce', category: 'Oils & Sauces', unit: 'L', stock: 4, min: 2, cost: 8.00, emoji: '🫗' },
    { id: 16, name: 'Chili Oil', category: 'Oils & Sauces', unit: 'L', stock: 1.5, min: 1, cost: 22.00, emoji: '🌶️' },
    { id: 17, name: 'Ramune Soda', category: 'Beverages', unit: 'pc', stock: 36, min: 24, cost: 1.80, emoji: '🍶' },
    { id: 18, name: 'Asahi Beer', category: 'Beverages', unit: 'pc', stock: 24, min: 12, cost: 3.20, emoji: '🍺' },
    { id: 19, name: 'Matcha Powder', category: 'Beverages', unit: 'kg', stock: 0.8, min: 0.5, cost: 45.00, emoji: '🍵' },
    { id: 20, name: 'Mochi (frozen)', category: 'Desserts', unit: 'pc', stock: 30, min: 15, cost: 1.20, emoji: '🍡' },
];

const categories = ['All', 'Noodles', 'Broth', 'Protein', 'Toppings', 'Appetizers', 'Oils & Sauces', 'Beverages', 'Desserts'];

export default function InventoryPage() {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const [activeCat, setActiveCat] = useState('All');
    const [sortBy, setSortBy] = useState('name'); // name, stock, cost
    const [items, setItems] = useState(inventoryItems);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const filtered = items.filter(i => activeCat === 'All' || i.category === activeCat)
        .sort((a, b) => {
            if (sortBy === 'stock') return a.stock - b.stock;
            if (sortBy === 'cost') return b.cost - a.cost;
            return a.name.localeCompare(b.name);
        });

    const lowStock = items.filter(i => i.stock <= i.min).length;
    const totalValue = items.reduce((sum, i) => sum + i.stock * i.cost, 0);

    const adjustStock = (id, delta) => {
        setItems(prev => prev.map(i => i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i));
    };

    return (
        <div style={{ background: '#09090b', minHeight: '100vh', color: '#fafafa' }}>

            {/* Header */}
            <div style={{
                padding: isMobile ? '16px' : '16px 28px', borderBottom: '1px solid #27272a',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#0f0f11',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <Link href="/vendor" style={{ textDecoration: 'none', fontSize: 16, color: '#71717a' }}>←</Link>
                    <div>
                        <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Inventory Management</h1>
                        <span style={{ fontSize: 12, color: '#71717a' }}>Sakura Ramen House</span>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    <Link href="/vendor/pos" style={{
                        textDecoration: 'none', padding: '8px 16px', borderRadius: 10,
                        background: '#eab308', color: '#09090b', fontSize: 12, fontWeight: 700,
                        fontFamily: "'DM Sans', sans-serif",
                    }}>Open POS</Link>
                </div>
            </div>

            {/* Stats Bar */}
            <div style={{
                display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: 1, background: '#27272a', borderBottom: '1px solid #27272a',
            }}>
                {[
                    { label: 'Total Items', value: items.length.toString(), color: '#fafafa' },
                    { label: 'Low Stock ⚠️', value: lowStock.toString(), color: lowStock > 0 ? '#ef4444' : '#22c55e' },
                    { label: 'Inventory Value', value: `$${totalValue.toFixed(0)}`, color: '#fafafa' },
                    { label: 'Categories', value: (categories.length - 1).toString(), color: '#fafafa' },
                ].map(stat => (
                    <div key={stat.label} style={{ background: '#0f0f11', padding: isMobile ? '14px 16px' : '16px 24px' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{stat.label}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? 20 : 24, fontWeight: 800, color: stat.color }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{
                padding: isMobile ? '12px 16px' : '12px 28px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid #1c1c1f', gap: 12, flexWrap: 'wrap',
            }}>
                <div style={{ display: 'flex', gap: 4, overflowX: 'auto', flex: 1 }}>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setActiveCat(cat)} style={{
                            padding: '6px 14px', borderRadius: 8, whiteSpace: 'nowrap',
                            border: `1px solid ${activeCat === cat ? '#eab308' : '#27272a'}`,
                            background: activeCat === cat ? 'rgba(234,179,8,0.1)' : 'transparent',
                            color: activeCat === cat ? '#eab308' : '#71717a',
                            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                        }}>{cat}</button>
                    ))}
                </div>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                    padding: '6px 12px', borderRadius: 8, border: '1px solid #27272a',
                    background: '#18181b', color: '#a1a1aa', fontSize: 12, fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', outline: 'none',
                }}>
                    <option value="name">Sort: Name</option>
                    <option value="stock">Sort: Stock (Low)</option>
                    <option value="cost">Sort: Cost (High)</option>
                </select>
            </div>

            {/* Inventory Table */}
            <div style={{ padding: isMobile ? '8px 16px' : '8px 28px' }}>
                {/* Header row - desktop */}
                {!isMobile && (
                    <div style={{
                        display: 'grid', gridTemplateColumns: '44px 1fr 120px 100px 90px 110px 100px',
                        gap: 12, alignItems: 'center', padding: '10px 0',
                        borderBottom: '1px solid #27272a', fontSize: 11, fontWeight: 700,
                        color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>
                        <span></span><span>Item</span><span>Category</span><span>In Stock</span><span>Min</span><span>Unit Cost</span><span>Adjust</span>
                    </div>
                )}

                {filtered.map(item => {
                    const isLow = item.stock <= item.min;
                    return (
                        <div key={item.id} style={{
                            display: isMobile ? 'flex' : 'grid',
                            gridTemplateColumns: isMobile ? undefined : '44px 1fr 120px 100px 90px 110px 100px',
                            flexDirection: isMobile ? 'column' : undefined,
                            gap: isMobile ? 8 : 12,
                            alignItems: isMobile ? 'stretch' : 'center',
                            padding: isMobile ? '14px 0' : '12px 0',
                            borderBottom: '1px solid #1c1c1f',
                        }}>
                            {/* Emoji + Name */}
                            {isMobile ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <span style={{ fontSize: 22 }}>{item.emoji}</span>
                                        <div>
                                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700 }}>{item.name}</div>
                                            <div style={{ fontSize: 12, color: '#71717a' }}>{item.category} · ${item.cost.toFixed(2)}/{item.unit}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <button onClick={() => adjustStock(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #3f3f46', background: '#27272a', color: '#fafafa', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                                        <span style={{
                                            fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 800,
                                            color: isLow ? '#ef4444' : '#fafafa', minWidth: 32, textAlign: 'center',
                                        }}>{item.stock}</span>
                                        <button onClick={() => adjustStock(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #3f3f46', background: '#27272a', color: '#fafafa', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <span style={{ fontSize: 22, textAlign: 'center' }}>{item.emoji}</span>
                                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700 }}>{item.name}</span>
                                    <span style={{ fontSize: 12, color: '#a1a1aa' }}>{item.category}</span>
                                    <span style={{
                                        fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 800,
                                        color: isLow ? '#ef4444' : '#fafafa',
                                    }}>
                                        {item.stock} {item.unit}
                                        {isLow && <span style={{ fontSize: 10, marginLeft: 4 }}>⚠️</span>}
                                    </span>
                                    <span style={{ fontSize: 13, color: '#71717a' }}>{item.min} {item.unit}</span>
                                    <span style={{ fontSize: 13, color: '#a1a1aa', fontWeight: 600 }}>${item.cost.toFixed(2)}/{item.unit}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <button onClick={() => adjustStock(item.id, -1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #3f3f46', background: '#27272a', color: '#fafafa', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                                        <button onClick={() => adjustStock(item.id, 1)} style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #3f3f46', background: '#27272a', color: '#fafafa', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                                        <button onClick={() => adjustStock(item.id, 5)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #3f3f46', background: '#27272a', color: '#71717a', fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>+5</button>
                                    </div>
                                </>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
