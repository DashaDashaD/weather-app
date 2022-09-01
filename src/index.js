function formatDate(now) {
  let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  let day = days[now.getUTCDay()]

  let hour = now.getHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  let minute = now.getMinutes()
  if (minute < 10) {
    minute = '0' + minute
  }
  return `${day}, ${hour}:${minute}`
}

function showForecast() {
  let forecastElement = document.querySelector('#forecast')
  let days = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue']

  let forecastHTML = ``
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="card">
            <div class="card-body">
              <h6 class="card-title">${day}</h5>
                <p class="card-text"></p>
                <p class="card-text"><small class="text-muted"></small></p>
                <img
                  src="https://s3.amazonaws.com/shecodesio-production/uploads/files/000/039/803/original/sun-icon-31.png?1657277809"
                  alt="sun icon" width="100px" />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18°</span>
                  <span class="weather-forecast-temperature-min">12°</span>
                </div>
            </div>
          </div>
    `
  })

  forecastElement.innerHTML = forecastHTML
}
let h3 = document.querySelector('#date')
h3.innerHTML = formatDate(new Date())

function showWeather(response) {
  let h2 = document.querySelector('#city')
  h2.innerHTML = response.data.name
  let temperatureElement = document.querySelector('#temp')
  celsiusTemperature = Math.round(response.data.main.temp)
  temperatureElement.innerHTML = Math.round(celsiusTemperature)

  let descriptionElement = document.querySelector('#description')
  descriptionElement.innerHTML = response.data.weather[0].description
  let humidityElement = document.querySelector('#humidity')
  humidityElement.innerHTML = response.data.main.humidity
  let windElement = document.querySelector('#wind')
  windElement.innerHTML = Math.round(response.data.wind.speed)
  let iconElement = document.querySelector('#icon')
  iconElement.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  )
  iconElement.setAttribute('alt', response.data.weather[0].description)
}

function getWeatherbyCity(city) {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c'
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  axios.get(url).then(showWeather)
}

function showUserCity(event) {
  event.preventDefault()
  let inputCity = document.querySelector('#city-input')
  let city = inputCity.value
  getWeatherbyCity(city)
}

let searchForm = document.querySelector('#city-search')
searchForm.addEventListener('submit', showUserCity)

function getWeatherbyLocation(position) {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c'
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  axios.get(url).then(showWeather)
}

function showWeatherByCurrentPosition(event) {
  navigator.geolocation.getCurrentPosition(getWeatherbyLocation)
}

let currentLocationButton = document.querySelector('#location-input')
currentLocationButton.addEventListener('click', showWeatherByCurrentPosition)

function ShowCelcius(event) {
  event.preventDefault()
  CelciusLink.classList.replace('active', 'inactive')
  FahrenheitLink.classList.replace('inactive', 'active')
  let temperatureElement = document.querySelector('#temp')
  temperatureElement.innerHTML = Math.round(celsiusTemperature)
}
function ShowFahrenheit(event) {
  event.preventDefault()
  FahrenheitLink.classList.replace('active', 'inactive')
  CelciusLink.classList.replace('inactive', 'active')
  let temperatureElement = document.querySelector('#temp')
  temperatureElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32)
}

let FahrenheitLink = document.querySelector('#fahrenheit-link')
FahrenheitLink.addEventListener('click', ShowFahrenheit)

let CelciusLink = document.querySelector('#celsius-link')
CelciusLink.addEventListener('click', ShowCelcius)

let celsiusTemperature = null
getWeatherbyCity('Kyiv')
showForecast()
