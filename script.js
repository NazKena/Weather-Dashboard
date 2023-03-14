const CURRENT_LOCATION = document.getElementsByClassName('city')[0];
const CURRENT_TEMP = document.getElementsByClassName('add')[0];
const FORECAST = document.getElementsByClassName('forecast')[0];


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
  }).then(data => {
    return data.json();
  });
}

function getForecast(city){
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" + apiKey + "&units=imperial";
      fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
      })
      .then(function (data) {
        currentForecast(data);
        fiveDayforecast(data);
        if("" === $("#search-input").val()){
          return 
        }else{
          SavingCitiesStorage(city)
        }
        displayCitySearch (city);
      });
  }

renderData = (location, forecast) => {
  const currentWeather = forecast[0].weather[0];
  const widgetHeader =
  `<h1>${location}</h1><small>${currentWeather.description}</small>`;

  CURRENT_TEMP.innerHTML =
  `<i class="wi ${applyIcon(currentWeather.icon)}"></i>
  ${Math.round(forecast[0].temp.day)} <i class="wi wi-degrees"></i>`;

  CURRENT_LOCATION.innerHTML = widgetHeader;

  // Here we have the forecast for each day // 

  forecast.forEach(day => {
    let date = new Date(day.dt * 1000);
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    let name = days[date.getDay()];
    let dayBlock = document.createElement("div");
    dayBlock.className = 'forecast__item';
    dayBlock.innerHTML =
      `<div class="forecast-item__heading">${name}</div>
      <div class="forecast-item__info">
      <i class="wi ${applyIcon(day.weather[0].icon)}"></i>
      <span class="degrees">${Math.round(day.temp.day)}
      <i class="wi wi-degrees"></i></span></div>`;
    FORECAST.appendChild(dayBlock);
  });
}
// Here we are displaying code for displaying the 5 days weather forecase for each city //
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
        
    });
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
  
  function displayCitySearch (city){
    searchedCityContainer.innerHTML=""
  let getCity = JSON.parse(localStorage.getItem('city'))
  if(getCity){
    for (let i = 0; i < getCity.length; i++) {
      let cityList = document.createElement("button")  
      cityList.setAttribute("class", "cityButton")
      searchedCityContainer.appendChild(cityList)
      cityList.innerHTML = getCity[i]
      cityList.onclick=cityClick
    }
  }
  }


