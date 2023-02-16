const http = require("http")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const jsonInfo = require("./env/info.json")
const app = express()

const cryptoList = jsonInfo.cryptoList
let todoList = jsonInfo.todoList

// dotenv.config()
dotenv.config({ path: "env/.env.local" })

app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 3001)
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 사용자 지정 미들웨어 - Filter 역할
// 어떠한 모든 요청이던 간에 무조건 넘어가는
// 공통 처리가 필요한 부분에 사용함
app.use((req, res, next) => {
    // console.log(req.body)
    console.log("공통 미들웨어")

    // 실행 후 다음 기능 호출이 필요함
    next()

    console.log("res 미들웨어 1")
})

app.use("/todo", (req, res, next) => {
    console.log("todo 미들웨어")

    next()

    console.log("res 미들웨어 2")
})

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html; charset=utf8" })
    res.write("<h1>This is my server - JS</h1>")
    res.end()
})

app.get("/crypto", (req, res) => {
    req.app.render("crypto", { cryptoList }, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.end(data)
    })
})

app.get("/todo", (req, res) => {
    req.app.render("todoList", { todoList }, (err, data) => {
        if (err) {
            console.log(err)
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

    todoList = [...todoList, todo]
    res.redirect("/todo")
})

app.use((err, req, res, next) => {
    // 에러 미들웨어는 인자는 반드시 4개 선언
    console.error(err)
    res.status(500).send(err.message)
})

const server = http.createServer(app)
server.listen(app.get("port"), () => {
    console.log(`Nodejs Server running... port ${app.get("port")}`)
})
