import { getWindDirectionElement } from './common.js'
import { formatDateToDay, getRelativeDay } from '../utils/time.js'
import { getWeatherInterpretation } from '../utils/weatherInterpretation.js'

/**
 * Construit un élement météo pour un jour donné
 * @param {Object} data - Données préformattées à injecter dans le DOM
 */
const getDailyNode = ({ formattedDate, maxTemperature, minTemperature, wind, windDirection, interpretation, relativeDay }) => {
  const dayEl = document.createElement('div')
  dayEl.className = `scrollable-item ${relativeDay}`
  dayEl.id = relativeDay === 'present' ? 'active-day' : ''

  const dateEl = document.createElement('div')
  dateEl.className = 'time'
  dateEl.innerHTML = formattedDate

  const maxTemperatureEl = document.createElement('div')
  maxTemperatureEl.className = 'temperature max'
  maxTemperatureEl.innerHTML = maxTemperature

  const minTemperatureEl = document.createElement('div')
  minTemperatureEl.className = 'temperature min'
  minTemperatureEl.innerHTML = minTemperature

  const windEl = document.createElement('div')
  windEl.className = 'wind'
  windEl.innerHTML = wind

  const windDirectionEl = getWindDirectionElement(windDirection)

  const interpretationEl = document.createElement('div')
  interpretationEl.className = 'interpretation'
  interpretationEl.innerHTML = interpretation.picture

  dayEl.append(dateEl, interpretationEl, maxTemperatureEl, minTemperatureEl, windEl, windDirectionEl)

  return dayEl
}

/**
 * Affiche toutes les données météo par jours dans le DOM
 * @param {Object} data - Données météo de l'API Open-Meteo
 * @param {Object} units - Unités météo de l'API Open-Meteo
 * @param {String} fetchTime - Heure actuelle donnée par l'API Open-Meteo format ISO
 */
export const displayDailyWeather = (data, units, fetchTime) => {
  if (!data || !units) return

  const dailyContainerEl = document.getElementById('daily-container')
  dailyContainerEl.innerHTML = ''
  const dayList = data.time.map((time, index) => {
    const formattedDate = formatDateToDay(time)
    const maxTemperature = data.temperature_2m_max[index] + '&nbsp;' + units.temperature_2m_max
    const minTemperature = data.temperature_2m_min[index] + '&nbsp;' + units.temperature_2m_min
    const wind = data.wind_speed_10m_max[index] + '&nbsp;' + units.wind_speed_10m_max
    const windDirection = data.wind_direction_10m_dominant[index]
    const interpretation = getWeatherInterpretation(data.weather_code[index])
    const relativeDay = getRelativeDay(fetchTime, time)

    return getDailyNode({ formattedDate, maxTemperature, minTemperature, wind, windDirection, interpretation, relativeDay })
  })

  dailyContainerEl.append(...dayList)
  const activeDayEl = document.getElementById('active-day')
  activeDayEl.scrollIntoView({ behavior: 'smooth', inline: 'center' })
}