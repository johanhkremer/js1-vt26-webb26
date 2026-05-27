// Pure function
const packageCost = (weight) => {
    return 10 * weight
}

const orderReceived = (message, calculateCost) => {
    const cost = calculateCost(3)
    console.log(`${message} ${cost} SEK`)
}

const packageSent = (message, onTheWay, delivered) => {
    setTimeout(() => {
        console.log(message)
        onTheWay()
        delivered("Ditt paket har nu levererats!")
    }, 2000)
}

const packageOnTheWay = () => {
    console.log("Paketet är nu på väg mot dig")
}

const packageDelivered = (message) => {
    console.log(message)
}

const orderPackageDelivery = () => {
    orderReceived("Beställning mottagen, kostnad för leverans:", packageCost)
    console.log("-----------------------")

    packageSent(
        "Ert paket har packats och skickats från vårt lager",
        packageOnTheWay,
        packageDelivered
    )
}

orderPackageDelivery()