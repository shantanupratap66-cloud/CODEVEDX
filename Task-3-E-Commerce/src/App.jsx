import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import { CartProvider } from './CartContext'
import { products } from './data'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import { useCart } from './CartContext'

// Home Page Component
function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to E-Shop</h1>
        <p>Discover amazing products at great prices</p>
      </div>
      <div className="products-container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

// Product Details Page Component
function ProductDetailsPage() {
  const { addToCart } = useCart()
  const { id } = useParams()
  const productId = parseInt(id)
  const product = products.find(p => p.id === productId)

  if (!product) {
    return (
      <div className="product-details-page">
        <div className="not-found">
          <h2>Product Not Found</h2>
          <p>Sorry, the product you are looking for does not exist.</p>
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="product-details-page">
      <a href="/" className="back-button">← Back to Home</a>
      <div className="product-details-container">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-details-info">
          <h1>{product.name}</h1>
          <p className="product-details-category">Category: {product.category}</p>
          <p className="product-details-price">${product.price.toFixed(2)}</p>
          <p className="product-details-description">{product.description}</p>
          <button onClick={handleAddToCart} className="btn btn-primary btn-large">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

function AppContent() {
  return (
    <Router>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </Router>
  )
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  )
}
