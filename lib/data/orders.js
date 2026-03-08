export const sampleOrders = [
    {
        id: 'ORD-2847',
        restaurantId: 'sakura-ramen',
        restaurantName: 'Sakura Ramen House',
        restaurantLogo: '🍜',
        status: 'delivered',
        items: [
            { name: 'Tonkotsu Classic', quantity: 2, price: 16.99 },
            { name: 'Gyoza (6pc)', quantity: 1, price: 8.99 },
        ],
        subtotal: 42.97,
        deliveryFee: 2.99,
        tax: 5.59,
        total: 51.55,
        orderedAt: '2026-03-07T18:30:00',
        deliveredAt: '2026-03-07T19:05:00',
        driverName: 'Marcus J.',
        driverRating: 4.9,
    },
    {
        id: 'ORD-2901',
        restaurantId: 'el-fuego',
        restaurantName: 'El Fuego Taqueria',
        restaurantLogo: '🌮',
        status: 'preparing',
        items: [
            { name: 'Carne Asada Taco (3)', quantity: 1, price: 12.99, options: ['No Onions', 'Extra Salsa'] },
            { name: 'Mission Burrito', quantity: 1, price: 13.99, options: ['Chicken', 'Black Beans'] },
            { name: 'Chips & Guacamole', quantity: 1, price: 7.99 },
        ],
        subtotal: 34.97,
        deliveryFee: 2.49,
        tax: 4.55,
        total: 42.01,
        orderedAt: '2026-03-08T00:01:00',
        estimatedDelivery: '25 min',
        driverName: 'Sarah K.',
        driverRating: 4.8,
        driverLocation: { lat: 43.6532, lng: -79.3832 },
    },
    {
        id: 'ORD-2856',
        restaurantId: 'bella-napoli',
        restaurantName: 'Bella Napoli',
        restaurantLogo: '🍕',
        status: 'delivered',
        items: [
            { name: 'Margherita DOP', quantity: 1, price: 18.99 },
            { name: 'Pappardelle Bolognese', quantity: 1, price: 19.99 },
            { name: 'Tiramisu', quantity: 1, price: 9.99 },
        ],
        subtotal: 48.97,
        deliveryFee: 3.49,
        tax: 6.37,
        total: 58.83,
        orderedAt: '2026-03-05T19:15:00',
        deliveredAt: '2026-03-05T20:00:00',
        driverName: 'James T.',
        driverRating: 5.0,
    },
    {
        id: 'ORD-2950',
        restaurantId: 'the-burger-lab',
        restaurantName: 'The Burger Lab',
        restaurantLogo: '🍔',
        status: 'delivering',
        items: [
            { name: 'Truffle Mushroom', quantity: 1, price: 16.99, options: ['Medium Rare', 'Gluten Free Bun'] },
            { name: 'Truffle Parmesan Fries', quantity: 1, price: 7.99 },
            { name: 'Oreo Cookie Shake', quantity: 1, price: 7.99 }
        ],
        subtotal: 32.97,
        deliveryFee: 2.99,
        tax: 4.29,
        total: 40.25,
        orderedAt: new Date(Date.now() - 25 * 60000).toISOString(),
        estimatedDelivery: '5-10 min',
        driverName: 'Alex D.',
        driverRating: 4.6,
        driverLocation: { lat: 43.6600, lng: -79.3900 },
        vehicle: 'Acura ILX (Black)'
    }
];

export const orderStatuses = ['confirmed', 'preparing', 'ready', 'picked-up', 'delivering', 'delivered'];

export const getOrdersByStatus = (status) => sampleOrders.filter(o => o.status === status);
export const getActiveOrders = () => sampleOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
export const getPastOrders = () => sampleOrders.filter(o => o.status === 'delivered' || o.status === 'cancelled');

