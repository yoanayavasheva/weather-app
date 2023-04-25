//Feature 1: Using actual real dates for both currentDay and following days//
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

let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentDay.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastDay1 = days[(now.getDay() + 1) % 7];
  forecastDay1 = forecastDay1.substring(0, 3);
  let forecastDay2 = days[(now.getDay() + 2) % 7];
  forecastDay2 = forecastDay2.substring(0, 3);
  let forecastDay3 = days[(now.getDay() + 3) % 7];
  forecastDay3 = forecastDay3.substring(0, 3);
  let forecastDay4 = days[(now.getDay() + 4) % 7];
  forecastDay4 = forecastDay4.substring(0, 3);
  let forecastDay5 = days[(now.getDay() + 5) % 7];
  forecastDay5 = forecastDay5.substring(0, 3);
  let forecastDay6 = days[(now.getDay() + 6) % 7];
  forecastDay6 = forecastDay6.substring(0, 3);

  let forecastDays = [
    forecastDay1,
    forecastDay2,
    forecastDay3,
    forecastDay4,
    forecastDay5,
    forecastDay6,
  ];

  let forecastHTML = `<div class="row">`;

  forecastDays.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <span class="weather-forecast-date">${forecastDay}</span>
        <div>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
            alt="weather icon"
            class="icons"
            id="weather-icon"
          />
        </div>
        <span class="temperature">
          <span class="highest-temperature" id="max-temperature">5</span>
          <span class="unit-sign">°C</span> 
          <span class="lowest"> /
            <span class="lowest-temperature" id="min-temperature">2</span>
            <span class="unit-sign">°C</span>
          </span>
        </span>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Feature: Search engine with real data//

function getForecast(response) {
  console.log(response);
  let minTemperatureElement = Math.round(
    response.data.daily[1].temperature.minimum
  );
  let maxTemperatureElement = Math.round(
    response.data.daily[1].temperature.maximum
  );
  let weatherIconElement = response.data.daily[1].condition.icon;
  let weatherDescriptionElement = response.data.daily[1].condition.description;

  let minTemperature = document.querySelector("#min-temperature");
  let maxTemperature = document.querySelector("#max-temperature");
  let weatherIcon = document.querySelector("#weather-icon");

  minTemperature.innerHTML = minTemperatureElement;
  maxTemperature.innerHTML = maxTemperatureElement;

  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconElement}.png`
  );
  weatherIcon.setAttribute("alt", weatherDescriptionElement);
  weatherIcon.innerHTML = weatherIconElement;
}

function displayWeather(response) {
  console.log(response);

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

  displayForecast();

  currentTemperature.innerHTML = temperatureElement;
  currentHumidity.innerHTML = humidityElement;
  currentWind.innerHTML = windElement;
  unitSign.innerHTML = "°C";
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
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

  getForecast(response);
}

let apiKey = `0t4b903dofe6fcc186a3f4313271559b`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#change-city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", showCity);

//Feature: Celsius/Fahrenheit unit calculation - PARTLY MANAGED

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
  unitSign.innerHTML = "°F";
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  unitSign.innerHTML = "°C";
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let unitSign = document.querySelector("#unit-sign");
let celsiusTemperature = null;

fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
celsiusLink.addEventListener("click", displayCelsiusTemperature);

//Feature: Current Location button//

function displayCurrentWeather(response) {
  console.log(response);
  let currentCity = document.querySelector("#current-city h3");
  let city = response.data.city;
  let temperature = response.data.daily[0].temperature.day;
  temperature = Math.round(temperature);
  let humidity = response.data.daily[0].temperature.humidity;
  let wind = response.data.daily[0].wind.speed;
  wind = Math.round(wind);
  let currentTemperature = document.querySelector("#temperature");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  currentCity.innerHTML = city;
  currentTemperature.innerHTML = temperature;
  currentHumidity.innerHTML = humidity;
  currentWind.innerHTML = wind;
  unitSign.innerHTML = "°C";
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayCurrentCity(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(displayCurrentWeather);
}

function findCurrent() {
  navigator.geolocation.getCurrentPosition(displayCurrentCity);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", findCurrent);
