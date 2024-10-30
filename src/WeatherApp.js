import React, { useState } from "react";
import "./App.css"; // Make sure this is the path to your CSS file

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState("");

    const apiKey = "e8c5b2f6c69973452cbd1894d4fb608b"; // Your API key

    const fetchWeatherData = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        if (!city) {
            setError("Please enter a city name.");
            return;
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error("Could not fetch data. Please check the city name and try again.");
            }
            const data = await response.json();
            setWeatherData(data);
            setError("");
        } catch (error) {
            setError(error.message);
            setWeatherData(null); // Reset the weather data on error
        }
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <form onSubmit={fetchWeatherData}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-data">
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
