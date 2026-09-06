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
const API_KEY = '6f06b42f7562d478cfa189f41bc2baa5';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

/* ==========================================
   2. DOM ELEMENT REFERENCES
   ========================================== */

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

function initializeDarkMode() {
    const savedTheme = localStorage.getItem('weatherAppTheme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
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

function showLoading() {
    loadingIndicator.classList.add('show');
    errorMessage.classList.remove('show');
    weatherSection.classList.remove('show');
    forecastSection.classList.remove('show');
}

function hideLoading() {
    loadingIndicator.classList.remove('show');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    weatherSection.classList.remove('show');
    forecastSection.classList.remove('show');
    hideLoading();
}

function hideError() {
    errorMessage.classList.remove('show');
}

function showWeatherSection() {
    weatherSection.classList.add('show');
    hideError();
    hideLoading();
}

function showForecastSection() {
    forecastSection.classList.add('show');
}

/* ==========================================
   5. API FETCH FUNCTIONS
   ========================================== */

async function fetchCurrentWeather(city) {
    try {
        const url = `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Weather data not found. Status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        if (error.message.includes('404')) {
            throw new Error('City not found! Please check the name and try again.');
        }
        throw new Error(`Error fetching weather: ${error.message}`);
    }
}

async function fetchForecast(city) {
    try {
        const url = `${FORECAST_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Forecast data not found. Status: ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        throw new Error(`Error fetching forecast: ${error.message}`);
    }
}

/* ==========================================
   6. DATA PROCESSING FUNCTIONS
   ========================================== */

function formatDate(timestamp) {
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return new Date(timestamp * 1000).toLocaleDateString('en-US', options);
}

function formatTime(timestamp) {
    const options = { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    };
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', options);
}

/**
 * FIXED: Extract daily forecast data
 * Instead of relying on exact local hours which break across timezones,
 * we jump by 8 items since the API provides a 3-hour interval (24 / 3 = 8).
 */
function getDailyForecasts(forecastList) {
    const dailyForecasts = [];
    
    // Loop through the 40 items, skipping 8 at a time to get exactly 1 per day
    for (let i = 0; i < forecastList.length; i += 8) {
        dailyForecasts.push(forecastList[i]);
    }
    
    return dailyForecasts;
}

/* ==========================================
   7. DISPLAY FUNCTIONS - UPDATE HTML
   ========================================== */

function displayCurrentWeather(weatherData) {
    const city = weatherData.name;
    const country = weatherData.sys.country;
    const temperature = Math.round(weatherData.main.temp);
    const feelsLike = Math.round(weatherData.main.feels_like);
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const pressure = weatherData.main.pressure;
    const visibility = (weatherData.visibility / 1000).toFixed(1);
    const description = weatherData.weather[0].description;
    const iconCode = weatherData.weather[0].icon;
    const timestamp = weatherData.dt;
    
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
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
    
    showWeatherSection();
}

function displayForecast(forecastList) {
    const dailyForecasts = getDailyForecasts(forecastList);
    
    forecastContainer.innerHTML = ''; // Clear old forecasts
    
    dailyForecasts.forEach(forecast => {
        const date = formatDate(forecast.dt);
        const temperature = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;
        const iconCode = forecast.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        const humidity = forecast.main.humidity;
        const windSpeed = forecast.wind.speed.toFixed(1);
        
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
        
        forecastContainer.innerHTML += forecastCard;
    });
    
    showForecastSection();
}

/* ==========================================
   8. MAIN FUNCTION
   ========================================== */

async function getWeatherData(city) {
    city = city.trim();
    
    if (!city) {
        showError('Please enter a city name!');
        return;
    }
    
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('API key not configured! Please add your OpenWeather API key to the code.');
        return;
    }
    
    showLoading();
    
    try {
        const [weatherData, forecastData] = await Promise.all([
            fetchCurrentWeather(city),
            fetchForecast(city)
        ]);
        
        displayCurrentWeather(weatherData);
        displayForecast(forecastData.list);
        
    } catch (error) {
        showError(error.message);
    }
}

/* ==========================================
   9. EVENT LISTENERS
   ========================================== */

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = searchInput.value;
    getWeatherData(city);
    searchInput.value = '';
});

themeToggle.addEventListener('click', toggleDarkMode);

/* ==========================================
   10. INITIALIZATION ON PAGE LOAD
   ========================================== */

function initializeApp() {
    initializeDarkMode();
}

document.addEventListener('DOMContentLoaded', initializeApp);