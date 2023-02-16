const http = require("http")
const express = require("express")
const cors = require("cors")

// https://www.daleseo.com/js-dotenv/
// https://velog.io/@sinclebear/Process.env-%EC%99%80-dotenv-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC
const dotenv = require("dotenv")

// http와 express를 합쳐준다. 같은 포트를 사용함
const app = express()

// dotenv.config()
dotenv.config({ path: ".env.local" })

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

const cryptoList = [
    { no: 1, name: "BTC", fullname: "Bitcoin", price: 24599.05 },
    { no: 2, name: "ETH", fullname: "Ethereum", price: 1687.35 },
    { no: 3, name: "USDT", fullname: "TetherUS", price: 0.99973596 },
    { no: 4, name: "BNB", fullname: "BNB", price: 323.9 },
    { no: 5, name: "XRP", fullname: "Ripple", price: 0.4002 },
    { no: 6, name: "ADA", fullname: "Cardano", price: 0.411 },
    { no: 7, name: "BUSD", fullname: "BUSD", price: 0.9999 },
    {
        no: 8,
        name: "DOGE",
        fullname: "Dogecoin",
        price: 0.08933,
    },
    { no: 9, name: "MATIC", fullname: "Polygon", price: 1.33 },
    { no: 10, name: "SOL", fullname: "Solana", price: 23.68 },
    { no: 11, name: "DOT", fullname: "Polkadot", price: 6.6 },
]

app.get("/crypto", (req, res) => {
    req.app.render("crypto", { cryptoList }, (err, data) => {
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
