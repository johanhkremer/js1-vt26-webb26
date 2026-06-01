import { getCoordinates } from "./services/weatherService.js"
import { renderCurrentWeatherCard, renderForcastCards, renderErrorState, renderLoadState } from "./ui/render.js"

const weatherCityForm = document.getElementById("weatherCityForm")
const weatherCityInput = document.getElementById("weatherCityInput")
const currentWeatherCard = document.getElementById("currentWeatherCard")

const renderApp = async (city) => {
    renderLoadState(currentWeatherCard)

    try {
        const [location] = await getCoordinates(city)

        if (!location) {
            throw new Error("Kunde inte hitta platsen")
        }

        const { lat, lon } = location

        renderCurrentWeatherCard(lat, lon)
        renderForcastCards(lat, lon)
    } catch (error) {
        console.log("Någonting gick fel:", error)
        renderErrorState(currentWeatherCard, `Någontin gick fel: ${error.message}`)
    }
}

weatherCityForm.addEventListener("submit", (event) => {
    event.preventDefault()

    currentWeatherCard.innerHTML = ""
    forcastContainer.innerHTML = ""
    currentWeatherCard.classList.remove("red")
    forcastContainer.classList.remove("red")

    const city = weatherCityInput.value

    if (!city) {
        renderErrorState(currentWeatherCard, "Du måste skriva in en stad!")
        return
    }

    renderApp(city)
})