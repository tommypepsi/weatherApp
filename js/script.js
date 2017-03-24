//object with backgrounds info for all different weather
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
//cityId and currentScale are global since we need them at multiple place
var cityId = "";
var currentScale = false;

$(document).ready(function(){

  if(navigator.geolocation)
  {
    //if geolocation is activated we call the getWeather function and activate the interaction for the input to manually selecte another location
    navigator.geolocation.getCurrentPosition(function(pos){

      var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+ pos.coords.latitude +"&lon="+ pos.coords.longitude +"&APPID=75784ba7351c76f72208e9d50929e460";
      inputCityInteraction()
      getWeather(apiLink, false);

    },
    //if the geoolocation is not activated we call the function inputCityInteraction wich is the interaction with the input to manually select a location
    //and remove the button to get the current position
    function(){
      inputCityInteraction()
      $("#currentPos").css("display", "none");
    })
  }

  //when we click on the change location button
  $("#changeLocation").click(function(){
    //we hide the button
    $("#changeLocation").css("display", "none");
    //and display the input to manually change the location
    $("#cityForm").css("display", "block");
  })

  //when we click the current location button we use the geolocation to call the local weather again
  $("#currentPos").click(function(){
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(function(pos){

        var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat="+ pos.coords.latitude +"&lon="+ pos.coords.longitude +"&APPID=75784ba7351c76f72208e9d50929e460";
        getWeather(apiLink, false);
        inputCityInteraction()
      })
    }
  })
})

function inputCityInteraction(){
  //when we are selecting a new location we hide the change location button
  $("#changeLocation").css("display", "none");
  //and show the form to select a new location
  $("#cityForm").css("display", "block");

  //when the writing cursor is in the input (interaction for the autocomplete)
  $("#inputCity").focus(function(){
    //if there's more than zero character in the input
    if($("#inputCity").val().length > 0)
    {
      //we display the suggestions div
      $("#citySelect").css("display", "block")
      //and call the dropdownCity function to add 5 suggestion depending on what we wrote in the input
      dropdownCity(new RegExp($("#inputCity").val(), "gi"), city) //city is an object in a different file
    }
    else{
      //if there's zero character we hide the suggestions
      $("#citySelect").css("display", "none")
    }

    //on input(when we write things in the input)
    $("#inputCity").on("input", function(){
      //if there's more than zero characters
      if($("#inputCity").val().length > 0)
      {
        //we display the suggestions div
        $("#citySelect").css("display", "block")
        //and call the dropdownCity function to add 5 suggestion depending on what we wrote in the input
        dropdownCity(new RegExp($("#inputCity").val(), "gi"), city) //city is an object in a json file
      }
      else
      {
        //if there's zero character we hide the suggestions
        $("#citySelect").css("display", "none")
      }
    })
  })

  //when we click anywhere
  $(window).click(function(){
    //we hide the suggestions
    $("#citySelect").css("display", "none")
  })
  //except when click on a suggestion or the input(or else the suggestions will disappear before calling the api)
  $("#cityForm").click(function(){
    event.stopPropagation();
  })

}

//function to add the suggestions
function dropdownCity(regex, array){
  //initiate the variable for the citys that match the entered location
  var cityMatch = []

  //array is the list of all the city working with openweathermap, for every city
  for(var i = 0; i < array.length; i++)
  {
    //if the number of city that match the location we entered is bello 5(we don't want too many suggestions)
    if(cityMatch.length < 5)
    {
      //and if the current city match with the characters we entered
      if(regex.test(array[i].name))
      {
        //we add the current city to the suggestions
        cityMatch.push(array[i].name);
      }
    }
    //if there is more than 5 match we add the suggestions to the div
    else
    {
      //citys will contain the html for all the 5 suggestions
      var citys = "";
      for(var i = 0; i < cityMatch.length; i++)
      {
        citys += "<div class='citys'>" + cityMatch[i] + "</div>";

      }
      //we also need to add a script to interact with the new html since our current javascript can't interact with html added afterward
      var script = "<script>" +
      '$(".citys").click(function(){' +
        //selectCity function will call the api with the selected city
        'selectCity($(this).html());' +
        '$("#citySelect").css("display", "none");' +
        '$("#inputCity").val("");' +
      '})' +
      "</script>";
      //and finally we and the loop by adding our new html for the suggestions
      return $("#citySelect").html(citys + script);
    }

  }

  //if there at least one match(will only arrive here if there's less than 5 match) we add the html for the suggestions
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

  //else we return -1
  return -1;
}

//function when selecting a city
function selectCity(cityName){
  //we find the id of the selected city in the json file containing all the citys
  var regex = new RegExp("^" + cityName + "$", "i");
  console.log(city.length);
  for(var i = 0; i < city.length; i++)
  {
    if(regex.test(city[i].name))
    {
      cityId = city[i]._id;
    }
  }

  //and call openweathermap with the id of the city
  var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=75784ba7351c76f72208e9d50929e460";
  getWeather(apiLink, currentScale);

}

//function to make the api call
function getWeather(link, bool){  //false = celsius, true = fahrenheit
  //if fahrenheit we add imperial to the link
  if(bool)
  {
    link = link + "&units=imperial"
  }
  //else we add metric to the link
  else
  {
    link = link + "&units=metric"
  }

  //calling the api
  $.getJSON(link, function(json){
      //when we receive the informations we display #center(wich is the wrapper for the weather)
      $("#center").css("display", "block");
      //display the change location button
      $("#changeLocation").css("display", "block");
      //and hide the form to manually select a location
      $("#cityForm").css("display", "none");

      //we get the city id
      cityId = json.id;
      //and the current weather
      var weather = json.weather[0].description;

      //change background video
      if(!isPlayerReady)
      {
        //if the youtube player is not ready we create an event listener to know when it is
        window.addEventListener("playerReady", function(){
          //if it's a different video than the current, we change the necessary informations
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
      //if the player is ready
      else {
        //if it's a different video than the current, we change the necessary informations
        if(videoId != background[weather].id)
        {
          start = background[weather].start;
          end = background[weather].end;
          videoId = background[weather].id
          player.loadVideoById(videoId);
          player.seekTo(start, 1)
        }
      }

      //we add the weather
      $(".weather").html(weather);

      //we add the temperature with the correct scale
      if(bool)
      {
        $("#temp").html(json.main.temp + "°F")
      }
      else
      {
        $("#temp").html(json.main.temp + "°C")
      }

      //we add the location
      $("#location").html(json.name + ", " + json.sys.country)
      //and display the buttons to change the scale
      $("#scale").css("display", "block");
  })

  //on click on celsius button we call the api with metric
  $("#celsius").click(function(){
    currentScale = false;
    var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=75784ba7351c76f72208e9d50929e460";
    getWeather(apiLink, currentScale)
  })
  //on click on fahrenheit button we call the api with imperial
  $("#far").click(function(){
    currentScale = true;
    var apiLink = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=75784ba7351c76f72208e9d50929e460";
    getWeather(apiLink, currentScale)
  })
}
