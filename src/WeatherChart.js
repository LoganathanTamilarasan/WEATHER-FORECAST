// src/WeatherChart.js
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';

// Register necessary components for Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

const WeatherChart = ({ forecast }) => {
    const labels = forecast.map(day => new Date(day.date).toLocaleDateString());
    const temperatures = forecast.map(day => day.day.avgtemp_c);
    const humidity = forecast.map(day => day.day.avghumidity);
    const windSpeeds = forecast.map(day => day.day.maxwind_kph); // Wind speed data for radar chart

    // Data for Bar Chart
    const barData = {
        labels: labels,
        datasets: [
            {
                label: 'Average Temperature (°C)',
                data: temperatures,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Data for Line Chart
    const lineData = {
        labels: labels,
        datasets: [
            {
                label: 'Average Humidity (%)',
                data: humidity,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.2,
            },
        ],
    };

    // Data for Radar Chart
    const radarData = {
        labels: labels,
        datasets: [
            {
                label: 'Max Wind Speed (kph)',
                data: windSpeeds,
                backgroundColor: 'rgba(54, 162, 235, 0.4)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Options for charts
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>7-Day Forecast - Weather Visualization</h2>
            <div className="chart-container">
                <Bar data={barData} options={options} />
                <Line data={lineData} options={options} />
                <Radar data={radarData} options={options} />
            </div>
        </div>
    );
};

export default WeatherChart;
