const FORCAST_URL = 'https://api.open-meteo.com/v1/forecast?latitude=48.9765&longitude=2.8748&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&timezone=Europe%2FBerlin&forecast_days=1'

/**
 * Get weatjer interpretation per WMO code
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

/**
 * Replace current interpretation values in DOM with provided data
 * @param {string} interpretation 
 */
const renderWeatherInterpretation = (interpretation) => {
  const interpreationPicture = document.getElementById('current-interpretation-picture')
  interpreationPicture.innerText = interpretation.picture
  const interpretationText = document.getElementById('current-interpretation-text')
  interpretationText.innerText = interpretation.text
}

/**
 * Replace current temperature value in DOM with provided data
 * @param {number} temperature 
 * @param {string} unit 
 */
const renderTemperature = (temperature, unit) => {
  const temperatureElement = document.getElementById('current-temperature')
  temperatureElement.innerText = temperature + ' ' + unit
}

/**
 * Replace current humidity value in DOM with provided data
 * @param {number} humidity 
 */
const renderHumidity = (humidity) => {
  const humidityElement = document.getElementById('current-humidity')
  humidityElement.innerText = humidity + '%'
}

/**
 * Replace current wind speed value in DOM with provided data
 * @param {number} windSpeed 
 * @param {string} unit 
 */
const renderWindSpeed = (windSpeed, unit) => {
  const humidityElement = document.getElementById('current-wind-speed')
  humidityElement.innerText = windSpeed + ' ' + unit
}

/**
 * Fetch current weather information then render it
 */
const getCurrentWeather = async () => {
  try {
    const forecastResponse = await fetch(FORCAST_URL)
    if (!forecastResponse.ok) {
      throw new Error(`Response status: ${forecastResponse.status}`);
    }
    const result = await forecastResponse.json();

    renderTemperature(result.current.temperature_2m, result.current_units.temperature_2m)
    renderWeatherInterpretation(getWeatherInterpretation(result.current.weather_code))
    renderHumidity(result.current.relative_humidity_2m)
    renderWindSpeed(result.current.wind_speed_10m, result.current_units.wind_speed_10m)
  } catch (error) {
    alert('Something went wrong, try again later 🤷')
    console.error(error)
  }
}

addEventListener("load", () => {
  console.log('loaded')
  getCurrentWeather()
})