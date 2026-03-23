document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherInfo = document.getElementById('weather-info');
    const welcomeMessage = document.getElementById('welcome-message');
    const errorMessage = document.getElementById('error-message');
    const loadingState = document.getElementById('loading-state');
    
    // Data DOM Elements
    const locationName = document.getElementById('location-name');
    const currentDate = document.getElementById('current-date');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const mainIcon = document.getElementById('main-icon');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const pressure = document.getElementById('pressure');

    // WMO Weather interpretation codes mapping
    const weatherCodes = {
        0: { desc: 'Clear sky', icon: 'ph-sun', theme: 'theme-clear' },
        1: { desc: 'Mainly clear', icon: 'ph-cloud-sun', theme: 'theme-clear' },
        2: { desc: 'Partly cloudy', icon: 'ph-cloud', theme: 'theme-clouds' },
        3: { desc: 'Overcast', icon: 'ph-clouds', theme: 'theme-clouds' },
        45: { desc: 'Fog', icon: 'ph-cloud-fog', theme: 'theme-clouds' },
        48: { desc: 'Depositing rime fog', icon: 'ph-cloud-fog', theme: 'theme-clouds' },
        51: { desc: 'Light drizzle', icon: 'ph-cloud-rain', theme: 'theme-rain' },
        53: { desc: 'Moderate drizzle', icon: 'ph-cloud-rain', theme: 'theme-rain' },
        55: { desc: 'Dense drizzle', icon: 'ph-cloud-rain', theme: 'theme-rain' },
        56: { desc: 'Light freezing drizzle', icon: 'ph-cloud-snow', theme: 'theme-snow' },
        57: { desc: 'Dense freezing drizzle', icon: 'ph-cloud-snow', theme: 'theme-snow' },
        61: { desc: 'Slight rain', icon: 'ph-cloud-rain', theme: 'theme-rain' },
        63: { desc: 'Moderate rain', icon: 'ph-cloud-rain', theme: 'theme-rain' },
        65: { desc: 'Heavy rain', icon: 'ph-cloud-rain', theme: 'theme-rain' },
        66: { desc: 'Light freezing rain', icon: 'ph-cloud-snow', theme: 'theme-snow' },
        67: { desc: 'Heavy freezing rain', icon: 'ph-cloud-snow', theme: 'theme-snow' },
        71: { desc: 'Slight snow fall', icon: 'ph-snowflake', theme: 'theme-snow' },
        73: { desc: 'Moderate snow fall', icon: 'ph-snowflake', theme: 'theme-snow' },
        75: { desc: 'Heavy snow fall', icon: 'ph-snowflake', theme: 'theme-snow' },
        77: { desc: 'Snow grains', icon: 'ph-snowflake', theme: 'theme-snow' },
        80: { desc: 'Slight rain showers', icon: 'ph-cloud-rain', theme: 'theme-rain' },
        81: { desc: 'Moderate rain showers', icon: 'ph-cloud-rain', theme: 'theme-rain' },
        82: { desc: 'Violent rain showers', icon: 'ph-cloud-lightning', theme: 'theme-rain' },
        85: { desc: 'Slight snow showers', icon: 'ph-cloud-snow', theme: 'theme-snow' },
        86: { desc: 'Heavy snow showers', icon: 'ph-cloud-snow', theme: 'theme-snow' },
        95: { desc: 'Thunderstorm', icon: 'ph-cloud-lightning', theme: 'theme-rain' },
        96: { desc: 'Thunderstorm with slight hail', icon: 'ph-cloud-lightning', theme: 'theme-rain' },
        99: { desc: 'Thunderstorm with heavy hail', icon: 'ph-cloud-lightning', theme: 'theme-rain' }
    };

    // Helper: Format Date
    const formatDate = () => {
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    // View State Handlers
    const showLoading = () => {
        welcomeMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        weatherInfo.classList.remove('active');
        loadingState.style.display = 'flex';
    };

    const showError = (msg = 'City not found. Please try again.') => {
        loadingState.style.display = 'none';
        welcomeMessage.style.display = 'none';
        weatherInfo.classList.remove('active');
        
        const errorText = document.getElementById('error-text');
        errorText.textContent = msg;
        errorMessage.style.display = 'flex';
    };

    const showWeather = () => {
        loadingState.style.display = 'none';
        errorMessage.style.display = 'none';
        welcomeMessage.style.display = 'none';
        weatherInfo.classList.add('active');
    };

    // API Calls
    const fetchWeather = async (city) => {
        if (!city) return;
        
        try {
            showLoading();

            // 1. Get coordinates using Open-Meteo Geocoding API
            const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                showError('City not found. Please check spelling.');
                return;
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // 2. Get live weather data using coordinates
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m&timezone=auto`);
            const weatherData = await weatherResponse.json();
            
            if (!weatherData.current) {
                showError('Failed to fetch weather data.');
                return;
            }

            updateDOM(weatherData.current, name, country);
        } catch (error) {
            console.error('Error fetching weather:', error);
            showError('Network error. Please try again later.');
        }
    };

    // Update DOM
    const updateDOM = (current, city, country) => {
        // Update basic info
        locationName.textContent = `${city}, ${country}`;
        currentDate.textContent = formatDate();
        
        // Formats
        const temp = Math.round(current.temperature_2m);
        temperature.innerHTML = `${temp}<span class="unit">°C</span>`;
        feelsLike.textContent = `${Math.round(current.apparent_temperature)}°C`;
        humidity.textContent = `${current.relative_humidity_2m}%`;
        windSpeed.textContent = `${current.wind_speed_10m} km/h`;
        pressure.textContent = `${current.surface_pressure} hPa`;

        // Weather Code Interpretation
        const code = current.weather_code;
        const weatherMeta = weatherCodes[code] || weatherCodes[0];
        
        weatherDescription.textContent = weatherMeta.desc;
        
        // Update Icon
        mainIcon.className = `ph-fill ${weatherMeta.icon}`;

        // Update Theme
        document.body.className = weatherMeta.theme;

        showWeather();
    };

    // Event Listeners
    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) fetchWeather(city);
        }
    });
    
    // Optional: Focus input on load
    cityInput.focus();
});
