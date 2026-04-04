import { toNodeHandler } from '@habbit-tracker/auth'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import express from 'express'
import { auth } from './auth'
import { PORT, WEB_URL } from './config'
import { appRouter } from './routers/_app'
import habbitsRoutes from './routes/habbits'
import { createContext } from './routers/_context'

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

app.use(
  '/api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

app.use('/api/habbits', habbitsRoutes)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
