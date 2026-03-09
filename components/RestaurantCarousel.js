"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../lib/ThemeContext';
import { RestaurantCard } from './RestaurantCard';

export const RestaurantCarousel = ({ restaurants }) => {
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
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
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    useEffect(() => {
        // Re-check scroll on content change
        checkScroll();
    }, [restaurants]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.8 : 800;
            scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
            setTimeout(checkScroll, 400); // Wait for smooth scroll to finish
        }
    };

    const arrowStyle = (visible) => ({
        position: 'absolute', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
        width: 48, height: 48, borderRadius: '50%',
        background: theme.bgCard, border: `1px solid ${theme.border}`,
        boxShadow: theme.shadowMd,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.2s ease',
        color: theme.text,
    });

    if (!restaurants || restaurants.length === 0) return null;

    return (
        <div style={{ position: 'relative', margin: '0 -20px', padding: '0 20px' }} className="carousel-wrapper">
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                style={{ ...arrowStyle(canScrollLeft), left: -20 }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                aria-label="Scroll left"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Scrolling Track */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                style={{
                    display: 'flex', gap: 24, overflowX: 'auto', scrollBehavior: 'smooth',
                    padding: '16px 4px', msOverflowStyle: 'none', scrollbarWidth: 'none',
                    scrollSnapType: 'x mandatory',
                }}
            >
                <style dangerouslySetInnerHTML={{ __html: `.carousel-wrapper div::-webkit-scrollbar { display: none; }` }} />

                {restaurants.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        style={{
                            minWidth: window.innerWidth < 768 ? '85vw' : '360px',
                            flexShrink: 0,
                            scrollSnapAlign: 'start',
                        }}
                    >
                        <RestaurantCard restaurant={restaurant} />
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll('right')}
                style={{ ...arrowStyle(canScrollRight), right: -20 }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                aria-label="Scroll right"
            >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};
