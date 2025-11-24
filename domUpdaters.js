import { getWeatherInterpretation } from './weatherInterpretation.js'
import { formatTime, formatDateToDay, getRelativeTime, getRelativeDay } from './utils/time.js'

/**
 * Met à jour l'heure du dernier fetch dans le DOM
 * @param {string} time - date/heure format iso 
 */
const setCurrentTime = (time) => {
  document.getElementById('current-time').innerText = formatTime(time)
}

/**
 * Met à jour l'interprétation météo dans le DOM
 * @param {Object} interpretation - Objet contenant l'emoji et le texte
 * @param {string} interpretation.picture - Emoji météo
 * @param {string} interpretation.text - Description textuelle
 */
export const setCurrentInterpretation = (interpretation) => {
  document.getElementById('current-interpretation-picture').innerText = interpretation.picture
  document.getElementById('current-interpretation-text').innerText = interpretation.text
}

/**
 * Met à jour la température actuelle dans le DOM
 * @param {number} temperature - Température
 * @param {string} unit - Unité de température
 */
export const setCurrentTemperature = (temperature, unit) => {
  document.getElementById('current-temperature').innerText = temperature + ' ' + unit
}

/**
 * Met à jour l'humidité actuelle dans le DOM
 * @param {number} humidity - Pourcentage d'humidité
 */
export const setCurrentHumidity = (humidity) => {
  document.getElementById('current-humidity').innerText = humidity + '%'
}

/**
 * Met à jour la vitesse du vent dans le DOM
 * @param {number} windSpeed - Vitesse du vent
 * @param {string} unit - Unité de vitesse
 */
export const setCurrentWind = (windSpeed, unit) => {
  document.getElementById('current-wind-speed').innerText = windSpeed + ' ' + unit
}

/**
 * Met à jour le nom de la ville dans le DOM
 * @param {string} city - Nom de la ville
 */
export const setCurrentCity = (city) => {
  document.getElementById('current-city').innerText = city
}

/**
 * Affiche toutes les données météo actuelles dans le DOM
 * @param {Object} data - Données météo de l'API Open-Meteo
 * @param {Object} units - Unités météo de l'API Open-Meteo
 */
export const displayCurrentWeather = (data, units) => {
  if (!data || !units) return

  setCurrentTime(data.time)
  setCurrentTemperature(data.temperature_2m, units.temperature_2m)
  setCurrentInterpretation(getWeatherInterpretation(data.weather_code))
  setCurrentHumidity(data.relative_humidity_2m)
  setCurrentWind(data.wind_speed_10m, units.wind_speed_10m)
}

/**
 * Construit un élement météo pour une heure donnée
 * @param {Object} data - Données préformattées à injecter dans le DOM
 */
const getHourlyNode = ({ formattedTime, temperature, wind, humidity, interpretation, relativeTime }) => {
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

  const humidityEl = document.createElement('div')
  humidityEl.className = 'humidity'
  humidityEl.innerHTML = humidity

  const interpretationEl = document.createElement('div')
  interpretationEl.className = 'interpretation'
  interpretationEl.innerHTML = interpretation.picture

  hourEl.append(timeEl, interpretationEl, temperatureEl, windEl, humidityEl)

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

  const hoursList = data.time.slice(0, 24) // Keep only the 24 hours of the current day
    .map((time, index) => {
      const formattedTime = formatTime(time)
      const temperature = data.temperature_2m[index] + '&nbsp;' + units.temperature_2m
      const wind = data.wind_speed_10m[index] + '&nbsp;' + units.wind_speed_10m
      const humidity = data.relative_humidity_2m[index] + '&nbsp;' + units.relative_humidity_2m
      const interpretation = getWeatherInterpretation(data.weather_code[index])
      const relativeTime = getRelativeTime(fetchTime, time)

      return getHourlyNode({ formattedTime, temperature, wind, humidity, interpretation, relativeTime })
    })

  hourlyContainerEl.append(...hoursList)
  const activeHourEl = document.getElementById('active-hour')
  activeHourEl.scrollIntoView({ behavior: 'smooth', inline: 'center' })
}


/**
 * Construit un élement météo pour un jour donné
 * @param {Object} data - Données préformattées à injecter dans le DOM
 */
const getDailyNode = ({ formattedDate, maxTemperature, minTemperature, wind, interpretation, relativeDay }) => {
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

  const interpretationEl = document.createElement('div')
  interpretationEl.className = 'interpretation'
  interpretationEl.innerHTML = interpretation.picture

  dayEl.append(dateEl, interpretationEl, maxTemperatureEl, minTemperatureEl, windEl)

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
  console.log(data)
  const dayList = data.time.map((time, index) => {
    const formattedDate = formatDateToDay(time)
    const maxTemperature = data.temperature_2m_max[index] + '&nbsp;' + units.temperature_2m_max
    const minTemperature = data.temperature_2m_min[index] + '&nbsp;' + units.temperature_2m_min
    const wind = data.wind_speed_10m_max[index] + '&nbsp;' + units.wind_speed_10m_max
    const interpretation = getWeatherInterpretation(data.weather_code[index])
    const relativeDay = getRelativeDay(fetchTime, time)

    return getDailyNode({ formattedDate, maxTemperature, minTemperature, wind, interpretation, relativeDay })
  })

  dailyContainerEl.append(...dayList)
  const activeDayEl = document.getElementById('active-day')
  activeDayEl.scrollIntoView({ behavior: 'smooth', inline: 'center' })
}