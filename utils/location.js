// Coordonnées par défaut arbitraire
const defaultLocation = {
  geocode: {
    latitude: '48.9765',
    longitude: '2.8748'
  },
  label: 'Crégy-lès-Meaux'
}

const savedLocationKey = 'savedLocation'

const isLocationValid = (location) => !!location && typeof location.geocode?.latitude === 'string' && typeof location.geocode?.longitude === 'string' && typeof location.label === 'string'

export const getDefaultLocation = () => {
  try {
      const savedLocation = JSON.parse(localStorage.getItem(savedLocationKey))

      if(!isLocationValid(savedLocation)) {
        console.log('no saved location found, using default one')
        saveLocation(defaultLocation)
        return defaultLocation
      }
      
      console.log('Saved location found')
      return savedLocation
  } catch (e) {
      console.error('Error occured while retrieving saved location, fallback to default location', e)
      return defaultLocation
  }
}

export const saveLocation = (location) => {
  if(!isLocationValid(location)) return console.error('Error while trying to save current location', location)

  localStorage.setItem(savedLocationKey, JSON.stringify(location))
} 