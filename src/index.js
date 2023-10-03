function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes =date.getMinutes();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];
    if (hours <10) {
        hours ="0" + hours;
    }
    if (minutes<10){
        minutes = "0" + minutes;
    }
    return `${day} ${hours}: ${minutes}`;
}
function isToday(timestamp) {
    const inputDate = new Date(timestamp *1000);
    const today = new Date();

    return (
        inputDate.getDate() ===today.getDate() &&
        inputDate.getMonth() ===today.getMonth()&&
        inputDate.getFullYear() ===today.getFullYear()
    );
}
function formatDay(timestamp) {
    let date = new Date (timestamp * 1000);
    let day =date.getDay();
    let days = ["Sun", "Mon","Tue","Wed","Thur","Fri","Sat"];
    return days[day];
}
function showWeatherForecast(response) {
    let forecast =response.data.daily;
    console.log(forecast)
    let forecastElement =document.getElementById("forecast");

    let forecastHTML ="";
    forecast.forEach(function(forecastDays,index) {
        console.log(forecastDays)
        let dayName;
        if (index===0&& isToday(forecastDays.time)){
            dayName ="Today";
        } else{
            dayName =formatDay(forecastDays.time);
    }
    forecastHTML +=
    `<div class ="forecast ${index===0 ? "highlight":""}">
    <div class ="days">
        <div class="title">${dayName}</div>
        <div class= "icon">
            <Img
            src ="https://cdn-icons-png.flaticon.com/128/10484/10484062.png"
alt ="icon"
width="36"
/>
            </div> 
<div class="forecast-temp">   
    <span class ="high">${Math.round(
        forecastDays.temp.max)}&deg;</span>
    <span class ="low">${Math.round(
        forecastDays.temp.min)}&deg</span>

    </div>
    </div>
    </div>`;
    });
        forecastElement.innerHTML = forecastHTML;

}
function getForecast(coordinates){
   let apikey = "0f8bc384a7c31b717a18cfe38a95ae06";
   let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metri`;
axios.get(apiurl). then(showWeatherForecast);
}
//This function displays the response of elements from the API call
function showTemperature(response){
    console.log(response);
    let temperatureElement =document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(response.data.temperature.current);

    let h1 = document.querySelector("#city");
    h1.innerHTML =response.data.city;

    let countryElement =document.querySelector("#country");
    countryElement.innerHTML=response.data.country;

    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML=response.data.condition.description;

    let WindElement=document.querySelector("#wind");
    WindElement.innerHTML=Math.round(response.data.wind.speed);

    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.temperature.humidity;

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.time *1000);

    let iconElement =document.querySelector("#weather-icon");
    iconElement.setAttribute(
        "src",
            "https://cdn-icons-png.flaticon.com/128/10484/10484062.png"

    );
    celsiusTemperature = response.data.main.temp;

    getForecast(response.data.coord);
    }
    function getForecast(coordinates) 
    {
        let apikey ="0f8bc384a7c31b717a18cfe38a95ae06";
             let apiurl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
             axios.get(apiurl).then(showWeatherForecast);
    }

//this function searches for a city whenever you submit the form and then display the elements in the showTemperature function//
function search(city){
    let apikey = "0f8bc384a7c31b717a18cfe38a95ae06";
    
    let encodedCity=encodeURIComponent(city);

    let apiurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metri`;
    axios.get(apiurl).then(showWeatherForecast);
}
//this function gets the input value from the form and pass it to function search to make an API call
function searchCity(event){
    event.preventDefault();
    let cityInputElement= document.querySelector("#search-input");
    search(cityInputElement.value);
} 
let celsiusTemperature =null;

//this function displays the farenheit value of the temperature from the API call
function showFarenheitTemperature(event) {
    event.preventDefault();
    //convert to farenheit value//
    let farenheitTemperature=(celsiusTemperature *9) / 5+ 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(farenheitTemperature);
    celsius.classList.remove("active");
    farenheitTemperature.classList.add("active");
}
function showCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement= document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    celsius.classList.add("active");
    farenheit.classList.remove("active")
}
let form = document.querySelector("#city-search-form");
form.addEventListener("submit",searchCity);

let farenheit= document.querySelector("#farenheit");
farenheit.addEventListener("click",showFarenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click",showCelsiusTemperature);

search("CapeTown");