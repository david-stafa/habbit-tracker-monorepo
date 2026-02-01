import { BASE_URL, PORT, WEB_URL } from './config.js'
import express from 'express'
import { fromNodeHeaders, toNodeHandler } from '@habbit-tracker/auth'
import cors from 'cors'
import { auth } from './auth.js'

const app = express()

// Configure CORS middleware
app.use(
  cors({
    origin: WEB_URL, // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
)

app.all('/api/auth/*splat', toNodeHandler(auth))

app.get('/api/me', async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })
  return res.json(session)
})

app.get('/', (req, res) => {
  res.send(`Hello World! ${BASE_URL}`)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
