/*USER STORY*/

/* As a traveler
I WANT to see the weather outlook for multiple cities*/

/*ACCEPTANCE CRITERIA */

/*GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
 WHEN I view current weather conditions for that city
 THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV
 index
 WHEN I view the UV index
 THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
 WHEN I view future weather conditions for that city
 THEN I am presented with a 5-day forecast that displays the date, an icon representation
 of weather conditions, the temperature, the wind speed, and the humidity
 WHEN I click on a city in the search history
 THEN I am again presented with current and future conditions for that city*/

function initPage() {
    const cityEl = document.getElementById("search");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("pic");
    const currentTempEl = document.getElementById("temperature");
    const currentHumidityEl = document.getElementById("humidity");
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");
    var fivedayEl = document.getElementById("header");
    var currentWeather = document.getElementById("todaysweather");
    let searchHistory = JSON.parse(localStorage.getItem("search"))
}

// Variable for personal Open Weather API
const myAPIKey = "f6f9ed95a93815a052a050b551b895ef";

function getWeather(cityName) {
    // Executes a current weather request from Open Weather API.
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&lang=en" + "&units=imperial" + "&appid=" + myAPIKey;
    
}