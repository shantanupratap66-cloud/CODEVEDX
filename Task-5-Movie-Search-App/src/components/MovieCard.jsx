import { Link } from 'react-router-dom'
import { getPosterUrl } from '../api'

export default function MovieCard({ movie, onAddFavorite, onRemoveFavorite, isFavorite }) {
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
    <div className="movie-card">
      <div className="movie-poster">
        <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
        <div className="movie-overlay">
          <Link to={`/movie/${movie.id}`} className="btn btn-secondary">
            View Details
          </Link>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-year">{releaseYear}</p>
        <div className="movie-footer">
          <span className="movie-rating">⭐ {rating}</span>
          <button
            onClick={handleFavoriteClick}
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  )
}
