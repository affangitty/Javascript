const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityEl = document.getElementById("city");
const tempEl = document.getElementById("temp");
const humidityEl = document.getElementById("humidity");
const conditionEl = document.getElementById("condition");
const errorEl = document.getElementById("error");

/* Get coordinates */

async function getCoordinates(city) {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
    }

    return data.results[0];
}

/* Get weather */

async function getWeather(city) {
    try {
        errorEl.textContent = "";

        const location = await getCoordinates(city);

        const { latitude, longitude, name } = location;

        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
        );

        const data = await res.json();

        updateUI(name, data);

    } catch (err) {
        showError(err.message);
    }
}

/* Update UI */

function updateUI(cityName, data) {
    const weather = data.current_weather;

    cityEl.textContent = cityName;
    tempEl.textContent = `Temperature: ${weather.temperature}°C`;

    const humidity = data.hourly.relativehumidity_2m[0];
    humidityEl.textContent = `Humidity: ${humidity}%`;

    conditionEl.textContent = `Wind Speed: ${weather.windspeed} km/h`;
}

/* Error */

function showError(msg) {
    errorEl.textContent = msg;

    cityEl.textContent = "";
    tempEl.textContent = "";
    humidityEl.textContent = "";
    conditionEl.textContent = "";
}

/* Event */

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return;

    getWeather(city);
});