const http = require("http")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const jsonInfo = require("./env/info.json")
const app = express()

const cryptoList = jsonInfo.cryptoList
const todoList = jsonInfo.todoList

// dotenv.config()
dotenv.config({ path: "env/.env.local" })

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 3001)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use("/public", express.static(__dirname + "/public"))
app.use(express.static(__dirname + "/public"))

app.use((req, res, next) => {
    next()
})

// 미들웨어 참고
// https://inpa.tistory.com/entry/EXPRESS-%F0%9F%93%9A-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%F0%9F%92%AF-%EC%9D%B4%ED%95%B4-%EC%A0%95%EB%A6%AC
app.use((err, req, res, next) => {
    // 에러 미들웨어는 인자는 반드시 4개 선언
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
            // console.log(err)
            throw err
        }
        res.end(data)
    })
})

app.get("/todo", (req, res) => {
    req.app.render("todoList", { todoList }, (err, data) => {
        if (err) {
            // console.log(err)
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

    // const라서 이렇게 사용하면 안돼...
    // todoList = [...todoList, todo]

    todoList.push(todo)
    res.redirect("/todo")
})

app.get("/json/todo", (req, res) => {
    res.send({ todoList })
})

const server = http.createServer(app)
server.listen(app.get("port"), () => {
    console.log(`Nodejs Server running... port ${app.get("port")}`)
})
