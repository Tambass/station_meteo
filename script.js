var now = new Date();
var heure = now.getHours();
var minutes = now.getMinutes();

const miseAJour = document.getElementById("maj");
miseAJour.innerText = "Mise à jour à " + heure + ":" + minutes;
//console.log(miseAJour);



//const city = document.getElementById('city')
//const queryLoc = document.getElementById('queryLoc').value
//city.innerText = queryLoc

var callBackGetSuccess = function (data) {
  //console.log("donnees api", data);
  //alert("Meteo temp  : "  + data.main.temp);
  var temp = document.getElementById("temp");
  temp.innerHTML = data.main.temp + "°C";
  var description = document.getElementById("weather-main");
  description.innerHTML = data.weather[0].description;
  
  
};

function buttonClickGET() {
  var queryLoc = document.getElementById("queryLoc").value;
  var city = document.getElementById("city");
  city.innerText = queryLoc;
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    queryLoc +
    "&appid=b7062e52926ecc78dde9910e256b1067&units=metric";
  $.get(url, callBackGetSuccess)
    .done(function () {
      //alert( "second success" );
    })
    .fail(function () {
      alert("error");
    })
    .always(function () {
      //alert( "finished" );
    });
    
}
