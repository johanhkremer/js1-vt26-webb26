const weatherCityForm = document.getElementById("weatherCityForm")
const weatherCityInput = document.getElementById("weatherCityInput")
const currentWeatherCard = document.getElementById("currentWeatherCard")

//Skriv in din egen kod
const OPEN_WEATHER_KEY = null

const getCurrentWeather = async (city) => {
    const [cityCoordinates] = await getCoordinates(city)

    const { lat, lon } = cityCoordinates

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric&lang=sv`)

    const data = await response.json()

    console.log(data)

    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
}

const getCoordinates = async (city) => {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},SE&limit=1&appid=${OPEN_WEATHER_KEY}`)

    const data = await response.json()

    return data
}

weatherCityForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const city = weatherCityInput.value

    getCurrentWeather(city)
})