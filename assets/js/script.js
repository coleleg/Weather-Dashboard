// this is the api url: api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

var userFormEl = document.querySelector("#submit-btn");
var cityNameEl = document.querySelector("#city-input");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv");

var lon = "";
var lat = "";

// Deals with submit and submit errors
function formSubmitHandler (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();
  ;

    if (cityName) {
        getCityMain(cityName)
        console.log(lon);
        console.log(lat);
        getUVIndex(lon, lat);
        
    }
        else {
            alert("Please enter a city name")
        }
      
}



// creates the API URL for submitted city
function getCityMain (city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=dee89b7fccd367887e9d18c1350058ee";

    fetch(apiUrl).then(function(response){
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                var temp = Math.round(data.main.temp) + "°F";
                var humidity = data.main.humidity + "%";
                var wind = data.wind.speed + " MPH";
                lat = data.coord.lat;
                lon = data.coord.lon;
                getUVIndex(lon, lat);
                fiveDay(lon, lat);
            
                console.log(lat, lon);
                console.log(temp);
                console.log(humidity);
                console.log(wind);

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

    // takes Latitude and Longitude from the city response (which does not return uvi data) and fetches data from a url that does
    function getUVIndex (lon, lat) {
        var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=dee89b7fccd367887e9d18c1350058ee";
    
        fetch(apiUrl).then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    let uvi = data.current.uvi;
                    console.log(uvi);
                    uvEl.textContent = "UV Index: " + uvi;
    
                })
            }
        })
        
    };

    function fiveDay (lon, lat) {
        let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=dee89b7fccd367887e9d18c1350058ee"

        fetch(apiUrl).then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    let day1max;
                    let day2max;
                    let day3max;
                    let day4max;
                    let day5max;
                    let day1min;
                    let day2min;
                    let day3min;
                    let day4min;
                    let day5min;
                    let days = data.daily;
                    for (i=0; i < days.length; i++) {
                        day1max = [days[0].temp.max];
                        day2max = [days[1].temp.max];
                        day3max = [days[2].temp.max];
                        day4max = [days[3].temp.max];
                        day5max = [days[4].temp.max];

                        day1min = [days[0].temp.min];
                        day2min = [days[1].temp.min];
                        day3min = [days[2].temp.min];
                        day4min = [days[3].temp.min];
                        day5min = [days[4].temp.min];
                    }

                    console.log(day1max, day1min, day2max, day2min);
                })
            }
        })
    }




userFormEl.addEventListener("click", formSubmitHandler);