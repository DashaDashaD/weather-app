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

let h3 = document.querySelector('#date')
h3.innerHTML = formatDate(new Date())

function showWeather(response) {
  let h2 = document.querySelector('#city')
  h2.innerHTML = response.data.name
  let h1 = document.querySelector('h1')
  let temperature = Math.round(response.data.main.temp)
  h1.innerHTML = `${temperature}°C`

  let descriptionElement = document.querySelector('#description')
  descriptionElement.innerHTML = response.data.weather[0].description
  let humidityElement = document.querySelector('#humidity')
  humidityElement.innerHTML = response.data.main.humidity
  let windElement = document.querySelector('#wind')
  windElement.innerHTML = Math.round(response.data.wind.speed)
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

// Get weather by current location
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

// function ShowFahrenheit(event) {
//   let h1 = document.querySelector('#temp')
//   h1.innerHTML = 28 * 1.8 + 32
// }

// let searchFahrenheit = document.querySelector('#fahrenheit-link')
// searchFahrenheit.addEventListener('click', ShowFahrenheit)
