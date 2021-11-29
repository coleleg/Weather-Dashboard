// this is the api url: api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

var userFormEl = document.querySelector("#submit-btn");
var cityNameEl = document.querySelector("#city-input");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("uv");

// Deals with submit and submit errors
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();
    console.log(cityName);

    if (cityName) {
        getCityCurrent(cityName)
    }
        else {
            alert("Please enter a city name")
        }
      
}

// creates the API URL for submitted city
var getCityCurrent = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=dee89b7fccd367887e9d18c1350058ee";

    fetch(apiUrl).then(function(response){
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                var temp = Math.round(data.main.temp) + "°F";
                var humidity = data.main.humidity + "%";
                var wind = data.wind.speed + " MPH";
                console.log(temp);
                console.log(humidity);
                console.log(wind);
                console.log(data);

                tempEl.textContent = "Temp: " + temp;
                humidityEl.textContent = "Humidity: " + humidity;
                windEl.textContent = "Wind: " + wind;

            })
        }
        else {
            alert('Error: ' + response.statusText);
          }
         
    }
    )};


// var displayFiveDay = function () {

// }

userFormEl.addEventListener("click", formSubmitHandler);