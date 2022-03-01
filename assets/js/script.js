// this is the api url: api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

// User Form Elements
var userFormEl = document.querySelector("#submit-btn");
var cityNameEl = document.querySelector("#city-input");

// Current Weather Elements
var weatherIconEl = document.querySelector("#weather-icon");
var tempEl = document.querySelector("#temp");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv");

// Five Day High Elements
var day1MaxEl = document.querySelector("#day1max");
var day2MaxEl = document.querySelector("#day2max");
var day3MaxEl = document.querySelector("#day3max");
var day4MaxEl = document.querySelector("#day4max");
var day5MaxEl = document.querySelector("#day5max");

// Five Day Low Elements
var day1MinEl = document.querySelector("#day1min");
var day2MinEl = document.querySelector("#day2min");
var day3MinEl = document.querySelector("#day3min");
var day4MinEl = document.querySelector("#day4min");
var day5MinEl = document.querySelector("#day5min");

// Dates
let tomorrow = new Date();
tomorrow.setDate(new Date().getDate() + 1);
document.getElementById("1card").textContent = tomorrow.toISOString().slice(0, 10);

let twoDays = new Date();
twoDays.setDate(new Date().getDate() + 2);
document.getElementById("2card").textContent = twoDays.toISOString().slice(0, 10);

let threeDays = new Date();
threeDays.setDate(new Date().getDate() + 3);
document.getElementById("3card").textContent = threeDays.toISOString().slice(0, 10);

let fourDays = new Date();
fourDays.setDate(new Date().getDate() + 4);
document.getElementById("4card").textContent = fourDays.toISOString().slice(0, 10);


console.log(tomorrow.toISOString().slice(0, 10));




// Deals with submit and submit errors
function formSubmitHandler (event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();
  

    if (cityName) {
        getCityMain(cityName);
        
        
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
                let lat = data.coord.lat;
                let lon = data.coord.lon;
                getUVIndex(lon, lat);
                fiveDay(lon, lat);
            

                tempEl.textContent = "Temp: " + temp;
                humidityEl.textContent = "Humidity: " + humidity;
                windEl.textContent = "Wind: " + wind;

                let today = new Date().toISOString().slice(0, 10);
                document.querySelector("#city-header").textContent = city.charAt(0).toUpperCase()  + city.slice(1) + "  " + today;
              
    
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

                    if (uvi < 3) {
                        uvEl.setAttribute("class", "p-2 border col-2 mx-3 mb-3 bg-success");
                    } else if ( uvi > 2.99 && uvi < 7) {
                        uvEl.setAttribute("class", "p-2 border col-2 mx-3 mb-3 bg-warning");    
                    } else if (uvi > 7) {
                        uvEl.setAttribute("class", "p-2 border col-2 mx-3 mb-3 bg-danger");   
                    }
    
                })
            }
        })
        
    };

    function fiveDay (lon, lat) {
        let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=Minutely,hourly&units=imperial&appid=dee89b7fccd367887e9d18c1350058ee"

        fetch(apiUrl).then(function(response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function(data) {
                    // daily temperature holders
                    let day1Icon;
                    let day2Icon;
                    let day3Icon;
                    let day4Icon;
                    let day5Icon;
                    let day1Max;
                    let day2Max;
                    let day3Max;
                    let day4Max;
                    let day5Max;
                    let day1Min;
                    let day2Min;
                    let day3Min;
                    let day4Min;
                    let day5Min;

                    // data.daily is an array of JSON data - each day is an index
                    let days = data.daily;

                    for (i=0; i < days.length; i++) {

                        day1Icon = [days[0].weather[0].icon];
                        day2Icon = [days[1].weather[0].icon];
                        day3Icon = [days[2].weather[0].icon];
                        day4Icon = [days[3].weather[0].icon];
                        day5Icon = [days[4].weather[0].icon];


                        day1Max = [days[0].temp.max];
                        day2Max = [days[1].temp.max];
                        day3Max = [days[2].temp.max];
                        day4Max = [days[3].temp.max];
                        day5Max = [days[4].temp.max];

                        day1Min = [days[0].temp.min];
                        day2Min = [days[1].temp.min];
                        day3Min = [days[2].temp.min];
                        day4Min = [days[3].temp.min];
                        day5Min = [days[4].temp.min];
                    };
                
                    // Five Day and Current Weather Icons
                    let day1IconUrl =  "http://openweathermap.org/img/w/" + day1Icon + ".png";
                    weatherIconEl.setAttribute('src', day1IconUrl);
                    document.querySelector("#weather-1").setAttribute('src', day1IconUrl);

                    let day2IconUrl =  "http://openweathermap.org/img/w/" + day2Icon + ".png";
                    document.querySelector("#weather-2").setAttribute('src', day2IconUrl);

                    let day3IconUrl =  "http://openweathermap.org/img/w/" + day3Icon + ".png";
                    document.querySelector("#weather-3").setAttribute('src', day3IconUrl);

                    let day4IconUrl =  "http://openweathermap.org/img/w/" + day4Icon + ".png";
                    document.querySelector("#weather-4").setAttribute('src', day4IconUrl);

                    let day5IconUrl =  "http://openweathermap.org/img/w/" + day5Icon + ".png";
                    document.querySelector("#weather-5").setAttribute('src', day5IconUrl);

                    
                    // Five Day Highs and Lows
                    day1MaxEl.textContent = "High: " + day1Max;
                    day1MinEl.textContent = "Low: " + day1Min;

                    day2MaxEl.textContent = "High: " + day2Max;
                    day2MinEl.textContent = "Low: " + day2Min;

                    day3MaxEl.textContent = "High: " + day3Max;
                    day3MinEl.textContent = "Low: " + day3Min;

                    day4MaxEl.textContent = "High: " + day4Max;
                    day4MinEl.textContent = "Low: " + day4Min;

                    day5MaxEl.textContent = "High: " + day5Max;
                    day5MinEl.textContent = "Low: " + day5Min;
                })
            }
        })
    }




userFormEl.addEventListener("click", formSubmitHandler);