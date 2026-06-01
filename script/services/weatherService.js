//! Använd inte Johans nyckel! Generera din egen.
const BASE_URL = "https://api.openweathermap.org"
const OPEN_WEATHER_KEY = null

export const getWeatherCurrent = async (lat, lon) => {
    const response = await fetch(`${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=sv`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta väderdata")
    }

    const data = await response.json()

    return data
}

export const getWeatherForcast = async (lat, lon) => {
    const response = await fetch(`${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=sv`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta väderdata")
    }

    const data = await response.json()

    return data
}

export const getCoordinates = async (city) => {
    const response = await fetch(`${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${OPEN_WEATHER_KEY}`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta koordinater")
    }

    const data = await response.json()

    return data
}