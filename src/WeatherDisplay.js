import React from 'react';
import sunIcon from './assets/sun.png';
import cloudIcon from './assets/cloud.png';
import humidityIcon from './assets/humidity.png';
import windIcon from './assets/wind.png';
import rainIcon from './assets/rain.png';
import drizzleIcon from './assets/drizzle.png';
import snowIcon from './assets/snow.png';
import dateIcon from './assets/date.png';

const WeatherDisplay = ({ currentWeather, forecast, city }) => {
    const weatherIcons = {
        Clear: sunIcon,
        Clouds: cloudIcon,
        Rain: rainIcon,
        Drizzle: drizzleIcon,
        Snow: snowIcon,
    };

    return (
        <div className="weather-display">
            {currentWeather && (
                <div className="current-weather">
                    <h2>Current Weather in {city}</h2>
                    <div className="weather-container">
                        <div className="weather-item">
                            <div className="weather-title">Temperature</div>
                            <img src={weatherIcons[currentWeather.weather[0].main] || sunIcon} alt="Weather Icon" />
                            <div className="weather-data">{currentWeather.main.temp} °C</div>
                        </div>
                        <div className="weather-item">
                            <div className="weather-title">Humidity</div>
                            <img src={humidityIcon} alt="Humidity Icon" />
                            <div className="weather-data">{currentWeather.main.humidity} %</div>
                        </div>
                        <div className="weather-item">
                            <div className="weather-title">Wind Speed</div>
                            <img src={windIcon} alt="Wind Icon" />
                            <div className="weather-data">{currentWeather.wind.speed} m/s</div>
                        </div>
                        <div className="weather-item">
                            <div className="weather-title">Date & Time</div>
                            <img src={dateIcon} alt="Date Icon" />
                            <div className="weather-data">{new Date().toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            )}

            <h2>7-Day Forecast</h2>
            {forecast && forecast.length > 0 ? (
                <div className="forecast">
                    {forecast.map((day, index) => (
                        <div key={index} className="forecast-day">
                            <h3>{new Date(day.date).toLocaleDateString()}</h3>
                            <p>Temperature: {day.day.avgtemp_c} °C</p>
                            <img 
                                src={weatherIcons[day.day.condition.text] || sunIcon} 
                                alt="Forecast Icon" 
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div>No forecast data available.</div>
            )}
        </div>
    );
};

export default WeatherDisplay;
