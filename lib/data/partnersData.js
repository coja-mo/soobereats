// ═══════════════════════════════════════════════════════════════
// Local Partners — Enriched Data Layer
// Full contact info, status, and admin metadata for the
// Local Partners Dashboard. Sourced from public directories.
// ═══════════════════════════════════════════════════════════════

export const partnerStatuses = {
    ACTIVE: 'active',
    PENDING: 'pending',
    PAUSED: 'paused',
    ONBOARDING: 'onboarding',
};

export const partnerTiers = {
    FOUNDING: 'founding',
    PREMIUM: 'premium',
    STANDARD: 'standard',
    MARKETPLACE: 'marketplace',
};

// ── Partner enrichment data ──────────────────────────────────
// Keyed by restaurant/vendor ID from restaurants.js
export const partnerDetails = {

    // ═══ RESTAURANTS ═══════════════════════════════════════════

    'auroras': {
        legalName: "Aurora's Restaurant Ltd.",
        phone: '705-942-4455',
        phoneAlt: '705-949-3000',
        email: 'info@aurorasrestaurant.com',
        emailAlt: 'auroraswest@hotmail.com',
        website: 'aurorasrestaurant.com',
        social: { facebook: 'AurorasRestaurant', instagram: 'aurorasrestaurant' },
        locations: [
            { name: 'Hillside', address: '760 Second Line East, Sault Ste. Marie, ON P6B 4K4', phone: '705-942-4455', hours: 'Mon–Wed 11AM–9PM, Thu 11AM–10PM, Fri 11AM–11PM, Sat 11AM–10PM, Sun Closed' },
            { name: 'Westside', address: '300 Second Line West, Sault Ste. Marie, ON P6C 2J5', phone: '705-949-3000', hours: 'Mon–Thu 11AM–11PM, Fri–Sat 11AM–12AM, Sun 4PM–10PM' },
        ],
        established: 1955,
        tier: 'founding',
        status: 'active',
        categories: ['Italian', 'American', 'Pizza'],
        notes: 'Family-owned 70+ years. Two locations. Famous for stone oven pizzas and ribs.',
        onboardDate: '2025-06-01',
        commissionRate: 18,
    },

    'sandros': {
        legalName: "Sandro's Restaurant",
        phone: '705-949-0442',
        email: null,
        website: null,
        social: { facebook: 'SandrosRestaurant' },
        locations: [
            { name: 'Main', address: '465 Trunk Rd, Sault Ste. Marie, ON', phone: '705-949-0442', hours: 'Tue–Sun 11AM–9PM, Mon Closed' },
        ],
        established: 1979,
        tier: 'standard',
        status: 'active',
        categories: ['Italian', 'Comfort Food', 'Buffet'],
        notes: 'Family-owned since 1979. Legendary weekend buffets.',
        onboardDate: '2025-07-15',
        commissionRate: 18,
    },

    'uncle-ginos': {
        legalName: "Uncle Gino's Cafe & Ristorante",
        phone: '705-949-8506',
        phoneAlt: '705-450-0701',
        email: 'ugcpizza@gmail.com',
        website: 'uncleginoscafe.com',
        social: { facebook: 'UncleGinosCafe', instagram: 'uncleginoscafe' },
        locations: [
            { name: 'Cafe & Ristorante', address: '56 Second Line W, Sault Ste. Marie, ON P6C 2H9', phone: '705-949-8506', hours: 'Mon–Sat 11AM–10PM, Sun 12PM–9PM' },
            { name: 'Pizzeria', address: '76 East St, Sault Ste. Marie, ON P6A 3C5', phone: '705-450-0701', hours: 'Mon–Sun 11AM–11PM' },
        ],
        established: 1985,
        tier: 'founding',
        status: 'active',
        categories: ['Pizza', 'Italian', 'Pasta'],
        notes: 'Established 1985. Two locations. Original Italian comfort destination.',
        onboardDate: '2025-06-01',
        commissionRate: 15,
    },

    'ginos-fired-up': {
        legalName: "Gino's Fired Up Inc.",
        phone: '705-575-2427',
        email: null,
        website: 'ginosfiredup.ca',
        social: { facebook: 'GinosFiredUp', instagram: 'ginosfiredup' },
        locations: [
            { name: 'Main', address: 'Sault Ste. Marie, ON', phone: '705-575-2427', hours: 'Tue–Sun 11:30AM–9PM, Mon Closed' },
        ],
        established: 2020,
        tier: 'premium',
        status: 'active',
        categories: ['Pizza', 'Wood-Fired', 'Italian'],
        notes: 'Wood-fired pizza kitchen. Nashville Hot Honey Chicken pizza viral hit.',
        onboardDate: '2025-08-01',
        commissionRate: 18,
    },

    'mrs-bs': {
        legalName: "Mrs. B's Pizza & Snack Bar",
        phone: '705-575-7522',
        phoneAlt: '705-759-1116',
        email: null,
        website: 'mrsbspizza.ca',
        social: { facebook: 'MrsBsPizza' },
        locations: [
            { name: 'Great Northern', address: '97 Great Northern Rd, Sault Ste. Marie, ON P6B 4Y9', phone: '705-575-7522', hours: 'Mon–Sun 11AM–10PM' },
            { name: 'West', address: '459 Second Line West, Sault Ste. Marie, ON P6C 2K3', phone: '705-759-1116', hours: 'Mon–Sun 11AM–10PM' },
        ],
        established: 2010,
        tier: 'standard',
        status: 'active',
        categories: ['Pizza', 'Snack Bar'],
        notes: 'Two locations. Great Northern and Westside. Online ordering available.',
        onboardDate: '2025-09-01',
        commissionRate: 18,
    },

    'north-82': {
        legalName: 'North 82 Steak & Seafood',
        phone: '705-759-8282',
        email: null,
        website: 'north82restaurant.ca',
        social: { facebook: 'North82', instagram: 'north82steakandseafood' },
        locations: [
            { name: 'Main', address: '82 Great Northern Rd, Sault Ste. Marie, ON P6B 4Y5', phone: '705-759-8282', hours: 'Mon–Thu 11AM–10PM, Fri–Sat 11AM–11PM, Sun 12PM–9PM' },
        ],
        established: 2018,
        tier: 'premium',
        status: 'active',
        categories: ['Steakhouse', 'Seafood'],
        notes: 'Contemporary steak & seafood. Popular destination dining.',
        onboardDate: '2025-07-01',
        commissionRate: 15,
    },

    'burger-don': {
        legalName: 'Burger Don Inc.',
        phone: '705-946-4444',
        email: null,
        website: 'burgerdon.ca',
        social: { facebook: 'BurgerDon', instagram: 'burgerdon' },
        locations: [
            { name: 'Main', address: '7 Great Northern Rd, Unit 11, Sault Ste. Marie, ON P6B 4Y4', phone: '705-946-4444', hours: 'Mon–Sat 11AM–9PM, Sun Closed' },
        ],
        established: 2019,
        tier: 'standard',
        status: 'active',
        categories: ['Burgers', 'Fast Casual'],
        notes: 'Gourmet burger concept. Active on social media.',
        onboardDate: '2025-08-15',
        commissionRate: 18,
    },

    'stackburger': {
        legalName: 'Stack Burger',
        phone: '705-575-2874',
        email: null,
        website: null,
        social: { facebook: 'StackBurgerSSM', instagram: 'stackburger' },
        locations: [
            { name: 'Main', address: '71 Spring St, Sault Ste. Marie, ON P6A 2Z9', phone: '705-575-2874', hours: 'Mon–Sat 11AM–9PM, Sun Closed' },
        ],
        established: 2021,
        tier: 'standard',
        status: 'active',
        categories: ['Burgers', 'Fast Casual'],
        notes: 'Smash burger specialist on Spring St.',
        onboardDate: '2025-09-01',
        commissionRate: 18,
    },

    'tandoori-gardan': {
        legalName: 'Tandoori Gardan Restaurant',
        phone: '705-450-2280',
        email: null,
        website: 'tandoori-gardan.ca',
        social: { facebook: 'TandooriGardan', instagram: 'tandoorigardan' },
        locations: [
            { name: 'Main', address: '663 Queen St E, Sault Ste. Marie, ON P6A 2A6', phone: '705-450-2280', hours: 'Mon–Sun 11AM–10PM' },
        ],
        established: 2016,
        tier: 'standard',
        status: 'active',
        categories: ['Indian', 'Tandoori', 'Curry'],
        notes: 'Award-winning Indian cuisine. Authentic tandoori and curry specialists.',
        onboardDate: '2025-07-15',
        commissionRate: 18,
    },

    'arturos': {
        legalName: "Arturo's Ristorante",
        phone: '705-253-0002',
        email: null,
        website: 'arturoristorante.com',
        social: { facebook: 'ArturosSSM', instagram: 'arturos_ristorante' },
        locations: [
            { name: 'Main', address: '515 Queen St E, Sault Ste. Marie, ON', phone: '705-253-0002', hours: 'Tue–Sat 5PM–10PM, Sun–Mon Closed' },
        ],
        established: 2008,
        tier: 'premium',
        status: 'active',
        categories: ['Italian', 'Fine Dining'],
        notes: 'Upscale Italian. Fresh-made pasta daily.',
        onboardDate: '2025-08-01',
        commissionRate: 15,
    },

    'antico': {
        legalName: 'Antico Italian Restaurant',
        phone: '705-206-0234',
        email: null,
        website: null,
        social: { facebook: 'AnticoSSM' },
        locations: [
            { name: 'Main', address: '31 Queen St E, Sault Ste. Marie, ON', phone: '705-206-0234', hours: 'Mon–Sat 11AM–10PM, Sun Closed' },
        ],
        established: 2019,
        tier: 'standard',
        status: 'active',
        categories: ['Italian'],
        notes: 'Downtown Italian. Wood-fired pizzas and house-made pastas.',
        onboardDate: '2025-09-01',
        commissionRate: 18,
    },

    'fratellis': {
        legalName: "Fratelli's Restaurant",
        phone: '705-256-1313',
        email: null,
        website: 'fratellisrestaurant.ca',
        social: { facebook: 'FratellisSSM' },
        locations: [
            { name: 'Main', address: '193 East St, Sault Ste. Marie, ON', phone: '705-256-1313', hours: 'Tue–Sat 4PM–10PM, Sun–Mon Closed' },
        ],
        established: 2010,
        tier: 'standard',
        status: 'active',
        categories: ['Italian', 'Pizza'],
        notes: 'Southern Italian cuisine. Known for wood-fired pizzas.',
        onboardDate: '2025-07-15',
        commissionRate: 18,
    },

    'mill-steakhouse': {
        legalName: 'The Mill Steakhouse & Log Cabin',
        phone: '705-942-3051',
        email: null,
        website: 'canaldistrict.ca',
        social: { facebook: 'MillSteakhouse' },
        locations: [
            { name: 'Canal District', address: '85 Huron St, Sault Ste. Marie, ON', phone: '705-942-3051', hours: 'Mon–Sat 4PM–10PM, Sun 4PM–9PM' },
        ],
        established: 1975,
        tier: 'founding',
        status: 'active',
        categories: ['Steakhouse', 'Canadian'],
        notes: 'Canal District landmark. Log cabin atmosphere. Steaks and Canadian classics.',
        onboardDate: '2025-06-01',
        commissionRate: 15,
    },

    'block-house': {
        legalName: 'The Blockhouse Pub',
        phone: '705-759-0009',
        email: null,
        website: null,
        social: { facebook: 'BlockhousePub' },
        locations: [
            { name: 'Canal District', address: '87 Huron St, Sault Ste. Marie, ON', phone: '705-759-0009', hours: 'Mon–Sun 11AM–11PM' },
        ],
        established: 2015,
        tier: 'standard',
        status: 'active',
        categories: ['Pub', 'Bar & Grill'],
        notes: 'Canal District pub. Live music venue.',
        onboardDate: '2025-09-01',
        commissionRate: 18,
    },

    'mulligans': {
        legalName: "Mulligan's Irish Pub",
        phone: '705-759-2695',
        email: null,
        website: 'mulligansirishpub.ca',
        social: { facebook: 'MulligansIrishPubSSM' },
        locations: [
            { name: 'Main', address: '753 Queen St E, Sault Ste. Marie, ON', phone: '705-759-2695', hours: 'Mon–Sun 11AM–12AM' },
        ],
        established: 2005,
        tier: 'standard',
        status: 'active',
        categories: ['Pub', 'Irish'],
        notes: 'Authentic Irish pub. Live entertainment. Community favourite.',
        onboardDate: '2025-08-15',
        commissionRate: 18,
    },

    'the-root': {
        legalName: 'The Root River Co.',
        phone: '705-759-8776',
        email: null,
        website: 'rootriverco.com',
        social: { facebook: 'TheRootSSM', instagram: 'therootssm' },
        locations: [
            { name: 'Main', address: '81 Elgin St, Sault Ste. Marie, ON', phone: '705-759-8776', hours: 'Tue–Sat 11AM–10PM, Sun 10AM–3PM, Mon Closed' },
        ],
        established: 2020,
        tier: 'premium',
        status: 'active',
        categories: ['Canadian', 'Farm-to-Table', 'Craft Cocktails'],
        notes: 'Farm-to-table concept. Seasonal menus. Craft cocktails. Downtown gem.',
        onboardDate: '2025-07-01',
        commissionRate: 15,
    },

    'embers-ridge': {
        legalName: 'Embers On The Ridge (Crimson Ridge Golf)',
        phone: '705-253-2002',
        email: null,
        website: 'crimsonridge.com',
        social: { facebook: 'EmbersOnTheRidge' },
        locations: [
            { name: 'Crimson Ridge', address: '418 Fourth Line W, Sault Ste. Marie, ON', phone: '705-253-2002', hours: 'Wed–Sun 5PM–9PM (seasonal)' },
        ],
        established: 2018,
        tier: 'premium',
        status: 'active',
        categories: ['Fine Dining', 'Farm-to-Table', 'Steakhouse'],
        notes: 'Overlooking Crimson Ridge Golf Course. Dry-aged Penokean Hills beef. Premium dining.',
        onboardDate: '2025-08-01',
        commissionRate: 12,
    },

    'forty-five-social': {
        legalName: 'Forty Five Social',
        phone: '705-574-4545',
        email: null,
        website: 'fortyfivesocial.ca',
        social: { facebook: 'FortyFiveSocial', instagram: 'fortyfivesocial' },
        locations: [
            { name: 'Downtown', address: 'Downtown, Sault Ste. Marie, ON', phone: '705-574-4545', hours: 'Wed–Sun 5PM–12AM, Mon–Tue Closed' },
        ],
        established: 2022,
        tier: 'standard',
        status: 'active',
        categories: ['Bar & Lounge', 'Cocktails'],
        notes: 'Trendy social lounge. Craft cocktails and elevated bar food.',
        onboardDate: '2025-09-15',
        commissionRate: 18,
    },

    'kasdan-co': {
        legalName: 'Kasdan Co.',
        phone: '705-206-3369',
        email: null,
        website: 'kasdanco.com',
        social: { facebook: 'KasdanCo', instagram: 'kasdan.co' },
        locations: [
            { name: 'Main', address: '792 Queen St E, Sault Ste. Marie, ON', phone: '705-206-3369', hours: 'Tue–Sat 8AM–4PM, Sun–Mon Closed' },
        ],
        established: 2023,
        tier: 'standard',
        status: 'active',
        categories: ['Café', 'Donuts', 'Bar'],
        notes: 'Donuts, espresso bar, and cocktails. Queen St East.',
        onboardDate: '2025-10-01',
        commissionRate: 18,
    },

    'croatian-corner': {
        legalName: 'Croatian Corner Restaurant',
        phone: '705-256-7878',
        email: null,
        website: null,
        social: { facebook: 'CroatianCornerSSM' },
        locations: [
            { name: 'Main', address: '188 Bruce St, Sault Ste. Marie, ON', phone: '705-256-7878', hours: 'Mon–Sat 11AM–9PM, Sun Closed' },
        ],
        established: 1995,
        tier: 'standard',
        status: 'active',
        categories: ['Croatian', 'European'],
        notes: 'Authentic Croatian cuisine. Community dining institution.',
        onboardDate: '2025-08-01',
        commissionRate: 18,
    },

    // ═══ TIER 1 — NEW PARTNERS ═══════════════════════════════

    'breakfast-pig': {
        legalName: 'The Breakfast Pig',
        phone: '705-945-7744',
        email: null,
        website: null,
        social: { facebook: 'TheBreakfastPig', instagram: 'thebreakfastpig' },
        locations: [
            { name: 'Main', address: '265 Bruce St, Sault Ste. Marie, ON', phone: '705-945-7744', hours: 'Mon–Sun 8AM–4PM' },
        ],
        established: 2016,
        tier: 'premium',
        status: 'active',
        categories: ['Breakfast', 'Brunch'],
        notes: 'Beloved breakfast institution. Eggs benny, pancakes, smashed potatoes.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    'georgies-shawarma': {
        legalName: "Georgie's Shawarma",
        phone: '705-759-1175',
        email: null,
        website: null,
        social: { facebook: 'GeorgiesShawarma' },
        locations: [
            { name: 'Main', address: '75 Elgin St, Sault Ste. Marie, ON', phone: '705-759-1175', hours: 'Mon–Sat 11AM–9PM, Sun Closed' },
        ],
        established: 2015,
        tier: 'standard',
        status: 'active',
        categories: ['Middle Eastern', 'Syrian', 'Halal'],
        notes: 'Authentic Syrian shawarma + falafel. Community favourite.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    'northern-superior-brewing': {
        legalName: 'Northern Superior Brewing Co.',
        phone: '705-759-1300',
        email: null,
        website: 'northernsuperior.com',
        social: { facebook: 'NorthernSuperiorBrewing', instagram: 'nsbcbeer' },
        locations: [
            { name: 'Main', address: '50 Pim St, Sault Ste. Marie, ON', phone: '705-759-1300', hours: 'Wed–Sat 12PM–9PM, Sun 12PM–5PM' },
        ],
        established: 1907,
        tier: 'founding',
        status: 'active',
        categories: ['Brewery', 'Craft Beer'],
        notes: 'Historic brewery est. 1907. Craft beer pioneer of Northern Ontario.',
        onboardDate: '2026-03-09',
        commissionRate: 15,
    },

    'the-country-way': {
        legalName: 'The Country Way Health Store',
        phone: '705-256-1811',
        email: null,
        website: null,
        social: { facebook: 'TheCountryWaySSM' },
        locations: [
            { name: 'Main', address: '79 Brock St, Sault Ste. Marie, ON', phone: '705-256-1811', hours: 'Mon–Fri 9:30AM–5:30PM, Sat 9:30AM–5PM, Sun Closed' },
        ],
        established: 1974,
        tier: 'standard',
        status: 'active',
        categories: ['Health & Wellness', 'Natural Foods'],
        notes: 'Health food store since 1974. Vitamins, supplements, natural products.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    'northern-natural-health': {
        legalName: 'Northern Natural Health & Wellness',
        phone: null,
        email: null,
        website: null,
        social: {},
        locations: [
            { name: 'Main', address: 'Sault Ste. Marie, ON', phone: null, hours: 'Mon–Fri 10AM–6PM, Sat 10AM–4PM' },
        ],
        established: 2020,
        tier: 'standard',
        status: 'active',
        categories: ['Health & Wellness'],
        notes: 'Natural health products and wellness consultations.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    'chummys-grill': {
        legalName: "Chummy's Grill",
        phone: '705-649-1555',
        email: null,
        website: null,
        social: { facebook: 'ChummysGrill' },
        locations: [
            { name: 'Main', address: '262 Frontenac St, Sault Ste. Marie, ON', phone: '705-649-1555', hours: 'Mon–Sat 8AM–7PM, Sun 10AM–5PM' },
        ],
        established: 2018,
        tier: 'premium',
        status: 'active',
        categories: ['Indigenous', 'Breakfast', 'Canadian'],
        notes: 'Batchewana First Nation owned. Indian Tacos, bannock, burgers. Indigenous cuisine champion.',
        onboardDate: '2026-03-09',
        commissionRate: 15,
    },

    // ═══ TIER 2 — NEW PARTNERS ═══════════════════════════════

    '49th-apparel': {
        legalName: '49th Apparel Inc.',
        phone: null,
        email: 'hello@49thapparel.com',
        website: '49thapparel.com',
        social: { facebook: '49thApparel', instagram: '49thapparel' },
        locations: [
            { name: 'Studio', address: '480 Queen St E, Sault Ste. Marie, ON P6A 1Z8', phone: null, hours: 'By appointment / Online' },
        ],
        established: 2015,
        tier: 'premium',
        status: 'active',
        categories: ['Boutique', 'Apparel', 'Sleepwear'],
        notes: 'Canadian-made sleepwear + womenswear. Natural fabrics. Designed and produced in SSM.',
        onboardDate: '2026-03-09',
        commissionRate: 12,
    },

    'sunset-noodle-house': {
        legalName: 'Sunset Noodle House',
        phone: '705-759-0000',
        email: null,
        website: 'sunsetnoodlehouse.ca',
        social: { facebook: 'SunsetNoodleHouse', instagram: 'sunsetnoodlehouse' },
        locations: [
            { name: 'Main', address: '133 Spring St, Sault Ste. Marie, ON P6A 3A2', phone: '705-759-0000', hours: 'Tue–Thu 11:30AM–10PM, Fri 11:30AM–11PM, Sat 5PM–11PM, Sun–Mon Closed' },
        ],
        established: 2019,
        tier: 'standard',
        status: 'active',
        categories: ['Vietnamese', 'Pho', 'Asian'],
        notes: 'Authentic Vietnamese. Pho, bánh mì, vermicelli bowls. Spring St institution.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    'scott-coffee-co': {
        legalName: 'Scott Coffee Co.',
        phone: null,
        email: null,
        website: null,
        social: { facebook: 'ScottCoffeeCo', instagram: 'scottcoffeeco' },
        locations: [
            { name: 'Main', address: '248 Northern Ave E, Sault Ste. Marie, ON P6H 4H6', phone: null, hours: 'Mon–Sat 7AM–4PM, Sun Closed' },
        ],
        established: 2021,
        tier: 'standard',
        status: 'active',
        categories: ['Café', 'Coffee', 'Bakery'],
        notes: 'Specialty espresso, homemade cheesecakes and brownies. Vietnamese iced coffee.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    'stork-and-bundle': {
        legalName: 'Stork & Bundle',
        phone: '705-206-0266',
        email: null,
        website: 'storkandbundle.com',
        social: { facebook: 'StorkAndBundle', instagram: 'storkandbundle' },
        locations: [
            { name: 'Main', address: '715 Queen St E, Sault Ste. Marie, ON P6A 2A8', phone: '705-206-0266', hours: 'Mon–Sat 10AM–5PM, Sun Closed' },
        ],
        established: 2018,
        tier: 'standard',
        status: 'active',
        categories: ['Boutique', 'Baby Products', 'Eco'],
        notes: 'Curated baby gear, cloth diapers, eco-friendly products. Queen St E.',
        onboardDate: '2026-03-09',
        commissionRate: 15,
    },

    'soo-falls-brewing': {
        legalName: 'Soo Falls Brewing Company',
        phone: null,
        email: null,
        website: 'soofallsbrewery.com',
        social: { facebook: 'SooFallsBrewing', instagram: 'soofallsbrewing' },
        locations: [
            { name: 'Taproom', address: '87 Huron St, Sault Ste. Marie, ON', phone: null, hours: 'Thu–Fri 4PM–10PM, Sat 2PM–10PM, Sun 2PM–7PM' },
        ],
        established: 2022,
        tier: 'standard',
        status: 'active',
        categories: ['Brewery', 'Craft Beer'],
        notes: 'Canal District craft brewery. Small-batch lagers, sours, IPAs. Cans to go.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    // ═══ TIER 3 — NEW PARTNERS ═══════════════════════════════

    'shabby-motley': {
        legalName: 'Shabby Motley Handcraft',
        phone: null,
        email: null,
        website: 'shabbymotley.com',
        social: { facebook: 'ShabbyMotley', instagram: 'shabbymotley' },
        locations: [
            { name: 'Main', address: '356 Queen St E, Sault Ste. Marie, ON P6A 1Z1', phone: null, hours: 'Tue–Sat 10AM–5PM, Sun Closed' },
        ],
        established: 2016,
        tier: 'standard',
        status: 'active',
        categories: ['Craft & Café', 'Yarn', 'Bakery'],
        notes: 'Yarn shop + café + maker space. Home Bakehouse sourdough. Craft workshops.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    'annanda-chaga': {
        legalName: 'Annanda Chaga Mushrooms',
        phone: null,
        email: 'info@annandachaga.com',
        website: 'annandachaga.com',
        social: { facebook: 'AnnandaChaga', instagram: 'annandachaga' },
        locations: [
            { name: 'Main', address: 'Sault Ste. Marie, ON', phone: null, hours: 'Mon–Fri 9AM–5PM' },
        ],
        established: 2015,
        tier: 'standard',
        status: 'active',
        categories: ['Health & Wellness', 'Superfood', 'Mushroom'],
        notes: 'Wild-harvested organic chaga from Northern Ontario. Tinctures, powders, teas, coffees.',
        onboardDate: '2026-03-09',
        commissionRate: 15,
    },

    'algoma-highlands': {
        legalName: 'Algoma Highlands Wild Blueberry Farm & Winery',
        phone: '705-856-4231',
        email: null,
        website: 'algomahighlands.ca',
        social: { facebook: 'AlgomaHighlands', instagram: 'algomahighlands' },
        locations: [
            { name: 'Farm & Winery', address: 'Wawa, ON (640-acre farm)', phone: '705-856-4231', hours: 'Mon–Sat 9AM–5PM (seasonal)' },
        ],
        established: 2004,
        tier: 'premium',
        status: 'active',
        categories: ['Winery', 'Farm', 'Preserves'],
        notes: 'Family-owned 640-acre farm. Wild blueberry wines, jams, syrups. Agri-tourism.',
        onboardDate: '2026-03-09',
        commissionRate: 12,
    },

    'aizeneia': {
        legalName: 'Aizeneia',
        phone: null,
        email: null,
        website: null,
        social: { instagram: 'aizeneia' },
        locations: [
            { name: 'Soo MRKT', address: '73 Brock St, Sault Ste. Marie, ON', phone: null, hours: 'Saturdays 9AM–2PM / Online' },
        ],
        established: 2021,
        tier: 'marketplace',
        status: 'active',
        categories: ['Boutique', 'Zero-Waste', 'Self-Care'],
        notes: 'Handmade zero-waste bath, body, home. Soo MRKT vendor. Eco-conscious.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },

    // ═══ SHOP PARTNERS ═══════════════════════════════════════

    'ida-drug-mart': {
        legalName: 'IDA Drug Mart (Guardian Pharmacy)',
        phone: '705-759-5711',
        email: null,
        website: null,
        social: {},
        locations: [
            { name: 'Urban Square', address: '341 Great Northern Rd, Sault Ste. Marie, ON', phone: '705-759-5711', hours: 'Mon–Fri 9AM–8PM, Sat 9AM–6PM, Sun 10AM–5PM' },
            { name: 'Wellington Square', address: '65 Wellington St W, Sault Ste. Marie, ON', phone: '705-256-6211', hours: 'Mon–Fri 9AM–6PM, Sat 9AM–4PM, Sun Closed' },
            { name: 'Queenstown', address: '1200 Queen St E, Sault Ste. Marie, ON', phone: '705-759-1100', hours: 'Mon–Fri 9AM–7PM, Sat 9AM–5PM, Sun Closed' },
            { name: 'Market Mall', address: '293 Bay St, Sault Ste. Marie, ON', phone: '705-949-6655', hours: 'Mon–Fri 9AM–8PM, Sat 9AM–6PM, Sun 12PM–5PM' },
        ],
        established: 1970,
        tier: 'founding',
        status: 'active',
        categories: ['Pharmacy', 'Health', 'Convenience'],
        notes: 'Local pharmacy chain with 4 SSM locations. Health, beauty, prescriptions, convenience.',
        onboardDate: '2026-03-09',
        commissionRate: 10,
    },

    'sweet-greetings': {
        legalName: 'Sweet Greetings',
        phone: null,
        email: null,
        website: null,
        social: { facebook: 'SweetGreetingsSSM', instagram: 'sweetgreetings' },
        locations: [
            { name: 'Main', address: 'Sault Ste. Marie, ON', phone: null, hours: 'By order' },
        ],
        established: 2020,
        tier: 'standard',
        status: 'active',
        categories: ['Bakery', 'Gifts', 'Custom Cakes'],
        notes: 'Custom cakes, cookies, and sweet gift boxes. Online ordering.',
        onboardDate: '2026-03-09',
        commissionRate: 18,
    },
};

// ── Helper: merge partner details with restaurant data ───────
export function getEnrichedPartner(restaurantId, restaurantData) {
    const details = partnerDetails[restaurantId] || null;
    if (!details) return { ...restaurantData, partnerDetails: null };
    return {
        ...restaurantData,
        partnerDetails: details,
    };
}

// ── Helper: get all partner IDs ──────────────────────────────
export function getAllPartnerIds() {
    return Object.keys(partnerDetails);
}

// ── Stats helpers ────────────────────────────────────────────
export function getPartnerStats() {
    const entries = Object.values(partnerDetails);
    return {
        total: entries.length,
        active: entries.filter(p => p.status === 'active').length,
        pending: entries.filter(p => p.status === 'pending').length,
        paused: entries.filter(p => p.status === 'paused').length,
        founding: entries.filter(p => p.tier === 'founding').length,
        premium: entries.filter(p => p.tier === 'premium').length,
        standard: entries.filter(p => p.tier === 'standard').length,
        marketplace: entries.filter(p => p.tier === 'marketplace').length,
        totalLocations: entries.reduce((sum, p) => sum + (p.locations?.length || 0), 0),
        withWebsite: entries.filter(p => p.website).length,
        withPhone: entries.filter(p => p.phone).length,
        withEmail: entries.filter(p => p.email).length,
    };
}
