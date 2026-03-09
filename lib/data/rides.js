// ─── Soobér Rides — Vehicle Classes & Pricing ──────────────────────────
export const vehicleClasses = [
    {
        id: 'go', name: 'Soobér Go', emoji: '⚡', tagline: 'Affordable. Electric. Now.',
        description: 'Our most affordable ride. Compact EVs that get you there fast.',
        baseRate: 3.50, perKm: 1.20, perMin: 0.25, minFare: 7.00,
        capacity: 4, image: '/rides/soober-go.png',
        features: ['Zero emissions', '4 passengers', 'Fastest pickup'],
        models: ['BYD ATTO 3', 'BYD Dolphin'],
    },
    {
        id: 'comfort', name: 'Soobér Comfort', emoji: '✨', tagline: 'Extra legroom. Premium vibes.',
        description: 'Mid-size EVs with more space and a smoother ride.',
        baseRate: 5.00, perKm: 1.60, perMin: 0.35, minFare: 10.00,
        capacity: 4, image: '/rides/soober-comfort.png',
        features: ['Zero emissions', 'Extra legroom', 'Temperature control', 'Quiet ride preference'],
        models: ['Hyundai IONIQ 5', 'BYD SEAL', 'Honda Accord Hybrid'],
    },
    {
        id: 'xl', name: 'Soobér XL', emoji: '🚐', tagline: 'Room for the whole crew.',
        description: 'Electric SUVs for groups, families, and extra luggage.',
        baseRate: 7.00, perKm: 2.00, perMin: 0.45, minFare: 14.00,
        capacity: 6, image: '/rides/soober-xl.png',
        features: ['Zero emissions', '6 passengers', 'Extra cargo space', 'Car seats available'],
        models: ['Honda Prologue', 'BYD TANG EV', 'Cadillac VISTIQ'],
    },
    {
        id: 'lux', name: 'Soobér Lux', emoji: '💎', tagline: 'Arrive in style.',
        description: 'Premium electric luxury vehicles. Top-rated drivers only.',
        baseRate: 12.00, perKm: 3.00, perMin: 0.60, minFare: 25.00,
        capacity: 4, image: '/rides/soober-lux.png',
        features: ['Zero emissions', 'Luxury EV', 'Top-rated drivers', 'Complimentary water', 'Premium sound'],
        models: ['Cadillac VISTIQ', 'BYD HAN', 'Tesla Model X'],
    },
];

// ─── Full Fleet Roster ──────────────────────────────────
export const fleetRoster = [
    // ── ★ FLAGSHIP — Lamborghini ──
    {
        id: 'lamborghini-urus', make: 'Lamborghini', model: 'Urus SE', year: 2025,
        type: 'Ultra-Luxury Hybrid Super SUV', powertrain: 'Plug-In Hybrid (800V)',
        range: '60 km electric / 600+ km total', seats: 4, msrp: '$275,000+',
        tagline: 'The last word in arrival.',
        description: 'The Lamborghini Urus SE — a 789 HP plug-in hybrid supercar SUV. Carbon-ceramic brakes, active aerodynamics, and a V8 twin-turbo hybrid powertrain that rewrites the rules. Exclusive to Soobér Executive and Ultra-Premium packages. This is not a ride. This is an event.',
        highlights: ['789 HP V8 Hybrid', '0-100 in 3.4s', 'Carbon-ceramic brakes', 'Active aero', 'Sensonum 3D audio', 'ANIMA drive modes'],
        tier: ['Soobér Executive ★', 'Soobér Ultra-Premium'],
        emoji: '🐂', color: '#1a1a1a',
        heroImage: '/fleet/lamborghini-urus.png',
        exclusive: true,
    },

    // ── GM / Cadillac ──
    {
        id: 'cadillac-vistiq', make: 'Cadillac', model: 'VISTIQ', year: 2026,
        type: 'Luxury SUV', powertrain: 'Full Electric',
        range: '480 km', seats: 6, msrp: '$78,790',
        tagline: 'First class has four wheels.',
        description: 'Cadillac\'s all-electric three-row luxury SUV. Ultium platform, Super Cruise hands-free driving, and a cabin that rivals a first-class lounge.',
        highlights: ['33" diagonal LED display', 'Super Cruise', 'AKG Studio 23-speaker audio', '480 km range'],
        tier: ['Soobér XL', 'Soobér Lux'],
        emoji: '🖤', color: '#636e72',
        heroImage: '/fleet/cadillac-vistiq.png',
    },
    {
        id: 'hummer-ev-suv', make: 'GMC', model: 'Hummer EV SUV', year: 2025,
        type: 'Electric Supertruck', powertrain: 'Full Electric',
        range: '500 km', seats: 5, msrp: '$115,000',
        tagline: 'One thousand horses. Zero emissions.',
        description: 'The all-electric supertruck. 1,000 HP, CrabWalk mode, Infinity Roof, and a presence that stops traffic. The crown jewel of the Soobér Events fleet.',
        highlights: ['1,000 HP', 'CrabWalk diagonal drive', 'Extract Mode +6"', 'Infinity Roof', 'Bose 14-speaker'],
        tier: ['Soobér Events'],
        emoji: '🛻', color: '#f5f6fa',
        heroImage: '/fleet/gmc-hummer-ev.png',
    },

    // ── Hyundai ──
    {
        id: 'ioniq-5', make: 'Hyundai', model: 'IONIQ 5', year: 2026,
        type: 'Crossover EV', powertrain: 'Full Electric',
        range: '488 km', seats: 5, msrp: '$55,499',
        tagline: 'The future called. It drives itself.',
        description: 'Ultra-fast 800V charging, pixel LED headlights, and a retro-futuristic design. The backbone of the Soobér Comfort fleet.',
        highlights: ['800V ultra-fast charging', '10-80% in 18 min', 'Vehicle-to-Load (V2L)', 'Digital side mirrors'],
        tier: ['Soobér Comfort'],
        emoji: '⚡', color: '#2d3436',
        heroImage: '/fleet/hyundai-ioniq5.png',
    },

    // ── Honda ──
    {
        id: 'honda-prologue', make: 'Honda', model: 'Prologue', year: 2026,
        type: 'Midsize EV SUV', powertrain: 'Full Electric',
        range: '483 km', seats: 5, msrp: '$55,800',
        tagline: 'Silence the road. Own the ride.',
        description: 'Honda\'s first all-electric SUV. Built on GM\'s Ultium platform with Honda\'s legendary reliability. Spacious, refined, and zero-emission.',
        highlights: ['GM Ultium platform', '483 km range', '11" touchscreen', 'Honda Sensing 360'],
        tier: ['Soobér XL'],
        emoji: '🔴', color: '#e74c3c',
        heroImage: '/fleet/honda-prologue.png',
    },
    {
        id: 'honda-accord-hybrid', make: 'Honda', model: 'Accord Hybrid', year: 2026,
        type: 'Midsize Hybrid Sedan', powertrain: 'Hybrid Electric',
        range: '850+ km combined', seats: 5, msrp: '$42,000',
        tagline: 'The quiet workhorse.',
        description: 'The refined Accord Hybrid delivers exceptional fuel economy with a sophisticated, premium interior. A reliable workhorse for daily ride-hailing.',
        highlights: ['204 HP hybrid system', '5.0L/100km city', 'Google Built-In', 'Honda Sensing'],
        tier: ['Soobér Comfort'],
        emoji: '🩶', color: '#636e72',
    },

    // ── Tesla ──
    {
        id: 'tesla-model-x', make: 'Tesla', model: 'Model X', year: 2025,
        type: 'Luxury Electric SUV', powertrain: 'Full Electric',
        range: '543 km', seats: 6, msrp: '$119,990',
        tagline: 'Wings open. Jaws drop.',
        description: 'The iconic Falcon Wing doors make every arrival a show. Premium event vehicle and Soobér Lux flagship.',
        highlights: ['Falcon Wing doors', '543 km range', 'Autopilot', '17" cinematic display'],
        tier: ['Soobér Lux', 'Soobér Events'],
        emoji: '🦅', color: '#dfe6e9',
        heroImage: '/fleet/tesla-model-x.png',
    },

    // ── BYD ──
    {
        id: 'byd-seal', make: 'BYD', model: 'SEAL', year: 2025,
        type: 'Electric Sport Sedan', powertrain: 'Full Electric',
        range: '570 km', seats: 5, msrp: '$49,990',
        tagline: '570 km. 3.8 seconds. Blade Battery.',
        description: 'BYD\'s flagship sport sedan. Blade Battery technology, incredible range, and a sleek design that turns heads. The future of ride-hailing is here.',
        highlights: ['Blade Battery', '570 km range', '0-100 in 3.8s', 'iTAC torque control', 'Intelligent cabin'],
        tier: ['Soobér Comfort'],
        emoji: '🔵', color: '#0984e3',
        heroImage: '/fleet/byd-seal.png',
    },
    {
        id: 'byd-atto-3', make: 'BYD', model: 'ATTO 3', year: 2025,
        type: 'Compact Electric SUV', powertrain: 'Full Electric',
        range: '420 km', seats: 5, msrp: '$39,990',
        tagline: 'Small SUV. Big electric energy.',
        description: 'The nimble, efficient ATTO 3 is perfect for city rides. Compact outside, spacious inside, with BYD\'s industry-leading Blade Battery.',
        highlights: ['Blade Battery', '420 km range', 'Rotating 12.8" screen', 'NFC phone key'],
        tier: ['Soobér Go'],
        emoji: '🟢', color: '#00b894',
    },
    {
        id: 'byd-dolphin', make: 'BYD', model: 'Dolphin', year: 2025,
        type: 'Compact Electric Hatch', powertrain: 'Full Electric',
        range: '427 km', seats: 5, msrp: '$33,990',
        tagline: 'Ride the wave. Skip the pump.',
        description: 'Playful, affordable, and incredibly efficient. The Dolphin is the perfect city cruiser for quick Soobér Go trips.',
        highlights: ['Blade Battery', '427 km range', 'Ocean-inspired design', 'Heat pump standard'],
        tier: ['Soobér Go'],
        emoji: '🐬', color: '#74b9ff',
    },
    {
        id: 'byd-tang-ev', make: 'BYD', model: 'TANG EV', year: 2025,
        type: 'Full-Size Electric SUV', powertrain: 'Full Electric',
        range: '530 km', seats: 7, msrp: '$69,990',
        tagline: 'Seven seats. Zero compromises.',
        description: 'BYD\'s flagship SUV — three rows, 7 seats, and over 500 km of range. The spacious electric SUV the Soo has been waiting for.',
        highlights: ['7 seats', '530 km range', 'Blade Battery', 'DiPilot intelligent driving', 'Rotating 15.6" display'],
        tier: ['Soobér XL'],
        emoji: '🟤', color: '#2d3436',
    },
    {
        id: 'byd-han', make: 'BYD', model: 'HAN', year: 2025,
        type: 'Premium Electric Sedan', powertrain: 'Full Electric',
        range: '521 km', seats: 5, msrp: '$59,990',
        tagline: 'Dragon Face. Electric soul.',
        description: 'BYD\'s luxury flagship sedan. Dragon Face design, 0-100 in 3.9s, whisper-quiet cabin. Premium ride-hailing at its finest.',
        highlights: ['Dragon Face design', '521 km range', '0-100 in 3.9s', 'Dynaudio premium audio', 'NFC digital key'],
        tier: ['Soobér Lux'],
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

// ─── Ride Stats (animated counters) ──────────────────────────────────
export const rideStats = [
    { label: 'Rides Completed', value: 10000, suffix: '+', prefix: '', icon: '🚗' },
    { label: 'Electric Fleet', value: 100, suffix: '%', prefix: '', icon: '⚡' },
    { label: 'Average Rating', value: 4.9, suffix: '★', prefix: '', decimals: 1, icon: '⭐' },
    { label: 'CO₂ Saved', value: 42, suffix: ' tonnes', prefix: '', icon: '🌍' },
    { label: 'Local Drivers', value: 35, suffix: '+', prefix: '', icon: '🏠' },
    { label: 'Avg. Pickup', value: 4, suffix: ' min', prefix: '', icon: '⏱️' },
];

// ─── How It Works ──────────────────────────────────
export const howItWorks = [
    {
        step: 1, title: 'Book Your Ride',
        description: 'Enter your pickup and drop-off. Choose your vehicle class. See your fare upfront — no surprises, no surge.',
        icon: '📱', color: '#0066FF',
    },
    {
        step: 2, title: 'Get Matched',
        description: 'We pair you with the nearest available driver in seconds. Track them in real-time as they head your way.',
        icon: '🔗', color: '#8B5CF6',
    },
    {
        step: 3, title: 'Ride Electric',
        description: 'Sit back in a zero-emission EV. Enjoy a quiet cabin, climate control, and complimentary Wi-Fi. Every ride is locally operated.',
        icon: '⚡', color: '#10B981',
    },
    {
        step: 4, title: 'Rate & Go',
        description: 'Rate your driver, tip if you\'d like, and hop out. Your receipt hits your inbox instantly. See you next time.',
        icon: '⭐', color: '#F59E0B',
    },
];

// ─── Soobér vs Competition ──────────────────────────────────
export const comparisonData = {
    categories: [
        'Average Trip Cost',
        'Surge Pricing',
        'Fleet Quality',
        'Carbon Emissions',
        'Average Wait Time',
        'App Experience',
        'Local Support',
        'Price Transparency',
    ],
    competitors: [
        {
            name: 'Soobér',
            highlight: true,
            values: ['$8–25', 'Never', 'Premium EVs', 'Zero', '~4 min', 'Modern App', '24/7 Local', 'Upfront Always'],
            icons: ['💙', '✅', '✅', '✅', '✅', '✅', '✅', '✅'],
        },
        {
            name: 'Traditional Taxi',
            highlight: false,
            values: ['$15–45', 'Peak hours', 'Mixed/Aging', 'High', '10–20 min', 'Phone call', 'Limited', 'Meter-based'],
            icons: ['💸', '⚠️', '⚠️', '❌', '⚠️', '❌', '⚠️', '⚠️'],
        },
        {
            name: 'Owning a Car',
            highlight: false,
            values: ['$0.58/km + $400/mo', 'N/A', 'Yours', 'High', '0 min', 'N/A', 'Mechanic', 'Hidden costs'],
            icons: ['💸', '➖', '➖', '❌', '✅', '➖', '⚠️', '❌'],
        },
    ],
};

// ─── Driver Spotlights ──────────────────────────────────
export const driverSpotlights = [
    {
        id: 'driver-mike', name: 'Mike R.', emoji: '👨‍✈️',
        vehicle: '2026 Hyundai IONIQ 5', vehicleEmoji: '⚡',
        rating: 4.97, ridesCompleted: 1240,
        bio: 'Retired teacher, lifelong Soo resident. Knows every shortcut in town and always has the best local restaurant recommendations.',
        since: 'March 2025',
        funFact: 'Has driven passengers to every address in the downtown core at least twice.',
    },
    {
        id: 'driver-sarah', name: 'Sarah T.', emoji: '👩‍✈️',
        vehicle: '2025 BYD Dolphin', vehicleEmoji: '🐬',
        rating: 4.99, ridesCompleted: 890,
        bio: 'University student who drives between classes. Known for her curated Spotify playlists and sparkling clean car.',
        since: 'September 2025',
        funFact: 'Has a different playlist for morning, afternoon, and evening rides.',
    },
    {
        id: 'driver-james', name: 'James L.', emoji: '🧔',
        vehicle: '2026 Honda Prologue', vehicleEmoji: '🔴',
        rating: 4.95, ridesCompleted: 2100,
        bio: 'Former long-haul trucker who traded 18 wheels for an EV. Top-rated driver three months running. Specializes in airport transfers.',
        since: 'January 2025',
        funFact: 'Has never received less than a 5-star rating on an airport transfer.',
    },
];

// ─── Rider Testimonials ──────────────────────────────────
export const riderTestimonials = [
    {
        name: 'Amanda K.', rating: 5, context: 'Daily commuter',
        quote: 'I sold my car six months ago because Soobér is that reliable. Cheaper, cleaner, and I don\'t have to deal with winter parking. Best decision I\'ve made.',
    },
    {
        name: 'David M.', rating: 5, context: 'Airport transfer',
        quote: 'Booked a 5 AM airport pickup and James was there five minutes early with the car warmed up. Try getting that from a taxi company at 5 AM in the Soo.',
    },
    {
        name: 'Priya S.', rating: 5, context: 'Night out',
        quote: 'No surge pricing on a Saturday night? That alone makes Soobér better than any ride service I\'ve used in Toronto. And the cars are nicer.',
    },
    {
        name: 'Tom & Lisa H.', rating: 5, context: 'Wedding day',
        quote: 'The Hummer EV for our wedding entrance was absolutely jaw-dropping. Our guests are STILL talking about it. Worth every penny.',
    },
    {
        name: 'Marcus J.', rating: 5, context: 'Weekly rider',
        quote: 'As someone who can\'t drive, Soobér gave me my independence back. The drivers know me by name now. It feels like a community, not a corporation.',
    },
];

// ─── Pricing Breakdowns ──────────────────────────────────
export const pricingBreakdowns = [
    { tier: 'Soobér Go', base: '$5.00', perKm: '$1.50/km', perMin: '$0.25/min', minFare: '$8.00', bestFor: 'Quick trips across town' },
    { tier: 'Soobér Comfort', base: '$7.00', perKm: '$2.00/km', perMin: '$0.35/min', minFare: '$12.00', bestFor: 'Everyday rides with more space' },
    { tier: 'Soobér XL', base: '$10.00', perKm: '$2.50/km', perMin: '$0.45/min', minFare: '$18.00', bestFor: 'Groups and families' },
    { tier: 'Soobér Lux', base: '$12.00', perKm: '$3.00/km', perMin: '$0.60/min', minFare: '$25.00', bestFor: 'Premium luxury experience' },
];

