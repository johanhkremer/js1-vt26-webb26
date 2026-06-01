// index.js är appens startfil. Den importerar bara de funktioner den behöver
// från andra moduler, så att varje fil kan ansvara för en tydlig del av appen.
import { getCoordinates } from "./services/weatherService.js"
import { renderCurrentWeatherCard, renderForcastCards, renderErrorState, renderLoadState } from "./ui/render.js"

const weatherCityForm = document.getElementById("weatherCityForm")
const weatherCityInput = document.getElementById("weatherCityInput")
const currentWeatherCard = document.getElementById("currentWeatherCard")

// async behövs eftersom funktionen väntar på svar från API:et med await.
const renderApp = async (city) => {
    renderLoadState(currentWeatherCard)

    try {
        // getCoordinates är importerad från weatherService.js.
        // Hakparenteserna plockar ut första träffen ur arrayen som API:et skickar tillbaka.
        const [location] = await getCoordinates(city)

        if (!location) {
            throw new Error("Kunde inte hitta platsen")
        }

        const { lat, lon } = location

        // Render-funktionerna är importerade från ui/render.js.
        // index.js behöver därför inte veta exakt hur HTML-korten byggs.
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
