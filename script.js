FORECAST = document.getElementsByClassName('forecast')[0];


const apiKey = "4e4c78c92a3432f093e8952d80ccf977";
// here we have the api URL //

const base =
'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=4e4c78c92a3432f093e8952d80ccf977'
// here we are calling th api //


function getWeatherData() {
  let headers = new Headers();

  return fetch(URL, {
    method: 'GET',
    headers: headers
  }).then(data =>    function loadRecentCities() {
    let recentCities = JSON.parse(localStorage.getItem("cities"));

    if (recentCities) {
      cities = recentCities;
    } else {
      cities = [];
    }
  }{
    return data.json();
  });
}


// Here we are able to get tha date as well as the 5 days for the forecast

let NowMoment = moment().format("l");

let day1 = moment().add(1, "days").format("l");
let day2 = moment().add(2, "days").format("l");
let day3 = moment().add(3, "days").format("l");
let day4 = moment().add(4, "days").format("l");
let day5 = moment().add(5, "days").format("l");

// Here we are searching the function for the inputed city name
function search() {
      
  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=4e4c78c92a3432f093e8952d80ccf977";
  let coords = [];

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    
    coords.push(response.coord.lat);
    coords.push(response.coord.lon);
    let cityName = response.name;
    let cityCond = response.weather[0].description.toUpperCase();
    let cityTemp = response.main.temp;
    let cityHum = response.main.humidity;
    let cityWind = response.wind.speed;
    let icon = response.weather[0].icon;
    $("#icon").html(
      `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
    );
    $("#city-name").html(cityName + " " + "(" + NowMoment + ")");
    $("#city-cond").text("Current Conditions: " + cityCond);
    $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
    $("#humidity").text("Humidity: " + cityHum + "%");
    $("#wind-speed").text("Wind Speed: " + cityWind + "mph");
    $("#date1").text(day1);
    $("#date2").text(day2);
    $("#date3").text(day3);
    $("#date4").text(day4);
    $("#date5").text(day5);

    getUV(response.coord.lat, response.coord.lon);
  }).fail(function (){
    alert("Could not get data")
  });

  // CURRENT_TEMP.innerHTML =
  // `<i class="wi ${applyIcon(currentWeather.icon)}"></i>
  // ${Math.round(forecast[0].temp.day)} <i class="wi wi-degrees"></i>`;

  // CURRENT_LOCATION.innerHTML = widgetHeader;


// Here we are displaying code for displaying the 5 days weather forecase for each city //

function getUV(lat, lon) {
       
          
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&units=imperial&appid=42d98d76405f5b8038f2ad71187af430",
    method: "GET",
  }).then(function (response) {

    //code to determine UV index severity
    let uvIndex = response.current.uvi;
    $("#uv-index").text("UV Index:" + " " + uvIndex);
    if (uvIndex >= 8) {
      $("#uv-index").css("color", "red");
    } else if (uvIndex > 4 && uvIndex < 8) {
      $("#uv-index").css("color", "yellow");
    } else {
      $("#uv-index").css("color", "green");
    }
    let cityHigh = response.daily[0].temp.max;
    $("#high").text("Expected high (F): " + " " + cityHigh);

    //forecast temp variables
    let day1temp = response.daily[1].temp.max;
    let day2temp = response.daily[2].temp.max;
    let day3temp = response.daily[3].temp.max;
    let day4temp = response.daily[4].temp.max;
    let day5temp = response.daily[5].temp.max;
    //forecast humidity variables
    let day1hum = response.daily[1].humidity;
    let day2hum = response.daily[2].humidity;
    let day3hum = response.daily[3].humidity;
    let day4hum = response.daily[4].humidity;
    let day5hum = response.daily[5].humidity;
    //forecast weather icon variables
    let icon1 = response.daily[1].weather[0].icon;
    let icon2 = response.daily[2].weather[0].icon;
    let icon3 = response.daily[3].weather[0].icon;
    let icon4 = response.daily[4].weather[0].icon;
    let icon5 = response.daily[5].weather[0].icon;
    //
    $("#temp1").text("Temp(F):" + " " + day1temp.toFixed(1));
    $("#temp2").text("Temp(F):" + " " + day2temp.toFixed(1));
    $("#temp3").text("Temp(F):" + " " + day3temp.toFixed(1));
    $("#temp4").text("Temp(F):" + " " + day4temp.toFixed(1));
    $("#temp5").text("Temp(F):" + " " + day5temp.toFixed(1));

    $("#hum1").text("Hum:" + " " + day1hum + "%");
    $("#hum2").text("Hum:" + " " + day2hum + "%");
    $("#hum3").text("Hum:" + " " + day3hum + "%");
    $("#hum4").text("Hum:" + " " + day4hum + "%");
    $("#hum5").text("Hum:" + " " + day5hum + "%");

    $("#icon1").html(
      `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
    );
    $("#icon2").html(
      `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
    );
    $("#icon3").html(
      `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
    );
    $("#icon4").html(
      `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
    );
    $("#icon5").html(
      `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`
    );
  });
}
}
        
        
function forecast(cityid){
    var dayover= false;
    var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
    $.ajax({
        url:queryforcastURL,
        method:"GET"
    }).then(function(response){
        
        for (i=0;i<5;i++){
            var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
            var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
            var tempK= response.list[((i+1)*8)-1].main.temp;
            var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
            var humidity= response.list[((i+1)*8)-1].main.humidity;
        
            $("#fDate"+i).html(date);
            $("#fImg"+i).html("<img src="+iconurl+">");
            $("#fTemp"+i).html(tempF+"&#8457");
            $("#fHumidity"+i).html(humidity+"%");
          }
        
        })
}

// Here we have local storage //

function SavingCitiesStorage(city){

    if (localStorage.getItem('city') === null){
      localStorage.setItem('city', JSON.stringify([city]))
    }
    else{
    var citySearched = JSON.parse(localStorage.getItem('city'))
    citySearched.push(city)
    localStorage.setItem('city', JSON.stringify(citySearched))
    }
  }
 
  
submitBtn.addEventListener("click",cityName)    
