// Seeded random to produce stable, deterministic values per unit
function seededRandom(seed) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

export const generateDispatchUnits = () => {
    const units = [];
    const rideFirstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Lisa', 'Daniel', 'Nancy', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle'];
    const deliveryFirstNames = ['Kevin', 'Carol', 'Brian', 'Amanda', 'George', 'Melissa', 'Edward', 'Deborah', 'Ronald', 'Stephanie', 'Timothy', 'Rebecca', 'Jason', 'Sharon', 'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy', 'Nicholas', 'Shirley', 'Eric', 'Angela', 'Jonathan', 'Helen', 'Stephen', 'Anna', 'Larry', 'Brenda', 'Justin', 'Pamela', 'Scott', 'Nicole', 'Brandon', 'Emma', 'Benjamin', 'Samantha'];
    const lastInitials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const rideVehicles = ['GMC Hummer EV', 'Cadillac VISTIQ', 'Honda Prologue', 'Hyundai IONIQ 5', 'BYD Atto 3', 'BYD Dolphin', 'Honda Accord Hybrid'];
    const deliveryVehicles = ['Segway Ninebot Max G30P', 'Segway Ninebot G2', 'E-Bike (Cargo)', 'Toyota Prius', 'Honda Super Cub'];

    const statuses = ['Active', 'Busy', 'Offline', 'Charging', 'En Route'];
    const locations = ['Downtown Core', 'North End', 'East Side', 'Great Northern Rd', 'Soobér Airport (YAM)', 'Base Station', 'Algoma U', 'Sault College', 'Pine St Hub', 'Station Mall'];

    // Generate 40 Ride Drivers
    for (let i = 0; i < 40; i++) {
        const rand = seededRandom(100 + i);
        const id = `R-${String(i + 1).padStart(3, '0')}`;
        const name = `${rideFirstNames[i % rideFirstNames.length]} ${lastInitials[i % lastInitials.length]}.`;
        const vehicle = rideVehicles[Math.floor(rand() * rideVehicles.length)];
        const status = statuses[Math.floor(rand() * statuses.length)];
        const location = status === 'Offline' ? 'Base Station' : locations[Math.floor(rand() * locations.length)];
        const eta = status === 'Active' ? 'Available' : status === 'En Route' ? `${Math.floor(rand() * 15) + 2} mins` : status === 'Busy' ? 'On Trip' : 'N/A';

        units.push({
            id,
            name,
            type: 'Ride',
            vehicle,
            status,
            location,
            eta,
            battery: Math.floor(rand() * 60) + 40,
            // Stable map coordinates (percentage-based)
            mapX: 10 + rand() * 80,
            mapY: 10 + rand() * 80,
        });
    }

    // Generate 40 Delivery Drivers
    for (let i = 0; i < 40; i++) {
        const rand = seededRandom(500 + i);
        const id = `D-${String(i + 1).padStart(3, '0')}`;
        const name = `${deliveryFirstNames[i % deliveryFirstNames.length]} ${lastInitials[i % lastInitials.length]}.`;
        const vehicle = deliveryVehicles[Math.floor(rand() * deliveryVehicles.length)];
        const status = statuses[Math.floor(rand() * statuses.length)];
        const location = status === 'Offline' ? 'Base Station' : locations[Math.floor(rand() * locations.length)];
        const eta = status === 'Active' ? 'Available' : status === 'En Route' ? `${Math.floor(rand() * 12) + 1} mins` : status === 'Busy' ? 'Delivering' : 'N/A';

        units.push({
            id,
            name,
            type: 'Delivery',
            vehicle,
            status,
            location,
            eta,
            battery: Math.floor(rand() * 60) + 40,
            mapX: 10 + rand() * 80,
            mapY: 10 + rand() * 80,
        });
    }

    return units;
};

export const INCIDENT_SEED = [
    { type: 'system', message: 'PremierOne CAD Online. Mac Studio Node #04 active. 80 units loaded.' },
    { type: 'dispatch', message: 'Unit R-012 (Cadillac VISTIQ) dispatched to YAM Terminal 2.' },
    { type: 'system', message: 'Route optimization engine enabled. PremierRoute-v3 loaded.' },
    { type: 'alert', message: 'Demand anomaly detected: Downtown Core. 12 pending orders, 4 active units. Recommend fleet surge.' },
    { type: 'dispatch', message: 'Segway surge deployed: D-031, D-032, D-035 to Downtown Core (<3km radius).' },
    { type: 'system', message: 'Weather: Clear, -2°C. Road conditions: Good. All EVs operating within thermal range.' },
    { type: 'dispatch', message: "Unit R-005 (BYD Atto 3) en route to pickup at Soo Fresh Market." },
    { type: 'system', message: 'Encrypted uplink verified. Data residency: Algoma District. 0 external calls.' },
];

export const LIVE_EVENTS = [
    { type: 'dispatch', message: 'New ride request from Algoma U → Downtown Core. Assigning nearest unit...' },
    { type: 'system', message: 'Unit R-018 (Honda Prologue) battery at 25%. Recommending charge rotation.' },
    { type: 'dispatch', message: 'Delivery order #4021 assigned to D-009 (E-Bike). ETA: 8 mins.' },
    { type: 'alert', message: 'Unit R-033 unresponsive for 120s. Pinging GPS transponder...' },
    { type: 'system', message: 'Transponder response received from R-033. Location: Pine St Hub. Status: Idle.' },
    { type: 'dispatch', message: 'Airport queue: 3 passengers waiting. Dispatching R-002 (GMC Hummer EV).' },
    { type: 'system', message: 'Peak hour model predicting +40% demand in 15 mins. Pre-staging 6 units.' },
    { type: 'alert', message: 'Road closure detected: Wellington St E. Rerouting 4 active units.' },
    { type: 'dispatch', message: 'VIP ride request from Corporate account. Priority unit R-007 assigned.' },
    { type: 'system', message: 'Shift change in 30 mins. 12 units scheduled for rotation.' },
    { type: 'dispatch', message: 'Delivery batch #4022-4025 optimized. 4 orders consolidated to 2 routes.' },
    { type: 'alert', message: 'Segway D-031 low battery (18%). Auto-recalling to Base Station.' },
];
