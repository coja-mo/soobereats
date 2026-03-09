"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../lib/ThemeContext';

export const CategoryFilter = ({ categories }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeId, setActiveId] = useState('all');
    const { theme } = useTheme();

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);

        // Setup Intersection Observer for jump navigation highlighting
        const handleIntersect = (entries) => {
            // Find the most visible intersecting entry
            let maxRatio = 0;
            let currentId = null;
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    currentId = entry.target.id;
                }
            });
            if (currentId) {
                setActiveId(currentId);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            rootMargin: '-10% 0px -60% 0px', // Trigger when section hits upper middle of screen
            threshold: [0, 0.25, 0.5, 0.75, 1]
        });

        categories.forEach(cat => {
            const el = document.getElementById(cat.id);
            if (el) observer.observe(el);
        });

        // Add 'all' section observer (hero/top)
        const allSection = document.getElementById('all-restaurants');
        if (allSection) observer.observe(allSection);

        return () => {
            window.removeEventListener('resize', checkScroll);
            observer.disconnect();
        };
    }, [categories]);

    const scrollToSection = (id) => {
        setActiveId(id);
        const el = document.getElementById(id);
        if (el) {
            const headerOffset = 180; // Account for sticky headers
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -240 : 240, behavior: 'smooth' });
            setTimeout(checkScroll, 400);
        }
    };

    const arrowStyle = (visible) => ({
        position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
        width: 36, height: 36, borderRadius: '50%',
        background: theme.bgCard, border: `1px solid ${theme.border}`,
        boxShadow: theme.shadowMd,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        color: theme.text,
    });

    return (
        <div style={{ position: 'relative', padding: '12px 0' }}>
            <button onClick={() => scroll('left')} style={{ ...arrowStyle(canScrollLeft), left: -4 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <div
                ref={scrollRef}
                onScroll={checkScroll}
                style={{
                    display: 'flex', gap: 10, overflowX: 'auto', scrollBehavior: 'smooth',
                    padding: '4px 4px', msOverflowStyle: 'none', scrollbarWidth: 'none',
                }}
            >
                <style dangerouslySetInnerHTML={{ __html: `.cat-scroll::-webkit-scrollbar { display: none; }` }} />

                {/* 'All' default anchor */}
                <button
                    onClick={() => scrollToSection('all-restaurants')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '10px 22px', borderRadius: 100, whiteSpace: 'nowrap',
                        border: activeId === 'all' || activeId === 'all-restaurants' ? 'none' : `1.5px solid ${theme.border}`,
                        background: activeId === 'all' || activeId === 'all-restaurants' ? theme.dark : theme.bgCard,
                        color: activeId === 'all' || activeId === 'all-restaurants' ? theme.darkText : theme.textSecondary,
                        fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em',
                        cursor: 'pointer',
                        boxShadow: activeId === 'all' || activeId === 'all-restaurants' ? theme.shadowMd : theme.shadow,
                        transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    <span style={{ fontSize: 18, lineHeight: 1 }}>🌟</span>
                    <span>All</span>
                </button>

                {categories.map(cat => {
                    const isActive = activeId === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => scrollToSection(cat.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '10px 22px', borderRadius: 100, whiteSpace: 'nowrap',
                                border: isActive ? 'none' : `1.5px solid ${theme.border}`,
                                background: isActive ? theme.dark : theme.bgCard,
                                color: isActive ? theme.darkText : theme.textSecondary,
                                fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em',
                                cursor: 'pointer',
                                boxShadow: isActive ? theme.shadowMd : theme.shadow,
                                transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                                fontFamily: "'Inter', sans-serif",
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = theme.bgCardHover;
                                    e.currentTarget.style.transform = 'scale(1.03)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = theme.bgCard;
                                    e.currentTarget.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            <span style={{ fontSize: 18, lineHeight: 1 }}>{cat.emoji}</span>
                            <span>{cat.name}</span>
                        </button>
                    );
                })}
            </div>

            <button onClick={() => scroll('right')} style={{ ...arrowStyle(canScrollRight), right: -4 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};
