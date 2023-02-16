const http = require("http")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const jsonInfo = require("./env/info.json")
const app = express()

const cryptoList = jsonInfo.cryptoList
const todoList = jsonInfo.todoList

dotenv.config({ path: "env/.env.local" })

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 3001)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"))

app.use((req, res, next) => {
    next()
})

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send(err.message)
})

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html; charset=utf8" })
    res.write("<h1>This is my server - JS</h1>")
    res.end()
})

app.get("/crypto", (req, res) => {
    req.app.render("crypto", { cryptoList }, (err, data) => {
        if (err) {
            throw err
        }
        res.end(data)
    })
})

app.get("/todo", (req, res) => {
    req.app.render("todoList", { todoList }, (err, data) => {
        if (err) {
            throw err
        }
        res.end(data)
    })
})

app.post("/todo", (req, res) => {
    const { newTodo } = req.body

    let todo = {
        no: todoList.length + 1,
        task: newTodo,
        isDone: false,
        isDeleted: false,
    }

    todoList.push(todo)
    res.redirect("/todo")
})

app.get("/todo/update", (req, res) => {
    const { no, task } = req.query
    todoList[no - 1].task = task
    res.redirect("/todo")
})

app.get("/todo/delete", (req, res) => {
    const { no } = req.query
    todoList[no - 1].isDeleted = true
    res.redirect("/todo")
})

app.get("/todo/complete", (req, res) => {
    const { no, isDone } = req.query
    console.log(typeof isDone)
    if (isDone === "true") {
        todoList[no - 1].isDone = true
    } else {
        todoList[no - 1].isDone = false
    }

    res.redirect("/todo")
})

app.get("/json/todo", (req, res) => {
    res.send({ todoList })
})

const server = http.createServer(app)
server.listen(app.get("port"), () => {
    console.log(`Nodejs Server running... port ${app.get("port")}`)
})
