import React from 'react';

export const Card = ({
    children,
    className = '',
    hoverEffect = false,
    glassEffect = false,
    style = {},
    ...props
}) => {
    const baseStyle = {
        borderRadius: 24,
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.04)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
        ...(glassEffect ? {
            background: 'rgba(255,255,255,0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.4)',
        } : {}),
        ...style,
    };

    return (
        <div
            className={className}
            style={baseStyle}
            onMouseEnter={hoverEffect ? (e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08), 0 20px 60px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'translateY(-6px)';
            } : undefined}
            onMouseLeave={hoverEffect ? (e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
            } : undefined}
            {...props}
        >
            {children}
        </div>
    );
};
