// ../ betyder "gå upp en mapp". Från script/ui/render.js går sökvägen alltså
// upp till script/ och sedan ner i services/weatherService.js.
import { getWeatherCurrent, getWeatherForcast } from "../services/weatherService.js"

const currentWeatherCard = document.getElementById("currentWeatherCard")
const forcastContainer = document.getElementById("forcastContainer")

// export gör funktionen tillgänglig för andra moduler.
// I index.js kan vi sedan importera just renderLoadState med samma namn.
export const renderLoadState = (container) => {
    container.innerHTML = `
        <div class="d-flex justify-content-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Laddar...</span>
            </div>
        </div>
    `
}

// Den här funktionen exporteras också, eftersom både index.js och denna fil
// använder samma sätt att visa fel för användaren.
export const renderErrorState = (container, message) => {
    container.innerHTML = `
        <div class="alert alert-danger mb-0" role="alert">
            ${message}
        </div>
    `
}

// Funktionen exporteras så att index.js kan starta renderingen,
// men själva HTML-byggandet hålls samlat i UI-modulen.
export const renderCurrentWeatherCard = async (lat, lon) => {
    try {
        renderLoadState(currentWeatherCard)

        const cityWeather = await getWeatherCurrent(lat, lon)

        if (!cityWeather) {
            throw new Error("Kunde inte rendera ut väderdata")
        }

        currentWeatherCard.innerHTML = ""

        // Template literals med backticks gör det enkelt att blanda HTML och variabler.
        currentWeatherCard.innerHTML = `
        <article class="card shadow-sm border-0">
            <div class="card-body d-flex flex-column flex-md-row align-items-center gap-4">
                <img
                    src="https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png"
                    alt="${cityWeather.weather[0].description}"
                    class="img-fluid"
                >
                <div class="flex-grow-1 text-center text-md-start">
                    <h3 class="card-title h4 mb-1">${cityWeather.name}</h3>
                    <p class="text-secondary text-capitalize mb-3">${cityWeather.weather[0].description}</p>
                    <p class="display-6 fw-bold mb-0">${Math.round(cityWeather.main.temp)}°C</p>
                    <p class="text-secondary mb-0">Känns som ${cityWeather.main.feels_like}°C</p>
                </div>
                <div class="align-self-stretch align-self-md-center">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item px-0 d-flex justify-content-between gap-4">
                            <span>Luftfuktighet</span>
                            <span class="fw-semibold">${cityWeather.main.humidity}%</span>
                        </li>
                        <li class="list-group-item px-0 d-flex justify-content-between gap-4">
                            <span>Vind</span>
                            <span class="fw-semibold">${cityWeather.wind.speed} m/s</span>
                        </li>
                    </ul>
                </div>
            </div>
        </article>
    `
    } catch (error) {
        console.log("Någonting gick fel:", error)
        renderErrorState(currentWeatherCard, `Någontin gick fel: ${error.message}`)
    }
}

// Även prognosen är en export, så index.js kan anropa den utan att ha all
// prognoslogik i startfilen.
export const renderForcastCards = async (lat, lon) => {
    try {
        renderLoadState(forcastContainer)

        const cityForcast = await getWeatherForcast(lat, lon)

        // API:et skickar flera prognoser per dag. Här väljer vi bara prognoser kl. 12.
        const cityForcastFilter = cityForcast.list.filter((forecast) => {
            return forecast.dt_txt.includes("12:00:00")
        })

        const cityForcastCards = cityForcastFilter.map((cityForcastCard) => {

            return `
                <article class="col">
                    <div class="card h-100 shadow-sm border-0 text-center">
                        <div class="card-body">
                            <img
                                src="https://openweathermap.org/img/wn/${cityForcastCard.weather[0].icon}@2x.png"
                                alt="${cityForcastCard.weather[0].description}"
                                class="img-fluid mb-2"
                            >
                            <h3 class="card-title h6">${cityForcastCard.dt_txt}</h3>
                            <p class="fs-4 fw-bold mb-1">${Math.round(cityForcastCard.main.temp)}°C</p>
                            <p class="card-text text-secondary text-capitalize mb-0">${cityForcastCard.weather[0].description}</p>
                        </div>
                    </div>
                </article>
            `
        }).join("")

        forcastContainer.innerHTML = cityForcastCards

    } catch (error) {
        console.log("Någonting gick fel:", error)
        renderErrorState(forcastContainer, `Någontin gick fel: ${error.message}`)
    }
}
