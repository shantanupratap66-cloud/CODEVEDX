import { Link } from 'react-router-dom'

export default function Navbar({ favoritesCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">🎬 MovieDB</Link>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link favorites-link">
            Favorites
            <span className="favorites-count">{favoritesCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
