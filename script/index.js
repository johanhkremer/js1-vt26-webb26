const weatherCityForm = document.getElementById("weatherCityForm")
const weatherCityInput = document.getElementById("weatherCityInput")
const currentWeatherCard = document.getElementById("currentWeatherCard")

//Skriv in din egen nyckel
//! Använd inte Johans nyckel! Generera din egen.
const OPEN_WEATHER_KEY = null

//https://openweathermap.org/api/current?collection=current_forecast

const getWeatherCurrent = async (city) => {
    const [location] = await getCoordinates(city)

    if (!location) {
        throw new Error("Kunde inte hitta platsen")
    }

    const { lat, lon } = location

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=sv`
    )

    if (!response.ok) {
        throw new Error("Kunde inte hämta väderdata")
    }

    const data = await response.json()

    return data
}

const getWeatherForcast = async (city) => {
    const [location] = await getCoordinates(city)

    if (!location) {
        throw new Error("Kunde inte hitta platsen")
    }

    const { lat, lon } = location

    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta väderdata")
    }

    const data = await response.json()

    console.log(data)
}

//https://openweathermap.org/api/geocoding-api?collection=other

const getCoordinates = async (city) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPEN_WEATHER_KEY}`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta koordinater")
    }

    const data = await response.json()

    return data
}

const renderLoadState = () => {
    currentWeatherCard.innerHTML = "<span class='loader'></span>"
}

const renderErrorState = (message) => {
    currentWeatherCard.innerHTML = message
    currentWeatherCard.classList.add("red")
}

const renderCurrentWeatherCard = async (city) => {
    try {
        renderLoadState()

        const cityWeather = await getWeatherCurrent(city)

        if (!cityWeather) {
            throw new Error("Kunde inte rendera ut väderdata")
        }

        currentWeatherCard.innerHTML = ""

        currentWeatherCard.innerHTML = `
        <h2>${cityWeather.name}</h2>
        <img 
            src="https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png"
            alt="${cityWeather.weather[0].description}"
        >
        <p>Temperatur: ${cityWeather.main.temp}°C</p>
        <p>Känns som: ${cityWeather.main.feels_like}°C</p>
        <p>Väder: ${cityWeather.weather[0].description}</p>
        <p
        p>Luftfuktighet: ${cityWeather.main.humidity}%</p>
        <p>Vind: ${cityWeather.wind.speed} m/s</p>
    `
    } catch (error) {
        console.log("Någonting gick fel:", error)
        renderErrorMessage(`Någontin gick fel: ${error.message}`)
    }
}

const renderForcastCards = () => { }

const renderApp = (city) => {
    renderCurrentWeatherCard(city)
    renderForcastCards()
}

weatherCityForm.addEventListener("submit", (event) => {
    event.preventDefault()

    currentWeatherCard.innerHTML = ""
    currentWeatherCard.classList.remove("red")

    const city = weatherCityInput.value

    if (!city) {
        renderErrorMessage("Du måste skriva in en stad!")
        return
    }

    renderApp(city)
})