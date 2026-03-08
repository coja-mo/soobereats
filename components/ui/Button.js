"use client";
import React from 'react';
import { useTheme } from '../../lib/ThemeContext';

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    style = {},
    disabled = false,
    loading = false,
    ...props
}) => {
    const { theme } = useTheme();

    const variants = {
        primary: {
            background: theme.dark,
            color: theme.darkText,
            border: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        },
        secondary: {
            background: theme.bgInput,
            color: theme.text,
            border: `1px solid ${theme.border}`,
            boxShadow: 'none',
        },
        outline: {
            background: 'transparent',
            color: theme.textSecondary,
            border: `1.5px solid ${theme.border}`,
            boxShadow: 'none',
        },
        ghost: {
            background: 'transparent',
            color: theme.textSecondary,
            border: '1px solid transparent',
            boxShadow: 'none',
        },
    };

    const sizes = {
        sm: { padding: '8px 16px', fontSize: 13 },
        md: { padding: '10px 20px', fontSize: 14 },
        lg: { padding: '14px 28px', fontSize: 15 },
    };

    const v = variants[variant] || variants.primary;
    const s = sizes[size] || sizes.md;

    return (
        <button
            className={className}
            disabled={disabled || loading}
            style={{
                ...v,
                ...s,
                borderRadius: 14,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.01em',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                transition: 'all 0.25s cubic-bezier(0.19, 1, 0.22, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                ...style,
            }}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.transform = 'scale(1.03)';
                    if (variant === 'primary') e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
                }
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                if (variant === 'primary') e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
            }}
            {...props}
        >
            {loading && (
                <svg style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
            )}
            {children}
        </button>
    );
};
