/**
 * Construit l'URL pour récupérer les prévisions météo
 * @param {Object} geoCode - Coordonnées géographiques
 * @param {string} geoCode.latitude - Latitude
 * @param {string} geoCode.longitude - Longitude
 * @returns {URL} URL de l'API Open-Meteo
 */
export const getForecastURL = ({ latitude, longitude }) => {
  const searchParams = new URLSearchParams({
    latitude,
    longitude,
    current: 'temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m',
    timezone: 'Europe/Berlin',
    forecast_days: '1'
  })

  return new URL(`https://api.open-meteo.com/v1/forecast?${searchParams}`)
}

/**
 * Récupère les données météo actuelles
 * @param {Object} geoCode - Coordonnées géographiques
 * @param {string} geoCode.latitude - Latitude
 * @param {string} geoCode.longitude - Longitude
 * @returns {Promise<Object|undefined>} Données météo ou undefined en cas d'erreur
 */
export const fetchCurrentWeather = async (geoCode) => {
  if (!geoCode?.latitude || !geoCode?.longitude) {
    throw new Error('Invalid geocode data')
  }

  try {
    const forecastResponse = await fetch(getForecastURL(geoCode))
    if (!forecastResponse.ok) {
      throw new Error(`Response status: ${forecastResponse.status}`);
    }
    return await forecastResponse.json();
  } catch(e) {
    console.error('Error while getting current weather', e)
  }
}

/**
 * Récupère les suggestions de localisation
 * @param {string} text - Texte de recherche
 * @returns {Promise<Object|undefined>} Suggestions ou undefined en cas d'erreur
 */
export const fetchLocationSuggestions = async (text) => {
  try {
    const params = new URLSearchParams({
      name: text,
      count: 5,
      language: 'fr',
      format: 'json',
      countryCode: 'FR'
    })
    const geoCodeResponse = await fetch('https://geocoding-api.open-meteo.com/v1/search?' + params)
    if (!geoCodeResponse.ok) {
      throw new Error(`GeoCode Response status: ${geoCodeResponse.status}`);
    }
    return await geoCodeResponse.json();
  } catch(error) {
    console.error('Something went wrong while getting location suggestions', error)
  }
}