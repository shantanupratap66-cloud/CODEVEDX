# E-Commerce Product Page

A beginner-friendly e-commerce product listing and shopping cart application built with React and Vite.

## Project Description

This is a simple e-commerce website where users can browse products, view product details, add items to their shopping cart, and manage their cart. It demonstrates fundamental React concepts including components, state management with Context API, and routing with React Router.

## Features

- **Product Listing**: Display 8 sample products in a responsive grid layout
- **Product Details**: View detailed information about each product with a dedicated page
- **Shopping Cart**: Add products to cart, update quantities, and remove items
- **Cart Management**: Automatically updates cart count in navbar
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Simple & Clean UI**: Professional e-commerce layout using pure CSS

## Technologies Used

- **React** - UI library for building components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for navigation
- **Context API** - State management for shopping cart
- **CSS** - Responsive styling and layout

## Folder Structure

```
Task-3-E-Commerce/
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
├── README.md            # This file
│
└── src/
    ├── main.jsx         # React app entry point
    ├── App.jsx          # Main app component with routing
    ├── style.css        # Global styles and responsive design
    ├── data.js          # Sample product data
    ├── CartContext.jsx  # Cart state management
    │
    └── components/
        ├── Navbar.jsx        # Navigation bar with cart count
        ├── ProductCard.jsx   # Reusable product card component
        └── Cart.jsx          # Shopping cart page
```

## How to Install

1. Open terminal in the project folder
2. Run the following command:

```bash
npm install
```

This will install all required dependencies (React, React Router, etc.)

## How to Run the Project

To start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173/` (or another port if 5173 is in use).

## How to Build the Project

To create an optimized production build:

```bash
npm run build
```

The build files will be created in the `dist/` folder. You can then deploy this folder to any web server.

## Project Structure Explanation

### src/App.jsx
- Main application component
- Sets up routing with React Router
- Contains HomePage and ProductDetailsPage components
- Wraps entire app with CartProvider for state management

### src/CartContext.jsx
- Context API setup for cart state
- Functions: addToCart, removeFromCart, updateQuantity
- Provides cart total and count calculations
- useCart() hook for accessing cart state in components

### src/data.js
- Contains array of 8 sample products
- Each product has: id, name, price, image, description, category

### src/components/Navbar.jsx
- Navigation bar with logo and links
- Displays cart item count
- Sticky navigation (stays at top when scrolling)

### src/components/ProductCard.jsx
- Reusable component for displaying product in grid
- Shows image, name, category, description, price
- "View Details" button for product page
- "Add to Cart" button

### src/components/Cart.jsx
- Shopping cart page
- Shows all items in cart with images, prices, quantities
- Plus/Minus buttons to adjust quantities
- Remove button for each item
- Order summary with total calculation
- Empty cart state with link to home

### src/style.css
- All styles for the entire application
- Responsive breakpoints for mobile (480px), tablet (768px), desktop
- CSS Grid for products, flexbox for components
- Hover effects and transitions for better UX

## Features Explained

### Add to Cart Logic
- When a product is added to cart, the app checks if it already exists
- If yes, increases the quantity by 1
- If no, adds the product with quantity 1
- Cart count in navbar updates automatically

### Cart Calculations
- Subtotal: Sum of (price × quantity) for all items
- Total: Same as subtotal (shipping is free)
- All calculations are done in real-time

### Responsive Design
- Desktop (1200px+): 4 products per row
- Tablet (768px-1199px): 3 products per row
- Mobile (480px-767px): 1 product per row in card layout
- Mobile Small (<480px): 1 product per row in horizontal card layout

### Routing
- `/` - Home page with product listing
- `/product/:id` - Individual product detail page
- `/cart` - Shopping cart page

## How It Works

1. **Browse Products**: On the home page, see all products in a grid
2. **Add to Cart**: Click "Add to Cart" button on any product card
3. **View Details**: Click "View Details" to see full product information
4. **Manage Cart**: Go to cart page to update quantities or remove items
5. **Check Count**: Cart count in navbar updates automatically with every change

## Browser Compatibility

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a frontend-only application (no backend/database)
- All product data is hardcoded in data.js
- Cart state is stored in browser memory (resets on page refresh)
- The project uses Context API instead of Redux for simplicity
