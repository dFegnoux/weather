const FORCAST_URL = 'https://api.open-meteo.com/v1/forecast?latitude=48.9765&longitude=2.8748&current=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=1'

/**
 * Get weatjer interpretation per WMO code
 * @param {number} code WMO code : 0 to 99
 * @returns string
 */
const getWeatherInterpretation = (code) => {
  switch(code) {
    case 0:
      return 'Clear sky'
    case 1:
      return 'Mainly clear'
    case 2:
      return 'partly cloudy'
    case 3:
      return 'overcast'
    case 51:
      return 'Drizzle: Light'
    case 53:
      return 'Drizzle: Moderate'
    case 55:
      return 'Drizzle: dense'
    case 56:
      return 'Freezing Drizzle: Light'
    case 57:
      return 'Freezing Drizzle: Heavy'
    case 61:
      return 'Rain: Slight'
    case 63:
      return 'Rain: Moderate'
    case 65:
      return 'Rain: Heavy'
    case 71:
      return 'Snow fall: Slight'
    case 73:
      return 'Snow fall: Moderate'
    case 75:
      return 'Snow fall: Heavy'
    case 77:
      return 'Snow grains'
    case 80:
      return 'Rain showers: Slight'
    case 81:
      return 'Rain showers: Moderate'
    case 82:
      return 'Rain showers: Heavy'
    case 85:
      return 'Snow showers: Slight'
    case 86:
      return 'Snow showers: Heavy'
    case 95:
      return 'Thunderstorm'
    case 96:
      return 'Thunderstorm with slight hail'
    case 99:
      return 'Thunderstorm with heavy hail'
    default:
      return '🤷'
  }
}

/**
 * Replace current interpretation value in DOM with provided data
 * @param {string} interpretation 
 */
const renderWeatherInterpretation = (interpretation) => {
  const temperatureElement = document.getElementById('current-interpretation-text')
  temperatureElement.innerText = interpretation
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