let currentCity = "Delhi";
const apiKey = "d8975a3672c5f867b0d05db6426f1d5b";


async function fetchAQIByCity(cityName) {
  try {
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      document.getElementById("aqi").textContent = "City not found!";
      return;
    }

    const { lat, lon } = geoData[0];

    const aqiAPI = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const aqiResponse = await fetch(aqiAPI);
    const aqiData = await aqiResponse.json();

    const pm25 = aqiData.list[0].components.pm2_5; 
    const pm10 = aqiData.list[0].components.pm10; 
    const aqiCategory = aqiData.list[0].main.aqi; 

    const aqiDescriptions = {
      1: "Good",
      2: "Fair",
      3: "Moderate",
      4: "Poor",
      5: "Very Poor",
    };

    const aqiText = aqiDescriptions[aqiCategory] || "Unknown";
    if(document.getElementById('home').style.display  == 'block'){
      document.getElementById("aqi").textContent = `${pm25.toFixed( 1 )} (${aqiText})`;
      }
      else if (document.getElementById('aqi2').style.display  == 'block') {
        document.getElementById("aqiOnly").textContent = `${pm25.toFixed( 1 )} (${aqiText})`;
      } 
    
  } catch (error) {
    console.error("Error fetching AQI data:", error);
    document.getElementById("aqi").textContent =
      "An error occurred while fetching AQI data.";
  }
}

fetchAQIByCity("delhi");

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city) {
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(weatherAPI);
  var data = await response.json();
  const temperature = (data.main.temp - 273.15).toFixed(2);
  console.log(data);
if(document.getElementById('home').style.display  == 'block'){
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(temperature) + "°C";
  document.querySelector(".humidity").innerHTML = data.main.humidity;
}
else if (document.getElementById('temp').style.display  == 'block') {
  document.getElementById("temperatureOnly").innerHTML = Math.round(temperature) + "°C";
} 

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/7774/7774417.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src =
      "https://static-00.iconduck.com/assets.00/clear-day-icon-1024x1024-exbd0lm2.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src =
      "https://cdn3d.iconscout.com/3d/premium/thumb/weather-6546350-5376613.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src =
      "https://static.vecteezy.com/system/resources/previews/022/287/856/original/3d-rendering-snowy-weather-icon-3d-render-snow-with-cloud-icon-snowfall-png.png";
  } else if (data.weather[0].main == "Smoke") {
    weatherIcon.src =
      "https://cdn3d.iconscout.com/3d/premium/thumb/smoke-5175068-4328031.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src =
      "https://static.vecteezy.com/system/resources/previews/024/825/182/non_2x/3d-weather-icon-day-with-rain-free-png.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src =
      "https://www.freeiconspng.com/thumbs/cloud-rain-icons/cloud-rain-weather-icon-25.png";
  }
}

searchBtn.addEventListener("click", () => {
  currentCity = searchBox.value.trim() || "delhi"; 
  checkWeather(currentCity);
  getCityTime(currentCity);
  fetchAQIByCity(currentCity);
  toggleHome();
});
checkWeather("delhi");

const timeApiKey = "0DA66704YBUZ";
const apiURL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=zone&zone=Europe/London`;

async function getCityTime(city) {
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  try {
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (geoData.length === 0) {
      document.getElementById("time").textContent =
        "City not found. Please try again.";
      return;
    }

    const { lat, lon } = geoData[0];

    const timezoneUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timeApiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
    const timezoneResponse = await fetch(timezoneUrl);
    const timezoneData = await timezoneResponse.json();

    if (timezoneData.status === "OK") {
      const localTime = timezoneData.formatted.split(" ")[1];
      if(document.getElementById('home').style.display  == 'block'){
      document.getElementById("time").textContent = `${localTime}`;
      }
      else if (document.getElementById('TimeClock').style.display  == 'block') {
        document.getElementById("timeOnly").textContent = `${localTime}`;
      } 
    } else {
      document.getElementById("time").textContent = "Error fetching time.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("time").textContent =
      "An error occurred. Please try again.";
  }
}

getCityTime("delhi");



function hideAllCards() {
  const cards = document.querySelectorAll('.weather-card');
  cards.forEach(card => card.style.display = 'none');
}

function toggleHome() {
  hideAllCards();
  document.getElementById('home').style.display = 'block';
}

function toggleTemp() {
  hideAllCards();
  document.getElementById('temp').style.display = 'block';
  console.log(currentCity)
  checkWeather(currentCity);
 
}

function toggleAQI() {
  hideAllCards();
  document.getElementById('aqi2').style.display = 'block';
  console.log(currentCity)
  fetchAQIByCity(currentCity);
}

function toggleTime() {
  hideAllCards();
  document.getElementById('TimeClock').style.display = 'block';
  console.log(currentCity)
  getCityTime(currentCity); 
  fetchAQIByCity(currentCity);
}

function toggleLocation() {
  hideAllCards();
  document.getElementById('location').style.display = 'block';
}


