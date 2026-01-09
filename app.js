/**
 * Application météo - Point d'entrée principal
 * Orchestre l'initialisation et les interactions de l'application
 */

import { fetchForecast } from './services/forecast.js'
import { displayAllWeather, setCurrentCity } from './modules/common.js'
import { initializeCityInput } from './locationSuggestions.js'
import { getDefaultLocation } from './utils/location.js'

/**
 * Initialise l'application au chargement de la page
 */
addEventListener("load", async () => {
 
  const defaultLocation = getDefaultLocation()

  // Charge et affiche les données météo par défaut
  const defaultWeather = await fetchForecast(defaultLocation.geocode)
  setCurrentCity(defaultLocation.label)
  displayAllWeather(defaultWeather)

  // Initialise la gestion de la saisie de ville
  initializeCityInput()
})