/**
 * Soobér AI Engine
 * 
 * A comprehensive client-side NLU engine with:
 * - Intent classification (weighted keyword scoring + pattern matching)
 * - Entity extraction (order IDs, addresses, amounts, names)
 * - Sentiment analysis
 * - Context-aware multi-turn conversation management
 * - Proactive suggestion engine
 * - Rich response generation (text, action buttons, cards, order previews)
 */

// ══════════════════════════════════════════════════════════════════════════════
// INTENT DEFINITIONS — Each intent has keywords, patterns, priority, and weight
// ══════════════════════════════════════════════════════════════════════════════

const INTENTS = {
    // ─── ORDER TRACKING ───
    order_tracking: {
        keywords: ['where', 'track', 'status', 'order', 'eta', 'how long', 'when', 'delivery', 'arrive', 'coming', 'progress', 'on the way', 'driver location'],
        patterns: [/where.*(order|driver|delivery)/i, /track.*order/i, /order.*status/i, /how long.*(take|until|left)/i, /when.*(arrive|get here|coming)/i],
        priority: 10,
    },
    // ─── REFUND / COMPLAINT ───
    refund_request: {
        keywords: ['refund', 'money back', 'charge', 'overcharged', 'incorrect charge', 'cancel order', 'want my money'],
        patterns: [/refund/i, /money back/i, /cancel.*order/i, /overcharg/i, /want.*refund/i, /get.*money.*back/i],
        priority: 9,
    },
    order_issue: {
        keywords: ['wrong', 'missing', 'cold', 'late', 'broken', 'damaged', 'spilled', 'incorrect', 'not what', 'bad quality', 'stale', 'raw', 'undercooked'],
        patterns: [/missing.*item/i, /wrong.*order/i, /cold.*food/i, /late.*deliver/i, /order.*wrong/i, /not.*what.*ordered/i, /food.*(cold|stale|bad)/i],
        priority: 9,
    },
    // ─── RIDE RELATED ───
    ride_booking: {
        keywords: ['ride', 'uber', 'pickup', 'drop off', 'ride now', 'book a ride', 'car', 'driver', 'hail'],
        patterns: [/book.*ride/i, /need.*ride/i, /get.*ride/i, /ride.*to/i, /pick.*up/i, /schedule.*ride/i],
        priority: 8,
    },
    ride_tracking: {
        keywords: ['ride status', 'driver coming', 'car location', 'vehicle', 'ride eta'],
        patterns: [/where.*driver/i, /driver.*coming/i, /ride.*status/i, /car.*coming/i],
        priority: 8,
    },
    airport_transfer: {
        keywords: ['airport', 'yam', 'flight', 'terminal', 'fly', 'airplane'],
        patterns: [/airport.*transfer/i, /(to|from).*airport/i, /flight/i, /yam/i],
        priority: 7,
    },
    // ─── ACCOUNT / REWARDS ───
    account_help: {
        keywords: ['account', 'password', 'login', 'sign in', 'profile', 'address', 'update', 'change email', 'delete account', 'deactivate'],
        patterns: [/(change|update|reset).*(password|email|address|phone)/i, /log.*in/i, /sign.*up/i, /delete.*account/i, /can't.*login/i],
        priority: 6,
    },
    rewards_loyalty: {
        keywords: ['rewards', 'points', 'loyalty', 'tier', 'bronze', 'silver', 'gold', 'diamond', 'perk', 'benefit', 'level'],
        patterns: [/how.*many.*points/i, /reward/i, /loyalty.*program/i, /tier.*level/i, /upgrade.*tier/i],
        priority: 6,
    },
    promo_code: {
        keywords: ['promo', 'coupon', 'discount', 'code', 'offer', 'deal', 'sale', 'free delivery'],
        patterns: [/promo.*code/i, /coupon/i, /discount/i, /have.*code/i, /any.*deal/i],
        priority: 5,
    },
    // ─── BUSINESS / PARTNER ───
    restaurant_inquiry: {
        keywords: ['restaurant', 'partner', 'list my', 'join', 'commission', 'vendor', 'onboard', 'sign up business', 'merchant'],
        patterns: [/list.*restaurant/i, /partner.*with/i, /join.*soob/i, /what.*commission/i, /add.*restaurant/i, /become.*vendor/i],
        priority: 6,
    },
    // ─── DELIVERY ───
    delivery_zones: {
        keywords: ['delivery zone', 'deliver to', 'coverage', 'area', 'garden river', 'goulais', 'echo bay', 'north end', 'east end', 'west end', 'downtown'],
        patterns: [/deliver.*to/i, /delivery.*zone/i, /coverage.*area/i, /do you.*deliver/i, /(garden river|goulais|echo bay)/i],
        priority: 6,
    },
    delivery_fee: {
        keywords: ['delivery fee', 'how much', 'cost', 'price', 'fee', 'charge for delivery', 'free delivery'],
        patterns: [/delivery.*fee/i, /how much.*(delivery|cost)/i, /free.*delivery/i],
        priority: 5,
    },
    // ─── COMMUNITY ───
    community_marketplace: {
        keywords: ['community', 'marketplace', 'sell', 'listing', 'craft', 'baker', 'crafter', 'used', 'second hand', 'kijiji', 'classified'],
        patterns: [/community.*market/i, /sell.*(item|stuff|thing)/i, /list.*something/i, /sell on soob/i],
        priority: 5,
    },
    // ─── GENERAL ───
    greeting: {
        keywords: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'sup', 'whats up'],
        patterns: [/^(hi|hey|hello|howdy|sup)\b/i, /good (morning|afternoon|evening)/i],
        priority: 1,
    },
    farewell: {
        keywords: ['bye', 'goodbye', 'thanks', 'thank you', 'see you', 'that\'s all', 'done', 'cheers'],
        patterns: [/^(bye|goodbye|thanks|thank|cheers)/i, /that('s| is) all/i],
        priority: 1,
    },
    escalate_agent: {
        keywords: ['agent', 'human', 'real person', 'representative', 'talk to', 'live agent', 'speak to someone', 'manager', 'supervisor'],
        patterns: [/talk.*to.*(agent|human|person|someone|rep)/i, /real.*person/i, /live.*agent/i, /speak.*to/i, /connect.*agent/i],
        priority: 10,
    },
    hours_info: {
        keywords: ['hours', 'open', 'close', 'when', 'schedule', 'operating', 'available'],
        patterns: [/what.*hours/i, /(are|is).*you.*open/i, /when.*(open|close)/i, /operating.*hours/i],
        priority: 4,
    },
    sustainability: {
        keywords: ['electric', 'ev', 'green', 'eco', 'sustainable', 'emissions', 'carbon', 'environment', 'compostable', 'packaging'],
        patterns: [/electric.*fleet/i, /sustainability/i, /carbon.*footprint/i, /eco.*friendly/i],
        priority: 3,
    },
    scooter_rental: {
        keywords: ['scooter', 'e-scooter', 'boardwalk', 'rent scooter', 'electric scooter'],
        patterns: [/rent.*(scooter|e-scooter)/i, /scooter.*rental/i, /boardwalk.*scooter/i],
        priority: 5,
    },
};

// ══════════════════════════════════════════════════════════════════════════════
// ENTITY EXTRACTION
// ══════════════════════════════════════════════════════════════════════════════

export function extractEntities(text) {
    const entities = {};

    // Order ID
    const orderMatch = text.match(/(?:order|#|ORD[-\s]?)(\d{4,})/i) || text.match(/ORD-\d+/i);
    if (orderMatch) entities.orderId = orderMatch[0].toUpperCase().replace(/\s/g, '');

    // Dollar amount
    const amountMatch = text.match(/\$(\d+(?:\.\d{2})?)/);
    if (amountMatch) entities.amount = parseFloat(amountMatch[1]);

    // Phone number
    const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    if (phoneMatch) entities.phone = phoneMatch[0];

    // Email
    const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) entities.email = emailMatch[0];

    // Address hint
    const addressKeywords = ['queen st', 'gore st', 'bay st', 'wellington', 'great northern', 'trunk rd', 'second line', 'mcnabb', 'pine st', 'peoples rd', 'northern ave'];
    for (const addr of addressKeywords) {
        if (text.toLowerCase().includes(addr)) {
            entities.address = addr;
            break;
        }
    }

    // Restaurant names
    const restaurants = ['aurora', 'soo fresh', 'tandoori', 'sandro', 'muio', 'uncle gino', 'solo trattoria'];
    for (const r of restaurants) {
        if (text.toLowerCase().includes(r)) {
            entities.restaurant = r.charAt(0).toUpperCase() + r.slice(1);
            break;
        }
    }

    return entities;
}

// ══════════════════════════════════════════════════════════════════════════════
// SENTIMENT ANALYSIS (Simple but effective)
// ══════════════════════════════════════════════════════════════════════════════

const SENTIMENT_WORDS = {
    positive: ['thanks', 'thank', 'great', 'awesome', 'love', 'amazing', 'perfect', 'excellent', 'wonderful', 'happy', 'appreciate', 'good', 'best', 'nice', 'helpful', 'fantastic'],
    negative: ['bad', 'terrible', 'horrible', 'awful', 'worst', 'hate', 'angry', 'frustrated', 'furious', 'disappointed', 'unacceptable', 'ridiculous', 'disgusting', 'poor', 'pathetic', 'unbelievable'],
    urgent: ['urgent', 'emergency', 'immediately', 'asap', 'right now', 'hurry', 'critical', 'desperate'],
};

export function analyzeSentiment(text) {
    const lower = text.toLowerCase();
    let score = 0; // -1 to 1
    let urgency = false;

    for (const word of SENTIMENT_WORDS.positive) {
        if (lower.includes(word)) score += 0.3;
    }
    for (const word of SENTIMENT_WORDS.negative) {
        if (lower.includes(word)) score -= 0.4;
    }
    for (const word of SENTIMENT_WORDS.urgent) {
        if (lower.includes(word)) urgency = true;
    }

    // Exclamation marks increase intensity
    const exclamations = (text.match(/!/g) || []).length;
    if (exclamations > 1) score *= 1.3;

    // ALL CAPS detection
    if (text === text.toUpperCase() && text.length > 5) {
        score -= 0.3; // Likely frustrated
        urgency = true;
    }

    return {
        score: Math.max(-1, Math.min(1, score)),
        label: score > 0.2 ? 'positive' : score < -0.2 ? 'negative' : 'neutral',
        urgency,
    };
}

// ══════════════════════════════════════════════════════════════════════════════
// INTENT CLASSIFICATION
// ══════════════════════════════════════════════════════════════════════════════

export function classifyIntent(text, conversationContext = {}) {
    const lower = text.toLowerCase();
    const scores = {};

    for (const [intent, config] of Object.entries(INTENTS)) {
        let score = 0;

        // Keyword matching
        for (const keyword of config.keywords) {
            if (lower.includes(keyword)) {
                score += 2;
            }
        }

        // Pattern matching (stronger signal)
        for (const pattern of config.patterns) {
            if (pattern.test(lower)) {
                score += 4;
            }
        }

        // Context boost — if previous intent was similar, boost continuation
        if (conversationContext.lastIntent === intent) {
            score += 2;
        }

        // Priority weighting
        score *= (config.priority / 10);

        if (score > 0) {
            scores[intent] = score;
        }
    }

    // Sort by score
    const ranked = Object.entries(scores)
        .sort(([, a], [, b]) => b - a);

    if (ranked.length === 0) {
        return { intent: 'unknown', confidence: 0, allScores: {} };
    }

    const [topIntent, topScore] = ranked[0];
    const confidence = Math.min(topScore / 10, 1); // Normalize to 0-1

    return {
        intent: topIntent,
        confidence,
        secondaryIntent: ranked[1]?.[0] || null,
        allScores: Object.fromEntries(ranked),
    };
}

// ══════════════════════════════════════════════════════════════════════════════
// CONVERSATION CONTEXT MANAGER
// ══════════════════════════════════════════════════════════════════════════════

export class ConversationContext {
    constructor() {
        this.turns = [];
        this.lastIntent = null;
        this.entities = {};
        this.sentiment = 'neutral';
        this.escalationRequested = false;
        this.orderContext = null;
        this.rideContext = null;
        this.resolvedIssues = [];
        this.unresolvedIssues = [];
    }

    addTurn(role, text, intent = null, entities = {}) {
        this.turns.push({
            role, text, intent, entities,
            timestamp: Date.now(),
        });

        if (intent) this.lastIntent = intent;

        // Merge entities
        this.entities = { ...this.entities, ...entities };

        // Track issues
        if (['refund_request', 'order_issue'].includes(intent)) {
            this.unresolvedIssues.push(intent);
        }

        if (intent === 'escalate_agent') {
            this.escalationRequested = true;
        }
    }

    getTurnCount() {
        return this.turns.length;
    }

    getLastUserMessage() {
        const userTurns = this.turns.filter(t => t.role === 'user');
        return userTurns[userTurns.length - 1]?.text || '';
    }

    hasActiveOrder() {
        return !!this.entities.orderId;
    }

    toSummary() {
        return {
            turns: this.turns.length,
            lastIntent: this.lastIntent,
            entities: this.entities,
            sentiment: this.sentiment,
            escalated: this.escalationRequested,
            unresolvedIssues: this.unresolvedIssues,
        };
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// RESPONSE GENERATOR
// ══════════════════════════════════════════════════════════════════════════════

// Simulated order data for demo
const DEMO_ORDERS = {
    'ORD-4012': { restaurant: "Soo Fresh Market", items: ['Organic 2% Milk', 'Sourdough Bread', 'Local Honey'], status: 'en_route', driver: 'Marcus T.', vehicle: 'Black GMC Hummer EV', eta: '4 min', total: 32.47 },
    'ORD-4013': { restaurant: "Aurora's Italian", items: ['Margherita Pizza', 'Caesar Salad', 'Tiramisu'], status: 'preparing', driver: null, vehicle: null, eta: '22 min', total: 48.95 },
    'ORD-4014': { restaurant: "Solo Trattoria", items: ['Penne Arrabbiata', 'Garlic Bread'], status: 'delivered', driver: 'Anika R.', vehicle: 'Chevy Equinox EV', eta: null, total: 29.99 },
};

const DEMO_RIDE = {
    driver: 'James K.',
    vehicle: 'Cadillac VISTIQ (Pearl White)',
    eta: '3 min',
    pickup: '456 Queen St E',
    dropoff: 'Station Mall',
    fare: '$14.50',
};

/**
 * Generate a rich AI response based on intent, entities, sentiment, and context.
 * Returns: { text: string, actions?: Array, card?: object, suggestions?: Array }
 */
export function generateResponse(intent, entities, sentiment, context) {
    const turnCount = context.getTurnCount();
    const isRepeatIssue = context.unresolvedIssues.length > 1;
    const isUpset = sentiment.label === 'negative' || sentiment.urgency;

    // Empathy prefix for upset users
    const empathyPrefix = isUpset
        ? "I completely understand your frustration, and I'm sorry for the inconvenience. "
        : '';

    switch (intent) {
        // ─── ORDER TRACKING ───
        case 'order_tracking': {
            const orderId = entities.orderId || 'ORD-4012';
            const order = DEMO_ORDERS[orderId] || DEMO_ORDERS['ORD-4012'];

            if (order.status === 'en_route') {
                return {
                    text: `${empathyPrefix}I can see your order **${orderId}** from **${order.restaurant}**.\n\n🚗 **Driver:** ${order.driver}\n🔋 **Vehicle:** ${order.vehicle}\n⏱️ **ETA:** ${order.eta}\n📊 **Status:** En route to you\n\nYour driver is on the way right now!`,
                    actions: [
                        { label: '📍 Live Map', type: 'link', href: '/orders/live/ORD-2901' },
                        { label: '📞 Call Driver', type: 'action', action: 'call_driver' },
                        { label: '⏱️ Update ETA', type: 'action', action: 'refresh_eta' },
                    ],
                    card: {
                        type: 'order_tracking',
                        orderId, restaurant: order.restaurant,
                        status: 'En Route', driver: order.driver,
                        vehicle: order.vehicle, eta: order.eta,
                    },
                    suggestions: ['Is there a delay?', 'Change delivery instructions'],
                };
            } else if (order.status === 'preparing') {
                return {
                    text: `Your order **${orderId}** from **${order.restaurant}** is being prepared right now.\n\n👨‍🍳 **Status:** Kitchen is preparing your food\n⏱️ **Estimated delivery:** ${order.eta}\n💰 **Order total:** $${order.total}\n\nI'll notify your driver as soon as it's ready for pickup!`,
                    actions: [
                        { label: '📋 View Order Details', type: 'action', action: 'view_order' },
                        { label: '✏️ Modify Order', type: 'action', action: 'modify_order' },
                    ],
                    suggestions: ['Can I add items?', 'How long will it take?'],
                };
            } else {
                return {
                    text: `Your order **${orderId}** from **${order.restaurant}** was delivered successfully!\n\n✅ **Delivered by:** ${order.driver}\n💰 **Total:** $${order.total}\n\nHow was everything? I'd love to hear your feedback.`,
                    actions: [
                        { label: '⭐ Leave Rating', type: 'action', action: 'rate_order' },
                        { label: '🔄 Reorder', type: 'action', action: 'reorder' },
                        { label: '⚠️ Report Issue', type: 'action', action: 'report_issue' },
                    ],
                    suggestions: ['Something was wrong', 'It was great!', 'Reorder same items'],
                };
            }
        }

        // ─── REFUND REQUEST ───
        case 'refund_request': {
            const amount = entities.amount || null;
            return {
                text: `${empathyPrefix}I understand you'd like a refund${amount ? ` for $${amount.toFixed(2)}` : ''}. Let me help resolve this for you.\n\nI have a few options available:\n\n💚 **Instant Wallet Credit** — Added to your Soobér Wallet immediately\n💳 **Original Payment Refund** — Takes 1-2 business days\n🤝 **Speak with Agent** — For complex cases\n\nWhich option works best for you?`,
                actions: [
                    { label: '💚 Instant Wallet Credit', type: 'action', action: 'refund_wallet' },
                    { label: '💳 Refund to Card', type: 'action', action: 'refund_card' },
                    { label: '🤝 Talk to Agent', type: 'action', action: 'escalate' },
                ],
                suggestions: ['Wallet credit please', 'Refund to my card', 'I want to talk to someone'],
            };
        }

        // ─── ORDER ISSUE ───
        case 'order_issue': {
            return {
                text: `${empathyPrefix}I'm sorry to hear something wasn't right with your order. Let me understand the issue:\n\nCould you tell me which of these applies?\n\n🍽️ **Missing items** from the order\n🥶 **Cold or low quality** food\n❌ **Wrong items** received\n⏰ **Arrived too late**\n📦 **Damaged packaging**\n\nOnce I know the issue, I can resolve it right here — usually within 30 seconds.`,
                actions: [
                    { label: '🍽️ Missing Items', type: 'action', action: 'issue_missing' },
                    { label: '🥶 Cold Food', type: 'action', action: 'issue_cold' },
                    { label: '❌ Wrong Items', type: 'action', action: 'issue_wrong' },
                    { label: '⏰ Late Delivery', type: 'action', action: 'issue_late' },
                ],
                suggestions: ['Items were missing', 'Food was cold', 'Got the wrong order'],
            };
        }

        // ─── RIDE BOOKING ───
        case 'ride_booking': {
            return {
                text: `I'd love to help you get a ride! 🚗⚡\n\nSoobér Rides is the Soo's first all-electric ride service — no surge pricing, ever.\n\nHere's what's available:\n\n🚙 **Economy** — from $8\n🚗 **Comfort** — from $12\n✨ **Premium** — from $20\n🚐 **XL (6+ pax)** — from $25\n👑 **Luxury** — from $40\n\nHead to the Rides page to enter your destination and get an exact fare calculated with real-time routing!`,
                actions: [
                    { label: '🚗 Book a Ride', type: 'link', href: '/rides' },
                    { label: '✈️ Airport Transfer', type: 'link', href: '/rides/airport' },
                    { label: '🎉 Event Fleet', type: 'link', href: '/rides/events' },
                ],
                suggestions: ['I need a ride to the airport', 'How much to Station Mall?', 'Do you have SUVs?'],
            };
        }

        // ─── RIDE TRACKING ───
        case 'ride_tracking': {
            return {
                text: `Your ride is on the way! Here are the details:\n\n🚗 **Driver:** ${DEMO_RIDE.driver}\n🔋 **Vehicle:** ${DEMO_RIDE.vehicle}\n⏱️ **ETA:** ${DEMO_RIDE.eta}\n📍 **Pickup:** ${DEMO_RIDE.pickup}\n🏁 **Dropoff:** ${DEMO_RIDE.dropoff}\n💰 **Fare:** ${DEMO_RIDE.fare}`,
                actions: [
                    { label: '📍 Live Map', type: 'link', href: '/rides' },
                    { label: '📞 Call Driver', type: 'action', action: 'call_driver' },
                    { label: '❌ Cancel Ride', type: 'action', action: 'cancel_ride' },
                ],
                suggestions: ['Is the driver close?', 'Cancel my ride', 'Change pickup location'],
            };
        }

        // ─── AIRPORT ───
        case 'airport_transfer': {
            return {
                text: `Great — Soobér Airport Transfers to/from YAM (Sault Ste. Marie Airport) are fixed-rate with no surprises! ✈️\n\nZone pricing:\n- **Downtown Core:** $25\n- **East/West End:** $35\n- **North End:** $40\n- **Extended Zone:** $50\n\nIncludes meet-and-greet, flight tracking, and 100% electric vehicles. Schedule up to 7 days in advance!`,
                actions: [
                    { label: '✈️ Book Transfer', type: 'link', href: '/rides/airport' },
                    { label: '📅 View Schedule', type: 'action', action: 'airport_schedule' },
                ],
                suggestions: ['Book a transfer for tomorrow', 'What vehicles are available?', 'Do you track flights?'],
            };
        }

        // ─── ACCOUNT ───
        case 'account_help': {
            return {
                text: `I can help with your account! Here are common tasks:\n\n🔐 **Password Reset** — I'll send a reset link to your email\n📧 **Update Email** — Change your login email\n📍 **Update Address** — Manage saved delivery addresses\n📱 **Update Phone** — Change your contact number\n🗑️ **Delete Account** — Permanently remove your data\n\nWhat would you like to do?`,
                actions: [
                    { label: '🔐 Reset Password', type: 'action', action: 'reset_password' },
                    { label: '📍 Manage Addresses', type: 'link', href: '/account' },
                    { label: '👤 View Profile', type: 'link', href: '/account' },
                ],
                suggestions: ['Reset my password', 'Change my address', 'Delete my account'],
            };
        }

        // ─── REWARDS ───
        case 'rewards_loyalty': {
            return {
                text: `Here's your loyalty status! You're doing great 🎉\n\n🏆 **Current Tier:** Silver\n⭐ **Points:** 1,247\n📊 **Next Tier (Gold):** 253 points away\n\n**Silver tier benefits:**\n• 1.5× points on every order\n• Free delivery on orders over $30\n• Priority support\n\n**To reach Gold** (1,500 points):\n• 2× points multiplier\n• Free delivery on ALL orders\n• Birthday bonus (500pt)`,
                actions: [
                    { label: '🏆 View Rewards', type: 'link', href: '/rewards' },
                    { label: '🎁 Redeem Points', type: 'action', action: 'redeem_points' },
                    { label: '👥 Refer a Friend', type: 'link', href: '/refer' },
                ],
                suggestions: ['How do I earn more points?', 'What can I redeem?', 'Refer a friend'],
            };
        }

        // ─── PROMO CODE ───
        case 'promo_code': {
            return {
                text: `Here are the current promotions available! 🎉\n\n🆕 **WELCOME10** — $10 off your first order\n🌿 **ECOFIRST** — Free delivery on your first eco order\n👥 **Referral Program** — Give $10, get $10\n⭐ **Gold/Diamond** — Free delivery on all orders (loyalty perk)\n\nEnter your code at checkout to apply the discount!`,
                actions: [
                    { label: '🛒 Start an Order', type: 'link', href: '/' },
                    { label: '👥 Refer a Friend', type: 'link', href: '/refer' },
                ],
                suggestions: ['How do I enter a code?', 'Any free delivery promos?', 'Can I stack codes?'],
            };
        }

        // ─── DELIVERY ZONES ───
        case 'delivery_zones': {
            const mentionedArea = entities.address || null;
            let areaResponse = '';
            if (mentionedArea) {
                areaResponse = `\n\nBased on **${mentionedArea}**, you're in our delivery coverage area! `;
            }

            return {
                text: `We deliver across all of Sault Ste. Marie and beyond! 📍${areaResponse}\n\n🟢 **Downtown Core** — 0-3 km — Free delivery\n🟡 **East/West End** — 3-6 km — $2.99\n🟠 **North End** — 4-8 km — $3.99\n🔴 **Extended Zone** — 8-12 km — $5.99\n🟣 **Garden River FN** — ~12 km — $7.99\n🔵 **Echo Bay** — ~20 km — $9.99\n💗 **Goulais River** — ~25 km — $11.99\n\nAll delivered by our 100% electric fleet! Gold & Diamond members get free delivery.`,
                actions: [
                    { label: '📍 View Zone Map', type: 'link', href: '/delivery-zone' },
                    { label: '🏆 Upgrade Tier', type: 'link', href: '/rewards' },
                ],
                suggestions: ['Do you deliver to Garden River?', 'How do I get free delivery?', 'What about Goulais?'],
            };
        }

        // ─── DELIVERY FEE ───
        case 'delivery_fee': {
            return {
                text: `Delivery fees depend on your zone:\n\n🟢 **Free** — Downtown Core\n🟡 **$2.99** — East/West End\n🟠 **$3.99** — North End\n🔴 **$5.99** — Extended Zone\n\n💡 **Pro tip:** Gold and Diamond loyalty members enjoy **free delivery on all orders!** You're currently 253 points from Gold tier.`,
                actions: [
                    { label: '🏆 View Rewards', type: 'link', href: '/rewards' },
                    { label: '📍 Check My Zone', type: 'link', href: '/delivery-zone' },
                ],
                suggestions: ['How do I get free delivery?', 'Upgrade my tier'],
            };
        }

        // ─── COMMUNITY ───
        case 'community_marketplace': {
            return {
                text: `Welcome to the Community Marketplace! 🏘️\n\nThis is Soobér's free-forever platform for local sellers:\n\n🧁 **Home bakers** — sell cakes, cookies, and treats\n🎨 **Crafters** — handmade goods and art\n🛋️ **Second-hand** — clothing, furniture, electronics\n🚗 **Vehicles** — buy and sell locally\n\n✅ **$0 fees** — No listing fees, commissions, or monthly charges\n🤖 **AI-moderated** — every listing is checked for safety\n🌍 **Hyperlocal** — built for the Soo community`,
                actions: [
                    { label: '🏘️ Browse Marketplace', type: 'link', href: '/community' },
                    { label: '➕ Start Selling', type: 'action', action: 'create_listing' },
                ],
                suggestions: ['How do I create a listing?', 'Is it really free?', 'How does moderation work?'],
            };
        }

        // ─── RESTAURANT INQUIRY ───
        case 'restaurant_inquiry': {
            return {
                text: `Great to hear you're interested in partnering with Soobér! 🤝\n\nHere's why 90+ restaurants chose us:\n\n📉 **15% commission** — half what national apps charge\n💰 **$63K annual savings** for mid-volume restaurants\n📱 **Free KDS** — Kitchen Display System on any device\n📊 **Full analytics** — real-time order and revenue data\n🚗 **100% electric** delivery fleet\n\nOur local team will get back to you within 48 hours!`,
                actions: [
                    { label: '🤝 Partner Application', type: 'link', href: '/corporate' },
                    { label: '💼 Business Solutions', type: 'link', href: '/business' },
                ],
                suggestions: ['What is the commission rate?', 'How do I get started?', 'Do you provide POS?'],
            };
        }

        // ─── SCOOTER ───
        case 'scooter_rental': {
            return {
                text: `Soobér Boardwalk Electric Scooters! 🛴⚡\n\nExplore the waterfront on our eco-friendly e-scooters:\n\n🔓 **Unlock** via the Soobér app\n🛤️ **Ride** along the boardwalk and waterfront paths\n🅿️ **Return** to any designated dock\n💰 **$2 to unlock** + $0.35/min\n\nPerfect for tourists and locals exploring the beautiful Sault waterfront!`,
                actions: [
                    { label: '🛴 View Scooters', type: 'link', href: '/rides' },
                    { label: '📍 Dock Locations', type: 'action', action: 'scooter_docks' },
                ],
                suggestions: ['Where are the docks?', 'How much does it cost?', 'Are they available now?'],
            };
        }

        // ─── HOURS ───
        case 'hours_info': {
            return {
                text: `Here are our operating hours:\n\n🍽️ **Food Delivery:** 10am – 11pm (daily)\n🚗 **Soobér Rides:** 6am – 2am (daily)\n✈️ **Airport Transfers:** 24/7 (book in advance)\n🛴 **Scooter Rental:** 8am – 10pm (seasonal)\n🏘️ **Community Marketplace:** 24/7 (online)\n💬 **AI Support:** 24/7\n👤 **Live Agents:** 8am – 10pm EST`,
                suggestions: ['Are you open on holidays?', 'Can I order late at night?'],
            };
        }

        // ─── SUSTAINABILITY ───
        case 'sustainability': {
            return {
                text: `Sustainability is core to everything we do at Soobér! 🌿⚡\n\n🔋 **100% Electric Fleet** — Zero tailpipe emissions on every delivery and ride\n📦 **Compostable Packaging** — Switching to fully compostable materials by 2026\n🌱 **Seed Paper Program** — Every delivery includes a plantable seed paper card\n♻️ **Zero Plastic Target** — Eliminating all single-use plastics\n🏔️ **Local-First Model** — All revenue stays in the Algoma District\n\nWe're not just delivering food — we're building a greener community.`,
                actions: [
                    { label: '🌿 Sustainability Hub', type: 'link', href: '/business' },
                    { label: '📊 Our Impact', type: 'link', href: '/investors' },
                ],
                suggestions: ['Tell me more about the seed paper', 'What about packaging?', 'How can I help?'],
            };
        }

        // ─── GREETING ───
        case 'greeting': {
            const greetings = [
                `Hey there! 👋 I'm the Soobér AI Copilot — powered by local compute right here in the Soo.\n\nI can help with:\n• 📍 Order tracking & delivery status\n• 💳 Refunds & order issues\n• 🚗 Ride booking & airport transfers\n• 🏆 Rewards & loyalty program\n• 🏘️ Community marketplace\n• 💼 Business & partner inquiries\n\nWhat can I help you with?`,
                `Welcome back! 😊 I can see you're a Silver tier member with 1,247 points. What can I help you with today?`,
            ];
            return {
                text: greetings[turnCount > 0 ? 1 : 0],
                suggestions: ['Where is my order?', 'I need a refund', 'Book a ride', 'Check my rewards'],
            };
        }

        // ─── FAREWELL ───
        case 'farewell': {
            return {
                text: `You're welcome! If you need anything else, I'm always here — 24/7. Have a great ${getTimeOfDay()}! 💚\n\n⭐ If you have a moment, your feedback helps us improve.\n📱 Remember: AI support is always available through the app.`,
                actions: [
                    { label: '⭐ Rate This Chat', type: 'action', action: 'rate_chat' },
                ],
            };
        }

        // ─── ESCALATE ───
        case 'escalate_agent': {
            return {
                text: `${empathyPrefix}Absolutely — I'm connecting you with a live agent right now.\n\n👤 **Agent Sarah C.** — based in Sault Ste. Marie\n📍 **Status:** Available\n📋 **Context:** I'm sharing our full conversation so she has everything she needs.\n\nYou should be connected in about 10 seconds...`,
                actions: [
                    { label: '📞 Call Instead', type: 'action', action: 'call_support' },
                ],
                meta: { switchToHuman: true, delay: 2500 },
            };
        }

        // ─── UNKNOWN / FALLBACK ───
        default: {
            const fallbacks = [
                `I want to make sure I get this right. Could you give me a bit more detail about what you need?\n\nI'm especially good at:\n• Order tracking & delivery updates\n• Refunds and order issues\n• Ride booking and status\n• Account and rewards help\n\nOr I can connect you with a live agent!`,
                `Hmm, I'm not quite sure about that one. Let me try to help — could you rephrase that, or would you like me to connect you with Agent Sarah C.?`,
            ];
            return {
                text: fallbacks[turnCount > 3 ? 1 : 0],
                actions: [
                    { label: '🤝 Talk to Agent', type: 'action', action: 'escalate' },
                ],
                suggestions: ['Where is my order?', 'I need a refund', 'Book a ride', 'Check rewards'],
            };
        }
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// HELPER
// ══════════════════════════════════════════════════════════════════════════════

function getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PROCESS FUNCTION — Ties everything together
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Process a user message through the full AI pipeline.
 * 
 * @param {string} text - User's message
 * @param {ConversationContext} context - Conversation context
 * @returns {{ response: object, intent: string, confidence: number, sentiment: object, entities: object }}
 */
export function processMessage(text, context) {
    // 1. Extract entities
    const entities = extractEntities(text);

    // 2. Analyze sentiment
    const sentiment = analyzeSentiment(text);

    // 3. Classify intent
    const { intent, confidence, secondaryIntent } = classifyIntent(text, context);

    // 4. Update context
    context.addTurn('user', text, intent, entities);
    context.sentiment = sentiment.label;

    // 5. Generate response
    const response = generateResponse(intent, { ...context.entities, ...entities }, sentiment, context);

    // 6. Update context with AI response
    context.addTurn('ai', response.text, intent);

    return {
        response,
        intent,
        confidence,
        secondaryIntent,
        sentiment,
        entities,
    };
}
