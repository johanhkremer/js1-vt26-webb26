//! Använd inte Johans nyckel! Generera din egen.
const BASE_URL = "https://api.openweathermap.org"
const OPEN_WEATHER_KEY = null

// weatherService.js är en "service-modul": den ansvarar för API-anrop.
// Andra filer kan importera funktionerna, men behöver inte känna till URL:erna.
export const getWeatherCurrent = async (lat, lon) => {
    const response = await fetch(`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=sv`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta väderdata")
    }

    const data = await response.json()

    // Funktionen returnerar datan, så den fil som anropar funktionen kan välja
    // hur datan ska användas eller visas.
    return data
}

// export const skapar en namngiven export. Den måste importeras med samma namn,
// till exempel: import { getWeatherForcast } from "../services/weatherService.js"
export const getWeatherForcast = async (lat, lon) => {
    const response = await fetch(`${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=sv`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta väderdata")
    }

    const data = await response.json()

    return data
}

// Geocoding-anropet omvandlar ett stadsnamn till koordinater.
// Väder-API:erna använder sedan latitud och longitud i sina anrop.
export const getCoordinates = async (city) => {
    const response = await fetch(`${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${OPEN_WEATHER_KEY}`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta koordinater")
    }

    const data = await response.json()

    return data
}
