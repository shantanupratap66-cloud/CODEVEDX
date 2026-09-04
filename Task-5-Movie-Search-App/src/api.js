const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

// Search movies by query
export async function searchMovies(query) {
  if (!query.trim()) {
    return { results: [], error: null }
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }

    const data = await response.json()
    return { results: data.results || [], error: null }
  } catch (error) {
    console.error('Search error:', error)
    return { results: [], error: error.message }
  }
}

// Get movie details by ID
export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch movie details')
    }

    const data = await response.json()
    return { movie: data, error: null }
  } catch (error) {
    console.error('Details error:', error)
    return { movie: null, error: error.message }
  }
}

// Get image URL for poster
export function getPosterUrl(posterPath) {
  if (!posterPath) {
    return 'https://via.placeholder.com/300x450?text=No+Image'
  }
  return `https://image.tmdb.org/t/p/w300${posterPath}`
}

// Get backdrop URL for movie details
export function getBackdropUrl(backdropPath) {
  if (!backdropPath) {
    return 'https://via.placeholder.com/1200x600?text=No+Image'
  }
  return `https://image.tmdb.org/t/p/w1280${backdropPath}`
}
