/**
 * Application météo - Point d'entrée principal
 * Orchestre l'initialisation et les interactions de l'application
 */

import { fetchCurrentWeather } from './weatherAPI.js'
import { displayCurrentWeather } from './domUpdaters.js'
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
  const defaultCurrentWeatherData = await fetchCurrentWeather(defaultGeoCode)
  displayCurrentWeather(defaultCurrentWeatherData)

  // Initialise la gestion de la saisie de ville
  initializeCityInput()
})