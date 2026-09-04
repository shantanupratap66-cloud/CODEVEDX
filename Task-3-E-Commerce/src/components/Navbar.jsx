import { Link } from 'react-router-dom'
import { useCart } from '../CartContext'

export default function Navbar() {
  const { getCartCount } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">E-Shop</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            Cart
            <span className="cart-count">{getCartCount()}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
