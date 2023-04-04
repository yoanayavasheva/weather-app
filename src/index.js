//Feature 1: Using actual real dates for both currentDay and following days//
let now = new Date();

let currentDay = document.querySelector(".current-day");
let inOneDay = document.querySelector(".in-one-day");
let inTwoDays = document.querySelector(".in-two-days");
let inThreeDays = document.querySelector(".in-three-days");
let inFourDays = document.querySelector(".in-four-days");
let inFiveDays = document.querySelector(".in-five-days");

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

currentDay.innerHTML = `${day} ${hours}:${minutes}`;
inOneDay.innerHTML = dayInOneDay;
inTwoDays.innerHTML = dayInTwoDays;
inThreeDays.innerHTML = dayInThreeDays;
inFourDays.innerHTML = dayInFourDays;
inFiveDays.innerHTML = dayInFiveDays;

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

function showWeather(response) {
  console.log(response.data);
  let temperature = response.data.list[0].main.temp;
  temperature = Math.round(temperature);
  let precipitation = response.data.list[0].pop;
  let precipitationPercentage = precipitation * 100;
  let wind = response.data.list[0].wind.speed;
  wind = Math.round(wind);
  let currentTemp = document.querySelector("#temperature");
  let currentPrecipitation = document.querySelector("#precipitation");
  let currentWind = document.querySelector("#wind");
  currentTemp.innerHTML = temperature;
  currentPrecipitation.innerHTML = precipitationPercentage;
  currentWind.innerHTML = wind;
}

let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#change-city-input");
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=1&units=metric&appid=${apiKey}`;
  let currentCity = document.querySelector("#current-city h1");
  currentCity.innerHTML = city;
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#change-city-form");
form.addEventListener("submit", showCity);

//Feature: Current Location button//

function showCurrentWeather(response) {
  console.log(response);
  let currentCity = document.querySelector("#current-city h1");
  let city = response.data.city.name;
  let temperature = response.data.list[0].main.temp;
  temperature = Math.round(temperature);
  let precipitation = response.data.list[0].pop;
  let precipitationPercentage = precipitation * 100;
  let wind = response.data.list[0].wind.speed;
  wind = Math.round(wind);
  let currentTemp = document.querySelector("#temperature");
  let currentPrecipitation = document.querySelector("#precipitation");
  let currentWind = document.querySelector("#wind");
  currentCity.innerHTML = city;
  currentTemp.innerHTML = temperature;
  currentPrecipitation.innerHTML = precipitationPercentage;
  currentWind.innerHTML = wind;
}

function showCurrentCity(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=1&units=metric&appid=${apiKey}`;
  axios.get(apiUrlCurrent).then(showCurrentWeather);
}

function findCurrent() {
  navigator.geolocation.getCurrentPosition(showCurrentCity);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", findCurrent);
