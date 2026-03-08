export const currentUser = {
    id: 'usr-892',
    name: 'Cody Mount',
    email: 'cody@soober.ca',
    phone: '(555) 123-4567',
    memberSince: '2025-11-20',
    loyaltyPoints: 1240,
    tier: 'Gold',
    savedAddresses: [
        {
            id: 'addr-1',
            label: 'Home',
            street: '123 Fake Street',
            city: 'Toronto',
            postalCode: 'M5V 2N4',
            isDefault: true,
            instructions: 'Please leave at the front door.'
        },
        {
            id: 'addr-2',
            label: 'Work',
            street: '456 Business Blvd, Suite 200',
            city: 'Toronto',
            postalCode: 'M5H 1T1',
            isDefault: false,
            instructions: 'Leave with receptionist before 5 PM.'
        }
    ],
    paymentMethods: [
        {
            id: 'pay-1',
            type: 'Visa',
            last4: '4242',
            expiry: '12/28',
            isDefault: true
        },
        {
            id: 'pay-2',
            type: 'Apple Pay',
            isDefault: false
        }
    ],
    favoriteRestaurantIds: ['sakura-ramen', 'bella-napoli', 'the-burger-lab']
};
