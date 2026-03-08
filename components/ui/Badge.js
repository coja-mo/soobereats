import React from 'react';

export const Badge = ({
    children,
    variant = 'default',
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase';

    const variants = {
        default: 'bg-[var(--color-bg-muted)] text-[var(--color-text-secondary)]',
        primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
        danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        glass: 'bg-[var(--color-glass)] backdrop-blur-md border border-[var(--color-glass-border)] text-[var(--color-text)]'
    };

    const classes = [
        baseStyles,
        variants[variant],
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes} {...props}>
            {children}
        </span>
    );
};
