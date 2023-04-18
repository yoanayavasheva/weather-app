//Feature 1: Using actual real dates for both currentDay and following days//
let now = new Date();

let currentDay = document.querySelector(".current-day");
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

//Feature: Celsius/Fahrenheit unit calculation - PARTLY MANAGED

let temperatureElement = document.querySelector("#temperature");
let temperature = temperatureElement.innerHTML; //this makes it a number??//
temperature = Number(temperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let unitSign = document.querySelector("#unit-sign");
let Ftemp = Math.round((temperature * 9) / 5 + 32);
let Ctemp = temperature;

function convertToFahrenheit(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Ftemp;
  unitSign.innerHTML = "°F";
}

function convertToCelsius(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Ctemp;
  unitSign.innerHTML = "°C";
}

fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

//Feature: Search engine with real data//

function showWeatherToday(response) {
  console.log(response);
  let temperature = response.data.daily[0].temperature.day;
  temperature = Math.round(temperature);
  let humidity = response.data.daily[0].temperature.humidity;
  let wind = response.data.daily[0].wind.speed;
  let icon = response.data.daily[0].condition.icon_url;
  wind = Math.round(wind);
  let currentTemperature = document.querySelector("#temperature");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let iconToday = document.querySelector("#icon-today");
  currentTemperature.innerHTML = temperature;
  currentHumidity.innerHTML = humidity;
  currentWind.innerHTML = wind;
  iconToday.innerHTML = icon;
}

let apiKey = `0t4b903dofe6fcc186a3f4313271559b`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#change-city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  let currentCity = document.querySelector("#current-city h1");
  currentCity.innerHTML = city;
  axios.get(apiUrl).then(showWeatherToday);
}

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", showCity);

//Feature: Current Location button//

function showCurrentWeather(response) {
  console.log(response);
  let currentCity = document.querySelector("#current-city h1");
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
