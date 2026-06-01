// ../ betyder "gå upp en mapp". Från script/ui/render.js går sökvägen alltså
// upp till script/ och sedan ner i services/weatherService.js.
import { getWeatherCurrent, getWeatherForcast } from "../services/weatherService.js"

const currentWeatherCard = document.getElementById("currentWeatherCard")
const forcastContainer = document.getElementById("forcastContainer")

// export gör funktionen tillgänglig för andra moduler.
// I index.js kan vi sedan importera just renderLoadState med samma namn.
export const renderLoadState = (container) => {
    container.innerHTML = "<span class='loader'></span>"
}

// Den här funktionen exporteras också, eftersom både index.js och denna fil
// använder samma sätt att visa fel för användaren.
export const renderErrorState = (container, message) => {
    container.innerHTML = message
    container.classList.add("red")
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
        <article class="card">
            <img 
                src="https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png"
                alt="${cityWeather.weather[0].description}"
                class="class="card-img-top"
                style="max-width: 150px;"
            >
            <div class="card-body">
                <h2 class="card-title">${cityWeather.name}</h2>
                <p class="card-text">Temperatur: ${cityWeather.main.temp}°C</p>
                <p class="card-text">Känns som: ${cityWeather.main.feels_like}°C</p>
                <p class="card-text">Väder: ${cityWeather.weather[0].description}</p>
                <p class="card-text">Luftfuktighet: ${cityWeather.main.humidity}%</p>
                <p class="card-text">Vind: ${cityWeather.wind.speed} m/s</p>
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
                <article class="card" style="width: 15rem;">
                    <img
                        src="https://openweathermap.org/img/wn/${cityForcastCard.weather[0].icon}@2x.png"
                        alt="${cityForcastCard.weather[0].description}"
                        class=card-img-top
                    >
                    <div class="card-body">
                    <h5 class="card-title">Datum: ${cityForcastCard.dt_txt}</h5>
                    <p class="card-text">Temperatur: ${cityForcastCard.main.temp}°C</p>
                    <p class="card-text">Väder: ${cityForcastCard.weather[0].description}</p>
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
