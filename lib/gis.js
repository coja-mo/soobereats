/**
 * Soobér GIS Utilities
 * 
 * Geocoding:    OpenStreetMap Nominatim (free, no API key)
 * Routing:      OSRM (Open Source Routing Machine — free, no API key)
 * Geolocation:  Browser Geolocation API
 * 
 * All services are free and open-source. No API keys required.
 * Nominatim usage policy: max 1 request/second, include referrer.
 */

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const OSRM_BASE = 'https://router.project-osrm.org';

// Sault Ste. Marie bounding box for biased search
const SSM_BOUNDS = {
    lat: 46.5136,
    lng: -84.3358,
    viewbox: '-84.6,46.3,-84.0,46.7', // west,south,east,north
};

// ════════════════════════════════════════════════════════════════════════════
// GEOCODING — Address search with autocomplete
// ════════════════════════════════════════════════════════════════════════════

let lastNominatimCall = 0;
const NOMINATIM_DELAY = 300; // ms between calls (respect rate limit)

/**
 * Search for addresses matching a query string.
 * Results are biased toward Sault Ste. Marie, Ontario.
 * 
 * @param {string} query - The search text
 * @param {number} limit - Max results (default 5)
 * @returns {Promise<Array<{displayName: string, lat: number, lng: number, type: string, address: object}>>}
 */
export async function searchAddresses(query, limit = 5) {
    if (!query || query.length < 3) return [];

    // Rate limiting
    const now = Date.now();
    const timeSinceLast = now - lastNominatimCall;
    if (timeSinceLast < NOMINATIM_DELAY) {
        await new Promise(r => setTimeout(r, NOMINATIM_DELAY - timeSinceLast));
    }
    lastNominatimCall = Date.now();

    try {
        const params = new URLSearchParams({
            q: query,
            format: 'json',
            addressdetails: '1',
            limit: String(limit),
            viewbox: SSM_BOUNDS.viewbox,
            bounded: '0', // prefer but don't restrict to viewbox
            countrycodes: 'ca',
        });

        const response = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SooberRides/1.0',
            },
        });

        if (!response.ok) throw new Error(`Nominatim error: ${response.status}`);

        const data = await response.json();

        return data.map(result => ({
            displayName: result.display_name,
            shortName: formatShortAddress(result),
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon),
            type: result.type,
            importance: result.importance,
            address: result.address || {},
        }));
    } catch (error) {
        console.error('Geocoding error:', error);
        return [];
    }
}

/**
 * Reverse geocode coordinates to an address.
 * 
 * @param {number} lat
 * @param {number} lng
 * @returns {Promise<{displayName: string, shortName: string, lat: number, lng: number, address: object} | null>}
 */
export async function reverseGeocode(lat, lng) {
    try {
        const params = new URLSearchParams({
            lat: String(lat),
            lon: String(lng),
            format: 'json',
            addressdetails: '1',
        });

        const response = await fetch(`${NOMINATIM_BASE}/reverse?${params}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SooberRides/1.0',
            },
        });

        if (!response.ok) return null;

        const result = await response.json();
        return {
            displayName: result.display_name,
            shortName: formatShortAddress(result),
            lat: parseFloat(result.lat),
            lng: parseFloat(result.lon),
            address: result.address || {},
        };
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return null;
    }
}

/**
 * Format a Nominatim result into a clean, short address string.
 */
function formatShortAddress(result) {
    const addr = result.address || {};
    const parts = [];

    if (addr.house_number) parts.push(addr.house_number);
    if (addr.road) parts.push(addr.road);
    if (!parts.length && result.display_name) {
        // Fallback: take first 2 parts of display_name
        return result.display_name.split(',').slice(0, 2).join(',').trim();
    }

    const locality = addr.city || addr.town || addr.village || addr.hamlet || '';
    if (locality && locality !== 'Sault Ste. Marie') {
        parts.push(locality);
    }

    return parts.join(' ') || result.display_name?.split(',')[0] || 'Unknown';
}

// ════════════════════════════════════════════════════════════════════════════
// ROUTING — Calculate route between two points
// ════════════════════════════════════════════════════════════════════════════

/**
 * Calculate a driving route between pickup and dropoff.
 * Uses OSRM (free, no API key).
 * 
 * @param {{lat: number, lng: number}} pickup
 * @param {{lat: number, lng: number}} dropoff
 * @returns {Promise<{distance: number, duration: number, geometry: Array<[number, number]>} | null>}
 *   distance in km, duration in minutes, geometry as [[lat, lng], ...]
 */
export async function calculateRoute(pickup, dropoff) {
    if (!pickup || !dropoff) return null;

    try {
        // OSRM expects lng,lat (not lat,lng)
        const coords = `${pickup.lng},${pickup.lat};${dropoff.lng},${dropoff.lat}`;

        const response = await fetch(
            `${OSRM_BASE}/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=true`,
            {
                headers: { 'Accept': 'application/json' },
            },
        );

        if (!response.ok) throw new Error(`OSRM error: ${response.status}`);

        const data = await response.json();

        if (data.code !== 'Ok' || !data.routes || !data.routes.length) {
            return null;
        }

        const route = data.routes[0];

        // Convert GeoJSON coordinates [lng, lat] to [lat, lng] for Leaflet
        const geometry = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

        return {
            distance: route.distance / 1000, // meters to km
            duration: route.duration / 60,     // seconds to minutes
            geometry,
            steps: route.legs[0]?.steps?.map(step => ({
                instruction: step.maneuver?.type || '',
                name: step.name || '',
                distance: step.distance / 1000,
                duration: step.duration / 60,
            })) || [],
        };
    } catch (error) {
        console.error('Routing error:', error);
        return null;
    }
}

// ════════════════════════════════════════════════════════════════════════════
// FARE CALCULATION
// ════════════════════════════════════════════════════════════════════════════

const FARE_RATES = {
    economy: { base: 5.00, perKm: 1.50, perMin: 0.25, minimum: 8.00 },
    comfort: { base: 7.00, perKm: 2.00, perMin: 0.30, minimum: 12.00 },
    premium: { base: 12.00, perKm: 3.00, perMin: 0.50, minimum: 20.00 },
    xl: { base: 15.00, perKm: 3.50, perMin: 0.60, minimum: 25.00 },
    luxury: { base: 25.00, perKm: 5.00, perMin: 0.80, minimum: 40.00 },
};

/**
 * Calculate fare estimate for a given route and vehicle class.
 * 
 * @param {{distance: number, duration: number}} route - distance in km, duration in minutes
 * @param {string} vehicleClass - 'economy' | 'comfort' | 'premium' | 'xl' | 'luxury'
 * @returns {{fare: number, breakdown: object}}
 */
export function calculateFare(route, vehicleClass = 'comfort') {
    const rates = FARE_RATES[vehicleClass] || FARE_RATES.comfort;

    const baseFare = rates.base;
    const distanceFare = route.distance * rates.perKm;
    const timeFare = route.duration * rates.perMin;
    const subtotal = baseFare + distanceFare + timeFare;
    const fare = Math.max(subtotal, rates.minimum);

    return {
        fare: Math.round(fare * 100) / 100,
        breakdown: {
            base: rates.base,
            distance: Math.round(distanceFare * 100) / 100,
            time: Math.round(timeFare * 100) / 100,
            minimum: rates.minimum,
        },
    };
}

/**
 * Calculate fare estimates for all vehicle classes.
 */
export function calculateAllFares(route) {
    if (!route) return {};
    return Object.fromEntries(
        Object.keys(FARE_RATES).map(cls => [cls, calculateFare(route, cls)])
    );
}

// ════════════════════════════════════════════════════════════════════════════
// GEOLOCATION — Browser location services
// ════════════════════════════════════════════════════════════════════════════

/**
 * Get the user's current position via the browser Geolocation API.
 * 
 * @param {object} options - PositionOptions
 * @returns {Promise<{lat: number, lng: number, accuracy: number}>}
 */
export function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation not supported'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000,
                ...options,
            },
        );
    });
}

// ════════════════════════════════════════════════════════════════════════════
// FORMAT UTILITIES
// ════════════════════════════════════════════════════════════════════════════

/**
 * Format a distance in km to a human-readable string.
 */
export function formatDistance(km) {
    if (km < 1) return `${Math.round(km * 1000)}m`;
    return `${km.toFixed(1)} km`;
}

/**
 * Format a duration in minutes to a human-readable string.
 */
export function formatDuration(minutes) {
    if (minutes < 1) return 'less than 1 min';
    if (minutes < 60) return `${Math.round(minutes)} min`;
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return mins ? `${hrs}h ${mins}m` : `${hrs}h`;
}

/**
 * Format a fare amount to CAD string.
 */
export function formatFare(amount) {
    return `$${amount.toFixed(2)}`;
}
