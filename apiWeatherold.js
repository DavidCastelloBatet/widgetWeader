// API openweathermap.org/api versio free
// https://home.openweathermap.org/api_keys
// https://openweathermap.org/current
// apiURL = https://api.openweathermap.org/data/2.5/weather?lat=10.48&lon=-99.77&lang=ca&&exclude=minutely,hourly,alerts&units=metric&appid=48f0f025ade27e857f008e8e57c4fb60
// https://api.openweathermap.org/data/2.5/weather?lat=41.3418191&lon=1.70277&lang=ca&&exclude=minutely,hourly,alerts&units=metric&appid=48f0f025ade27e857f008e8e57c4fb60

let lat = false;
let long = false;

let temps = document.getElementById("temps");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let summary = document.getElementById("summary");
let city = document.getElementById("city");

let previsio = document.getElementById("previsio");

window.addEventListener("load", () => {
  console.log("finestra carregada");

  if (lat || long)
    if (navigator.geolocation) {
      // Obtindre localització "local" + fetch API
      console.log(navigator.geolocation);
      // localització
      navigator.geolocation.getCurrentPosition((location) => {
        console.log(location);

        lat = location.coords.latitude;

        console.log(lat);
        long = location.coords.longitude;
        console.log(long);

        // Crida a l'API
        const apiWeatherKey = "48f0f025ade27e857f008e8e57c4fb60";
        const urlAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=ca&&exclude=minutely,hourly,alerts&units=metric&appid=${apiWeatherKey}`;
        const urlAPIPrevisio = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=ca&&exclude=minutely,hourly,alerts&units=metric&appid=${apiWeatherKey}`;

        // Fetch temps actual
        fetch(urlAPI)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            // estils basics - provisional !! -
            temps.style.backgroundColor = "lightgrey";
            temps.style.width = "250px";
            temps.style.padding = "10px";
            temps.style.border = "3px solid black";
            // icono
            let iconData = data.weather[0].icon;
            icon.innerHTML = `<img src="http://openweathermap.org/img/w/${iconData}.png">`;
            // nom de la poblacio
            city.textContent = data.name;
            // temperatura actual
            temperature.textContent = `${data.main.temp} ºC`;
            //temps actual
            summary.textContent = data.weather[0].description;
          });

        // Fetch previsio
        fetch(urlAPIPrevisio)
          .then((response) => {
            return response.json();
          })
          .then((dataPrevisio) => {
            console.log(dataPrevisio);
          });
      });
    }
});
