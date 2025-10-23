const FORCAST_URL = 'https://api.open-meteo.com/v1/forecast?latitude=48.9765&longitude=2.8748&current=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=1'

/**
 * Get weatjer interpretation per WMO code
 * @param {number} code WMO code : 0 to 99
 * @returns "{picture: string, text: string}"
 */
const getWeatherInterpretation = (code) => {
  switch(code) {
    case 0:
      return { picture: '☀️', text: 'Clear sky'}
    case 1:
      return { picture: '🌤️', text: 'Mainly clear'}
    case 2:
      return { picture: '🌦️', text: 'Partly cloudy'}
    case 3:
      return { picture: '☁️', text: 'Overcast'}
    case 51:
      return { picture: '💦', text: 'Drizzle: Light'}
    case 53:
      return { picture: '💦💦', text: 'Drizzle: Moderate'}
    case 55:
      return { picture: '💦💦💦', text: 'Drizzle: dense'}
    case 56:
      return { picture: '💦❄️', text: 'Freezing Drizzle: Light'}
    case 57:
      return { picture: '💦❄️💦❄️💦❄️', text: 'Freezing Drizzle: Heavy'}
    case 61:
      return { picture: '🌧️', text: 'Rain: Slight'}
    case 63:
      return { picture: '🌧️🌧️', text: 'Rain: Moderate'}
    case 65:
      return { picture: '🌧️🌧️🌧️', text: 'Rain: Heavy'}
    case 71:
      return { picture: '🌨️', text: 'Snow fall: Slight'}
    case 73:
      return { picture: '🌨️🌨️', text: 'Snow fall: Moderate'}
    case 75:
      return { picture: '🌨️🌨️🌨️', text: 'Snow fall: Heavy'}
    case 77:
      return { picture: '⚪️', text: 'Snow grains'}
    case 80:
      return { picture: '💧', text: 'Rain showers: Slight'}
    case 81:
      return { picture: '💧💧', text: 'Rain showers: Moderate'}
    case 82:
      return { picture: '💧💧💧', text: 'Rain showers: Heavy'}
    case 85:
      return { picture: '❄️', text: 'Snow showers: Slight'}
    case 86:
      return { picture: '❄️❄️❄️', text: 'Snow showers: Heavy'}
    case 95:
      return { picture: '☁️⚡️', text: 'Thunderstorm'}
    case 96:
      return { picture: '⛈️', text: 'Thunderstorm with slight hail'}
    case 99:
      return { picture: '⛈️⛈️⛈️', text: 'Thunderstorm with heavy hail'}
    default:
      return { picture: '🤷', text: '...'}
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
 * Fetch current weather information then render it
 */
const getCurrentTemperature = async () => {
  try {
    const forecastResponse = await fetch(FORCAST_URL)
    if (!forecastResponse.ok) {
      throw new Error(`Response status: ${forecastResponse.status}`);
    }
    const result = await forecastResponse.json();

    const currentTemperature = result.current.temperature_2m
    const unit = result.current_units.temperature_2m
    const currentInterpretation = getWeatherInterpretation(result.current.weather_code)

    renderTemperature(currentTemperature, unit)
    renderWeatherInterpretation(currentInterpretation)
  } catch (error) {
    alert('Something went wrong, try again later 🤷')
  }
}

addEventListener("load", () => {
  console.log('loaded')
  getCurrentTemperature()
})