function capitalizeFirstLetter(string) {
    return [...string][0].toUpperCase() + [...string.toLowerCase()].slice(1).join('')
  }

  async function fetchAPIData(url) {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    try {
        const response = await fetch(proxyUrl + encodeURIComponent(url));
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in fetchAPIData():', error);
        throw new Error('Failed to fetch data from the API.');
    }
}

function updateWeatherUI(data, placeCode) {
    
    const conditionsLT={
        "clear": "giedra",
        "partly-cloudy": "mažai debesuota",
        "cloudy-with-sunny-intervals": "debesuota su pragiedruliais",
        "cloudy": "debesuota",
        "light-rain": "nedidelis lietus",
        "rain": "lietus",
        "heavy-rain": "smarkus lietus",
        "thunder": "perkūnija",
        "isolated-thunderstorms": "trumpas lietus su perkūnija",
        "thunderstorms": "lietus su perkūnija",
        "heavy-rain-with-thunderstorms": "smarkus lietus su perkūnija",
        "light-sleet": "nedidelė šlapdriba",
        "sleet": "šlapdriba",
        "freezing-rain": "lijundra",
        "hail": "kruša",
        "light-snow": "nedidelis sniegas",
        "snow": "sniegas",
        "heavy-snow": "smarkus sniegas",
        "fog": "rūkas",
        "null": "oro sąlygos nenustatytos"
    };

    const temperature = data.airTemperature;
    const feelsLikeTemperature = data.feelsLikeTemperature;
    const humidity = data.relativeHumidity;
    const windSpeed = data.windSpeed;
    const conditions = data.conditionCode;

    document.getElementById('placeName').textContent = document.querySelector('#placeSelector').selectedOptions[0].text;
    document.getElementById('temperature').textContent = temperature;
    document.getElementById('feelsLikeTemp').textContent = feelsLikeTemperature;
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('wind').textContent = windSpeed;
    document.getElementById('conditions').textContent = capitalizeFirstLetter(conditionsLT[conditions]);
}

async function fetchWeather() {
    const placeCode = document.getElementById('placeSelector').value;
    const url = `https://api.meteo.lt/v1/places/${placeCode}/forecasts/long-term`;
    try {
        const data = await fetchAPIData(url);
        const currentData = data.forecastTimestamps[0];
        updateWeatherUI(currentData, placeCode);
    } catch (error) {
        console.error('Error in fetchWeather:', error);
        alert('Error fetching weather data.');
    }
}