import express from "express"
import bodyParser from "body-parser"
import { SERVER_PORT } from "./env.js"
import cors from "cors"

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
    })
)

app.post("/api/sort", (req, res) => {
    try {
        const { text } = req.body

        if (!text) {
            return res.status(400).json({ error: "Текст відсутній" })
        }

        const words = text.split(/\s+/)
        const sortedWords = words.sort((a, b) => a.localeCompare(b, "uk"))
        const result = sortedWords.join(" ")

        res.json({ original: text, sorted: result })
    } catch (error) {
        res.status(500).json({ error: "Помилка сервера: " + error.message })
    }
})

app.listen(SERVER_PORT, () => {
    console.log(`Server's listening on port ${SERVER_PORT}`)
})

