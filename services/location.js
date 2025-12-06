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
  } catch (error) {
    console.error('Something went wrong while getting location suggestions', error)
  }
}