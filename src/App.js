import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import CityInput from './CityInput';
import WeatherDisplay from './WeatherDisplay';
import WeatherChart from './WeatherChart'; // Import the WeatherChart component
import './App.css';

const App = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [city, setCity] = useState('Delhi'); // Set default city to 'Delhi'

    const apiKeyWeatherAPI = '8364ed6f5e18407eb8f154116242910'; // Replace with your WeatherAPI key
    const apiKeyOpenWeather = 'e8c5b2f6c69973452cbd1894d4fb608b'; // Replace with your OpenWeather API key

    // Wrap fetchCurrentWeather with useCallback
    const fetchCurrentWeather = useCallback(async (cityName) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKeyOpenWeather}&units=metric`);
            if (!response.ok) {
                throw new Error("Could not fetch current weather data.");
            }
            const data = await response.json();
            setCurrentWeather(data);
        } catch (error) {
            console.error(error);
            // If an error occurs, fall back to default city
            if (cityName !== 'Delhi') {
                fetchCurrentWeather('Delhi');
            }
        }
    }, [apiKeyOpenWeather]);

    // Wrap fetchForecastData with useCallback
    const fetchForecastData = useCallback(async (cityName) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKeyWeatherAPI}&q=${cityName}&days=7`);
            if (!response.ok) {
                throw new Error("Could not fetch forecast data.");
            }
            const data = await response.json();
            setForecast(data.forecast.forecastday || []);
        } catch (error) {
            console.error(error);
            // If an error occurs, fall back to default city
            fetchForecastData('Delhi');
        }
    }, [apiKeyWeatherAPI]);

    // Effect to fetch weather data for default city on mount
    useEffect(() => {
        fetchCurrentWeather('Delhi');
        fetchForecastData('Delhi');
    }, [fetchCurrentWeather, fetchForecastData]); // Include fetchCurrentWeather and fetchForecastData in dependencies

    const handleCitySubmit = (cityName) => {
        setCity(cityName);
        fetchCurrentWeather(cityName);
        fetchForecastData(cityName);
    };

    return (
        <div className="app">
            <h1>Weather App</h1>
            <CityInput onCitySubmit={handleCitySubmit} />
            <WeatherDisplay currentWeather={currentWeather} forecast={forecast} city={city} />
            {forecast.length > 0 && <WeatherChart forecast={forecast} />} {/* Render the chart */}
        </div>
    );
};

export default App;
