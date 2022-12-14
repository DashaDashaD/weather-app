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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000)
  let day = date.getDay()
  let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[day]
}

function showForecast(response) {
  let forecast = response.data.daily
  let forecastElement = document.querySelector('#forecast')
  let forecastHTML = ``
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="card">
            <div class="card-body">
              <h6 class="card-title">${formatDay(forecastDay.dt)}</h6>
                <p class="card-text"></p>
                <p class="card-text"><small class="text-muted"></small></p>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt="sun icon" width="60px" />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max,
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min,
                  )}°</span>
                </div>
            </div>
          </div>
    `
    }
  })

  forecastElement.innerHTML = forecastHTML
}
let h3 = document.querySelector('#date')
h3.innerHTML = formatDate(new Date())

function getForecast(coordinates) {
  let apiKey = '9e507037a8dea5e5af384f53a942ea01'
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(showForecast)
}

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

  getForecast(response.data.coord)
}

function getWeatherbyCity(city) {
  let apiKey = '9e507037a8dea5e5af384f53a942ea01'
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

let celsiusTemperature = null
getWeatherbyCity('Kyiv')
