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
    if (hour <10) {
        hours ="0" + hours;
    }
    if (minutes<10){
        minutes = "0" + minutes;
    }
    return `${day} ${hours} ${minutes}`;
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
        let dayName;
        if (index===0&& isToday(forecastDays.time)){
            dayName ="Today";}
            else{
            dayName =formatDay(forecastDays.time);}
    }
    forecastHTML +=
    <div class ="forecast ${index===0 ? "highlight" : ""}">
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
    <span class ="high">${Math.round(forecastDays,temperature.maximum)}&deg;</span>
    <span class ="low">${Math.round(forecastDays,temperature.minimum)}&deg</span>
    </div>
    </div>

    forecastElement.innerHTML=forecastHTML;
});
}
function get forecast(coordinates){
    
}