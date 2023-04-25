let now = new Date();

let currentDay = document.querySelector("#current-day");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let today = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDay.innerHTML = `${today} ${hours}:${minutes}`;

let apiKey = `0t4b903dofe6fcc186a3f4313271559b`;

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", showCity);

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", findCurrent);

function formatForecastDates(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  return days[day].substring(0, 3);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  forecast = forecast.slice(1);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <span class="weather-forecast-date">${formatForecastDates(
          forecastDay.time
        )}</span>
        <div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
              forecastDay.condition.icon
            }.png"
            alt="${forecastDay.condition.description}"
            class="icons"
            id="weather-icon"
          />
        </div>
        <span class="temperature">
          <span class="highest-temperature" id="max-temperature">${Math.round(
            forecastDay.temperature.maximum
          )}</span>
          <span class="unit-sign">°C</span> 
          <span class="lowest"> /
            <span class="lowest-temperature" id="min-temperature">${Math.round(
              forecastDay.temperature.minimum
            )}</span>
            <span class="unit-sign">°C</span>
          </span>
        </span>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  celsiusTemperature = response.data.daily[0].temperature.day;
  let temperatureElement = celsiusTemperature;
  temperatureElement = Math.round(temperatureElement);
  let humidityElement = response.data.daily[0].temperature.humidity;
  let windElement = response.data.daily[0].wind.speed;
  windElement = Math.round(windElement);
  let iconTodayElement = response.data.daily[0].condition.icon;
  let cityElement = response.data.city;
  let descriptionElement = response.data.daily[0].condition.description;

  let currentTemperature = document.querySelector("#temperature");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentWeatherIcon = document.querySelector("#icon-today");
  let currentCity = document.querySelector("#current-city h3");
  let currentDescription = document.querySelector("#description");

  displayForecast(response);

  currentTemperature.innerHTML = temperatureElement;
  currentHumidity.innerHTML = humidityElement;
  currentWind.innerHTML = windElement;
  currentWeatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconTodayElement}.png`
  );
  currentWeatherIcon.setAttribute(
    "alt",
    response.data.daily[0].condition.description
  );
  currentCity.innerHTML = cityElement;
  currentDescription.innerHTML = descriptionElement;
}

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#change-city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayCurrentWeather(response) {
  let currentCity = document.querySelector("#current-city h3");
  let city = response.data.city;
  let temperature = response.data.daily[0].temperature.day;
  temperature = Math.round(temperature);
  let humidity = response.data.daily[0].temperature.humidity;
  let wind = response.data.daily[0].wind.speed;
  wind = Math.round(wind);
  let iconTodayElement = response.data.daily[0].condition.icon;
  let descriptionElement = response.data.daily[0].condition.description;

  let currentTemperature = document.querySelector("#temperature");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentWeatherIcon = document.querySelector("#icon-today");
  let currentDescription = document.querySelector("#description");

  currentCity.innerHTML = city;
  currentTemperature.innerHTML = temperature;
  currentHumidity.innerHTML = humidity;
  currentWind.innerHTML = wind;
  currentWeatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconTodayElement}.png`
  );
  currentWeatherIcon.setAttribute(
    "alt",
    response.data.daily[0].condition.description
  );
  currentDescription.innerHTML = descriptionElement;

  displayForecast(response);
}

function displayCurrentCity(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(displayCurrentWeather);
}

function findCurrent() {
  navigator.geolocation.getCurrentPosition(displayCurrentCity);
}
