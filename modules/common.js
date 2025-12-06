import { displayCurrentWeather } from './current.js'
import { displayDailyWeather } from './daily.js'
import { displayHourlyWeather } from './hourly.js'

/**
 * Met à jour le nom de la ville dans le DOM
 * @param {string} city - Nom de la ville
 */
export const setCurrentCity = (city) => {
  document.getElementById('weather-location-name').innerText = city
}

/**
 * Construit un élement pour donner la direction du vent
 * @param {Number} windDirection - direction en degrés
 */
export const getWindDirectionElement = (windDirection) => {
  const windDirectionEl = document.createElement('span')
  windDirectionEl.className = 'wind-direction'
  windDirectionEl.innerText = '⬆️'
  windDirectionEl.setAttribute('style', `rotate: ${windDirection}deg;`)
  
  return windDirectionEl
}

/**
 * Affiche toutes les données météo
 * @param {Object} data - Données météo complètes de l'API Open-Meteo
 */
export const displayAllWeather = (data) => {
  if(!data) return

  displayCurrentWeather(data.current, data.current_units)
  displayHourlyWeather(data.hourly, data.current_units, data.current.time)
  displayDailyWeather(data.daily, data.daily_units, data.current.time)
}