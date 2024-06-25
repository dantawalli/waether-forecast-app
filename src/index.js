const city = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.querySelector(".location-btn")
const weatherCardsDiv = document.querySelector(".weather-cards");
const currentWeatherDiv = document.querySelector(".current-weather");
const recentSearches = document.getElementById("recentSearches");

searchBtn.addEventListener("click", getCityCoordinates);
locationBtn.addEventListener("click", getUserCoordinates);
city.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());

/*==================== OpenWeatherMap API Key ====================*/
const apiKey = "YOUR_API_KEY_HERE";


/*==================== Weather Card  ====================*/
const createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0){
        return `<div class="leading-10">
                    <h1 class="font-extrabold text-2xl">${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h1>
                    <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)} <sup>o</sup>C</h4>
                    <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
                    <h4>Humidity: ${weatherItem.main.humidity}%</h4>
                </div>
                <div>
                    <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" class="mx-auto"/>
                    <p class="text-center">${weatherItem.weather[0].description}</p>
                </div>`;
    }else{
        return ` <div class="bg-gray-500 text-white p-8 text-center">
        <h1 class="font-extrabold text-2xl">(${weatherItem.dt_txt.split(" ")[0]})</h1>
        <img src= "https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" class="mx-auto"/>
        <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)} <sup>o</sup>C</h4>
        <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </div>`;
    }
}

/*==================== Weather Details  ====================*/
function getWeatherDetails(cityName, lat, lon){
    const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        // Filter the forecast to only one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate)
            }
        });
        city.value  = "";
        weatherCardsDiv.innerHTML = "";
        currentWeatherDiv.innerHTML = "";
        fiveDaysForecast.forEach((weatherItem, index) => {
            if(index === 0){
                currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));

            }else{
                weatherCardsDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }
        });
        updateRecentSearches(cityName);
    }).catch((error) => {
        alert(`An error occurred while fecthing the weather forecast! ${error}`);
       });
}

/*==================== User Coordinates  ====================*/
function getUserCoordinates(){
    navigator.geolocation.getCurrentPosition(
       position => {
        const { latitude, longitude } = position.coords;
        const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
        //Get city coordinates from Reserve geocoding url
        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            let { name } = data[0];
            getWeatherDetails(name, latitude, longitude);
        }).catch(() => {
            alert(`Failed to fecth city coordinates`);
        });
       },
       
       error => {
        if(error.code === error.PERMISSION_DENIED)
            alert("Geolocation request denied. Please reset location permission to grant access again.")
       }
    );
    }
/*==================== City Coordinates  ====================*/
function getCityCoordinates(){
    const cityName = city.value.trim(); // Get user entered city name and remove extra spaces
    city.value = '';
   if(!cityName) return;
   const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

   //Get city coordinates (latitude, longitude, and name)
   fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
    if(!data.length) return alert(`No coordinates found for ${cityName}`);
    let {name, lat, lon} = data[0];
    getWeatherDetails(name, lat, lon);
   }).catch(() => {
    alert(`Failed to fecth coordinates of ${cityName}`);
   });
}

recentSearches.addEventListener("change", () => {
    const selectedCity = recentSearches.value;
    if (selectedCity) {
        getCityCoordinatesFromDropdown(selectedCity);
    }
});


/*==================== Dropdown City Coordinates  ====================*/
function getCityCoordinatesFromDropdown(cityName){
    getCityCoordinates
    const CITY_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;

    fetch(CITY_GEOCODING_URL).then(res => res.json()).then(data => {
        if(data.length === 0) return alert("City not found");

        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch((error) => {
        alert(`An error occurred while fetching the weather forecast! ${error}`);
    });
}

/*==================== Update Recent Searches  ====================*/
function updateRecentSearches(cityName){
    let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

    // Add new city to recent searches if it's not already there
    if(!recentCities.includes(cityName)){
        recentCities.push(cityName);
    }

    // Store recent searches in local storage
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
    populateRecentSearchesDropdown();
}

/*==================== Populate Dropdown  ====================*/
function populateRecentSearchesDropdown(){
    const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

    // Clear existing dropdown options
    recentSearches.innerHTML = '<option value="" disabled selected>Select a recent city</option>';

    if(recentCities.length > 0){
        recentCities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            recentSearches.appendChild(option);
        });

        recentSearches.classList.remove("hidden");
    }else{
        recentSearches.classList.add("hidden");
    }
}

// Initial population of recent searches dropdown on page load
document.addEventListener("DOMContentLoaded", populateRecentSearchesDropdown);
