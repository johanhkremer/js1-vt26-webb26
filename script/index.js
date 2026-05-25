const syncCoffe = "☕️"

console.log("Sync coffee", syncCoffe)

let asyncCoffe

function makeCoffe() {
    console.log("✅ Turn on coffee machine")

    setTimeout(() => {
        asyncCoffe = "☕️"
    }, 2000)

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

