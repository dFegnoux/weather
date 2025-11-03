import { fetchLocationSuggestions, fetchCurrentWeather } from './weatherAPI.js'
import { displayCurrentWeather, setCurrentCity } from './domUpdaters.js'

/**
 * Vide la liste des suggestions et le champ de saisie
 */
export const clearSuggestions = () => {
  document.getElementById('suggestions-list').innerHTML = ''
  document.getElementById('city-input').value = ''
}

/**
 * Gère le clic sur une suggestion de ville
 * @param {Event} event - Événement de clic
 */
export const chooseSuggestion = async (event) => {
  setCurrentCity(event.target.innerText)
  const currentWeatherData = await fetchCurrentWeather({
    longitude: event.target.getAttribute('data-longitude'),
    latitude: event.target.getAttribute('data-latitude')
  })
  displayCurrentWeather(currentWeatherData)
  clearSuggestions()
}

/**
 * Affiche les suggestions de localisation dans le DOM
 * @param {Object} data - Données de géocodage avec les suggestions
 */
export const displayLocationSuggestions = (data) => {
  const suggestionList = document.getElementById('suggestions-list')

  // Vide la liste précédente
  suggestionList.innerHTML = ""

  if(!Array.isArray(data.results)) return

  data.results.forEach((suggestion) => {
    const newSuggestion = document.createElement('li')
    newSuggestion.innerText = `${suggestion.name} (${suggestion.admin1})`
    newSuggestion.setAttribute('data-longitude', suggestion.longitude)
    newSuggestion.setAttribute('data-latitude', suggestion.latitude)
    newSuggestion.addEventListener('click', chooseSuggestion)
    suggestionList.append(newSuggestion)
  })
}

/**
 * Gère les changements dans le champ de saisie de ville
 * @param {Event} event - Événement de changement
 */
export const handleCityInputChange = async (event) => {
  const currentValue = event.target.value

  // Ne fait rien tant que la valeur n'est pas valide
  if(!currentValue) return

  const suggestions = await fetchLocationSuggestions(currentValue)
  displayLocationSuggestions(suggestions)
}

/**
 * Initialise l'écoute des changements sur le champ de saisie de ville
 */
export const initializeCityInput = () => {
  const cityInput = document.getElementById('city-input')
  cityInput.addEventListener('keyup', handleCityInputChange)
}