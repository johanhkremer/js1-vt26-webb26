const syncCoffe = "☕️"

console.log("Sync coffee", syncCoffe)

let asyncCoffe

function makeCoffe() {
    console.log("✅ Turn on coffee machine")

    setTimeout(() => {
        asyncCoffe = "☕️"
    }, 3000)

    console.log("Your coffee is beeing made!")
}

makeCoffe()

setTimeout(() => {
    console.log("Async coffee:", asyncCoffe)
}, 2500)

console.log("This coffee is taking too long 😡")

//Pure funtions 💎 & side effects 💥

//Pure function = same input -> same output

function numbers(a, b) {
    return a + b
}

console.log(numbers(1, 2))
console.log(numbers(1, 2))
console.log(numbers(1, 2))
console.log(numbers(1, 2))
console.log(numbers(1, 2))
console.log(numbers(1, 2))

//Callback

//Sync
function sendMessage(printMessage) {
    const message = "Call me mr Callback"
    printMessage(message)
}

function logMessage(message) {
    console.log(message)
}

sendMessage(logMessage)

//Async
const cookRamen = (eatRamen) => {

    setTimeout(() => {
        const ramen = "🍜"
        eatRamen(ramen)
    }, 4000)
}

const eatRamen = (ramen) => {
    console.log("Yum, let´s eat some:", ramen)
}

cookRamen(eatRamen)