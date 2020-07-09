
//console.log(miseAJour);

// API GEO.GOUV.FR

$(document).ready(function (data) {
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
      method: "get",
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

  const body = document.querySelector('body');
  if(temp.innerHTML >= 25){

  }


  var description = document.getElementById("weather-main");
  description.innerHTML = data.weather[0].description;


  //   var icon = document.getElementById("weather-icon");
  //   var logo = data.weather[0].icon;
  //   var urlImage = "http://openweathermap.org/img/wn/"+ logo +"@2x.png"
  //   icon.innerHTML = urlImage

  // console.log(urlImage);
  console.log(description);
  /*
  // ESSAI CHANGEMENT ICON CARTE PRINCIPALE

  var soleil = new Image();
  soleil.scr = "./images/soleil.png";
  var neige = new Image();
  neige.scr = "./images/neige.png";
  var nuage = new Image();
  nuage.scr = "./images/nuage.png";
  var nuageux = new Image();
  nuageux.scr = "./images/nuageux.png";
  var orage = new Image();
  orage.scr = "./images/orage.png";
  var pluie = new Image();
  pluie.scr = "./images/pluie.png";
  var iconTagWeather = document.getElementById("weather-icon");
  iconTagWeather.innerText = data.weather[0].icon;

  console.log(iconTagWeather);

  if (iconTagWeather === "01d") {
    iconTagWeather = iconTagWeather.replace("01d", soleil);
    return iconTagWeather;
  } else if (iconTagWeather.value === "02d") {
    iconTagWeather = iconTagWeather.replace("02d", nuageux);
  } else if (
    iconTagWeather === "04d" ||
    iconTagWeather === "03d" ||
    iconTagWeather === "50d"
  ) {
    iconTagWeather = nuage;
  } else if (iconTagWeather === "09d" || iconTagWeather === "10d") {
    iconTagWeather = pluie;
  } else if (iconTagWeather === "11d") {
    iconTagWeather = orage;
  } else if (iconTagWeather === "13d") {
    iconTagWeather = neige;
  }
*/
  var image = data.weather[0].icon;
  $("#weather-icon").attr(
    "src",
    "http://openweathermap.org/img/wn/" + image + ".png"
    );
    
  // var matin = document.querySelector('.temperature-value');
  // matin.innerText = data.list[0].main.temp;
};



//fonction pour l affichage du matin au soir 

var callBackGet = function(list){

  var now = new Date();
  var heure = now.getHours();
  var minutes = now.getMinutes();

  const miseAJour = document.getElementById("maj");
  miseAJour.innerText = "Mise à jour à " + heure + ":" + minutes;

  var matin = document.querySelector('.temperature-am');
  matin.innerText = list.list[0].main.temp +"°C"; 
//fonction pour l affichage du matin au soir


  /*
  // Variables pour les images

  var soleil = new Image();
  soleil.scr = "./images/solail.png";
  var neige = new Image();
  neige.scr = "./images/neige.png";
  var nuage = new Image();
  nuage.scr = "./images/nuage.png";
  var nuageux = new Image();
  nuageux.scr = "./images/nuageux.png";
  var orage = new Image();
  orage.scr = "./images/orage.png";
  var pluie = new Image();
  pluie.scr = "./images/pluie.png";
  var iconTagAm = document.getElementById("am-icon");
  var iconAm = list.list[0].weather[0].icon.value;
  var iconTagPm = document.getElementById("pm-icon");
  var iconPm = list.list[2].weather[0].icon.value;
*/
  // MATIN

  var matin = document.querySelector(".temperature-am");
  matin.innerText = list.list[0].main.temp + "°C";
  /*
  // ESSAI CHANGEMENT ICONS

  if (iconAm === "01d") {
    iconTagAm = soleil;
  } else if (iconAm === "02d") {
    iconTagAm = nuageux;
  } else if (iconAm === "04d" || iconAm === "03d" || iconAm === "50d") {
    iconTagAm = nuage;
  } else if (iconAm === "09d" || iconAm === "10d") {
    iconTagAm = pluie;
  } else if (iconAm === "11d") {
    iconTagAm = orage;
  } else if (iconAm === "13d") {
    iconTagAm = neige;
  }
*/
  var image = list.list[0].weather[0].icon;
  $("#am-icon").attr(
    "src",
    "http://openweathermap.org/img/wn/" + image + ".png"
  );
  var humiditeAm = document.querySelector(".humidite-am");
  humiditeAm.innerText = list.list[0].main.humidity + "%";

  // APRÈS-MIDI

  var apresMidi = document.querySelector(".temperature-pm");
  apresMidi.innerText = list.list[2].main.temp + "°C";
  /*
  // ESSAI CHANGEMENT ICONS

  if (iconPm === "01d") {
    iconTagPm = soleil;
  } else if (iconPm === "02d") {
    iconTagPm = nuageux;
  } else if (iconPm === "04d" || iconPm === "03d" || iconPm === "50d") {
    iconTagPm = nuage;
  } else if (iconPm === "09d" || iconPm === "10d") {
    iconTagPm = pluie;
  } else if (iconPm === "11d") {
    iconTagPm = orage;
  } else if (iconPm === "13d") {
    iconTagPm = neige;
  }
*/
  var image = list.list[2].weather[0].icon;
  $("#pm-icon").attr(
    "src",
    "http://openweathermap.org/img/wn/" + image + ".png"
  );
  var humiditePm = document.querySelector(".humidite-pm");
  humiditePm.innerText = list.list[2].main.humidity + "%";

  // SOIR

  var soir = document.querySelector(".temperature-soir");
  soir.innerText = list.list[4].main.temp + "°C";
  var image = list.list[4].weather[0].icon;
  $("#soir-icon").attr(
    "src",
    "http://openweathermap.org/img/wn/" + image + ".png"
  );
  var humiditeSoir = document.querySelector(".humidite-soir");
  humiditeSoir.innerText = list.list[4].main.humidity + "%";

  // NUIT

  var nuit = document.querySelector(".temperature-nuit");
  nuit.innerText = list.list[5].main.temp + "°C";
  var image = list.list[5].weather[0].icon;
  $("#nuit-icon").attr(
    "src",
    "http://openweathermap.org/img/wn/" + image + ".png"
  );
  var humiditeNuit = document.querySelector(".humidite-nuit");
  humiditeNuit.innerText = list.list[5].main.humidity + "%";

  //chemin pour la date des jours suivants

  /*J +1
  ==================*/

const jourUn = document.getElementById('jourUn')
  var test = list.list[9].dt_txt;
  var date = test.split(' ').slice(0, 1).join();
  var jour = date.slice(5).replace('-', ' ');
  var days = jour.split(' ').reverse().join('/')
  jourUn.innerText = days


  var tempUn = document.querySelector('.temperature-un');
  tempUn.innerText = list.list[9].main.temp +"°C"; 
  var image = list.list[9].weather[0].icon;
  $("#icon-un").attr("src", "http://openweathermap.org/img/wn/" + image + ".png");
  var humiditeUn = document.querySelector('.humidite-un');
  humiditeUn.innerText = list.list[9].main.humidity + "%";
  
  /*J+2
  =================*/

  const jourDeux = document.getElementById('jourDeux')
  var test = list.list[17].dt_txt;
  var date = test.split(' ').slice(0, 1).join();
  var jour = date.slice(5).replace('-', ' ');
  var days = jour.split(' ').reverse().join('/')
  jourDeux.innerText = days

  var tempDeux = document.querySelector('.temperature-deux');
  tempDeux.innerText = list.list[17].main.temp +"°C"; 
  var image = list.list[17].weather[0].icon;
  $("#icon-deux").attr("src", "http://openweathermap.org/img/wn/" + image + ".png");
  var humiditeDeux = document.querySelector('.humidite-deux');
  humiditeDeux.innerText = list.list[17].main.humidity + "%";

  /*J+3
  =================*/

  const jourTrois = document.getElementById('jourTrois')
  var test = list.list[25].dt_txt;
  var date = test.split(' ').slice(0, 1).join();
  var jour = date.slice(5).replace('-', ' ');
  var days = jour.split(' ').reverse().join('/')
  jourTrois.innerText = days

  var tempTrois = document.querySelector('.temperature-trois');
  tempTrois.innerText = list.list[25].main.temp +"°C"; 
  var image = list.list[25].weather[0].icon;
  $("#icon-trois").attr("src", "http://openweathermap.org/img/wn/" + image + ".png");
  var humiditeTrois = document.querySelector('.humidite-trois');
  humiditeTrois.innerText = list.list[25].main.humidity + "%";

  /*J+4
  =====================*/

  const jourQuatre = document.getElementById('jourQuatre')
  var test = list.list[33].dt_txt;
  var date = test.split(' ').slice(0, 1).join();
  var jour = date.slice(5).replace('-', ' ');
  var days = jour.split(' ').reverse().join('/')
  jourQuatre.innerText = days

  var tempQuatre = document.querySelector('.temperature-quatre');
  tempQuatre.innerText = list.list[33].main.temp +"°C"; 
  var image = list.list[33].weather[0].icon;
  $("#icon-quatre").attr("src", "http://openweathermap.org/img/wn/" + image + ".png");
  var humiditeQuatre = document.querySelector('.humidite-quatre');
  humiditeQuatre.innerText = list.list[33].main.humidity + "%";

}

function buttonClickGET() {
  var queryLoc = document.getElementById("queryLoc").value.slice(0, 2);
  var dep = document.getElementById("dep");
  var loccity = document.getElementById("loc-city").value;
  var city = document.getElementById("city");
  var city2 = document.getElementById("ville");
  city.innerText = loccity;
  city2.innerText = loccity;
  dep.innerText = "(" + queryLoc + ")";

  var depNext = document.getElementById("dep-next");
  var cityNext = document.getElementById("ville-next");
  cityNext.innerText = loccity;
  depNext.innerText = "(" + queryLoc + ")";


  var url = [
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      loccity +
      "&lang=fr&appid=b7062e52926ecc78dde9910e256b1067&units=metric",

    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      loccity +
      "&lang=fr&appid=b7062e52926ecc78dde9910e256b1067&units=metric",
  ];

  $.get(url[0], callBackGetSuccess)
    .done(function () {
      //alert( "second success" );
    })
    .fail(function () {
      alert("error");
    })
    .always(function () {
      //alert( "finished" );
    });

  $.get(url[1], callBackGet)
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
