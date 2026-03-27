import { BASE_URL, PORT, WEB_URL } from './config.js'
import express from 'express'
import { fromNodeHeaders, toNodeHandler } from '@habbit-tracker/auth'
import cors from 'cors'
import { auth } from './auth.js'
import habbitsRoutes from './routes/habbits.js'

const app = express()

// Configure CORS middleware
app.use(
  cors({
    origin: WEB_URL, // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
)

app.use(express.json())

app.all('/api/auth/*splat', toNodeHandler(auth))

app.use('/api/habbits', habbitsRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
