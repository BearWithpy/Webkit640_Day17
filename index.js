const http = require("http")
const express = require("express")
const cors = require("cors")

// https://www.daleseo.com/js-dotenv/
// https://velog.io/@sinclebear/Process.env-%EC%99%80-dotenv-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC
const dotenv = require("dotenv")

// dotenv.config()
dotenv.config({ path: ".env.local" })

// http와 express를 합쳐준다. 같은 포트를 사용함
const app = express()
app.set("port", process.env.PORT || 3001)
app.use(cors())

const server = http.createServer(app)

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-type": "text/html; charset=utf8" })
    res.write("<h1>This is my server - JS</h1>")
    res.end()
})

server.listen(app.get("port"), () => {
    console.log(`Nodejs Server running... port ${app.get("port")}`)
})
