const apiKey = "4e4c78c92a3432f093e8952d80ccf977";
// here we have the api URL //

const base =
`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
`lon=${lon}&appid=4e4c78c92a3432f093e8952d80ccf977
`;

// here we are calling th api //

fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          temperature.textContent = 
              Math.floor(data.main.temp - kelvin) + "°C";
          summary.textContent = data.weather[0].description;
          loc.textContent = data.name + "," + data.sys.country;
     })



form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

let NowMoment = moment().format("l");

let day1 = moment().add(1, "days").format("l");
let day2 = moment().add(2, "days").format("l");
let day3 = moment().add(3, "days").format("l");
let day4 = moment().add(4, "days").format("l");
let day5 = moment().add(5, "days").format("l");

})

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


