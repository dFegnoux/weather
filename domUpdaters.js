import { getWeatherInterpretation } from './weatherInterpretation.js'
import { formatTime } from './utils/formatTime.js'

/**
 * Met à jour l'heure du dernier fetch dans le DOM
 * @param {string} time - date/heure format iso 
 */
export const setCurrentTime = (time) => {
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
export const getHourlyNode = ({ formattedTime, temperature, wind, humidity, interpretation, isActive }) => {
  const hourEl = document.createElement('div')
  hourEl.className = `hour-forcast-item ${isActive ? 'active' : ''}`

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
 */
export const displayHourlyWeather = (data, units) => {
  if (!data || !units) return
  
  const hourlyContainerEl = document.getElementById('hourly-container')

  const hoursElList = data.time.map((time, index) => {
    const formattedTime = formatTime(time)
    const temperature = data.temperature_2m[index] + '&nbsp;' + units.temperature_2m
    const wind = data.wind_speed_10m[index] + '&nbsp;' + units.wind_speed_10m
    const humidity = data.relative_humidity_2m[index] + '&nbsp;' + units.relative_humidity_2m
    const interpretation = getWeatherInterpretation(data.weather_code[index])
    const isActive = index === 3

    return getHourlyNode({formattedTime, temperature, wind, humidity, interpretation, isActive})
  })

  hourlyContainerEl.append(...hoursElList)
}