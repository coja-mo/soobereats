// ─── SOOber Rides — Vehicle Classes & Pricing ──────────────────────────
export const vehicleClasses = [
    {
        id: 'go', name: 'SOOber Go', emoji: '⚡', tagline: 'Affordable. Electric. Now.',
        description: 'Our most affordable ride. Compact EVs that get you there fast.',
        baseRate: 3.50, perKm: 1.20, perMin: 0.25, minFare: 7.00,
        capacity: 4, image: '/rides/soober-go.png',
        features: ['Zero emissions', '4 passengers', 'Fastest pickup'],
        models: ['BYD ATTO 3', 'BYD Dolphin'],
    },
    {
        id: 'comfort', name: 'SOOber Comfort', emoji: '✨', tagline: 'Extra legroom. Premium vibes.',
        description: 'Mid-size EVs with more space and a smoother ride.',
        baseRate: 5.00, perKm: 1.60, perMin: 0.35, minFare: 10.00,
        capacity: 4, image: '/rides/soober-comfort.png',
        features: ['Zero emissions', 'Extra legroom', 'Temperature control', 'Quiet ride preference'],
        models: ['Hyundai IONIQ 5', 'BYD SEAL', 'Honda Accord Hybrid'],
    },
    {
        id: 'xl', name: 'SOOber XL', emoji: '🚐', tagline: 'Room for the whole crew.',
        description: 'Electric SUVs for groups, families, and extra luggage.',
        baseRate: 7.00, perKm: 2.00, perMin: 0.45, minFare: 14.00,
        capacity: 6, image: '/rides/soober-xl.png',
        features: ['Zero emissions', '6 passengers', 'Extra cargo space', 'Car seats available'],
        models: ['Honda Prologue', 'BYD TANG EV', 'Cadillac VISTIQ'],
    },
    {
        id: 'lux', name: 'SOOber Lux', emoji: '💎', tagline: 'Arrive in style.',
        description: 'Premium electric luxury vehicles. Top-rated drivers only.',
        baseRate: 12.00, perKm: 3.00, perMin: 0.60, minFare: 25.00,
        capacity: 4, image: '/rides/soober-lux.png',
        features: ['Zero emissions', 'Luxury EV', 'Top-rated drivers', 'Complimentary water', 'Premium sound'],
        models: ['Cadillac VISTIQ', 'BYD HAN', 'Tesla Model X'],
    },
];

// ─── Full Fleet Roster ──────────────────────────────────
export const fleetRoster = [
    // ── GM / Cadillac ──
    {
        id: 'cadillac-vistiq', make: 'Cadillac', model: 'VISTIQ', year: 2026,
        type: 'Luxury SUV', powertrain: 'Full Electric',
        range: '480 km', seats: 6, msrp: '$78,790',
        description: 'Cadillac\'s all-electric three-row luxury SUV. Ultium platform, Super Cruise hands-free driving, and a cabin that rivals a first-class lounge.',
        highlights: ['33" diagonal LED display', 'Super Cruise', 'AKG Studio 23-speaker audio', '480 km range'],
        tier: ['SOOber XL', 'SOOber Lux'],
        emoji: '🖤', color: '#636e72',
    },
    {
        id: 'hummer-ev-suv', make: 'GMC', model: 'Hummer EV SUV', year: 2025,
        type: 'Electric Supertruck', powertrain: 'Full Electric',
        range: '500 km', seats: 5, msrp: '$115,000',
        description: 'The all-electric supertruck. 1,000 HP, CrabWalk mode, Infinity Roof, and a presence that stops traffic. The crown jewel of the SOOber Events fleet.',
        highlights: ['1,000 HP', 'CrabWalk diagonal drive', 'Extract Mode +6"', 'Infinity Roof', 'Bose 14-speaker'],
        tier: ['SOOber Events'],
        emoji: '🛻', color: '#f5f6fa',
    },

    // ── Hyundai ──
    {
        id: 'ioniq-5', make: 'Hyundai', model: 'IONIQ 5', year: 2026,
        type: 'Crossover EV', powertrain: 'Full Electric',
        range: '488 km', seats: 5, msrp: '$55,499',
        description: 'Ultra-fast 800V charging, pixel LED headlights, and a retro-futuristic design. The backbone of the SOOber Comfort fleet.',
        highlights: ['800V ultra-fast charging', '10-80% in 18 min', 'Vehicle-to-Load (V2L)', 'Digital side mirrors'],
        tier: ['SOOber Comfort'],
        emoji: '⚡', color: '#2d3436',
    },

    // ── Honda ──
    {
        id: 'honda-prologue', make: 'Honda', model: 'Prologue', year: 2026,
        type: 'Midsize EV SUV', powertrain: 'Full Electric',
        range: '483 km', seats: 5, msrp: '$55,800',
        description: 'Honda\'s first all-electric SUV. Built on GM\'s Ultium platform with Honda\'s legendary reliability. Spacious, refined, and zero-emission.',
        highlights: ['GM Ultium platform', '483 km range', '11" touchscreen', 'Honda Sensing 360'],
        tier: ['SOOber XL'],
        emoji: '🔴', color: '#e74c3c',
    },
    {
        id: 'honda-accord-hybrid', make: 'Honda', model: 'Accord Hybrid', year: 2026,
        type: 'Midsize Hybrid Sedan', powertrain: 'Hybrid Electric',
        range: '850+ km combined', seats: 5, msrp: '$42,000',
        description: 'The refined Accord Hybrid delivers exceptional fuel economy with a sophisticated, premium interior. A reliable workhorse for daily ride-hailing.',
        highlights: ['204 HP hybrid system', '5.0L/100km city', 'Google Built-In', 'Honda Sensing'],
        tier: ['SOOber Comfort'],
        emoji: '🩶', color: '#636e72',
    },

    // ── Tesla ──
    {
        id: 'tesla-model-x', make: 'Tesla', model: 'Model X', year: 2025,
        type: 'Luxury Electric SUV', powertrain: 'Full Electric',
        range: '543 km', seats: 6, msrp: '$119,990',
        description: 'The iconic Falcon Wing doors make every arrival a show. Premium event vehicle and SOOber Lux flagship.',
        highlights: ['Falcon Wing doors', '543 km range', 'Autopilot', '17" cinematic display'],
        tier: ['SOOber Lux', 'SOOber Events'],
        emoji: '🦅', color: '#dfe6e9',
    },

    // ── BYD ──
    {
        id: 'byd-seal', make: 'BYD', model: 'SEAL', year: 2025,
        type: 'Electric Sport Sedan', powertrain: 'Full Electric',
        range: '570 km', seats: 5, msrp: '$49,990',
        description: 'BYD\'s flagship sport sedan. Blade Battery technology, incredible range, and a sleek design that turns heads. The future of ride-hailing is here.',
        highlights: ['Blade Battery', '570 km range', '0-100 in 3.8s', 'iTAC torque control', 'Intelligent cabin'],
        tier: ['SOOber Comfort'],
        emoji: '🔵', color: '#0984e3',
    },
    {
        id: 'byd-atto-3', make: 'BYD', model: 'ATTO 3', year: 2025,
        type: 'Compact Electric SUV', powertrain: 'Full Electric',
        range: '420 km', seats: 5, msrp: '$39,990',
        description: 'The nimble, efficient ATTO 3 is perfect for city rides. Compact outside, spacious inside, with BYD\'s industry-leading Blade Battery.',
        highlights: ['Blade Battery', '420 km range', 'Rotating 12.8" screen', 'NFC phone key'],
        tier: ['SOOber Go'],
        emoji: '🟢', color: '#00b894',
    },
    {
        id: 'byd-dolphin', make: 'BYD', model: 'Dolphin', year: 2025,
        type: 'Compact Electric Hatch', powertrain: 'Full Electric',
        range: '427 km', seats: 5, msrp: '$33,990',
        description: 'Playful, affordable, and incredibly efficient. The Dolphin is the perfect city cruiser for quick SOOber Go trips.',
        highlights: ['Blade Battery', '427 km range', 'Ocean-inspired design', 'Heat pump standard'],
        tier: ['SOOber Go'],
        emoji: '🐬', color: '#74b9ff',
    },
    {
        id: 'byd-tang-ev', make: 'BYD', model: 'TANG EV', year: 2025,
        type: 'Full-Size Electric SUV', powertrain: 'Full Electric',
        range: '530 km', seats: 7, msrp: '$69,990',
        description: 'BYD\'s flagship SUV — three rows, 7 seats, and over 500 km of range. The spacious electric SUV the Soo has been waiting for.',
        highlights: ['7 seats', '530 km range', 'Blade Battery', 'DiPilot intelligent driving', 'Rotating 15.6" display'],
        tier: ['SOOber XL'],
        emoji: '🟤', color: '#2d3436',
    },
    {
        id: 'byd-han', make: 'BYD', model: 'HAN', year: 2025,
        type: 'Premium Electric Sedan', powertrain: 'Full Electric',
        range: '521 km', seats: 5, msrp: '$59,990',
        description: 'BYD\'s luxury flagship sedan. Dragon Face design, 0-100 in 3.9s, whisper-quiet cabin. Premium ride-hailing at its finest.',
        highlights: ['Dragon Face design', '521 km range', '0-100 in 3.9s', 'Dynaudio premium audio', 'NFC digital key'],
        tier: ['SOOber Lux'],
        emoji: '🏴', color: '#2d3436',
    },
];

// ─── Airport Pricing Zones ──────────────────────────────────
export const airportZones = [
    { id: 'downtown', name: 'Downtown Core', description: 'Queen St corridor', price: 25, distance: '8 km' },
    { id: 'west-end', name: 'West End', description: 'Second Line & west of Pim', price: 30, distance: '10 km' },
    { id: 'east-end', name: 'East End', description: 'East of Pim to Pine', price: 28, distance: '9 km' },
    { id: 'great-northern', name: 'Great Northern', description: 'Great Northern Rd corridor', price: 22, distance: '6 km' },
    { id: 'trunk-rd', name: 'Trunk Road', description: 'Trunk Rd & industrial area', price: 20, distance: '5 km' },
    { id: 'north-end', name: 'North End', description: 'Third Line & beyond', price: 35, distance: '14 km' },
    { id: 'goulais', name: 'Goulais Bay', description: 'Goulais River area', price: 65, distance: '35 km' },
    { id: 'garden-river', name: 'Garden River', description: 'Garden River First Nation', price: 40, distance: '18 km' },
];

export const airportVehicles = [
    { id: 'sedan', name: 'EV Sedan', passengers: 3, luggage: 2, multiplier: 1.0 },
    { id: 'suv', name: 'EV SUV', passengers: 5, luggage: 4, multiplier: 1.4 },
    { id: 'premium', name: 'Premium EV', passengers: 3, luggage: 2, multiplier: 1.8 },
];

// ─── Event Fleet ──────────────────────────────────
export const eventFleet = [
    {
        id: 'hummer-ev', name: 'GMC Hummer EV SUV', emoji: '🛻',
        tagline: 'The ultimate statement vehicle',
        description: 'The all-electric GMC Hummer EV SUV — 1,000 HP, CrabWalk, Infinity Roof. Zero emissions, maximum presence.',
        capacity: 5, hourlyRate: 250,
        features: ['1,000 HP', 'CrabWalk mode', 'Infinity Roof', 'Extract Mode', 'Bose 14-speaker', 'Custom lighting'],
        color: '#f5f6fa',
    },
    {
        id: 'cadillac-vistiq', name: 'Cadillac VISTIQ', emoji: '🖤',
        tagline: 'First-class lounge on wheels',
        description: 'The 2026 Cadillac VISTIQ — three-row luxury, Super Cruise, 33" LED display. Redefines premium transport.',
        capacity: 6, hourlyRate: 200,
        features: ['Super Cruise', '33" LED display', 'AKG 23-speaker audio', '6 passengers', 'Night Vision'],
        color: '#636e72',
    },
    {
        id: 'tesla-x', name: 'Tesla Model X', emoji: '🦅',
        tagline: 'Falcon Wing doors. Jaw-dropping.',
        description: 'The iconic Tesla Model X with show-stopping Falcon Wing doors. Makes any entrance unforgettable.',
        capacity: 6, hourlyRate: 180,
        features: ['Falcon Wing doors', 'Autopilot', '543 km range', 'Panoramic windshield', '17" display'],
        color: '#dfe6e9',
    },
    {
        id: 'byd-han-event', name: 'BYD HAN', emoji: '🐉',
        tagline: 'Dragon Face. Electric elegance.',
        description: 'BYD\'s flagship luxury sedan — Dragon Face design, whisper-quiet cabin, and 0-100 in 3.9 seconds.',
        capacity: 4, hourlyRate: 140,
        features: ['Dragon Face design', '0-100 in 3.9s', 'Dynaudio audio', '521 km range', 'Digital key'],
        color: '#2d3436',
    },
    {
        id: 'ioniq-5-event', name: 'Hyundai IONIQ 5', emoji: '⚡',
        tagline: 'Retro-future meets reality',
        description: 'Pixel LED lights, 800V ultra-fast charging, and a design that photographs like a concept car. Perfect for modern events.',
        capacity: 5, hourlyRate: 130,
        features: ['800V charging', 'Pixel LED lights', 'V2L power', 'Sliding console', 'Flat floor'],
        color: '#2d3436',
    },
    {
        id: 'ev-suv-fleet', name: 'EV SUV Fleet', emoji: '🚙',
        tagline: 'Coordinated fleet for large parties',
        description: 'Multiple matching electric SUVs — Honda Prologue, BYD TANG, and Cadillac VISTIQ. Coordinated arrival guaranteed.',
        capacity: '6 per vehicle', hourlyRate: 150,
        features: ['Fleet coordination', 'Custom decorations', 'Matching vehicles', 'Professional chauffeurs', 'Red carpet'],
        color: '#0984e3',
    },
];

export const eventTypes = [
    { id: 'wedding', name: 'Weddings', emoji: '💒', description: 'Make your big day electric. Grand arrivals, coordinated fleet, red carpet service.' },
    { id: 'prom', name: 'Prom & Grad', emoji: '🎓', description: 'Show up in style. Hummer EV or Tesla — the entrance everyone remembers.' },
    { id: 'corporate', name: 'Corporate', emoji: '💼', description: 'Professional fleet for conferences, client transport, and team events.' },
    { id: 'night-out', name: 'Night Out', emoji: '🌃', description: 'Safe, stylish, zero-emission rides for a night on the town.' },
    { id: 'celebration', name: 'Celebrations', emoji: '🎉', description: 'Birthdays, anniversaries, proposals — make every moment extraordinary.' },
    { id: 'tour', name: 'City Tours', emoji: '🗺️', description: 'See the Soo in luxury. Guided or self-directed tours in premium EVs.' },
];

export const eventPackages = [
    { id: 'essential', name: 'Essential', hours: 2, vehicles: 1, price: 299, includes: ['Professional chauffeur', 'Vehicle decoration', 'Red carpet arrival'] },
    { id: 'premium', name: 'Premium', hours: 4, vehicles: 1, price: 549, includes: ['Professional chauffeur', 'Vehicle decoration', 'Red carpet arrival', 'Complimentary champagne', 'Photo stop coordination'] },
    { id: 'grand', name: 'Grand', hours: 6, vehicles: 2, price: 999, includes: ['2 professional chauffeurs', 'Full fleet decoration', 'Red carpet arrival', 'Champagne service', 'Photo stop coordination', 'Custom route planning'] },
    { id: 'royal', name: 'Royal', hours: 8, vehicles: 3, price: 1799, includes: ['3 professional chauffeurs', 'Hummer EV lead vehicle', 'Full fleet decoration', 'Red carpet + runner', 'Premium champagne', 'Dedicated coordinator', 'Custom everything'] },
];

// ─── Popular Destinations ──────────────────────────────────
export const popularDestinations = [
    { name: 'Sault Ste. Marie Airport', emoji: '✈️', estimate: '$20–35' },
    { name: 'Station Mall', emoji: '🛍️', estimate: '$8–12' },
    { name: 'GFL Memorial Gardens', emoji: '🏒', estimate: '$10–15' },
    { name: 'Sault Area Hospital', emoji: '🏥', estimate: '$10–18' },
    { name: 'Algoma University', emoji: '🎓', estimate: '$12–20' },
    { name: 'Sault College', emoji: '📚', estimate: '$10–16' },
    { name: 'Agawa Canyon', emoji: '🏔️', estimate: '$15–22' },
    { name: 'International Bridge', emoji: '🌉', estimate: '$8–14' },
];

export const safetyFeatures = [
    { title: '100% Electric Fleet', description: 'Every ride is zero-emission. Better for the Soo, better for the planet.', emoji: '⚡' },
    { title: 'Verified Drivers', description: 'Background-checked, professionally trained, community-rated.', emoji: '✅' },
    { title: 'Real-Time Tracking', description: 'Share your ride with loved ones. GPS tracking on every trip.', emoji: '📍' },
    { title: 'In-App Safety', description: 'Emergency button, trip recording, and 24/7 support.', emoji: '🛡️' },
    { title: 'Fair Pricing', description: 'No surge pricing ever. Transparent fares before you book.', emoji: '💰' },
    { title: 'Local Drivers', description: 'Your neighbours behind the wheel. Supporting the local economy.', emoji: '🏠' },
];
