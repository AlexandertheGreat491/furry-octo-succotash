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
var errors = function handleErrors (response) {
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
    let queryURL = "https://api.openweathermap.org/data/2.5/weather" + city +"&lang=en" + "&units=imperial" + "&appid=" + myAPIKey;
    // setting the units to imperial will give temperature in Fahrenheit & wind speed in miles/hour.
    // response if there is an error for the queryURL
fetch(queryURL).then(errors).then(function (response){
    return response.json();
})
.then(function(response){
    // Save city to the local storage.
    saveCity(city);
    $('#search-error').text("");
    // Creates an icon for the current weather
    let currentWeatherIcon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    // Timezone set moment.js
    $(function(){
        setInterval(function(){
          var divUtc = $('#divUTC');
          var divLocal = $('#divLocal');  
          //put UTC time into divUTC  
          divUtc.text(moment.utc().format('YYYY-MM-DD HH:mm:ss'));      
          
          //get text from divUTC and conver to local timezone  
          var localTime  = moment.utc(divUtc.text()).toDate();
          localTime = moment(localTime).format('YYYY-MM-DD HH:mm:ss');
          divLocal.text(localTime);        
        },1000);
      });

})
}