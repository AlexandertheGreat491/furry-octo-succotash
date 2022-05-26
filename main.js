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

// Global variables & Open Weather API Key

var myAPIKey = "f6f9ed95a93815a052a050b551b895ef";
// personal API for Open Weather
var currentCity = "";
var lastCity = "";

// Error handler
var errors = function handleErrors(response) {
    // successful request
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
/*TJ Van Toll. (2015, September 13). Handling Failed HTTP Responses With fetch(). TJ VanToll. 
Retrieved May 26, 2022, from https://www.tjvantoll.com/2015/09/13/fetch-and-errors/ */

var currentConditions = function (event) {

    // User enters a city in the search input field.

    let city = $('#search').val();
    currentCity = $('#search').val();

    // Sets the queryURL to fetch from the API.

    let queryURL = "https://api.openweathermap.org/data/2.5/weather" + city + "&lang=en" + "&units=imperial" + "&appid=" + myAPIKey;

    // setting the units to imperial will give temperature in Fahrenheit & wind speed in miles/hour.
    // response if there is an error for the queryURL

    fetch(queryURL).then(errors).then(function (response) {
        return response.json();
    })
        .then(function (response) {

            // Save city to the local storage.

            saveCity(city);
            $('#search-error').text("");

            // Creates an icon for the current weather

            let currentWeatherIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

            // Timezone set moment.js

            let currentTimeUTC = response.dt;
            let currentTimeZoneOffset = response.timezone;
            let currentTImeZoneOffsetHours = currentTimeZoneOffset / 60 / 60;
            let currentMoment = moment.unix(currentTimeUTC).utc().utcOffset(currentTImeZoneOffsetHours);

            // Render cities list.

            renderCities();

            // Get the 5 day forecast for the city searched by the user.

            getFiveDayForecast(event);

            $('#header-text').text(response.name);
            // Creates the HTML for the results of the search by the user.
            let currentWeather = `
<h3>${response.name} ${currentMoment.format("MM/DD/YY")}<img src="${currentWeatherIcon}"/></h3>
<ul class="list-group-flush">
    <li class="list-group-item">Temperature: ${response.main.temp}&#8547;</li>
    <li class="list-group-item">Humidity: ${response.main.humidity}%</li>
    <li class="list-group-item">Wind Speed: ${response.wind.speed}mph</li>
    <li id="uvIndex" class="list-group-item">UV Index:</li>
</ul>`;

            // Results are appended to the DOM.

            $('#today-weather').html(currentWeather);
            // Retrieves the latitude and longitude for the UV search from Open Weather Maps API

            let latitude = response.coord.lat;
            let longitude = response.coord.lon;
            let uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + "longitude" + "&appid=" + myAPIKey;

            // API colution for Cross-origin resources sharing (CORS) error: https://cors-anywhere.herokuapp.com/

            uvQueryURL = "https://cors-anywhere.herokuapp.com/" + uvQueryURL;

            // UV information is fetched and builds the color display for the UV index.

            fetch(uvQueryURL).then(errors).then(function (response) {
                let uvIndex = response.value;
                $('#uvIndex').html(`UV Index: <span id="uvVal">${uvIndex}</span>`);
                if (uvIndex >= 0 && uvIndex < 3) {
                    $('#uvVal').attr("class", "uv-favorable");
                } else if (uvIndex >= 3 && uvIndex < 8) {
                    $('#uvVal').attr("class", "uv-moderate");
                } else if (uvIndex >= 8) {
                    $('#uvVal').attr("class", "uv-severe");
                }
            });
        });
};

// This function gets the five day forecast and displays it in the HTML.

var getFiveDayForecast = function (event) {
    let city = $('#search').val();

    // Sets URL for API search using forecast search

    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&lang=en" + "&appid=" + myAPIKey;

    // Fetch

    fetch(queryURL).then(errors)
        .then(function (response) {
            return response.json;
        })
        .then(function (response) {
            // HTML
            let fiveDayForecastHTML = `
    <h2>5-Day Forecast:<h2>
<div id="fiveDayForecastUl" class="d-inline-flex flex-wrap">`;
            // 5 day forecast loop and build the HTML using UTC and Open Weather Map icon.
            for (let i = 0; i < response.list.length; i++) {
                let dayData = response.list[i];
                let dayTImeUTC = dayData.dt;
                let timeZoneOffset = response.city.timezone;
                let timeZoneOffsetHours = timeZoneOffset / 60 / 60;
                let thisMoment = moment.unix(dayTImeUTC).utc().utcOffset(timeZoneOffsetHours);
                let iconURL = "https://openweathermap.org/img/w/" + dayData.weather[0].icon + ".png";
                // Mid-day forecasts
                if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00") {
                    fiveDayForecastHTML += `
        <div class="weather-card card m-2 p0">
        <ul class="list-group-flush">
        <li class="list-group-item">${thisMoment.format("MM/DD/YY")}</li>
        <li class="list-group-item weather-icon"><img src="${iconURL}"/></li>
        <li class="list-group-item">Temp: ${dataData.main.temp}&#8457;</li>
        <br>
        <li class="list-group-item">Humidity: ${dayData.main.humidity}%</li>
        </ul>
        </div>`;
                }

            }
            // HTML
            fiveDayForecastHTML += `<div>`;
            // 5 day forecast is appended to the DOM;
            $('#five-day-forecast').html(fiveDayForecastHTML);
        })
}

// This function saves the city to localStorage.

var saveCity = function (newCity) {

    $('#city-results').empty();
    let cityExists = false;

    // Checks whether or not city exists in local storage.

    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage["cities" + i] === newCity) {
            cityExists = true;
            break;
        }
    }
}
