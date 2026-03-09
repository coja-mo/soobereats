// ─── Soobér Cookie Utilities ──────────────────────────────────
// Handles cookie consent, user preferences, browsing history, and recommendations

const COOKIE_PREFIX = 'soober_';
const CONSENT_KEY = `${COOKIE_PREFIX}cookie_consent`;
const PREFS_KEY = `${COOKIE_PREFIX}preferences`;
const HISTORY_KEY = `${COOKIE_PREFIX}browsing_history`;
const RECS_KEY = `${COOKIE_PREFIX}recommendations`;
const FAVORITES_KEY = `${COOKIE_PREFIX}favorites`;
const THEME_KEY = `${COOKIE_PREFIX}theme`;
const LAST_RIDE_KEY = `${COOKIE_PREFIX}last_ride`;

// ── Cookie CRUD ──
export function setCookie(name, value, days = 365) {
    if (typeof document === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/; SameSite=Lax`;
}

export function getCookie(name) {
    if (typeof document === 'undefined') return null;
    const cookie = document.cookie.split('; ').find(c => c.startsWith(`${name}=`));
    if (!cookie) return null;
    try { return JSON.parse(decodeURIComponent(cookie.split('=').slice(1).join('='))); }
    catch { return null; }
}

export function deleteCookie(name) {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// ── Consent Management ──
export function getConsent() {
    return getCookie(CONSENT_KEY);
}

export function setConsent(consent) {
    // consent: { essential: true, analytics: bool, preferences: bool, marketing: bool }
    setCookie(CONSENT_KEY, { ...consent, timestamp: Date.now() });
    return consent;
}

export function hasConsented() {
    return !!getCookie(CONSENT_KEY);
}

// ── User Preferences ──
export function getPreferences() {
    return getCookie(PREFS_KEY) || {
        theme: 'dark',
        defaultVehicle: 'comfort',
        lastPickup: '',
        lastDropoff: '',
        notifications: true,
        language: 'en',
    };
}

export function setPreferences(prefs) {
    const consent = getConsent();
    if (!consent?.preferences) return;
    setCookie(PREFS_KEY, prefs);
}

export function updatePreference(key, value) {
    const prefs = getPreferences();
    prefs[key] = value;
    setPreferences(prefs);
}

// ── Browsing History (for recommendations) ──
export function addToHistory(item) {
    // item: { type: 'restaurant'|'market'|'ride'|'page', id, name, timestamp }
    const consent = getConsent();
    if (!consent?.analytics) return;
    const history = getCookie(HISTORY_KEY) || [];
    history.unshift({ ...item, timestamp: Date.now() });
    // Keep last 50 items
    setCookie(HISTORY_KEY, history.slice(0, 50));
}

export function getHistory() {
    return getCookie(HISTORY_KEY) || [];
}

// ── Favorites ──
export function getFavorites() {
    return getCookie(FAVORITES_KEY) || { restaurants: [], destinations: [], vehicles: [] };
}

export function toggleFavorite(type, id) {
    const consent = getConsent();
    if (!consent?.preferences) return;
    const favs = getFavorites();
    if (!favs[type]) favs[type] = [];
    const idx = favs[type].indexOf(id);
    if (idx >= 0) favs[type].splice(idx, 1);
    else favs[type].push(id);
    setCookie(FAVORITES_KEY, favs);
    return favs;
}

// ── Recommendations Engine ──
export function getRecommendations() {
    const history = getHistory();
    const favs = getFavorites();

    // Count category frequency
    const categoryCounts = {};
    history.forEach(h => {
        if (h.type === 'restaurant' || h.type === 'market') {
            const cat = h.category || 'general';
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        }
    });

    // Get top categories
    const topCategories = Object.entries(categoryCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([cat]) => cat);

    // Get recently viewed restaurant/market IDs
    const recentIds = history
        .filter(h => h.type === 'restaurant' || h.type === 'market')
        .slice(0, 10)
        .map(h => h.id);

    return {
        topCategories,
        recentIds,
        favoriteRestaurants: favs.restaurants || [],
        favoriteDestinations: favs.destinations || [],
        favoriteVehicles: favs.vehicles || [],
        totalVisits: history.length,
    };
}

// ── Last Ride Memory ──
export function saveLastRide(ride) {
    const consent = getConsent();
    if (!consent?.preferences) return;
    setCookie(LAST_RIDE_KEY, { ...ride, timestamp: Date.now() });
}

export function getLastRide() {
    return getCookie(LAST_RIDE_KEY);
}

// ── Theme Persistence ──
export function saveTheme(theme) {
    setCookie(THEME_KEY, theme);
}

export function getSavedTheme() {
    return getCookie(THEME_KEY);
}

// ── Clear All Cookies ──
export function clearAllCookies() {
    [CONSENT_KEY, PREFS_KEY, HISTORY_KEY, RECS_KEY, FAVORITES_KEY, THEME_KEY, LAST_RIDE_KEY]
        .forEach(deleteCookie);
}
