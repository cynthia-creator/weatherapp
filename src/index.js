function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${day} ${hours}: ${minutes}`;
}
function isToday(timestamp) {
  const inputDate = new Date(timestamp * 1000);
  const today = new Date();

  return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  );
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
function showWeatherForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.getElementById("forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay,index) {
    if (index < 6){    
    forecastHTML =
    forecastHTML +
     `<div slass="col-2">
    <div class="weather-forecast-date">$
        {formatDay(forecastDay.dt)}</div>
          <img
           src="http://openweathermap.org/img/wn/${
             forecastDay.weather[0].icon
                          }@2x.png"
                         alt=""
                          width="42"
                           />
<div class="weather-forecast-temperatures">
                          <span class="weather-forecast-temperature-max">${Math.round(
                          forecastDay.temp.max
                        )}°</span>
                        <span class="weather-forecast-temperature-min">${Math.round(
                          forecastDay.temp.min
                        )}°</span>
                    </div>
                   </div>;
                   `;
                        }
                         });
forecastHTML= forecastHTML+`</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getforecast(coordinates) {
  let apikey = "6fafa9fdc6e57ce2b99a63d7d1fceef8";
  let apiurl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apikey}`;
  axios.get(apiurl).then(showWeatherForecast);
}
//This function displays the response of elements from the API call
function showTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.name;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.sys.country;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let WindElement = document.querySelector("#wind");
  WindElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElemen  = document.querySelector("#humidity");
  humidityElemen.innerHTML = response.data.main.humidity;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/wn/${response.data.weather[0].icon}@2x.png`
  );
   celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherForecast);
}
//this function searches for a city whenever you submit the form and then display the elements in the showTemperature function//
function search(city) {
  let apikey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let encodedCity = encodeURIComponent(city);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apikey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
//this function gets the input value from the form and pass it to function search to make an API call
function searchCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}
let celsiusTemperature = null;

//this function displays the farenheit value of the temperature from the API call
function showFarenheitTemperature(event) {
  event.preventDefault();
  //convert to farenheit value//
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
  celsius.classList.remove("active");
  farenheitTemperature.classList.add("active");
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsius.classList.add("active");
  farenheit.classList.remove("active");
}
let form = document.querySelector("#city-search-form");
form.addEventListener("submit", searchCity);

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click",showFarenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemperature);

search("Cape Town");
