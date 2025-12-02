/**
 * Application météo - Point d'entrée principal
 * Orchestre l'initialisation et les interactions de l'application
 */

import { fetchCurrentWeather } from './weatherAPI.js'
import { displayCurrentWeather, displayHourlyWeather, displayDailyWeather, setCurrentCity } from './domUpdaters.js'
import { initializeCityInput } from './locationSuggestions.js'

/**
 * Initialise l'application au chargement de la page
 */
addEventListener("load", async () => {
  // Coordonnées par défaut (région parisienne)
  const defaultGeoCode = {
    latitude: '48.9765',
    longitude: '2.8748'
  }

  // Charge et affiche les données météo par défaut
  const defaultWeather = await fetchCurrentWeather(defaultGeoCode)
  setCurrentCity('Crégy-lès-Meaux')
  displayCurrentWeather(defaultWeather.current, defaultWeather.current_units)
  displayHourlyWeather(defaultWeather.hourly, defaultWeather.current_units, defaultWeather.current.time)
  displayDailyWeather(defaultWeather.daily, defaultWeather.daily_units, defaultWeather.current.time)

  // Initialise la gestion de la saisie de ville
  initializeCityInput()
})