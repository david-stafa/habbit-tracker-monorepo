import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

export const PORT = z.coerce.number().default(3000).parse(process.env.PORT)
export const BASE_URL = z
  .string()
  .default('http://localhost:3000')
  .parse(process.env.BASE_URL)
