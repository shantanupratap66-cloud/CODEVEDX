/* ==========================================
   WEATHER APP - JAVASCRIPT
   ========================================== */

/* ==========================================
   1. API CONFIGURATION & SETUP
   ========================================== */

/**
 * IMPORTANT: API KEY SECURITY
 * 
 * For this beginner project, we'll use a simple approach:
 * 1. Store API_KEY in a separate config (you'll provide it)
 * 2. For production: Use a backend server to hide the API key
 * 
 * DO NOT commit real API keys to GitHub!
 * Always use .gitignore to exclude sensitive data.
 */

// API Configuration
// You'll replace 'YOUR_API_KEY_HERE' with your actual OpenWeather API key
const API_KEY = '05c807ae4d6b4011a6e4c04cadecdd6b';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

/* ==========================================
   2. DOM ELEMENT REFERENCES
   ========================================== */

// Get references to HTML elements we'll manipulate
// This is better than selecting elements repeatedly
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const weatherSection = document.getElementById('weatherSection');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const forecastContainer = document.getElementById('forecastContainer');
const forecastSection = document.getElementById('forecastSection');
const themeToggle = document.getElementById('themeToggle');

/* ==========================================
   3. THEME/DARK MODE FUNCTIONALITY
   ========================================== */

/**
 * Initialize dark mode
 * Check if user previously selected dark mode and apply it
 */
function initializeDarkMode() {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('weatherAppTheme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️'; // Show sun icon when in dark mode
    }
}

/**
 * Toggle between dark and light mode
 * Saves preference to localStorage so it persists after refresh
 */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Update icon based on current mode
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('weatherAppTheme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('weatherAppTheme', 'light');
        themeToggle.textContent = '🌙';
    }
}

/* ==========================================
   4. UTILITY FUNCTIONS FOR UI MANAGEMENT
   ========================================== */

/**
 * Show loading indicator
 * Called when we start fetching data from API
 */
function showLoading() {
    loadingIndicator.classList.add('show');
    errorMessage.classList.remove('show');
    weatherSection.classList.remove('show');
    forecastSection.classList.remove('show');
}

/**
 * Hide loading indicator
 * Called when data fetch is complete
 */
function hideLoading() {
    loadingIndicator.classList.remove('show');
}

/**
 * Show error message to user
 * 
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    weatherSection.classList.remove('show');
    forecastSection.classList.remove('show');
    hideLoading();
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.remove('show');
}

/**
 * Show weather data section
 */
function showWeatherSection() {
    weatherSection.classList.add('show');
    hideError();
    hideLoading();
}

/**
 * Show forecast section
 */
function showForecastSection() {
    forecastSection.classList.add('show');
}

/* ==========================================
   5. API FETCH FUNCTIONS - EXPLAINED
   ========================================== */

/**
 * WHAT IS ASYNC/AWAIT AND FETCH?
 * 
 * fetch() - Gets data from a URL (like visiting a website in your browser)
 * await - "Wait for the response, then continue"
 * async - "This function uses await, so it's asynchronous"
 * 
 * Example flow:
 * 1. User clicks search → getWeatherData() is called
 * 2. fetch() starts requesting data (doesn't freeze app)
 * 3. await makes JavaScript wait for response
 * 4. Response arrives → we process it
 * 5. Display data on screen
 * 
 * Without async/await, the entire app would freeze while waiting!
 */

/**
 * Fetch current weather data from OpenWeather API
 * 
 * @param {string} city - City name to search for
 * @returns {object} Weather data object with temperature, humidity, etc.
 */
async function fetchCurrentWeather(city) {
    try {
        // Step 1: Build the API URL with city name and API key
        const url = `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
        
        // Step 2: FETCH - Send request to API
        // fetch() returns a Promise (something that will eventually give us data)
        const response = await fetch(url);
        
        // Step 3: Check if response is successful (status 200 = OK)
        if (!response.ok) {
            // If city not found or other error
            throw new Error(`Weather data not found. Status: ${response.status}`);
        }
        
        // Step 4: Convert response to JSON (readable format)
        // JSON is a standard format for data on the internet
        const weatherData = await response.json();
        
        // Step 5: Return the data to be used by other functions
        return weatherData;
        
    } catch (error) {
        // If any error occurs (network error, API error, etc.)
        // Handle it gracefully
        if (error.message.includes('404')) {
            throw new Error('City not found! Please check the name and try again.');
        }
        throw new Error(`Error fetching weather: ${error.message}`);
    }
}

/**
 * Fetch 5-day forecast data from OpenWeather API
 * 
 * @param {string} city - City name to search for
 * @returns {object} Forecast data containing 40 entries (8 per day, 5 days)
 */
async function fetchForecast(city) {
    try {
        // Build API URL for forecast
        // The forecast API returns data in 3-hour intervals
        const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Forecast data not found. Status: ${response.status}`);
        }
        
        const forecastData = await response.json();
        return forecastData;
        
    } catch (error) {
        throw new Error(`Error fetching forecast: ${error.message}`);
    }
}

/* ==========================================
   6. DATA PROCESSING FUNCTIONS
   ========================================== */

/**
 * Format date to readable format
 * Example: "Wed, Sep 03, 2025"
 * 
 * @param {number} timestamp - Unix timestamp from API
 * @returns {string} Formatted date string
 */
function formatDate(timestamp) {
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
}

/**
 * Format time to readable format
 * Example: "3:30 PM"
 * 
 * @param {number} timestamp - Unix timestamp from API
 * @returns {string} Formatted time string
 */
function formatTime(timestamp) {
    const options = { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    };
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', options);
}

/**
 * Extract daily forecast data from hourly data
 * API gives us 40 data points (3-hour intervals over 5 days)
 * We want 1 entry per day at noon (12:00)
 * 
 * @param {array} forecastList - Array of forecast data points
 * @returns {array} Filtered to show 1 entry per day
 */
function getDailyForecasts(forecastList) {
    // We want forecasts at noon (12:00) to show daytime weather
    // Filter list to get entries where hour is 12
    const dailyForecasts = [];
    
    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const hour = date.getHours();
        
        // Keep entries at 12:00 (noon)
        if (hour === 12) {
            dailyForecasts.push(forecast);
        }
    });
    
    return dailyForecasts;
}

/* ==========================================
   7. DISPLAY FUNCTIONS - UPDATE HTML
   ========================================== */

/**
 * Display current weather data on the screen
 * Takes the API response and puts values in HTML elements
 * 
 * @param {object} weatherData - Weather data from API
 */
function displayCurrentWeather(weatherData) {
    // Extract data from the API response
    // API structure: weatherData.main.temp, weatherData.wind.speed, etc.
    
    const city = weatherData.name;
    const country = weatherData.sys.country;
    const temperature = Math.round(weatherData.main.temp); // Round to nearest integer
    const feelsLike = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const pressure = weatherData.main.pressure;
    const visibility = (weatherData.visibility / 1000).toFixed(1); // Convert to km
    const description = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;
    const timestamp = weatherData.dt;
    
    // Get OpenWeather icon URL
    // API provides icons like "01d", "02d", etc.
    // These correspond to weather condition images
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
    // Update HTML elements with data
    // This is how we put data from JavaScript into the page
    document.getElementById('cityName').textContent = `${city}, ${country}`;
    document.getElementById('currentDate').textContent = formatDate(timestamp);
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('feelsLike').textContent = feelsLike;
    document.getElementById('weatherDescription').textContent = description;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${windSpeed.toFixed(1)} m/s`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('visibility').textContent = `${visibility} km`;
    
    // Show the weather section (it's hidden by default in CSS)
    showWeatherSection();
}

/**
 * Display 5-day forecast on the screen
 * 
 * @param {array} forecastList - Array of forecast data points
 */
function displayForecast(forecastList) {
    // Get daily forecasts (1 per day at noon)
    const dailyForecasts = getDailyForecasts(forecastList);
    
    // Clear previous forecast cards
    // This prevents duplicate cards when searching for a new city
    forecastContainer.innerHTML = '';
    
    // Loop through each day's forecast and create a card
    dailyForecasts.forEach(forecast => {
        // Extract data for this day
        const date = formatDate(forecast.dt);
        const temperature = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed.toFixed(1);
        
        // Create HTML for one forecast card
        // Template literals (backticks) make it easy to combine text and variables
        const forecastCard = `
            <div class="forecast-card">
                <div class="forecast-date">${date}</div>
                <img src="${iconUrl}" alt="${description}" class="forecast-icon">
                <div class="forecast-temp">${temperature}°C</div>
                <div class="forecast-description">${description}</div>
                <div class="forecast-details">
                    💧 ${humidity}%<br>
                    💨 ${windSpeed} m/s
                </div>
            </div>
        `;
        
        // Add this card to the forecast container
        // innerHTML += adds to existing content
        forecastContainer.innerHTML += forecastCard;
    });
    
    // Show the forecast section
    showForecastSection();
}

/* ==========================================
   8. MAIN FUNCTION - Orchestrate Everything
   ========================================== */

/**
 * Main weather search function
 * This is called when user submits the search form
 * Coordinates all other functions
 * 
 * @param {string} city - City name to search for
 */
async function getWeatherData(city) {
    // Trim whitespace from input
    city = city.trim();
    
    // Validate input - city name can't be empty
    if (!city) {
        showError('Please enter a city name!');
        return;
    }
    
    // Validate API key is configured
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('API key not configured! Please add your OpenWeather API key to the code.');
        return;
    }
    
    // Show loading indicator and hide previous data
    showLoading();
    
    try {
        // Fetch both current weather and forecast
        // await means "wait for both to complete"
        // Promise.all() runs them in parallel (faster than one after another)
        const [weatherData, forecastData] = await Promise.all([
            fetchCurrentWeather(city),
            fetchForecast(city)
        ]);
        
        // Display the data we received
        displayCurrentWeather(weatherData);
        displayForecast(forecastData.list);
        
    } catch (error) {
        // If any error occurred, show it to user
        showError(error.message);
    }
}

/* ==========================================
   9. EVENT LISTENERS - React to User Actions
   ========================================== */

/**
 * Event listeners connect user actions to functions
 * Think of them as: "When X happens, do Y"
 */

// When user submits search form
searchForm.addEventListener('submit', (event) => {
    // Prevent page from reloading (default form behavior)
    event.preventDefault();
    
    // Get the city name user typed
    const city = searchInput.value;
    
    // Fetch and display weather
    getWeatherData(city);
    
    // Clear the input field for next search
    searchInput.value = '';
});

// When user clicks dark mode toggle button
themeToggle.addEventListener('click', toggleDarkMode);

/* ==========================================
   10. INITIALIZATION ON PAGE LOAD
   ========================================== */

/**
 * Run when page first loads
 * Set up initial state of the app
 */
function initializeApp() {
    // Set dark mode based on saved preference
    initializeDarkMode();
    
    // Optional: Load a default city on page load
    // Uncomment if you want a city to show by default
    // getWeatherData('London');
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

/* ==========================================
   SUMMARY FOR BEGINNERS
   ==========================================
   
   1. ASYNC/AWAIT:
      - async functions can wait without freezing the app
      - await pauses that specific line until data arrives
      - Great for API calls!
   
   2. FETCH API:
      - fetch(url) sends a request to a web server
      - Returns a Promise (will eventually give you data)
      - .json() converts the response to usable format
   
   3. ERROR HANDLING:
      - try/catch prevents app from crashing
      - Catches network errors, API errors, etc.
      - Shows friendly message to user instead
   
   4. DOM MANIPULATION:
      - getElementById() finds HTML elements
      - .textContent, .innerHTML, .src update them
      - .classList.add/remove manage CSS classes
   
   5. EVENT LISTENERS:
      - addEventListener() makes app respond to user
      - Submit form, click button, etc.
      - Triggers functions based on user action
   
   ========================================== */
