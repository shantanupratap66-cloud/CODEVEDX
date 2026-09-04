import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MovieCard from './components/MovieCard'
import { searchMovies, getMovieDetails, getBackdropUrl } from './api'

// Home Page Component
function HomePage({ favorites, onAddFavorite, onRemoveFavorite }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setSearched(true)

    const { results, error: apiError } = await searchMovies(searchQuery)

    if (apiError) {
      setError(apiError)
      setMovies([])
    } else {
      setMovies(results)
    }

    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId)
  }

  return (
    <div className="home-page">
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>

      {error && <div className="error">⚠️ Error: {error}</div>}

      {loading && <div className="loading">Loading movies...</div>}

      {searched && !loading && movies.length === 0 && !error && (
        <div className="no-results">No movies found. Try a different search.</div>
      )}

      {movies.length > 0 && (
        <div className="movies-container">
          {movies.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onAddFavorite={onAddFavorite}
              onRemoveFavorite={onRemoveFavorite}
              isFavorite={isFavorite(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Movie Details Page Component
function MovieDetailsPage({ favorites, onAddFavorite, onRemoveFavorite }) {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      const { movie: movieData, error: apiError } = await getMovieDetails(id)

      if (apiError) {
        setError(apiError)
        setMovie(null)
      } else {
        setMovie(movieData)
      }

      setLoading(false)
    }

    fetchMovie()
  }, [id])

  if (loading) {
    return <div className="loading">Loading movie details...</div>
  }

  if (error || !movie) {
    return (
      <div className="not-found">
        <h2>Movie Not Found</h2>
        <p>Sorry, we couldn't load this movie.</p>
        <a href="/" className="btn btn-primary">Back to Home</a>
      </div>
    )
  }

  const isFavorite = favorites.some(fav => fav.id === movie.id)

  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFavorite(movie.id)
    } else {
      onAddFavorite(movie)
    }
  }

  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A'
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

  return (
    <div className="movie-details-page">
      <a href="/" className="back-button">← Back to Home</a>

      <div
        className="movie-details-header"
        style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }}
      >
        <div className="movie-details-overlay"></div>
      </div>

      <div className="movie-details-container">
        <div className="movie-details-poster">
          <img
            src={getBackdropUrl(movie.poster_path)}
            alt={movie.title}
          />
        </div>

        <div className="movie-details-info">
          <h1>{movie.title}</h1>

          <div className="movie-meta">
            <div className="meta-item">
              <span className="meta-label">Year:</span>
              <span className="meta-value">{releaseYear}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Rating:</span>
              <span className="meta-value">⭐ {rating}</span>
            </div>
            {movie.runtime && (
              <div className="meta-item">
                <span className="meta-label">Runtime:</span>
                <span className="meta-value">{movie.runtime} min</span>
              </div>
            )}
          </div>

          {movie.genres && movie.genres.length > 0 && (
            <div className="movie-genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {movie.overview && (
            <div className="movie-overview">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>
          )}

          <div className="movie-actions">
            <a href="/" className="btn btn-secondary btn-large">
              Back to Home
            </a>
            <button
              onClick={handleFavoriteClick}
              className="btn btn-primary btn-large"
            >
              {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Favorites Page Component
function FavoritesPage({ favorites, onRemoveFavorite }) {
  const isFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId)
  }

  return (
    <div className="favorites-page">
      <h1>My Favorite Movies</h1>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No favorite movies yet.</h2>
          <p>Search for movies and add them to your favorites!</p>
          <a href="/" className="btn btn-primary">Browse Movies</a>
        </div>
      ) : (
        <div className="movies-container">
          {favorites.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemoveFavorite={onRemoveFavorite}
              onAddFavorite={() => {}} // Not needed on favorites page
              isFavorite={isFavorite(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// App Content Component
function AppContent({ favorites, onAddFavorite, onRemoveFavorite }) {
  return (
    <Router>
      <Navbar favoritesCount={favorites.length} />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                favorites={favorites}
                onAddFavorite={onAddFavorite}
                onRemoveFavorite={onRemoveFavorite}
              />
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetailsPage
                favorites={favorites}
                onAddFavorite={onAddFavorite}
                onRemoveFavorite={onRemoveFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                favorites={favorites}
                onRemoveFavorite={onRemoveFavorite}
              />
            }
          />
        </Routes>
      </main>
    </Router>
  )
}

// Main App Component
export default function App() {
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from LocalStorage on initial render
    const saved = localStorage.getItem('movieFavorites')
    return saved ? JSON.parse(saved) : []
  })

  // Save favorites to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites))
  }, [favorites])

  const handleAddFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === movie.id)
      if (!exists) {
        return [...prev, movie]
      }
      return prev
    })
  }

  const handleRemoveFavorite = (movieId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== movieId))
  }

  return (
    <AppContent
      favorites={favorites}
      onAddFavorite={handleAddFavorite}
      onRemoveFavorite={handleRemoveFavorite}
    />
  )
}
