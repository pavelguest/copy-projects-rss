const weatherIco = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const inputCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&lang=en&appid=116cf96821b5cad9a9f4a3cb96dbf6bb&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIco.className = 'weather-icon owf';

  if(data.message !== 'city not found') {
    weatherIco.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp.toFixed(0))}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  } else {
    weatherError.textContent = `Error. City "${inputCity.value}" not found`;
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }

}

function changeCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    inputCity.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
inputCity.addEventListener('keypress', changeCity);
