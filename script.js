


const submitBtn = document.getElementById('add')
const CURRENT_LOCATION = document.getElementsByClassName('city')[0];
const CURRENT_TEMP = document.getElementsByClassName('add')[0];
const FORECAST = document.getElementsByClassName('forecast')[0];


const apiKey = "4e4c78c92a3432f093e8952d80ccf977";
// here we have the api URL //

const base =
'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=4e4c78c92a3432f093e8952d80ccf977'
// here we are calling th api //

function cityName(event){
  event.preventDefault()
  const cityValue = document.getElementById("city").value
  console.log(cityValue)
  getForecast (cityValue)
}

function getWeatherData() {
  let headers = new Headers();

  return fetch(URL, {
    method: 'GET',
    headers: headers
  }).then(data => {
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

const currentDate = new Date(response.data.dt * 1000);
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
let weatherPic = response.data.weather[0].icon;
currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
currentPicEl.setAttribute("alt", response.data.weather[0].description);
currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
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
