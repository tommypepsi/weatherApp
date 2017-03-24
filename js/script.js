var background =
{
  "clear sky": { "id": "fy4-CnXCSwo", "start": 24, "end": 36},
  "few clouds": { "id": "2eN58_TDA2I", "start": -1, "end": -1},
  "scattered clouds": { "id": "YgmIibSnZs0", "start": -1, "end": -1},
  "broken clouds": { "id": "hpRQo0yD-FU", "start": -1, "end": -1},
  "overcast clouds": { "id": "hpRQo0yD-FU", "start": -1, "end": -1},

  "shower rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "light intensity drizzle": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "drizzle": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "heavy intensity drizzle": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "light intensity drizzle rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "drizzle rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "heavy intensity drizzle rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "shower rain and drizzle": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "heavy shower rain and drizzle": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "shower drizzle": { "id": "GquEnoqZAK0", "start": -1, "end": -1},

  "rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "light rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "moderate rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "heavy intensity rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "very heavy rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "extreme rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "freezing rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "light intensity shower rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "shower rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "heavy intensity shower rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},
  "ragged shower rain": { "id": "GquEnoqZAK0", "start": -1, "end": -1},

  "thunderstorm": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "thunderstorm with light rain": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "thunderstorm with rain": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "thunderstorm with heavy rain": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "light thunderstorm": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "heavy thunderstorm": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "ragged thunderstorm": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "thunderstorm with light drizzle": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "thunderstorm with drizzle": { "id": "vySqIfaptvc", "start": 229, "end": 315},
  "thunderstorm with heavy drizzle": { "id": "vySqIfaptvc", "start": 229, "end": 315},

  "snow": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "light snow": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "heavy snow": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "sleet": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "shower sleet": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "light rain and snow": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "rain and snow": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "light shower snow": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "shower snow": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},
  "heavy shower snow": { "id": "V6cNXL2TUIM", "start": -1, "end": -1},

  "mist": { "id": "ggA9SNRPYdo", "start": 35, "end": 37}
}
var cityId = "";
var currentScale = false;

$(document).ready(function(){
  if(navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(function(pos){

      var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+ pos.coords.latitude +"&lon="+ pos.coords.longitude +"&APPID=75784ba7351c76f72208e9d50929e460";
      getWeather(apiLink, false);
      inputCityInteraction()
    },
    function(){
      inputCityInteraction()
      $("#currentPos").css("display", "none");
      /*$("#cityForm").focusout(function(){
        $("#citySelect").css("display", "none")
      })*/
    })
  }

  $(window).click(function(){
    $("#citySelect").css("display", "none")
  })
  $("#cityForm").click(function(){
    event.stopPropagation();
  })
  $("#changeLocation").click(function(){
    $("#changeLocation").css("display", "none");
    $("#cityForm").css("display", "block");
  })

  $("#currentPos").click(function(){
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(function(pos){

        var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+ pos.coords.latitude +"&lon="+ pos.coords.longitude +"&APPID=75784ba7351c76f72208e9d50929e460";
        getWeather(apiLink, false);
        inputCityInteraction()
      },
      function(){
        inputCityInteraction()
        /*$("#cityForm").focusout(function(){
          $("#citySelect").css("display", "none")
        })*/
      })
    }
  })
})

function inputCityInteraction(){
  $("#changeLocation").css("display", "none");
  $("#cityForm").css("display", "block");
  $("#inputCity").focus(function(){
    if($("#inputCity").val().length > 0)
    {
      $("#citySelect").css("display", "block")
      dropdownCity(new RegExp($("#inputCity").val(), "gi"), city) //city is an object in a different file
    }
    else{
      $("#citySelect").css("display", "none")
    }

    $("#inputCity").on("input", function(){
      if($("#inputCity").val().length > 0)
      {
        $("#citySelect").css("display", "block")
        dropdownCity(new RegExp($("#inputCity").val(), "gi"), city) //city is an object in a json file
      }
      else
      {
        $("#citySelect").css("display", "none")
      }
    })
  })
}

function dropdownCity(regex, array){
  var cityMatch = []

  for(var i = 0; i < array.length; i++)
  {
    if(cityMatch.length < 5)
    {
      if(regex.test(array[i].name))
      {
        cityMatch.push(array[i].name);
      }
    }
    else
    {
      var citys = "";
      for(var i = 0; i < cityMatch.length; i++)
      {
        citys += "<div class='citys'>" + cityMatch[i] + "</div>";

      }
      var script = "<script>" +
      '$(".citys").click(function(){' +
        'selectCity($(this).html());' +
        '$("#citySelect").css("display", "none");' +
        '$("#inputCity").val("");' +
      '})' +
      "</script>";
      return $("#citySelect").html(citys + script);
    }

  }

  if(cityMatch)
  {
    var citys = "";
    for(var i = 0; i < cityMatch.length; i++)
    {
      citys += "<div class='citys'>" + cityMatch[i] + "</div>";
    }
    var script = "<script>" +
    '$(".citys").click(function(){' +
      'selectCity($(this).html());' +
      '$("#citySelect").css("display", "none");' +
      '$("#inputCity").val("");' +
    '})' +
    "</script>";
    return $("#citySelect").html(citys + script);
  }

  return -1;
}

function selectCity(cityName){

  var regex = new RegExp("^" + cityName + "$", "i");
  console.log(city.length);
  for(var i = 0; i < city.length; i++)
  {
    if(regex.test(city[i].name))
    {
      cityId = city[i]._id;
    }
  }


  var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=75784ba7351c76f72208e9d50929e460";
  getWeather(apiLink, currentScale);

}

function getWeather(link, bool){  //false = celsius, true = fahrenheit

  if(bool)
  {
    link = link + "&units=imperial"
  }
  else
  {
    link = link + "&units=metric"
  }
  $.getJSON(link, function(json){
      console.log(JSON.stringify(json))
      console.log(JSON.stringify(json.weather[0].description))
      $("#center").css("display", "block");
      $("#changeLocation").css("display", "block");
      $("#cityForm").css("display", "none");
      cityId = json.id;
      var weather = json.weather[0].description;

      //change background
      if(!isPlayerReady)
      {
        window.addEventListener("playerReady", function(){
          if(videoId != background[weather].id)
          {
            start = background[weather].start;
            end = background[weather].end;
            videoId = background[weather].id
            player.loadVideoById(videoId);
            player.seekTo(start, 1)
          }
        })
      }
      else {
        if(videoId != background[weather].id)
        {
          start = background[weather].start;
          end = background[weather].end;
          videoId = background[weather].id
          player.loadVideoById(videoId);
          player.seekTo(start, 1)
        }
      }




      $(".weather").html(weather);

      if(bool)
      {
        $("#temp").html(json.main.temp + "°F")
      }
      else
      {
        $("#temp").html(json.main.temp + "°C")
      }

      $("#location").html(json.name + ", " + json.sys.country)
      $("#scale").css("display", "block");
  })

  $("#celsius").click(function(){
    currentScale = false;
    var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=75784ba7351c76f72208e9d50929e460";
    getWeather(apiLink, currentScale)
  })
  $("#far").click(function(){
    currentScale = true;
    var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=75784ba7351c76f72208e9d50929e460";
    getWeather(apiLink, currentScale)
  })
}
