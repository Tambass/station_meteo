var now = new Date();
var heure = now.getHours();
var minutes = now.getMinutes();

const miseAJour = document.getElementById("maj");
miseAJour.innerText = "Mise à jour à " + heure + ":" + minutes;
//console.log(miseAJour);



//const city = document.getElementById('city')
//const queryLoc = document.getElementById('queryLoc').value
//city.innerText = queryLoc

// API GEO.GOUV.FR

$(document).ready(function () {
  const apiUrl = "https://geo.api.gouv.fr/communes?codePostal=";
  const format = "&format=json";

  let queryLoc = $("#queryLoc");
  let loc_city = $("#loc-city");
  let errorMessage = $("#error-message");

  $(queryLoc).on("blur", function () {
    let code = $(this).val();
    // console.log(code);
    let url = apiUrl + code + format;
    // console.log(url);

    fetch(url, {
        method: "get"
      })
      .then((response) => response.json())
      .then((results) => {
        //console.log(results);
        $(loc_city).find("option").remove();
        if (results.length) {
          $(errorMessage).text("").hide();
          $.each(results, function (key, value) {
            //console.log(value);
            // console.log(value.nom);
            $(loc_city).append(
              '<option value="' + value.nom + '">' + value.nom + "</option>"
            );
          });
        } else {
          if ($(queryLoc).val()) {
            console.log("Erreur de code postal.");
            $(errorMessage).text("Aucune commmune avec ce code postal.").show();
          } else {
            $(errorMessage).text("").hide();
          }
        }
      })
      .catch((err) => {
        console.log(err);
        $(loc_city).find("option").remove();
      });
  });
});

// Fonction résultat météo


var callBackGetSuccess = function (data) {
  //console.log("donnees api", data);
  //alert("Meteo temp  : "  + data.main.temp);
  var temp = document.getElementById("temp");
  temp.innerHTML = data.main.temp + "°C";

  var description = document.getElementById("weather-main");
  description.innerHTML = data.weather[0].description;
  
//   var icon = document.getElementById("weather-icon");
//   var logo = data.weather[0].icon;
//   var urlImage = "http://openweathermap.org/img/wn/"+ logo +"@2x.png"
//   $
//   icon.innerHTML = urlImage
   
// console.log(urlImage);

  
  
  
  
  // const nuage = "overcast clouds";
  // const soleil ="clear sky";
//  if(description.innerHTML === nuage){
//   description.innerHTML = description.innerHTML.replace('overcast clouds', 'très nuageux')
//  }else if(description.innerHTML === soleil){
//   description.innerHTML = description.innerHTML.replace('clear sky', 'ciel bleu')
//  }
 

//   console.log(description.innerHTML);
  console.log(description);

  var image = data.weather[0].icon;
  $("#weather-icon").attr("src", "http://openweathermap.org/img/wn/" + image + ".png");
};

function buttonClickGET() {
  var loccity = document.getElementById("loc-city").value;
  var city = document.getElementById("city");
  city.innerText = loccity;
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    loccity +
    "&lang=fr&appid=b7062e52926ecc78dde9910e256b1067&units=metric";
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
