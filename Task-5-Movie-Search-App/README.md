# Movie Search App

A beginner-friendly movie search application built with React and Vite, powered by The Movie Database (TMDB) API.

## Project Description

This is a movie search application where users can search for movies using the TMDB API, view detailed information about each movie, and save their favorite movies to a local list using browser LocalStorage. It demonstrates fundamental React concepts including routing with React Router, state management with hooks, and data persistence.

## Features

- **Movie Search**: Search for movies by title using the TMDB API
- **Movie Details**: View comprehensive information about each movie including overview, genres, runtime, and rating
- **Favorites**: Add and remove movies from your favorites list
- **Persistent Storage**: Favorites are saved in the browser's LocalStorage and persist after refresh
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Shows loading indicators while fetching data from the API
- **Error Handling**: Displays user-friendly error messages for failed API requests
- **Modern UI**: Clean and professional movie app design with smooth animations

## Technologies Used

- **React** - UI library for building components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for navigation
- **TMDB API** - External API for movie data
- **LocalStorage** - Browser storage for favorites persistence
- **CSS** - Responsive styling and layout

## Folder Structure

```
Task-5-Movie-Search-App/
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
├── README.md               # This file
├── .env.example            # Example environment variable file
├── .gitignore              # Git ignore file
│
└── src/
    ├── main.jsx            # React app entry point
    ├── App.jsx             # Main app component with routing
    ├── style.css           # Global styles and responsive design
    ├── api.js              # TMDB API functions
    │
    └── components/
        ├── Navbar.jsx      # Navigation bar with favorites count
        └── MovieCard.jsx   # Reusable movie card component
```

## TMDB API Setup

This project uses the free TMDB API to fetch movie data. Follow these steps to get started:

### 1. Get Your API Key

1. Visit [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Create a free account (if you don't have one)
3. Apply for an API key and accept the terms
4. Copy your API key

### 2. Create .env File

1. In the root project folder, create a file named `.env` (not `.env.example`)
2. Add your API key:

```
VITE_TMDB_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your actual TMDB API key.

### 3. Important Security Notes

- **Never commit your `.env` file to Git**
- **Never share your API key publicly**
- The `.gitignore` file is configured to prevent accidentally pushing your `.env` file
- The `.env.example` file is a template showing what variables you need

## How to Install

1. Open terminal in the project folder
2. Run the following command:

```bash
npm install
```

This will install all required dependencies (React, React Router, Vite, etc.)

## How to Run the Project

1. Make sure you have created the `.env` file with your TMDB API key (see TMDB API Setup section above)
2. Start the development server:

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
- Sets up React Router with three routes: `/`, `/movie/:id`, `/favorites`
- Manages favorites state using `useState` and `useEffect`
- Persists favorites to LocalStorage
- Contains HomePage, MovieDetailsPage, and FavoritesPage components

### src/api.js
- Contains all TMDB API functions
- `searchMovies()` - Searches for movies by title
- `getMovieDetails()` - Fetches detailed information about a specific movie
- `getPosterUrl()` - Constructs poster image URLs
- `getBackdropUrl()` - Constructs backdrop image URLs
- Error handling for API requests

### src/components/Navbar.jsx
- Navigation bar with logo and links
- Displays favorites count
- Links to Home and Favorites pages
- Sticky navigation (stays at top when scrolling)

### src/components/MovieCard.jsx
- Reusable component for displaying movie in grid
- Shows poster image, title, release year, rating
- Add/Remove favorite button
- "View Details" button linking to movie details page

### src/style.css
- All styles for the entire application
- Modern dark theme suitable for a movie app
- Responsive breakpoints for mobile (480px), tablet (768px), desktop
- CSS Grid for movie grid layout, flexbox for components
- Hover effects, transitions, and smooth animations
- Placeholder images for missing posters

## How It Works

### Home Page
1. User enters a movie title in the search box
2. Click the "Search" button or press Enter
3. The app fetches movies from TMDB API
4. Results display as responsive movie cards
5. Each card shows poster, title, year, and rating
6. User can add/remove movies from favorites with the heart button
7. "View Details" button opens the movie details page

### Movie Details Page
1. Shows a large backdrop image at the top
2. Displays poster, title, year, rating, runtime
3. Shows movie genres as tags
4. Displays full movie overview/description
5. "Add/Remove Favorites" button to manage favorites
6. "Back to Home" button to return to search

### Favorites Page
1. Displays all favorite movies
2. Uses the same MovieCard component as home page
3. Shows favorites count in navbar
4. If no favorites exist, shows empty state message
5. Favorites persist after browser refresh

### API Integration
- `searchMovies()` uses TMDB search endpoint with user query
- `getMovieDetails()` fetches full movie information by ID
- Both functions handle errors gracefully
- API key is stored in `.env` file and never exposed in code

### LocalStorage
- Favorites array is saved to LocalStorage when modified
- Favorites are loaded from LocalStorage on app startup
- Favorites persist across browser sessions

## Features Explained

### Search Functionality
- User types movie title and clicks search or presses Enter
- TMDB API is called with the search query
- Results display as movie cards in a responsive grid
- "No movies found" message if search returns no results

### Movie Card
- Shows poster image (with placeholder if unavailable)
- Movie title, release year, and rating
- Heart button to add/remove from favorites
- "View Details" button to open detail page

### Favorites Management
- Click heart on any movie card to add to favorites
- Heart fills in red when movie is favorited
- Favorites count shows in navbar
- Favorites page shows all saved movies
- Can remove favorites from favorites page

### Error Handling
- "Loading..." message while fetching API data
- Error message displays if API request fails
- "No movies found" message for empty search results
- "Movie not found" page if movie details fail to load
- Placeholder images for missing posters

## Browser Compatibility

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a frontend-only application (no backend)
- All data comes from the TMDB API
- No authentication required (free API key)
- Favorites are stored locally in the browser (not synced across devices)
- Cart state resets if browser storage is cleared

## Troubleshooting

### "API key is invalid" error
- Make sure you have created the `.env` file (not `.env.example`)
- Verify your API key is correct in the `.env` file
- Restart the dev server after adding the `.env` file

### "Cannot find module" error
- Run `npm install` to install dependencies
- Make sure you're in the correct project folder

### Movies not loading
- Check your internet connection
- Verify the TMDB API is working by visiting their website
- Check browser console (F12) for error messages
