/**
 * Obtient l'interprétation météo selon le code WMO
 * @param {number} code - Code WMO : 0 à 99
 * @returns {Object} Objet contenant l'emoji et le texte descriptif
 * @returns {string} returns.picture - Emoji représentant la météo
 * @returns {string} returns.text - Description textuelle en français
 */
export const getWeatherInterpretation = (code) => {
  switch(code) {
    case 0:
      return { picture: '☀️', text: 'Ciel dégagé' }
    case 1:
      return { picture: '🌤️', text: 'Globalement dégagé' }
    case 2:
      return { picture: '🌦️', text: 'Partiellement nuageux' }
    case 3:
      return { picture: '☁️', text: 'Ciel couvert' }
    case 51:
      return { picture: '💦', text: 'Bruine : Légère' }
    case 53:
      return { picture: '💦💦', text: 'Bruine : Modérée' }
    case 55:
      return { picture: '💦💦💦', text: 'Bruine : Dense' }
    case 56:
      return { picture: '🌫️❄️', text: 'Bruine verglaçante : Légère' }
    case 57:
      return { picture: '🌫️❄️🌫️❄️🌫️❄️', text: 'Bruine verglaçante : Forte' }
    case 61:
      return { picture: '🌧️', text: 'Pluie : Faible' }
    case 63:
      return { picture: '🌧️🌧️', text: 'Pluie : Modérée' }
    case 65:
      return { picture: '🌧️🌧️🌧️', text: 'Pluie : Forte' }
    case 71:
      return { picture: '🌨️', text: 'Chute de neige : Faible' }
    case 73:
      return { picture: '🌨️🌨️', text: 'Chute de neige : Modérée' }
    case 75:
      return { picture: '🌨️🌨️🌨️', text: 'Chute de neige : Forte' }
    case 77:
      return { picture: '⚪️', text: 'Neige en grains' }
    case 80:
      return { picture: '💧', text: 'Averses de pluie : Faibles' }
    case 81:
      return { picture: '💧💧', text: 'Averses de pluie : Modérées' }
    case 82:
      return { picture: '💧💧💧', text: 'Averses de pluie : Fortes' }
    case 85:
      return { picture: '❄️', text: 'Averses de neige : Faibles' }
    case 86:
      return { picture: '❄️❄️❄️', text: 'Averses de neige : Fortes' }
    case 95:
      return { picture: '☁️⚡️', text: 'Orage' }
    case 96:
      return { picture: '⛈️', text: 'Orage avec grêle légère' }
    case 99:
      return { picture: '⛈️⛈️⛈️', text: 'Orage avec grêle forte' }
    default:
      return { picture: '🤷', text: '...' }
  }
}