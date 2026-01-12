import { BASE_URL, PORT } from "./config"
import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send(`Hello World! ${BASE_URL}`)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})