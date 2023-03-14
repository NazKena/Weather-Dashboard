const apiKey = "4e4c78c92a3432f093e8952d80ccf977";
// here we have the api URL //

const base =
'https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=4e4c78c92a3432f093e8952d80ccf977'
// here we are calling th api //

function getForecast(city){
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
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


