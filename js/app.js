'use strict';

var apiKey = '428a20d6f31803d62bc3d29c0eff0937';
// var spinnerElement = document.querySelector('.spinner');
var headerElement = document.querySelector('header');
var menuIconElement = document.querySelector('.header-icon');
var menuElement = document.querySelector('.menu');
var menuOverlayElement = document.querySelector('.menu-overlay');
var cardElement = document.querySelector('.card');

//To show/hide loading indicator
function toggleSpinner() {
  if (spinnerElement.classList.contains('hide')) {
    spinnerElement.classList.remove('hide');
  }
  else {
    spinnerElement.classList.add('hide');
  }
}

//To update network status
function updateNetworkStatus() {
  if (navigator.onLine) {
    headerElement.classList.remove('offline');
  }
  else {
    headerElement.classList.add('offline');
    showSnackBar('offline');
  }
}

//To show menu
function showMenu() {
  menuElement.classList.add("show");
  menuOverlayElement.classList.add("show");
}

//To hide menu
function hideMenu() {
  menuElement.classList.remove("show");
  menuOverlayElement.classList.remove("show");
}

menuIconElement.addEventListener("click", showMenu, false);
menuOverlayElement.addEventListener("click", hideMenu, false);

(function () {

  //If `serviceWorker` is registered and ready
  navigator.serviceWorker.ready
    .then(function (registration) {
      isPushSupported(registration); //To check push is supported and enabled
    })

  //Check network status
  window.addEventListener('online', updateNetworkStatus, false);
  window.addEventListener('offline', updateNetworkStatus, false);

  //Get weather info via `Fetch API`
  function fetchWeatherInfo() {
    var url = 'http://api.openweathermap.org/data/2.5/weather?q=Bangalore,India&appid=' + apiKey;

    fetch(url, { method: 'GET' })
    .then(function(resp){ return resp.json() })
      .then(function(res) {
        console.log(res);
        cardElement.querySelector('.card-title span').textContent = res.name + ', ' + res.sys.country;
        cardElement.querySelector('.card-wind-info span').textContent = res.wind.speed + 'KM/H';
        cardElement.querySelector('.card-humidity-info span').textContent = res.main.humidity + "%";
        cardElement.querySelector('.card-max-temp span').textContent = res.main.temp_max;
        cardElement.querySelector('.card-min-temp span').textContent = res.main.temp_min;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  fetchWeatherInfo();
})();
