"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { searchAddresses, getCurrentPosition, reverseGeocode } from '../lib/gis';

/**
 * AddressAutocomplete — Smart address input with:
 * - Live autocomplete from OpenStreetMap Nominatim
 * - "Use my location" button (browser Geolocation API)
 * - Keyboard navigation (arrow keys + enter)
 * - Debounced search (300ms)
 * - SSM-biased results
 */
export default function AddressAutocomplete({
    placeholder = 'Enter address',
    value = '',
    onSelect,            // (result: {displayName, shortName, lat, lng}) => void
    onTextChange,        // (text: string) => void
    theme,
    isPickup = false,    // true = show "Use my location" button
    accentColor = '#0066FF',
}) {
    const [query, setQuery] = useState(value);
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [locating, setLocating] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const debounceRef = useRef(null);

    // Sync external value
    useEffect(() => {
        if (value !== query) setQuery(value);
    }, [value]);

    // Debounced search
    const doSearch = useCallback(async (text) => {
        if (!text || text.length < 3) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setIsLoading(true);
        try {
            const data = await searchAddresses(text, 6);
            setResults(data);
            setIsOpen(data.length > 0);
            setActiveIndex(-1);
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const text = e.target.value;
        setQuery(text);
        onTextChange?.(text);

        // Debounce
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => doSearch(text), 300);
    };

    const handleSelect = (result) => {
        setQuery(result.shortName);
        setResults([]);
        setIsOpen(false);
        setActiveIndex(-1);
        onSelect?.(result);
    };

    const handleKeyDown = (e) => {
        if (!isOpen || !results.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setActiveIndex(prev => Math.min(prev + 1, results.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setActiveIndex(prev => Math.max(prev - 1, 0));
                break;
            case 'Enter':
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < results.length) {
                    handleSelect(results[activeIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setActiveIndex(-1);
                break;
        }
    };

    // Use my location
    const handleUseLocation = async () => {
        setLocating(true);
        try {
            const pos = await getCurrentPosition();
            const result = await reverseGeocode(pos.lat, pos.lng);
            if (result) {
                setQuery(result.shortName);
                setIsOpen(false);
                onSelect?.(result);
            }
        } catch (err) {
            console.error('Location error:', err);
            // Fallback: set a default SSM location
            alert('Unable to access your location. Please check your browser permissions.');
        } finally {
            setLocating(false);
        }
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                inputRef.current && !inputRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => { if (results.length) setIsOpen(true); }}
                    autoComplete="off"
                    style={{
                        width: '100%', background: theme.bgInput,
                        border: `1px solid ${isOpen ? accentColor : theme.borderSubtle}`,
                        borderRadius: 14, padding: '14px 18px 14px 40px',
                        paddingRight: isPickup ? 44 : 18,
                        fontSize: 15, fontWeight: 500, color: theme.text,
                        outline: 'none', fontFamily: "'Inter', sans-serif",
                        transition: 'border 0.2s ease', boxSizing: 'border-box',
                    }}
                />

                {/* Loading spinner */}
                {isLoading && (
                    <div style={{
                        position: 'absolute', right: isPickup ? 44 : 14, top: '50%', transform: 'translateY(-50%)',
                        width: 16, height: 16, border: `2px solid ${theme.borderSubtle}`,
                        borderTopColor: accentColor, borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }} />
                )}

                {/* Use my location button */}
                {isPickup && (
                    <button
                        onClick={handleUseLocation}
                        disabled={locating}
                        title="Use my current location"
                        style={{
                            position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                            width: 32, height: 32, borderRadius: 8, border: 'none',
                            background: locating ? `${accentColor}20` : 'transparent',
                            color: accentColor, cursor: locating ? 'wait' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 16, transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => { if (!locating) e.currentTarget.style.background = `${accentColor}15`; }}
                        onMouseLeave={(e) => { if (!locating) e.currentTarget.style.background = 'transparent'; }}
                    >
                        {locating ? '⏳' : '📍'}
                    </button>
                )}
            </div>

            {/* Dropdown */}
            {isOpen && results.length > 0 && (
                <div ref={dropdownRef} style={{
                    position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
                    background: theme.bgCard, border: `1px solid ${theme.borderSubtle}`,
                    borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    zIndex: 1000, overflow: 'hidden', maxHeight: 320, overflowY: 'auto',
                }}>
                    {results.map((result, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(result)}
                            onMouseEnter={() => setActiveIndex(i)}
                            style={{
                                width: '100%', textAlign: 'left', cursor: 'pointer',
                                padding: '12px 16px', border: 'none',
                                background: activeIndex === i
                                    ? `${accentColor}10`
                                    : 'transparent',
                                borderBottom: i < results.length - 1 ? `1px solid ${theme.borderSubtle}` : 'none',
                                transition: 'background 0.15s ease',
                                display: 'flex', alignItems: 'flex-start', gap: 10,
                            }}
                        >
                            <span style={{
                                fontSize: 14, color: accentColor, flexShrink: 0, marginTop: 2,
                            }}>
                                📍
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontSize: 14, fontWeight: 600, color: theme.text,
                                    fontFamily: "'Inter', sans-serif",
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                }}>
                                    {result.shortName}
                                </div>
                                <div style={{
                                    fontSize: 11, color: theme.textFaint, marginTop: 2,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                }}>
                                    {result.displayName}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* CSS animation for spinner */}
            <style jsx>{`
                @keyframes spin {
                    to { transform: translateY(-50%) rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
