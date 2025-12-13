import { formatTime } from '../utils/time.js'
import { getWeatherInterpretation } from '../utils/weatherInterpretation.js'
import { getWindDirectionElement } from './common.js'

/**
 * Met à jour l'heure du dernier fetch dans le DOM
 * @param {string} time - date/heure format iso 
 */
const setCurrentTime = (time) => {
  document.getElementById('current-time').innerText = formatTime(time)
}

/**
 * Affiche toutes les données météo actuelles dans le DOM
 * @param {Object} data - Données météo de l'API Open-Meteo
 * @param {Object} units - Unités météo de l'API Open-Meteo
 */
export const displayCurrentWeather = (data, units) => {
  if (!data || !units) return

  setCurrentTime(data.time)
  
  // Build current weather interpretation
  const {picture, text} = getWeatherInterpretation(data.weather_code)
  const interpretationPictureEl = document.createElement('div')
  interpretationPictureEl.className = 'picture'
  interpretationPictureEl.innerText = picture
  const interpretationLegendEl = document.createElement('div')
  interpretationLegendEl.className = 'legend'
  interpretationLegendEl.innerText = text
  
  // Add interpretation to the DOM
  const currentInterpretationEl = document.getElementById('current-interpretation')
  currentInterpretationEl.innerHTML = ''
  currentInterpretationEl.append(interpretationPictureEl, interpretationLegendEl)

  // Build current weather details
  const currentTempEl = document.createElement('div')
  currentTempEl.className = 'temperature'
  currentTempEl.innerHTML = `🌡️&nbsp;${data.temperature_2m}&nbsp;${units.temperature_2m}`

  const currentHumidity = document.createElement('div')
  currentHumidity.className = 'humidity'
  currentHumidity.innerHTML = `💧&nbsp;${data.relative_humidity_2m}&nbsp;${units.relative_humidity_2m}`

  const currentWindEl = document.createElement('div')
  currentWindEl.className = 'wind'
  currentWindEl.innerHTML = `🌬️&nbsp;${data.wind_speed_10m}&nbsp${units.wind_speed_10m}`

  // Add details to the DOM
  const currentDetails = document.getElementById('current-details')
  currentDetails.innerHTML = ''
  currentDetails.append(currentTempEl, currentHumidity, currentWindEl, getWindDirectionElement(data.wind_direction_10m))
}