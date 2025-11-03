# Application Météo

Une application web simple pour consulter les prévisions météo utilisant l'API Open-Meteo.

## Structure du projet

### Modules

- **`weatherAPI.js`** - Gestion des appels à l'API météo
  - `getForecastURL()` - Construction des URLs d'API
  - `fetchCurrentWeather()` - Récupération des données météo
  - `fetchLocationSuggestions()` - Récupération des suggestions de villes

- **`weatherInterpretation.js`** - Interprétation des codes météo
  - `getWeatherInterpretation()` - Conversion des codes WMO en descriptions

- **`domUpdaters.js`** - Manipulation du DOM
  - `setCurrentTemperature()`, `setCurrentHumidity()`, etc. - Mise à jour des éléments
  - `displayCurrentWeather()` - Affichage complet des données météo

- **`locationSuggestions.js`** - Gestion des suggestions de localisation
  - `displayLocationSuggestions()` - Affichage des suggestions
  - `chooseSuggestion()` - Sélection d'une suggestion
  - `initializeCityInput()` - Initialisation de l'autocomplete

- **`app.js`** - Point d'entrée principal
  - Orchestration de l'initialisation de l'application

## Utilisation

1. Ouvrir `index.html` dans un serveur web (les modules ES6 nécessitent un serveur HTTP)
2. L'application charge automatiquement la météo de la région parisienne
3. Utiliser le champ de recherche pour changer de ville

## Développement

Pour tester localement avec un serveur Python :

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000 dans votre navigateur.

## APIs utilisées

- [Open-Meteo Weather API](https://open-meteo.com/) - Données météo
- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) - Suggestions de villes