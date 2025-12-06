import { getForecastURL } from '../utils/getForecastUrl.js'

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

  try {
    const forecastResponse = await fetch(getForecastURL(geoCode))
    if (!forecastResponse.ok) {
      throw new Error(`Response status: ${forecastResponse.status}`);
    }
    return await forecastResponse.json();
  } catch (e) {
    console.error('Error while getting current weather', e)
  }
}