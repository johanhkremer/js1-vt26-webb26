//Promises

//pending

const makeRamen = () => {
    return new Promise((resolve, reject) => {
        const hasNoodles = true

        console.log("Trying to make ramen...")

        setTimeout(() => {

            if (hasNoodles) {
                resolve("🍜")
            } else {
                reject("🛑 No noodles left!")
            }
        }, 3000)
    })
}

const boilEgg = (ramen) => {
    return new Promise((resolve, reject) => {
        const hasEggs = true

        console.log("Trying to boil an egg...")

        setTimeout(() => {
            if (hasEggs) {
                resolve(ramen + "🥚")
            } else {
                reject("🛑 All the chickens are dead ☠️")
            }
        }, 1500)
    })
}

// const ramenPromise = makeRamen()

// console.log(ramenPromise)

// setTimeout(() => {
//     console.log(ramenPromise)
// }, 3500)

const onSuccess = (ramen) => {
    console.log("Your ramen is ready:", ramen)
}

const onError = (error) => {
    console.log("We couldent make ramen because:", error)
}

const eatRamen = () => {
    console.log("Eat ramen!!!")
}

makeRamen()
    .then(boilEgg)
    .then(onSuccess)
    .catch(onError)
    .finally(eatRamen)

//Ytterligare ett exempel

const step1 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Steg 1 klart")
            resolve()
        }, 2500)
    })
}

const step2 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Steg 2 klart")
            resolve()
        }, 500)
    })
}

const step3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Steg 3 klart")
            resolve()
        }, 500)
    })
}

const step4 = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Steg 4 klart")
            resolve()
        }, 500)
    })
}

step1()
    .then(step2)
    .then(step3)
    .then(step4)
    .then(() => {
        console.log("Alla steg klara")
    })