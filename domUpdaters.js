import { getWeatherInterpretation } from './weatherInterpretation.js'

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
 */
export const displayCurrentWeather = (data) => {
  if(!data) return

  setCurrentTemperature(data.current.temperature_2m, data.current_units.temperature_2m)
  setCurrentInterpretation(getWeatherInterpretation(data.current.weather_code))
  setCurrentHumidity(data.current.relative_humidity_2m)
  setCurrentWind(data.current.wind_speed_10m, data.current_units.wind_speed_10m)
}