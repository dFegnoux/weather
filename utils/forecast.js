const cacheDuration = 15 * 60 * 1000 // 15 minutes

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
    current: ['temperature_2m', 'weather_code', 'wind_speed_10m', 'wind_direction_10m', 'relative_humidity_2m'],
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min', 'wind_speed_10m_max', 'wind_direction_10m_dominant', 'sunrise', 'sunset'],
    hourly: ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'wind_direction_10m', 'weather_code', 'precipitation_probability'],
    timezone: 'Europe/Berlin',
    forecast_days: '7'
  })

  return new URL(`https://api.open-meteo.com/v1/forecast?${searchParams}`)
}

const getForecastStorageKey = (geoCode) => `savedForecast(${geoCode.latitude}${geoCode.longitude})`

/**
 * Sauvegarde le retour API lié aux coordonnées
 * @param {Object} geoCode - Coordonnées géographiques contenant latitude et longitude
 * @param {Object} forecast - Retour API de open-meteo
 */
export const saveForecast = (geoCode, forecast) => {
  localStorage.setItem(getForecastStorageKey(geoCode), JSON.stringify(forecast))
}

/**
 * Récupère le retour API sauvegardé lié aux coordonnée
 * @param {Object} geoCode - Coordonnées géographiques contenant latitude et longitude
 * @returns {Object|undefined} Météo sauvegardée si trouvée sinon rien
 */
export const getSavedForecast = (geoCode) => {
  const savedForecast = JSON.parse(localStorage.getItem(getForecastStorageKey(geoCode)))
  if(!savedForecast) return console.log('No saved forecast found')
  
  const cacheExpirationDate = Date.now() - cacheDuration
  const isSavedForecastStillValid = new Date(savedForecast.current.time).getTime() > cacheExpirationDate
  if(!isSavedForecastStillValid) return console.log('Saved forecast found but expired')
  return savedForecast
}