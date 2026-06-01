const weatherCityForm = document.getElementById("weatherCityForm")
const weatherCityInput = document.getElementById("weatherCityInput")
const currentWeatherCard = document.getElementById("currentWeatherCard")
const forcastContainer = document.getElementById("forcastContainer")

//Skriv in din egen nyckel
//! Använd inte Johans nyckel! Generera din egen.
const OPEN_WEATHER_KEY = "a684851d73c32ad6b7a91b52c30311c1"

//https://openweathermap.org/api/current?collection=current_forecast

const getWeatherCurrent = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=sv`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta väderdata")
    }

    const data = await response.json()

    return data
}

const getWeatherForcast = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}`)

    if (!response.ok) {
        throw new Error("Kunde inte hämta väderdata")
    }

    const data = await response.json()

    return data
}

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

const renderErrorState = (container, message) => {
    container.innerHTML = message
    container.classList.add("red")
}

const renderCurrentWeatherCard = async (lat, lon) => {
    try {
        renderLoadState()

        const cityWeather = await getWeatherCurrent(lat, lon)

        if (!cityWeather) {
            throw new Error("Kunde inte rendera ut väderdata")
        }

        currentWeatherCard.innerHTML = ""

        currentWeatherCard.innerHTML = `
        <article class="card" style="width: 15rem;">
            <img 
                src="https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png"
                alt="${cityWeather.weather[0].description}"
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

const renderForcastCards = async (lat, lon) => {
    try {
        const cityForcast = await getWeatherForcast(lat, lon)

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

const renderApp = async (city) => {
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
    currentWeatherCard.classList.remove("red")

    const city = weatherCityInput.value

    if (!city) {
        renderErrorState("Du måste skriva in en stad!")
        return
    }

    renderApp(city)
})