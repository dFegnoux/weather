import { getRelativeTime, formatTime } from '../utils/time.js'
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

  displayCurrentWeather(data.current, data.current_units, getTodayNextPrecipitationHour(data.hourly, data.current.time))
  displayHourlyWeather(data.hourly, data.current_units, data.current.time)
  displayDailyWeather(data.daily, data.daily_units, data.current.time)
}

/**
 * Retourne l'heure de la prochaine précipitation
 * @param {object} hourlyData - données par heure d'Open-Meteo
 * @return {string|undefiend} l'heure de la prochaine précipitation ou `undefined`
 */
export const getTodayNextPrecipitationHour = (hourlyData, fetchTime) => {
  if(!hourlyData || !fetchTime) return

  // Cherche la prochaine heure avec une probabilité de précipi`ation acceptable
  const todayNextPrecipitationsIndex = hourlyData.precipitation_probability.slice(0, 24).findIndex((hourProbability, index) =>
    hourProbability >= 40 && getRelativeTime(fetchTime, hourlyData.time[index] !== 'past')
  )

  // Ne rien retourner si aucun résultat n'a été trouvé
  if (!todayNextPrecipitationsIndex === -1) return

  // Retourner l'heure de la prochaine précipitation
  return formatTime(hourlyData.time[todayNextPrecipitationsIndex])
}