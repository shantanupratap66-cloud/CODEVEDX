(function () {
    const products = [
        {
            id: 'aurora-headphones',
            name: 'Aurora Wireless Headphones',
            category: 'Electronics',
            price: 79.99,
            originalPrice: 119.99,
            discount: 33,
            rating: 4.8,
            image: 'assets/images/headphones.svg',
            description: 'Noise-isolating wireless headphones with cushioned ear cups, clear microphones, and up to 36 hours of listening time.',
            stock: 24,
            isFeatured: true,
            isBestSeller: true,
            createdAt: '2026-08-18'
        },
        {
            id: 'nova-smart-watch',
            name: 'Nova Smart Watch',
            category: 'Electronics',
            price: 129.99,
            originalPrice: 169.99,
            discount: 24,
            rating: 4.7,
            image: 'assets/images/smart-watch.svg',
            description: 'A sleek smartwatch with activity tracking, message previews, heart-rate monitoring, and a bright always-on display.',
            stock: 18,
            isFeatured: true,
            isBestSeller: true,
            createdAt: '2026-08-26'
        },
        {
            id: 'keyflow-keyboard',
            name: 'KeyFlow Mechanical Keyboard',
            category: 'Electronics',
            price: 94.99,
            originalPrice: 129.99,
            discount: 27,
            rating: 4.6,
            image: 'assets/images/keyboard.svg',
            description: 'Compact mechanical keyboard with tactile switches, soft white backlighting, and wireless multi-device pairing.',
            stock: 31,
            isFeatured: false,
            isBestSeller: true,
            createdAt: '2026-07-30'
        },
        {
            id: 'trailflex-sneakers',
            name: 'TrailFlex Everyday Sneakers',
            category: 'Fashion',
            price: 64.99,
            originalPrice: 89.99,
            discount: 28,
            rating: 4.5,
            image: 'assets/images/sneakers.svg',
            description: 'Lightweight sneakers with breathable knit panels, grippy soles, and all-day cushioning for daily movement.',
            stock: 42,
            isFeatured: true,
            isBestSeller: false,
            createdAt: '2026-08-12'
        },
        {
            id: 'cloudsoft-jacket',
            name: 'CloudSoft Denim Jacket',
            category: 'Fashion',
            price: 74.99,
            originalPrice: 99.99,
            discount: 25,
            rating: 4.4,
            image: 'assets/images/jacket.svg',
            description: 'A soft stretch-denim jacket with a relaxed fit, polished stitching, and easy layering for every season.',
            stock: 16,
            isFeatured: false,
            isBestSeller: false,
            createdAt: '2026-06-21'
        },
        {
            id: 'solace-sunglasses',
            name: 'Solace Polarized Sunglasses',
            category: 'Fashion',
            price: 39.99,
            originalPrice: 59.99,
            discount: 33,
            rating: 4.3,
            image: 'assets/images/sunglasses.svg',
            description: 'Polarized everyday sunglasses with UV protection, lightweight frames, and a classic unisex silhouette.',
            stock: 38,
            isFeatured: false,
            isBestSeller: false,
            createdAt: '2026-05-25'
        },
        {
            id: 'urban-backpack',
            name: 'Urban Commuter Backpack',
            category: 'Travel',
            price: 58.99,
            originalPrice: 84.99,
            discount: 31,
            rating: 4.7,
            image: 'assets/images/backpack.svg',
            description: 'Water-resistant commuter backpack with padded laptop storage, smart pockets, and a luggage pass-through.',
            stock: 22,
            isFeatured: true,
            isBestSeller: true,
            createdAt: '2026-08-03'
        },
        {
            id: 'ember-desk-lamp',
            name: 'Ember LED Desk Lamp',
            category: 'Home',
            price: 44.99,
            originalPrice: 69.99,
            discount: 36,
            rating: 4.6,
            image: 'assets/images/desk-lamp.svg',
            description: 'Adjustable LED desk lamp with warm and cool light modes, touch dimming, and a space-saving metal base.',
            stock: 27,
            isFeatured: true,
            isBestSeller: false,
            createdAt: '2026-07-16'
        },
        {
            id: 'brewpro-coffee-maker',
            name: 'BrewPro Coffee Maker',
            category: 'Home',
            price: 89.99,
            originalPrice: 129.99,
            discount: 31,
            rating: 4.8,
            image: 'assets/images/coffee-maker.svg',
            description: 'Programmable coffee maker with a thermal carafe, reusable filter basket, and rich brew strength control.',
            stock: 13,
            isFeatured: false,
            isBestSeller: true,
            createdAt: '2026-07-03'
        },
        {
            id: 'craft-desk-organizer',
            name: 'Craft Desk Organizer Set',
            category: 'Home',
            price: 27.99,
            originalPrice: 39.99,
            discount: 30,
            rating: 4.2,
            image: 'assets/images/desk-organizer.svg',
            description: 'Modular desk organizer with trays, pen storage, and cable slots to keep workspaces clean and focused.',
            stock: 45,
            isFeatured: false,
            isBestSeller: false,
            createdAt: '2026-06-08'
        },
        {
            id: 'freshmix-blender',
            name: 'FreshMix Portable Blender',
            category: 'Kitchen',
            price: 49.99,
            originalPrice: 74.99,
            discount: 33,
            rating: 4.5,
            image: 'assets/images/blender.svg',
            description: 'Rechargeable portable blender with stainless blades, leak-safe lid, and a cup-sized design for smoothies on the go.',
            stock: 29,
            isFeatured: true,
            isBestSeller: false,
            createdAt: '2026-08-30'
        },
        {
            id: 'align-yoga-mat',
            name: 'Align Non-Slip Yoga Mat',
            category: 'Fitness',
            price: 34.99,
            originalPrice: 49.99,
            discount: 30,
            rating: 4.6,
            image: 'assets/images/yoga-mat.svg',
            description: 'Cushioned non-slip yoga mat with alignment markers, textured grip, and a carry strap for studio or home sessions.',
            stock: 34,
            isFeatured: false,
            isBestSeller: true,
            createdAt: '2026-08-07'
        }
    ];

    const categories = Array.from(new Set(products.map(product => product.category))).sort();

    function formatCurrency(value) {
        return `$${Number(value).toFixed(2)}`;
    }

    function getProductById(productId) {
        return products.find(product => product.id === productId);
    }

    function escapeHTML(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function getUrlParams() {
        return new URLSearchParams(window.location.search);
    }

    window.StoreData = {
        products,
        categories
    };

    window.StoreUtils = {
        formatCurrency,
        getProductById,
        escapeHTML,
        getUrlParams
    };
})();
