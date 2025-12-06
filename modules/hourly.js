import { getWindDirectionElement } from './common.js'
import { formatTime, getRelativeTime } from '../utils/time.js'
import { getWeatherInterpretation } from '../utils/weatherInterpretation.js'

/**
 * Construit un élement météo pour une heure donnée
 * @param {Object} data - Données préformattées à injecter dans le DOM
 */
const getHourlyNode = ({ formattedTime, temperature, wind, windDirection, humidity, interpretation, relativeTime }) => {
  const hourEl = document.createElement('div')
  hourEl.className = `scrollable-item ${relativeTime}`
  hourEl.id = relativeTime === 'present' ? 'active-hour' : ''

  const timeEl = document.createElement('div')
  timeEl.className = 'time'
  timeEl.innerHTML = formattedTime

  const temperatureEl = document.createElement('div')
  temperatureEl.className = 'temperature'
  temperatureEl.innerHTML = temperature

  const windEl = document.createElement('div')
  windEl.className = 'wind'
  windEl.innerHTML = wind

  const windDirectionEl = getWindDirectionElement(windDirection)

  const humidityEl = document.createElement('div')
  humidityEl.className = 'humidity'
  humidityEl.innerHTML = humidity

  const interpretationEl = document.createElement('div')
  interpretationEl.className = 'interpretation'
  interpretationEl.innerHTML = interpretation.picture

  hourEl.append(timeEl, interpretationEl, temperatureEl, windEl, windDirectionEl, humidityEl)

  return hourEl
}

/**
 * Affiche toutes les données météo par heure dans le DOM
 * @param {Object} data - Données météo de l'API Open-Meteo
 * @param {Object} units - Unités météo de l'API Open-Meteo
 * @param {String} fetchTime - Heure actuelle donnée par l'API Open-Meteo format ISO
 */
export const displayHourlyWeather = (data, units, fetchTime) => {
  if (!data || !units) return

  const hourlyContainerEl = document.getElementById('hourly-container')
  hourlyContainerEl.innerHTML = ''

  const hoursList = data.time.slice(0, 24) // Keep only the 24 hours of the current day
    .map((time, index) => {
      const formattedTime = formatTime(time)
      const temperature = data.temperature_2m[index] + '&nbsp;' + units.temperature_2m
      const wind = Math.floor(data.wind_speed_10m[index]) + '&nbsp;' + units.wind_speed_10m
      const windDirection = data.wind_direction_10m[index]
      const humidity = data.relative_humidity_2m[index] + '&nbsp;' + units.relative_humidity_2m
      const interpretation = getWeatherInterpretation(data.weather_code[index])
      const relativeTime = getRelativeTime(fetchTime, time)

      return getHourlyNode({ formattedTime, temperature, wind, windDirection, humidity, interpretation, relativeTime })
    })

  hourlyContainerEl.append(...hoursList)
  const activeHourEl = document.getElementById('active-hour')
  activeHourEl.scrollIntoView({ behavior: 'smooth', inline: 'center' })
}