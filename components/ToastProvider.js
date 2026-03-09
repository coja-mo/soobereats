"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { useTheme } from '../lib/ThemeContext';

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

const ICONS = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️', order: '📦', reward: '⭐', ride: '🚗' };
const COLORS = { success: '#22c55e', error: '#ef4444', warning: '#f59e0b', info: '#0066FF', order: '#22c55e', reward: '#eab308', ride: '#0066FF' };

function Toast({ toast, onDismiss, index }) {
    const { theme } = useTheme();
    const [exiting, setExiting] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setExiting(true);
            setTimeout(() => onDismiss(toast.id), 350);
        }, toast.duration || 4000);
        return () => clearTimeout(timerRef.current);
    }, [toast, onDismiss]);

    const dismiss = () => {
        clearTimeout(timerRef.current);
        setExiting(true);
        setTimeout(() => onDismiss(toast.id), 350);
    };

    const color = COLORS[toast.type] || '#0066FF';
    const icon = ICONS[toast.type] || 'ℹ️';

    return (
        <div
            onClick={dismiss}
            style={{
                position: 'relative',
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '14px 18px', borderRadius: 16,
                background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px ${color}22`,
                cursor: 'pointer', maxWidth: 380, width: '100%',
                transform: exiting ? 'translateX(120%) scale(0.9)' : `translateY(0) scale(1)`,
                opacity: exiting ? 0 : 1,
                animation: 'toastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s',
                overflow: 'hidden',
            }}
        >
            {/* Accent bar */}
            <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                background: color, borderRadius: '16px 0 0 16px',
            }} />

            <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
                {toast.title && (
                    <div style={{
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                        fontSize: 14, color: theme.text, marginBottom: 2,
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{toast.title}</div>
                )}
                <div style={{
                    fontSize: 13, color: theme.textMuted, lineHeight: 1.4,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>{toast.message}</div>
            </div>
            {toast.action && (
                <button
                    onClick={(e) => { e.stopPropagation(); toast.action.onClick(); dismiss(); }}
                    style={{
                        fontSize: 12, fontWeight: 700, color, background: `${color}12`,
                        border: 'none', borderRadius: 8, padding: '6px 12px',
                        cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                        fontFamily: "'DM Sans', sans-serif",
                    }}
                >{toast.action.label}</button>
            )}
        </div>
    );
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((toast) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { ...toast, id }].slice(-5)); // max 5 toasts
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Convenience methods
    const success = useCallback((title, message, opts) => addToast({ type: 'success', title, message, ...opts }), [addToast]);
    const error = useCallback((title, message, opts) => addToast({ type: 'error', title, message, ...opts }), [addToast]);
    const warning = useCallback((title, message, opts) => addToast({ type: 'warning', title, message, ...opts }), [addToast]);
    const info = useCallback((title, message, opts) => addToast({ type: 'info', title, message, ...opts }), [addToast]);
    const order = useCallback((title, message, opts) => addToast({ type: 'order', title, message, ...opts }), [addToast]);
    const reward = useCallback((title, message, opts) => addToast({ type: 'reward', title, message, ...opts }), [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, warning, info, order, reward }}>
            {children}
            {/* Toast container */}
            <div style={{
                position: 'fixed', top: 80, right: 20, zIndex: 10000,
                display: 'flex', flexDirection: 'column', gap: 10,
                pointerEvents: toasts.length ? 'auto' : 'none',
            }}>
                {toasts.map((toast, i) => (
                    <Toast key={toast.id} toast={toast} onDismiss={removeToast} index={i} />
                ))}
            </div>
            <style>{`
                @keyframes toastSlideIn {
                    from { transform: translateX(120%) scale(0.8); opacity: 0; }
                    to { transform: translateX(0) scale(1); opacity: 1; }
                }
            `}</style>
        </ToastContext.Provider>
    );
}
