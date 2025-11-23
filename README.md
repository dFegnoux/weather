# Application Météo

Une application web simple pour consulter les prévisions météo utilisant l'API [Open-Meteo](https://open-meteo.com/).

Live app: https://dfegnoux.github.io/weather/

## Structure du projet

### Modules

- **`utils`** - Fonctons utilitaires au projet
- **`weatherAPI.js`** - Gestion des appels à l'API météo
- **`weatherInterpretation.js`** - Interprétation des codes météo
- **`domUpdaters.js`** - Manipulation du DOM
- **`locationSuggestions.js`** - Gestion des suggestions de localisation
- **`app.js`** - Point d'entrée principal

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
