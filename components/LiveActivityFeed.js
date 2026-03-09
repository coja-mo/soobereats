"use client";

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '../lib/ThemeContext';

const ACTIVITY_TEMPLATES = [
    {
        type: 'order', templates: [
            { text: '{name} ordered from {restaurant}', icon: '🍽️' },
            { text: '{name} just grabbed {dish} from {restaurant}', icon: '🔥' },
        ]
    },
    {
        type: 'ride', templates: [
            { text: '{name} booked a ride to {dest}', icon: '🚗' },
            { text: '{name} heading to {dest} via Soobér', icon: '⚡' },
        ]
    },
    {
        type: 'reward', templates: [
            { text: '{name} reached {tier} tier!', icon: '🏆' },
            { text: '{name} earned {points} points', icon: '⭐' },
        ]
    },
    {
        type: 'join', templates: [
            { text: '{restaurant} just joined Soobér', icon: '🎉' },
            { text: '{name} joined the community', icon: '👋' },
        ]
    },
];

const NAMES = ['Sarah M.', 'Jake R.', 'Emma L.', 'Chris T.', 'Priya S.', 'Marcus W.', 'Ava K.', 'Liam P.', 'Sophie B.', 'Noah D.', 'Olivia F.', 'Ethan G.'];
const RESTAURANTS = ["Aurora's", "Giovanni's", "Muio's", "Mike's Place", "Thai Orchid", "Sushi Yummy", "Tandoori Nights", "Soo Fresh Market"];
const DISHES = ['a pepperoni pizza', 'pad thai', 'butter chicken', 'a poke bowl', 'loaded fries', 'a caesar salad'];
const DESTINATIONS = ['the airport', 'downtown', 'the mall', 'GFL Memorial', 'Garden River'];
const TIERS = ['Gold', 'Silver', 'Diamond'];
const POINTS_VALUES = ['150', '200', '350', '500'];

function generateActivity() {
    const typeGroup = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)];
    const template = typeGroup.templates[Math.floor(Math.random() * typeGroup.templates.length)];
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    const restaurant = RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)];
    const dish = DISHES[Math.floor(Math.random() * DISHES.length)];
    const dest = DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)];
    const tier = TIERS[Math.floor(Math.random() * TIERS.length)];
    const points = POINTS_VALUES[Math.floor(Math.random() * POINTS_VALUES.length)];

    const text = template.text
        .replace('{name}', name)
        .replace('{restaurant}', restaurant)
        .replace('{dish}', dish)
        .replace('{dest}', dest)
        .replace('{tier}', tier)
        .replace('{points}', points);

    return { text, icon: template.icon, time: 'Just now', id: Date.now() + Math.random() };
}

export function LiveActivityFeed() {
    const { theme } = useTheme();
    const isDark = theme.bg === '#09090b' || theme.bg === '#000';
    const [activities, setActivities] = useState([]);
    const [currentToast, setCurrentToast] = useState(null);

    // Generate initial activities
    useEffect(() => {
        const initial = Array.from({ length: 5 }, () => generateActivity());
        initial.forEach((a, i) => {
            a.time = [`Just now`, `2m ago`, `5m ago`, `8m ago`, `12m ago`][i];
        });
        setActivities(initial);
    }, []);

    // Pop up a toast every 15-25 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const newActivity = generateActivity();
            setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
            setCurrentToast(newActivity);
            setTimeout(() => setCurrentToast(null), 4000);
        }, 15000 + Math.random() * 10000);

        return () => clearInterval(interval);
    }, []);

    if (!currentToast) return null;

    return (
        <div style={{
            position: 'fixed', bottom: 24, left: 24, zIndex: 9980,
            maxWidth: 320, padding: '12px 16px', borderRadius: 16,
            background: isDark ? 'rgba(24,24,27,0.95)' : 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(16px)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
            boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.1)',
            display: 'flex', alignItems: 'center', gap: 10,
            animation: 'activitySlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
        }}
            onClick={() => setCurrentToast(null)}
        >
            <span style={{ fontSize: 22, flexShrink: 0 }}>{currentToast.icon}</span>
            <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, lineHeight: 1.4 }}>{currentToast.text}</div>
                <div style={{ fontSize: 11, color: theme.textFaint, marginTop: 2 }}>Just now · Sault Ste. Marie</div>
            </div>
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                background: '#0066FF', borderRadius: '0 0 16px 16px',
                animation: 'activityProgress 4s linear forwards',
            }} />

            <style>{`
                @keyframes activitySlideIn {
                    from { opacity: 0; transform: translateY(16px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes activityProgress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </div>
    );
}
