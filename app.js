const getForecastURL = ({ latitude, longitude }) => {
  const searchParams = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m',
    timezone: 'Europe/Berlin',
    forecast_days: '1'
  })

  return new URL(`https://api.open-meteo.com/v1/forecast?${searchParams}`)
}

/**
 * Get weather interpretation per World Meteorological Organization observation code
 * @param {number} code WMO code : 0 to 99
 * @returns "{picture: string, text: string}"
 */
const getWeatherInterpretation = (code) => {
  switch(code) {
    case 0:
      return { picture: '☀️', text: 'Ciel dégagé' }
    case 1:
      return { picture: '🌤️', text: 'Globalement dégagé' }
    case 2:
      return { picture: '🌦️', text: 'Partiellement nuageux' }
    case 3:
      return { picture: '☁️', text: 'Ciel couvert' }
    case 51:
      return { picture: '💦', text: 'Bruine : Légère' }
    case 53:
      return { picture: '💦💦', text: 'Bruine : Modérée' }
    case 55:
      return { picture: '💦💦💦', text: 'Bruine : Dense' }
    case 56:
      return { picture: '🌫️❄️', text: 'Bruine verglaçante : Légère' }
    case 57:
      return { picture: '🌫️❄️🌫️❄️🌫️❄️', text: 'Bruine verglaçante : Forte' }
    case 61:
      return { picture: '🌧️', text: 'Pluie : Faible' }
    case 63:
      return { picture: '🌧️🌧️', text: 'Pluie : Modérée' }
    case 65:
      return { picture: '🌧️🌧️🌧️', text: 'Pluie : Forte' }
    case 71:
      return { picture: '🌨️', text: 'Chute de neige : Faible' }
    case 73:
      return { picture: '🌨️🌨️', text: 'Chute de neige : Modérée' }
    case 75:
      return { picture: '🌨️🌨️🌨️', text: 'Chute de neige : Forte' }
    case 77:
      return { picture: '⚪️', text: 'Neige en grains' }
    case 80:
      return { picture: '💧', text: 'Averses de pluie : Faibles' }
    case 81:
      return { picture: '💧💧', text: 'Averses de pluie : Modérées' }
    case 82:
      return { picture: '💧💧💧', text: 'Averses de pluie : Fortes' }
    case 85:
      return { picture: '❄️', text: 'Averses de neige : Faibles' }
    case 86:
      return { picture: '❄️❄️❄️', text: 'Averses de neige : Fortes' }
    case 95:
      return { picture: '☁️⚡️', text: 'Orage' }
    case 96:
      return { picture: '⛈️', text: 'Orage avec grêle légère' }
    case 99:
      return { picture: '⛈️⛈️⛈️', text: 'Orage avec grêle forte' }
    default:
      return { picture: '🤷', text: '...' }
}
}

const setCurrentInterpretation = (interpretation) => {
  document.getElementById('current-interpretation-picture').innerText = interpretation.picture
  document.getElementById('current-interpretation-text').innerText = interpretation.text
}

const setCurrentTemperature = (temperature, unit) => {
  document.getElementById('current-temperature').innerText = temperature + ' ' + unit
}

const setCurrentHumidity = (humidity) => {
  document.getElementById('current-humidity').innerText = humidity + '%'
}

const setCurrentWind = (windSpeed, unit) => {
  document.getElementById('current-wind-speed').innerText = windSpeed + ' ' + unit
}

const setCurrentCity = (city) => {
  document.getElementById('current-wind-speed').innerText = city
}

const fetchCurrentWeather = async (geoCode) => {
  try {
    const forecastResponse = await fetch(getForecastURL(geoCode))
    if (!forecastResponse.ok) {
      throw new Error(`Response status: ${forecastResponse.status}`);
    }
    return await forecastResponse.json();
  } catch(e) {
    console.error('Error while getting current weather', e)
  }
}

const displayCurrentWeather = (data) => {
  if(!data) return
  
  setCurrentTemperature(data.current.temperature_2m, data.current_units.temperature_2m)
  setCurrentInterpretation(getWeatherInterpretation(data.current.weather_code))
  setCurrentHumidity(data.current.relative_humidity_2m)
  setCurrentWind(data.current.wind_speed_10m, data.current_units.wind_speed_10m)
}

const clearSuggestions = () => {
  document.getElementById('suggestions-list').innerHTML = ''
  document.getElementById('city-input').value = ''
}

const chooseSuggestion = async (event) => {
  document.getElementById('current-city').innerText = event.target.innerText
  const currentWeatherData = await fetchCurrentWeather({
    longitude: event.target.getAttribute('data-longitude'),
    latitude: event.target.getAttribute('data-latitude')
  })
  displayCurrentWeather(currentWeatherData)
  clearSuggestions()
}

const fetchLocationSuggestions = async (text) => {
  try {
    const params = new URLSearchParams({
      name: text,
      count:5,
      language: 'fr',
      format:'json',
      countryCode:'FR'
    })
    const geoCodeResponse = await fetch('https://geocoding-api.open-meteo.com/v1/search?'+params)
    if (!geoCodeResponse.ok) {
      throw new Error(`GeoCode Response status: ${geoCodeResponse.status}`);
    }
    return await geoCodeResponse.json();
  } catch(error) {
    console.error('Something went wrong while getting location suggestions', error)
  }
}

const displayLocationSuggestions = (data) => {
  const suggestionList = document.getElementById('suggestions-list')
  
  // Empty previous list
  suggestionList.innerHTML = ""

  if(!Array.isArray(data.results)) return

  data.results.forEach((suggestion) => {
    const newSuggestion = document.createElement('li')
    newSuggestion.innerText = `${suggestion.name} (${suggestion.admin1})`
    newSuggestion.setAttribute('data-longitude', suggestion.longitude)
    newSuggestion.setAttribute('data-latitude', suggestion.latitude)
    newSuggestion.addEventListener('click', chooseSuggestion)
    suggestionList.append(newSuggestion)
  })
}

const handleCityInputChange = async (event) => {
  const currentValue = event.target.value
  
  // Don't do anything until value is truthy
  if(!currentValue) return

  const suggestions = await fetchLocationSuggestions(currentValue)
  displayLocationSuggestions(suggestions)
}

/**
 * Listen when user types in search bar
 */
const handleCityInput = () => {
  const cityInput = document.getElementById('city-input')
  cityInput.addEventListener('keyup', handleCityInputChange)
}

addEventListener("load", async () => {
  // default render
  const defaultGeoCode = {
    latitude: '48.9765',
    longitude: '2.8748'
  }
  const defaultCurrentWeatherData = await fetchCurrentWeather(defaultGeoCode)
  displayCurrentWeather(defaultCurrentWeatherData)
  handleCityInput()
})