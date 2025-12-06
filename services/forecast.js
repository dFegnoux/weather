import { getForecastURL, getSavedForecast, saveForecast } from '../utils/forecast.js'


/**
 * Récupère les données météo actuelles
 * @param {Object} geoCode - Coordonnées géographiques
 * @param {string} geoCode.latitude - Latitude
 * @param {string} geoCode.longitude - Longiude
 * @returns {Promise<Object|undefined>} Données météo ou undefined en cas d'erreur
 */
export const fetchForecast = async (geoCode) => {
  if (!geoCode?.latitude || !geoCode?.longitude) {
    throw new Error('Invalid geocode data')
  }

  // Si on a déjà stocké un retour API pour la localisation donnée et qu'elle est toujours valide, on la retourne sans appeller l'API.
  try {
    const savedForecast = getSavedForecast(geoCode)
    if(!!savedForecast) {
      console.log('Forecast found in cache and valid, bypassing API')
      return savedForecast
    }
  } catch (e) {
    console.log(e)
    console.log('Saved forcast not readable, fallback to API call')
  }

  // Récupération des données météo fraîches
  try {
    const forecastResponse = await fetch(getForecastURL(geoCode))
    if (!forecastResponse.ok) {
      throw new Error(`Response status: ${forecastResponse.status}`)
    }
    const forecastData = await forecastResponse.json()
    saveForecast(geoCode, forecastData)
    return forecastData
  } catch (e) {
    console.error('Error while getting current weather', e)
  }
}