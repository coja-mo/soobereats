// Sault Ste. Marie Restaurant Data — Soobér
// All real local restaurants with researched menu items

export const categories = [
    { id: 'all', name: 'All', emoji: '✨' },
    { id: 'pizza', name: 'Pizza', emoji: '🍕' },
    { id: 'italian', name: 'Italian', emoji: '🇮🇹' },
    { id: 'burgers', name: 'Burgers', emoji: '🍔' },
    { id: 'steakhouse', name: 'Steakhouse', emoji: '🥩' },
    { id: 'breakfast', name: 'Breakfast', emoji: '🥞' },
    { id: 'indian', name: 'Indian', emoji: '🍛' },
    { id: 'pub', name: 'Pub & Grill', emoji: '🍺' },
    { id: 'fine-dining', name: 'Fine Dining', emoji: '🍷' },
    { id: 'canadian', name: 'Canadian', emoji: '🍁' },
    { id: 'nepalese', name: 'Nepalese', emoji: '🏔️' },
    { id: 'bar-lounge', name: 'Bar & Lounge', emoji: '🍸' },
    { id: 'cafe', name: 'Café', emoji: '☕' },
    { id: 'ice-cream', name: 'Ice Cream', emoji: '🍦' },
    { id: 'middle-eastern', name: 'Middle Eastern', emoji: '🧆' },
    { id: 'asian', name: 'Asian', emoji: '🥢' },
    { id: 'thai', name: 'Thai', emoji: '🍜' },
    { id: 'chinese', name: 'Chinese', emoji: '🥡' },
    { id: 'sushi', name: 'Sushi', emoji: '🍣' },
    { id: 'brewery', name: 'Brewery', emoji: '🍻' },
    { id: 'croatian', name: 'Croatian', emoji: '🇭🇷' },
    { id: 'family', name: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { id: 'marketplace', name: 'Marketplace', emoji: '🧺' },
];

export const restaurants = [
    // ─── 1. Aurora's ──────────────────────────────────────
    {
        id: 'auroras',
        name: "Aurora's Restaurant",
        category: 'Italian',
        categoryId: 'italian',
        image: '/restaurants/auroras.png',
        coverColor: '#1a1a2e',
        logo: '🍝',
        rating: 4.6,
        reviewCount: 0,
        deliveryTime: '30-45',
        distance: 3.4,
        promo: null,
        isOpen: true,
        isFeatured: true,
        address: '390 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Italian & American cuisine since 1985. Famous for homemade stone oven pizzas and the best ribs in town.',
        menu: [
            { id: 'a1', name: 'Cajun Chicken Pizza', description: 'Spicy cajun chicken on stone oven crust with mozzarella', price: 18.99, category: 'Pizzas' },
            { id: 'a2', name: 'Homemade Lasagna', description: 'Layered pasta with meat sauce, ricotta, and mozzarella', price: 17.99, category: 'Specialty Pastas' },
            { id: 'a3', name: 'BBQ Baby Back Ribs', description: 'Full rack of slow-cooked BBQ baby back ribs', price: 28.99, category: 'Entrees' },
            { id: 'a4', name: 'Fettuccine Alfredo', description: 'Creamy parmesan alfredo with homemade fettuccine', price: 16.99, category: 'Specialty Pastas' },
            { id: 'a5', name: 'Chicken Parmigiana', description: 'Breaded chicken with marinara and melted mozzarella', price: 19.99, category: 'Entrees' },
            { id: 'a6', name: 'Ricotta Gnocchi', description: 'Pillowy potato gnocchi in your choice of sauce', price: 16.99, category: 'Specialty Pastas' },
            { id: 'a7', name: 'Bruschetta Bread', description: 'Toasted bread with fresh tomato, basil, and garlic', price: 12.99, category: 'Appetizers' },
            { id: 'a8', name: 'NY Strip Steak 10oz', description: 'Premium cut New York strip cooked to perfection', price: 32.99, category: 'Entrees' },
            { id: 'a9', name: 'Caesar Salad', description: 'Crisp romaine, croutons, parmesan, creamy caesar dressing', price: 12.99, category: 'Salads' },
            { id: 'a10', name: 'Italian Wedding Soup', description: 'Traditional Italian wedding soup with meatballs', price: 8.99, category: 'Soups' },
        ],
    },

    // ─── 2. Sandro's ──────────────────────────────────────
    {
        id: 'sandros',
        name: "Sandro's Restaurant",
        category: 'Italian',
        categoryId: 'italian',
        image: '/restaurants/sandros.png',
        coverColor: '#2d1b0e',
        logo: '🍖',
        rating: 4.4,
        reviewCount: 0,
        deliveryTime: '25-40',
        distance: 5.1,
        promo: 'Dinner Buffet $24.99',
        isOpen: true,
        isFeatured: false,
        address: '465 Trunk Rd, Sault Ste. Marie, ON',
        description: 'Family-owned since 1979. Homemade Italian and comfort food with legendary weekend buffets.',
        menu: [
            { id: 's1', name: 'Dinner Buffet', description: 'All-you-can-eat Italian buffet, Tue–Sun from 3PM', price: 24.99, category: 'Buffet' },
            { id: 's2', name: 'Veal Parmigiana', description: 'Breaded veal cutlet topped with marinara and cheese', price: 22.99, category: 'Entrees' },
            { id: 's3', name: 'AAA Rib Eye Steak 8oz', description: 'Premium AAA cut rib eye with sides', price: 40.00, category: 'Entrees' },
            { id: 's4', name: 'Homemade Capelletti Soup', description: 'Traditional Italian capelletti in savory broth', price: 8.00, category: 'Soups' },
            { id: 's5', name: 'Breaded Calamari', description: 'Lightly breaded calamari rings served with marinara', price: 16.00, category: 'Appetizers' },
            { id: 's6', name: 'Stuffed Potato Skins', description: 'Loaded potato skins with cheese and bacon', price: 14.00, category: 'Appetizers' },
            { id: 's7', name: 'Cream of Broccoli & Cheddar', description: 'Rich and creamy broccoli cheddar soup', price: 7.00, category: 'Soups' },
            { id: 's8', name: 'Gnocchi & Meatball', description: 'Homemade gnocchi with savory meatball in red sauce', price: 18.99, category: 'Entrees' },
        ],
    },

    // ─── 3. Uncle Gino's ──────────────────────────────────
    {
        id: 'uncle-ginos',
        name: "Uncle Gino's",
        category: 'Pizza',
        categoryId: 'pizza',
        image: '/restaurants/uncle-ginos.png',
        coverColor: '#1a0f0a',
        logo: '🍕',
        rating: 4.7,
        reviewCount: 0,
        deliveryTime: '25-35',
        distance: 2.9,
        promo: null,
        isOpen: true,
        isFeatured: true,
        address: '56 Second Line W, Sault Ste. Marie, ON',
        description: 'Established in 1985. The original Italian comfort food destination with legendary pizzas and homemade pastas.',
        menu: [
            { id: 'ug1', name: "Uncle Gino's Deluxe Pizza", description: 'Pepperoni, ham, bacon, onion, green pepper, mushroom, mozzarella', price: 22.99, category: 'Pizzas' },
            { id: 'ug2', name: 'Handmade Lasagna', description: 'Layered with house-made pasta, meat sauce, and cheese', price: 18.99, category: 'Pastas' },
            { id: 'ug3', name: 'Chicken Mushroom Gnocchi', description: 'Pillowy gnocchi with sautéed chicken and cremini mushrooms', price: 17.99, category: 'Pastas' },
            { id: 'ug4', name: 'Pazza Pasta', description: 'Fettuccini with sautéed mushrooms, onions, and sausage', price: 18.99, category: 'Pastas' },
            { id: 'ug5', name: 'Slow-Roasted Ribs', description: 'Fall-off-the-bone tender ribs with house BBQ glaze', price: 26.99, category: 'Mains' },
            { id: 'ug6', name: 'Prosciutto Mozzarella Burger', description: '8oz prime chuck patty with prosciutto and fresh mozzarella', price: 18.99, category: 'Burgers' },
            { id: 'ug7', name: 'Arancini', description: 'Golden fried Italian rice balls stuffed with cheese', price: 13.99, category: 'Appetizers' },
            { id: 'ug8', name: 'Cappelletti Soup', description: 'House-made pasta in rich Italian broth', price: 8.99, category: 'Soups' },
        ],
    },

    // ─── 4. Gino's Fired Up ───────────────────────────────
    {
        id: 'ginos-fired-up',
        name: "Gino's Fired Up",
        category: 'Pizza',
        categoryId: 'pizza',
        image: '/restaurants/ginos-fired-up.png',
        coverColor: '#2a1008',
        logo: '🔥',
        rating: 4.8,
        reviewCount: 0,
        deliveryTime: '20-35',
        distance: 2.4,
        promo: null,
        isOpen: true,
        isFeatured: true,
        address: 'Sault Ste. Marie, ON',
        description: 'Wood-fired pizza and Italian kitchen. From classic margheritas to Nashville Hot Honey Chicken pizza.',
        menu: [
            { id: 'gf1', name: 'Classic Meatlover Pizza', description: "Gino's famous sauce, mozzarella, sausage, pepperoni, bacon, ham", price: 24.99, category: 'Pizzas' },
            { id: 'gf2', name: 'Nashville Hot Honey Chicken Pizza', description: 'Spicy Nashville chicken with hot honey drizzle on wood-fired crust', price: 22.99, category: 'Pizzas' },
            { id: 'gf3', name: 'Bomba Bites', description: 'Mini dough bites tossed in garlic butter and parmesan, served with marinara', price: 11.99, category: 'Appetizers' },
            { id: 'gf4', name: 'Tour of Italy', description: 'Chicken parmesan with spaghetti and baked cheese cappelletti', price: 22.99, category: 'Pasta' },
            { id: 'gf5', name: 'Bacon Carbonara', description: 'Spaghetti with crispy bacon and creamy alfredo sauce', price: 18.99, category: 'Pasta' },
            { id: 'gf6', name: 'Wood Fired Beef Dip', description: 'Roast beef, garlic butter & mozzarella on a wood-fired bun with au jus', price: 17.99, category: 'Sandwiches' },
            { id: 'gf7', name: 'Big BBQ Bacon Smash Burger', description: '100% AAA ground chuck with BBQ sauce and crispy bacon', price: 18.99, category: 'Burgers' },
            { id: 'gf8', name: 'Cajun Jambalaya', description: 'Spicy Cajun pasta with sausage, shrimp, and peppers', price: 20.99, category: 'Pasta' },
        ],
    },

    // ─── 5. Mrs. B's Pizza ────────────────────────────────
    {
        id: 'mrs-bs',
        name: "Mrs. B's Pizza",
        category: 'Pizza',
        categoryId: 'pizza',
        image: '/restaurants/mrs-bs.png',
        coverColor: '#1f1a14',
        logo: '🧀',
        rating: 4.5,
        reviewCount: 0,
        deliveryTime: '25-40',
        distance: 3.9,
        promo: 'Family Feast from $39.99',
        isOpen: true,
        isFeatured: false,
        address: 'Sault Ste. Marie, ON',
        description: 'Local favorite for classic pizzas, wings, and comfort food combos. Famous square pizzas.',
        menu: [
            { id: 'mb1', name: 'Large Square Pizza', description: 'Classic square-cut pizza with your choice of toppings', price: 19.99, category: 'Pizzas' },
            { id: 'mb2', name: 'Meat Lovers Pizza', description: 'Pepperoni, sausage, ham, and bacon', price: 22.99, category: 'Pizzas' },
            { id: 'mb3', name: 'Chicken Wings 1lb', description: 'Crispy wings with your choice of sauce', price: 14.99, category: 'Wings' },
            { id: 'mb4', name: 'Family Feast #1', description: 'Large 2-item pizza, 15 wings, 8 mozza sticks, garlic breadstix', price: 42.99, category: 'Combos' },
            { id: 'mb5', name: 'Joel\'s Buffalo Chicken Burger', description: 'Spicy buffalo-style crispy chicken sandwich', price: 13.99, category: 'Burgers' },
            { id: 'mb6', name: 'Deep Fried Pickles', description: 'Crispy battered dill pickle spears', price: 9.99, category: 'Sides' },
            { id: 'mb7', name: 'Garlic Crazy Stix', description: 'Garlic breadsticks with dipping sauce', price: 8.99, category: 'Sides' },
            { id: 'mb8', name: 'Hawaiian Pizza', description: 'Double cheese, pineapple, and ham', price: 18.99, category: 'Pizzas' },
        ],
    },

    // ─── 6. North 82 ──────────────────────────────────────
    {
        id: 'north-82',
        name: 'North 82',
        category: 'Steakhouse',
        categoryId: 'steakhouse',
        image: '/restaurants/north-82.png',
        coverColor: '#0d0d0d',
        logo: '🥩',
        rating: 4.6,
        reviewCount: 0,
        deliveryTime: '35-50',
        distance: 3.1,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: '82 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Steak, seafood, and Greek specialties. Known for prime rib, lobster, and Saganaki.',
        menu: [
            { id: 'n1', name: 'Prime Rib', description: 'Slow-roasted prime rib with au jus and horseradish', price: 38.99, category: 'Steaks' },
            { id: 'n2', name: 'Filet Mignon', description: '8oz center-cut filet cooked to your preference', price: 42.99, category: 'Steaks' },
            { id: 'n3', name: 'Rib-Eye Oscar', description: 'Rib-eye topped with crab, asparagus, and hollandaise', price: 44.99, category: 'Steaks' },
            { id: 'n4', name: 'Saganaki', description: 'Pan-fried cheese flambé — a Greek classic', price: 14.99, category: 'Appetizers' },
            { id: 'n5', name: 'Lobster Tail 6oz', description: 'Broiled Atlantic lobster tail with drawn butter', price: 38.99, category: 'Seafood' },
            { id: 'n6', name: 'Greek-Style Lamb Chops', description: 'Grilled lamb chops with Greek herbs and lemon', price: 36.99, category: 'Greek Specialties' },
            { id: 'n7', name: 'Spanakopita', description: 'Crispy phyllo pastry stuffed with spinach and feta', price: 12.99, category: 'Appetizers' },
            { id: 'n8', name: 'Seafood Pasta', description: 'Linguini with shrimp, scallops in white wine cream sauce', price: 26.99, category: 'Seafood' },
        ],
    },

    // ─── 7. Giovanni's ────────────────────────────────────
    {
        id: 'giovannis',
        name: "Giovanni's Ristorante",
        category: 'Fine Dining',
        categoryId: 'fine-dining',
        image: '/restaurants/giovannis.png',
        coverColor: '#110a06',
        logo: '🍷',
        rating: 4.8,
        reviewCount: 0,
        deliveryTime: '35-50',
        distance: 3.2,
        promo: null,
        isOpen: true,
        isFeatured: true,
        address: '516 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Elegant Italian fine dining with house-made pastas, premium veal, and an exceptional wine list.',
        menu: [
            { id: 'g1', name: 'Veal Piccata', description: 'Veal medallions in lemon butter caper sauce with pasta', price: 32.99, category: 'Mains' },
            { id: 'g2', name: 'Saltimbocca alla Romana', description: 'Veal wrapped with prosciutto and sage in white wine', price: 34.99, category: 'Mains' },
            { id: 'g3', name: 'Baked Lasagna', description: 'Layered with ground meat, mozzarella, and house tomato sauce', price: 19.99, category: 'Pastas' },
            { id: 'g4', name: 'Penne Portobello', description: 'Portobello mushrooms, sun-dried tomatoes, chicken, cream sauce', price: 22.99, category: 'Pastas' },
            { id: 'g5', name: 'Calamari Fritti', description: 'Golden fried calamari with lemon and marinara', price: 16.99, category: 'Antipasti' },
            { id: 'g6', name: 'Escargots', description: 'Escargots baked with melted cheeses and herbs', price: 15.99, category: 'Antipasti' },
            { id: 'g7', name: 'Blackened Atlantic Salmon', description: 'Faroe Island salmon with seasonal vegetables', price: 29.99, category: 'Mains' },
            { id: 'g8', name: 'Angel Hair Tutto Mare', description: 'Angel hair pasta with shrimp, mussels, and clams', price: 28.99, category: 'Pastas' },
        ],
    },

    // ─── 8. Burger Don ────────────────────────────────────
    {
        id: 'burger-don',
        name: 'Burger Don',
        category: 'Burgers',
        categoryId: 'burgers',
        image: '/restaurants/burger-don.png',
        coverColor: '#1a0f07',
        logo: '🍔',
        rating: 4.7,
        reviewCount: 0,
        deliveryTime: '20-30',
        distance: 1.6,
        promo: null,
        isOpen: true,
        isFeatured: true,
        address: '7 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Gourmet burgers, creative tacos, and signature sliders. Try the legendary Pierogi Burger or Doughnut Burger.',
        menu: [
            { id: 'bd1', name: 'Pierogi Burger', description: 'Double patty, cheddar, bacon, sautéed onion, two deep-fried perogies, garlic sour cream', price: 19.99, category: 'Signature Burgers' },
            { id: 'bd2', name: 'Doughnut Burger', description: 'Sweet-savory fusion on a glazed doughnut bun', price: 18.99, category: 'Signature Burgers' },
            { id: 'bd3', name: 'Spicy Chicken Waffle', description: 'Crispy fried spicy chicken on waffle bun with maple-glazed bacon', price: 18.99, category: 'Signature Burgers' },
            { id: 'bd4', name: 'Firecracker Calamari', description: 'Spicy breaded calamari with sriracha and fire dipping sauces', price: 15.99, category: 'Starters' },
            { id: 'bd5', name: 'Fish Tacos', description: 'Beer battered haddock tacos with pico de gallo', price: 16.99, category: 'Tacos' },
            { id: 'bd6', name: 'Chicken Tacos', description: 'Seasoned chicken tacos with fresh toppings', price: 15.99, category: 'Tacos' },
            { id: 'bd7', name: 'Con Queso', description: 'Rich cheese dip served with fresh nacho chips', price: 12.99, category: 'Starters' },
            { id: 'bd8', name: 'Cinnamon Sugar Waffle Bites', description: 'Sweet fried waffle bites dusted in cinnamon sugar', price: 9.99, category: 'Desserts' },
        ],
    },

    // ─── 9. Fratelli's ────────────────────────────────────
    {
        id: 'fratellis',
        name: "Fratelli's",
        category: 'Italian',
        categoryId: 'italian',
        image: '/restaurants/fratellis.png',
        coverColor: '#1a1209',
        logo: '👨‍🍳',
        rating: 4.5,
        reviewCount: 0,
        deliveryTime: '30-45',
        distance: 3.7,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: 'Sault Ste. Marie, ON',
        description: 'Italian and Canadian cuisine with traditional, thin crust, and gluten-friendly pizza options.',
        menu: [
            { id: 'f1', name: 'Penne Alla Calabrese', description: 'Olive oil, garlic, kalamata olives, sundried tomatoes, roasted peppers, chicken, cream, parmesan', price: 19.99, category: 'Pastas' },
            { id: 'f2', name: 'Baked Meat Tortellini', description: 'Rose sauce with five cheeses', price: 18.99, category: 'Pastas' },
            { id: 'f3', name: 'Perogie Pizza', description: 'Mozzarella, cheddar, onions, and bacon', price: 20.99, category: 'Pizzas' },
            { id: 'f4', name: 'Vitello Sandwich', description: 'Breaded veal cutlet on ciabatta with toppings', price: 16.99, category: 'Sandwiches' },
            { id: 'f5', name: 'Mussels Pomodoro', description: 'Fresh mussels in a garlic tomato broth', price: 16.99, category: 'Appetizers' },
            { id: 'f6', name: 'Fish and Chips', description: 'Beer-battered Atlantic cod with fries and tartar', price: 17.99, category: 'Mains' },
            { id: 'f7', name: 'Chicken Parmigiana', description: 'Breaded chicken with marinara and melted cheese, served with pasta', price: 19.99, category: 'Mains' },
            { id: 'f8', name: 'Homemade Gnocchi', description: 'Potato dumplings in your choice of sauce', price: 16.99, category: 'Pastas' },
        ],
    },

    // ─── 10. Stackburger ──────────────────────────────────
    {
        id: 'stackburger',
        name: 'Stackburger',
        category: 'Burgers',
        categoryId: 'burgers',
        image: '/restaurants/stackburger.png',
        coverColor: '#1c1008',
        logo: '🍔',
        rating: 4.6,
        reviewCount: 0,
        deliveryTime: '15-25',
        distance: 2.3,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: '71 Spring St, Sault Ste. Marie, ON',
        description: 'Locally sourced Angus beef, ground fresh daily and smashed on a hot griddle. Vegan-friendly with Beyond Burger options.',
        menu: [
            { id: 'sb1', name: 'Double Stackburger', description: 'Two smashed Angus patties with cheese, stack sauce, pickles, onion', price: 14.99, category: 'Burgers' },
            { id: 'sb2', name: 'Stackburger', description: 'Single smashed Angus patty with cheese and stack sauce', price: 10.99, category: 'Burgers' },
            { id: 'sb3', name: 'Double Cheeseburger', description: 'Two smashed patties with American cheese, lettuce, tomato', price: 13.99, category: 'Burgers' },
            { id: 'sb4', name: 'Beyond Burger', description: 'Plant-based Beyond patty on a brioche bun', price: 14.99, category: 'Burgers' },
            { id: 'sb5', name: 'Poutine', description: 'Fresh-cut fries, cheese curds, vegan & GF gravy', price: 9.99, category: 'Sides' },
            { id: 'sb6', name: 'Fresh-Cut Fries', description: 'Hand-cut daily, fried crispy and golden', price: 5.99, category: 'Sides' },
            { id: 'sb7', name: 'Milkshake', description: 'Thick hand-spun milkshake — classic or specialty', price: 8.99, category: 'Drinks' },
            { id: 'sb8', name: 'Specialty Shake', description: 'Premium loaded milkshake with toppings', price: 10.99, category: 'Drinks' },
        ],
    },

    // ─── 11. Tandoori Gardan ──────────────────────────────
    {
        id: 'tandoori-gardan',
        name: 'Tandoori Gardan',
        category: 'Indian',
        categoryId: 'indian',
        image: '/restaurants/tandoori-gardan.png',
        coverColor: '#1a0d05',
        logo: '🍛',
        rating: 4.6,
        reviewCount: 0,
        deliveryTime: '30-45',
        distance: 4.0,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: '663 Queen St E, Sault Ste. Marie, ON',
        description: 'Authentic Indian cuisine. Famous for Butter Chicken, Tikka Masala, and Sunday buffet.',
        menu: [
            { id: 'tg1', name: 'Butter Chicken', description: 'Tender chicken in rich, creamy tomato butter sauce', price: 21.99, category: 'Mains' },
            { id: 'tg2', name: 'Chicken Tikka Masala', description: 'Tandoori chicken in spiced tomato cream sauce', price: 21.99, category: 'Mains' },
            { id: 'tg3', name: 'Lamb Korma', description: 'Tender lamb in mild, aromatic cashew cream sauce', price: 21.99, category: 'Mains' },
            { id: 'tg4', name: 'Shahi Paneer', description: 'Cottage cheese cubes in a rich, creamy sauce', price: 16.99, category: 'Vegetarian' },
            { id: 'tg5', name: 'Dal Makhani', description: 'Slow-cooked black lentils in a buttery, creamy sauce', price: 15.99, category: 'Vegetarian' },
            { id: 'tg6', name: 'Chicken Biryani', description: 'Fragrant basmati rice with spiced chicken and saffron', price: 21.99, category: 'Biryani' },
            { id: 'tg7', name: 'Garlic Naan', description: 'Fresh-baked naan bread with roasted garlic', price: 2.99, category: 'Breads' },
            { id: 'tg8', name: 'Vegetable Samosa', description: 'Flaky pastry filled with seasoned potatoes and peas', price: 4.99, category: 'Appetizers' },
        ],
    },

    // ─── 12. Arturo's ─────────────────────────────────────
    {
        id: 'arturos',
        name: "Arturo's Ristorante",
        category: 'Fine Dining',
        categoryId: 'fine-dining',
        image: '/restaurants/arturos.png',
        coverColor: '#0f0a06',
        logo: '🍝',
        rating: 4.7,
        reviewCount: 0,
        deliveryTime: '35-50',
        distance: 4.2,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: 'Sault Ste. Marie, ON',
        description: 'Refined Italian cuisine with house-made pasta, premium cuts, and an intimate atmosphere.',
        menu: [
            { id: 'ar1', name: 'Filet Mignon', description: '8oz filet grilled, finished with EVOO and balsamic glaze', price: 44.99, category: 'Secondi' },
            { id: 'ar2', name: 'Grilled Rack of Lamb', description: 'Herb-crusted rack of lamb with seasonal vegetables', price: 42.99, category: 'Secondi' },
            { id: 'ar3', name: 'Gnocchi Gorgonzola', description: 'Potato dumplings in a gorgonzola cream sauce with grilled chicken', price: 22.99, category: 'Pastas' },
            { id: 'ar4', name: 'Pumpkin Ravioli', description: 'Stuffed ravioli in butter sage sauce with pan-fried spinach', price: 22.99, category: 'Pastas' },
            { id: 'ar5', name: 'Fresh Burrata', description: 'With sliced prosciutto, EVOO, and balsamic glaze', price: 18.99, category: 'Antipasti' },
            { id: 'ar6', name: 'Chicken Saltimbocca', description: 'Chicken layered with bocconcini, prosciutto, white wine butter, and pasta', price: 28.99, category: 'Secondi' },
            { id: 'ar7', name: 'Tiramisu', description: 'Espresso-soaked ladyfingers with mascarpone cream', price: 12.99, category: 'Dolci' },
            { id: 'ar8', name: 'Bruschetta Classica', description: 'Toasted bread with fresh tomatoes, basil, garlic, EVOO', price: 13.99, category: 'Antipasti' },
        ],
    },

    // ─── 13. Antico ───────────────────────────────────────
    {
        id: 'antico',
        name: 'Antico Ristorante',
        category: 'Fine Dining',
        categoryId: 'fine-dining',
        image: '/restaurants/antico.png',
        coverColor: '#0e0906',
        logo: '🍷',
        rating: 4.8,
        reviewCount: 0,
        deliveryTime: '40-55',
        distance: 4.8,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: '6 Village Court, Sault Ste. Marie, ON',
        description: "Chef Arturo's refined Italian. Lobster ravioli, blackened sea scallops, and filet mignon in an intimate setting.",
        menu: [
            { id: 'an1', name: 'Lobster Ravioli', description: 'House-made ravioli in a fresh lobster blush sauce', price: 28.99, category: 'Entrees' },
            { id: 'an2', name: 'Blackened Sea Scallops', description: 'Spicy seasoned scallops with homemade apple mango salsa', price: 22.99, category: 'Appetizers' },
            { id: 'an3', name: 'Filet Mignon 8oz', description: 'Center-cut filet with gorgonzola butter and demi-glaze', price: 46.99, category: 'Entrees' },
            { id: 'an4', name: 'Veal Saltimbocca', description: 'Pan-seared veal with sage, prosciutto, and provolone in white wine', price: 32.99, category: 'Entrees' },
            { id: 'an5', name: 'Linguini di Mare', description: 'Linguini with calamari, mussels, and shrimp in tomato sauce', price: 28.99, category: 'Entrees' },
            { id: 'an6', name: 'Chicken Portofino', description: 'Pan-seared chicken with sundried tomatoes, artichoke, provolone, wine sauce', price: 26.99, category: 'Entrees' },
            { id: 'an7', name: 'Shrimp Putanesca', description: 'Sautéed shrimp with capers, olives, tomatoes, and white wine', price: 18.99, category: 'Appetizers' },
            { id: 'an8', name: 'Tiramisu', description: 'Classic Italian tiramisu made in-house', price: 12.99, category: 'Desserts' },
        ],
    },

    // ─── 14. The Breakfast Pig ────────────────────────────
    {
        id: 'breakfast-pig',
        name: 'The Breakfast Pig',
        category: 'Breakfast',
        categoryId: 'breakfast',
        image: '/restaurants/breakfast-pig.png',
        coverColor: '#1c1810',
        logo: '🐷',
        rating: 4.8,
        reviewCount: 0,
        deliveryTime: '20-30',
        distance: 2.6,
        promo: null,
        isOpen: true,
        isFeatured: true,
        address: '265 Bruce St, Sault Ste. Marie, ON',
        description: "The Soo's badass farm-to-table breakfast destination. Locally sourced from Sunnynook Farms.",
        menu: [
            { id: 'bp1', name: 'Badass Chicken Waffles', description: 'Crispy fried chicken on a golden waffle with maple syrup', price: 19.00, category: 'Waffles' },
            { id: 'bp2', name: 'The Hangover', description: 'The ultimate breakfast cure — loaded plate', price: 20.00, category: "Keepin' It Traditional" },
            { id: 'bp3', name: 'Benny Poutine', description: 'Eggs benedict meets loaded poutine', price: 17.00, category: 'Distinctively Piggy' },
            { id: 'bp4', name: 'Jalapeno Popper Benny', description: 'Eggs benny with jalapeño popper-stuffed goodness', price: 20.00, category: 'Benny A La Pig' },
            { id: 'bp5', name: 'Pulled Pork Pancakes', description: 'Fluffy pancakes stacked with slow-pulled pork', price: 18.00, category: 'Pancakes' },
            { id: 'bp6', name: 'Hot Honey Pig Mac Skillet', description: 'Mac and cheese skillet with hot honey drizzle', price: 20.00, category: 'Skillets' },
            { id: 'bp7', name: 'The Angela', description: "Chef's signature creation with a unique twist", price: 18.00, category: 'Distinctively Piggy' },
            { id: 'bp8', name: 'Mimosa', description: 'Classic champagne and orange juice', price: 7.00, category: 'Drinks' },
        ],
    },

    // ─── 15. The Mill Steakhouse ──────────────────────────
    {
        id: 'mill-steakhouse',
        name: 'The Mill Steakhouse',
        category: 'Steakhouse',
        categoryId: 'steakhouse',
        image: '/restaurants/mill-steakhouse.png',
        coverColor: '#0d0907',
        logo: '🔪',
        rating: 4.7,
        reviewCount: 0,
        deliveryTime: '40-55',
        distance: 4.5,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: '83 Huron St, Sault Ste. Marie, ON',
        description: 'Fine dining in a historic paper mill. Wagyu chili, Huntsman Burger, and exceptional steaks with curated wines.',
        menu: [
            { id: 'ms1', name: 'Rib-Eye Steak', description: 'Premium rib-eye cooked to your preference with sides', price: 48.99, category: 'Steaks' },
            { id: 'ms2', name: 'Huntsman Burger', description: 'Wagyu, venison, bison, and wild boar blend on brioche', price: 24.99, category: 'Burgers' },
            { id: 'ms3', name: 'Truffle Fried Brussels Sprouts', description: 'Crispy sprouts with truffle oil and parmesan', price: 16.99, category: 'Starters' },
            { id: 'ms4', name: 'Pistachio Prawns', description: 'Jumbo prawns crusted in pistachio with citrus aioli', price: 19.99, category: 'Starters' },
            { id: 'ms5', name: 'Sea Bass', description: 'Pan-seared Chilean sea bass with seasonal accompaniments', price: 42.99, category: 'Seafood' },
            { id: 'ms6', name: 'Wagyu Chili', description: 'Rich Wagyu beef chili (Fri–Sun only)', price: 14.99, category: 'Soups' },
            { id: 'ms7', name: 'Dirty Pork Fries', description: 'Loaded fries with pulled pork and toppings', price: 17.99, category: 'Starters' },
            { id: 'ms8', name: 'Carrot Cake', description: 'Signature house-made carrot cake with salted caramel and candied walnuts', price: 14.99, category: 'Desserts' },
        ],
    },

    // ─── 16. The Block House ──────────────────────────────
    {
        id: 'block-house',
        name: 'The Block House',
        category: 'Pub & Grill',
        categoryId: 'pub',
        image: '/restaurants/block-house.png',
        coverColor: '#141210',
        logo: '🍺',
        rating: 4.5,
        reviewCount: 0,
        deliveryTime: '25-35',
        distance: 4.5,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: '87 Huron St, Sault Ste. Marie, ON',
        description: 'Craft pub fare with creative twists. Gourmet grilled cheeses, shawarma poutines, and all-day breakfast.',
        menu: [
            { id: 'bh1', name: 'Chicken Shawarma Poutine', description: 'Loaded poutine with seasoned shawarma chicken', price: 18.99, category: 'Poutines' },
            { id: 'bh2', name: 'Mac & Cheese Grilled Cheese', description: 'Stuffed grilled cheese with creamy mac and cheese', price: 16.99, category: 'Grilled Cheese' },
            { id: 'bh3', name: 'Duck Wings', description: 'Crispy duck wings with signature glaze', price: 17.99, category: 'Starters' },
            { id: 'bh4', name: 'Donair Poutine', description: 'Classic poutine topped with donair meat and sweet sauce', price: 18.99, category: 'Poutines' },
            { id: 'bh5', name: 'Smash Burger & Fries', description: 'Double smashed patties with cheese and all the fixings', price: 17.99, category: 'Burgers' },
            { id: 'bh6', name: 'Baked Brie', description: 'Warm baked brie with chutney and crostini', price: 15.99, category: 'Starters' },
            { id: 'bh7', name: 'Chicken Shawarma Platter', description: 'Seasoned chicken with rice, salad, and garlic sauce', price: 19.99, category: 'Platters' },
            { id: 'bh8', name: 'Cinnamon Roll Cheesecake', description: 'House-made cinnamon roll cheesecake', price: 11.99, category: 'Desserts' },
        ],
    },

    // ─── 17. Mulligan's ───────────────────────────────────
    {
        id: 'mulligans',
        name: "Mulligan's Irish Pub",
        category: 'Pub & Grill',
        categoryId: 'pub',
        image: '/restaurants/mulligans.png',
        coverColor: '#0e1209',
        logo: '☘️',
        rating: 4.4,
        reviewCount: 0,
        deliveryTime: '25-40',
        distance: 6.6,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: 'Sault Golf Club, Sault Ste. Marie, ON',
        description: "Irish pub at the Sault Golf Club. Bangers & Mash, Cottage Pie, and the legendary Corned Beef Reuben.",
        menu: [
            { id: 'mu1', name: 'Bangers & Mash', description: 'Irish pork sausages with mashed potatoes and red wine gravy', price: 18.99, category: 'Entrees' },
            { id: 'mu2', name: "Mulligan's Cottage Pie", description: 'Seasoned ground beef, carrots, peas, mashed potatoes, red wine gravy, cheddar jack', price: 19.99, category: 'Entrees' },
            { id: 'mu3', name: 'Corned Beef Reuben', description: 'Classic reuben with sauerkraut, Swiss, and 1000 island on rye', price: 17.99, category: 'Sandwiches' },
            { id: 'mu4', name: 'Fish N Chips', description: 'Beer battered Atlantic cod with fries, coleslaw, and tartar', price: 18.99, category: 'Entrees' },
            { id: 'mu5', name: "Mulligan's Burger", description: 'Brisket shortrib patty, Guinness onions, cheddar, 1000 island', price: 18.99, category: 'Burgers' },
            { id: 'mu6', name: 'Irish Nachos', description: 'Potato rounds with melted cheese, bacon, and sour cream', price: 15.99, category: 'Starters' },
            { id: 'mu7', name: 'English Sausage Rolls', description: 'Flaky pastry wrapped around seasoned pork sausage', price: 12.99, category: 'Starters' },
            { id: 'mu8', name: 'Coconut Shrimp', description: 'Crispy coconut-crusted shrimp with hush puppies', price: 17.99, category: 'Entrees' },
        ],
    },

    // ─── 18. The Root ─────────────────────────────────────
    {
        id: 'the-root',
        name: 'The Root',
        category: 'Fine Dining',
        categoryId: 'fine-dining',
        image: '/restaurants/the-root.png',
        coverColor: '#100e0a',
        logo: '🌿',
        rating: 4.9,
        reviewCount: 0,
        deliveryTime: '40-55',
        distance: 8.4,
        promo: null,
        isOpen: true,
        isFeatured: false,
        address: '85 Old Highway 17 N, Sault Ste. Marie, ON',
        description: 'Seasonal fine dining with French-Italian influences. Locally sourced from Penokean Hills Farms and Agawa Fishery.',
        menu: [
            { id: 'tr1', name: 'Beef Wellington', description: 'Premium beef tenderloin wrapped in puff pastry with duxelles', price: 52.99, category: 'Mains' },
            { id: 'tr2', name: 'Lobster', description: 'Whole Atlantic lobster with drawn butter', price: 54.99, category: 'Mains' },
            { id: 'tr3', name: 'Prime Rib Dinner', description: 'Slow-roasted prime rib with Yorkshire pudding and sides', price: 44.99, category: 'Mains' },
            { id: 'tr4', name: 'Shrimp Scampi', description: 'Jumbo shrimp in garlic butter white wine sauce', price: 28.99, category: 'Mains' },
            { id: 'tr5', name: 'Rigatoni A La Vodka', description: 'Rigatoni in a creamy vodka tomato sauce', price: 22.99, category: 'Pastas' },
            { id: 'tr6', name: 'Chicken Cordon Bleu', description: 'Stuffed chicken breast with ham and Swiss, pan-fried golden', price: 28.99, category: 'Mains' },
            { id: 'tr7', name: 'Phyllo Cheesecake', description: 'Signature phyllo-wrapped cheesecake — a house favorite', price: 14.99, category: 'Desserts' },
            { id: 'tr8', name: 'Chocolate Lava Cake', description: 'Warm molten chocolate cake with vanilla ice cream', price: 14.99, category: 'Desserts' },
        ],
    },

    // ─── The Mystery Restaurant ──────────────────────────────────────
    {
        id: 'the-mystery', name: 'The Mystery Restaurant', category: 'Canadian', categoryId: 'canadian',
        image: '/restaurants/mystery.png', coverColor: '#1a1510', logo: '🍁',
        rating: 4.6, reviewCount: 59, deliveryTime: '25-40', distance: 4.2, promo: null, isOpen: true, isFeatured: false,
        address: '685 Queen St E, Sault Ste. Marie, ON',
        description: 'Cozy Canadian comfort food with a friendly atmosphere. Great menu, delicious meals.',
        menu: [
            { id: 'mys1', name: 'Mystery Burger', description: 'House-ground beef patty with secret sauce', price: 16.99, category: 'Burgers' },
            { id: 'mys2', name: 'Poutine', description: 'Hand-cut fries, cheese curds, house gravy', price: 12.99, category: 'Comfort' },
            { id: 'mys3', name: 'Peameal Bacon Sandwich', description: 'Classic Canadian peameal on toasted bun', price: 14.99, category: 'Sandwiches' },
            { id: 'mys4', name: 'Shepherd\'s Pie', description: 'Hearty beef and vegetable pie with mashed potato crust', price: 15.99, category: 'Comfort' },
            { id: 'mys5', name: 'Fish & Chips', description: 'Beer-battered cod with fries and coleslaw', price: 17.99, category: 'Mains' },
        ],
    },

    // ─── Peace Restaurant ──────────────────────────────────────
    {
        id: 'peace-restaurant', name: 'Peace Restaurant', category: 'Canadian', categoryId: 'canadian',
        image: '/restaurants/peace.png', coverColor: '#1a0f14', logo: '☮️',
        rating: 4.5, reviewCount: 298, deliveryTime: '25-40', distance: 2.8, promo: null, isOpen: true, isFeatured: false,
        address: '250 Queen St E, Sault Ste. Marie, ON',
        description: 'Beloved local spot with a warm ambiance and delicious food. Great servers and welcoming atmosphere.',
        menu: [
            { id: 'pea1', name: 'Peace Breakfast', description: 'Two eggs, bacon, toast, and home fries', price: 12.99, category: 'Breakfast' },
            { id: 'pea2', name: 'Club Sandwich', description: 'Triple-decker with turkey, bacon, lettuce, tomato', price: 14.99, category: 'Sandwiches' },
            { id: 'pea3', name: 'Chicken Souvlaki', description: 'Grilled chicken skewers with rice and tzatziki', price: 16.99, category: 'Mains' },
            { id: 'pea4', name: 'Liver & Onions', description: 'Pan-fried calf liver with caramelized onions', price: 15.99, category: 'Mains' },
            { id: 'pea5', name: 'Homemade Soup of the Day', description: 'Made fresh daily with local ingredients', price: 6.99, category: 'Soups' },
        ],
    },

    // ─── Ignition Eatery ──────────────────────────────────────
    {
        id: 'ignition-eatery', name: 'Ignition Eatery', category: 'Canadian', categoryId: 'canadian',
        image: '/restaurants/ignition.png', coverColor: '#14100a', logo: '🔥',
        rating: 4.5, reviewCount: 83, deliveryTime: '25-40', distance: 3.5, promo: null, isOpen: true, isFeatured: false,
        address: '478 Queen St E, Sault Ste. Marie, ON',
        description: 'Great service, awesome food, and a wonderful crew. Modern Canadian comfort food done right.',
        menu: [
            { id: 'ign1', name: 'Smash Burger', description: 'Double smashed patties with American cheese', price: 16.99, category: 'Burgers' },
            { id: 'ign2', name: 'Nashville Hot Chicken', description: 'Cayenne-brined chicken with pickles and slaw', price: 17.99, category: 'Mains' },
            { id: 'ign3', name: 'Mac & Cheese', description: 'Creamy three-cheese mac with breadcrumb topping', price: 13.99, category: 'Comfort' },
            { id: 'ign4', name: 'Loaded Fries', description: 'Fries topped with pulled pork, cheese sauce, jalapeños', price: 14.99, category: 'Sides' },
            { id: 'ign5', name: 'Milkshake', description: 'Thick hand-spun milkshake, choice of flavour', price: 7.99, category: 'Drinks' },
        ],
    },

    // ─── Holy Shakes ──────────────────────────────────────
    {
        id: 'holy-shakes', name: 'Holy Shakes Sault Ste. Marie', category: 'Ice Cream', categoryId: 'ice-cream',
        image: '/restaurants/holyshakes.png', coverColor: '#1a0a18', logo: '🍦',
        rating: 4.9, reviewCount: 333, deliveryTime: '20-30', distance: 3.0, promo: null, isOpen: true, isFeatured: true,
        address: '701 Pine St Unit 2, Sault Ste. Marie, ON',
        description: 'Everything fresh, flavorful, and served with a smile. The best shakes and ice cream in the Soo.',
        menu: [
            { id: 'hs1', name: 'Cookie Monster Shake', description: 'Blue vanilla with cookie crumbles and whipped cream', price: 9.99, category: 'Shakes' },
            { id: 'hs2', name: 'Strawberry Cheesecake Shake', description: 'Real cheesecake blended with fresh strawberries', price: 10.99, category: 'Shakes' },
            { id: 'hs3', name: 'Nutella Banana Shake', description: 'Rich Nutella with fresh banana and cream', price: 10.99, category: 'Shakes' },
            { id: 'hs4', name: 'Waffle Cone Sundae', description: 'Two scoops in a waffle cone bowl with toppings', price: 8.99, category: 'Sundaes' },
            { id: 'hs5', name: 'Acai Bowl', description: 'Blended acai with granola, fruit, and honey', price: 12.99, category: 'Bowls' },
        ],
    },

    // ─── Alina's Kitchen ──────────────────────────────────────
    {
        id: 'alinas-kitchen', name: "Alina's Kitchen", category: 'Italian', categoryId: 'italian',
        image: '/restaurants/alinas.png', coverColor: '#1a0e0a', logo: '👩‍🍳',
        rating: 4.7, reviewCount: 90, deliveryTime: '25-40', distance: 3.0, promo: null, isOpen: true, isFeatured: false,
        address: '701 Pine St #1, Sault Ste. Marie, ON',
        description: 'Fresh Italian cuisine with generous portions at a great price. Takeout favourite.',
        menu: [
            { id: 'ak1', name: 'Chicken Parmigiana', description: 'Breaded chicken with marinara and mozzarella', price: 17.99, category: 'Mains' },
            { id: 'ak2', name: 'Spaghetti Bolognese', description: 'Classic meat sauce over fresh spaghetti', price: 14.99, category: 'Pastas' },
            { id: 'ak3', name: 'Veal Cutlet', description: 'Breaded veal with lemon and capers', price: 19.99, category: 'Mains' },
            { id: 'ak4', name: 'Panzerotti', description: 'Deep-fried calzone with cheese and pepperoni', price: 10.99, category: 'Pizza' },
            { id: 'ak5', name: 'Tiramisu', description: 'Classic layered Italian dessert', price: 8.99, category: 'Desserts' },
        ],
    },

    // ─── The Boiler Room ──────────────────────────────────────
    {
        id: 'boiler-room', name: 'The Boiler Room', category: 'Pub & Grill', categoryId: 'pub',
        image: '/restaurants/boilerroom.png', coverColor: '#0e0e14', logo: '🏭',
        rating: 4.2, reviewCount: 490, deliveryTime: '30-45', distance: 1.8, promo: null, isOpen: true, isFeatured: false,
        address: '83 Huron St, Sault Ste. Marie, ON',
        description: 'Excellent food and phenomenal service in a unique industrial setting. A Soo staple.',
        menu: [
            { id: 'br1', name: 'Boiler Burger', description: 'AAA beef patty with aged cheddar and bourbon BBQ', price: 18.99, category: 'Burgers' },
            { id: 'br2', name: 'Fish Tacos', description: 'Beer-battered cod in flour tortillas with mango salsa', price: 16.99, category: 'Mains' },
            { id: 'br3', name: 'Pulled Pork Sandwich', description: 'Slow-smoked pulled pork with coleslaw', price: 17.99, category: 'Sandwiches' },
            { id: 'br4', name: 'Wings (1 lb)', description: 'Jumbo wings, choice of 8 sauces', price: 15.99, category: 'Appetizers' },
            { id: 'br5', name: 'Nachos Grande', description: 'Loaded nachos with beef, cheese, salsa, sour cream', price: 16.99, category: 'Appetizers' },
        ],
    },

    // ─── Irene's ──────────────────────────────────────
    {
        id: 'irenes', name: "Irene's", category: 'Café', categoryId: 'cafe',
        image: '/restaurants/irenes.png', coverColor: '#1a0a0a', logo: '☕',
        rating: 4.6, reviewCount: 10, deliveryTime: '20-30', distance: 3.5, promo: null, isOpen: true, isFeatured: false,
        address: '508 Queen St E, Sault Ste. Marie, ON',
        description: 'Fresh, impressive food every time. A hidden gem on Queen Street.',
        menu: [
            { id: 'ir1', name: 'Eggs Benedict', description: 'Poached eggs with hollandaise on English muffin', price: 14.99, category: 'Breakfast' },
            { id: 'ir2', name: 'Avocado Toast', description: 'Sourdough with smashed avocado, poached egg, chili flakes', price: 13.99, category: 'Breakfast' },
            { id: 'ir3', name: 'BLT Panini', description: 'Bacon, lettuce, tomato on pressed ciabatta', price: 13.99, category: 'Sandwiches' },
            { id: 'ir4', name: 'French Onion Soup', description: 'Rich broth with melted gruyère crouton', price: 9.99, category: 'Soups' },
            { id: 'ir5', name: 'Berry Smoothie Bowl', description: 'Blended berries with granola and coconut', price: 11.99, category: 'Bowls' },
        ],
    },

    // ─── View ──────────────────────────────────────
    {
        id: 'view-restaurant', name: 'View', category: 'Fine Dining', categoryId: 'fine-dining',
        image: '/restaurants/view.png', coverColor: '#0a0e1a', logo: '🌊',
        rating: 4.2, reviewCount: 291, deliveryTime: '35-50', distance: 2.2, promo: null, isOpen: true, isFeatured: false,
        address: '208 St Mary\'s River Dr, Sault Ste. Marie, ON',
        description: 'Eye-catching presentation and delicious food with gorgeous river views.',
        menu: [
            { id: 'vw1', name: 'Lake Superior Walleye', description: 'Pan-seared walleye with seasonal vegetables', price: 28.99, category: 'Mains' },
            { id: 'vw2', name: 'Prime Rib (12oz)', description: 'Slow-roasted prime rib with au jus', price: 38.99, category: 'Mains' },
            { id: 'vw3', name: 'Seafood Linguine', description: 'Shrimp, scallops, mussels in white wine sauce', price: 26.99, category: 'Pastas' },
            { id: 'vw4', name: 'Caesar Salad', description: 'Crisp romaine with house-made dressing', price: 12.99, category: 'Salads' },
            { id: 'vw5', name: 'Crème Brûlée', description: 'Classic vanilla bean custard with torched sugar', price: 10.99, category: 'Desserts' },
        ],
    },

    // ─── The Stockhouse Grill ──────────────────────────────────────
    {
        id: 'stockhouse-grill', name: 'The Stockhouse Grill', category: 'Steakhouse', categoryId: 'steakhouse',
        image: '/restaurants/stockhouse.png', coverColor: '#1a0e08', logo: '🥩',
        rating: 4.6, reviewCount: 379, deliveryTime: '30-45', distance: 1.5, promo: null, isOpen: true, isFeatured: false,
        address: '192 Wellington St W, Sault Ste. Marie, ON',
        description: 'Amazing atmosphere, great staff, and phenomenal food. A Wellington Street gem.',
        menu: [
            { id: 'sg1', name: 'Stockhouse Steak (12oz)', description: 'AAA striploin with garlic butter', price: 34.99, category: 'Steaks' },
            { id: 'sg2', name: 'Grilled Salmon', description: 'Atlantic salmon with lemon dill sauce', price: 24.99, category: 'Mains' },
            { id: 'sg3', name: 'BBQ Ribs', description: 'Full rack with house BBQ glaze and fries', price: 28.99, category: 'Mains' },
            { id: 'sg4', name: 'Stockhouse Burger', description: 'Half-pound patty with all the fixings', price: 17.99, category: 'Burgers' },
            { id: 'sg5', name: 'Onion Rings', description: 'Beer-battered and golden fried', price: 9.99, category: 'Appetizers' },
        ],
    },

    // ─── The Mill Steakhouse ──────────────────────────────────────
    {
        id: 'the-mill', name: 'The Mill Steakhouse and Wine Bar', category: 'Steakhouse', categoryId: 'steakhouse',
        image: '/restaurants/themill.png', coverColor: '#1a0a0a', logo: '🍷',
        rating: 4.1, reviewCount: 685, deliveryTime: '35-50', distance: 1.8, promo: null, isOpen: true, isFeatured: false,
        address: '83 Huron St, Sault Ste. Marie, ON',
        description: 'Premium steak aged perfectly and melting in your mouth. Upscale dining experience.',
        menu: [
            { id: 'ml1', name: 'Filet Mignon (8oz)', description: 'Centre-cut tenderloin, cooked to perfection', price: 48.99, category: 'Steaks' },
            { id: 'ml2', name: 'Bone-In Ribeye (16oz)', description: 'Dry-aged 28 days, flame-grilled', price: 54.99, category: 'Steaks' },
            { id: 'ml3', name: 'Lobster Tail', description: 'Butter-poached cold water lobster', price: 44.99, category: 'Seafood' },
            { id: 'ml4', name: 'Charcuterie Board', description: 'Cured meats, artisan cheeses, accompaniments', price: 22.99, category: 'Appetizers' },
            { id: 'ml5', name: 'New York Cheesecake', description: 'House-made with berry compote', price: 12.99, category: 'Desserts' },
        ],
    },

    // ─── The Whisky Barrel ──────────────────────────────────────
    {
        id: 'whisky-barrel', name: 'The Whisky Barrel', category: 'Pub & Grill', categoryId: 'pub',
        image: '/restaurants/whiskybarrel.png', coverColor: '#1a1208', logo: '🥃',
        rating: 4.7, reviewCount: 634, deliveryTime: '25-40', distance: 1.2, promo: null, isOpen: true, isFeatured: true,
        address: '113 Gore St, Sault Ste. Marie, ON',
        description: 'Excellent atmosphere, fabulous staff, terrific food, and great drinks. Downtown favourite.',
        menu: [
            { id: 'wb1', name: 'Whisky Burger', description: 'Bourbon-glazed patty with smoked gouda', price: 18.99, category: 'Burgers' },
            { id: 'wb2', name: 'Fish & Chips', description: 'Fresh haddock in crispy batter', price: 17.99, category: 'Mains' },
            { id: 'wb3', name: 'Steak & Mushroom Pie', description: 'Braised beef in flaky pastry', price: 19.99, category: 'Mains' },
            { id: 'wb4', name: 'Scotch Egg', description: 'Soft-boiled egg wrapped in sausage, breadcrumbed', price: 10.99, category: 'Appetizers' },
            { id: 'wb5', name: 'Sticky Toffee Pudding', description: 'Classic British dessert with toffee sauce', price: 9.99, category: 'Desserts' },
        ],
    },

    // ─── Soo Spice Yeti ──────────────────────────────────────
    {
        id: 'soo-spice-yeti', name: 'Soo Spice Yeti', category: 'Nepalese', categoryId: 'nepalese',
        image: '/restaurants/soospiceyeti.png', coverColor: '#1a0814', logo: '🏔️',
        rating: 4.8, reviewCount: 330, deliveryTime: '30-45', distance: 4.8, promo: null, isOpen: true, isFeatured: true,
        address: '241 Trunk Rd, Sault Ste. Marie, ON',
        description: 'Authentic Nepalese cuisine that makes every occasion feel special. Best South Asian food in the Soo.',
        menu: [
            { id: 'sy1', name: 'Momo (Dumplings)', description: 'Nepalese steamed dumplings with chutney, choice of filling', price: 14.99, category: 'Appetizers' },
            { id: 'sy2', name: 'Butter Chicken', description: 'Creamy tomato-based curry with tender chicken', price: 18.99, category: 'Curries' },
            { id: 'sy3', name: 'Lamb Biryani', description: 'Fragrant basmati rice with slow-cooked lamb', price: 20.99, category: 'Rice' },
            { id: 'sy4', name: 'Thali Set', description: 'Traditional Nepalese platter with dal, rice, curry, and sides', price: 22.99, category: 'Platters' },
            { id: 'sy5', name: 'Garlic Naan', description: 'Fresh tandoor-baked bread with garlic butter', price: 4.99, category: 'Breads' },
            { id: 'sy6', name: 'Mango Lassi', description: 'Creamy yogurt drink with fresh mango', price: 5.99, category: 'Drinks' },
        ],
    },

    // ─── Embers On The Ridge ──────────────────────────────────────
    {
        id: 'embers-ridge', name: 'Embers On The Ridge', category: 'Fine Dining', categoryId: 'fine-dining',
        image: '/restaurants/embers.png', coverColor: '#1a0a08', logo: '🔥',
        rating: 4.6, reviewCount: 363, deliveryTime: '35-50', distance: 7.2, promo: null, isOpen: true, isFeatured: false,
        address: '418 Fourth Line W, Sault Ste. Marie, ON',
        description: 'Consistently delicious meals with beautiful presentation. Always a great dining experience.',
        menu: [
            { id: 'er1', name: 'Rack of Lamb', description: 'New Zealand rack with rosemary jus', price: 42.99, category: 'Mains' },
            { id: 'er2', name: 'Duck Breast', description: 'Pan-seared with cherry reduction', price: 36.99, category: 'Mains' },
            { id: 'er3', name: 'Mushroom Risotto', description: 'Arborio rice with wild mushrooms and truffle oil', price: 22.99, category: 'Mains' },
            { id: 'er4', name: 'Bacon-Wrapped Scallops', description: 'Seared sea scallops with applewood bacon', price: 18.99, category: 'Appetizers' },
            { id: 'er5', name: 'Panna Cotta', description: 'Vanilla bean panna cotta with seasonal fruit', price: 11.99, category: 'Desserts' },
        ],
    },

    // ─── Forty Five Social ──────────────────────────────────────
    {
        id: 'forty-five-social', name: 'Forty Five Social', category: 'Bar & Lounge', categoryId: 'bar-lounge',
        image: '/restaurants/fortyfive.png', coverColor: '#0e0a1a', logo: '🍸',
        rating: 4.4, reviewCount: 120, deliveryTime: '25-40', distance: 1.5, promo: null, isOpen: true, isFeatured: false,
        address: 'Downtown, Sault Ste. Marie, ON',
        description: 'Trendy social lounge with craft cocktails and elevated bar food in the heart of downtown.',
        menu: [
            { id: 'fs1', name: 'Truffle Fries', description: 'Hand-cut fries with truffle oil and parmesan', price: 13.99, category: 'Shareables' },
            { id: 'fs2', name: 'Smoked Brisket Sliders', description: 'Three mini sliders with pickled onion', price: 16.99, category: 'Shareables' },
            { id: 'fs3', name: 'Flatbread Pizza', description: 'Prosciutto, arugula, fig jam, goat cheese', price: 17.99, category: 'Mains' },
            { id: 'fs4', name: 'Charcuterie Board', description: 'Curated meats, cheeses, olives, and crostini', price: 22.99, category: 'Shareables' },
            { id: 'fs5', name: 'Espresso Martini', description: 'Vodka, espresso, coffee liqueur, vanilla', price: 14.99, category: 'Cocktails' },
        ],
    },

    // ─── The Road House ──────────────────────────────────────
    {
        id: 'the-road-house', name: 'The Road House', category: 'Pub & Grill', categoryId: 'pub',
        image: '/restaurants/roadhouse.png', coverColor: '#1a1008', logo: '🛣️',
        rating: 4.3, reviewCount: 210, deliveryTime: '25-40', distance: 3.8, promo: null, isOpen: true, isFeatured: false,
        address: 'Sault Ste. Marie, ON',
        description: 'Casual roadhouse vibes with big portions and cold beer. A neighbourhood gathering spot.',
        menu: [
            { id: 'rh1', name: 'Road House Burger', description: 'Half-pound patty with jalapeño bacon and cheddar', price: 17.99, category: 'Burgers' },
            { id: 'rh2', name: 'BBQ Chicken Wings (2 lb)', description: 'Smoked wings with house BBQ sauce', price: 19.99, category: 'Wings' },
            { id: 'rh3', name: 'Philly Cheesesteak', description: 'Shaved steak with peppers, onions, and provolone', price: 16.99, category: 'Sandwiches' },
            { id: 'rh4', name: 'Loaded Potato Skins', description: 'Stuffed with bacon, cheddar, and sour cream', price: 12.99, category: 'Appetizers' },
            { id: 'rh5', name: 'Deep-Fried Pickles', description: 'Dill pickle spears with ranch dipping sauce', price: 9.99, category: 'Appetizers' },
        ],
    },

    // ─── Blockhouse Pub ──────────────────────────────────────
    {
        id: 'blockhouse-pub', name: 'Blockhouse Pub', category: 'Pub & Grill', categoryId: 'pub',
        image: '/restaurants/blockhouse.png', coverColor: '#14120a', logo: '🏰',
        rating: 4.0, reviewCount: 166, deliveryTime: '25-40', distance: 1.8, promo: null, isOpen: true, isFeatured: false,
        address: '87 Huron St, Sault Ste. Marie, ON',
        description: 'Great food, great service, great drinks, super cute and a great place!',
        menu: [
            { id: 'bp1', name: 'Blockhouse Burger', description: 'House burger with caramelized onions and cheddar', price: 17.99, category: 'Burgers' },
            { id: 'bp2', name: 'Beer-Battered Fish & Chips', description: 'Fresh catch with fries and tartar', price: 18.99, category: 'Mains' },
            { id: 'bp3', name: 'Chicken Caesar Wrap', description: 'Grilled chicken, romaine, parmesan in a flour tortilla', price: 14.99, category: 'Wraps' },
            { id: 'bp4', name: 'Nachos', description: 'Loaded nachos with all the fixings', price: 15.99, category: 'Appetizers' },
            { id: 'bp5', name: 'Bangers & Mash', description: 'Sausages with mashed potatoes and gravy', price: 16.99, category: 'Mains' },
        ],
    },

    // ─── Quattro Vinotecca ──────────────────────────────────────
    {
        id: 'quattro-vinotecca', name: 'Quattro Vinotecca', category: 'Italian', categoryId: 'italian',
        image: '/restaurants/quattro.png', coverColor: '#1a0a10', logo: '🍇',
        rating: 4.2, reviewCount: 301, deliveryTime: '30-45', distance: 3.4, promo: null, isOpen: true, isFeatured: false,
        address: '229 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Amazing service, incredible food, spectacular. Italian wine bar and kitchen.',
        menu: [
            { id: 'qv1', name: 'Margherita Pizza', description: 'San Marzano tomato, fresh mozzarella, basil', price: 16.99, category: 'Pizza' },
            { id: 'qv2', name: 'Penne Arrabbiata', description: 'Spicy tomato sauce with chili flakes', price: 17.99, category: 'Pastas' },
            { id: 'qv3', name: 'Bruschetta Board', description: 'Three varieties of bruschetta with crostini', price: 14.99, category: 'Appetizers' },
            { id: 'qv4', name: 'Osso Buco', description: 'Braised veal shank with gremolata', price: 32.99, category: 'Mains' },
            { id: 'qv5', name: 'Cannoli', description: 'Crispy shell with sweet ricotta filling', price: 8.99, category: 'Desserts' },
        ],
    },

    // ─── Ernie's Coffee Shop ──────────────────────────────────────
    {
        id: 'ernies-coffee', name: "Ernie's Coffee Shop", category: 'Breakfast', categoryId: 'breakfast',
        image: '/restaurants/ernies.png', coverColor: '#1a1008', logo: '☕',
        rating: 4.6, reviewCount: 492, deliveryTime: '20-35', distance: 1.0, promo: null, isOpen: true, isFeatured: true,
        address: '13 Queen St E, Sault Ste. Marie, ON',
        description: 'Outstanding seasonal menu with original ideas and inspiring ingredients.',
        menu: [
            { id: 'ec1', name: 'Eggs Benny', description: 'Two poached eggs with hollandaise, choice of meat', price: 14.99, category: 'Breakfast' },
            { id: 'ec2', name: 'Seasonal Omelette', description: 'Three-egg omelette with rotating seasonal fillings', price: 13.99, category: 'Breakfast' },
            { id: 'ec3', name: 'French Toast', description: 'Thick-cut brioche with maple syrup and berries', price: 12.99, category: 'Breakfast' },
            { id: 'ec4', name: 'Club Sandwich', description: 'Triple-decker with turkey, bacon, and avocado', price: 15.99, category: 'Lunch' },
            { id: 'ec5', name: 'Soup & Sandwich Combo', description: 'Daily soup with half sandwich', price: 13.99, category: 'Lunch' },
        ],
    },

    // ─── Sukhdev Restaurant ──────────────────────────────────────
    {
        id: 'sukhdev', name: 'Sukhdev Restaurant Sault Ste. Marie', category: 'Indian', categoryId: 'indian',
        image: '/restaurants/sukhdev.png', coverColor: '#1a0a08', logo: '🍛',
        rating: 4.0, reviewCount: 312, deliveryTime: '30-45', distance: 3.5, promo: null, isOpen: true, isFeatured: false,
        address: '476 Queen St E, Sault Ste. Marie, ON',
        description: 'Warm friendly service, great food, fast service. Authentic Indian cuisine.',
        menu: [
            { id: 'sk1', name: 'Butter Chicken', description: 'Creamy tomato-based curry with tender chicken', price: 16.99, category: 'Curries' },
            { id: 'sk2', name: 'Lamb Vindaloo', description: 'Spicy lamb curry with potatoes', price: 18.99, category: 'Curries' },
            { id: 'sk3', name: 'Vegetable Samosa (2pc)', description: 'Crispy pastry with spiced potato filling', price: 6.99, category: 'Appetizers' },
            { id: 'sk4', name: 'Chicken Biryani', description: 'Fragrant basmati rice with spiced chicken', price: 17.99, category: 'Rice' },
            { id: 'sk5', name: 'Garlic Naan', description: 'Fresh tandoor-baked bread with garlic butter', price: 3.99, category: 'Breads' },
        ],
    },

    // ─── Tahini's ──────────────────────────────────────
    {
        id: 'tahinis', name: "Tahini's", category: 'Middle Eastern', categoryId: 'middle-eastern',
        image: '/restaurants/tahinis.png', coverColor: '#1a0808', logo: '🧆',
        rating: 4.8, reviewCount: 644, deliveryTime: '20-35', distance: 5.2, promo: null, isOpen: true, isFeatured: true,
        address: '150 Churchill Blvd c1, Sault Ste. Marie, ON',
        description: 'Flavorful, fresh, and prepared with great attention to quality. Best Middle Eastern in the Soo.',
        menu: [
            { id: 'th1', name: 'Chicken Shawarma Wrap', description: 'Marinated chicken with garlic sauce and pickles', price: 12.99, category: 'Wraps' },
            { id: 'th2', name: 'Falafel Plate', description: 'Crispy falafel with hummus, salad, and pita', price: 14.99, category: 'Plates' },
            { id: 'th3', name: 'Shawarma Plate', description: 'Choice of protein with rice, salad, and sauces', price: 16.99, category: 'Plates' },
            { id: 'th4', name: 'Hummus & Pita', description: 'Creamy chickpea dip with warm pita bread', price: 7.99, category: 'Appetizers' },
            { id: 'th5', name: 'Beef Kafta Wrap', description: 'Spiced ground beef with tahini sauce', price: 13.99, category: 'Wraps' },
        ],
    },

    // ─── Absolutely Delicious ──────────────────────────────────────
    {
        id: 'absolutely-delicious', name: 'Absolutely Delicious', category: 'Breakfast', categoryId: 'breakfast',
        image: '/restaurants/absdel.png', coverColor: '#14100a', logo: '🥘',
        rating: 4.5, reviewCount: 142, deliveryTime: '20-35', distance: 3.4, promo: null, isOpen: true, isFeatured: false,
        address: '96 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Really excellent food, fast and polite service, and a kind atmosphere.',
        menu: [
            { id: 'ad1', name: 'All-Day Breakfast', description: 'Two eggs, bacon, sausage, toast, and home fries', price: 12.99, category: 'Breakfast' },
            { id: 'ad2', name: 'Pancake Stack', description: 'Fluffy buttermilk pancakes with maple syrup', price: 10.99, category: 'Breakfast' },
            { id: 'ad3', name: 'Turkey Club', description: 'Roasted turkey with bacon, lettuce, tomato', price: 14.99, category: 'Lunch' },
            { id: 'ad4', name: 'Homemade Soup', description: 'Daily rotating soup, made from scratch', price: 6.99, category: 'Soups' },
            { id: 'ad5', name: 'Grilled Cheese Deluxe', description: 'Three cheeses on sourdough with tomato soup', price: 12.99, category: 'Lunch' },
        ],
    },

    // ─── Outspoken Brewing ──────────────────────────────────────
    {
        id: 'outspoken-brewing', name: 'Outspoken Brewing', category: 'Brewery', categoryId: 'brewery',
        image: '/restaurants/outspoken.png', coverColor: '#0a1410', logo: '🍻',
        rating: 4.7, reviewCount: 157, deliveryTime: '25-40', distance: 2.8, promo: null, isOpen: true, isFeatured: true,
        address: '350 Queen St E, Sault Ste. Marie, ON',
        description: 'Great beer, good food, and excellent service. Local craft brewery downtown.',
        menu: [
            { id: 'ob1', name: 'Brewery Burger', description: 'Patty with beer-braised onions and smoked cheddar', price: 18.99, category: 'Burgers' },
            { id: 'ob2', name: 'Spent Grain Pretzel', description: 'Fresh pretzel made with brewing grain, beer cheese dip', price: 10.99, category: 'Appetizers' },
            { id: 'ob3', name: 'Fish Tacos', description: 'Beer-battered fish with slaw and chipotle crema', price: 16.99, category: 'Mains' },
            { id: 'ob4', name: 'Flight of 4 Beers', description: 'Choose any 4 craft beers on tap', price: 14.99, category: 'Drinks' },
            { id: 'ob5', name: 'Charcuterie & Cheese', description: 'Local meats and cheeses paired with beer', price: 19.99, category: 'Shareables' },
        ],
    },

    // ─── Westside Cafe ──────────────────────────────────────
    {
        id: 'westside-cafe', name: 'Westside Cafe', category: 'Breakfast', categoryId: 'breakfast',
        image: '/restaurants/westside.png', coverColor: '#1a1510', logo: '🍳',
        rating: 4.3, reviewCount: 767, deliveryTime: '20-35', distance: 2.0, promo: null, isOpen: true, isFeatured: false,
        address: '260 Queen St W, Sault Ste. Marie, ON',
        description: 'Food top notch, service phenomenal. Amazing burger and fries with gravy!',
        menu: [
            { id: 'wc1', name: 'Westside Breakfast', description: 'Two eggs any style, bacon, sausage, toast, fries', price: 12.99, category: 'Breakfast' },
            { id: 'wc2', name: 'Smash Burger', description: 'Double patty with cheese and special sauce', price: 15.99, category: 'Burgers' },
            { id: 'wc3', name: 'Fries with Gravy', description: 'Hand-cut fries with house gravy', price: 8.99, category: 'Sides' },
            { id: 'wc4', name: 'Western Omelette', description: 'Ham, peppers, onions, and cheese', price: 13.99, category: 'Breakfast' },
            { id: 'wc5', name: 'Milkshake', description: 'Old-fashioned thick milkshake, any flavour', price: 6.99, category: 'Drinks' },
        ],
    },

    // ─── Q Cafe & Bakery ──────────────────────────────────────
    {
        id: 'q-cafe', name: 'Q Cafe & Bakery', category: 'Café', categoryId: 'cafe',
        image: '/restaurants/qcafe.png', coverColor: '#14100e', logo: '🧁',
        rating: 4.6, reviewCount: 61, deliveryTime: '15-25', distance: 3.5, promo: null, isOpen: true, isFeatured: false,
        address: '523 Queen St E, Sault Ste. Marie, ON',
        description: 'Cute spot, clean, good service and the food was so good.',
        menu: [
            { id: 'qc1', name: 'Latte', description: 'Double-shot espresso with steamed milk', price: 5.49, category: 'Coffee' },
            { id: 'qc2', name: 'Croissant', description: 'Flaky butter croissant, baked fresh daily', price: 3.99, category: 'Baked Goods' },
            { id: 'qc3', name: 'Breakfast Sandwich', description: 'Egg, cheese, and bacon on artisan bread', price: 8.99, category: 'Breakfast' },
            { id: 'qc4', name: 'Soup & Bread', description: 'Daily soup with fresh baked bread', price: 9.99, category: 'Lunch' },
            { id: 'qc5', name: 'Carrot Cake', description: 'House-baked with cream cheese frosting', price: 5.99, category: 'Baked Goods' },
        ],
    },

    // ─── Lil's Asian Cuisine ──────────────────────────────────────
    {
        id: 'lils-asian', name: "Lil's Asian Cuisine", category: 'Asian', categoryId: 'asian',
        image: '/restaurants/lils.png', coverColor: '#1a0a0e', logo: '🥢',
        rating: 4.7, reviewCount: 166, deliveryTime: '25-40', distance: 2.5, promo: null, isOpen: true, isFeatured: false,
        address: '112 March St, Sault Ste. Marie, ON',
        description: 'Top notch staff, excellent food. Authentic Asian cuisine in the Soo.',
        menu: [
            { id: 'la1', name: 'Pad Thai', description: 'Rice noodles with shrimp, peanuts, bean sprouts', price: 16.99, category: 'Noodles' },
            { id: 'la2', name: 'General Tso Chicken', description: 'Crispy chicken in sweet-spicy sauce', price: 15.99, category: 'Mains' },
            { id: 'la3', name: 'Spring Rolls (4pc)', description: 'Crispy vegetable spring rolls', price: 7.99, category: 'Appetizers' },
            { id: 'la4', name: 'Beef Fried Rice', description: 'Wok-fried rice with beef and vegetables', price: 14.99, category: 'Rice' },
            { id: 'la5', name: 'Mango Sticky Rice', description: 'Sweet Thai dessert with coconut cream', price: 8.99, category: 'Desserts' },
        ],
    },

    // ─── The Taj Indian Cuisine ──────────────────────────────────────
    {
        id: 'the-taj', name: 'The Taj Indian Cuisine Ltd.', category: 'Indian', categoryId: 'indian',
        image: '/restaurants/thetaj.png', coverColor: '#1a0e08', logo: '🕌',
        rating: 4.0, reviewCount: 1300, deliveryTime: '30-45', distance: 3.4, promo: null, isOpen: true, isFeatured: false,
        address: '420 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Great service, great food, and a very beautiful atmosphere.',
        menu: [
            { id: 'tj1', name: 'Tandoori Chicken', description: 'Clay oven roasted chicken with spices', price: 16.99, category: 'Tandoori' },
            { id: 'tj2', name: 'Palak Paneer', description: 'Spinach curry with homemade cheese', price: 14.99, category: 'Vegetarian' },
            { id: 'tj3', name: 'Chicken Tikka Masala', description: 'Grilled chicken in creamy tomato sauce', price: 17.99, category: 'Curries' },
            { id: 'tj4', name: 'Lamb Rogan Josh', description: 'Slow-cooked lamb in Kashmiri spices', price: 19.99, category: 'Curries' },
            { id: 'tj5', name: 'Mango Kulfi', description: 'Traditional Indian ice cream with mango', price: 5.99, category: 'Desserts' },
        ],
    },

    // ─── Biriyani House 786 ──────────────────────────────────────
    {
        id: 'biriyani-house', name: 'Biriyani House 786 Ltd', category: 'Indian', categoryId: 'indian',
        image: '/restaurants/biriyani786.png', coverColor: '#1a0808', logo: '🍚',
        rating: 4.8, reviewCount: 128, deliveryTime: '25-40', distance: 1.0, promo: null, isOpen: true, isFeatured: true,
        address: '14 Queen St W, Sault Ste. Marie, ON',
        description: 'Each dish is a masterpiece, bursting with flavor, creativity, and quality.',
        menu: [
            { id: 'bh1', name: 'Chicken Biryani', description: 'Fragrant basmati with slow-cooked chicken', price: 14.99, category: 'Biryani' },
            { id: 'bh2', name: 'Lamb Biryani', description: 'Tender lamb in aromatic spiced rice', price: 17.99, category: 'Biryani' },
            { id: 'bh3', name: 'Butter Chicken', description: 'Creamy tomato curry with tender chicken', price: 15.99, category: 'Curries' },
            { id: 'bh4', name: 'Seekh Kebab', description: 'Grilled minced lamb skewers with mint chutney', price: 12.99, category: 'Appetizers' },
            { id: 'bh5', name: 'Gulab Jamun', description: 'Sweet milk dumplings in rose syrup', price: 5.99, category: 'Desserts' },
        ],
    },

    // ─── Marconi ──────────────────────────────────────
    {
        id: 'marconi', name: 'Marconi', category: 'Italian', categoryId: 'italian',
        image: '/restaurants/marconi.png', coverColor: '#0e0a1a', logo: '🍝',
        rating: 4.5, reviewCount: 34, deliveryTime: '30-45', distance: 2.5, promo: null, isOpen: true, isFeatured: false,
        address: '450 Albert St W, Sault Ste. Marie, ON',
        description: 'Modern Italian dining with a creative, rotating menu.',
        menu: [
            { id: 'mc1', name: 'House Pasta', description: 'Fresh pasta with seasonal sauce', price: 18.99, category: 'Pastas' },
            { id: 'mc2', name: 'Wood-Fired Pizza', description: 'Neapolitan-style with premium toppings', price: 17.99, category: 'Pizza' },
            { id: 'mc3', name: 'Arancini', description: 'Crispy risotto balls with marinara', price: 12.99, category: 'Appetizers' },
            { id: 'mc4', name: 'Veal Scaloppine', description: 'Pan-fried veal in lemon caper sauce', price: 24.99, category: 'Mains' },
            { id: 'mc5', name: 'Affogato', description: 'Espresso poured over vanilla gelato', price: 7.99, category: 'Desserts' },
        ],
    },

    // ─── Chummy's Grill ──────────────────────────────────────
    {
        id: 'chummys-grill', name: "Chummy's Grill", category: 'Breakfast', categoryId: 'breakfast',
        image: '/restaurants/chummys.png', coverColor: '#1a1208', logo: '🍳',
        rating: 4.4, reviewCount: 486, deliveryTime: '20-35', distance: 3.8, promo: null, isOpen: true, isFeatured: false,
        address: '262 Frontenac St, Sault Ste. Marie, ON',
        description: 'Friendly atmosphere, nice staff, and great food!',
        menu: [
            { id: 'cg1', name: 'Chummy\'s Breakfast', description: 'Three eggs, bacon, sausage, toast, fries', price: 13.99, category: 'Breakfast' },
            { id: 'cg2', name: 'Chummy Burger', description: 'House burger with lettuce, tomato, and special sauce', price: 14.99, category: 'Burgers' },
            { id: 'cg3', name: 'Hot Beef Sandwich', description: 'Roast beef on white bread with gravy and fries', price: 14.99, category: 'Mains' },
            { id: 'cg4', name: 'Poutine', description: 'Fresh fries, cheese curds, and house gravy', price: 10.99, category: 'Sides' },
            { id: 'cg5', name: 'Pie of the Day', description: 'Homemade pie, changes daily', price: 5.99, category: 'Desserts' },
        ],
    },

    // ─── Wacky's ──────────────────────────────────────
    {
        id: 'wackys', name: "Wacky's", category: 'Family', categoryId: 'family',
        image: '/restaurants/wackys.png', coverColor: '#1a0e14', logo: '🎉',
        rating: 4.1, reviewCount: 973, deliveryTime: '25-40', distance: 4.0, promo: null, isOpen: true, isFeatured: false,
        address: '350 Lake St, Sault Ste. Marie, ON',
        description: 'Great food, beautiful decor and friendly servers. Family-friendly fun.',
        menu: [
            { id: 'wk1', name: 'Wacky Wings (1 lb)', description: 'Choose from 40+ flavours', price: 15.99, category: 'Wings' },
            { id: 'wk2', name: 'Big Wacky Burger', description: 'Double patty with all the toppings', price: 17.99, category: 'Burgers' },
            { id: 'wk3', name: 'Quesadilla', description: 'Grilled flour tortilla with chicken and cheese', price: 14.99, category: 'Mains' },
            { id: 'wk4', name: 'Kids Pizza', description: 'Personal-size cheese pizza for the little ones', price: 8.99, category: 'Kids' },
            { id: 'wk5', name: 'Mozza Sticks', description: 'Breaded mozzarella with marinara dip', price: 10.99, category: 'Appetizers' },
        ],
    },

    // ─── Croatian Corner ──────────────────────────────────────
    {
        id: 'croatian-corner', name: 'Croatian Corner', category: 'Croatian', categoryId: 'croatian',
        image: '/restaurants/croatian.png', coverColor: '#0e0a14', logo: '🇭🇷',
        rating: 4.7, reviewCount: 128, deliveryTime: '20-35', distance: 2.2, promo: null, isOpen: true, isFeatured: false,
        address: '188 Bruce St, Sault Ste. Marie, ON',
        description: 'Excellent food, staff, service — all first rate. Authentic Croatian cuisine.',
        menu: [
            { id: 'cc1', name: 'Ćevapi', description: 'Grilled minced meat sausages with ajvar and flatbread', price: 14.99, category: 'Mains' },
            { id: 'cc2', name: 'Burek', description: 'Flaky phyllo pastry stuffed with meat or cheese', price: 8.99, category: 'Appetizers' },
            { id: 'cc3', name: 'Pljeskavica', description: 'Balkan-style spiced meat patty', price: 13.99, category: 'Mains' },
            { id: 'cc4', name: 'Sarma', description: 'Cabbage rolls stuffed with rice and meat', price: 12.99, category: 'Mains' },
        ],
    },

    // ─── Sun Kwong Restaurant ──────────────────────────────────────
    {
        id: 'sun-kwong', name: 'Sun Kwong Restaurant', category: 'Chinese', categoryId: 'chinese',
        image: '/restaurants/sunkwong.png', coverColor: '#1a0a0a', logo: '🥡',
        rating: 4.1, reviewCount: 189, deliveryTime: '25-40', distance: 2.8, promo: null, isOpen: true, isFeatured: false,
        address: '368 Queen St E, Sault Ste. Marie, ON',
        description: 'Reasonably priced and never a bad meal. Classic Cantonese cuisine.',
        menu: [
            { id: 'sk1b', name: 'Sweet & Sour Chicken', description: 'Crispy chicken in house sweet and sour sauce', price: 14.99, category: 'Mains' },
            { id: 'sk2b', name: 'Beef Chow Mein', description: 'Stir-fried noodles with beef and vegetables', price: 13.99, category: 'Noodles' },
            { id: 'sk3b', name: 'Wonton Soup', description: 'Pork wontons in clear broth', price: 8.99, category: 'Soups' },
            { id: 'sk4b', name: 'Combo for Two', description: 'Choice of 2 mains with fried rice and egg rolls', price: 29.99, category: 'Combos' },
        ],
    },

    // ─── Hunger Point ──────────────────────────────────────
    {
        id: 'hunger-point', name: 'Hunger Point', category: 'Indian', categoryId: 'indian',
        image: '/restaurants/hungerpoint.png', coverColor: '#1a0e0a', logo: '🍛',
        rating: 4.1, reviewCount: 205, deliveryTime: '25-40', distance: 3.0, promo: null, isOpen: true, isFeatured: false,
        address: '695 Pine St, Sault Ste. Marie, ON',
        description: 'Top notch food, atmosphere, and staff. Highly recommend!',
        menu: [
            { id: 'hp1', name: 'Chicken Tikka', description: 'Marinated chicken grilled to perfection', price: 14.99, category: 'Appetizers' },
            { id: 'hp2', name: 'Dal Makhani', description: 'Creamy black lentil curry', price: 12.99, category: 'Vegetarian' },
            { id: 'hp3', name: 'Goat Biryani', description: 'Fragrant rice with tender goat meat', price: 18.99, category: 'Biryani' },
            { id: 'hp4', name: 'Peshwari Naan', description: 'Stuffed with coconut, raisins, and almonds', price: 4.99, category: 'Breads' },
        ],
    },

    // ─── Lychee Thai Restaurant ──────────────────────────────────────
    {
        id: 'lychee-thai', name: 'Lychee Thai Restaurant', category: 'Thai', categoryId: 'thai',
        image: '/restaurants/lycheethai.png', coverColor: '#0e1a0a', logo: '🍜',
        rating: 3.9, reviewCount: 332, deliveryTime: '30-45', distance: 2.8, promo: null, isOpen: true, isFeatured: false,
        address: '280 Queen St E, Sault Ste. Marie, ON',
        description: 'A quiet little place with a cozy atmosphere and delicious food.',
        menu: [
            { id: 'lt1', name: 'Pad Thai', description: 'Rice noodles with shrimp, peanuts, bean sprouts', price: 16.99, category: 'Noodles' },
            { id: 'lt2', name: 'Green Curry', description: 'Coconut curry with bamboo shoots and basil', price: 17.99, category: 'Curries' },
            { id: 'lt3', name: 'Tom Yum Soup', description: 'Spicy and sour shrimp soup', price: 9.99, category: 'Soups' },
            { id: 'lt4', name: 'Mango Salad', description: 'Green mango with peanuts and chili lime dressing', price: 11.99, category: 'Salads' },
            { id: 'lt5', name: 'Thai Iced Tea', description: 'Sweetened black tea with cream', price: 4.99, category: 'Drinks' },
        ],
    },

    // ─── Odeno Restaurant ──────────────────────────────────────
    {
        id: 'odeno', name: 'Odeno Restaurant', category: 'Pub & Grill', categoryId: 'pub',
        image: '/restaurants/odeno.png', coverColor: '#0a0e1a', logo: '🍻',
        rating: 4.1, reviewCount: 74, deliveryTime: '25-40', distance: 4.2, promo: null, isOpen: true, isFeatured: false,
        address: '494 Northern Ave E, Sault Ste. Marie, ON',
        description: 'Perfect place to unwind with great food and drinks.',
        menu: [
            { id: 'od1', name: 'Odeno Burger', description: 'Half-pound burger with toppings', price: 16.99, category: 'Burgers' },
            { id: 'od2', name: 'Wings (1 lb)', description: 'Jumbo wings in choice of sauce', price: 14.99, category: 'Wings' },
            { id: 'od3', name: 'Caesar Salad', description: 'Romaine, croutons, parmesan, house dressing', price: 11.99, category: 'Salads' },
            { id: 'od4', name: 'Fish & Chips', description: 'Beer-battered with fries and coleslaw', price: 16.99, category: 'Mains' },
        ],
    },

    // ─── Golden Dragon Restaurant ──────────────────────────────────────
    {
        id: 'golden-dragon', name: 'Golden Dragon Restaurant', category: 'Chinese', categoryId: 'chinese',
        image: '/restaurants/goldendragon.png', coverColor: '#1a0a08', logo: '🐉',
        rating: 3.7, reviewCount: 476, deliveryTime: '25-40', distance: 4.2, promo: null, isOpen: true, isFeatured: false,
        address: "Zellar's Plaza, 264 Northern Ave E, Sault Ste. Marie, ON",
        description: 'Cozy ambiance, amazing food, and friendly staff.',
        menu: [
            { id: 'gd1', name: 'Combination Dinner', description: 'Egg roll, fried rice, and choice of entrée', price: 15.99, category: 'Combos' },
            { id: 'gd2', name: 'Szechuan Beef', description: 'Spicy stir-fried beef with vegetables', price: 14.99, category: 'Mains' },
            { id: 'gd3', name: 'Egg Foo Young', description: 'Chinese omelette with gravy', price: 12.99, category: 'Mains' },
            { id: 'gd4', name: 'Chicken Fried Rice', description: 'Wok-fried rice with chicken and egg', price: 11.99, category: 'Rice' },
        ],
    },

    // ─── The Grand Gardens ──────────────────────────────────────
    {
        id: 'grand-gardens', name: 'The Grand Gardens', category: 'Chinese', categoryId: 'chinese',
        image: '/restaurants/grandgardens.png', coverColor: '#1a0a10', logo: '🏮',
        rating: 4.5, reviewCount: 498, deliveryTime: '30-45', distance: 6.5, promo: null, isOpen: true, isFeatured: false,
        address: '1324 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Exceptional food, stunning decor, and great company!',
        menu: [
            { id: 'gg1', name: 'Peking Duck', description: 'Whole roasted duck with pancakes and plum sauce', price: 38.99, category: 'Mains' },
            { id: 'gg2', name: 'Dim Sum Platter', description: 'Assorted steamed dumplings and buns', price: 18.99, category: 'Appetizers' },
            { id: 'gg3', name: 'Salt & Pepper Shrimp', description: 'Crispy shrimp with seasoned salt and peppers', price: 16.99, category: 'Mains' },
            { id: 'gg4', name: 'Lobster in Black Bean Sauce', description: 'Whole lobster in fermented black bean sauce', price: 44.99, category: 'Seafood' },
            { id: 'gg5', name: 'Banquet for 4', description: 'Multi-course feast with soup, appetizers, 3 mains', price: 89.99, category: 'Banquet' },
        ],
    },

    // ─── Out to Munch ──────────────────────────────────────
    {
        id: 'out-to-munch', name: 'Out to Munch', category: 'Breakfast', categoryId: 'breakfast',
        image: '/restaurants/outtomunch.png', coverColor: '#14100a', logo: '🍟',
        rating: 3.5, reviewCount: 29, deliveryTime: '15-25', distance: 3.2, promo: null, isOpen: true, isFeatured: false,
        address: '200 McNabb St, Sault Ste. Marie, ON',
        description: 'The sausage on a bun is the greatest when you\'re hungry.',
        menu: [
            { id: 'om1', name: 'Sausage on a Bun', description: 'House-made sausage patty on a toasted bun', price: 6.99, category: 'Classics' },
            { id: 'om2', name: 'Fries', description: 'Fresh-cut fries, golden and crispy', price: 5.99, category: 'Sides' },
            { id: 'om3', name: 'Poutine', description: 'Fries with cheese curds and gravy', price: 9.99, category: 'Sides' },
            { id: 'om4', name: 'Burger', description: 'Classic single with cheese and fixings', price: 9.99, category: 'Burgers' },
        ],
    },

    // ─── Shogun Sushi ──────────────────────────────────────
    {
        id: 'shogun-sushi', name: 'Shogun Sushi', category: 'Sushi', categoryId: 'sushi',
        image: '/restaurants/shogun.png', coverColor: '#0a0e1a', logo: '🍣',
        rating: 4.0, reviewCount: 972, deliveryTime: '30-45', distance: 3.4, promo: null, isOpen: true, isFeatured: false,
        address: '308 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Delicious food, exceptional service, great atmosphere. Highly recommend.',
        menu: [
            { id: 'ss1', name: 'Dragon Roll', description: 'Shrimp tempura topped with eel and avocado', price: 16.99, category: 'Specialty Rolls' },
            { id: 'ss2', name: 'Sashimi Platter', description: 'Chef\'s selection of 15 pieces of fresh sashimi', price: 28.99, category: 'Sashimi' },
            { id: 'ss3', name: 'Bento Box', description: 'Choice of main with rice, salad, gyoza, and miso', price: 18.99, category: 'Combos' },
            { id: 'ss4', name: 'California Roll', description: 'Crab, avocado, cucumber, sesame', price: 10.99, category: 'Classic Rolls' },
            { id: 'ss5', name: 'Chicken Teriyaki', description: 'Grilled chicken with teriyaki glaze and rice', price: 15.99, category: 'Mains' },
        ],
    },

    // ─── Gus's Pizza ──────────────────────────────────────
    {
        id: 'gus-pizza', name: "Gus's Pizza", category: 'Pizza', categoryId: 'pizza',
        image: '/restaurants/guspizza.png', coverColor: '#1a0a08', logo: '🍕',
        rating: 4.4, reviewCount: 202, deliveryTime: '20-35', distance: 1.2, promo: null, isOpen: true, isFeatured: false,
        address: '146 Queen St E, Sault Ste. Marie, ON',
        description: 'Great food and service! Solid downtown pizza.',
        menu: [
            { id: 'gp1', name: 'Pepperoni Pizza (Large)', description: 'Classic pepperoni on house dough', price: 16.99, category: 'Pizza' },
            { id: 'gp2', name: 'Hawaiian Pizza (Large)', description: 'Ham and pineapple with mozzarella', price: 17.99, category: 'Pizza' },
            { id: 'gp3', name: 'Garlic Bread', description: 'Fresh baked with garlic butter', price: 5.99, category: 'Sides' },
            { id: 'gp4', name: 'Pizza Slice', description: 'Single slice of the day', price: 3.99, category: 'Pizza' },
        ],
    },

    // ─── Ricardo's Big Slice Pizza ──────────────────────────────────────
    {
        id: 'ricardos', name: "Ricardo's Big Slice Pizza", category: 'Pizza', categoryId: 'pizza',
        image: '/restaurants/ricardos.png', coverColor: '#1a0808', logo: '🍕',
        rating: 3.5, reviewCount: 83, deliveryTime: '15-25', distance: 1.5, promo: null, isOpen: true, isFeatured: false,
        address: '293 Bay St, Sault Ste. Marie, ON',
        description: 'Great lunch! Big slices, great value.',
        menu: [
            { id: 'rc1', name: 'Big Slice — Pepperoni', description: 'Oversized slice of pepperoni pizza', price: 4.99, category: 'Slices' },
            { id: 'rc2', name: 'Big Slice — Deluxe', description: 'Loaded with peppers, mushrooms, onions, meat', price: 5.99, category: 'Slices' },
            { id: 'rc3', name: 'Panzerotti', description: 'Deep-fried dough stuffed with cheese and toppings', price: 8.99, category: 'Specialties' },
            { id: 'rc4', name: 'Garlic Fingers', description: 'Cheesy garlic bread strips with dipping sauce', price: 7.99, category: 'Sides' },
        ],
    },

    // ─── Pizzatecca + Take Away ──────────────────────────────────────
    {
        id: 'pizzatecca', name: 'Pizzatecca + Take Away', category: 'Pizza', categoryId: 'pizza',
        image: '/restaurants/pizzatecca.png', coverColor: '#1a0e0a', logo: '🔥',
        rating: 3.3, reviewCount: 61, deliveryTime: '25-40', distance: 3.4, promo: null, isOpen: true, isFeatured: false,
        address: '229 Great Northern Rd, Sault Ste. Marie, ON',
        description: 'Diavolo is fabulous and the wings are huge and crispy.',
        menu: [
            { id: 'pz1', name: 'Diavolo Pizza', description: 'Spicy pepperoni with hot peppers and chili flakes', price: 18.99, category: 'Pizza' },
            { id: 'pz2', name: 'BBQ Chicken Pizza', description: 'Grilled chicken, BBQ sauce, red onion, cilantro', price: 19.99, category: 'Pizza' },
            { id: 'pz3', name: 'Jumbo Wings (1 lb)', description: 'Crispy deep-fried wings, choice of sauce', price: 15.99, category: 'Wings' },
            { id: 'pz4', name: 'Calzone', description: 'Folded pizza stuffed with ricotta and mozzarella', price: 14.99, category: 'Specialties' },
        ],
    },

    // ─── The Queen's Tarts ──────────────────────────────────────
    {
        id: 'queens-tarts', name: "The Queen's Tarts", category: 'Café', categoryId: 'cafe',
        image: '/restaurants/queenstarts.png', coverColor: '#1a1510', logo: '🧁',
        rating: 4.9, reviewCount: 159, deliveryTime: '15-25', distance: 3.5, promo: null, isOpen: true, isFeatured: true,
        address: '472 Queen St E, Sault Ste. Marie, ON',
        description: 'The mochaccino is delivered right to your table. Impeccable pastries.',
        menu: [
            { id: 'qt1', name: 'Butter Tart', description: 'Classic runny-centre butter tart', price: 3.99, category: 'Tarts' },
            { id: 'qt2', name: 'Mochaccino', description: 'Rich espresso with chocolate and steamed milk', price: 5.99, category: 'Coffee' },
            { id: 'qt3', name: 'Quiche of the Day', description: 'Savoury pastry with seasonal fillings', price: 7.99, category: 'Savoury' },
            { id: 'qt4', name: 'Scone & Clotted Cream', description: 'Fresh-baked scone with jam and cream', price: 5.99, category: 'Pastry' },
            { id: 'qt5', name: 'Assorted Tart Box (6)', description: 'Half dozen mixed tarts for sharing', price: 19.99, category: 'Tarts' },
        ],
    },

    // ─── Hard Wok Cafe ──────────────────────────────────────
    {
        id: 'hard-wok', name: 'Hard Wok Cafe', category: 'Chinese', categoryId: 'chinese',
        image: '/restaurants/hardwok.png', coverColor: '#1a0808', logo: '🥡',
        rating: 3.8, reviewCount: 197, deliveryTime: '25-40', distance: 4.0, promo: null, isOpen: true, isFeatured: false,
        address: '303 Cathcart St, Sault Ste. Marie, ON',
        description: 'Great food, decently priced. Solid Chinese takeout.',
        menu: [
            { id: 'hw1', name: 'General Tso Chicken', description: 'Crispy chicken in sweet chili sauce', price: 14.99, category: 'Mains' },
            { id: 'hw2', name: 'Beef Lo Mein', description: 'Soft noodles with beef and vegetables', price: 13.99, category: 'Noodles' },
            { id: 'hw3', name: 'Spring Rolls (4pc)', description: 'Crispy vegetable spring rolls', price: 6.99, category: 'Appetizers' },
            { id: 'hw4', name: 'Combo Plate', description: 'Choice of 2 items with fried rice', price: 14.99, category: 'Combos' },
        ],
    },

    // ─── Primo Pizza & Wings ──────────────────────────────────────
    {
        id: 'primo-pizza', name: 'Primo Pizza & Wings', category: 'Pizza', categoryId: 'pizza',
        image: '/restaurants/primo.png', coverColor: '#1a0a08', logo: '🍕',
        rating: 4.3, reviewCount: 190, deliveryTime: '25-40', distance: 4.8, promo: null, isOpen: true, isFeatured: false,
        address: '151 Trunk Rd, Sault Ste. Marie, ON',
        description: 'The Hawaiian pizza did not disappoint. Great pizza and wings.',
        menu: [
            { id: 'pp1', name: 'Hawaiian Pizza (Large)', description: 'Ham, pineapple, and mozzarella', price: 17.99, category: 'Pizza' },
            { id: 'pp2', name: 'Meat Lovers (Large)', description: 'Pepperoni, sausage, bacon, ham', price: 19.99, category: 'Pizza' },
            { id: 'pp3', name: 'Wings (2 lb)', description: 'Crispy wings with choice of sauce', price: 18.99, category: 'Wings' },
            { id: 'pp4', name: 'Garlic Bread with Cheese', description: 'Fresh bread with garlic butter and mozzarella', price: 7.99, category: 'Sides' },
        ],
    },

    // ─── Sugar ──────────────────────────────────────
    {
        id: 'sugar', name: 'Sugar', category: 'Café', categoryId: 'cafe',
        image: '/restaurants/sugar.png', coverColor: '#1a0e14', logo: '🍬',
        rating: 4.6, reviewCount: 180, deliveryTime: '15-25', distance: 1.5, promo: null, isOpen: true, isFeatured: false,
        address: 'Downtown, Sault Ste. Marie, ON',
        description: 'Sweet treats and specialty coffee in the heart of the Soo.',
        menu: [
            { id: 'su1', name: 'Specialty Donut', description: 'Daily rotating gourmet donut', price: 4.99, category: 'Pastry' },
            { id: 'su2', name: 'Iced Latte', description: 'Double espresso over ice with milk', price: 5.99, category: 'Coffee' },
            { id: 'su3', name: 'Cookie Sandwich', description: 'Two cookies with buttercream filling', price: 5.99, category: 'Pastry' },
            { id: 'su4', name: 'Cake Slice', description: 'Daily cake selection by the slice', price: 6.99, category: 'Cake' },
            { id: 'su5', name: 'Hot Chocolate', description: 'Rich Belgian chocolate with whipped cream', price: 4.99, category: 'Drinks' },
        ],
    },

    // ─── Angels Direct Food Service ──────────────────────────────────────
    {
        id: 'angels-direct', name: "Angel's Direct Food Service", category: 'Marketplace', categoryId: 'marketplace',
        image: '/restaurants/angels-direct.png', coverColor: '#1a1210', logo: '🥩',
        rating: 4.9, reviewCount: 0, deliveryTime: '2-3 days', distance: 3.5, promo: 'Wholesale Prices',
        isOpen: true, isFeatured: true,
        address: 'Sault Ste. Marie, ON',
        description: "Family-owned food distributor in Sault Ste. Marie. Premium bulk food at affordable prices — from AAA Grade beef to wild-caught salmon to over 2,000 dry groceries.",
        menu: [
            { id: 'ad1', name: 'Lean Ground Beef (5 lbs)', description: 'Fresh lean ground beef, 1 pack at 5 pounds', price: 55.00, category: 'Fresh Meats' },
            { id: 'ad2', name: 'Striploins AAA (16 PCS @ 10oz)', description: 'Ontario Premium Beef, carve-cut AAA centre-cut striploins', price: 254.00, category: 'Premium Cuts' },
            { id: 'ad3', name: 'Ribeyes AAA Grade (16 PCS @ 10oz)', description: 'AAA grade ribeye steaks, individually packed', price: 315.00, category: 'Premium Cuts' },
            { id: 'ad4', name: 'Roadhouse Angus Burgers (42 PCS)', description: '4oz Roadhouse Angus beef patties, 42 per case', price: 70.00, category: 'Burgers & Patties' },
            { id: 'ad5', name: 'Prime Rib Burgers (24 PCS @ 6oz)', description: "Smith's beef prime rib burger patties", price: 82.00, category: 'Burgers & Patties' },
            { id: 'ad6', name: 'Veal Chop French (16 PCS)', description: 'French-cut veal chops, 10-12oz each', price: 215.00, category: 'Premium Cuts' },
            { id: 'ad7', name: 'Shaved Prime Rib (36 PCS @ 5oz)', description: 'Thinly shaved prime rib, perfect for sandwiches', price: 230.00, category: 'Deli & Prepared' },
            { id: 'ad8', name: 'Ground Veal (10 lbs)', description: '2 packs at 5 lbs each, premium ground veal', price: 52.00, category: 'Fresh Meats' },
            { id: 'ad9', name: 'Beef Bones Canoe Style (20 lbs)', description: '5-7 inch canoe-style beef bones for broth and roasting', price: 95.00, category: 'Specialty' },
            { id: 'ad10', name: 'Striploins AAA (Fresh, Market Price)', description: 'Fresh AAA grade striploins — contact for current pricing', price: 0.00, category: 'Fresh Meats' },
        ],
    },
];

// ─── Soo MRKT Vendors ──────────────────────────────────
export const sooMrktVendors = [
    {
        id: 'sm-penokean', name: 'Penokean Hills Farms', category: 'Meats', emoji: '🥩',
        badge: 'Est. 2012', coverColor: '#1a0f0a',
        tags: ['Grass-Fed', 'Hormone-Free', 'Local Farm', 'Sustainable'],
        description: 'Premium grass-fed beef and heritage pork from Algoma\'s pristine farmlands. All animals are ethically raised and hormone-free.',
        story: 'Born from a belief that the Algoma Highlands could produce world-class beef, Penokean Hills Farms has spent over a decade perfecting the art of ethical, sustainable ranching. Their cattle roam freely across hundreds of acres of pristine Northern Ontario pasture, resulting in beef that rivals the finest cuts from anywhere in the country. Every animal is raised without hormones or antibiotics — just clean air, clean water, and the rich grasses of the Canadian Shield.',
        locationDetail: 'Algoma Highlands, ON — Available at Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM · Online orders: Anytime',
        products: [
            { id: 'ph-1', name: 'Grass-Fed Ribeye Steak', price: 28.99, description: '12oz AAA-grade ribeye, dry-aged 21 days', category: 'Premium Cuts' },
            { id: 'ph-2', name: 'Ground Beef (1 lb)', price: 9.99, description: 'Lean grass-fed ground beef, perfect for burgers', category: 'Everyday Essentials' },
            { id: 'ph-3', name: 'Heritage Pork Chops', price: 16.99, description: 'Thick-cut bone-in chops, pack of 4', category: 'Heritage Pork' },
            { id: 'ph-4', name: 'Beef Tenderloin', price: 34.99, description: '8oz centre-cut filet mignon', category: 'Premium Cuts' },
            { id: 'ph-5', name: 'Smoked Bacon (500g)', price: 12.99, description: 'Maple-smoked heritage bacon', category: 'Heritage Pork' },
        ]
    },
    {
        id: 'sm-findlays', name: "Findlay's Fungus", category: 'Produce', emoji: '🍄',
        badge: 'Micro-Farm', coverColor: '#0f1a0d',
        tags: ['Specialty', 'Indoor-Grown', 'Medicinal', 'Gourmet'],
        description: 'Locally grown specialty mushrooms cultivated in controlled environments in the heart of Algoma. Unique varieties you won\'t find anywhere else.',
        story: 'What started as a curiosity about fungi in a basement has grown into Algoma\'s most exciting micro-farm. Findlay\'s Fungus cultivates extraordinary mushroom varieties in precisely controlled indoor environments, producing Lion\'s Mane, Blue Oysters, and Shiitakes that chefs across the Soo fight over. Their mushroom growing kits have become legendary gifts — bringing the magic of mycology into homes across Northern Ontario.',
        locationDetail: 'Sault Ste. Marie, ON — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM',
        products: [
            { id: 'ff-1', name: 'Lion\'s Mane (200g)', price: 12.99, description: 'Brain-boosting gourmet mushroom', category: 'Fresh Mushrooms' },
            { id: 'ff-2', name: 'Oyster Mushroom Mix (300g)', price: 8.99, description: 'Blue, pink, and golden oyster varieties', category: 'Fresh Mushrooms' },
            { id: 'ff-3', name: 'Shiitake (250g)', price: 9.99, description: 'Rich, smoky flavour, locally grown', category: 'Fresh Mushrooms' },
            { id: 'ff-4', name: 'Mushroom Growing Kit', price: 24.99, description: 'Grow your own oyster mushrooms at home', category: 'Kits & Gifts' },
        ]
    },
    {
        id: 'sm-fruitful', name: 'Fruitful Hill Farm', category: 'Produce', emoji: '🍎',
        badge: 'Family Farm', coverColor: '#1a140a',
        tags: ['Seasonal', 'Sustainable', 'Farm-Fresh', 'Heirloom'],
        description: 'Seasonal fruits and vegetables grown using sustainable farming practices. Picked fresh every Saturday morning for the market.',
        story: 'Three generations of the same family have worked this land on the outskirts of the Soo. Fruitful Hill Farm grows with the seasons — strawberries and asparagus in spring, heirloom tomatoes all summer, root vegetables through the fall, and preserved goods for winter. Everything is picked at peak ripeness on Saturday morning and brought straight to market. No cold storage, no cross-country shipping, no compromises.',
        locationDetail: 'Rural Sault Ste. Marie, ON — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 12:30PM (seasonal)',
        products: [
            { id: 'fh-1', name: 'Seasonal Berry Box', price: 7.99, description: 'Mixed berries, changes with the season', category: 'Fruits' },
            { id: 'fh-2', name: 'Heirloom Tomatoes (1 lb)', price: 5.99, description: 'Vine-ripened heritage varieties', category: 'Vegetables' },
            { id: 'fh-3', name: 'Mixed Greens Bag', price: 4.99, description: 'Fresh salad mix with micro-greens', category: 'Greens' },
            { id: 'fh-4', name: 'Root Vegetable Box', price: 11.99, description: 'Carrots, beets, parsnips, and turnips', category: 'Vegetables' },
        ]
    },
    {
        id: 'sm-hogans', name: "Hogan's Homestead", category: 'Meats', emoji: '🐔',
        badge: 'Free-Range', coverColor: '#1a1508',
        tags: ['Pasture-Raised', 'Antibiotic-Free', 'Free-Range', 'Ethical'],
        description: 'Free-range poultry and farm-fresh eggs from happy hens. All birds are pasture-raised with no antibiotics.',
        story: 'At Hogan\'s Homestead, the chickens come first. Every bird lives its life outdoors, scratching through pasture and eating a natural diet supplemented with locally milled grain. The result? Eggs with deep orange yolks that taste like eggs used to taste, and chicken with a flavour and texture that supermarket birds simply can\'t match. The Hogan family has been raising poultry this way since their grandparents first homesteaded in Algoma.',
        locationDetail: 'Algoma District, ON — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM',
        products: [
            { id: 'hh-1', name: 'Free-Range Whole Chicken', price: 18.99, description: 'Pasture-raised, 3-4 lb bird', category: 'Poultry' },
            { id: 'hh-2', name: 'Farm Fresh Eggs (dozen)', price: 6.99, description: 'Free-range, vibrant orange yolks', category: 'Eggs' },
            { id: 'hh-3', name: 'Chicken Breast (1 lb)', price: 12.99, description: 'Boneless, skinless, air-chilled', category: 'Poultry' },
            { id: 'hh-4', name: 'Duck Eggs (half dozen)', price: 8.99, description: 'Rich and creamy for baking', category: 'Eggs' },
        ]
    },
    {
        id: 'sm-jenn', name: 'Jenn Bakes Cakes', category: 'Baked Goods', emoji: '🎂',
        badge: 'Artisan Baker', coverColor: '#1a0d14',
        tags: ['Handcrafted', 'Custom Orders', 'Sourdough', 'Local Ingredients'],
        description: 'Artisan cakes, pastries, and desserts handcrafted with locally sourced ingredients. Custom orders welcome.',
        story: 'Jenn left a corporate career to follow her passion for baking, and the Soo is better for it. Every loaf of sourdough is fermented for 48 hours. Every croissant is hand-laminated with pure butter. Every cake is a custom work of art. She sources flour from Ontario mills, eggs from Hogan\'s Homestead, and maple syrup from Mountain Maple — proving that when locals support locals, everyone wins.',
        locationDetail: 'Downtown Sault Ste. Marie — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 12PM (sells out fast!)',
        products: [
            { id: 'jb-1', name: 'Signature Carrot Cake (slice)', price: 6.99, description: 'Cream cheese frosting, toasted walnuts', category: 'Cakes' },
            { id: 'jb-2', name: 'Sourdough Loaf', price: 7.99, description: '48-hour fermented, crusty perfection', category: 'Breads' },
            { id: 'jb-3', name: 'Butter Croissants (4 pack)', price: 9.99, description: 'Flaky, laminated, pure butter', category: 'Pastries' },
            { id: 'jb-4', name: 'Custom 6" Cake', price: 45.99, description: 'Choose your flavour and design', category: 'Custom' },
            { id: 'jb-5', name: 'Cinnamon Rolls (6 pack)', price: 14.99, description: 'Warm with cream cheese glaze', category: 'Pastries' },
        ]
    },
    {
        id: 'sm-maple', name: 'Mountain Maple', category: 'Specialty', emoji: '🍁',
        badge: 'Since 1948', coverColor: '#1a0a00',
        tags: ['Pure Canadian', 'Century Sugar Bush', 'Small-Batch', 'Heritage'],
        description: 'Pure Canadian maple syrup and artisan maple products from century-old sugar bushes in the Algoma Highlands.',
        story: 'Four generations of the same family have tapped the same maples in the Algoma Highlands. Their sugar bush dates back to 1948, and many of the trees are over 150 years old. Every spring, the family gathers to boil sap the traditional way — in a wood-fired evaporator that fills the highlands with that unmistakable sweet smoke. The result is maple syrup with a depth and complexity that industrial operations can never replicate.',
        locationDetail: 'Algoma Highlands, ON — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM · Sugar shack tours: March–April',
        products: [
            { id: 'mm-1', name: 'Pure Maple Syrup (500ml)', price: 16.99, description: 'Grade A amber, rich taste', category: 'Syrups' },
            { id: 'mm-2', name: 'Maple Butter (250g)', price: 11.99, description: 'Creamy, spreadable maple goodness', category: 'Spreads' },
            { id: 'mm-3', name: 'Maple Candy Box', price: 8.99, description: 'Assorted pure maple leaf candies', category: 'Sweets' },
            { id: 'mm-4', name: 'Maple BBQ Sauce', price: 9.99, description: 'Sweet and smoky, perfect for grilling', category: 'Sauces' },
        ]
    },
    {
        id: 'sm-twisted', name: 'Northern Twisted Pizza', category: 'Prepared Foods', emoji: '🍕',
        badge: 'Wood-Fired', coverColor: '#1a0800',
        tags: ['Wood-Fired', 'House-Pulled Mozza', 'Local Toppings', 'Take & Bake'],
        description: 'Wood-fired artisan pizzas made with house-pulled mozzarella and locally sourced toppings. Ready to eat or take-and-bake.',
        story: 'Northern Twisted started with a hand-built wood-fired oven and a dream of making real Neapolitan pizza in Northern Ontario. They pull their own mozzarella daily, use San Marzano tomatoes, and source toppings from fellow market vendors — Findlay\'s mushrooms, Penokean Hills pepperoni, Collholm\'s herbs. Each pizza is a collaboration between local producers, fired at 900°F for 90 seconds of blistered, bubbly perfection.',
        locationDetail: 'Soo Saturday Market, 73 Brock St., Sault Ste. Marie',
        hours: 'Saturday Market: 9AM – 1PM',
        products: [
            { id: 'nt-1', name: 'Margherita Pizza', price: 14.99, description: 'San Marzano, fresh mozza, basil', category: 'Classic' },
            { id: 'nt-2', name: 'Wild Mushroom Pizza', price: 16.99, description: 'Findlay\'s mushrooms, truffle oil, fontina', category: 'Specialty' },
            { id: 'nt-3', name: 'Pepperoni & Honey', price: 15.99, description: 'Spicy pepperoni with hot honey drizzle', category: 'Specialty' },
            { id: 'nt-4', name: 'Take & Bake Dough Ball', price: 5.99, description: 'Ready-to-bake pizza dough', category: 'Take Home' },
        ]
    },
    {
        id: 'sm-saltspire', name: 'Saltspire Seafood', category: 'Seafood', emoji: '🐟',
        badge: 'Lake Superior', coverColor: '#0a1420',
        tags: ['Wild-Caught', 'Smoked In-House', 'Sustainable', 'Lake Superior'],
        description: 'Fresh Lake Superior fish, sustainably caught. Smoked in-house using traditional methods and local hardwoods.',
        story: 'Lake Superior is the largest, cleanest, and coldest of the Great Lakes — and its fish are extraordinary. Saltspire works with local fishermen who use sustainable methods to harvest lake trout, whitefish, and walleye from these pristine waters. Back at their smokehouse, they cure and smoke each fillet over locally sourced maple and cherry wood, creating flavours that can only come from this place.',
        locationDetail: 'Sault Ste. Marie waterfront — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 12PM',
        products: [
            { id: 'ss-1', name: 'Fresh Lake Trout Fillet', price: 18.99, description: 'Wild-caught, boneless, skin-on', category: 'Fresh Fish' },
            { id: 'ss-2', name: 'Smoked Whitefish (whole)', price: 22.99, description: 'Hot-smoked over maple wood', category: 'Smoked' },
            { id: 'ss-3', name: 'Whitefish Dip (250g)', price: 9.99, description: 'Creamy smoked whitefish spread', category: 'Prepared' },
            { id: 'ss-4', name: 'Pickerel Fillets (1 lb)', price: 24.99, description: 'Fresh-caught walleye, ready to cook', category: 'Fresh Fish' },
        ]
    },
    {
        id: 'sm-stock', name: 'Stock & Broth', category: 'Prepared Foods', emoji: '🍲',
        badge: '24hr Simmer', coverColor: '#1a1008',
        tags: ['Slow-Simmered', 'Collagen-Rich', 'Farm-Sourced', 'Healing'],
        description: 'House-made bone broths and artisan soups, slow-simmered for 24+ hours using bones from local farms.',
        story: 'Stock & Broth believes that real healing starts in the kitchen. Their bone broths simmer for 24 to 48 hours, extracting every bit of collagen, minerals, and flavour from bones sourced exclusively from Penokean Hills Farms and Hogan\'s Homestead. Each jar is a labour of patience — no shortcuts, no concentrates, no preservatives. Just real food, made slowly, from animals that lived well.',
        locationDetail: 'Commercial kitchen, Sault Ste. Marie — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM',
        products: [
            { id: 'sb-1', name: 'Beef Bone Broth (750ml)', price: 12.99, description: '48-hour simmer, rich collagen', category: 'Bone Broth' },
            { id: 'sb-2', name: 'Chicken Bone Broth (750ml)', price: 11.99, description: 'Free-range chicken, herbs, veggies', category: 'Bone Broth' },
            { id: 'sb-3', name: 'Wild Mushroom Soup', price: 9.99, description: 'Creamy blend with local mushrooms', category: 'Soups' },
            { id: 'sb-4', name: 'Roasted Tomato Bisque', price: 8.99, description: 'Fire-roasted with fresh basil', category: 'Soups' },
        ]
    },
    {
        id: 'sm-syrian', name: 'Syrian Table', category: 'Prepared Foods', emoji: '🧆',
        badge: 'Family Recipes', coverColor: '#1a1400',
        tags: ['Authentic', 'Family Recipes', 'Made Daily', 'Cultural Heritage'],
        description: 'Authentic Syrian cuisine prepared with traditional family recipes. Fresh hummus, falafel, and more made daily.',
        story: 'When the Alhamoud family arrived in Sault Ste. Marie, they brought with them generations of culinary knowledge passed down through their family in Damascus. Syrian Table is their gift to the community — authentic falafel ground and fried fresh each morning, hummus made from scratch with tahini they source directly, and baklava layered with the same care their grandmother taught them. Every bite is a bridge between cultures.',
        locationDetail: 'Soo Saturday Market, 73 Brock St., Sault Ste. Marie',
        hours: 'Saturday Market: 8AM – 1PM',
        products: [
            { id: 'st-1', name: 'Falafel Plate (6 pcs)', price: 10.99, description: 'Crispy falafel with tahini sauce', category: 'Mains' },
            { id: 'st-2', name: 'Classic Hummus (500g)', price: 7.99, description: 'Silky smooth with olive oil and paprika', category: 'Dips & Spreads' },
            { id: 'st-3', name: 'Lamb Shawarma Wrap', price: 13.99, description: 'Slow-roasted lamb, garlic sauce, pickles', category: 'Mains' },
            { id: 'st-4', name: 'Baklava Box (12 pcs)', price: 14.99, description: 'Pistachio and walnut, honey-soaked', category: 'Sweets' },
            { id: 'st-5', name: 'Fattoush Salad', price: 8.99, description: 'Crispy pita, fresh vegetables, pomegranate', category: 'Salads' },
        ]
    },
    {
        id: 'sm-tuomo', name: "Tuomo's Stubbornly Finnish", category: 'Prepared Foods', emoji: '🇫🇮',
        badge: 'Old Country', coverColor: '#0d1420',
        tags: ['Traditional', 'Finnish Heritage', 'Handmade', 'Northern Soul'],
        description: 'Traditional Finnish dishes and pastries made with stubborn authenticity. A taste of the old country in Northern Ontario.',
        story: 'Tuomo is stubbornly Finnish — and proud of it. His family emigrated from Finland to Northern Ontario three generations ago, and he\'s determined to keep those culinary traditions alive. Every Karelian pie uses a traditional rye crust recipe that\'s older than Canada itself. His salmon soup is made with the same dill-forward technique his grandmother perfected on the shores of Lake Saimaa. In a world of fusion and shortcuts, Tuomo stubbornly refuses to change a thing.',
        locationDetail: 'Soo Saturday Market, 73 Brock St., Sault Ste. Marie',
        hours: 'Saturday Market: 8AM – 12:30PM',
        products: [
            { id: 'tf-1', name: 'Karelian Pies (4 pack)', price: 11.99, description: 'Rye crust with rice porridge filling', category: 'Pastries' },
            { id: 'tf-2', name: 'Salmon Soup (Lohikeitto)', price: 12.99, description: 'Creamy dill and salmon, classic Finnish', category: 'Soups' },
            { id: 'tf-3', name: 'Finnish Cinnamon Rolls (4)', price: 9.99, description: 'Cardamom-spiced, sugar-crusted', category: 'Pastries' },
            { id: 'tf-4', name: 'Lihapiirakka (Meat Pie)', price: 7.99, description: 'Deep-fried pastry with rice and meat', category: 'Savoury' },
        ]
    },
    {
        id: 'sm-collholm', name: 'Collholm Farm', category: 'Produce', emoji: '🌱',
        badge: 'Certified Organic', coverColor: '#0a1a0d',
        tags: ['Organic', 'Regenerative', 'Pesticide-Free', 'Microgreens'],
        description: 'Certified organic vegetables and herbs grown with regenerative practices. No pesticides, no shortcuts.',
        story: 'Collholm Farm practices regenerative agriculture — a method that doesn\'t just avoid harm, but actively heals the soil. Their fields are cover-cropped, composted, and rotated with meticulous care. The result is produce that\'s not just organic, but genuinely more nutritious and flavourful. Their microgreens are grown year-round in a solar-powered greenhouse, providing the Soo with fresh, living nutrition even in the depths of a Northern Ontario winter.',
        locationDetail: 'Rural Algoma District — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM · CSA boxes: Weekly pickup',
        products: [
            { id: 'cf-1', name: 'Organic Herb Bundle', price: 4.99, description: 'Basil, cilantro, parsley — fresh cut', category: 'Herbs' },
            { id: 'cf-2', name: 'Kale & Chard Mix (1 lb)', price: 5.99, description: 'Nutrient-dense leafy greens', category: 'Greens' },
            { id: 'cf-3', name: 'Garlic Bulbs (6 pack)', price: 6.99, description: 'Hardneck varieties, intensely flavourful', category: 'Vegetables' },
            { id: 'cf-4', name: 'Microgreens Tray', price: 7.99, description: 'Sunflower, pea shoots, and radish', category: 'Microgreens' },
        ]
    },
    {
        id: 'sm-cravings', name: 'Cravings by Paula', category: 'Baked Goods', emoji: '🧁',
        badge: 'Made with Love', coverColor: '#1a0a10',
        tags: ['Small-Batch', 'Handcrafted', 'Comfort Food', 'Sweet Treats'],
        description: 'Handcrafted desserts and treats made with love. Specializing in brownies, cookies, and sweet indulgences.',
        story: 'Paula\'s journey started in her kitchen, baking brownies for friends who couldn\'t stop asking for more. Word spread through the Soo like wildfire, and soon she was the go-to for every birthday, celebration, and "I just need something sweet" moment in the city. Her Triple Chocolate Brownies are legendary — fudgy, rich, and completely addictive. Every batch is small, every ingredient is measured with care, and every treat is made with the kind of love you can actually taste.',
        locationDetail: 'Home bakery, Sault Ste. Marie — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 12PM (or until sold out)',
        products: [
            { id: 'cp-1', name: 'Triple Chocolate Brownies (6)', price: 12.99, description: 'Fudgy, rich, with chocolate chips', category: 'Brownies' },
            { id: 'cp-2', name: 'Assorted Cookie Box (12)', price: 14.99, description: 'Chocolate chip, oatmeal, snickerdoodle', category: 'Cookies' },
            { id: 'cp-3', name: 'Lemon Bars (6 pack)', price: 10.99, description: 'Buttery crust, tangy lemon curd', category: 'Bars' },
            { id: 'cp-4', name: 'Salted Caramel Cupcakes (4)', price: 11.99, description: 'Vanilla cake, caramel buttercream', category: 'Cupcakes' },
        ]
    },
];

// ─── Local Artisans & Crafters ─────────────────────────
export const localArtisans = [
    {
        id: 'art-northshore', name: 'North Shore Pottery', category: 'Ceramics', emoji: '🏺',
        badge: 'Hand-Thrown', coverColor: '#1a1410',
        tags: ['Handmade', 'Stoneware', 'Functional Art', 'Local Clay'],
        description: 'Hand-thrown stoneware pottery inspired by the rugged beauty of Lake Superior\'s north shore.',
        story: 'Every piece begins as a lump of clay on a wheel in a small studio overlooking the St. Marys River. North Shore Pottery draws its inspiration from the colours and textures of the Canadian Shield — the iron reds of Algoma rock, the deep blues of Superior, the soft greys of birch bark. Each piece is thrown by hand, trimmed, glazed with custom formulas, and fired in a gas kiln to 2,300°F. No two pieces are ever identical, because this land never repeats itself either.',
        locationDetail: 'Studio on St. Marys River — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM · Studio visits by appointment',
        products: [
            { id: 'ns-1', name: 'Superior Blue Mug', price: 38.00, description: 'Hand-thrown stoneware mug, 14oz, inspired by Lake Superior', category: 'Mugs' },
            { id: 'ns-2', name: 'Algoma Red Bowl', price: 52.00, description: 'Iron-glazed serving bowl, 9" diameter', category: 'Bowls' },
            { id: 'ns-3', name: 'Birch Bark Vase', price: 68.00, description: 'Textured stoneware vase with birch-inspired glaze', category: 'Vases' },
            { id: 'ns-4', name: 'Espresso Cup Set (2)', price: 45.00, description: 'Matching pair of 4oz espresso cups', category: 'Cups' },
            { id: 'ns-5', name: 'Serving Platter', price: 85.00, description: 'Large oval platter, perfect for charcuterie', category: 'Platters' },
        ]
    },
    {
        id: 'art-wildwood', name: 'Wildwood Candle Co.', category: 'Candles & Scents', emoji: '🕯️',
        badge: 'Small-Batch', coverColor: '#14120d',
        tags: ['Soy Wax', 'Hand-Poured', 'Northern Scents', 'Eco-Friendly'],
        description: 'Hand-poured soy candles capturing the scents of Northern Ontario — campfire smoke, boreal forest, and wild herbs.',
        story: 'Wildwood Candle Co. was born on a winter night in Algoma, when the smell of wood smoke and fresh snow inspired founder Marie to capture the feeling of home in a candle. Each candle is hand-poured in small batches using 100% natural soy wax and cotton wicks. The scents are custom-blended — Boreal Forest layers balsam fir, cedar, and damp earth. Campfire mixes smoky birchwood with vanilla and amber. These aren\'t generic fragrances — they\'re love letters to this landscape.',
        locationDetail: 'Sault Ste. Marie studio — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM · Online: Always open',
        products: [
            { id: 'wc-1', name: 'Boreal Forest Candle (8oz)', price: 28.00, description: 'Balsam fir, cedar, damp earth — smells like a hike', category: 'Signature Scents' },
            { id: 'wc-2', name: 'Campfire Candle (8oz)', price: 28.00, description: 'Smoky birchwood, vanilla, and warm amber', category: 'Signature Scents' },
            { id: 'wc-3', name: 'Wild Blueberry Candle (8oz)', price: 28.00, description: 'Sweet wild berries with a hint of citrus', category: 'Seasonal' },
            { id: 'wc-4', name: 'Gift Set (3 votives)', price: 36.00, description: 'Trio of mini candles in a kraft gift box', category: 'Gift Sets' },
            { id: 'wc-5', name: 'Car Freshener — Boreal', price: 8.00, description: 'Wooden air freshener with essential oils', category: 'Accessories' },
        ]
    },
    {
        id: 'art-shieldcraft', name: 'Shield Craft Leather', category: 'Leatherwork', emoji: '🧳',
        badge: 'Master Craftsman', coverColor: '#1a0e06',
        tags: ['Full-Grain Leather', 'Hand-Stitched', 'Lifetime Warranty', 'Heirloom Quality'],
        description: 'Hand-stitched full-grain leather goods built to last generations. Wallets, belts, bags — all made in the Soo.',
        story: 'Dave learned leatherwork from his grandfather, who repaired harnesses for logging teams in the Algoma bush. Three generations later, Shield Craft Leather still uses the same hand-stitching techniques — saddle-stitched with waxed linen thread, punched hole by hole with a diamond chisel. Every wallet, belt, and bag is cut from premium full-grain leather that will develop a rich patina over years of use. In a world of fast fashion, Dave builds things your grandchildren will inherit.',
        locationDetail: 'Workshop in Sault Ste. Marie — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM · Custom orders: 4-6 week lead time',
        products: [
            { id: 'sl-1', name: 'Bifold Wallet', price: 85.00, description: 'Hand-stitched full-grain leather, 6 card slots', category: 'Wallets' },
            { id: 'sl-2', name: 'Classic Belt', price: 75.00, description: 'Full-grain leather belt with solid brass buckle', category: 'Belts' },
            { id: 'sl-3', name: 'Card Holder', price: 45.00, description: 'Slim 4-pocket card case, perfect front-pocket carry', category: 'Wallets' },
            { id: 'sl-4', name: 'Tote Bag', price: 195.00, description: 'Rugged full-grain tote with copper rivets', category: 'Bags' },
            { id: 'sl-5', name: 'Leather Keychain', price: 22.00, description: 'Stamped keychain with brass hardware', category: 'Accessories' },
        ]
    },
    {
        id: 'art-algomajewel', name: 'Algoma Jewellery', category: 'Jewellery', emoji: '💎',
        badge: 'One-of-a-Kind', coverColor: '#0d0f1a',
        tags: ['Sterling Silver', 'Lake Superior Stones', 'Nature-Inspired', 'Handcrafted'],
        description: 'Handcrafted sterling silver jewellery featuring Lake Superior agates and locally found stones.',
        story: 'Every piece in the Algoma Jewellery collection begins with a walk along the shore. Founder Elise has spent decades learning to read the beaches of Lake Superior — finding agates, jaspers, and beach glass that most people step over. Back in her workshop, she wraps each stone in hand-forged sterling silver wire or sets them in custom bezels. The result is jewellery that carries the lake within it — each stone polished by a thousand years of Superior waves.',
        locationDetail: 'Home studio, Sault Ste. Marie — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM',
        products: [
            { id: 'aj-1', name: 'Lake Superior Agate Pendant', price: 125.00, description: 'Bezel-set agate on sterling silver chain', category: 'Necklaces' },
            { id: 'aj-2', name: 'Beach Glass Earrings', price: 58.00, description: 'Frosted Superior beach glass in silver settings', category: 'Earrings' },
            { id: 'aj-3', name: 'Wire-Wrapped Ring', price: 68.00, description: 'Sterling silver ring with locally-found stone', category: 'Rings' },
            { id: 'aj-4', name: 'Charm Bracelet — Algoma', price: 95.00, description: 'Sterling chain with nature-inspired charms', category: 'Bracelets' },
            { id: 'aj-5', name: 'Raw Stone Studs', price: 42.00, description: 'Tiny natural stones in minimal silver settings', category: 'Earrings' },
        ]
    },
    {
        id: 'art-boreal', name: 'Boreal Woodworks', category: 'Woodcraft', emoji: '🪵',
        badge: 'Forest-to-Table', coverColor: '#12100a',
        tags: ['Reclaimed Wood', 'Live-Edge', 'Kitchen & Home', 'Sustainable'],
        description: 'Live-edge cutting boards, kitchen tools, and home goods crafted from reclaimed Northern Ontario hardwoods.',
        story: 'Boreal Woodworks rescues fallen trees that would otherwise rot on the forest floor. Every piece of maple, cherry, and walnut is milled, dried, and transformed into functional art in a small shop heated by the same sawdust the work produces. Their live-edge cutting boards are legendary at the market — each one a cross-section of a tree that grew for decades in the Algoma forest, now serving as the centrepiece of a family\'s kitchen. Nothing is wasted. Every offcut becomes a spatula, a coaster, or kindling.',
        locationDetail: 'Woodshop outside Sault Ste. Marie — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM · Custom orders welcome',
        products: [
            { id: 'bw-1', name: 'Live-Edge Cutting Board', price: 95.00, description: 'Maple or walnut, unique shape, food-safe finish', category: 'Kitchen' },
            { id: 'bw-2', name: 'Wooden Spatula Set (3)', price: 35.00, description: 'Cherry wood spatulas, hand-carved', category: 'Kitchen' },
            { id: 'bw-3', name: 'Coaster Set (4)', price: 28.00, description: 'Tree-round coasters with bark edge preserved', category: 'Home' },
            { id: 'bw-4', name: 'Salad Servers', price: 42.00, description: 'Hand-carved walnut serving spoon and fork', category: 'Kitchen' },
            { id: 'bw-5', name: 'Live-Edge Charcuterie Board', price: 120.00, description: 'Large serving board, 18–22" with natural edge', category: 'Kitchen' },
        ]
    },
    {
        id: 'art-woolfolk', name: 'Woolfolk Fibre Arts', category: 'Textiles', emoji: '🧶',
        badge: 'Hand-Knit', coverColor: '#1a1018',
        tags: ['Hand-Dyed Yarn', 'Knitted', 'Woven', 'Natural Fibres'],
        description: 'Hand-dyed yarns, knitted accessories, and woven textiles using natural fibres and Northern Ontario-inspired colours.',
        story: 'Claire dyes her yarn in a century-old farmhouse kitchen using a combination of natural dyes — onion skins for gold, black walnut husks for deep brown, indigo for the blue of a winter twilight. Her hand-knit toques, mitts, and scarves have become a staple of Soo winters — warm enough for -40° and beautiful enough to make you actually look forward to January. Each colourway is named after an Algoma landmark: Batchawana Sunset, Gros Cap Fog, Searchmont Snow.',
        locationDetail: 'Farmhouse studio, Bar River — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 12:30PM · Online shop: Always open',
        products: [
            { id: 'wf-1', name: 'Hand-Dyed Toque', price: 45.00, description: 'Merino wool, Batchawana Sunset colourway', category: 'Accessories' },
            { id: 'wf-2', name: 'Cable-Knit Mittens', price: 38.00, description: 'Double-layered for real Northern winters', category: 'Accessories' },
            { id: 'wf-3', name: 'Infinity Scarf', price: 55.00, description: 'Hand-knit loop scarf in natural fibres', category: 'Accessories' },
            { id: 'wf-4', name: 'Skein — Hand-Dyed Merino', price: 32.00, description: '100g fingering weight, various colourways', category: 'Yarn' },
            { id: 'wf-5', name: 'Woven Table Runner', price: 85.00, description: 'Loom-woven linen and cotton, 14" x 72"', category: 'Home Textiles' },
        ]
    },
    {
        id: 'art-inkstone', name: 'Inkstone Print Studio', category: 'Art & Prints', emoji: '🎨',
        badge: 'Fine Art Press', coverColor: '#0e0e14',
        tags: ['Linocut', 'Letterpress', 'Limited Edition', 'Nature Art'],
        description: 'Hand-printed linocut and letterpress art celebrating the wildlife and landscapes of Northern Ontario.',
        story: 'Inkstone Print Studio is where art meets craft meets obsession. Every print begins with a hand-carved linoleum block — sometimes weeks of carving for a single image. The subject is always Northern Ontario: moose silhouetted against a boreal sunset, the locks at the canal, the grain elevators on the waterfront. Each print is pulled by hand on a vintage Vandercook letterpress, numbered, signed, and limited to editions of 50. When they\'re gone, they\'re gone — and the block is retired.',
        locationDetail: 'Print studio, downtown Sault Ste. Marie — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 1PM · Studio open Fridays 12–5PM',
        products: [
            { id: 'ip-1', name: 'Moose Linocut Print (11x14)', price: 65.00, description: 'Limited edition, hand-pulled, signed and numbered', category: 'Prints' },
            { id: 'ip-2', name: 'Soo Locks Letterpress (8x10)', price: 48.00, description: 'Vintage letterpress print of the canal locks', category: 'Prints' },
            { id: 'ip-3', name: 'Boreal Forest Series (set of 3)', price: 120.00, description: 'Three coordinating nature prints, 5x7 each', category: 'Print Sets' },
            { id: 'ip-4', name: 'Greeting Card Pack (8)', price: 24.00, description: 'Letterpress cards featuring local scenes', category: 'Cards' },
            { id: 'ip-5', name: 'Custom Letterpress Sign', price: 150.00, description: 'Personalized wood-type print, up to 3 lines', category: 'Custom' },
        ]
    },
    {
        id: 'art-apothecary', name: 'Northern Apothecary', category: 'Wellness', emoji: '🌿',
        badge: 'Wild-Foraged', coverColor: '#0d1a10',
        tags: ['Organic', 'Wild-Harvested', 'Natural Skincare', 'Plant-Based'],
        description: 'Wild-foraged botanicals and handmade natural skincare products from the forests and meadows of Algoma.',
        story: 'Northern Apothecary began with a simple practice: walking into the Algoma forest and paying attention. Founder Nadia learned to identify wild plants from her Anishinaabe grandmother — balsam fir for salves, white cedar for tea, wild rose petals for face mist. Today, she harvests sustainably from private land near Searchmont, drying herbs, infusing oils, and hand-crafting small-batch skincare products that carry the healing power of the Northern Ontario forest. Every product is a connection to the land.',
        locationDetail: 'Foraging grounds near Searchmont — Soo Saturday Market, 73 Brock St.',
        hours: 'Saturday Market: 8AM – 12PM (seasonal availability)',
        products: [
            { id: 'na-1', name: 'Balsam Fir Salve (2oz)', price: 18.00, description: 'All-purpose healing salve, hand-infused', category: 'Salves & Balms' },
            { id: 'na-2', name: 'Wild Rose Face Mist', price: 24.00, description: 'Hydrating mist with wild-foraged rose petals', category: 'Face Care' },
            { id: 'na-3', name: 'Cedar & Lavender Soap', price: 12.00, description: 'Cold-process bar soap with essential oils', category: 'Soaps' },
            { id: 'na-4', name: 'Forest Bath Oil (4oz)', price: 32.00, description: 'Blend of spruce, cedar, and juniper in jojoba', category: 'Body' },
            { id: 'na-5', name: 'Herbal Tea — Winter Wellness', price: 14.00, description: 'White cedar, echinacea, and ginger blend', category: 'Tea' },
        ]
    },
];

// ─── Soo MRKT — Retail & Specialty Vendors ──────────────────────────────────
export const sooMrktRetailVendors = [
    {
        id: 'sm-broers', name: "Broer's Jansen", category: 'Bakery & Deli', emoji: '🧁',
        badge: 'Dutch Heritage', coverColor: '#1a1208',
        tags: ['Dutch', 'Bakery', 'Deli', 'Imported'],
        description: 'Traditional Dutch bakery and deli specializing in imported European goods and fresh-baked treats.',
        story: 'A taste of the Netherlands right in the Soo. Broer\'s Jansen has been bringing authentic Dutch baked goods and imported delicacies to Sault Ste. Marie for years.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sat: 9AM – 6PM',
        products: [
            { id: 'bj-1', name: 'Stroopwafel Pack', price: 6.99, description: 'Authentic Dutch caramel waffles', category: 'Baked Goods' },
            { id: 'bj-2', name: 'Dutch Cheese Selection', price: 14.99, description: 'Imported Gouda, Edam, and Leyden', category: 'Deli' },
            { id: 'bj-3', name: 'Speculaas Cookies', price: 5.99, description: 'Traditional spiced windmill cookies', category: 'Baked Goods' },
        ]
    },
    {
        id: 'sm-citymeat', name: 'City Meat Market', category: 'Butcher', emoji: '🥩',
        badge: 'Local Butcher', coverColor: '#1a0a0a',
        tags: ['Fresh Meat', 'Custom Cuts', 'Local', 'Sausage'],
        description: 'Full-service butcher shop with custom cuts, house-made sausages, and locally sourced meats.',
        story: 'City Meat Market is where the Soo goes for quality cuts. Their butchers will custom-cut anything to your specifications.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sat: 8AM – 6PM',
        products: [
            { id: 'cm-1', name: 'House Sausages (1 lb)', price: 9.99, description: 'Hand-made daily, rotating flavours', category: 'Sausages' },
            { id: 'cm-2', name: 'AAA Striploin Steak', price: 24.99, description: 'Premium cut, custom thickness', category: 'Beef' },
            { id: 'cm-3', name: 'Ground Beef (2 lb)', price: 14.99, description: 'Fresh-ground daily, lean blend', category: 'Beef' },
        ]
    },
    {
        id: 'sm-grocer4good', name: 'Grocer 4 Good', category: 'Grocery', emoji: '🛒',
        badge: 'Community', coverColor: '#0a1a0d',
        tags: ['Organic', 'Community', 'Affordable', 'Local'],
        description: 'Community-focused grocery bringing affordable, quality, and organic groceries to the Soo.',
        story: 'Grocer 4 Good believes everyone deserves access to healthy food. Their mission-driven model keeps prices fair while supporting local producers.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sun: 8AM – 9PM',
        products: [
            { id: 'g4g-1', name: 'Organic Produce Box', price: 24.99, description: 'Weekly selection of seasonal organic produce', category: 'Produce' },
            { id: 'g4g-2', name: 'Local Honey (500g)', price: 12.99, description: 'Raw wildflower honey from Algoma apiaries', category: 'Pantry' },
            { id: 'g4g-3', name: 'Artisan Bread Loaf', price: 5.99, description: 'Fresh-baked sourdough or whole wheat', category: 'Bakery' },
        ]
    },
    {
        id: 'sm-cafe4good', name: 'Cafe 4 Good', category: 'Café', emoji: '☕',
        badge: 'Social Enterprise', coverColor: '#1a1510',
        tags: ['Coffee', 'Community', 'Social Enterprise', 'Local Roast'],
        description: 'Community café roasting local coffee and serving baked goods with a mission to give back.',
        story: 'Every cup of coffee at Cafe 4 Good supports community programs. Paired with Grocer 4 Good, they\'re building a better food system for the Soo.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sat: 7AM – 5PM',
        products: [
            { id: 'c4g-1', name: 'House Blend Coffee (340g)', price: 14.99, description: 'Medium roast, locally roasted', category: 'Coffee' },
            { id: 'c4g-2', name: 'Cinnamon Bun', price: 4.99, description: 'Fresh-baked with cream cheese icing', category: 'Baked Goods' },
            { id: 'c4g-3', name: 'Chai Latte Mix', price: 9.99, description: 'House-blended spiced chai concentrate', category: 'Beverages' },
        ]
    },
    {
        id: 'sm-75pies', name: '75 Pies', category: 'Bakery', emoji: '🥧',
        badge: 'Pie Artisan', coverColor: '#1a0e0a',
        tags: ['Pies', 'Handmade', 'Seasonal', 'Comfort'],
        description: 'Handmade pies using local ingredients. From savoury to sweet, every pie is baked with love.',
        story: 'Named for the 75 original recipes the founder inherited from their grandmother, 75 Pies has become the Soo\'s go-to for handcrafted pastry.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Wed-Sun: 9AM – 5PM',
        products: [
            { id: '75p-1', name: 'Classic Apple Pie', price: 18.99, description: 'Double-crust with Algoma apples', category: 'Sweet Pies' },
            { id: '75p-2', name: 'Tourtière', price: 16.99, description: 'Traditional French-Canadian meat pie', category: 'Savoury Pies' },
            { id: '75p-3', name: 'Butter Tarts (6 pack)', price: 12.99, description: 'Runny-centre butter tarts, a Canadian classic', category: 'Tarts' },
        ]
    },
    {
        id: 'sm-tradingpost', name: 'The Trading Post', category: 'General Store', emoji: '🏪',
        badge: 'Local Goods', coverColor: '#14100a',
        tags: ['Local Goods', 'Gifts', 'Northern Ontario', 'Artisan'],
        description: 'Curated general store featuring Northern Ontario goods, local artisan products, and unique gifts.',
        story: 'The Trading Post celebrates everything made in and around the Soo — from maple syrup to handmade jewellery to locally printed art.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sat: 10AM – 6PM',
        products: [
            { id: 'tp-1', name: 'Algoma Maple Syrup (500ml)', price: 16.99, description: 'Grade A amber, locally tapped', category: 'Pantry' },
            { id: 'tp-2', name: 'Soo Candle Co. Candle', price: 24.99, description: 'Hand-poured soy candle, pine scent', category: 'Home' },
            { id: 'tp-3', name: 'Northern Ontario Gift Box', price: 39.99, description: 'Curated box of local favourites', category: 'Gifts' },
        ]
    },
    {
        id: 'sm-holycows', name: 'Holy Cows Ice Cream', category: 'Ice Cream', emoji: '🐄',
        badge: 'Handcrafted', coverColor: '#0a141a',
        tags: ['Ice Cream', 'Handmade', 'Local Dairy', 'Seasonal'],
        description: 'Small-batch handcrafted ice cream made with local dairy and creative seasonal flavours.',
        story: 'Holy Cows makes ice cream the way it should be — small batches, real ingredients, and flavours that change with the seasons.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Daily: 12PM – 9PM (seasonal)',
        products: [
            { id: 'hc-1', name: 'Pint — Salted Caramel', price: 8.99, description: 'Rich caramel with Maldon sea salt', category: 'Pints' },
            { id: 'hc-2', name: 'Pint — Wild Blueberry', price: 8.99, description: 'Made with local Northern Ontario berries', category: 'Pints' },
            { id: 'hc-3', name: 'Ice Cream Sandwich (4 pack)', price: 14.99, description: 'Chocolate chip cookies with vanilla ice cream', category: 'Novelties' },
        ]
    },
    {
        id: 'sm-lockcity', name: 'Lock City Dairy', category: 'Dairy', emoji: '🥛',
        badge: 'Local Dairy', coverColor: '#0e1a14',
        tags: ['Dairy', 'Local', 'Cheese', 'Artisan'],
        description: 'Artisan dairy products made from locally sourced milk. Cheese, butter, and fresh cream.',
        story: 'Named after the famous Soo Locks, Lock City Dairy brings the art of cheesemaking back to Northern Ontario.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sat: 9AM – 5PM',
        products: [
            { id: 'lcd-1', name: 'Aged Cheddar Block', price: 12.99, description: '12-month aged sharp cheddar', category: 'Cheese' },
            { id: 'lcd-2', name: 'Fresh Butter (250g)', price: 6.99, description: 'Hand-churned from local cream', category: 'Dairy' },
            { id: 'lcd-3', name: 'Cheese Curd Bag', price: 7.99, description: 'Fresh squeaky curds, perfect for poutine', category: 'Cheese' },
        ]
    },
    {
        id: 'sm-getfresh', name: "Pino's Get Fresh", category: 'Grocery', emoji: '🥦',
        badge: 'Fresh Market', coverColor: '#0d1a0a',
        tags: ['Fresh Produce', 'Grocery', 'Italian', 'Deli'],
        description: 'Premium fresh produce, Italian imports, and deli selections. The freshest in the Soo.',
        story: 'Pino\'s Get Fresh brings the Italian market experience to Sault Ste. Marie — hand-selected produce, imported cheeses, and deli meats cut to order.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sat: 8AM – 8PM · Sun: 10AM – 6PM',
        products: [
            { id: 'gf-1', name: 'Italian Deli Platter', price: 19.99, description: 'Prosciutto, capicola, sopressata, provolone', category: 'Deli' },
            { id: 'gf-2', name: 'Fresh Produce Box', price: 22.99, description: 'Hand-picked seasonal fruits and vegetables', category: 'Produce' },
            { id: 'gf-3', name: 'Imported Olive Oil (500ml)', price: 14.99, description: 'Extra virgin from Puglia, Italy', category: 'Pantry' },
        ]
    },
    {
        id: 'sm-foremost', name: 'Foremost Pets', category: 'Pet Supply', emoji: '🐾',
        badge: 'Pet Experts', coverColor: '#0a0e1a',
        tags: ['Pet Food', 'Local', 'Premium', 'Delivery'],
        description: 'Premium pet food and supplies delivered to your door. Because your pets deserve the best too.',
        story: 'Foremost Pets stocks the highest-quality food and supplies for dogs, cats, and small animals — plus expert advice from people who love animals.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sat: 9AM – 7PM · Sun: 10AM – 5PM',
        products: [
            { id: 'fp-1', name: 'Premium Dog Food (5kg)', price: 34.99, description: 'Grain-free, locally sourced ingredients', category: 'Dog' },
            { id: 'fp-2', name: 'Cat Food Variety Pack', price: 24.99, description: '12-pack wet food, assorted flavours', category: 'Cat' },
            { id: 'fp-3', name: 'Natural Dog Treats', price: 12.99, description: 'Single-ingredient dehydrated treats', category: 'Treats' },
        ]
    },
    {
        id: 'sm-kasdan', name: 'Kasdan', category: 'Fashion', emoji: '👗',
        badge: 'Boutique', coverColor: '#1a0a14',
        tags: ['Fashion', 'Boutique', 'Local', 'Accessories'],
        description: 'Curated fashion boutique featuring unique clothing and accessories from local and Canadian designers.',
        story: 'Kasdan brings boutique fashion to the Soo — thoughtfully curated pieces you won\'t find at the mall.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Sat: 10AM – 6PM',
        products: [
            { id: 'ks-1', name: 'Curated Gift Box', price: 49.99, description: 'Seasonal selection of boutique items', category: 'Gifts' },
            { id: 'ks-2', name: 'Locally Designed Tote', price: 24.99, description: 'Canvas tote with Northern Ontario print', category: 'Accessories' },
        ]
    },
    {
        id: 'sm-stones', name: "Stone's Office Supply", category: 'Office & Stationery', emoji: '📎',
        badge: 'Local Business', coverColor: '#0e0e14',
        tags: ['Office', 'Stationery', 'Local', 'Business Supply'],
        description: 'Locally owned office supply store serving the Soo\'s businesses and students for decades.',
        story: 'Stone\'s has been the Soo\'s go-to for office supplies, printing, and stationery since before the big box stores arrived — and they\'re still here.',
        locationDetail: 'Sault Ste. Marie, ON',
        hours: 'Mon-Fri: 8:30AM – 5:30PM · Sat: 9AM – 1PM',
        products: [
            { id: 'so-1', name: 'Premium Notebook Set', price: 16.99, description: 'Set of 3 hardcover journals', category: 'Stationery' },
            { id: 'so-2', name: 'Ink Cartridge Bundle', price: 29.99, description: 'Compatible with major printer brands', category: 'Printing' },
        ]
    },
];

// Utility functions
export const getRestaurantsByCategory = (categoryId) => {
    if (categoryId === 'all') return restaurants;
    return restaurants.filter(r => r.categoryId === categoryId);
};

export const getFeaturedRestaurants = () => {
    return restaurants.filter(r => r.isFeatured);
};

export const getRestaurantById = (id) => {
    return restaurants.find(r => r.id === id);
};

export const getVendorById = (id) => {
    return sooMrktVendors.find(v => v.id === id);
};

export const getArtisanById = (id) => {
    return localArtisans.find(a => a.id === id);
};

