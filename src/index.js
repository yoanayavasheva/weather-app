//Feature 1: Using actual real dates for both currentDay and following days//
let now = new Date();

let currentDay = document.querySelector("#current-day");
let inOneDay = document.querySelector(".in-one-day");
let inTwoDays = document.querySelector(".in-two-days");
let inThreeDays = document.querySelector(".in-three-days");
let inFourDays = document.querySelector(".in-four-days");
let inFiveDays = document.querySelector(".in-five-days");
let inSixDays = document.querySelector(".in-six-days");

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

let dayInOneDay = days[(now.getDay() + 1) % 7];
let dayInTwoDays = days[(now.getDay() + 2) % 7];
let dayInThreeDays = days[(now.getDay() + 3) % 7];
let dayInFourDays = days[(now.getDay() + 4) % 7];
let dayInFiveDays = days[(now.getDay() + 5) % 7];
let dayInSixDays = days[(now.getDay() + 6) % 7];

currentDay.innerHTML = `${day} ${hours}:${minutes}`;
inOneDay.innerHTML = dayInOneDay;
inTwoDays.innerHTML = dayInTwoDays;
inThreeDays.innerHTML = dayInThreeDays;
inFourDays.innerHTML = dayInFourDays;
inFiveDays.innerHTML = dayInFiveDays;
inSixDays.innerHTML = dayInSixDays;

//Feature: Search engine with real data//

function showWeather(response) {
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
}

let apiKey = `0t4b903dofe6fcc186a3f4313271559b`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#change-city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
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

function showCurrentWeather(response) {
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

function showCurrentCity(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrent = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(showCurrentWeather);
}

function findCurrent() {
  navigator.geolocation.getCurrentPosition(showCurrentCity);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", findCurrent);
