import { BASE_URL, PORT } from './config.js'
import express from 'express'
import { auth, fromNodeHeaders, toNodeHandler } from '@habbit-tracker/auth'
import cors from 'cors'

const app = express()

app.all('/api/auth/*splat', toNodeHandler(auth))

// Configure CORS middleware
app.use(
  cors({
    origin: 'http://your-frontend-domain.com', // Replace with your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
)

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
