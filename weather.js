$(document).ready(function () {


  $("#getweatherbtn").on("click", function () {
    var searchValue = $("#cityInput").val();
    getWeatherApi(searchValue);
  });


});




function getWeatherApi(searchValue) {

  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=348ba66debeb34f72117a7d79236af5c&units=imperial",
    dataType: "json",
    success: function (data) {
      // console.log(data);
      var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
      $("#cityName").text(data.name + " " + new Date().toLocaleDateString()).append(img);
      $("#temp").text("Temperature: " + data.main.temp + " °F");
      $("#hum").text("Humidity: " + data.main.humidity + "%");
      $("#windSpeed").text("Wind Speed: " + data.wind.speed + " MPH");
      



      getForecastApi(searchValue);
      getUVI(data.coord.lat, data.coord.lon)
    }
  });

}

function getForecastApi(searchValue) {

  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=348ba66debeb34f72117a7d79236af5c&units=imperial",
    dataType: "json",
    success: function (data) {
      console.log(data);
      $("#day1").text(data.list[0].dt_txt);
      $("#day2").text(data.list[7].dt_txt);
      $("#day3").text(data.list[15].dt_txt);
      $("#day4").text(data.list[23].dt_txt);
      $("#day5").text(data.list[31].dt_txt);
      // temp 
      $("#temp1").text("Temp: "+data.list[0].main.temp+" °F")
      $("#temp2").text("Temp: "+data.list[7].main.temp+" °F")
      $("#temp3").text("Temp: "+data.list[15].main.temp+" °F")
      $("#temp4").text("Temp: "+data.list[23].main.temp+" °F")
      $("#temp5").text("Temp: "+data.list[31].main.temp+" °F")
// humidity
      $("#h1").text("Humidity: "+data.list[0].main.humidity+" %")
      $("#h2").text("Humidity: "+data.list[7].main.humidity+" %")
      $("#h3").text("Humidity: "+data.list[15].main.humidity+" %")
      $("#h4").text("Humidity: "+data.list[23].main.humidity+" %")
      $("#h5").text("Humidity: "+data.list[31].main.humidity+" %")







var img2=$("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[0].dt_txt.icon+ ".png")
      $("#test").append(img2);
      $.each()



    }
  });

}


function getUVI(lat, lon) {
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/uvi?appid=e582310c46f833d7fd04e89862c2fe02&lat=" + lat + "&lon=" + lon,
    dataType: "json",
    success: function (data) {
      var btn = $("<span>").addClass("btn btn-sm").text(data.value);
      if (data.value < 3) {
        $("#uv").text("UV Index: ").append(btn.addClass("bg-success"));
      } else if (data.value < 7) {
        $("#uv").text("UV Index: ").append(btn.addClass("bg-warning"));
      } else {
        $("#uv").text("UV Index: ").append(btn.addClass("bg-danger"));
      }




      //  console.log(data)
    }
  });
}