const http = require("http")
const express = require("express")
const cors = require("cors")

const jsonInfo = require("./env/info.json")
// https://www.daleseo.com/js-dotenv/
// https://velog.io/@sinclebear/Process.env-%EC%99%80-dotenv-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC
const dotenv = require("dotenv")

// http와 express를 합쳐준다. 같은 포트를 사용함
const app = express()

// dotenv.config()
dotenv.config({ path: "env/.env.local" })

// view engine - 템플릿 엔진
// prefix
app.set("views", __dirname + "/views")
// suffix
app.set("view engine", "ejs")

app.set("port", process.env.PORT || 3001)
app.use(cors())

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html; charset=utf8" })
    res.write("<h1>This is my server - JS</h1>")
    res.end()
})

const cryptoList = jsonInfo.cryptoList
const todoList = jsonInfo.todoList

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

const server = http.createServer(app)
server.listen(app.get("port"), () => {
    console.log(`Nodejs Server running... port ${app.get("port")}`)
})
