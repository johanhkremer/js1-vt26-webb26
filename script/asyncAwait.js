const ramenContainer = document.getElementById("ramen")
const orderRamenBtn = document.getElementById("orderRamenBtn")
const resetBtn = document.getElementById("reset")
const todoList = document.getElementById("todoList")

//Async/await
const waitForRamen = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("🍜")
        }, 4000)
    })
}

const makeRamen = async () => {
    console.log("Making ramen...")
    ramenContainer.innerHTML = "<h2>Vi håller på att laga till din ramen!</h2>"

    const ramen = await waitForRamen()

    console.log(ramen)

    ramenContainer.innerHTML = `<h2>Dags att äta: ${ramen}</h2>`
}

orderRamenBtn.addEventListener("click", () => {
    makeRamen()
})

resetBtn.addEventListener("click", () => {
    ramenContainer.innerHTML = ""
})

//Promise, async/await, fetch(), API

let todos

const getData = async () => {
    todoList.innerHTML = "Trying to fetch todos..."

    setTimeout(async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')

            const data = await response.json()

            todos = data.slice(0, 30)

            renderTodoList()

        } catch (error) {
            console.log("Something went wrong:", error)
            todoList.innerHTML = "Something went wrong"
        }
    }, 3000)
}

const renderTodoList = () => {
    const todoListData = todos.map((todo) => {
        return `<li>${todo.id} ${todo.title}</li>`
    }).join("")

    todoList.innerHTML = todoListData
}

getData()