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
    hourly: ['temperature_2m', 'relative_humidity_2m', 'wind_speed_10m', 'wind_direction_10m', 'weather_code'],
    timezone: 'Europe/Berlin',
    forecast_days: '7'
  })

  return new URL(`https://api.open-meteo.com/v1/forecast?${searchParams}`)
}