// Sault Ste. Marie Restaurant Data — SOOber Eats
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
        reviewCount: 892,
        deliveryTime: '30-45',
        distance: 2.1,
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
        reviewCount: 634,
        deliveryTime: '25-40',
        distance: 3.2,
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
        reviewCount: 1124,
        deliveryTime: '25-35',
        distance: 1.8,
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
        reviewCount: 967,
        deliveryTime: '20-35',
        distance: 1.5,
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
        reviewCount: 756,
        deliveryTime: '25-40',
        distance: 2.4,
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
        reviewCount: 543,
        deliveryTime: '35-50',
        distance: 1.9,
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
        reviewCount: 412,
        deliveryTime: '35-50',
        distance: 2.0,
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
        reviewCount: 1089,
        deliveryTime: '20-30',
        distance: 1.0,
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
        reviewCount: 487,
        deliveryTime: '30-45',
        distance: 2.3,
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
        reviewCount: 528,
        deliveryTime: '15-25',
        distance: 1.4,
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
        reviewCount: 489,
        deliveryTime: '30-45',
        distance: 2.5,
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
        reviewCount: 376,
        deliveryTime: '35-50',
        distance: 2.6,
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
        reviewCount: 298,
        deliveryTime: '40-55',
        distance: 3.0,
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
        reviewCount: 834,
        deliveryTime: '20-30',
        distance: 1.6,
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
        reviewCount: 421,
        deliveryTime: '40-55',
        distance: 2.8,
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
        reviewCount: 612,
        deliveryTime: '25-35',
        distance: 2.8,
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
        reviewCount: 367,
        deliveryTime: '25-40',
        distance: 4.1,
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
        reviewCount: 256,
        deliveryTime: '40-55',
        distance: 5.2,
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
];

// ─── Soo MRKT Vendors ──────────────────────────────────
export const sooMrktVendors = [
    {
        id: 'sm-penokean', name: 'Penokean Hills Farms', category: 'Meats', description: 'Premium grass-fed beef and heritage pork from Algoma\'s pristine farmlands. All animals are ethically raised and hormone-free.', emoji: '🥩', products: [
            { id: 'ph-1', name: 'Grass-Fed Ribeye Steak', price: 28.99, description: '12oz AAA-grade ribeye, dry-aged 21 days' },
            { id: 'ph-2', name: 'Ground Beef (1 lb)', price: 9.99, description: 'Lean grass-fed ground beef, perfect for burgers' },
            { id: 'ph-3', name: 'Heritage Pork Chops', price: 16.99, description: 'Thick-cut bone-in chops, pack of 4' },
            { id: 'ph-4', name: 'Beef Tenderloin', price: 34.99, description: '8oz centre-cut filet mignon' },
            { id: 'ph-5', name: 'Smoked Bacon (500g)', price: 12.99, description: 'Maple-smoked heritage bacon' },
        ]
    },
    {
        id: 'sm-findlays', name: "Findlay's Fungus", category: 'Produce', description: 'Locally grown specialty mushrooms cultivated in controlled environments in the heart of Algoma. Unique varieties you won\'t find anywhere else.', emoji: '🍄', products: [
            { id: 'ff-1', name: 'Lion\'s Mane (200g)', price: 12.99, description: 'Brain-boosting gourmet mushroom' },
            { id: 'ff-2', name: 'Oyster Mushroom Mix (300g)', price: 8.99, description: 'Blue, pink, and golden oyster varieties' },
            { id: 'ff-3', name: 'Shiitake (250g)', price: 9.99, description: 'Rich, smoky flavour, locally grown' },
            { id: 'ff-4', name: 'Mushroom Growing Kit', price: 24.99, description: 'Grow your own oyster mushrooms at home' },
        ]
    },
    {
        id: 'sm-fruitful', name: 'Fruitful Hill Farm', category: 'Produce', description: 'Seasonal fruits and vegetables grown using sustainable farming practices. Picked fresh every Saturday morning for the market.', emoji: '🍎', products: [
            { id: 'fh-1', name: 'Seasonal Berry Box', price: 7.99, description: 'Mixed berries, changes with the season' },
            { id: 'fh-2', name: 'Heirloom Tomatoes (1 lb)', price: 5.99, description: 'Vine-ripened heritage varieties' },
            { id: 'fh-3', name: 'Mixed Greens Bag', price: 4.99, description: 'Fresh salad mix with micro-greens' },
            { id: 'fh-4', name: 'Root Vegetable Box', price: 11.99, description: 'Carrots, beets, parsnips, and turnips' },
        ]
    },
    {
        id: 'sm-hogans', name: "Hogan's Homestead", category: 'Meats', description: 'Free-range poultry and farm-fresh eggs from happy hens. All birds are pasture-raised with no antibiotics.', emoji: '🐔', products: [
            { id: 'hh-1', name: 'Free-Range Whole Chicken', price: 18.99, description: 'Pasture-raised, 3-4 lb bird' },
            { id: 'hh-2', name: 'Farm Fresh Eggs (dozen)', price: 6.99, description: 'Free-range, vibrant orange yolks' },
            { id: 'hh-3', name: 'Chicken Breast (1 lb)', price: 12.99, description: 'Boneless, skinless, air-chilled' },
            { id: 'hh-4', name: 'Duck Eggs (half dozen)', price: 8.99, description: 'Rich and creamy for baking' },
        ]
    },
    {
        id: 'sm-jenn', name: 'Jenn Bakes Cakes', category: 'Baked Goods', description: 'Artisan cakes, pastries, and desserts handcrafted with locally sourced ingredients. Custom orders welcome.', emoji: '🎂', products: [
            { id: 'jb-1', name: 'Signature Carrot Cake (slice)', price: 6.99, description: 'Cream cheese frosting, toasted walnuts' },
            { id: 'jb-2', name: 'Sourdough Loaf', price: 7.99, description: '48-hour fermented, crusty perfection' },
            { id: 'jb-3', name: 'Butter Croissants (4 pack)', price: 9.99, description: 'Flaky, laminated, pure butter' },
            { id: 'jb-4', name: 'Custom 6" Cake', price: 45.99, description: 'Choose your flavour and design' },
            { id: 'jb-5', name: 'Cinnamon Rolls (6 pack)', price: 14.99, description: 'Warm with cream cheese glaze' },
        ]
    },
    {
        id: 'sm-maple', name: 'Mountain Maple', category: 'Specialty', description: 'Pure Canadian maple syrup and artisan maple products from century-old sugar bushes in the Algoma Highlands.', emoji: '🍁', products: [
            { id: 'mm-1', name: 'Pure Maple Syrup (500ml)', price: 16.99, description: 'Grade A amber, rich taste' },
            { id: 'mm-2', name: 'Maple Butter (250g)', price: 11.99, description: 'Creamy, spreadable maple goodness' },
            { id: 'mm-3', name: 'Maple Candy Box', price: 8.99, description: 'Assorted pure maple leaf candies' },
            { id: 'mm-4', name: 'Maple BBQ Sauce', price: 9.99, description: 'Sweet and smoky, perfect for grilling' },
        ]
    },
    {
        id: 'sm-twisted', name: 'Northern Twisted Pizza', category: 'Prepared Foods', description: 'Wood-fired artisan pizzas made with house-pulled mozzarella and locally sourced toppings. Ready to eat or take-and-bake.', emoji: '🍕', products: [
            { id: 'nt-1', name: 'Margherita Pizza', price: 14.99, description: 'San Marzano, fresh mozza, basil' },
            { id: 'nt-2', name: 'Wild Mushroom Pizza', price: 16.99, description: 'Findlay\'s mushrooms, truffle oil, fontina' },
            { id: 'nt-3', name: 'Pepperoni & Honey', price: 15.99, description: 'Spicy pepperoni with hot honey drizzle' },
            { id: 'nt-4', name: 'Take & Bake Dough Ball', price: 5.99, description: 'Ready-to-bake pizza dough' },
        ]
    },
    {
        id: 'sm-saltspire', name: 'Saltspire Seafood', category: 'Seafood', description: 'Fresh Lake Superior fish, sustainably caught. Smoked in-house using traditional methods and local hardwoods.', emoji: '🐟', products: [
            { id: 'ss-1', name: 'Fresh Lake Trout Fillet', price: 18.99, description: 'Wild-caught, boneless, skin-on' },
            { id: 'ss-2', name: 'Smoked Whitefish (whole)', price: 22.99, description: 'Hot-smoked over maple wood' },
            { id: 'ss-3', name: 'Whitefish Dip (250g)', price: 9.99, description: 'Creamy smoked whitefish spread' },
            { id: 'ss-4', name: 'Pickerel Fillets (1 lb)', price: 24.99, description: 'Fresh-caught walleye, ready to cook' },
        ]
    },
    {
        id: 'sm-stock', name: 'Stock & Broth', category: 'Prepared Foods', description: 'House-made bone broths and artisan soups, slow-simmered for 24+ hours using bones from local farms.', emoji: '🍲', products: [
            { id: 'sb-1', name: 'Beef Bone Broth (750ml)', price: 12.99, description: '48-hour simmer, rich collagen' },
            { id: 'sb-2', name: 'Chicken Bone Broth (750ml)', price: 11.99, description: 'Free-range chicken, herbs, veggies' },
            { id: 'sb-3', name: 'Wild Mushroom Soup', price: 9.99, description: 'Creamy blend with local mushrooms' },
            { id: 'sb-4', name: 'Roasted Tomato Bisque', price: 8.99, description: 'Fire-roasted with fresh basil' },
        ]
    },
    {
        id: 'sm-syrian', name: 'Syrian Table', category: 'Prepared Foods', description: 'Authentic Syrian cuisine prepared with traditional family recipes. Fresh hummus, falafel, and more made daily.', emoji: '🧆', products: [
            { id: 'st-1', name: 'Falafel Plate (6 pcs)', price: 10.99, description: 'Crispy falafel with tahini sauce' },
            { id: 'st-2', name: 'Classic Hummus (500g)', price: 7.99, description: 'Silky smooth with olive oil and paprika' },
            { id: 'st-3', name: 'Lamb Shawarma Wrap', price: 13.99, description: 'Slow-roasted lamb, garlic sauce, pickles' },
            { id: 'st-4', name: 'Baklava Box (12 pcs)', price: 14.99, description: 'Pistachio and walnut, honey-soaked' },
            { id: 'st-5', name: 'Fattoush Salad', price: 8.99, description: 'Crispy pita, fresh vegetables, pomegranate' },
        ]
    },
    {
        id: 'sm-tuomo', name: "Tuomo's Stubbornly Finnish", category: 'Prepared Foods', description: 'Traditional Finnish dishes and pastries made with stubborn authenticity. A taste of the old country in Northern Ontario.', emoji: '🇫🇮', products: [
            { id: 'tf-1', name: 'Karelian Pies (4 pack)', price: 11.99, description: 'Rye crust with rice porridge filling' },
            { id: 'tf-2', name: 'Salmon Soup (Lohikeitto)', price: 12.99, description: 'Creamy dill and salmon, classic Finnish' },
            { id: 'tf-3', name: 'Finnish Cinnamon Rolls (4)', price: 9.99, description: 'Cardamom-spiced, sugar-crusted' },
            { id: 'tf-4', name: 'Lihapiirakka (Meat Pie)', price: 7.99, description: 'Deep-fried pastry with rice and meat' },
        ]
    },
    {
        id: 'sm-collholm', name: 'Collholm Farm', category: 'Produce', description: 'Certified organic vegetables and herbs grown with regenerative practices. No pesticides, no shortcuts.', emoji: '🌱', products: [
            { id: 'cf-1', name: 'Organic Herb Bundle', price: 4.99, description: 'Basil, cilantro, parsley — fresh cut' },
            { id: 'cf-2', name: 'Kale & Chard Mix (1 lb)', price: 5.99, description: 'Nutrient-dense leafy greens' },
            { id: 'cf-3', name: 'Garlic Bulbs (6 pack)', price: 6.99, description: 'Hardneck varieties, intensely flavourful' },
            { id: 'cf-4', name: 'Microgreens Tray', price: 7.99, description: 'Sunflower, pea shoots, and radish' },
        ]
    },
    {
        id: 'sm-cravings', name: 'Cravings by Paula', category: 'Baked Goods', description: 'Handcrafted desserts and treats made with love. Specializing in brownies, cookies, and sweet indulgences.', emoji: '🧁', products: [
            { id: 'cp-1', name: 'Triple Chocolate Brownies (6)', price: 12.99, description: 'Fudgy, rich, with chocolate chips' },
            { id: 'cp-2', name: 'Assorted Cookie Box (12)', price: 14.99, description: 'Chocolate chip, oatmeal, snickerdoodle' },
            { id: 'cp-3', name: 'Lemon Bars (6 pack)', price: 10.99, description: 'Buttery crust, tangy lemon curd' },
            { id: 'cp-4', name: 'Salted Caramel Cupcakes (4)', price: 11.99, description: 'Vanilla cake, caramel buttercream' },
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
