import React, { useState } from 'react';

const CityInput = ({ onCitySubmit }) => {
    const [cityName, setCityName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cityName) {
            onCitySubmit(cityName);
            setCityName('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter city name"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
            />
            <button type="submit">Get Weather</button>
        </form>
    );
};

export default CityInput;
