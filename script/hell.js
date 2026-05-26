// Callback hell uppstår när vi löser flera asynkrona steg genom att lägga en callback inuti en annan callback, och sedan ännu en, och ännu en.

// Då fungerar koden kanske fortfarande, men den blir snabbt:

// svår att läsa
// svår att förstå
// svår att felsöka
// svår att bygga vidare på

// Man brukar också kalla det för “pyramid of doom”, eftersom koden börjar skjutas längre och längre åt höger.

const loginUser = (callback) => {
    setTimeout(() => {
        const userName = "Johan"

        callback(userName)
    }, 1500)
}

const getOrders = (userName, callback) => {
    setTimeout(() => {
        console.log("Hämtar ordrar för:", userName)

        const orders = "Tangentbord"

        callback(orders)
    }, 3000)
}

const getOrderDetails = (order, callback) => {
    setTimeout(() => {
        const orderDetails = order + " kostar 499 kr"

        callback(orderDetails)
    }, 1000)
}

const renderOrder = (orderDetails, callback) => {
    setTimeout(() => {
        console.log("Visar order på sidan:", orderDetails)

        callback()
    }, 500)
}

// Här startar kedjan
loginUser((userName) => {
    console.log("Inloggad:", userName)

    getOrders(userName, (orders) => {
        console.log("Ordrar hämtade:", orders)

        getOrderDetails(orders[0], (orderDetails) => {
            console.log("Orderdetaljer hämtade:", orderDetails)

            renderOrder(orderDetails, () => {
                console.log("Klar ✅")
            })
        })
    })
})